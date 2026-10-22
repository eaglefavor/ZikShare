/**
 * Presentation logic for the library: filtering, sorting and shelf grouping.
 *
 * Kept out of the page component so the rules can be tested directly, and so
 * /library and /search cannot drift apart again.
 */
import { FRESHER_LIBRARY_DOMAINS, FRESHER_LIBRARY_DOMAIN_ORDER } from './fresherLibrary'
import { matchesLibraryQuery } from './librarySearch'

export const SORT_OPTIONS = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'newest', label: 'Newest first' },
    { value: 'title', label: 'Title A–Z' },
    { value: 'pages', label: 'Longest first' },
]

export const EMPTY_FILTERS = {
    query: '',
    faculty: 'All',
    department: 'All',
    level: 'All',
    type: 'All',
    domain: 'All',
}

/** Domains with real counts, in display order. */
export function domainSummary(items) {
    if (!items) {
        return FRESHER_LIBRARY_DOMAINS.map((d) => ({ ...d, emoji: d.emoji || '📚' }))
    }
    return FRESHER_LIBRARY_DOMAIN_ORDER.map((name) => ({
        name,
        emoji: FRESHER_LIBRARY_DOMAINS.find((d) => d.name === name)?.emoji || '📚',
        count: items.filter((item) => item.domain === name).length,
    })).filter((d) => d.count > 0)
}

export function activeFilterCount(filters) {
    const keys = ['faculty', 'department', 'level', 'type', 'domain']
    return keys.filter((key) => filters[key] && filters[key] !== 'All').length
}

export function filterLibrary(items, filters) {
    if (!Array.isArray(items)) return []
    const f = { ...EMPTY_FILTERS, ...filters }

    return items.filter((item) => {
        if (!matchesLibraryQuery(item, f.query)) return false
        if (f.faculty !== 'All' && item.faculty !== f.faculty) return false
        if (f.level !== 'All' && item.level !== f.level) return false
        if (f.type !== 'All' && item.material_type !== f.type) return false
        if (f.domain !== 'All' && item.domain !== f.domain) return false
        if (f.department !== 'All') {
            const inDepartment =
                item.department === f.department ||
                (item.title || '').toLowerCase().includes(f.department.toLowerCase())
            if (!inDepartment) return false
        }
        return true
    })
}

export function sortLibrary(items, sortBy) {
    const list = [...items]
    switch (sortBy) {
        case 'newest':
            return list.sort((a, b) => (b.year || 0) - (a.year || 0) || a.title.localeCompare(b.title))
        case 'title':
            return list.sort((a, b) => a.title.localeCompare(b.title))
        case 'pages':
            return list.sort((a, b) => (b.page_count || 0) - (a.page_count || 0))
        default:
            return list
    }
}

/**
 * Groups items into shelves in domain order. Only used when the reader is not
 * filtering — a filtered result set is a plain grid.
 */
export function groupByShelf(items) {
    const shelves = FRESHER_LIBRARY_DOMAIN_ORDER.map((name) => ({
        name,
        emoji: FRESHER_LIBRARY_DOMAINS.find((d) => d.name === name)?.emoji || '📚',
        items: items.filter((item) => item.domain === name),
    })).filter((shelf) => shelf.items.length > 0)

    const known = new Set(FRESHER_LIBRARY_DOMAIN_ORDER)
    const rest = items.filter((item) => !known.has(item.domain))
    if (rest.length > 0) {
        shelves.push({ name: 'More material', emoji: '📚', items: rest })
    }
    return shelves
}
