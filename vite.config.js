import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { mergeLibraryMaterials } from './src/lib/fresherLibrary.js'
import { documentPath, shelfPath } from './src/lib/libraryRoutes.js'
import { SHELF_INFO } from './src/lib/shelfGuide.js'
import { FILE_REQUEST_PATTERN } from './src/lib/offlineFiles.js'

const SITE_URL = 'https://zik-share.vercel.app'

/**
 * Every page of the library, written to dist/sitemap.xml at build time.
 *
 * The document list is read from the same modules the app renders, so the
 * sitemap cannot list a page that does not exist — and a new shelf appears in
 * it the moment its PDFs are committed. There was no sitemap and no robots.txt
 * before this, which meant search engines saw exactly one URL for the whole
 * library.
 */
function librarySitemap() {
    return {
        name: 'zikshare-library-sitemap',
        apply: 'build',
        closeBundle() {
            const today = new Date().toISOString().slice(0, 10)
            const entries = [
                { loc: '/', priority: '1.0' },
                { loc: '/library', priority: '0.9' },
                ...Object.keys(SHELF_INFO).map((name) => ({ loc: shelfPath(name), priority: '0.8' })),
                ...mergeLibraryMaterials([]).map((item) => ({
                    // Books are listed at their own page, which is canonical.
                    loc: item.isBook ? `/library/books/${item.slug}` : documentPath(item),
                    priority: '0.6',
                })),
                { loc: '/search', priority: '0.5' },
                { loc: '/profile/help', priority: '0.4' },
            ]

            const seen = new Set()
            const urls = entries
                .filter((entry) => {
                    if (seen.has(entry.loc)) return false
                    seen.add(entry.loc)
                    return true
                })
                .map(
                    (entry) =>
                        `  <url>
    <loc>${SITE_URL}${entry.loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${entry.priority}</priority>
  </url>`
                )
                .join('\n')

            const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
            const out = path.resolve(process.cwd(), 'dist', 'sitemap.xml')
            fs.mkdirSync(path.dirname(out), { recursive: true })
            fs.writeFileSync(out, xml)
            console.log(`sitemap     ${entries.length} addresses`)
        },
    }
}

export default defineConfig({
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          supabase: ['@supabase/supabase-js'],
          ui: ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  plugins: [
    librarySitemap(),
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      // Social preview images are fetched by WhatsApp and Twitter scrapers, not
      // by the app: they are 430 kB of the install and belong on demand.
      includeAssets: ['favicon.svg', 'icons/*.svg'],
      manifest: {
        name: 'ZikShare - Campus Marketplace',
        short_name: 'ZikShare',
        description: 'Buy & sell within the UNIZIK campus community',
        theme_color: '#3B82F6',
        background_color: '#F8FAFC',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192x192.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: '/icons/icon-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          },
          {
            src: '/icons/icon-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        // Install downloads exactly this: the shell a reader needs to open the
        // app. It used to precache every route, the admin page, the PDF
        // watermaker and a mobile debug console — 2.3 MB before anything
        // appeared on a campus connection. Route chunks are now kept the first
        // time they are actually used (see the /assets/ rule below), so the
        // app still works offline for what a reader has opened.
        globPatterns: [
          'index.html',
          'manifest.webmanifest',
          'favicon.svg',
          'icons/*.svg',
          'assets/index-*.js',
          'assets/index-*.css',
          'assets/vendor-*.js',
          'assets/ui-*.js',
          'assets/supabase-*.js',
        ],
        globIgnores: ['**/eruda-*.js', '**/pdfWatermark-*.js', '**/AdminPage-*.js'],
        // A download is a navigation too. Without this the worker answers
        // "Download the PDF" with index.html, and the reader saves an app shell
        // called index.html instead of a book. Every path that ends in a file
        // extension is left to the network; only real app routes fall back.
        navigateFallbackDenylist: [/^\/api\//, FILE_REQUEST_PATTERN],
        runtimeCaching: [
          {
            // Every hashed build asset a reader has actually opened stays on
            // the device. The file name changes when the file changes, so a
            // cached copy is never out of date.
            urlPattern: /\/assets\/[^/]+\.(?:js|css)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'app-chunks-v1',
              expiration: {
                maxEntries: 80,
                maxAgeSeconds: 60 * 60 * 24 * 180,
                purgeOnQuotaError: true,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Supabase API calls — network first, fallback to cache
            urlPattern: /^https:\/\/.*\.supabase\.co\/rest\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-api',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
              networkTimeoutSeconds: 5
            }
          },
          {
            // Cloudinary images — cache first (immutable URLs)
            urlPattern: /^https:\/\/res\.cloudinary\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cloudinary-images',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // Library PDFs, served from this origin. The old rule pointed at a
            // /library/previews/ folder that no longer exists, so nothing in the
            // library was ever cached; a reader who opened a play once can now
            // reopen it with no data at all.
            urlPattern: /\/library\/[a-z]+\/[a-z0-9-]+\.pdf$/i,
            handler: 'CacheFirst',
            options: {
              // v2: the old cache name may hold index.html saved against PDF
              // addresses by the bug above. Those entries are never read again.
              cacheName: 'library-pdfs-v2',
              rangeRequests: true,
              expiration: {
                maxEntries: 40,
                maxAgeSeconds: 60 * 60 * 24 * 90, // 90 days
                purgeOnQuotaError: true
              },
              cacheableResponse: {
                statuses: [0, 200],
                // Only a real PDF is ever cached. If a server ever answers a
                // .pdf address with a page, that page is not stored.
                headers: { 'content-type': 'application/pdf' }
              }
            }
          },
          {
            // The typeface is served from this site now, so it can be kept
            // like any other asset. (The two Google Fonts rules that used to
            // live here are gone: nothing is fetched from Google any more.)
            urlPattern: /\.(?:woff2?|ttf)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts-v1',
              expiration: {
                maxEntries: 12,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      }
    }),
  ]
})
