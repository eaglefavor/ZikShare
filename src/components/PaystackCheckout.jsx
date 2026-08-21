import { useState, useMemo } from 'react'
import { supabase } from '../lib/supabase'
import { calculatePaystackFeeAndTotal, PAYSTACK_PUBLIC_KEY, loadPaystackInlineScript } from '../lib/paystack'
import { ShieldAlert, X, FileText, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react'

function formatNaira(amount) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount || 0)
}

export function deriveNameFromEmail(email) {
  if (!email) return 'UNIZIK STUDENT'
  const username = email.split('@')[0] || ''
  
  const cleaned = username
    .replace(/^[0-9]+[._-]/g, '') // remove leading matric numbers if any
    .replace(/[._-]+/g, ' ')
    .trim()

  if (!cleaned) {
    return username.toUpperCase()
  }

  return cleaned
    .split(' ')
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}

export function getBuyerWatermarkName(user) {
  if (!user) return 'UNIZIK STUDENT'
  
  // 1. Check verified full account name from Google OAuth or registration
  const fullName = user.displayName || user.user_metadata?.full_name || user.user_metadata?.name
  if (fullName && fullName !== 'Student' && fullName !== 'UNIZIK Student' && fullName.trim().length > 1) {
    return fullName.trim()
  }

  // 2. Fallback to parsing from student email prefix
  return deriveNameFromEmail(user.email)
}

const PaystackCheckout = ({ product, user, onSuccess }) => {
  const [showModal, setShowModal] = useState(false)
  const [regNumber, setRegNumber] = useState('')
  const [acknowledged, setAcknowledged] = useState(false)
  const [creatingOrder, setCreatingOrder] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [inputError, setInputError] = useState('')

  // Strictly get full account name from Google / User profile
  const buyerName = useMemo(() => getBuyerWatermarkName(user), [user])

  // Price conversion
  const priceInKobo = product.priceInKobo || Math.round((product.price || 0) * 100)
  const { totalToCharge, fee } = calculatePaystackFeeAndTotal(priceInKobo)

  const watermarkText = `LICENSED TO: ${buyerName.toUpperCase()} | REG NO: ${regNumber.trim().toUpperCase()} | EMAIL: ${user?.email || 'UNIZIK'} | ORDER TRACEABLE COPY - DO NOT REDISTRIBUTE`

  const handleOpenModal = () => {
    if (!user) {
      alert('Please sign in with your UNIZIK student email to purchase study materials.')
      window.location.href = '/login'
      return
    }
    setInputError('')
    setStatusMessage('')
    setShowModal(true)
  }

  const handleConfirmAndPay = async (e) => {
    e.preventDefault()
    if (!regNumber.trim()) {
      setInputError('Please enter your UNIZIK Registration Number.')
      return
    }
    if (!acknowledged) {
      setInputError('You must acknowledge the watermark & anti-piracy terms.')
      return
    }

    if (!PAYSTACK_PUBLIC_KEY) {
      setInputError('Payment system configuration error: VITE_PAYSTACK_PUBLIC_KEY is not configured in environment. Please contact admin.')
      return
    }

    setCreatingOrder(true)
    setInputError('')
    setStatusMessage('Connecting to secure payment gateway...')

    const activeReference = `ZKS-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`

    try {
      // 1. Ensure Paystack inline script is loaded
      setStatusMessage('Loading payment interface...')
      const PaystackPop = await loadPaystackInlineScript()

      // 2. Insert pending order in supabase with watermark metadata
      setStatusMessage('Creating verified license record...')
      const { error } = await supabase
        .from('orders')
        .insert({
          buyer_id: user.uid || user.id,
          seller_id: product.seller_id || product.sellerId,
          product_id: product.id,
          amount: totalToCharge,
          platform_fee: fee,
          seller_settlement: priceInKobo,
          status: 'pending',
          paystack_reference: activeReference,
          watermark_text: watermarkText,
        })
        .select()
        .single()

      if (error) {
        console.error('Order creation error:', error)
        throw new Error('Failed to create order record: ' + error.message)
      }

      setStatusMessage('Opening Paystack checkout...')

      // 3. Initialize Paystack Inline popup
      const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: user?.email || '',
        amount: totalToCharge,
        currency: 'NGN',
        ref: activeReference,
        channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
        ...(product.users?.paystack_subaccount_code ? { subaccount: product.users.paystack_subaccount_code } : {}),
        metadata: {
          product_id: product.id,
          product_type: 'digital_pdf',
          buyer_name: buyerName,
          reg_number: regNumber.trim().toUpperCase(),
          watermark_text: watermarkText,
          custom_fields: [
            { display_name: 'Product', variable_name: 'product_name', value: product.title },
            { display_name: 'Buyer Name', variable_name: 'buyer_name', value: buyerName },
            { display_name: 'Reg Number', variable_name: 'reg_number', value: regNumber.trim().toUpperCase() },
            { display_name: 'Seller', variable_name: 'seller_id', value: product.seller_id || product.sellerId }
          ]
        },
        callback: function (response) {
          setShowModal(false)
          setCreatingOrder(false)
          onSuccess(response?.reference || activeReference)
        },
        onClose: function () {
          setCreatingOrder(false)
          setStatusMessage('')
        }
      })

      handler.openIframe()
    } catch (err) {
      console.error('Payment launch error:', err)
      setInputError(err.message || 'Could not launch payment window. Please try again.')
      setCreatingOrder(false)
      setStatusMessage('')
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpenModal}
        style={{
          width: '100%',
          padding: '0.875rem',
          borderRadius: '0.75rem',
          border: 'none',
          background: 'linear-gradient(135deg, #10B981, #059669)',
          color: 'white',
          fontSize: '0.9375rem',
          fontWeight: 700,
          fontFamily: 'inherit',
          cursor: 'pointer',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(16,185,129,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
        }}
      >
        <Lock size={16} />
        <span>Buy & Download PDF (₦{(totalToCharge / 100).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })})</span>
      </button>

      {/* Reg Number & Anti-Piracy Watermark Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(5px)', padding: '1rem' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '1.25rem', width: '100%', maxWidth: '30rem', maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)', border: '1px solid var(--color-border)' }}>
            
            {/* Modal Header */}
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F8FAFC', borderTopLeftRadius: '1.25rem', borderTopRightRadius: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={20} color="#2563EB" />
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>License & Watermark Verification</h3>
              </div>
              <button 
                onClick={() => !creatingOrder && setShowModal(false)} 
                disabled={creatingOrder}
                style={{ background: 'none', border: 'none', cursor: creatingOrder ? 'not-allowed' : 'pointer', padding: '0.25rem', display: 'flex', color: 'var(--color-text-muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleConfirmAndPay} style={{ padding: '1.25rem 1.5rem' }}>
              
              {/* Product summary card */}
              <div style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 700, color: '#1E40AF' }}>{product.title}</h4>
                  <p style={{ margin: '0.125rem 0 0', fontSize: '0.6875rem', color: '#3B82F6' }}>Category: {product.category || 'Notes'}</p>
                </div>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#1E40AF' }}>
                  {formatNaira(totalToCharge / 100)}
                </span>
              </div>

              {/* Missing Key Warning for Admin/Dev */}
              {!PAYSTACK_PUBLIC_KEY && (
                <div style={{ padding: '0.875rem', borderRadius: '0.75rem', backgroundColor: '#FEF2F2', border: '1.5px solid #F87171', color: '#991B1B', marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <AlertCircle size={18} color="#DC2626" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ fontSize: '0.75rem', lineHeight: 1.4 }}>
                    <strong>Paystack Public Key Missing:</strong><br />
                    <code>VITE_PAYSTACK_PUBLIC_KEY</code> is not set in environment variables. Please add your Paystack Public Key to enable checkout.
                  </div>
                </div>
              )}

              {/* BOLD ANTI-PIRACY WATERMARK NOTICE */}
              <div style={{ padding: '1rem', borderRadius: '0.875rem', backgroundColor: '#FEF2F2', border: '2px solid #DC2626', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <ShieldAlert size={22} color="#DC2626" />
                  <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 900, color: '#991B1B', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    ⚠️ BOLD ANTI-PIRACY NOTICE
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#7F1D1D', lineHeight: 1.5, fontWeight: 600 }}>
                  Every page of this encrypted PDF will be <strong>permanently watermarked</strong> with your <strong>Full Name ({buyerName})</strong> and <strong>Registration Number</strong>.
                </p>
                <p style={{ margin: '0.5rem 0 0', fontSize: '0.6875rem', color: '#991B1B', lineHeight: 1.4 }}>
                  Distributing, sharing on WhatsApp/Telegram, or re-uploading this document anywhere will expose your identity and Registration Number, resulting in academic disciplinary actions.
                </p>
              </div>

              {/* Verified Account Name (Auto-Populated from Google / Account Profile) */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0F172A' }}>
                    Buyer Name (Watermark Stamp)
                  </label>
                  <span style={{ fontSize: '0.625rem', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem', backgroundColor: '#ECFDF5', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>
                    <Lock size={10} /> Verified Account Name
                  </span>
                </div>
                <div style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.625rem', backgroundColor: '#F1F5F9', border: '1px solid #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0F172A' }}>
                    {buyerName}
                  </span>
                  <span style={{ fontSize: '0.6875rem', color: '#64748B', fontFamily: 'monospace' }}>
                    {user?.email}
                  </span>
                </div>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.625rem', color: 'var(--color-text-muted)' }}>
                  Fetched from your authenticated UNIZIK account profile ({user?.email})
                </p>
              </div>

              {/* Registration Number Input */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.375rem', color: '#0F172A' }}>
                  UNIZIK Registration Number *
                </label>
                <input
                  type="text"
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  placeholder="e.g. 2021174092 or 2022/REG/..."
                  required
                  autoFocus
                  disabled={creatingOrder}
                  style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.625rem', border: '2px solid #3B82F6', fontSize: '0.875rem', fontFamily: 'monospace', letterSpacing: '0.05em', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              {/* Watermark Live Preview */}
              {regNumber.trim() && (
                <div style={{ padding: '0.625rem 0.75rem', borderRadius: '0.5rem', backgroundColor: '#F1F5F9', border: '1px dashed #94A3B8', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Watermark Stamp Preview:</span>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.6875rem', fontFamily: 'monospace', color: '#0F172A', wordBreak: 'break-all' }}>
                    {watermarkText}
                  </p>
                </div>
              )}

              {/* Mandatory Checkbox */}
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '1.25rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={acknowledged}
                  disabled={creatingOrder}
                  onChange={(e) => setAcknowledged(e.target.checked)}
                  style={{ marginTop: '0.125rem', width: '1rem', height: '1rem' }}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: 1.4, fontWeight: 500 }}>
                  I acknowledge that my <strong>Name ({buyerName})</strong> and <strong>Reg Number ({regNumber || '...'})</strong> will be permanently embedded in this PDF, and sharing it violates UNIZIK academic policies.
                </span>
              </label>

              {inputError && (
                <div style={{ padding: '0.625rem 0.75rem', borderRadius: '0.5rem', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem' }}>
                  {inputError}
                </div>
              )}

              {/* Status indicator when opening */}
              {creatingOrder && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', backgroundColor: '#EFF6FF', borderRadius: '0.5rem', border: '1px solid #BFDBFE', color: '#1E40AF', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '1rem' }}>
                  <Loader2 size={16} className="animate-spin" />
                  <span>{statusMessage || 'Preparing secure payment...'}</span>
                </div>
              )}

              {/* Confirm and Pay Button */}
              <button
                type="submit"
                disabled={creatingOrder || !acknowledged || !regNumber.trim() || !PAYSTACK_PUBLIC_KEY}
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  background: (!acknowledged || !regNumber.trim() || !PAYSTACK_PUBLIC_KEY) ? '#94A3B8' : 'linear-gradient(135deg, #10B981, #059669)',
                  color: 'white',
                  fontSize: '0.9375rem',
                  fontWeight: 800,
                  fontFamily: 'inherit',
                  cursor: (!acknowledged || !regNumber.trim() || creatingOrder || !PAYSTACK_PUBLIC_KEY) ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: (acknowledged && regNumber.trim() && PAYSTACK_PUBLIC_KEY) ? '0 4px 14px rgba(16,185,129,0.35)' : 'none'
                }}
              >
                {creatingOrder ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Launching Paystack...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Pay {formatNaira(totalToCharge / 100)}</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default PaystackCheckout
