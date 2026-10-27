/**
 * What the first screen is allowed to cost.
 *
 * This project has twice shipped a first load that was far heavier than anyone
 * intended — a service worker that precached every route plus a debug console,
 * and a landing page that carried three hundred book records so it could print
 * a count. Both looked fine in review and were obvious on a 3G phone.
 *
 * So the build now measures itself and fails when it regresses:
 *
 *  - the landing download (everything `index.html` references) stays small,
 *  - the install payload (what the offline worker precaches) stays small,
 *  - the library catalogue stays out of the landing bundle.
 *
 * Everything here is computed from the built files, not asserted from memory.
 */
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

/** Budgets in bytes. Kept in one place so the numbers are easy to read. */
export const BUDGETS = {
    // gzip, everything index.html pulls in before the app can render
    landingGzip: 200 * 1024,
    // uncompressed, what the service worker downloads on install
    installRaw: 820 * 1024,
    // gzip, the single largest file on the landing path
    entryGzip: 120 * 1024,
}

/** A string that exists only in the library catalogue. */
export const CATALOGUE_MARKER = 'Hedda Gabler'

function gzipSize(buffer) {
    return zlib.gzipSync(buffer, { level: 9 }).length
}

/** The files `dist/index.html` loads before anything is on screen. */
export function landingAssets(distDir) {
    const html = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8')
    const refs = [...html.matchAll(/(?:src|href)="([^"]+\.(?:js|css))"/g)].map((match) => match[1])
    return [...new Set(refs)].filter((ref) => fs.existsSync(path.join(distDir, ref)))
}

/** The URLs the generated service worker precaches, in order, without repeats. */
export function precacheUrls(swSource) {
    const urls = [...String(swSource).matchAll(/url:"([^"]+)"/g)].map((match) => match[1])
    return [...new Set(urls)]
}

/**
 * Measures a finished build.
 *
 * @param {string} distDir
 * @returns {{landingGzip: number, entryGzip: number, entryFile: string|null, installRaw: number, installFiles: number, entryHasCatalogue: boolean, assets: Array<{file: string, raw: number, gzip: number}>}}
 */
export function measureBuild(distDir) {
    const landing = landingAssets(distDir)

    let landingGzip = 0
    let entryGzip = 0
    let entryFile = null
    const assets = []

    for (const ref of landing) {
        const file = path.join(distDir, ref)
        const buffer = fs.readFileSync(file)
        const gzip = gzipSize(buffer)
        landingGzip += gzip
        assets.push({ file: ref, raw: buffer.length, gzip })

        // The entry is the biggest script the page loads itself.
        if (ref.endsWith('.js') && gzip > entryGzip) {
            entryGzip = gzip
            entryFile = ref
        }
    }

    let installRaw = 0
    let installFiles = 0
    const swPath = path.join(distDir, 'sw.js')
    if (!fs.existsSync(swPath)) {
        // Measuring nothing and reporting success is the failure mode this
        // check exists to stop. A build with no worker has no install payload
        // to defend, and that has to be said out loud.
        throw new Error('perf budget: dist/sw.js is missing — measure the install after the worker is generated')
    }
    for (const url of precacheUrls(fs.readFileSync(swPath, 'utf8'))) {
        const file = path.join(distDir, url)
        if (!fs.existsSync(file)) continue
        installRaw += fs.statSync(file).size
        installFiles += 1
    }

    let entryHasCatalogue = false
    if (entryFile) {
        const source = fs.readFileSync(path.join(distDir, entryFile), 'utf8')
        entryHasCatalogue = source.includes(CATALOGUE_MARKER)
    }

    return { landingGzip, entryGzip, entryFile, installRaw, installFiles, entryHasCatalogue, assets }
}

/**
 * Compares a measurement with the budget.
 *
 * @param {ReturnType<typeof measureBuild>} report
 * @param {typeof BUDGETS} budgets
 * @returns {{ok: boolean, failures: string[]}}
 */
export function checkBudgets(report, budgets = BUDGETS) {
    const failures = []
    const kb = (bytes) => `${(bytes / 1024).toFixed(0)} kB`

    if (report.landingGzip > budgets.landingGzip) {
        failures.push(
            `landing download is ${kb(report.landingGzip)} gzip (budget ${kb(budgets.landingGzip)})`
        )
    }
    if (report.installRaw > budgets.installRaw) {
        failures.push(
            `offline install is ${kb(report.installRaw)} (budget ${kb(budgets.installRaw)})`
        )
    }
    if (report.entryGzip > budgets.entryGzip) {
        failures.push(
            `the entry script is ${kb(report.entryGzip)} gzip (budget ${kb(budgets.entryGzip)})`
        )
    }
    if (report.entryHasCatalogue) {
        failures.push(
            `the library catalogue ("${CATALOGUE_MARKER}") is in the landing bundle — it belongs in its own chunk`
        )
    }

    return { ok: failures.length === 0, failures }
}

/** A one-screen summary, printed by the build. */
export function formatReport(report) {
    const kb = (bytes) => `${(bytes / 1024).toFixed(0)} kB`
    return [
        `perf        landing ${kb(report.landingGzip)} gzip (entry ${report.entryFile || 'n/a'})`,
        `perf        install ${kb(report.installRaw)} across ${report.installFiles} files`,
    ].join('\n')
}
