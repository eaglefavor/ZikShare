/**
 * Make a PDF build repeatable, byte for byte.
 *
 * `pdf-lib` gives every embedded font subset a random six-letter name and
 * stamps each file with the time it was written. Two builds over unchanged
 * text therefore produce different files, and rebuilding the Theatre Arts
 * shelf rewrote all sixty-four PDFs — fourteen megabytes of binary diff — to
 * add one book. That is also why the shelf's checksum test could not tell a
 * real change from a rebuild.
 *
 * Calling this at the top of a build script fixes both: the name generator is
 * a seeded random sequence, and the dates written into the file are fixed. A
 * build then changes only when the text, the covers or the catalogue do.
 */

/** A small, seedable PRNG (mulberry32). Returns floats in [0, 1). */
function seededRandom(seed) {
    let state = seed >>> 0
    return () => {
        state = (state + 0x6d2b79f5) >>> 0
        let t = state
        t = Math.imul(t ^ (t >>> 15), t | 1)
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

/** The date written into every file this build produces. */
export const BUILD_DATE = new Date('2026-01-01T00:00:00Z')

export function reproducibleBuilds({ seed = 20260101 } = {}) {
    Math.random = seededRandom(seed)
    return BUILD_DATE
}
