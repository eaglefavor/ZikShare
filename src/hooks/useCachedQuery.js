import { useState, useEffect, useCallback, useRef } from 'react'
import { getCached, setCache, CACHE_TTL } from '../lib/cache'

/**
 * Custom hook that wraps async data fetching with a SWR-style cache.
 * - Serves cached data instantly (if available)
 * - Fetches fresh data in the background
 * - Handles loading, error, and stale states
 * - Auto-revalidates when the network comes back online
 * - Includes a strict 8-second safety timeout so it never hangs in loading state
 *
 * @param {string} cacheKey - Unique key for this query
 * @param {function} fetcher - Async function that returns data
 * @param {object} options
 * @param {number} options.ttl - Cache TTL in ms (default: CACHE_TTL.LISTINGS)
 * @param {boolean} options.enabled - Whether to run the fetcher (default: true)
 * @param {number} options.timeoutMs - Maximum time to wait for fresh data before unblocking UI (default: 8000ms)
 */
export function useCachedQuery(cacheKey, fetcher, options = {}) {
    const { ttl = CACHE_TTL.LISTINGS, enabled = true, timeoutMs = 8000 } = options

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isStale, setIsStale] = useState(false)
    const [error, setError] = useState(null)
    const fetcherRef = useRef(fetcher)
    fetcherRef.current = fetcher

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

        let timeoutId
        try {
            setError(null)
            const fetchPromise = Promise.resolve(fetcherRef.current())
            const timeoutPromise = new Promise((_, reject) => {
                timeoutId = setTimeout(() => reject(new Error('Query timeout')), timeoutMs)
            })

            const freshData = await Promise.race([fetchPromise, timeoutPromise])
            setData(freshData)
            setIsStale(false)
            setCache(cacheKey, freshData)
        } catch (err) {
            console.warn(`Query [${cacheKey}] revalidation warning:`, err?.message)
            setError(err)
            // If we have cached data, keep showing it even on error
            const cached = getCached(cacheKey, ttl)
            if (cached) {
                setData(cached.data)
                setIsStale(true)
            }
        } finally {
            if (timeoutId) clearTimeout(timeoutId)
            setIsLoading(false)
        }
    }, [cacheKey, ttl, enabled, timeoutMs])

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
