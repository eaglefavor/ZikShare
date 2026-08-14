import re

with open('src/pages/HomePage.jsx', 'r') as f:
    content = f.read()

# Import getDigitalProducts
content = content.replace("import { getListings } from '../lib/database'", "import { getListings, getDigitalProducts } from '../lib/database'")

# In useCachedQuery, fetch both and merge them, sorting by date.
fetch_logic = """
    const { data, isLoading, error } = useCachedQuery(
        'listings-home',
        async () => {
            const [physical, digital] = await Promise.all([
                getListings({ limit: 20 }),
                getDigitalProducts({ limit: 20 })
            ])
            // Tag digital products
            const digitalTagged = digital.map(d => ({ ...d, isDigital: true, createdAt: d.created_at, sellerId: d.seller_id }))

            // Merge and sort
            const merged = [...(physical || []), ...(digitalTagged || [])]
            merged.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            return merged.slice(0, 20)
        },
        { ttl: 5 * 60 * 1000 } // 5 min cache
    )

    const listings = data;
"""

# Replace the useCachedQuery block
query_regex = re.compile(r'const \{ data: listings, isLoading, error \} = useCachedQuery\(.*?\n\s+\)', re.DOTALL)
content = query_regex.sub(fetch_logic.strip(), content)

# For Item Card, we need to handle digital images (they don't have images array)
# If it's a digital item, show a generic PDF icon or just the first item of images if physical
image_logic = """
                            <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', backgroundColor: '#F3F4F6' }}>
                                {item.isDigital ? (
                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#6B7280' }}>
                                        <div style={{ fontSize: '3rem' }}>📄</div>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 600, marginTop: '0.5rem' }}>Digital PDF</span>
                                    </div>
                                ) : (
                                    <img
                                        src={item.images?.[0] || 'https://via.placeholder.com/400?text=No+Image'}
                                        alt={item.title}
                                        loading="lazy"
                                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                )}
                            </div>
"""

# Find the div containing the image logic:
# <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', backgroundColor: '#F3F4F6' }}>
#     <img src={item.images?.[0]...} ... />
# </div>
# Replace it using regex
image_regex = re.compile(r'<div style={{ position: \'relative\', width: \'100%\', paddingBottom: \'100%\', backgroundColor: \'#F3F4F6\' }}>\s*<img[^>]+>\s*</div>', re.DOTALL)
content = image_regex.sub(image_logic.strip(), content)

# For the Condition badge, digital items don't have condition
condition_logic = """
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                                    <span style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--color-brand)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        {item.category}
                                    </span>
                                    {!item.isDigital && <ConditionBadge condition={item.condition} />}
                                    {item.isDigital && <span className="condition-badge condition-new">PDF</span>}
                                </div>
"""

# Replace condition section:
cond_regex = re.compile(r'<div style={{ display: \'flex\', alignItems: \'center\', justifyContent: \'space-between\', marginBottom: \'0.375rem\' }}>\s*<span[^>]*>\s*\{item\.category\}\s*</span>\s*<ConditionBadge condition=\{item\.condition\} />\s*</div>', re.DOTALL)
content = cond_regex.sub(condition_logic.strip(), content)


with open('src/pages/HomePage.jsx', 'w') as f:
    f.write(content)
