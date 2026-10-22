import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Home, Library, Store, Search, Plus, User } from 'lucide-react'
import ZikShareLogo from './ZikShareLogo'
import BottomNav from './BottomNav'
import { useAuth } from '../contexts/AuthContext'

const primaryNav = [
    { path: '/', label: 'Home', icon: Home, end: true },
    { path: '/library', label: 'Library', icon: Library },
    { path: '/search', label: 'Marketplace', icon: Store },
]

/**
 * The one frame every screen sits in: logo, navigation, a search field that
 * actually works, and the sell action. On phones the nav lives in the bottom
 * bar; from 900px up it moves into the header and the bottom bar disappears.
 */
export default function AppShell({ children }) {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    const [query, setQuery] = useState('')

    const submit = (event) => {
        event.preventDefault()
        const term = query.trim()
        navigate(term ? `/search?q=${encodeURIComponent(term)}` : '/search')
    }

    return (
        <div className="zs-shell">
            <header className="zs-header">
                <div className="zs-container zs-header__inner">
                    <NavLink to="/" aria-label="ZikShare home" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <ZikShareLogo size="sm" />
                    </NavLink>

                    <nav className="zs-nav zs-desktop-only" aria-label="Primary">
                        {primaryNav.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.end}
                                className={({ isActive }) => `zs-nav__link ${isActive ? 'is-active' : ''}`}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="zs-header__spacer" />

                    <form onSubmit={submit} className="zs-field zs-desktop-only" style={{ flex: '0 1 20rem', padding: '0.4rem 0.7rem' }}>
                        <Search size={16} color="#64748B" aria-hidden="true" />
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search a course code, book or item"
                            aria-label="Search ZikShare"
                        />
                    </form>

                    <div className="zs-header__actions">
                        <NavLink to="/search" className="zs-icon-btn zs-mobile-only" aria-label="Search">
                            <Search size={18} />
                        </NavLink>

                        <NavLink to="/post" className="zs-btn zs-btn--primary zs-btn--sm zs-desktop-only">
                            <Plus size={15} /> Sell something
                        </NavLink>

                        <NavLink
                            to={isAuthenticated ? '/profile' : '/login'}
                            className="zs-icon-btn"
                            aria-label={isAuthenticated ? 'Your account' : 'Sign in'}
                        >
                            <User size={18} />
                        </NavLink>
                    </div>
                </div>
            </header>

            <main className="zs-main">{children}</main>

            <footer className="zs-footer zs-desktop-only">
                <div className="zs-container zs-footer__inner">
                    <span>ZikShare · Nnamdi Azikiwe University</span>
                    <span>
                        Every study pack and book in the library is free — no fee, no sign-in, no
                        payment step.
                    </span>
                    <span style={{ display: 'flex', gap: '1rem' }}>
                        <NavLink to="/library">Library</NavLink>
                        <NavLink to="/search">Marketplace</NavLink>
                        <NavLink to="/profile/help">Help</NavLink>
                    </span>
                </div>
            </footer>

            <div className="zs-mobile-only">
                <BottomNav />
            </div>
        </div>
    )
}
