import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { PDFDocument } from 'pdf-lib'
import { GST_SHELF } from '../lib/gstLibraryData'
import {
    ENTREPRENEURSHIP_COURSES,
    GST_COURSES,
    GST_DOMAIN,
    NOUN_SOURCE,
    gstTotals,
    findGstCard,
    toGstCard,
} from '../lib/gstLibrary'
import { mergeLibraryMaterials, libraryCounts } from '../lib/fresherLibrary'
import { MODERN_PLAYS } from '../lib/modernLibrary'
import { THEATRE_TITLES } from '../lib/theatreArtsLibrary'

const ROOT = process.cwd()

describe('NOUN GST shelf - the files are real and hosted here', () => {
    it('holds the courses that were downloaded, and nothing invented', () => {
        expect(GST_SHELF.length).toBe(22)
        expect(GST_COURSES).toHaveLength(12)
        expect(ENTREPRENEURSHIP_COURSES).toHaveLength(10)
        expect(GST_SHELF.map((item) => item.code).sort()).toEqual([
            'GST101', 'GST102', 'GST103', 'GST104', 'GST105', 'GST107',
            'GST201', 'GST202', 'GST203', 'GST204', 'GST301', 'GST302',
            'NEE001', 'NEE002', 'NEE003', 'NEE004', 'NEE006', 'NEE007',
            'NEE008', 'NEE009', 'NEE010', 'NEE012',
        ])
    })

    it('has every catalogued PDF on disk, and the page count in the catalogue is the real one', async () => {
        for (const item of GST_SHELF) {
            // The download path is a ZikShare path, not a URL to another site.
            expect(item.download_path).toMatch(/^\/library\/gst\/[a-z0-9-]+\.pdf$/)

            const file = path.join(ROOT, 'public', item.download_path.replace(/^\//, ''))
            expect(fs.existsSync(file), `missing ${item.code} at ${item.download_path}`).toBe(true)

            const bytes = fs.readFileSync(file)
            expect(bytes.subarray(0, 5).toString()).toBe('%PDF-')
            expect(bytes.length).toBe(item.bytes)

            const pdf = await PDFDocument.load(new Uint8Array(bytes), { ignoreEncryption: true })
            expect(pdf.getPageCount(), `${item.code} page count`).toBe(item.pages)
            expect(pdf.getPageCount()).toBeGreaterThan(1)
        }
    })

    it('keeps the checksum that was measured when the file was downloaded', () => {
        for (const item of GST_SHELF) {
            expect(item.sha256).toMatch(/^[a-f0-9]{64}$/)
        }
    })

    it('has no duplicate documents', () => {
        const codes = GST_SHELF.map((item) => item.code)
        expect(new Set(codes).size).toBe(codes.length)
        const hashes = GST_SHELF.map((item) => item.sha256)
        expect(new Set(hashes).size).toBe(hashes.length)
    })
})

describe('NOUN GST shelf - every card is honest', () => {
    it('downloads from ZikShare and never links out', () => {
        for (const card of GST_SHELF.map(toGstCard)) {
            expect(card.isGst).toBe(true)
            expect(card.isExternal).toBe(false)
            expect(card.external_url).toBeUndefined()
            expect(card.download_path).toMatch(/^\/library\/gst\//)
            expect(card.page_count).toBeGreaterThan(1)
            expect(card.file_size_bytes).toBeGreaterThan(0)
            expect(card.priceKobo).toBe(0)
        }
    })

    it('credits NOUN and repeats the licence condition on every card', () => {
        for (const card of GST_SHELF.map(toGstCard)) {
            expect(card.author).toBe(NOUN_SOURCE.name)
            expect(card.publisher).toBe(NOUN_SOURCE.name)
            expect(card.source_url).toBe(NOUN_SOURCE.page)
            expect(card.source_note).toMatch(/educational use/i)
            expect(card.source_note).toMatch(/prohibits commercial use/i)
        }
    })

    it('only uses an official NOUN title that the document itself contains', () => {
        // The build script leaves titleVerified false rather than showing a
        // title it could not find in the text.
        for (const item of GST_SHELF) {
            expect(item.titleVerified, `${item.code} title not found in its PDF`).toBe(true)
            expect(item.title.length).toBeGreaterThan(3)
            expect(item.title).not.toMatch(/course title|credit unit|lorem|placeholder/i)
        }
    })

    it('tells a reader where UNIZIK numbers the course differently', () => {
        // Nigerian Peoples and Culture is GST 201 at NOUN and GST 107 at UNIZIK.
        const peoples = GST_SHELF.find((item) => item.code === 'GST201')
        expect(peoples.unizik).toMatch(/UNIZIK.+GST 107/)
        // The same course at NOUN's 105 is UNIZIK's 104.
        const hps = GST_SHELF.find((item) => item.code === 'GST105')
        expect(hps.unizik).toMatch(/UNIZIK.+GST 104/)
        for (const item of GST_SHELF) {
            expect(item.unizik.length).toBeGreaterThan(20)
        }
    })

    it('puts GST courses and the entrepreneurship modules on separate shelves', () => {
        expect(GST_COURSES.every((card) => card.domain === GST_DOMAIN)).toBe(true)
        expect(ENTREPRENEURSHIP_COURSES.every((card) => card.domain === 'Money & Career')).toBe(true)
        expect(GST_COURSES.every((card) => card.code.startsWith('GST'))).toBe(true)
        expect(ENTREPRENEURSHIP_COURSES.every((card) => card.code.startsWith('NEE'))).toBe(true)
    })

    it('covers 100, 200 and 300 level, and says nothing about 400 or 500', () => {
        const levels = new Set(GST_SHELF.map((item) => item.level))
        expect(levels).toEqual(new Set(['100L', '200L', '300L']))
        // UNIZIK's General Studies programme has no 400L or 500L course, so the
        // shelf must not pretend to have one.
        expect(GST_SHELF.some((item) => item.level === '400L' || item.level === '500L')).toBe(false)
    })
})

describe('NOUN GST shelf - how it appears in the library', () => {
    it('adds its totals to the library counts', () => {
        const counts = libraryCounts()
        expect(counts.hosted).toBe(GST_SHELF.length)
        expect(counts.total).toBe(
            counts.packs +
                counts.books +
                counts.plays +
                counts.roman +
                counts.medieval +
                counts.renaissance +
                counts.modern +
                counts.theatre +
                counts.hosted
        )
    })

    it('reports real totals for the shelf summary', () => {
        const totals = gstTotals()
        const pages = GST_SHELF.reduce((sum, item) => sum + item.pages, 0)
        expect(totals.documents).toBe(GST_SHELF.length)
        expect(totals.pages).toBe(pages)
        expect(totals.pages).toBeGreaterThan(2000)
        expect(totals.megabytes).toBeGreaterThan(20)
    })

    it('merges into the library without duplicating anything else', () => {
        const merged = mergeLibraryMaterials([])
        const hosted = merged.filter((item) => item.isGst)
        expect(hosted).toHaveLength(GST_SHELF.length)
        expect(new Set(merged.map((item) => item.id)).size).toBe(merged.length)
    })

    it('finds a card by slug', () => {
        const first = GST_SHELF[0]
        expect(findGstCard(first.slug)?.code).toBe(first.codeLabel)
        expect(findGstCard('nope')).toBeNull()
    })
})
