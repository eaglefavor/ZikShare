/**
 * Downloads must stay downloads.
 *
 * The app answers unknown addresses with index.html so the router can render
 * them. That rule used to apply to PDF links too, which is how a reader tapping
 * "Download the PDF" ended up with a file called index.html. These tests hold
 * the line in both places it can be crossed: the offline worker's config, and
 * the code that saves a document to the phone.
 */
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { FILE_REQUEST_PATTERN, isFileRequest } from '../lib/offlineFiles'
import { mergeLibraryMaterials } from '../lib/fresherLibrary'

const config = fs.readFileSync(path.join(process.cwd(), 'vite.config.js'), 'utf8')

describe('Downloads are never answered with the app shell', () => {
    it('treats every library file as a file, not a page', () => {
        const files = mergeLibraryMaterials([]).map((item) => item.download_path)
        expect(files.length).toBeGreaterThan(300)

        const missed = files.filter((p) => !isFileRequest(p))
        expect(missed).toEqual([])
    })

    it('still lets real app routes fall back to the router', () => {
        const routes = [
            '/',
            '/library',
            '/library/doc/hedda-gabler',
            '/library/doc/hedda-gabler/read',
            '/library/shelf/Modern Theatre',
            '/library/offline',
            '/item/2b0f4c1e-0000-4000-8000-000000000000',
            '/settings',
        ]
        for (const route of routes) {
            expect(FILE_REQUEST_PATTERN.test(route), route).toBe(false)
        }
    })

    it('leaves file requests out of the worker fallback', () => {
        expect(config).toContain('navigateFallbackDenylist')
        expect(config).toContain('FILE_REQUEST_PATTERN')
        // It has to be imported from the shared rule, not retyped.
        expect(config).toMatch(/from '\.\/src\/lib\/offlineFiles\.js'/)
    })

    it('never caches a page under a PDF address', () => {
        // The cache name changed when the bug was fixed, so a device that
        // saved index.html against a PDF address does not keep serving it.
        expect(config).not.toMatch(/cacheName:\s*'library-pdfs'/)
        expect(config).toMatch(/cacheName:\s*'library-pdfs-v2'/)
        // And only a response that really is a PDF may be stored.
        expect(config).toMatch(/'content-type':\s*'application\/pdf'/)
    })

    it('matches the built worker, not just the source', () => {
        const sw = path.join(process.cwd(), 'dist', 'sw.js')
        if (!fs.existsSync(sw)) return // the build has not run in this checkout
        const code = fs.readFileSync(sw, 'utf8')
        expect(code).toMatch(/denylist:\s*\[/)
        expect(code).toContain('library-pdfs-v2')
    })
})
