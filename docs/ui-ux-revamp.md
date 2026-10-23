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

**Phase 7 — the transactional pages.** These are the screens a signed-in
student lives in, and they were the last ones outside the design system.

- **Conversation** (`/chat/:id`): rebuilt as a chat app rather than a styled
  page — identity header with verified state, an item strip that says what the
  thread is about, date separators, bubbles, one-tap campus replies, a composer
  with photo attach and send state. The offer, handshake-PIN and checkout flows
  moved into `zs-sheet` panels; nothing was dropped. Kept full-screen: its
  composer sits exactly where the phone nav bar would.
- **Seller hub** (`/seller-hub`): four tabs of inline-styled cards became a
  header, a chip tab row, one panel per section. Analytics shows only real
  numbers; the payout panel says "no bank account linked" instead of offering a
  withdraw button that cannot work. Inventory rows carry icon actions with
  labels for screen readers.
- **Account sub-pages** — saved items, purchases, settings, help — moved inside
  the shell and rebuilt on tokens. They previously rendered their own sticky
  header inside the shell's header.
- **Seller profile** (`/seller/:id`, `/user/:id`): duplicate header removed,
  filter chips and empty state on the design system. A profile with no reviews
  now shows "No ratings" rather than a 5.0 built from an empty list.
- **New listing** (`/post`): duplicate header removed; the form keeps its logic
  and gains the shell's navigation.

### Still open (next pass)

| Item | Why it matters |
| --- | --- |
| `PostPage` inner form and `ItemDetailPage` inner markup | logic is unchanged and correct, but both still carry hundreds of inline styles |
| `AdminPage` | deliberately untouched: an internal tool, not a student surface |
| Visual regression check | no browser in the sandbox; every claim here is from DOM tests and reading the deployed HTML |
| Remaining hex literals in `SellerProfilePage`, `PaymentSuccess` | tokens exist, adoption is partial |
| Item detail two-column layout | content left, sticky action card right on ≥980px |
| Visual regression check | no browser in the sandbox; the first real look is the preview deploy |
| Replace remaining hex literals in the restyled pages | tokens exist, adoption is partial |

## Phase 8 — Clearing the shelves (library reset)

The library is the product, so it must never describe documents it does not
have. Every authored course pack and study pack was removed; the Christian Books
shelf is untouched.

What changed:

- `library/content/` now holds `books.mjs`, `domains.mjs` and an empty `index.mjs`.
  The 240 generated PDFs (packs, previews, source copies) and the generated
  catalog were deleted with them.
- **Counts are derived, not typed.** `libraryCounts()` / `libraryCountLabel()`
  in `src/lib/fresherLibrary.js` read the shelf, and Home, Library, Search and the
  empty states use them. A cleared shelf cannot keep advertising "80 course
  packs", and no page has to be remembered when the shelf changes again.
- **Empty shelves do not render.** `FRESHER_LIBRARY_DOMAINS` and
  `groupByShelf()` drop any shelf with no documents, so the library now shows one
  shelf — Christian Books — with no leftover chips, shelf headings or filter
  options pointing at material that is gone.
- **Empty states say what is true**: "Nothing matches that search" offers a book
  author or title, not a course code that has no document.
- **The build tolerates an empty shelf** (`validatePacks` no longer demands 50
  packs globally) but still rejects a thin pack, so the shelf can be refilled
  without weakening the quality gate.
- Help copy no longer describes shelves that do not exist.

Tests updated to match (`115` across 17 files), including a guard that no
`/library/packs/*.pdf` link is ever rendered for a document that is no longer on
the shelf.

## Phase 9 — The Greek tragedy shelf

The library's first new shelf after the clear-out: the surviving plays of
Aeschylus, Sophocles and Euripides — 31 texts, each typeset as a PDF and hosted
by ZikShare at `/library/drama/<slug>.pdf`.

**This shelf was rebuilt to stop linking out.** It began as 29 cards pointing at
Project Gutenberg. The operator asked for the plays to be hosted here instead, so
`scripts/build-drama-pdfs.mjs` cuts each play out of a public-domain Gutenberg
volume, sets it as a PDF, and writes both the files and the catalogue
(`src/lib/dramaLibraryData.js`). Every card now has a real `download_path`, a real
page count, and a real file behind it; `isExternal` is false and a test asserts
that no `gutenberg.org` link is rendered anywhere on the page.

**How a play is cut out of a volume.** A collection prints several plays in one
file, so each play runs from its own heading to the next play's heading — or to
the translator's notes, whichever comes first. A heading is located by matching
the exact title the volume's table of contents prints, requiring the argument or
cast list a few lines below it, which is what separates a title from a
character's name in the dialogue. The build fails rather than ship a slice that
comes out under 2,500 words.

**Editions, credited on the card.** Morshead for Aeschylus, Campbell for
Sophocles, and for Euripides Gilbert Murray where he translated the play
(Alcestis, Medea, Hippolytus, Trojan Women, Iphigenia in Tauris, Electra, Bacchae,
Rhesus) and Buckley or Wodhull otherwise. Each PDF also reproduces Project
Gutenberg's header and closing notice verbatim, because their licence travels
with the text; the credit on the card is attribution, not a link to read through.

**Still only 31, and said so on the page.** Aeschylus 7 + Sophocles 7 + Euripides
19 = 33 survive. *Ion* and *The Suppliants* have no public-domain English
translation in the Gutenberg catalogue, so they are named in a panel with the
reason and given no card.

**Two plays were found on the second pass.** *Iphigenia at Aulis* and *The
Phoenician Women* turned out to sit inside Buckley's *Tragedies of Euripides,
Volume I* (Gutenberg #15081), whose ten plays are spread across the volume rather
than listed per title in the search result that had first suggested they were
missing.

## Phase 10 — The hosted NOUN courseware shelf

The library gained its first **hosted** third-party material: 22 PDFs from the
National Open University of Nigeria's public e-Courseware repository — GST 101,
102, 103, 104, 105, 107, 201, 202, 203, 204, 301, 302, plus ten NEE
entrepreneurship modules. They download from ZikShare (`/library/gst/<slug>.pdf`),
not from another site.

**How they got here.** Bash in this sandbox cannot reach any host except GitHub,
npm and PyPI, and `fetch_page` cannot save binaries. A short workflow on a GitHub
runner fetched the files and committed them to the branch; it has been deleted.
Artifacts were not usable — they live on Azure blob storage, which the sandbox
cannot reach either.

**What the build refuses to guess.** `scripts/build-gst-shelf.mjs` takes the page
count from the PDF, the size from disk, the checksum from the bytes, and checks
the official title against the text inside the document. NOUN's own table has
mislabelled rows (NEE011's link serves NEE010's book, NEE012's serves Business
Canvas), so the document is the authority: a title that cannot be found in its
PDF is marked unverified rather than shown. Three duplicate uploads
(GST 707/807 copies of GST 107, and the mislabelled NEE 005/011/013) were dropped
rather than listed twice.

**What every card says.** Author and publisher: NOUN. The source page. The
licence condition — educational use permitted, commercial use prohibited — which
is why the library stays free and why the credit cannot be removed. And, where
UNIZIK numbers the same course differently, the note that says so: Nigerian
Peoples and Culture is GST 201 at NOUN and GST 107 at UNIZIK.

**Coverage is 100L–300L and says so.** UNIZIK's General Studies programme has no
400L or 500L course, so the shelf holds none and claims none; a test enforces
that no 400L/500L item can appear.

## Phase 11 — The Roman theatre shelf

The Greek shelf's counterpart: 36 plays hosted at `/library/roman/<slug>.pdf`,
built by `scripts/build-roman-pdfs.mjs` (`npm run roman:build`). Nothing on the
shelf links out.

| Playwright | Plays | English text |
| --- | --- | --- |
| Plautus | 20 — every surviving comedy | Henry Thomas Riley, *The Comedies of Plautus* (Bohn; Bell, 1912) |
| Terence | 6 — every surviving comedy | Henry Thomas Riley, *The Comedies of Terence* (Harper, 1859) |
| Seneca | 10 — the tragedies transmitted under his name | Frank Justus Miller, *The Tragedies of Seneca* (1907) |

**Two sources, one typesetter.** Terence and Seneca come from Project Gutenberg
volumes (#22188, #57999) and are cut apart by their headings. Plautus comes from
the Perseus Digital Library's TEI edition of Riley, one file per play, which is a
much better text than the Internet Archive OCR that was tried first and thrown
away. Both feeds end up in `scripts/lib/play-pdf.mjs`, the shared A4 typesetter
the Greek shelf already uses, so a Roman play and a Greek play are the same object
with a different spine colour.

**Cutting a play out of a volume.** A play runs from its own title to the next
play's title. A title is confirmed by the cast list a few lines below it, because
a speaker's name in the dialogue looks exactly like a title. The end of the text
is found by scanning a copy of the volume with the footnote blocks blanked, so a
heading can never be mistaken for a line inside a note.

**Notes are moved, not dropped.** Both Gutenberg volumes print a `FOOTNOTES`
block at the end of every act; Miller's notes are single lines, Riley's run for
pages. They are lifted out of the running text and printed after the play, and
the Plautus footnotes come out of the TEI the same way — read mid-speech, a
translator's parenthesis breaks the thing it explains.

**Two of the ten are not Seneca's.** *Hercules Oetaeus* is a later imitation and
*Octavia* is a *praetexta* about Nero written after Seneca died. Both are printed
in Miller and both are here, labelled. *Phoenissae* survives in fragments and says
so. Silence about any of this would be a false claim about the corpus.

**What the build refuses.** A title that matches nothing, a play that comes out
under 1,500 words, or a heading found inside another play's notes all stop the
build. Greek quotations — Riley prints a few hundred — are transliterated rather than
dropped, because Times cannot set Greek and a silently missing word is worse than
a rough one; a stray `<` left by Perseus's transcriber is removed.

**Plautus is prose here; Seneca is verse.** Riley translated Plautus into plain
prose for readers who wanted the sense, and the PDF says so instead of implying a
verse translation. Miller's Seneca is verse and keeps its line breaks.

## Phase 12 — The medieval theatre shelf

Seventeen plays, hosted at `/library/medieval/<slug>.pdf`, built by
`scripts/build-medieval-pdfs.mjs` (`npm run medieval:build`). Nothing on the
shelf links out.

| Tradition | Plays | Text |
| --- | --- | --- |
| Morality | *Everyman*; Bale's *God's Promises* (1538) | Everyman's Library text, ed. Ernest Rhys (1909) |
| Chester cycle | *Noah's Flood*; *Abraham, Melchisedec and Isaac* | same volume |
| Wakefield cycle | *The Second Shepherds' Play*; *The Crucifixion*; *The Harrowing of Hell* | same volume |
| Coventry cycle | *The Coventry Nativity Play* | same volume |
| Cornish cycle | *The Three Maries*; *Mary Magdalene and the Apostles*; *St George and the Dragon* | same volume |
| Hrotsvitha of Gandersheim | all six plays | Christopher St John (1923) |

**Two volumes hold the whole shelf**, and both are on Gutenberg: #19481 for the
English plays, #59770 for Hrotsvitha. A temporary workflow fetched them, because
the sandbox cannot reach Gutenberg directly; it has been deleted, and the texts
now sit in `library/medieval/source/`.

**The glossary problem, solved rather than skipped.** #19481 prints one numbered
word-list at the back of the book covering every play — 631 glosses, for words
like *rade* ("quickly") and *take on loft* ("sing out"). Cutting a play out of
the volume would have left its `[86]` markers pointing at nothing, so the builder
reads the glossary once, works out which numbers appear in each play, and prints
exactly those at the end of that play. A gloss is never orphaned and no play
carries 600 notes it does not use.

**Seven plays are named, not faked.** The York cycle, the N-Town plays, *The
Castle of Perseverance*, *Mankind*, Hildegard's *Ordo Virtutum*, Adam de la
Halle's *Robin et Marion* and Lydgate's *Disguising at Hertford* all belong on a
medieval shelf and none of them can be hosted: they survive only in Middle
English spelling or in modern editions still in copyright. They are listed on the
library page with the reason under the heading "Seven medieval plays are not on
this shelf".

**Bale is labelled as Bale.** *God's Promises* was written in 1538, after the
break with Rome, and is a Protestant interlude rather than a medieval pageant. It
is on the shelf because it is in the volume and because it is where the morality
tradition ends; its card says so rather than filing it under "medieval" and
leaving the reader to find out.

**St George is labelled as a survival.** The Cornish mummers' play was recorded
in the nineteenth century, four hundred years after the cycles were suppressed.
It is the only folk play in the library, and its card says what it is.

---

## Phase 13 — The Renaissance theatre shelf

**What it is.** Sixty-nine plays of the English Renaissance, from Lyly's *Endymion*
(1588) to Shirley's *The Cardinal* (1641), typeset as PDFs and hosted on ZikShare:
all thirty-eight Shakespeare plays and thirty-one by his contemporaries. The
shelf is the widest in the library and the first one big enough that a flat grid
of cards stops helping.

### How it was built

| Group | Plays | Text |
| --- | --- | --- |
| Shakespeare: comedies | 12 | *Complete Works* (Globe edition), Gutenberg #100 |
| Shakespeare: histories | 10 | same volume |
| Shakespeare: tragedies | 11 | same volume |
| Shakespeare: romances and late plays | 5 | same volume |
| The first Elizabethans (Lyly, Peele, Greene, Kyd) | 4 | *Chief Elizabethan Dramatists*, ed. Neilson (1911), #77587 |
| Marlowe | 5 | #77587, plus *Tamburlaine Part Two* from #1589 |
| Chapman | 1 | #77587 |
| Jonson | 4 | #77587 |
| Dekker | 3 | #77587 |
| Heywood | 1 | #77587 |
| Marston and Webster | 1 | #77587 |
| Beaumont and Fletcher | 3 | #77587 |
| Fletcher alone | 2 | #77587 |
| Webster | 1 | #77587 |
| Middleton | 2 | #77587 |
| Massinger | 1 | #77587 |
| Ford | 1 | #77587 |
| Shirley | 2 | #77587 |

**Three volumes hold the whole shelf**, all on Gutenberg: #100 for Shakespeare,
#77587 for the Elizabethans, Jacobeans and Carolines, and #1589 for the second
part of *Tamburlaine* so the sequel is not a conspicuous hole beside the first
part. A temporary workflow fetched them, because the sandbox cannot reach
Gutenberg; it has been deleted and the texts sit in `library/renaissance/source/`.

**Cutting without cutting a play in half.** Both big volumes hold their plays in
one continuous file. The builder finds each play's heading *at the left margin*
— both volumes indent their tables of contents, which is what keeps a contents
entry from being mistaken for the play — and ends it at the next heading. Where
two plays share one heading (Dekker's two parts of *The Honest Whore*), the
headings are handed out in source order. After a first build the cuts are checked
for overrun: no PDF may contain a second cast list or a sixth act, which is how
two bad slices (*The Winter's Tale* running into the poems, *Pericles* running
into *Richard II*) were caught and fixed.

**The 1911 volume numbers its verse lines, and the numbers had to go.** Neilson's
edition prints a number at the end of every line, or every fifth, and the
transcription leaves them scattered through the text — sometimes at the end of a
line, sometimes in the middle of a sentence ("such lofty 15 titles"). A PDF full
of stray integers is not a play. The builder strips trailing numbers, removes
parenthesised ones, and drops the few that reflow into the middle of a line,
while leaving alone the numbers that belong to the text ("1 Lord", "4 Avocatori",
"edit. 1600"). It also removes the edition's italic underscores.

**Its glosses are kept.** The volume prints one numbered word-list at the back
covering all thirty plays. As with the medieval glossary, the builder reads it
once and prints exactly the notes each play cites at the end of that play, so a
`[3906]` in the text has a `[3906]` in the notes. Shakespeare's Globe text has no
notes, and the cards say nothing about notes for those plays.

**Sixty-nine cards, listed by playwright.** The Renaissance shelf renders as
eighteen groups — the four Shakespeare genres, then each playwright — each with a
count and the trade dates of that group. Keeping sixty-nine cards as one
undifferentiated grid was the alternative, and it was worse.

**The gaps are named.** "What the Renaissance shelf leaves out" lists the largest
holes and why each one is a hole: Shakespeare's poems (they are not plays),
*The White Devil*, *'Tis Pity She's a Whore*, *Bartholomew Fair* and the late
Jonson, *Women Beware Women*, the original-spelling *Massacre at Paris* and
*Dido*, the other Elizabethans, and the court masques. No card promises a file
that does not exist.

### Numbers, measured rather than written

- 69 plays, 6,954 pages, 13.4 MB of PDF; SHA-256 recorded for every file.
- Library total: 8 books + 22 NOUN manuals + 31 Greek + 36 Roman + 17 medieval +
  69 Renaissance = **183 documents**, printed from `libraryCounts()`.
- 186 tests in 22 files. A new `renaissanceLibrary.test.js` asserts, among other
  things, that every card's PDF exists on disk, opens as `%PDF-`, matches its
  recorded checksum and never links out to Gutenberg.
