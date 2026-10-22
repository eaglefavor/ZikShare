import { describe, it, expect } from 'vitest'
import { FRESHER_LIBRARY_PACKS } from '../lib/fresherLibrary'
import { CHRISTIAN_BOOKS, toBookCard, findRelatedBooks } from '../lib/christianBooks'
import { matchesLibraryQuery, searchLibrary, searchTokens } from '../lib/librarySearch'

const packCards = FRESHER_LIBRARY_PACKS.map((p) => ({
  title: p.title,
  code: p.code,
  description: p.description,
  department: p.department,
  faculty: p.faculty,
  level: p.level,
  domain: p.domain,
}))

const bookCards = CHRISTIAN_BOOKS.map(toBookCard)

describe('library search', () => {
  it('splits a query into words and needs all of them', () => {
    expect(searchTokens('  Watchman   Nee ')).toEqual(['watchman', 'nee'])
    expect(searchTokens('')).toEqual([])
  })

  it('still finds packs by course code', () => {
    const results = searchLibrary(packCards, 'GST 101')
    expect(results.length).toBeGreaterThan(0)
    expect(results.every((r) => /GST 101/i.test(r.title))).toBe(true)
  })

  it('finds books by author, where there is no course code to search', () => {
    const nee = searchLibrary(bookCards, 'Watchman Nee')
    expect(nee.length).toBe(CHRISTIAN_BOOKS.filter((b) => b.author === 'Watchman Nee').length)
    expect(nee.every((b) => b.author === 'Watchman Nee')).toBe(true)
  })

  it('finds books by subject and by publisher', () => {
    expect(searchLibrary(bookCards, 'prayer').some((b) => b.slug === 'let-us-pray-watchman-nee')).toBe(true)
    expect(searchLibrary(bookCards, 'derek prince').every((b) => b.author === 'Derek Prince')).toBe(true)
  })

  it('narrows instead of widening when words are added', () => {
    const broad = searchLibrary(bookCards, 'nee')
    const narrow = searchLibrary(bookCards, 'nee prayer')
    expect(narrow.length).toBeGreaterThan(0)
    expect(narrow.length).toBeLessThan(broad.length)
  })

  it('never matches a book on a word it does not contain', () => {
    expect(searchLibrary(bookCards, 'quantum')).toHaveLength(0)
    expect(matchesLibraryQuery(bookCards[0], '')).toBe(true)
    expect(matchesLibraryQuery(null, 'prayer')).toBe(false)
  })

  it('recommends the same author first, then the same subject, never itself', () => {
    const related = findRelatedBooks('let-us-pray-watchman-nee', 3)
    expect(related.length).toBe(3)
    expect(related.map((b) => b.slug)).not.toContain('let-us-pray-watchman-nee')
    expect(related[0].author).toBe('Watchman Nee')
    for (const book of related) {
      expect(CHRISTIAN_BOOKS.some((b) => b.slug === book.slug)).toBe(true)
    }
    expect(findRelatedBooks('not-a-real-book')).toEqual([])
  })
})
