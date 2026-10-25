import { describe, it, expect, vi, beforeEach } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route, useParams } from 'react-router-dom'
import { mergeLibraryMaterials } from '../lib/fresherLibrary'
import {
  documentPath,
  documentSlug,
  findDocumentBySlug,
  relatedDocuments,
  shelfFromSlug,
  shelfPath,
  slugify,
} from '../lib/libraryRoutes'
import { SHELF_INFO } from '../lib/shelfGuide'
import LibraryDocumentPage from '../pages/LibraryDocumentPage'
import LibraryPage from '../pages/LibraryPage'
import ReportListingSheet from '../components/ReportListingSheet'
import * as database from '../lib/database'

vi.mock('../lib/database', () => ({
  getDigitalProducts: vi.fn(),
  getListings: vi.fn(),
  reportListing: vi.fn(),
  REPORT_REASONS: [
    'Scam or fraud',
    'Fake or misleading listing',
    'Prohibited or dangerous item',
    'Offensive content',
    'Wrong price or already sold',
    'Harassment or abuse',
    'Something else',
  ],
}))

const MATERIALS = mergeLibraryMaterials([])

function DocProbe() {
  const { slug } = useParams()
  return <div>DOC PAGE {slug}</div>
}

function renderDoc(slug) {
  return render(
    <MemoryRouter initialEntries={[`/library/doc/${slug}`]}>
      <Routes>
        <Route path="/library/doc/:slug" element={<LibraryDocumentPage />} />
        <Route path="/library/shelf/:name" element={<div>SHELF PROBE</div>} />
        <Route path="/library" element={<div>LIBRARY PROBE</div>} />
      </Routes>
    </MemoryRouter>
  )
}

describe('Library addresses', { timeout: 20000 }, () => {
  it('gives every one of the 309 documents its own address', () => {
    const paths = MATERIALS.map(documentPath)
    expect(MATERIALS).toHaveLength(309)
    expect(new Set(paths).size).toBe(MATERIALS.length)
    for (const p of paths) {
      expect(p).toMatch(/^\/library\/doc\/[a-z0-9-]+$/)
    }
  })

  it('finds each document again from the address it published', () => {
    for (const item of MATERIALS) {
      const found = findDocumentBySlug(MATERIALS, documentSlug(item))
      expect(found?.title).toBe(item.title)
    }
  })

  it('turns each shelf name into a readable address and back', () => {
    for (const name of Object.keys(SHELF_INFO)) {
      const p = shelfPath(name)
      expect(p).toMatch(/^\/library\/shelf\/[a-z0-9-]+$/)
      expect(shelfFromSlug(p.split('/').pop())).toBe(name)
    }
    expect(shelfFromSlug('not-a-shelf')).toBeNull()
    expect(slugify('GST & Compulsory Courses')).toBe('gst-compulsory-courses')
  })

  it('suggests documents from the same shelf without repeating the one open', () => {
    const play = MATERIALS.find((i) => i.domain === 'Modern Theatre' && i.author === 'Henrik Ibsen')
    const related = relatedDocuments(MATERIALS, play)
    expect(related.length).toBeGreaterThan(0)
    expect(related.some((r) => documentSlug(r) === documentSlug(play))).toBe(false)
    expect(related.every((r) => r.domain === 'Modern Theatre')).toBe(true)
  })

  it('publishes a robots file that points at the sitemap', () => {
    const robots = fs.readFileSync(path.join(process.cwd(), 'public', 'robots.txt'), 'utf8')
    expect(robots).toMatch(/Sitemap: https:\/\/zik-share\.vercel\.app\/sitemap\.xml/)
    expect(robots).toMatch(/User-agent: \*/)
  })

  it('lets a phone pinch-zoom the page', () => {
    const html = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf8')
    expect(html).not.toMatch(/user-scalable=no/)
    expect(html).not.toMatch(/maximum-scale=1\.0/)
  })
})

describe('A document page', { timeout: 20000 }, () => {
  beforeEach(() => {
    vi.clearAllMocks()
    database.getDigitalProducts.mockResolvedValue([])
    database.getListings.mockResolvedValue([])
  })

  it('states what the file is, and downloads that exact file', async () => {
    const play = MATERIALS.find((i) => i.slug === 'a-dolls-house')
    renderDoc(play.slug)

    expect(await screen.findByRole('heading', { name: "A Doll's House" })).toBeInTheDocument()
    expect(screen.getAllByText('Henrik Ibsen').length).toBeGreaterThan(0)
    expect(screen.getByText(`${play.page_count} pages`)).toBeInTheDocument()
    expect(document.title).toContain("A Doll's House")

    const download = screen.getByRole('link', { name: /Download the PDF/i })
    expect(download).toHaveAttribute('href', '/library/modern/a-dolls-house.pdf')
    expect(download).toHaveAttribute('download')
  })

  it('explains the terms the document is hosted under', async () => {
    renderDoc('a-dolls-house')
    expect(
      await screen.findByText(/The play is in the public domain in the edition ZikShare holds/i)
    ).toBeInTheDocument()
  })

  it('gives a NOUN manual its own page with its course code', async () => {
    const manual = MATERIALS.find((i) => i.domain === 'GST & Compulsory Courses')
    renderDoc(documentSlug(manual))

    expect(await screen.findByRole('heading', { name: manual.title })).toBeInTheDocument()
    expect(screen.getAllByText(manual.code).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/NOUN course manual/i).length).toBeGreaterThan(0)
  })

  it('says plainly when there is nothing at the address', async () => {
    renderDoc('not-a-real-document')
    expect(await screen.findByRole('heading', { name: /Document not found/i })).toBeInTheDocument()
    expect(screen.getByText(/There is nothing at this address/i)).toBeInTheDocument()
  })

  it('offers related documents that really exist', async () => {
    renderDoc('a-dolls-house')
    expect(await screen.findByRole('heading', { name: /More by Henrik Ibsen/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /Download Free PDF/i }).length).toBeGreaterThan(0)
  })
})

describe('Getting to a document from the shelf', { timeout: 20000 }, () => {
  beforeEach(() => {
    vi.clearAllMocks()
    database.getDigitalProducts.mockResolvedValue([])
  })

  it('opens a card at the document page instead of firing a download', async () => {
    render(
      <MemoryRouter initialEntries={['/library?domain=Roman%20Theatre']}>
        <Routes>
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/library/doc/:slug" element={<DocProbe />} />
        </Routes>
      </MemoryRouter>
    )

    const title = await screen.findAllByText('Thyestes')
    fireEvent.click(title[0])
    expect(await screen.findByText(/^DOC PAGE /)).toBeInTheDocument()
  })

  it('accepts a readable shelf address, not only a query string', async () => {
    render(
      <MemoryRouter initialEntries={['/library/shelf/greek-tragedy']}>
        <Routes>
          <Route path="/library/shelf/:name" element={<LibraryPage />} />
          <Route path="/library" element={<LibraryPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(await screen.findByRole('heading', { name: /Greek Tragedy/ })).toBeInTheDocument()
    expect(await screen.findByText('Antigone')).toBeInTheDocument()
  })
})

describe('Reporting a listing', { timeout: 15000 }, () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('files a report with the reason the reader picked', async () => {
    database.reportListing.mockResolvedValue({ success: true })
    render(
      <MemoryRouter>
        <ReportListingSheet listing={{ id: 'listing-1', title: 'iPhone 11' }} onClose={() => {}} />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Scam or fraud' }))
    fireEvent.change(screen.getByPlaceholderText(/Anything that helps/i), {
      target: { value: 'Asked for a transfer before showing the phone.' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Send report/i }))

    expect(await screen.findByText(/the report is with the team/i)).toBeInTheDocument()
    expect(database.reportListing).toHaveBeenCalledWith({
      listingId: 'listing-1',
      reporterId: null,
      reason: 'Scam or fraud',
      detail: 'Asked for a transfer before showing the phone.',
    })
  })

  it('will not send an empty report', () => {
    render(
      <MemoryRouter>
        <ReportListingSheet listing={{ id: 'listing-1', title: 'iPhone 11' }} onClose={() => {}} />
      </MemoryRouter>
    )
    expect(screen.getByRole('button', { name: /Send report/i })).toBeDisabled()
  })
})
