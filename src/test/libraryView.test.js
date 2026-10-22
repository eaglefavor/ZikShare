import { describe, it, expect } from 'vitest'
import { mergeLibraryMaterials, FRESHER_LIBRARY_PACKS } from '../lib/fresherLibrary'
import { CHRISTIAN_BOOKS } from '../lib/christianBooks'
import {
  activeFilterCount,
  domainSummary,
  filterLibrary,
  groupByShelf,
  sortLibrary,
} from '../lib/libraryView'

const all = mergeLibraryMaterials([])

describe('library view', () => {
  it('counts every document exactly once', () => {
    expect(all).toHaveLength(FRESHER_LIBRARY_PACKS.length + CHRISTIAN_BOOKS.length)
  })

  it('groups results into shelves in display order', () => {
    const shelves = groupByShelf(all)
    expect(shelves.length).toBeGreaterThan(3)
    expect(shelves.reduce((total, shelf) => total + shelf.items.length, 0)).toBe(all.length)
    expect(shelves[0].name).toBe('GST & Compulsory Courses')
  })

  it('filters by faculty, level and shelf together', () => {
    const arts = filterLibrary(all, { faculty: 'Faculty of Arts' })
    expect(arts.length).toBeGreaterThan(0)
    expect(arts.every((item) => item.faculty === 'Faculty of Arts')).toBe(true)

    const books = filterLibrary(all, { domain: 'Christian Books' })
    expect(books.every((item) => item.isBook)).toBe(true)

    const hundred = filterLibrary(all, { level: '100L' })
    expect(hundred.length).toBeGreaterThan(0)
    expect(hundred.every((item) => item.level === '100L')).toBe(true)
  })

  it('counts only the filters that are actually set', () => {
    expect(activeFilterCount({})).toBe(0)
    expect(activeFilterCount({ faculty: 'All', level: '100L', domain: 'Christian Books' })).toBe(2)
  })

  it('sorts without losing or duplicating documents', () => {
    for (const sortBy of ['relevance', 'newest', 'title', 'pages']) {
      const sorted = sortLibrary(all, sortBy)
      expect(sorted).toHaveLength(all.length)
    }
    const byTitle = sortLibrary(all, 'title')
    expect(byTitle[0].title.localeCompare(byTitle[1].title)).toBeLessThanOrEqual(0)
    const byPages = sortLibrary(all, 'pages')
    expect(byPages[0].page_count).toBeGreaterThanOrEqual(byPages[1].page_count)
  })

  it('summarises shelves with real counts', () => {
    const summary = domainSummary()
    expect(summary.reduce((total, shelf) => total + shelf.count, 0)).toBe(all.length)
    expect(summary.every((shelf) => shelf.count > 0 && shelf.emoji)).toBe(true)
  })
})
