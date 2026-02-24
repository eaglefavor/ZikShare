import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Heart, Share2, MapPin, ShieldCheck, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

// Mock data — will be replaced with Supabase query in Phase 3
const mockItem = {
    id: '1',
    title: 'Engineering Textbook — Thermodynamics (300L)',
    description: 'Used for one semester only. Pages are clean with minor highlighting. Includes all chapters. Pick up at your convenience around campus.',
    price: 3500,
    category: 'Books',
    condition: 'Fairly Used',
    status: 'Active',
    images: [null, null, null], // placeholders
    seller: {
        displayName: 'Chike Obi',
        department: 'Mechanical Engineering',
        isVerified: true,
        phoneNumber: '2348012345678',
    },
    createdAt: new Date().toISOString(),
}

function formatNaira(amount) {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount)
}

function formatDate(iso) {
    return new Intl.DateTimeFormat('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso))
}

export default function ItemDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [currentImage, setCurrentImage] = useState(0)
    const [isSaved, setIsSaved] = useState(false)
    const item = mockItem // will be replaced by useCachedQuery

    const condClass = {
        'Brand New': 'condition-new',
        'Like New': 'condition-like-new',
        'Fairly Used': 'condition-used',
    }

    const whatsappUrl = `https://wa.me/${item.seller.phoneNumber}?text=${encodeURIComponent(
        `Hi, I saw your listing for "${item.title}" on ZikShare. Is it still available?`
    )}`

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: item.title,
                text: `Check out "${item.title}" on ZikShare for ${formatNaira(item.price)}`,
                url: window.location.href,
            })
        } else {
            await navigator.clipboard.writeText(window.location.href)
            alert('Link copied!')
        }
    }

    const placeholderColors = ['#DBEAFE', '#E0E7FF', '#D1FAE5']

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
            {/* Image Carousel */}
            <div style={{ position: 'relative' }}>
                <div
                    style={{
                        width: '100%',
                        height: '280px',
                        backgroundColor: placeholderColors[currentImage % placeholderColors.length],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '4rem',
                    }}
                >
                    📦
                </div>

                {/* Top navigation overlay */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        padding: '0.75rem 1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.15), transparent)',
                    }}
                >
                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            width: '2.25rem',
                            height: '2.25rem',
                            borderRadius: '9999px',
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            backdropFilter: 'blur(8px)',
                        }}
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            onClick={handleShare}
                            style={{
                                width: '2.25rem',
                                height: '2.25rem',
                                borderRadius: '9999px',
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                backdropFilter: 'blur(8px)',
                            }}
                        >
                            <Share2 size={16} />
                        </button>
                        <button
                            onClick={() => setIsSaved(!isSaved)}
                            style={{
                                width: '2.25rem',
                                height: '2.25rem',
                                borderRadius: '9999px',
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                backdropFilter: 'blur(8px)',
                            }}
                        >
                            <Heart size={16} fill={isSaved ? '#EF4444' : 'none'} color={isSaved ? '#EF4444' : '#1E293B'} />
                        </button>
                    </div>
                </div>

                {/* Image dots */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '0.75rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '0.375rem',
                    }}
                >
                    {item.images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentImage(i)}
                            style={{
                                width: currentImage === i ? '1.25rem' : '0.375rem',
                                height: '0.375rem',
                                borderRadius: '9999px',
                                border: 'none',
                                cursor: 'pointer',
                                backgroundColor: currentImage === i ? 'var(--color-brand)' : 'rgba(255,255,255,0.6)',
                                transition: 'all 0.2s ease',
                            }}
                        />
                    ))}
                </div>

                {/* Carousel arrows */}
                {currentImage > 0 && (
                    <button
                        onClick={() => setCurrentImage(currentImage - 1)}
                        style={{
                            position: 'absolute', left: '0.5rem', top: '50%', transform: 'translateY(-50%)',
                            width: '2rem', height: '2rem', borderRadius: '9999px',
                            backgroundColor: 'rgba(255,255,255,0.8)', border: 'none',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                        }}
                    >
                        <ChevronLeft size={16} />
                    </button>
                )}
                {currentImage < item.images.length - 1 && (
                    <button
                        onClick={() => setCurrentImage(currentImage + 1)}
                        style={{
                            position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)',
                            width: '2rem', height: '2rem', borderRadius: '9999px',
                            backgroundColor: 'rgba(255,255,255,0.8)', border: 'none',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                        }}
                    >
                        <ChevronRight size={16} />
                    </button>
                )}
            </div>

            {/* Content */}
            <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '1rem 1rem 0 0', marginTop: '-0.75rem', position: 'relative' }}>
                {/* Price & Condition */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <p className="price-tag" style={{ margin: 0, fontSize: '1.375rem' }}>
                        {formatNaira(item.price)}
                    </p>
                    <span className={`condition-badge ${condClass[item.condition] || ''}`}>{item.condition}</span>
                </div>

                {/* Title */}
                <h1 style={{ margin: '0 0 0.375rem', fontSize: '1.0625rem', fontWeight: 700, lineHeight: 1.3 }}>
                    {item.title}
                </h1>

                {/* Meta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.6875rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                    <span>{item.category}</span>
                    <span>•</span>
                    <span>Listed {formatDate(item.createdAt)}</span>
                </div>

                {/* Description */}
                <div style={{ marginBottom: '1.25rem' }}>
                    <h3 style={{ margin: '0 0 0.375rem', fontSize: '0.875rem', fontWeight: 600 }}>Description</h3>
                    <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                        {item.description}
                    </p>
                </div>

                {/* Seller Card */}
                <div
                    style={{
                        padding: '0.875rem',
                        borderRadius: '0.75rem',
                        backgroundColor: 'var(--color-background)',
                        border: '1px solid var(--color-border)',
                        marginBottom: '1rem',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div
                            style={{
                                width: '2.75rem',
                                height: '2.75rem',
                                borderRadius: '9999px',
                                background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '1rem',
                                fontWeight: 700,
                            }}
                        >
                            {item.seller.displayName.charAt(0)}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600 }}>{item.seller.displayName}</p>
                                {item.seller.isVerified && (
                                    <ShieldCheck size={14} color="var(--color-campus-green)" />
                                )}
                            </div>
                            <p style={{ margin: '0.125rem 0 0', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                                {item.seller.department}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Safe Meetup */}
                <div
                    style={{
                        padding: '0.75rem',
                        borderRadius: '0.75rem',
                        backgroundColor: '#F0FDF4',
                        border: '1px solid #BBF7D0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.625rem',
                        marginBottom: '1.5rem',
                    }}
                >
                    <MapPin size={16} color="#166534" />
                    <p style={{ margin: 0, fontSize: '0.6875rem', color: '#166534', lineHeight: 1.3 }}>
                        <strong>Safe Meetup:</strong> Meet at Garba Square, Chisco Park, or the Student Center.
                    </p>
                </div>
            </div>

            {/* Sticky CTA */}
            <div
                style={{
                    position: 'sticky',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '0.75rem 1rem',
                    backgroundColor: 'white',
                    borderTop: '1px solid var(--color-border)',
                    display: 'flex',
                    gap: '0.75rem',
                }}
            >
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        flex: 1,
                        padding: '0.75rem',
                        borderRadius: '0.75rem',
                        border: 'none',
                        background: 'linear-gradient(135deg, #22C55E, #16A34A)',
                        color: 'white',
                        fontSize: '0.9375rem',
                        fontWeight: 700,
                        fontFamily: 'inherit',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        textAlign: 'center',
                        boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                    }}
                >
                    <MessageCircle size={18} />
                    Contact Seller
                </a>
            </div>
        </div>
    )
}
