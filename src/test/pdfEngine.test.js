/**
 * The PDF engine must come from ZikShare, not from a CDN.
 *
 * This used to be a `<script src="https://cdnjs.cloudflare.com/...">` injected
 * when a reader opened a book, with unpkg as a fallback. On a slow campus link
 * that was a second DNS lookup, a second TLS handshake and a third party that
 * could be slow or blocked — and when it failed, the book looked broken.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

const getDocument = vi.fn()

vi.mock('pdfjs-dist/build/pdf.js', () => ({
    getDocument: (...args) => getDocument(...args),
    GlobalWorkerOptions: { workerSrc: '' },
}))

const engine = await import('pdfjs-dist/build/pdf.js')
const { loadPdfJs } = await import('../lib/pdfEngine')

beforeEach(() => {
    vi.clearAllMocks()
    engine.GlobalWorkerOptions.workerSrc = ''
})

describe('PDF engine', () => {
    it('loads the library that ships with the app', async () => {
        const pdfjs = await loadPdfJs()
        expect(pdfjs).toBeTruthy()
        expect(typeof pdfjs.getDocument).toBe('function')
        expect(getDocument).not.toHaveBeenCalled()
    })

    it('points the worker at a file in this build, not at a CDN', async () => {
        await loadPdfJs()
        const workerSrc = engine.GlobalWorkerOptions.workerSrc
        expect(workerSrc).toBeTruthy()
        expect(workerSrc).not.toMatch(/^https?:\/\//)
        expect(workerSrc).toMatch(/pdf\.worker.*\.js$/)
    })

    it('remembers the engine, so the reader does not load it twice', async () => {
        const first = await loadPdfJs()
        const second = await loadPdfJs()
        expect(second).toBe(first)
    })

    it('never injects a third-party script tag', () => {
        const before = document.head.querySelectorAll('script').length
        return loadPdfJs().then(() => {
            expect(document.head.querySelectorAll('script').length).toBe(before)
        })
    })

    it('has no CDN address left in the reader sources', () => {
        const files = ['pdfEngine.js', 'pdfPreview.js', 'pdfReader.js']
        for (const file of files) {
            const source = fs.readFileSync(path.join(process.cwd(), 'src', 'lib', file), 'utf8')
            // The comment above explains what was removed; only real code counts.
            const code = source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')
            expect(code, file).not.toMatch(/cdnjs|unpkg|jsdelivr/)
        }
    })
})
