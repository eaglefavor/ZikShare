import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { FRESHER_LIBRARY_PACKS } from '../lib/fresherLibrary'
import LibraryPage from '../pages/LibraryPage'
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

    const total = FRESHER_LIBRARY_PACKS.length
    expect(await screen.findByText(new RegExp(`All Domains \\(${total}\\)`))).toBeInTheDocument()
    expect(screen.getByText(new RegExp(`Available Study Packs \\(${total}\\)`))).toBeInTheDocument()
  })
})
