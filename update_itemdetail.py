import re

with open('src/pages/ItemDetailPage.jsx', 'r') as f:
    content = f.read()

# Replace getListing with getListing and getDigitalProduct
content = content.replace("import { getListing } from '../lib/database'", "import { getListing, getDigitalProduct } from '../lib/database'\nimport PaystackCheckout from '../components/PaystackCheckout'\nimport { calculatePaystackFeeAndTotal } from '../lib/paystack'")

# Update useEffect to check if it's a digital product or physical
# We can just try getListing, if it fails or returns null, try getDigitalProduct. Or we can pass a URL query param. Let's pass a query param or just try both.
# But HomePage passes nothing. We'll try both.

fetch_logic = """
        async function fetchItem() {
            try {
                // Try fetching as physical first
                let data = null;
                try {
                    data = await getListing(id);
                } catch (err) {
                    // ignore and try digital
                }

                if (!data) {
                    data = await getDigitalProduct(id);
                    data.isDigital = true;
                    // Digital product uses seller_id, we align it
                    data.sellerId = data.seller_id;
                    data.condition = 'PDF Document';
                    // We assume seller info is populated
                    setSeller(data.users || {})
                } else {
                    setSeller(data.users || {})
                }

                setItem(data)
            } catch (err) {
                console.error(err)
                setError('Item not found')
            } finally {
                setLoading(false)
            }
        }
"""

query_regex = re.compile(r'async function fetchItem\(\) \{.*?finally \{\s*setLoading\(false\)\s*\}\s*\}', re.DOTALL)
content = query_regex.sub(fetch_logic.strip(), content)

# Change Contact Seller UI logic:
# If it's digital, don't show the contact seller button, show Paystack checkout.

ui_contact_logic = """
            {/* Sticky Bottom CTA */}
            {!isOwnListing && (
                <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '0.625rem 1rem', backgroundColor: 'white', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '0.625rem', zIndex: 50, paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom, 0px))' }}>
                    {item.isDigital ? (
                        user ? (
                            <PaystackCheckout
                              product={item}
                              user={user}
                              onSuccess={(ref) => navigate(`/payment/success?ref=${ref}`)}
                            />
                        ) : (
                            <button onClick={() => navigate('/login')} style={{ width: '100%', padding: '0.875rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #10B981, #059669)', color: 'white', fontSize: '0.9375rem', fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer' }}>
                                Login to Purchase
                            </button>
                        )
                    ) : (
                        <>
                            <button onClick={() => setShowCallSheet(true)} style={{ width: '3.5rem', height: '3rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-text-primary)' }}>
                                <Phone size={20} />
                            </button>
                            <button onClick={handleContactSeller} disabled={contacting} style={{ flex: 1, padding: '0.75rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', fontSize: '0.9375rem', fontWeight: 700, fontFamily: 'inherit', cursor: contacting ? 'not-allowed' : 'pointer', textAlign: 'center', boxShadow: '0 4px 12px rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: contacting ? 0.7 : 1 }}>
                                <MessageCircle size={18} />
                                {contacting ? 'Opening...' : 'Contact Seller'}
                            </button>
                        </>
                    )}
                </div>
            )}
"""

contact_regex = re.compile(r'\{/\* Sticky Bottom CTA \*/\}.*?\{/\* Call Bottom Sheet \*/\}', re.DOTALL)
content = contact_regex.sub(ui_contact_logic.strip() + '\n\n            {/* Call Bottom Sheet */}', content)

# Change Image Carousel to show a PDF indicator if digital
image_carousel_logic = """
            {/* Image Carousel or PDF Placeholder */}
            {item.isDigital ? (
                <div style={{ position: 'relative', width: '100%', paddingTop: '100%', backgroundColor: '#F3F4F6' }}>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#6B7280' }}>
                        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>📄</div>
                        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)', textAlign: 'center', padding: '0 1rem' }}>{item.title}</h2>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.5rem', backgroundColor: '#E5E7EB', borderRadius: '0.375rem' }}>Digital PDF</span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.5rem', backgroundColor: '#E5E7EB', borderRadius: '0.375rem' }}>{Math.round(item.file_size_bytes / 1024 / 1024 * 10) / 10} MB</span>
                        </div>
                    </div>
                    <button onClick={() => navigate(-1)} style={{ position: 'absolute', top: '1rem', left: '1rem', width: '2.5rem', height: '2.5rem', borderRadius: '9999px', backgroundColor: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                        <ChevronLeft size={24} />
                    </button>
                </div>
            ) : (
                <div style={{ position: 'relative', width: '100%', paddingTop: '100%', backgroundColor: '#F3F4F6', overflow: 'hidden' }}>
                    {/* ... (Carousel content) ... */}
"""

# The existing carousel starts with:
# <div style={{ position: 'relative', width: '100%', paddingTop: '100%', backgroundColor: '#F3F4F6', overflow: 'hidden' }}>
# Replace just the start
content = content.replace("<div style={{ position: 'relative', width: '100%', paddingTop: '100%', backgroundColor: '#F3F4F6', overflow: 'hidden' }}>", image_carousel_logic.strip() + "\n<div style={{ position: 'relative', width: '100%', paddingTop: '100%', backgroundColor: '#F3F4F6', overflow: 'hidden' }}>", 1)

# And close the ternary operator after the carousel
content = content.replace("                </div>\n            </div>\n\n            {/* Info */}", "                </div>\n            </div>\n            )} \n\n            {/* Info */}")


with open('src/pages/ItemDetailPage.jsx', 'w') as f:
    f.write(content)
