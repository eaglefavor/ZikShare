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
                background: 'linear-gradient(180deg, rgba(248,250,252,0) 0%, rgba(248,250,252,0.92) 34%, rgba(248,250,252,0.98) 100%)',
                borderTop: '1px solid rgba(226, 232, 240, 0.35)',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                opacity: isVisible ? 1 : 0,
                padding: '0.55rem 0.85rem env(safe-area-inset-bottom, 0px)',
                backdropFilter: 'blur(16px)',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    minHeight: '4rem',
                    maxWidth: '34rem',
                    margin: '0 auto',
                    padding: '0.35rem 0.45rem',
                    borderRadius: '1.4rem',
                    backgroundColor: 'rgba(255,255,255,0.96)',
                    border: '1px solid rgba(226, 232, 240, 0.95)',
                    boxShadow: '0 18px 42px rgba(10, 37, 64, 0.12)',
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
                                transition: 'color 0.2s ease, background 0.2s ease',
                                WebkitTapHighlightColor: 'transparent',
                                position: 'relative',
                                borderRadius: '1rem',
                                minWidth: path === '/post' ? '3.25rem' : '3.75rem',
                                background: isActive && path !== '/post' ? 'var(--color-brand-soft)' : 'transparent',
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
                                                 background: 'linear-gradient(135deg, #0066FF 0%, #0052CC 100%)',
                                                 color: 'white',
                                                 boxShadow: '0 4px 14px rgba(0, 102, 255, 0.4)',
                                                 marginTop: '-1rem',
                                                 transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                             }}
                                             onMouseEnter={e => {
                                                 e.currentTarget.style.transform = 'scale(1.1)'
                                                 e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 102, 255, 0.5)'
                                             }}
                                             onMouseLeave={e => {
                                                 e.currentTarget.style.transform = 'scale(1)'
                                                 e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 102, 255, 0.4)'
                                             }}
                                         >
                                             <NavIcon size={22} strokeWidth={2.4} />
                                         </span>
                                    ) : (
                                        <span style={{ position: 'relative', display: 'flex' }}>
                                            <NavIcon
                                                size={22}
                                                strokeWidth={isActive ? 2.3 : 1.9}
                                                style={{ transition: 'stroke-width 0.2s ease' }}
                                            />
                                        {/* Unread badge for Messages */}
                                        {path === '/messages' && unreadCount > 0 && (
                                            <span
                                                style={{
                                                    position: 'absolute',
                                                    top: '-0.45rem',
                                                    right: '-0.75rem',
                                                    minWidth: '1.15rem',
                                                    height: '1.15rem',
                                                    borderRadius: '9999px',
                                                    backgroundColor: '#DC2626',
                                                    color: '#FFFFFF',
                                                    fontSize: '0.625rem',
                                                    fontWeight: 800,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    padding: '0 0.25rem',
                                                    border: '2px solid white',
                                                    lineHeight: 1,
                                                    boxShadow: '0 2px 5px rgba(220, 38, 38, 0.35)',
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
                                            fontSize: '0.6875rem',
                                            fontWeight: isActive ? 700 : 500,
                                            letterSpacing: '0.01em',
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
