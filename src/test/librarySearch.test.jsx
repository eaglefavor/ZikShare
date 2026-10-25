import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import {
  editDistance,
  matchesLibraryQuery,
  normaliseToken,
  searchLibrary,
  suggestCorrections,
  tokenMatches,
} from '../lib/librarySearch'
import { mergeLibraryMaterials } from '../lib/fresherLibrary'
import LibraryPage from '../pages/LibraryPage'
import { vi } from 'vitest'

vi.mock('../lib/database', () => ({
  getDigitalProducts: vi.fn().mockResolvedValue([]),
  getListings: vi.fn().mockResolvedValue([]),
}))

const MATERIALS = mergeLibraryMaterials([])

describe('Forgiving search', () => {
  it('measures how far apart two words are', () => {
    expect(editDistance('ibsen', 'ibsen')).toBe(0)
    expect(editDistance('ibson', 'ibsen')).toBe(1)
    expect(editDistance('shakespare', 'shakespeare')).toBe(1)
    expect(editDistance('cat', 'elephant', 2)).toBe(3)
  })

  it('finds a playwright through a typo', () => {
    const hit = (query) => searchLibrary(MATERIALS, query).length

    expect(hit('Sophecles')).toBeGreaterThan(0) // two edits from Sophocles
    expect(hit('Shakespare')).toBeGreaterThan(0)
    expect(hit('Chekov')).toBeGreaterThan(0)
    expect(hit('Ibson')).toBeGreaterThan(0)
  })

  it('finds a title from its first letters', () => {
    const results = searchLibrary(MATERIALS, 'hedda gabl')
    expect(results.some((item) => /hedda gabler/i.test(item.title))).toBe(true)
  })

  it('knows the spellings a catalogue does not use', () => {
    expect(normaliseToken('chekov')).toBe('chekhov')
    expect(normaliseToken('sophokles')).toBe('sophocles')
    expect(normaliseToken('aischylos')).toBe('aeschylus')
    // A word with no alias is left exactly as typed.
    expect(normaliseToken('antigone')).toBe('antigone')
  })

  it('matches short words exactly, so a code is a code', () => {
    expect(tokenMatches('gst 101 use of english', 'gst')).toBe(true)
    expect(tokenMatches('gst 101 use of english', 'gsy')).toBe(false)
  })

  it('still requires every word, so more words narrow the shelf', () => {
    const broad = searchLibrary(MATERIALS, 'ibsen').length
    const narrow = searchLibrary(MATERIALS, 'ibsen ghosts').length
    expect(narrow).toBeGreaterThan(0)
    expect(narrow).toBeLessThan(broad)
  })

  it('never invents a match out of nonsense', () => {
    expect(searchLibrary(MATERIALS, 'zzzzqqqq')).toHaveLength(0)
    expect(matchesLibraryQuery({ title: 'Antigone' }, 'qwertyuiop')).toBe(false)
  })

  it('suggests real titles and authors when a search finds nothing', () => {
    const suggestions = suggestCorrections(MATERIALS, 'sophecles', 3)
    expect(suggestions.length).toBeGreaterThan(0)
    expect(suggestions.length).toBeLessThanOrEqual(3)
    for (const suggestion of suggestions) {
      expect(suggestion.label.length).toBeGreaterThan(0)
      // It is a real record on the shelf, not a guess.
      expect(MATERIALS.some((item) => item.id === suggestion.item.id)).toBe(true)
    }
  })

  it('suggests nothing for a query that is simply nonsense', () => {
    expect(suggestCorrections(MATERIALS, 'qqqqzzzz', 3)).toEqual([])
  })
})

describe('The library page and a typo', { timeout: 20000 }, () => {
  it('offers the correction as a chip that then finds the documents', async () => {
    render(
      <MemoryRouter initialEntries={['/library?q=Shakespare']}>
        <LibraryPage />
      </MemoryRouter>
    )

    // The typo alone still finds the shelf.
    expect(await screen.findAllByText(/Hamlet|Macbeth|Othello/)).not.toHaveLength(0)

    fireEvent.change(screen.getByPlaceholderText(/Search by title, author or course code/i), {
      target: { value: 'zzzzqqqq' },
    })
    expect(await screen.findByText(/Nothing matches that search/i)).toBeInTheDocument()
  })
})
