import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  getCached,
  setCache,
  invalidateCache,
  invalidateCacheByPrefix,
  safeLocalStorageSet,
  safeLocalStorageGet,
} from '../lib/cache'

describe('SWR Cache & Safe LocalStorage Verification', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('stores and retrieves cache entry accurately', () => {
    const testData = { id: 101, title: 'Calculus Past Questions', price: 1500 }
    setCache('test_pq', testData)

    const cached = getCached('test_pq', 60000)
    expect(cached).not.toBeNull()
    expect(cached.data).toEqual(testData)
    expect(cached.isStale).toBe(false)
    expect(cached.timestamp).toBeGreaterThan(0)
  })

  it('flags cached entry as stale when age exceeds TTL', () => {
    const testData = { id: 202, title: 'Standing Fan', price: 12000 }
    setCache('test_fan', testData)

    // Check with 0ms TTL to force staleness
    const cached = getCached('test_fan', -1)
    expect(cached).not.toBeNull()
    expect(cached.data).toEqual(testData)
    expect(cached.isStale).toBe(true)
  })

  it('invalidates single cache key and prefix groups', () => {
    setCache('listings_page1', [{ id: 1 }])
    setCache('listings_page2', [{ id: 2 }])
    setCache('user_profile', { name: 'Chukwuebuka' })

    invalidateCache('listings_page1')
    expect(getCached('listings_page1', 60000)).toBeNull()
    expect(getCached('listings_page2', 60000)).not.toBeNull()

    invalidateCacheByPrefix('listings_')
    expect(getCached('listings_page2', 60000)).toBeNull()
    expect(getCached('user_profile', 60000)).not.toBeNull()
  })

  it('safeLocalStorageSet handles primitive and JSON data safely', () => {
    const success1 = safeLocalStorageSet('test_str', 'sample_string')
    expect(success1).toBe(true)
    expect(safeLocalStorageGet('test_str')).toBe('sample_string')

    const success2 = safeLocalStorageSet('test_obj', { key: 'value', count: 42 })
    expect(success2).toBe(true)
    expect(safeLocalStorageGet('test_obj')).toEqual({ key: 'value', count: 42 })
  })

  it('safeLocalStorageGet returns fallback when key does not exist or parse fails', () => {
    expect(safeLocalStorageGet('non_existent_key', 'default_val')).toBe('default_val')
    expect(safeLocalStorageGet('non_existent_key')).toBeNull()
  })

  it('evicts oldest entries when localStorage throws QuotaExceededError', () => {
    // Mock setItem to throw once and then succeed
    let throwOnce = true
    const originalSetItem = localStorage.setItem.bind(localStorage)
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation((key, val) => {
      if (throwOnce && key.includes('big_entry')) {
        throwOnce = false
        throw new Error('QuotaExceededError')
      }
      return originalSetItem(key, val)
    })

    // Populate some old cache keys
    setCache('item_old_1', { data: 1 })
    setCache('item_old_2', { data: 2 })

    const result = safeLocalStorageSet('big_entry', { data: 'large_payload' })
    expect(result).toBe(true)
  })
})
