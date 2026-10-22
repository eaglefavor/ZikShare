import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { PDFDocument } from 'pdf-lib'
import { FRESHER_PACKS } from '../../library/content/index.mjs'
import { validatePacks } from '../../scripts/lib/validate-packs.mjs'
import { UNIZIK_FACULTIES, ACADEMIC_LEVELS, ACADEMIC_MATERIAL_TYPES } from '../lib/categories'
import { CHRISTIAN_BOOKS } from '../lib/christianBooks'
import {
    FRESHER_LIBRARY_PACKS,
    FRESHER_LIBRARY_DOMAINS,
    mergeLibraryMaterials,
    findFresherPackByStoragePath,
} from '../lib/fresherLibrary'

const ROOT = process.cwd()
const SOURCE_DIR = path.join(ROOT, 'library', 'source')
const PREVIEW_DIR = path.join(ROOT, 'public', 'library', 'previews')
const CATALOG_JSON = path.join(ROOT, 'library', 'catalog.generated.json')

function clone(pack) {
    return JSON.parse(JSON.stringify(pack))
}

describe('Fresher PDF library - authored content', () => {
    it('authors at least 50 packs', () => {
        expect(FRESHER_PACKS.length).toBeGreaterThanOrEqual(50)
    })

    it('passes the same validator the build script uses', () => {
        expect(validatePacks(FRESHER_PACKS)).toEqual([])
    })

    it('covers every UNIZIK faculty/unit name used by the library filters', () => {
        const used = new Set(FRESHER_PACKS.map((p) => p.faculty))
        const missing = UNIZIK_FACULTIES.map((f) => f.name).filter((name) => !used.has(name))
        expect(missing).toEqual([])
    })

    it('spreads content across at least six distinct domains with no thin domain', () => {
        expect(FRESHER_LIBRARY_DOMAINS.length).toBeGreaterThanOrEqual(6)
        // Departmental Archive is a single index pack by design: it carries the
        // whole departmental session record rather than one pack per year band.
        for (const domain of FRESHER_LIBRARY_DOMAINS.filter((d) => d.name !== 'Departmental Archive')) {
            expect(domain.count, `${domain.name} has only ${domain.count} packs`).toBeGreaterThanOrEqual(3)
        }
    })

    it('makes the Faculty of Arts and Theatre & Film Studies the deepest coverage', () => {
        const arts = FRESHER_PACKS.filter((p) => p.faculty === 'Faculty of Arts')
        const theatre = FRESHER_PACKS.filter((p) => p.department === 'Theatre & Film Studies')
        // General Studies is a directorate of compulsory courses, not a faculty,
        // so it is excluded from the faculty-depth comparison.
        const otherFaculties = [...new Set(
            FRESHER_PACKS
                .filter((p) => p.faculty !== 'Faculty of Arts' && p.faculty.startsWith('Faculty of'))
                .map((p) => p.faculty)
        )]
        expect(theatre.length).toBeGreaterThanOrEqual(10)
        expect(arts.length).toBeGreaterThan(Math.max(...otherFaculties.map(
            (f) => FRESHER_PACKS.filter((p) => p.faculty === f).length
        )))
        // Other departments are kept, not demoted away.
        expect(otherFaculties.length).toBeGreaterThanOrEqual(10)
    })

    it('demarcates every archived outline by year with a source', () => {
        const archived = FRESHER_PACKS.filter((p) => p.archive)
        expect(archived.length).toBeGreaterThanOrEqual(5)
        for (const pack of archived) {
            const years = pack.archive.sessions.map((s) => s.year)
            expect(new Set(years).size).toBe(years.length)
            expect(years.length).toBeGreaterThanOrEqual(2)
            for (const session of pack.archive.sessions) {
                expect(session.label).toBeTruthy()
                if (session.status !== 'current') {
                    expect(session.source, `${pack.slug} ${session.year} needs a source`).toBeTruthy()
                    expect(session.retrieved).toMatch(/^\d{4}-\d{2}-\d{2}$/)
                }
            }
            // Exactly one band may be presented as the current working map.
            expect(pack.archive.sessions.filter((s) => s.status === 'current').length).toBe(1)
        }
    })

    it('keeps every pack free and gives each one a public download path', () => {
        for (const pack of FRESHER_LIBRARY_PACKS) {
            expect(pack.priceKobo, `${pack.slug} must be free`).toBe(0)
            expect(pack.download_path).toBe(`/library/packs/${pack.slug}.pdf`)
            expect(fs.existsSync(path.join(ROOT, 'public', pack.download_path))).toBe(true)
        }
    })

    it('uses only valid academic levels and material types', () => {
        for (const pack of FRESHER_PACKS) {
            expect(ACADEMIC_LEVELS).toContain(pack.level)
            expect(ACADEMIC_MATERIAL_TYPES.map((t) => t.id)).toContain(pack.material_type)
        }
    })

    it('never ships placeholder text', () => {
        const banned = /lorem ipsum|\bTODO\b|\bTBD\b|placeholder|\[insert/i
        for (const pack of FRESHER_PACKS) {
            const surface = [pack.title, pack.subtitle, pack.description, ...pack.outcomes].join(' ')
            expect(banned.test(surface), `placeholder text found in ${pack.slug}`).toBe(false)
        }
    })
})

describe('Fresher PDF library - validator rejects bad packs', () => {
    const base = FRESHER_PACKS[0]

    it('rejects a duplicate slug', () => {
        const packs = [clone(base), { ...clone(FRESHER_PACKS[1]), slug: base.slug }]
        const errors = validatePacks(packs, { minPacks: 1 })
        expect(errors.some((e) => e.includes('duplicate slug'))).toBe(true)
    })

    it('rejects a price that is not an integer kobo amount', () => {
        const pack = clone(base)
        pack.priceKobo = 499.5
        expect(validatePacks([pack], { minPacks: 1 }).some((e) => e.includes('priceKobo'))).toBe(true)
    })

    it('rejects an unknown faculty and an invalid level', () => {
        const pack = clone(base)
        pack.faculty = 'Faculty of Made Up Studies'
        pack.level = '900L'
        const errors = validatePacks([pack], { minPacks: 1 })
        expect(errors.some((e) => e.includes('unknown faculty'))).toBe(true)
        expect(errors.some((e) => e.includes('invalid level'))).toBe(true)
    })

    it('rejects a pack with too few sections, practice items or outcomes', () => {
        const pack = clone(base)
        pack.sections = pack.sections.slice(0, 1)
        pack.practice = pack.practice.slice(0, 2)
        pack.outcomes = pack.outcomes.slice(0, 1)
        const errors = validatePacks([pack], { minPacks: 1 })
        expect(errors.some((e) => e.includes('at least 3 sections'))).toBe(true)
        expect(errors.some((e) => e.includes('at least 4 practice'))).toBe(true)
        expect(errors.some((e) => e.includes('at least 3 outcomes'))).toBe(true)
    })

    it('rejects a hollow section that has a heading but no substance', () => {
        const pack = clone(base)
        pack.sections = pack.sections.map((s) => ({ ...s }))
        pack.sections[1] = { heading: 'Covering the syllabus', intro: 'See the slides.' }
        expect(validatePacks([pack], { minPacks: 1 }).some((e) => e.includes('too thin'))).toBe(true)
    })

    it('rejects a catalog that is short of the 50-pack requirement', () => {
        expect(validatePacks(FRESHER_PACKS.slice(0, 10)).some((e) => e.includes('at least 50'))).toBe(true)
    })

    it('rejects a malformed course code but accepts null for non-course packs', () => {
        const bad = clone(base)
        bad.code = 'gst-101'
        expect(validatePacks([bad], { minPacks: 1 }).some((e) => e.includes('course code'))).toBe(true)

        const general = clone(base)
        general.code = null
        expect(validatePacks([general], { minPacks: 1 })).toEqual([])
    })
})

describe('Fresher PDF library - generated files', () => {
    it('generated app metadata matches the built catalog and authored packs', async () => {
        const catalog = JSON.parse(fs.readFileSync(CATALOG_JSON, 'utf8'))
        expect(catalog.packs).toHaveLength(FRESHER_PACKS.length)
        expect(FRESHER_LIBRARY_PACKS).toHaveLength(FRESHER_PACKS.length)

        const catalogSlugs = catalog.packs.map((p) => p.slug).sort()
        expect(FRESHER_LIBRARY_PACKS.map((p) => p.slug).sort()).toEqual(catalogSlugs)

        for (const pack of catalog.packs) {
            const appPack = FRESHER_LIBRARY_PACKS.find((p) => p.slug === pack.slug)
            expect(appPack.page_count).toBe(pack.page_count)
            expect(appPack.storage_path).toBe(`official-library/${pack.slug}.pdf`)
            expect(appPack.preview_path).toBe(`/library/previews/${pack.slug}.pdf`)
        }
    })

    it('every pack has a full PDF and a public preview on disk', () => {
        for (const pack of FRESHER_LIBRARY_PACKS) {
            expect(fs.existsSync(path.join(SOURCE_DIR, `${pack.slug}.pdf`)), `missing full PDF: ${pack.slug}`).toBe(true)
            expect(fs.existsSync(path.join(PREVIEW_DIR, `${pack.slug}.pdf`)), `missing preview: ${pack.slug}`).toBe(true)
        }
    })

    it('PDFs open, match their recorded page counts and previews are truncated', async () => {
        for (const pack of FRESHER_LIBRARY_PACKS) {
            const fullBytes = fs.readFileSync(path.join(SOURCE_DIR, `${pack.slug}.pdf`))
            const previewBytes = fs.readFileSync(path.join(PREVIEW_DIR, `${pack.slug}.pdf`))

            expect(fullBytes.subarray(0, 5).toString()).toBe('%PDF-')
            expect(previewBytes.subarray(0, 5).toString()).toBe('%PDF-')

            const full = await PDFDocument.load(new Uint8Array(fullBytes))
            const preview = await PDFDocument.load(new Uint8Array(previewBytes))

            expect(full.getPageCount(), `${pack.slug} page count`).toBe(pack.page_count)
            expect(full.getPageCount()).toBeGreaterThanOrEqual(5)
            expect(preview.getPageCount()).toBe(3)
            expect(preview.getPageCount()).toBeLessThan(full.getPageCount())
            expect(previewBytes.length).toBeLessThan(fullBytes.length)
            expect(fullBytes.length).toBe(pack.file_size_bytes)
        }
    })

    it('ships no orphan preview PDFs', () => {
        const slugs = new Set(FRESHER_LIBRARY_PACKS.map((p) => `${p.slug}.pdf`))
        const files = fs.readdirSync(PREVIEW_DIR).filter((f) => f.endsWith('.pdf'))
        expect(files.filter((f) => !slugs.has(f))).toEqual([])
    })

    it('uses readable, unique titles and descriptions long enough to be useful', () => {
        const titles = new Set()
        for (const pack of FRESHER_LIBRARY_PACKS) {
            expect(titles.has(pack.title.toLowerCase())).toBe(false)
            titles.add(pack.title.toLowerCase())
            expect(pack.description.length).toBeGreaterThanOrEqual(120)
            expect(pack.code === null || /^[A-Z]{2,4} \d{3}[A-Z]?$/.test(pack.code)).toBe(true)
        }
    })
})

describe('Fresher library - store merge behaviour', () => {
    it('lists unseeded packs alongside database rows without duplicating seeded ones', () => {
        const seeded = FRESHER_LIBRARY_PACKS[0]
        const dbRows = [{
            id: '11111111-1111-1111-1111-111111111111',
            title: seeded.title,
            course_code: seeded.code,
            faculty: seeded.faculty,
            department: seeded.department,
            level: seeded.level,
            subcategory: seeded.subcategory,
            domain: seeded.domain,
            price: seeded.priceKobo,
            page_count: seeded.page_count,
            file_size_bytes: seeded.file_size_bytes,
            description: seeded.description,
            original_storage_path: seeded.storage_path,
            preview_path: seeded.preview_path,
        }]

        const merged = mergeLibraryMaterials(dbRows)
        // The authored packs plus the Christian Books shelf, with the seeded
        // pack represented once by its database row.
        expect(merged).toHaveLength(FRESHER_LIBRARY_PACKS.length + CHRISTIAN_BOOKS.length)
        expect(merged.filter((m) => m.title === seeded.title)).toHaveLength(1)

        const fromDb = merged.find((m) => m.id === dbRows[0].id)
        expect(fromDb.preview_path).toBe(seeded.preview_path)
        expect(fromDb.slug).toBe(seeded.slug)

        const unseeded = merged.find((m) => m.slug === FRESHER_LIBRARY_PACKS[1].slug)
        expect(unseeded.id).toBe(`pdf-${FRESHER_LIBRARY_PACKS[1].slug}`)
        expect(unseeded.preview_path).toBe(FRESHER_LIBRARY_PACKS[1].preview_path)
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
        expect(merged).toHaveLength(FRESHER_LIBRARY_PACKS.length + CHRISTIAN_BOOKS.length)

        const seededBook = merged.find((m) => m.id === dbRows[0].id)
        expect(seededBook.isBook).toBe(true)
        expect(seededBook.title).toBe(book.title)
        expect(seededBook.author).toBe(book.author)
        expect(seededBook.download_path).toBe(`/library/books/${book.slug}.pdf`)
        expect(merged.filter((m) => m.title === book.title)).toHaveLength(1)
    })

    it('resolves a pack by its storage path', () => {
        const pack = FRESHER_LIBRARY_PACKS[5]
        expect(findFresherPackByStoragePath(pack.storage_path)?.slug).toBe(pack.slug)
        expect(findFresherPackByStoragePath('official-library/does-not-exist.pdf')).toBeNull()
    })
})
