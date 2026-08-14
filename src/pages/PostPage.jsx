import { useState } from 'react'
import { Camera, X, FileText, Loader2, CheckCircle, UploadCloud } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { createDigitalProduct } from '../lib/database'
import supabase from '../lib/supabase'
import { uploadImage } from '../lib/cloudinary'

const categories = ['Engineering', 'Science', 'Arts', 'Medical', 'Past Questions', 'Notes', 'Other']

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
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const handlePhotoAdd = (e) => {
        const file = e.target.files[0]
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("[DEBUG] Form Submitted");
        console.log("[DEBUG] Current State:", { title, price, category, isAuthenticated, user, session });

        if (!isAuthenticated) {
            console.log("[DEBUG] Not authenticated, redirecting to login");
            navigate('/login')
            return
        }
        if (!title || !price || !category || !pdfFile) {
            console.log("[DEBUG] Validation failed: missing required fields");
            setError('Please fill in all required fields and select a PDF file.')
            return
        }

        console.log("[DEBUG] Setting loading state to true");
        setLoading(true)
        setError('')

        try {
            const currentUserId = (session?.user?.id || user?.id);
            console.log("[DEBUG] Evaluated currentUserId:", currentUserId);

            if (!currentUserId) {
                console.error("[DEBUG] Error: No valid currentUserId found");
                throw new Error("Not authenticated");
            }

            // Upload PDF
            const fileName = `pdfs/${currentUserId}/${crypto.randomUUID()}.pdf`;
            console.log("[DEBUG] Attempting to upload PDF to path:", fileName);

            const { data: uploadData, error: uploadError } = await supabase.storage.from('digital-originals').upload(fileName, pdfFile, { contentType: 'application/pdf' });

            if (uploadError) {
                console.error("[DEBUG] Supabase Storage upload error:", uploadError);
                throw uploadError;
            }
            console.log("[DEBUG] PDF uploaded successfully:", uploadData);

            let coverUrl = null;
            if (coverPhoto) {
                console.log("[DEBUG] Attempting to upload cover photo");
                coverUrl = await uploadImage(coverPhoto);
                console.log("[DEBUG] Cover photo uploaded successfully:", coverUrl);
            }

            console.log("[DEBUG] Attempting to create digital product in database");
            const productData = await createDigitalProduct({
                title,
                description,
                price: parseFloat(price) * 100, // stored in kobo
                category,
                original_storage_path: fileName,
                file_size_bytes: pdfFile.size,
                seller_id: currentUserId,
                status: 'active',
                cover_image_url: coverUrl
            });
            console.log("[DEBUG] Digital product created successfully:", productData);

            console.log("[DEBUG] Setting success state");
            setSuccess(true)
            setTimeout(() => navigate('/'), 2000)
        } catch (err) {
            console.error('[DEBUG] Post error caught in catch block:', err);
            setError(err.message || 'Failed to create listing. Check your connection and try again.')
        } finally {
            console.log("[DEBUG] Finally block reached, setting loading to false");
            setLoading(false)
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
                            <input type="file" accept=".pdf" onChange={(e) => setPdfFile(e.target.files[0])} className="hidden" />
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
                                    min="0"
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
                                    <span>Uploading & Encrypting...</span>
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
