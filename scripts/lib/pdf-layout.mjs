import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import crypto from 'node:crypto'

export const A4 = { width: 595.28, height: 841.89 }
export const MARGIN = 56
export const CONTENT_WIDTH = A4.width - MARGIN * 2

export const DOMAIN_STYLES = {
    'GST & Compulsory Courses': { color: '#1E3A8A', accent: '#F59E0B', label: 'GST / COMPULSORY' },
    'Faculty Primer': { color: '#0F766E', accent: '#F59E0B', label: 'FACULTY PRIMER' },
    'Study Skills': { color: '#B45309', accent: '#1E3A8A', label: 'STUDY SKILLS' },
    'Campus Life': { color: '#9A3412', accent: '#F59E0B', label: 'CAMPUS LIFE' },
    'Money & Career': { color: '#065F46', accent: '#F59E0B', label: 'MONEY & CAREER' },
    'Digital Skills': { color: '#4338CA', accent: '#F59E0B', label: 'DIGITAL SKILLS' },
    'Health & Wellbeing': { color: '#9D174D', accent: '#F59E0B', label: 'HEALTH & WELLBEING' },
}

export function hexToRgb(hex) {
    const clean = hex.replace('#', '')
    return rgb(
        parseInt(clean.slice(0, 2), 16) / 255,
        parseInt(clean.slice(2, 4), 16) / 255,
        parseInt(clean.slice(4, 6), 16) / 255
    )
}

const REPLACEMENTS = {
    '\u2014': '-', '\u2013': '-', '\u2019': "'", '\u2018': "'",
    '\u201c': '"', '\u201d': '"', '\u2022': '-', '\u2192': '->',
    '\u20a6': 'NGN ', '\u00a0': ' ', '\u2026': '...',
}

export function ascii(text) {
    return String(text ?? '')
        .replace(/[\u2014\u2013\u2019\u2018\u201c\u201d\u2022\u2192\u20a6\u00a0\u2026]/g, (c) => REPLACEMENTS[c] ?? c)
        .replace(/[^\x09\x0A\x0D\x20-\x7E\xA0-\xFF]/g, '')
}

export function wrapText(text, font, size, maxWidth) {
    const paragraphs = ascii(text).split('\n')
    const lines = []
    for (const paragraph of paragraphs) {
        const words = paragraph.split(/\s+/).filter(Boolean)
        let line = ''
        for (const word of words) {
            const candidate = line ? `${line} ${word}` : word
            if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
                line = candidate
            } else {
                if (line) lines.push(line)
                line = word
            }
        }
        if (line) lines.push(line)
        lines.push('')
    }
    while (lines.length && lines[lines.length - 1] === '') lines.pop()
    return lines
}

export class PdfWriter {
    constructor(doc, { fonts, style, meta }) {
        this.doc = doc
        this.fonts = fonts
        this.style = style
        this.meta = meta
        this.page = null
        this.y = 0
        this.pageNumber = 0
    }

    newPage() {
        this.page = this.doc.addPage([A4.width, A4.height])
        this.y = A4.height - MARGIN
        this.pageNumber += 1
        this.drawFooter()
        return this.page
    }

    drawFooter() {
        const { regular } = this.fonts
        const footerY = 30
        this.page.drawLine({
            start: { x: MARGIN, y: footerY + 14 },
            end: { x: A4.width - MARGIN, y: footerY + 14 },
            thickness: 0.5,
            color: rgb(0.85, 0.87, 0.9),
        })
        this.page.drawText(ascii(`ZikShare Academic Vault  |  ${this.meta.domain}`), {
            x: MARGIN, y: footerY, size: 7.2, font: regular, color: rgb(0.42, 0.45, 0.5),
        })
        const label = `Page ${this.pageNumber}`
        this.page.drawText(label, {
            x: A4.width - MARGIN - regular.widthOfTextAtSize(label, 7.2),
            y: footerY, size: 7.2, font: regular, color: rgb(0.42, 0.45, 0.5),
        })
    }

    ensureSpace(height) {
        if (!this.page) this.newPage()
        if (this.y - height < MARGIN + 18) this.newPage()
    }

    paragraph(text, { size = 10.2, lineHeight = 15.2, color = rgb(0.13, 0.17, 0.23), spaceAfter = 8, font } = {}) {
        const usedFont = font || this.fonts.regular
        const lines = wrapText(text, usedFont, size, CONTENT_WIDTH)
        const total = lines.length * lineHeight
        this.ensureSpace(total + spaceAfter)
        for (const line of lines) {
            this.page.drawText(line, { x: MARGIN, y: this.y, size, font: usedFont, color })
            this.y -= lineHeight
        }
        this.y -= spaceAfter
    }

    heading(text, { size = 15, spaceBefore = 10, spaceAfter = 8, color } = {}) {
        const lines = wrapText(text, this.fonts.bold, size, CONTENT_WIDTH)
        const height = lines.length * (size + 5) + spaceAfter + spaceBefore
        this.ensureSpace(height)
        this.y -= spaceBefore
        for (const line of lines) {
            this.page.drawText(line, {
                x: MARGIN, y: this.y, size, font: this.fonts.bold,
                color: color || hexToRgb(this.style.color),
            })
            this.y -= size + 5
        }
        const lineY = this.y + 2
        this.page.drawLine({
            start: { x: MARGIN, y: lineY },
            end: { x: MARGIN + 38, y: lineY },
            thickness: 2.5,
            color: hexToRgb(this.style.accent),
        })
        this.y -= spaceAfter + 2
    }

    eyebrow(text) {
        this.ensureSpace(18)
        this.page.drawText(ascii(text.toUpperCase()), {
            x: MARGIN, y: this.y, size: 8, font: this.fonts.bold,
            color: hexToRgb(this.style.accent), characterSpacing: 1.1,
        })
        this.y -= 16
    }

    bullets(items, { size = 9.8, lineHeight = 14.2, gap = 4 } = {}) {
        for (const item of items) {
            const lines = wrapText(item, this.fonts.regular, size, CONTENT_WIDTH - 16)
            const height = lines.length * lineHeight + gap
            this.ensureSpace(height)
            this.page.drawCircle({
                x: MARGIN + 3.5, y: this.y + 3.4, size: 2.2,
                color: hexToRgb(this.style.accent),
            })
            for (const line of lines) {
                this.page.drawText(line, {
                    x: MARGIN + 14, y: this.y, size, font: this.fonts.regular,
                    color: rgb(0.15, 0.19, 0.25),
                })
                this.y -= lineHeight
            }
            this.y -= gap
        }
        this.y -= 2
    }

    numbered(items, { size = 9.8, lineHeight = 14.2, gap = 5 } = {}) {
        items.forEach((item, index) => {
            const lines = wrapText(item, this.fonts.regular, size, CONTENT_WIDTH - 22)
            const height = lines.length * lineHeight + gap
            this.ensureSpace(height)
            this.page.drawText(`${index + 1}.`, {
                x: MARGIN, y: this.y, size, font: this.fonts.bold,
                color: hexToRgb(this.style.color),
            })
            for (const line of lines) {
                this.page.drawText(line, {
                    x: MARGIN + 20, y: this.y, size, font: this.fonts.regular,
                    color: rgb(0.15, 0.19, 0.25),
                })
                this.y -= lineHeight
            }
            this.y -= gap
        })
        this.y -= 2
    }

    callout(title, body) {
        const titleLines = wrapText(title, this.fonts.bold, 9.5, CONTENT_WIDTH - 30)
        const bodyLines = wrapText(body, this.fonts.regular, 9.2, CONTENT_WIDTH - 30)
        const height = titleLines.length * 12 + bodyLines.length * 13 + 22
        this.ensureSpace(height + 8)
        const top = this.y + 4
        this.page.drawRectangle({
            x: MARGIN, y: top - height, width: CONTENT_WIDTH, height,
            color: rgb(0.98, 0.96, 0.9),
        })
        this.page.drawRectangle({
            x: MARGIN, y: top - height, width: 4, height,
            color: hexToRgb(this.style.accent),
        })
        let cursor = top - 14
        for (const line of titleLines) {
            this.page.drawText(line, {
                x: MARGIN + 15, y: cursor, size: 9.5, font: this.fonts.bold,
                color: hexToRgb(this.style.color),
            })
            cursor -= 12
        }
        cursor -= 2
        for (const line of bodyLines) {
            this.page.drawText(line, {
                x: MARGIN + 15, y: cursor, size: 9.2, font: this.fonts.regular,
                color: rgb(0.2, 0.23, 0.28),
            })
            cursor -= 13
        }
        this.y = top - height - 12
    }

    checklist(items) {
        for (const item of items) {
            const lines = wrapText(item, this.fonts.regular, 9.6, CONTENT_WIDTH - 22)
            const height = lines.length * 14 + 5
            this.ensureSpace(height)
            this.page.drawRectangle({
                x: MARGIN, y: this.y - 1.5, width: 9, height: 9,
                borderColor: hexToRgb(this.style.color), borderWidth: 1,
                color: rgb(1, 1, 1),
            })
            for (const line of lines) {
                this.page.drawText(line, {
                    x: MARGIN + 18, y: this.y, size: 9.6, font: this.fonts.regular,
                    color: rgb(0.15, 0.19, 0.25),
                })
                this.y -= 14
            }
            this.y -= 5
        }
        this.y -= 2
    }

    divider() {
        this.ensureSpace(16)
        this.y -= 4
        this.page.drawLine({
            start: { x: MARGIN, y: this.y },
            end: { x: A4.width - MARGIN, y: this.y },
            thickness: 0.5, color: rgb(0.88, 0.9, 0.93),
        })
        this.y -= 12
    }
}

export async function buildPackPdf(pack) {
    const doc = await PDFDocument.create()
    const fonts = {
        regular: await doc.embedFont(StandardFonts.Helvetica),
        bold: await doc.embedFont(StandardFonts.HelveticaBold),
        oblique: await doc.embedFont(StandardFonts.HelveticaOblique),
    }
    const style = DOMAIN_STYLES[pack.domain]
    if (!style) throw new Error(`Unknown domain style: ${pack.domain}`)

    doc.setTitle(pack.title)
    doc.setAuthor('ZikShare Academic Vault')
    doc.setSubject(`${pack.domain} study pack for UNIZIK 100 level students`)
    doc.setKeywords(pack.tags || [])
    doc.setCreator('ZikShare (zikshare.app)')
    doc.setProducer('ZikShare Academic Vault')

    const writer = new PdfWriter(doc, {
        fonts, style,
        meta: { domain: `${pack.domain} | ${pack.title}` },
    })

    drawCover(doc, fonts, style, pack)

    // ── About this pack ──
    writer.newPage()
    writer.eyebrow('Start here')
    writer.heading('Why this pack exists', { spaceBefore: 0 })
    writer.paragraph(pack.description)
    writer.paragraph(
        'This is a student-written study companion, not a reproduced lecture handout or a leaked examination paper. ' +
        'Use it to organise the topics you are taught, practise the kind of thinking your course rewards, and walk into class with better questions.',
        { spaceAfter: 6 }
    )

    writer.heading('What you will be able to do')
    writer.bullets(pack.outcomes)

    writer.heading('How to use this pack')
    writer.numbered(pack.howToUse || [
        'Skim the whole pack once in 20 minutes so you know what is inside.',
        'Work through one section at a time with your lecture note and recommended text beside you.',
        'Attempt the practice questions before reading the answers. Mark what you missed.',
        'Use the final checklist to plan your revision week, one tick per study session.',
    ])

    writer.callout(
        'Confirm your official course outline',
        `Course codes, credit units and outlines can differ by department and session. Treat this pack as supplementary support and confirm the current outline with your lecturer, course rep or departmental handbook before an assessment.`
    )

    // ── Content sections ──
    pack.sections.forEach((section, index) => {
        writer.heading(section.heading, { spaceBefore: index === 0 ? 4 : 12 })
        if (section.intro) writer.paragraph(section.intro)
        if (section.paragraphs) {
            section.paragraphs.forEach((p) => writer.paragraph(p))
        }
        if (section.bullets) writer.bullets(section.bullets)
        if (section.numbered) writer.numbered(section.numbered)
        if (section.callout) writer.callout(section.callout.title, section.callout.body)
    })

    // ── Practice ──
    if (pack.practice?.length) {
        writer.newPage()
        writer.eyebrow('Practice, not prediction')
        writer.heading('Check your understanding', { spaceBefore: 0 })
        writer.paragraph(
            'These questions are written for this pack to test the ideas above. They are not past examination questions and do not predict what your lecturer will set. Answer first, then compare.',
            { size: 9.4, spaceAfter: 10 }
        )
        pack.practice.forEach((item, i) => {
            writer.ensureSpace(40)
            writer.paragraph(`${i + 1}. ${item.q}`, { size: 10, spaceAfter: 3, color: rgb(0.08, 0.12, 0.18) })
            writer.paragraph(`Answer: ${item.a}`, { size: 9.4, spaceAfter: 12, color: rgb(0.3, 0.35, 0.42) })
        })
    }

    // ── Checklist / plan ──
    if (pack.checklist?.length) {
        writer.heading('Your 7-step action plan')
        writer.paragraph('Tick each step only when you have done it. A tick you cannot defend is worse than an empty box.', {
            size: 9.4, spaceAfter: 8,
        })
        writer.checklist(pack.checklist)
    }

    // ── Closing ──
    writer.ensureSpace(230)
    writer.divider()
    writer.heading('Keep going', { spaceBefore: 0 })
    writer.paragraph(
        'One pack will not carry a semester. Pair this with your lecture notes, tutorials, and the past questions your department actually releases. ' +
        'If a topic still feels unclear, take a specific question to your lecturer or course rep - "I do not understand the difference between X and Y" gets a better answer than "I do not understand this course".'
    )
    writer.callout(
        'More from the ZikShare Academic Vault',
        'Find faculty primers, study-skills guides, money and career packs, and digital-skills workbooks in the ZikShare Library. New packs are added every semester.'
    )
    writer.paragraph(
        `ZikShare Academic Vault  |  ${pack.domain}  |  ${pack.level}  |  2026 Fresher Edition`,
        { size: 8, color: rgb(0.45, 0.48, 0.52), spaceAfter: 0, font: fonts.oblique }
    )

    drawNotesPage(doc, fonts, style, pack)

    return doc
}

function drawNotesPage(doc, fonts, style, pack) {
    const page = doc.addPage([A4.width, A4.height])
    const base = hexToRgb(style.color)
    const accent = hexToRgb(style.accent)

    page.drawText('YOUR WORKSPACE', {
        x: MARGIN, y: A4.height - 72, size: 8, font: fonts.bold, color: accent, characterSpacing: 1.1,
    })
    page.drawText('Notes, questions and things to ask', {
        x: MARGIN, y: A4.height - 98, size: 16, font: fonts.bold, color: base,
    })
    page.drawText('Use this page in class or during revision. Write questions you could not answer instead of copying slides.', {
        x: MARGIN, y: A4.height - 120, size: 9.2, font: fonts.regular, color: rgb(0.35, 0.39, 0.45),
    })

    const prompts = [
        'Three ideas I can now explain without notes:',
        'A question I still cannot answer:',
        'For my lecturer or course rep:',
        'Next revision action and date:',
    ]

    let y = A4.height - 160
    for (const prompt of prompts) {
        page.drawText(ascii(prompt), {
            x: MARGIN, y, size: 9.6, font: fonts.bold, color: rgb(0.13, 0.17, 0.23),
        })
        y -= 12
        for (let i = 0; i < 4; i += 1) {
            page.drawLine({
                start: { x: MARGIN, y }, end: { x: A4.width - MARGIN, y },
                thickness: 0.5, color: rgb(0.83, 0.86, 0.9),
            })
            y -= 20
        }
        y -= 8
    }

    page.drawText(ascii(`${pack.title}`), {
        x: MARGIN, y: 74, size: 7.6, font: fonts.regular, color: rgb(0.55, 0.58, 0.62),
    })
    page.drawText('Page 1', {
        x: A4.width - MARGIN - fonts.regular.widthOfTextAtSize('Page 1', 7.2), y: 30,
        size: 7.2, font: fonts.regular, color: rgb(0.42, 0.45, 0.5),
    })
    page.drawLine({
        start: { x: MARGIN, y: 44 }, end: { x: A4.width - MARGIN, y: 44 },
        thickness: 0.5, color: rgb(0.85, 0.87, 0.9),
    })
    page.drawText(ascii(`ZikShare Academic Vault  |  ${pack.domain}`), {
        x: MARGIN, y: 30, size: 7.2, font: fonts.regular, color: rgb(0.42, 0.45, 0.5),
    })
}

function drawCover(doc, fonts, style, pack) {
    const page = doc.addPage([A4.width, A4.height])
    const base = hexToRgb(style.color)
    const accent = hexToRgb(style.accent)

    page.drawRectangle({ x: 0, y: 0, width: A4.width, height: A4.height, color: rgb(1, 1, 1) })
    page.drawRectangle({ x: 0, y: 330, width: A4.width, height: A4.height - 330, color: base })
    page.drawRectangle({ x: 0, y: 326, width: A4.width, height: 4, color: accent })

    // Decorative blocks kept inside the coloured band and behind the text column
    page.drawRectangle({ x: A4.width - 118, y: 470, width: 118, height: 210, color: base, opacity: 0.55 })
    page.drawRectangle({ x: A4.width - 74, y: 372, width: 74, height: 98, color: accent, opacity: 0.32 })
    page.drawRectangle({ x: MARGIN, y: 336, width: 52, height: 4, color: accent, opacity: 1 })

    page.drawText('ZikShare', {
        x: MARGIN, y: A4.height - 78, size: 23, font: fonts.bold, color: rgb(1, 1, 1),
    })
    page.drawText('ACADEMIC VAULT', {
        x: MARGIN, y: A4.height - 94, size: 8, font: fonts.bold, color: accent, characterSpacing: 2.2,
    })

    const pillLabel = 'UNIZIK FRESHER EDITION  |  2026'
    const pillWidth = fonts.bold.widthOfTextAtSize(pillLabel, 7.5) + 24
    page.drawRectangle({
        x: MARGIN, y: A4.height - 130, width: pillWidth, height: 20,
        borderColor: accent, borderWidth: 0.8, color: base, opacity: 0.9,
    })
    page.drawText(pillLabel, {
        x: MARGIN + 12, y: A4.height - 124, size: 7.5, font: fonts.bold, color: rgb(1, 1, 1),
    })

    const titleSize = 27
    const titleLines = wrapText(pack.title, fonts.bold, titleSize, CONTENT_WIDTH - 20)
    let titleY = 585
    for (const line of titleLines.slice(0, 5)) {
        page.drawText(line, { x: MARGIN, y: titleY, size: titleSize, font: fonts.bold, color: rgb(1, 1, 1) })
        titleY -= titleSize + 7
    }

    const subtitleLines = wrapText(pack.subtitle, fonts.regular, 11.5, CONTENT_WIDTH - 44)
    let subtitleY = titleY - 10
    for (const line of subtitleLines.slice(0, 3)) {
        page.drawText(line, { x: MARGIN, y: subtitleY, size: 11.5, font: fonts.regular, color: rgb(0.88, 0.9, 0.95) })
        subtitleY -= 17
    }

    page.drawText(style.label, {
        x: MARGIN, y: 296, size: 8.5, font: fonts.bold, color: accent, characterSpacing: 1.6,
    })
    page.drawText(ascii(pack.domain), {
        x: MARGIN, y: 272, size: 15, font: fonts.bold, color: rgb(0.1, 0.14, 0.2),
    })

    const meta = [
        pack.faculty,
        pack.department ? `${pack.department}  |  ${pack.level}` : pack.level,
    ].filter(Boolean)
    let metaY = 246
    for (const line of meta) {
        const lines = wrapText(line, fonts.regular, 9.5, CONTENT_WIDTH - 30)
        for (const l of lines) {
            page.drawText(l, { x: MARGIN, y: metaY, size: 9.5, font: fonts.regular, color: rgb(0.35, 0.39, 0.45) })
            metaY -= 14
        }
    }

    page.drawLine({
        start: { x: MARGIN, y: 168 }, end: { x: A4.width - MARGIN, y: 168 },
        thickness: 0.6, color: rgb(0.85, 0.87, 0.9),
    })

    page.drawText('Written for students, by students.', {
        x: MARGIN, y: 142, size: 10, font: fonts.bold, color: base,
    })
    page.drawText('Practical notes, worked examples, practice questions and a revision plan.', {
        x: MARGIN, y: 126, size: 8.8, font: fonts.regular, color: rgb(0.4, 0.44, 0.5),
    })
    page.drawText('Study smarter. Ask better questions. Pass with understanding.', {
        x: MARGIN, y: 110, size: 8.8, font: fonts.regular, color: rgb(0.4, 0.44, 0.5),
    })

    page.drawText('Independent study support | Not an official UNIZIK publication', {
        x: MARGIN, y: 62, size: 7.4, font: fonts.regular, color: rgb(0.55, 0.58, 0.62),
    })
    page.drawText('zikshare.app', {
        x: A4.width - MARGIN - fonts.bold.widthOfTextAtSize('zikshare.app', 8), y: 62,
        size: 8, font: fonts.bold, color: base,
    })
}

export async function buildPreviewPdf(doc, pages = 3) {
    const preview = await PDFDocument.create()
    const count = Math.min(pages, doc.getPageCount())
    const copied = await preview.copyPages(doc, Array.from({ length: count }, (_, i) => i))
    copied.forEach((p) => preview.addPage(p))
    preview.setTitle(`${doc.getTitle() || 'ZikShare pack'} (Preview)`)
    preview.setAuthor('ZikShare Academic Vault')
    preview.setSubject('Free preview - full pack available in the ZikShare Library')
    return preview
}

export function sha256(buffer) {
    return crypto.createHash('sha256').update(buffer).digest('hex')
}
