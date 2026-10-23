import { DOMAINS } from '../../library/content/domains.mjs'
import { UNIZIK_FACULTIES, ACADEMIC_LEVELS, ACADEMIC_MATERIAL_TYPES } from '../../src/lib/categories.js'

const FACULTY_NAMES = new Set(UNIZIK_FACULTIES.map((f) => f.name))
const LEVELS = new Set(ACADEMIC_LEVELS)
const MATERIAL_TYPES = new Set(ACADEMIC_MATERIAL_TYPES.map((t) => t.id))

const MIN_PACK_WORDS = 1200

/**
 * Word count of everything a reader actually receives in the PDF. Kept here
 * rather than imported from the builder so the validator can be run on its
 * own, but it must stay in step with buildPackPdf's rendered blocks.
 */
export function countWords(pack) {
    const text = [
        pack.title, pack.subtitle, pack.description,
        ...(pack.outcomes || []),
        ...(pack.sections || []).flatMap((s) => [
            s.heading, s.intro, ...(s.paragraphs || []), ...(s.bullets || []), ...(s.numbered || []),
            s.callout?.title, s.callout?.body,
        ]),
        ...(pack.workedExamples || []).flatMap((w) => [w.title, w.brief, ...(w.steps || []), w.takeaway]),
        ...(pack.examBank || []).flatMap((e) => [e.question, e.marks, ...(e.outline || []), e.trap]),
        ...(pack.glossary || []).flatMap((g) => [g.term, g.definition]),
        ...(pack.practice || []).flatMap((q) => [q.q, q.a]),
        ...(pack.checklist || []),
        ...(pack.weeklyPlan || []).flatMap((w) => [w.week, w.focus, ...(w.tasks || [])]),
        ...(pack.readingList || []),
    ].filter(Boolean).join(' ')
    return text.split(/\s+/).filter(Boolean).length
}

/**
 * Structural validation for authored library packs.
 * Returns an array of human-readable problems; an empty array means valid.
 * Deliberately independent of the PDF builder so a pack cannot "pass" simply
 * because the renderer happened not to crash on it.
 */
export function validatePacks(packs, { minPacks = 0 } = {}) {
    const errors = []
    if (!Array.isArray(packs)) return ['packs is not an array']
    // No global minimum: the shelf is allowed to be empty (it is, between a
    // clear-out and a new intake). Quality is enforced per pack below.
    if (packs.length < minPacks) errors.push(`only ${packs.length} packs authored; at least ${minPacks} required`)

    const slugs = new Set()
    const titles = new Set()

    packs.forEach((pack, i) => {
        const where = `pack #${i + 1} (${pack?.slug || 'missing slug'})`
        const push = (msg) => errors.push(`${where}: ${msg}`)

        if (!pack || typeof pack !== 'object') {
            errors.push(`pack #${i + 1}: not an object`)
            return
        }
        if (!pack.slug || !/^[a-z0-9-]+$/.test(pack.slug)) push('invalid slug')
        else if (slugs.has(pack.slug)) push('duplicate slug')
        else slugs.add(pack.slug)

        if (!pack.title || pack.title.length < 20) push('title too short')
        else if (titles.has(pack.title.toLowerCase())) push('duplicate title')
        else titles.add(pack.title.toLowerCase())

        if (!pack.subtitle || pack.subtitle.length < 20) push('subtitle too short')
        if (!pack.description || pack.description.length < 120) push('description too short')
        if (!DOMAINS.includes(pack.domain)) push(`unknown domain "${pack.domain}"`)
        if (!FACULTY_NAMES.has(pack.faculty)) push(`unknown faculty "${pack.faculty}"`)
        if (!LEVELS.has(pack.level)) push(`invalid level "${pack.level}"`)
        if (!MATERIAL_TYPES.has(pack.material_type)) push(`invalid material_type "${pack.material_type}"`)
        if (!MATERIAL_TYPES.has(pack.subcategory)) push(`invalid subcategory "${pack.subcategory}"`)
        if (pack.code !== null && (!pack.code || !/^[A-Z]{2,4} [0-9]{3}[A-Z]?$/.test(pack.code))) {
            push('code must be null or a course code like "GST 101"')
        }
        // The library is free by policy: a build with any paid pack must fail.
        if (pack.priceKobo !== 0) push(`priceKobo must be 0 (free library); found ${pack.priceKobo}`)
        if (!Array.isArray(pack.tags) || pack.tags.length < 3) push('needs at least 3 tags')

        if (!Array.isArray(pack.outcomes) || pack.outcomes.length < 3) push('needs at least 3 outcomes')
        if (!Array.isArray(pack.sections) || pack.sections.length < 3) push('needs at least 3 sections')
        if (!Array.isArray(pack.practice) || pack.practice.length < 4) push('needs at least 4 practice questions')
        if (!Array.isArray(pack.checklist) || pack.checklist.length < 5) push('needs at least 5 checklist steps')

        // Depth gate. A pack that clears the structural checks but carries a
        // few hundred words of prose is a placeholder with a cover page, and
        // that is exactly what this library must not ship. Each study pack has
        // to carry real teaching material: worked examples, exam-style
        // questions with model outlines, a glossary, a revision plan and a
        // reading list, on top of substantive explanatory sections.
        const depthWords = countWords(pack)
        if (depthWords < MIN_PACK_WORDS) {
            push(`only ${depthWords} words of content; at least ${MIN_PACK_WORDS} required (add worked examples, exam bank, glossary, weekly plan)`)
        }
        if (!Array.isArray(pack.workedExamples) || pack.workedExamples.length < 2) {
            push('needs at least 2 worked examples')
        }
        if (!Array.isArray(pack.examBank) || pack.examBank.length < 2) {
            push('needs at least 2 exam-style questions with model outlines')
        }
        if (!Array.isArray(pack.glossary) || pack.glossary.length < 8) {
            push('needs at least 8 glossary terms')
        }
        if (!Array.isArray(pack.weeklyPlan) || pack.weeklyPlan.length < 4) {
            push('needs a four-week study plan')
        }
        if (!Array.isArray(pack.readingList) || pack.readingList.length < 3) {
            push('needs at least 3 reading-list entries')
        }

        for (const section of pack.sections || []) {
            if (!section?.heading) {
                push('section missing heading')
                continue
            }
            const body = [
                section.intro,
                ...(section.paragraphs || []),
                ...(section.bullets || []),
                ...(section.numbered || []),
                section.callout?.body,
            ].filter(Boolean).join(' ')
            if (body.length < 120) push(`section "${section.heading}" is too thin (${body.length} chars)`)
        }

        if (pack.archive !== undefined) {
            const archive = pack.archive
            if (!archive || !Array.isArray(archive.sessions) || archive.sessions.length < 2) {
                push('archive must contain at least 2 year-demarcated sessions')
            } else {
                const years = new Set()
                for (const session of archive.sessions) {
                    if (!session.year) push('archive session missing year')
                    else if (years.has(session.year)) push(`duplicate archive year "${session.year}"`)
                    else years.add(session.year)
                    if (!session.label) push(`archive session ${session.year || '?'} missing label`)
                    if (!['archived', 'current', 'superseded'].includes(session.status)) push(`archive session ${session.year || '?'} has invalid status "${session.status}"`)
                    if (!Array.isArray(session.topics) || session.topics.length < 3) push(`archive session ${session.year || '?'} needs at least 3 topics`)
                    if (session.status !== 'current' && !session.source) push(`archive session ${session.year || '?'} needs a source note`)
                }
                if (!archive.sessions.some((s) => s.status === 'current')) push('archive must mark one session as current')
            }
        }

        for (const item of pack.practice || []) {
            if (!item?.q || !item?.a) push('practice item missing question or answer')
        }
    })

    return errors
}
