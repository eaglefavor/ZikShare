import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { PDFDocument } from 'pdf-lib'
import { CHRISTIAN_BOOKS } from '../../library/content/books.mjs'
import { CHRISTIAN_BOOKS_DOMAIN, findBookByStoragePath } from '../../src/lib/christianBooks'

const ROOT = process.cwd()
const BOOKS_DIR = path.join(ROOT, 'public', 'library', 'books')
const CATALOG_JSON = path.join(ROOT, 'library', 'books.generated.json')

function readCatalog() {
    return JSON.parse(fs.readFileSync(CATALOG_JSON, 'utf8'))
}

async function pageCount(file) {
    const bytes = new Uint8Array(fs.readFileSync(file))
    const doc = await PDFDocument.load(bytes, { updateMetadata: false, ignoreEncryption: true })
    return doc.getPageCount()
}

describe('Christian Books shelf', () => {
    it('catalogues at least one book and every slug is unique', () => {
        expect(CHRISTIAN_BOOKS.length).toBeGreaterThan(0)
        const slugs = CHRISTIAN_BOOKS.map((b) => b.slug)
        expect(new Set(slugs).size).toBe(slugs.length)
    })

    it('describes every book honestly enough to be useful', () => {
        for (const book of CHRISTIAN_BOOKS) {
            expect(book.title.length).toBeGreaterThan(3)
            expect(book.author.length).toBeGreaterThan(3)
            expect(book.description.length).toBeGreaterThan(120)
            expect(book.topics.length).toBeGreaterThanOrEqual(2)
            expect(['publisher-copyright', 'edition-claims-public-domain', 'unverified']).toContain(book.rights)
        }
    })

    it('has a generated catalogue that matches the source metadata', () => {
        const catalog = readCatalog()
        expect(catalog.domain).toBe(CHRISTIAN_BOOKS_DOMAIN)
        expect(catalog.books.map((b) => b.slug).sort()).toEqual(CHRISTIAN_BOOKS.map((b) => b.slug).sort())
    })

    it('serves a real PDF for every book, at the page count the catalogue claims', async () => {
        const catalog = readCatalog()
        for (const book of catalog.books) {
            const file = path.join(BOOKS_DIR, `${book.slug}.pdf`)
            expect(fs.existsSync(file), `${book.slug} is missing`).toBe(true)
            expect(book.download_path).toBe(`/library/books/${book.slug}.pdf`)
            expect(book.page_count).toBeGreaterThan(9)
            expect(await pageCount(file)).toBe(book.page_count)
            expect(fs.statSync(file).size).toBe(book.file_size_bytes)
        }
    })

    it('has a rendered cover for every book, next to its PDF', () => {
        for (const book of CHRISTIAN_BOOKS) {
            const cover = path.join(BOOKS_DIR, 'covers', `${book.slug}.jpg`)
            expect(fs.existsSync(cover), `${book.slug} has no cover`).toBe(true)
            const size = fs.statSync(cover).size
            expect(size).toBeGreaterThan(8000)
            expect(size).toBeLessThan(400000)
        }
    })

    it('matches a database row back to the public book PDF', () => {
        const book = CHRISTIAN_BOOKS[0]
        const found = findBookByStoragePath(`christian-books/${book.slug}.pdf`)
        expect(found?.slug).toBe(book.slug)
        expect(found?.download_path).toBe(`/library/books/${book.slug}.pdf`)
        expect(findBookByStoragePath('official-library/gst-101-use-of-english.pdf')).toBeNull()
    })

    it('never charges for a book', () => {
        const catalog = readCatalog()
        for (const book of catalog.books) {
            expect(book.domain).toBe(CHRISTIAN_BOOKS_DOMAIN)
            expect(book.priceKobo === undefined || book.priceKobo === 0).toBe(true)
        }
    })
})
