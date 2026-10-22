# ZikShare Fresher PDF Library

This directory holds the authored, generated PDF study library sold through the
ZikShare digital marketplace, plus the content that produces it.

```
library/
  content/               authored pack content (the source of truth)
    gst.mjs              GST compulsory courses
    faculty-primers-a.mjs  engineering, law, environment, physical sciences
    faculty-primers-b.mjs  medicine, basic medical / clinical sciences, pharmacy, health
    faculty-primers-c.mjs  management, social sciences, arts, education, agriculture, TVET
    study-and-campus.mjs   study skills + campus life
    money-digital-health.mjs  money/career, digital skills, wellbeing
    domains.mjs          domain names used for filtering and cover styling
    index.mjs            the assembled FRESHER_PACKS array
  source/                full PDFs (private originals; upload target for seeding)
  catalog.generated.json measured metadata (page counts, sizes, hashes)
```

`src/lib/fresherLibraryData.js` and `public/library/previews/*.pdf` are generated
from the same build and must never be edited by hand.

## Build

```bash
npm run library:build      # regenerate PDFs, previews and metadata
npm run library:check      # fail if any authored pack is missing a built PDF
npm run test               # includes content, file and page-count checks
```

The build fails loudly if a pack is malformed (unknown faculty, non-integer
price, fewer than 3 sections, a "section" with only a heading, duplicate slug,
missing practice questions, etc.). There are no placeholder or lorem-ipsum
packs; every file is generated from the authored text.

Each pack produces:

- a full PDF (cover, orientation page, 3–5 teaching sections, practice questions
  with answers, a 7-step action plan, a notes page) — **private**, uploaded to the
  `digital-originals` bucket;
- a 3-page preview (cover + first two content pages) — **public**, served from
  `/library/previews/<slug>.pdf`.

## Publish to the store

The library only becomes purchasable once the PDFs are in Supabase storage and
the catalog rows exist. That requires a service-role key, so it is a deliberate
manual step:

```bash
# 1. Apply migrations (including 06_fresher_library_pdfs.sql) to your project.
# 2. Sign in once as the official ZikShare account so public.users has the row.
# 3. Preview what will change:
SUPABASE_URL="https://<project>.supabase.co" \
SUPABASE_SERVICE_ROLE_KEY="<service role key>" \
node scripts/seed-library.mjs

# 4. Publish (uploads PDFs + upserts digital_products rows), then verify:
SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed-library.mjs --apply
SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed-library.mjs --verify
```

`--apply` re-reads the database and storage after writing and fails if any pack
is not both an active row and an uploaded object. The admin UI's "Seed / Sync
Official Library" button only writes catalog rows; it tells you how many PDFs
still need uploading rather than claiming the library is live.

## Adding a pack

1. Add an object to the right file in `library/content/` with the fields used by
   the existing packs (`slug`, `code` or `null`, `title`, `subtitle`, `domain`,
   `faculty`, `department`, `level`, `material_type`, `subcategory`, `priceKobo`,
   `tags`, `description`, `outcomes`, `sections`, `practice`, `checklist`).
2. `faculty` must be one of the names in `src/lib/categories.js`.
3. Run `npm run library:build` and commit the new PDFs, previews and metadata.

## Editorial rules

- Content is written for students, by students, and is **not** a reproduced
  handout, leaked paper or official UNIZIK publication. Every pack says this,
  and every pack tells the reader to confirm the current course outline.
- Course codes reflect UNIZIK faculty usage at the time of writing. Codes and
  outlines change by department and session — verify against the current
  departmental handbook before advertising a pack as covering a specific code.
- No past-examination papers are claimed unless the department actually released
  them; practice questions are written for the pack and labelled as such.
- Packs must be genuinely useful on their own: specific examples, worked
  reasoning, and an action plan the reader can actually follow.
