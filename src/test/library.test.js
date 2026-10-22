import { describe, it, expect } from 'vitest'
import { 
    formatCourseCode, 
    isOfficialZikShareAccount, 
    ACADEMIC_MATERIAL_TYPES, 
    UNIZIK_FACULTIES, 
    ACADEMIC_LEVELS 
} from '../lib/categories'
import { FRESHER_LIBRARY_PACKS } from '../lib/fresherLibrary'

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
        it('contains a full fresher PDF catalog rather than a placeholder set', () => {
            expect(FRESHER_LIBRARY_PACKS.length).toBeGreaterThanOrEqual(50)
        })

        it('ensures every study pack is free and has valid course metadata with measured page counts', () => {
            const facultyNames = new Set(UNIZIK_FACULTIES.map(f => f.name))

            for (const pack of FRESHER_LIBRARY_PACKS) {
                expect(pack.slug).toBeDefined()
                expect(pack.title.length).toBeGreaterThan(10)
                expect(Number.isInteger(pack.priceKobo)).toBe(true)
                // Free library: no pack may reintroduce a fee before download.
                expect(pack.priceKobo).toBe(0)
                expect(ACADEMIC_LEVELS).toContain(pack.level)
                expect(facultyNames.has(pack.faculty)).toBe(true)
                expect(pack.page_count).toBeGreaterThanOrEqual(5)
                expect(pack.file_size_bytes).toBeGreaterThan(0)
                expect(pack.preview_path).toMatch(/^\/library\/previews\/.+\.pdf$/)
                expect(pack.download_path).toMatch(/^\/library\/packs\/.+\.pdf$/)
            }
        })

        it('covers key GST foundational courses (GST 101, 102, 103, 104, 105, 107)', () => {
            const codes = FRESHER_LIBRARY_PACKS.map(p => p.code)
            expect(codes).toContain('GST 101')
            expect(codes).toContain('GST 102')
            expect(codes).toContain('GST 103')
            expect(codes).toContain('GST 104')
            expect(codes).toContain('GST 105')
            expect(codes).toContain('GST 107')
        })

        it('covers key foundational courses across medical, engineering, science, law and arts faculties', () => {
            const facultiesRepresented = new Set(FRESHER_LIBRARY_PACKS.map(p => p.faculty))
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
