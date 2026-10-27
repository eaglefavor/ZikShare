/**
 * The two marketplace promises that used to be text only.
 *
 * A seller's page said "No ratings" forever because nothing ever wrote a
 * review, and the handshake PIN was promised on the post form while no PIN was
 * ever created. Both are now real: these tests drive the screens that do it.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import PurchasedItemsPage from '../pages/PurchasedItemsPage'
import ChatPage from '../pages/ChatPage'
import * as database from '../lib/database'
import fs from 'node:fs'
import path from 'node:path'

const createReview = vi.fn()
const getMyReviewedOrderIds = vi.fn()
const arrangeMeetup = vi.fn()
const verifyHandshakePin = vi.fn()
const getEscrowTradesForUser = vi.fn()
const sendMessage = vi.fn()

vi.mock('../contexts/AuthContext', () => ({
    useAuth: () => ({
        session: { user: { id: 'me' } },
        user: { uid: 'me', displayName: 'Chike' },
        isAuthenticated: true,
    }),
}))

vi.mock('../components/Toast', () => ({
    useToast: () => ({ success: vi.fn(), error: vi.fn(), info: vi.fn() }),
}))

vi.mock('../lib/database', () => ({
    getBuyerOrders: vi.fn(),
    createSignedDownloadUrl: vi.fn(),
    getMyReviewedOrderIds: (...a) => getMyReviewedOrderIds(...a),
    createReview: (...a) => createReview(...a),
    getUser: vi.fn().mockResolvedValue({ displayName: 'Ada', phoneNumber: '' }),
    getOffersForConversation: vi.fn().mockResolvedValue([]),
    getEscrowTradesForUser: (...a) => getEscrowTradesForUser(...a),
    arrangeMeetup: (...a) => arrangeMeetup(...a),
    verifyHandshakePin: (...a) => verifyHandshakePin(...a),
    createOffer: vi.fn(),
    respondToOffer: vi.fn(),
}))

// Which side of the conversation the mocked reader is on. The seller test
// flips this so the app shows the seller's side of the handover.
let conversationBuyerId = 'me'

vi.mock('../lib/messaging', () => ({
    getConversation: vi.fn(async () => ({
        id: 'c1',
        buyerId: conversationBuyerId,
        sellerId: 'them',
        item: { id: 'i1', title: 'Oxford Standing Fan', price: 15000, isDigital: false, lodge_location: 'Gifte' },
    })),
    getMessages: vi.fn().mockResolvedValue([]),
    sendMessage: (...a) => sendMessage(...a),
    subscribeToMessages: vi.fn(() => () => {}),
    uploadChatAttachment: vi.fn(),
    getOrCreateConversation: vi.fn(),
}))

vi.mock('../lib/readStatus', () => ({ markConversationRead: vi.fn() }))
vi.mock('../lib/paystack', () => ({ claimPurchaseByReference: vi.fn() }))
vi.mock('../lib/pdfWatermark', () => ({ downloadWatermarkedPdf: vi.fn(), getDrmPassword: () => 'ZIK-1234' }))
vi.mock('../components/PaystackCheckout', () => ({ default: () => null }))

const order = {
    id: 'o1',
    buyer_id: 'me',
    seller_id: 'them',
    product_id: 'p1',
    amount: 200000,
    paystack_reference: 'ZKS-TEST-1',
    created_at: '2026-10-01T10:00:00.000Z',
    product: { title: 'MTH 101 Past Questions', category: 'Academic', drm_enabled: false },
    seller: { displayName: 'Ada' },
}

function renderPurchases() {
    return render(
        <MemoryRouter>
            <PurchasedItemsPage />
        </MemoryRouter>
    )
}

describe('Rating a seller', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        database.getBuyerOrders.mockResolvedValue([order])
        getMyReviewedOrderIds.mockResolvedValue([])
        createReview.mockResolvedValue({ id: 'r1' })
    })

    it('offers a rating only on something you actually bought', async () => {
        renderPurchases()

        const rate = await screen.findByRole('button', { name: /rate the seller/i })
        fireEvent.click(rate)

        // A star rating and a sentence, then it posts.
        fireEvent.click(screen.getByRole('radio', { name: /5 of 5/i }))
        fireEvent.change(screen.getByLabelText(/what should the next student know/i), {
            target: { value: 'Met me at Garba Square and the questions matched the course.' },
        })
        fireEvent.click(screen.getByRole('button', { name: /post rating/i }))

        await waitFor(() => expect(createReview).toHaveBeenCalledTimes(1))
        expect(createReview).toHaveBeenCalledWith(
            expect.objectContaining({
                sellerId: 'them',
                reviewerId: 'me',
                orderId: 'o1',
                itemTitle: 'MTH 101 Past Questions',
                rating: 5,
            })
        )
    })

    it('refuses a rating with no stars, and says why', async () => {
        renderPurchases()
        fireEvent.click(await screen.findByRole('button', { name: /rate the seller/i }))
        fireEvent.change(screen.getByLabelText(/what should the next student know/i), {
            target: { value: 'Fine.' },
        })
        fireEvent.click(screen.getByRole('button', { name: /post rating/i }))

        expect(await screen.findByRole('alert')).toHaveTextContent(/choose a star rating/i)
        expect(createReview).not.toHaveBeenCalled()
    })

    it('does not ask again once the order is rated', async () => {
        getMyReviewedOrderIds.mockResolvedValue(['o1'])
        renderPurchases()

        expect(await screen.findByText(/you rated Ada/i)).toBeInTheDocument()
        expect(screen.queryByRole('button', { name: /rate the seller/i })).not.toBeInTheDocument()
    })
})

function renderChat() {
    return render(
        <MemoryRouter initialEntries={['/chat/c1']}>
            <Routes>
                <Route path="/chat/:conversationId" element={<ChatPage />} />
                <Route path="/messages" element={<div>INBOX</div>} />
            </Routes>
        </MemoryRouter>
    )
}

describe('Campus handshake', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        conversationBuyerId = 'me'
        arrangeMeetup.mockResolvedValue({
            id: 't1',
            listing_id: 'i1',
            buyer_id: 'me',
            seller_id: 'them',
            item_title: 'Oxford Standing Fan',
            meetup_location: 'Gifte',
            handshake_pin: '4821',
            status: 'meetup_arranged',
        })
        sendMessage.mockResolvedValue({ id: 'm9' })
    })

    it('arranges the meetup and shows the buyer a PIN', async () => {
        getEscrowTradesForUser.mockResolvedValue([])
        renderChat()

        fireEvent.click(await screen.findByRole('button', { name: /arrange a meetup/i }))

        await waitFor(() => expect(arrangeMeetup).toHaveBeenCalledTimes(1))
        expect(arrangeMeetup).toHaveBeenCalledWith(
            expect.objectContaining({ listingId: 'i1', buyerId: 'me', sellerId: 'them' })
        )
        expect(await screen.findByText('4821')).toBeInTheDocument()
        // Nothing about money being held or released.
        expect(screen.queryByText(/released|escrow|funds/i)).not.toBeInTheDocument()
    })

    it('shows this thread’s meetup, not somebody else’s', async () => {
        getEscrowTradesForUser.mockResolvedValue([
            {
                id: 'other',
                listing_id: 'unrelated-listing',
                buyer_id: 'me',
                seller_id: 'someone-else',
                item_title: 'Bed frame',
                meetup_location: 'Ifite',
                handshake_pin: '1111',
                status: 'meetup_arranged',
            },
            {
                id: 't1',
                listing_id: 'i1',
                buyer_id: 'me',
                seller_id: 'them',
                item_title: 'Oxford Standing Fan',
                meetup_location: 'Gifte',
                handshake_pin: '4821',
                status: 'meetup_arranged',
            },
        ])
        renderChat()

        fireEvent.click(await screen.findByRole('button', { name: /show pin/i }))

        expect(await screen.findByText('4821')).toBeInTheDocument()
        expect(screen.queryByText('1111')).not.toBeInTheDocument()
    })

    it('marks the item handed over when the seller enters the right PIN', async () => {
        getEscrowTradesForUser.mockResolvedValue([
            {
                id: 't1',
                listing_id: 'i1',
                buyer_id: 'someone-else',
                seller_id: 'me',
                item_title: 'Oxford Standing Fan',
                meetup_location: 'Gifte',
                handshake_pin: '4821',
                status: 'meetup_arranged',
            },
        ])
        conversationBuyerId = 'someone-else'
        verifyHandshakePin.mockResolvedValue({
            success: true,
            trade: { id: 't1', status: 'delivered' },
        })
        renderChat()

        fireEvent.click(await screen.findByRole('button', { name: /enter pin/i }))
        fireEvent.change(screen.getByLabelText(/buyer’s 4-digit pin/i), { target: { value: '4821' } })
        fireEvent.click(screen.getByRole('button', { name: /mark as handed over/i }))

        await waitFor(() => expect(verifyHandshakePin).toHaveBeenCalledWith('t1', '4821'))
        expect(await screen.findByText(/item is marked handed over/i)).toBeInTheDocument()
    })
})

describe('What the marketplace tells students', () => {
    const read = (file) => fs.readFileSync(path.join(process.cwd(), file), 'utf8')

    it('never promises money held or released by ZikShare', () => {
        // These sentences were on the post form, the item page and the help
        // page while no money was ever held. Say what happens instead.
        const files = ['src/pages/PostPage.jsx', 'src/pages/ItemDetailPage.jsx', 'src/pages/HelpPage.jsx', 'src/pages/ChatPage.jsx']
        const offenders = []
        for (const file of files) {
            const text = read(file)
            for (const phrase of [
                /funds released/i,
                /release[sd]? the held payment/i,
                /payment released/i,
                /escrow held/i,
                /six-digit handshake/i,
                /Safe Meetup & Escrow/i,
            ]) {
                if (phrase.test(text)) offenders.push(`${file}: ${phrase}`)
            }
        }
        expect(offenders).toEqual([])
    })

    it('states the four-digit PIN and that no money is held', () => {
        expect(read('src/pages/HelpPage.jsx')).toMatch(/four-digit handshake PIN/i)
        expect(read('src/pages/HelpPage.jsx')).toMatch(/never holds the money/i)
    })
})
