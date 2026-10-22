#!/usr/bin/env node
/**
 * Publishes the generated ZikShare fresher library into Supabase.
 *
 *   node scripts/seed-library.mjs            # dry run: prints exactly what would change
 *   node scripts/seed-library.mjs --apply    # uploads PDFs + upserts catalog rows
 *   node scripts/seed-library.mjs --verify   # checks published rows AND uploaded PDFs
 *
 * Requires (server-side only, never in VITE_ variables):
 *   SUPABASE_URL                  e.g. https://xxxx.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY     service role key (bypasses RLS)
 *
 * The script refuses to run against a project where the official account does
 * not exist yet, and it reports partial states instead of claiming success.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@supabase/supabase-js'
import { FRESHER_PACKS } from '../library/content/index.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE_DIR = path.join(ROOT, 'library', 'source')
const BUCKET = 'digital-originals'
const OFFICIAL_EMAILS = ['rc5632250@gmail.com', 'admin@zikshare.com']

const args = new Set(process.argv.slice(2))
if (args.has('--help')) {
    console.log(`
Usage: node scripts/seed-library.mjs [--apply] [--verify]

  (no flag)   dry run: reports what would be uploaded and published
  --apply     uploads PDFs to ${BUCKET}/official-library and upserts catalog rows
  --verify    checks that every pack has an active row AND an uploaded PDF

Environment (server-side only):
  SUPABASE_URL                 e.g. https://xxxx.supabase.co
  SUPABASE_SERVICE_ROLE_KEY    service role key; never expose this to the browser
`)
    process.exit(0)
}

const apply = args.has('--apply')
const verify = args.has('--verify')
const knownArgs = new Set(['--apply', '--verify', '--help'])
for (const arg of args) {
    if (!knownArgs.has(arg)) fail(`Unknown argument: ${arg}`)
}

function fail(message) {
    console.error(`\n[seed] FAILED: ${message}\n`)
    process.exit(1)
}

function info(message) {
    console.log(`[seed] ${message}`)
}

async function main() {
    const url = process.env.SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    // Always validate the authored catalog and the local PDFs first.
    const missingLocal = []
    for (const pack of FRESHER_PACKS) {
        const exists = await fs.access(path.join(SOURCE_DIR, `${pack.slug}.pdf`)).then(() => true, () => false)
        if (!exists) missingLocal.push(pack.slug)
    }
    if (missingLocal.length) {
        fail(`Run "npm run library:build" first. Missing PDFs: ${missingLocal.join(', ')}`)
    }

    info(`${FRESHER_PACKS.length} authored packs with PDFs present locally.`)

    if (!url || !serviceKey) {
        fail(
            'SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set for seeding.\n' +
            '        In Supabase: Project Settings -> API -> service_role key.\n' +
            '        Locally: SUPABASE_URL="..." SUPABASE_SERVICE_ROLE_KEY="..." node scripts/seed-library.mjs --apply\n' +
            '        The service role key must never be exposed to the browser or committed.'
        )
    }

    const supabase = createClient(url, serviceKey, { auth: { persistSession: false } })

    const { data: officialUsers, error: userErr } = await supabase
        .from('users')
        .select('uid, email, displayName')
        .in('email', OFFICIAL_EMAILS)

    if (userErr) fail(`Could not read users table: ${userErr.message}`)
    if (!officialUsers?.length) {
        fail(
            `No official ZikShare account found in public.users for ${OFFICIAL_EMAILS.join(' or ')}.\n` +
            '        Sign in once with that account so the profile row exists, then re-run.'
        )
    }
    const seller = officialUsers[0]
    info(`Publishing as ${seller.email} (${seller.uid}).`)

    const { data: existingRows, error: rowErr } = await supabase
        .from('digital_products')
        .select('id, title, course_code, original_storage_path, price, status')
        .eq('seller_id', seller.uid)

    if (rowErr) fail(`Could not read digital_products: ${rowErr.message}`)

    const existingByPath = new Map()
    for (const row of existingRows || []) {
        if (row.original_storage_path) existingByPath.set(row.original_storage_path, row)
    }

    const toCreate = FRESHER_PACKS.filter((p) => !existingByPath.has(p.storage_path))
    const toUpdate = FRESHER_PACKS.filter((p) => existingByPath.has(p.storage_path))

    // Which PDFs are actually in the bucket?
    const { data: storageObjects, error: listErr } = await supabase.storage.from(BUCKET).list('official-library', { limit: 1000 })
    if (listErr) {
        fail(
            `Could not list ${BUCKET}/official-library: ${listErr.message}\n` +
            '        Make sure migration 01 and 06 have been applied to this project.'
        )
    }
    const uploaded = new Set((storageObjects || []).map((o) => `official-library/${o.name}`))
    const toUpload = FRESHER_PACKS.filter((p) => !uploaded.has(p.storage_path))

    info(`Catalog rows: ${toCreate.length} to create, ${toUpdate.length} already present.`)
    info(`Storage: ${toUpload.length} PDFs to upload, ${uploaded.size} already in ${BUCKET}/official-library.`)

    if (verify) {
        const problems = []
        const { data: published, error: pubErr } = await supabase
            .from('digital_products')
            .select('id, original_storage_path, status')
            .eq('seller_id', seller.uid)

        if (pubErr) problems.push(`could not read published rows: ${pubErr.message}`)
        const publishedPaths = new Set((published || []).map((r) => r.original_storage_path))
        const activePaths = new Set((published || []).filter((r) => r.status === 'active').map((r) => r.original_storage_path))

        for (const pack of FRESHER_PACKS) {
            if (!publishedPaths.has(pack.storage_path)) problems.push(`row missing: ${pack.slug}`)
            else if (!activePaths.has(pack.storage_path)) problems.push(`row not active: ${pack.slug}`)
            if (!uploaded.has(pack.storage_path)) problems.push(`PDF not uploaded: ${pack.slug}`)
        }

        if (problems.length) {
            fail(`Verification found ${problems.length} problem(s):\n  - ${problems.join('\n  - ')}`)
        }
        info(`VERIFIED: ${FRESHER_PACKS.length} packs have both an active row and an uploaded PDF.`)
        return
    }

    if (!apply) {
        info('DRY RUN. Nothing was written. Re-run with --apply to upload PDFs and publish rows.')
        return
    }

    // ── 1. Upload PDFs ──
    const uploadFailures = []
    for (const pack of toUpload) {
        const bytes = await fs.readFile(path.join(SOURCE_DIR, `${pack.slug}.pdf`))
        const { error: upErr } = await supabase.storage
            .from(BUCKET)
            .upload(pack.storage_path, bytes, { contentType: 'application/pdf', upsert: true })
        if (upErr) uploadFailures.push(`${pack.slug}: ${upErr.message}`)
        else process.stdout.write('.')
    }
    if (toUpload.length) console.log('')
    if (uploadFailures.length) {
        fail(`Uploaded most PDFs but ${uploadFailures.length} failed:\n  - ${uploadFailures.join('\n  - ')}`)
    }

    // ── 2. Upsert catalog rows ──
    const rows = FRESHER_PACKS.map((pack) => ({
        seller_id: seller.uid,
        title: pack.title,
        description: pack.description,
        price: 0, // the library is free by policy: priceKobo is 0 everywhere
        is_free: true,
        category: 'Academic & Study Materials',
        subcategory: pack.subcategory,
        course_code: pack.code,
        level: pack.level,
        faculty: pack.faculty,
        department: pack.department,
        domain: pack.domain,
        original_storage_path: pack.storage_path,
        preview_path: pack.preview_path,
        page_count: pack.page_count,
        file_size_bytes: pack.file_size_bytes,
        status: 'active',
        drm_enabled: false, // free downloads are not watermarked or password-locked
    }))

    const { data: upserted, error: upErr } = await supabase
        .from('digital_products')
        .upsert(rows, { onConflict: 'seller_id,original_storage_path' })
        .select('id')

    if (upErr) fail(`Could not upsert catalog rows: ${upErr.message}`)
    info(`Upserted ${upserted?.length ?? 0} catalog rows.`)

    // ── 3. Verify in the same run; do not report success on faith ──
    const { data: finalRows, error: finalErr } = await supabase
        .from('digital_products')
        .select('original_storage_path, status')
        .eq('seller_id', seller.uid)
        .eq('status', 'active')

    if (finalErr) fail(`Wrote rows but could not verify them: ${finalErr.message}`)

    const activePaths = new Set((finalRows || []).map((r) => r.original_storage_path))
    const { data: finalObjects } = await supabase.storage.from(BUCKET).list('official-library', { limit: 1000 })
    const finalUploaded = new Set((finalObjects || []).map((o) => `official-library/${o.name}`))

    const missing = FRESHER_PACKS.filter((p) => !activePaths.has(p.storage_path) || !finalUploaded.has(p.storage_path))
    if (missing.length) {
        fail(`Seed finished but ${missing.length} pack(s) are not fully published: ${missing.map((p) => p.slug).join(', ')}`)
    }

    info(`DONE and verified: ${FRESHER_PACKS.length} packs published with active rows and uploaded PDFs.`)
}

main().catch((err) => fail(err?.message || String(err)))
