/**
 * Typeset the medieval theatre shelf.
 *
 * Two Gutenberg volunteers' editions hold the whole shelf:
 *
 * - #19481, "Everyman" with other interludes (Everyman's Library, 1909) — the
 *   morality play, four Wakefield pageants, two Chester pageants, the Coventry
 *   Nativity, two Cornish pageants, Bale's God's Promises and the Cornish
 *   mummers' play.
 * - #59770, The Plays of Roswitha in Christopher St John's translation (1923).
 *
 * Each play runs from its own heading to the next play's heading, the way the
 * Roman builder cuts a volume. #19481 keeps a single numbered glossary at the
 * back of the book; the notes that belong to a play are gathered from it and
 * printed at the end of that play, so a gloss is never left pointing at nothing.
 *
 * Usage: node scripts/build-medieval-pdfs.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { PDFDocument } from 'pdf-lib'
import { ACCENTS, buildPlayPdf, clean } from './lib/play-pdf.mjs'
import { CYCLE_PLAYS, ROSWITHA_PLAYS } from '../src/lib/medievalLibrary.js'

const ROOT = process.cwd()
const SOURCE = path.join(ROOT, 'library', 'medieval', 'source')
const OUT_DIR = path.join(ROOT, 'public', 'library', 'medieval')
const OUT_JSON = path.join(ROOT, 'library', 'medieval', 'shelf.generated.json')
const OUT_JS = path.join(ROOT, 'src', 'lib', 'medievalLibraryData.js')

const START = /^\*\*\*\s*START OF (THE|THIS) PROJECT GUTENBERG/i
const END = /^\*\*\*\s*END OF (THE|THIS) PROJECT GUTENBERG/i

const SOURCES = {
    19481: {
        end: 'APPENDIX B',
        label: 'Project Gutenberg eBook #19481',
        notes: true,
    },
    59770: {
        end: 'A NOTE ON THE ACTING OF THE PLAYS',
        label: 'Project Gutenberg eBook #59770',
        notes: false,
    },
}

const PLAYS = [...CYCLE_PLAYS, ...ROSWITHA_PLAYS]

const PLAYS_BY_SOURCE = PLAYS.reduce((groups, play) => {
    groups[play.sourceId ?? sourceIdFor(play)] = groups[play.sourceId ?? sourceIdFor(play)] || []
    groups[play.sourceId ?? sourceIdFor(play)].push(play)
    return groups
}, {})

function sourceIdFor(play) {
    return play.sourceName.includes('59770') ? 59770 : 19481
}

/* ── Read a volume ────────────────────────────────────────────────────────── */

const cache = new Map()

function volume(id) {
    if (cache.has(id)) return cache.get(id)

    const lines = clean(fs.readFileSync(path.join(SOURCE, `${id}.txt`), 'utf8')).split('\n')
    const start = lines.findIndex((line) => START.test(line))
    const end = lines.findIndex((line) => END.test(line))
    if (start === -1 || end === -1 || end < start) {
        throw new Error(`source ${id}: Gutenberg start/end markers not found`)
    }

    const loaded = {
        header: lines.slice(0, start + 1),
        body: lines.slice(start + 1, end),
        footer: lines.slice(end),
        notes: SOURCES[id].notes ? readNotes(lines) : new Map(),
    }
    cache.set(id, loaded)
    return loaded
}

/**
 * #19481 prints one glossary for the whole book, numbered straight through.
 * Entries are one or two lines each: "[213] _rade_, quickly."
 */
function readNotes(lines) {
    const start = lines.findIndex((line) => /^FOOTNOTES:?$/.test(line.trim()))
    if (start === -1) return new Map()

    const notes = new Map()
    let current = null

    for (let index = start + 1; index < lines.length; index += 1) {
        const line = lines[index]
        const match = /^\[(\d+)\]\s*(.*)$/.exec(line.trim())
        if (match) {
            current = Number(match[1])
            notes.set(current, match[2].trim())
            continue
        }
        if (START.test(line) || /^THE FULL PROJECT GUTENBERG/i.test(line.trim())) break
        if (!line.trim()) continue
        if (current === null) continue
        // A continuation line of the note above it.
        notes.set(current, `${notes.get(current)} ${line.trim()}`.trim())
    }

    return notes
}

/* ── Cut one play out of a volume ─────────────────────────────────────────── */

function headingIndex(body, heading) {
    const wanted = clean(heading).replace(/\s+/g, ' ').trim()
    const index = body.findIndex((line) => clean(line).replace(/\s+/g, ' ').trim() === wanted)
    if (index === -1) throw new Error(`heading not found: "${heading}"`)
    return index
}

/** Editorial furniture that sits between two plays and belongs to neither. */
const FURNITURE = /^(APPENDIX [A-Z]|FOOTNOTES:?|CONTENTS)$/

function sliceOf(play, id) {
    const source = volume(id)
    const plays = PLAYS_BY_SOURCE[id]
    const position = plays.indexOf(play)
    const start = headingIndex(source.body, play.heading)

    let end
    if (position + 1 < plays.length) {
        end = headingIndex(source.body, plays[position + 1].heading)
    } else {
        end = headingIndex(source.body, SOURCES[id].end)
    }
    if (end <= start) throw new Error(`${play.slug}: cut ends before it starts`)

    return { lines: source.body.slice(start, end).filter((line) => !FURNITURE.test(line.trim())), source }
}

/**
 * Both editions mark emphasis with underscores and print a stray ". In a PDF
 * set in Times neither survives as anything a reader wants to see.
 */
function deitalicise(text) {
    return text.replace(/_([^_\n]{1,200}?)_/g, '$1').replace(/_/g, '')
}

/* ── Build ────────────────────────────────────────────────────────────────── */

fs.mkdirSync(OUT_DIR, { recursive: true })
fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true })

const shelf = []

for (const play of PLAYS) {
    const id = sourceIdFor(play)
    const { lines, source } = sliceOf(play, id)
    const body = lines.join('\n')

    // Roswitha's volume carries reference numbers but prints no note list, so
    // the numbers would point at nothing; #19481's numbers do have notes.
    const usedNotes = [...body.matchAll(/\[(\d+)\]/g)].map((match) => Number(match[1]))
    const notes = source.notes.size
        ? [...new Set(usedNotes)].sort((a, b) => a - b).filter((n) => source.notes.has(n))
        : []

    const playText = deitalicise(
        source.notes.size ? body : body.replace(/\s?\[\d+\]/g, '')
    ).replace(/[ \t]+$/gm, '')

    const notesBlock = notes.length
        ? `\n\n\nNOTES\n\n${notes.map((n) => `[${n}] ${deitalicise(source.notes.get(n))}`).join('\n\n')}`
        : ''

    const headerText =
        source.header.join('\n') +
        (notes.length ? "\nThe edition's word-glosses for this play are printed at the end of the text.\n" : '')

    const words = `${playText}${notesBlock}`.split(/\s+/).filter(Boolean).length
    if (words < 600) throw new Error(`${play.slug}: only ${words} words extracted - the cut is wrong`)

    const bytes = await buildPlayPdf(play, {
        shelfLabel: 'MEDIEVAL THEATRE',
        accent: ACCENTS.medieval,
        meta: [
            ['Cycle or author', play.author],
            ['Text', play.translator],
            ['Source text', SOURCES[id].label],
            ['Edition', play.sourceEdition],
            ['Date', play.dateLabel],
            ['Language', 'English'],
            ['Rights', 'Public domain'],
        ],
        coverNote: [
            'This PDF was typeset by ZikShare from the edition named above.',
            'The play is in the public domain and ZikShare charges nothing for it.',
            '',
            "Project Gutenberg's header and licence, and its closing notice, are reproduced",
            'unchanged inside this file, because their terms travel with the text.',
            '',
            play.context,
        ].filter(Boolean),
        headerText,
        bodyText: `${playText}${notesBlock}`,
        footerText: source.footer.join('\n'),
    })

    fs.writeFileSync(path.join(OUT_DIR, `${play.slug}.pdf`), bytes)

    const pdf = await PDFDocument.load(bytes)
    shelf.push({
        slug: play.slug,
        title: play.title,
        author: play.author,
        tradition: play.tradition,
        translator: play.translator,
        kind: play.kind,
        dateLabel: play.dateLabel,
        sourceId: id,
        sourceName: play.sourceName,
        download_path: `/library/medieval/${play.slug}.pdf`,
        pages: pdf.getPageCount(),
        words,
        notes: notes.length,
        bytes: bytes.length,
        sha256: crypto.createHash('sha256').update(bytes).digest('hex'),
    })

    console.log(
        `${play.author.slice(0, 24).padEnd(25)} ${play.title.slice(0, 30).padEnd(31)} ${String(pdf.getPageCount()).padStart(4)}p ${(bytes.length / 1024).toFixed(0)}kB ${words}w`
    )
}

fs.writeFileSync(
    OUT_JSON,
    JSON.stringify({ generatedAt: new Date().toISOString(), count: shelf.length, shelf }, null, 2)
)
fs.writeFileSync(
    OUT_JS,
    '// AUTO-GENERATED by scripts/build-medieval-pdfs.mjs - do not edit by hand.\n' +
        '// Everyman volume: Project Gutenberg #19481. Roswitha: #59770.\n' +
        '// Rebuild with: npm run medieval:build\n\n' +
        `export const MEDIEVAL_SHELF = ${JSON.stringify(shelf, null, 4)}\n`
)

const pages = shelf.reduce((total, item) => total + item.pages, 0)
const bytes = shelf.reduce((total, item) => total + item.bytes, 0)
console.log(`\n[medieval] ${shelf.length} plays | ${pages} pages | ${(bytes / 1048576).toFixed(1)} MB`)
