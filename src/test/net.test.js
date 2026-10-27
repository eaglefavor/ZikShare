/**
 * What happens when the connection, not the code, is the problem.
 *
 * A request that times out must not be turned into "there is nothing here".
 * These tests pin the two halves of that: the retry only retries things worth
 * retrying, and it gives up with the real error rather than a quiet empty
 * result.
 */
import { describe, it, expect, vi } from 'vitest'
import { TimeoutError, isTransientError, retryDelay, withRetry, withTimeout } from '../lib/net'

describe('Telling a dropped connection from an answer', () => {
    it('knows a timeout', () => {
        expect(isTransientError(new TimeoutError())).toBe(true)
        expect(isTransientError(new Error('Query [feed] took longer than 8000ms'))).toBe(true)
    })

    it('knows the browser wordings for a failed fetch', () => {
        expect(isTransientError(new TypeError('Failed to fetch'))).toBe(true)
        expect(isTransientError(new TypeError('Load failed'))).toBe(true) // Safari
        expect(isTransientError(new Error('NetworkError when attempting to fetch resource.'))).toBe(true)
        expect(isTransientError({ code: 'ETIMEDOUT', message: '' })).toBe(true)
    })

    it('does not treat a real answer as a network problem', () => {
        expect(isTransientError(new Error('permission denied for table listings'))).toBe(false)
        expect(isTransientError(new Error('duplicate key value violates unique constraint'))).toBe(false)
        expect(isTransientError(null)).toBe(false)
    })

    it('waits longer between each retry, but not forever', () => {
        expect(retryDelay(0)).toBe(600)
        expect(retryDelay(1)).toBe(1800)
        expect(retryDelay(2)).toBeGreaterThan(retryDelay(1))
    })
})

describe('withRetry', () => {
    it('retries a network failure and returns the answer that follows', async () => {
        const task = vi
            .fn()
            .mockRejectedValueOnce(new TimeoutError())
            .mockResolvedValueOnce(['one listing'])

        await expect(withRetry(task, { attempts: 2 })).resolves.toEqual(['one listing'])
        expect(task).toHaveBeenCalledTimes(2)
    })

    it('never retries an answer that came back as an error', async () => {
        const task = vi.fn().mockRejectedValue(new Error('permission denied for table listings'))

        await expect(withRetry(task, { attempts: 3 })).rejects.toThrow(/permission denied/)
        expect(task).toHaveBeenCalledTimes(1)
    })

    it('gives up loudly after the last attempt', async () => {
        const task = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))

        await expect(withRetry(task, { attempts: 2 })).rejects.toThrow(/Failed to fetch/)
        expect(task).toHaveBeenCalledTimes(2)
    })

    it('does not sleep between attempts when the error is not retryable', async () => {
        const started = Date.now()
        const task = vi.fn().mockRejectedValueOnce(new Error('bad request')).mockResolvedValue('x')
        await expect(withRetry(task, { attempts: 2 })).rejects.toThrow(/bad request/)
        expect(Date.now() - started).toBeLessThan(300)
    })
})

describe('Giving up on a request that never answers', () => {
    it('rejects with a timeout the screen can act on', async () => {
        const never = new Promise(() => {})
        await expect(withTimeout(never, 20)).rejects.toBeInstanceOf(TimeoutError)
    })

    it('lets a real answer through, and keeps the size of the answer', async () => {
        await expect(withTimeout(Promise.resolve(['a listing']), 50)).resolves.toEqual(['a listing'])
    })

    it('passes a real failure on unchanged, not as a timeout', async () => {
        const failed = Promise.reject(new TypeError('Failed to fetch'))
        await expect(withTimeout(failed, 50)).rejects.toThrow(/Failed to fetch/)
    })

    it('does not hold the event loop open after a quick answer', async () => {
        const started = Date.now()
        await withTimeout(Promise.resolve('ok'), 5000)
        expect(Date.now() - started).toBeLessThan(200)
    })
})
