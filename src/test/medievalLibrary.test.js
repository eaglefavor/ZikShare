import { describe, it, expect } from 'vitest'
import {
    CYCLE_PLAYS,
    MEDIEVAL_DOMAIN,
    MEDIEVAL_NOT_AVAILABLE,
    MEDIEVAL_PLAYS,
    MEDIEVAL_SHELF_BY_SLUG,
    MEDIEVAL_TRADITIONS,
    ROSWITHA_PLAYS,
    findMedievalPlayBySlug,
    medievalCounts,
    toMedievalCard,
} from '../lib/medievalLibrary'
import { libraryCountLabel, libraryCounts, mergeLibraryMaterials } from '../lib/fresherLibrary'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const PUBLIC_DIR = path.join(process.cwd(), 'public')

describe('Medieval theatre shelf - the corpus', () => {
    it('holds the morality plays, the cycle pageants and all six of Hrotsvitha', () => {
        expect(MEDIEVAL_PLAYS).toHaveLength(17)
        expect(ROSWITHA_PLAYS).toHaveLength(6)
        expect(CYCLE_PLAYS).toHaveLength(11)
        expect(medievalCounts()).toEqual({ cycle: 11, hrotsvitha: 6, total: 17 })
        expect(MEDIEVAL_TRADITIONS.map((tradition) => tradition.name)).toEqual([
            'Chester cycle',
            'Wakefield cycle',
            'Coventry cycle',
            'Cornish cycle',
            'Morality plays',
            'Hrotsvitha of Gandersheim',
        ])
    })

    it('uses unique slugs and unique titles', () => {
        const slugs = new Set()
        const titles = new Set()
        for (const play of MEDIEVAL_PLAYS) {
            expect(play.slug).toMatch(/^[a-z0-9-]+$/)
            expect(slugs.has(play.slug), `duplicate slug: ${play.slug}`).toBe(false)
            slugs.add(play.slug)
            expect(titles.has(play.title), `duplicate title: ${play.title}`).toBe(false)
            titles.add(play.title)
        }
    })

    it('keeps the plays it cannot host named, with a reason, instead of dropping them', () => {
        expect(MEDIEVAL_NOT_AVAILABLE.length).toBeGreaterThanOrEqual(5)
        for (const gap of MEDIEVAL_NOT_AVAILABLE) {
            expect(gap.title).toBeTruthy()
            expect(gap.note.length).toBeGreaterThan(60)
            // Each gap is either original-language-only or in copyright.
            expect(gap.note).toMatch(/no public-domain|no modern|in copyright|copyrighted|original/i)
        }
        // A gap and a card can never describe the same play.
        const hosted = new Set(MEDIEVAL_PLAYS.map((play) => play.title))
        for (const gap of MEDIEVAL_NOT_AVAILABLE) {
            expect(hosted.has(gap.title)).toBe(false)
        }
    })
})

describe('Medieval theatre shelf - every card is a real download', () => {
    it('gives every card a hosted PDF that exists, with its own page count', () => {
        for (const play of MEDIEVAL_PLAYS) {
            const card = toMedievalCard(play)
            const built = MEDIEVAL_SHELF_BY_SLUG[play.slug]

            expect(built, `${play.slug} has no PDF in the shelf`).toBeTruthy()
            expect(card.download_path).toBe(`/library/medieval/${play.slug}.pdf`)
            expect(card.isExternal).toBe(false)
            expect(card.external_url).toBeNull()
            expect(card.domain).toBe(MEDIEVAL_DOMAIN)

            const file = path.join(PUBLIC_DIR, card.download_path)
            expect(fs.existsSync(file), `${play.slug} PDF is missing`).toBe(true)
            const bytes = fs.readFileSync(file)
            expect(bytes.subarray(0, 5).toString()).toBe('%PDF-')
            expect(bytes.length).toBe(card.file_size_bytes)
            expect(card.page_count).toBeGreaterThanOrEqual(8)
        }
    })

    it('records a checksum for every PDF, and the file on disk still matches it', () => {
        for (const play of MEDIEVAL_PLAYS) {
            const built = MEDIEVAL_SHELF_BY_SLUG[play.slug]
            const bytes = fs.readFileSync(path.join(PUBLIC_DIR, built.download_path))
            const digest = crypto.createHash('sha256').update(bytes).digest('hex')
            expect(digest, `${play.slug} PDF has changed since it was catalogued`).toBe(built.sha256)
        }
    })

    it('never sends a reader to Gutenberg to read the play', () => {
        for (const play of MEDIEVAL_PLAYS) {
            const rendered = JSON.stringify(toMedievalCard(play))
            expect(rendered).not.toMatch(/gutenberg\.org/i)
            expect(toMedievalCard(play).download_path.startsWith('/library/medieval/')).toBe(true)
        }
    })

    it('credits the text every PDF was set from', () => {
        for (const play of MEDIEVAL_PLAYS) {
            const built = MEDIEVAL_SHELF_BY_SLUG[play.slug]
            expect(built.translator, `${play.slug} has no translator or editor`).toBeTruthy()
            expect(built.sourceName, `${play.slug} has no source`).toBeTruthy()
            expect(toMedievalCard(play).subtitle).toContain(`${built.pages} pages`)
            expect(play.sourceEdition).toBeTruthy()
        }
        // Everyman and the cycles come from the Rhys volume; Hrotsvitha from St John.
        expect(MEDIEVAL_SHELF_BY_SLUG['everyman'].sourceId).toBe(19481)
        expect(MEDIEVAL_SHELF_BY_SLUG['sapientia'].sourceId).toBe(59770)
        expect(MEDIEVAL_SHELF_BY_SLUG['sapientia'].translator).toBe('Christopher St John')
    })

    it('gives every play a real synopsis, a note on its occasion and searchable topics', () => {
        for (const play of MEDIEVAL_PLAYS) {
            expect(play.synopsis.length, `${play.slug} synopsis`).toBeGreaterThan(120)
            expect(play.context.length, `${play.slug} context`).toBeGreaterThan(80)
            expect(play.topics.length, `${play.slug} topics`).toBeGreaterThanOrEqual(3)
            expect(play.dateLabel, `${play.slug} has no date`).toBeTruthy()
            expect(play.synopsis).not.toMatch(/lorem|placeholder|TBD|\bTODO\b/i)
            expect(play.tradition).toBeTruthy()
        }
    })

    it('keeps the pageants with the cycle that played them', () => {
        // The Wakefield Master is a writer, not a guild: his pageants are Wakefield.
        for (const slug of ['second-shepherds-play', 'crucifixion', 'harrowing-of-hell']) {
            expect(MEDIEVAL_SHELF_BY_SLUG[slug].tradition).toBe('Wakefield cycle')
        }
        expect(MEDIEVAL_SHELF_BY_SLUG['noahs-flood'].tradition).toBe('Chester cycle')
        expect(MEDIEVAL_SHELF_BY_SLUG['coventry-nativity'].tradition).toBe('Coventry cycle')
        expect(MEDIEVAL_SHELF_BY_SLUG['three-maries'].tradition).toBe('Cornish cycle')
        // Everyman is a morality, not a cycle play.
        expect(MEDIEVAL_SHELF_BY_SLUG['everyman'].tradition).toBe('Morality plays')
    })

    it('does not present the sixteenth-century interlude as a medieval cycle play', () => {
        const bale = MEDIEVAL_SHELF_BY_SLUG['gods-promises']
        expect(bale.dateLabel).toBe('1538')
        expect(`${findMedievalPlayBySlug('gods-promises').context}`).toMatch(/after the break with Rome|Reformation/i)
    })
})

describe('Medieval theatre shelf - how it appears in the library', () => {
    it('shows up in the counts alongside the other hosted shelves', () => {
        const merged = mergeLibraryMaterials([])
        expect(merged.filter((item) => item.isMedieval)).toHaveLength(MEDIEVAL_PLAYS.length)

        const counts = libraryCounts()
        expect(counts.medieval).toBe(MEDIEVAL_PLAYS.length)
        expect(counts.total).toBe(
            counts.packs +
                counts.books +
                counts.plays +
                counts.roman +
                counts.medieval +
                counts.renaissance +
                counts.hosted
        )
        expect(libraryCountLabel(counts)).toContain(
            `${MEDIEVAL_PLAYS.length} medieval plays to download`
        )
    })

    it('is findable by slug and stays free', () => {
        expect(findMedievalPlayBySlug('everyman')?.title).toBe('Everyman')
        expect(findMedievalPlayBySlug('not-a-play')).toBeNull()

        const card = toMedievalCard(findMedievalPlayBySlug('dulcitius'))
        expect(card.title).toBe('Dulcitius')
        expect(card.author).toBe('Hrotsvitha of Gandersheim')
        expect(card.topics).toContain('martyrdom')
        expect(card.is_free).toBe(true)
        expect(card.priceKobo).toBe(0)
        expect(card.code).toBe('')
    })
})
