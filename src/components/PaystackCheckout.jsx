import { usePaystackPayment } from 'react-paystack';
import { useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { calculatePaystackFeeAndTotal, PAYSTACK_PUBLIC_KEY } from '../lib/paystack';

const PaystackCheckout = ({ product, user, onSuccess }) => {
  // Ensure product price is converted to kobo for fee calculation
  const priceInKobo = product.priceInKobo || Math.round((product.price || 0) * 100);
  const { totalToCharge, fee } = calculatePaystackFeeAndTotal(priceInKobo);

  const config = useMemo(() => ({
    reference: `ZKS-${Date.now()}`, // eslint-disable-line react-hooks/exhaustive-deps
    email: user?.email || '',
    amount: totalToCharge,
    publicKey: PAYSTACK_PUBLIC_KEY,
    subaccount: product.users?.paystack_subaccount_code || undefined,
    metadata: {
      product_id: product.id,
      product_type: 'digital_pdf',
      custom_fields: [
        { display_name: 'Product', variable_name: 'product_name', value: product.title },
        { display_name: 'Seller', variable_name: 'seller_id', value: product.seller_id || product.sellerId }
      ]
    }
  }), [user, product, totalToCharge]);

  const initializePayment = usePaystackPayment(config);

  const handlePayment = async () => {
    if (!user) {
      alert('Please log in to proceed with payment.');
      return;
    }

    // Create order as pending in supabase
    const { error } = await supabase
      .from('orders')
      .insert({
        buyer_id: user.uid || user.id,
        seller_id: product.seller_id || product.sellerId,
        product_id: product.id,
        amount: totalToCharge,
        platform_fee: fee,
        seller_settlement: priceInKobo, // exactly what seller asked for in kobo
        status: 'pending',
        paystack_reference: config.reference
      })
      .select()
      .single();

    if (error) {
      alert('Failed to create order: ' + error.message);
      return;
    }

    initializePayment({
      onSuccess: (ref) => onSuccess(ref.reference),
      onClose: () => console.log('Payment cancelled')
    });
  };

  return (
    <button
      onClick={handlePayment}
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
        boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
      }}
    >
      💳 Pay ₦{(totalToCharge / 100).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })} (incl. fee)
    </button>
  );
};

export default PaystackCheckout;
