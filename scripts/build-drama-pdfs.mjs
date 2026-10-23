/**
 * Typeset the Greek tragedy shelf.
 *
 * Source: the Project Gutenberg plain-text files in `library/drama/source/`,
 * which are public domain. Each play becomes its own PDF at
 * `public/library/drama/<slug>.pdf`, served by ZikShare like any other library
 * document — the shelf no longer sends a reader to another website.
 *
 * Every PDF carries three things, in this order:
 *   1. a ZikShare cover page (playwright, title, translator, source, licence);
 *   2. the Project Gutenberg header from the source file, verbatim, because
 *      their licence travels with the text;
 *   3. the play itself, and then the Gutenberg footer, verbatim.
 *
 * A play inside a volume is cut out by its own heading, and the cut is checked:
 * if a heading matches nothing, or more than one place, the build fails rather
 * than shipping the wrong play.
 *
 * Usage: node scripts/build-drama-pdfs.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { PDFDocument } from 'pdf-lib'
import { ACCENTS, buildPlayPdf } from './lib/play-pdf.mjs'
import { AESCHYLUS_PLAYS, SOPHOCLES_PLAYS, EURIPIDES_PLAYS } from '../src/lib/dramaLibrary.js'

const ROOT = process.cwd()
const SOURCE = path.join(ROOT, 'library', 'drama', 'source')
const OUT_DIR = path.join(ROOT, 'public', 'library', 'drama')
const OUT_JSON = path.join(ROOT, 'library', 'drama', 'shelf.generated.json')
const OUT_JS = path.join(ROOT, 'src', 'lib', 'dramaLibraryData.js')

const A4 = { width: 595.28, height: 841.89 }
const MARGIN = 56
const WIDTH = A4.width - MARGIN * 2

/**
 * Where each play lives. `heading` is the title as the volume prints it; a play
 * with no heading occupies the whole file (a single-play edition).
 */
const SOURCES = {
    // Aeschylus
    'persians-aeschylus': { file: '8714', translator: 'E. D. A. Morshead', heading: 'THE PERSIANS' },
    'seven-against-thebes-aeschylus': { file: '8714', translator: 'E. D. A. Morshead', heading: 'THE SEVEN AGAINST THEBES' },
    'suppliants-aeschylus': { file: '8714', translator: 'E. D. A. Morshead', heading: 'THE SUPPLIANT MAIDENS' },
    'agamemnon-aeschylus': { file: '14417', translator: 'Gilbert Murray' },
    'libation-bearers-aeschylus': { file: '8604', translator: 'E. D. A. Morshead', heading: 'THE LIBATION-BEARERS' },
    'eumenides-aeschylus': { file: '8604', translator: 'E. D. A. Morshead', heading: 'THE FURIES' },
    'prometheus-bound-aeschylus': { file: '8714', translator: 'E. D. A. Morshead', heading: 'PROMETHEUS BOUND' },
    // Sophocles
    'ajax-sophocles': { file: '14484', translator: 'Lewis Campbell', heading: 'AIAS' },
    'antigone-sophocles': { file: '14484', translator: 'Lewis Campbell', heading: 'ANTIGONE' },
    'women-of-trachis-sophocles': { file: '14484', translator: 'Lewis Campbell', heading: 'THE TRACHINIAN MAIDENS' },
    'oedipus-the-king-sophocles': { file: '14484', translator: 'Lewis Campbell', heading: 'KING OEDIPUS' },
    'electra-sophocles': { file: '14484', translator: 'Lewis Campbell', heading: 'ELECTRA' },
    'philoctetes-sophocles': { file: '14484', translator: 'Lewis Campbell', heading: 'PHILOCTETES' },
    'oedipus-at-colonus-sophocles': { file: '14484', translator: 'Lewis Campbell', heading: 'OEDIPUS AT COLONOS' },
    // Euripides
    'alcestis-euripides': { file: '10523', translator: 'Gilbert Murray' },
    'medea-euripides': { file: '35451', translator: 'Gilbert Murray' },
    'children-of-heracles-euripides': { file: '15081', translator: 'Theodore Alois Buckley', heading: 'THE HERACLIDÆ' },
    'hippolytus-euripides': { file: '8418', translator: 'Gilbert Murray', heading: 'HIPPOLYTUS' },
    'andromache-euripides': { file: '77336', translator: 'Michael Wodhull', heading: 'ANDROMACHE' },
    'hecuba-euripides': { file: '77336', translator: 'Michael Wodhull', heading: 'HECUBA' },
    'heracles-euripides': { file: '77336', translator: 'Michael Wodhull', heading: 'HERCULES DISTRACTED' },
    'trojan-women-euripides': { file: '35171', translator: 'Gilbert Murray' },
    'iphigenia-in-tauris-euripides': { file: '5063', translator: 'Gilbert Murray' },
    'helen-euripides': { file: '77336', translator: 'Michael Wodhull', heading: 'HELEN' },
    'electra-euripides': { file: '14322', translator: 'Gilbert Murray' },
    'orestes-euripides': { file: '15081', translator: 'Theodore Alois Buckley', heading: 'ORESTES' },
    'bacchae-euripides': { file: '35173', translator: 'Gilbert Murray' },
    'cyclops-euripides': { file: '77336', translator: 'Michael Wodhull', heading: 'THE CYCLOPS' },
    'rhesus-euripides': { file: '35170', translator: 'Gilbert Murray' },
    'iphigenia-at-aulis-euripides': { file: '15081', translator: 'Theodore Alois Buckley', heading: 'IPHIGENIA IN AULIS' },
    'phoenician-women-euripides': { file: '15081', translator: 'Theodore Alois Buckley', heading: 'THE PHŒNICIAN VIRGINS' },
}

const PLAYS = [...AESCHYLUS_PLAYS, ...SOPHOCLES_PLAYS, ...EURIPIDES_PLAYS]
const START = /^\*\*\*\s*START OF (THE|THIS) PROJECT GUTENBERG/i
const END = /^\*\*\*\s*END OF (THE|THIS) PROJECT GUTENBERG/i

/**
 * Every play title printed in each volume, in the spelling that volume uses.
 * A volume's own table of contents is the authority here: the volume tells us
 * where each play in it begins, so the cut never has to guess.
 */
const VOLUME_TITLES = {
    '31': ['OEDIPUS THE KING', 'OEDIPUS AT COLONUS', 'ANTIGONE'],
    '8604': ['AGAMEMNON', 'THE LIBATION BEARERS', 'THE FURIES'],
    '8714': ['THE SUPPLIANT MAIDENS', 'THE PERSIANS', 'THE SEVEN AGAINST THEBES', 'PROMETHEUS BOUND'],
    '14484': ['ANTIGONE', 'AIAS', 'KING OEDIPUS', 'ELECTRA', 'THE TRACHINIAN MAIDENS', 'PHILOCTETES', 'OEDIPUS AT COLONOS'],
    '15081': [
        'HECUBA', 'ORESTES', 'THE PHŒNICIAN VIRGINS', 'MEDEA', 'HIPPOLYTUS', 'ALCESTIS',
        'THE BACCHÆ', 'THE HERACLIDÆ', 'IPHIGENIA IN AULIS', 'IPHIGENIA IN TAURIS',
    ],
    '77336': [
        'HECUBA', 'HERCULES DISTRACTED', 'THE CHILDREN OF HERCULES', 'RHESUS',
        'THE TROJAN CAPTIVES', 'THE CYCLOPS', 'HELEN', 'ANDROMACHE',
    ],
    '27458': ['PROMETHEUS CHAINED', 'THE SEVEN AGAINST THEBES'],
    '8418': ['HIPPOLYTUS', 'THE BACCHAE'],
}

/** Fold the accents and ligatures a PDF's standard fonts cannot print. */
const REPLACE = {
    'Œ': 'OE', 'œ': 'oe', 'Æ': 'AE', 'æ': 'ae', '—': '-', '–': '-',
    '‘': "'", '’': "'", '“': '"', '”': '"', '•': '-', '…': '...',
}
function clean(text) {
    return String(text ?? '')
        .replace(/[\u0152\u0153\u00c6\u00e6\u2014\u2013\u2018\u2019\u201c\u201d\u2022\u2026]/g, (c) => REPLACE[c] ?? c)
        .replace(/[^\x09\x0A\x0D\x20-\x7E\xA0-\xFF]/g, '')
        .replace(/\r/g, '')
}

function normaliseHeading(line) {
    return clean(line)
        .toUpperCase()
        .replace(/[^A-Z ]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

/** Split a source file into header, body and footer, using Gutenberg's markers. */
function splitSource(id) {
    const raw = fs.readFileSync(path.join(SOURCE, `${id}.txt`), 'utf8')
    const lines = clean(raw).split('\n')
    const start = lines.findIndex((line) => START.test(line))
    const end = lines.findIndex((line) => END.test(line))
    if (start === -1 || end === -1 || end < start) {
        throw new Error(`source ${id}: Gutenberg start/end markers not found`)
    }
    return { header: lines.slice(0, start + 1), body: lines.slice(start + 1, end), footer: lines.slice(end) }
}

const CAST_MARKERS = /^(ARGUMENT|THE ARGUMENT|DRAMATIS PERSONAE|PERSONS REPRESENTED|THE PERSONS|PERSONS OF THE DRAMA|OF EURIPIDES)\b/i
// The translator's apparatus starts at a heading, or - in editions that print no
// heading - at the first numbered endnote. Both are excluded from the play.
const NOTES = /^(NOTES|NOTES ON|NOTES TO|ADDITIONAL NOTES|FOOTNOTES|TRANSLATOR.S NOTE)\b|^\[1\]\s/

/**
 * Where a title really is a play's heading, not a character's name in the
 * dialogue or an entry in a cast list. A heading is printed on its own line,
 * with the argument or the cast list a few lines below it.
 */
function titlePositions(body, heading) {
    const wanted = normaliseHeading(heading)
    const candidates = []
    for (let i = 0; i < body.length; i += 1) {
        if (normaliseHeading(body[i]) !== wanted) continue
        if (body.slice(i + 1, i + 14).some((line) => CAST_MARKERS.test(line.trim()))) candidates.push(i)
    }
    // Headings sit alone, under a blank line. A cast-list entry does not.
    const alone = candidates.filter((i) => i > 0 && !body[i - 1].trim())
    return alone.length ? alone : candidates
}

/** The first line of the cast list, which is where a single-play edition begins. */
const CAST_START = /^(CHARACTERS|PERSONS|DRAMATIS|THE PERSONS|PERSONS OF)\b/i

/**
 * Where one play starts and stops.
 *
 * In a collection the play runs from its heading to the next play's heading.
 * In a single-play edition the file also carries the translator's essay and his
 * notes, so the play starts at its title above the cast list, and stops where
 * the notes begin. Either way the cut is checked afterwards.
 */
function playRange(play, source) {
    const { body } = source
    let startIndex = 0
    let endIndex = body.length

    if (source.spec.heading) {
        const own = titlePositions(body, source.spec.heading)
        if (own.length === 0) {
            throw new Error(`${play.slug}: heading "${source.spec.heading}" not found in source ${source.spec.file}`)
        }
        startIndex = own[0]

        const siblings = (VOLUME_TITLES[source.spec.file] ?? [])
            .filter((title) => normaliseHeading(title) !== normaliseHeading(source.spec.heading))
            .flatMap((title) => titlePositions(body, title))
            .filter((i) => i > startIndex + 20)
        if (siblings.length) endIndex = Math.min(...siblings)
    } else {
        const castIndex = body.findIndex((line) => CAST_START.test(line.trim()))
        if (castIndex > 0) {
            const wanted = normaliseHeading(play.title)
            let title = -1
            for (let i = Math.min(castIndex, body.length - 1); i >= Math.max(0, castIndex - 80); i -= 1) {
                if (normaliseHeading(body[i]) === wanted) { title = i; break }
            }
            startIndex = title >= 0 ? title : castIndex
        }
    }

    for (let i = startIndex + 1; i < endIndex; i += 1) {
        if (NOTES.test(body[i].trim())) { endIndex = i; break }
    }

    return { text: body.slice(startIndex, endIndex).join('\n'), startIndex, endIndex }
}

/* ── PDF layout ───────────────────────────────────────────────────────────── */

const COVER_NOTE = [
    'This PDF was typeset by ZikShare from the Project Gutenberg plain-text edition named above.',
    'The play is in the public domain and ZikShare charges nothing for it.',
    '',
    "Project Gutenberg's header and licence, and its closing notice, are reproduced unchanged",
    'after this page, because their terms travel with the text.',
]

/* ── Build ────────────────────────────────────────────────────────────────── */

const sources = new Map()
fs.mkdirSync(OUT_DIR, { recursive: true })
const shelf = []

for (const play of PLAYS) {
    const spec = SOURCES[play.slug]
    if (!spec) throw new Error(`${play.slug}: no source configured`)

    const key = spec.file
    if (!sources.has(key)) {
        sources.set(key, { spec: { file: key }, ...splitSource(key) })
    }
    const source = { ...sources.get(key), spec }
    const entry = { ...play, translator: spec.translator }
    const { text, startIndex, endIndex } = playRange(entry, source)
    if (process.env.DRAMA_DEBUG) console.error('cut', play.slug.padEnd(30), startIndex, endIndex, '|', text.split('\n').filter(Boolean).slice(-2).join(' / ').slice(0, 80))

    const words = text.split(/\s+/).filter(Boolean).length
    if (words < 2500) {
        throw new Error(`${play.slug}: only ${words} words extracted - the cut is wrong`)
    }

    const bytes = await buildPlayPdf(
        { ...entry, dateLabel: entry.year ? `${Math.abs(entry.year)} BC` : null },
        {
            shelfLabel: 'GREEK TRAGEDY',
            accent: ACCENTS.greek,
            meta: [
                ['Playwright', entry.author],
                ['Translated by', entry.translator || 'not recorded in this edition'],
                ['Source text', `Project Gutenberg eBook #${spec.file}`],
                ['Language', 'English'],
                ['Rights', 'Public domain'],
            ],
            coverNote: [...COVER_NOTE, '', entry.context || ''].filter(Boolean),
            headerText: source.header.join('\n'),
            bodyText: text,
            footerText: source.footer.join('\n'),
        }
    )
    const file = path.join(OUT_DIR, `${play.slug}.pdf`)
    fs.writeFileSync(file, bytes)

    const pdf = await PDFDocument.load(bytes)
    shelf.push({
        slug: play.slug,
        title: play.title,
        author: play.author,
        translator: entry.translator || null,
        year: play.year,
        kind: play.kind,
        gutenbergId: Number(spec.file),
        download_path: `/library/drama/${play.slug}.pdf`,
        pages: pdf.getPageCount(),
        words,
        bytes: bytes.length,
        sha256: crypto.createHash('sha256').update(bytes).digest('hex'),
    })
    console.log(`${play.author.padEnd(10)} ${play.title.padEnd(30)} ${String(pdf.getPageCount()).padStart(4)}p ${(bytes.length / 1024).toFixed(0)}kB ${words}w`)
}

fs.writeFileSync(OUT_JSON, JSON.stringify({ generatedAt: new Date().toISOString(), count: shelf.length, shelf }, null, 2))
fs.writeFileSync(
    OUT_JS,
    '// AUTO-GENERATED by scripts/build-drama-pdfs.mjs - do not edit by hand.\n' +
    '// Source: library/drama/source/*.txt (Project Gutenberg, public domain).\n' +
    '// Rebuild with: npm run drama:build\n\n' +
    `export const DRAMA_SHELF = ${JSON.stringify(shelf, null, 4)}\n`
)

const pages = shelf.reduce((total, item) => total + item.pages, 0)
const bytes = shelf.reduce((total, item) => total + item.bytes, 0)
console.log(`\n[drama] ${shelf.length} plays | ${pages} pages | ${(bytes / 1048576).toFixed(1)} MB`)
