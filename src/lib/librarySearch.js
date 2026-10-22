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
 */

function text(value) {
    return String(value ?? '').toLowerCase()
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
    ]
        .filter(Boolean)
        .map(text)
        .join(' ')
}

export function searchTokens(query) {
    return text(query).split(/\s+/).filter(Boolean)
}

/** True when every word of `query` appears in the record. Empty query matches all. */
export function matchesLibraryQuery(item, query) {
    const tokens = searchTokens(query)
    if (tokens.length === 0) return true
    if (!item) return false
    const hay = haystack(item)
    return tokens.every((token) => hay.includes(token))
}

/** Filters a list, keeping the given order. */
export function searchLibrary(items, query) {
    if (!Array.isArray(items)) return []
    if (searchTokens(query).length === 0) return items
    return items.filter((item) => matchesLibraryQuery(item, query))
}
