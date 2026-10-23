/**
 * Typeset the Roman theatre shelf.
 *
 * Three sources, one output shape: a PDF per play in `public/library/roman/`,
 * plus the catalogue in `src/lib/romanLibraryData.js`.
 *
 * - Plautus: the Perseus Digital Library's TEI edition of Riley's translation,
 *   one XML file per play. The editor's footnotes are lifted out of the running
 *   text and printed as endnotes, because they sit mid-sentence in the original
 *   and would otherwise break every speech they touch.
 * - Terence and Seneca: Project Gutenberg volumes holding several plays each,
 *   cut apart by their headings.
 *
 * The build refuses to write a PDF it cannot verify: a title that matches
 * nothing, a play that comes out under 1,500 words, or a slice that runs into a
 * sibling play all stop it.
 *
 * Usage: node scripts/build-roman-pdfs.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { PDFDocument } from 'pdf-lib'
import { ACCENTS, buildPlayPdf, clean } from './lib/play-pdf.mjs'
import { PLAUTUS_PLAYS, TERENCE_PLAYS, SENECA_PLAYS } from '../src/lib/romanLibrary.js'

const ROOT = process.cwd()
const SOURCE = path.join(ROOT, 'library', 'drama', 'source-roman')
const TEI_DIR = path.join(SOURCE, 'plautus')
const OUT_DIR = path.join(ROOT, 'public', 'library', 'roman')
const OUT_JSON = path.join(ROOT, 'library', 'roman', 'shelf.generated.json')
const OUT_JS = path.join(ROOT, 'src', 'lib', 'romanLibraryData.js')

/* ── Plautus: TEI → plain text ────────────────────────────────────────────── */


/**
 * Riley quotes Greek, and Times cannot print it. Transliterate rather than drop
 * the quotation: the sentence has to survive, and a transliterated word is still
 * a word. Accents and breathings are folded away with the letters.
 */
const GREEK = {
    'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'e', 'θ': 'th',
    'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': 'x', 'ο': 'o', 'π': 'p',
    'ρ': 'r', 'σ': 's', 'ς': 's', 'τ': 't', 'υ': 'u', 'φ': 'ph', 'χ': 'ch', 'ψ': 'ps', 'ω': 'o',
}
const GREEK_BLOCKS = [
    [0x1f00, 0x1f0f, 'a'], [0x1f10, 0x1f1f, 'e'], [0x1f20, 0x1f2f, 'e'],
    [0x1f30, 0x1f3f, 'i'], [0x1f40, 0x1f4f, 'o'], [0x1f50, 0x1f5f, 'u'],
    [0x1f60, 0x1f6f, 'o'], [0x1f70, 0x1f71, 'a'], [0x1f72, 0x1f73, 'e'],
    [0x1f74, 0x1f75, 'e'], [0x1f76, 0x1f77, 'i'], [0x1f78, 0x1f79, 'o'],
    [0x1f7a, 0x1f7b, 'u'], [0x1f7c, 0x1f7d, 'o'], [0x1f80, 0x1f8f, 'a'],
    [0x1f90, 0x1f9f, 'e'], [0x1fa0, 0x1faf, 'o'], [0x1fb0, 0x1fbf, 'a'],
    [0x1fc0, 0x1fcf, 'r'], [0x1fd0, 0x1fdf, 'u'], [0x1fe0, 0x1fef, 'e'],
    [0x1f70, 0x1f71, 'a'], [0x1ff0, 0x1fff, 'o'],
]

function foldGreek(text) {
    return text
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[\u0370-\u03ff\u1f00-\u1fff]/g, (char) => {
            const lower = char.toLowerCase()
            const mapped = GREEK[lower]
            if (mapped) return char === lower ? mapped : mapped.charAt(0).toUpperCase() + mapped.slice(1)
            const code = char.codePointAt(0)
            for (const [from, to, letter] of GREEK_BLOCKS) {
                if (code >= from && code <= to) return letter
            }
            return ''
        })
}

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }

function decodeEntities(text) {
    return text
        .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
        .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
        .replace(/&([a-z]+);/gi, (match, name) => ENTITIES[name.toLowerCase()] ?? match)
}

/** Tidy the whitespace a tag-strip leaves behind. */
function tidy(text) {
    return text
        .replace(/\r/g, '')
        .replace(/[ \t]+/g, ' ')
        .replace(/ ?\n ?/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim()
}

function stripTags(fragment) {
    return tidy(decodeEntities(fragment.replace(/<[^>]+>/g, ' ')))
}

/**
 * Turn one Perseus TEI file into the text of one play.
 *
 * Riley puts his explanatory notes in the middle of the sentence they explain,
 * so they are numbered, lifted out, and printed after the play instead.
 */
function teiToText(xml) {
    const bodyStart = xml.indexOf('<body')
    const bodyEnd = xml.lastIndexOf('</body>')
    if (bodyStart === -1 || bodyEnd === -1) throw new Error('TEI file has no <body>')

    let text = xml.slice(bodyStart, bodyEnd)
    const notes = []

    text = text.replace(/<note\b[^>]*>([\s\S]*?)<\/note>/g, (_, inner) => {
        notes.push(stripTags(inner))
        return ` [${notes.length}] `
    })

    text = text
        .replace(/<milestone[^>]*\/>/g, ' ')
        .replace(/<head>([\s\S]*?)<\/head>/g, (_, inner) => `\n\n${stripTags(inner).toUpperCase()}\n\n`)
        .replace(/<speaker>([\s\S]*?)<\/speaker>/g, (_, inner) => `\n\n${stripTags(inner)} `)
        .replace(/<stage>([\s\S]*?)<\/stage>/g, (_, inner) => ` (${stripTags(inner)}) `)
        .replace(/<p\b[^>]*>/g, '\n\n')
        .replace(/<l\b[^>]*>/g, ' ')
        .replace(/<[^>]+>/g, '')

    // Perseus's transcription carries a stray &lt; or two; angle brackets have no place in a play.
    const body = foldGreek(tidy(decodeEntities(text)).replace(/[<>]/g, ''))
    if (!notes.length) return { body, noteCount: 0 }

    const endnotes = notes.map((note, index) => `[${index + 1}] ${foldGreek(note)}`).join('\n\n')
    return { body: `${body}\n\n\nNOTES\n\n${endnotes}`, noteCount: notes.length }
}

/* ── Gutenberg volumes → individual plays ─────────────────────────────────── */

const START = /^\*\*\*\s*START OF (THE|THIS) PROJECT GUTENBERG/i
const END = /^\*\*\*\s*END OF (THE|THIS) PROJECT GUTENBERG/i

function splitGutenberg(id) {
    const raw = clean(foldGreek(fs.readFileSync(path.join(SOURCE, `${id}.txt`), 'utf8')))
    const lines = raw.split('\n')
    const start = lines.findIndex((line) => START.test(line))
    const end = lines.findIndex((line) => END.test(line))
    if (start === -1 || end === -1 || end < start) {
        throw new Error(`source ${id}: Gutenberg start/end markers not found`)
    }
    const body = lines.slice(start + 1, end)
    return {
        header: lines.slice(0, start + 1),
        body,
        masked: withoutFootnotes(body),
        footer: lines.slice(end),
    }
}

function normaliseHeading(line) {
    return clean(line).toUpperCase().replace(/[^A-Z ]+/g, ' ').replace(/\s+/g, ' ').trim()
}

/**
 * Where a play begins in a multi-play volume.
 *
 * Both volumes print the title and then, within a few lines, the cast list. A
 * speaker's name in the dialogue looks identical to a title, which is why the
 * cast list is what confirms a heading. Where a volume repeats the title page
 * twice in a row, the later one is where the play actually starts.
 */
function headingPositions(body, heading) {
    const wanted = normaliseHeading(heading)
    const confirmed = []
    body.forEach((line, index) => {
        if (normaliseHeading(line) !== wanted) return
        const cast = body.slice(index + 1, index + 10).some((next) => /^DRAMATIS PERSON/i.test(next.trim()))
        if (cast) confirmed.push(index)
    })
    return confirmed
}

/**
 * Both Gutenberg volumes end each act with a FOOTNOTES block. They are moved out
 * of the running text and printed after the play: read between two speeches they
 * interrupt something the reader is in the middle of.
 *
 * A note runs from its opening bracket to its closing one, which keeps Terence's
 * multi-line notes intact while Seneca's one-liners stay one line each.
 */
const NOTE_ITEM = /^\s*\[(?:Footnote\s+)?\d+[:.\]]/

function footnoteRanges(lines) {
    const ranges = []

    for (let index = 0; index < lines.length; index += 1) {
        if (!/^FOOTNOTES:?$/.test(lines[index].trim())) continue

        let cursor = index + 1
        let items = 0

        while (cursor < lines.length) {
            if (lines[cursor].trim() === '') {
                cursor += 1
                continue
            }
            if (!NOTE_ITEM.test(lines[cursor])) break

            items += 1
            if (/^\s*\[Footnote\s+\d+:/.test(lines[cursor])) {
                let guard = 0
                while (!lines[cursor].trim().endsWith(']') && cursor + 1 < lines.length && guard < 60) {
                    cursor += 1
                    guard += 1
                }
            }
            cursor += 1
        }

        if (items) ranges.push([index, cursor])
        index = cursor - 1
    }

    return ranges
}

const rangeCache = new WeakMap()

function noteRanges(lines) {
    if (!rangeCache.has(lines)) rangeCache.set(lines, footnoteRanges(lines))
    return rangeCache.get(lines)
}

function extractNotes(lines) {
    const ranges = noteRanges(lines)
    if (!ranges.length) return { lines, notes: [] }

    const dropped = new Set()
    const notes = []
    for (const [from, to] of ranges) {
        const gathered = lines.slice(from + 1, to).map((line) => line.trim()).filter(Boolean)
        if (!gathered.length) continue
        const cleanedItems = gathered.map((item) => item.replace(/^\[Footnote (\d+):\s*/, '[$1] '))
        const joined = cleanedItems.join(' ')
            .replace(/\s+/g, ' ')
            .replace(/(\[\d+\] [^[]*?)\]\s*(?=\[\d+\]|$)/g, '$1 ')
            .trim()
        notes.push(joined)
        for (let index = from; index < to; index += 1) dropped.add(index)
    }

    return { lines: lines.map((line, index) => (dropped.has(index) ? '' : line)), notes }
}

/**
 * Gutenberg marks emphasis with underscores. Printers' italics are worth keeping
 * in a book, but a reader on a phone does not need the markup that stands in for
 * them, so it comes off here.
 */
function deitalicise(text) {
    return text
        .replace(/_([^_\n]{1,200}?)_/g, '$1')
        .replace(/_/g, '')
}

/** The same lines with the footnote blocks blanked, for finding play boundaries. */
function withoutFootnotes(lines) {
    const dropped = new Set()
    for (const [from, to] of noteRanges(lines)) {
        for (let index = from; index < to; index += 1) dropped.add(index)
    }
    return lines.map((line, index) => (dropped.has(index) ? '' : line))
}

/** A heading that belongs to the editorial apparatus, not to a play. */
const APPARATUS = /^(NOTES|NOTES ON|NOTES TO|ADDITIONAL NOTES|TRANSLATOR.S NOTE|COMPARATIVE ANALYSES|MYTHOLOGICAL INDEX|INDEX TO)\b/i

const VOLUMES = {
    57999: {
        label: 'Seneca',
        titles: [
            'OEDIPUS', 'PHOENISSAE, OR THEBAÏS', 'MEDEA', 'HERCULES FURENS', 'HIPPOLYTUS OR PHAEDRA',
            'HERCULES OETAEUS', 'THYESTES', 'TROADES', 'AGAMEMNON', 'OCTAVIA',
        ],
    },
    22188: {
        label: 'Terence',
        titles: [
            'ANDRIA', 'EUNUCHUS THE EUNUCH', 'HEAUTONTIMORUMENOS',
            'ADELPHI THE BROTHERS', 'HECYRA THE MOTHER IN LAW', 'PHORMIO OR THE SCHEMING PARASITE',
        ],
    },
}


/**
 * Where each play lives. `tei` is a Perseus file (one play each); `volume` plus
 * `heading` is a Gutenberg volume and the title that volume prints for the play.
 */
const SOURCES = {
    'amphitryon-plautus': { tei: 'phi0119.phi001.perseus-eng2' },
    'asinaria-plautus': { tei: 'phi0119.phi002.perseus-eng2' },
    'aulularia-plautus': { tei: 'phi0119.phi003.perseus-eng2' },
    'bacchides-plautus': { tei: 'phi0119.phi004.perseus-eng2' },
    'captivi-plautus': { tei: 'phi0119.phi005.perseus-eng2' },
    'casina-plautus': { tei: 'phi0119.phi006.perseus-eng2' },
    'cistellaria-plautus': { tei: 'phi0119.phi007.perseus-eng2' },
    'curculio-plautus': { tei: 'phi0119.phi008.perseus-eng2' },
    'epidicus-plautus': { tei: 'phi0119.phi009.perseus-eng2' },
    'menaechmi-plautus': { tei: 'phi0119.phi010.perseus-eng2' },
    'mercator-plautus': { tei: 'phi0119.phi011.perseus-eng2' },
    'miles-gloriosus-plautus': { tei: 'phi0119.phi012.perseus-eng2' },
    'mostellaria-plautus': { tei: 'phi0119.phi013.perseus-eng2' },
    'persa-plautus': { tei: 'phi0119.phi014.perseus-eng2' },
    'poenulus-plautus': { tei: 'phi0119.phi015.perseus-eng2' },
    'pseudolus-plautus': { tei: 'phi0119.phi016.perseus-eng2' },
    'rudens-plautus': { tei: 'phi0119.phi017.perseus-eng2' },
    'stichus-plautus': { tei: 'phi0119.phi018.perseus-eng2' },
    'trinummus-plautus': { tei: 'phi0119.phi019.perseus-eng2' },
    'truculentus-plautus': { tei: 'phi0119.phi020.perseus-eng2' },
    // Terence, The Comedies (Riley), Gutenberg 22188
    'andria-terence': { volume: 22188, heading: 'ANDRIA' },
    'hecyra-terence': { volume: 22188, heading: 'HECYRA THE MOTHER IN LAW' },
    'heautontimorumenos-terence': { volume: 22188, heading: 'HEAUTONTIMORUMENOS' },
    'eunuchus-terence': { volume: 22188, heading: 'EUNUCHUS THE EUNUCH' },
    'phormio-terence': { volume: 22188, heading: 'PHORMIO OR THE SCHEMING PARASITE' },
    'adelphi-terence': { volume: 22188, heading: 'ADELPHI THE BROTHERS' },
    // Seneca, The Tragedies (Miller), Gutenberg 57999
    'hercules-furens-seneca': { volume: 57999, heading: 'HERCULES FURENS' },
    'troades-seneca': { volume: 57999, heading: 'TROADES' },
    'phoenissae-seneca': { volume: 57999, heading: 'PHOENISSAE, OR THEBAÏS' },
    'medea-seneca': { volume: 57999, heading: 'MEDEA' },
    'phaedra-seneca': { volume: 57999, heading: 'HIPPOLYTUS OR PHAEDRA' },
    'oedipus-seneca': { volume: 57999, heading: 'OEDIPUS' },
    'agamemnon-seneca': { volume: 57999, heading: 'AGAMEMNON' },
    'thyestes-seneca': { volume: 57999, heading: 'THYESTES' },
    'hercules-oetaeus-seneca': { volume: 57999, heading: 'HERCULES OETAEUS' },
    'octavia-seneca': { volume: 57999, heading: 'OCTAVIA' },
}

const volumeCache = new Map()
function volume(id) {
    if (!volumeCache.has(id)) volumeCache.set(id, splitGutenberg(String(id)))
    return volumeCache.get(id)
}

function sliceFromVolume(play, spec_) {
    const source = volume(spec_.volume)
    const spec = VOLUMES[spec_.volume]
    const own = headingPositions(source.masked, spec_.heading)
    if (own.length === 0) {
        throw new Error(`${play.slug}: heading "${spec_.heading}" not found in volume ${spec_.volume}`)
    }
    const startIndex = own[own.length - 1]

    const siblings = spec.titles
        .filter((title) => normaliseHeading(title) !== normaliseHeading(spec_.heading))
        .flatMap((title) => headingPositions(source.masked, title))
        .filter((index) => index > startIndex + 20)

    let endIndex = siblings.length ? Math.min(...siblings) : source.body.length
    for (let i = startIndex + 1; i < endIndex; i += 1) {
        if (APPARATUS.test(source.masked[i].trim())) { endIndex = i; break }
    }

    const extracted = extractNotes(source.body.slice(startIndex, endIndex))

    if (process.env.ROMAN_DEBUG) console.error('cut', play.slug.padEnd(28), startIndex, endIndex, '|', source.body.slice(startIndex, endIndex).filter(Boolean).slice(-2).join(' / ').slice(0, 90))
    return { text: extracted.lines.join('\n'), notes: extracted.notes, source }
}

/* ── Build ────────────────────────────────────────────────────────────────── */

const PLAYS = [...PLAUTUS_PLAYS, ...TERENCE_PLAYS, ...SENECA_PLAYS]

fs.mkdirSync(OUT_DIR, { recursive: true })
fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true })
const shelf = []

for (const play of PLAYS) {
    let bodyText
    let headerText = ''
    let footerText = ''
    let sourceLabel
    let noteCount = 0

    const spec = SOURCES[play.slug]
    if (!spec) throw new Error(`${play.slug}: no source configured`)

    if (spec.tei) {
        const file = path.join(TEI_DIR, `${spec.tei}.xml`)
        const { body, noteCount: notes } = teiToText(fs.readFileSync(file, 'utf8'))
        bodyText = body
        noteCount = notes
        headerText =
            `Text: ${play.author}, ${play.sourceEdition}.\n` +
            `Digital edition: Perseus Digital Library (TEI, CC BY-SA 4.0). The translation is public domain.\n` +
            (notes ? `Riley's notes are collected at the end of this text.\n` : '')
        sourceLabel = `Perseus Digital Library, ${spec.tei}`
    } else {
        const sliced = sliceFromVolume(play, spec)
        bodyText = foldGreek(deitalicise(sliced.text))
        if (sliced.notes.length) {
            bodyText += `\n\n\nNOTES\n\n${sliced.notes.map((note) => foldGreek(deitalicise(note))).join('\n\n')}`
        }
        noteCount = sliced.notes.length
        headerText = sliced.source.header.join('\n') + (noteCount ? `\nThe translator's notes are collected at the end of this text.\n` : '')
        footerText = sliced.source.footer.join('\n')
        sourceLabel = `Project Gutenberg eBook #${spec.volume}`
    }

    const words = bodyText.split(/\s+/).filter(Boolean).length
    if (words < 1500) throw new Error(`${play.slug}: only ${words} words extracted - the cut is wrong`)

    const bytes = await buildPlayPdf(play, {
        shelfLabel: 'ROMAN THEATRE',
        accent: ACCENTS.roman,
        meta: [
            ['Playwright', play.author],
            ['Translated by', play.translator],
            ['Source text', sourceLabel],
            ['Edition', play.sourceEdition],
            ['Language', 'English'],
            ['Rights', 'Public domain'],
        ],
        coverNote: [
            'This PDF was typeset by ZikShare from the edition named above.',
            'The play is in the public domain and ZikShare charges nothing for it.',
            '',
            ...(spec.tei
                ? ["The digital text is Perseus's TEI encoding of Riley, published under CC BY-SA 4.0;",
                   'the translation underneath it is public domain and is reproduced here unaltered.']
                : ["Project Gutenberg's header and licence, and its closing notice, are reproduced unchanged",
                   'after this page, because their terms travel with the text.']),
            '',
            play.context || '',
        ].filter(Boolean),
        headerText,
        bodyText,
        footerText,
    })

    const file = path.join(OUT_DIR, `${play.slug}.pdf`)
    fs.writeFileSync(file, bytes)

    const pdf = await PDFDocument.load(bytes)
    shelf.push({
        slug: play.slug,
        title: play.title,
        author: play.author,
        latinTitle: play.latinTitle,
        translator: play.translator,
        kind: play.kind,
        dateLabel: play.dateLabel || null,
        sourceId: spec.tei || String(spec.volume),
        sourceName: play.sourceName,
        download_path: `/library/roman/${play.slug}.pdf`,
        pages: pdf.getPageCount(),
        words,
        notes: noteCount,
        bytes: bytes.length,
        sha256: crypto.createHash('sha256').update(bytes).digest('hex'),
    })
    console.log(
        `${play.author.padEnd(9)} ${play.title.padEnd(28)} ${String(pdf.getPageCount()).padStart(4)}p ${(bytes.length / 1024).toFixed(0)}kB ${words}w`
    )
}

fs.writeFileSync(OUT_JSON, JSON.stringify({ generatedAt: new Date().toISOString(), count: shelf.length, shelf }, null, 2))
fs.writeFileSync(
    OUT_JS,
    '// AUTO-GENERATED by scripts/build-roman-pdfs.mjs - do not edit by hand.\n' +
    '// Plautus: Perseus TEI of Riley. Terence and Seneca: Project Gutenberg.\n' +
    '// Rebuild with: npm run roman:build\n\n' +
    `export const ROMAN_SHELF = ${JSON.stringify(shelf, null, 4)}\n`
)

const pages = shelf.reduce((total, item) => total + item.pages, 0)
const bytes = shelf.reduce((total, item) => total + item.bytes, 0)
console.log(`\n[roman] ${shelf.length} plays | ${pages} pages | ${(bytes / 1048576).toFixed(1)} MB`)
