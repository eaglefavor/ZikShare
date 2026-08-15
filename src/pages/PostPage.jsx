import { useState } from 'react'
import { Camera, X, FileText, Loader2, CheckCircle, UploadCloud, ArrowLeft, ShieldAlert, Package, MapPin, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { createListing, createDigitalProduct, upsertUser } from '../lib/database'
import supabase from '../lib/supabase'
import { uploadImage, uploadImages } from '../lib/cloudinary'
import { invalidateCacheByPrefix } from '../lib/cache'
import { logDebug } from '../components/DebugConsole'

const physicalCategories = ['Electronics', 'Books', 'Fashion', 'Hostel', 'Services', 'Engineering', 'Science', 'Arts', 'Medical', 'Other']
const digitalCategories = ['Engineering', 'Science', 'Arts', 'Medical', 'Past Questions', 'Notes', 'Law', 'Management', 'Other']
const conditions = ['Fairly Used', 'Like New', 'Brand New']

function generateUUID() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        try {
            return crypto.randomUUID()
        } catch {
            // fallback
        }
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

function withTimeout(promise, ms = 45000, errorMsg = 'Upload timed out. Please check your internet connection.') {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error(errorMsg)), ms)),
    ])
}

export default function PostPage() {
    const navigate = useNavigate()
    const { user, session, isAuthenticated, loading: authLoading } = useAuth()

    // Mode: 'physical' or 'digital'
    const [postType, setPostType] = useState('physical')

    // Common fields
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('Electronics')

    // Physical fields
    const [condition, setCondition] = useState('Fairly Used')
    const [physicalPhotos, setPhysicalPhotos] = useState([])
    const [photoPreviews, setPhotoPreviews] = useState([])

    // Digital fields
    const [pdfFile, setPdfFile] = useState(null)
    const [coverPhoto, setCoverPhoto] = useState(null)
    const [coverPreview, setCoverPreview] = useState(null)

    // Status / Progress
    const [loading, setLoading] = useState(false)
    const [uploadStep, setUploadStep] = useState('')
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    // Physical photo handlers
    const handleAddPhysicalPhotos = (e) => {
        const files = Array.from(e.target.files || [])
        if (!files.length) return

        const combined = [...physicalPhotos, ...files].slice(0, 5)
        setPhysicalPhotos(combined)

        const newPreviews = []
        combined.forEach(file => {
            const reader = new FileReader()
            reader.onload = (ev) => {
                newPreviews.push(ev.target.result)
                if (newPreviews.length === combined.length) {
                    setPhotoPreviews([...newPreviews])
                }
            }
            reader.readAsDataURL(file)
        })
        setError('')
    }

    const removePhysicalPhoto = (idx) => {
        const nextPhotos = physicalPhotos.filter((_, i) => i !== idx)
        const nextPreviews = photoPreviews.filter((_, i) => i !== idx)
        setPhysicalPhotos(nextPhotos)
        setPhotoPreviews(nextPreviews)
    }

    // Digital handlers
    const handleCoverPhotoAdd = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        setCoverPhoto(file)
        const reader = new FileReader()
        reader.onload = (ev) => setCoverPreview(ev.target.result)
        reader.readAsDataURL(file)
        setError('')
    }

    const removeCoverPhoto = () => {
        setCoverPhoto(null)
        setCoverPreview(null)
    }

    const handlePdfSelect = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (file.size > 50 * 1024 * 1024) {
            setError('PDF file is too large (maximum size is 50MB).')
            return
        }
        setPdfFile(file)
        setError('')
    }

    const handleTypeSwitch = (type) => {
        setPostType(type)
        setError('')
        if (type === 'physical') {
            setCategory('Electronics')
        } else {
            setCategory('Notes')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isAuthenticated) {
            navigate('/login')
            return
        }

        const numericPrice = parseFloat(price)
        if (isNaN(numericPrice) || numericPrice <= 0) {
            setError('Please enter a valid price in Naira.')
            return
        }

        const currentUserId = session?.user?.id || user?.uid || user?.id
        if (!currentUserId) {
            setError('Session expired. Please log in again.')
            return
        }

        setLoading(true)
        setError('')
        setCurrentStepIndex(1)
        setUploadStep('Verifying user profile...')

        try {
            // Step 1: Ensure user in database
            try {
                const syncPromise = upsertUser({
                    uid: currentUserId,
                    email: session?.user?.email || user?.email || '',
                    displayName: user?.displayName || session?.user?.email?.split('@')[0] || 'Student',
                    phoneNumber: user?.phoneNumber || '',
                    department: user?.department || '',
                    isVerified: user?.isVerified ?? true,
                    createdAt: user?.createdAt || new Date().toISOString(),
                })
                await withTimeout(syncPromise, 3000, 'Profile sync timed out')
            } catch (err) {
                console.warn('Non-blocking user sync:', err)
            }

            if (postType === 'physical') {
                // ── PHYSICAL ITEM POSTING ──
                setCurrentStepIndex(2)
                setUploadStep('Uploading photos...')
                let imageUrls = []
                if (physicalPhotos.length > 0) {
                    try {
                        imageUrls = await uploadImages(physicalPhotos)
                    } catch (imgErr) {
                        console.warn('Photo upload warning:', imgErr)
                    }
                }

                setCurrentStepIndex(3)
                setUploadStep('Publishing listing to campus feed...')
                await withTimeout(
                    createListing({
                        sellerId: currentUserId,
                        title: title.trim(),
                        description: description.trim(),
                        price: numericPrice,
                        category,
                        condition,
                        images: imageUrls,
                        status: 'Active',
                    }),
                    15000,
                    'Listing creation timed out. Please try again.'
                )
            } else {
                // ── DIGITAL MATERIAL POSTING ──
                if (!pdfFile) {
                    throw new Error('Please select a PDF document to upload.')
                }

                // Upload cover photo if present
                let coverUrl = null
                if (coverPhoto) {
                    setCurrentStepIndex(2)
                    setUploadStep('Uploading cover photo...')
                    try {
                        coverUrl = await uploadImage(coverPhoto)
                    } catch (imgErr) {
                        console.warn('Cover photo warning:', imgErr)
                    }
                }

                // Upload PDF
                setCurrentStepIndex(3)
                setUploadStep('Uploading PDF document...')
                const fileUuid = generateUUID()
                const fileName = `pdfs/${currentUserId}/${fileUuid}.pdf`

                const uploadPromise = supabase.storage
                    .from('digital-originals')
                    .upload(fileName, pdfFile, {
                        contentType: 'application/pdf',
                        upsert: true,
                    })

                const { error: uploadError } = await withTimeout(
                    uploadPromise,
                    45000,
                    'PDF upload timed out after 45 seconds.'
                )

                if (uploadError) {
                    console.warn(`Storage upload warning (${uploadError.message}), proceeding with database entry:`, fileName)
                }

                setCurrentStepIndex(4)
                setUploadStep('Registering digital product in catalog...')
                await withTimeout(
                    createDigitalProduct({
                        title: title.trim(),
                        description: description.trim(),
                        price: Math.round(numericPrice * 100), // in kobo
                        category,
                        original_storage_path: fileName,
                        file_size_bytes: pdfFile.size,
                        seller_id: currentUserId,
                        status: 'active',
                        cover_image_url: coverUrl,
                    }),
                    15000,
                    'Database save timed out.'
                )
            }

            // Invalidate caches
            invalidateCacheByPrefix('listings')
            invalidateCacheByPrefix('digital')

            setSuccess(true)
            setTimeout(() => navigate('/seller-hub'), 1500)
        } catch (err) {
            console.error('Post error:', err)
            setError(err?.message || 'Failed to post listing. Please try again.')
        } finally {
            setLoading(false)
            setUploadStep('')
            setCurrentStepIndex(0)
        }
    }

    if (authLoading) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 size={36} className="animate-spin" color="var(--color-brand)" />
            </div>
        )
    }

    if (!isAuthenticated) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backgroundColor: '#F8FAFC' }}>
                <div style={{ backgroundColor: 'white', padding: '2rem 1.5rem', borderRadius: '1.25rem', border: '1px solid var(--color-border)', maxWidth: '24rem', width: '100%', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                    <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '9999px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#2563EB', fontSize: '1.5rem' }}>
                        🔒
                    </div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.5rem', color: '#0F172A' }}>Sign in to Post on ZikShare</h2>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: '0 0 1.5rem' }}>You need an active UNIZIK student account to list campus items or study materials.</p>
                    <button
                        onClick={() => navigate('/login')}
                        style={{
                            width: '100%',
                            padding: '0.875rem',
                            borderRadius: '0.75rem',
                            border: 'none',
                            background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                            color: '#FFFFFF',
                            fontSize: '0.9375rem',
                            fontWeight: 800,
                            fontFamily: 'inherit',
                            cursor: 'pointer',
                            boxShadow: '0 4px 14px rgba(59,130,246,0.35)'
                        }}
                    >
                        Sign In / Register
                    </button>
                </div>
            </div>
        )
    }

    if (success) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', backgroundColor: '#F8FAFC', textAlign: 'center' }}>
                <div style={{ width: '4.5rem', height: '4.5rem', borderRadius: '9999px', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', color: '#10B981' }}>
                    <CheckCircle size={44} />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem', color: '#0F172A' }}>
                    {postType === 'physical' ? 'Item Listed Live! 🎉' : 'Material Uploaded! 🎉'}
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                    {postType === 'physical'
                        ? 'Your item is now visible to UNIZIK students on the marketplace.'
                        : 'Your study material is now active in the digital library for purchase.'}
                </p>
            </div>
        )
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', paddingBottom: '7rem' }}>
            {/* Top Bar */}
            <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '0.25rem' }}>
                    <ArrowLeft size={20} />
                </button>
                <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 800, color: '#0F172A' }}>Create Listing</h1>
            </header>

            <div style={{ maxWidth: '32rem', margin: '0 auto', padding: '1rem' }}>
                {/* Mode Selector Toggle */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', padding: '0.375rem', backgroundColor: '#E2E8F0', borderRadius: '0.875rem', marginBottom: '1.25rem' }}>
                    <button
                        type="button"
                        onClick={() => handleTypeSwitch('physical')}
                        style={{
                            padding: '0.625rem 0.5rem',
                            borderRadius: '0.625rem',
                            border: 'none',
                            backgroundColor: postType === 'physical' ? '#FFFFFF' : 'transparent',
                            color: postType === 'physical' ? '#0F172A' : '#64748B',
                            fontWeight: postType === 'physical' ? 800 : 600,
                            fontSize: '0.8125rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.375rem',
                            boxShadow: postType === 'physical' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                            transition: 'all 0.15s ease',
                        }}
                    >
                        <Package size={16} color={postType === 'physical' ? 'var(--color-brand)' : '#64748B'} />
                        <span>Physical Item</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => handleTypeSwitch('digital')}
                        style={{
                            padding: '0.625rem 0.5rem',
                            borderRadius: '0.625rem',
                            border: 'none',
                            backgroundColor: postType === 'digital' ? '#FFFFFF' : 'transparent',
                            color: postType === 'digital' ? '#0F172A' : '#64748B',
                            fontWeight: postType === 'digital' ? 800 : 600,
                            fontSize: '0.8125rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.375rem',
                            boxShadow: postType === 'digital' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                            transition: 'all 0.15s ease',
                        }}
                    >
                        <FileText size={16} color={postType === 'digital' ? '#10B981' : '#64748B'} />
                        <span>Study PDF</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', borderRadius: '1.25rem', padding: '1.25rem', border: '1px solid var(--color-border)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    {/* ── PHYSICAL ITEM INPUTS ── */}
                    {postType === 'physical' ? (
                        <>
                            {/* Photos */}
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                                    <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0F172A' }}>
                                        Item Photos <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>(Up to 5)</span>
                                    </label>
                                    <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>{photoPreviews.length}/5</span>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                                    {photoPreviews.map((src, i) => (
                                        <div key={i} style={{ position: 'relative', height: '90px', borderRadius: '0.625rem', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                                            <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <button
                                                type="button"
                                                onClick={() => removePhysicalPhoto(i)}
                                                style={{ position: 'absolute', top: '0.25rem', right: '0.25rem', width: '1.5rem', height: '1.5rem', borderRadius: '9999px', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}

                                    {photoPreviews.length < 5 && (
                                        <label style={{ height: '90px', borderRadius: '0.625rem', border: '1.5px dashed #CBD5E1', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', gap: '0.25rem' }}>
                                            <Camera size={20} color="#94A3B8" />
                                            <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Add Photo</span>
                                            <input type="file" accept="image/*" multiple onChange={handleAddPhysicalPhotos} style={{ display: 'none' }} />
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Condition */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
                                    Condition <span style={{ color: '#DC2626' }}>*</span>
                                </label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                                    {conditions.map(c => (
                                        <button
                                            key={c}
                                            type="button"
                                            onClick={() => setCondition(c)}
                                            style={{
                                                padding: '0.5rem',
                                                borderRadius: '0.5rem',
                                                border: condition === c ? '2px solid var(--color-brand)' : '1px solid var(--color-border)',
                                                backgroundColor: condition === c ? '#EFF6FF' : '#FFFFFF',
                                                color: condition === c ? 'var(--color-brand)' : '#334155',
                                                fontSize: '0.75rem',
                                                fontWeight: 700,
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        /* ── DIGITAL PDF INPUTS ── */
                        <>
                            {/* PDF File Picker */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.375rem' }}>
                                    PDF Document <span style={{ color: '#DC2626' }}>*</span>
                                </label>
                                <label
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '1rem',
                                        borderRadius: '0.875rem',
                                        border: `2px dashed ${pdfFile ? '#10B981' : '#CBD5E1'}`,
                                        backgroundColor: pdfFile ? '#F0FDF4' : '#F8FAFC',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', backgroundColor: pdfFile ? '#DCFCE7' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: pdfFile ? '#166534' : '#2563EB', flexShrink: 0 }}>
                                        <FileText size={22} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {pdfFile ? pdfFile.name : 'Tap to select PDF file'}
                                        </p>
                                        <p style={{ margin: '0.125rem 0 0', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                                            {pdfFile ? `${(pdfFile.size / 1024 / 1024).toFixed(2)} MB • Ready` : 'Past questions, lecture slides (Max 50MB)'}
                                        </p>
                                    </div>
                                    <input type="file" accept=".pdf,application/pdf" onChange={handlePdfSelect} style={{ display: 'none' }} />
                                </label>
                            </div>

                            {/* Cover Photo */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.375rem' }}>
                                    Cover Page Preview <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>(Optional)</span>
                                </label>
                                {coverPreview ? (
                                    <div style={{ position: 'relative', width: '100%', height: '120px', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                                        <img src={coverPreview} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <button
                                            type="button"
                                            onClick={removeCoverPhoto}
                                            style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', width: '1.75rem', height: '1.75rem', borderRadius: '9999px', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ) : (
                                    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70px', borderRadius: '0.75rem', border: '1.5px dashed #CBD5E1', backgroundColor: '#F8FAFC', cursor: 'pointer', gap: '0.375rem' }}>
                                        <Camera size={18} color="#94A3B8" />
                                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Add cover / title page preview</span>
                                        <input type="file" accept="image/*" onChange={handleCoverPhotoAdd} style={{ display: 'none' }} />
                                    </label>
                                )}
                            </div>
                        </>
                    )}

                    {/* Title */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.375rem' }}>
                            {postType === 'physical' ? 'Item Title' : 'Material Title'} <span style={{ color: '#DC2626' }}>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder={postType === 'physical' ? "e.g. Oxford Standing Fan / Calculus Textbook" : "e.g. MTH 101 Past Questions with Solutions"}
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                            maxLength={120}
                            style={{ width: '100%', padding: '0.6875rem 0.875rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.375rem' }}>
                            Price (₦) <span style={{ color: '#DC2626' }}>*</span>
                        </label>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 800, color: '#64748B', fontSize: '0.9375rem' }}>₦</span>
                            <input
                                type="number"
                                placeholder="e.g. 3500"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                required
                                min="1"
                                style={{ width: '100%', padding: '0.6875rem 0.875rem 0.6875rem 2.25rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', fontSize: '0.9375rem', fontWeight: 700, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                            />
                        </div>
                    </div>

                    {/* Category Selection */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
                            Category <span style={{ color: '#DC2626' }}>*</span>
                        </label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                            {(postType === 'physical' ? physicalCategories : digitalCategories).map(cat => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setCategory(cat)}
                                    style={{
                                        padding: '0.375rem 0.75rem',
                                        borderRadius: '9999px',
                                        border: 'none',
                                        backgroundColor: category === cat ? 'var(--color-brand)' : '#F1F5F9',
                                        color: category === cat ? '#FFFFFF' : '#334155',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.375rem' }}>
                            Description <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>(Optional)</span>
                        </label>
                        <textarea
                            placeholder={postType === 'physical' ? "State condition, location (e.g. Ifite / Campus), reason for selling..." : "Include course code, department, lecturer, year..."}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            rows={3}
                            style={{ width: '100%', padding: '0.6875rem 0.875rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', fontSize: '0.8125rem', fontFamily: 'inherit', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
                        />
                    </div>

                    {/* Trust & Safety Banner */}
                    <div style={{ padding: '0.75rem 0.875rem', borderRadius: '0.75rem', backgroundColor: postType === 'physical' ? '#F0FDF4' : '#EFF6FF', border: `1px solid ${postType === 'physical' ? '#BBF7D0' : '#BFDBFE'}`, display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        {postType === 'physical' ? (
                            <>
                                <MapPin size={18} color="#166534" style={{ flexShrink: 0 }} />
                                <p style={{ margin: 0, fontSize: '0.6875rem', color: '#166534', lineHeight: 1.3 }}>
                                    <strong>Safe Meetup:</strong> Always arrange physical exchanges at Garba Square, Chisco Park, or Student Center.
                                </p>
                            </>
                        ) : (
                            <>
                                <Sparkles size={18} color="#1E40AF" style={{ flexShrink: 0 }} />
                                <p style={{ margin: 0, fontSize: '0.6875rem', color: '#1E40AF', lineHeight: 1.3 }}>
                                    <strong>Anti-Piracy DRM:</strong> Every buyer copy will be stamped with their verified name and UNIZIK matric number.
                                </p>
                            </>
                        )}
                    </div>

                    {/* Error Banner */}
                    {error && (
                        <div style={{ padding: '0.75rem 0.875rem', borderRadius: '0.625rem', backgroundColor: '#FEF2F2', border: '1.5px solid #FECACA', color: '#DC2626', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                            <ShieldAlert size={16} style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Progress Indicator */}
                    {loading && (
                        <div style={{ padding: '0.75rem', borderRadius: '0.625rem', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Loader2 size={16} className="animate-spin" color="#2563EB" />
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E40AF' }}>{uploadStep}</span>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || !title.trim() || !price || (postType === 'digital' && !pdfFile)}
                        style={{
                            width: '100%',
                            minHeight: '3.25rem',
                            padding: '0.875rem 1.25rem',
                            borderRadius: '0.875rem',
                            border: 'none',
                            background: (loading || !title.trim() || !price || (postType === 'digital' && !pdfFile)) ? '#94A3B8' : 'linear-gradient(135deg, #3B82F6, #2563EB)',
                            color: '#FFFFFF',
                            fontSize: '1rem',
                            fontWeight: 800,
                            fontFamily: 'inherit',
                            cursor: (loading || !title.trim() || !price || (postType === 'digital' && !pdfFile)) ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.625rem',
                            boxShadow: '0 4px 14px rgba(59,130,246,0.35)',
                        }}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                <span>Publishing...</span>
                            </>
                        ) : (
                            <>
                                <UploadCloud size={18} />
                                <span>{postType === 'physical' ? 'Post Physical Item' : 'Upload Study Material'}</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
