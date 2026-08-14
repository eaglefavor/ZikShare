import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ShieldAlert, CheckCircle2, Lock, ArrowRight, FileText } from 'lucide-react';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('ref');
  const [status, setStatus] = useState('processing');
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      const { data } = await supabase
        .from('orders')
        .select('*')
        .eq('paystack_reference', reference)
        .single();

      if (data) {
        setOrder(data);
        if (data.status === 'delivered' || data.status === 'ready') setStatus('ready');
        else if (data.status === 'processing_failed') setStatus('error');
      }
    };

    if (reference) {
      checkStatus();
      const interval = setInterval(checkStatus, 3000);
      return () => clearInterval(interval);
    }
  }, [reference]);

  if (status === 'processing') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '1rem', backgroundColor: 'var(--color-background)' }}>
        <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', maxWidth: '24rem', width: '100%' }}>
          <div style={{ margin: '0 auto 1rem', width: '3.5rem', height: '3.5rem', borderRadius: '50%', border: '4px solid #F3F4F6', borderTopColor: '#3B82F6', animation: 'spin 1s linear infinite' }}></div>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>🔐 Generating Watermarked PDF...</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>We're embedding your Name & Registration Number into your private copy.</p>
          <p style={{ color: '#DC2626', fontSize: '0.75rem', fontWeight: 700 }}>Do not close this page!</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '1rem', backgroundColor: 'var(--color-background)' }}>
        <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', maxWidth: '24rem', width: '100%' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#DC2626', marginBottom: '0.5rem' }}>❌ Processing Failed</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Please contact support for assistance with reference: {reference}</p>
          <button onClick={() => navigate('/')} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'var(--color-brand)', color: 'white', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', padding: '1rem', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '2rem 1.5rem', borderRadius: '1.25rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08)', maxWidth: '30rem', width: '100%', border: '1px solid var(--color-border)' }}>
        <div style={{ width: '4rem', height: '4rem', borderRadius: '9999px', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#10B981' }}>
          <CheckCircle2 size={36} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.25rem' }}>Payment Successful! 🎉</h2>
        <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>Your customized encrypted PDF has been generated.</p>

        {/* BOLD ANTI-PIRACY DISCLAIMER */}
        <div style={{ backgroundColor: '#FEF2F2', padding: '1.25rem', borderRadius: '0.875rem', border: '2px solid #DC2626', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <ShieldAlert size={20} color="#DC2626" />
            <h4 style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 900, color: '#991B1B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              ⚠️ STRICT WATERMARK & ANTI-PIRACY NOTICE
            </h4>
          </div>
          <p style={{ margin: '0 0 0.5rem', fontSize: '0.75rem', color: '#7F1D1D', fontWeight: 600, lineHeight: 1.4 }}>
            Every page of this document is permanently watermarked with your <strong>Full Name</strong> and <strong>UNIZIK Reg Number</strong>.
          </p>
          <p style={{ margin: 0, fontSize: '0.6875rem', color: '#991B1B', lineHeight: 1.4 }}>
            Spreading, sharing on WhatsApp/Telegram groups, or re-uploading this PDF will immediately reveal your identity and Registration Number, triggering academic and disciplinary sanctions.
          </p>

          {order?.watermark_text && (
            <div style={{ marginTop: '0.625rem', padding: '0.5rem', borderRadius: '0.375rem', backgroundColor: 'rgba(255,255,255,0.7)', border: '1px dashed #F87171', fontSize: '0.625rem', fontFamily: 'monospace', color: '#7F1D1D', wordBreak: 'break-all' }}>
              {order.watermark_text}
            </div>
          )}
        </div>

        {/* Password Notice */}
        <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '0.8125rem', fontWeight: 800, marginBottom: '0.625rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Lock size={14} color="var(--color-brand)" /> Your PDF Password Delivery:
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
              <span style={{ fontSize: '1rem' }}>💬</span>
              <div>
                <strong style={{ fontSize: '0.8125rem' }}>In-App Messages</strong>
                <p style={{ margin: 0, fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>The download link and unique password are sent to your chat.</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/messages')}
          style={{
            width: '100%',
            padding: '0.875rem',
            borderRadius: '0.75rem',
            border: 'none',
            background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
            color: 'white',
            fontSize: '0.9375rem',
            fontWeight: 800,
            fontFamily: 'inherit',
            cursor: 'pointer',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 14px rgba(59,130,246,0.35)'
          }}
        >
          <span>View in Messages & Download</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
