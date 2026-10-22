/**
 * Small UI primitives shared by every screen.
 *
 * These exist so a page never has to invent a colour, a size or a shadow. If a
 * screen needs something that is not here, add it here rather than inline.
 * See docs/ui-ux-revamp.md §6.
 */
import { Search as SearchIcon, X } from 'lucide-react'

export function Button({
    as: Tag = 'button',
    variant = 'primary',
    size,
    block = false,
    className = '',
    children,
    ...rest
}) {
    const classes = [
        'zs-btn',
        `zs-btn--${variant}`,
        size === 'sm' ? 'zs-btn--sm' : '',
        block ? 'zs-btn--block' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <Tag className={classes} {...rest}>
            {children}
        </Tag>
    )
}

export function Chip({ active = false, className = '', children, ...rest }) {
    return (
        <button
            type="button"
            className={`zs-chip ${active ? 'zs-chip--active' : ''} ${className}`.trim()}
            aria-pressed={active}
            {...rest}
        >
            {children}
        </button>
    )
}

export function Tag({ tone = 'muted', children }) {
    return <span className={`zs-tag zs-tag--${tone}`}>{children}</span>
}

export function PageHeader({ eyebrow, title, lead, actions }) {
    return (
        <header className="zs-page-head">
            {eyebrow && <div className="zs-eyebrow">{eyebrow}</div>}
            <h1>{title}</h1>
            {lead && <p className="zs-lead">{lead}</p>}
            {actions && <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>{actions}</div>}
        </header>
    )
}

export function SectionHeading({ id, title, description, action }) {
    return (
        <div className="zs-section-head">
            <div>
                <h2 id={id}>{title}</h2>
                {description && <p>{description}</p>}
            </div>
            {action}
        </div>
    )
}

export function SearchField({ value, onChange, placeholder, onClear, autoFocus = false, ariaLabel }) {
    return (
        <div className="zs-field">
            <SearchIcon size={18} color="#64748B" style={{ flexShrink: 0 }} aria-hidden="true" />
            <input
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                aria-label={ariaLabel || placeholder}
                autoFocus={autoFocus}
            />
            {value && (
                <button
                    type="button"
                    onClick={() => (onClear ? onClear() : onChange(''))}
                    aria-label="Clear search"
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#94A3B8', display: 'flex' }}
                >
                    <X size={16} />
                </button>
            )}
        </div>
    )
}

export function EmptyState({ icon: Icon, title, children, action }) {
    return (
        <div className="zs-empty">
            {Icon && <Icon size={30} color="#94A3B8" aria-hidden="true" />}
            <strong>{title}</strong>
            {children && <p>{children}</p>}
            {action && <div style={{ marginTop: '0.5rem' }}>{action}</div>}
        </div>
    )
}

export function SkeletonCards({ count = 6, height = '9rem' }) {
    return (
        <div className="zs-grid" aria-hidden="true">
            {Array.from({ length: count }, (_, i) => (
                <div key={i} className="skeleton" style={{ height, borderRadius: '0.75rem' }} />
            ))}
        </div>
    )
}
