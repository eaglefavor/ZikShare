#!/usr/bin/env node
/**
 * Builds the ZikShare fresher PDF library from authored content.
 *
 *   node scripts/build-library-pdfs.mjs           # build all packs
 *   node scripts/build-library-pdfs.mjs --check   # verify generated files match metadata
 *
 * Outputs:
 *   library/source/<slug>.pdf          full packs (private originals for seeding)
 *   public/library/previews/<slug>.pdf first 3 pages, safe to serve publicly
 *   library/catalog.generated.json     metadata + measured stats
 *   src/lib/fresherLibraryData.js      metadata consumed by the app
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildPackPdf, buildPreviewPdf, sha256 } from './lib/pdf-layout.mjs'
import { FRESHER_PACKS } from '../library/content/index.mjs'
import { validatePacks } from './lib/validate-packs.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE_DIR = path.join(ROOT, 'library', 'source')
const PREVIEW_DIR = path.join(ROOT, 'public', 'library', 'previews')
const FREE_DIR = path.join(ROOT, 'public', 'library', 'packs')
const CATALOG_JSON = path.join(ROOT, 'library', 'catalog.generated.json')
const APP_DATA = path.join(ROOT, 'src', 'lib', 'fresherLibraryData.js')
const PREVIEW_PAGES = 3

const checkOnly = process.argv.includes('--check')
const allowPartial = process.argv.includes('--allow-partial')

function fail(message) {
    console.error(`\n[library] BUILD FAILED: ${message}\n`)
    throw new Error(message)
}

const META_FIELDS = [
    'slug', 'code', 'title', 'subtitle', 'domain', 'faculty', 'department', 'level',
    'material_type', 'subcategory', 'priceKobo', 'tags', 'description', 'archive',
]

function toMeta(pack, stats) {
    const meta = {}
    for (const key of META_FIELDS) meta[key] = pack[key] ?? null
    meta.is_free = true
    meta.archive_years = pack.archive?.sessions?.map((s) => s.year) || []
    return Object.assign(meta, stats)
}

function validate(packs) {
    const errors = validatePacks(packs, { minPacks: allowPartial ? 1 : 50 })
    if (errors.length) fail(`${errors.length} validation problem(s):\n  - ${errors.join('\n  - ')}`)
    return true
}

async function run() {
    const packs = FRESHER_PACKS
    validate(packs)

    if (!checkOnly) {
        await fs.mkdir(SOURCE_DIR, { recursive: true })
        await fs.mkdir(PREVIEW_DIR, { recursive: true })
        await fs.mkdir(FREE_DIR, { recursive: true })
    }

    const catalog = []
    const problems = []

    for (const pack of packs) {
        const sourcePath = path.join(SOURCE_DIR, `${pack.slug}.pdf`)
        const previewPath = path.join(PREVIEW_DIR, `${pack.slug}.pdf`)

        if (checkOnly) {
            const existing = await fs.readFile(sourcePath).catch(() => null)
            const previewBuf = await fs.readFile(previewPath).catch(() => null)
            const freeBuf = await fs.readFile(path.join(FREE_DIR, `${pack.slug}.pdf`)).catch(() => null)
            if (!existing) problems.push(`missing full PDF: ${pack.slug}`)
            if (!previewBuf) problems.push(`missing preview PDF: ${pack.slug}`)
            if (!freeBuf) problems.push(`missing public free PDF: ${pack.slug}`)
            if (existing) {
                const stats = await readExistingMeta(sourcePath)
                catalog.push(toMeta(pack, {
                    ...stats,
                    preview_page_count: PREVIEW_PAGES,
                    preview_path: `/library/previews/${pack.slug}.pdf`,
                    download_path: `/library/packs/${pack.slug}.pdf`,
                    storage_path: `official-library/${pack.slug}.pdf`,
                }))
            }
            continue
        }

        const doc = await buildPackPdf(pack)
        const fullBytes = Buffer.from(await doc.save())
        const pageCount = doc.getPageCount()
        if (pageCount < 4) fail(`${pack.slug}: generated PDF has only ${pageCount} pages`)

        const preview = await buildPreviewPdf(doc, PREVIEW_PAGES)
        const previewBytes = Buffer.from(await preview.save())

        await fs.writeFile(sourcePath, fullBytes)
        await fs.writeFile(previewPath, previewBytes)
        // Free public copy: the download itself must never require a payment step.
        await fs.writeFile(path.join(FREE_DIR, `${pack.slug}.pdf`), fullBytes)

        catalog.push(toMeta(pack, {
            page_count: pageCount,
            file_size_bytes: fullBytes.length,
            sha256: sha256(fullBytes),
            preview_page_count: Math.min(PREVIEW_PAGES, pageCount),
            preview_size_bytes: previewBytes.length,
            preview_path: `/library/previews/${pack.slug}.pdf`,
            download_path: `/library/packs/${pack.slug}.pdf`,
            storage_path: `official-library/${pack.slug}.pdf`,
        }))
        process.stdout.write(`  built ${pack.slug} (${pageCount} pages, ${(fullBytes.length / 1024).toFixed(0)} KB)\n`)
    }

    if (checkOnly) {
        if (problems.length) fail(`Generated library is out of date:\n  - ${problems.join('\n  - ')}`)
        console.log(`[library] OK: ${packs.length} authored packs have full and preview PDFs.`)
        return
    }

    const generatedAt = new Date().toISOString()
    await fs.writeFile(CATALOG_JSON, JSON.stringify({ generatedAt, count: catalog.length, packs: catalog }, null, 2))

    const appData = `// AUTO-GENERATED by scripts/build-library-pdfs.mjs - do not edit by hand.\n` +
        `// Source: library/content/*.mjs. Rebuild with: npm run library:build\n\n` +
        `export const FRESHER_LIBRARY_PACKS = ${JSON.stringify(catalog, null, 4)}\n`
    await fs.writeFile(APP_DATA, appData)

    const totalPages = catalog.reduce((sum, p) => sum + p.page_count, 0)
    const totalBytes = catalog.reduce((sum, p) => sum + p.file_size_bytes, 0)
    console.log(`\n[library] Built ${catalog.length} packs | ${totalPages} pages | ${(totalBytes / 1024 / 1024).toFixed(2)} MB`)
    console.log(`[library] Metadata: ${path.relative(ROOT, CATALOG_JSON)}`)
    console.log(`[library] App data: ${path.relative(ROOT, APP_DATA)}`)
}

async function readExistingMeta(file) {
    const { PDFDocument } = await import('pdf-lib')
    const bytes = await fs.readFile(file)
    const doc = await PDFDocument.load(bytes)
    return {
        page_count: doc.getPageCount(),
        file_size_bytes: bytes.length,
        sha256: sha256(bytes),
    }
}

run().catch((err) => {
    if (!process.exitCode) process.exitCode = 1
    console.error(err.message)
})
