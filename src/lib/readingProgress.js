/**
 * Where a reader stopped, per document.
 *
 * The reader used to remember a page number and nothing else: no title, no
 * total, no date, so nothing could say "you were on page 84 of Hedda Gabler two
 * days ago" and nothing could list what you had started. This keeps one small
 * record per document — the page, the total, and when it was last opened — and
 * exposes the few things the UI needs: resume a document, and list the ones in
 * progress.
 *
 * Everything is local to the device. There is no account behind the library, so
 * there is nothing to sync and nothing to send.
 */

const KEY = 'zikshare:reading'
const LEGACY_PREFIX = 'zikshare:book-progress:'

function readAll() {
    try {
        const raw = localStorage.getItem(KEY)
        const parsed = raw ? JSON.parse(raw) : {}
        return parsed && typeof parsed === 'object' ? parsed : {}
    } catch {
        return {}
    }
}

function writeAll(map) {
    try {
        localStorage.setItem(KEY, JSON.stringify(map))
    } catch {
        // private mode or a full quota: progress is a convenience, not a promise
    }
}

/**
 * Records that a document was opened at a page.
 * `finished` is true when the reader reached the last page.
 */
export function recordProgress({ slug, page, total, title, author, path }) {
    if (!slug || !Number.isFinite(page) || page < 1) return
    const map = readAll()
    const previous = map[slug] || {}
    map[slug] = {
        slug,
        page: Math.floor(page),
        total: Number.isFinite(total) && total > 0 ? Math.floor(total) : previous.total || null,
        title: title || previous.title || '',
        author: author || previous.author || '',
        path: path || previous.path || '',
        at: new Date().toISOString(),
    }
    writeAll(map)
}

/** The saved record for one document, or null. Falls back to the old key. */
export function getProgress(slug) {
    if (!slug) return null
    const saved = readAll()[slug]
    if (saved) return saved
    try {
        const legacy = Number(localStorage.getItem(`${LEGACY_PREFIX}${slug}`))
        if (Number.isFinite(legacy) && legacy > 0) {
            return { slug, page: Math.floor(legacy), total: null, title: '', author: '', path: '', at: null }
        }
    } catch {
        /* no storage */
    }
    return null
}

/** Percent read, 1–100, or null when the total is not known. */
export function progressPercent(record) {
    if (!record?.total || !record?.page) return null
    return Math.min(100, Math.max(1, Math.round((record.page / record.total) * 100)))
}

/** Everything in progress, most recently opened first. */
export function listProgress({ limit = 6, excludeFinished = false } = {}) {
    const map = readAll()
    return Object.values(map)
        .filter((entry) => entry && entry.slug && Number.isFinite(entry.page))
        .filter((entry) => !excludeFinished || !(entry.total && entry.page >= entry.total))
        .sort((a, b) => String(b.at || '').localeCompare(String(a.at || '')))
        .slice(0, limit)
}

/** Forgets one document. */
export function clearProgress(slug) {
    const map = readAll()
    if (map[slug]) {
        delete map[slug]
        writeAll(map)
    }
    try {
        localStorage.removeItem(`${LEGACY_PREFIX}${slug}`)
    } catch {
        /* no storage */
    }
}
