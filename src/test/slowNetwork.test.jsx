/**
 * Screens that keep their story straight when the network fails.
 *
 * The rule: an empty list means the server said "nothing here". A dropped
 * request must say so, with a way to try again — never dress up as an empty
 * marketplace, which is a claim about the world the app cannot support.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import AppShell from '../components/AppShell'
import * as database from '../lib/database'

vi.mock('../lib/database', () => ({
    getListings: vi.fn(),
    getAnnouncements: vi.fn().mockResolvedValue([]),
    getUnreadAnnouncementsCount: vi.fn().mockResolvedValue(0),
    getConversations: vi.fn().mockResolvedValue([]),
}))

vi.mock('../contexts/AuthContext', () => ({
    useAuth: () => ({ isAuthenticated: false, session: null, user: null, loading: false }),
}))

vi.mock('../lib/announcements', () => ({
    getUnreadAnnouncementsCount: vi.fn().mockResolvedValue(0),
    markAnnouncementsAsRead: vi.fn(),
}))

vi.mock('../lib/readStatus', () => ({
    countUnread: vi.fn(() => 0),
    markConversationRead: vi.fn(),
}))

vi.mock('../lib/messaging', () => ({
    getConversations: vi.fn().mockResolvedValue([]),
}))

function renderHome() {
    return render(
        <MemoryRouter>
            <HomePage />
        </MemoryRouter>
    )
}

describe('The landing page on a bad connection', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        localStorage.clear()
    })

    it('says the marketplace could not be reached when the request fails', async () => {
        database.getListings.mockRejectedValue(new TypeError('Failed to fetch'))

        renderHome()

        // Not "Nothing listed yet" — that would be a claim it cannot make.
        expect(await screen.findByText(/Could not reach ZikShare/i, {}, { timeout: 5000 })).toBeInTheDocument()
        expect(screen.queryByText(/Nothing listed yet/i)).not.toBeInTheDocument()
        expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
    })

    it('offers a retry that really asks again, and shows the listing when it arrives', async () => {
        database.getListings.mockRejectedValue(new TypeError('Failed to fetch'))
        renderHome()

        const retry = await screen.findByRole('button', { name: /try again/i }, { timeout: 5000 })

        database.getListings.mockResolvedValue([
            {
                id: 'l1',
                title: 'Oxford standing fan',
                price: 12000,
                condition: 'Fairly Used',
                isDigital: false,
                images: [],
            },
        ])
        fireEvent.click(retry)

        await waitFor(
            () => expect(screen.getByText('Oxford standing fan')).toBeInTheDocument(),
            { timeout: 5000 }
        )
        expect(database.getListings).toHaveBeenCalled()
        expect(screen.queryByText(/Could not reach ZikShare/i)).not.toBeInTheDocument()
    })

    it('still shows the real empty state when the answer is an empty marketplace', async () => {
        database.getListings.mockResolvedValue([])

        renderHome()

        expect(await screen.findByText(/Nothing listed yet/i)).toBeInTheDocument()
        expect(screen.queryByText(/Could not reach ZikShare/i)).not.toBeInTheDocument()
    })

    it('renders the nine shelves before the catalogue arrives', async () => {
        database.getListings.mockResolvedValue([])

        renderHome()

        // Names and descriptions come from the light module; the counts are the
        // only thing that waits for the catalogue chunk.
        expect(screen.getByText('Greek Tragedy')).toBeInTheDocument()
        expect(screen.getByText('Modern Theatre')).toBeInTheDocument()
        expect(screen.getByText('Christian Books')).toBeInTheDocument()
        expect(await screen.findAllByText(/Greek plays to download/i, {}, { timeout: 5000 })).not.toHaveLength(0)
    })
})

describe('The shell when the phone is offline', () => {
    const originalOnLine = navigator.onLine

    afterEach(() => {
        Object.defineProperty(navigator, 'onLine', { value: originalOnLine, configurable: true })
    })

    it('says the reader is offline, and where to go anyway', async () => {
        Object.defineProperty(navigator, 'onLine', { value: true, configurable: true })

        render(
            <MemoryRouter>
                <AppShell>
                    <p>page</p>
                </AppShell>
            </MemoryRouter>
        )

        expect(screen.queryByText(/You are offline/i)).not.toBeInTheDocument()

        Object.defineProperty(navigator, 'onLine', { value: false, configurable: true })
        window.dispatchEvent(new Event('offline'))

        await waitFor(() => expect(screen.getByText(/You are offline/i)).toBeInTheDocument())
        expect(screen.getByText(/saved to this device/i)).toBeInTheDocument()
    })
})
