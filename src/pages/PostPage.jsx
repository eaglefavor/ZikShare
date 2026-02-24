import { useState } from 'react'
import { Camera, X, ChevronDown, Loader2 } from 'lucide-react'

const categories = ['Electronics', 'Books', 'Fashion', 'Hostel', 'Services']
const conditions = ['Brand New', 'Like New', 'Fairly Used']

export default function PostPage() {
    const [images, setImages] = useState([])
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [condition, setCondition] = useState('')
    const [description, setDescription] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleImageAdd = () => {
        if (images.length < 4) {
            setImages([...images, `placeholder-${Date.now()}`])
        }
    }

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setTimeout(() => {
            setIsSubmitting(false)
            alert('Listing posted! (Demo — Supabase integration coming soon)')
        }, 1500)
    }

    return (
        <div>
            <header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 40,
                    backgroundColor: 'white',
                    borderBottom: '1px solid var(--color-border)',
                    padding: '1rem',
                    textAlign: 'center',
                }}
            >
                <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 700 }}>Post an Item</h1>
                <p style={{ margin: '0.125rem 0 0', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                    List it in under 60 seconds ⚡
                </p>
            </header>

            <form onSubmit={handleSubmit} style={{ padding: '1rem' }}>
                {/* Image Upload */}
                <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                        Photos <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>(up to 4)</span>
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }} className="hide-scrollbar">
                        {images.map((img, i) => (
                            <div
                                key={img}
                                style={{
                                    width: '5rem',
                                    height: '5rem',
                                    borderRadius: '0.75rem',
                                    backgroundColor: '#DBEAFE',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    flexShrink: 0,
                                    fontSize: '1.5rem',
                                }}
                            >
                                📷
                                <button
                                    type="button"
                                    onClick={() => removeImage(i)}
                                    style={{
                                        position: 'absolute',
                                        top: '-0.25rem',
                                        right: '-0.25rem',
                                        width: '1.25rem',
                                        height: '1.25rem',
                                        borderRadius: '9999px',
                                        backgroundColor: 'var(--color-danger)',
                                        color: 'white',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <X size={10} />
                                </button>
                            </div>
                        ))}
                        {images.length < 4 && (
                            <button
                                type="button"
                                onClick={handleImageAdd}
                                style={{
                                    width: '5rem',
                                    height: '5rem',
                                    borderRadius: '0.75rem',
                                    border: '2px dashed var(--color-border)',
                                    backgroundColor: 'transparent',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.25rem',
                                    cursor: 'pointer',
                                    color: 'var(--color-text-muted)',
                                    flexShrink: 0,
                                    transition: 'border-color 0.2s ease',
                                }}
                            >
                                <Camera size={20} />
                                <span style={{ fontSize: '0.5625rem', fontWeight: 500 }}>Add</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Title */}
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>
                        Title
                    </label>
                    <input
                        type="text"
                        placeholder="e.g., Engineering Textbook 300L"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                        maxLength={80}
                        style={{
                            width: '100%',
                            padding: '0.625rem 0.875rem',
                            borderRadius: '0.625rem',
                            border: '1px solid var(--color-border)',
                            fontSize: '0.8125rem',
                            fontFamily: 'inherit',
                            outline: 'none',
                            transition: 'border-color 0.2s ease',
                            boxSizing: 'border-box',
                        }}
                        onFocus={e => (e.target.style.borderColor = 'var(--color-brand)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
                    />
                </div>

                {/* Price */}
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>
                        Price (₦)
                    </label>
                    <div style={{ position: 'relative' }}>
                        <span
                            style={{
                                position: 'absolute',
                                left: '0.875rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                fontSize: '0.875rem',
                                fontWeight: 700,
                                color: 'var(--color-text-secondary)',
                            }}
                        >
                            ₦
                        </span>
                        <input
                            type="number"
                            placeholder="5,000"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            required
                            min={0}
                            style={{
                                width: '100%',
                                padding: '0.625rem 0.875rem 0.625rem 2rem',
                                borderRadius: '0.625rem',
                                border: '1px solid var(--color-border)',
                                fontSize: '0.8125rem',
                                fontFamily: 'inherit',
                                outline: 'none',
                                transition: 'border-color 0.2s ease',
                                boxSizing: 'border-box',
                            }}
                            onFocus={e => (e.target.style.borderColor = 'var(--color-brand)')}
                            onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
                        />
                    </div>
                </div>

                {/* Category & Condition */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div>
                        <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>
                            Category
                        </label>
                        <div style={{ position: 'relative' }}>
                            <select
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.625rem 2rem 0.625rem 0.875rem',
                                    borderRadius: '0.625rem',
                                    border: '1px solid var(--color-border)',
                                    fontSize: '0.75rem',
                                    fontFamily: 'inherit',
                                    outline: 'none',
                                    appearance: 'none',
                                    backgroundColor: 'white',
                                    cursor: 'pointer',
                                    boxSizing: 'border-box',
                                }}
                            >
                                <option value="">Select</option>
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <ChevronDown size={14} style={{ position: 'absolute', right: '0.625rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--color-text-muted)' }} />
                        </div>
                    </div>
                    <div>
                        <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>
                            Condition
                        </label>
                        <div style={{ position: 'relative' }}>
                            <select
                                value={condition}
                                onChange={e => setCondition(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.625rem 2rem 0.625rem 0.875rem',
                                    borderRadius: '0.625rem',
                                    border: '1px solid var(--color-border)',
                                    fontSize: '0.75rem',
                                    fontFamily: 'inherit',
                                    outline: 'none',
                                    appearance: 'none',
                                    backgroundColor: 'white',
                                    cursor: 'pointer',
                                    boxSizing: 'border-box',
                                }}
                            >
                                <option value="">Select</option>
                                {conditions.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <ChevronDown size={14} style={{ position: 'absolute', right: '0.625rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--color-text-muted)' }} />
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>
                        Description <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>(optional)</span>
                    </label>
                    <textarea
                        placeholder="Describe your item — condition, reason for selling, etc."
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        rows={3}
                        maxLength={500}
                        style={{
                            width: '100%',
                            padding: '0.625rem 0.875rem',
                            borderRadius: '0.625rem',
                            border: '1px solid var(--color-border)',
                            fontSize: '0.8125rem',
                            fontFamily: 'inherit',
                            outline: 'none',
                            resize: 'vertical',
                            transition: 'border-color 0.2s ease',
                            boxSizing: 'border-box',
                        }}
                        onFocus={e => (e.target.style.borderColor = 'var(--color-brand)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
                    />
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.625rem', color: 'var(--color-text-muted)', textAlign: 'right' }}>
                        {description.length}/500
                    </p>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting || !title || !price || !category || !condition}
                    style={{
                        width: '100%',
                        padding: '0.875rem',
                        borderRadius: '0.75rem',
                        border: 'none',
                        fontSize: '0.9375rem',
                        fontWeight: 700,
                        fontFamily: 'inherit',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        background: (isSubmitting || !title || !price || !category || !condition)
                            ? '#D1D5DB'
                            : 'linear-gradient(135deg, #3B82F6, #2563EB)',
                        color: 'white',
                        boxShadow: (isSubmitting || !title || !price || !category || !condition)
                            ? 'none'
                            : '0 4px 14px rgba(59, 130, 246, 0.4)',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                    }}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                            Posting...
                        </>
                    ) : (
                        'Post Listing 🚀'
                    )}
                </button>
            </form>

            <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    )
}
