/**
 * The library's standing promises, checked on every push.
 *
 * The rules this library has been held to are simple and absolute: every card
 * opens something real, everything is hosted here rather than linked away, no
 * count is invented, and a shelf never advertises a document that is missing.
 * This file turns those promises into failures instead of review comments.
 */
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { FRESHER_LIBRARY_DOMAINS, libraryCounts, mergeLibraryMaterials } from '../lib/fresherLibrary'
import { SHELF_INFO, shelfGaps } from '../lib/shelfGuide'
import { documentPath, documentSlug, shelfPath } from '../lib/libraryRoutes'

const ROOT = process.cwd()
const MATERIALS = mergeLibraryMaterials([])

function fileFor(url) {
    return path.join(ROOT, 'public', String(url).replace(/^\//, ''))
}

describe('Library health', { timeout: 30000 }, () => {
    it('holds exactly the documents it says it holds', () => {
        const counts = libraryCounts()
        expect(MATERIALS).toHaveLength(counts.total)
        expect(counts.total).toBe(309)

        // Every shelf's stated count is the number of documents actually on it.
        for (const shelf of FRESHER_LIBRARY_DOMAINS) {
            const onShelf = MATERIALS.filter((item) => item.domain === shelf.name)
            expect(onShelf, `${shelf.name} count`).toHaveLength(shelf.count)
        }
    })

    it('has a description and a unit for every shelf it shows', () => {
        for (const shelf of FRESHER_LIBRARY_DOMAINS) {
            const info = SHELF_INFO[shelf.name]
            expect(info, `${shelf.name} has no SHELF_INFO entry`).toBeTruthy()
            expect(info.blurb.length).toBeGreaterThan(20)
            expect(info.unit).toBeTruthy()
            expect(info.unitPlural).toBeTruthy()
        }
    })

    it('downloads every document from this site, and every file is really on disk', () => {
        const missing = []
        const external = []
        const empty = []

        for (const item of MATERIALS) {
            const url = item.download_path
            if (!url || !url.startsWith('/')) {
                external.push(`${item.title} → ${url}`)
                continue
            }
            const file = fileFor(url)
            if (!fs.existsSync(file)) {
                missing.push(url)
                continue
            }
            if (fs.statSync(file).size < 1024) empty.push(`${url} (${fs.statSync(file).size} bytes)`)
        }

        expect(external, 'documents that are not hosted here').toEqual([])
        expect(missing, 'cards pointing at a file that does not exist').toEqual([])
        expect(empty, 'files that are effectively empty').toEqual([])
    })

    it('states a page count for every document', () => {
        const withoutPages = MATERIALS.filter((item) => !item.page_count || item.page_count < 1)
        expect(withoutPages.map((item) => item.title)).toEqual([])
    })

    it('gives every document a unique address, and a shelf a readable one', () => {
        const paths = MATERIALS.map(documentPath)
        expect(new Set(paths).size).toBe(paths.length)
        for (const p of paths) expect(p).toMatch(/^\/library\/doc\/[a-z0-9-]+$/)

        for (const name of Object.keys(SHELF_INFO)) {
            expect(shelfPath(name)).toMatch(/^\/library\/shelf\/[a-z0-9-]+$/)
        }
        // Two shelves must never resolve to the same address.
        const shelfPaths = Object.keys(SHELF_INFO).map(shelfPath)
        expect(new Set(shelfPaths).size).toBe(shelfPaths.length)
    })

    it('names every gap it cannot fill, with a reason', () => {
        for (const shelf of ['Greek Tragedy', 'Medieval Theatre', 'Renaissance Theatre', 'Modern Theatre']) {
            const gaps = shelfGaps(shelf)
            expect(gaps, `${shelf} has no gap note`).toBeTruthy()
            expect(gaps.items.length).toBeGreaterThan(0)
            for (const gap of gaps.items) {
                expect(gap.label.length).toBeGreaterThan(1)
                // A reason, not just a title: the note explains why.
                expect(gap.note.length).toBeGreaterThan(40)
            }
        }
    })

    it('serves no document from another website', () => {
        // Play and manual shelves must not link out; the library is hosted here.
        const allowed = ['http://', 'https://']
        for (const item of MATERIALS) {
            if (!item.download_path) continue
            expect(allowed.some((prefix) => item.download_path.startsWith(prefix))).toBe(false)
        }
    })

    it('keeps the slugs unique, so no address resolves to two documents', () => {
        const slugs = MATERIALS.map(documentSlug)
        expect(new Set(slugs).size).toBe(slugs.length)
    })
})
