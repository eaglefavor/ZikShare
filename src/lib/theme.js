/**
 * Light and dark, chosen by the reader and remembered.
 *
 * The library is read at night on a phone, so a theme is not decoration. Three
 * settings — system, light, dark — resolved to one concrete value and written to
 * `<html data-theme>`, which is what the stylesheet switches on. Resolving
 * "system" here rather than in CSS keeps one source of truth: the page never
 * sits in a half-applied state, and the tests can assert the resolved value.
 */

const KEY = 'zikshare:theme'

export const THEMES = [
    { id: 'system', label: 'Match my phone', hint: 'Light by day, dark after sunset, following your device.' },
    { id: 'light', label: 'Light', hint: 'Dark text on a pale page.' },
    { id: 'dark', label: 'Dark', hint: 'Pale text on a deep navy page, easier at night.' },
]

function prefersDark() {
    try {
        return window.matchMedia?.('(prefers-color-scheme: dark)').matches === true
    } catch {
        return false
    }
}

/** What the reader chose: 'system' | 'light' | 'dark'. */
export function getThemePreference() {
    try {
        const stored = localStorage.getItem(KEY)
        return THEMES.some((theme) => theme.id === stored) ? stored : 'system'
    } catch {
        return 'system'
    }
}

/** The theme that is actually shown: 'light' | 'dark'. */
export function resolveTheme(preference = getThemePreference()) {
    if (preference === 'light' || preference === 'dark') return preference
    return prefersDark() ? 'dark' : 'light'
}

/** Writes the resolved theme onto <html>, where the stylesheet reads it. */
export function applyTheme(preference = getThemePreference()) {
    if (typeof document === 'undefined') return resolveTheme(preference)
    const resolved = resolveTheme(preference)
    document.documentElement.setAttribute('data-theme', resolved)
    document.documentElement.style.colorScheme = resolved
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', resolved === 'dark' ? '#0B1220' : '#3B82F6')
    return resolved
}

export function setThemePreference(preference) {
    try {
        localStorage.setItem(KEY, preference)
    } catch {
        // private mode: the choice lasts for this visit only
    }
    return applyTheme(preference)
}

/**
 * Keeps "system" live: if the phone turns dark at sunset while the tab is open,
 * the page follows without a reload. Returns a cleanup function.
 */
export function watchSystemTheme(onChange) {
    if (typeof window === 'undefined' || !window.matchMedia) return () => {}
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
        if (getThemePreference() !== 'system') return
        onChange(applyTheme('system'))
    }
    query.addEventListener?.('change', handler)
    return () => query.removeEventListener?.('change', handler)
}
