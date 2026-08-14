import re

with open('src/pages/PostPage.jsx', 'r') as f:
    content = f.read()

# Add detailed console logs to handleSubmit
replacement = """
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
"""

content = re.sub(r'const handleSubmit = async \(e\) => \{.*?\n    \}', replacement.strip(), content, flags=re.DOTALL)

with open('src/pages/PostPage.jsx', 'w') as f:
    f.write(content)
