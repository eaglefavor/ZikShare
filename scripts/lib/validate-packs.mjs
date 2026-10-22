import { DOMAINS } from '../../library/content/domains.mjs'
import { UNIZIK_FACULTIES, ACADEMIC_LEVELS, ACADEMIC_MATERIAL_TYPES } from '../../src/lib/categories.js'

const FACULTY_NAMES = new Set(UNIZIK_FACULTIES.map((f) => f.name))
const LEVELS = new Set(ACADEMIC_LEVELS)
const MATERIAL_TYPES = new Set(ACADEMIC_MATERIAL_TYPES.map((t) => t.id))

/**
 * Structural validation for authored library packs.
 * Returns an array of human-readable problems; an empty array means valid.
 * Deliberately independent of the PDF builder so a pack cannot "pass" simply
 * because the renderer happened not to crash on it.
 */
export function validatePacks(packs, { minPacks = 50 } = {}) {
    const errors = []
    if (!Array.isArray(packs)) return ['packs is not an array']
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
        if (!Number.isInteger(pack.priceKobo) || pack.priceKobo < 10000) push('priceKobo must be an integer >= 10000')
        if (!Array.isArray(pack.tags) || pack.tags.length < 3) push('needs at least 3 tags')

        if (!Array.isArray(pack.outcomes) || pack.outcomes.length < 3) push('needs at least 3 outcomes')
        if (!Array.isArray(pack.sections) || pack.sections.length < 3) push('needs at least 3 sections')
        if (!Array.isArray(pack.practice) || pack.practice.length < 4) push('needs at least 4 practice questions')
        if (!Array.isArray(pack.checklist) || pack.checklist.length < 5) push('needs at least 5 checklist steps')

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

        for (const item of pack.practice || []) {
            if (!item?.q || !item?.a) push('practice item missing question or answer')
        }
    })

    return errors
}
