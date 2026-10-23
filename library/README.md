# ZikShare Library - authored material

This directory holds the authored, generated PDF study library, plus the content
that produces it.

**Current state: the authored pack shelf is empty.** The operator cleared every
course pack and study pack; the only documents in the library are the eight
full-length books on the Christian Books shelf (`library/content/books.mjs`,
served from `public/library/books/`). The pipeline below is kept intact so new
material — GST past questions, GST textbooks, Theatre Arts documents — can be
added as packs without rebuilding anything.

**The library is free.** Every pack has `priceKobo: 0`, no DRM, no watermark and
no payment step. `scripts/lib/validate-packs.mjs` fails the build if any pack
carries a price, and `npm test` asserts the same thing.

```
library/
  content/               authored pack content (the source of truth)
    books.mjs            the Christian Books shelf catalogue (book PDFs)
    domains.mjs          the shelf taxonomy used for filtering and validation
    index.mjs            the assembled FRESHER_PACKS array (empty right now)
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

An empty shelf is a valid state, so the build succeeds with zero packs and
writes an empty catalog. Any pack that *is* present must still clear every gate,
including the 1,200-word depth minimum — the library never shows a skeleton.
Page counts and totals shown in the app are derived from the catalog, never
typed into a page, so a cleared shelf cannot keep advertising old documents.

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

### Content check

A file can exist and still be useless. `books:audit` reads the text layer of
every book and fails if one is thin:

```bash
pip install pymupdf
npm run books:audit
```

A book must have at least 20,000 characters of extractable text and at least 80%
of its pages must carry more than 20 characters. That catches a blank scan or a
cover-only teaser, which a file-size check cannot. The same run checks that each
rendered cover exists and is not a blank rectangle (pixel standard deviation
below 8 fails), so a cover cannot silently render as an empty white card.

### Storage originals

Every library PDF is served from `public/`, which is why downloads work without
any credentials. Each `digital_products` row also records
`original_storage_path`, and that key now exists in the public
`digital-originals` bucket — 88 objects, byte-for-byte the same size as the row
says.

They are mirrored, not uploaded by hand, because the PDFs are generated. The
`mirror-library-originals` edge function fetches a page of rows, downloads each
file from the live site, checks the `%PDF` header and the byte length, and
uploads it to that exact key. Call it in pages:

```sql
select public.mirror_library_originals(0, 20);   -- then (20, 20), (40, 20) ...
select status_code, content from net._http_response order by id desc limit 1;
```

The token stays in `MIRROR_TOKEN` (edge function secret) and in the private
`library_mirror_config` table; it is not in the repo. Verify coverage with:

```sql
select count(*) filter (where name like 'official-library/%') as packs,
       count(*) filter (where name like 'christian-books/%') as books
from storage.objects where bucket_id = 'digital-originals';
```

Downloaded copies are public, like the site files they came from:

`https://jiateaqbyaalwrkbtvjf.supabase.co/storage/v1/object/public/digital-originals/christian-books/let-us-pray-watchman-nee.pdf`

### Covers and book pages

Each book has a cover at `public/library/books/covers/<slug>.jpg` — the first
page of that same PDF, rendered at 600px wide. Nothing is drawn or invented, so
a cover cannot show a title the file does not contain. Regenerate them after
replacing a PDF:

```bash
pip install pymupdf
npm run books:covers        # render every cover
npm run books:covers:check  # verify every cover exists
```

A book card opens `/library/books/<slug>`, a page with the cover, author,
publisher, page count, file size, description, topics, rights note, and links
to read or download the complete PDF. Books never link to `/item/<id>`.

### Reading in the browser

`/library/books/<slug>/read` is a full-page reader: one page at a time, drawn
by the same PDF.js build the app already loads for sample previews (no new
dependency). Arrow keys and Page Up/Down page through it, the page box jumps to
a typed number, and zoom is clamped to 50–300%. The page you stop on is
remembered per book in `localStorage`, in that browser only.

If PDF.js cannot load, the reader says so and offers the file directly — it
never shows a blank page and pretends the book is empty.

### Finding books

`src/lib/librarySearch.js` is the single matcher for both shelves. A query is
split into words and every word must appear in the record, across title,
subtitle, course code, author, publisher, topics, description, department,
faculty, domain and level. So `THA 151` still finds a pack by code, `Watchman
Nee` finds four books by author, and `nee prayer` narrows the four down to the
one on prayer.

Each book page also ends with **More on this shelf**: other books by the same
author, then books sharing a topic, never the book you are on, and never
padding when the shelf has nothing related.

### Covers if the image fails

`src/components/BookCover.jsx` draws the real cover and, if that image cannot
load, falls back to a typographic cover built from the book's own title and
author rather than a broken image box.

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

## NOUN courseware shelf (hosted)

`public/library/gst/` holds 22 PDFs downloaded from the National Open University
of Nigeria's public e-Courseware repository (`https://nou.edu.ng/ecourseware-degs/`):
the twelve GST courses and ten NEE entrepreneurship modules. They are hosted by
ZikShare and download from ZikShare — no card links out to NOUIN's site.

```bash
npm run gst:build     # rebuild src/lib/gstLibraryData.js from the PDFs
```

The build measures each PDF (page count from the file itself, byte size on disk,
SHA-256) and checks the official course title against the text inside the
document. If a title cannot be found in its PDF, the catalogue marks
`titleVerified: false` instead of showing it — the website's own table has
mislabelled rows (NEE011's link serves NEE010's book), so the document, not the
table, is the authority. `library/gst/source-manifest.json` records where each
file came from and what it hashed to at download time.

**Rights.** NOUN publishes this courseware for educational use and prohibits
commercial use. ZikShare charges nothing, credits NOUN on every card, and links
back to the source page. Do not add paid access or relicense these files.

**Numbering.** NOUN's GST codes are not UNIZIK's. Nigerian Peoples and Culture is
GST 201 at NOUN and GST 107 at UNIZIK; History and Philosophy of Science is
NOUN's GST 105 and UNIZIK's GST 104. Each card says so in `unizik`.
