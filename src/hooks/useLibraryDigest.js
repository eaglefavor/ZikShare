import { useEffect, useState } from 'react'

/**
 * Counts for the shelf cards and one book for this week.
 *
 * The shelf names and descriptions render immediately from the light
 * `shelves.js`; this fills in the numbers as soon as the catalogue chunk
 * arrives. On a fast connection that is invisible. On a slow one, the landing
 * page is readable while this is still on its way — and if it never arrives
 * (a dropped connection), the page shows the shelves without inventing counts.
 */
export default function useLibraryDigest() {
    const [digest, setDigest] = useState(null)

    useEffect(() => {
        let alive = true

        import('../lib/libraryDigest')
            .then((module) => {
                if (!alive) return
                setDigest(module.libraryDigest())
            })
            .catch((err) => {
                // Offline, or the chunk failed to load: the page stays readable
                // without counts rather than claiming a number it does not have.
                console.warn('[library] digest unavailable:', err?.message)
            })

        return () => {
            alive = false
        }
    }, [])

    return digest
}
