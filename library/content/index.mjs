import { GST_PACKS } from './gst.mjs'
import { FACULTY_PRIMER_PACKS_A } from './faculty-primers-a.mjs'
import { FACULTY_PRIMER_PACKS_B } from './faculty-primers-b.mjs'
import { FACULTY_PRIMER_PACKS_C } from './faculty-primers-c.mjs'
import { STUDY_AND_CAMPUS_PACKS } from './study-and-campus.mjs'
import { MONEY_DIGITAL_HEALTH_PACKS } from './money-digital-health.mjs'

export const FRESHER_PACKS = [
    ...GST_PACKS,
    ...FACULTY_PRIMER_PACKS_A,
    ...FACULTY_PRIMER_PACKS_B,
    ...FACULTY_PRIMER_PACKS_C,
    ...STUDY_AND_CAMPUS_PACKS,
    ...MONEY_DIGITAL_HEALTH_PACKS,
]
