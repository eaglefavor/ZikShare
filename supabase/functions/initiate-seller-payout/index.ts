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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { seller_id, amount_in_naira, reason } = await req.json();

    const numericAmount = Number(amount_in_naira);
    if (!seller_id || !numericAmount || numericAmount <= 0) {
      return new Response(
        JSON.stringify({ status: false, message: 'Valid seller_id and positive amount_in_naira are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!PAYSTACK_SECRET) {
      return new Response(
        JSON.stringify({ status: false, message: 'Server configuration error: missing payment secret' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // 1. Fetch seller profile and bank details
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('uid', seller_id)
      .single();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ status: false, message: 'Seller account not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!user.account_number || !user.bank_code) {
      return new Response(
        JSON.stringify({
          status: false,
          message: 'Please link and verify your Nigerian bank account on the Payouts tab before withdrawing.',
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Ledger Check: Calculate true available balance
    const [ordersRes, payoutsRes] = await Promise.all([
      supabase.from('orders').select('seller_settlement, amount, status').eq('seller_id', seller_id).eq('status', 'delivered'),
      supabase.from('payouts').select('amount_naira, status').eq('seller_id', seller_id).neq('status', 'failed'),
    ]);

    const totalEarnedNaira = (ordersRes.data || []).reduce((sum, o) => sum + ((o.seller_settlement || o.amount || 0) / 100), 0);
    const totalWithdrawnNaira = (payoutsRes.data || []).reduce((sum, p) => sum + Number(p.amount_naira || 0), 0);
    const availableBalanceNaira = Math.max(0, totalEarnedNaira - totalWithdrawnNaira);

    if (numericAmount > availableBalanceNaira) {
      return new Response(
        JSON.stringify({
          status: false,
          message: `Insufficient earnings balance. Available: ₦${availableBalanceNaira.toLocaleString()}, Requested: ₦${numericAmount.toLocaleString()}`,
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const amountInKobo = Math.round(numericAmount * 100);
    const payoutRef = `PO-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // 3. Create or retrieve Paystack Transfer Recipient
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
          message: recipientData?.message || 'Failed to verify Paystack transfer recipient with bank',
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 4. Create pending payout ledger entry
    const { data: payoutEntry, error: insertError } = await supabase
      .from('payouts')
      .insert({
        seller_id,
        amount: amountInKobo,
        amount_naira: numericAmount,
        bank_name: user.bank_name,
        bank_code: user.bank_code,
        account_number: user.account_number,
        account_name: user.account_name || user.displayName,
        recipient_code: recipientCode,
        paystack_reference: payoutRef,
        status: 'pending',
      })
      .select()
      .single();

    if (insertError) {
      console.error('[initiate-seller-payout] Error creating payout record:', insertError);
    }

    // 5. Initiate Transfer via Paystack
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
        reference: payoutRef,
        reason: reason || `ZikShare Earnings Payout for ${user.displayName || 'Seller'}`,
      }),
    });

    const transferResult = await transferRes.json();

    if (!transferResult?.status) {
      // Mark payout entry as failed
      if (payoutEntry?.id) {
        await supabase
          .from('payouts')
          .update({
            status: 'failed',
            failure_reason: transferResult?.message || 'Transfer initiation failed',
            updated_at: new Date().toISOString(),
          })
          .eq('id', payoutEntry.id);
      }

      return new Response(
        JSON.stringify({
          status: false,
          message: transferResult?.message || 'Paystack transfer could not be initiated.',
          details: transferResult,
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update payout entry with transfer code
    if (payoutEntry?.id) {
      await supabase
        .from('payouts')
        .update({
          transfer_code: transferResult.data?.transfer_code,
          status: transferResult.data?.status === 'success' ? 'success' : 'pending',
          updated_at: new Date().toISOString(),
        })
        .eq('id', payoutEntry.id);
    }

    return new Response(
      JSON.stringify({
        status: true,
        message: 'Payout transfer initiated successfully! Funds will reflect in your bank account shortly.',
        data: transferResult.data,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Initiate payout error:', error);
    return new Response(
      JSON.stringify({ status: false, message: error.message || 'Internal server error during payout' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
