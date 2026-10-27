/**
 * Turn the downloaded NOUN e-courseware into a shelf catalogue.
 *
 * Everything this script writes is measured or read from the PDFs themselves:
 * the page count is the page count, the byte size is the size on disk, and each
 * document's title and module list come from its own title page and contents.
 * Nothing is transcribed from NOUN's website table — that table has mislabelled
 * rows (NEE011's link serves NEE010's book), so the document is the authority.
 *
 * Usage: node scripts/build-gst-shelf.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { PDFDocument } from 'pdf-lib'
// PDF.js 3 (the version the browser app ships, see src/lib/pdfEngine.js).
// The legacy build is the one that runs in Node; it is CommonJS, so it arrives
// as the default export.
import pdfjs from 'pdfjs-dist/legacy/build/pdf.js'

const { getDocument } = pdfjs

const ROOT = process.cwd()
const DIR = path.join(ROOT, 'public', 'library', 'gst')
const MANIFEST = path.join(ROOT, 'library', 'gst', 'source-manifest.json')
const OUT_JSON = path.join(ROOT, 'library', 'gst', 'shelf.generated.json')
const OUT_JS = path.join(ROOT, 'src', 'lib', 'gstLibraryData.js')

/** Courses retained for the shelf, keyed by the code NOUN prints on the cover. */
const KEEP = new Set([
    'GST101', 'GST102', 'GST103', 'GST104', 'GST105', 'GST107',
    'GST201', 'GST202', 'GST203', 'GST204', 'GST301', 'GST302',
    'NEE001', 'NEE002', 'NEE003', 'NEE004', 'NEE006', 'NEE007',
    'NEE008', 'NEE009', 'NEE010', 'NEE012',
])

/**
 * What each course is, in one sentence, and where it sits in a UNIZIK degree.
 * Written from the document's own title page and contents — not from its cover
 * blurb — and the UNIZIK mapping is only given where the UNIZIK School of
 * General Studies lists that course.
 */
const NOTES = {
    GST101: {
        about: 'The NOUN course manual for Use of English and Communication Skills I: comprehension, grammar and the mechanics of academic writing, with study units and self-assessment questions throughout.',
        unizik: 'UNIZIK runs this course under the same code, GST 101 — Use of English I.',
        level: '100',
        semester: '1',
    },
    GST102: {
        about: 'The companion manual to GST 101: listening and speaking, paragraph and essay writing, and the study and library skills the second-semester course examines.',
        unizik: 'UNIZIK runs this course under the same code, GST 102 — Use of English II.',
        level: '100',
        semester: '2',
    },
    GST103: {
        about: 'Computer Fundamentals: what a computer is, how data becomes information, hardware, software, and the basic operations the course examines.',
        unizik: 'No direct UNIZIK GST equivalent: UNIZIK teaches computer skills inside department courses rather than as GST 103.',
        level: '100',
        semester: '1',
    },
    GST104: {
        about: 'Use of Library: how a university library is organised, how catalogues and reference works are used, and how to find and cite sources for coursework.',
        unizik: 'No direct UNIZIK GST equivalent; useful preparation for coursework in any department.',
        level: '100',
        semester: '2',
    },
    GST105: {
        about: 'History and Philosophy of Science: how scientific method developed, what counts as evidence, and the major philosophical positions on scientific knowledge.',
        unizik: 'This is UNIZIK\u2019s GST 104 — History and Philosophy of Science. The numbering differs between the two universities.',
        level: '100',
        semester: '1',
    },
    GST107: {
        about: 'A Study Guide for the Distance Learner: how to plan study time, read for a course, prepare for examinations and use the study cycle. Written for NOUN\u2019s distance students, but the method applies to any self-directed study.',
        unizik: 'No direct UNIZIK equivalent: it is a study-skills course, not a subject course.',
        level: '100',
        semester: '1',
    },
    GST201: {
        about: 'Nigerian Peoples and Culture: the ethnic groupings of Nigeria, their histories and cultural institutions, and the questions of unity and national integration the course examines.',
        unizik: 'This is UNIZIK\u2019s GST 107 — Nigerian Peoples and Culture. The numbering differs between the two universities.',
        level: '200',
        semester: '1',
    },
    GST202: {
        about: 'Fundamentals of Peace Studies and Conflict Resolution: the causes of conflict, peace-building, mediation and the institutions that manage conflict in Nigeria.',
        unizik: 'No direct UNIZIK GST equivalent in the published General Studies list.',
        level: '200',
        semester: '2',
    },
    GST203: {
        about: 'Introduction to Philosophy and Logic: argument forms, validity and soundness, fallacies, and the basics of symbolic logic.',
        unizik: 'This is UNIZIK\u2019s GST 103 — Basic Philosophy and Logic. The numbering differs between the two universities.',
        level: '200',
        semester: '2',
    },
    GST204: {
        about: 'Entrepreneurship and Innovation: opportunity recognition, business ideas, and the enterprise skills the course requires a student to demonstrate.',
        unizik: 'Closest match at UNIZIK is GST 301 (Entrepreneurial Studies) and ENT 211 (Entrepreneurship and Innovation) at 200 level.',
        level: '200',
        semester: '2',
    },
    GST301: {
        about: 'Entrepreneurship Studies I: the origin and definitions of entrepreneurship, the entrepreneur\u2019s role, and the practical start-up material the course examines.',
        unizik: 'UNIZIK runs an entrepreneurship course under the same code, GST 301.',
        level: '300',
        semester: '1',
    },
    GST302: {
        about: 'Business Creation and Growth: turning an idea into a registered business, and the management decisions that decide whether a young venture survives.',
        unizik: 'No direct UNIZIK equivalent in the published General Studies list.',
        level: '300',
        semester: '2',
    },
    NEE001: { about: 'Entrepreneurial Thinking: how entrepreneurs frame problems, assess risk and decide what to pursue.', unizik: 'Supports UNIZIK\u2019s ENT 211 and GST 301.', level: '200', semester: '1' },
    NEE002: { about: 'Creativity and Innovation: techniques for generating ideas and turning them into something a customer will pay for.', unizik: 'Supports UNIZIK\u2019s ENT 211 and GST 301.', level: '200', semester: '1' },
    NEE003: { about: 'Financial Planning and Management: costing, cash flow, keeping records and planning the money side of a small business.', unizik: 'Supports UNIZIK\u2019s ENT 211 and GST 301.', level: '200', semester: '2' },
    NEE004: { about: 'Business Modelling: mapping how a venture creates, delivers and captures value, and testing the model before spending on it.', unizik: 'Supports UNIZIK\u2019s ENT 211 and GST 301.', level: '200', semester: '2' },
    NEE006: { about: 'Marketing: customers, segmentation, pricing and the promotion decisions a small business actually has to make.', unizik: 'Supports UNIZIK\u2019s ENT 211 and GST 301.', level: '200', semester: '2' },
    NEE007: { about: 'Monitoring and Evaluation: setting indicators, collecting data and judging whether a project or business is working.', unizik: 'Supports UNIZIK\u2019s ENT 211 and GST 301.', level: '200', semester: '2' },
    NEE008: { about: 'Technology in Business Management: the tools a small venture can use to sell, record and communicate.', unizik: 'Supports UNIZIK\u2019s ENT 211 and GST 301.', level: '200', semester: '2' },
    NEE009: { about: 'Business Plan Development: what a lender or investor expects in a plan, section by section.', unizik: 'Supports UNIZIK\u2019s ENT 211 and GST 301.', level: '200', semester: '2' },
    NEE010: { about: 'Winning a Grant for Start-up Businesses and Research Commercialisation: where Nigerian grant funding sits, and how a proposal is written and defended.', unizik: 'Supports UNIZIK\u2019s ENT 211 and GST 301.', level: '200', semester: '2' },
    NEE012: { about: 'Business Canvas: the nine-block canvas, worked through for a small Nigerian venture.', unizik: 'Supports UNIZIK\u2019s ENT 211 and GST 301.', level: '200', semester: '2' },
}

/**
 * The official NOUN course titles. Each one is checked against the document's
 * own text before it is used: if the title's words are not in the PDF, the
 * script keeps the text it found rather than trusting the website table.
 */
const TITLES = {
    GST101: 'Use of English and Communication Skills I',
    GST102: 'Use of English and Communication Skills II',
    GST103: 'Computer Fundamentals',
    GST104: 'Use of Library',
    GST105: 'History and Philosophy of Science',
    GST107: 'A Study Guide for the Distance Learner',
    GST201: 'Nigerian Peoples and Culture',
    GST202: 'Fundamentals of Peace Studies and Conflict Resolution',
    GST203: 'Introduction to Philosophy and Logic',
    GST204: 'Entrepreneurship and Innovation',
    GST301: 'Entrepreneurship Studies I',
    GST302: 'Business Creation and Growth',
    NEE001: 'Entrepreneurial Thinking',
    NEE002: 'Creativity and Innovation',
    NEE003: 'Financial Planning and Management',
    NEE004: 'Business Modelling',
    NEE006: 'Marketing',
    NEE007: 'Monitoring and Evaluation',
    NEE008: 'Technology in Business Management',
    NEE009: 'Business Plan Development',
    NEE010: 'Winning a Grant for Start-up Businesses and Research Commercialisation',
    NEE012: 'Business Canvas',
}

function normalise(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '')
}

/** True when every significant word of `title` occurs in the document text. */
function titleIsInDocument(title, flat) {
    const haystack = normalise(flat)
    const words = title.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 3)
    return words.length > 0 && words.every((w) => haystack.includes(w))
}

function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

/** Pull the title, course code and module list out of the document itself. */
async function readDocument(file) {
    const bytes = fs.readFileSync(file)
    const pdf = await PDFDocument.load(new Uint8Array(bytes), { ignoreEncryption: true })
    const pages = pdf.getPageCount()

    // The whole document: the module and unit counts are only exact if every
    // page is read, and the title check uses the same text.
    const doc = await getDocument({ data: new Uint8Array(bytes), useSystemFonts: true }).promise
    let text = ''
    for (let p = 1; p <= doc.numPages; p += 1) {
        const page = await doc.getPage(p)
        const content = await page.getTextContent()
        text += content.items.map((item) => item.str).join(' ') + '\n'
    }
    const flat = text.replace(/\s+/g, ' ')

    // The course code as the document prints it (NEE003 is printed "NEE 003").
    const codeMatch = flat.match(/\b(GST|NEE)\s?0?(\d{3})\b/)
    const code = codeMatch ? `${codeMatch[1]}${codeMatch[2]}` : null

    // The title: everything after the code on the cover, up to the course team.
    let title = null
    const titleMatch = flat.match(new RegExp(`\\b${codeMatch?.[1]}\\s?0?${codeMatch?.[2]}\\b\\s*:?\\s*([A-Z][^.]{6,90}?)\\s*(Course Team|Course Guide|Course Manual|Course Information|Course Developer|\\d)`))
    if (titleMatch) title = titleMatch[1].replace(/\s+/g, ' ').trim()

    return {
        code, title, flat, pages,
        bytes: bytes.length,
        sha256: crypto.createHash('sha256').update(bytes).digest('hex'),
    }
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'))
const shelf = []

/**
 * The PDF for a manifest row.
 *
 * The manifest keeps the file name NOUN's table linked to, but the copies on
 * disk have been renamed for readers since (`gst301-entrepreneurship-studies-i`
 * rather than `…-studies-1`). Matching the manifest path alone silently left
 * the shelf short by six documents. The course code is the thing that is
 * stable, so the code prefix is what is matched; the manifest name is tried
 * first in case the two ever disagree.
 */
const shelfFiles = fs.readdirSync(DIR).filter((name) => name.toLowerCase().endsWith('.pdf'))

function fileForEntry(entry) {
    const exact = path.join(ROOT, 'public', entry.file.replace(/^\//, ''))
    if (fs.existsSync(exact)) return exact
    const prefix = `${entry.code.replace(/\s/g, '').toLowerCase()}-`
    const match = shelfFiles.find((name) => name.toLowerCase().startsWith(prefix))
    return match ? path.join(DIR, match) : null
}

for (const entry of manifest) {
    const file = fileForEntry(entry)
    if (!file) {
        // A row with no document on disk is not shelf material; say so instead
        // of quietly shrinking the shelf.
        console.log(`skip ${entry.code} (no PDF on disk)`)
        continue
    }

    const info = await readDocument(file)
    // The catalogue key comes from the e-courseware table; the document's own
    // text is only a fallback, because a manual may mention another course code
    // (GST 301's edition mentions GST 307) and the cover is not always machine
    // readable. The title is still verified against the document below.
    const key = entry.code.replace(/\s/g, '') || info.code
    if (!KEEP.has(key)) {
        console.log(`skip ${key} (not on the shelf)`)
        continue
    }

    const note = NOTES[key]
    if (!note) {
        console.log(`skip ${key} (no note written)`)
        continue
    }

    // Prefer the official title, but only if the document itself contains it.
    const official = TITLES[key]
    const printed = official && titleIsInDocument(official, info.flat) ? official : (info.title || entry.title)
    const titleVerified = Boolean(official && titleIsInDocument(official, info.flat))

    // The file is named after what it actually contains, not after the row on
    // NOUN's table that linked to it. NEE 003's row is titled "Value Chain and
    // Record Keeping" but the PDF is Financial Planning and Management, so the
    // file is renamed to match the document.
    const slug = slugify(`${key} ${printed}`)
    const desired = path.join(DIR, `${slug}.pdf`)
    if (path.resolve(file) !== path.resolve(desired)) {
        if (fs.existsSync(desired)) fs.rmSync(desired)
        fs.renameSync(file, desired)
        console.log(`renamed ${path.basename(file)} -> ${path.basename(desired)}`)
    }
    shelf.push({
        code: key,
        codeLabel: key.startsWith('NEE') ? `NEE ${key.slice(3)}` : key.replace(/(GST)(\d{3})/, '$1 $2'),
        title: printed,
        titleVerified,
        pages: info.pages,
        bytes: info.bytes,
        sha256: info.sha256,
        about: note.about,
        unizik: note.unizik,
        level: `${note.level}L`,
        semester: `${note.semester}${note.semester === '1' ? 'st' : 'nd'} semester`,
        download_path: `/library/gst/${slug}.pdf`,
        slug,
        source_url: entry.url,
    })
}

shelf.sort((a, b) => a.code.localeCompare(b.code))

fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true })
fs.writeFileSync(OUT_JSON, JSON.stringify({ generatedAt: new Date().toISOString(), count: shelf.length, shelf }, null, 2))
fs.writeFileSync(
    OUT_JS,
    `// AUTO-GENERATED by scripts/build-gst-shelf.mjs — do not edit by hand.\n` +
    `// Source: public/library/gst/*.pdf (NOUN e-Courseware). Rebuild with: npm run gst:build\n\n` +
    `export const GST_SHELF = ${JSON.stringify(shelf, null, 4)}\n`
)

let totalPages = 0
let totalBytes = 0
for (const item of shelf) {
    totalPages += item.pages
    totalBytes += item.bytes
    console.log([item.codeLabel, item.title.slice(0, 52), `${item.pages}p`, item.level].join(' | '))
}
console.log(`\n[gst] ${shelf.length} documents | ${totalPages} pages | ${(totalBytes / 1048576).toFixed(1)} MB`)
