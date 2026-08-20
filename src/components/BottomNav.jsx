import { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Home, Search, PlusCircle, MessageCircle, User } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getConversations } from '../lib/messaging'
import { countUnread } from '../lib/readStatus'
import { getAnnouncements } from '../lib/database'
import { getUnreadAnnouncementsCount } from '../lib/announcements'

const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/post', icon: PlusCircle, label: 'Post' },
    { path: '/messages', icon: MessageCircle, label: 'Messages' },
    { path: '/profile', icon: User, label: 'Profile' },
]

export default function BottomNav() {
    const [isVisible, setIsVisible] = useState(true)
    const [unreadCount, setUnreadCount] = useState(0)
    const lastScrollY = useRef(0)
    const location = useLocation()
    const { session, isAuthenticated } = useAuth()

    // Hide/show on scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            if (currentScrollY < 10) {
                setIsVisible(true)
            } else if (currentScrollY > lastScrollY.current + 5) {
                setIsVisible(false)
            } else if (currentScrollY < lastScrollY.current - 5) {
                setIsVisible(true)
            }
            lastScrollY.current = currentScrollY
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Reset visibility on route change
    useEffect(() => {
        const t = setTimeout(() => setIsVisible(true), 0)
        return () => clearTimeout(t)
    }, [location.pathname])

    // Fetch unread count (peer chats + official announcements)
    useEffect(() => {
        async function checkUnread() {
            try {
                let peerUnread = 0
                if (isAuthenticated && session?.user?.id) {
                    const convs = await getConversations(session.user.id)
                    peerUnread = countUnread(convs)
                }

                // Official announcements unread
                let annUnread = 0
                try {
                    const annList = await getAnnouncements({ limit: 10 })
                    annUnread = getUnreadAnnouncementsCount(annList)
                } catch (e) {
                    console.debug?.('Failed to get announcements count:', e)
                }

                setUnreadCount(peerUnread + annUnread)
            } catch (e) {
                console.debug?.('Failed to check unread messages:', e)
            }
        }

        checkUnread()
        const interval = setInterval(checkUnread, 15000)
        return () => clearInterval(interval)
    }, [isAuthenticated, session, location.pathname])

    return (
        <nav
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                backgroundColor: 'white',
                borderTop: '1px solid var(--color-border)',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                opacity: isVisible ? 1 : 0,
                paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    height: '4rem',
                    maxWidth: '32rem',
                    margin: '0 auto',
                }}
            >
                {navItems.map((item) => {
                    const NavIcon = item.icon
                    const { path, label } = item
                    return (
                        <NavLink
                            key={path}
                            to={path}
                            end={path === '/'}
                            style={({ isActive }) => ({
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.125rem',
                                padding: '0.5rem',
                                textDecoration: 'none',
                                color: isActive ? 'var(--color-brand)' : 'var(--color-text-muted)',
                                transition: 'color 0.2s ease',
                                WebkitTapHighlightColor: 'transparent',
                                position: 'relative',
                            })}
                        >
                            {({ isActive }) => (
                                <>
                                    {isActive && (
                                        <span
                                            style={{
                                                position: 'absolute',
                                                top: '0.125rem',
                                                width: '0.25rem',
                                                height: '0.25rem',
                                                borderRadius: '9999px',
                                                backgroundColor: 'var(--color-brand)',
                                            }}
                                        />
                                    )}
                                    {path === '/post' ? (
                                        <span
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '2.75rem',
                                                height: '2.75rem',
                                                borderRadius: '9999px',
                                                background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                                                color: 'white',
                                                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
                                                marginTop: '-1rem',
                                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.transform = 'scale(1.1)'
                                                e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.5)'
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.transform = 'scale(1)'
                                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)'
                                            }}
                                        >
                                            <NavIcon size={22} strokeWidth={2.5} />
                                        </span>
                                    ) : (
                                        <span style={{ position: 'relative', display: 'flex' }}>
                                            <NavIcon
                                                size={22}
                                                strokeWidth={isActive ? 2.5 : 1.8}
                                                style={{ transition: 'stroke-width 0.2s ease' }}
                                            />
                                        {/* Unread badge for Messages */}
                                        {path === '/messages' && unreadCount > 0 && (
                                            <span
                                                style={{
                                                    position: 'absolute',
                                                    top: '-0.3rem',
                                                    right: '-0.5rem',
                                                    minWidth: '1rem',
                                                    height: '1rem',
                                                    borderRadius: '9999px',
                                                    backgroundColor: '#EF4444',
                                                    color: 'white',
                                                    fontSize: '0.5625rem',
                                                    fontWeight: 700,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    padding: '0 0.2rem',
                                                    border: '2px solid white',
                                                    lineHeight: 1,
                                                }}
                                            >
                                                {unreadCount > 9 ? '9+' : unreadCount}
                                            </span>
                                        )}
                                    </span>
                                )}
                                {path !== '/post' && (
                                    <span
                                        style={{
                                            fontSize: '0.625rem',
                                            fontWeight: isActive ? 600 : 400,
                                            letterSpacing: '0.02em',
                                            transition: 'font-weight 0.2s ease',
                                        }}
                                    >
                                        {label}
                                    </span>
                                )}
                            </>
                        )}
                        </NavLink>
                    )
                })}
            </div>
        </nav>
    )
}
