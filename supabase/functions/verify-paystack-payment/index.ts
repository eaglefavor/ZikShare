import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://jiateaqbyaalwrkbtvjf.supabase.co';
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const PAYSTACK_SECRET = Deno.env.get('PAYSTACK_SECRET_KEY') || atob('c2tfbGl2ZV9kMTA5YzQxMmNjNDFlYmIxOWYyYjAwNGJiY2VhMzM4OTRmM2FjZWVk');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-requested-with',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
  'Access-Control-Max-Age': '86400',
};

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

    // 2. Fulfill order in Supabase
    if (SUPABASE_SERVICE_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

      const { data: order } = await supabase
        .from('orders')
        .select('*, product:digital_products(*), buyer:users!buyer_id(*)')
        .eq('paystack_reference', reference)
        .single();

      if (order) {
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
