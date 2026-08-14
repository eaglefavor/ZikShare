import { useState } from 'react'
import { Camera, X, FileText, Loader2, CheckCircle, UploadCloud, ArrowLeft, ShieldAlert } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { createDigitalProduct, upsertUser } from '../lib/database'
import supabase from '../lib/supabase'
import { uploadImage } from '../lib/cloudinary'
import { invalidateCacheByPrefix } from '../lib/cache'

const categories = ['Engineering', 'Science', 'Arts', 'Medical', 'Past Questions', 'Notes', 'Law', 'Management', 'Other']

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
    const { user, session, isAuthenticated } = useAuth()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('Notes')
    const [pdfFile, setPdfFile] = useState(null)
    const [coverPhoto, setCoverPhoto] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const [uploadStep, setUploadStep] = useState('')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const handlePhotoAdd = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        setCoverPhoto(file)
        const reader = new FileReader()
        reader.onload = (ev) => setPreview(ev.target.result)
        reader.readAsDataURL(file)
        setError('')
    }

    const removePhoto = () => {
        setCoverPhoto(null)
        setPreview(null)
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

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isAuthenticated) {
            navigate('/login')
            return
        }
        if (!title.trim() || !price || !category || !pdfFile) {
            setError('Please fill in all required fields: Title, Price, Category, and PDF file.')
            return
        }

        const numericPrice = parseFloat(price)
        if (isNaN(numericPrice) || numericPrice <= 0) {
            setError('Please enter a valid price in Naira.')
            return
        }

        setLoading(true)
        setError('')
        setUploadStep('Preparing upload...')

        try {
            const currentUserId = session?.user?.id || user?.uid || user?.id

            if (!currentUserId) {
                throw new Error('Your session expired. Please sign in again.')
            }

            // Ensure user profile exists in public.users to prevent foreign key errors
            try {
                await upsertUser({
                    uid: currentUserId,
                    email: session?.user?.email || user?.email || '',
                    displayName: user?.displayName || session?.user?.email?.split('@')[0] || 'Student',
                    phoneNumber: user?.phoneNumber || '',
                    department: user?.department || '',
                    isVerified: user?.isVerified || false,
                    createdAt: user?.createdAt || new Date().toISOString(),
                })
            } catch (userSyncErr) {
                console.warn('Could not sync user before upload:', userSyncErr.message)
            }

            // Upload Cover Photo if provided
            let coverUrl = null
            if (coverPhoto) {
                setUploadStep('Uploading cover photo...')
                try {
                    coverUrl = await uploadImage(coverPhoto)
                } catch (imgErr) {
                    console.warn('Cover photo upload failed, proceeding without it:', imgErr.message)
                }
            }

            // Upload PDF to Supabase Storage
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
                'PDF upload timed out after 45 seconds. Check your internet connection.'
            )

            if (uploadError) {
                console.error('Storage upload error:', uploadError)
                if (uploadError.message?.toLowerCase().includes('bucket not found') || uploadError.statusCode === '404') {
                    throw new Error("Storage bucket 'digital-originals' was not found in your Supabase project. Please run the SQL migration in Supabase SQL Editor.")
                }
                throw new Error(`Storage upload failed: ${uploadError.message || 'Check storage bucket permissions'}`)
            }

            // Create product entry in database
            setUploadStep('Saving material listing...')
            await withTimeout(
                createDigitalProduct({
                    title: title.trim(),
                    description: description.trim(),
                    price: Math.round(numericPrice * 100), // stored in kobo
                    category,
                    original_storage_path: fileName,
                    file_size_bytes: pdfFile.size,
                    seller_id: currentUserId,
                    status: 'active',
                    cover_image_url: coverUrl,
                }),
                15000,
                'Database save timed out. Please try again.'
            )

            // Clear cache so new listing appears immediately
            invalidateCacheByPrefix('listings')
            invalidateCacheByPrefix('digital')

            setSuccess(true)
            setTimeout(() => navigate('/seller-hub'), 1500)
        } catch (err) {
            console.error('Post error:', err)
            setError(err?.message || 'Failed to upload material. Please try again.')
        } finally {
            setLoading(false)
            setUploadStep('')
        }
    }

    if (!isAuthenticated) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backgroundColor: '#F8FAFC' }}>
                <div style={{ backgroundColor: 'white', padding: '2rem 1.5rem', borderRadius: '1.25rem', border: '1px solid var(--color-border)', maxWidth: '24rem', width: '100%', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                    <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '9999px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#2563EB', fontSize: '1.5rem' }}>
                        🔒
                    </div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.5rem', color: '#0F172A' }}>Sign in to upload materials</h2>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: '0 0 1.5rem' }}>You need a UNIZIK student account to list study materials for sale.</p>
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
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem', color: '#0F172A' }}>Material Uploaded! 🎉</h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0 }}>Your study material is now live on ZikShare and ready for purchase.</p>
            </div>
        )
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', paddingBottom: '7rem' }}>
            {/* Header */}
            <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '0.25rem' }}>
                    <ArrowLeft size={20} />
                </button>
                <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 800, color: '#0F172A' }}>Upload Study Material</h1>
            </header>

            <div style={{ maxWidth: '32rem', margin: '0 auto', padding: '1rem' }}>
                <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', borderRadius: '1.25rem', padding: '1.25rem', border: '1px solid var(--color-border)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    
                    {/* PDF File Picker (Required) */}
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
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '0.625rem', backgroundColor: pdfFile ? '#DCFCE7' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: pdfFile ? '#166534' : '#2563EB', flexShrink: 0 }}>
                                <FileText size={24} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {pdfFile ? pdfFile.name : 'Tap to select PDF file'}
                                </p>
                                <p style={{ margin: '0.125rem 0 0', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                                    {pdfFile ? `${(pdfFile.size / 1024 / 1024).toFixed(2)} MB • Ready to upload` : 'Past questions, lecture slides, notes (Max 50MB)'}
                                </p>
                            </div>
                            <input type="file" accept=".pdf,application/pdf" onChange={handlePdfSelect} style={{ display: 'none' }} />
                        </label>
                    </div>

                    {/* Cover Photo (Optional) */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.375rem' }}>
                            Cover Image <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>(Optional)</span>
                        </label>
                        {preview ? (
                            <div style={{ position: 'relative', width: '100%', height: '140px', borderRadius: '0.875rem', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                                <img src={preview} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <button
                                    type="button"
                                    onClick={removePhoto}
                                    style={{
                                        position: 'absolute',
                                        top: '0.5rem',
                                        right: '0.5rem',
                                        width: '2rem',
                                        height: '2rem',
                                        borderRadius: '9999px',
                                        backgroundColor: 'rgba(0,0,0,0.6)',
                                        color: 'white',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <label
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '90px',
                                    borderRadius: '0.875rem',
                                    border: '1.5px dashed #CBD5E1',
                                    backgroundColor: '#F8FAFC',
                                    cursor: 'pointer',
                                    gap: '0.25rem',
                                }}
                            >
                                <Camera size={22} color="#94A3B8" />
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Add cover or title page preview</span>
                                <input type="file" accept="image/*" onChange={handlePhotoAdd} style={{ display: 'none' }} />
                            </label>
                        )}
                    </div>

                    {/* Title */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.375rem' }}>
                            Material Title <span style={{ color: '#DC2626' }}>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. MTH 101 Calculus & Algebra Past Questions"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                            maxLength={120}
                            style={{
                                width: '100%',
                                padding: '0.6875rem 0.875rem',
                                borderRadius: '0.625rem',
                                border: '1px solid var(--color-border)',
                                fontSize: '0.875rem',
                                fontFamily: 'inherit',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    {/* Price in Naira */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.375rem' }}>
                            Price (₦) <span style={{ color: '#DC2626' }}>*</span>
                        </label>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 800, color: '#64748B', fontSize: '0.9375rem' }}>₦</span>
                            <input
                                type="number"
                                placeholder="1000"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                required
                                min="50"
                                style={{
                                    width: '100%',
                                    padding: '0.6875rem 0.875rem 0.6875rem 2.25rem',
                                    borderRadius: '0.625rem',
                                    border: '1px solid var(--color-border)',
                                    fontSize: '0.9375rem',
                                    fontWeight: 700,
                                    fontFamily: 'inherit',
                                    outline: 'none',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                    </div>

                    {/* Category Selection */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
                            Faculty / Category <span style={{ color: '#DC2626' }}>*</span>
                        </label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                            {categories.map(cat => (
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
                                        transition: 'all 0.15s ease'
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
                            placeholder="Provide details about the material, course code, lecturer, year, or included topics..."
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            rows={3}
                            style={{
                                width: '100%',
                                padding: '0.6875rem 0.875rem',
                                borderRadius: '0.625rem',
                                border: '1px solid var(--color-border)',
                                fontSize: '0.8125rem',
                                fontFamily: 'inherit',
                                outline: 'none',
                                resize: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    {/* Error display */}
                    {error && (
                        <div style={{ padding: '0.75rem 0.875rem', borderRadius: '0.625rem', backgroundColor: '#FEF2F2', border: '1.5px solid #FECACA', color: '#DC2626', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                            <ShieldAlert size={16} style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* PROMINENT UPLOAD BUTTON */}
                    <div style={{ paddingTop: '0.5rem' }}>
                        <button
                            type="submit"
                            disabled={loading || !pdfFile || !title.trim() || !price}
                            style={{
                                width: '100%',
                                minHeight: '3.25rem',
                                padding: '0.875rem 1.25rem',
                                borderRadius: '0.875rem',
                                border: 'none',
                                backgroundColor: (loading || !pdfFile || !title.trim() || !price) ? '#94A3B8' : '#2563EB',
                                background: (loading || !pdfFile || !title.trim() || !price) ? '#94A3B8' : 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                                color: '#FFFFFF',
                                fontSize: '1rem',
                                fontWeight: 800,
                                fontFamily: 'inherit',
                                cursor: (loading || !pdfFile || !title.trim() || !price) ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.625rem',
                                boxShadow: (!loading && pdfFile && title.trim() && price) ? '0 6px 20px rgba(37, 99, 235, 0.4)' : 'none',
                                transition: 'all 0.2s ease',
                                WebkitAppearance: 'none',
                            }}
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" color="#FFFFFF" />
                                    <span style={{ color: '#FFFFFF' }}>{uploadStep || 'Uploading Material...'}</span>
                                </>
                            ) : (
                                <>
                                    <UploadCloud size={20} color="#FFFFFF" strokeWidth={2.5} />
                                    <span style={{ color: '#FFFFFF' }}>Upload Material</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
