import { useState } from 'react'
import { Camera, X, Loader2, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { createListing } from '../lib/database'
import { uploadImage } from '../lib/cloudinary'

const categories = ['Electronics', 'Books', 'Fashion', 'Hostel', 'Services']
const conditions = ['Brand New', 'Like New', 'Fairly Used']

export default function PostPage() {
    const navigate = useNavigate()
    const { user, session, isAuthenticated } = useAuth()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [condition, setCondition] = useState('')
    const [photos, setPhotos] = useState([]) // File[]
    const [previews, setPreviews] = useState([]) // data URLs
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const handlePhotoAdd = (e) => {
        const files = Array.from(e.target.files)
        if (photos.length + files.length > 4) {
            setError('Maximum 4 photos allowed')
            return
        }
        setPhotos(prev => [...prev, ...files])
        files.forEach(file => {
            const reader = new FileReader()
            reader.onload = (ev) => setPreviews(prev => [...prev, ev.target.result])
            reader.readAsDataURL(file)
        })
        setError('')
    }

    const removePhoto = (index) => {
        setPhotos(prev => prev.filter((_, i) => i !== index))
        setPreviews(prev => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isAuthenticated) {
            navigate('/login')
            return
        }
        if (!title || !price || !category || !condition) {
            setError('Please fill in all required fields')
            return
        }

        setLoading(true)
        setError('')

        try {
            // Upload images to Cloudinary
            const imageUrls = []
            for (const photo of photos) {
                const url = await uploadImage(photo)
                imageUrls.push(url)
            }

            // Create listing in Supabase
            await createListing({
                title,
                description,
                price: parseFloat(price),
                category,
                condition,
                images: imageUrls,
                sellerId: session.user.id,
                status: 'Active',
            })

            setSuccess(true)
            setTimeout(() => navigate('/'), 2000)
        } catch (err) {
            console.error('Post error:', err)
            setError(err.message || 'Failed to create listing. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (!isAuthenticated) {
        return (
            <div>
                <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', padding: '1rem' }}>
                    <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 700 }}>Post Item</h1>
                </header>
                <div style={{ padding: '3rem 1rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔒</p>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Sign in to post items</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>You need an account to list items for sale</p>
                    <button
                        onClick={() => navigate('/login')}
                        style={{ padding: '0.75rem 2rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', fontSize: '0.875rem', fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', boxShadow: '0 4px 12px rgba(59,130,246,0.3)' }}
                    >
                        Sign In
                    </button>
                </div>
            </div>
        )
    }

    if (success) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: '2rem', textAlign: 'center' }}>
                <CheckCircle size={48} color="#22C55E" />
                <h2 style={{ margin: '1rem 0 0.25rem', fontSize: '1.125rem', fontWeight: 700 }}>Item Posted! 🎉</h2>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>Your listing is now live on ZikShare</p>
            </div>
        )
    }

    return (
        <div>
            <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', padding: '1rem' }}>
                <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 700 }}>Post Item</h1>
            </header>

            <form onSubmit={handleSubmit} style={{ padding: '1rem' }}>
                {/* Photos */}
                <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                        Photos <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>(up to 4)</span>
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {previews.map((src, i) => (
                            <div key={i} style={{ position: 'relative', width: '5rem', height: '5rem', borderRadius: '0.625rem', overflow: 'hidden' }}>
                                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <button type="button" onClick={() => removePhoto(i)} style={{ position: 'absolute', top: '0.25rem', right: '0.25rem', width: '1.25rem', height: '1.25rem', borderRadius: '9999px', backgroundColor: 'rgba(0,0,0,0.6)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <X size={10} color="white" />
                                </button>
                            </div>
                        ))}
                        {photos.length < 4 && (
                            <label style={{ width: '5rem', height: '5rem', borderRadius: '0.625rem', border: '2px dashed var(--color-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backgroundColor: 'var(--color-background)', transition: 'border-color 0.2s' }}>
                                <Camera size={20} color="var(--color-text-muted)" />
                                <span style={{ fontSize: '0.5625rem', color: 'var(--color-text-muted)', marginTop: '0.125rem' }}>Add</span>
                                <input type="file" accept="image/*" multiple onChange={handlePhotoAdd} style={{ display: 'none' }} />
                            </label>
                        )}
                    </div>
                </div>

                {/* Title */}
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>Title *</label>
                    <input type="text" placeholder="e.g., Engineering Textbook (300L)" value={title} onChange={e => setTitle(e.target.value)} required maxLength={100}
                        style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', fontSize: '0.8125rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                        onFocus={e => (e.target.style.borderColor = 'var(--color-brand)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--color-border)')} />
                </div>

                {/* Price */}
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>Price (₦) *</label>
                    <input type="number" placeholder="5000" value={price} onChange={e => setPrice(e.target.value)} required min="0"
                        style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', fontSize: '0.8125rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                        onFocus={e => (e.target.style.borderColor = 'var(--color-brand)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--color-border)')} />
                </div>

                {/* Category */}
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>Category *</label>
                    <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                        {categories.map(cat => (
                            <button key={cat} type="button" onClick={() => setCategory(cat)}
                                style={{ padding: '0.375rem 0.875rem', borderRadius: '9999px', border: 'none', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', backgroundColor: category === cat ? 'var(--color-brand)' : 'var(--color-background)', color: category === cat ? 'white' : 'var(--color-text-secondary)', transition: 'all 0.2s' }}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Condition */}
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>Condition *</label>
                    <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                        {conditions.map(cond => (
                            <button key={cond} type="button" onClick={() => setCondition(cond)}
                                style={{ padding: '0.375rem 0.875rem', borderRadius: '9999px', border: 'none', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', backgroundColor: condition === cond ? 'var(--color-brand)' : 'var(--color-background)', color: condition === cond ? 'white' : 'var(--color-text-secondary)', transition: 'all 0.2s' }}>
                                {cond}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>Description</label>
                    <textarea placeholder="Describe your item — condition, why you're selling, etc." value={description} onChange={e => setDescription(e.target.value)} rows={3}
                        style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', fontSize: '0.8125rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', resize: 'vertical', transition: 'border-color 0.2s' }}
                        onFocus={e => (e.target.style.borderColor = 'var(--color-brand)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--color-border)')} />
                </div>

                {/* Error */}
                {error && (
                    <div style={{ padding: '0.625rem 0.875rem', borderRadius: '0.625rem', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontSize: '0.75rem', fontWeight: 500, marginBottom: '1rem' }}>
                        {error}
                    </div>
                )}

                {/* Submit */}
                <button type="submit" disabled={loading}
                    style={{ width: '100%', padding: '0.875rem', borderRadius: '0.75rem', border: 'none', fontSize: '0.9375rem', fontWeight: 700, fontFamily: 'inherit', cursor: loading ? 'not-allowed' : 'pointer', background: loading ? '#93C5FD' : 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', boxShadow: loading ? 'none' : '0 4px 14px rgba(59,130,246,0.4)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    {loading ? (
                        <>
                            <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                            Uploading...
                        </>
                    ) : (
                        'Post Item'
                    )}
                </button>
            </form>

            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
    )
}
