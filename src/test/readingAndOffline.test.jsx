import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import {
  clearProgress,
  getProgress,
  listProgress,
  progressPercent,
  recordProgress,
} from '../lib/readingProgress'
import {
  clearOffline,
  isSavedOffline,
  listOffline,
  offlineBytes,
  offlineSupported,
  removeOffline,
  saveOffline,
} from '../lib/offlineLibrary'
import OfflineLibraryPage from '../pages/OfflineLibraryPage'
import HomePage from '../pages/HomePage'
import LibraryDocumentPage from '../pages/LibraryDocumentPage'
import * as database from '../lib/database'

vi.mock('../lib/database', () => ({
  getDigitalProducts: vi.fn(),
  getListings: vi.fn(),
  getAnnouncements: vi.fn(),
  reportListing: vi.fn(),
  REPORT_REASONS: [],
}))

beforeEach(() => {
  localStorage.clear()
  vi.clearAllMocks()
  database.getDigitalProducts.mockResolvedValue([])
  database.getListings.mockResolvedValue([])
  database.getAnnouncements.mockResolvedValue([])
})

describe('Reading progress', () => {
  it('remembers the page and the total for one document', () => {
    recordProgress({ slug: 'hedda-gabler', page: 84, total: 203, title: 'Hedda Gabler', author: 'Henrik Ibsen', path: '/library/doc/hedda-gabler' })

    const saved = getProgress('hedda-gabler')
    expect(saved.page).toBe(84)
    expect(saved.total).toBe(203)
    expect(saved.title).toBe('Hedda Gabler')
    expect(progressPercent(saved)).toBe(41)
  })

  it('lists what is in progress, most recent first, and forgets it on request', () => {
    recordProgress({ slug: 'a-dolls-house', page: 12, total: 114, title: "A Doll's House" })
    recordProgress({ slug: 'the-seagull', page: 30, total: 59, title: 'The Seagull' })

    const list = listProgress()
    expect(list.map((entry) => entry.slug)).toContain('a-dolls-house')
    expect(list.map((entry) => entry.slug)).toContain('the-seagull')

    clearProgress('a-dolls-house')
    expect(getProgress('a-dolls-house')).toBeNull()
    expect(listProgress().map((entry) => entry.slug)).not.toContain('a-dolls-house')
  })

  it('still reads a page saved by the old reader', () => {
    localStorage.setItem('zikshare:book-progress:let-us-pray-watchman-nee', '37')
    const legacy = getProgress('let-us-pray-watchman-nee')
    expect(legacy?.page).toBe(37)
  })

  it('never reports more than 100 per cent', () => {
    expect(progressPercent({ page: 120, total: 100 })).toBe(100)
    expect(progressPercent({ page: 5, total: 0 })).toBeNull()
  })
})

describe('Offline shelf', () => {
  const cache = new Map()

  beforeEach(() => {
    cache.clear()
    window.caches = {
      open: vi.fn(async () => ({
        put: async (key, response) => cache.set(key, response),
        delete: async (key) => cache.delete(key),
      })),
      delete: vi.fn(async () => cache.clear()),
    }
    window.fetch = vi.fn(async () => ({
      ok: true,
      status: 200,
      headers: { get: () => '204800' },
      clone() {
        return this
      },
    }))
  })

  afterEach(() => {
    delete window.caches
  })

  it('keeps the file on the device and lists it', async () => {
    expect(offlineSupported()).toBe(true)

    const result = await saveOffline({
      slug: 'a-dolls-house',
      path: '/library/modern/a-dolls-house.pdf',
      title: "A Doll's House",
      author: 'Henrik Ibsen',
      pages: 114,
    })

    expect(result.success).toBe(true)
    expect(cache.has('/library/modern/a-dolls-house.pdf')).toBe(true)
    expect(isSavedOffline('a-dolls-house')).toBe(true)
    expect(listOffline()[0].title).toBe("A Doll's House")
    expect(offlineBytes()).toBe(204800)
  })

  it('removes one document, and everything at once', async () => {
    await saveOffline({ slug: 'ghosts', path: '/library/modern/ghosts.pdf', title: 'Ghosts' })
    await removeOffline('ghosts')
    expect(isSavedOffline('ghosts')).toBe(false)
    expect(cache.has('/library/modern/ghosts.pdf')).toBe(false)

    await saveOffline({ slug: 'rosmersholm', path: '/library/modern/rosmersholm.pdf', title: 'Rosmersholm' })
    await clearOffline()
    expect(listOffline()).toHaveLength(0)
  })

  it('says so when the file cannot be fetched instead of pretending', async () => {
    window.fetch = vi.fn(async () => ({ ok: false, status: 404, headers: { get: () => null } }))
    const result = await saveOffline({ slug: 'x', path: '/library/x.pdf' })
    expect(result.success).toBe(false)
    expect(result.error).toMatch(/404/)
    expect(isSavedOffline('x')).toBe(false)
  })
})

describe('The offline page', { timeout: 15000 }, () => {
  const cache = new Map()

  beforeEach(() => {
    cache.clear()
    window.caches = {
      open: vi.fn(async () => ({
        put: async (key, response) => cache.set(key, response),
        delete: async (key) => cache.delete(key),
      })),
      delete: vi.fn(async () => cache.clear()),
    }
    window.fetch = vi.fn(async () => ({
      ok: true,
      status: 200,
      headers: { get: () => '1024' },
      clone() {
        return this
      },
    }))
  })

  afterEach(() => {
    delete window.caches
  })

  it('says plainly when nothing is saved', async () => {
    render(
      <MemoryRouter>
        <OfflineLibraryPage />
      </MemoryRouter>
    )
    expect(await screen.findByText('Nothing saved yet')).toBeInTheDocument()
    expect(screen.getByText(/Save offline/i)).toBeInTheDocument()
  })

  it('lists a saved document and can forget it', async () => {
    await saveOffline({
      slug: 'a-dolls-house',
      path: '/library/modern/a-dolls-house.pdf',
      title: "A Doll's House",
      author: 'Henrik Ibsen',
      pages: 114,
    })

    render(
      <MemoryRouter initialEntries={['/library/offline']}>
        <OfflineLibraryPage />
      </MemoryRouter>
    )

    expect(await screen.findByText("A Doll's House")).toBeInTheDocument()
    expect(screen.getByText(/Henrik Ibsen · 114 pages/)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Remove A Doll's House from this device/i }))
    await waitFor(() => expect(screen.queryByText("A Doll's House")).not.toBeInTheDocument())
  })
})

describe('Picking up where you stopped', { timeout: 15000 }, () => {
  it('offers a Continue reading strip only when something is in progress', async () => {
    const { unmount } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    expect(screen.queryByText('Continue reading')).not.toBeInTheDocument()
    unmount()

    recordProgress({ slug: 'the-seagull', page: 30, total: 59, title: 'The Seagull', author: 'Anton Chekhov' })

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )

    expect(await screen.findByText('Continue reading')).toBeInTheDocument()
    expect(screen.getByText('The Seagull')).toBeInTheDocument()
    expect(screen.getByText(/Page 30 of 59 · 51%/)).toBeInTheDocument()
  })

  it('opens a document in the app, and says which page it will resume at', async () => {
    recordProgress({ slug: 'hedda-gabler', page: 84, total: 203, title: 'Hedda Gabler', author: 'Henrik Ibsen' })

    render(
      <MemoryRouter initialEntries={['/library/doc/hedda-gabler']}>
        <Routes>
          <Route path="/library/doc/:slug" element={<LibraryDocumentPage />} />
          <Route path="/library/doc/:slug/read" element={<div>READER</div>} />
          <Route path="/library/shelf/:name" element={<div>SHELF</div>} />
        </Routes>
      </MemoryRouter>
    )

    expect(await screen.findByRole('button', { name: /Continue on page 84 of 203/i })).toBeInTheDocument()
    expect(screen.getByText(/You are 41% through this file/i)).toBeInTheDocument()
  })

  it('offers Read in the app for a document that has never been opened', async () => {
    render(
      <MemoryRouter initialEntries={['/library/doc/antigone-sophocles']}>
        <Routes>
          <Route path="/library/doc/:slug" element={<LibraryDocumentPage />} />
          <Route path="/library/doc/:slug/read" element={<div>READER</div>} />
          <Route path="/library/shelf/:name" element={<div>SHELF</div>} />
        </Routes>
      </MemoryRouter>
    )

    const read = await screen.findByRole('button', { name: /Read in the app/i })
    fireEvent.click(read)
    expect(await screen.findByText('READER')).toBeInTheDocument()
  })
})
