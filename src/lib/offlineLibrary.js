/**
 * Saving a library PDF for offline reading.
 *
 * The app is installable and a service worker caches what has been fetched, but
 * that is luck: a reader only gets a file offline if they happened to open it
 * online first, and there is no way to know what is on the phone. This keeps an
 * explicit shelf of documents the reader asked to keep — a real Cache Storage
 * entry per PDF, plus a small manifest so the library can say "on this device"
 * without touching the network.
 *
 * On a campus connection this is the difference between "download it now" and
 * "read it in the queue".
 */

const CACHE_NAME = 'zikshare-library-offline-v1'
const MANIFEST_KEY = 'zikshare:offline-manifest'

function storageAvailable() {
    return (
        typeof window !== 'undefined' &&
        typeof window.caches !== 'undefined' &&
        typeof window.fetch === 'function'
    )
}

function readManifest() {
    try {
        const raw = localStorage.getItem(MANIFEST_KEY)
        const parsed = raw ? JSON.parse(raw) : {}
        return parsed && typeof parsed === 'object' ? parsed : {}
    } catch {
        return {}
    }
}

function writeManifest(map) {
    try {
        localStorage.setItem(MANIFEST_KEY, JSON.stringify(map))
    } catch {
        // a full quota should not throw in a reader's face
    }
}

/** True when this browser can keep files for offline reading. */
export function offlineSupported() {
    return storageAvailable()
}

/** The documents saved on this device, most recent first. */
export function listOffline() {
    return Object.values(readManifest()).sort((a, b) =>
        String(b.at || '').localeCompare(String(a.at || ''))
    )
}

export function isSavedOffline(slug) {
    return Boolean(slug && readManifest()[slug])
}

/**
 * Downloads a document into Cache Storage and records it.
 * Resolves to { success, error } and never throws.
 */
export async function saveOffline({ slug, path, title, author, pages }) {
    if (!slug || !path) return { success: false, error: 'This document has no file to save' }
    if (!storageAvailable()) {
        return { success: false, error: 'This browser cannot keep files offline' }
    }
    try {
        const cache = await window.caches.open(CACHE_NAME)
        const response = await window.fetch(path, { cache: 'no-store' })
        if (!response.ok) throw new Error(`The file returned ${response.status}`)

        // A reader asked for the book, so anything that is not a PDF is refused
        // rather than saved. This is how a saved "index.html" is caught: if the
        // server or the offline worker ever answers a .pdf address with a page,
        // the shelf says so instead of keeping the wrong file.
        const type = (response.headers.get('content-type') || '').toLowerCase()
        if (type && !type.includes('pdf') && !type.includes('octet-stream')) {
            throw new Error('That address returned a web page, not the document')
        }

        await cache.put(path, response.clone())

        const manifest = readManifest()
        manifest[slug] = {
            slug,
            path,
            title: title || '',
            author: author || '',
            pages: pages || null,
            size: Number(response.headers.get('content-length')) || null,
            at: new Date().toISOString(),
        }
        writeManifest(manifest)
        return { success: true }
    } catch (err) {
        return { success: false, error: err?.message || 'The file could not be saved' }
    }
}

/** Removes one document from this device. */
export async function removeOffline(slug) {
    const manifest = readManifest()
    const entry = manifest[slug]
    try {
        if (entry?.path && typeof window !== 'undefined' && window.caches) {
            const cache = await window.caches.open(CACHE_NAME)
            await cache.delete(entry.path)
        }
    } catch {
        // the manifest is the source of truth for the UI; a stale cache entry
        // is harmless and will be evicted by the browser
    }
    if (entry) {
        delete manifest[slug]
        writeManifest(manifest)
    }
    return { success: true }
}

/** Empties the offline shelf. */
export async function clearOffline() {
    const manifest = readManifest()
    try {
        if (typeof window !== 'undefined' && window.caches) {
            await window.caches.delete(CACHE_NAME)
        }
    } catch {
        /* nothing cached */
    }
    writeManifest({})
    return { success: true, count: Object.keys(manifest).length }
}

/** Total size of the saved files, in bytes, as far as the browser told us. */
export function offlineBytes() {
    return listOffline().reduce((sum, entry) => sum + (entry.size || 0), 0)
}
