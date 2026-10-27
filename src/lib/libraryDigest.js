/**
 * The numbers the landing page needs from the library — and nothing else.
 *
 * The catalogue is the whole library in memory: three hundred documents with
 * their synopses, about half a megabyte of text. The landing page only wants
 * per-shelf counts and one book for this week, so this module is loaded as its
 * own chunk, after the page is already readable. Importing it statically would
 * put every book record back on the critical path, which is exactly what made
 * the first screen slow on a campus connection.
 */
import { FRESHER_DOMAIN_EMOJI, FRESHER_LIBRARY_DOMAINS, libraryCounts, libraryCountLabel, mergeLibraryMaterials } from './fresherLibrary'
import { shelfOfTheWeek } from './shelfOfTheWeek'
import { SHELF_ORDER } from './shelves'

/**
 * Counts per shelf, the one-line label the landing page opens with, and the
 * shelf of the week. Every number is counted from the catalogue; none is typed.
 */
export function libraryDigest(date = new Date()) {
    const counts = libraryCounts()
    const materials = mergeLibraryMaterials([])

    const shelves = SHELF_ORDER.map((name) => {
        const domain = FRESHER_LIBRARY_DOMAINS.find((entry) => entry.name === name)
        return {
            name,
            count: domain?.count || 0,
            emoji: FRESHER_DOMAIN_EMOJI[name] || domain?.emoji || '📚',
        }
    }).filter((shelf) => shelf.count > 0)

    return {
        total: counts.total,
        label: libraryCountLabel(counts),
        counts,
        shelves,
        weekly: shelfOfTheWeek(materials, date),
    }
}
