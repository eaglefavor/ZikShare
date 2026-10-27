import { useState, useEffect, useCallback, useRef } from 'react'
import { getCached, setCache, CACHE_TTL } from '../lib/cache'
import { isTransientError, withRetry, withTimeout } from '../lib/net'

/**
 * Custom hook that wraps async data fetching with a SWR-style cache.
 * - Serves cached data instantly (if available)
 * - Fetches fresh data in the background
 * - Handles loading, error, and stale states
 * - Auto-revalidates when the network comes back online
 * - Retries once, after a short pause, when a request fails for a network
 *   reason — a dropped packet should not empty a screen
 * - Includes a strict 8-second safety timeout so it never hangs in loading state
 *
 * @param {string} cacheKey - Unique key for this query
 * @param {function} fetcher - Async function that returns data
 * @param {object} options
 * @param {number} options.ttl - Cache TTL in ms (default: CACHE_TTL.LISTINGS)
 * @param {boolean} options.enabled - Whether to run the fetcher (default: true)
 * @param {number} options.timeoutMs - Maximum time to wait for fresh data before unblocking UI (default: 8000ms)
 * @param {number} options.attempts - Total tries for a network-failed fetch (default: 2)
 */
export function useCachedQuery(cacheKey, fetcher, options = {}) {
    const { ttl = CACHE_TTL.LISTINGS, enabled = true, timeoutMs = 8000, attempts = 2 } = options

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isStale, setIsStale] = useState(false)
    const [error, setError] = useState(null)
    const fetcherRef = useRef(fetcher)
    fetcherRef.current = fetcher
    // Every revalidation gets a number. A slow attempt that finishes after a
    // newer one must not overwrite the newer answer — on a bad connection two
    // attempts can be in flight at once (a retry, plus the browser coming back
    // online), and the loser used to be able to put the error screen back.
    const runId = useRef(0)

    // Load cached data immediately on mount
    useEffect(() => {
        if (!enabled) {
            setIsLoading(false)
            return
        }

        const cached = getCached(cacheKey, ttl)
        if (cached) {
            setData(cached.data)
            setIsStale(cached.isStale)
            setIsLoading(false)
        }
    }, [cacheKey, ttl, enabled])

    // Fetch fresh data (revalidate) with timeout protection
    const revalidate = useCallback(async () => {
        if (!enabled) return

        const attemptOnce = () =>
            withTimeout(
                fetcherRef.current(),
                timeoutMs,
                `Query [${cacheKey}] took longer than ${timeoutMs}ms`
            )

        const myRun = (runId.current += 1)
        const isCurrent = () => myRun === runId.current

        try {
            setError(null)
            // A network failure is retried once before the screen is told the
            // load failed. An answer — empty or not — is never retried.
            const freshData = await withRetry(attemptOnce, { attempts, isRetryable: isTransientError })
            if (!isCurrent()) return
            setData(freshData)
            setIsStale(false)
            setError(null)
            setCache(cacheKey, freshData)
        } catch (err) {
            if (!isCurrent()) return
            console.warn(`Query [${cacheKey}] failed:`, err?.message)
            // Keep whatever we last showed on screen, and mark it as old.
            setError(err || new Error('The request failed'))
            const cached = getCached(cacheKey, ttl)
            if (cached) {
                setData(cached.data)
                setIsStale(true)
            }
        } finally {
            if (isCurrent()) setIsLoading(false)
        }
    }, [cacheKey, ttl, enabled, timeoutMs, attempts])

    // Initial fetch
    useEffect(() => {
        if (enabled) {
            revalidate()
        }
    }, [revalidate, enabled])

    // Re-fetch when coming back online
    useEffect(() => {
        const handleOnline = () => {
            revalidate()
        }

        window.addEventListener('online', handleOnline)
        return () => window.removeEventListener('online', handleOnline)
    }, [revalidate])

    return {
        data,
        isLoading,
        isStale,
        error,
        refetch: revalidate,
    }
}
