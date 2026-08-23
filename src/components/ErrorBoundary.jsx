import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo)
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    if (this.props.onReset) {
      this.props.onReset()
    } else {
      window.location.reload()
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback({
          error: this.state.error,
          resetErrorBoundary: this.handleReset,
        })
      }

      return (
        <div style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          fontFamily: 'inherit',
          backgroundColor: '#F8FAFC',
        }}>
          <div style={{
            width: '3.75rem',
            height: '3.75rem',
            borderRadius: '9999px',
            backgroundColor: '#FFFBEB',
            border: '1px solid #FDE68A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
          }}>
            <AlertTriangle size={24} color="#D97706" />
          </div>

          <h2 style={{ fontSize: '1.1875rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.375rem' }}>
            {this.props.title || 'Something went wrong'}
          </h2>
          <p style={{ fontSize: '0.8125rem', color: '#64748B', maxWidth: '22rem', margin: '0 0 1.25rem', lineHeight: 1.5 }}>
            We encountered a temporary rendering issue. Please reload or return to the main campus page.
          </p>

          <div style={{ display: 'flex', gap: '0.625rem' }}>
            <button
              onClick={this.handleReset}
              style={{
                padding: '0.625rem 1.25rem',
                borderRadius: '0.625rem',
                backgroundColor: 'var(--color-brand)',
                color: 'white',
                border: 'none',
                fontSize: '0.8125rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                boxShadow: '0 2px 8px rgba(30,64,175,0.25)'
              }}
            >
              <RefreshCw size={15} />
              <span>Retry / Reload</span>
            </button>
            <a
              href="/"
              style={{
                padding: '0.625rem 1.25rem',
                borderRadius: '0.625rem',
                backgroundColor: 'white',
                color: '#334155',
                border: '1px solid var(--color-border)',
                fontSize: '0.8125rem',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
              }}
            >
              <Home size={15} />
              <span>Home</span>
            </a>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
