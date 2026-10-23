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
import { RENAISSANCE_NOT_AVAILABLE, RENAISSANCE_PLAYS } from '../lib/renaissanceLibrary'
import { GST_SHELF } from '../lib/gstLibraryData'
import LibraryPage from '../pages/LibraryPage'
import BookDetailPage from '../pages/BookDetailPage'
import * as database from '../lib/database'
import { MODERN_PLAYS, MODERN_UNHOSTABLE } from '../lib/modernLibrary'
import { THEATRE_TITLES } from '../lib/theatreArtsLibrary'

vi.mock('../lib/database', () => ({
  getDigitalProducts: vi.fn(),
}))

// A shelf has its own address, so a link can point at it directly.
const renderShelf = (name) =>
  render(
    <MemoryRouter initialEntries={[`/library?domain=${encodeURIComponent(name)}`]}>
      <LibraryPage />
    </MemoryRouter>
  )

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

  it('opens on an index of shelves, one search field, and nothing else', async () => {
    renderLibrary()

    expect(await screen.findByRole('heading', { name: 'Digital Library' })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(SEARCH)).toBeInTheDocument()

    // The whole library is on one screen: shelves, not a wall of documents.
    expect(screen.getByRole('button', { name: /Greek Tragedy/ })).toBeInTheDocument()
    expect(screen.queryByText('The Spiritual Man')).not.toBeInTheDocument()
    // Filters are behind one control until the reader asks for them.
    expect(screen.queryByRole('button', { name: 'Faculty of Engineering' })).not.toBeInTheDocument()
  })

  it('reaches any shelf and its documents in one tap, and back again', async () => {
    renderLibrary()

    fireEvent.click(await screen.findByRole('button', { name: /Christian Books/ }))
    expect(await screen.findByText('The Spiritual Man')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Christian Books/ })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /All shelves/ }))
    expect(await screen.findByRole('heading', { name: 'Digital Library' })).toBeInTheDocument()
  })

  it('advertises only the documents that are actually on the shelf', async () => {
    renderLibrary()

    expect(
      await screen.findByText(
        new RegExp(
          `^${CHRISTIAN_BOOKS.length} full-length books, ${GST_SHELF.length} NOUN course manuals to download, ` +
            `\\d+ Greek plays to download, ${ROMAN_PLAYS.length} Roman plays to download, ` +
            `${MEDIEVAL_PLAYS.length} medieval plays to download, ` +
            `${RENAISSANCE_PLAYS.length} Renaissance plays to download, ` +
            `${MODERN_PLAYS.length} modern plays to download and ` +
            `${THEATRE_TITLES.length} Theatre Arts titles to download\\.`
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

    // Clearing the search returns the shelf index, not a wall of results.
    fireEvent.click(screen.getByRole('button', { name: /Clear filters/i }))
    expect(await screen.findByRole('heading', { name: 'Digital Library' })).toBeInTheDocument()
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
    expect(await screen.findByRole('heading', { name: 'Digital Library' })).toBeInTheDocument()
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
      RENAISSANCE_PLAYS.length +
      MODERN_PLAYS.length +
      THEATRE_TITLES.length +
      GST_SHELF.length

    openFilters()
    expect(screen.getByRole('button', { name: `All shelves (${total})` })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Greek Tragedy \(\d+\)/ })).toBeInTheDocument()
  })
})

describe('Greek tragedy shelf UI', { timeout: 15000 }, () => {
  beforeEach(() => {
    vi.clearAllMocks()
    database.getDigitalProducts.mockResolvedValue([])
  })

  it('offers every play as a PDF download from this site', async () => {
    renderShelf('Greek Tragedy')

    const links = await screen.findAllByRole('link', { name: /Download Free PDF/i })
    // Every document on the shelf is a file this site hands over; nothing on a
    // play shelf opens a book page.
    expect(links).toHaveLength(DRAMA_PLAYS.length)
    expect(screen.queryAllByRole('link', { name: /Read book/i })).toHaveLength(0)

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
    expect(screen.getAllByText(/^\d+ pages$/)).toHaveLength(DRAMA_PLAYS.length)
  })

  it('says plainly which two plays have no public-domain English text', async () => {
    renderShelf('Greek Tragedy')

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
    const { container } = renderShelf('Roman Theatre')

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
    const { container } = renderShelf('Medieval Theatre')

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


  it('offers every Renaissance play as a download from this site', async () => {
    const { container } = renderShelf('Renaissance Theatre')

    const links = await screen.findAllByRole('link', { name: /Download Free PDF/i })
    const renaissanceHrefs = links
      .map((link) => link.getAttribute('href'))
      .filter((href) => href.includes('/library/renaissance/'))
    expect(renaissanceHrefs).toHaveLength(RENAISSANCE_PLAYS.length)
    for (const href of renaissanceHrefs) {
      expect(href).toMatch(/^\/library\/renaissance\/[a-z0-9-]+\.pdf$/)
    }

    // No card sends a reader to Gutenberg to read the play it advertises.
    expect(container.querySelector('a[href*="gutenberg.org"]')).toBeNull()
    expect(screen.getByText('Hamlet')).toBeInTheDocument()
    expect(screen.getByText('The Duchess of Malfi')).toBeInTheDocument()
    expect(screen.getByText('Tamburlaine the Great, Part Two')).toBeInTheDocument()

    // Sixty-nine plays are listed by playwright, not as one wall of cards.
    expect(screen.getByText('Shakespeare: comedies')).toBeInTheDocument()
    expect(screen.getByText('Shakespeare: tragedies')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /James Shirley/ })).toBeInTheDocument()

    expect(await screen.findByText('What the play shelves leave out')).toBeInTheDocument()
    for (const gap of RENAISSANCE_NOT_AVAILABLE) {
      expect(
        screen.getByText(new RegExp(`^${gap.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`))
      ).toBeInTheDocument()
    }
  })

  it('offers every modern play as a download from this site, grouped by movement', async () => {
    const { container } = renderShelf('Modern Theatre')

    const links = await screen.findAllByRole('link', { name: /Download Free PDF/i })
    const modernHrefs = links
      .map((link) => link.getAttribute('href'))
      .filter((href) => href.includes('/library/modern/'))
    expect(modernHrefs).toHaveLength(MODERN_PLAYS.length)
    for (const href of modernHrefs) {
      expect(href).toMatch(/^\/library\/modern\/[a-z0-9-]+\.pdf$/)
    }

    // No card sends a reader to Gutenberg to read the play it advertises.
    expect(container.querySelector('a[href*="gutenberg.org"]')).toBeNull()
    expect(screen.getByText('A Doll\'s House')).toBeInTheDocument()
    expect(screen.getByText('Miss Julie')).toBeInTheDocument()
    expect(screen.getByText('R.U.R. (Rossum\u2019s Universal Robots)')).toBeInTheDocument()

    // The shelf is listed by movement, not as one wall of cards.
    expect(screen.getByText('Realism')).toBeInTheDocument()
    expect(screen.getByText('Symbolism')).toBeInTheDocument()

    // The movements that cannot be hosted are named, with the reason.
    for (const gap of MODERN_UNHOSTABLE) {
      const label = `${gap.title} (${gap.movement})`
      expect(
        screen.getByText(new RegExp(`^${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`))
      ).toBeInTheDocument()
    }
  })

  it('offers the Theatre Arts shelf grouped by topic, classics and guides labelled', async () => {
    const { container } = renderShelf('Theatre Arts')

    const links = await screen.findAllByRole('link', { name: /Download Free PDF/i })
    const theatreHrefs = links
      .map((link) => link.getAttribute('href'))
      .filter((href) => href.includes('/library/theatre/'))
    expect(theatreHrefs).toHaveLength(THEATRE_TITLES.length)
    for (const href of theatreHrefs) {
      expect(href).toMatch(/^\/library\/theatre\/[a-z0-9-]+\.pdf$/)
    }

    // Nothing on this shelf links out; every file is ours.
    expect(container.querySelector('a[href*="gutenberg.org"]')).toBeNull()

    // Both a public-domain classic and a ZikShare guide are on the page.
    expect(await screen.findByText('The Poetics of Aristotle')).toBeInTheDocument()
    expect(screen.getByText('How to Review a Play')).toBeInTheDocument()

    // Listed by the department's topics, not as one wall of cards.
    expect(screen.getByRole('heading', { name: /^Lighting/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^Dramatic Criticism/ })).toBeInTheDocument()

    // A guide, a public-domain text and a play carry three different badges.
    expect(screen.getAllByText('GUIDE').length).toBeGreaterThan(0)
    expect(screen.getAllByText('TEXT').length).toBeGreaterThan(0)
    const lightingHeading = screen.getByRole('heading', { name: /^Lighting/ })
    expect(lightingHeading.textContent).toMatch(/2\s*titles/)
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
    renderShelf('Christian Books')

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
