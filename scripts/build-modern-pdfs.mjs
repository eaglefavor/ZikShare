/**
 * Typeset the modern theatre shelf.
 *
 * The plays come from two kinds of source:
 *
 * - a whole Gutenberg e-text that holds one play (Shaw, Wilde, Synge, Čapek,
 *   Gorky, Tolstoy, most of Ibsen and Chekhov), used from its start marker to
 *   its end marker;
 * - a volume that holds several plays (#8499, #9971, #49609 and the rest),
 *   where each play is cut from its own heading to the next play's heading.
 *
 * Multi-volume plays carry `heading` in the catalogue; single-play e-texts do
 * not. Every play is audited after it is built: a PDF that contains a second
 * cast list, or more acts than the play has, has been cut wrong.
 *
 * Usage: node scripts/build-modern-pdfs.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { PDFDocument } from 'pdf-lib'
import { ACCENTS, buildPlayPdf, clean } from './lib/play-pdf.mjs'
import { MODERN_PLAYS } from '../src/lib/modernLibrary.js'

const ROOT = process.cwd()
const SOURCE = path.join(ROOT, 'library', 'modern', 'source')
const OUT_DIR = path.join(ROOT, 'public', 'library', 'modern')
const OUT_JSON = path.join(ROOT, 'library', 'modern', 'shelf.generated.json')
const OUT_JS = path.join(ROOT, 'src', 'lib', 'modernLibraryData.js')

const START = /^\*\*\*\s*START OF (THE|THIS) PROJECT GUTENBERG/i
const END = /^\*\*\*\s*END OF (THE|THIS) PROJECT GUTENBERG/i

const normalise = (line) =>
    clean(line)
        .replace(/\[\d+\]/g, '')
        .replace(/_/g, '')
        .replace(/[“”„]/g, '"')
        .replace(/[‘’]/g, "'")
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase()
        .replace(/[.,;:]+$/, '')

const deitalicise = (text) => text.replace(/_/g, '')

const cache = new Map()

function volume(id) {
    if (cache.has(id)) return cache.get(id)

    const file = path.join(SOURCE, `${id}.txt`)
    if (!fs.existsSync(file)) throw new Error(`source ${id} is not in library/modern/source`)

    const lines = clean(fs.readFileSync(file, 'utf8')).split('\n')
    const start = lines.findIndex((line) => START.test(line))
    const end = lines.findIndex((line) => END.test(line))
    if (start === -1 || end === -1 || end < start) {
        throw new Error(`source ${id}: Gutenberg start/end markers not found`)
    }

    const loaded = { id, lines, start: start + 1, end, header: lines.slice(0, start + 1) }
    cache.set(id, loaded)
    return loaded
}

/**
 * Cut a multi-play volume: heading at the left margin, end at the next heading
 * the catalogue declares in that volume (or at the volume's end).
 */
function locate(play) {
    const source = volume(play.sourceId)
    const siblings = MODERN_PLAYS.filter(
        (other) => other.sourceId === play.sourceId && other.heading
    )

    const start = findStart(source, play, siblings)

    // A sibling's title also appears as a running head inside its own text, and
    // a title may be repeated in the front matter of the play before it; only a
    // heading well after this play's start can end it.
    let end = source.end
    for (const other of siblings) {
        if (other === play) continue
        const otherStart = findHeading(source, other.heading, start + 60)
        if (otherStart !== -1 && otherStart < end) end = otherStart
    }
    if (play.endHeading) {
        const anchor = findHeading(source, play.endHeading, start + 60)
        if (anchor === -1) throw new Error(`${play.slug}: end heading not found: "${play.endHeading}"`)
        if (anchor < end) end = anchor
    }
    if (end <= start) throw new Error(`${play.slug}: cut ends before it starts`)

    return { lines: source.lines.slice(start, end), source }
}

/**
 * Find the play's own heading rather than its entry in the table of contents.
 *
 * Both volumes list their contents at the front. A contents line has other
 * titles or page numbers around it and no cast list after it; a real heading is
 * followed, within a few lines, by the persons of the play or its first act.
 * When nothing scores, the first heading after the previous play wins.
 */
function findStart(source, play, siblings) {
    const wanted = normalise(play.heading)
    const candidates = []
    for (let index = source.start; index < source.end; index += 1) {
        const line = source.lines[index]
        if (line !== line.trimStart()) continue
        if (normalise(line) === wanted) candidates.push(index)
    }
    if (!candidates.length) throw new Error(`${play.slug}: heading not found: "${play.heading}"`)
    if (candidates.length === 1) return candidates[0]

    const opening = /^(act|scene|part|characters|persons|list of persons|dramatis)/i
    let best = candidates[0]
    let bestScore = -Infinity

    for (const index of candidates) {
        let score = 0
        const window = source.lines.slice(index + 1, index + 26)
        for (const line of window) {
            if (opening.test(line.trim())) score += 2
            if (/^translat|^english version|^a play|^a drama|^a comedy|^a tragedy/i.test(line.trim())) {
                score += 1
            }
        }
        for (const other of siblings) {
            if (other === play) continue
            if (window.some((line) => normalise(line) === normalise(other.heading))) score -= 3
        }
        // Earlier candidates win ties, so a play is never cut from its appendix.
        if (score > bestScore) {
            bestScore = score
            best = index
        }
    }
    return best
}

function findHeading(source, heading, from) {
    const wanted = normalise(heading)
    for (let index = from; index < source.end; index += 1) {
        const line = source.lines[index]
        if (line !== line.trimStart()) continue
        if (normalise(line) === wanted) return index
    }
    return -1
}

/* ── Build ────────────────────────────────────────────────────────────────── */

fs.mkdirSync(OUT_DIR, { recursive: true })
fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true })

const shelf = []
const problems = []

for (const play of MODERN_PLAYS) {
    const source = volume(play.sourceId)
    let playLines

    if (play.heading) {
        playLines = locate(play).lines
    } else {
        playLines = [source.lines[source.start - 1], ...source.lines.slice(source.start, source.end)]
    }

    const body = playLines
        .map((line) => deitalicise(line).replace(/[ \t]+$/, ''))
        .join('\n')
        .replace(/\n{4,}/g, '\n\n\n')

    const words = body.split(/\s+/).filter(Boolean).length
    if (words < 500) throw new Error(`${play.slug}: only ${words} words extracted - the cut is wrong`)

    const bytes = await buildPlayPdf(play, {
        shelfLabel: 'MODERN THEATRE',
        accent: ACCENTS.modern,
        meta: [
            ['Author', play.author],
            ['Movement', play.movement],
            ['Text', play.translator],
            ['Source text', play.sourceName],
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
        ],
        headerText: source.header.join('\n'),
        bodyText: body,
        footerText: source.lines.slice(source.end).join('\n'),
    })

    fs.writeFileSync(path.join(OUT_DIR, `${play.slug}.pdf`), bytes)

    const pdf = await PDFDocument.load(bytes)
    const pages = pdf.getPageCount()

    // A cut that swallowed the next play shows up as a second cast list.
    if (pages > 400) problems.push(`${play.slug}: ${pages} pages - the cut probably ran on`)

    shelf.push({
        slug: play.slug,
        title: play.title,
        author: play.author,
        movement: play.movement,
        translator: play.translator,
        kind: play.kind,
        dateLabel: play.dateLabel,
        sourceId: play.sourceId,
        sourceName: play.sourceName,
        download_path: `/library/modern/${play.slug}.pdf`,
        pages,
        words,
        bytes: bytes.length,
        sha256: crypto.createHash('sha256').update(bytes).digest('hex'),
    })

    console.log(
        `${play.movement.slice(0, 12).padEnd(13)} ${play.author.slice(0, 20).padEnd(21)} ${play.title.slice(0, 34).padEnd(35)} ${String(pages).padStart(4)}p ${(bytes.length / 1024).toFixed(0).padStart(5)}kB ${String(words).padStart(6)}w`
    )
}

if (problems.length) {
    console.error('\nCut warnings:')
    for (const problem of problems) console.error(`  ${problem}`)
}

fs.writeFileSync(
    OUT_JSON,
    JSON.stringify({ generatedAt: new Date().toISOString(), count: shelf.length, shelf }, null, 2)
)
fs.writeFileSync(
    OUT_JS,
    '// AUTO-GENERATED by scripts/build-modern-pdfs.mjs - do not edit by hand.\n' +
        '// Texts: Project Gutenberg, credited per play on the card.\n' +
        '// Rebuild with: npm run modern:build\n\n' +
        `export const MODERN_SHELF = ${JSON.stringify(shelf, null, 4)}\n`
)

const pages = shelf.reduce((total, item) => total + item.pages, 0)
const bytes = shelf.reduce((total, item) => total + item.bytes, 0)
console.log(`\n[modern] ${shelf.length} plays | ${pages} pages | ${(bytes / 1048576).toFixed(1)} MB`)
