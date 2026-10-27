#!/usr/bin/env node
/**
 * Measures the build against the performance budget and fails loudly.
 *
 * This runs as its own step after `vite build` rather than as a build hook:
 * `closeBundle` runs in parallel across plugins, so a hook could measure the
 * install payload before the service worker was written — and report success
 * while measuring nothing.
 *
 *   npm run build      # vite build && node scripts/perf-check.mjs
 *   npm run perf:check # measure an existing dist
 */
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { BUDGETS, checkBudgets, formatReport, measureBuild } from './lib/perf-budget.mjs'

const distDir = path.resolve(process.cwd(), 'dist')

if (!fs.existsSync(path.join(distDir, 'index.html'))) {
    console.error('[perf] dist/index.html is missing — run `npm run build` first.')
    process.exit(1)
}

let report
try {
    report = measureBuild(distDir)
} catch (err) {
    console.error(`[perf] FAILED: ${err.message}`)
    process.exit(1)
}

const { ok, failures } = checkBudgets(report, BUDGETS)

fs.writeFileSync(
    path.join(distDir, 'perf-report.json'),
    `${JSON.stringify({ budgets: BUDGETS, report, ok, failures }, null, 2)}\n`
)

console.log(formatReport(report))

if (!ok) {
    console.error('\n[perf] FAILED — the build is heavier than the budget:')
    for (const failure of failures) console.error(`  - ${failure}`)
    console.error('\nBudgets live in scripts/lib/perf-budget.mjs. Lowering a number is a win;')
    console.error('raising one needs a reason written next to it.')
    process.exit(1)
}

console.log('[perf] OK — within budget')
