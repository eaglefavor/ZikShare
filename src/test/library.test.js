import { describe, it, expect } from 'vitest'
import { 
    formatCourseCode, 
    isOfficialZikShareAccount, 
    ACADEMIC_MATERIAL_TYPES, 
    UNIZIK_FACULTIES, 
    ACADEMIC_LEVELS 
} from '../lib/categories'
import { UNIZIK_OFFICIAL_STUDY_PACKS } from '../lib/academicCatalogData'

describe('UNIZIK Digital Library & Academic Repository Suite', () => {
    describe('Course Code Formatting & Normalization', () => {
        it('properly formats lowercase unspaced course codes', () => {
            expect(formatCourseCode('gst101')).toBe('GST 101')
            expect(formatCourseCode('feg280')).toBe('FEG 280')
            expect(formatCourseCode('mth101')).toBe('MTH 101')
            expect(formatCourseCode('law101')).toBe('LAW 101')
            expect(formatCourseCode('ced341')).toBe('CED 341')
        })

        it('handles spaced or messy course codes', () => {
            expect(formatCourseCode(' GST  112 ')).toBe('GST 112')
            expect(formatCourseCode('eee311')).toBe('EEE 311')
        })

        it('safely handles empty or null inputs', () => {
            expect(formatCourseCode('')).toBe('')
            expect(formatCourseCode(null)).toBe('')
            expect(formatCourseCode(undefined)).toBe('')
        })
    })

    describe('Official Account Verification', () => {
        it('identifies official ZikShare institutional emails', () => {
            expect(isOfficialZikShareAccount('rc5632250@gmail.com')).toBe(true)
            expect(isOfficialZikShareAccount('RC5632250@GMAIL.COM')).toBe(true)
            expect(isOfficialZikShareAccount('admin@zikshare.com')).toBe(true)
        })

        it('rejects regular student emails from official account privileges', () => {
            expect(isOfficialZikShareAccount('student123@unizik.edu.ng')).toBe(false)
            expect(isOfficialZikShareAccount('chidi.okafor@gmail.com')).toBe(false)
            expect(isOfficialZikShareAccount('')).toBe(false)
            expect(isOfficialZikShareAccount(null)).toBe(false)
        })
    })

    describe('Curated Ingestion Catalog Dataset Integrity', () => {
        it('contains high-yield study packs across core courses', () => {
            expect(UNIZIK_OFFICIAL_STUDY_PACKS.length).toBeGreaterThanOrEqual(15)
        })

        it('ensures every study pack has valid course metadata and kobo pricing', () => {
            const facultyNames = new Set(UNIZIK_FACULTIES.map(f => f.name))

            for (const pack of UNIZIK_OFFICIAL_STUDY_PACKS) {
                expect(pack.code).toBeDefined()
                expect(pack.code.length).toBeGreaterThan(3)
                expect(pack.title).toBeDefined()
                expect(pack.title.length).toBeGreaterThan(10)
                expect(pack.priceKobo).toBeGreaterThan(0)
                expect(Number.isInteger(pack.priceKobo)).toBe(true)
                expect(pack.level).toBeDefined()
                expect(ACADEMIC_LEVELS).toContain(pack.level)
                expect(facultyNames.has(pack.faculty)).toBe(true)
                expect(pack.category).toBe('Academic & Study Materials')
                expect(pack.is_official).toBe(true)
            }
        })

        it('covers key GST foundational courses (GST 101, 102, 103, 110, 112, CED 341)', () => {
            const codes = UNIZIK_OFFICIAL_STUDY_PACKS.map(p => p.code)
            expect(codes).toContain('GST 101')
            expect(codes).toContain('GST 102')
            expect(codes).toContain('GST 103')
            expect(codes).toContain('GST 110')
            expect(codes).toContain('GST 112')
            expect(codes).toContain('CED 341')
        })

        it('covers key foundational courses across medical, engineering, science, law, and arts faculties', () => {
            const facultiesRepresented = new Set(UNIZIK_OFFICIAL_STUDY_PACKS.map(p => p.faculty))
            expect(facultiesRepresented.has('Faculty of Engineering')).toBe(true)
            expect(facultiesRepresented.has('Faculty of Physical Sciences')).toBe(true)
            expect(facultiesRepresented.has('Faculty of Management Sciences')).toBe(true)
            expect(facultiesRepresented.has('Faculty of Law')).toBe(true)
            expect(facultiesRepresented.has('Faculty of Bio-Sciences')).toBe(true)
            expect(facultiesRepresented.has('Faculty of Social Sciences')).toBe(true)
            expect(facultiesRepresented.has('Faculty of Agriculture')).toBe(true)
            expect(facultiesRepresented.has('Faculty of Basic Medical Sciences')).toBe(true)
            expect(facultiesRepresented.has('Faculty of Medicine')).toBe(true)
            expect(facultiesRepresented.has('Faculty of Pharmaceutical Sciences')).toBe(true)
            expect(facultiesRepresented.has('Faculty of Education')).toBe(true)
            expect(facultiesRepresented.has('Faculty of Environmental Sciences')).toBe(true)
        })
    })

    describe('Academic Material Types Taxonomy', () => {
        it('includes all primary study material classifications', () => {
            const typeIds = ACADEMIC_MATERIAL_TYPES.map(t => t.id)
            expect(typeIds).toContain('past-questions')
            expect(typeIds).toContain('lecture-notes')
            expect(typeIds).toContain('textbooks')
            expect(typeIds).toContain('lab-manuals')
            expect(typeIds).toContain('project-materials')
        })
    })
})
