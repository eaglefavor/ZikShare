import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const PAYSTACK_SECRET = Deno.env.get('PAYSTACK_SECRET_KEY') || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const signature = req.headers.get('x-paystack-signature');
    const payload = await req.text();

    if (!PAYSTACK_SECRET) {
      console.error('[paystack-webhook] Missing PAYSTACK_SECRET_KEY — rejecting webhook');
      return new Response('Server misconfigured: missing PAYSTACK_SECRET_KEY', { status: 500 });
    }

    const expectedSig = await hmacSha512(payload, PAYSTACK_SECRET);
    if (signature !== expectedSig) {
      console.warn('Invalid Paystack webhook signature');
      return new Response('Unauthorized', { status: 401 });
    }

    const event = JSON.parse(payload);
    const eventType = event?.event;
    const eventData = event?.data;

    // Handle Charge Success
    if (eventType === 'charge.success') {
      const reference = eventData?.reference;
      if (reference) {
        await fulfillWebhookOrder(reference, eventData);
      }
    }

    // Handle Transfer (Seller Payout) Success / Failed
    if (eventType === 'transfer.success' || eventType === 'transfer.failed' || eventType === 'transfer.reversed') {
      const transferCode = eventData?.transfer_code;
      const transferRef = eventData?.reference;
      const status = eventType === 'transfer.success' ? 'success' : 'failed';
      const failureReason = eventData?.reason || (eventType === 'transfer.failed' ? 'Transfer failed at bank' : null);

      if (transferCode || transferRef) {
        const query = supabase.from('payouts').update({
          status,
          failure_reason: failureReason,
          updated_at: new Date().toISOString(),
        });

        if (transferCode) {
          query.eq('transfer_code', transferCode);
        } else {
          query.eq('paystack_reference', transferRef);
        }

        await query;
      }
    }

    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response('Error processing webhook', { status: 500 });
  }
});

async function fulfillWebhookOrder(paystackRef: string, txData: any) {
  const { data: order } = await supabase
    .from('orders')
    .select('*, product:digital_products(*), buyer:users!buyer_id(*)')
    .eq('paystack_reference', paystackRef)
    .maybeSingle();

  if (!order) {
    console.warn(`[paystack-webhook] Order not found for reference: ${paystackRef}`);
    return;
  }

  // If already delivered, just ensure paystack_transaction_id is attached
  if (order.status === 'delivered') {
    if (!order.paystack_transaction_id && txData?.id) {
      await supabase.from('orders').update({
        paystack_transaction_id: String(txData.id),
        updated_at: new Date().toISOString(),
      }).eq('id', order.id);
    }
    return;
  }

  // Amount integrity check
  const txAmount = Number(txData?.amount);
  if (order.amount && txAmount && Math.abs(txAmount - Number(order.amount)) > 1) {
    console.error(`[paystack-webhook] Amount mismatch for ${paystackRef}: tx ${txAmount} vs order ${order.amount}`);
    await supabase.from('orders').update({
      status: 'amount_mismatch',
      paystack_transaction_id: String(txData.id),
      updated_at: new Date().toISOString(),
    }).eq('id', order.id);
    return;
  }

  const storagePath = order.unique_storage_path || order.product?.original_storage_path;
  const buyerEmail = order.buyer?.email || txData?.customer?.email || '';
  const buyerName = (order.buyer?.displayName || txData.metadata?.buyer_name || buyerEmail.split('@')[0] || 'UNIZIK STUDENT').replace(/[._-]/g, ' ').toUpperCase();
  const regNumber = txData?.metadata?.reg_number || order.watermark_text?.match(/REG NO: ([^|]+)/i)?.[1]?.trim() || 'UNIZIK-STUDENT';
  const watermarkText = order.watermark_text || `LICENSED TO: ${buyerName} | REG NO: ${regNumber} | ORDER: ${order.id} | UNIZIK SECURE COPY`;

  await supabase.from('orders').update({
    status: 'delivered',
    paystack_transaction_id: String(txData.id),
    unique_storage_path: storagePath,
    watermark_text: watermarkText,
    download_expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  }).eq('id', order.id);
}

async function hmacSha512(message: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-512' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
