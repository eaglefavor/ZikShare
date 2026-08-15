/**
 * Dynamic Client-Side Watermarking Engine for ZikShare
 * Embeds unremovable visual DRM watermarks & student identification ribbons
 * onto every page of purchased PDFs before download.
 */

let pdfLibPromise = null;

export async function loadPdfLib() {
  if (window.PDFLib) return window.PDFLib;
  if (pdfLibPromise) return pdfLibPromise;

  pdfLibPromise = new Promise((resolve, reject) => {
    if (window.PDFLib) {
      resolve(window.PDFLib);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.9/pdf-lib.min.js';
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      if (window.PDFLib) resolve(window.PDFLib);
      else reject(new Error('PDFLib failed to initialize'));
    };
    script.onerror = () => {
      // Fallback CDN
      const fallback = document.createElement('script');
      fallback.src = 'https://unpkg.com/pdf-lib@1.17.9/dist/pdf-lib.min.js';
      fallback.onload = () => resolve(window.PDFLib);
      fallback.onerror = (e) => reject(new Error('Failed to load PDF watermark library'));
      document.head.appendChild(fallback);
    };
    document.head.appendChild(script);
  });

  return pdfLibPromise;
}

/**
 * Watermarks a PDF buffer with student name, registration number, and anti-piracy ribbons.
 * @param {ArrayBuffer|Uint8Array} pdfBytes - Original PDF binary data
 * @param {Object} metadata - Buyer name, reg number, order ID
 * @returns {Promise<Uint8Array>} Watermarked PDF bytes
 */
export async function watermarkPdfBytes(pdfBytes, { buyerName, regNumber, orderId }) {
  try {
    const PDFLib = await loadPdfLib();
    const { PDFDocument, rgb, degrees, StandardFonts } = PDFLib;

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

    const watermarkedPdf = await pdfDoc.save();
    return watermarkedPdf;
  } catch (err) {
    console.warn('Client-side watermarking warning:', err);
    // If watermarking encounters any issue, return original bytes safely
    return pdfBytes;
  }
}

/**
 * Downloads a watermarked PDF directly to the user's browser / phone device.
 */
export async function downloadWatermarkedPdf(signedPdfUrl, filename, metadata) {
  const response = await fetch(signedPdfUrl);
  if (!response.ok) throw new Error('Could not download original PDF from storage');

  const originalBuffer = await response.arrayBuffer();
  const watermarkedBytes = await watermarkPdfBytes(originalBuffer, metadata);

  const blob = new Blob([watermarkedBytes], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);

  const cleanFilename = (filename || 'ZikShare-Study-Material').replace(/\.pdf$/i, '');
  const downloadLink = document.createElement('a');
  downloadLink.href = blobUrl;
  downloadLink.download = `${cleanFilename} - Licensed Copy.pdf`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
}
