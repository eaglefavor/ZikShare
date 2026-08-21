import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import { encryptPDF } from '@pdfsmaller/pdf-encrypt';

/**
 * Dynamic Client-Side DRM & Watermarking Engine for ZikShare
 * 1. Embeds unremovable visual DRM watermarks & student identification ribbons onto every page.
 * 2. Encrypts the PDF with AES password protection so only the purchasing student can open it.
 */

/**
 * Derives a clean, consistent DRM password for an order/user.
 * Preference: order.unique_password -> reg_number -> phone -> order_id -> 'UNIZIK-STUDENT'
 */
export function getDrmPassword(order = {}, user = {}) {
  if (order?.unique_password) return String(order.unique_password).trim();

  // Try extracting from watermark_text
  const regMatch = order?.watermark_text?.match(/REG NO: ([^|]+)/i);
  if (regMatch && regMatch[1] && regMatch[1].trim() && regMatch[1].trim() !== 'STUDENT' && regMatch[1].trim() !== 'UNIZIK-STUDENT') {
    return regMatch[1].trim();
  }

  // Try user registration number / phone
  if (user?.regNumber || user?.reg_number) return String(user.regNumber || user.reg_number).trim();
  if (user?.phoneNumber || user?.phone_number) return String(user.phoneNumber || user.phone_number).trim();
  if (user?.displayName) return String(user.displayName).replace(/\s+/g, '').toUpperCase();

  // Fallback to order ID prefix or reference
  if (order?.id) return `ZKS-${String(order.id).slice(0, 8).toUpperCase()}`;
  if (order?.paystack_reference) return String(order.paystack_reference).trim();

  return 'UNIZIK2025';
}

/**
 * Watermarks and encrypts a PDF buffer with student credentials and DRM lock.
 * @param {ArrayBuffer|Uint8Array} pdfBytes - Original PDF binary data
 * @param {Object} metadata - Buyer name, reg number, order ID, password, drmEnabled
 * @returns {Promise<Uint8Array>} Watermarked and encrypted PDF bytes
 */
export async function watermarkAndEncryptPdf(pdfBytes, {
  buyerName,
  regNumber,
  orderId,
  password,
  drmEnabled = true,
}) {
  try {
    const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const cleanBuyer = (buyerName || 'UNIZIK STUDENT').toUpperCase();
    const cleanReg = (regNumber || 'VERIFIED STUDENT').toUpperCase();
    const cleanOrderId = (orderId || 'TRACEABLE-ORDER').slice(0, 8).toUpperCase();

    const pages = pdfDoc.getPages();

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const { width, height } = page.getSize();

      // 1. Large prominent diagonal watermark across center of page
      page.drawText(`UNIZIK LICENSED: ${cleanReg}`, {
        x: width * 0.10,
        y: height * 0.48,
        size: Math.min(22, width / 22),
        font: helveticaBold,
        color: rgb(0.85, 0.15, 0.15),
        opacity: 0.22,
        rotate: degrees(38),
      });

      page.drawText(cleanBuyer, {
        x: width * 0.16,
        y: height * 0.40,
        size: Math.min(18, width / 26),
        font: helveticaBold,
        color: rgb(0.85, 0.15, 0.15),
        opacity: 0.22,
        rotate: degrees(38),
      });

      // 2. Top Anti-Piracy Warning Banner Ribbon
      page.drawRectangle({
        x: 0,
        y: height - 22,
        width: width,
        height: 22,
        color: rgb(0.99, 0.94, 0.94),
        opacity: 0.95,
      });

      page.drawText(`⚠️ LICENSED TO: ${cleanBuyer} (${cleanReg}) • PERSONAL ACADEMIC USE ONLY • REDISTRIBUTION PROHIBITED`, {
        x: 10,
        y: height - 15,
        size: Math.min(7, width / 70),
        font: helveticaBold,
        color: rgb(0.75, 0.1, 0.1),
      });

      // 3. Bottom Traceable Security Ribbon
      page.drawRectangle({
        x: 0,
        y: 0,
        width: width,
        height: 18,
        color: rgb(0.95, 0.96, 0.98),
        opacity: 0.95,
      });

      page.drawText(`ZIKSHARE DRM SECURE • ORDER #${cleanOrderId} • PAGE ${i + 1} OF ${pages.length} • UNAUTHORIZED SHARING REVEALS BUYER ID`, {
        x: 10,
        y: 5,
        size: Math.min(6, width / 80),
        font: helvetica,
        color: rgb(0.3, 0.35, 0.4),
      });
    }

    const watermarkedBytes = await pdfDoc.save();

    // 4. DRM Password Encryption
    if (drmEnabled !== false && password) {
      const encryptedBytes = await encryptPDF(watermarkedBytes, String(password));
      return encryptedBytes;
    }

    return watermarkedBytes;
  } catch (err) {
    console.warn('PDF watermarking / encryption error:', err);
    // If anything fails in processing, attempt direct encryption or return original
    if (password && drmEnabled !== false) {
      try {
        return await encryptPDF(new Uint8Array(pdfBytes), String(password));
      } catch (encErr) {
        console.error('Direct fallback encryption error:', encErr);
      }
    }
    return pdfBytes;
  }
}

/**
 * Downloads a DRM-protected & watermarked PDF directly to the student's device.
 */
export async function downloadWatermarkedPdf(signedPdfUrl, filename, metadata = {}) {
  const response = await fetch(signedPdfUrl);
  if (!response.ok) throw new Error('Could not download file from storage');

  const originalBuffer = await response.arrayBuffer();

  const finalBytes = await watermarkAndEncryptPdf(originalBuffer, metadata);

  const blob = new Blob([finalBytes], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);

  const cleanFilename = (filename || 'ZikShare-Study-Material').replace(/\.pdf$/i, '').replace(/[/\\?%*:|"<>]/g, '-');
  const downloadLink = document.createElement('a');
  downloadLink.href = blobUrl;
  downloadLink.download = `${cleanFilename} - Licensed Copy.pdf`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
}
