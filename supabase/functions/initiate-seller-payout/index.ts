import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const PAYSTACK_SECRET = Deno.env.get('PAYSTACK_SECRET_KEY') || '';
if (!PAYSTACK_SECRET) console.error('[initiate-seller-payout] Missing PAYSTACK_SECRET_KEY env');

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
    const { seller_id, amount_in_naira, reason } = await req.json();

    if (!seller_id || !amount_in_naira || amount_in_naira <= 0) {
      return new Response(
        JSON.stringify({ status: false, message: 'seller_id and valid amount_in_naira are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // 1. Fetch seller bank details
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('uid', seller_id)
      .single();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ status: false, message: 'Seller user account not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!user.account_number || !user.bank_code) {
      return new Response(
        JSON.stringify({
          status: false,
          message: 'Seller has not set up a bank account yet. Please add bank details on the Payouts tab.',
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const amountInKobo = Math.round(amount_in_naira * 100);

    // 2. Create or retrieve Paystack Transfer Recipient
    const recipientRes = await fetch('https://api.paystack.co/transferrecipient', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'nuban',
        name: user.account_name || user.displayName || 'UNIZIK Student Seller',
        account_number: user.account_number.trim(),
        bank_code: user.bank_code.trim(),
        currency: 'NGN',
        description: `ZikShare Seller Payout - ${user.displayName || seller_id}`,
      }),
    });

    const recipientData = await recipientRes.json();
    const recipientCode = recipientData?.data?.recipient_code;

    if (!recipientCode) {
      return new Response(
        JSON.stringify({
          status: false,
          message: recipientData?.message || 'Failed to create Paystack transfer recipient',
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 3. Initiate Transfer from Paystack Balance
    const transferRes = await fetch('https://api.paystack.co/transfer', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: 'balance',
        amount: amountInKobo,
        recipient: recipientCode,
        reason: reason || `ZikShare Earnings Payout for ${user.displayName || 'Seller'}`,
      }),
    });

    const transferResult = await transferRes.json();

    if (!transferResult?.status) {
      return new Response(
        JSON.stringify({
          status: false,
          message: transferResult?.message || 'Paystack transfer could not be initiated.',
          details: transferResult,
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        status: true,
        message: 'Payout transfer initiated successfully! Funds will reflect shortly.',
        data: transferResult.data,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Initiate payout error:', error);
    return new Response(
      JSON.stringify({ status: false, message: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
