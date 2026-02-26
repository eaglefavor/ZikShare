import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, Loader2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getConversations } from '../lib/messaging'
import { getUser } from '../lib/database'

function formatNaira(amount) {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount)
}

function timeAgo(iso) {
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
    const { session, isAuthenticated, loading: authLoading } = useAuth()
    const navigate = useNavigate()
    const [conversations, setConversations] = useState([])
    const [otherUsers, setOtherUsers] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (authLoading) return
        if (!isAuthenticated || !session?.user?.id) {
            setLoading(false)
            return
        }

        fetchConversations()
    }, [isAuthenticated, session, authLoading])

    async function fetchConversations() {
        setLoading(true)
        try {
            const convs = await getConversations(session.user.id)
            setConversations(convs)

            // Fetch other users' profiles
            const userMap = {}
            for (const conv of convs) {
                const otherId = conv.buyerId === session.user.id ? conv.sellerId : conv.buyerId
                if (!userMap[otherId]) {
                    try {
                        const u = await getUser(otherId)
                        if (u) userMap[otherId] = u
                    } catch { /* skip */ }
                }
            }
            setOtherUsers(userMap)
        } catch (err) {
            console.error('Failed to load conversations:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', padding: '1rem' }}>
                <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 700 }}>Messages</h1>
            </header>

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
                    <Loader2 size={28} color="var(--color-brand)" style={{ animation: 'spin 1s linear infinite' }} />
                    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
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
                        const otherId = conv.buyerId === session.user.id ? conv.sellerId : conv.buyerId
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
                                    backgroundColor: 'transparent',
                                    cursor: 'pointer',
                                    fontFamily: 'inherit',
                                    textAlign: 'left',
                                    borderBottom: '1px solid var(--color-border)',
                                    transition: 'background-color 0.15s',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-background)')}
                                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
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
    )
}
