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

### Seeding without HTTPS egress (SQL path)

Some environments can reach Postgres through a dashboard or SQL tool but cannot
make outbound HTTPS calls to `*.supabase.co`. For those, emit reviewable SQL
straight from the generated catalog:

```bash
node scripts/emit-library-rows.mjs --seller <official-user-uuid> --chunk 40 > rows.sql
# then paste rows.sql into the Supabase SQL editor, or:
psql "$DATABASE_URL" -f rows.sql
```

The emitted statements are idempotent (they upsert on
`seller_id, original_storage_path`) and always write `price 0`,
`is_free true`, `drm_enabled false`, `status active`. `description` receives the
authored subtitle: the app renders the full description from the catalog, so a
database row can never invent copy that the PDFs do not contain.

A row does **not** require the storage object to exist. Full PDFs are served as
public static files from `/library/packs/<slug>.pdf`, which is the download path
used by the library UI; `original_storage_path` is the private bucket copy used
for ownership-based downloads and admin housekeeping. If that copy has not been
uploaded yet, say so rather than claiming storage is populated.

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

## Christian Books shelf

`library/content/books.mjs` catalogues full-length third-party books. They are
**not** authored packs: the PDF is the document, served as-is from
`public/library/books/<slug>.pdf`.

```bash
node scripts/import-books.mjs --from ~/books   # copy + measure + write catalogue
node scripts/import-books.mjs --check          # verify files match metadata
```

The importer measures the page count, file size and SHA-256 of each file and
writes them to `library/books.generated.json` and `src/lib/christianBooksData.js`.
Nothing is estimated by hand, so a card cannot claim a page count the PDF does
not have.

### Rights

Each entry carries `rights`, recorded from what the document itself says:

| value | meaning |
| --- | --- |
| `publisher-copyright` | the PDF carries a publisher copyright notice |
| `edition-claims-public-domain` | the edition asserts public domain |
| `unverified` | no notice found; status not established |

This field is a description of the file, **not** a licence. Several titles on
the shelf are in copyright (Watchman Nee died in 1972 and Derek Prince in 2003,
so their works are protected in Nigeria for 70 years after death; the editions
here are published by Christian Fellowship Publishers and Derek Prince
Ministries). Distributing those files publicly needs the publisher's permission.
The Library page states on the shelf that these are third-party works and that
rights remain with the publishers.

### Catalogue rows

The books are also published into `digital_products` so they come from the
database the same way the study packs do:

```bash
node scripts/emit-book-rows.mjs --seller <official-account-uuid> > books.sql
```

The emitter reads `library/books.generated.json`, so a row carries the measured
page count and byte size. Every row is `price = 0`, `is_free = true`,
`drm_enabled = false`, `domain = 'Christian Books'`.

`original_storage_path` for a book is `christian-books/<slug>.pdf`. That value
is a **catalogue key**, not a file in Supabase Storage: the PDF itself is served
from `public/library/books/<slug>.pdf` by the site. The key is what lets the app
match a row back to its catalogue entry — when it matches, the shelf keeps the
card the catalogue describes (author, topics, rights note) and only borrows the
row's id, so an edit in the database cannot turn a book into a pack.

Adding a book:

1. add an entry to `library/content/books.mjs` with an accurate `rights` value;
2. run `node scripts/import-books.mjs --from <folder>`;
3. run `npx vitest run src/test/christianBooks.test.js` and `npm run build`.
