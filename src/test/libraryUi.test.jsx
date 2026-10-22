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

describe('Digital Library UI Component Tests', { timeout: 20000 }, () => {
  beforeEach(() => {
    vi.clearAllMocks()
    database.getDigitalProducts.mockResolvedValue([])
  })

  const renderLibrary = () =>
    render(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>
    )

  const openFilters = () => fireEvent.click(screen.getByRole('button', { name: /^Filters/ }))

  it('opens with a title, one search field, and results already visible', async () => {
    renderLibrary()

    expect(await screen.findByText('UNIZIK Digital Library')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Search a course code/i)).toBeInTheDocument()

    // The first document is on the first screen: no wall of filters above it.
    expect(screen.getAllByRole('link', { name: /Download Free PDF/i }).length).toBeGreaterThan(0)
    // Filters are behind one control until the reader asks for them.
    expect(screen.queryByRole('button', { name: 'Faculty of Engineering' })).not.toBeInTheDocument()
  })

  it('filters study packs in real-time when searching by course code', async () => {
    renderLibrary()

    const searchInput = screen.getByPlaceholderText(/Search a course code/i)
    fireEvent.change(searchInput, { target: { value: 'LAW 101' } })

    expect(screen.getByText(/LAW 101: The Nigerian Legal System/i)).toBeInTheDocument()
    expect(screen.queryByText(/FEG 101: Engineering Mathematics I/i)).not.toBeInTheDocument()
  })

  it('reveals departments only after a faculty is chosen in the filter sheet', async () => {
    renderLibrary()
    openFilters()

    expect(screen.queryByText(/Departments in Faculty of Engineering/i)).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Faculty of Engineering' }))

    expect(screen.getByText(/Departments in Faculty of Engineering/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Mechanical Engineering' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Electrical Engineering' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Civil Engineering' })).toBeInTheDocument()
  })

  it('filters packs by department and reports how many results remain', async () => {
    renderLibrary()
    openFilters()

    fireEvent.click(screen.getByRole('button', { name: 'Faculty of Law' }))
    fireEvent.click(screen.getByRole('button', { name: 'Public Law' }))
    openFilters.call ? null : null
    fireEvent.click(screen.getByRole('button', { name: /^Show \d+ results?$/ }))

    expect(screen.getByText(/LAW 101: The Nigerian Legal System/i)).toBeInTheDocument()
    expect(screen.queryByText(/FEG 101: Engineering Mathematics I/i)).not.toBeInTheDocument()
  })

  it('clears every filter in one action', async () => {
    renderLibrary()
    openFilters()

    fireEvent.click(screen.getByRole('button', { name: 'Faculty of Law' }))
    fireEvent.click(screen.getByRole('button', { name: /^Clear all filters$/ }))
    fireEvent.click(screen.getByRole('button', { name: /^Show \d+ results?$/ }))

    expect(screen.queryByText(/Departments in Faculty of Law/i)).not.toBeInTheDocument()
    expect(screen.getAllByText(/GST 101/i).length).toBeGreaterThan(0)
  })

  it('filters by shelf and keeps a free preview for each pack', async () => {
    renderLibrary()
    openFilters()

    fireEvent.click(screen.getByRole('button', { name: /Study Skills \(\d+\)/ }))
    fireEvent.click(screen.getByRole('button', { name: /^Show \d+ results?$/ }))

    expect(screen.getByText(/How to Study at University/i)).toBeInTheDocument()
    expect(screen.queryByText(/GST 101: Use of English I/i)).not.toBeInTheDocument()

    const previewLinks = screen.getAllByText(/^Preview$/)
    expect(previewLinks.length).toBeGreaterThan(0)
    expect(previewLinks[0].getAttribute('href')).toMatch(/^\/library\/previews\/[a-z0-9-]+\.pdf$/)
  })

  it('counts every authored document, with or without database rows', async () => {
    renderLibrary()
    const total = FRESHER_LIBRARY_PACKS.length + CHRISTIAN_BOOKS.length

    expect(
      await screen.findByText(new RegExp(`${FRESHER_LIBRARY_PACKS.length} student-written course packs`))
    ).toBeInTheDocument()

    openFilters()
    expect(screen.getByRole('button', { name: `All Domains (${total})` })).toBeInTheDocument()
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

    fireEvent.click(await screen.findByRole('button', { name: /^Filters/ }))
    expect(screen.getByRole('button', { name: /Christian Books \(\d+\)/ })).toBeInTheDocument()
  })

  it('lists a book and opens its own page rather than an item page', async () => {
    renderLibraryWithBookRoute()

    fireEvent.click(await screen.findByRole('button', { name: /^Filters/ }))
    fireEvent.click(screen.getByRole('button', { name: /Christian Books \(\d+\)/ }))
    fireEvent.click(screen.getByRole('button', { name: /^Show \d+ results?$/ }))

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

    fireEvent.click(await screen.findByRole('button', { name: /^Filters/ }))
    fireEvent.click(screen.getByRole('button', { name: /Christian Books \(\d+\)/ }))
    fireEvent.click(screen.getByRole('button', { name: /^Show \d+ results?$/ }))

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
          <Route path="/library/books/:slug/read" element={<BookRouteProbe />} />
        </Routes>
      </MemoryRouter>
    )

    expect(await screen.findByRole('heading', { name: 'Let Us Pray' })).toBeInTheDocument()
    expect(screen.getByAltText('Cover of Let Us Pray')).toHaveAttribute(
      'src',
      '/library/books/covers/let-us-pray-watchman-nee.jpg'
    )
    expect(screen.getByText('Free')).toBeInTheDocument()
    expect(screen.getByText(/No account, no checkout, no payment/)).toBeInTheDocument()
    expect(screen.getByText(`${book.page_count} pages`)).toBeInTheDocument()
    for (const topic of book.topics) {
      expect(screen.getByText(topic)).toBeInTheDocument()
    }

    // The PDF is still one click away, without leaving the page.
    expect(screen.getByRole('link', { name: /Download the PDF/ })).toHaveAttribute(
      'href',
      '/library/books/let-us-pray-watchman-nee.pdf'
    )
    expect(screen.getByRole('link', { name: /open the PDF in a new tab/i })).toHaveAttribute(
      'href',
      '/library/books/let-us-pray-watchman-nee.pdf'
    )

    // Reading happens in the app.
    fireEvent.click(screen.getByRole('button', { name: /Start reading/ }))
    expect(await screen.findByText('BOOK PAGE let-us-pray-watchman-nee')).toBeInTheDocument()
  })

  it('offers other books from the same author on a book page', async () => {
    render(
      <MemoryRouter initialEntries={['/library/books/let-us-pray-watchman-nee']}>
        <Routes>
          <Route path="/library/books/:slug" element={<BookDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(await screen.findByText('More on this shelf')).toBeInTheDocument()
    expect(screen.getByText('The Spiritual Man')).toBeInTheDocument()
    // The book you are reading is never offered as its own suggestion.
    expect(screen.queryAllByText('Let Us Pray')).toHaveLength(1)
  })

  it('finds books by author and by subject, not only by course code', async () => {
    database.getDigitalProducts.mockResolvedValue([])
    render(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>
    )

    const search = await screen.findByPlaceholderText(/Search a course code/i)
    fireEvent.change(search, { target: { value: 'Watchman Nee' } })

    expect(await screen.findByText('The Spiritual Man')).toBeInTheDocument()
    expect(screen.getByText('Let Us Pray')).toBeInTheDocument()
    // A different author's book does not match this author's name.
    expect(screen.queryByText('Lucifer Exposed')).not.toBeInTheDocument()
    expect(screen.queryByText(/THA 151/)).not.toBeInTheDocument()

    fireEvent.change(search, { target: { value: 'prayer' } })
    expect(await screen.findByText('Let Us Pray')).toBeInTheDocument()
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
