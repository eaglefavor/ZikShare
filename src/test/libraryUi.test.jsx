import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
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
    fireEvent.change(searchInput, { target: { value: 'GST 112' } })

    expect(screen.getByText(/GST 112: Peace & Conflict Resolution/i)).toBeInTheDocument()
    expect(screen.queryByText(/FEG 280: Engineering Mathematics/i)).not.toBeInTheDocument()
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

    // Select Faculty of Engineering
    fireEvent.click(screen.getByRole('button', { name: 'Faculty of Engineering' }))

    // Select Mechanical Engineering department pill
    const mechButton = screen.getByRole('button', { name: 'Mechanical Engineering' })
    fireEvent.click(mechButton)

    // FEG 280 (Mechanical) should be visible, ECE 311 (Electrical) should not
    expect(screen.getByText(/FEG 280: Engineering Mathematics/i)).toBeInTheDocument()
    expect(screen.queryByText(/ECE 311: Circuit Theory/i)).not.toBeInTheDocument()
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
})
