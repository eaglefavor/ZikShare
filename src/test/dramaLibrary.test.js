import { describe, it, expect } from 'vitest'
import {
    AESCHYLUS_PLAYS,
    DRAMA_AUTHORS,
    DRAMA_DOMAIN,
    DRAMA_PLAYS,
    EURIPIDES_NOT_AVAILABLE,
    EURIPIDES_PLAYS,
    DRAMA_SHELF_BY_SLUG,
    SOPHOCLES_PLAYS,
    findPlayBySlug,
    toDramaCard,
} from '../lib/dramaLibrary'
import { mergeLibraryMaterials, libraryCounts } from '../lib/fresherLibrary'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const PUBLIC_DIR = path.join(process.cwd(), 'public')

describe('Greek tragedy shelf - the corpus', () => {
    it('holds every surviving play of the three tragedians', () => {
        expect(AESCHYLUS_PLAYS).toHaveLength(7)
        expect(SOPHOCLES_PLAYS).toHaveLength(7)
        expect(EURIPIDES_PLAYS).toHaveLength(17)
        expect(DRAMA_PLAYS).toHaveLength(31)
        expect(DRAMA_AUTHORS.map((a) => a.name)).toEqual(['Aeschylus', 'Sophocles', 'Euripides'])
    })

    it('accounts for the two Euripides plays it cannot host', () => {
        // 17 hosted + 2 recorded without a PDF = the 19 plays that survive.
        expect(EURIPIDES_PLAYS.length + EURIPIDES_NOT_AVAILABLE.length).toBe(19)
        expect(EURIPIDES_NOT_AVAILABLE.map((p) => p.title)).toEqual([
            'Ion',
            'The Suppliants',
        ])
        for (const gap of EURIPIDES_NOT_AVAILABLE) {
            expect(gap.note).toMatch(/No public-domain English translation/i)
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

describe('Greek tragedy shelf - every card is a real download', () => {
    it('gives every card a hosted PDF that exists, with its own page count', () => {
        for (const play of DRAMA_PLAYS) {
            const card = toDramaCard(play)
            const built = DRAMA_SHELF_BY_SLUG[play.slug]

            expect(built, `${play.slug} has no PDF in the shelf`).toBeTruthy()
            expect(card.download_path).toBe(`/library/drama/${play.slug}.pdf`)
            // Hosted, not linked: nothing on this shelf opens another website.
            expect(card.isExternal).toBe(false)
            expect(card.external_url).toBeNull()
            expect(card.domain).toBe(DRAMA_DOMAIN)

            const file = path.join(PUBLIC_DIR, card.download_path)
            expect(fs.existsSync(file), `${play.slug} PDF is missing`).toBe(true)
            const bytes = fs.readFileSync(file)
            expect(bytes.subarray(0, 5).toString()).toBe('%PDF-')
            expect(bytes.length).toBe(card.file_size_bytes)
            expect(card.page_count).toBeGreaterThan(20)
        }
    })

    it('records a checksum for every PDF, and the file on disk still matches it', () => {
        for (const play of DRAMA_PLAYS) {
            const built = DRAMA_SHELF_BY_SLUG[play.slug]
            const bytes = fs.readFileSync(path.join(PUBLIC_DIR, built.download_path))
            const digest = crypto.createHash('sha256').update(bytes).digest('hex')
            expect(digest, `${play.slug} PDF has changed since it was catalogued`).toBe(built.sha256)
        }
    })

    it('attributes each PDF to the translation and edition it was cut from', () => {
        for (const play of DRAMA_PLAYS) {
            const built = DRAMA_SHELF_BY_SLUG[play.slug]
            expect(built.translator, `${play.slug} has no translator`).toBeTruthy()
            expect(built.gutenbergId).toBe(play.gutenbergId)
            expect(toDramaCard(play).subtitle).toContain(`Translated by ${built.translator}`)
            expect(toDramaCard(play).subtitle).toContain(`${built.pages} pages`)
            expect(play.collection).toBeTruthy()
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
        // The trilogy is only complete as a trilogy: all three share one edition.
        expect(new Set(oresteia.map((play) => play.gutenbergId)).size).toBeLessThan(3)
    })
})

describe('Greek tragedy shelf - how it appears in the library', () => {
    it('shows up in the counts alongside the hosted material', () => {
        const merged = mergeLibraryMaterials([])
        const plays = merged.filter((item) => item.isDrama)
        expect(plays).toHaveLength(DRAMA_PLAYS.length)

        const counts = libraryCounts()
        expect(counts.plays).toBe(DRAMA_PLAYS.length)
        expect(counts.hosted).toBeGreaterThan(0)
        expect(counts.total).toBe(
            counts.packs + counts.books + counts.plays + counts.roman + counts.hosted
        )
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
