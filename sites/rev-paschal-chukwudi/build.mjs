// Bundles every page of the ministry site into self-contained HTML files
// under dist/ (CSS, JS and local images inlined, page by page).
// The Vercel project serves the source folder directly, so this build is
// optional — it exists for hosts that only accept single files.
//
//   node build.mjs

import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://rev-paschal-chukwudi.vercel.app';
const read = (p) => readFile(join(root, p), 'utf8');
const PAGES = ['index.html', 'watch.html', 'books.html', '404.html'];

const css = await read('styles.css');
const scripts = {
  'main.js': await read('main.js'),
  'watch.js': await read('watch.js'),
  'books.js': await read('books.js'),
};

/* ── Collect every local image, from the markup AND from the scripts ── */
const ASSET = /assets\/[\w/-]+\.(?:jpg|jpeg|png|webp)/g;

const pages = {};
for (const page of PAGES) pages[page] = await read(page);

const refs = new Set();
for (const source of [...Object.values(pages), ...Object.values(scripts)]) {
  for (const m of source.matchAll(ASSET)) refs.add(m[0]);
}

const dataUri = {};
for (const rel of refs) {
  let buf;
  try {
    buf = await readFile(join(root, rel));
  } catch {
    // Documented example paths in comments (e.g. assets/books/slug.jpg) are not
    // real files — skip them silently.
    continue;
  }
  const ext = rel.split('.').pop();
  const mime = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
  dataUri[rel] = `data:${mime};base64,${buf.toString('base64')}`;
}

// Only swap paths that begin a quoted attribute / string — never the tail of an
// absolute URL such as the og:image meta tags.
const inlineAssets = (source) =>
  Object.entries(dataUri).reduce((acc, [rel, uri]) => {
    const escaped = rel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return acc.replace(new RegExp(`(?<=["'(])${escaped}`, 'g'), uri);
  }, source);

/* Scripts are inlined first, so their cover paths become data URIs too. */
const inlinedScripts = {};
for (const [file, code] of Object.entries(scripts)) inlinedScripts[file] = inlineAssets(code);

await mkdir(join(root, 'dist'), { recursive: true });
let total = 0;

for (const page of PAGES) {
  let html = pages[page];

  // 1. Inline CSS
  html = html.replace(
    /<link rel="stylesheet" href="\/?styles\.css" \/>/,
    `<style>\n${css}\n</style>`
  );

  // 2. Inline JS (any number of local scripts)
  for (const [file, code] of Object.entries(inlinedScripts)) {
    const re = new RegExp(`<script src="/?${file.replace('.', '\\.')}" defer><\\/script>`);
    html = html.replace(re, `<script>\n${code}\n</script>`);
  }

  // 3. Inline every remaining local image reference as a data URI
  const before = refs.size;
  html = inlineAssets(html);

  // 4. Calendar files stay as real files — point the bundle at the live host
  html = html.replace(/(["'(])assets\/calendar\//g, `$1${SITE}/assets/calendar/`);

  // Flag only relative references (absolute URLs such as og:image are fine).
  const leftovers = [...html.matchAll(/["'(](assets\/[\w/-]+\.(?:jpg|jpeg|png|webp))/g)]
    .map((m) => m[1])
    .filter((r) => dataUri[r]);

  await writeFile(join(root, 'dist', page), html, 'utf8');
  const kb = Buffer.byteLength(html) / 1024;
  total += kb;
  const count = [...html.matchAll(/data:image\//g)].length;
  console.log(`✓ dist/${page} — ${kb.toFixed(0)} KB, ${count} image${count === 1 ? '' : 's'} embedded (of ${before} sources)`);
}

for (const meta of ['robots.txt', 'sitemap.xml']) {
  await copyFile(join(root, meta), join(root, 'dist', meta));
}
console.log(`✓ ${PAGES.length} pages, ${total.toFixed(0)} KB total · robots.txt + sitemap.xml copied`);
