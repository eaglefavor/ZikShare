import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import {
    CLASSIC_TEXTS,
    GUIDES,
    THEATRE_DOMAIN,
    THEATRE_SHELF_BY_SLUG,
    THEATRE_TITLES,
    THEATRE_TOPICS,
    findTheatreTitleBySlug,
    theatreCounts,
    theatreTopics,
    toTheatreCard,
} from '../lib/theatreArtsLibrary'
import { libraryCountLabel, libraryCounts, mergeLibraryMaterials } from '../lib/fresherLibrary'

const PUBLIC_DIR = path.join(process.cwd(), 'public')

describe('Theatre Arts shelf - the corpus', () => {
    it('covers every topic the department lists', () => {
        expect(THEATRE_TOPICS).toHaveLength(17)
        const expected = [
            'Directing',
            'Scriptwriting',
            'Lighting',
            'Set Design',
            'Props Design',
            'Makeup Art',
            'Costume',
            'Sound & Song Design',
            'History of African Theatre',
            'Evolution of Theatre',
            'Theatre Management',
            'Pre-Colonial Theatre',
            'Colonial Theatre',
            'Post-Colonial Theatre',
            'Dramatic Criticism',
            'Speech Arts',
            'Film Analysis',
        ]
        expect(THEATRE_TOPICS.map((topic) => topic.name)).toEqual(expected)
        expect(theatreTopics().map((topic) => topic.name)).toEqual(expected)
        // No topic is advertised with nothing behind it.
        expect(theatreTopics().every((topic) => topic.titles.length >= 2)).toBe(true)
    })

    it('holds at least fifty titles, in two clearly different kinds', () => {
        expect(THEATRE_TITLES.length).toBeGreaterThanOrEqual(50)
        expect(THEATRE_TITLES.length).toBe(GUIDES.length + CLASSIC_TEXTS.length)
        expect(GUIDES.length).toBeGreaterThanOrEqual(25)
        expect(CLASSIC_TEXTS.length).toBeGreaterThanOrEqual(15)

        for (const item of THEATRE_TITLES) {
            expect(['guide', 'classic']).toContain(item.kind)
            expect(item.kindLabel).toBeTruthy()
        }
    })

    it('uses unique slugs and unique titles', () => {
        const slugs = new Set()
        const titles = new Set()
        for (const item of THEATRE_TITLES) {
            expect(item.slug).toMatch(/^[a-z0-9-]+$/)
            expect(slugs.has(item.slug), `duplicate slug: ${item.slug}`).toBe(false)
            slugs.add(item.slug)
            expect(titles.has(item.title), `duplicate title: ${item.title}`).toBe(false)
            titles.add(item.title)
        }
    })

    it('puts every title in a declared topic, and the topics add up', () => {
        const declared = THEATRE_TOPICS.map((topic) => topic.name)
        for (const item of THEATRE_TITLES) {
            expect(declared, `${item.slug} sits in an undeclared topic`).toContain(item.topic)
        }
        expect(theatreTopics().reduce((total, topic) => total + topic.titles.length, 0)).toBe(
            THEATRE_TITLES.length
        )
        expect(Object.values(theatreCounts().byTopic).reduce((a, b) => a + b, 0)).toBe(
            THEATRE_TITLES.length
        )
    })

    it('credits a real source for every public-domain text', () => {
        for (const item of CLASSIC_TEXTS) {
            expect(item.sourceId, `${item.slug} has no Gutenberg id`).toBeGreaterThan(0)
            expect(item.editor, `${item.slug} has no editor or translator`).toBeTruthy()
            expect(item.edition, `${item.slug} has no edition`).toBeTruthy()
            expect(item.note.length, `${item.slug} note`).toBeGreaterThan(120)
            expect(item.author).not.toBe('ZikShare Theatre Arts')
        }
    })

    it('writes its own guides, and says so on the card', () => {
        for (const item of GUIDES) {
            expect(item.author).toBe('ZikShare Theatre Arts')
            expect(item.sections.length, `${item.slug} sections`).toBeGreaterThanOrEqual(5)
            expect(item.exercises.length, `${item.slug} exercises`).toBeGreaterThanOrEqual(3)
            expect(item.reading.length, `${item.slug} reading`).toBeGreaterThanOrEqual(2)
            expect(item.covers.length, `${item.slug} covers`).toBeGreaterThanOrEqual(3)
            expect(item.summary.length, `${item.slug} summary`).toBeGreaterThan(100)
            for (const section of item.sections) {
                expect(section.heading).toBeTruthy()
                expect(section.paras.length).toBeGreaterThan(0)
            }
        }
    })

    it('writes plain text, because the cards render it as-is', () => {
        for (const item of THEATRE_TITLES) {
            expect(`${item.summary} ${item.note || ''}`, `${item.slug} carries markdown`).not.toContain(
                '*'
            )
            expect(item.summary).not.toMatch(/lorem|placeholder|TBD|\bTODO\b/i)
        }
    })
})

describe('Theatre Arts shelf - every card is a real download', () => {
    it('gives every card a hosted PDF that exists, with its own page count', () => {
        for (const item of THEATRE_TITLES) {
            const card = toTheatreCard(item)
            const built = THEATRE_SHELF_BY_SLUG[item.slug]

            expect(built, `${item.slug} has no PDF in the shelf`).toBeTruthy()
            expect(card.download_path).toBe(`/library/theatre/${item.slug}.pdf`)
            expect(card.isExternal).toBe(false)
            expect(card.external_url).toBeNull()
            expect(card.domain).toBe(THEATRE_DOMAIN)
            expect(card.priceKobo).toBe(0)

            const file = path.join(PUBLIC_DIR, card.download_path)
            expect(fs.existsSync(file), `${item.slug} PDF is missing`).toBe(true)
            const bytes = fs.readFileSync(file)
            expect(bytes.subarray(0, 5).toString()).toBe('%PDF-')
            expect(bytes.length).toBe(card.file_size_bytes)
            expect(card.page_count).toBeGreaterThanOrEqual(2)
        }
    })

    it('records a checksum for every PDF, and the file on disk still matches it', () => {
        for (const item of THEATRE_TITLES) {
            const built = THEATRE_SHELF_BY_SLUG[item.slug]
            const bytes = fs.readFileSync(path.join(PUBLIC_DIR, built.download_path))
            const digest = crypto.createHash('sha256').update(bytes).digest('hex')
            expect(digest, `${item.slug} PDF has changed since it was catalogued`).toBe(built.sha256)
        }
    })

    it('never sends a reader off-site for any title', () => {
        for (const item of THEATRE_TITLES) {
            const rendered = JSON.stringify(toTheatreCard(item))
            expect(rendered).not.toMatch(/gutenberg\.org/i)
            expect(rendered).not.toMatch(/http/i)
            expect(toTheatreCard(item).download_path.startsWith('/library/theatre/')).toBe(true)
        }
    })

    it('gives the guides real length in the built files', () => {
        // A three-page briefing is not a library title. Every guide is at least
        // six hundred words of its own text when it is built.
        for (const item of GUIDES) {
            const built = THEATRE_SHELF_BY_SLUG[item.slug]
            expect(built.words, `${item.slug} is ${built.words} words`).toBeGreaterThan(600)
        }
    })

    it('labels the two kinds of document differently', () => {
        const guide = toTheatreCard(findTheatreTitleBySlug('criticism-how-to-review-a-play'))
        const classic = toTheatreCard(findTheatreTitleBySlug('aristotle-poetics'))

        expect(guide.subtitle).toMatch(/^ZikShare guide/)
        expect(classic.subtitle).toMatch(/^Public-domain text/)
        expect(guide.isGuide).toBe(true)
        expect(classic.isGuide).toBe(false)
        expect(guide.author).toBe('ZikShare Theatre Arts')
        expect(classic.author).toBe('Aristotle')
    })
})

describe('Theatre Arts shelf - how it appears in the library', () => {
    it('shows up in the counts alongside the other hosted shelves', () => {
        const merged = mergeLibraryMaterials([])
        expect(merged.filter((item) => item.isTheatre)).toHaveLength(THEATRE_TITLES.length)

        const counts = libraryCounts()
        expect(counts.theatre).toBe(THEATRE_TITLES.length)
        expect(counts.total).toBe(
            counts.packs +
                counts.books +
                counts.plays +
                counts.roman +
                counts.medieval +
                counts.renaissance +
                counts.modern +
                counts.theatre +
                counts.hosted
        )
        expect(libraryCountLabel(counts)).toContain(
            `${THEATRE_TITLES.length} Theatre Arts titles to download`
        )
    })

    it('is findable by slug, grouped by topic and free', () => {
        expect(findTheatreTitleBySlug('aristotle-poetics')?.title).toBe('The Poetics of Aristotle')
        expect(findTheatreTitleBySlug('not-a-title')).toBeNull()

        const card = toTheatreCard(findTheatreTitleBySlug('lighting-lanterns-angles-colour'))
        expect(card.title).toContain('Lighting the Stage')
        expect(card.group).toBe('Lighting')
        expect(card.department).toBe('Theatre & Film Studies')
        expect(card.is_free).toBe(true)
        expect(card.isTheatre).toBe(true)
        expect(card.isDrama || card.isRoman || card.isMedieval || card.isRenaissance || card.isModern).toBe(
            false
        )
    })
})
