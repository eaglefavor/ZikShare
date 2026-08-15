import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ShieldAlert, CheckCircle2, Lock, ArrowRight, FileText, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { getOrder, fulfillDigitalOrder, createSignedDownloadUrl } from '../lib/database';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('ref');
  const [status, setStatus] = useState('processing');
  const [order, setOrder] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [showInstantUnlock, setShowInstantUnlock] = useState(false);
  const isFulfillingRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    let pollInterval = null;

    // Show manual instant unlock fallback button after 3 seconds
    const fallbackTimer = setTimeout(() => {
      if (isMounted) setShowInstantUnlock(true);
    }, 3000);

    const handleCheckAndFulfill = async () => {
      if (!reference) return;

      try {
        const orderData = await getOrder(reference);

        if (orderData && isMounted) {
          setOrder(orderData);

          if (orderData.status === 'delivered' || orderData.status === 'ready') {
            setStatus('ready');
            if (pollInterval) clearInterval(pollInterval);
            return;
          }

          // If still pending after 3.5s, auto-fulfill directly
          if (orderData.status === 'pending' && !isFulfillingRef.current) {
            isFulfillingRef.current = true;
            try {
              const fulfilled = await fulfillDigitalOrder(orderData);
              if (fulfilled && isMounted) {
                setOrder(fulfilled);
                setStatus('ready');
                if (pollInterval) clearInterval(pollInterval);
              }
            } catch (fulErr) {
              console.warn('Auto fulfill warning:', fulErr);
            } finally {
              isFulfillingRef.current = false;
            }
          }
        }
      } catch (err) {
        console.error('Error checking order status:', err);
      }
    };

    if (reference) {
      handleCheckAndFulfill();
      pollInterval = setInterval(handleCheckAndFulfill, 2500);
    }

    return () => {
      isMounted = false;
      clearTimeout(fallbackTimer);
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [reference]);

  const handleManualUnlock = async () => {
    if (!order) return;
    setStatus('processing');
    try {
      const fulfilled = await fulfillDigitalOrder(order);
      if (fulfilled) {
        setOrder(fulfilled);
        setStatus('ready');
      }
    } catch (err) {
      alert('Could not unlock material: ' + err.message);
    }
  };

  const handleDownloadPdf = async () => {
    const storagePath = order?.unique_storage_path || order?.product?.original_storage_path;
    if (!storagePath) {
      alert('File is being finalized. Please try again in 5 seconds.');
      return;
    }

    setDownloading(true);
    try {
      const downloadUrl = await createSignedDownloadUrl(storagePath, 3600);
      if (downloadUrl) {
        window.open(downloadUrl, '_blank');
      } else {
        alert('Could not generate secure download link. Please refresh or contact support.');
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
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>🔐 Generating Watermarked PDF...</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8125rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>We're securing your purchase and preparing your personalized copy.</p>
          
          {showInstantUnlock && order && (
            <button
              onClick={handleManualUnlock}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.75rem',
                border: 'none',
                background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(37,99,235,0.3)',
                marginTop: '0.5rem'
              }}
            >
              <Sparkles size={16} />
              <span>⚡ Unlock & View Material Now</span>
            </button>
          )}

          <p style={{ color: '#DC2626', fontSize: '0.75rem', fontWeight: 700, marginTop: '1rem', margin: '1rem 0 0' }}>Do not close this page!</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '1rem', backgroundColor: '#F8FAFC' }}>
        <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '2rem', borderRadius: '1.25rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', maxWidth: '24rem', width: '100%', border: '1px solid var(--color-border)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#DC2626', marginBottom: '0.5rem' }}>❌ Processing Notice</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8125rem', marginBottom: '1.5rem' }}>We verified your payment. Reference: <strong>{reference}</strong></p>
          <button onClick={handleManualUnlock} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.625rem', backgroundColor: 'var(--color-brand)', color: 'white', border: 'none', fontWeight: 700, cursor: 'pointer', marginBottom: '0.5rem' }}>Retry Unlock</button>
          <button onClick={() => navigate('/')} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.625rem', backgroundColor: 'white', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)', fontWeight: 600, cursor: 'pointer' }}>Return Home</button>
        </div>
      </div>
    );
  }

  const unlockPassword = order?.unique_password || 'ZikShare-Verified';

  return (
    <div style={{ minHeight: '100vh', padding: '1.5rem 1rem', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '2rem 1.5rem', borderRadius: '1.25rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08)', maxWidth: '30rem', width: '100%', border: '1px solid var(--color-border)' }}>
        <div style={{ width: '4rem', height: '4rem', borderRadius: '9999px', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#10B981' }}>
          <CheckCircle2 size={36} />
        </div>
        <h2 style={{ fontSize: '1.375rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.25rem', color: '#0F172A' }}>Payment Successful! 🎉</h2>
        <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.8125rem', marginBottom: '1.25rem' }}>Your customized study material is ready for download.</p>

        {/* BOLD ANTI-PIRACY DISCLAIMER */}
        <div style={{ backgroundColor: '#FEF2F2', padding: '1.125rem', borderRadius: '0.875rem', border: '2px solid #DC2626', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <ShieldAlert size={20} color="#DC2626" />
            <h4 style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 900, color: '#991B1B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              ⚠️ STRICT WATERMARK & ANTI-PIRACY NOTICE
            </h4>
          </div>
          <p style={{ margin: '0 0 0.5rem', fontSize: '0.75rem', color: '#7F1D1D', fontWeight: 600, lineHeight: 1.4 }}>
            Every page of this document is registered to your <strong>UNIZIK Account & Reg Number</strong>.
          </p>
          <p style={{ margin: 0, fontSize: '0.6875rem', color: '#991B1B', lineHeight: 1.4 }}>
            Redistributing or re-uploading this material reveals your identity and triggers immediate disciplinary actions.
          </p>

          {order?.watermark_text && (
            <div style={{ marginTop: '0.625rem', padding: '0.5rem', borderRadius: '0.375rem', backgroundColor: 'rgba(255,255,255,0.7)', border: '1px dashed #F87171', fontSize: '0.625rem', fontFamily: 'monospace', color: '#7F1D1D', wordBreak: 'break-all' }}>
              {order.watermark_text}
            </div>
          )}
        </div>

        {/* Password & Download Card */}
        <div style={{ backgroundColor: '#F8FAFC', padding: '1.25rem', borderRadius: '0.875rem', border: '1px solid var(--color-border)', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 800, margin: '0 0 0.75rem', display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#0F172A' }}>
            <Lock size={16} color="var(--color-brand)" /> Your PDF Unlock Password:
          </h3>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', padding: '0.75rem 1rem', borderRadius: '0.625rem', border: '1.5px dashed #3B82F6', marginBottom: '0.75rem' }}>
            <code style={{ fontSize: '1.125rem', fontWeight: 800, letterSpacing: '0.08em', color: '#1E40AF', fontFamily: 'monospace' }}>
              {unlockPassword}
            </code>
            <button
              onClick={() => {
                navigator.clipboard.writeText(unlockPassword);
                alert('Password copied to clipboard!');
              }}
              style={{ padding: '0.375rem 0.75rem', borderRadius: '0.375rem', border: 'none', backgroundColor: '#EFF6FF', color: '#2563EB', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
            >
              Copy Password
            </button>
          </div>

          <p style={{ margin: 0, fontSize: '0.6875rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
            💡 Enter this unique password when opening the downloaded PDF document.
          </p>
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
              opacity: downloading ? 0.8 : 1
            }}
          >
            {downloading ? <Loader2 size={18} className="animate-spin" /> : <FileText size={18} />}
            <span>{downloading ? 'Preparing Download Link...' : 'Download Study Material PDF'}</span>
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
              gap: '0.5rem'
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
