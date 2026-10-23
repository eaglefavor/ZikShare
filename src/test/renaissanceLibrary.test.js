import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import {
    RENAISSANCE_DOMAIN,
    RENAISSANCE_GROUPS,
    RENAISSANCE_NOT_AVAILABLE,
    RENAISSANCE_PLAYS,
    RENAISSANCE_SHELF_BY_SLUG,
    findRenaissancePlayBySlug,
    renaissanceCounts,
    renaissanceGroups,
    toRenaissanceCard,
} from '../lib/renaissanceLibrary'
import { libraryCountLabel, libraryCounts, mergeLibraryMaterials } from '../lib/fresherLibrary'
import { MODERN_PLAYS } from '../lib/modernLibrary'

const PUBLIC_DIR = path.join(process.cwd(), 'public')

describe('Renaissance theatre shelf - the corpus', () => {
    it('holds every Shakespeare play and the best of his contemporaries', () => {
        expect(RENAISSANCE_PLAYS).toHaveLength(69)
        expect(renaissanceCounts()).toEqual({ shakespeare: 38, contemporaries: 31, total: 69 })

        const authors = new Set(RENAISSANCE_PLAYS.map((play) => play.author))
        for (const name of [
            'William Shakespeare',
            'Christopher Marlowe',
            'Ben Jonson',
            'Thomas Kyd',
            'John Webster',
            'Thomas Middleton',
            'John Ford',
            'James Shirley',
        ]) {
            expect(authors.has(name), `${name} is missing`).toBe(true)
        }
    })

    it('uses unique slugs and unique titles', () => {
        const slugs = new Set()
        const titles = new Set()
        for (const play of RENAISSANCE_PLAYS) {
            expect(play.slug).toMatch(/^[a-z0-9-]+$/)
            expect(slugs.has(play.slug), `duplicate slug: ${play.slug}`).toBe(false)
            slugs.add(play.slug)
            expect(titles.has(play.title), `duplicate title: ${play.title}`).toBe(false)
            titles.add(play.title)
        }
    })

    it('puts every play in a group that the shelf actually declares', () => {
        const declared = RENAISSANCE_GROUPS.map((group) => group.name)
        for (const play of RENAISSANCE_PLAYS) {
            expect(declared, `${play.slug} sits in an undeclared group`).toContain(play.group)
        }
        // Every group holds something, and the groups add up to the shelf.
        const groups = renaissanceGroups()
        expect(groups.reduce((total, group) => total + group.plays.length, 0)).toBe(
            RENAISSANCE_PLAYS.length
        )
        expect(groups.every((group) => group.plays.length > 0)).toBe(true)
    })

    it('names the plays it does not hold instead of pretending they do not exist', () => {
        expect(RENAISSANCE_NOT_AVAILABLE.length).toBeGreaterThanOrEqual(5)
        const hosted = new Set(RENAISSANCE_PLAYS.map((play) => play.title))
        for (const gap of RENAISSANCE_NOT_AVAILABLE) {
            expect(gap.title).toBeTruthy()
            expect(gap.note.length).toBeGreaterThan(60)
            expect(hosted.has(gap.title)).toBe(false)
        }
    })
})

describe('Renaissance theatre shelf - every card is a real download', () => {
    it('gives every card a hosted PDF that exists, with its own page count', () => {
        for (const play of RENAISSANCE_PLAYS) {
            const card = toRenaissanceCard(play)
            const built = RENAISSANCE_SHELF_BY_SLUG[play.slug]

            expect(built, `${play.slug} has no PDF in the shelf`).toBeTruthy()
            expect(card.download_path).toBe(`/library/renaissance/${play.slug}.pdf`)
            expect(card.isExternal).toBe(false)
            expect(card.external_url).toBeNull()
            expect(card.domain).toBe(RENAISSANCE_DOMAIN)

            const file = path.join(PUBLIC_DIR, card.download_path)
            expect(fs.existsSync(file), `${play.slug} PDF is missing`).toBe(true)
            const bytes = fs.readFileSync(file)
            expect(bytes.subarray(0, 5).toString()).toBe('%PDF-')
            expect(bytes.length).toBe(card.file_size_bytes)
            expect(card.page_count).toBeGreaterThanOrEqual(20)
        }
    })

    it('records a checksum for every PDF, and the file on disk still matches it', () => {
        for (const play of RENAISSANCE_PLAYS) {
            const built = RENAISSANCE_SHELF_BY_SLUG[play.slug]
            const bytes = fs.readFileSync(path.join(PUBLIC_DIR, built.download_path))
            const digest = crypto.createHash('sha256').update(bytes).digest('hex')
            expect(digest, `${play.slug} PDF has changed since it was catalogued`).toBe(built.sha256)
        }
    })

    it('never sends a reader to Gutenberg to read the play', () => {
        for (const play of RENAISSANCE_PLAYS) {
            const rendered = JSON.stringify(toRenaissanceCard(play))
            expect(rendered).not.toMatch(/gutenberg\.org/i)
            expect(rendered).not.toMatch(/gutenberg\.net/i)
            expect(toRenaissanceCard(play).download_path.startsWith('/library/renaissance/')).toBe(true)
        }
    })

    it('credits the edition every PDF was set from', () => {
        for (const play of RENAISSANCE_PLAYS) {
            const built = RENAISSANCE_SHELF_BY_SLUG[play.slug]
            expect(built.translator, `${play.slug} has no editor`).toBeTruthy()
            expect(built.sourceName, `${play.slug} has no source`).toBeTruthy()
            expect(play.sourceEdition).toBeTruthy()
            expect(toRenaissanceCard(play).subtitle).toContain(`${built.pages} pages`)
        }
        expect(RENAISSANCE_SHELF_BY_SLUG['hamlet'].sourceId).toBe(100)
        expect(RENAISSANCE_SHELF_BY_SLUG['the-duchess-of-malfi'].sourceId).toBe(77587)
        expect(RENAISSANCE_SHELF_BY_SLUG['tamburlaine-part-2'].sourceId).toBe(1589)
    })

    it('keeps the glosses the 1911 edition printed for its plays', () => {
        // The Elizabethan volume numbers its notes through the whole book; the
        // ones a play cites are reprinted at the end of that play's PDF.
        expect(RENAISSANCE_SHELF_BY_SLUG['volpone'].notes).toBeGreaterThan(100)
        expect(RENAISSANCE_SHELF_BY_SLUG['the-changeling'].notes).toBeGreaterThan(50)
        // Shakespeare's Globe text carries no notes, so none are claimed.
        expect(RENAISSANCE_SHELF_BY_SLUG['hamlet'].notes).toBe(0)
    })

    it('gives every play a real synopsis, a note on its occasion and searchable topics', () => {
        for (const play of RENAISSANCE_PLAYS) {
            expect(play.synopsis.length, `${play.slug} synopsis`).toBeGreaterThan(120)
            expect(play.context.length, `${play.slug} context`).toBeGreaterThan(80)
            expect(play.topics.length, `${play.slug} topics`).toBeGreaterThanOrEqual(3)
            expect(play.dateLabel, `${play.slug} has no date`).toBeTruthy()
            expect(play.synopsis).not.toMatch(/lorem|placeholder|TBD|\bTODO\b/i)
        }
    })

    it('writes plain text, because the cards and the gap panel render it as-is', () => {
        // The UI does not parse markdown: an asterisk would be printed.
        for (const play of RENAISSANCE_PLAYS) {
            expect(`${play.synopsis} ${play.context}`, `${play.slug} carries markdown`).not.toContain('*')
        }
        for (const gap of RENAISSANCE_NOT_AVAILABLE) {
            expect(gap.note, `${gap.title} carries markdown`).not.toContain('*')
        }
    })

    it('dates every play, and does not invent a single year where the record only gives a range', () => {
        const ranged = RENAISSANCE_PLAYS.filter((play) => play.dateLabel.includes('–'))
        expect(ranged.length).toBeGreaterThan(20)
        for (const play of RENAISSANCE_PLAYS) {
            expect(play.dateLabel).toMatch(/^(c\.\s)?\d{4}(–\d{2,4})?$/)
        }
    })
})

describe('Renaissance theatre shelf - how it appears in the library', () => {
    it('shows up in the counts alongside the other hosted shelves', () => {
        const merged = mergeLibraryMaterials([])
        expect(merged.filter((item) => item.isRenaissance)).toHaveLength(RENAISSANCE_PLAYS.length)

        const counts = libraryCounts()
        expect(counts.renaissance).toBe(RENAISSANCE_PLAYS.length)
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
        expect(libraryCountLabel(counts)).toContain(
            `${RENAISSANCE_PLAYS.length} Renaissance plays to download`
        )
    })

    it('is findable by slug and stays free', () => {
        expect(findRenaissancePlayBySlug('hamlet')?.title).toBe('Hamlet')
        expect(findRenaissancePlayBySlug('not-a-play')).toBeNull()

        const card = toRenaissanceCard(findRenaissancePlayBySlug('doctor-faustus'))
        expect(card.title).toBe('Doctor Faustus')
        expect(card.author).toBe('Christopher Marlowe')
        expect(card.topics).toContain('the devil')
        expect(card.is_free).toBe(true)
        expect(card.priceKobo).toBe(0)
        expect(card.code).toBe('')
        expect(card.isRenaissance).toBe(true)
        expect(card.isDrama || card.isRoman || card.isMedieval).toBe(false)
    })
})
