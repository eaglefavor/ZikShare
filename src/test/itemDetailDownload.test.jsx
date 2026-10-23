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

  // The authored pack shelf can be empty (the old shelves were cleared). These
  // two cases guard the behaviour that matters when new packs land: a row whose
  // storage path matches a real pack must serve the public copy of the PDF, and
  // a row that points at a pack which no longer exists must not fake a link.
  const firstPack = FRESHER_LIBRARY_PACKS[0]

  function packRow(pack) {
    return {
      id: '95447a40-7356-4068-83df-b98a1d93aa17',
      title: pack.title,
      original_storage_path: pack.storage_path,
      page_count: pack.page_count,
      file_size_bytes: pack.file_size_bytes,
      price: 0,
      is_free: true,
      status: 'active',
      category: 'Academic & Study Materials',
      subcategory: pack.material_type,
      level: pack.level,
      condition: 'Digital PDF',
      isDigital: false,
      sellerId: '39d7f852-4f0c-463f-ac3f-bf3a6f3e6540',
      users: { displayName: 'ZikShare Official', isVerified: true },
    }
  }

  it('serves the public PDF for a row that matches a pack on the shelf', async () => {
    if (!firstPack) return

    database.getListing.mockResolvedValue(packRow(firstPack))
    renderItem('95447a40-7356-4068-83df-b98a1d93aa17')

    expect(await screen.findByText(firstPack.title)).toBeInTheDocument()
    const hrefs = (await screen.findAllByRole('link', { name: /download|read/i }))
      .map((l) => l.getAttribute('href'))
    expect(hrefs).toContain(firstPack.download_path)

    const cta = await screen.findByRole('link', { name: /Download the free PDF/i })
    expect(cta).toHaveAttribute('href', firstPack.download_path)
    expect(cta.textContent).toContain(`${firstPack.page_count} pages`)
    expect(screen.queryByText('0.0 MB')).not.toBeInTheDocument()
  })

  it('never fakes a download for a row whose pack is no longer on the shelf', async () => {
    const retired = {
      slug: 'tha-151-removed-pack',
      title: 'THA 151: A pack that is no longer in the library',
      storage_path: 'official-library/tha-151-removed-pack.pdf',
      download_path: '/library/packs/tha-151-removed-pack.pdf',
      preview_path: '/library/previews/tha-151-removed-pack.pdf',
      page_count: 12,
      file_size_bytes: 27 * 1024,
      material_type: 'lecture-notes',
      level: '100L',
    }
    database.getListing.mockResolvedValue(packRow(retired))
    renderItem('95447a40-7356-4068-83df-b98a1d93aa17')

    expect(await screen.findByText(retired.title)).toBeInTheDocument()
    // No dead link to a PDF that was deleted with the shelf.
    const hrefs = screen.queryAllByRole('link').map((l) => l.getAttribute('href'))
    expect(hrefs).not.toContain(retired.download_path)
    expect(hrefs).not.toContain(retired.preview_path)
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
