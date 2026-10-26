/**
 * Which addresses are files, not pages.
 *
 * The app is a single-page application: any address that is not a file has to
 * be answered with `index.html` so the router can render it. The offline
 * worker does exactly that for every navigation — which is correct for a page
 * and catastrophic for a download: tapping "Download the PDF" is a navigation
 * too, so the worker used to hand back the app shell and the reader's phone
 * saved a file called `index.html` instead of the book.
 *
 * Anything that looks like a file (a final segment with an extension) is a
 * download, never an app route, so the worker must leave it alone and let the
 * network — or the PDF cache — answer it.
 *
 * Both the service-worker configuration and the tests read this, so the rule
 * cannot drift away from the thing it is protecting.
 */
export const FILE_REQUEST_PATTERN = /\/[^/?]+\.[a-z0-9]{2,5}$/i

/** True when a pathname points at a file the browser should save or open. */
export function isFileRequest(pathname = '') {
    return FILE_REQUEST_PATTERN.test(pathname)
}
