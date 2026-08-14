import re

with open('src/pages/PostPage.jsx', 'r') as f:
    content = f.read()

# Add type state
content = content.replace("const [condition, setCondition] = useState('Fairly Used')", "const [condition, setCondition] = useState('Fairly Used')\n    const [listingType, setListingType] = useState('Physical Item')\n    const [pdfFile, setPdfFile] = useState(null)")

# Import createDigitalProduct and supabase
content = content.replace("import { createListing }", "import { createListing, createDigitalProduct } from '../lib/database'\nimport supabase")

# Fix the missing import supabase part. If supabase is imported already, we might have duplicate, but it's likely not imported.
if "import supabase from '../lib/supabase'" not in content:
    content = content.replace("import { createListing, createDigitalProduct } from '../lib/database'", "import { createListing, createDigitalProduct } from '../lib/database'\nimport supabase from '../lib/supabase'")

# Handle handleSubmit logic
submit_logic = """
        try {
            if (listingType === 'Digital PDF') {
                if (!pdfFile) {
                    setError('Please select a PDF file.')
                    setLoading(false)
                    return
                }

                // Upload PDF
                const fileName = `pdfs/${user.uid}/${crypto.randomUUID()}.pdf`;
                const { error: uploadError } = await supabase.storage.from('digital-originals').upload(fileName, pdfFile, { contentType: 'application/pdf' });
                if (uploadError) throw uploadError;

                await createDigitalProduct({
                    title,
                    description,
                    price: parseFloat(price) * 100, // stored in kobo
                    category,
                    original_storage_path: fileName,
                    file_size_bytes: pdfFile.size,
                    seller_id: user.uid,
                    status: 'active'
                });
            } else {
                if (photos.length === 0) {
                    setError('Please add at least one photo')
                    setLoading(false)
                    return
                }

                // Upload images
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
                    sellerId: user.uid,
                    status: 'Active',
                    searchKeywords: title.toLowerCase().split(' ')
                })
            }
"""

# Replace the try block inside handleSubmit
# Find the start of try block and end of createListing
try_block_regex = re.compile(r'try \{.*?await createListing\(\{.*?\n\s+\}\)', re.DOTALL)
content = try_block_regex.sub(submit_logic.strip(), content)

# Remove the old if (photos.length === 0) check at the start of handleSubmit if it exists
content = re.sub(r'if \(photos\.length === 0\) \{.*?return\n\s+\}', '', content, flags=re.DOTALL)


# Update the UI to include the type selector and PDF upload
ui_addition = """
                {/* Listing Type Toggle */}
                <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Type *</label>
                    <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'var(--color-background)', padding: '0.25rem', borderRadius: '0.75rem' }}>
                        <button type="button" onClick={() => setListingType('Physical Item')} style={{ flex: 1, padding: '0.5rem', borderRadius: '0.5rem', border: 'none', fontSize: '0.8125rem', fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', backgroundColor: listingType === 'Physical Item' ? 'white' : 'transparent', color: listingType === 'Physical Item' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)', boxShadow: listingType === 'Physical Item' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s' }}>
                            Physical Item
                        </button>
                        <button type="button" onClick={() => setListingType('Digital PDF')} style={{ flex: 1, padding: '0.5rem', borderRadius: '0.5rem', border: 'none', fontSize: '0.8125rem', fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', backgroundColor: listingType === 'Digital PDF' ? 'white' : 'transparent', color: listingType === 'Digital PDF' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)', boxShadow: listingType === 'Digital PDF' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s' }}>
                            Digital PDF
                        </button>
                    </div>
                </div>

                {listingType === 'Digital PDF' ? (
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                            PDF File *
                        </label>
                        <input type="file" accept=".pdf" onChange={(e) => setPdfFile(e.target.files[0])} style={{ width: '100%', padding: '0.625rem', borderRadius: '0.625rem', border: '1px solid var(--color-border)', fontSize: '0.8125rem' }} />
                        {pdfFile && <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>Selected: {pdfFile.name}</p>}
                    </div>
                ) : (
"""

content = content.replace("{/* Photos */}", ui_addition.strip())

# We need to close the ternary we opened in UI addition
content = content.replace("{/* Title */}", "                )}\n\n                {/* Title */}")

# Remove duplicate import
content = content.replace("import supabase from '../lib/supabase'\nimport supabase from '../lib/supabase'", "import supabase from '../lib/supabase'")

with open('src/pages/PostPage.jsx', 'w') as f:
    f.write(content)
