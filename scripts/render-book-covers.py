#!/usr/bin/env python3
"""Renders the first page of every Christian Book to a JPEG cover.

    python3 scripts/render-book-covers.py           # write missing/changed covers
    python3 scripts/render-book-covers.py --check   # verify every cover exists

The cover is the book's own first page, rendered from the PDF that is actually
served. It is not artwork invented for the shelf, so a cover can never show a
title or author the file does not contain.

Requires PyMuPDF:  pip install pymupdf
"""
import json
import sys
from pathlib import Path

try:
    import pymupdf
except ModuleNotFoundError:
    raise SystemExit(
        "[covers] FAILED: PyMuPDF is not installed. Run: pip install pymupdf"
    )

ROOT = Path(__file__).resolve().parent.parent
BOOKS_DIR = ROOT / "public" / "library" / "books"
COVERS_DIR = BOOKS_DIR / "covers"
CATALOG = ROOT / "library" / "books.generated.json"

WIDTH_PX = 600
JPEG_QUALITY = 82


def render(pdf_path: Path, out_path: Path) -> None:
    doc = pymupdf.open(pdf_path)
    try:
        page = doc[0]
        zoom = WIDTH_PX / page.rect.width
        pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), alpha=False)
        out_path.parent.mkdir(parents=True, exist_ok=True)
        pix.save(out_path, jpg_quality=JPEG_QUALITY)
    finally:
        doc.close()


def main() -> int:
    check = "--check" in sys.argv
    catalog = json.loads(CATALOG.read_text())
    missing = []
    written = []

    for book in catalog["books"]:
        slug = book["slug"]
        pdf_path = BOOKS_DIR / f"{slug}.pdf"
        out_path = COVERS_DIR / f"{slug}.jpg"
        if not pdf_path.exists():
            print(f"[covers] FAILED: {pdf_path.name} is missing")
            return 1
        if check:
            if not out_path.exists():
                missing.append(out_path.name)
            continue
        render(pdf_path, out_path)
        written.append(out_path.name)

    if check:
        if missing:
            print("[covers] FAILED: missing cover(s): " + ", ".join(missing))
            return 1
        print(f"[covers] OK: {len(catalog['books'])} book covers present.")
        return 0

    total = sum((COVERS_DIR / name).stat().st_size for name in written)
    print(f"[covers] rendered {len(written)} covers ({total / 1024:.0f} KB) at {WIDTH_PX}px wide")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
