/**
 * The PDF engine, served from ZikShare itself.
 *
 * The reader and the sample preview used to pull PDF.js from a CDN (cdnjs,
 * then unpkg if that failed) at the moment somebody opened a book. On a campus
 * connection that was a second DNS lookup, a second TLS handshake and a third
 * party that could be slow, rate-limited or blocked — and the worker could not
 * keep it on the device, so the same 1 MB came down the wire again on the next
 * visit. Every failure of those script tags looked like "this book is broken"
 * to the reader.
 *
 * It is a normal dependency now: built with the app, served from this origin,
 * and kept on the device after the first read by the /assets/ rule in
 * vite.config.js. It is imported lazily, so somebody who only browses the
 * library never downloads it.
 */
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.js?url'

let enginePromise = null

async function loadEngine() {
    const loaded = await import('pdfjs-dist/build/pdf.js')
    // The published build is CommonJS, so the module arrives either with named
    // exports or as a `default` object depending on the bundler. Take whichever
    // one actually has getDocument.
    const engine = loaded?.getDocument ? loaded : loaded?.default
    if (!engine?.getDocument) {
        throw new Error('the PDF library did not start')
    }
    return engine
}

/** Points the engine at the worker that was built into this site. */
function configure(engine) {
    if (engine?.GlobalWorkerOptions && engine.GlobalWorkerOptions.workerSrc !== pdfWorkerUrl) {
        engine.GlobalWorkerOptions.workerSrc = pdfWorkerUrl
    }
    return engine
}

/**
 * Resolves with the PDF.js module. Rejects with a sentence a reader can act on
 * if the engine cannot start; a failed load is not remembered, so the next
 * attempt really tries again.
 */
export function loadPdfJs() {
    if (!enginePromise) {
        enginePromise = loadEngine().catch((err) => {
            enginePromise = null
            throw new Error(`The PDF reader could not start (${err?.message || 'unknown reason'})`)
        })
    }
    return enginePromise.then(configure)
}
