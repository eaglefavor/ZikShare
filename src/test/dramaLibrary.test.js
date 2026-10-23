import { describe, it, expect } from 'vitest'
import {
    AESCHYLUS_PLAYS,
    DRAMA_AUTHORS,
    DRAMA_DOMAIN,
    DRAMA_PLAYS,
    EURIPIDES_NOT_ON_GUTENBERG,
    EURIPIDES_PLAYS,
    SOPHOCLES_PLAYS,
    findPlayBySlug,
    toDramaCard,
} from '../lib/dramaLibrary'
import { mergeLibraryMaterials, libraryCounts } from '../lib/fresherLibrary'

describe('Greek tragedy shelf - the corpus', () => {
    it('holds every surviving play of the three tragedians', () => {
        expect(AESCHYLUS_PLAYS).toHaveLength(7)
        expect(SOPHOCLES_PLAYS).toHaveLength(7)
        expect(EURIPIDES_PLAYS).toHaveLength(15)
        expect(DRAMA_PLAYS).toHaveLength(29)
        expect(DRAMA_AUTHORS.map((a) => a.name)).toEqual(['Aeschylus', 'Sophocles', 'Euripides'])
    })

    it('accounts for the four Euripides plays it does not link', () => {
        // 15 linked + 4 recorded without a link = the 19 plays that survive.
        expect(EURIPIDES_PLAYS.length + EURIPIDES_NOT_ON_GUTENBERG.length).toBe(19)
        expect(EURIPIDES_NOT_ON_GUTENBERG.map((p) => p.title)).toEqual([
            'Ion',
            'The Suppliants',
            'Iphigenia at Aulis',
            'The Phoenician Women',
        ])
        for (const gap of EURIPIDES_NOT_ON_GUTENBERG) {
            expect(gap.note).toMatch(/No free English translation/i)
        }
    })

    it('uses unique slugs, and unique titles within an author', () => {
        const slugs = new Set()
        const titles = new Set()
        for (const play of DRAMA_PLAYS) {
            expect(play.slug).toMatch(/^[a-z0-9-]+$/)
            expect(slugs.has(play.slug), `duplicate slug: ${play.slug}`).toBe(false)
            slugs.add(play.slug)
            // Two playwrights may each have an Electra; one playwright may not
            // have the same play twice.
            const key = `${play.author}: ${play.title}`
            expect(titles.has(key), `duplicate title: ${key}`).toBe(false)
            titles.add(key)
        }
        // Both Electras are on the shelf and are told apart by their author.
        const electras = DRAMA_PLAYS.filter((play) => play.title === 'Electra')
        expect(electras.map((play) => play.author).sort()).toEqual(['Euripides', 'Sophocles'])
    })
})

describe('Greek tragedy shelf - every card is honest', () => {
    it('links to a Project Gutenberg ebook and never to a hosted file', () => {
        for (const play of DRAMA_PLAYS) {
            expect(Number.isInteger(play.gutenbergId), `${play.slug} needs an ebook id`).toBe(true)
            expect(play.gutenbergId).toBeGreaterThan(0)

            const card = toDramaCard(play)
            expect(card.external_url).toBe(`https://www.gutenberg.org/ebooks/${play.gutenbergId}`)
            // Nothing on this shelf is a ZikShare download.
            expect(card.download_path).toBeNull()
            expect(card.isExternal).toBe(true)
            // No invented page count or file size for a file we do not hold.
            expect(card.page_count).toBeNull()
            expect(card.file_size_bytes).toBeNull()
            expect(card.domain).toBe(DRAMA_DOMAIN)
        }
    })

    it('gives every play a real synopsis, a reading note and searchable topics', () => {
        for (const play of DRAMA_PLAYS) {
            expect(play.synopsis.length, `${play.slug} synopsis`).toBeGreaterThan(120)
            expect(play.context.length, `${play.slug} context`).toBeGreaterThan(80)
            expect(play.topics.length, `${play.slug} topics`).toBeGreaterThanOrEqual(3)
            expect(play.author).toMatch(/^(Aeschylus|Sophocles|Euripides)$/)
            expect(play.greekTitle).toBeTruthy()
            // A synopsis must describe the plot, not advertise the card.
            expect(play.synopsis).not.toMatch(/lorem|placeholder|TBD|\bTODO\b/i)
        }
    })

    it('credits a translator only where one is recorded, and names the collection', () => {
        const credited = DRAMA_PLAYS.filter((play) => play.translator)
        expect(credited.length).toBeGreaterThan(0)
        for (const play of credited) {
            expect(toDramaCard(play).subtitle).toContain(`Translated by ${play.translator}`)
        }
        for (const play of DRAMA_PLAYS.filter((p) => !p.translator)) {
            expect(toDramaCard(play).subtitle).toBe('Free full text at Project Gutenberg')
        }
        for (const play of DRAMA_PLAYS) {
            expect(play.collection).toBeTruthy()
        }
    })

    it('marks Cyclops as the only satyr play', () => {
        const satyr = DRAMA_PLAYS.filter((play) => play.kind === 'satyr')
        expect(satyr.map((play) => play.title)).toEqual(['Cyclops'])
    })

    it('keeps the Oresteia as three separate plays', () => {
        const oresteia = DRAMA_PLAYS.filter((play) => play.topics.includes('Oresteia'))
        expect(oresteia.map((play) => play.title)).toEqual([
            'Agamemnon',
            'The Libation Bearers',
            'The Eumenides',
        ])
        // The trilogy is only complete as a trilogy: all three share one text.
        expect(new Set(oresteia.map((play) => play.gutenbergId)).size).toBeLessThan(3)
    })
})

describe('Greek tragedy shelf - how it appears in the library', () => {
    it('is the first shelf and shows up in the counts', () => {
        const merged = mergeLibraryMaterials([])
        const plays = merged.filter((item) => item.isDrama)
        expect(plays).toHaveLength(DRAMA_PLAYS.length)

        const counts = libraryCounts()
        expect(counts.plays).toBe(DRAMA_PLAYS.length)
        expect(counts.total).toBe(counts.packs + counts.books + counts.plays)
    })

    it('is findable by playwright, by title and by its Greek name', () => {
        expect(findPlayBySlug('antigone-sophocles')?.title).toBe('Antigone')
        expect(findPlayBySlug('not-a-play')).toBeNull()

        const card = toDramaCard(findPlayBySlug('bacchae-euripides'))
        expect(card.title).toBe('The Bacchae')
        expect(card.greekTitle).toBe('Βάκχαι')
        expect(card.topics).toContain('Dionysus')
    })
})
