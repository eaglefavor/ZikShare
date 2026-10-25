/**
 * Posting has to be short. These assertions keep it that way: two fields are
 * enough to publish an item, and everything else sits behind one honest
 * "optional" fold instead of in front of the seller.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PostPage from '../pages/PostPage'

vi.mock('../contexts/AuthContext', () => ({
    useAuth: () => ({
        session: { user: { id: 'me' } },
        user: { uid: 'me', displayName: 'Chike', email: 'chike@unizik.edu.ng' },
        isAuthenticated: true,
        loading: false,
    }),
}))

vi.mock('../lib/database', () => ({
    createListing: vi.fn(),
    createDigitalProduct: vi.fn(),
    upsertUser: vi.fn(),
}))

vi.mock('../lib/supabase', () => ({
    default: { storage: { from: () => ({ upload: vi.fn() }) } },
}))

vi.mock('../lib/cloudinary', () => ({
    uploadImage: vi.fn(),
    uploadImages: vi.fn(() => Promise.resolve([])),
}))

vi.mock('../lib/pdfPreview', () => ({
    extractFirstPageThumbnail: vi.fn(() => Promise.resolve(null)),
}))

function renderAt(path = '/post') {
    return render(
        <MemoryRouter initialEntries={[path]}>
            <PostPage />
        </MemoryRouter>
    )
}

describe('Posting a listing', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('asks for two things, in plain words', async () => {
        renderAt()
        expect(await screen.findByRole('heading', { name: /new listing/i })).toBeTruthy()
        expect(screen.getByText(/a title and a price is enough to post/i)).toBeTruthy()
        // Nothing to post yet, so the button explains itself instead of just
        // sitting there greyed out.
        expect(screen.getByRole('button', { name: /^post it$/i }).disabled).toBe(true)
        expect(screen.getByText(/add a title to post/i)).toBeTruthy()
    })

    it('keeps the optional fields folded away until asked for', async () => {
        const { container } = renderAt()
        await screen.findByRole('heading', { name: /new listing/i })

        const extras = container.querySelector('details.zs-post-extras')
        expect(extras).toBeTruthy()
        expect(extras.open).toBe(false)
        // The description lives inside the fold, not in front of the seller.
        expect(extras.querySelector('textarea')).toBeTruthy()
        expect(screen.getByText(/more details \(optional\)/i)).toBeTruthy()
    })

    it('opens on the upload form when the link says digital', async () => {
        renderAt('/post?type=digital')
        expect(await screen.findByRole('button', { name: /upload it/i })).toBeTruthy()
    })
})
