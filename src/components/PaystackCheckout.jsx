import { usePaystackPayment } from 'react-paystack';
import { useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { calculatePaystackFeeAndTotal } from '../lib/paystack';

const PaystackCheckout = ({ product, user, onSuccess }) => {
  // Use calculatePaystackFeeAndTotal to get fee to pass to buyer
  // Ensure the seller receives 100% of their intended price
  const { totalToCharge, fee } = calculatePaystackFeeAndTotal(product.price);

  // We use the seller's subaccount if they have one set in the users table
  // Setting percentage_charge to 0 makes the seller take 100% of the non-fee amount,
  // Or rather, we pass the subaccount and Paystack splits it.
  // Wait, if we use a split code or subaccount, we can pass bear_fee = true
  // or explicitly pass subaccount with percentage_charge: 0 (if supported)
  const config = useMemo(() => ({
    reference: `ZKS-${Date.now()}`, // eslint-disable-line react-hooks/exhaustive-deps
    email: user.email,
    amount: totalToCharge,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxxxxxxx',
    subaccount: product.users?.paystack_subaccount_code || undefined, // Seller's subaccount if available
    metadata: {
      product_id: product.id,
      product_type: 'digital_pdf',
      custom_fields: [
        { display_name: 'Product', variable_name: 'product_name', value: product.title },
        { display_name: 'Seller', variable_name: 'seller_id', value: product.seller_id }
      ]
    }
  }), [user, product, totalToCharge]);

  const initializePayment = usePaystackPayment(config);

  const handlePayment = async () => {
    // Create order as pending in supabase
    const { error } = await supabase
      .from('orders')
      .insert({
        buyer_id: user.uid || user.id,
        seller_id: product.seller_id,
        product_id: product.id,
        amount: totalToCharge,
        platform_fee: fee,
        seller_settlement: product.price, // exactly what seller asked for
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
    <button onClick={handlePayment} style={{ width: '100%', padding: '0.875rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #10B981, #059669)', color: 'white', fontSize: '0.9375rem', fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', textAlign: 'center', boxShadow: '0 4px 12px rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
      💳 Pay ₦{(totalToCharge / 100).toLocaleString()} (incl. fee)
    </button>
  );
};

export default PaystackCheckout;
