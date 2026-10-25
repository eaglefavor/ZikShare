import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  THEMES,
  applyTheme,
  getThemePreference,
  resolveTheme,
  setThemePreference,
} from '../lib/theme'
import ThemeToggle from '../components/ThemeToggle'

function mockSystemDark(dark) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: dark && query.includes('dark'),
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }))
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
  mockSystemDark(false)
})

afterEach(() => {
  delete window.matchMedia
})

describe('Appearance', () => {
  it('offers three choices, and follows the phone by default', () => {
    expect(THEMES.map((theme) => theme.id)).toEqual(['system', 'light', 'dark'])
    expect(getThemePreference()).toBe('system')
    expect(resolveTheme('system')).toBe('light')
  })

  it('resolves "system" to dark when the phone is dark', () => {
    mockSystemDark(true)
    expect(resolveTheme('system')).toBe('dark')
    // ...but an explicit choice still wins over the phone.
    expect(resolveTheme('light')).toBe('light')
    expect(resolveTheme('dark')).toBe('dark')
  })

  it('writes the resolved theme where the stylesheet reads it', () => {
    expect(applyTheme('dark')).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(document.documentElement.style.colorScheme).toBe('dark')

    applyTheme('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('remembers the choice across visits', () => {
    setThemePreference('dark')
    expect(localStorage.getItem('zikshare:theme')).toBe('dark')
    expect(getThemePreference()).toBe('dark')
  })

  it('ignores a stored value it does not understand', () => {
    localStorage.setItem('zikshare:theme', 'purple')
    expect(getThemePreference()).toBe('system')
  })

  it('lets a reader pick a theme from the control', () => {
    render(<ThemeToggle />)

    fireEvent.click(screen.getByRole('radio', { name: /Dark/i }))
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(screen.getByRole('radio', { name: /Dark/i })).toHaveAttribute('aria-checked', 'true')

    fireEvent.click(screen.getByRole('radio', { name: /Light/i }))
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })
})

describe('The dark palette', () => {
  const css = fs.readFileSync(path.join(process.cwd(), 'src', 'index.css'), 'utf8')

  it('defines a dark value for every surface and text token', () => {
    const darkBlock = css.slice(css.indexOf("html[data-theme='dark']"))
    for (const token of [
      '--color-surface',
      '--color-surface-2',
      '--color-background',
      '--color-canvas',
      '--color-text-primary',
      '--color-text-secondary',
      '--color-text-muted',
      '--color-border',
      '--color-link',
    ]) {
      expect(darkBlock).toContain(`${token}:`)
    }
  })

  it('gives the page background to the tokens, not to a fixed hex', () => {
    const body = css.slice(css.indexOf('body {'))
    expect(body).toContain('var(--color-background)')
    expect(body).toContain('var(--color-canvas)')
  })

  /**
   * The pages had a light page's colours written into inline styles, which a
   * stylesheet cannot override. These are the reader-facing screens, and the
   * ones that would go unreadable in the dark if a hex crept back in.
   */
  const READER_PAGES = [
    'src/pages/HomePage.jsx',
    'src/pages/LibraryPage.jsx',
    'src/pages/LibraryDocumentPage.jsx',
    'src/pages/OfflineLibraryPage.jsx',
    'src/pages/SearchPage.jsx',
    'src/pages/BookDetailPage.jsx',
    'src/pages/HelpPage.jsx',
  ]

  it('leaves no light surface colour in the reader-facing pages', () => {
    const lightSurfaces = /(backgroundColor|background):\s*'(#FFFFFF|#F8FAFC|#F1F5F9|#EFF6FF|white)'/i
    for (const file of READER_PAGES) {
      const source = fs.readFileSync(path.join(process.cwd(), file), 'utf8')
      expect(lightSurfaces.test(source), `${file} still sets a light surface inline`).toBe(false)
    }
  })
})
