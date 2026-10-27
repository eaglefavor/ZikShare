import { describe, it, expect, vi, beforeEach } from 'vitest'
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import BookReaderPage from '../pages/BookReaderPage'
import * as pdfReader from '../lib/pdfReader'

const BOOK_SLUG = 'let-us-pray-watchman-nee'

vi.mock('../lib/pdfReader', async () => {
  const actual = await vi.importActual('../lib/pdfReader')
  return {
    ...actual,
    openPdfDocument: vi.fn(),
    renderPdfPage: vi.fn(),
    naturalPageWidth: vi.fn(),
  }
})

function renderReader(slug = BOOK_SLUG, base = '/library/books', docSlug = slug) {
  return render(
    <MemoryRouter initialEntries={[`${base}/${docSlug}/read`]}>
      <Routes>
        <Route path="/library/books/:slug/read" element={<BookReaderPage />} />
        <Route path="/library/doc/:slug/read" element={<BookReaderPage />} />
        <Route path="/library/books/:slug" element={<div>BOOK PAGE</div>} />
        <Route path="/library/doc/:slug" element={<div>DOCUMENT PAGE</div>} />
        <Route path="/library" element={<div>LIBRARY</div>} />
      </Routes>
    </MemoryRouter>
  )
}

describe('Book reader', { timeout: 20000 }, () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    pdfReader.naturalPageWidth.mockResolvedValue(400)
    pdfReader.renderPdfPage.mockResolvedValue({ width: 400, height: 600 })
  })

  it('renders page one of the book from the served PDF', async () => {
    pdfReader.openPdfDocument.mockResolvedValue({ numPages: 71 })

    renderReader()

    expect(await screen.findByLabelText(/Page 1 of 71 of Let Us Pray/)).toBeInTheDocument()
    expect(pdfReader.openPdfDocument).toHaveBeenCalledWith('/library/books/let-us-pray-watchman-nee.pdf')
    expect(screen.getByText(/71 pages/)).toBeInTheDocument()
    expect(screen.getByLabelText('Page number')).toHaveValue(1)
  })

  it('says the file is taking longer instead of spinning forever on a slow link', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    // A request that never answers: the old reader showed "Opening the
    // document…" for as long as the tab stayed open.
    pdfReader.openPdfDocument.mockReturnValue(new Promise(() => {}))

    try {
      renderReader()
      expect(screen.getByText('Opening the document…')).toBeInTheDocument()

      await act(async () => {
        vi.advanceTimersByTime(13000)
      })

      expect(screen.getByText('This is taking longer than usual')).toBeInTheDocument()
      // It offers a way out that does not depend on the reader at all.
      const downloads = screen
        .getAllByRole('link', { name: /Download/ })
        .filter((link) => link.hasAttribute('download'))
      expect(downloads.length).toBeGreaterThan(0)
      for (const link of downloads) {
        expect(link).toHaveAttribute('href', '/library/books/let-us-pray-watchman-nee.pdf')
      }
      expect(screen.getByRole('button', { name: /Try again/ })).toBeInTheDocument()
    } finally {
      vi.useRealTimers()
    }
  })

  it('asks again when the reader presses Try again', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    pdfReader.openPdfDocument.mockReturnValue(new Promise(() => {}))

    try {
      renderReader()
      await act(async () => {
        vi.advanceTimersByTime(13000)
      })

      const callsBefore = pdfReader.openPdfDocument.mock.calls.length
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /Try again/ }))
      })

      expect(pdfReader.openPdfDocument.mock.calls.length).toBe(callsBefore + 1)
      expect(screen.queryByText('This is taking longer than usual')).not.toBeInTheDocument()
    } finally {
      vi.useRealTimers()
    }
  })

  it('pages forward and back, and stops at the last page', async () => {
    pdfReader.openPdfDocument.mockResolvedValue({ numPages: 3 })

    renderReader()
    await screen.findByLabelText(/Page 1 of 3/)

    fireEvent.click(screen.getByLabelText('Next page'))
    await waitFor(() => expect(screen.getByLabelText('Page number')).toHaveValue(2))

    fireEvent.click(screen.getByLabelText('Next page'))
    await waitFor(() => expect(screen.getByLabelText('Page number')).toHaveValue(3))

    // Already on the last page: the control is disabled and nothing moves.
    expect(screen.getByLabelText('Next page')).toBeDisabled()
    fireEvent.click(screen.getByLabelText('Next page'))
    expect(screen.getByLabelText('Page number')).toHaveValue(3)

    fireEvent.click(screen.getByLabelText('Previous page'))
    await waitFor(() => expect(screen.getByLabelText('Page number')).toHaveValue(2))
  })

  it('jumps to a typed page number and ignores impossible ones', async () => {
    pdfReader.openPdfDocument.mockResolvedValue({ numPages: 71 })

    renderReader()
    const input = await screen.findByLabelText('Page number')

    fireEvent.change(input, { target: { value: '30' } })
    await waitFor(() => expect(screen.getByLabelText('Page number')).toHaveValue(30))

    fireEvent.change(input, { target: { value: '900' } })
    await waitFor(() => expect(screen.getByLabelText('Page number')).toHaveValue(71))
  })

  it('remembers where the reader stopped', async () => {
    localStorage.setItem(`zikshare:book-progress:${BOOK_SLUG}`, '12')
    pdfReader.openPdfDocument.mockResolvedValue({ numPages: 71 })

    renderReader()

    await waitFor(() => expect(screen.getByLabelText('Page number')).toHaveValue(12))
  })

  it('ignores saved progress past the end of the book', async () => {
    localStorage.setItem(`zikshare:book-progress:${BOOK_SLUG}`, '9999')
    pdfReader.openPdfDocument.mockResolvedValue({ numPages: 71 })

    renderReader()

    await waitFor(() => expect(screen.getByLabelText('Page number')).toHaveValue(1))
  })

  it('offers the file plainly when the reader cannot draw it', async () => {
    pdfReader.openPdfDocument.mockRejectedValue(new Error('PDF.js failed to initialize'))

    renderReader()

    expect(await screen.findByText(/The reader could not draw this file/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Open the PDF/ })).toHaveAttribute(
      'href',
      '/library/books/let-us-pray-watchman-nee.pdf'
    )
    // Both the top-bar download and the in-message one point at the same file.
    const downloads = screen.getAllByRole('link', { name: /Download/ })
    expect(downloads.length).toBeGreaterThanOrEqual(2)
    for (const link of downloads) {
      expect(link).toHaveAttribute('href', '/library/books/let-us-pray-watchman-nee.pdf')
    }
  })

  it("opens a play in the app, not in the phone's PDF viewer", async () => {
    pdfReader.openPdfDocument.mockResolvedValue({ numPages: 71 })
    renderReader('antigone-sophocles', '/library/doc')

    await waitFor(() => expect(screen.getByLabelText('Page number')).toBeInTheDocument())
    expect(pdfReader.openPdfDocument).toHaveBeenCalledWith('/library/drama/antigone-sophocles.pdf')
    expect(screen.getByText(/Sophocles/)).toBeInTheDocument()
  })

  it('says plainly when the address is not a document', async () => {
    renderReader('not-a-real-book')
    expect(await screen.findByText('Document not found')).toBeInTheDocument()
  })
})
