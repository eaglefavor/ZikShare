import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Home, Library, Store, Search, Plus, User, MessageCircle, WifiOff } from 'lucide-react'
import ZikShareLogo from './ZikShareLogo'
import { useAuth } from '../contexts/AuthContext'
import { getConversations } from '../lib/messaging'
import { countUnread } from '../lib/readStatus'
import { getAnnouncements } from '../lib/database'
import { getUnreadAnnouncementsCount } from '../lib/announcements'
import useOnline from '../hooks/useOnline'

const primaryNav = [
    { path: '/', label: 'Home', icon: Home, end: true },
    { path: '/library', label: 'Library', icon: Library },
    { path: '/search', label: 'Marketplace', icon: Store },
]

/** The five places a phone user actually needs. */
const phoneNav = [
    { path: '/', label: 'Home', icon: Home, end: true },
    { path: '/library', label: 'Library', icon: Library },
    { path: '/search', label: 'Search', icon: Search },
    { path: '/post', label: 'Sell', icon: Plus, sell: true },
    { path: '/profile', label: 'You', icon: User },
]

/**
 * The one frame every screen sits in: logo, navigation, a search field that
 * actually works, and the sell action. On phones the nav lives in the bottom
 * bar; from 900px up it moves into the header and the bottom bar disappears.
 */
export default function AppShell({ children }) {
    const navigate = useNavigate()
    const { isAuthenticated, session } = useAuth()
    const [query, setQuery] = useState('')
    const [unread, setUnread] = useState(0)
    const online = useOnline()

    const submit = (event) => {
        event.preventDefault()
        const term = query.trim()
        navigate(term ? `/search?q=${encodeURIComponent(term)}` : '/search')
    }

    // Unread peer replies plus official announcements. Signed-out visitors see
    // no badge at all rather than a zero.
    useEffect(() => {
        let mounted = true

        async function checkUnread() {
            try {
                let peers = 0
                const uid = session?.user?.id
                if (isAuthenticated && uid) {
                    const convs = await getConversations(uid).catch(() => [])
                    peers = countUnread(convs)
                }
                const announcements = await getAnnouncements({ limit: 10 }).catch(() => [])
                if (mounted) setUnread(peers + getUnreadAnnouncementsCount(announcements))
            } catch {
                /* a badge is not worth an error state */
            }
        }

        checkUnread()
        const timer = setInterval(checkUnread, 30000)
        return () => {
            mounted = false
            clearInterval(timer)
        }
    }, [isAuthenticated, session])

    return (
        <div className="zs-shell">
            {/* Keyboard and screen-reader readers can jump the header and nav. */}
            <a href="#main-content" className="zs-skip-link">
                Skip to the main content
            </a>
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
                        <Search size={16} color="var(--color-text-muted)" aria-hidden="true" />
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

                        <NavLink to="/messages" className="zs-icon-btn" aria-label="Messages" style={{ position: 'relative' }}>
                            <MessageCircle size={18} />
                            {unread > 0 && <span className="zs-badge">{unread > 9 ? '9+' : unread}</span>}
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

            {/* Stated, not guessed: when the phone reports no connection, say so
                and point at what still works without one. */}
            {!online && (
                <div className="zs-offline-bar" role="status" aria-live="polite">
                    <WifiOff size={14} aria-hidden="true" />
                    <span>
                        You are offline. The library you have opened before still works, and anything
                        saved to this device opens here.
                    </span>
                </div>
            )}

            <main className="zs-main" id="main-content" tabIndex={-1}>
                {children}
            </main>

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
                        <NavLink to="/messages">Messages</NavLink>
                        <NavLink to="/profile/help">Help</NavLink>
                    </span>
                </div>
            </footer>

            <div className="zs-mobile-only">
                <nav className="zs-bottomnav" aria-label="Primary">
                    <div className="zs-bottomnav__inner">
                        {phoneNav.map((item) => {
                            const Icon = item.icon
                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.end}
                                    className={({ isActive }) =>
                                        `zs-bottomnav__link${isActive ? ' is-active' : ''}${item.sell ? ' zs-bottomnav__link--sell' : ''}`
                                    }
                                >
                                    {item.sell ? (
                                        <span className="zs-bottomnav__sell" aria-hidden="true">
                                            <Icon size={20} strokeWidth={2.6} />
                                        </span>
                                    ) : (
                                        <Icon size={20} strokeWidth={2} aria-hidden="true" />
                                    )}
                                    {item.label}
                                </NavLink>
                            )
                        })}
                    </div>
                </nav>
            </div>
        </div>
    )
}
