/**
 * One shelf, one document, one week.
 *
 * The library holds nine shelves; a reader who arrives on a Tuesday sees the
 * same nine cards every time and has no reason to open the app again. This
 * picks a shelf and one document from it for the current ISO week — derived
 * from the real catalogue, deterministic, and different next Monday.
 *
 * There is no editorial calendar and nothing is typed in by hand: every week's
 * pick is a document that is actually on the shelf, chosen by arithmetic that
 * can be tested.
 */
import { FRESHER_LIBRARY_DOMAINS } from './fresherLibrary'

/** ISO week number, 1–53. */
export function isoWeek(date = new Date()) {
    const value = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    const day = value.getUTCDay() || 7 // Monday = 1 … Sunday = 7
    value.setUTCDate(value.getUTCDate() + 4 - day)
    const yearStart = new Date(Date.UTC(value.getUTCFullYear(), 0, 1))
    return Math.ceil(((value - yearStart) / 86400000 + 1) / 7)
}

/** The Monday that starts the week containing `date`. */
export function weekStart(date = new Date()) {
    const value = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const day = value.getDay() || 7
    value.setDate(value.getDate() - (day - 1))
    value.setHours(0, 0, 0, 0)
    return value
}

/** "This week" / "Ends Sunday" copy, without inventing a date format. */
export function weekLabel(date = new Date()) {
    return `Week ${isoWeek(date)}`
}

function pickIndex(seed, length) {
    if (length <= 0) return 0
    // A small integer hash, so consecutive weeks do not walk the shelf in order.
    const mixed = Math.abs(Math.sin(seed * 12.9898) * 43758.5453)
    return Math.floor((mixed - Math.floor(mixed)) * length) % length
}

/**
 * The pick for a given week.
 *
 * Returns null rather than a placeholder when the library is empty, so the
 * caller can render nothing at all.
 */
export function shelfOfTheWeek(materials, date = new Date()) {
    if (!Array.isArray(materials) || materials.length === 0) return null

    const shelves = FRESHER_LIBRARY_DOMAINS.filter((shelf) =>
        materials.some((item) => item.domain === shelf.name)
    )
    if (shelves.length === 0) return null

    const week = isoWeek(date)
    const year = date.getFullYear()
    const shelf = shelves[pickIndex(year * 53 + week, shelves.length)]

    const onShelf = materials.filter((item) => item.domain === shelf.name)
    if (onShelf.length === 0) return null

    // A week's pick should be finishable in a week. Long reference works and
    // the second volume of anything are skipped when there is a shorter choice;
    // if a shelf holds nothing else, it is still honest to pick what is there.
    const readable = onShelf.filter(
        (item) =>
            item.page_count >= 20 &&
            item.page_count <= 220 &&
            !/volume (2|3|ii|iii)|part (two|three)/i.test(item.title)
    )
    const pool = readable.length > 0 ? readable : onShelf
    const item = pool[pickIndex(week * 31 + year, pool.length)]

    return {
        shelf: shelf.name,
        emoji: shelf.emoji,
        count: onShelf.length,
        item,
        week,
        label: weekLabel(date),
    }
}
