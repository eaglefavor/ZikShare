# ZikShare

Hyper-local campus marketplace and digital academic library for Nnamdi Azikiwe
University (UNIZIK) — React + Vite PWA, Supabase, Paystack.

## Run locally

```bash
npm install
cp .env.example .env      # fill in Supabase, Cloudinary and Paystack keys
npm run dev
npm test
npm run lint
```

The app will start without credentials but cannot read or write data. It logs a
clear startup error rather than pretending to be connected.

## Digital library (fresher PDFs)

`library/` holds 80 authored PDF study packs across nine domains. **Everything
is free**: no fee, no sign-in and no payment step before download.

| Domain | Packs |
| --- | --- |
| GST & Compulsory Courses | 6 |
| Faculty Primer (all 18 faculties/units) | 31 |
| Theatre & Film Studies (Faculty of Arts) | 17 |
| Departmental Archive (year-demarcated index) | 1 |
| Study Skills | 6 |
| Campus Life | 6 |
| Money & Career | 5 |
| Digital Skills | 4 |
| Health & Wellbeing | 4 |

The Faculty of Arts is the deepest coverage in the library, and within it the
Department of Theatre & Film Studies carries a full THA course ladder from 100
to 400 level. Packs that reproduce a departmental outline are **year
demarcated**: every session band (for example `2018`, `2019`, `2025/2026`) is
labelled, dated and sourced, and only one band is ever marked as the current
working map. Other faculties' packs are kept alongside them.

Every pack is generated from authored content into a full PDF (5–8 pages:
cover, orientation, teaching sections, practice questions with answers, an
action plan and a notes page) plus a public 3-page preview and a public full
copy at `/library/packs/<slug>.pdf`.

```bash
npm run library:build     # regenerate PDFs, previews, free downloads and metadata
npm run library:check     # fail if any authored pack has no built PDF
```

Publishing catalog rows to Supabase needs a service-role key and is a deliberate
manual step: see [`library/README.md`](library/README.md). The PDFs themselves
are public files, so a reader can download a pack even if no row has been
seeded yet.

## Structure

```
src/            React app (pages, components, lib, contexts)
supabase/       SQL migrations and edge functions
library/        authored + generated PDF library
scripts/        build and seeding tooling
```
