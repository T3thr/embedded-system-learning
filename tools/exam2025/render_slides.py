"""Render the real lecture / lab / textbook pages cited by the 2025 exam page into WebP images.

Usage:  python3 tools/exam2025/render_slides.py            (renders every key in evidence.SLIDES)
Output: 1/final/real-exam/2025/slides/<KEY>.webp (full page) and <KEY>-t.webp (card thumbnail)

The two PowerPoint sources (Lecture 6, Lab 3 hardware slides) are first exported to PDF through
Microsoft PowerPoint on macOS (osascript); the PDFs are cached under the system temp directory.
Textbook keys use the PDF page number (not the printed page number).
"""
import subprocess
import sys
import tempfile
from pathlib import Path

import fitz  # PyMuPDF
from PIL import Image

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from evidence import SLIDES, SOURCES  # noqa: E402

ROOT = HERE.parent.parent / "1"
OUT = ROOT / "final" / "real-exam" / "2025" / "slides"
CACHE = Path(tempfile.gettempdir()) / "exam2025-slides-cache"

SLIDE_W, THUMB_W = 1280, 480
BOOK_W = 1220


def pptx_to_pdf(pptx):
    CACHE.mkdir(exist_ok=True)
    pdf = CACHE / (pptx.stem.replace(" ", "_") + ".pdf")
    if pdf.exists() and pdf.stat().st_mtime > pptx.stat().st_mtime:
        return pdf
    tmp = CACHE / (pptx.stem.replace(" ", "_") + ".pptx")
    tmp.write_bytes(pptx.read_bytes())
    script = (f'tell application "Microsoft PowerPoint"\n open POSIX file "{tmp}"\n delay 5\n'
              f' save active presentation in POSIX file "{pdf}" as save as PDF\n'
              f' close active presentation saving no\nend tell')
    subprocess.run(["osascript", "-e", script], check=True)
    return pdf


def open_source(src):
    path = ROOT / SOURCES[src]["file"]
    if path.suffix.lower() == ".pptx":
        path = pptx_to_pdf(path)
    return fitz.open(path)


def trim(im, pad=0.04):
    """Crop to the non-white content of a slide, keeping a small margin."""
    mask = im.convert("L").point(lambda v: 255 if v < 240 else 0)
    box = mask.getbbox()
    if not box:
        return im
    x0, y0, x1, y1 = box
    px, py = int((x1 - x0) * pad) + 8, int((y1 - y0) * pad) + 8
    return im.crop((max(0, x0 - px), max(0, y0 - py), min(im.width, x1 + px), min(im.height, y1 + py)))


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    docs = {}
    made = 0
    for key, s in SLIDES.items():
        src, page = s["src"], s["page"]
        if src not in docs:
            docs[src] = open_source(src)
        pg = docs[src][page - 1]
        book = SOURCES[src]["kind"] == "book"
        width = BOOK_W if book else SLIDE_W * 2  # slides: render 2x, keep 1x for the modal and trim the 2x for the thumbnail
        pm = pg.get_pixmap(matrix=fitz.Matrix(width / pg.rect.width, width / pg.rect.width), alpha=False)
        big = Image.frombytes("RGB", (pm.width, pm.height), pm.samples)
        img = big if book else big.resize((SLIDE_W, round(big.height * SLIDE_W / big.width)), Image.LANCZOS)
        img.save(OUT / f"{key}.webp", "WEBP", quality=80, method=6)
        box = s.get("thumb")
        if box:  # fractional crop (x0, y0, x1, y1) for textbook pages
            w, h = img.size
            img = img.crop((int(box[0] * w), int(box[1] * h), int(box[2] * w), int(box[3] * h)))
        elif not book:  # trim the white margins so the card thumbnail shows the slide content large
            img = trim(big)
        img.thumbnail((THUMB_W, THUMB_W), Image.LANCZOS)
        img.save(OUT / f"{key}-t.webp", "WEBP", quality=78, method=6)
        made += 1
    total = sum(f.stat().st_size for f in OUT.glob("*.webp"))
    print(f"rendered {made} pages -> {OUT} ({total / 1e6:.1f} MB)")


if __name__ == "__main__":
    main()
