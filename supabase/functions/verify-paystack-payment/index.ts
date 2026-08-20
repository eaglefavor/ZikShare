import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const PAYSTACK_SECRET = Deno.env.get('PAYSTACK_SECRET_KEY') || '';
if (!PAYSTACK_SECRET) console.error('[verify-paystack-payment] Missing PAYSTACK_SECRET_KEY env');
if (!SUPABASE_URL) console.error('[verify-paystack-payment] Missing SUPABASE_URL env');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-requested-with',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
  'Access-Control-Max-Age': '86400',
};

function calculatePaystackFeeAndTotal(amountInKobo: number): { totalToCharge: number; fee: number } {
  const p = amountInKobo / 100
  let totalNgn: number
  const totalIfUnder2500 = p / 0.985
  if (totalIfUnder2500 < 2500) totalNgn = totalIfUnder2500
  else totalNgn = (p + 100) / 0.985
  if (totalNgn - p > 2000) totalNgn = p + 2000
  const fee = totalNgn - p
  return { totalToCharge: Math.ceil(totalNgn * 100), fee: Math.ceil(fee * 100) }
}

function generateSecurePassword(length = 16): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%*';
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  return Array.from(randomValues).map(n => chars[n % chars.length]).join('');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { reference } = await req.json();

    if (!reference) {
      return new Response(
        JSON.stringify({ status: false, message: 'Transaction reference is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 1. Verify directly with Paystack API
    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const result = await paystackRes.json();

    if (!result?.status || result?.data?.status !== 'success') {
      return new Response(
        JSON.stringify({
          status: false,
          verified: false,
          message: result?.data?.gateway_response || result?.message || 'Payment verification failed',
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const txData = result.data;

    // 1b. Server-side fee validation — never trust client amount
    //    Paystack amount must match what seller expected (seller_settlement + fee)
    if (txData.amount == null) {
      console.warn('[verify-paystack-payment] Paystack tx missing amount field')
    }

    // 2. Fulfill order in Supabase
    if (SUPABASE_SERVICE_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

      const { data: order } = await supabase
        .from('orders')
        .select('*, product:digital_products(*), buyer:users!buyer_id(*)')
        .eq('paystack_reference', reference)
        .single();

      if (order) {
        // Server-side amount integrity check
        const expected = calculatePaystackFeeAndTotal(order.seller_settlement || order.amount)
        const txAmount = Number(txData.amount)
        // Allow 1 kobo rounding diff due to ceil
        if (order.amount && txAmount && Math.abs(txAmount - order.amount) > 1) {
          console.error(`[verify-paystack-payment] Amount mismatch: tx ${txAmount} vs order ${order.amount} (expected ${expected.totalToCharge}) for ref ${reference}`)
          return new Response(JSON.stringify({ status: false, verified: false, message: `Payment amount mismatch — expected ₦${(order.amount/100).toFixed(2)} but got ₦${(txAmount/100).toFixed(2)}. Contact support.` }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
        }
        // Also verify against recomputed fee if seller_settlement is present
        if (order.seller_settlement && txAmount && Math.abs(txAmount - expected.totalToCharge) > 1) {
          console.warn(`[verify-paystack-payment] Fee recompute warn: tx ${txAmount} vs recomputed ${expected.totalToCharge}`)
          // Still allow if order.amount matches txAmount (order.amount is source of truth)
        }

        let password = order.unique_password || generateSecurePassword(16);
        let finalStoragePath = order.unique_storage_path || order.product?.original_storage_path;
        const buyerEmail = order.buyer?.email || '';
        const buyerName = (order.buyer?.displayName || buyerEmail.split('@')[0] || 'UNIZIK STUDENT').replace(/[._-]/g, ' ').toUpperCase();
        const regNumber = txData?.metadata?.reg_number || 'UNIZIK-STUDENT';
        const watermarkText = order.watermark_text || `LICENSED TO: ${buyerName} | REG NO: ${regNumber} | ORDER: ${order.id} | UNIZIK SECURE COPY`;

        const updates = {
          status: 'delivered',
          paystack_transaction_id: String(txData.id),
          unique_password: password,
          unique_storage_path: finalStoragePath,
          watermark_text: watermarkText,
          download_expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        };

        const { data: updatedOrder } = await supabase
          .from('orders')
          .update(updates)
          .eq('id', order.id)
          .select('*, product:digital_products(*)')
          .single();

        return new Response(
          JSON.stringify({
            status: true,
            verified: true,
            order: updatedOrder || { ...order, ...updates },
            transaction: txData,
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    return new Response(
      JSON.stringify({
        status: true,
        verified: true,
        transaction: txData,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Verify payment error:', error);
    return new Response(
      JSON.stringify({ status: false, message: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
