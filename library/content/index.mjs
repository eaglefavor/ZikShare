import { GST_PACKS } from './gst.mjs'
import { FACULTY_PRIMER_PACKS_A } from './faculty-primers-a.mjs'
import { FACULTY_PRIMER_PACKS_B } from './faculty-primers-b.mjs'
import { FACULTY_PRIMER_PACKS_C } from './faculty-primers-c.mjs'
import { STUDY_AND_CAMPUS_PACKS } from './study-and-campus.mjs'
import { MONEY_DIGITAL_HEALTH_PACKS } from './money-digital-health.mjs'
import { THEATRE_FILM_PACKS } from './theatre-film.mjs'
import { ARTS_DEPARTMENT_PACKS } from './arts-departments.mjs'

export const FRESHER_PACKS = [
    ...GST_PACKS,
    ...FACULTY_PRIMER_PACKS_A,
    ...FACULTY_PRIMER_PACKS_B,
    ...FACULTY_PRIMER_PACKS_C,
    ...STUDY_AND_CAMPUS_PACKS,
    ...MONEY_DIGITAL_HEALTH_PACKS,
    // Faculty of Arts carries the deepest coverage; Theatre & Film Studies
    // keeps the only year-demarcated outline archive.
    ...ARTS_DEPARTMENT_PACKS,
    ...THEATRE_FILM_PACKS,
]
