/**
 * Typesetting for the Theatre Arts shelf.
 *
 * A guide is not a play: it has a cover that states what the unit covers, a body
 * of headed sections, exercises, and a short reading list. It is set in the same
 * paper, margins and type as the classical shelves so one library looks like one
 * library, but with its own colour and its own cover furniture.
 */
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { A4, INK, MARGIN, MUTED, WIDTH, clean, wrap } from './play-pdf.mjs'

const RULE = rgb(0.83, 0.84, 0.86)

/**
 * @param {object} guide   { title, topic, summary, covers, sections, exercises, reading }
 * @param {object} options { accent }
 */
export async function buildGuidePdf(guide, { accent }) {
    const doc = await PDFDocument.create()
    const serif = await doc.embedFont(StandardFonts.TimesRoman)
    const serifBold = await doc.embedFont(StandardFonts.TimesRomanBold)
    const serifItalic = await doc.embedFont(StandardFonts.TimesRomanItalic)
    const sans = await doc.embedFont(StandardFonts.Helvetica)
    const sansBold = await doc.embedFont(StandardFonts.HelveticaBold)

    doc.setTitle(guide.title)
    doc.setAuthor('ZikShare Theatre Arts')
    doc.setSubject(`ZikShare guide - ${guide.topic}`)
    doc.setProducer('ZikShare library')

    /* ── Cover ── */
    const cover = doc.addPage([A4.width, A4.height])
    let y = A4.height - 120
    cover.drawText('ZIKSHARE LIBRARY', { x: MARGIN, y, size: 9, font: sansBold, color: accent })
    cover.drawText('THEATRE ARTS', { x: MARGIN, y: y - 14, size: 8, font: sans, color: MUTED })
    y -= 64
    cover.drawText(clean(guide.topic.toUpperCase()), { x: MARGIN, y, size: 11, font: sansBold, color: MUTED })
    y -= 40
    for (const line of wrap(clean(guide.title), serifBold, 28, WIDTH)) {
        cover.drawText(line, { x: MARGIN, y, size: 28, font: serifBold, color: INK })
        y -= 34
    }
    y -= 8
    cover.drawText('A ZikShare teaching unit, written for this shelf', {
        x: MARGIN,
        y,
        size: 10.5,
        font: serifItalic,
        color: MUTED,
    })
    y -= 26
    cover.drawLine({ start: { x: MARGIN, y }, end: { x: A4.width - MARGIN, y }, thickness: 1, color: accent })
    y -= 26

    for (const line of wrap(clean(guide.summary), serif, 11.5, WIDTH)) {
        cover.drawText(line, { x: MARGIN, y, size: 11.5, font: serif, color: INK })
        y -= 16
    }

    y -= 10
    cover.drawText('WHAT THIS UNIT COVERS', { x: MARGIN, y, size: 8.5, font: sansBold, color: accent })
    y -= 18
    for (const item of guide.covers) {
        cover.drawText('-', { x: MARGIN, y, size: 10.5, font: serif, color: MUTED })
        cover.drawText(clean(item), { x: MARGIN + 14, y, size: 10.5, font: serif, color: INK })
        y -= 15
    }

    y -= 14
    const note = [
        'This is ZikShare\u2019s own teaching text, not a published book. It was written for this library',
        'and is free to read, print and use in class. The works listed at the end are the books to read',
        'next; they are not reproduced here and are not hosted by ZikShare.',
    ]
    for (const line of note) {
        cover.drawText(clean(line), { x: MARGIN, y, size: 8.5, font: serifItalic, color: MUTED })
        y -= 12
    }

    /* ── Body ── */
    let page = doc.addPage([A4.width, A4.height])
    let cursor = A4.height - MARGIN
    const addPage = () => {
        page = doc.addPage([A4.width, A4.height])
        cursor = A4.height - MARGIN
    }
    const room = (needed) => {
        if (cursor - needed < MARGIN + 30) addPage()
    }
    const paragraph = (text, { font = serif, size = 10.5, leading = 15.5, gap = 9 } = {}) => {
        for (const line of wrap(clean(text), font, size, WIDTH)) {
            room(leading)
            page.drawText(line, { x: MARGIN, y: cursor, size, font, color: INK })
            cursor -= leading
        }
        cursor -= gap
    }
    const heading = (text) => {
        room(60)
        cursor -= 6
        for (const line of wrap(clean(text), serifBold, 13.5, WIDTH)) {
            page.drawText(line, { x: MARGIN, y: cursor, size: 13.5, font: serifBold, color: accent })
            cursor -= 19
        }
        cursor -= 4
    }

    for (const section of guide.sections) {
        heading(section.heading)
        for (const para of section.paras) paragraph(para)
    }

    heading('Exercises')
    guide.exercises.forEach((item, index) => {
        const lines = wrap(clean(item), serif, 10.5, WIDTH - 20)
        lines.forEach((line, lineIndex) => {
            room(15.5)
            if (lineIndex === 0) {
                page.drawText(`${index + 1}.`, { x: MARGIN, y: cursor, size: 10.5, font: serifBold, color: INK })
            }
            page.drawText(line, { x: MARGIN + 20, y: cursor, size: 10.5, font: serif, color: INK })
            cursor -= 15.5
        })
        cursor -= 6
    })

    heading('Where to read more')
    for (const item of guide.reading) {
        for (const line of wrap(clean(item), serifItalic, 10, WIDTH - 14)) {
            room(14)
            page.drawText(line, { x: MARGIN + 14, y: cursor, size: 10, font: serifItalic, color: INK })
            cursor -= 14
        }
        cursor -= 5
    }

    paragraph(
        'These are books to look for in a library or a bookshop. They are not on this shelf and ZikShare does not host them.',
        { font: serifItalic, size: 8.5, leading: 12, gap: 0 }
    )

    /* ── Running footer ── */
    const pages = doc.getPages()
    pages.forEach((each, index) => {
        each.drawLine({
            start: { x: MARGIN, y: MARGIN + 18 },
            end: { x: A4.width - MARGIN, y: MARGIN + 18 },
            thickness: 0.5,
            color: RULE,
        })
        each.drawText(clean(`${guide.title} - ZikShare Theatre Arts`), {
            x: MARGIN,
            y: MARGIN + 6,
            size: 7.5,
            font: sans,
            color: MUTED,
            maxWidth: WIDTH - 40,
        })
        each.drawText(`${index + 1}`, {
            x: A4.width - MARGIN - 12,
            y: MARGIN + 6,
            size: 7.5,
            font: sans,
            color: MUTED,
        })
    })

    return doc.save()
}
