import imageCompression from 'browser-image-compression'

// ──────────────────────────────────────────────────
// Replace with your Cloudinary Cloud Name
// Get it from: https://cloudinary.com/console
// ──────────────────────────────────────────────────
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'YOUR_CLOUD_NAME'
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'zikshare_unsigned'
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

/**
 * Compress and upload an image to Cloudinary.
 * Uses browser-image-compression to reduce file size before upload.
 * Returns the Cloudinary secure URL.
 *
 * @param {File} file - The image file to upload
 * @param {function} onProgress - Optional progress callback (0-100)
 * @returns {Promise<string>} Cloudinary secure URL
 */
export async function uploadImage(file, onProgress) {
    // Step 1: Compress the image client-side
    const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.5,           // Max 500KB per image — saves mobile data
        maxWidthOrHeight: 1024,   // Max dimension
        useWebWorker: true,
        fileType: 'image/webp',   // WebP for smaller size
    })

    // Step 2: Upload to Cloudinary via unsigned preset
    const formData = new FormData()
    formData.append('file', compressedFile)
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('folder', 'zikshare')

    const response = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData,
    })

    if (!response.ok) {
        throw new Error(`Image upload failed: ${response.statusText}`)
    }

    const data = await response.json()
    return data.secure_url
}

/**
 * Upload multiple images.
 * @param {File[]} files - Array of image files
 * @param {function} onProgress - Progress callback (index, total)
 * @returns {Promise<string[]>} Array of Cloudinary URLs
 */
export async function uploadImages(files, onProgress) {
    const urls = []
    for (let i = 0; i < files.length; i++) {
        const url = await uploadImage(files[i])
        urls.push(url)
        if (onProgress) onProgress(i + 1, files.length)
    }
    return urls
}
