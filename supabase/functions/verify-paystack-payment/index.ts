import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { PDFDocument, rgb, degrees, StandardFonts } from 'https://esm.sh/pdf-lib@1.17.9?target=deno';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://jiateaqbyaalwrkbtvjf.supabase.co';
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const PAYSTACK_SECRET = Deno.env.get('PAYSTACK_SECRET_KEY') || '';

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

    // 2. Fulfill and watermark order in Supabase
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

        // Watermark original PDF with PDF-lib
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

                // Diagonal Watermark
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

                // Top Ribbon
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

                // Bottom Ribbon
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
          } catch (watermarkErr) {
            console.warn('PDF watermarking warning:', watermarkErr);
          }
        }

        const updates = {
          status: 'delivered',
          paystack_transaction_id: String(txData.id),
          unique_password: password,
          unique_storage_path: finalStoragePath,
          watermark_text: watermarkText,
          download_expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
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
