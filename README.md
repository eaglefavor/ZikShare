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

`library/` holds 53 authored PDF study packs across seven domains:

| Domain | Packs |
| --- | --- |
| GST & Compulsory Courses | 6 |
| Faculty Primer (all 18 faculties/units) | 22 |
| Study Skills | 6 |
| Campus Life | 6 |
| Money & Career | 5 |
| Digital Skills | 4 |
| Health & Wellbeing | 4 |

Every pack is generated from authored content into a full PDF (5–8 pages:
cover, orientation, teaching sections, practice questions with answers, an
action plan and a notes page) plus a public 3-page preview.

```bash
npm run library:build     # regenerate PDFs, previews and metadata
npm run library:check     # fail if any authored pack has no built PDF
```

Publishing to the store needs a service-role key and is a deliberate manual
step: see [`library/README.md`](library/README.md) for the seeding and
verification commands.

## Structure

```
src/            React app (pages, components, lib, contexts)
supabase/       SQL migrations and edge functions
library/        authored + generated PDF library
scripts/        build and seeding tooling
```
