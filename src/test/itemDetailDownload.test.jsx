import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { FRESHER_LIBRARY_PACKS } from '../lib/fresherLibrary'
import { CHRISTIAN_BOOKS } from '../lib/christianBooks'
import ItemDetailPage from '../pages/ItemDetailPage'
import * as database from '../lib/database'

vi.mock('../lib/database', () => ({
  getListing: vi.fn(),
  getUserPurchaseForProduct: vi.fn(),
  createSignedDownloadUrl: vi.fn(),
  getSellerReviews: vi.fn(),
  getSellerRatingSummary: vi.fn(),
}))

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ user: null, session: null, isAuthenticated: false, currentUserId: null }),
}))

vi.mock('../components/Toast', () => ({
  useToast: () => ({ showToast: vi.fn() }),
}))

vi.mock('../lib/savedItems', () => ({
  isSaved: () => false,
  toggleSaved: vi.fn(),
}))

vi.mock('../lib/messaging', () => ({
  getOrCreateConversation: vi.fn(),
}))

vi.mock('../lib/pdfWatermark', () => ({
  downloadWatermarkedPdf: vi.fn(),
  getDrmPassword: () => null,
}))

vi.mock('../lib/pdfPreview', () => ({
  renderPdfSampleCanvas: vi.fn(),
}))

function renderItem(id) {
  return render(
    <MemoryRouter initialEntries={[`/item/${id}`]}>
      <Routes>
        <Route path="/item/:id" element={<ItemDetailPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('Library item download on /item/:id', { timeout: 20000 }, () => {
  beforeEach(() => {
    vi.clearAllMocks()
    database.getUserPurchaseForProduct.mockResolvedValue(null)
    database.getSellerReviews.mockResolvedValue([])
    database.getSellerRatingSummary.mockResolvedValue({ averageRating: 5, totalReviews: 0 })
  })

  it('offers the free pack PDF when the row is exactly what seeding writes', async () => {
    const pack = FRESHER_LIBRARY_PACKS.find((p) => p.code === 'THA 151')
    database.getListing.mockResolvedValue({
      id: '95447a40-7356-4068-83df-b98a1d93aa17',
      title: pack.title,
      course_code: pack.code,
      original_storage_path: pack.storage_path,
      preview_path: pack.preview_path,
      page_count: pack.page_count,
      file_size_bytes: pack.file_size_bytes,
      price: 0,
      is_free: true,
      status: 'active',
      category: 'Academic & Study Materials',
      subcategory: pack.material_type,
      level: pack.level,
      condition: 'Digital PDF',
      isDigital: true,
      sellerId: '39d7f852-4f0c-463f-ac3f-bf3a6f3e6540',
      users: { displayName: 'ZikShare Official', isVerified: true },
    })

    renderItem('95447a40-7356-4068-83df-b98a1d93aa17')

    expect(await screen.findByText(pack.title)).toBeInTheDocument()
    const links = await screen.findAllByRole('link', { name: /download|read/i })
    const hrefs = links.map((l) => l.getAttribute('href'))
    expect(hrefs).toContain(pack.download_path)

    // The download is above the description, not buried under the seller card.
    const cta = await screen.findByRole('link', { name: /Download the free PDF/i })
    expect(cta).toHaveAttribute('href', pack.download_path)
    expect(cta.textContent).toContain(`${pack.page_count} pages`)
    expect(cta.textContent).toContain('27 KB')

    // A 27 KB pack must never be reported as "0.0 MB".
    expect(screen.queryByText('0.0 MB')).not.toBeInTheDocument()
  })

  it('still offers the PDF when the listing is not flagged digital', async () => {
    const pack = FRESHER_LIBRARY_PACKS.find((p) => p.code === 'THA 151')
    database.getListing.mockResolvedValue({
      id: '95447a40-7356-4068-83df-b98a1d93aa17',
      title: pack.title,
      original_storage_path: pack.storage_path,
      page_count: pack.page_count,
      file_size_bytes: pack.file_size_bytes,
      price: 0,
      is_free: true,
      condition: 'Digital PDF',
      isDigital: false,
      sellerId: '39d7f852-4f0c-463f-ac3f-bf3a6f3e6540',
      users: { displayName: 'ZikShare Official', isVerified: true },
    })

    renderItem('95447a40-7356-4068-83df-b98a1d93aa17')

    const cta = await screen.findByRole('link', { name: /Download the free PDF/i })
    expect(cta).toHaveAttribute('href', pack.download_path)
  })

  it('offers the book PDF for a seeded Christian book row', async () => {
    const book = CHRISTIAN_BOOKS[0]
    database.getListing.mockResolvedValue({
      id: '11111111-1111-1111-1111-111111111111',
      title: book.title,
      original_storage_path: `christian-books/${book.slug}.pdf`,
      page_count: book.page_count,
      file_size_bytes: book.file_size_bytes,
      price: 0,
      is_free: true,
      condition: 'Digital PDF',
      isDigital: true,
      sellerId: '39d7f852-4f0c-463f-ac3f-bf3a6f3e6540',
      users: { displayName: 'ZikShare Official', isVerified: true },
    })

    renderItem('11111111-1111-1111-1111-111111111111')

    const ctas = await screen.findAllByRole('link', { name: /Download the full book/i })
    expect(ctas[0]).toHaveAttribute('href', `/library/books/${book.slug}.pdf`)
    expect(ctas[0].textContent).toContain(`${book.page_count} pages`)
  })
})
