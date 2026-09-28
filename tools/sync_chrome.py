#!/usr/bin/env python3
"""Regenerate the shared page chrome from one definition (idempotent).

  python3 tools/sync_chrome.py           # rewrite pages in place
  python3 tools/sync_chrome.py --check   # report drift only; exit 1 if any page would change

What it owns on every page listed in PAGES:
  - the blocking theme-boot script (first script in <head>, before any stylesheet)
  - the ?v= cache-busting version on main.css / solution.css / main.js
  - <header class="navbar"> (desktop mega menu) and the mobile drawer, both built from NAV
  - id="page-top" on <main>, the GitHub link at the end of the footer
  - a structured .card-footer on every .solution-card of question pages
  - a language badge + copy header on any code block that lacks one
Every page gets the SAME menu; only the active group / link differs.
Adding a page: add it to PAGES (active key, question page?) and, if it needs a menu entry, to a NAV group.
"""
import html as htmlmod
import posixpath
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GITHUB = "https://github.com/T3thr/embedded-system-learning"
ASSET_VER = "3.2"  # bump whenever assets/css or assets/js change

# One menu for the whole site.
# Top-level links: (label, target relative to ROOT, key)
TOP_LINKS = [
    ("หน้าแรก", "index.html", "home"),
    ("305341 Embedded 1", "1/index.html", "course"),
]
# Groups open a mega panel on desktop and a collapsible section in the mobile drawer.
# Each column: (heading, [(title, description, target, key, icon), ...])
NAV_GROUPS = [
    {
        "id": "midterm", "label": "ข้อสอบ Midterm", "drawer_label": "ข้อสอบกลางภาค (Midterm)",
        "columns": [
            ("ข้อสอบกลางภาค", [
                ("Midterm Hub", "ภาพรวมคลังข้อสอบกลางภาคทั้ง 3 ชุด", "1/midterm/index.html", "mid", "fa-layer-group"),
                ("01. แนวข้อสอบความจำ 26 ข้อ", "ทฤษฎีสถาปัตยกรรม + ชุดคำสั่ง พร้อมเฉลย", "1/midterm/recalled-questions/index.html", "mid1", "fa-brain"),
                ("02. ข้อสอบจริงกลางภาค 2561", "6 ข้อใหญ่ พร้อมภาพกระดาษข้อสอบ", "1/midterm/real-exam-2561/index.html", "mid2", "fa-file-signature"),
                ("03. บทเรียนแนวข้อสอบวิเคราะห์", "16 ข้อวิเคราะห์จาก Lecture 1–4", "1/midterm/analytical-questions/index.html", "mid3", "fa-chalkboard-teacher"),
            ]),
        ],
    },
    {
        "id": "final", "label": "ข้อสอบ Final", "drawer_label": "ข้อสอบปลายภาค (Final)",
        "columns": [
            ("คลังข้อสอบจริง", [
                ("Final Hub", "ภาพรวม แผนติว และตารางท่องด่วน", "1/final/index.html", "hub", "fa-th-large"),
                ("ชุดที่ 1: เฉลย 56 ข้อ", "Recalled: Timers, UART, Power, FSM", "1/final/real-exam-recalled/index.html", "set1", "fa-list-ol"),
                ("ชุดที่ 2: ข้อสอบจริง 2025", "21 ข้อ ถอดจากกระดาษข้อสอบจริง", "1/final/real-exam/2025/index.html", "set2", "fa-scroll"),
            ]),
            ("ฝึกปฏิบัติ", [
                ("Interactive Lab", "เครื่องคำนวณ Timer, Baud, Bitfield", "1/final/interactive-tools/index.html", "lab", "fa-calculator"),
                ("FSM Sliding Door", "โปรเจกต์กลุ่ม เฟิร์มแวร์ Version 2", "1/final/fsm-sliding-door-project/index.html", "fsm", "fa-door-open"),
            ]),
        ],
    },
]

PAGES = {  # page -> (active key, question page with card footers)
    "index.html": ("home", False),
    "1/index.html": ("course", False),
    "1/midterm/index.html": ("mid", False),
    "1/midterm/recalled-questions/index.html": ("mid1", True),
    "1/midterm/real-exam-2561/index.html": ("mid2", True),
    "1/midterm/analytical-questions/index.html": ("mid3", True),
    "1/final/index.html": ("hub", False),
    "1/final/real-exam-recalled/index.html": ("set1", True),
    "1/final/real-exam/2025/index.html": ("set2", True),
    "1/final/interactive-tools/index.html": ("lab", False),
    "1/final/fsm-sliding-door-project/index.html": ("fsm", False),
}

THEME_BOOT = """  <script id="theme-boot">
    (function () {
      var theme = 'dark';
      try { theme = localStorage.getItem('theme') || 'dark'; } catch (e) {}
      if (theme !== 'light' && theme !== 'dark') theme = 'dark';
      document.documentElement.setAttribute('data-theme', theme);
    })();
  </script>
"""


def rel(page, target):
    return posixpath.relpath(target, posixpath.dirname(page) or ".")


def group_of(key):
    for g in NAV_GROUPS:
        for _, items in g["columns"]:
            if any(it[3] == key for it in items):
                return g["id"]
    return None


def current(key, active):
    return ' aria-current="page"' if key == active else ""


def top_link(page, item, active, cls):
    label, target, key = item
    klass = cls + (" active" if key == active else "")
    return '<a href="' + rel(page, target) + '" class="' + klass + '"' + current(key, active) + '>' + label + '</a>'


def mega_link(page, item, active, cls):
    title, desc, target, key, icon = item
    klass = cls + (" active" if key == active else "")
    return ('<a href="' + rel(page, target) + '" class="' + klass + '"' + current(key, active) + '>'
            '<span class="mega-icon" aria-hidden="true"><i class="fas ' + icon + '"></i></span>'
            '<span class="mega-text"><span class="mega-title">' + title + '</span>'
            '<span class="mega-desc">' + desc + '</span></span></a>')


def header(page, active):
    act_group = group_of(active)
    rows = ["        <li>" + top_link(page, it, active, "nav-link") + "</li>" for it in TOP_LINKS]
    for g in NAV_GROUPS:
        cols = []
        for heading, items in g["columns"]:
            links = "\n".join("                <li>" + mega_link(page, it, active, "mega-link") + "</li>" for it in items)
            cols.append('            <div class="mega-col">\n'
                        '              <p class="mega-heading">' + heading + '</p>\n'
                        '              <ul class="mega-list">\n' + links + '\n              </ul>\n'
                        '            </div>')
        trigger_cls = "nav-link nav-group-toggle" + (" active" if g["id"] == act_group else "")
        rows.append(
            '        <li class="nav-group" data-group="' + g["id"] + '">\n'
            '          <button type="button" class="' + trigger_cls + '" aria-expanded="false" aria-controls="mega-' + g["id"] + '">'
            + g["label"] + ' <i class="fas fa-chevron-down nav-caret" aria-hidden="true"></i></button>\n'
            '          <div class="mega-panel mega-cols-' + str(len(g["columns"])) + '" id="mega-' + g["id"] + '">\n'
            + "\n".join(cols) + '\n          </div>\n        </li>')
    items = "\n".join(rows)
    return f"""<header class="navbar">
    <div class="container nav-container">
      <a href="{rel(page, 'index.html')}" class="brand" aria-label="Embedded Systems Learning Portal">
        <div class="brand-icon" aria-hidden="true"><i class="fas fa-microchip"></i></div>
        <div class="brand-title">
          <span>EMBEDDED SYSTEMS</span>
          <span>LEARNING PORTAL</span>
        </div>
      </a>
      <ul class="nav-menu" aria-label="เมนูหลัก">
{items}
      </ul>
      <div class="nav-controls">
        <button id="theme-toggle" class="btn-icon theme-toggle" type="button" aria-label="สลับโหมดมืด/สว่าง" title="สลับโหมดมืด/สว่าง">
          <i class="fas fa-sun theme-icon-to-light" aria-hidden="true"></i>
          <i class="fas fa-moon theme-icon-to-dark" aria-hidden="true"></i>
        </button>
        <button class="btn-icon mobile-nav-toggle" type="button" aria-label="เมนูนำทาง" title="เมนูนำทาง" aria-controls="mobile-drawer" aria-expanded="false">
          <i class="fas fa-bars" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </header>"""


def drawer(page, active):
    act_group = group_of(active)
    rows = ["      <li>" + top_link(page, it, active, "nav-link") + "</li>" for it in TOP_LINKS]
    for g in NAV_GROUPS:
        items = []
        for heading, links in g["columns"]:
            if len(g["columns"]) > 1:  # a single-column group needs no sub-heading under its own summary
                items.append('            <li class="drawer-heading">' + heading + '</li>')
            items += ["            <li>" + mega_link(page, it, active, "mega-link") + "</li>" for it in links]
        rows.append('      <li>\n        <details class="drawer-group"' + (" open" if g["id"] == act_group else "") + '>\n'
                    '          <summary class="nav-link">' + g["drawer_label"]
                    + ' <i class="fas fa-chevron-down nav-caret" aria-hidden="true"></i></summary>\n'
                    '          <ul class="drawer-sublist">\n' + "\n".join(items) + '\n          </ul>\n'
                    '        </details>\n      </li>')
    return ('<div class="mobile-drawer" id="mobile-drawer" style="display: none;">\n'
            '    <ul class="drawer-list" aria-label="เมนูนำทาง">\n' + "\n".join(rows) + '\n    </ul>\n'
            '  </div><!-- /mobile-drawer -->')


def footer_github(s):
    m = re.search(r'(<div class="footer-links">)(.*?)(\n\s*</div>)', s, re.S)
    if not m:
        raise SystemExit("footer-links not found")
    inner = re.sub(r'\n\s*<a href="https://github\.com/[^"]*"[^>]*>.*?</a>', "", m.group(2), flags=re.S)
    ind = re.search(r"\n(\s*)<a ", inner)
    inner += "\n" + (ind.group(1) if ind else "        ") + (
        '<a href="' + GITHUB + '" target="_blank" rel="noopener noreferrer">'
        '<i class="fab fa-github" aria-hidden="true"></i> GitHub</a>')
    return s[:m.start(2)] + inner + s[m.end(2):]


def strip_tags(x):
    return htmlmod.unescape(re.sub(r"<[^>]+>", "", x)).strip()


def card_footers(s):
    """Footer = permalink id + category tags (filter labels, else ref-pill) + prev / top / next."""
    labels = {}
    for m in re.finditer(r'<button class="filter-btn[^"]*" data-category="([^"]+)"[^>]*>(.*?)</button>', s, re.S):
        if m.group(1) != "all":
            labels[m.group(1)] = re.sub(r"\s*\(\d+\)\s*\Z", "", strip_tags(m.group(2)))
    s = re.sub(r"\n\s*<footer class=\"card-footer\">[\s\S]*?</footer>(?=\s*</article>)", "", s)
    cards = list(re.finditer(r'<article class="solution-card"([^>]*)>([\s\S]*?)</article>', s))
    ids = [re.search(r'id="([^"]+)"', c.group(1)).group(1) for c in cards]
    out, last = [], 0
    for i, c in enumerate(cards):
        cat = re.search(r'data-category="([^"]+)"', c.group(1))
        tags = []
        for key in (cat.group(1).split() if cat else []):
            if key in labels and labels[key] not in tags:
                tags.append(labels[key])
        if not tags:
            pill = re.search(r'<span class="ref-pill">(.*?)</span>', c.group(2), re.S)
            if pill:
                tags.append(strip_tags(pill.group(1)))
        tag_html = "".join('<span class="card-footer-tag">' + htmlmod.escape(t, quote=False) + '</span>' for t in tags[:2])
        nav = []
        if i > 0:
            nav.append('<a href="#' + ids[i - 1] + '"><i class="fas fa-chevron-left" aria-hidden="true"></i> ก่อนหน้า</a>')
        nav.append('<a href="#page-top"><i class="fas fa-arrow-up" aria-hidden="true"></i> บนสุด</a>')
        if i < len(cards) - 1:
            nav.append('<a href="#' + ids[i + 1] + '">ถัดไป <i class="fas fa-chevron-right" aria-hidden="true"></i></a>')
        footer = ('          <footer class="card-footer">\n'
                  '            <div class="card-footer-meta"><a class="card-footer-id" href="#' + ids[i] + '">#' + ids[i] + '</a>' + tag_html + '</div>\n'
                  '            <nav class="card-footer-nav" aria-label="นำทางระหว่างข้อ">' + "".join(nav) + '</nav>\n'
                  '          </footer>\n        ')
        end = c.end() - len("</article>")
        out.append(s[last:end].rstrip() + "\n" + footer + "</article>")
        last = c.end()
    out.append(s[last:])
    return "".join(out)


CODE_NO_HEADER = re.compile(r'(<div class="code-wrapper">)\n([ \t]*)(<pre[\s\S]*?</pre>)')


def code_headers(s):
    def rep(m):
        ind, block = m.group(2), m.group(3)
        lang = "8051 Assembly (.asm)" if 'class="opcode"' in block else "Worked Calculation"
        return (m.group(1) + "\n" + ind + '<div class="code-header">\n' + ind + "  <span>" + lang + "</span>\n" + ind +
                '  <button class="btn-copy" type="button">Copy Code</button>\n' + ind + "</div>\n" + ind + block)
    return CODE_NO_HEADER.sub(rep, s)


def sync(page, s):
    active, questions = PAGES[page]
    s = re.sub(r'\s*<script id="theme-boot">[\s\S]*?</script>\n', "\n", s)
    s, n = re.subn(r'(<meta name="viewport"[^>]*>\n)', lambda m: m.group(1) + THEME_BOOT, s, count=1)
    if n != 1 or s.index('id="theme-boot"') > s.index('rel="stylesheet"'):
        raise SystemExit(page + ": theme boot must sit before the first stylesheet")
    s = re.sub(r'(assets/(?:css/(?:main|solution)\.css|js/main\.js))\?v=[0-9.]+', r"\1?v=" + ASSET_VER, s)
    s = re.sub(r'<header class="navbar">[\s\S]*?</header>', lambda m: header(page, active), s, count=1)
    if "<!-- /mobile-drawer -->" in s:
        s = re.sub(r'<div class="mobile-drawer"[\s\S]*?<!-- /mobile-drawer -->', lambda m: drawer(page, active), s, count=1)
    else:  # first run on the old flat drawer markup
        s = re.sub(r'<div class="mobile-drawer"[^>]*>[\s\S]*?</ul>\s*</div>', lambda m: drawer(page, active), s, count=1)
    if 'id="page-top"' not in s:
        s = s.replace('<main class="container"', '<main id="page-top" class="container"', 1)
    s = footer_github(s)
    if questions:
        s = card_footers(s)
    s = code_headers(s)
    s = re.sub(r'<button class="btn-copy">', '<button class="btn-copy" type="button">', s)
    s = re.sub(r'target="_blank"(?![^>]*rel=)', 'target="_blank" rel="noopener noreferrer"', s)
    return s


def main():
    check = "--check" in sys.argv
    drift = 0
    for page in PAGES:
        path = ROOT / page
        src = path.read_text(encoding="utf-8")
        out = sync(page, src)
        if out != src:
            drift += 1
            print(("DRIFT " if check else "updated ") + page)
            if not check:
                path.write_text(out, encoding="utf-8")
    print("pages in sync" if drift == 0 else ("%d page(s) %s" % (drift, "drift" if check else "updated")))
    sys.exit(1 if (check and drift) else 0)


if __name__ == "__main__":
    main()
