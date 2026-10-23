/**
 * The ZikShare library catalogue, in build order.
 *
 * The shelves were cleared on the operator's instruction: the only documents in
 * the library are now the eight books on the Christian Books shelf, which are
 * catalogued separately in `./books.mjs` and served from `public/library/books/`.
 *
 * Everything below is authored ZikShare study material, generated into a PDF by
 * `scripts/build-library-pdfs.mjs`. To add material, create a module that
 * exports an array of packs and list it here — nothing else needs to change:
 * the builder measures the files, the catalogue and the app data are derived
 * from them, and the library page picks them up automatically.
 *
 * A pack is held to the same standard as the books: it must be something a
 * student can actually revise from. `scripts/lib/validate-packs.mjs` rejects a
 * pack under 1,200 words, and the build fails rather than shipping a skeleton.
 *
 * Nothing in this list is a scan, a copy, or a reproduction of a published
 * book. Course packs are written for ZikShare; the reading list inside each one
 * points a student at the real book rather than replacing it.
 */

export const FRESHER_PACKS = []

export default FRESHER_PACKS
