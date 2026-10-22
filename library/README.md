# ZikShare Fresher PDF Library

This directory holds the authored, generated PDF study library, plus the content
that produces it.

**The library is free.** Every pack has `priceKobo: 0`, no DRM, no watermark and
no payment step. `scripts/lib/validate-packs.mjs` fails the build if any pack
carries a price, and `npm test` asserts the same thing.

```
library/
  content/               authored pack content (the source of truth)
    gst.mjs              GST compulsory courses
    faculty-primers-a.mjs  engineering, law, environment, physical sciences
    faculty-primers-b.mjs  medicine, basic medical / clinical sciences, pharmacy, health
    faculty-primers-c.mjs  management, social sciences, arts, education, agriculture, TVET
    study-and-campus.mjs   study skills + campus life
    money-digital-health.mjs  money/career, digital skills, wellbeing
    arts-departments.mjs   Faculty of Arts: one primer per sister department
    theatre-film.mjs       Theatre & Film Studies: full THA ladder + the
                           year-demarcated outline archive
    domains.mjs          domain names used for filtering and cover styling
    index.mjs            the assembled FRESHER_PACKS array
  source/                full PDFs (upload target for seeding)
  ../public/library/packs/     the same full PDFs, public, no payment required
  ../public/library/previews/  public 3-page previews
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

The build fails loudly if a pack is malformed (unknown faculty, a non-zero
price, fewer than 3 sections, a "section" with only a heading, duplicate slug,
missing practice questions, an archive band without a year or source, etc.). There are no placeholder or lorem-ipsum
packs; every file is generated from the authored text.

Each pack produces:

- a full PDF (cover, orientation page, 3–5 teaching sections, practice questions
  with answers, a 7-step action plan, a notes page) — written to both
  `library/source/<slug>.pdf` (upload copy for `digital-originals`) and
  `public/library/packs/<slug>.pdf` (the public, free download);
- a 3-page preview (cover + first two content pages) — public, served from
  `/library/previews/<slug>.pdf`.

## Publish to the store

The library is downloadable without any of this: the PDFs are public files. This
step only creates the catalog rows that make packs appear in search and in the
admin panel. Rows are written with `price: 0`, `is_free: true` and
`drm_enabled: false`. That requires a service-role key, so it is a deliberate
manual step:

```bash
# 1. Apply migrations (06_fresher_library_pdfs.sql, 07_free_library.sql).
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
   `faculty`, `department`, `level`, `material_type`, `subcategory`,
   `priceKobo: 0`, `tags`, `description`, `outcomes`, `sections`, `practice`,
   `checklist`).
2. `faculty` must be one of the names in `src/lib/categories.js`.
3. Run `npm run library:build` and commit the new PDFs, previews and metadata.

### Adding a year-demarcated outline archive

Any pack may carry an optional `archive` block. It renders as a dedicated
archive page (and a year band on the cover) and it is the only honest way to
publish a course outline that is not guaranteed to be current:

```js
archive: {
    coverage: '2018  •  2019  •  2025/2026',
    note: 'Why the years matter and what a reader should check before registering.',
    disclaimer: 'Archive means: this records what a public page listed in that year.',
    sessions: [
        { year: '2018', label: 'Archived course description', status: 'archived',
          topics: ['...'], changed: 'what differs from the next band',
          source: 'page name + publication date', retrieved: '2026-10-22' },
        { year: '2025/2026', label: 'Compiled working map', status: 'current',
          topics: ['...'], source: 'how this map was compiled', retrieved: '2026-10-22' },
    ],
}
```

Rules the validator enforces:

- at least two year bands, no duplicate years, no band without a label;
- every non-`current` band needs a `source` and a `retrieved` date;
- exactly one band may be `status: 'current'`;
- `current` means "compiled working map", never "official handout". Do not
  present an archived listing as the live curriculum.

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
