/**
 * One answer to "should this screen load pictures?", shared by every card.
 *
 * A plain hook would give each card its own copy of the state, and turning the
 * setting off would then re-render one card and not the others. The choice and
 * the connection rating live here instead, in a tiny store every card
 * subscribes to, so a change reaches all of them at once.
 */
import { useCallback, useEffect } from 'react'
import { useSyncExternalStore } from 'react'
import {
    CONNECTION_CHANGE_EVENT,
    connectionIsSlow,
    readConnection,
    readDataSaverChoice,
    storeDataSaverChoice,
} from '../lib/dataSaver'

const listeners = new Set()
let slowLink = connectionIsSlow()
let snapshot = `${readDataSaverChoice()}:${slowLink ? 'slow' : 'fast'}`
let watchingConnection = false

function refresh() {
    const choice = readDataSaverChoice()
    const next = `${choice}:${slowLink ? 'slow' : 'fast'}`
    if (next === snapshot) return
    snapshot = next
    for (const listener of listeners) listener()
}

/**
 * Watches the connection for as long as something is listening.
 *
 * The event name is `change` in Chrome and `connectionchange` in older
 * WebViews; both are listened for, because a phone that never fires it would
 * keep pictures off after the reader walked into wifi.
 */
function watchConnection() {
    if (watchingConnection) return
    watchingConnection = true
    const connection = readConnection()
    if (!connection?.addEventListener) return

    const onChange = () => {
        const next = connectionIsSlow(connection)
        if (next === slowLink) return
        slowLink = next
        refresh()
    }
    connection.addEventListener('change', onChange)
    connection.addEventListener('connectionchange', onChange)
    connection.addEventListener('onchange', onChange)
}

function subscribe(listener) {
    listeners.add(listener)
    watchConnection()
    return () => listeners.delete(listener)
}

function getSnapshot() {
    return snapshot
}

/** Re-reads the connection now — a browser that never fires `change`. */
export function refreshConnectionState() {
    const next = connectionIsSlow()
    if (next === slowLink) return
    slowLink = next
    refresh()
}

export function setDataSaverChoice(choice) {
    storeDataSaverChoice(choice)
    refresh()
}

/**
 * @returns {{saving: boolean, choice: 'auto'|'on'|'off', slowLink: boolean, setChoice: function}}
 */
export function useDataSaver() {
    const current = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
    const [choice, link] = current.split(':')
    const saving = choice === 'on' || (choice === 'auto' && link === 'slow')

    const setChoice = useCallback((next) => setDataSaverChoice(next), [])

    useEffect(() => {
        // A page restored from the back/forward cache keeps its old snapshot.
        const onShow = () => refreshConnectionState()
        window.addEventListener('pageshow', onShow)
        window.addEventListener('online', onShow)
        window.addEventListener(CONNECTION_CHANGE_EVENT, onShow)
        return () => {
            window.removeEventListener('pageshow', onShow)
            window.removeEventListener('online', onShow)
            window.removeEventListener(CONNECTION_CHANGE_EVENT, onShow)
        }
    }, [])

    return { saving, choice, slowLink: link === 'slow', setChoice }
}
