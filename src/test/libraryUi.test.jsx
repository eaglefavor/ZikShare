import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route, useParams } from 'react-router-dom'
import { FRESHER_LIBRARY_PACKS } from '../lib/fresherLibrary'
import { CHRISTIAN_BOOKS } from '../lib/christianBooks'
import LibraryPage from '../pages/LibraryPage'
import BookDetailPage from '../pages/BookDetailPage'
import * as database from '../lib/database'

vi.mock('../lib/database', () => ({
  getDigitalProducts: vi.fn(),
}))

describe('Digital Library UI Component Tests', { timeout: 15000 }, () => {
  beforeEach(() => {
    vi.clearAllMocks()
    database.getDigitalProducts.mockResolvedValue([])
  })

  it('renders library title, search bar, and all faculty selector pills', async () => {
    render(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>
    )

    expect(await screen.findByText('UNIZIK Digital Library')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Search course code/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'All Faculties' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Faculty of Engineering' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Faculty of Medicine' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Faculty of Agriculture' })).toBeInTheDocument()
  })

  it('filters study packs in real-time when searching by course code', async () => {
    render(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>
    )

    const searchInput = screen.getByPlaceholderText(/Search course code/i)
    fireEvent.change(searchInput, { target: { value: 'LAW 101' } })

    expect(screen.getByText(/LAW 101: The Nigerian Legal System/i)).toBeInTheDocument()
    expect(screen.queryByText(/FEG 101: Engineering Mathematics I/i)).not.toBeInTheDocument()
  })

  it('dynamically reveals department selector pills when a faculty is selected', async () => {
    render(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>
    )

    // Initially department pills for Engineering should not be present
    expect(screen.queryByText(/Departments in Faculty of Engineering/i)).not.toBeInTheDocument()

    // Click Faculty of Engineering
    const engButton = screen.getByRole('button', { name: 'Faculty of Engineering' })
    fireEvent.click(engButton)

    // Verify departments appear as pill buttons
    expect(screen.getByText(/Departments in Faculty of Engineering/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Mechanical Engineering' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Electrical Engineering' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Civil Engineering' })).toBeInTheDocument()
  })

  it('filters study packs by department when clicking a department pill', async () => {
    render(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>
    )

    // Select Faculty of Law
    fireEvent.click(screen.getByRole('button', { name: 'Faculty of Law' }))

    // Select Public Law department pill
    fireEvent.click(screen.getByRole('button', { name: 'Public Law' }))

    // The LAW 101 pack belongs to Public Law; the engineering pack must disappear
    expect(screen.getByText(/LAW 101: The Nigerian Legal System/i)).toBeInTheDocument()
    expect(screen.queryByText(/FEG 101: Engineering Mathematics I/i)).not.toBeInTheDocument()
  })

  it('resets filters cleanly when clicking Show All Faculties', async () => {
    render(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>
    )

    // Select Faculty of Law
    fireEvent.click(screen.getByRole('button', { name: 'Faculty of Law' }))
    expect(screen.getByText(/Departments in Faculty of Law/i)).toBeInTheDocument()

    // Click Show All Faculties
    fireEvent.click(screen.getByText('Show All Faculties'))
    expect(screen.queryByText(/Departments in Faculty of Law/i)).not.toBeInTheDocument()
    expect(screen.getAllByText(/GST 101/i).length).toBeGreaterThan(0)
  })

  it('filters by material domain and exposes a free preview link for each PDF pack', async () => {
    render(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>
    )

    // Domain chips are rendered with pack counts
    const studySkillsChip = screen.getByRole('button', { name: /Study Skills \(\d+\)/ })
    fireEvent.click(studySkillsChip)

    expect(screen.getByText(/How to Study at University/i)).toBeInTheDocument()
    expect(screen.queryByText(/GST 101: Use of English I/i)).not.toBeInTheDocument()

    // Preview links point at real generated files
    const previewLinks = screen.getAllByText(/Free 3-page preview/i)
    expect(previewLinks.length).toBeGreaterThan(0)
    expect(previewLinks[0].getAttribute('href')).toMatch(/^\/library\/previews\/[a-z0-9-]+\.pdf$/)
  })

  it('shows the full authored catalog count when no database rows exist', async () => {
    render(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>
    )

    const total = FRESHER_LIBRARY_PACKS.length + CHRISTIAN_BOOKS.length
    expect(await screen.findByText(new RegExp(`All Domains \\(${total}\\)`))).toBeInTheDocument()
    expect(screen.getByText(new RegExp(`Library Materials \\(${total}\\)`))).toBeInTheDocument()
  })
})

function BookRouteProbe() {
  const { slug } = useParams()
  return <div>BOOK PAGE {slug}</div>
}

function renderLibraryWithBookRoute() {
  return render(
    <MemoryRouter initialEntries={['/library']}>
      <Routes>
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/library/books/:slug" element={<BookRouteProbe />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('Christian Books shelf UI', { timeout: 15000 }, () => {
  beforeEach(() => {
    vi.clearAllMocks()
    database.getDigitalProducts.mockResolvedValue([])
  })

  it('offers a Christian Books domain in the filter list', async () => {
    render(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>
    )

    expect(await screen.findByRole('button', { name: /Christian Books \(\d+\)/ })).toBeInTheDocument()
  })

  it('lists a book and opens its own page rather than an item page', async () => {
    renderLibraryWithBookRoute()

    fireEvent.click(await screen.findByRole('button', { name: /Christian Books \(\d+\)/ }))

    expect(await screen.findByText('The Spiritual Man')).toBeInTheDocument()
    expect(screen.getAllByText(/Watchman Nee/).length).toBeGreaterThan(0)

    fireEvent.click(screen.getByText('The Spiritual Man'))
    expect(await screen.findByText('BOOK PAGE the-spiritual-man-watchman-nee')).toBeInTheDocument()
  })

  it('still opens the book page for a book that has a database row', async () => {
    const seeded = CHRISTIAN_BOOKS.find((b) => b.slug === 'the-spiritual-man-watchman-nee')
    database.getDigitalProducts.mockResolvedValue([
      {
        id: '33333333-3333-3333-3333-333333333333',
        title: 'The Spiritual Man',
        category: 'Christian Books',
        subcategory: 'textbooks',
        domain: 'Christian Books',
        page_count: seeded.page_count,
        original_storage_path: `christian-books/${seeded.slug}.pdf`,
        price: 0,
        is_free: true,
      },
    ])

    renderLibraryWithBookRoute()

    fireEvent.click(await screen.findByRole('button', { name: /Christian Books \(\d+\)/ }))

    const titles = await screen.findAllByText('The Spiritual Man')
    expect(titles).toHaveLength(1)

    fireEvent.click(titles[0])
    expect(await screen.findByText('BOOK PAGE the-spiritual-man-watchman-nee')).toBeInTheDocument()
  })

  it('gives every book a page with its cover, topics and a free full-text link', async () => {
    const book = CHRISTIAN_BOOKS.find((b) => b.slug === 'let-us-pray-watchman-nee')
    render(
      <MemoryRouter initialEntries={['/library/books/let-us-pray-watchman-nee']}>
        <Routes>
          <Route path="/library/books/:slug" element={<BookDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(await screen.findByRole('heading', { name: 'Let Us Pray' })).toBeInTheDocument()
    expect(screen.getByAltText('Cover of Let Us Pray')).toHaveAttribute(
      'src',
      '/library/books/covers/let-us-pray-watchman-nee.jpg'
    )
    expect(screen.getByText(/Free — no fee, no checkout/)).toBeInTheDocument()
    expect(screen.getByText(`${book.page_count} pages`)).toBeInTheDocument()
    for (const topic of book.topics) {
      expect(screen.getByText(topic)).toBeInTheDocument()
    }

    const fullText = screen.getByRole('link', { name: /Start reading/ })
    expect(fullText).toHaveAttribute('href', '/library/books/let-us-pray-watchman-nee.pdf')
    expect(screen.getByRole('link', { name: /Download the PDF/ })).toHaveAttribute(
      'href',
      '/library/books/let-us-pray-watchman-nee.pdf'
    )
  })

  it('puts a real download link on every card', async () => {
    render(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>
    )

    const links = await screen.findAllByRole('link', { name: /Download Free PDF/i })
    expect(links.length).toBeGreaterThanOrEqual(FRESHER_LIBRARY_PACKS.length)

    // Downloads are anchors with an href, not a span that only looks like a button.
    for (const link of links.slice(0, 5)) {
      expect(link.getAttribute('href')).toMatch(/^\/library\/(packs|books)\/.+\.pdf$/)
    }
  })

  it('says plainly when a book is not on the shelf', async () => {
    render(
      <MemoryRouter initialEntries={['/library/books/not-a-real-book']}>
        <Routes>
          <Route path="/library/books/:slug" element={<BookDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(await screen.findByText('Book not found')).toBeInTheDocument()
  })
})
