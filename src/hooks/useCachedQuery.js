import { useState, useEffect, useCallback, useRef } from 'react'
import { getCached, setCache, CACHE_TTL } from '../lib/cache'

/**
 * Custom hook that wraps async data fetching with a SWR-style cache.
 * - Serves cached data instantly (if available)
 * - Fetches fresh data in the background
 * - Handles loading, error, and stale states
 * - Auto-revalidates when the network comes back online
 *
 * @param {string} cacheKey - Unique key for this query
 * @param {function} fetcher - Async function that returns data
 * @param {object} options
 * @param {number} options.ttl - Cache TTL in ms (default: CACHE_TTL.LISTINGS)
 * @param {boolean} options.enabled - Whether to run the fetcher (default: true)
 */
export function useCachedQuery(cacheKey, fetcher, options = {}) {
    const { ttl = CACHE_TTL.LISTINGS, enabled = true } = options

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

    // Fetch fresh data (revalidate)
    const revalidate = useCallback(async () => {
        if (!enabled) return

        try {
            setError(null)
            const freshData = await fetcherRef.current()
            setData(freshData)
            setIsStale(false)
            setCache(cacheKey, freshData)
        } catch (err) {
            setError(err)
            // If we have cached data, keep showing it even on error
            const cached = getCached(cacheKey, ttl)
            if (cached) {
                setData(cached.data)
                setIsStale(true)
            }
        } finally {
            setIsLoading(false)
        }
    }, [cacheKey, ttl, enabled])

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
