import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const PAYSTACK_SECRET = Deno.env.get('PAYSTACK_SECRET_KEY') || '';
if (!PAYSTACK_SECRET) console.error('[create-paystack-subaccount] Missing PAYSTACK_SECRET_KEY env');

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
    const { user_id, business_name, settlement_bank, account_number, description } = await req.json();

    if (!settlement_bank || !account_number) {
      return new Response(
        JSON.stringify({ status: false, message: 'settlement_bank and account_number are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const payload = {
      business_name: business_name || 'UNIZIK Student Merchant',
      settlement_bank: String(settlement_bank).trim(),
      account_number: String(account_number).trim(),
      percentage_charge: 0,
      description: description || 'ZikShare Marketplace Seller Subaccount',
    };

    // 1. Call Paystack subaccount endpoint
    const response = await fetch('https://api.paystack.co/subaccount', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    let subaccountCode = result?.data?.subaccount_code;

    // If subaccount already exists, fetch existing subaccounts
    if (!subaccountCode && result?.message?.includes('already exists')) {
      const listRes = await fetch(
        `https://api.paystack.co/subaccount?account_number=${encodeURIComponent(payload.account_number)}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const listData = await listRes.json();
      if (listData?.status && Array.isArray(listData?.data) && listData.data.length > 0) {
        subaccountCode = listData.data[0].subaccount_code;
      }
    }

    // 2. Save subaccount_code to user profile in Supabase if user_id provided
    if (subaccountCode && user_id && SUPABASE_SERVICE_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
      await supabase
        .from('users')
        .update({
          paystack_subaccount_code: subaccountCode,
          updated_at: new Date().toISOString(),
        })
        .eq('uid', user_id);
    }

    return new Response(
      JSON.stringify({
        status: true,
        message: result?.message || 'Subaccount provisioned successfully',
        subaccount_code: subaccountCode,
        data: result?.data || { subaccount_code: subaccountCode },
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Create subaccount error:', error);
    return new Response(
      JSON.stringify({ status: false, message: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
