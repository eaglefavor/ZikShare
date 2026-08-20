import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { PDFDocument, rgb, degrees, StandardFonts } from 'https://esm.sh/pdf-lib@1.17.9?target=deno';

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
    {
      const expectedSig = await hmacSha512(payload, PAYSTACK_SECRET);
      if (signature !== expectedSig) {
        console.warn('Invalid Paystack signature');
        return new Response('Unauthorized', { status: 401 });
      }
    }

    const event = JSON.parse(payload);
    if (event.event === 'charge.success') {
      const reference = event.data.reference;
      await processAndWatermarkOrder(reference, event.data);
    }

    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response('Error processing webhook', { status: 500 });
  }
});

async function processAndWatermarkOrder(paystackRef: string, txData?: any) {
  const { data: order } = await supabase
    .from('orders')
    .select('*, product:digital_products(*), buyer:users!buyer_id(*)')
    .eq('paystack_reference', paystackRef)
    .single();

  if (!order || order.status === 'delivered') return;

  try {
    const buyerEmail = order.buyer?.email || '';
    const buyerName = (order.buyer?.displayName || buyerEmail.split('@')[0] || 'UNIZIK STUDENT').replace(/[._-]/g, ' ').toUpperCase();
    const regNumber = txData?.metadata?.reg_number || 'UNIZIK-STUDENT';
    const watermarkText = order.watermark_text || `LICENSED TO: ${buyerName} | REG NO: ${regNumber} | ORDER: ${order.id} | UNIZIK SECURE COPY`;
    const password = order.unique_password || generateSecurePassword(16);

    let finalStoragePath = order.product?.original_storage_path;

    // Download original PDF and apply native PDF-LIB watermarking
    if (order.product?.original_storage_path) {
      try {
        const { data: originalFile } = await supabase
          .storage
          .from('digital-originals')
          .download(order.product.original_storage_path);

        if (originalFile) {
          const originalBytes = new Uint8Array(await originalFile.arrayBuffer());
          const pdfDoc = await PDFDocument.load(originalBytes);
          const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
          const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

          const pages = pdfDoc.getPages();
          for (let i = 0; i < pages.length; i++) {
            const page = pages[i];
            const { width, height } = page.getSize();

            // 1. Large prominent diagonal watermark in center
            page.drawText(`UNIZIK LICENSED: ${regNumber}`, {
              x: width * 0.12,
              y: height * 0.45,
              size: Math.min(24, width / 20),
              font: helveticaBold,
              color: rgb(0.85, 0.15, 0.15),
              opacity: 0.20,
              rotate: degrees(40),
            });

            page.drawText(buyerName, {
              x: width * 0.18,
              y: height * 0.38,
              size: Math.min(18, width / 24),
              font: helveticaBold,
              color: rgb(0.85, 0.15, 0.15),
              opacity: 0.20,
              rotate: degrees(40),
            });

            // 2. Top Anti-Piracy Warning Banner
            page.drawRectangle({
              x: 0,
              y: height - 20,
              width: width,
              height: 20,
              color: rgb(0.98, 0.94, 0.94),
              opacity: 0.95,
            });
            page.drawText(`⚠️ LICENSED TO: ${buyerName} (${regNumber}) • PERSONAL ACADEMIC USE ONLY • REDISTRIBUTION PROHIBITED`, {
              x: 12,
              y: height - 14,
              size: 6.5,
              font: helveticaBold,
              color: rgb(0.75, 0.1, 0.1),
            });

            // 3. Bottom Traceable Security Ribbon
            page.drawRectangle({
              x: 0,
              y: 0,
              width: width,
              height: 16,
              color: rgb(0.95, 0.96, 0.98),
              opacity: 0.95,
            });
            page.drawText(`ZIKSHARE DRM SECURE • ORDER #${order.id.slice(0, 8).toUpperCase()} • PAGE ${i + 1} OF ${pages.length}`, {
              x: 12,
              y: 5,
              size: 6,
              font: helvetica,
              color: rgb(0.3, 0.35, 0.4),
            });
          }

          const watermarkedBytes = await pdfDoc.save();
          finalStoragePath = `orders/${order.id}/${order.product_id}_watermarked.pdf`;

          await supabase.storage.from('digital-orders').upload(finalStoragePath, watermarkedBytes, {
            contentType: 'application/pdf',
            upsert: true,
          });
        }
      } catch (pdfErr) {
        console.warn('PDF watermarking warning:', pdfErr);
      }
    }

    const downloadToken = generateSecureToken();

    await supabase.from('orders').update({
      status: 'delivered',
      unique_storage_path: finalStoragePath,
      unique_password: password,
      watermark_text: watermarkText,
      download_token: downloadToken,
      paystack_transaction_id: txData?.id ? String(txData.id) : order.paystack_transaction_id,
      download_expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString()
    }).eq('id', order.id);

  } catch (error) {
    console.error('Order processing error:', error);
  }
}

function generateSecurePassword(length = 16): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%*';
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
