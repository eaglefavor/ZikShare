/**
 * The invitation to install the app.
 *
 * Two rules matter and both are tested here: the offer must never appear when
 * the app is already installed, and a reader who says "not now" must not be
 * asked again for a month.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { act, render, screen, fireEvent } from '@testing-library/react'
import InstallBanner from '../components/InstallBanner'
import { dismissedRecently, isStandalone, rememberDismissal } from '../hooks/useInstallPrompt'

/** A `beforeinstallprompt` event the way Chrome sends it. */
function installEvent(outcome = 'accepted') {
    const event = new Event('beforeinstallprompt')
    event.prompt = vi.fn()
    event.userChoice = Promise.resolve({ outcome })
    return event
}

/**
 * Mounts the banner first, then hands it the install event.
 *
 * Order matters: the listener only exists once the component is on the page,
 * and an event dispatched before that is never seen — which is exactly the
 * mistake this helper exists to prevent in every test below.
 */
async function renderWithPrompt(outcome = 'accepted') {
    const event = installEvent(outcome)
    const view = render(<InstallBanner />)
    await act(async () => {
        window.dispatchEvent(event)
    })
    return { event, view }
}

async function settleBanner() {
    await act(async () => {
        vi.advanceTimersByTime(2600)
    })
}

async function renderAfterDelay(outcome = 'accepted') {
    const result = await renderWithPrompt(outcome)
    await settleBanner()
    return result
}

beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers({ shouldAdvanceTime: true })
})

afterEach(() => {
    vi.useRealTimers()
})

describe('Offering the app', () => {
    it('waits for the page to settle before asking', async () => {
        await renderWithPrompt()

        // Nothing during the first paint: on a weak link that is where the
        // reader's milliseconds are going.
        expect(screen.queryByRole('region', { name: /Install ZikShare/i })).not.toBeInTheDocument()

        await settleBanner()
        expect(screen.getByRole('region', { name: /Install ZikShare/i })).toBeInTheDocument()
    })

    it('asks the browser to install when the button is pressed', async () => {
        const { event } = await renderAfterDelay('accepted')

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /Add to home screen/i }))
        })

        expect(event.prompt).toHaveBeenCalled()
        expect(screen.queryByRole('region', { name: /Install ZikShare/i })).not.toBeInTheDocument()
    })

    it('does not ask again for a month when the reader declines', async () => {
        await renderAfterDelay('accepted')

        fireEvent.click(screen.getByRole('button', { name: /Not now/i }))
        expect(dismissedRecently()).toBe(true)
        expect(screen.queryByRole('region', { name: /Install ZikShare/i })).not.toBeInTheDocument()

        // A fresh visit inside the month stays quiet.
        await renderAfterDelay('accepted')
        expect(screen.queryByRole('region', { name: /Install ZikShare/i })).not.toBeInTheDocument()
    })

    it('asks again once a month has passed', () => {
        rememberDismissal(Date.now() - 31 * 24 * 60 * 60 * 1000)
        expect(dismissedRecently()).toBe(false)
    })

    it('says nothing where the browser offers no install', async () => {
        // No event, which is what Firefox and some Android WebViews do: the
        // app must not show a button that could only do nothing.
        render(<InstallBanner />)
        await settleBanner()
        expect(screen.queryByRole('region', { name: /Install ZikShare/i })).not.toBeInTheDocument()
    })

    it('says nothing inside an installed app', async () => {
        const matchMedia = vi.fn().mockReturnValue({ matches: true })
        const original = window.matchMedia
        window.matchMedia = matchMedia
        expect(isStandalone()).toBe(true)

        await renderAfterDelay()
        expect(screen.queryByRole('region', { name: /Install ZikShare/i })).not.toBeInTheDocument()

        window.matchMedia = original
    })
})
