/**
 * SWR-style localStorage cache layer.
 * Serves stale data instantly while revalidating in the background.
 * Designed for poor-connectivity environments.
 */

const CACHE_PREFIX = 'zikshare_cache_'

/**
 * Get cached data by key.
 * @param {string} key
 * @returns {{ data: any, isStale: boolean, timestamp: number } | null}
 */
export function getCached(key, ttlMs) {
    try {
        const raw = localStorage.getItem(CACHE_PREFIX + key)
        if (!raw) return null

        const { data, timestamp } = JSON.parse(raw)
        const age = Date.now() - timestamp
        const isStale = age > ttlMs

        return { data, isStale, timestamp }
    } catch {
        return null
    }
}

/**
 * Set cache entry.
 * @param {string} key
 * @param {any} data
 */
export function setCache(key, data) {
    try {
        localStorage.setItem(
            CACHE_PREFIX + key,
            JSON.stringify({ data, timestamp: Date.now() })
        )
    } catch (e) {
        // localStorage might be full — evict oldest entries
        evictOldest()
        try {
            localStorage.setItem(
                CACHE_PREFIX + key,
                JSON.stringify({ data, timestamp: Date.now() })
            )
        } catch {
            // Give up silently — app continues without cache
        }
    }
}

/**
 * Invalidate a specific cache key.
 * @param {string} key
 */
export function invalidateCache(key) {
    localStorage.removeItem(CACHE_PREFIX + key)
}

/**
 * Invalidate all cache entries matching a prefix.
 * E.g., invalidateCacheByPrefix('listings') clears all listing caches.
 * @param {string} prefix
 */
export function invalidateCacheByPrefix(prefix) {
    const fullPrefix = CACHE_PREFIX + prefix
    const keysToRemove = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith(fullPrefix)) {
            keysToRemove.push(key)
        }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k))
}

/**
 * Evict the oldest cache entries when localStorage is full.
 */
function evictOldest() {
    const entries = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith(CACHE_PREFIX)) {
            try {
                const { timestamp } = JSON.parse(localStorage.getItem(key))
                entries.push({ key, timestamp })
            } catch {
                entries.push({ key, timestamp: 0 })
            }
        }
    }

    // Sort oldest first and remove the 5 oldest
    entries.sort((a, b) => a.timestamp - b.timestamp)
    const toRemove = entries.slice(0, 5)
    toRemove.forEach(e => localStorage.removeItem(e.key))
}

// ── Default TTLs (in milliseconds) ──
export const CACHE_TTL = {
    LISTINGS: 5 * 60 * 1000,        // 5 minutes
    LISTING_DETAIL: 10 * 60 * 1000, // 10 minutes
    CATEGORIES: 30 * 60 * 1000,     // 30 minutes
    USER_PROFILE: 15 * 60 * 1000,   // 15 minutes
}
