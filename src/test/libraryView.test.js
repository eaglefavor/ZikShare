import { describe, it, expect } from 'vitest'
import { mergeLibraryMaterials, FRESHER_LIBRARY_PACKS } from '../lib/fresherLibrary'
import { CHRISTIAN_BOOKS } from '../lib/christianBooks'
import { DRAMA_PLAYS } from '../lib/dramaLibrary'
import { ROMAN_PLAYS } from '../lib/romanLibrary'
import { MEDIEVAL_PLAYS } from '../lib/medievalLibrary'
import { RENAISSANCE_PLAYS } from '../lib/renaissanceLibrary'
import { GST_SHELF } from '../lib/gstLibraryData'
import {
  activeFilterCount,
  domainSummary,
  filterLibrary,
  groupByShelf,
  sortLibrary,
} from '../lib/libraryView'
import { MODERN_PLAYS } from '../lib/modernLibrary'

const all = mergeLibraryMaterials([])

describe('library view', () => {
  it('counts every document exactly once', () => {
    expect(all).toHaveLength(
      FRESHER_LIBRARY_PACKS.length +
        CHRISTIAN_BOOKS.length +
        DRAMA_PLAYS.length +
        ROMAN_PLAYS.length +
        MEDIEVAL_PLAYS.length +
        RENAISSANCE_PLAYS.length +
        MODERN_PLAYS.length +
        GST_SHELF.length
    )
  })

  it('groups results into the shelves that hold something, in display order', () => {
    const shelves = groupByShelf(all)
    expect(shelves.map((shelf) => shelf.name)).toEqual([
      'GST & Compulsory Courses',
      'Money & Career',
      'Greek Tragedy',
      'Roman Theatre',
      'Medieval Theatre',
      'Renaissance Theatre',
      'Modern Theatre',
      'Christian Books',
    ])
    expect(shelves.reduce((total, shelf) => total + shelf.items.length, 0)).toBe(all.length)
  })

  it('still shows a shelf for a domain that is not in the display order', () => {
    // New GST and Theatre material arrives on its own shelf; it must not vanish
    // just because the shelf is not listed in FRESHER_LIBRARY_DOMAIN_ORDER.
    const stray = [{ ...all[0], id: 'stray', domain: 'GST & Compulsory Courses' }]
    const shelves = groupByShelf(stray)
    expect(shelves.map((shelf) => shelf.name)).toContain('GST & Compulsory Courses')
  })

  it('filters by shelf, and returns nothing for a shelf that no longer exists', () => {
    const books = filterLibrary(all, { domain: 'Christian Books' })
    expect(books).toHaveLength(CHRISTIAN_BOOKS.length)
    expect(books.every((item) => item.isBook)).toBe(true)

    expect(filterLibrary(all, { domain: 'Study Skills' })).toEqual([])
    // The Greek plays are Theatre & Film Studies material inside Faculty of Arts.
    const arts = filterLibrary(all, { faculty: 'Faculty of Arts' })
    expect(arts).toHaveLength(
      DRAMA_PLAYS.length +
        ROMAN_PLAYS.length +
        MEDIEVAL_PLAYS.length +
        RENAISSANCE_PLAYS.length +
        MODERN_PLAYS.length
    )
    expect(
      arts.every(
        (item) => item.isDrama || item.isRoman || item.isMedieval || item.isRenaissance || item.isModern
      )
    ).toBe(true)

    // NOUN courseware sits under General Studies and can be filtered by level.
    const gst = filterLibrary(all, { faculty: 'General Studies (GST / CED)' })
    expect(gst).toHaveLength(GST_SHELF.length)
    const gst200 = filterLibrary(all, { faculty: 'General Studies (GST / CED)', level: '200L' })
    expect(gst200.length).toBeGreaterThan(0)
    expect(gst200.every((item) => item.level === '200L')).toBe(true)
    expect(filterLibrary(all, { faculty: 'Faculty of Law' })).toEqual([])
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
