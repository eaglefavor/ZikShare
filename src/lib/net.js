/**
 * Telling "there is nothing" apart from "we could not ask".
 *
 * On a campus connection a request can simply take longer than the app is
 * willing to wait. The screen then showed an empty marketplace — a statement
 * about the world, made on the strength of a timeout. These helpers let a page
 * say the true thing instead: the request did not come back, and here is a
 * button to try again.
 */

/** An error we raised ourselves when a request outlived its budget. */
export class TimeoutError extends Error {
    constructor(message = 'The request took too long') {
        super(message)
        this.name = 'TimeoutError'
        this.code = 'TIMEOUT'
        this.transient = true
    }
}

/** Did this fail because the connection did, rather than because of an answer? */
export function isTransientError(error) {
    if (!error) return false
    const code = String(error.code || '').toUpperCase()
    const message = String(error.message || error || '').toLowerCase()

    if (code === 'TIMEOUT' || code === 'ETIMEDOUT' || code === 'ECONNRESET') return true
    if (code === 'PGRST301' || code === 'PGRST302') return true // JWT / gateway hiccups

    return (
        message.includes('timed out') ||
        message.includes('took longer') ||
        message.includes('timeout') ||
        message.includes('aborted') ||
        message.includes('networkerror') ||
        message.includes('network request failed') ||
        message.includes('failed to fetch') ||
        message.includes('load failed') || // Safari's wording
        message.includes('offline')
    )
}

/** How long to wait before trying again, in milliseconds. */
export function retryDelay(attempt) {
    // 600 ms, then 1800 ms: long enough to survive a handover between towers,
    // short enough that a reader is not left waiting on a dead request.
    return 600 * Math.pow(3, Math.max(0, attempt))
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Runs `task`, retrying it while it fails for a network reason.
 *
 * Rejects with the last error, so a caller that runs out of attempts still
 * knows why — nothing is turned into a quiet empty result here.
 *
 * @param {function(): Promise<any>} task
 * @param {{attempts?: number, isRetryable?: function(Error): boolean, onRetry?: function(number, Error): void}} options
 */
export async function withRetry(task, options = {}) {
    const { attempts = 2, isRetryable = isTransientError, onRetry } = options
    let lastError

    for (let attempt = 0; attempt < Math.max(1, attempts); attempt += 1) {
        try {
            return await task()
        } catch (error) {
            lastError = error
            const isLast = attempt + 1 >= Math.max(1, attempts)
            if (isLast || !isRetryable(error)) break
            onRetry?.(attempt + 1, error)
            await sleep(retryDelay(attempt))
        }
    }

    throw lastError
}

/** Milliseconds a request may take before we call it a timeout. */
export const SLOW_CONNECTION_NOTE =
    'This is taking longer than usual — the connection may be slow.'
