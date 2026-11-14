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
assets/         real ministry photographs + og-cover.jpg (social share card)
assets/calendar/ three .ics files for the weekly gatherings
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

## Content

Everything from the original site was preserved: the bio, mission, belief, the
pull quote, the three ministry offerings, all **11 worship videos**, the **live
broadcast**, both **audio downloads**, email, address and Facebook link.
Around them:

| Section | Source |
| --- | --- |
| Hero, About, Ministry, Sounds, Live, Connect | Real content, carried over |
| **Gatherings** | The real weekly rhythm (see below) |
| **Resources** | Written as an offer; each link opens an email request until you have real files |
| **The Word** | Three scripture cards (John 4:23, Psalm 96:9, Psalm 34:1) |
| **Moments** | Real ministry photographs + video stills |

### Gatherings — every week

| Day | Time | Gathering | Calendar file |
| --- | --- | --- | --- |
| Wednesday | 5:00 PM | Mentality Shift | `assets/calendar/mentality-shift.ics` |
| Friday | 9:00 PM | Quivers Night of Prayer | `assets/calendar/quivers-night-of-prayer.ics` |
| Sunday | 3:00 PM | Build Up Service | `assets/calendar/build-up-service.ics` |

Venue: **456 Zik Avenue, Agu-Awka, by Ring Road Roundabout**.
Each `.ics` file repeats weekly (Nigeria time, UTC+1) and assumes a **two-hour
meeting** — adjust `DTEND` if a gathering runs shorter or longer. Each card's
"Add to calendar" link downloads its file, so a visitor's phone offers to save
the weekly rhythm.

### Channels & social

Pulled from the ministry's own YouTube bios and wired through the site
(Connect grid, Live section, Resources, footer and JSON-LD `sameAs`):

| Platform | Handle / address |
| --- | --- |
| YouTube — his channel | [@ApostlePaschalChukwudi](https://www.youtube.com/@ApostlePaschalChukwudi) |
| YouTube — ministry | [@rcnanambra](https://www.youtube.com/@rcnanambra) |
| Instagram | [@revpaschalchukwudi](https://www.instagram.com/revpaschalchukwudi) |
| TikTok | [@revpaschalchukwudi](https://www.tiktok.com/@revpaschalchukwudi) |
| WhatsApp channel | [Join](https://whatsapp.com/channel/0029VajhZyA8PgsDYm6mEE1r) |
| Telegram | [@RevPaschalChukwdi](https://t.me/RevPaschalChukwdi) |
| Facebook | [Profile](https://www.facebook.com/profile.php?id=100070264503680) |
| Email | rcnanambra@gmail.com |

The Live section's "Watch live on YouTube" opens the ministry channel's live
tab; "Live alerts on WhatsApp" opens the WhatsApp channel. The featured sound
is *Mai Rahāma* from his channel, and *Mentality Shift* links to a recorded
class.

**Not published on purpose:** his channel bio includes bank details for
sowing into the ministry. Those are deliberately left off the site — ask
before adding a giving section, since public account numbers attract fraud.

### Photographs

`assets/hero-portrait.jpg`, `assets/about-teaching.jpg`,
`assets/live-ministry.jpg` and `assets/portrait-avatar.jpg` are the four
ministry photographs supplied. They are small originals (≈400–600 px wide) and
have been upscaled for the page; if you have the full-resolution files, drop
them in with the same filenames and the layout sharpens automatically.
`assets/og-cover.jpg` is the 1200×630 social card, built from the portrait.

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

## Pages

| File | URL | What it is |
|---|---|---|
| `index.html` | `/` | One-page home: hero, ministry, sounds grid, live band, latest teaching strip, resources, gatherings + countdown, the Word, moments, invite form, giving, FAQ, connect tiles, subscribe band |
| `watch.html` | `/watch` | The archive — 17 talks in four filterable categories (sermons, classes, worship, prayer), each opening in the on-page lightbox with a YouTube fallback |
| `404.html` | any 404 | Served automatically by Vercel; links back to the house and the archive |
| `robots.txt` | `/robots.txt` | Allows everything, points at the sitemap |
| `sitemap.xml` | `/sitemap.xml` | Both public URLs, `lastmod` refreshed by `build.mjs`'s release date |

`build.mjs` builds **every** page (CSS, `main.js`, `watch.js` and local images
inlined, page by page) and copies `robots.txt` + `sitemap.xml` into `dist/`.
The Vercel project ignores `dist/` — it serves the source folder as static
files, so those pages deploy straight from the repository.

## Giving — both accounts published

The **Sow** section prints two accounts, labelled so a visitor knows which is
which (confirmed by the ministry on 14 Nov 2026):

| Panel | Bank | Account name | Number | Purpose |
|---|---|---|---|---|
| The house | Access Bank Plc | Remnant Christian Network Anambra | `0826965262` | Tithes, offerings, building the house |
| His personal ministry | Guaranty Trust Bank | Ozoigboanugo Paschal | `0128969044` | Support for the man and the ministry he carries |

A warning line below both panels tells visitors these are the only two accounts
and that the ministry never calls to request a transfer. Each number has a
copy-to-clipboard button (`main.js` → "Copy to clipboard", driven by
`data-copy`), with a `prompt()` fallback on browsers without the Clipboard API.

**If either account changes**, edit the `.give__row` values *and* the
`data-copy` attributes in `index.html` (search for `give__accounts`) together —
they are not derived from each other. Update this table too.
