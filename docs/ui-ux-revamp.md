# ZikShare UI/UX Revamp — Audit, Analysis and Plan

Status: **Phase 1–2 implemented in this pass** (see §9). Written after crawling the
live site (`zik-share.vercel.app`) and reading the source.

---

## 1. What I measured

Crawled: `/`, `/library`, `/search`, `/item/:id`, `/library/books/:slug`,
`/library/books/:slug/read`, `/official-channel`.

Code audit across `src/pages` and `src/components`:

| Signal | Count | What it means |
| --- | --- | --- |
| Inline `style={{ … }}` objects | **1,714** | Styling is per-element, not systemic |
| Distinct hex colours | **113** | No single palette in practice |
| Distinct `fontSize` values | **34** | No type scale |
| Page files over 600 lines | **5** (Admin 1659, Post 1067, SellerHub 1056, Chat 836, ItemDetail 849) | Screens have grown by accretion |
| Shared layout chrome | **1 page only** (`HomePage` has a header) | Every other screen invents its own top bar |
| Desktop breakpoints | **1** (`max-width: 900px` in `index.css`, plus `560px`) | The app is designed phone-first and stays phone-wide on desktop |
| Playwright/visual tests | 0 | No regression guard on layout |

Concrete examples of drift:

- Brand blue is `--color-brand: #0066FF`, but the library uses `#1E40AF` for its
  buttons, `#0F172A` for headings, `#7C1D3F` for archive chips, `#047857` for
  "Free", `#10B981` for download — 30 unique hexes in one file.
- Page widths: home is 72rem, library is unbounded, item detail is 42rem,
  search is 42rem, seller hub is 48rem, chat is 42rem. Resizing the window
  visibly changes the app's "device".
- The same 88 library documents render three different ways: hero cards in
  Home, filter-grid cards in Library, bare list rows in Search.

---

## 2. The seven problems

### P1 — There is no app shell
Only the home page has a header. `/library`, `/search`, `/post`, `/profile` each
start with a different bespoke title block, and `/item/:id` starts with a
full-bleed image and a floating back button. Moving between screens feels like
moving between three different products. There is also **no navigation at all on
desktop** — the only nav is a floating bottom pill tuned for phones.

### P2 — The home page is a brochure, not an app
It opens with a marketing hero ("A more trusted way to exchange campus
resources"), a "Campus verified" panel, and a stat strip. The thing students
actually come for — 88 free, syllabus-mapped PDFs — is below the fold, and only
reachable by clicking a category card. Meanwhile the "Featured campus listings"
grid is entirely ₦0 digital PDFs, so the marketplace looks like a second copy of
the library.

### P3 — The marketplace is empty but presented as full
Every listing on the home feed is a library PDF. There is no recent physical
item, yet the page promises "20+ campus listings". The library's own numbers
(88 items) and the home page's numbers (150+ academic resources) disagree.
Claims that cannot be checked undermine the ones that can.

### P4 — Cards carry too much
A library card holds: type badge, page count, title, author · publisher, domain
chip, archive-years chip, level, faculty, department, three-line description,
rights note, "Price / Free", and a download button — **thirteen** pieces of
information at equal weight. Scanning 88 of them is work. The three things that
matter are: what is it, what course/book is it, and how do I open it.

### P5 — Filters are a wall
The library stacks four labelled filter groups (18 faculties, 10 domains, 5
levels, 5 types) permanently above the results. On a phone that is two full
screens of chrome before the first document. There is no "clear all", no count
per option, and the active state is not visible once you scroll past.

### P6 — The free promise is buried
"Everything is free, no sign-in, no payment step" is the single most important
thing about ZikShare's library. Today it is one small pill and a line of
microcopy on `/library`, and it is absent from `/search`, the item page and the
book pages. A student landing on a ₦0 listing has to work out whether that means
free or broken.

### P7 — Three ways to do the same thing
Home, Library and Search all list the same documents with different cards,
different sort options and different empty states. Search additionally has three
tabs (marketplace / requests / academic) with no explanation of the difference.

---

## 3. User-flow analysis

Three real journeys, with the friction as it stands.

### A. 100L student needs THA 151 tonight
1. Lands on `/` → hero copy about exchanging resources.
2. Scrolls past hero + stats + categories to a grid of 88 cards, most of them
   Christian books, sorted by "relevance".
3. No search box on the home page is *real* (it is a button that navigates).
4. Clicks "UNIZIK Digital Library" → 2 screens of filters.
5. Clicks "Faculty of Arts" → results, then searches `THA 151`.
6. Opens a card → item page → the download sits under Description and Seller,
   below the fold on a phone.
**Friction: 6 steps, 3 different layouts, 2 scroll-pasts of chrome.** Target:
**2 steps** — search from anywhere, land on a page whose first control is Download.

### B. Fresher browses for anything useful
1. Home feed shows only library PDFs, which they have just seen in the library.
2. Category cards route to `/search?segment=electronics`, where the results are
   again the same digital PDFs (because the marketplace has no physical stock).
3. Dead end; no empty-state guidance, no "post what you need".
**Friction: the marketplace promises stock that does not exist.** Target: be
honest — show the library as the main act, show the marketplace as "opening
soon / be the first to list", and give one clear action.

### C. Student opens a book to read
1. `/library` → book card → book page (good).
2. "Start reading" → reader (good).
3. But the reader has no link to the *other* shelf, and leaving it drops you on
   the book page with no way back to the library except a back button labelled
   "Back to the Christian Books shelf".
**Friction: the best-built part of the app is the least connected to it.**

---

## 4. Principles for the revamp

1. **The library is the product.** 88 free, real documents. Lead with it
   everywhere; treat the marketplace as a secondary, honest surface.
2. **One shell.** Same header, same container, same nav on every screen.
3. **Three facts per card.** What it is, what it covers, how to open it.
4. **Free is a first-class label**, not microcopy — on the card, the page and the
   button.
5. **Progressive disclosure.** Filters behind one button; badges behind the card.
6. **No invented numbers.** Every count comes from the catalogue or the database.
7. **Phone-first, not phone-only.** Same layout at 360px and 1440px, wider grid,
   top nav from 900px.
8. **One primary action per screen.**

---

## 5. New information architecture

```
Home  ─┬─ Search (global, one field, searches packs + books + listings)
       ├─ Library
       │    ├─ shelves (domain)  ── packs
       │    └─ Christian Books   ── books ── book page ── reader
       ├─ Marketplace (listings only, with honest empty state)
       ├─ Sell (post)
       └─ You (profile, saved, purchases, messages)
```

Navigation:
- **Mobile (<900px):** persistent bottom bar — Home · Library · Search · Sell ·
  You; header holds logo + search shortcut.
- **Desktop (≥900px):** top bar with logo, Home / Library / Marketplace, a real
  search field, "Sell something", avatar. Bottom bar hidden.

Every page sits in the same 72rem container with the same padding and the same
page-header pattern (eyebrow · title · one-line promise · optional actions).

---

## 6. Design system

Tokens (already in `@theme`, now actually used):

| Token | Value | Use |
| --- | --- | --- |
| `--color-brand` | `#0066FF` | Primary actions, links, active nav |
| `--color-brand-dark` | `#0A2540` | Headings, dark surfaces |
| `--color-campus-green` | `#059669` | "Free", success, download |
| `--color-orange` | `#FA5A00` | Sell / marketplace accent only |
| `--color-background` | `#F8FAFC` | App canvas |
| `--color-border` | `#E2E8F0` | Hairlines |

Type scale — **5 sizes only**: 1.75rem (page title), 1.15rem (section), 0.95rem
(card title), 0.85rem (body), 0.72rem (meta). Replaces 34 ad-hoc sizes.

Spacing — 4px base, used as `0.25 / 0.5 / 0.75 / 1 / 1.5 / 2 / 3rem`.

Radius — 0.5 (control), 0.75 (card), 1rem (panel), 9999 (pill).

Elevation — exactly two shadows (`--zs-shadow-sm`, `--zs-shadow-md`).

Component primitives (`src/components/ui.jsx`):
`Button`, `Card`, `Chip`, `SectionHeading`, `EmptyState`, `Stat`, `PageHeader`,
`SearchField`, `Skeleton`.

CSS layer (`src/index.css`, `.zs-*`): container, header, nav, grid, toolbar,
card, chip, button variants, prose. Page files stop inventing hexes.

---

## 7. Page-by-page spec

### Home
1. **Header** (shell).
2. **Opening block**: one sentence ("Free study material for UNIZIK, on your
   phone, right now") + the real search field + two buttons: *Browse the library*
   (primary), *Sell something* (secondary).
3. **Start here** — 3 cards with true counts: Library (`88 free PDFs`),
   Marketplace (`N live listings`, or "be the first"), Sell.
4. **Shelves** — domain chips with counts → `/library?domain=X`.
5. **Recently added** — 6 compact library cards.
6. **Marketplace** — physical listings only. If none: one honest card, "Nothing
   listed yet — post the first item", plus what sells well.
7. Remove: marketing hero, trust panel, fake stats, 4-card trust strip.

### Library
1. Compact page header: "Digital Library", one line ("88 free PDFs, no sign-in,
   no payment"), count.
2. **Toolbar** (sticky): search field · "Filters" button with active count ·
   sort select. One row.
3. **Filter sheet**: opens over content, one scrollable panel, chips with counts,
   "Clear all", "Show N results".
4. **Active filters** as removable chips under the toolbar.
5. **Results grouped into shelves** when unfiltered (Christian Books, Theatre &
   Film, GST, Faculty primer, Study skills, Campus life…) with a section heading
   and count each; a single grid when filtering.
6. **Card**: type badge · pages → title → code or author → one-line subject →
   `Free` + primary link. Cover only for books. Rights note moves to the book
   page (it is already there, twice).

### Search
One field, three sections, same cards as the library:
*Library (N)* → packs and books; *Marketplace (N)* → listings; honest empty
states for each. `₦0` becomes `Free`. Tabs removed in favour of sections.

### Item / Book detail
- Two columns ≥900px: content left, **sticky action card** right.
- One primary action, top of the action card, above everything.
- Mobile: action card collapses to a sticky bottom bar (single CTA).
- Delete the duplicate download blocks (there are three on `/item/:id`).

### Reader
- Add "Back to the shelf" and "Next book" so it is not a cul-de-sac.

---

## 8. Phases and acceptance criteria

| Phase | Scope | Done when |
| --- | --- | --- |
| **1 Foundation** | tokens, `.zs-*` layer, `ui.jsx`, `AppShell`, desktop nav | every route renders in one shell; 900px+ shows top nav; no page wider/narrower than 72rem |
| **2 Home** | home rewrite | no invented numbers; library above marketplace; first CTA reaches a document in 2 clicks |
| **3 Library** | toolbar, sheet, grouped shelves, new card | first document visible within one screen on a 360px viewport; ≤3 facts per card |
| **4 Search** | sections + shared cards | searching "THA 151" finds the pack; "Nee" finds books; no ₦0 strings |
| **5 Detail** | two-column, one CTA | download is the first interactive element |
| **6 Polish** | reader exit links, empty states, focus states, reduced motion | keyboard reachable, visible focus, no layout shift |

---

## 9. What shipped in this pass

**Phase 1 — Foundation.** `src/index.css` gains a `.zs-*` layer (container,
header, nav, toolbar, sheet, card, chip, button, empty state, footer) and a five-step
type scale; `src/components/ui.jsx` adds `Button`, `Chip`, `Tag`, `PageHeader`,
`SectionHeading`, `SearchField`, `EmptyState`; `src/components/AppShell.jsx` is
the single frame for every page — sticky header with a working search field on
desktop, primary nav from 900px up, bottom bar below that, and a footer that
states the free promise. Item, seller and book routes moved inside the shell.

**Phase 2 — Home.** Rewritten from a marketing brochure into an app home: the
promise, then three ways in with *real* counts, shelves, newest material, the
book shelf, and a marketplace that shows only physical listings with an honest
empty state. The invented "150+ academic resources / 20+ listings / 24/7"
stats are gone.

**Phase 3 — Library.** One sticky toolbar (search · Filters · sort) instead of
four permanent filter groups; filters live in a sheet with counts, "Clear all
filters" and "Show N results"; active filters appear as removable chips. The 88
documents are grouped into shelves when browsing. Cards carry three facts
instead of thirteen; rights and archive years moved to the document page.

**Phase 4 — Search.** Three tabs and three visual languages replaced by one
field over three sections (library, marketplace, looking-for) using the *same*
card as the library. `₦0` reads `Free`. `?q=` is shareable.

**Phase 5 — Detail.** Item pages render inside the shell with a breadcrumb, no
longer capped at 42rem, with the sticky action bar reserved for phones and the
duplicate half-page download button reduced to a quiet link. The reader gained
"Book details" and a next-book control so it is no longer a cul-de-sac.

Test coverage: `appShell.test.jsx` (nav, header search, promise),
`libraryView.test.js` (grouping, filtering, sorting, counts), rewritten
`libraryUi.test.jsx` for the new filter-sheet flow.

**Phase 6 — the rest of the signed-out path.** Sign-in, the account page, the
posting gate and the book page were the remaining places where the old inline
system was visible on arrival.

- `/login`: one card in the shared container and type scale; Google button,
  labelled fields, one error style. It states that the library never asks you to
  sign in, and links there.
- `/profile` signed out: no longer a six-item account menu that all bounces to a
  login screen. It says reading needs no account, lists the three things an
  account does unlock, and offers sign in / open the library.
- `/post` signed out: same panel, plus a way back to the library. The upload
  confirmation stopped claiming material is "available for purchase".
- `/library/books/:slug`: rebuilt on tokens — cover and details in one panel,
  reading and download side by side, page count / size / Free as tags.
- Search empty states distinguish "nothing is listed" from "nothing matches",
  and report how many items exist.
- `/official-channel`: the beige WhatsApp pastiche (dark app bar, `#EFEAE2`
  canvas) is gone. It now sits inside the shell as one more page: a heading, a
  read-only notice, and announcement cards. Moved inside the shell layout.
- `/messages`: rebuilt on tokens, and made reachable at all — it had no link
  anywhere in the app. The shell now carries a Messages icon with an unread
  badge, and the phone bar is Home · Library · Search · Sell · You.
  `BottomNav.jsx` is deleted; the shell owns its own navigation.

### Still open (next pass)

| Item | Why it matters |
| --- | --- |
| `SellerHubPage`, `ChatPage` restyle | still on the old inline-style system; the longest files left. `ChatPage` also carries the offer, escrow-PIN and checkout flows, so it needs care rather than a coat of paint |
| `PostPage` inner form | the gate is fixed, the 500-line form behind it is not |
| `/seller-hub`, `/profile/*` inside the shell | they sit outside it, so they have no navigation; move once their inner markup is converted |
| Item detail two-column layout | content left, sticky action card right on ≥980px |
| Visual regression check | no browser in the sandbox; the first real look is the preview deploy |
| Replace remaining hex literals in the restyled pages | tokens exist, adoption is partial |
