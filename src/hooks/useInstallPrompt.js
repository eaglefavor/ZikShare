/**
 * "Add ZikShare to your home screen", offered once, honestly.
 *
 * The app already works with no connection once it has been opened — that is
 * what the service worker is for — but an installed icon is what makes a
 * reader come back to it on a phone, and nothing was ever inviting them to do
 * it. Browsers only allow the invitation through the `beforeinstallprompt`
 * event, which is why the event is kept here rather than a button that would
 * do nothing when it fires.
 *
 * Two rules: never ask twice in a month if the reader says no, and never show
 * the offer to somebody who has already installed it.
 */
import { useCallback, useEffect, useState } from 'react'

const DISMISS_KEY = 'zikshare:install-dismissed'
const SNOOZE_DAYS = 30

/** True when the page is already running as an installed app. */
export function isStandalone() {
    if (typeof window === 'undefined') return false
    if (window.navigator?.standalone) return true // iOS Safari
    return typeof window.matchMedia === 'function'
        ? window.matchMedia('(display-mode: standalone)').matches ||
              window.matchMedia('(display-mode: minimal-ui)').matches
        : false
}

/** iPhone and iPad, where the browser has no install event and the reader
 *  has to use Share ▸ Add to Home Screen. */
export function isIosSafari() {
    if (typeof navigator === 'undefined') return false
    const ua = navigator.userAgent || ''
    const ios = /iPad|iPhone|iPod/.test(ua) || (ua.includes('Macintosh') && navigator.maxTouchPoints > 1)
    return ios && !navigator.standalone
}

export function dismissedRecently(now = Date.now()) {
    try {
        const stamp = Number(localStorage.getItem(DISMISS_KEY) || 0)
        return stamp > 0 && now - stamp < SNOOZE_DAYS * 24 * 60 * 60 * 1000
    } catch {
        return false
    }
}

export function rememberDismissal(now = Date.now()) {
    try {
        localStorage.setItem(DISMISS_KEY, String(now))
    } catch {
        // Nothing to remember in a private window; the offer just returns.
    }
}

export function useInstallPrompt() {
    const [event, setEvent] = useState(null)
    const [installed, setInstalled] = useState(() => isStandalone())
    const [ios] = useState(() => isIosSafari())

    useEffect(() => {
        const onPrompt = (e) => {
            // Without this the browser shows its own mini-infobar and the event
            // cannot be used later, which is the single most common way this
            // feature ends up doing nothing.
            e.preventDefault()
            setEvent(e)
        }
        const onInstalled = () => {
            setInstalled(true)
            setEvent(null)
        }

        window.addEventListener('beforeinstallprompt', onPrompt)
        window.addEventListener('appinstalled', onInstalled)
        return () => {
            window.removeEventListener('beforeinstallprompt', onPrompt)
            window.removeEventListener('appinstalled', onInstalled)
        }
    }, [])

    const promptInstall = useCallback(async () => {
        if (!event) return 'unavailable'
        event.prompt()
        const choice = await event.userChoice.catch(() => null)
        setEvent(null)
        return choice?.outcome || 'dismissed'
    }, [event])

    return { canInstall: Boolean(event), installed, ios, promptInstall }
}
