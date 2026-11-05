/**
 * Whether this reader's connection can afford pictures.
 *
 * Every card in the app carries a photograph, and a photograph is the most
 * expensive thing on the page: a shelf of nine covers is several hundred
 * kilobytes that a reader on a 2G link in Awka is paying for by the megabyte.
 * The browser already knows when that is a bad idea — `saveData` is set when
 * Data Saver is on, and `effectiveType` says what kind of link it is — so the
 * app listens for both instead of loading first and apologising later.
 *
 * The reader's own choice always wins, and it is remembered.
 */

export const DATA_SAVER_KEY = 'zikshare:data-saver'

/** Fired on `window` when the reader changes the setting on another screen. */
export const CONNECTION_CHANGE_EVENT = 'zikshare:data-saver-changed'

/** 'auto' (obey the connection), 'on' (never load pictures), 'off' (always). */
export function readDataSaverChoice() {
    try {
        const stored = localStorage.getItem(DATA_SAVER_KEY)
        return stored === 'on' || stored === 'off' ? stored : 'auto'
    } catch {
        return 'auto'
    }
}

export function storeDataSaverChoice(choice) {
    try {
        if (choice === 'on' || choice === 'off') localStorage.setItem(DATA_SAVER_KEY, choice)
        else localStorage.removeItem(DATA_SAVER_KEY)
    } catch {
        // A private window that refuses storage still gets the automatic mode.
    }
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event(CONNECTION_CHANGE_EVENT))
    }
}

/** The Network Information API, under whichever name this browser uses. */
export function readConnection(navigatorRef = typeof navigator === 'undefined' ? null : navigator) {
    if (!navigatorRef) return null
    return navigatorRef.connection || navigatorRef.mozConnection || navigatorRef.webkitConnection || null
}

/**
 * True when the connection itself says "do not send pictures".
 *
 * Data Saver on, or a link the browser rates as 2G. `effectiveType` is a
 * rating of measured throughput, not a guess from the device, and browsers
 * that do not implement it return nothing — in which case the answer is no,
 * and the reader decides.
 */
export function connectionIsSlow(connection = readConnection()) {
    if (!connection) return false
    if (connection.saveData === true) return true
    return connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g'
}
