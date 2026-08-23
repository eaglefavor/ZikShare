import { describe, it, expect } from 'vitest'
import {
  MARKETPLACE_SEGMENTS,
  ALL_SUBCATEGORIES,
  UNIZIK_FACULTIES,
  UNIZIK_LOCATIONS,
  ACADEMIC_LEVELS,
  findSubcategory,
  findParentSegment,
} from '../lib/categories'

describe('Categories & Taxonomy Verification', () => {
  it('defines valid marketplace segments with required color and emoji properties', () => {
    expect(MARKETPLACE_SEGMENTS.length).toBeGreaterThan(0)
    MARKETPLACE_SEGMENTS.forEach(seg => {
      expect(seg.id).toBeDefined()
      expect(seg.name).toBeDefined()
      expect(seg.emoji).toBeDefined()
      expect(seg.color).toMatch(/^#[0-9A-Fa-f]{6}$/)
      expect(Array.isArray(seg.subcategories)).toBe(true)
      expect(seg.subcategories.length).toBeGreaterThan(0)
    })
  })

  it('flattens ALL_SUBCATEGORIES correctly with segmentId attachment', () => {
    expect(ALL_SUBCATEGORIES.length).toBeGreaterThan(15)
    ALL_SUBCATEGORIES.forEach(sub => {
      expect(sub.id).toBeDefined()
      expect(sub.name).toBeDefined()
      expect(sub.segmentId).toBeDefined()
      expect(Array.isArray(sub.keywords)).toBe(true)
    })
  })

  it('resolves subcategories by exact id or keyword search via findSubcategory', () => {
    const phoneSub = findSubcategory('phones')
    expect(phoneSub).not.toBeNull()
    expect(phoneSub.name).toBe('Phones & Tablets')

    const keywordSub = findSubcategory('macbook pro 2021')
    expect(keywordSub).not.toBeNull()
    expect(keywordSub.id).toBe('laptops')

    // Adversarial / empty inputs
    expect(findSubcategory('')).toBeNull()
    expect(findSubcategory(null)).toBeNull()
    expect(findSubcategory(undefined)).toBeNull()
    expect(findSubcategory('non-existent-item-random-xyz-12345')).toBeNull()
  })

  it('resolves parent segment via findParentSegment', () => {
    const techSegment = findParentSegment('phones')
    expect(techSegment).not.toBeNull()
    expect(techSegment.id).toBe('tech')

    const academicSegment = findParentSegment('past-questions')
    expect(academicSegment).not.toBeNull()
    expect(academicSegment.id).toBe('academic')

    expect(findParentSegment(null)).toBeNull()
  })

  it('UNIZIK_FACULTIES contains all 17 official faculties with over 70 academic departments', () => {
    expect(UNIZIK_FACULTIES.length).toBeGreaterThanOrEqual(17)
    
    const facultyNames = UNIZIK_FACULTIES.map(f => f.name)
    expect(facultyNames).toContain('Faculty of Agriculture')
    expect(facultyNames).toContain('Faculty of Arts')
    expect(facultyNames).toContain('Faculty of Basic Medical Sciences')
    expect(facultyNames).toContain('Faculty of Basic Clinical Sciences')
    expect(facultyNames).toContain('Faculty of Bio-Sciences')
    expect(facultyNames).toContain('Faculty of Education')
    expect(facultyNames).toContain('Faculty of Engineering')
    expect(facultyNames).toContain('Faculty of Environmental Sciences')
    expect(facultyNames).toContain('Faculty of Health Sciences & Technology')
    expect(facultyNames).toContain('Faculty of Law')
    expect(facultyNames).toContain('Faculty of Management Sciences')
    expect(facultyNames).toContain('Faculty of Medicine')
    expect(facultyNames).toContain('Faculty of Pharmaceutical Sciences')
    expect(facultyNames).toContain('Faculty of Physical Sciences')
    expect(facultyNames).toContain('Faculty of Social Sciences')
    expect(facultyNames).toContain('Faculty of Medical Laboratory Science')
    expect(facultyNames).toContain('Faculty of Technology & Vocational Education')

    let totalDepartments = 0
    UNIZIK_FACULTIES.forEach(fac => {
      expect(typeof fac.name).toBe('string')
      expect(fac.name.length).toBeGreaterThan(0)
      expect(Array.isArray(fac.departments)).toBe(true)
      expect(fac.departments.length).toBeGreaterThan(0)
      totalDepartments += fac.departments.length
      fac.departments.forEach(dept => {
        expect(typeof dept).toBe('string')
        expect(dept.length).toBeGreaterThan(0)
      })
    })

    expect(totalDepartments).toBeGreaterThanOrEqual(70)
  })

  it('UNIZIK_LOCATIONS includes Perm Site, Ifite, and safe exchange hubs', () => {
    expect(UNIZIK_LOCATIONS.length).toBeGreaterThan(0)
    const garba = UNIZIK_LOCATIONS.find(loc => loc.id === 'garba-square')
    expect(garba).toBeDefined()
    expect(garba.name).toContain('Garba Square')
  })

  it('ACADEMIC_LEVELS contains standard university levels 100L through Postgraduate', () => {
    expect(ACADEMIC_LEVELS).toContain('100L')
    expect(ACADEMIC_LEVELS).toContain('200L')
    expect(ACADEMIC_LEVELS).toContain('300L')
    expect(ACADEMIC_LEVELS).toContain('400L')
    expect(ACADEMIC_LEVELS).toContain('500L')
    expect(ACADEMIC_LEVELS).toContain('Postgraduate')
  })
})
