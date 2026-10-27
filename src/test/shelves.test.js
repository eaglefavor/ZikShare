/**
 * The light shelf index must say the same thing as the catalogue.
 *
 * The landing page stopped importing the three hundred book records, so its
 * shelf names, emoji and descriptions now come from `shelves.js`. That split is
 * only safe while the two agree — this is the guard that keeps them agreeing.
 */
import { describe, it, expect } from 'vitest'
import { SHELF_EMOJI, SHELF_META, SHELF_ORDER } from '../lib/shelves'
import { SHELF_INFO, shelfInfo } from '../lib/shelfGuide'
import { FRESHER_DOMAIN_EMOJI, FRESHER_LIBRARY_DOMAINS, libraryCounts } from '../lib/fresherLibrary'
import { libraryDigest } from '../lib/libraryDigest'

describe('Shelf index', () => {
    it('describes exactly the shelves the library actually holds', () => {
        const held = FRESHER_LIBRARY_DOMAINS.map((shelf) => shelf.name)
        expect(SHELF_ORDER).toEqual(held)
        for (const name of held) {
            expect(SHELF_META[name], `${name} has no description`).toBeTruthy()
            expect(SHELF_EMOJI[name], `${name} has no emoji`).toBeTruthy()
        }
    })

    it('uses the same emoji as the catalogue', () => {
        for (const name of SHELF_ORDER) {
            expect(SHELF_EMOJI[name], name).toBe(FRESHER_DOMAIN_EMOJI[name])
        }
    })

    it('keeps the library pages reading the same descriptions', () => {
        expect(SHELF_INFO).toBe(SHELF_META)
        expect(shelfInfo('Modern Theatre').blurb).toMatch(/Ibsen/)
        expect(shelfInfo('Modern Theatre').unitPlural).toBe('plays')
    })

    it('names a unit for every shelf, so no card says "1 titles"', () => {
        for (const name of SHELF_ORDER) {
            const info = SHELF_META[name]
            expect(info.unit).toBeTruthy()
            expect(info.unitPlural).toBeTruthy()
            expect(info.unitPlural).not.toBe(info.unit)
        }
    })

    it('counts what is on the shelves, from the catalogue', () => {
        const digest = libraryDigest()
        const { total } = libraryCounts()

        expect(digest.total).toBe(total)
        expect(digest.shelves.reduce((sum, shelf) => sum + shelf.count, 0)).toBe(total)
        // The label is written out in words ("31 Greek plays to download"),
        // so it is checked for the shelves it names, not for a bare total.
        expect(digest.label).toMatch(/Greek plays to download/)
        expect(digest.label).toMatch(/modern plays to download/)
        // Every count is a real shelf's, not a number typed into a component.
        for (const shelf of digest.shelves) {
            const domain = FRESHER_LIBRARY_DOMAINS.find((entry) => entry.name === shelf.name)
            expect(shelf.count, shelf.name).toBe(domain.count)
        }
    })

    it('picks a book that is really on the shelf it names', () => {
        const digest = libraryDigest()
        expect(digest.weekly).toBeTruthy()
        expect(digest.shelves.map((shelf) => shelf.name)).toContain(digest.weekly.shelf)
        expect(digest.weekly.item.title.length).toBeGreaterThan(2)
    })
})
