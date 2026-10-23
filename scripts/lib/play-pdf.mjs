/**
 * Typesetting for the classical shelves.
 *
 * One PDF per play: a ZikShare cover page, whatever front matter the source
 * licence requires, the play, and a running footer. Both the Greek shelf
 * (`build-drama-pdfs.mjs`) and the Roman shelf (`build-roman-pdfs.mjs`) use this,
 * so a reader gets the same object whichever play they open and there is only
 * one place to change the design.
 */
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

export const A4 = { width: 595.28, height: 841.89 }
export const MARGIN = 56
export const WIDTH = A4.width - MARGIN * 2

export const INK = rgb(0.1, 0.1, 0.12)
export const MUTED = rgb(0.42, 0.45, 0.5)

/** Each shelf gets its own spine colour, so two open PDFs are told apart. */
export const ACCENTS = {
    greek: rgb(0.42, 0.12, 0.24),
    roman: rgb(0.13, 0.29, 0.45),
    medieval: rgb(0.44, 0.32, 0.11),
}

const REPLACE = {
    'Œ': 'OE', 'œ': 'oe', 'Æ': 'AE', 'æ': 'ae', '—': '-', '–': '-',
    '‘': "'", '’': "'", '“': '"', '”': '"', '•': '-', '…': '...',
}

/**
 * Fold what the PDF base fonts cannot print. Times and Courier are encoded in
 * WinAnsi, so Greek script, em dashes and the ligatures have to go or the whole
 * page renders as nonsense.
 */
export function clean(text) {
    return String(text ?? '')
        .replace(/[ŒœÆæ—–‘’“”•…]/g, (c) => REPLACE[c] ?? c)
        .replace(/[^\x09\x0A\x0D\x20-\x7E\xA0-\xFF]/g, '')
        .replace(/\r/g, '')
}

/** Greedy wrap, with a hard break for a single word wider than the column. */
export function wrap(text, font, size, maxWidth) {
    const out = []
    for (const paragraph of String(text).split('\n')) {
        const words = paragraph.trim().split(/\s+/).filter(Boolean)
        if (words.length === 0) { out.push(''); continue }
        let line = ''
        for (const word of words) {
            const candidate = line ? `${line} ${word}` : word
            if (font.widthOfTextAtSize(candidate, size) <= maxWidth) line = candidate
            else { if (line) out.push(line); line = word }
            while (font.widthOfTextAtSize(line, size) > maxWidth && line.length > 1) {
                let cut = line.length
                while (cut > 1 && font.widthOfTextAtSize(line.slice(0, cut), size) > maxWidth) cut -= 1
                out.push(line.slice(0, cut))
                line = line.slice(cut)
            }
        }
        if (line) out.push(line)
    }
    return out
}

/**
 * Build one play.
 *
 * @param {object} play       { title, author, translator, dateLabel, context }
 * @param {object} options
 * @param {string} options.shelfLabel   e.g. 'GREEK TRAGEDY'
 * @param {object} options.accent       an rgb() from ACCENTS
 * @param {string[][]} options.meta     rows of [label, value] for the cover
 * @param {string[]} options.coverNote  italic paragraphs under the meta table
 * @param {string} options.headerText   reproduced verbatim before the play
 * @param {string} options.bodyText     the play
 * @param {string} options.footerText   reproduced verbatim after the play
 */
export async function buildPlayPdf(play, options) {
    const {
        shelfLabel,
        accent = ACCENTS.greek,
        meta = [],
        coverNote = [],
        headerText = '',
        bodyText = '',
        footerText = '',
    } = options

    const doc = await PDFDocument.create()
    const serif = await doc.embedFont(StandardFonts.TimesRoman)
    const serifBold = await doc.embedFont(StandardFonts.TimesRomanBold)
    const serifItalic = await doc.embedFont(StandardFonts.TimesRomanItalic)
    const mono = await doc.embedFont(StandardFonts.Courier)

    doc.setTitle(`${play.title} - ${play.author}`)
    doc.setAuthor(play.author)
    doc.setSubject(`Translated by ${play.translator || 'an unrecorded translator'}; public domain`)
    doc.setProducer('ZikShare library')

    /* Cover */
    const cover = doc.addPage([A4.width, A4.height])
    let y = A4.height - 120
    cover.drawText('ZIKSHARE LIBRARY', { x: MARGIN, y, size: 9, font: serifBold, color: accent })
    cover.drawText(shelfLabel, { x: MARGIN, y: y - 14, size: 8, font: serif, color: MUTED })
    y -= 70
    cover.drawText(play.author.toUpperCase(), { x: MARGIN, y, size: 12, font: serifBold, color: MUTED })
    y -= 40

    for (const line of wrap(play.title, serifBold, 30, WIDTH)) {
        cover.drawText(line, { x: MARGIN, y, size: 30, font: serifBold, color: INK })
        y -= 38
    }

    if (play.dateLabel) {
        y -= 6
        cover.drawText(play.dateLabel, { x: MARGIN, y, size: 11, font: serif, color: MUTED })
        y -= 22
    }

    y -= 10
    cover.drawLine({ start: { x: MARGIN, y }, end: { x: A4.width - MARGIN, y }, thickness: 1, color: accent })
    y -= 26

    for (const [label, value] of meta) {
        cover.drawText(label, { x: MARGIN, y, size: 9, font: serifBold, color: MUTED })
        const valueLines = wrap(value, serif, 10.5, WIDTH - 110)
        valueLines.forEach((line, index) => {
            cover.drawText(line, { x: MARGIN + 110, y: y - index * 13, size: 10.5, font: serif, color: INK })
        })
        y -= 13 * Math.max(1, valueLines.length) + 8
    }

    y -= 14
    for (const paragraph of coverNote) {
        const lines = paragraph ? wrap(paragraph, serifItalic, 9.5, WIDTH) : ['']
        for (const text of lines) {
            cover.drawText(text, { x: MARGIN, y, size: 9.5, font: serifItalic, color: MUTED })
            y -= 14
        }
    }

    /* The play */
    let page = doc.addPage([A4.width, A4.height])
    let cursor = A4.height - MARGIN
    const addPage = () => {
        page = doc.addPage([A4.width, A4.height])
        cursor = A4.height - MARGIN
    }
    const writeBlock = (text, { font, size, leading, gap = 6, colour = INK }) => {
        if (!text) return
        for (const line of wrap(text, font, size, WIDTH)) {
            if (cursor < MARGIN + 40) addPage()
            if (line) page.drawText(line, { x: MARGIN, y: cursor, size, font, color: colour })
            cursor -= leading
        }
        cursor -= gap
    }

    writeBlock(headerText, { font: mono, size: 7.5, leading: 9.5, colour: MUTED })
    writeBlock(bodyText, { font: serif, size: 10.5, leading: 14.5, gap: 2 })
    writeBlock(footerText, { font: mono, size: 7.5, leading: 9.5, colour: MUTED })

    /* Running footer */
    doc.getPages().slice(1).forEach((p, index) => {
        const label = `ZikShare library  -  ${play.author}, ${play.title}  -  ${index + 2}`
        p.drawText(clean(label), { x: MARGIN, y: 28, size: 7.5, font: serif, color: MUTED })
    })

    return doc.save()
}
