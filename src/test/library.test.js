import { describe, it, expect } from 'vitest'
import { 
    formatCourseCode, 
    isOfficialZikShareAccount, 
    ACADEMIC_MATERIAL_TYPES, 
    UNIZIK_FACULTIES, 
    ACADEMIC_LEVELS 
} from '../lib/categories'
import { FRESHER_LIBRARY_PACKS } from '../lib/fresherLibrary'
import { CHRISTIAN_BOOKS } from '../lib/christianBooks'

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

    describe('Library contents after the shelves were cleared', () => {
        it('holds no authored packs until new material is added', () => {
            expect(FRESHER_LIBRARY_PACKS).toEqual([])
        })

        it('validates every pack that is present, whenever one is added', () => {
            // Guard rails for the incoming GST / Theatre material: whatever is
            // in the catalog must be free, measurable and correctly classified.
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

        it('keeps the Christian Books shelf as the one shelf with documents', () => {
            expect(CHRISTIAN_BOOKS.length).toBeGreaterThan(0)
            for (const book of CHRISTIAN_BOOKS) {
                expect(book.domain).toBe('Christian Books')
                expect(book.page_count).toBeGreaterThan(1)
            }
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
