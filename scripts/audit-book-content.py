#!/usr/bin/env python3
"""Checks that every Christian Book is a real, readable document.

    python3 scripts/audit-book-content.py
    python3 scripts/audit-book-content.py --verbose

A file can exist, open, and still be worthless: a blank scan, a cover-only
teaser, a placeholder. This reads the text layer of every PDF that is actually
served and fails the run if a book has too little of it.

Thresholds (a book must clear both):
  * at least 20,000 characters of extractable text
  * at least 80% of pages carrying more than 20 characters

A page image with no text layer counts against it, so a closed scan is caught.

Requires PyMuPDF:  pip install pymupdf
"""
import json
import sys
from pathlib import Path

try:
    import pymupdf
except ModuleNotFoundError:
    raise SystemExit("[audit] FAILED: PyMuPDF is not installed. Run: pip install pymupdf")

ROOT = Path(__file__).resolve().parent.parent
BOOKS_DIR = ROOT / "public" / "library" / "books"
CATALOG = ROOT / "library" / "books.generated.json"

MIN_CHARS = 20_000
MIN_TEXT_PAGE_RATIO = 0.80
THIN_CHARS = 20


def audit(path: Path) -> dict:
    doc = pymupdf.open(path)
    try:
        chars = 0
        thin = 0
        for page in doc:
            length = len(page.get_text().strip())
            chars += length
            if length < THIN_CHARS:
                thin += 1
        pages = doc.page_count
        return {
            "pages": pages,
            "chars": chars,
            "thin_pages": thin,
            "text_pages": pages - thin,
            "text_ratio": (pages - thin) / pages if pages else 0,
            "title": (doc.metadata or {}).get("title") or "",
        }
    finally:
        doc.close()


def main() -> int:
    verbose = "--verbose" in sys.argv
    catalog = json.loads(CATALOG.read_text())
    failures = []

    for book in catalog["books"]:
        path = BOOKS_DIR / f"{book['slug']}.pdf"
        if not path.exists():
            failures.append(f"{book['slug']}: file missing")
            continue

        result = audit(path)
        ok_chars = result["chars"] >= MIN_CHARS
        ok_ratio = result["text_ratio"] >= MIN_TEXT_PAGE_RATIO
        status = "OK  " if (ok_chars and ok_ratio) else "FAIL"

        print(
            f"[audit] {status} {book['slug']:<48} "
            f"{result['pages']:>4}p  {result['chars']:>8} chars  "
            f"{result['text_ratio'] * 100:5.1f}% pages with text"
        )

        if not ok_chars:
            failures.append(
                f"{book['slug']}: only {result['chars']} characters "
                f"(need {MIN_CHARS})"
            )
        if not ok_ratio:
            failures.append(
                f"{book['slug']}: {result['thin_pages']} of {result['pages']} pages "
                f"have no text (need {MIN_TEXT_PAGE_RATIO * 100:.0f}% readable)"
            )

    if verbose:
        total = sum(json.loads(CATALOG.read_text())["books"][i]["page_count"] for i in range(len(catalog["books"])))
        print(f"[audit] catalogue claims {total} pages across {len(catalog['books'])} books")

    if failures:
        for failure in failures:
            print(f"[audit] {failure}")
        print(f"[audit] FAILED: {len(failures)} problem(s) across {len(catalog['books'])} books")
        return 1

    print(f"[audit] OK: {len(catalog['books'])} books all readable")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
