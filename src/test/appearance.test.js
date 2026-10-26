/**
 * One look, in light.
 *
 * The site had a dark theme for a while and it was taken out completely. These
 * checks keep it out: no theme switch on the page, no stylesheet switching on a
 * `data-theme` attribute, and nothing in the CSS that reacts to the phone being
 * in dark mode. A phone in dark mode still gets this site as it is designed.
 */
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8')

describe('Appearance', () => {
    it('has no dark styles left in the stylesheet', () => {
        const css = read('src/index.css')
        expect(css).not.toMatch(/data-theme/)
        expect(css).not.toMatch(/prefers-color-scheme/)
        // Form controls and scrollbars stay light too.
        expect(css).toMatch(/color-scheme:\s*light/)
    })

    it('has no theme switch anywhere in the app', () => {
        for (const file of ['src/lib/theme.js', 'src/components/ThemeToggle.jsx']) {
            expect(fs.existsSync(path.join(root, file)), file).toBe(false)
        }
        const main = read('src/main.jsx')
        expect(main).not.toMatch(/applyTheme|lib\/theme/)
        expect(read('src/pages/SettingsPage.jsx')).not.toMatch(/ThemeToggle/)
        expect(read('src/pages/LibraryPage.jsx')).not.toMatch(/ThemeToggle/)
    })

    it('keeps the palette the pages read their colours from', () => {
        const css = read('src/index.css')
        for (const token of [
            '--color-surface',
            '--color-background',
            '--color-canvas',
            '--color-text-primary',
            '--color-text-secondary',
            '--color-border',
        ]) {
            expect(css, token).toContain(token)
        }
        // The light values are the only values.
        expect(css).toContain('--color-surface: #FFFFFF')
        expect(css).toContain('--color-canvas: #F1F5F9')
    })
})
