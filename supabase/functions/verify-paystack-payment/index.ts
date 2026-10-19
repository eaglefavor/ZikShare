import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const PAYSTACK_SECRET = Deno.env.get('PAYSTACK_SECRET_KEY') || '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-requested-with',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
  'Access-Control-Max-Age': '86400',
};

function calculatePaystackFeeAndTotal(amountInKobo: number): { totalToCharge: number; fee: number } {
  const p = amountInKobo / 100;
  let totalNgn: number;
  const totalIfUnder2500 = p / 0.985;
  if (totalIfUnder2500 < 2500) totalNgn = totalIfUnder2500;
  else totalNgn = (p + 100) / 0.985;
  if (totalNgn - p > 2000) totalNgn = p + 2000;
  const fee = totalNgn - p;
  return { totalToCharge: Math.ceil(totalNgn * 100), fee: Math.ceil(fee * 100) };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { reference, user_id } = await req.json();

    if (!reference) {
      return new Response(
        JSON.stringify({ status: false, message: 'Transaction reference is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!PAYSTACK_SECRET) {
      console.error('[verify-paystack-payment] Missing PAYSTACK_SECRET_KEY');
      return new Response(
        JSON.stringify({ status: false, message: 'Server configuration error: missing payment secret' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 1. Verify directly with Paystack API
    const cleanRef = String(reference).trim();
    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(cleanRef)}`,
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
      const errMsg = result?.data?.gateway_response || result?.message || 'Payment verification was not successful';
      return new Response(
        JSON.stringify({
          status: false,
          verified: false,
          message: errMsg,
          details: result?.data,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const txData = result.data;
    const txAmount = Number(txData.amount);

    // 2. Fulfill order in Supabase
    if (SUPABASE_SERVICE_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

      // Search for order by reference
      let { data: order } = await supabase
        .from('orders')
        .select('*, product:digital_products(*), buyer:users!buyer_id(*), seller:users!seller_id(*)')
        .eq('paystack_reference', cleanRef)
        .maybeSingle();

      // If not found by reference, try finding pending order by buyer_id and metadata product_id
      if (!order && txData.metadata?.product_id) {
        const query = supabase
          .from('orders')
          .select('*, product:digital_products(*), buyer:users!buyer_id(*), seller:users!seller_id(*)')
          .eq('product_id', txData.metadata.product_id)
          .eq('status', 'pending');

        if (user_id) {
          query.eq('buyer_id', user_id);
        }

        const { data: fallbackOrder } = await query.order('created_at', { ascending: false }).limit(1).maybeSingle();
        if (fallbackOrder) {
          order = fallbackOrder;
        }
      }

      if (order) {
        // Server-side amount integrity check
        if (order.amount && txAmount && Math.abs(txAmount - order.amount) > 1) {
          console.error(`[verify-paystack-payment] Amount mismatch: tx ${txAmount} vs order ${order.amount} for ref ${cleanRef}`);
          return new Response(
            JSON.stringify({
              status: false,
              verified: false,
              message: `Payment amount mismatch — expected ₦${(order.amount / 100).toFixed(2)} but got ₦${(txAmount / 100).toFixed(2)}. Please contact support.`,
            }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const storagePath = order.unique_storage_path || order.product?.original_storage_path;
        const buyerEmail = order.buyer?.email || txData?.customer?.email || '';
        const buyerName = (order.buyer?.displayName || txData.metadata?.buyer_name || buyerEmail.split('@')[0] || 'UNIZIK STUDENT').replace(/[._-]/g, ' ').toUpperCase();
        const regNumber = txData?.metadata?.reg_number || order.watermark_text?.match(/REG NO: ([^|]+)/i)?.[1]?.trim() || 'UNIZIK-STUDENT';
        const watermarkText = order.watermark_text || `LICENSED TO: ${buyerName} | REG NO: ${regNumber} | ORDER: ${order.id} | UNIZIK SECURE COPY`;

        const updates = {
          status: 'delivered',
          paystack_reference: cleanRef,
          paystack_transaction_id: String(txData.id),
          unique_storage_path: storagePath,
          watermark_text: watermarkText,
          download_expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        };

        const { data: updatedOrder, error: updateErr } = await supabase
          .from('orders')
          .update(updates)
          .eq('id', order.id)
          .select('*, product:digital_products(*), buyer:users!buyer_id(*), seller:users!seller_id(*)')
          .single();

        if (updateErr) {
          console.error('[verify-paystack-payment] Error updating order:', updateErr);
        }

        // Generate signed download URL via service role
        let directDownloadUrl = null;
        if (storagePath) {
          try {
            // Check digital-orders first, then digital-originals
            const { data: signRes } = await supabase
              .storage
              .from('digital-orders')
              .createSignedUrl(storagePath, 86400);

            if (signRes?.signedUrl) {
              directDownloadUrl = signRes.signedUrl;
            } else {
              const { data: origSignRes } = await supabase
                .storage
                .from('digital-originals')
                .createSignedUrl(storagePath, 86400);
              if (origSignRes?.signedUrl) {
                directDownloadUrl = origSignRes.signedUrl;
              }
            }
          } catch (storageErr) {
            console.warn('[verify-paystack-payment] Signed URL creation warning:', storageErr);
          }
        }

        return new Response(
          JSON.stringify({
            status: true,
            verified: true,
            order: updatedOrder || { ...order, ...updates },
            download_url: directDownloadUrl,
            transaction: txData,
            message: 'Payment verified and material unlocked successfully! 🎉',
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
        message: 'Payment confirmed on Paystack.',
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Verify payment error:', error);
    return new Response(
      JSON.stringify({ status: false, message: error.message || 'Internal server error during verification' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
