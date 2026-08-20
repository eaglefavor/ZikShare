import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, Loader2, Shield, Check, Sparkles, Pin } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getConversations } from '../lib/messaging'
import { getUser, getAnnouncements } from '../lib/database'
import { getUnreadAnnouncementsCount } from '../lib/announcements'

function timeAgo(iso) {
    if (!iso) return 'Recent'
    const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
    if (seconds < 60) return 'now'
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h`
    const days = Math.floor(hours / 24)
    return `${days}d`
}

export default function MessagesPage() {
    const { session, user, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const [conversations, setConversations] = useState([])
    const [otherUsers, setOtherUsers] = useState({})
    const [latestAnnouncement, setLatestAnnouncement] = useState(null)
    const [unreadAnnouncements, setUnreadAnnouncements] = useState(0)
    const [loading, setLoading] = useState(false)

    const currentUserId = session?.user?.id || user?.uid || user?.id

    useEffect(() => {
        // Fetch official announcements snippet and unread count
        async function fetchOfficialSnippet() {
            try {
                const list = await getAnnouncements({ limit: 5 })
                if (list && list.length > 0) {
                    setLatestAnnouncement(list[0])
                    setUnreadAnnouncements(getUnreadAnnouncementsCount(list))
                }
            } catch (err) {
                console.warn('Failed to fetch official announcements snippet:', err)
            }
        }
        fetchOfficialSnippet()
    }, [])

    useEffect(() => {
        if (!isAuthenticated || !currentUserId) {
            setLoading(false)
            return
        }

        let isMounted = true
        setLoading(true)

        const safetyTimer = setTimeout(() => {
            if (isMounted) setLoading(false)
        }, 3000)

        async function fetchConversations() {
            try {
                const convs = await getConversations(currentUserId)
                if (!isMounted) return
                setConversations(convs || [])
                setLoading(false)

                const otherIds = [...new Set((convs || []).map(c => c.buyerId === currentUserId ? c.sellerId : c.buyerId).filter(Boolean))]
                const userEntries = await Promise.all(
                    otherIds.map(async (id) => {
                        try {
                            const u = await getUser(id)
                            return u ? [id, u] : null
                        } catch {
                            return null
                        }
                    })
                )
                if (!isMounted) return
                const userMap = {}
                userEntries.forEach(entry => {
                    if (entry) userMap[entry[0]] = entry[1]
                })
                setOtherUsers(userMap)
            } catch (err) {
                console.warn('Failed to load conversations:', err)
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        fetchConversations()

        return () => {
            isMounted = false
            clearTimeout(safetyTimer)
        }
    }, [isAuthenticated, currentUserId])

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', paddingBottom: '5rem' }}>
            <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', padding: '0.875rem 1rem' }}>
                <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 800, color: '#0F172A' }}>Messages</h1>
            </header>

            <div style={{ maxWidth: '36rem', margin: '0 auto' }}>
                {/* ── PINNED OFFICIAL WHATSAPP-STYLE CHANNEL CARD ── */}
                <div style={{ padding: '0.625rem 0.875rem', borderBottom: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}>
                    <button
                        onClick={() => navigate('/official-channel')}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.625rem',
                            borderRadius: '0.75rem',
                            border: '1.5px solid #BFDBFE',
                            backgroundColor: '#F0F7FF',
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                        }}
                    >
                        <div style={{ position: 'relative', width: '2.75rem', height: '2.75rem', borderRadius: '9999px', backgroundColor: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                            <Shield size={20} />
                            <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '0.9375rem', height: '0.9375rem', borderRadius: '9999px', backgroundColor: '#10B981', border: '2px solid #F0F7FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Check size={9} strokeWidth={4} color="white" />
                            </div>
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.125rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 800, color: '#0F172A' }}>
                                        ZikShare Official
                                    </h3>
                                    <span style={{ fontSize: '0.5625rem', fontWeight: 800, backgroundColor: '#3B82F6', color: 'white', padding: '0.05rem 0.3rem', borderRadius: '0.25rem', textTransform: 'uppercase' }}>
                                        Channel
                                    </span>
                                </div>
                                <span style={{ fontSize: '0.625rem', color: '#64748B', fontWeight: 600 }}>
                                    {latestAnnouncement ? timeAgo(latestAnnouncement.created_at) : 'Official'}
                                </span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                                <p style={{ margin: 0, fontSize: '0.75rem', color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {latestAnnouncement ? latestAnnouncement.title : 'Official campus updates & announcements'}
                                </p>
                                {unreadAnnouncements > 0 && (
                                    <span style={{ minWidth: '1.125rem', height: '1.125rem', borderRadius: '9999px', backgroundColor: '#2563EB', color: 'white', fontSize: '0.625rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 0.25rem', flexShrink: 0 }}>
                                        {unreadAnnouncements}
                                    </span>
                                )}
                            </div>
                        </div>
                    </button>
                </div>

            {!isAuthenticated ? (
                <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                    <div style={{ width: '5rem', height: '5rem', borderRadius: '9999px', background: 'linear-gradient(135deg, #DBEAFE, #93C5FD)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                        <MessageCircle size={32} color="#3B82F6" />
                    </div>
                    <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Sign in to see messages</h2>
                    <p style={{ margin: '0.5rem 0 1.5rem', fontSize: '0.8125rem', color: 'var(--color-text-secondary)', maxWidth: '18rem', marginLeft: 'auto', marginRight: 'auto' }}>
                        Chat with sellers and buyers directly on ZikShare
                    </p>
                    <button onClick={() => navigate('/login')} style={{ padding: '0.75rem 2rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', fontSize: '0.875rem', fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', boxShadow: '0 4px 12px rgba(59,130,246,0.3)' }}>
                        Sign In
                    </button>
                </div>
            ) : loading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 0' }}>
                    <Loader2 size={28} color="var(--color-brand)" className="animate-spin" />
                </div>
            ) : conversations.length === 0 ? (
                <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                    <div style={{ width: '5rem', height: '5rem', borderRadius: '9999px', background: 'linear-gradient(135deg, #DBEAFE, #93C5FD)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                        <MessageCircle size={32} color="#3B82F6" />
                    </div>
                    <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>No messages yet</h2>
                    <p style={{ margin: '0.5rem 0 1.5rem', fontSize: '0.8125rem', color: 'var(--color-text-secondary)', maxWidth: '18rem', marginLeft: 'auto', marginRight: 'auto' }}>
                        Tap "Contact Seller" on any listing to start a conversation
                    </p>
                    <button onClick={() => navigate('/')} style={{ padding: '0.75rem 2rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', fontSize: '0.875rem', fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', boxShadow: '0 4px 12px rgba(59,130,246,0.3)' }}>
                        Browse Listings
                    </button>
                </div>
            ) : (
                <div style={{ padding: '0.5rem 0' }}>
                    {conversations.map(conv => {
                        const otherId = conv.buyerId === currentUserId ? conv.sellerId : conv.buyerId
                        const other = otherUsers[otherId]
                        const otherName = other?.displayName || 'User'
                        const listing = conv.listings || {}
                        const imageUrl = listing.images?.[0]

                        return (
                            <button
                                key={conv.id}
                                onClick={() => navigate(`/chat/${conv.id}`)}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.75rem 1rem',
                                    border: 'none',
                                    backgroundColor: 'white',
                                    cursor: 'pointer',
                                    fontFamily: 'inherit',
                                    textAlign: 'left',
                                    borderBottom: '1px solid var(--color-border)',
                                    transition: 'background-color 0.15s',
                                }}
                            >
                                {/* Listing thumbnail */}
                                <div style={{ width: '3rem', height: '3rem', borderRadius: '0.5rem', overflow: 'hidden', flexShrink: 0, backgroundColor: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
                                    {imageUrl ? <img src={imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '📦'}
                                </div>

                                {/* Content */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.125rem' }}>
                                        <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{otherName}</p>
                                        <span style={{ fontSize: '0.5625rem', color: 'var(--color-text-muted)', flexShrink: 0 }}>{timeAgo(conv.lastMessageAt)}</span>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '0.6875rem', color: 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {conv.lastMessage || `Re: ${listing.title || 'Listing'}`}
                                    </p>
                                </div>
                            </button>
                        )
                    })}
                </div>
            )}
            </div>
        </div>
    )
}
