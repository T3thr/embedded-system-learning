#!/usr/bin/env python3
"""Content & markup audit for the portal (run from anywhere): python3 tools/audit_content.py

Checks every portal page plus shared assets, tools and DESIGN_SYSTEM.md for:
  - zero dollar signs, zero LaTeX commands, zero emoji
  - balanced HTML (no stray or unclosed tags), unique ids
  - local links and #anchors resolve, target=_blank always carries rel
  - one site-wide desktop menu (links + mega panels), identical on every page apart from the active item
Exit code 0 on PASS, 1 on FAIL.
"""
import hashlib
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent
PAGES = [
    "index.html", "1/index.html",
    "1/midterm/index.html", "1/midterm/recalled-questions/index.html",
    "1/midterm/real-exam-2561/index.html", "1/midterm/analytical-questions/index.html",
    "1/final/index.html", "1/final/real-exam-recalled/index.html", "1/final/real-exam/2025/index.html",
    "1/final/interactive-tools/index.html", "1/final/fsm-sliding-door-project/index.html",
]
TEXT_FILES = PAGES + [
    "assets/css/main.css", "assets/css/solution.css", "assets/js/main.js",
    "tools/layout-check.html", "tools/check-layout.mjs", "tools/audit_content.py", "tools/sync_chrome.py",
    "DESIGN_SYSTEM.md",
]
DOLLAR = chr(36)
EMOJI = re.compile("[\U0001F300-\U0001FAFF\U0001F000-\U0001F2FF\u2600-\u27BF\u2B50\u2B06\u2705\u274C\uFE0F\u200D]")
LATEX = re.compile(r"\\(?:rightarrow|leftarrow|Rightarrow|times|frac|cdot|mu|Omega|leq|geq|neq|approx|text|mathrm|mathbf|div|pm|sqrt|quad)\b")
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr",
        "path", "circle", "line", "rect", "polygon", "polyline", "stop", "ellipse", "use"}


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack, self.errors, self.ids, self.links, self.blank_no_rel = [], [], set(), [], 0

    def _attrs(self, attrs):
        a = dict(attrs)
        if "id" in a:
            if a["id"] in self.ids:
                self.errors.append("duplicate id " + a["id"])
            self.ids.add(a["id"])
        for k in ("href", "src"):
            if a.get(k):
                self.links.append(a[k])
        if a.get("target") == "_blank" and "noopener" not in (a.get("rel") or ""):
            self.blank_no_rel += 1

    def handle_starttag(self, tag, attrs):
        self._attrs(attrs)
        if tag not in VOID:
            self.stack.append((tag, self.getpos()))

    def handle_startendtag(self, tag, attrs):
        self._attrs(attrs)

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        if not self.stack or self.stack[-1][0] != tag:
            self.errors.append("unexpected </%s> at line %d" % (tag, self.getpos()[0]))
            for i in range(len(self.stack) - 1, -1, -1):
                if self.stack[i][0] == tag:
                    del self.stack[i:]
                    break
            return
        self.stack.pop()


def parse(path, cache):
    key = path.resolve()
    if key not in cache:
        p = Page()
        p.feed(path.read_text(encoding="utf-8"))
        cache[key] = p
    return cache[key]


def nav_signature(src):
    m = re.search(r'<ul class="nav-menu"[^>]*>([\s\S]*?)</ul>\s*<div class="nav-controls">', src)
    if not m:
        return None
    labels = re.findall(r'class="(?:nav-link|mega-title|mega-desc|mega-heading)[^"]*"[^>]*>([^<]+)<', m.group(1))
    return hashlib.sha1("|".join(labels).encode("utf-8")).hexdigest()[:10]


def main():
    failures = []
    cache = {}
    for rel in TEXT_FILES:
        path = ROOT / rel
        if not path.exists():
            failures.append(rel + ": missing")
            continue
        text = path.read_text(encoding="utf-8")
        for n, line in enumerate(text.split("\n"), 1):
            if DOLLAR in line:
                failures.append("%s:%d dollar sign" % (rel, n))
            if EMOJI.search(line):
                failures.append("%s:%d emoji" % (rel, n))
            if LATEX.search(line):
                failures.append("%s:%d LaTeX command" % (rel, n))

    nav_sets = {}
    for rel in PAGES:
        path = ROOT / rel
        page = parse(path, cache)
        unclosed = [t for t in page.stack if t[0] not in ("html", "body")]
        failures += [rel + ": " + e for e in page.errors]
        if unclosed:
            failures.append(rel + ": unclosed " + ", ".join(t[0] for t in unclosed[:5]))
        if page.blank_no_rel:
            failures.append("%s: %d target=_blank without rel=noopener" % (rel, page.blank_no_rel))
        for link in page.links:
            u = urlsplit(link)
            if u.scheme in ("http", "https", "mailto", "data"):
                continue
            target = (path.parent / unquote(u.path)).resolve() if u.path else path.resolve()
            if not target.exists():
                failures.append("%s: broken link %s" % (rel, link))
            elif u.fragment and target.suffix == ".html" and u.fragment not in parse(target, cache).ids:
                failures.append("%s: missing anchor %s" % (rel, link))
        nav_sets.setdefault("site", set()).add(nav_signature(path.read_text(encoding="utf-8")))

    for section, sigs in nav_sets.items():
        if len(sigs) != 1:
            failures.append("%s nav drift: %d different desktop menus" % (section, len(sigs)))

    print("audited %d text files, %d pages, nav sets %s" % (len(TEXT_FILES), len(PAGES),
          {k: sorted(v) for k, v in nav_sets.items()}))
    for f in failures:
        print("FAIL " + f)
    print("RESULT: " + ("FAIL (%d)" % len(failures) if failures else "PASS"))
    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    main()
