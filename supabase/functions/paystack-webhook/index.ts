import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const PAYSTACK_SECRET = Deno.env.get('PAYSTACK_SECRET_KEY')!;
const PDF_SERVICE_URL = Deno.env.get('PDF_SERVICE_URL')!; // URL to python pdf service

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const signature = req.headers.get('x-paystack-signature');
  const payload = await req.text();

  const expectedSig = await hmacSha512(payload, PAYSTACK_SECRET);
  if (signature !== expectedSig) {
    return new Response('Unauthorized', { status: 401 });
  }

  const event = JSON.parse(payload);

  if (event.event === 'charge.success') {
    const reference = event.data.reference;
    await processOrder(reference);
  }

  return new Response('OK', { status: 200 });
});

async function processOrder(paystackRef: string) {
  const { data: order } = await supabase
    .from('orders')
    .select('*, product:digital_products(*), buyer:users!buyer_id(*)')
    .eq('paystack_reference', paystackRef)
    .single();

  if (!order || order.status !== 'pending') return;

  try {
    const { data: originalFile } = await supabase
      .storage
      .from('digital-originals')
      .download(order.product.original_storage_path);

    const originalBuffer = await originalFile!.arrayBuffer();
    const buyerEmail = order.buyer?.email || '';
    const buyerName = order.buyer?.displayName || (buyerEmail.split('@')[0] || 'UNIZIK STUDENT').replace(/[._-]/g, ' ').toUpperCase();
    const watermarkText = order.watermark_text || `LICENSED TO: ${buyerName} | ORDER: ${order.id} | PURCHASED: ${new Date().toLocaleDateString('en-NG')} | UNIZIK TRACEABLE COPY`;
    const password = generateSecurePassword();

    const formData = new FormData();
    formData.append('pdf', new Blob([originalBuffer], { type: 'application/pdf' }));
    formData.append('password', password);
    formData.append('watermark', watermarkText);

    // Call python service
    const response = await fetch(PDF_SERVICE_URL, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) throw new Error('PDF processing failed');
    const encryptedBuffer = await response.arrayBuffer();

    const encryptedPath = `orders/${order.id}/${order.product_id}_encrypted.pdf`;
    await supabase.storage.from('digital-orders').upload(encryptedPath, encryptedBuffer, {
      contentType: 'application/pdf'
    });

    const downloadToken = generateSecureToken();
    const hashBuffer = await crypto.subtle.digest('SHA-256', encryptedBuffer);
    const fileHash = Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0')).join('');

    await supabase.from('orders').update({
      status: 'delivered',
      unique_storage_path: encryptedPath,
      unique_password: password,
      watermark_text: watermarkText,
      file_hash: fileHash,
      download_token: downloadToken,
      download_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString()
    }).eq('id', order.id);

  } catch (error) {
    console.error('Order processing failed:', error);
    await supabase.from('orders').update({
      status: 'processing_failed', error_message: String(error)
    }).eq('id', order.id);
  }
}

function generateSecurePassword(length = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  for (let i = 0; i < length; i++) {
    password += chars[randomValues[i] % chars.length];
  }
  return password;
}

function generateSecureToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes)).replace(/[+/=]/g, '');
}

async function hmacSha512(message: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-512' },
    false, ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0')).join('');
}
