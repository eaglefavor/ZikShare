import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, User, Eye, EyeOff, Loader2, AlertCircle, ArrowLeft } from 'lucide-react'
import { useAuth, isUnizikEmail } from '../contexts/AuthContext'
import ZikShareLogo from '../components/ZikShareLogo'

function GoogleMark() {
    return (
        <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    )
}

export default function LoginPage() {
    const [mode, setMode] = useState('login') // 'login' or 'register'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { signInWithEmail, signUpWithEmail, signInWithGoogle, authError } = useAuth()

    useEffect(() => {
        if (authError) setError(authError)
    }, [authError])

    const isRegister = mode === 'register'

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        const cleanEmail = email.trim().toLowerCase()
        if (isRegister && !isUnizikEmail(cleanEmail)) {
            setError('Please register with an official UNIZIK student email (e.g. yourname@unizik.edu.ng or regNumber@students.unizik.edu.ng).')
            return
        }

        setLoading(true)
        try {
            if (isRegister) {
                await signUpWithEmail(cleanEmail, password, displayName.trim())
            } else {
                await signInWithEmail(cleanEmail, password)
            }
            navigate('/')
        } catch (err) {
            const msg = (err.message || '').toLowerCase()
            if (msg.includes('rate limit') || msg.includes('over_email_send_rate_limit') || msg.includes('too many requests')) {
                setError('Email verification is temporarily rate-limited. Sign in instantly with “Continue with UNIZIK Google account” above.')
            } else {
                setError(err.message || 'Sign in failed. Check your email and password.')
            }
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        setError('')
        try {
            await signInWithGoogle()
        } catch (err) {
            setError(err.message || 'Google sign-in failed. Use your UNIZIK Google account.')
        }
    }

    const switchMode = () => {
        setMode(isRegister ? 'login' : 'register')
        setError('')
    }

    return (
        <div className="zs-auth">
            <div style={{ width: '100%', maxWidth: '26rem' }}>
                <button type="button" className="zs-link" onClick={() => navigate(-1)}>
                    <ArrowLeft size={15} /> Back
                </button>
            </div>

            <div className="zs-auth__card">
                <div className="zs-auth__brand">
                    <ZikShareLogo size="lg" />
                    <h1>{isRegister ? 'Create your student account' : 'Sign in to ZikShare'}</h1>
                    <p>
                        {isRegister
                            ? 'Register with your UNIZIK email to post items and message students.'
                            : 'Post items, message students and find what you listed.'}
                    </p>
                </div>

                <button type="button" className="zs-btn zs-btn--outline zs-btn--block" onClick={handleGoogleSignIn}>
                    <GoogleMark /> Continue with UNIZIK Google account
                </button>

                <div className="zs-auth__or">or use your email</div>

                {error && (
                    <div className="zs-auth__error" role="alert">
                        <AlertCircle size={15} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {isRegister && (
                        <div className="zs-auth__field">
                            <label className="zs-auth__label" htmlFor="auth-name">Full name</label>
                            <div className="zs-auth__control">
                                <User size={15} aria-hidden="true" />
                                <input
                                    id="auth-name"
                                    type="text"
                                    placeholder="e.g. Chike Obi"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    required
                                    autoComplete="name"
                                />
                            </div>
                        </div>
                    )}

                    <div className="zs-auth__field">
                        <label className="zs-auth__label" htmlFor="auth-email">UNIZIK student email</label>
                        <div className="zs-auth__control">
                            <Mail size={15} aria-hidden="true" />
                            <input
                                id="auth-email"
                                type="email"
                                placeholder="name@unizik.edu.ng"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />
                        </div>
                        <p className="zs-auth__hint">Must end with @unizik.edu.ng or @students.unizik.edu.ng</p>
                    </div>

                    <div className="zs-auth__field">
                        <label className="zs-auth__label" htmlFor="auth-password">Password</label>
                        <div className="zs-auth__control">
                            <Lock size={15} aria-hidden="true" />
                            <input
                                id="auth-password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="At least 6 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                autoComplete={isRegister ? 'new-password' : 'current-password'}
                                style={{ paddingRight: '2.4rem' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                style={{
                                    position: 'absolute',
                                    right: '0.55rem',
                                    display: 'flex',
                                    padding: '0.15rem',
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--color-text-muted)',
                                    cursor: 'pointer',
                                }}
                            >
                                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="zs-btn zs-btn--primary zs-btn--block" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                {isRegister ? 'Creating account…' : 'Signing in…'}
                            </>
                        ) : (
                            isRegister ? 'Create account' : 'Sign in'
                        )}
                    </button>
                </form>

                <p className="zs-auth__swap">
                    {isRegister ? 'Already have an account? ' : 'New here? '}
                    <button type="button" onClick={switchMode}>
                        {isRegister ? 'Sign in' : 'Create an account'}
                    </button>
                </p>
            </div>

            <p className="zs-auth__note">
                The study library never asks you to sign in. All 88 documents are free to open and
                download — <Link to="/library">go straight to the library</Link>.
            </p>
        </div>
    )
}
