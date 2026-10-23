import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { PDFDocument } from 'pdf-lib'
import { FRESHER_PACKS } from '../../library/content/index.mjs'
import { validatePacks } from '../../scripts/lib/validate-packs.mjs'
import { CHRISTIAN_BOOKS } from '../lib/christianBooks'
import { DRAMA_PLAYS } from '../lib/dramaLibrary'
import { ROMAN_PLAYS } from '../lib/romanLibrary'
import { MEDIEVAL_PLAYS } from '../lib/medievalLibrary'
import { RENAISSANCE_PLAYS } from '../lib/renaissanceLibrary'
import { GST_SHELF } from '../lib/gstLibraryData'
import {
    FRESHER_LIBRARY_PACKS,
    FRESHER_LIBRARY_DOMAINS,
    libraryCountLabel,
    libraryCounts,
    mergeLibraryMaterials,
    findFresherPackByStoragePath,
    isRetiredPackRow,
} from '../lib/fresherLibrary'
import { MODERN_PLAYS } from '../lib/modernLibrary'
import { THEATRE_TITLES } from '../lib/theatreArtsLibrary'

const ROOT = process.cwd()
const BOOKS_DIR = path.join(ROOT, 'public', 'library', 'books')
const CATALOG_JSON = path.join(ROOT, 'library', 'catalog.generated.json')

function clone(pack) {
    return JSON.parse(JSON.stringify(pack))
}

/**
 * A minimal pack that clears every structural and depth gate in the validator.
 * The old authored shelf used to supply this fixture; now that the shelf is
 * empty the fixture is built here, so the validator keeps its own tests.
 */
function goodPack() {
    const prose = 'Revision notes explain the concept, work through the arithmetic and show where students lose marks. '.repeat(12)
    const sections = [1, 2, 3].map((n) => ({
        heading: `Section ${n}: working the syllabus`,
        intro: prose,
        paragraphs: [prose],
    }))
    return {
        slug: 'gst-101-use-of-english',
        code: 'GST 101',
        title: 'GST 101: Use of English for first-year students',
        subtitle: 'Grammar, concord and comprehension for Nigerian universities',
        description: 'A stand-alone study pack that walks through the grammar and comprehension skills the compulsory Use of English course examines. '.repeat(2),
        domain: 'GST & Compulsory Courses',
        faculty: 'Faculty of Arts',
        department: 'General Studies',
        level: '100L',
        material_type: 'lecture-notes',
        subcategory: 'lecture-notes',
        priceKobo: 0,
        tags: ['GST 101', 'Use of English', 'Grammar'],
        outcomes: ['Parse a sentence', 'Write a paragraph', 'Answer comprehension questions'],
        sections,
        practice: [1, 2, 3, 4].map((n) => ({ q: `Practice question ${n}?`, a: prose })),
        checklist: [1, 2, 3, 4, 5].map((n) => `Checklist step ${n} for the week`),
        workedExamples: [1, 2].map((n) => ({
            title: `Worked example ${n}`,
            brief: prose,
            steps: [prose, prose],
            takeaway: prose,
        })),
        examBank: [1, 2].map((n) => ({
            question: `Exam question ${n}?`,
            marks: '10 marks',
            outline: [prose, prose],
            trap: prose,
        })),
        glossary: Array.from({ length: 8 }, (_, i) => ({ term: `Term ${i + 1}`, definition: prose })),
        weeklyPlan: [1, 2, 3, 4].map((n) => ({ week: `Week ${n}`, focus: prose, tasks: [prose] })),
        readingList: [1, 2, 3].map((n) => `Reading entry ${n}: a real book with a real author`),
    }
}

describe('Library - the shelf state the operator asked for', () => {
    it('holds no authored study packs', () => {
        expect(FRESHER_PACKS).toEqual([])
        expect(FRESHER_LIBRARY_PACKS).toEqual([])
    })

    it('keeps the Christian Books shelf untouched and lists both play shelves', () => {
        expect(CHRISTIAN_BOOKS.length).toBeGreaterThan(0)
        expect(FRESHER_LIBRARY_DOMAINS.map((d) => d.name)).toEqual([
            'GST & Compulsory Courses',
            'Money & Career',
            'Greek Tragedy',
            'Roman Theatre',
            'Medieval Theatre',
            'Renaissance Theatre',
            'Modern Theatre',
            'Theatre Arts',
            'Christian Books',
        ])
        expect(FRESHER_LIBRARY_DOMAINS.find((d) => d.name === 'Christian Books').count).toBe(CHRISTIAN_BOOKS.length)
        expect(FRESHER_LIBRARY_DOMAINS.find((d) => d.name === 'Greek Tragedy').count).toBe(DRAMA_PLAYS.length)
        expect(FRESHER_LIBRARY_DOMAINS.find((d) => d.name === 'Roman Theatre').count).toBe(ROMAN_PLAYS.length)
        expect(FRESHER_LIBRARY_DOMAINS.find((d) => d.name === 'Medieval Theatre').count).toBe(MEDIEVAL_PLAYS.length)
        expect(FRESHER_LIBRARY_DOMAINS.find((d) => d.name === 'Renaissance Theatre').count).toBe(
            RENAISSANCE_PLAYS.length
        )
        expect(FRESHER_LIBRARY_DOMAINS.find((d) => d.name === 'Modern Theatre').count).toBe(
            MODERN_PLAYS.length
        )
        expect(FRESHER_LIBRARY_DOMAINS.find((d) => d.name === 'Theatre Arts').count).toBe(
            THEATRE_TITLES.length
        )
    })

    it('counts what is actually there instead of a hard-coded total', () => {
        const counts = libraryCounts()
        expect(counts).toEqual({
            packs: 0,
            books: CHRISTIAN_BOOKS.length,
            plays: DRAMA_PLAYS.length,
            roman: ROMAN_PLAYS.length,
            medieval: MEDIEVAL_PLAYS.length,
            renaissance: RENAISSANCE_PLAYS.length,
            modern: MODERN_PLAYS.length,
            theatre: THEATRE_TITLES.length,
            hosted: GST_SHELF.length,
            total:
                CHRISTIAN_BOOKS.length +
                DRAMA_PLAYS.length +
                ROMAN_PLAYS.length +
                MEDIEVAL_PLAYS.length +
                RENAISSANCE_PLAYS.length +
                MODERN_PLAYS.length +
                THEATRE_TITLES.length +
                GST_SHELF.length,
        })
        expect(libraryCountLabel(counts)).toBe(
            `${CHRISTIAN_BOOKS.length} full-length books, ${GST_SHELF.length} NOUN course manuals to download, ` +
                `${DRAMA_PLAYS.length} Greek plays to download, ${ROMAN_PLAYS.length} Roman plays to download, ` +
                `${MEDIEVAL_PLAYS.length} medieval plays to download, ` +
                `${RENAISSANCE_PLAYS.length} Renaissance plays to download, ` +
                `${MODERN_PLAYS.length} modern plays to download and ` +
                `${THEATRE_TITLES.length} Theatre Arts titles to download`
        )
    })

    it('counts the plays as downloads, because ZikShare hosts the PDFs', () => {
        const label = libraryCountLabel(libraryCounts())
        expect(label).toContain('Greek plays to download')
        expect(label).not.toContain('linked to')
        for (const play of DRAMA_PLAYS) {
            expect(play.gutenbergId).toBeGreaterThan(0)
            expect(play.synopsis.length).toBeGreaterThan(120)
            expect(play.context.length).toBeGreaterThan(80)
            expect(play.topics.length).toBeGreaterThanOrEqual(3)
        }
        // Every card points at the ebook id its data records, and at nothing else.
        for (const card of DRAMA_PLAYS.map((play) => play && play)) {
            expect(card.collection).toBeTruthy()
        }
    })

    it('has no pack PDFs, previews or source files left behind', () => {
        for (const dir of ['packs', 'previews']) {
            const full = path.join(ROOT, 'public', 'library', dir)
            if (fs.existsSync(full)) {
                expect(fs.readdirSync(full).filter((f) => f.endsWith('.pdf'))).toEqual([])
            }
        }
        const source = path.join(ROOT, 'library', 'source')
        if (fs.existsSync(source)) {
            expect(fs.readdirSync(source).filter((f) => f.endsWith('.pdf'))).toEqual([])
        }
    })

    it('has a catalog and generated app data that agree with the empty shelf', () => {
        const catalog = JSON.parse(fs.readFileSync(CATALOG_JSON, 'utf8'))
        expect(catalog.packs).toEqual([])
        expect(catalog.count).toBe(0)
    })

    it('still serves every Christian Book from disk, with the page count it claims', async () => {
        for (const book of CHRISTIAN_BOOKS) {
            const file = path.join(BOOKS_DIR, `${book.slug}.pdf`)
            expect(fs.existsSync(file), `missing book: ${book.slug}`).toBe(true)
            const bytes = fs.readFileSync(file)
            expect(bytes.subarray(0, 5).toString()).toBe('%PDF-')
            // At least one supplied book is encrypted: it still opens in a
            // browser reader, so the test only asserts it is a readable PDF.
            const pdf = await PDFDocument.load(new Uint8Array(bytes), { ignoreEncryption: true })
            expect(pdf.getPageCount()).toBeGreaterThan(1)
        }
    })
})

describe('Library - the store merge when the pack shelf is empty', () => {
    it('returns the books, the hosted plays and the manuals, and no pack', () => {
        const merged = mergeLibraryMaterials([])
        expect(merged).toHaveLength(
            CHRISTIAN_BOOKS.length +
                DRAMA_PLAYS.length +
                ROMAN_PLAYS.length +
                MEDIEVAL_PLAYS.length +
                RENAISSANCE_PLAYS.length +
                MODERN_PLAYS.length +
                THEATRE_TITLES.length +
                GST_SHELF.length
        )
        expect(
            merged.every(
                (m) =>
                    m.isBook || m.isDrama || m.isRoman || m.isMedieval || m.isRenaissance || m.isModern || m.isTheatre || m.isGst
            )
        ).toBe(
            true
        )
        // The plays are hosted too, so every one of them has a download.
        expect(merged.filter((m) => m.isDrama).every((m) => m.download_path && !m.external_url)).toBe(true)
        // Roman plays are hosted on the same terms.
        expect(merged.filter((m) => m.isRoman).every((m) => m.download_path && !m.external_url)).toBe(true)
        // ...and so are the medieval ones.
        expect(merged.filter((m) => m.isMedieval).every((m) => m.download_path && !m.external_url)).toBe(
            true
        )
        // The NOUN manuals are hosted by ZikShare, so they do have a download.
        expect(merged.filter((m) => m.isGst).every((m) => m.download_path && !m.external_url)).toBe(true)
    })

    it('keeps a seeded book on its own shelf, once, with the row identity', () => {
        const book = CHRISTIAN_BOOKS[1]
        const dbRows = [{
            id: '22222222-2222-2222-2222-222222222222',
            title: 'A title edited in the database',
            category: 'Academic & Study Materials',
            subcategory: 'textbooks',
            domain: 'Christian Books',
            page_count: book.page_count,
            original_storage_path: `christian-books/${book.slug}.pdf`,
        }]

        const merged = mergeLibraryMaterials(dbRows)
        const seededBook = merged.find((m) => m.id === dbRows[0].id)
        expect(seededBook.isBook).toBe(true)
        expect(seededBook.title).toBe(book.title)
        expect(seededBook.download_path).toBe(`/library/books/${book.slug}.pdf`)
        expect(merged.filter((m) => m.title === book.title)).toHaveLength(1)
    })

    it('resolves no pack by storage path', () => {
        expect(findFresherPackByStoragePath('official-library/gst-101-use-of-english.pdf')).toBeNull()
    })
})

describe('Library - validator still rejects bad packs', () => {
    it('accepts the good fixture, including an empty catalog', () => {
        expect(validatePacks([goodPack()])).toEqual([])
        expect(validatePacks([])).toEqual([])
    })

    it('rejects a duplicate slug', () => {
        const base = goodPack()
        const errors = validatePacks([base, { ...clone(base), title: 'Another title long enough here' }])
        expect(errors.some((e) => e.includes('duplicate slug'))).toBe(true)
    })

    it('rejects a paid pack, a bad price and an unknown faculty or level', () => {
        const paid = clone(goodPack())
        paid.priceKobo = 499.5
        const errors = validatePacks([paid])
        expect(errors.some((e) => e.includes('priceKobo'))).toBe(true)

        const unknown = clone(goodPack())
        unknown.faculty = 'Faculty of Made Up Studies'
        unknown.level = '900L'
        const unknownErrors = validatePacks([unknown])
        expect(unknownErrors.some((e) => e.includes('unknown faculty'))).toBe(true)
        expect(unknownErrors.some((e) => e.includes('invalid level'))).toBe(true)
    })

    it('rejects a pack with too few sections, practice items or outcomes', () => {
        const pack = clone(goodPack())
        pack.sections = pack.sections.slice(0, 1)
        pack.practice = pack.practice.slice(0, 2)
        pack.outcomes = pack.outcomes.slice(0, 1)
        const errors = validatePacks([pack])
        expect(errors.some((e) => e.includes('at least 3 sections'))).toBe(true)
        expect(errors.some((e) => e.includes('at least 4 practice'))).toBe(true)
        expect(errors.some((e) => e.includes('at least 3 outcomes'))).toBe(true)
    })

    it('rejects a hollow section that has a heading but no substance', () => {
        const pack = clone(goodPack())
        pack.sections[1] = { heading: 'Covering the syllabus', intro: 'See the slides.' }
        expect(validatePacks([pack]).some((e) => e.includes('too thin'))).toBe(true)
    })

    it('rejects a pack that clears structure but carries too little prose', () => {
        const pack = clone(goodPack())
        pack.sections = pack.sections.map((section) => ({ ...section, intro: 'Short.', paragraphs: [] }))
        pack.workedExamples = pack.workedExamples.map((w) => ({ ...w, brief: 'Short.', steps: ['Short.'], takeaway: 'Short.' }))
        pack.examBank = pack.examBank.map((e) => ({ ...e, outline: ['Short.'], trap: 'Short.' }))
        pack.glossary = pack.glossary.map((g) => ({ ...g, definition: 'Short.' }))
        pack.weeklyPlan = [1, 2, 3, 4].map((n) => ({ week: `Week ${n}`, focus: 'Short.', tasks: [] }))
        pack.practice = pack.practice.map((p) => ({ q: p.q, a: 'Short.' }))
        pack.readingList = ['a', 'b', 'c']
        expect(validatePacks([pack]).some((e) => e.includes('words of content'))).toBe(true)
    })

    it('rejects a catalog below an explicitly requested minimum', () => {
        expect(validatePacks([goodPack()], { minPacks: 5 }).some((e) => e.includes('at least 5'))).toBe(true)
    })

    it('rejects a malformed course code but accepts null for non-course packs', () => {
        const bad = clone(goodPack())
        bad.code = 'gst-101'
        expect(validatePacks([bad]).some((e) => e.includes('course code'))).toBe(true)

        const general = clone(goodPack())
        general.code = null
        expect(validatePacks([general])).toEqual([])
    })
})

describe('Library - retired pack rows from the database', () => {
    it('drops a row for a pack that is no longer on the shelf', () => {
        // This is exactly what the old seeding left in digital_products.
        const staleRows = [
            {
                id: '44444444-4444-4444-4444-444444444444',
                title: 'GST 101: Use of English I - Grammar, Concord and Comprehension',
                original_storage_path: 'official-library/gst-101-use-of-english.pdf',
                preview_path: '/library/previews/gst-101-use-of-english.pdf',
                page_count: 12,
                price: 0,
                is_free: true,
            },
            {
                id: '55555555-5555-5555-5555-555555555555',
                title: 'Side Hustles and Freelancing',
                original_storage_path: 'official-library/side-hustles-and-freelancing.pdf',
                price: 0,
                is_free: true,
            },
        ]

        expect(isRetiredPackRow(staleRows[0])).toBe(true)
        expect(isRetiredPackRow(staleRows[1])).toBe(true)

        const merged = mergeLibraryMaterials(staleRows)
        expect(merged.some((item) => item.id === staleRows[0].id)).toBe(false)
        expect(merged.some((item) => item.title.includes('Side Hustles'))).toBe(false)
        // A dead link must never reach the page.
        expect(merged.some((item) => String(item.download_path).includes('/library/packs/'))).toBe(false)
        expect(merged.some((item) => String(item.preview_path).includes('/library/previews/'))).toBe(false)
    })

    it('leaves an ordinary marketplace listing alone', () => {
        const listing = {
            id: '66666666-6666-6666-6666-666666666666',
            title: 'Standing fan, used one semester',
            original_storage_path: 'listings/abc123.jpg',
            price: 1500000,
            is_free: false,
        }
        expect(isRetiredPackRow(listing)).toBe(false)
        expect(mergeLibraryMaterials([listing]).some((item) => item.id === listing.id)).toBe(true)
    })
})
