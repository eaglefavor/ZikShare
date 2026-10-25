import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { isoWeek, shelfOfTheWeek, weekStart } from '../lib/shelfOfTheWeek'
import { mergeLibraryMaterials } from '../lib/fresherLibrary'
import HomePage from '../pages/HomePage'

vi.mock('../lib/database', () => ({
  getListings: vi.fn().mockResolvedValue([]),
  getAnnouncements: vi.fn().mockResolvedValue([]),
  getDigitalProducts: vi.fn().mockResolvedValue([]),
}))

const MATERIALS = mergeLibraryMaterials([])

describe('Shelf of the week', () => {
  it('counts ISO weeks', () => {
    expect(isoWeek(new Date(2026, 0, 1))).toBe(1)
    expect(isoWeek(new Date(2026, 11, 31))).toBe(53)
  })

  it('starts the week on Monday', () => {
    const monday = weekStart(new Date(2026, 4, 14)) // a Thursday
    expect(monday.getDay()).toBe(1)
  })

  it('picks a document that really exists on a real shelf', () => {
    const pick = shelfOfTheWeek(MATERIALS, new Date(2026, 5, 3))
    expect(pick).not.toBeNull()
    expect(pick.item.domain).toBe(pick.shelf)
    expect(MATERIALS.some((item) => item.id === pick.item.id)).toBe(true)
    expect(pick.count).toBeGreaterThan(0)
  })

  it('gives the same week the same pick, and a different week another', () => {
    const a = shelfOfTheWeek(MATERIALS, new Date(2026, 5, 3))
    const b = shelfOfTheWeek(MATERIALS, new Date(2026, 5, 3))
    expect(a.item.id).toBe(b.item.id)

    const picks = new Set()
    for (let week = 0; week < 12; week += 1) {
      picks.add(shelfOfTheWeek(MATERIALS, new Date(2026, 0, 5 + week * 7)).item.id)
    }
    // Twelve weeks should not be one document repeated.
    expect(picks.size).toBeGreaterThan(6)
  })

  it('chooses something a reader can finish in a week', () => {
    for (let week = 0; week < 26; week += 1) {
      const pick = shelfOfTheWeek(MATERIALS, new Date(2026, 0, 5 + week * 7))
      expect(pick.item.page_count).toBeGreaterThanOrEqual(20)
      expect(pick.item.page_count).toBeLessThanOrEqual(220)
    }
  })

  it('returns nothing, rather than a placeholder, when the library is empty', () => {
    expect(shelfOfTheWeek([], new Date())).toBeNull()
    expect(shelfOfTheWeek(null, new Date())).toBeNull()
  })

  it('shows the pick on the home page with a way to read it', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/library/doc/:slug/read" element={<div>READER</div>} />
          <Route path="/library/shelf/:name" element={<div>SHELF</div>} />
        </Routes>
      </MemoryRouter>
    )

    const pick = shelfOfTheWeek(MATERIALS)
    expect(await screen.findByText(pick.item.title)).toBeInTheDocument()
    expect(screen.getByText(new RegExp(`${pick.label} on the shelf`))).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Read it/i }))
    expect(await screen.findByText('READER')).toBeInTheDocument()
  })
})
