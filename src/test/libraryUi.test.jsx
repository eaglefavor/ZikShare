import { describe, it, expect, vi, beforeEach } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route, useParams } from 'react-router-dom'
import { FRESHER_LIBRARY_PACKS } from '../lib/fresherLibrary'
import { CHRISTIAN_BOOKS } from '../lib/christianBooks'
import { DRAMA_PLAYS, EURIPIDES_NOT_AVAILABLE } from '../lib/dramaLibrary'
import { ROMAN_PLAYS } from '../lib/romanLibrary'
import { MEDIEVAL_NOT_AVAILABLE, MEDIEVAL_PLAYS } from '../lib/medievalLibrary'
import { GST_SHELF } from '../lib/gstLibraryData'
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

  const SEARCH = /Search by title, author or course code/i

  it('opens with a title, one search field, and results already visible', async () => {
    renderLibrary()

    expect(await screen.findByText('UNIZIK Digital Library')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(SEARCH)).toBeInTheDocument()

    // The shelf is on the first screen: no wall of filters above it.
    expect(await screen.findByText('The Spiritual Man')).toBeInTheDocument()
    // Filters are behind one control until the reader asks for them.
    expect(screen.queryByRole('button', { name: 'Faculty of Engineering' })).not.toBeInTheDocument()
  })

  it('advertises only the documents that are actually on the shelf', async () => {
    renderLibrary()

    expect(
      await screen.findByText(
        new RegExp(
          `^${CHRISTIAN_BOOKS.length} full-length books, ${GST_SHELF.length} NOUN course manuals to download, ` +
            `\\d+ Greek plays to download, ${ROMAN_PLAYS.length} Roman plays to download ` +
            `and ${MEDIEVAL_PLAYS.length} medieval plays to download\\.`
        )
      )
    ).toBeInTheDocument()
    // No claim about course packs, because there are none to download.
    expect(screen.queryByText(/student-written course packs/i)).not.toBeInTheDocument()
  })

  it('narrows the shelf as the reader types, and says when nothing matches', async () => {
    renderLibrary()

    const searchInput = await screen.findByPlaceholderText(SEARCH)
    fireEvent.change(searchInput, { target: { value: 'Watchman Nee' } })
    expect(await screen.findByText('The Spiritual Man')).toBeInTheDocument()

    // A course code finds the hosted NOUN manual...
    fireEvent.change(searchInput, { target: { value: 'GST 101' } })
    expect(await screen.findByText(/GST 101: Use of English and Communication Skills I/)).toBeInTheDocument()
    expect(screen.queryByText('The Spiritual Man')).not.toBeInTheDocument()

    // ...and a code with nothing behind it says so.
    fireEvent.change(searchInput, { target: { value: 'LAW 401' } })
    expect(await screen.findByText(/Nothing matches that search/i)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Clear filters/i }))
    expect(await screen.findByText('The Spiritual Man')).toBeInTheDocument()
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

  it('reports an empty shelf honestly when a department has no documents', async () => {
    renderLibrary()
    openFilters()

    fireEvent.click(screen.getByRole('button', { name: 'Faculty of Law' }))
    fireEvent.click(screen.getByRole('button', { name: 'Public Law' }))
    fireEvent.click(screen.getByRole('button', { name: /^Show \d+ results?$/ }))

    expect(await screen.findByText(/Nothing matches that search/i)).toBeInTheDocument()
  })

  it('clears every filter in one action', async () => {
    renderLibrary()
    openFilters()

    fireEvent.click(screen.getByRole('button', { name: 'Faculty of Law' }))
    fireEvent.click(screen.getByRole('button', { name: /^Clear all filters$/ }))
    fireEvent.click(screen.getByRole('button', { name: /^Show \d+ results?$/ }))

    expect(screen.queryByText(/Departments in Faculty of Law/i)).not.toBeInTheDocument()
    expect(await screen.findByText('The Spiritual Man')).toBeInTheDocument()
  })

  it('filters by shelf and never offers a shelf that holds nothing', async () => {
    renderLibrary()
    openFilters()

    expect(screen.getByRole('button', { name: /Christian Books \(\d+\)/ })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Study Skills \(\d+\)/ })).not.toBeInTheDocument()
    // The GST shelf holds documents now, so it is offered; an empty shelf is not.
    expect(screen.getByRole('button', { name: /GST & Compulsory Courses \(\d+\)/ })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Christian Books \(\d+\)/ }))
    fireEvent.click(screen.getByRole('button', { name: /^Show \d+ results?$/ }))

    expect(await screen.findByText('The Spiritual Man')).toBeInTheDocument()
    expect(screen.queryByText(/GST 101: Use of English/)).not.toBeInTheDocument()
  })

  it('counts every document on the shelf, with or without database rows', async () => {
    renderLibrary()
    const total =
      FRESHER_LIBRARY_PACKS.length +
      CHRISTIAN_BOOKS.length +
      DRAMA_PLAYS.length +
      ROMAN_PLAYS.length +
      MEDIEVAL_PLAYS.length +
      GST_SHELF.length

    openFilters()
    expect(screen.getByRole('button', { name: `All Domains (${total})` })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Greek Tragedy \(\d+\)/ })).toBeInTheDocument()
  })
})

describe('Greek tragedy shelf UI', { timeout: 15000 }, () => {
  beforeEach(() => {
    vi.clearAllMocks()
    database.getDigitalProducts.mockResolvedValue([])
  })

  it('offers every play as a PDF download from this site', async () => {
    render(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>
    )

    const links = await screen.findAllByRole('link', { name: /Download Free PDF/i })
    // The plays are downloads now too, so they join the NOUN manuals. Books keep
    // their own "Read book" control, which opens the book page.
    expect(links).toHaveLength(
      GST_SHELF.length + DRAMA_PLAYS.length + ROMAN_PLAYS.length + MEDIEVAL_PLAYS.length
    )
    expect(screen.getAllByRole('link', { name: /Read book/i })).toHaveLength(CHRISTIAN_BOOKS.length)

    const playHrefs = links.map((link) => link.getAttribute('href')).filter((href) => href.includes('/library/drama/'))
    expect(playHrefs).toHaveLength(DRAMA_PLAYS.length)
    for (const href of playHrefs) {
      expect(href).toMatch(/^\/library\/drama\/[a-z0-9-]+\.pdf$/)
    }

    // Nothing on the shelf sends a reader to another website to read a play.
    expect(screen.queryByRole('link', { name: /Read the full text/i })).not.toBeInTheDocument()
    expect(document.querySelector('a[href*="gutenberg.org"]')).toBeNull()

    // Every card states the page count of the file it hands over.
    expect(screen.getByText('Antigone')).toBeInTheDocument()
    expect(screen.getAllByText(/^\d+ pages$/)).toHaveLength(
      CHRISTIAN_BOOKS.length +
        GST_SHELF.length +
        DRAMA_PLAYS.length +
        ROMAN_PLAYS.length +
        MEDIEVAL_PLAYS.length
    )
  })

  it('says plainly which two plays have no public-domain English text', async () => {
    render(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>
    )

    expect(await screen.findByText('Two Euripides plays are not on this shelf')).toBeInTheDocument()
    for (const play of EURIPIDES_NOT_AVAILABLE) {
      // "The Suppliants" is also an Aeschylus play on this page, so the note is
      // checked by presence rather than by uniqueness.
      expect(screen.getAllByText(play.title).length).toBeGreaterThan(0)
      expect(screen.getByText(play.note)).toBeInTheDocument()
    }
    // ...and does not pretend to offer them: nothing here links out.
    expect(document.querySelector('a[href*="gutenberg"]')).toBeNull()
  })

  it('opens every Roman play from this site, not from Perseus or Gutenberg', async () => {
    const { container } = render(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>
    )

    const links = await screen.findAllByRole('link', { name: /Download Free PDF/i })
    const romanHrefs = links
      .map((link) => link.getAttribute('href'))
      .filter((href) => href.includes('/library/roman/'))
    expect(romanHrefs).toHaveLength(ROMAN_PLAYS.length)
    for (const href of romanHrefs) {
      expect(href).toMatch(/^\/library\/roman\/[a-z0-9-]+\.pdf$/)
    }

    // The shelf is a shelf: no link leaves the site, and the Roman plays are
    // badged as plays rather than as generic packs.
    expect(container.querySelector('a[href*="gutenberg.org"]')).toBeNull()
    expect(container.querySelector('a[href*="perseus.tufts.edu"]')).toBeNull()
    expect(screen.getByText('Thyestes')).toBeInTheDocument()
  })

  it('offers every medieval play as a download from this site', async () => {
    const { container } = render(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>
    )

    const links = await screen.findAllByRole('link', { name: /Download Free PDF/i })
    const medievalHrefs = links
      .map((link) => link.getAttribute('href'))
      .filter((href) => href.includes('/library/medieval/'))
    expect(medievalHrefs).toHaveLength(MEDIEVAL_PLAYS.length)
    for (const href of medievalHrefs) {
      expect(href).toMatch(/^\/library\/medieval\/[a-z0-9-]+\.pdf$/)
    }

    expect(container.querySelector('a[href*="gutenberg.org"]')).toBeNull()
    expect(screen.getByText('Everyman')).toBeInTheDocument()
    expect(screen.getByText("The Second Shepherds' Play")).toBeInTheDocument()

    // The plays that cannot be hosted are named, with the reason, not hidden.
    expect(
      await screen.findByText('Seven medieval plays are not on this shelf')
    ).toBeInTheDocument()
    for (const gap of MEDIEVAL_NOT_AVAILABLE) {
      expect(screen.getByText(new RegExp(`^${gap.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`))).toBeInTheDocument()
    }
  })

  it('finds a play by playwright and by its own title', async () => {
    render(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>
    )

    const search = await screen.findByPlaceholderText(/Search by title, author or course code/i)
    fireEvent.change(search, { target: { value: 'Sophocles' } })
    expect(await screen.findByText('Oedipus the King')).toBeInTheDocument()
    expect(screen.queryByText('The Bacchae')).not.toBeInTheDocument()

    fireEvent.change(search, { target: { value: 'Bacchae' } })
    expect(await screen.findByText('The Bacchae')).toBeInTheDocument()
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

    const search = await screen.findByPlaceholderText(/Search by title, author or course code/i)
    fireEvent.change(search, { target: { value: 'Watchman Nee' } })

    expect(await screen.findByText('The Spiritual Man')).toBeInTheDocument()
    expect(screen.getByText('Let Us Pray')).toBeInTheDocument()
    // A different author's book does not match this author's name.
    expect(screen.queryByText('Lucifer Exposed')).not.toBeInTheDocument()
    expect(screen.queryByText(/THA 151/)).not.toBeInTheDocument()

    fireEvent.change(search, { target: { value: 'prayer' } })
    expect(await screen.findByText('Let Us Pray')).toBeInTheDocument()
  })

  it('puts a real link on every card, and every book PDF is on disk', async () => {
    render(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>
    )

    const links = await screen.findAllByRole('link', { name: /Read book/i })
    expect(links).toHaveLength(CHRISTIAN_BOOKS.length)

    // Links are anchors with an href, not spans that only look like buttons.
    for (const link of links) {
      expect(link.getAttribute('href')).toMatch(/^\/library\/books\/[a-z0-9-]+$/)
    }

    // The full text itself is a file, not a promise.
    for (const book of CHRISTIAN_BOOKS) {
      expect(fs.existsSync(path.join(process.cwd(), 'public', 'library', 'books', `${book.slug}.pdf`))).toBe(true)
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
