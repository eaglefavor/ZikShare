import { useState } from 'react'
import { Camera, X, FileText, Loader2, CheckCircle, UploadCloud } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { createDigitalProduct, upsertUser } from '../lib/database'
import supabase from '../lib/supabase'
import { uploadImage } from '../lib/cloudinary'
import { invalidateCacheByPrefix } from '../lib/cache'

const categories = ['Engineering', 'Science', 'Arts', 'Medical', 'Past Questions', 'Notes', 'Other']

function generateUUID() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        try {
            return crypto.randomUUID();
        } catch {
            // fallback
        }
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function withTimeout(promise, ms = 45000, errorMsg = 'Upload timed out. Please check your internet connection.') {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error(errorMsg)), ms)),
    ]);
}

export default function PostPage() {
    const navigate = useNavigate()
    const { user, session, isAuthenticated } = useAuth()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
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
            setError('Please fill in all required fields (title, price, category, and PDF file).')
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
                    throw new Error("Storage bucket 'digital-originals' was not found in your Supabase project. Please run the SQL migration in Supabase SQL Editor to create it.")
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

            setSuccess(true)
            setTimeout(() => navigate('/'), 1800)
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
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center bg-gray-50/50">
                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 max-w-sm w-full border border-gray-100">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-3xl">🔒</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Sign in to upload materials</h2>
                    <p className="text-sm text-gray-500 mb-8">You need an account to list digital items for sale on ZikShare.</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 active:scale-[0.98] transition-all"
                    >
                        Sign In / Register
                    </button>
                </div>
            </div>
        )
    }

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Item Uploaded! 🎉</h2>
                <p className="text-gray-500">Your digital material is now live on ZikShare.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-24 font-sans">
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
                <h1 className="text-xl font-bold text-gray-900">Upload Material</h1>
            </header>

            <div className="max-w-lg mx-auto p-4 sm:p-6 mt-2">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">

                    {/* Cover Photo */}
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                            Cover Image <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>
                        {preview ? (
                            <div className="relative w-full h-48 rounded-2xl overflow-hidden group">
                                <img src={preview} alt="Cover" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button type="button" onClick={removePhoto} className="bg-white/20 backdrop-blur text-white p-2 rounded-full hover:bg-white/30 transition-colors">
                                        <X size={24} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <label className="w-full h-32 rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50/50 flex flex-col items-center justify-center cursor-pointer transition-all">
                                <Camera className="w-8 h-8 text-gray-400 mb-2" />
                                <span className="text-sm font-medium text-gray-500">Add a cover photo</span>
                                <input type="file" accept="image/*" onChange={handlePhotoAdd} className="hidden" />
                            </label>
                        )}
                    </div>

                    {/* PDF Upload */}
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                            PDF Material <span className="text-red-500">*</span>
                        </label>
                        <label className={`w-full p-4 rounded-2xl border-2 border-dashed flex items-center gap-4 cursor-pointer transition-all ${pdfFile ? 'border-green-400 bg-green-50/50' : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50/50'}`}>
                            <div className={`p-3 rounded-xl ${pdfFile ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                <FileText size={24} />
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-bold text-gray-900 truncate">
                                    {pdfFile ? pdfFile.name : 'Select PDF file'}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {pdfFile ? `${(pdfFile.size / 1024 / 1024).toFixed(2)} MB` : 'Max 50MB'}
                                </p>
                            </div>
                            <input type="file" accept=".pdf,application/pdf" onChange={handlePdfSelect} className="hidden" />
                        </label>
                    </div>

                    {/* Details Group */}
                    <div className="space-y-5 pt-4 border-t border-gray-100">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">Title <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                placeholder="e.g., MTH 101 Complete Notes"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                                maxLength={100}
                                className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-sm font-medium"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">Price (₦) <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₦</span>
                                <input
                                    type="number"
                                    placeholder="2500"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                    required
                                    min="1"
                                    className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-sm font-medium"
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-3">Category <span className="text-red-500">*</span></label>
                            <div className="flex flex-wrap gap-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setCategory(cat)}
                                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                                            category === cat
                                                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">Description</label>
                            <textarea
                                placeholder="What's included in this material?"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-sm font-medium resize-none"
                            />
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="p-4 rounded-2xl bg-red-50 border border-red-100 flex items-start gap-3">
                            <span className="text-red-500 mt-0.5">⚠️</span>
                            <p className="text-sm font-semibold text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Submit */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-white transition-all shadow-lg ${
                                loading
                                    ? 'bg-blue-400 shadow-none cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/30 active:scale-[0.98]'
                            }`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>{uploadStep || 'Uploading material...'}</span>
                                </>
                            ) : (
                                <>
                                    <UploadCloud className="w-5 h-5" />
                                    <span>Upload Material</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
