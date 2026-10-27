import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Send, Phone, Loader2, AlertTriangle, X, Image as ImageIcon, CheckCheck, ExternalLink, ShieldCheck, Tag, Key, DollarSign, FileText, Package } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getConversation, getMessages, sendMessage, subscribeToMessages, uploadChatAttachment } from '../lib/messaging'
import { getUser, createOffer, getOffersForConversation, respondToOffer, verifyHandshakePin, getEscrowTradesForUser, arrangeMeetup } from '../lib/database'
import { markConversationRead } from '../lib/readStatus'
import { useToast } from '../components/Toast'
import PaystackCheckout from '../components/PaystackCheckout'

function formatNaira(amount) {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount || 0)
}

function timeLabel(iso) {
    if (!iso) return ''
    const d = new Date(iso)
    return d.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })
}

function dateLabel(iso) {
    if (!iso) return 'Today'
    const d = new Date(iso)
    const today = new Date()
    if (d.toDateString() === today.toDateString()) return 'Today'
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday'
    return d.toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })
}

const campusQuickReplies = [
    'Is this still available?',
    'Can we meet at Garba Square?',
    'Can we meet at Chisco Park?',
    'Meet at Student Center?',
    'What\'s your best price?',
    'I\'m on campus right now',
]

export default function ChatPage() {
    const { conversationId } = useParams()
    const navigate = useNavigate()
    const toast = useToast()
    const { session, user, isAuthenticated } = useAuth()
    const myId = session?.user?.id || user?.uid || user?.id

    const [conversation, setConversation] = useState(null)
    const [messages, setMessages] = useState([])
    const [otherUser, setOtherUser] = useState(null)
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)
    const [selectedImageFile, setSelectedImageFile] = useState(null)
    const [showCallSheet, setShowCallSheet] = useState(false)
    const [showItemCard, setShowItemCard] = useState(true)

    // Offers & Bargaining State
    const [offers, setOffers] = useState([])
    const [showOfferModal, setShowOfferModal] = useState(false)
    const [offerAmount, setOfferAmount] = useState('')
    const [offerMessage, setOfferMessage] = useState('')
    const [submittingOffer, setSubmittingOffer] = useState(false)

    // Checkout on accepted offer state
    const [checkoutProduct, setCheckoutProduct] = useState(null)

    // Escrow & Handshake State
    const [escrowTrades, setEscrowTrades] = useState([])
    const [showHandshakeModal, setShowHandshakeModal] = useState(false)
    const [arrangingMeetup, setArrangingMeetup] = useState(false)
    const [enteredPin, setEnteredPin] = useState('')
    const [verifyingPin, setVerifyingPin] = useState(false)
    const [pinResult, setPinResult] = useState(null)

    const messagesEndRef = useRef(null)
    const fileInputRef = useRef(null)

    // Load conversation + messages + offers + escrow trades
    useEffect(() => {
        if (!conversationId || !myId) return
        let unsubscribe = null
        let isMounted = true

        const safetyTimer = setTimeout(() => {
            if (isMounted) setLoading(false)
        }, 3000)

        async function load() {
            try {
                const conv = await getConversation(conversationId)
                if (!isMounted) return
                setConversation(conv)

                const [msgs, ofrs, trades] = await Promise.all([
                    getMessages(conversationId).catch(() => []),
                    getOffersForConversation(conversationId).catch(() => []),
                    getEscrowTradesForUser(myId).catch(() => []),
                ])
                if (!isMounted) return
                setMessages(msgs || [])
                setOffers(ofrs || [])
                setEscrowTrades(trades || [])

                // Mark as read
                markConversationRead(conversationId)

                // Load the other user's profile
                if (conv) {
                    const otherId = conv.buyerId === myId ? conv.sellerId : conv.buyerId
                    if (otherId) {
                        const other = await getUser(otherId)
                        if (isMounted) setOtherUser(other)
                    }
                }
            } catch (err) {
                console.error('Failed to load chat:', err)
            } finally {
                if (isMounted) setLoading(false)
            }

            // Subscribe to real-time messages
            unsubscribe = subscribeToMessages(conversationId, (newMsg) => {
                if (!isMounted) return
                setMessages(prev => {
                    const existingIdx = prev.findIndex(m => m.id === newMsg.id || (m.isOptimistic && m.text === newMsg.text && m.senderId === newMsg.senderId))
                    if (existingIdx !== -1) {
                        const copy = [...prev]
                        copy[existingIdx] = newMsg
                        return copy
                    }
                    return [...prev, newMsg]
                })
                markConversationRead(conversationId)
            })
        }

        load()
        return () => {
            isMounted = false
            clearTimeout(safetyTimer)
            if (unsubscribe) unsubscribe()
        }
    }, [conversationId, myId])

    // Auto-scroll to bottom
    useEffect(() => {
        // Guarded: not every environment implements scrollIntoView (jsdom, old TVs).
        messagesEndRef.current?.scrollIntoView?.({ behavior: 'smooth' })
    }, [messages, imagePreview])

    const handleSelectImage = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file (JPEG, PNG, WebP)')
            return
        }
        if (file.size > 10 * 1024 * 1024) {
            toast.error('Image is too large. Max 10MB.')
            return
        }

        setSelectedImageFile(file)
        const reader = new FileReader()
        reader.onload = () => setImagePreview(reader.result)
        reader.readAsDataURL(file)
    }

    const handleClearImage = () => {
        setImagePreview(null)
        setSelectedImageFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleSend = async (messageText) => {
        const msgContent = (messageText || text).trim()
        const hasImage = Boolean(selectedImageFile)
        if ((!msgContent && !hasImage) || sending) return

        const tempId = `temp-${Date.now()}`
        const optimisticMsg = {
            id: tempId,
            conversationId,
            senderId: myId,
            text: msgContent || (hasImage ? '📷 Uploading photo...' : ''),
            createdAt: new Date().toISOString(),
            isOptimistic: true,
            status: 'sending',
        }

        // 1. Optimistically append message to state immediately
        setMessages(prev => [...prev, optimisticMsg])
        setText('')
        setSending(true)

        let uploadedImageUrl = null

        try {
            // Upload image if attached
            if (selectedImageFile) {
                setUploadingImage(true)
                uploadedImageUrl = await uploadChatAttachment(selectedImageFile)
                handleClearImage()
            }

            const fullText = uploadedImageUrl 
                ? (msgContent ? `${msgContent}\n${uploadedImageUrl}` : uploadedImageUrl)
                : msgContent

            const realMsg = await sendMessage(conversationId, myId, fullText)

            // 2. Replace optimistic message with real message
            if (realMsg) {
                setMessages(prev => prev.map(m => m.id === tempId ? { ...realMsg, status: 'sent' } : m))
            }
        } catch (err) {
            console.error('Send failed:', err)
            toast.error('Message failed to send. Check network.')
            // Mark optimistic message as failed
            setMessages(prev => prev.map(m => m.id === tempId ? { ...m, status: 'failed' } : m))
            if (!hasImage) setText(msgContent) // Restore text on failure
        } finally {
            setSending(false)
            setUploadingImage(false)
        }
    }

    const handleCreateOffer = async (e) => {
        e.preventDefault()
        if (!offerAmount || Number(offerAmount) <= 0) return
        setSubmittingOffer(true)
        try {
            const newOffer = await createOffer({
                conversationId,
                listingId: item?.id || '',
                buyerId: myId,
                sellerId: conversation?.sellerId || otherUser?.uid || otherUser?.id,
                originalPrice: item?.price || 0,
                offerAmountNaira: Number(offerAmount),
                message: offerMessage || `Offered ₦${Number(offerAmount).toLocaleString()}`,
            })
            setOffers(prev => [newOffer, ...prev])
            setShowOfferModal(false)
            setOfferAmount('')
            setOfferMessage('')
            handleSend(`🤝 Made an offer of ₦${Number(offerAmount).toLocaleString()}`)
            toast.success('Offer sent to seller!')
        } catch (err) {
            console.error('Create offer error:', err)
            toast.error('Failed to submit offer')
        } finally {
            setSubmittingOffer(false)
        }
    }

    const handleRespondOffer = async (offerId, status) => {
        try {
            const updated = await respondToOffer(offerId, status)
            setOffers(prev => prev.map(o => o.id === offerId ? updated : o))
            if (status === 'accepted') {
                handleSend(`✅ Accepted offer of ₦${Number(updated.offer_amount_naira).toLocaleString()}! You can tap Pay to complete checkout.`)
                toast.success('Offer accepted!')
            } else {
                handleSend(`❌ Declined the offer of ₦${Number(updated.offer_amount_naira).toLocaleString()}.`)
                toast.info('Offer declined.')
            }
        } catch (err) {
            console.error('Respond offer error:', err)
            toast.error('Failed to update offer')
        }
    }

    const handleVerifyPin = async (tradeId) => {
        if (!enteredPin || enteredPin.length !== 4) return
        setVerifyingPin(true)
        setPinResult(null)
        try {
            const res = await verifyHandshakePin(tradeId, enteredPin)
            if (res.success) {
                setPinResult({ success: true, message: 'PIN verified — the item is marked handed over.' })
                setEscrowTrades(prev => prev.map(t => t.id === tradeId ? res.trade : t))
                handleSend(`🤝 Handshake PIN verified. ${item?.title || 'The item'} is marked handed over.`)
                toast.success('Trade completed!')
            } else {
                setPinResult({ success: false, message: res.error || 'Invalid Handshake PIN.' })
            }
        } catch (err) {
            setPinResult({ success: false, message: err.message || 'Verification failed.' })
        } finally {
            setVerifyingPin(false)
        }
    }

    if (!isAuthenticated) {
        return (
            <div className="zs-container">
                <div className="zs-panel" style={{ maxWidth: '28rem', margin: '0 auto', textAlign: 'center' }}>
                    <h1 style={{ margin: '0 0 0.5rem', fontSize: 'var(--zs-fs-h2)' }}>Sign in to chat</h1>
                    <p style={{ margin: '0 0 1.25rem', fontSize: 'var(--zs-fs-body)', lineHeight: 1.5, color: 'var(--color-text-secondary)' }}>
                        Conversations connect a buyer and a seller. Reading from the library never needs an account.
                    </p>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        <button type="button" className="zs-btn zs-btn--primary zs-btn--block" onClick={() => navigate('/login')}>
                            Sign in or register
                        </button>
                        <button type="button" className="zs-btn zs-btn--outline zs-btn--block" onClick={() => navigate('/library')}>
                            Open the library instead
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="zs-container" style={{ display: 'flex', justifyContent: 'center', paddingTop: '30vh' }}>
                <Loader2 size={26} color="var(--color-brand)" className="animate-spin" aria-label="Loading conversation" />
            </div>
        )
    }

    const item = conversation?.item || conversation?.listings || {}
    const otherName = otherUser?.displayName || 'Campus user'
    const otherPhone = otherUser?.phoneNumber || ''
    const itemImage = item?.images?.[0] || null
    const isBuyer = conversation?.buyerId === myId
    // The meetup for this thread: this listing, these two people. Picking the
    // reader's most recent trade instead (as this page used to) showed a PIN
    // from an unrelated conversation.
    const meetup = escrowTrades.find(
        (trade) =>
            String(trade.listing_id) === String(item?.id || '') &&
            (trade.buyer_id === myId || trade.seller_id === myId)
    ) || null

    const openHandshake = async () => {
        if (meetup) {
            setShowHandshakeModal(true)
            return
        }
        if (!isBuyer || !item?.id) return
        setArrangingMeetup(true)
        try {
            const trade = await arrangeMeetup({
                listingId: item.id,
                itemTitle: item.title,
                buyerId: myId,
                sellerId: conversation?.sellerId || otherUser?.uid || otherUser?.id,
                meetupLocation: item.lodge_location || 'Garba Square (Perm Site)',
                priceNaira: item.price,
            })
            setEscrowTrades((prev) => [trade, ...prev])
            setShowHandshakeModal(true)
            handleSend(`📍 Meetup arranged at ${trade.meetup_location}. I have the handshake PIN for handover.`)
            toast.success('Meetup arranged — your PIN is ready')
        } catch (err) {
            console.error('Arrange meetup error:', err)
            toast.error(err?.message || 'Could not arrange the meetup')
        } finally {
            setArrangingMeetup(false)
        }
    }

    const activeOffer = offers[0] || null
    const offerTone = activeOffer?.status === 'accepted' ? 'is-accepted' : activeOffer?.status === 'declined' ? 'is-declined' : ''

    let lastDate = ''

    return (
        <div className="zs-chat">
            {/* Who you are talking to */}
            <header className="zs-chat__head">
                <button type="button" className="zs-icon-btn" onClick={() => navigate('/messages')} aria-label="Back to messages">
                    <ArrowLeft size={18} />
                </button>

                <div className="zs-chat__avatar" aria-hidden="true">
                    {otherName.charAt(0).toUpperCase()}
                </div>

                <div className="zs-chat__identity">
                    <p className="zs-chat__name">
                        {otherName}
                        {otherUser?.isVerified && <span className="zs-tag zs-tag--free">Verified</span>}
                    </p>
                    {otherUser?.department && (
                        <p className="zs-chat__sub">
                            {otherUser.department}{otherUser?.level ? ` · ${otherUser.level}` : ''}
                        </p>
                    )}
                </div>

                <div className="zs-chat__actions">
                    {isBuyer && item?.id && (
                        <button type="button" className="zs-btn zs-btn--outline zs-btn--sm" onClick={() => setShowOfferModal(true)}>
                            <Tag size={13} /> Offer
                        </button>
                    )}
                    {(isBuyer || meetup) && !item?.isDigital && (
                        <button
                            type="button"
                            className="zs-icon-btn"
                            onClick={openHandshake}
                            disabled={arrangingMeetup}
                            aria-label={meetup ? `Campus handshake PIN for ${meetup.item_title}` : 'Arrange a meetup and get the handshake PIN'}
                        >
                            {arrangingMeetup ? <Loader2 size={16} className="animate-spin" /> : <Key size={16} />}
                        </button>
                    )}
                    <button
                        type="button"
                        className="zs-icon-btn"
                        onClick={() => setShowCallSheet(true)}
                        aria-label="Call"
                    >
                        <Phone size={16} />
                    </button>
                </div>
            </header>

            {/* What the thread is about */}
            {item?.title && showItemCard && (
                <div className="zs-chat__item">
                    <span className="zs-chat__item-thumb">
                        {itemImage ? <img src={itemImage} alt="" /> : item.isDigital ? <FileText size={16} /> : <Package size={16} />}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: 0, fontSize: 'var(--zs-fs-meta)', fontWeight: 700, color: 'var(--color-brand)' }}>
                            {formatNaira(item.price)} · {item.category || (item.isDigital ? 'Study material' : 'Physical item')}
                        </p>
                        <p className="zs-chat__item-title">{item.title}</p>
                    </div>
                    {item.id && (
                        <Link to={`/item/${item.id}`} className="zs-btn zs-btn--soft zs-btn--sm">
                            View <ExternalLink size={11} />
                        </Link>
                    )}
                    <button
                        type="button"
                        className="zs-icon-btn"
                        onClick={() => setShowItemCard(false)}
                        aria-label="Hide item summary"
                        style={{ width: '1.85rem', height: '1.85rem' }}
                    >
                        <X size={14} />
                    </button>
                </div>
            )}

            {/* Live offer */}
            {activeOffer && (
                <div className={`zs-chat__offer ${offerTone}`}>
                    <div style={{ minWidth: 0 }}>
                        <span className="zs-chat__offer-label">
                            <Tag size={13} aria-hidden="true" />
                            Offer {formatNaira(activeOffer.offer_amount_naira)}
                            <span className="zs-tag zs-tag--muted">{activeOffer.status}</span>
                        </span>
                        <p style={{ margin: '0.1rem 0 0', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-secondary)' }}>
                            {activeOffer.buyer_id === myId ? 'You made this offer' : `${otherName} offered this price`}
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '0.35rem', flexShrink: 0 }}>
                        {!isBuyer && activeOffer.status === 'pending' && (
                            <>
                                <button type="button" className="zs-btn zs-btn--green zs-btn--sm" onClick={() => handleRespondOffer(activeOffer.id, 'accepted')}>
                                    Accept
                                </button>
                                <button type="button" className="zs-btn zs-btn--outline zs-btn--sm" onClick={() => handleRespondOffer(activeOffer.id, 'declined')}>
                                    Decline
                                </button>
                            </>
                        )}
                        {isBuyer && activeOffer.status === 'accepted' && (
                            <button
                                type="button"
                                className="zs-btn zs-btn--primary zs-btn--sm"
                                onClick={() =>
                                    setCheckoutProduct({
                                        id: item?.id,
                                        title: item?.title || 'Negotiated purchase',
                                        price: activeOffer.offer_amount_naira * 100,
                                        isDigital: item?.isDigital || false,
                                        seller_id: conversation?.sellerId || otherUser?.uid || otherUser?.id,
                                    })
                                }
                            >
                                <DollarSign size={13} /> Pay {formatNaira(activeOffer.offer_amount_naira)}
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Meetup already arranged: say whose turn it is */}
            {meetup && (
                <button
                    type="button"
                    className="zs-chat__offer is-accepted"
                    style={{ textAlign: 'left', cursor: 'pointer', font: 'inherit', width: '100%' }}
                    onClick={() => setShowHandshakeModal(true)}
                >
                    <div style={{ minWidth: 0 }}>
                        <span className="zs-chat__offer-label">
                            <Key size={13} aria-hidden="true" />
                            {meetup.status === 'delivered' ? 'Handed over' : 'Meetup arranged'}
                            <span className="zs-tag zs-tag--muted">{meetup.meetup_location}</span>
                        </span>
                        <p style={{ margin: '0.1rem 0 0', fontSize: 'var(--zs-fs-meta)', color: 'var(--color-text-secondary)' }}>
                            {meetup.status === 'delivered'
                                ? `${meetup.item_title} changed hands. No money moved through ZikShare.`
                                : isBuyer
                                  ? 'Your handshake PIN is ready. Pay the seller in person, then give them the PIN.'
                                  : 'Ask the buyer for their 4-digit PIN once you have handed the item over.'}
                        </p>
                    </div>
                    <span className="zs-btn zs-btn--soft zs-btn--sm" style={{ flexShrink: 0 }}>
                        {meetup.status === 'delivered' ? 'Details' : isBuyer ? 'Show PIN' : 'Enter PIN'}
                    </span>
                </button>
            )}

            {/* Messages */}
            <div className="zs-chat__scroll">
                <div className="zs-notice" style={{ marginBottom: '0.5rem' }}>
                    <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: '0.1rem' }} aria-hidden="true" />
                    <p style={{ margin: 0 }}>
                        Meet at a campus safe zone (Garba Square, Chisco Park, Student Center) and inspect a
                        physical item before paying.
                    </p>
                </div>

                {messages.length === 0 && (
                    <p style={{ textAlign: 'center', margin: '1.5rem 0', fontSize: 'var(--zs-fs-small)', color: 'var(--color-text-muted)' }}>
                        No messages yet — say hello, or ask whether the item is still available.
                    </p>
                )}

                {messages.map((msg) => {
                    const isMe = msg.senderId === myId
                    const msgDate = dateLabel(msg.createdAt)
                    let showDateHeader = false
                    if (msgDate !== lastDate) {
                        lastDate = msgDate
                        showDateHeader = true
                    }

                    const lines = (msg.text || '').split('\n')
                    const imageUrlMatch = lines.find(
                        (l) => l.startsWith('http') && (l.includes('cloudinary') || l.includes('image') || l.endsWith('.jpg') || l.endsWith('.png') || l.endsWith('.webp'))
                    )
                    const cleanText = lines.filter((l) => l !== imageUrlMatch).join('\n')

                    return (
                        <div key={msg.id}>
                            {showDateHeader && <div className="zs-chat__day">{msgDate}</div>}
                            <div className={`zs-msg${isMe ? ' zs-msg--me' : ''}`}>
                                <div className="zs-msg__bubble">
                                    {imageUrlMatch && <img src={imageUrlMatch} alt="Chat attachment" loading="lazy" />}
                                    {cleanText && <p className="zs-msg__text">{cleanText}</p>}
                                    <div className="zs-msg__meta">
                                        <span>{timeLabel(msg.createdAt)}</span>
                                        {isMe && (
                                            msg.status === 'sending' ? (
                                                <Loader2 size={10} className="animate-spin" />
                                            ) : msg.status === 'failed' ? (
                                                <span>Not sent</span>
                                            ) : (
                                                <CheckCheck size={12} aria-label="Sent" />
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Photo staged for sending */}
            {imagePreview && (
                <div className="zs-chat__pending">
                    <img src={imagePreview} alt="Preview of the selected photo" style={{ width: '2.2rem', height: '2.2rem', borderRadius: '0.35rem', objectFit: 'cover' }} />
                    <span style={{ flex: 1 }}>Photo ready to send</span>
                    <button type="button" className="zs-icon-btn" onClick={handleClearImage} aria-label="Remove photo" style={{ width: '1.85rem', height: '1.85rem' }}>
                        <X size={14} />
                    </button>
                </div>
            )}

            {/* One-tap replies */}
            <div className="zs-quick">
                {campusQuickReplies.map((qr) => (
                    <button key={qr} type="button" onClick={() => handleSend(qr)}>
                        {qr}
                    </button>
                ))}
            </div>

            {/* Composer */}
            <div className="zs-composer">
                <input type="file" ref={fileInputRef} onChange={handleSelectImage} accept="image/*" style={{ display: 'none' }} />
                <button
                    type="button"
                    className="zs-icon-btn"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="Attach a photo"
                    disabled={uploadingImage}
                >
                    <ImageIcon size={18} />
                </button>

                <input
                    type="text"
                    placeholder="Write a message"
                    aria-label="Message"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            handleSend()
                        }
                    }}
                />

                <button
                    type="button"
                    className="zs-composer__send"
                    onClick={() => handleSend()}
                    disabled={(!text.trim() && !selectedImageFile) || sending}
                    aria-label="Send message"
                >
                    {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
            </div>

            {/* Call sheet */}
            {showCallSheet && (
                <div className="zs-sheet-backdrop" role="dialog" aria-modal="true" aria-label="Contact details" onClick={() => setShowCallSheet(false)}>
                    <div className="zs-sheet" onClick={(e) => e.stopPropagation()}>
                        <div className="zs-sheet__head">
                            <strong style={{ fontSize: 'var(--zs-fs-card)' }}>{otherName}</strong>
                            <button type="button" className="zs-icon-btn" onClick={() => setShowCallSheet(false)} aria-label="Close">
                                <X size={16} />
                            </button>
                        </div>
                        <div className="zs-sheet__body">
                            {otherPhone ? (
                                <>
                                    <p style={{ margin: 0, fontSize: 'var(--zs-fs-body)', color: 'var(--color-text-secondary)' }}>
                                        Call only to arrange a meetup. Never send money before you have the item.
                                    </p>
                                    <code style={{ fontSize: '1.05rem', fontWeight: 700 }}>{otherPhone}</code>
                                    <a href={`tel:${otherPhone}`} className="zs-btn zs-btn--green zs-btn--block">
                                        <Phone size={15} /> Call {otherName}
                                    </a>
                                </>
                            ) : (
                                <p style={{ margin: 0, fontSize: 'var(--zs-fs-body)', color: 'var(--color-text-secondary)' }}>
                                    {otherName} has not added a phone number. Use chat to arrange the meetup.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Offer sheet */}
            {showOfferModal && (
                <div className="zs-sheet-backdrop" role="dialog" aria-modal="true" aria-label="Make an offer" onClick={() => setShowOfferModal(false)}>
                    <form className="zs-sheet" onSubmit={handleCreateOffer} onClick={(e) => e.stopPropagation()}>
                        <div className="zs-sheet__head">
                            <strong style={{ fontSize: 'var(--zs-fs-card)' }}>Offer a price</strong>
                            <button type="button" className="zs-icon-btn" onClick={() => setShowOfferModal(false)} aria-label="Close">
                                <X size={16} />
                            </button>
                        </div>
                        <div className="zs-sheet__body">
                            <p style={{ margin: 0, fontSize: 'var(--zs-fs-small)', color: 'var(--color-text-secondary)' }}>
                                Listed at <strong>{formatNaira(item?.price)}</strong>. The seller can accept or decline.
                            </p>
                            <div>
                                <label className="zs-label" htmlFor="offer-amount">Your offer (₦)</label>
                                <input
                                    id="offer-amount"
                                    className="zs-input"
                                    type="number"
                                    placeholder="e.g. 2500"
                                    value={offerAmount}
                                    onChange={(e) => setOfferAmount(e.target.value)}
                                    required
                                    min="1"
                                />
                            </div>
                            <div>
                                <label className="zs-label" htmlFor="offer-note">Note to the seller (optional)</label>
                                <input
                                    id="offer-note"
                                    className="zs-input"
                                    type="text"
                                    placeholder="e.g. I can pick it up today"
                                    value={offerMessage}
                                    onChange={(e) => setOfferMessage(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="zs-sheet__foot">
                            <button type="button" className="zs-btn zs-btn--outline" onClick={() => setShowOfferModal(false)}>
                                Cancel
                            </button>
                            <button type="submit" className="zs-btn zs-btn--primary zs-btn--block" disabled={submittingOffer}>
                                {submittingOffer ? <Loader2 size={15} className="animate-spin" /> : <Tag size={15} />}
                                {submittingOffer ? 'Sending…' : 'Send offer'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Handshake PIN sheet */}
            {showHandshakeModal && (
                <div className="zs-sheet-backdrop" role="dialog" aria-modal="true" aria-label="Campus handshake" onClick={() => setShowHandshakeModal(false)}>
                    <div className="zs-sheet" onClick={(e) => e.stopPropagation()}>
                        <div className="zs-sheet__head">
                            <strong style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: 'var(--zs-fs-card)' }}>
                                <ShieldCheck size={16} color="var(--color-campus-green)" aria-hidden="true" /> Campus handshake
                            </strong>
                            <button type="button" className="zs-icon-btn" onClick={() => setShowHandshakeModal(false)} aria-label="Close">
                                <X size={16} />
                            </button>
                        </div>
                        <div className="zs-sheet__body">
                            <p style={{ margin: 0, fontSize: 'var(--zs-fs-small)', lineHeight: 1.5, color: 'var(--color-text-secondary)' }}>
                                {!meetup
                                    ? 'Arrange the meetup first, then this PIN appears. ZikShare never holds your money — you pay the seller yourself when you meet.'
                                    : isBuyer
                                      ? 'Pay the seller in person, check the item, then read this PIN out. It marks the item as handed over. ZikShare holds no money at any point.'
                                      : 'Enter the buyer’s 4-digit PIN once you have handed the item over and been paid. It marks the meetup complete.'}
                            </p>

                            {!isBuyer ? (
                                <>
                                    <div>
                                        <label className="zs-label" htmlFor="handshake-pin">Buyer’s 4-digit PIN</label>
                                        <input
                                            id="handshake-pin"
                                            className="zs-input zs-input--code"
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={4}
                                            placeholder="0000"
                                            value={enteredPin}
                                            onChange={(e) => setEnteredPin(e.target.value)}
                                        />
                                    </div>
                                    {pinResult && (
                                        <p style={{ margin: 0, fontSize: 'var(--zs-fs-small)', fontWeight: 600, color: pinResult.success ? 'var(--color-campus-green)' : 'var(--color-danger)' }}>
                                            {pinResult.message}
                                        </p>
                                    )}
                                    <button
                                        type="button"
                                        className="zs-btn zs-btn--green zs-btn--block"
                                        onClick={() => handleVerifyPin(meetup?.id)}
                                        disabled={verifyingPin || enteredPin.length !== 4}
                                    >
                                        {verifyingPin ? <Loader2 size={15} className="animate-spin" /> : <ShieldCheck size={15} />}
                                        {verifyingPin ? 'Checking…' : 'Mark as handed over'}
                                    </button>
                                </>
                            ) : (
                                <div className="zs-pin">
                                    <p style={{ margin: 0, fontSize: 'var(--zs-fs-meta)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-success-text)' }}>
                                        Your handshake PIN
                                    </p>
                                    <p className="zs-pin__value">{meetup?.handshake_pin || '••••'}</p>
                                    <p style={{ margin: 0, fontSize: 'var(--zs-fs-meta)', color: 'var(--color-success-text)' }}>
                                        {meetup
                                            ? `Pay ${otherName} in person, check the item, then read this out.`
                                            : 'It appears here once the meetup is arranged.'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {checkoutProduct && (
                <PaystackCheckout
                    product={checkoutProduct}
                    onSuccess={() => {
                        setCheckoutProduct(null)
                        handleSend(`💳 Payment of ${formatNaira(checkoutProduct.price / 100)} completed successfully!`)
                        toast.success('Payment completed!')
                    }}
                    onClose={() => setCheckoutProduct(null)}
                />
            )}
        </div>
    )
}
