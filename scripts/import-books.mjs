#!/usr/bin/env node
/**
 * Imports the supplied Christian Books PDFs into the public library.
 *
 *   node scripts/import-books.mjs                       # import from /tmp/arena-coding-uploads
 *   node scripts/import-books.mjs --from ~/books        # import from another folder
 *   node scripts/import-books.mjs --check               # verify files match metadata
 *
 * The books are served as-is. Unlike the study packs, nothing here is
 * generated: the PDF is the document. What this script does is put it in the
 * right place and measure it honestly, so the catalogue cannot claim a page
 * count or file size that the file does not have.
 *
 * Outputs:
 *   public/library/books/<slug>.pdf    the served copy
 *   library/books.generated.json       measured metadata
 *   src/lib/christianBooksData.js      metadata consumed by the app
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PDFDocument } from 'pdf-lib'
import { sha256 } from './lib/pdf-layout.mjs'
import { CHRISTIAN_BOOKS, CHRISTIAN_BOOKS_DOMAIN } from '../library/content/books.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = path.join(ROOT, 'public', 'library', 'books')
const CATALOG_JSON = path.join(ROOT, 'library', 'books.generated.json')
const APP_DATA = path.join(ROOT, 'src', 'lib', 'christianBooksData.js')

const args = process.argv.slice(2)
const checkOnly = args.includes('--check')
const fromFlag = args.indexOf('--from')
const FROM_DIR = fromFlag !== -1 ? path.resolve(args[fromFlag + 1]) : '/tmp/arena-coding-uploads'

function fail(message) {
    console.error(`\n[books] IMPORT FAILED: ${message}\n`)
    process.exitCode = 1
    throw new Error(message)
}

function assertUnique() {
    const seen = new Set()
    for (const book of CHRISTIAN_BOOKS) {
        if (!/^[a-z0-9-]+$/.test(book.slug)) fail(`invalid slug "${book.slug}"`)
        if (seen.has(book.slug)) fail(`duplicate slug "${book.slug}"`)
        seen.add(book.slug)
        if (!book.title || !book.author) fail(`${book.slug}: title and author are required`)
        if (!book.description || book.description.length < 120) fail(`${book.slug}: description too short`)
        if (!Array.isArray(book.topics) || book.topics.length < 2) fail(`${book.slug}: needs at least 2 topics`)
        if (!['publisher-copyright', 'edition-claims-public-domain', 'unverified'].includes(book.rights)) {
            fail(`${book.slug}: unknown rights status "${book.rights}"`)
        }
    }
}

async function measure(filePath) {
    const buffer = await fs.readFile(filePath)
    // Some scans (archive.org copies in particular) carry an /Encrypt
    // dictionary with an empty user password. They open and copy fine; only
    // the permissions flag differs, so we read the page count anyway.
    const doc = await PDFDocument.load(new Uint8Array(buffer), {
        updateMetadata: false,
        ignoreEncryption: true,
    })
    return {
        page_count: doc.getPageCount(),
        file_size_bytes: buffer.byteLength,
        sha256: sha256(buffer),
    }
}

async function main() {
    assertUnique()

    if (checkOnly) {
        const raw = await fs.readFile(CATALOG_JSON, 'utf8').catch(() => null)
        if (!raw) fail('library/books.generated.json is missing; run the import first')
        const catalog = JSON.parse(raw)
        const problems = []
        if (catalog.books.length !== CHRISTIAN_BOOKS.length) {
            problems.push(`catalog has ${catalog.books.length} books, source has ${CHRISTIAN_BOOKS.length}`)
        }
        for (const book of catalog.books) {
            const served = path.join(OUT_DIR, `${book.slug}.pdf`)
            const exists = await fs.stat(served).then(() => true, () => false)
            if (!exists) {
                problems.push(`${book.slug}: missing ${path.relative(ROOT, served)}`)
                continue
            }
            const measured = await measure(served)
            if (measured.page_count !== book.page_count) {
                problems.push(`${book.slug}: catalog says ${book.page_count} pages, file has ${measured.page_count}`)
            }
            if (measured.sha256 !== book.sha256) problems.push(`${book.slug}: checksum does not match the served file`)
            if (measured.file_size_bytes !== book.file_size_bytes) problems.push(`${book.slug}: size does not match the served file`)
        }
        if (problems.length) fail(`${problems.length} problem(s):\n  - ${problems.join('\n  - ')}`)
        console.log(`[books] OK: ${catalog.books.length} books present and matching their metadata.`)
        return
    }

    await fs.mkdir(OUT_DIR, { recursive: true })
    const imported = []
    let totalPages = 0
    let totalBytes = 0

    for (const book of CHRISTIAN_BOOKS) {
        const source = path.join(FROM_DIR, book.sourceFile)
        const exists = await fs.stat(source).then(() => true, () => false)
        if (!exists) fail(`cannot find source file "${book.sourceFile}" in ${FROM_DIR}`)

        const stats = await measure(source)
        if (stats.page_count < 10) fail(`${book.slug}: only ${stats.page_count} pages - that is not a book`)

        const target = path.join(OUT_DIR, `${book.slug}.pdf`)
        await fs.copyFile(source, target)

        imported.push({
            slug: book.slug,
            title: book.title,
            subtitle: book.subtitle,
            author: book.author,
            publisher: book.publisher,
            year: book.year,
            rights: book.rights,
            topics: book.topics,
            description: book.description,
            domain: CHRISTIAN_BOOKS_DOMAIN,
            download_path: `/library/books/${book.slug}.pdf`,
            storage_path: `christian-books/${book.slug}.pdf`,
            ...stats,
        })
        totalPages += stats.page_count
        totalBytes += stats.file_size_bytes
        console.log(`[books] ${book.slug}: ${stats.page_count} pages, ${(stats.file_size_bytes / 1e6).toFixed(2)} MB`)
    }

    const catalog = {
        domain: CHRISTIAN_BOOKS_DOMAIN,
        generated_at: new Date().toISOString(),
        totals: { books: imported.length, pages: totalPages, bytes: totalBytes },
        books: imported,
    }
    await fs.writeFile(CATALOG_JSON, `${JSON.stringify(catalog, null, 2)}\n`)
    await fs.writeFile(APP_DATA, buildAppData(imported))

    console.log(`\n[books] Imported ${imported.length} books | ${totalPages} pages | ${(totalBytes / 1e6).toFixed(2)} MB`)
    console.log(`[books] Metadata: ${path.relative(ROOT, CATALOG_JSON)}`)
    console.log(`[books] App data: ${path.relative(ROOT, APP_DATA)}`)
}

function buildAppData(books) {
    const clean = books.map((b) => ({
        slug: b.slug,
        title: b.title,
        subtitle: b.subtitle,
        author: b.author,
        publisher: b.publisher,
        year: b.year,
        rights: b.rights,
        topics: b.topics,
        description: b.description,
        domain: b.domain,
        download_path: b.download_path,
        storage_path: b.storage_path,
        page_count: b.page_count,
        file_size_bytes: b.file_size_bytes,
        sha256: b.sha256,
    }))
    return `// Generated by scripts/import-books.mjs - do not edit by hand.
// Regenerate with: node scripts/import-books.mjs
export const CHRISTIAN_BOOKS = ${JSON.stringify(clean, null, 4)}

export default CHRISTIAN_BOOKS
`
}

main().catch((error) => {
    console.error(error.message)
    process.exit(1)
})
