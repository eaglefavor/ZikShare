import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const PAYSTACK_SECRET = Deno.env.get('PAYSTACK_SECRET_KEY') || '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-requested-with',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
  'Access-Control-Max-Age': '86400',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { email, amount, reference, callback_url, metadata, subaccount, idempotency_key } = await req.json();

    if (!email || !amount || !reference) {
      return new Response(
        JSON.stringify({ status: false, message: 'Email, amount, and reference are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!PAYSTACK_SECRET) {
      console.error('[initialize-paystack-payment] Missing PAYSTACK_SECRET_KEY');
      return new Response(
        JSON.stringify({ status: false, message: 'Server configuration error: missing payment secret' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const cleanReference = String(reference).trim();
    const normalizedIdempotencyKey = String(idempotency_key || cleanReference).trim();

    if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
      const { data: existingOrder } = await supabase
        .from('orders')
        .select('id, paystack_reference')
        .eq('paystack_reference', cleanReference)
        .maybeSingle();

      if (!existingOrder) {
        return new Response(
          JSON.stringify({ status: false, message: 'Order reference not found. Create order before initializing payment.' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    const payload: Record<string, unknown> = {
      email,
      amount: Math.round(amount),
      reference: cleanReference,
      currency: 'NGN',
      callback_url: callback_url || undefined,
      metadata: metadata || {},
      channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
    };

    if (subaccount) {
      payload.subaccount = subaccount;
    }

    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': normalizedIdempotencyKey,
      },
      body: JSON.stringify(payload),
    });

    const result = await paystackRes.json();

    if (!paystackRes.ok || !result.status) {
      console.error('[initialize-paystack-payment] Paystack error:', result);
      return new Response(
        JSON.stringify({ status: false, message: result?.message || 'Failed to initialize Paystack transaction' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        status: true,
        data: result.data, // Contains { authorization_url, access_code, reference }
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[initialize-paystack-payment] Unexpected error:', err);
    return new Response(
      JSON.stringify({ status: false, message: err.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
