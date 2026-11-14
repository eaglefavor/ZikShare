# Rev. Paschal Chukwudi — ministry site

A complete redesign of the ministry site that lives at
**https://rev-paschal-chukwudi.vercel.app** (Vercel project
`rev-paschal-chukwudi`, team *Esther's projects*).

Art direction: **cream canvas, ink black, one burning orange accent.**
Big Fraunces serif display type, Instrument Serif italics for emphasis,
hairline rules, generous white space, and slow, deliberate motion:
a counting preloader, masked line-reveals, scroll-triggered fades,
magnetic buttons, a custom cursor, marquees, an accordion and a video
lightbox. Everything respects `prefers-reduced-motion`.

---

## Files

```
index.html      markup + copy (all content lives here)
styles.css      the whole design system
main.js         interactions (progressive: the page reads fine without it)
assets/         3 atmospheric photographs + og-cover.jpg (social share card)
build.mjs       bundles everything into one dist/index.html (optional)
```

## Preview locally

```bash
cd sites/rev-paschal-chukwudi
python3 -m http.server 8000      # http://localhost:8000
```

No install step, no build step, no framework.

## Deploying

The Vercel project is configured with **root directory
`sites/rev-paschal-chukwudi`**, linked to this repository. A push to the
production branch rebuilds the site; the files here are served as static
assets, so `index.html`, `styles.css`, `main.js` and `assets/` work as-is.

`node build.mjs` additionally produces a **single self-contained file**
(`dist/index.html`, ~480 KB with images inlined) for anywhere that only
accepts one HTML file.

---

## Content — what to check before it goes public

All of the original site's copy was preserved: the bio, mission, belief,
the pull quote, the three ministry offerings, all **11 worship videos**,
the **live broadcast**, both **audio downloads**, email, address and
Facebook link. New sections added around them:

| Section | Status |
| --- | --- |
| Hero, About, Ministry, Sounds, Live, Connect | Real content, carried over |
| **Resources** (audio, devotionals, prayer sounds, leader guides) | Written as an offer; each link opens an email request until you have real downloads |
| **Gatherings** | *Placeholders.* Dates, venues and times say “TBC” on purpose — replace them with the real calendar |
| **The Word** | Three scripture cards (John 4:23, Psalm 96:9, Psalm 34:1) |
| **Moments** | Real video stills from the ministry's own YouTube videos |

### Placeholders to replace (search for these)

1. **`Gatherings`** — the three `<article class="event">` blocks
   (`#gatherings`): titles, “First Friday”, “Quarterly”, venues and times.
2. **Hero stat “11”** — `data-count="11"`, the number of published sessions.
3. **Footer year** — filled in automatically.
4. **Photographs** — `assets/hero-worship.jpg`, `assets/about-bible.jpg`,
   `assets/live-stage.jpg` are **AI-generated atmospheric imagery, not
   photographs of Rev. Paschal**. Replace them with real ministry photos
   (same filenames, or update the `<img>` paths) before launch.
5. **Video lightbox** — plays through `youtube-nocookie.com`; all 11 IDs come
   from the ministry's existing YouTube uploads.

### Forms

There is no backend. The **Invite** form and every “request” link compose a
pre-filled email to `rcnanambra@gmail.com` in the visitor's mail app. To
collect submissions instead, point the form at a service (Formspree, Google
Forms, Airtable) and handle it in `main.js` → “Invitation form”.

### Deployment protection

The project has Vercel **Deployment Protection** on
(`all_except_custom_domains`), which is why the
`…-esthers-projects-11e17980.vercel.app` URL asks visitors to log into
Vercel. To make previews public: Vercel → Project → Settings →
**Deployment Protection** → turn off Vercel Authentication (or attach a
custom domain, which bypasses it).

### Source location

The site lives inside the `ZikShare` repository because that is the repo this
session works in. It is entirely self-contained in this folder — if you'd
rather give the ministry its own repository, copy `sites/rev-paschal-chukwudi`
out and point the Vercel project at it; nothing here depends on ZikShare.
