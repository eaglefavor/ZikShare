/**
 * Typeset the Renaissance theatre shelf.
 *
 * Three public-domain editions hold the whole shelf:
 *
 * - #100, *The Complete Works of William Shakespeare* (Globe edition): all
 *   thirty-eight plays, each cut from its own title to the next one.
 * - #77587, *The Chief Elizabethan Dramatists, excluding Shakespeare*, ed.
 *   W. A. Neilson (1911): thirty plays by seventeen playwrights. The volume
 *   numbers its verse lines every fifth or every line and keeps one numbered
 *   glossary at the back; the line numbers are stripped and the glosses that a
 *   play actually uses are printed at the end of that play.
 * - #1589, Dyce's Marlowe: Tamburlaine Part Two, so the sequel sits beside the
 *   first part.
 *
 * Usage: node scripts/build-renaissance-pdfs.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { PDFDocument } from 'pdf-lib'
import { ACCENTS, buildPlayPdf, clean } from './lib/play-pdf.mjs'
import { RENAISSANCE_PLAYS } from '../src/lib/renaissanceLibrary.js'

const ROOT = process.cwd()
const SOURCE = path.join(ROOT, 'library', 'renaissance', 'source')
const OUT_DIR = path.join(ROOT, 'public', 'library', 'renaissance')
const OUT_JSON = path.join(ROOT, 'library', 'renaissance', 'shelf.generated.json')
const OUT_JS = path.join(ROOT, 'src', 'lib', 'renaissanceLibraryData.js')

const START = /^\*\*\*\s*START OF (THE|THIS) PROJECT GUTENBERG/i
const END = /^\*\*\*\s*END OF (THE|THIS) PROJECT GUTENBERG/i

const SOURCES = {
    100: {
        label: 'Project Gutenberg eBook #100',
        // The poems follow the plays in #100; the last play stops at the first of them.
        endAnchor: "A LOVER'S COMPLAINT",
        notes: false,
        lineNumbers: false,
    },
    77587: {
        label: 'Project Gutenberg eBook #77587',
        endAnchor: 'ADDITIONAL NOTES ON THE PLAYS',
        notes: true,
        lineNumbers: true,
    },
    1589: {
        label: 'Project Gutenberg eBook #1589',
        // Dyce's textual appendix on the quartos follows the play; it is not the play.
        endAnchor: '[a] [From THE FIRST PART OF TAMBURLAINE THE GREAT]',
        notes: true,
        lineNumbers: false,
    },
}

/* ── Matching ─────────────────────────────────────────────────────────────── */

/**
 * One form for every comparison: the PDF font cannot print the edition's curly
 * quotes or polysyllabic ligatures anyway, so `clean` runs first and a heading
 * matches whichever convention the source prints.
 */
function normalise(line) {
    return clean(line)
        .replace(/\[\d+\]/g, '')
        .replace(/_/g, '')
        .replace(/\s+/g, ' ')
        .trim()
}

const deitalicise = (text) => text.replace(/_/g, '')

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
        lines,
        start: start + 1,
        end,
        notes: SOURCES[id].notes ? readNotes(lines, end, id) : new Map(),
    }
    cache.set(id, loaded)
    return loaded
}

/**
 * #77587 keeps one numbered glossary at the back, numbered straight through the
 * volume ("[1] Interpret the play as referring..."). #1589 numbers each note as
 * "[Footnote 4: Uribassa] In this scene...". Both become number -> gloss.
 */
function readNotes(lines, end, id) {
    const notes = new Map()

    if (id === 77587) {
        const start = lines.findIndex((line) => /^FOOTNOTES:?$/.test(line.trim()))
        if (start === -1) throw new Error('source 77587: footnote list not found')
        let current = null
        for (let index = start + 1; index < end; index += 1) {
            const line = lines[index]
            const match = /^\[(\d+)\]\s*(.*)$/.exec(line.trim())
            if (match) {
                current = Number(match[1])
                notes.set(current, deitalicise(match[2]).trim())
                continue
            }
            if (!line.trim()) continue
            if (current === null) continue
            notes.set(current, `${notes.get(current)} ${deitalicise(line.trim())}`.trim())
        }
        if (notes.size < 100) throw new Error(`source 77587: only ${notes.size} notes parsed`)
        return notes
    }

    const pattern = /^\[Footnote\s+([a-z]|\d+):\s*([^\]]*)\]\s*(.*)$/
    let current = null
    for (let index = 0; index < end; index += 1) {
        const line = lines[index]
        const match = pattern.exec(line.trim())
        if (match) {
            const key = /^\d+$/.test(match[1]) ? Number(match[1]) : match[1]
            current = key
            const head = deitalicise(match[2]).trim()
            notes.set(key, `${head}${head ? ' - ' : ''}${deitalicise(match[3]).trim()}`)
            continue
        }
        if (current === null || !line.trim()) continue
        if (/^\[Footnote/.test(line.trim())) continue
        notes.set(current, `${notes.get(current)} ${deitalicise(line.trim())}`.trim())
    }
    return notes
}

/* ── Cut every play out of its volume ─────────────────────────────────────── */

/**
 * A play's heading is matched only at the left margin: both volumes print their
 * table of contents indented, so this is what keeps a contents entry from being
 * mistaken for the play. Headings that repeat (the two parts of *The Honest
 * Whore* share one) are handed out in source order.
 */
function locate(id) {
    const source = volume(id)
    const plays = RENAISSANCE_PLAYS.filter((play) => play.source === id)
    const byHeading = new Map()

    for (const play of plays) {
        const key = normalise(play.heading)
        if (!byHeading.has(key)) byHeading.set(key, [])
        byHeading.get(key).push(play)
    }

    const used = new Map()
    const found = new Map()

    const limit = SOURCES[id].endAnchor
        ? headingIndex(source.lines, SOURCES[id].endAnchor, source.start, source.end)
        : source.end

    for (let index = source.start; index < limit; index += 1) {
        const line = source.lines[index]
        if (line !== line.trimStart()) continue
        const key = normalise(line)
        const candidates = byHeading.get(key)
        if (!candidates) continue
        const taken = used.get(key) || 0
        if (taken >= candidates.length) continue
        found.set(candidates[taken], index)
        used.set(key, taken + 1)
    }

    for (const play of plays) {
        if (!found.has(play)) throw new Error(`${play.slug}: heading not found in ${id}: "${play.heading}"`)
    }

    const starts = [...found.values()].sort((a, b) => a - b)
    for (const play of plays) {
        const start = found.get(play)
        const next = starts.find((value) => value > start)
        found.set(play, { start, end: next ?? limit })
    }

    return found
}

function headingIndex(lines, text, from = 0, to = lines.length) {
    const wanted = normalise(text)
    for (let index = from; index < to; index += 1) {
        const line = lines[index]
        // At the left margin: both volumes indent their tables of contents.
        if (line !== line.trimStart()) continue
        if (normalise(line) === wanted) return index
    }
    throw new Error(`heading not found: "${text}"`)
}

/** Some editions print the cast list above the play's title. */
function castListStart(lines, start, anchor) {
    const wanted = normalise(anchor)
    for (let index = start - 1; index >= Math.max(0, start - 140); index -= 1) {
        if (lines[index] !== lines[index].trimStart()) continue
        if (normalise(lines[index]) === wanted) return index
    }
    return start
}

/** The Globe volume prints each play's scene list before its cast. */
function skipSceneList(lines, start, end) {
    for (let index = start; index < end; index += 1) {
        if (normalise(lines[index]) === 'Dramatis Personae') return index
    }
    return start
}

/**
 * Page numbers, verse line numbers and the edition's italic marks. The line
 * numbers are the only delicate part: both the every-fifth and the every-line
 * numbering print at the end of the verse line, so a trailing number is a line
 * number, while a number set inside a stage direction ("1 Lord", "4 Avocatori")
 * is part of the text and stays.
 */
function tidy(lines, { lineNumbers }) {
    return lines.map((raw) => {
        let line = deitalicise(raw)

        // Verse and page numbers, right-aligned in the printed page.
        if (lineNumbers) line = line.replace(/\s+\d{1,4}\s*$/, '')
        // The few line numbers that reflow onto the middle of a line.
        if (lineNumbers) {
            line = line.replace(/ ([0-9]{1,3}) (?=[A-Za-z])/g, (match, digits) => {
                const value = Number(digits)
                return value % 5 === 0 && value <= 400 ? ' ' : match
            })
        }
        // Parenthesised line numbers: "(370) Tellus her friend".
        line = line.replace(/\s*\(\d{1,4}\)/g, '')

        return line.replace(/[ \t]+$/, '')
    })
}

/* ── Build ────────────────────────────────────────────────────────────────── */

fs.mkdirSync(OUT_DIR, { recursive: true })
fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true })

const located = new Map()
for (const id of Object.keys(SOURCES)) {
    try {
        located.set(Number(id), locate(Number(id)))
    } catch (error) {
        console.error(error.message)
        throw error
    }
}

const shelf = []

for (const play of RENAISSANCE_PLAYS) {
    const id = play.source
    const source = volume(id)
    const range = located.get(id).get(play)

    let start = range.start
    if (play.startAnchor) start = castListStart(source.lines, start, play.startAnchor)
    if (id === 100) start = skipSceneList(source.lines, start, range.end)

    const raw = source.lines.slice(start, range.end)
    const lines = tidy(raw, SOURCES[id])
    const body = lines.join('\n')

    // The glosses this play actually cites, in order. A marker with no note is
    // dropped rather than left pointing at nothing.
    const usedNotes = [...body.matchAll(/\[(\d+|[a-z])\]/g)].map((match) =>
        /^\d+$/.test(match[1]) ? Number(match[1]) : match[1]
    )
    const notes = [...new Set(usedNotes)]
        .filter((key) => source.notes.has(key))
        .sort((a, b) => (typeof a === 'number' && typeof b === 'number' ? a - b : String(a).localeCompare(String(b))))

    // With a note list printed, the markers stay in the text so every gloss can
    // be found where it is cited. Without one, a marker points at nothing.
    const playText = source.notes.size ? body : body.replace(/\s?\[(\d+|[a-z])\]/g, '')

    const notesBlock = notes.length
        ? `\n\n\nNOTES ON THIS TEXT\n\n${notes
              .map((key) => `[${key}] ${source.notes.get(key)}`)
              .join('\n\n')}`
        : ''

    const words = `${playText}${notesBlock}`.split(/\s+/).filter(Boolean).length
    if (words < 600) throw new Error(`${play.slug}: only ${words} words extracted - the cut is wrong`)

    const headerText =
        source.header.join('\n') +
        (notes.length
            ? "\nThe edition's notes on this play's wording are gathered at the end of the text.\n"
            : '')

    const bytes = await buildPlayPdf(play, {
        shelfLabel: 'RENAISSANCE THEATRE',
        accent: ACCENTS.renaissance,
        meta: [
            ['Author', play.author],
            ['Group', play.group],
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
        footerText: source.lines.slice(source.end).join('\n'),
    })

    fs.writeFileSync(path.join(OUT_DIR, `${play.slug}.pdf`), bytes)

    const pdf = await PDFDocument.load(bytes)
    shelf.push({
        slug: play.slug,
        title: play.title,
        author: play.author,
        group: play.group,
        translator: play.translator,
        kind: play.kind,
        dateLabel: play.dateLabel,
        sourceId: id,
        sourceName: play.sourceName,
        download_path: `/library/renaissance/${play.slug}.pdf`,
        pages: pdf.getPageCount(),
        words,
        notes: notes.length,
        bytes: bytes.length,
        sha256: crypto.createHash('sha256').update(bytes).digest('hex'),
    })

    console.log(
        `${play.author.slice(0, 22).padEnd(23)} ${play.title.slice(0, 34).padEnd(35)} ${String(pdf.getPageCount()).padStart(4)}p ${(bytes.length / 1024).toFixed(0).padStart(5)}kB ${String(words).padStart(6)}w ${String(notes.length).padStart(3)}n`
    )
}

fs.writeFileSync(
    OUT_JSON,
    JSON.stringify({ generatedAt: new Date().toISOString(), count: shelf.length, shelf }, null, 2)
)
fs.writeFileSync(
    OUT_JS,
    '// AUTO-GENERATED by scripts/build-renaissance-pdfs.mjs - do not edit by hand.\n' +
        '// Shakespeare: Project Gutenberg #100. Elizabethan dramatists: #77587.\n' +
        '// Tamburlaine Part Two: #1589. Rebuild with: npm run renaissance:build\n\n' +
        `export const RENAISSANCE_SHELF = ${JSON.stringify(shelf, null, 4)}\n`
)

const pages = shelf.reduce((total, item) => total + item.pages, 0)
const bytes = shelf.reduce((total, item) => total + item.bytes, 0)
console.log(
    `\n[renaissance] ${shelf.length} plays | ${pages} pages | ${(bytes / 1048576).toFixed(1)} MB`
)
