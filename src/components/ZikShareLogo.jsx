import React from 'react'

/**
 * ZikShare Brand Logo Component
 * Exact vector recreation from the official brand reference:
 * - Shopping cart icon with custom orange 'Z' mark
 * - Dual-tone brand typography: "Zik" (Navy) + "Share" (Vibrant Orange)
 * - Optional tagline: "Buy. Sell. Share. Simple."
 * - Optional pill: "The UNIZIK Campus Marketplace"
 */
export function ZikShareIcon({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
    >
      {/* Shopping Cart Body (Electric Blue) */}
      <path
        d="M6 14H12L16.8 30.5C17.1 31.7 18.2 32.5 19.5 32.5H35.5C36.8 32.5 37.9 31.6 38.2 30.3L42 16H13.5"
        stroke="#0066FF"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Cart Front Lip */}
      <path
        d="M42 16H14"
        stroke="#0066FF"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Stylized 'Z' Mark inside the cart (Vibrant Orange) */}
      <path
        d="M20 18.5H32.5L23.5 28H33.5"
        stroke="#FA5A00"
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Cart Wheels (Electric Blue) */}
      <circle cx="21" cy="38.5" r="3.5" fill="#0066FF" />
      <circle cx="34" cy="38.5" r="3.5" fill="#0066FF" />
    </svg>
  )
}

export default function ZikShareLogo({
  size = 'md',
  withTagline = false,
  withPill = false,
  onClick,
  className = ''
}) {
  const iconSizes = {
    sm: 24,
    md: 32,
    lg: 44,
    xl: 56,
  }

  const textSizes = {
    sm: '1.125rem',
    md: '1.375rem',
    lg: '1.75rem',
    xl: '2.25rem',
  }

  const iconSize = typeof size === 'number' ? size : (iconSizes[size] || 32)
  const textSize = typeof size === 'number' ? `${size * 0.045}rem` : (textSizes[size] || '1.375rem')

  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
        <ZikShareIcon size={iconSize} />
        <div>
          <span
            style={{
              fontSize: textSize,
              fontWeight: 900,
              color: '#0A2540', // Navy from reference
              letterSpacing: '-0.03em',
              lineHeight: 1,
              fontFamily: 'var(--font-family-sans, inherit)',
            }}
          >
            Zik
          </span>
          <span
            style={{
              fontSize: textSize,
              fontWeight: 900,
              color: '#FA5A00', // Warm Vibrant Orange from reference
              letterSpacing: '-0.03em',
              lineHeight: 1,
              fontFamily: 'var(--font-family-sans, inherit)',
            }}
          >
            Share
          </span>
        </div>
      </div>

      {withTagline && (
        <span
          style={{
            fontSize: '0.6875rem',
            color: '#556987',
            fontWeight: 600,
            marginTop: '0.15rem',
            letterSpacing: '0.01em',
            paddingLeft: `${iconSize + 8}px`,
          }}
        >
          Buy. Sell. Share. Simple.
        </span>
      )}

      {withPill && (
        <div
          style={{
            marginTop: '0.35rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            backgroundColor: '#FA5A00',
            color: '#FFFFFF',
            fontSize: '0.6875rem',
            fontWeight: 700,
          }}
        >
          <span>🎓 The UNIZIK Campus Marketplace</span>
        </div>
      )}
    </div>
  )
}
