import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('ref');
  const [status, setStatus] = useState('processing');
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      const { data } = await supabase
        .from('orders')
        .select('*')
        .eq('paystack_reference', reference)
        .single();

      if (data?.status === 'delivered') setStatus('ready');
      else if (data?.status === 'processing_failed') setStatus('error');
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
          <div style={{ margin: '0 auto 1rem', width: '3rem', height: '3rem', borderRadius: '50%', border: '4px solid #F3F4F6', borderTopColor: '#3B82F6', animation: 'spin 1s linear infinite' }}></div>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>🔐 Encrypting your PDF...</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>We're generating a unique encrypted copy just for you.</p>
          <p style={{ color: '#DC2626', fontSize: '0.75rem', fontWeight: 600 }}>Don't close this page!</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '1rem', backgroundColor: 'var(--color-background)' }}>
        <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', maxWidth: '24rem', width: '100%' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#DC2626', marginBottom: '0.5rem' }}>❌ Processing Failed</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Please contact support for assistance.</p>
          <button onClick={() => navigate('/')} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'var(--color-brand)', color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', padding: '1rem', backgroundColor: 'var(--color-background)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', maxWidth: '28rem', width: '100%' }}>
        <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: '1rem' }}>✅</div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, textAlign: 'center', marginBottom: '0.5rem' }}>Payment Successful!</h2>
        <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>Your unique encrypted PDF is ready.</p>

        <div style={{ backgroundColor: '#F9FAFB', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.75rem' }}>🔐 Your password has been sent to:</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.25rem' }}>💬</span>
              <div>
                <strong style={{ fontSize: '0.875rem' }}>In-App Messages</strong>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Check your chat for the password</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.25rem' }}>📧</span>
              <div>
                <strong style={{ fontSize: '0.875rem' }}>Email</strong>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Also sent to your registered email</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#FEF2F2', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #FECACA', marginBottom: '1.5rem' }}>
          <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', color: '#991B1B' }}>⚠️ Important Security Notice</h4>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.75rem', color: '#991B1B', lineHeight: 1.5 }}>
            <li>Your copy is <strong>watermarked</strong> with your identity.</li>
            <li>Sharing is <strong>traceable</strong>.</li>
            <li>Password is <strong>unique</strong> to your copy only.</li>
            <li>Download link expires in <strong>24 hours</strong>.</li>
            <li>Maximum <strong>3 downloads</strong>.</li>
          </ul>
        </div>

        <button onClick={() => navigate('/messages')} style={{ width: '100%', padding: '0.875rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', fontSize: '0.9375rem', fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', textAlign: 'center' }}>
          Go to Messages →
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
