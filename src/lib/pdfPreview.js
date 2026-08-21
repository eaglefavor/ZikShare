/**
 * PDF Preview & Thumbnail Engine for ZikShare
 * 1. Extracts first-page image thumbnails on upload.
 * 2. Renders interactive first-page sample previews with watermarks before purchase.
 */

let pdfJsPromise = null;

export async function loadPdfJs() {
  if (window.pdfjsLib) return window.pdfjsLib;
  if (pdfJsPromise) return pdfJsPromise;

  pdfJsPromise = new Promise((resolve, reject) => {
    if (window.pdfjsLib) {
      resolve(window.pdfjsLib);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.crossOrigin = 'anonymous';

    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        resolve(window.pdfjsLib);
      } else {
        reject(new Error('PDF.js failed to initialize'));
      }
    };

    script.onerror = () => {
      // Fallback to unpkg
      const fallback = document.createElement('script');
      fallback.src = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.min.js';
      fallback.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
        resolve(window.pdfjsLib);
      };
      fallback.onerror = () => reject(new Error('Failed to load PDF.js library'));
      document.head.appendChild(fallback);
    };

    document.head.appendChild(script);
  });

  return pdfJsPromise;
}

/**
 * Extracts page 1 from a PDF File/ArrayBuffer as a JPEG Blob for automatic cover thumbnails.
 * @param {File|ArrayBuffer|Uint8Array} source 
 * @returns {Promise<{ blob: Blob, dataUrl: string, pageCount: number }>}
 */
export async function extractFirstPageThumbnail(source) {
  const pdfjs = await loadPdfJs();

  let arrayBuffer;
  if (source instanceof File || source instanceof Blob) {
    arrayBuffer = await source.arrayBuffer();
  } else if (source instanceof ArrayBuffer) {
    arrayBuffer = source;
  } else if (source?.buffer) {
    arrayBuffer = source.buffer;
  } else {
    throw new Error('Invalid PDF source');
  }

  const loadingTask = pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) });
  const pdfDoc = await loadingTask.promise;
  const pageCount = pdfDoc.numPages;

  const page = await pdfDoc.getPage(1);
  const viewport = page.getViewport({ scale: 1.5 }); // Higher quality thumbnail

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({
    canvasContext: context,
    viewport: viewport,
  }).promise;

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      resolve({ blob, dataUrl, pageCount });
    }, 'image/jpeg', 0.85);
  });
}

/**
 * Renders page 1 of a PDF into a target HTML canvas with a sample watermark overlay.
 * @param {string|ArrayBuffer} pdfSource - Signed URL or PDF bytes
 * @param {HTMLCanvasElement} canvasElement - Target canvas
 * @param {Object} options - Scale, watermark text
 */
export async function renderPdfSampleCanvas(pdfSource, canvasElement, options = {}) {
  if (!canvasElement) return null;

  const pdfjs = await loadPdfJs();
  const scale = options.scale || 1.2;
  const watermarkText = options.watermarkText || 'SAMPLE PREVIEW • ZIKSHARE';

  let loadingTask;
  if (typeof pdfSource === 'string') {
    loadingTask = pdfjs.getDocument({ url: pdfSource, withCredentials: false });
  } else {
    loadingTask = pdfjs.getDocument({ data: new Uint8Array(pdfSource) });
  }

  const pdfDoc = await loadingTask.promise;
  const page = await pdfDoc.getPage(1);
  const viewport = page.getViewport({ scale });

  const context = canvasElement.getContext('2d');
  canvasElement.width = viewport.width;
  canvasElement.height = viewport.height;

  // Render PDF page content
  await page.render({
    canvasContext: context,
    viewport: viewport,
  }).promise;

  // Draw prominent diagonal "SAMPLE PREVIEW" watermark across the canvas
  context.save();
  context.translate(viewport.width / 2, viewport.height / 2);
  context.rotate(-Math.PI / 4);
  context.font = 'bold 28px sans-serif';
  context.fillStyle = 'rgba(220, 38, 38, 0.22)';
  context.textAlign = 'center';
  context.fillText(watermarkText, 0, 0);
  context.fillText('UNIZIK STUDY MATERIAL • PAGE 1 ONLY', 0, 40);
  context.restore();

  return {
    numPages: pdfDoc.numPages,
    width: viewport.width,
    height: viewport.height,
  };
}
