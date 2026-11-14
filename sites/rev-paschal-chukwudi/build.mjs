// Bundles the site into one self-contained dist/index.html.
// Why: some hosts only accept a single HTML file. The Vercel project itself
// serves the source folder as static files, so this build is optional.
//
//   node build.mjs

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://rev-paschal-chukwudi.vercel.app';
const read = (p) => readFile(join(root, p), 'utf8');

let html = await read('index.html');
const css = await read('styles.css');
const js = await read('main.js');

// 1. Inline CSS
html = html.replace('<link rel="stylesheet" href="styles.css" />', `<style>\n${css}\n</style>`);

// 2. Inline JS
html = html.replace('<script src="main.js" defer></script>', `<script>\n${js}\n</script>`);

// 3. Inline every local image referenced by the markup, as a data URI
const images = [...new Set(
  [...html.matchAll(/src="(assets\/[\w-]+\.(?:jpg|png|webp))"/g)].map((m) => m[1])
)];
for (const rel of images) {
  const buf = await readFile(join(root, rel));
  const uri = `data:image/jpeg;base64,${buf.toString('base64')}`;
  html = html.split(rel).join(uri);
}

// 4. Calendar files stay as real files — point the bundle at the live host
html = html.replaceAll('assets/calendar/', `${SITE}/assets/calendar/`);

const leftovers = html.match(/src="assets\/[\w-]+\.(?:jpg|png|webp)"/g);
if (leftovers) console.warn('⚠ unresolved asset references:', leftovers);

await mkdir(join(root, 'dist'), { recursive: true });
await writeFile(join(root, 'dist/index.html'), html, 'utf8');

const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
console.log(`✓ dist/index.html written — ${kb} KB, ${images.length} images inlined`);
