import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import {
    MODERN_DOMAIN,
    MODERN_MOVEMENTS,
    MODERN_PLAYS,
    MODERN_SHELF_BY_SLUG,
    MODERN_UNHOSTABLE,
    findModernPlayBySlug,
    modernCounts,
    modernMovements,
    toModernCard,
} from '../lib/modernLibrary'
import { libraryCountLabel, libraryCounts, mergeLibraryMaterials } from '../lib/fresherLibrary'

const PUBLIC_DIR = path.join(process.cwd(), 'public')

describe('Modern theatre shelf - the corpus', () => {
    it('covers the movements the shelf declares, in the order it declares them', () => {
        expect(MODERN_MOVEMENTS.map((movement) => movement.name)).toEqual([
            'Realism',
            'Naturalism',
            'Symbolism',
            'Expressionism',
            'Epic Theatre',
            'Absurdism',
        ])

        const covered = modernMovements().map((movement) => movement.name)
        expect(covered).toEqual(['Realism', 'Naturalism', 'Symbolism', 'Expressionism'])
    })

    it('holds the playwrights the movements are built on', () => {
        const authors = new Set(MODERN_PLAYS.map((play) => play.author))
        for (const name of [
            'Henrik Ibsen',
            'Anton Chekhov',
            'August Strindberg',
            'Gerhart Hauptmann',
            'George Bernard Shaw',
            'Oscar Wilde',
            'J. M. Synge',
            'Maurice Maeterlinck',
            'W. B. Yeats',
            'Karel Čapek',
            'Maxim Gorky',
            'Leo Tolstoy',
        ]) {
            expect(authors.has(name), `${name} is missing`).toBe(true)
        }
        expect(MODERN_PLAYS.length).toBeGreaterThanOrEqual(60)
        expect(modernCounts().total).toBe(MODERN_PLAYS.length)
    })

    it('uses unique slugs and unique titles', () => {
        const slugs = new Set()
        const titles = new Set()
        for (const play of MODERN_PLAYS) {
            expect(play.slug).toMatch(/^[a-z0-9-]+$/)
            expect(slugs.has(play.slug), `duplicate slug: ${play.slug}`).toBe(false)
            slugs.add(play.slug)
            expect(titles.has(play.title), `duplicate title: ${play.title}`).toBe(false)
            titles.add(play.title)
        }
    })

    it('puts every play in a movement the shelf declares, and counts them by movement', () => {
        const declared = MODERN_MOVEMENTS.map((movement) => movement.name)
        for (const play of MODERN_PLAYS) {
            expect(declared, `${play.slug} sits in an undeclared movement`).toContain(play.movement)
        }
        const groups = modernMovements()
        expect(groups.reduce((total, group) => total + group.plays.length, 0)).toBe(MODERN_PLAYS.length)
        expect(groups.every((group) => group.plays.length > 0)).toBe(true)
        expect(Object.values(modernCounts().byMovement).reduce((a, b) => a + b, 0)).toBe(
            MODERN_PLAYS.length
        )
    })

    it('names the movements it cannot carry, and why, instead of faking coverage', () => {
        expect(MODERN_UNHOSTABLE.length).toBeGreaterThanOrEqual(4)
        const mentioned = MODERN_UNHOSTABLE.map((gap) => `${gap.title} ${gap.note}`).join(' ')
        for (const name of ['Brecht', 'Beckett', 'Ionesco', 'Pinter', 'Genet', 'Jarry']) {
            expect(mentioned, `${name} is not named as a gap`).toContain(name)
        }
        for (const gap of MODERN_UNHOSTABLE) {
            expect(gap.note.length).toBeGreaterThan(80)
            expect(gap.note).not.toContain('*')
        }
        // Neither movement can quietly disappear: both are still declared.
        const declared = MODERN_MOVEMENTS.map((movement) => movement.name)
        expect(declared).toContain('Epic Theatre')
        expect(declared).toContain('Absurdism')
    })
})

describe('Modern theatre shelf - every card is a real download', () => {
    it('gives every card a hosted PDF that exists, with its own page count', () => {
        for (const play of MODERN_PLAYS) {
            const card = toModernCard(play)
            const built = MODERN_SHELF_BY_SLUG[play.slug]

            expect(built, `${play.slug} has no PDF in the shelf`).toBeTruthy()
            expect(card.download_path).toBe(`/library/modern/${play.slug}.pdf`)
            expect(card.isExternal).toBe(false)
            expect(card.external_url).toBeNull()
            expect(card.domain).toBe(MODERN_DOMAIN)

            const file = path.join(PUBLIC_DIR, card.download_path)
            expect(fs.existsSync(file), `${play.slug} PDF is missing`).toBe(true)
            const bytes = fs.readFileSync(file)
            expect(bytes.subarray(0, 5).toString()).toBe('%PDF-')
            expect(bytes.length).toBe(card.file_size_bytes)
            expect(card.page_count).toBeGreaterThanOrEqual(10)
        }
    })

    it('records a checksum for every PDF, and the file on disk still matches it', () => {
        for (const play of MODERN_PLAYS) {
            const built = MODERN_SHELF_BY_SLUG[play.slug]
            const bytes = fs.readFileSync(path.join(PUBLIC_DIR, built.download_path))
            const digest = crypto.createHash('sha256').update(bytes).digest('hex')
            expect(digest, `${play.slug} PDF has changed since it was catalogued`).toBe(built.sha256)
        }
    })

    it('never sends a reader to Gutenberg to read the play', () => {
        for (const play of MODERN_PLAYS) {
            const rendered = JSON.stringify(toModernCard(play))
            expect(rendered).not.toMatch(/gutenberg\.org/i)
            expect(rendered).not.toMatch(/gutenberg\.net/i)
            expect(toModernCard(play).download_path.startsWith('/library/modern/')).toBe(true)
        }
    })

    it('credits the translator and the edition every PDF was set from', () => {
        for (const play of MODERN_PLAYS) {
            const built = MODERN_SHELF_BY_SLUG[play.slug]
            expect(built.translator, `${play.slug} has no translator`).toBeTruthy()
            expect(built.sourceName, `${play.slug} has no source`).toBeTruthy()
            expect(play.sourceEdition).toBeTruthy()
            expect(toModernCard(play).subtitle).toContain(`${built.pages} pages`)
        }
        expect(MODERN_SHELF_BY_SLUG['a-dolls-house'].translator).toContain('Sharp')
        expect(MODERN_SHELF_BY_SLUG['miss-julie'].translator).toContain('Oland')
        expect(MODERN_SHELF_BY_SLUG['pelleas-and-melisande'].translator).toContain('Hovey')
    })

    it('gives every play a real synopsis, a note on its context and searchable topics', () => {
        for (const play of MODERN_PLAYS) {
            expect(play.synopsis.length, `${play.slug} synopsis`).toBeGreaterThan(120)
            expect(play.context.length, `${play.slug} context`).toBeGreaterThan(80)
            expect(play.topics.length, `${play.slug} topics`).toBeGreaterThanOrEqual(3)
            expect(play.dateLabel, `${play.slug} has no date`).toBeTruthy()
            expect(play.synopsis).not.toMatch(/lorem|placeholder|TBD|\bTODO\b/i)
        }
    })

    it('writes plain text, because the cards and the gap panel render it as-is', () => {
        for (const play of MODERN_PLAYS) {
            expect(`${play.synopsis} ${play.context}`, `${play.slug} carries markdown`).not.toContain(
                '*'
            )
        }
    })

    it('dates every play', () => {
        for (const play of MODERN_PLAYS) {
            expect(play.dateLabel).toMatch(/^(c\.\s)?\d{4}(–\d{2,4})?$/)
        }
        expect(findModernPlayBySlug('the-road-to-damascus')?.dateLabel).toBe('1898–1904')
    })
})

describe('Modern theatre shelf - how it appears in the library', () => {
    it('shows up in the counts alongside the other hosted shelves', () => {
        const merged = mergeLibraryMaterials([])
        expect(merged.filter((item) => item.isModern)).toHaveLength(MODERN_PLAYS.length)

        const counts = libraryCounts()
        expect(counts.modern).toBe(MODERN_PLAYS.length)
        expect(counts.total).toBe(
            counts.packs +
                counts.books +
                counts.plays +
                counts.roman +
                counts.medieval +
                counts.renaissance +
                counts.modern +
                counts.hosted
        )
        expect(libraryCountLabel(counts)).toContain(`${MODERN_PLAYS.length} modern plays to download`)
    })

    it('is findable by slug, grouped by movement and stays free', () => {
        expect(findModernPlayBySlug('hedda-gabler')?.title).toBe('Hedda Gabler')
        expect(findModernPlayBySlug('not-a-play')).toBeNull()

        const card = toModernCard(findModernPlayBySlug('the-importance-of-being-earnest'))
        expect(card.title).toBe('The Importance of Being Earnest')
        expect(card.author).toBe('Oscar Wilde')
        expect(card.group).toBe('Realism')
        expect(card.topics).toContain('the handbag')
        expect(card.is_free).toBe(true)
        expect(card.priceKobo).toBe(0)
        expect(card.code).toBe('')
        expect(card.isModern).toBe(true)
        expect(card.isDrama || card.isRoman || card.isMedieval || card.isRenaissance).toBe(false)
    })
})
