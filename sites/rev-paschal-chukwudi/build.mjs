// Bundles the site into one self-contained dist/index.html.
// Why: the Vercel project is deployed through the API with inline file
// contents, so a single file (no external CSS/JS/image requests) is the
// most reliable thing to ship. Preview locally against the source files.
//
//   node build.mjs

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const read = (p) => readFile(join(root, p), 'utf8');
const readBin = (p) => readFile(join(root, p));

let html = await read('index.html');
const css = await read('styles.css');
const js = await read('main.js');

// 1. Inline CSS
html = html.replace(
  '<link rel="stylesheet" href="styles.css" />',
  `<style>\n${css}\n</style>`
);

// 2. Inline JS
html = html.replace(
  '<script src="main.js" defer></script>',
  `<script>\n${js}\n</script>`
);

// 3. Inline local images as data URIs
const images = ['assets/hero-worship.jpg', 'assets/about-bible.jpg', 'assets/live-stage.jpg'];
for (const rel of images) {
  const buf = await readBin(rel);
  const uri = `data:image/jpeg;base64,${buf.toString('base64')}`;
  html = html.split(rel).join(uri);
}

// 4. Tidy: no leftover references to local files
const leftovers = html.match(/assets\/[\w-]+\.jpg(?!\s*")/g);
if (leftovers) console.warn('⚠ unresolved asset references:', leftovers);

await mkdir(join(root, 'dist'), { recursive: true });
await writeFile(join(root, 'dist/index.html'), html, 'utf8');

const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
console.log(`✓ dist/index.html written — ${kb} KB, fully self-contained`);
