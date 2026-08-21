import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ShieldAlert, CheckCircle2, Lock, ArrowRight, FileText, Loader2, Sparkles, RefreshCw, AlertTriangle, Key, Copy, Check } from 'lucide-react';
import { getOrder, createSignedDownloadUrl } from '../lib/database';
import { verifyPaystackPayment } from '../lib/paystack';
import { downloadWatermarkedPdf, getDrmPassword } from '../lib/pdfWatermark';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('ref');
  const [status, setStatus] = useState('processing');
  const [order, setOrder] = useState(null);
  const [directDownloadUrl, setDirectDownloadUrl] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedPassword, setCopiedPassword] = useState(false);
  const isVerifyingRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    let pollInterval = null;
    let attempts = 0;

    const handleVerify = async () => {
      if (!reference || isVerifyingRef.current) return;
      isVerifyingRef.current = true;
      attempts += 1;

      try {
        // 1. Direct Server-Side Verification via Paystack Edge Function
        const verifyRes = await verifyPaystackPayment(reference);

        if (verifyRes?.success && isMounted) {
          if (verifyRes.order) setOrder(verifyRes.order);
          if (verifyRes.download_url) setDirectDownloadUrl(verifyRes.download_url);
          setStatus('ready');
          if (pollInterval) clearInterval(pollInterval);
          return;
        }

        // 2. Query order directly from database in case webhook delivered it
        const orderData = await getOrder(reference);
        if (orderData && isMounted) {
          setOrder(orderData);
          if (orderData.status === 'delivered' || orderData.status === 'ready') {
            setStatus('ready');
            if (pollInterval) clearInterval(pollInterval);
            return;
          }
        }

        if (attempts >= 8 && isMounted) {
          if (verifyRes?.message) setErrorMessage(verifyRes.message);
          setStatus('pending_manual');
          if (pollInterval) clearInterval(pollInterval);
        }
      } catch (err) {
        console.error('Error during payment verification:', err);
      } finally {
        isVerifyingRef.current = false;
      }
    };

    if (reference) {
      handleVerify();
      pollInterval = setInterval(handleVerify, 3000);
    } else {
      setStatus('error');
      setErrorMessage('No payment reference provided in URL.');
    }

    return () => {
      isMounted = false;
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [reference]);

  const handleManualReverify = async () => {
    if (!reference) return;
    setStatus('processing');
    setErrorMessage('');
    try {
      const verifyRes = await verifyPaystackPayment(reference);
      if (verifyRes?.success) {
        if (verifyRes.order) setOrder(verifyRes.order);
        if (verifyRes.download_url) setDirectDownloadUrl(verifyRes.download_url);
        setStatus('ready');
      } else {
        setStatus('pending_manual');
        setErrorMessage(verifyRes?.message || 'Payment is still being processed by your bank/Paystack. Please retry in a few seconds.');
      }
    } catch (err) {
      setStatus('pending_manual');
      setErrorMessage(err.message || 'Error communicating with verification service.');
    }
  };

  const isDrmProtected = order?.product?.drm_enabled !== false;
  const drmPassword = getDrmPassword(order);

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(drmPassword);
    setCopiedPassword(true);
    setTimeout(() => setCopiedPassword(false), 2500);
  };

  const handleDownloadPdf = async () => {
    const storagePath = order?.unique_storage_path || order?.product?.original_storage_path;
    if (!storagePath && !directDownloadUrl) {
      alert('Your study material is being prepared. Please click in 5 seconds.');
      return;
    }

    setDownloading(true);
    try {
      let downloadUrl = directDownloadUrl;
      if (!downloadUrl && storagePath) {
        downloadUrl = await createSignedDownloadUrl(storagePath, 3600);
      }

      if (downloadUrl) {
        const buyerName = order?.buyer?.displayName || order?.watermark_text?.match(/LICENSED TO: ([^|]+)/i)?.[1]?.trim() || 'UNIZIK STUDENT';
        const regNumber = order?.watermark_text?.match(/REG NO: ([^|]+)/i)?.[1]?.trim() || 'STUDENT';
        const title = order?.product?.title || 'ZikShare Study Material';

        await downloadWatermarkedPdf(downloadUrl, title, {
          buyerName,
          regNumber,
          orderId: order?.id,
          password: drmPassword,
          drmEnabled: isDrmProtected,
        });
      } else {
        alert('Could not generate secure download link. Please click Re-Check Payment.');
      }
    } catch (err) {
      alert('Download error: ' + err.message);
    } finally {
      setDownloading(false);
    }
  };

  if (status === 'processing') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '1rem', backgroundColor: '#F8FAFC' }}>
        <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '2.5rem 1.5rem', borderRadius: '1.25rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.06)', maxWidth: '24rem', width: '100%', border: '1px solid var(--color-border)' }}>
          <div style={{ margin: '0 auto 1.25rem', width: '3.5rem', height: '3.5rem', borderRadius: '50%', border: '4px solid #EFF6FF', borderTopColor: '#2563EB', animation: 'spin 1s linear infinite' }}></div>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>🔐 Verifying Payment...</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8125rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            Connecting with Paystack & preparing your secure licensed PDF.
          </p>
          <p style={{ color: '#64748B', fontSize: '0.6875rem', fontFamily: 'monospace' }}>Ref: {reference}</p>
        </div>
      </div>
    );
  }

  if (status === 'pending_manual' || status === 'error') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '1rem', backgroundColor: '#F8FAFC' }}>
        <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '2rem 1.5rem', borderRadius: '1.25rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', maxWidth: '26rem', width: '100%', border: '1px solid var(--color-border)' }}>
          <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', backgroundColor: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#DC2626' }}>
            <AlertTriangle size={28} />
          </div>
          <h2 style={{ fontSize: '1.1875rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>Verification Notice</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8125rem', marginBottom: '1rem', lineHeight: 1.4 }}>
            {errorMessage || `We are checking the payment confirmation from Paystack for reference: ${reference}`}
          </p>
          <div style={{ backgroundColor: '#F1F5F9', padding: '0.625rem', borderRadius: '0.5rem', fontSize: '0.6875rem', fontFamily: 'monospace', color: '#334155', marginBottom: '1.25rem', wordBreak: 'break-all' }}>
            Reference: {reference}
          </div>
          <button
            onClick={handleManualReverify}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.625rem', backgroundColor: '#2563EB', color: 'white', border: 'none', fontWeight: 700, cursor: 'pointer', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            <RefreshCw size={15} />
            <span>Re-Check Paystack Payment</span>
          </button>
          <button onClick={() => navigate('/profile/purchases')} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.625rem', backgroundColor: 'white', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)', fontWeight: 600, cursor: 'pointer' }}>
            Go to My Purchases
          </button>
        </div>
      </div>
    );
  }

  const buyerName = order?.buyer?.displayName || order?.watermark_text?.match(/LICENSED TO: ([^|]+)/i)?.[1]?.trim() || 'UNIZIK STUDENT';
  const regNumber = order?.watermark_text?.match(/REG NO: ([^|]+)/i)?.[1]?.trim() || 'STUDENT';

  return (
    <div style={{ minHeight: '100vh', padding: '1.5rem 1rem', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '2rem 1.5rem', borderRadius: '1.25rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08)', maxWidth: '30rem', width: '100%', border: '1px solid var(--color-border)' }}>
        <div style={{ width: '4rem', height: '4rem', borderRadius: '9999px', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#10B981' }}>
          <CheckCircle2 size={36} />
        </div>
        <h2 style={{ fontSize: '1.375rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.25rem', color: '#0F172A' }}>Payment Verified! 🎉</h2>
        <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.8125rem', marginBottom: '1.25rem' }}>
          Your licensed study material is ready for download.
        </p>

        {/* DRM PASSWORD BOX */}
        {isDrmProtected && (
          <div style={{ backgroundColor: '#FEF3C7', border: '2px solid #F59E0B', borderRadius: '0.875rem', padding: '1rem 1.125rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <Key size={18} color="#B45309" />
                <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#92400E', textTransform: 'uppercase' }}>PDF Open Password</span>
              </div>
              <button
                onClick={handleCopyPassword}
                style={{
                  background: 'none',
                  border: '1px solid #D97706',
                  borderRadius: '0.375rem',
                  padding: '0.2rem 0.5rem',
                  color: '#92400E',
                  fontSize: '0.6875rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  backgroundColor: '#FFFBEB'
                }}
              >
                {copiedPassword ? <Check size={12} /> : <Copy size={12} />}
                <span>{copiedPassword ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div style={{ backgroundColor: 'white', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: '1px dashed #F59E0B', textAlign: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.125rem', fontWeight: 900, fontFamily: 'monospace', color: '#B45309', letterSpacing: '0.08em' }}>
                {drmPassword}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.6875rem', color: '#78350F', lineHeight: 1.3 }}>
              Enter this password when opening the file in Adobe Acrobat, WPS Office, Chrome, or your phone PDF reader.
            </p>
          </div>
        )}

        {/* BOLD ANTI-PIRACY & WATERMARK NOTICE */}
        <div style={{ backgroundColor: '#FEF2F2', padding: '1.125rem', borderRadius: '0.875rem', border: '2px solid #DC2626', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <ShieldAlert size={20} color="#DC2626" />
            <h4 style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 900, color: '#991B1B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              ⚠️ LICENSED ACADEMIC COPY
            </h4>
          </div>
          <p style={{ margin: '0 0 0.5rem', fontSize: '0.75rem', color: '#7F1D1D', fontWeight: 600, lineHeight: 1.4 }}>
            Licensed to: <strong>{buyerName}</strong> (Reg No: <strong>{regNumber}</strong>).
          </p>
          <p style={{ margin: 0, fontSize: '0.6875rem', color: '#991B1B', lineHeight: 1.4 }}>
            Every page of this PDF contains traceable identification ribbons. Sharing or re-uploading this material violates UNIZIK academic integrity rules.
          </p>
        </div>

        {/* Product Details & Download */}
        <div style={{ backgroundColor: '#F8FAFC', padding: '1rem 1.25rem', borderRadius: '0.875rem', border: '1px solid var(--color-border)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Material:</span>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0F172A' }}>{order?.product?.title || 'Study Material'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Reference:</span>
            <span style={{ fontSize: '0.6875rem', fontFamily: 'monospace', color: '#2563EB', fontWeight: 700 }}>{order?.paystack_reference || reference}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Security Mode:</span>
            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: isDrmProtected ? '#B45309' : '#059669', backgroundColor: isDrmProtected ? '#FEF3C7' : '#ECFDF5', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>
              {isDrmProtected ? '🛡️ AES Password Locked' : '✓ Open Licensed Copy'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            style={{
              width: '100%',
              padding: '0.875rem',
              borderRadius: '0.75rem',
              border: 'none',
              background: 'linear-gradient(135deg, #10B981, #059669)',
              color: 'white',
              fontSize: '0.9375rem',
              fontWeight: 800,
              fontFamily: 'inherit',
              cursor: downloading ? 'not-allowed' : 'pointer',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(16,185,129,0.35)',
              opacity: downloading ? 0.8 : 1,
            }}
          >
            {downloading ? <Loader2 size={18} className="animate-spin" /> : <FileText size={18} />}
            <span>{downloading ? 'Encrypting & Personalizing PDF...' : 'Download DRM-Protected PDF'}</span>
          </button>

          <button
            onClick={() => navigate('/profile/purchases')}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--color-border)',
              backgroundColor: 'white',
              color: 'var(--color-text-primary)',
              fontSize: '0.8125rem',
              fontWeight: 700,
              fontFamily: 'inherit',
              cursor: 'pointer',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <span>View All My Purchases</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
