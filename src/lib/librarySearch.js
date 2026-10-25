/**
 * One search that behaves the same for packs and for books.
 *
 * The library holds two kinds of thing: authored study packs, which are found
 * by course code, and third-party books, which have no course code at all and
 * are found by author, publisher or subject. Before this, a search only looked
 * at title/code/description, so typing "Watchman Nee" or "prayer" found nothing
 * on the bookshelf.
 *
 * The query is split into words and every word must appear somewhere in the
 * record. That way "nee prayer" narrows instead of widening.
 *
 * Searching is done on a phone keyboard, one-thumbed, often in a hurry — so a
 * word is also accepted when it is one keystroke away from a word in the record
 * ("Shakespare", "Sophokles"), when it is the start of one ("hedda gabl"), or
 * when it is a name the record spells differently on purpose ("Aeschylus" for
 * the Greek Αἰσχύλος, "Chekov" for Chekhov).
 */

function text(value) {
    return String(value ?? '').toLowerCase()
}

/**
 * Spellings a reader is likely to type that the catalogue does not use.
 * Deliberately short: this is a correction list, not a search engine.
 */
export const NAME_ALIASES = {
    chekov: 'chekhov',
    tchekhov: 'chekhov',
    cechov: 'chekhov',
    ibson: 'ibsen',
    shakspeare: 'shakespeare',
    shakespear: 'shakespeare',
    shakspere: 'shakespeare',
    sophokles: 'sophocles',
    aischylos: 'aeschylus',
    eschylus: 'aeschylus',
    euripedes: 'euripides',
    euripides: 'euripides',
    plautus: 'plautus',
    terance: 'terence',
    senneca: 'seneca',
    moliere: 'moliere',
    molière: 'moliere',
    'watchmen nee': 'watchman nee',
    'watchman-nee': 'watchman nee',
    gst: 'gst',
    nee: 'nee',
}

/** Levenshtein distance, bounded: returns limit + 1 as soon as it is exceeded. */
export function editDistance(a, b, limit = 2) {
    if (a === b) return 0
    const la = a.length
    const lb = b.length
    if (Math.abs(la - lb) > limit) return limit + 1
    if (la === 0 || lb === 0) return Math.max(la, lb)

    let previous = Array.from({ length: lb + 1 }, (_, i) => i)
    for (let i = 1; i <= la; i += 1) {
        const current = [i]
        let rowMin = i
        for (let j = 1; j <= lb; j += 1) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1
            current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + cost)
            if (current[j] < rowMin) rowMin = current[j]
        }
        if (rowMin > limit) return limit + 1
        previous = current
    }
    return previous[lb]
}

/** How much slack a word gets: short words are matched exactly. */
function toleranceFor(token) {
    if (token.length <= 3) return 0
    if (token.length <= 5) return 1
    return 2
}

function haystack(item) {
    return [
        item.title,
        item.subtitle,
        item.code,
        item.author,
        item.publisher,
        ...(item.topics || []),
        ...(item.tags || []),
        item.description,
        item.department,
        item.faculty,
        item.domain,
        item.level,
        item.material_type,
        item.group,
        item.translator,
    ]
        .filter(Boolean)
        .map(text)
        .join(' ')
}

export function searchTokens(query) {
    return text(query).split(/\s+/).filter(Boolean)
}

/** The catalogue's spelling of a word the reader typed. */
export function normaliseToken(token) {
    return NAME_ALIASES[token] || token
}

/**
 * True when one word of the query is found in the record's text.
 *
 * Exact and prefix matches are cheap; the edit-distance pass only runs for
 * words long enough to survive a typo, and only against words of similar
 * length, so a 300-document search stays instant on a phone.
 */
export function tokenMatches(hay, token) {
    const wanted = normaliseToken(token)
    if (!wanted) return true
    if (hay.includes(wanted)) return true

    // Every word in the record, with punctuation stripped, for prefix and fuzzy
    // comparison. Built once per call; the haystack is short.
    const words = hay.match(/[a-z0-9\u00c0-\u024f]+/g) || []

    if (wanted.length >= 3 && words.some((word) => word.startsWith(wanted))) return true

    const limit = toleranceFor(wanted)
    if (limit === 0) return false
    return words.some(
        (word) =>
            Math.abs(word.length - wanted.length) <= limit &&
            editDistance(word, wanted, limit) <= limit
    )
}

/** True when every word of `query` is found in the record. Empty query matches all. */
export function matchesLibraryQuery(item, query) {
    const tokens = searchTokens(query)
    if (tokens.length === 0) return true
    if (!item) return false
    const hay = haystack(item)
    return tokens.every((token) => tokenMatches(hay, token))
}

/** Filters a list, keeping the given order. */
export function searchLibrary(items, query) {
    if (!Array.isArray(items)) return []
    if (searchTokens(query).length === 0) return items
    return items.filter((item) => matchesLibraryQuery(item, query))
}

/**
 * What to suggest when a search finds nothing.
 *
 * Walks back from the whole query to its separate words, and collects the
 * catalogue's own titles and authors that are one keystroke away — so the
 * reader gets "Oedipus the King" or "Sophocles" back rather than a blank page.
 */
export function suggestCorrections(items, query, limit = 4) {
    const tokens = searchTokens(query).filter((token) => token.length >= 4)
    if (!Array.isArray(items) || tokens.length === 0) return []

    const suggestions = []
    const seen = new Set()

    for (const item of items) {
        for (const field of [item.title, item.author, item.code]) {
            if (!field) continue
            const value = text(field)
            const valueTokens = value.match(/[a-z0-9\u00c0-\u024f]+/g) || []
            const near = tokens.some((token) =>
                valueTokens.some(
                    (word) =>
                        word.length >= 4 &&
                        editDistance(word, normaliseToken(token), 2) <= 2
                )
            )
            const key = `${item.id}|${field}`
            if (near && !seen.has(key)) {
                seen.add(key)
                suggestions.push({ item, label: field, field: field === item.author ? 'author' : 'title' })
            }
            if (suggestions.length >= limit) return suggestions
        }
    }
    return suggestions
}
