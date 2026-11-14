// Bundles every page of the ministry site into self-contained HTML files
// under dist/ (CSS + local images + JS inlined, page by page).
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
const PAGES = ['index.html', 'watch.html', '404.html'];

const css = await read('styles.css');
const scripts = {
  'main.js': await read('main.js'),
  'watch.js': await read('watch.js'),
};

await mkdir(join(root, 'dist'), { recursive: true });
let total = 0;

for (const page of PAGES) {
  let html = await read(page);

  // 1. Inline CSS
  html = html.replace(
    /<link rel="stylesheet" href="\/?styles\.css" \/>/,
    `<style>\n${css}\n</style>`
  );

  // 2. Inline JS (any number of local scripts)
  for (const [file, code] of Object.entries(scripts)) {
    const re = new RegExp(`<script src="/?${file.replace('.', '\\.')}" defer><\\/script>`);
    html = html.replace(re, `<script>\n${code}\n</script>`);
  }

  // 3. Inline every local image referenced by the markup, as a data URI
  const images = [...new Set(
    [...html.matchAll(/src="(?:\.\/)?(assets\/[\w-]+\.(?:jpg|png|webp))"/g)].map((m) => m[1])
  )];
  for (const rel of images) {
    const buf = await readFile(join(root, rel));
    const ext = rel.split('.').pop();
    const mime = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
    html = html.split(rel).join(`data:${mime};base64,${buf.toString('base64')}`);
  }

  // 4. Calendar files stay as real files — point the bundle at the live host
  html = html.replaceAll('assets/calendar/', `${SITE}/assets/calendar/`);

  const leftovers = html.match(/src="[^"]*assets\/[\w-]+\.(?:jpg|png|webp)"/g);
  if (leftovers) console.warn(`⚠ ${page}: unresolved asset references:`, leftovers);

  const out = page === '404.html' ? '404.html' : page.replace(/\.html$/, '.html');
  await writeFile(join(root, 'dist', out), html, 'utf8');
  const kb = Buffer.byteLength(html) / 1024;
  total += kb;
  console.log(`✓ dist/${out} — ${kb.toFixed(0)} KB, ${images.length} images inlined`);
}

for (const meta of ['robots.txt', 'sitemap.xml']) {
  await copyFile(join(root, meta), join(root, 'dist', meta));
}
console.log(`✓ ${PAGES.length} pages, ${total.toFixed(0)} KB total · robots.txt + sitemap.xml copied`);
