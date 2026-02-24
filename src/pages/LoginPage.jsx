import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Mail, Lock, User, Eye, EyeOff, Loader2, ArrowLeft, ShieldCheck } from 'lucide-react'

export default function LoginPage() {
    const [mode, setMode] = useState('login') // 'login' or 'register'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            if (mode === 'login') {
                await signInWithEmail(email, password)
            } else {
                await signUpWithEmail(email, password, displayName)
            }
            navigate('/profile')
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        setError('')
        try {
            await signInWithGoogle()
        } catch (err) {
            setError(err.message || 'Google sign-in failed.')
        }
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
            {/* Header */}
            <header
                style={{
                    padding: '0.75rem 1rem',
                    backgroundColor: 'white',
                    borderBottom: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                }}
            >
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        padding: '0.25rem',
                        color: 'var(--color-text-primary)',
                    }}
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 700 }}>
                    {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                </h1>
            </header>

            <div style={{ padding: '1.5rem 1rem' }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <h2
                        style={{
                            margin: 0,
                            fontSize: '1.75rem',
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        ZikShare
                    </h2>
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                        {mode === 'login' ? 'Sign in to your campus marketplace' : 'Join the UNIZIK marketplace'}
                    </p>
                </div>

                {/* Google Sign-In */}
                <button
                    onClick={handleGoogleSignIn}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '0.75rem',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'white',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        fontFamily: 'inherit',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-background)')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'white')}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                </button>

                {/* Divider */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        margin: '1.25rem 0',
                    }}
                >
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>or</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
                </div>

                {/* Error */}
                {error && (
                    <div
                        style={{
                            padding: '0.625rem 0.875rem',
                            borderRadius: '0.625rem',
                            backgroundColor: '#FEF2F2',
                            border: '1px solid #FECACA',
                            color: '#DC2626',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            marginBottom: '1rem',
                        }}
                    >
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {mode === 'register' && (
                        <div style={{ marginBottom: '0.875rem' }}>
                            <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>
                                Full Name
                            </label>
                            <div style={{ position: 'relative' }}>
                                <User size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input
                                    type="text"
                                    placeholder="e.g., Chike Obi"
                                    value={displayName}
                                    onChange={e => setDisplayName(e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.625rem 0.875rem 0.625rem 2.25rem',
                                        borderRadius: '0.625rem',
                                        border: '1px solid var(--color-border)',
                                        fontSize: '0.8125rem',
                                        fontFamily: 'inherit',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                        transition: 'border-color 0.2s ease',
                                    }}
                                    onFocus={e => (e.target.style.borderColor = 'var(--color-brand)')}
                                    onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
                                />
                            </div>
                        </div>
                    )}

                    <div style={{ marginBottom: '0.875rem' }}>
                        <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>
                            Email
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                            <input
                                type="email"
                                placeholder="you@unizik.edu.ng"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.625rem 0.875rem 0.625rem 2.25rem',
                                    borderRadius: '0.625rem',
                                    border: '1px solid var(--color-border)',
                                    fontSize: '0.8125rem',
                                    fontFamily: 'inherit',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    transition: 'border-color 0.2s ease',
                                }}
                                onFocus={e => (e.target.style.borderColor = 'var(--color-brand)')}
                                onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>
                            Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                minLength={6}
                                style={{
                                    width: '100%',
                                    padding: '0.625rem 2.5rem 0.625rem 2.25rem',
                                    borderRadius: '0.625rem',
                                    border: '1px solid var(--color-border)',
                                    fontSize: '0.8125rem',
                                    fontFamily: 'inherit',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    transition: 'border-color 0.2s ease',
                                }}
                                onFocus={e => (e.target.style.borderColor = 'var(--color-brand)')}
                                onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '0.625rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    padding: '0.125rem',
                                    color: 'var(--color-text-muted)',
                                }}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '0.75rem',
                            border: 'none',
                            fontSize: '0.9375rem',
                            fontWeight: 700,
                            fontFamily: 'inherit',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            background: loading ? '#93C5FD' : 'linear-gradient(135deg, #3B82F6, #2563EB)',
                            color: 'white',
                            boxShadow: loading ? 'none' : '0 4px 14px rgba(59, 130, 246, 0.4)',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                        }}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                                {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                            </>
                        ) : (
                            mode === 'login' ? 'Sign In' : 'Create Account'
                        )}
                    </button>
                </form>

                {/* Toggle mode */}
                <p
                    style={{
                        textAlign: 'center',
                        marginTop: '1.25rem',
                        fontSize: '0.8125rem',
                        color: 'var(--color-text-secondary)',
                    }}
                >
                    {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                    <button
                        onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-brand)',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            fontSize: 'inherit',
                        }}
                    >
                        {mode === 'login' ? 'Sign Up' : 'Sign In'}
                    </button>
                </p>

                {/* Verification hint */}
                <div
                    style={{
                        marginTop: '1.5rem',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.75rem',
                        backgroundColor: '#F0FDF4',
                        border: '1px solid #BBF7D0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.625rem',
                    }}
                >
                    <ShieldCheck size={18} color="#166534" />
                    <p style={{ margin: 0, fontSize: '0.6875rem', color: '#166534', lineHeight: 1.4 }}>
                        <strong>Tip:</strong> Sign up with your <strong>@unizik.edu.ng</strong> email to get a verified student badge.
                    </p>
                </div>
            </div>

            <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    )
}
