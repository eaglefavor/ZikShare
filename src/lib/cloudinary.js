import imageCompression from 'browser-image-compression'

// ──────────────────────────────────────────────────
// Cloudinary configuration from environment variables
// ──────────────────────────────────────────────────
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || ''
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'zikshare_unsigned'
const UPLOAD_URL = CLOUD_NAME && CLOUD_NAME !== 'YOUR_CLOUD_NAME' 
    ? `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    : ''

/**
 * Compress and upload an image to Cloudinary.
 * Uses browser-image-compression to reduce file size before upload.
 * Returns the image URL (or base64 fallback if unconfigured).
 *
 * @param {File} file - The image file to upload
 * @param {function} onProgress - Optional progress callback (0-100)
 * @returns {Promise<string>} Cloudinary secure URL or data URL
 */
export async function uploadImage(file, onProgress) {
    if (!file) return null

    // Step 1: Compress the image client-side
    let compressedFile
    try {
        compressedFile = await imageCompression(file, {
            maxSizeMB: 0.5,           // Max 500KB per image — saves mobile data
            maxWidthOrHeight: 1024,   // Max dimension
            useWebWorker: false,      // Disabled for mobile compatibility
        })
    } catch (compressionError) {
        console.warn('Compression failed, using original file:', compressionError)
        compressedFile = file // Fallback to original file
    }

    // If Cloudinary is not configured with a valid cloud name, convert to data URL fallback
    if (!UPLOAD_URL) {
        console.warn('Cloudinary not configured. Using compressed local data URL fallback.')
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result)
            reader.onerror = () => resolve(null)
            reader.readAsDataURL(compressedFile)
        })
    }

    // Step 2: Upload to Cloudinary via unsigned preset with 20s timeout
    const formData = new FormData()
    formData.append('file', compressedFile)
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('folder', 'zikshare')

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 20000)

    let response
    try {
        response = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData,
            signal: controller.signal,
        })
    } catch (err) {
        if (err.name === 'AbortError') {
            throw new Error('Image upload timed out after 20s. Check your connection.')
        }
        throw new Error(`Image upload failed: ${err.message}`)
    } finally {
        clearTimeout(timeoutId)
    }

    if (!response.ok) {
        const errorBody = await response.text().catch(() => 'Unknown error')
        console.error('Cloudinary upload error:', response.status, errorBody)
        throw new Error(`Image upload failed (${response.status}): ${errorBody}`)
    }

    const data = await response.json()
    return data.secure_url
}

/**
 * Upload multiple images.
 * @param {File[]} files - Array of image files
 * @param {function} onProgress - Progress callback (index, total)
 * @returns {Promise<string[]>} Array of image URLs
 */
export async function uploadImages(files, onProgress) {
    const urls = []
    for (let i = 0; i < files.length; i++) {
        const url = await uploadImage(files[i])
        if (url) urls.push(url)
        if (onProgress) onProgress(i + 1, files.length)
    }
    return urls
}
