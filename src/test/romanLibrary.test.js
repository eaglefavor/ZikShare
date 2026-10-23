import { describe, it, expect } from 'vitest'
import {
    PLAUTUS_PLAYS,
    ROMAN_AUTHORS,
    ROMAN_DOMAIN,
    ROMAN_PLAYS,
    ROMAN_SHELF_BY_SLUG,
    SENECA_PLAYS,
    TERENCE_PLAYS,
    findRomanPlayBySlug,
    romanCounts,
    toRomanCard,
} from '../lib/romanLibrary'
import { libraryCountLabel, libraryCounts, mergeLibraryMaterials } from '../lib/fresherLibrary'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const PUBLIC_DIR = path.join(process.cwd(), 'public')

describe('Roman theatre shelf - the corpus', () => {
    it('holds all of Plautus, all of Terence and the Senecan corpus', () => {
        expect(PLAUTUS_PLAYS).toHaveLength(20)
        expect(TERENCE_PLAYS).toHaveLength(6)
        expect(SENECA_PLAYS).toHaveLength(10)
        expect(ROMAN_PLAYS).toHaveLength(36)
        expect(ROMAN_AUTHORS.map((author) => author.name)).toEqual([
            'Plautus',
            'Terence',
            'Seneca',
        ])
        expect(romanCounts()).toEqual({ plautus: 20, terence: 6, seneca: 10, total: 36 })
    })

    it('uses unique slugs, and unique titles within an author', () => {
        const slugs = new Set()
        const titles = new Set()
        for (const play of ROMAN_PLAYS) {
            expect(play.slug).toMatch(/^[a-z0-9-]+$/)
            expect(slugs.has(play.slug), `duplicate slug: ${play.slug}`).toBe(false)
            slugs.add(play.slug)
            const key = `${play.author}: ${play.title}`
            expect(titles.has(key), `duplicate title: ${key}`).toBe(false)
            titles.add(key)
        }
    })

    it('keeps the two plays that are not by Seneca in the corpus, labelled', () => {
        // Hercules Oetaeus and Octavia travel with the tragedies; dropping them
        // would make the shelf claim to be the complete corpus when it is not.
        const doubtful = SENECA_PLAYS.filter((play) => play.topics.includes('spurious'))
        expect(doubtful.map((play) => play.title).sort()).toEqual([
            'Hercules on Oeta',
            'Octavia',
        ])
        for (const play of doubtful) {
            expect(`${play.context} ${play.synopsis}`).toMatch(/not by Seneca|not Seneca|not his/i)
        }
        // Phoenissae survives in fragments and says so rather than posing as whole.
        const phoenissae = SENECA_PLAYS.find((play) => play.slug === 'phoenissae-seneca')
        expect(`${phoenissae.context} ${phoenissae.synopsis}`).toMatch(/fragment/i)
    })
})

describe('Roman theatre shelf - every card is a real download', () => {
    it('gives every card a hosted PDF that exists, with its own page count', () => {
        for (const play of ROMAN_PLAYS) {
            const card = toRomanCard(play)
            const built = ROMAN_SHELF_BY_SLUG[play.slug]

            expect(built, `${play.slug} has no PDF in the shelf`).toBeTruthy()
            expect(card.download_path).toBe(`/library/roman/${play.slug}.pdf`)
            // Hosted, not linked: nothing on this shelf opens another website.
            expect(card.isExternal).toBe(false)
            expect(card.external_url).toBeNull()
            expect(card.domain).toBe(ROMAN_DOMAIN)

            const file = path.join(PUBLIC_DIR, card.download_path)
            expect(fs.existsSync(file), `${play.slug} PDF is missing`).toBe(true)
            const bytes = fs.readFileSync(file)
            expect(bytes.subarray(0, 5).toString()).toBe('%PDF-')
            expect(bytes.length).toBe(card.file_size_bytes)
            expect(card.page_count).toBeGreaterThan(10)
        }
    })

    it('never sends a reader to Gutenberg or Perseus to read the play', () => {
        for (const play of ROMAN_PLAYS) {
            const card = toRomanCard(play)
            const rendered = JSON.stringify(card)
            expect(rendered).not.toMatch(/gutenberg\.org/i)
            expect(rendered).not.toMatch(/perseus\.tufts\.edu/i)
            expect(card.download_path.startsWith('/library/roman/')).toBe(true)
        }
    })

    it('records a checksum for every PDF, and the file on disk still matches it', () => {
        for (const play of ROMAN_PLAYS) {
            const built = ROMAN_SHELF_BY_SLUG[play.slug]
            const bytes = fs.readFileSync(path.join(PUBLIC_DIR, built.download_path))
            const digest = crypto.createHash('sha256').update(bytes).digest('hex')
            expect(digest, `${play.slug} PDF has changed since it was catalogued`).toBe(built.sha256)
        }
    })

    it('attributes each PDF to the translation and edition it was cut from', () => {
        for (const play of ROMAN_PLAYS) {
            const built = ROMAN_SHELF_BY_SLUG[play.slug]
            expect(built.translator, `${play.slug} has no translator`).toBeTruthy()
            expect(built.sourceName, `${play.slug} has no source`).toBeTruthy()
            expect(toRomanCard(play).subtitle).toContain(`Translated by ${built.translator}`)
            expect(toRomanCard(play).subtitle).toContain(`${built.pages} pages`)
        }
        // Plautus and Terence share Riley; Seneca has Miller.
        expect(ROMAN_SHELF_BY_SLUG['captivi-plautus'].translator).toBe('Henry Thomas Riley')
        expect(ROMAN_SHELF_BY_SLUG['phormio-terence'].translator).toBe('Henry Thomas Riley')
        expect(ROMAN_SHELF_BY_SLUG['medea-seneca'].translator).toBe('Frank Justus Miller')
    })

    it('gives every play a real synopsis, a reading note and searchable topics', () => {
        for (const play of ROMAN_PLAYS) {
            expect(play.synopsis.length, `${play.slug} synopsis`).toBeGreaterThan(120)
            expect(play.context.length, `${play.slug} context`).toBeGreaterThan(80)
            expect(play.topics.length, `${play.slug} topics`).toBeGreaterThanOrEqual(3)
            expect(play.author).toMatch(/^(Plautus|Terence|Seneca)$/)
            expect(play.latinTitle).toBeTruthy()
            // A synopsis must describe the plot, not advertise the card.
            expect(play.synopsis).not.toMatch(/lorem|placeholder|TBD|\bTODO\b/i)
        }
    })

    it('carries enough text to be a play rather than a page of front matter', () => {
        for (const play of ROMAN_PLAYS) {
            const built = ROMAN_SHELF_BY_SLUG[play.slug]
            // The shortest thing on the shelf is Seneca's Phoenissae, which is a
            // fragment; everything else is a whole play.
            expect(built.words, `${play.slug} is suspiciously short`).toBeGreaterThan(1500)
        }
    })
})

describe('Roman theatre shelf - how it appears in the library', () => {
    it('shows up in the counts alongside the hosted material', () => {
        const merged = mergeLibraryMaterials([])
        const roman = merged.filter((item) => item.isRoman)
        expect(roman).toHaveLength(ROMAN_PLAYS.length)

        const counts = libraryCounts()
        expect(counts.roman).toBe(ROMAN_PLAYS.length)
        expect(counts.total).toBe(
            counts.packs +
                counts.books +
                counts.plays +
                counts.roman +
                counts.medieval +
                counts.renaissance +
                counts.hosted
        )
        expect(libraryCountLabel(counts)).toContain(`${ROMAN_PLAYS.length} Roman plays to download`)
    })

    it('is findable by slug and keeps the Latin title for the card', () => {
        expect(findRomanPlayBySlug('menaechmi-plautus')?.title).toBe('The Twin Brothers')
        expect(findRomanPlayBySlug('not-a-play')).toBeNull()

        const card = toRomanCard(findRomanPlayBySlug('thyestes-seneca'))
        expect(card.title).toBe('Thyestes')
        expect(card.latinTitle).toBe('Thyestes')
        expect(card.topics).toContain('Atreus')
        expect(card.code).toBe('')
    })

    it('is free, official and never sold', () => {
        for (const play of ROMAN_PLAYS) {
            const card = toRomanCard(play)
            expect(card.is_free).toBe(true)
            expect(card.priceKobo).toBe(0)
            expect(card.is_official).toBe(true)
        }
    })
})
