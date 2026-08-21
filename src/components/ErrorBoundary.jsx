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
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '80vh',
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
            width: '4rem',
            height: '4rem',
            borderRadius: '9999px',
            backgroundColor: '#FEE2E2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
          }}>
            <AlertTriangle size={28} color="#DC2626" />
          </div>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
            Something went wrong
          </h2>
          <p style={{ fontSize: '0.8125rem', color: '#64748B', maxWidth: '20rem', margin: '0 0 1.5rem', lineHeight: 1.5 }}>
            We encountered a temporary rendering issue. Please reload the page or return home.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={this.handleReset}
              style={{
                padding: '0.625rem 1.25rem',
                borderRadius: '0.625rem',
                backgroundColor: '#2563EB',
                color: 'white',
                border: 'none',
                fontSize: '0.8125rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
              }}
            >
              <RefreshCw size={15} />
              <span>Reload Page</span>
            </button>
            <a
              href="/"
              style={{
                padding: '0.625rem 1.25rem',
                borderRadius: '0.625rem',
                backgroundColor: 'white',
                color: '#334155',
                border: '1px solid #CBD5E1',
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
