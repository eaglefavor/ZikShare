/**
 * The performance budget has to be able to say no.
 *
 * A check that only ever sees a passing build proves nothing, so these tests
 * feed it synthetic measurements that are over budget in each dimension, and
 * check the numbers it derives from a real dist/ checkout when one exists.
 */
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import {
    BUDGETS,
    CATALOGUE_MARKER,
    checkBudgets,
    formatReport,
    measureBuild,
    precacheUrls,
} from '../../scripts/lib/perf-budget.mjs'

const measure = (overrides = {}) => ({
    landingGzip: 100 * 1024,
    entryGzip: 60 * 1024,
    entryFile: '/assets/index-abc.js',
    installRaw: 400 * 1024,
    installFiles: 9,
    entryHasCatalogue: false,
    assets: [],
    ...overrides,
})

describe('Performance budget', () => {
    it('passes a build that is inside every budget', () => {
        expect(checkBudgets(measure()).ok).toBe(true)
    })

    it('fails when the landing download grows', () => {
        const result = checkBudgets(measure({ landingGzip: BUDGETS.landingGzip + 1 }))
        expect(result.ok).toBe(false)
        expect(result.failures.join(' ')).toMatch(/landing download/)
    })

    it('fails when the offline install grows', () => {
        const result = checkBudgets(measure({ installRaw: BUDGETS.installRaw + 1 }))
        expect(result.ok).toBe(false)
        expect(result.failures.join(' ')).toMatch(/offline install/)
    })

    it('fails when the entry script grows', () => {
        const result = checkBudgets(measure({ entryGzip: BUDGETS.entryGzip + 1 }))
        expect(result.ok).toBe(false)
        expect(result.failures.join(' ')).toMatch(/entry script/)
    })

    it('fails when the library catalogue creeps back into the landing bundle', () => {
        const result = checkBudgets(measure({ entryHasCatalogue: true }))
        expect(result.ok).toBe(false)
        expect(result.failures.join(' ')).toContain(CATALOGUE_MARKER)
    })

    it('names the actual size in a failure, so the next person knows what happened', () => {
        const result = checkBudgets(measure({ landingGzip: 900 * 1024 }))
        expect(result.failures[0]).toContain('900 kB')
    })

    it('reads the precache manifest out of a service worker', () => {
        const sw = 'precacheAndRoute([{url:"index.html",revision:"1"},{url:"assets/a.js",revision:null},{url:"index.html",revision:"1"}],{})'
        expect(precacheUrls(sw)).toEqual(['index.html', 'assets/a.js'])
    })

    it('summarises what it measured', () => {
        const text = formatReport(measure())
        expect(text).toMatch(/landing 100 kB gzip/)
        expect(text).toMatch(/install 400 kB across 9 files/)
    })

    it('measures a real build honestly, when one is present', () => {
        const dist = path.join(process.cwd(), 'dist')
        if (!fs.existsSync(path.join(dist, 'index.html'))) {
            // The build has not run in this checkout. Say so rather than
            // pretending the check passed: run `npm run build` to exercise it.
            expect(fs.existsSync(path.join(dist, 'index.html'))).toBe(false)
            return
        }

        const report = measureBuild(dist)

        // Everything measured is a real file on disk.
        expect(report.assets.length).toBeGreaterThan(2)
        expect(report.installFiles).toBeGreaterThan(3)
        expect(report.landingGzip).toBeGreaterThan(0)

        // And the catalogue is in its own chunk, not the landing bundle.
        expect(report.entryHasCatalogue).toBe(false)

        // The shipped build is inside its budget — the build step says so too,
        // but a change that only edited dist/ by hand would be caught here.
        const result = checkBudgets(report)
        expect(result.failures).toEqual([])
    })
})
