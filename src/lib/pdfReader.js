/**
 * Page-level PDF rendering for the in-browser reader.
 *
 * This reuses the same PDF.js build the app already loads for sample previews
 * (src/lib/pdfPreview.js), so the reader adds no new dependency and no second
 * copy of the library.
 */
import { loadPdfJs } from './pdfPreview'

/** Opens a PDF by URL and resolves once its page count is known. */
export async function openPdfDocument(url) {
    if (!url) throw new Error('No document to open')
    const pdfjs = await loadPdfJs()
    const task = pdfjs.getDocument({ url, withCredentials: false })
    const doc = await task.promise
    if (!doc?.numPages) throw new Error('The file has no pages')
    return doc
}

/** Width of a page at scale 1, used to fit the page to the screen. */
export async function naturalPageWidth(doc, pageNumber) {
    const page = await doc.getPage(pageNumber)
    return page.getViewport({ scale: 1 }).width
}

/**
 * Renders one page into a canvas at `scale`, at up to 2x device resolution so
 * text stays sharp on a phone.
 *
 * Resolves with the CSS size of the rendered page.
 */
export async function renderPdfPage(doc, pageNumber, canvas, { scale = 1.4, devicePixelRatio = 1 } = {}) {
    if (!doc || !canvas) throw new Error('Nothing to render')

    const page = await doc.getPage(pageNumber)
    const viewport = page.getViewport({ scale })
    const ratio = Math.min(Math.max(devicePixelRatio, 1), 2)

    canvas.width = Math.floor(viewport.width * ratio)
    canvas.height = Math.floor(viewport.height * ratio)
    canvas.style.width = `${Math.floor(viewport.width)}px`
    canvas.style.height = `${Math.floor(viewport.height)}px`

    const context = canvas.getContext('2d')
    if (!context) throw new Error('This browser cannot draw the page')
    context.setTransform(ratio, 0, 0, ratio, 0, 0)

    await page.render({ canvasContext: context, viewport }).promise

    return { width: viewport.width, height: viewport.height }
}

/** Remembers where a reader stopped, per book, in this browser only. */
export function readProgress(slug) {
    try {
        const raw = localStorage.getItem(`zikshare:book-progress:${slug}`)
        const page = Number(raw)
        return Number.isFinite(page) && page > 0 ? Math.floor(page) : null
    } catch {
        return null
    }
}

export function saveProgress(slug, page) {
    try {
        localStorage.setItem(`zikshare:book-progress:${slug}`, String(page))
    } catch {
        // private mode or a full quota: progress is a convenience, not a promise
    }
}
