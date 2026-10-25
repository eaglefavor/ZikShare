import { useEffect, useState } from 'react'
import { Moon, Sun, Smartphone } from 'lucide-react'
import { THEMES, applyTheme, getThemePreference, resolveTheme, setThemePreference, watchSystemTheme } from '../lib/theme'

const ICONS = { system: Smartphone, light: Sun, dark: Moon }

/**
 * Three choices, not a switch: matching the phone is what most readers want,
 * and a plain on/off would take that away from them.
 */
export default function ThemeToggle({ compact = false }) {
    const [preference, setPreference] = useState(() => getThemePreference())
    const [resolved, setResolved] = useState(() => resolveTheme())

    useEffect(() => {
        setResolved(applyTheme(preference))
        return watchSystemTheme(setResolved)
    }, [preference])

    const choose = (id) => {
        setPreference(id)
        setThemePreference(id)
    }

    return (
        <div className={compact ? 'zs-theme zs-theme--compact' : 'zs-theme'}>
            <div className="zs-theme__row" role="radiogroup" aria-label="Appearance">
                {THEMES.map((theme) => {
                    const Icon = ICONS[theme.id]
                    const active = preference === theme.id
                    return (
                        <button
                            key={theme.id}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            className={`zs-theme__option${active ? ' is-active' : ''}`}
                            onClick={() => choose(theme.id)}
                        >
                            <Icon size={14} aria-hidden="true" /> {theme.label}
                        </button>
                    )
                })}
            </div>
            {!compact && (
                <p className="zs-theme__hint">
                    {THEMES.find((theme) => theme.id === preference)?.hint}
                    {preference === 'system' ? ` Right now: ${resolved}.` : ''}
                </p>
            )}
        </div>
    )
}
