import { useState } from 'react'
import { X, Save, Loader2, Camera, Trash2, CheckCircle2, AlertCircle } from 'lucide-react'
import { updateListing, updateDigitalProduct, deleteListing } from '../lib/database'
import { uploadImage } from '../lib/cloudinary'
import { invalidateCacheByPrefix } from '../lib/cache'

const categories = ['Engineering', 'Science', 'Arts', 'Medical', 'Past Questions', 'Notes', 'Electronics', 'Books', 'Fashion', 'Hostel', 'Services', 'Other']

export default function EditListingModal({ listing, onClose, onUpdated, onDeleted }) {
    const isDigital = listing.isDigital || listing.original_storage_path
    const [title, setTitle] = useState(listing.title || '')
    const [price, setPrice] = useState(listing.price || '')
    const [category, setCategory] = useState(listing.category || 'Notes')
    const [description, setDescription] = useState(listing.description || '')
    const [status, setStatus] = useState(listing.status || (isDigital ? 'active' : 'Active'))
    const [coverPhoto, setCoverPhoto] = useState(null)
    const [preview, setPreview] = useState(listing.cover_image_url || listing.images?.[0] || null)
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState('')

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        setCoverPhoto(file)
        const reader = new FileReader()
        reader.onload = (ev) => setPreview(ev.target.result)
        reader.readAsDataURL(file)
    }

    const handleSave = async (e) => {
        e.preventDefault()
        if (!title.trim()) {
            setError('Title is required.')
            return
        }
        const numericPrice = parseFloat(price)
        if (isNaN(numericPrice) || numericPrice <= 0) {
            setError('Please enter a valid price.')
            return
        }

        setSaving(true)
        setError('')

        try {
            let coverUrl = preview
            if (coverPhoto) {
                try {
                    coverUrl = await uploadImage(coverPhoto)
                } catch (imgErr) {
                    console.warn('Image upload failed, preserving existing:', imgErr.message)
                }
            }

            if (isDigital) {
                await updateDigitalProduct(listing.id, {
                    title: title.trim(),
                    price: numericPrice,
                    category,
                    description: description.trim(),
                    status,
                    cover_image_url: coverUrl,
                })
            } else {
                await updateListing(listing.id, {
                    title: title.trim(),
                    price: numericPrice,
                    category,
                    description: description.trim(),
                    status,
                    images: coverUrl ? [coverUrl] : listing.images,
                })
            }

            invalidateCacheByPrefix('listings')
            invalidateCacheByPrefix(`listing-${listing.id}`)
            onUpdated({
                ...listing,
                title: title.trim(),
                price: numericPrice,
                category,
                description: description.trim(),
                status,
                cover_image_url: coverUrl,
                images: coverUrl ? [coverUrl] : listing.images,
            })
            onClose()
        } catch (err) {
            console.error('Update error:', err)
            setError(err.message || 'Failed to update listing. Please try again.')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete "${listing.title}"? This cannot be undone.`)) {
            return
        }
        setDeleting(true)
        try {
            await deleteListing(listing.id)
            invalidateCacheByPrefix('listings')
            onDeleted(listing.id)
            onClose()
        } catch (err) {
            console.error('Delete error:', err)
            setError('Failed to delete listing. Please try again.')
        } finally {
            setDeleting(false)
        }
    }

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)', padding: '1rem' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '1.25rem', width: '100%', maxWidth: '32rem', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid var(--color-border)' }}>
                {/* Header */}
                <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 10, borderTopLeftRadius: '1.25rem', borderTopRightRadius: '1.25rem' }}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700 }}>Edit {isDigital ? 'Digital Material' : 'Listing'}</h2>
                        <p style={{ margin: '0.125rem 0 0', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Update details and manage availability</p>
                    </div>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.375rem', borderRadius: '9999px', display: 'flex', color: 'var(--color-text-muted)' }}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSave} style={{ padding: '1.5rem' }}>
                    {/* Cover Preview / Change */}
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
                            Cover Image
                        </label>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ width: '5.5rem', height: '5.5rem', borderRadius: '0.75rem', overflow: 'hidden', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border)', flexShrink: 0 }}>
                                {preview ? (
                                    <img src={preview} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <span style={{ fontSize: '2rem' }}>{isDigital ? '📄' : '📦'}</span>
                                )}
                            </div>
                            <div>
                                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', backgroundColor: 'white', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                                    <Camera size={16} />
                                    <span>Change Photo</span>
                                    <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
                                </label>
                                <p style={{ margin: '0.375rem 0 0', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>JPG or PNG (max 5MB)</p>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.375rem' }}>Title *</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', fontSize: '0.8125rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                        />
                    </div>

                    {/* Price & Status Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.375rem' }}>Price (₦) *</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                min="1"
                                style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', fontSize: '0.8125rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.375rem' }}>Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', fontSize: '0.8125rem', fontFamily: 'inherit', outline: 'none', backgroundColor: 'white', boxSizing: 'border-box' }}
                            >
                                <option value="active">Active (Selling)</option>
                                <option value="Active">Active</option>
                                <option value="Sold">Sold Out</option>
                                <option value="inactive">Paused / Inactive</option>
                            </select>
                        </div>
                    </div>

                    {/* Category */}
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.375rem' }}>Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', fontSize: '0.8125rem', fontFamily: 'inherit', outline: 'none', backgroundColor: 'white', boxSizing: 'border-box' }}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.375rem' }}>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            placeholder="Provide details about condition, edition, or course code..."
                            style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', fontSize: '0.8125rem', fontFamily: 'inherit', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
                        />
                    </div>

                    {/* Error Banner */}
                    {error && (
                        <div style={{ padding: '0.75rem', borderRadius: '0.625rem', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', color: '#DC2626', fontSize: '0.75rem', fontWeight: 600 }}>
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={deleting || saving}
                            style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid #FECACA', backgroundColor: '#FEF2F2', color: '#DC2626', fontSize: '0.8125rem', fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
                        >
                            {deleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                            <span>Delete</span>
                        </button>
                        <button
                            type="submit"
                            disabled={saving || deleting}
                            style={{ flex: 1, padding: '0.75rem 1.25rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', fontSize: '0.875rem', fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(59,130,246,0.35)' }}
                        >
                            {saving ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    <span>Saving changes...</span>
                                </>
                            ) : (
                                <>
                                    <Save size={16} />
                                    <span>Save Listing</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
