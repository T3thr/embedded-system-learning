# Design System — Embedded Systems Learning Portal

| Field | Value |
| :--- | :--- |
| Version | 3.2 (asset query string `?v=3.2`): site-wide grouped mega menu, fixed 63 px header |
| Date | 2026-09-28 |
| Scope | 11 portal pages: root, course dashboard, Midterm section (4 pages), Final section (5 pages) |
| Source of truth | [main.css](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/assets/css/main.css), [solution.css](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/assets/css/solution.css), [main.js](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/assets/js/main.js) |
| Page chrome generator | [sync_chrome.py](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/tools/sync_chrome.py) |
| Generated page | [tools/exam2025/](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/tools/exam2025/build.py) builds `1/final/real-exam/2025/index.html` (lessons, widgets, figures) |
| Verification | [check_asm.py](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/tools/check_asm.py), [check-layout.mjs](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/tools/check-layout.mjs) + [layout-check.html](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/tools/layout-check.html), [audit_content.py](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/tools/audit_content.py) |

When this document and the CSS disagree, the CSS is correct and this document is out of date: fix the document in the same change.

---

## 1. Design Principles

### 1.1 Anti-AI-Slop

- **Every element earns its place.** No decorative badges, no filler statistics, no "revolutionary" copy. A badge states a fact (question number, category, status).
- **One vocabulary.** Colors come from tokens, spacing from `--space-*`, radii from `--radius-*`. A new literal value in a component is a bug unless it is listed under the exceptions in section 4.
- **No emoji, ever.** Icons are Font Awesome 6 (`<i class="fas fa-..."></i>`) with `aria-hidden="true"` when decorative. A check mark is `fa-check`, not a Unicode dingbat.
- **Generated, not hand-copied, chrome.** Header, drawer, footer link and card footers are produced by `tools/sync_chrome.py` from one definition, so pages cannot drift apart.

### 1.2 Eye Comfort

- Dark theme (Slate/Navy) is the default. Light theme is warm **Paper**, not pure white, to cut glare during long study sessions.
- Body text meets WCAG AA (4.5:1) on every light surface. Measured contrast on paper `#fbf8f1`: primary text 16.8:1, secondary 9.8:1, muted `#5b6474` 5.6:1, link `#0369a1` 5.6:1.
- Code blocks stay dark in both themes so syntax colors never change meaning.
- The theme is applied before first paint (section 5.4). A light-theme reader never sees a dark flash.
- `prefers-reduced-motion` disables smooth scroll, hover lift and transitions.

### 1.3 Academic Rigor

- Every register fact, SFR address and timing formula traces to the course lectures or textbooks, cited on the card (for example `Lecture 5 · หน้า 4`).
- Standard clock: 12 MHz crystal, classic 12T 8051: `1 machine cycle = 12 / 12 MHz = 1.0 µs = 1 count`.
- Mathematics is Unicode plus inline code, never LaTeX and never dollar signs (section 7).
- Bit-mapped state values are shown in hex **and** binary: `P1 = ECH (1110 1100B)`.

---

## 2. Color Palette & Semantic Tokens

Tokens are defined on `:root` (dark) and overridden on `[data-theme="light"]` in `main.css`. `color-scheme` follows the theme so native scrollbars and form controls match.

### 2.1 Surfaces and text

| Token | Dark (Slate/Navy) | Light (Paper) | Use |
| :--- | :--- | :--- | :--- |
| `--bg-primary` | `#0b1120` | `#fbf8f1` | Page background |
| `--bg-secondary` | `#111a2e` | `#f4efe4` | Footer, inputs, diagram wells |
| `--bg-tertiary` | `#1e293b` | `#eae3d3` | Table header, disabled button |
| `--bg-card` | `#131d35` | `#fffefa` | Cards, toolbar, sidebar |
| `--bg-card-header` | `rgba(255,255,255,.03)` | `#f8f4ea` | Card header and card footer band |
| `--bg-glass` | `rgba(11,17,32,.85)` | `rgba(251,248,241,.9)` | Sticky header (with 16 px blur) |
| `--text-primary` | `#f8fafc` | `#0f172a` | Headings, body |
| `--text-secondary` | `#94a3b8` | `#334155` | Supporting copy, nav links |
| `--text-muted` | `#64748b` | `#5b6474` | Captions, meta |
| `--border-color` | `rgba(148,163,184,.12)` | `#e6dfcf` | All 1 px borders |

### 2.2 Accents

| Token | Dark | Light | Meaning |
| :--- | :--- | :--- | :--- |
| `--accent-blue` | `#38bdf8` | `#0369a1` | Links, active state, emphasis in solutions |
| `--accent-cyan` | `#06b6d4` | `#0e7490` | Brand subtitle, Timer section |
| `--accent-green` | `#10b981` | `#059669` | Success, official solution |
| `--accent-amber` | `#fbbf24` | `#d97706` | Warnings, FSM section (icons only in light mode) |
| `--accent-rose` | `#f87171` | `#dc2626` | Exam prompt, errors |
| `--accent-purple` | `#c084fc` | `#7c3aed` | Archive 2, analysis |
| `--accent-indigo` | `#818cf8` | `#4f46e5` | Brand gradient end |

### 2.3 Tier and tag colors

Each tag family has a text color, a tinted background and a border: `--tag-{red|blue|green|amber|purple}`, `--tag-*-bg`, `--tag-*-border`. They drive the three answer tiers (section 6), the `q-badge` variants and the callouts.

### 2.4 Code

| Token | Dark | Light |
| :--- | :--- | :--- |
| `--bg-code` | `#0a0f1d` | `#0f172a` |
| `--bg-code-header` | `#111a2e` | `#1e293b` |
| `--border-code` | `rgba(148,163,184,.15)` | `#334155` |

Syntax classes (fixed colors, both themes): `.comment #7c8aa0` italic, `.directive #f472b6`, `.opcode #38bdf8`, `.operand #a5b4fc`, `.immediate #34d399`, `.address #fbbf24`.

---

## 3. Typography

| Role | Family | Token |
| :--- | :--- | :--- |
| Thai body and headings | Prompt 300–700 | `--font-thai` |
| Latin UI text | Inter 300–800 | `--font-main` |
| Assembly, registers, formulas | Fira Code 400–700, fallback JetBrains Mono | `--font-mono` |

Fonts load from Google Fonts through the `@import` at the top of `main.css` with `display=swap`. The header is verified to fit both before and after the swap (section 5.3).

| Element | Size | Weight | Line height |
| :--- | :--- | :--- | :--- |
| Hero title | 2.25rem (1.85rem at 840 px, 1.6rem at 480 px) | 800 | 1.25 |
| Course card title | 1.35rem | 700 | default |
| Question card title | 1.15rem (1.05rem at 640 px) | 700 | 1.35 |
| Solution body (`.content-block`) | 0.95rem | 400 | 1.68 |
| Analysis tier text | 0.92rem | 400 | 1.6 |
| Nav link | 0.84rem | 500 | default |
| Mega menu item title / description | 0.88rem / 0.76rem | 600 / 400 | 1.35 |
| Meta, captions, badges | 0.75–0.85rem | 500–700 | default |
| Code block | 0.86rem (0.78rem at 480 px) | 400–600 | 1.6 |

At 480 px and below the root font size drops to 15 px; interactive controls keep their pixel sizes.

---

## 4. Spacing, Elevation & Radii

### 4.1 Spacing scale (8 px grid, 4 px half step)

| Token | Value | Typical use |
| :--- | :--- | :--- |
| `--space-1` | 4px | Icon-to-label gap, pill vertical padding, TOC item gap |
| `--space-2` | 8px | Badge gaps, filter pill padding, breadcrumb gap |
| `--space-3` | 12px | Header vertical padding, table cell padding, card footer band |
| `--space-4` | 16px | Card header vertical padding, callout vertical padding |
| `--space-5` | 24px | Card body padding, card horizontal inset, grid gaps |
| `--space-6` | 32px | Section and hero rhythm, footer top padding |
| `--space-8` | 48px | Space below a portal grid |

**Documented exceptions** (anything else is a bug):

- `.container` gutter `1.25rem` (`--container-gutter`, 12 px at 480 px and below).
- `.nav-link` padding `0.35rem 0.6rem`.
- 2 px micro padding inside small pills (`ref-pill`, `card-footer-tag`, code language badge).
- 4 px left rule on the tier panels and callouts.
- Inline `style="..."` spacing that predates version 3.0 in page content. New work uses tokens.

### 4.2 Layout tokens and breakpoints

| Token | Value |
| :--- | :--- |
| `--container-max` | 1240px |
| `--nav-height` | 63px (12 px padding × 2 + 38 px control + 1 px border; brand title line-height 1.15 keeps it constant) |

| Breakpoint | Effect |
| :--- | :--- |
| ≤ 480 px | 15 px root font, 12 px gutter, compact card padding |
| ≤ 640 px | Card header/body/footer use `--space-3` / `--space-4` |
| ≤ 840 px | Desktop menu hidden, hamburger + grouped drawer shown |
| 841–960 px | Brand title hidden, brand icon kept |
| ≤ 960 px | Sidebar TOC hidden, floating TOC button shown |

### 4.3 Grid

`.portal-grid`: `repeat(auto-fit, minmax(min(320px, 100%), 1fr))`, gap `--space-5`. The `min()` keeps a single column from overflowing phones narrower than 368 px. `.portal-grid--dense` uses 240 px for four-up summary cards.

### 4.4 Elevation and radii

| Token | Dark | Light (warm shadow) |
| :--- | :--- | :--- |
| `--shadow-sm` | `0 2px 8px rgba(0,0,0,.25)` | `0 1px 3px rgba(60,45,20,.06)` |
| `--shadow-md` | `0 4px 20px rgba(0,0,0,.35)` | `0 4px 15px rgba(60,45,20,.08)` |
| `--shadow-lg` | `0 10px 30px -5px rgba(0,0,0,.5)` | `0 10px 25px -5px rgba(60,45,20,.1)` |

Radii: `--radius-sm` 8px (buttons, badges), `--radius-md` 12px (panels, code), `--radius-lg` 18px (cards), `--radius-full` for pills.

---

## 5. Navigation & Header Architecture

### 5.1 One menu for the whole site

`[Brand icon + title]  →  [หน้าแรก | 305341 Embedded 1 | ข้อสอบ Midterm ▾ | ข้อสอบ Final ▾]  →  [Theme toggle + Hamburger]`

Every page shows the **same** menu. Earlier versions swapped the menu by section (Midterm pages linked Midterm Hub, Final pages linked Final Hub), which left readers unsure where they were. Now only the highlight moves:

- the group of the current page (`ข้อสอบ Midterm` or `ข้อสอบ Final`) gets `.active` on its trigger
- the current page's link gets `.active` and `aria-current="page"`

The context row (breadcrumbs) is the first element inside `<main id="page-top">`, directly under the sticky header, not inside the bar.

### 5.2 Groups and entries

Defined once in `NAV_GROUPS` in `tools/sync_chrome.py`. Each entry has a title, a one-line description and a Font Awesome icon.

| Group | Column | Entries |
| :--- | :--- | :--- |
| ข้อสอบ Midterm | ข้อสอบกลางภาค | Midterm Hub · 01. แนวข้อสอบความจำ 26 ข้อ · 02. ข้อสอบจริงกลางภาค 2561 · 03. บทเรียนแนวข้อสอบวิเคราะห์ |
| ข้อสอบ Final | คลังข้อสอบจริง | Final Hub · ชุดที่ 1: เฉลย 56 ข้อ · ชุดที่ 2: ข้อสอบจริง 2025 |
| ข้อสอบ Final | ฝึกปฏิบัติ | Interactive Lab · FSM Sliding Door |

External links (the GitHub repository) live only in the footer, with `target="_blank" rel="noopener noreferrer"`.

### 5.3 Desktop mega menu (≥ 841 px)

```html
<li class="nav-group" data-group="final">
  <button type="button" class="nav-link nav-group-toggle active" aria-expanded="false" aria-controls="mega-final">
    ข้อสอบ Final <i class="fas fa-chevron-down nav-caret" aria-hidden="true"></i>
  </button>
  <div class="mega-panel mega-cols-2" id="mega-final">
    <div class="mega-col">
      <p class="mega-heading">คลังข้อสอบจริง</p>
      <ul class="mega-list"><li><a class="mega-link" href="…">icon + title + description</a></li></ul>
    </div>
  </div>
</li>
```

- The panel is anchored to the header container's right gutter, so it never leaves the viewport. Its width is `min(400px | 620px, container width)` for one or two columns.
- Behavior in `main.js`: click or tap toggles; mouse hover opens with a 180 ms close delay so the pointer can cross the gap; Escape closes and returns focus to the trigger; focus leaving the group or a click outside closes it; only one panel is open at a time. `aria-expanded` always matches the visible state.

### 5.4 Mobile (≤ 840 px): hamburger + grouped drawer

The hamburger opens `#mobile-drawer`. Top links come first, then one native `<details class="drawer-group">` per group, using the same entries with icons and descriptions. The current page's group renders `open`. Multi-column groups show their column headings. The drawer closes on link tap or Escape and sets `aria-expanded` on the hamburger.

### 5.5 Zero-overflow contract (tested)

`.brand` and `.nav-controls` do not shrink; `.nav-menu` has `min-width: 0`. With four top-level items the bar has at least 128 px to spare at 845 px (114 px in the fallback-font sweep). Assertions at every width:

- `brand.right ≤ navMenu.left`, `navMenu.right ≤ navControls.left`, `navControls.right ≤ innerWidth`
- every top-level item lies between `brand.right` and `navControls.left` on one line, and the menu has no clipped content
- every mega panel, when opened, lies inside `0 … innerWidth`
- `document.documentElement.scrollWidth ≤ innerWidth`

These run at 845 / 900 / 1000 / 1280 / 1440 px, at 360 / 390 / 768 px, and as a sweep from 841 to 1440 px in 7 px steps, once with web fonts and once with fallback fonts forced.

### 5.6 Theme boot contract

Every page's `<head>` has this as its first script, placed after the viewport meta and before any stylesheet:

```html
<script id="theme-boot">
  (function () {
    var theme = 'dark';
    try { theme = localStorage.getItem('theme') || 'dark'; } catch (e) {}
    if (theme !== 'light' && theme !== 'dark') theme = 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  })();
</script>
```

- `main.js` never re-applies the theme on load. It only wires the click handler, persists the choice, syncs `aria-pressed` and `aria-label`, and follows `storage` events from other tabs.
- The toggle renders both icons, `.theme-icon-to-light` (sun) and `.theme-icon-to-dark` (moon). CSS shows the right one from `[data-theme]`, so the icon is also correct on first paint.
- The test injects a probe right before the first stylesheet and asserts `data-theme` equals the stored value there, for both `light` and `dark`.

### 5.7 Footer

`.footer-links` holds section links, with the GitHub link always last. The root page and the dashboard keep their extra attribution line.

---

## 6. Question Card & Solution Architecture

### 6.1 Anatomy

```html
<article class="solution-card" id="q12" data-category="serial">
  <div class="card-header">
    <div class="card-title-group">
      <span class="q-badge red">ข้อ 12</span>
      <h3 class="card-title">…</h3>
    </div>
    <span class="ref-pill">ตอนที่ 3</span>
  </div>
  <div class="card-body">
    <div class="section-recalled">…</div>       <!-- Tier 1 -->
    <div class="section-senior-draft">…</div>   <!-- Tier 2 -->
    <div class="section-official">…</div>       <!-- Tier 3 -->
  </div>
  <footer class="card-footer">…</footer>         <!-- generated -->
</article>
```

The header, body and footer share one 24 px horizontal inset (`--space-5`), so the badge, the tier panels and the footer tags line up vertically. Inside `.solutions-container` the container gap (24 px) owns the space between cards, and the card margin is 0.

### 6.2 The three tiers

| Tier | Class | Color | Header text | Content |
| :--- | :--- | :--- | :--- | :--- |
| 1. Memory recalled | `.section-recalled` | Red | โจทย์จากกระดาษข้อสอบ | The prompt as printed or recalled, plus the media source |
| 2. Senior draft / analysis | `.section-senior-draft` | Blue | โน้ตรุ่นพี่ / วิเคราะห์ทฤษฎี | What students wrote, lecture citations, traps (`.box-warning`) |
| 3. Official engineering derivation | `.section-official` | Green | เฉลยฉบับวิศวกรรม | Step-by-step math, tables, verified assembly, final answer line |

Badge colors: `q-badge red | blue | green | amber | purple`, all backed by tag tokens. Callouts: `.box-warning` (amber, traps and pitfalls) and `.box-info` (blue, extensions and cross-references).

### 6.3 Metadata footer

`tools/sync_chrome.py` generates it for question pages:

- `#id` permalink (`.card-footer-id`)
- up to two category tags, taken from the page's filter-button labels for the card's `data-category` tokens (falling back to the `ref-pill` text)
- ก่อนหน้า / บนสุด / ถัดไป links (`#page-top` is the `<main>` element)

Do not hand-write card footers. Re-run the generator after adding, removing or reordering cards.

### 6.4 Filters, search and TOC

- Filter buttons: `<button class="filter-btn" data-category="key">Label (N)</button>`. A card matches when its space-separated `data-category` contains the key.
- The count element is `#match-count`, and `main.js` writes the number only.
- `.sidebar-toc .toc-item` links drive the scroll spy and the mobile TOC modal. Group headings use `li.toc-group` so they are not counted as questions.

---

## 7. Code Block & Mathematical Representation

### 7.1 Code block

```html
<div class="code-wrapper">
  <div class="code-header">
    <span>8051 Assembly (.asm)</span>
    <button class="btn-copy" type="button">Copy Code</button>
  </div>
  <pre class="code-content"><code><span class="opcode">MOV</span> <span class="operand">TMOD</span>, <span class="immediate">#01H</span> <span class="comment">; Timer 0 Mode 1</span></code></pre>
</div>
```

- The language badge and copy button sit top-right. Copy uses the Clipboard API with a `textarea` fallback for `file://`, and shows Copied (green) or Copy failed (red) for 2 seconds.
- Fira Code with ligatures (`liga`, `calt`), line height 1.6, tab size 8.
- Horizontal scroll shows edge shadows only while code is hidden on that side (local and scroll background layers).
- Assembly never uses the dollar sign for "current address". Write a label: `HERE: SJMP HERE`, `WAIT: JNB TF0, WAIT`.

### 7.2 Math and notation

| Write | Not |
| :--- | :--- |
| `1 machine cycle = 12 / 12 MHz = 1.0 µs` | LaTeX commands or dollar-delimited math |
| `Count = FFFFH − N + 1` (U+2212 minus) | ASCII hyphen as a minus sign in formulas |
| `2¹⁶ = 65,536`, `T₀`, `PC<sub>next</sub>` | `2^16`, `PC_next` |
| `×  ÷  ±  ≤  ≥  ≠  ≈  →  ⇒  Ω  µ` | `*`, `->`, `<=`, `x` |
| `4.7–10 kΩ` (en dash for ranges) | `4.7 - 10 kOhm` |

- Formulas with an operator go in inline `<code>`, which renders as a quiet mono chip. Units and single symbols in running prose stay plain text.
- Bit-mapped state values (`P0`–`P3`, `TMOD`, `TCON`, `SCON`, `IE`, `IP`, `PCON`, `PSW`, and `A`/`B` in bitwise answers) show hex and binary: `P1 = ECH (1110 1100B)`, `TMOD = 01H (0000 0001B)`.
- Counts, addresses and pointers stay hex only (`TH0 = FFH`, `R0 = 30H`), because binary adds nothing there.
- Timer loads always show the derivation: `N = 100 = 64H → FFFFH − 64H + 1 = FF9CH → TH0 = FFH, TL0 = 9CH`.

---

## 7b. Deep Lessons & Interactive Widgets

The 2025 real-exam page is **generated**: edit `tools/exam2025/lessons_p*.py`, `widgets.py` or `figures.py`, then run `python3 tools/exam2025/build.py` (it pipes the result through `sync_chrome.py`). Never hand-edit that `index.html`.

- **Deep lesson**: `<details class="deep-lesson">` after the official tier. Sections in order: terminology (with Thai pronunciation), physics & silicon, analogy **plus its stated limits**, step-by-step derivation, assembly analysis (only when the question has code: cycles from the MCS-51 table and PSW flags), what-if, traps, drill with `<details class="drill-answer">`, full-mark blueprint, sources with page numbers.
- **Source honesty**: a fact that comes from the 8051 datasheet or MCS-51 instruction table rather than the course material carries `<span class="src-tag">`. The Mazidi book in this repo is the AVR edition; cite its chapters as concept references.
- **Widgets** (`.widget`, markup in `widgets.py`, behavior in `exam2025.js`) use native labelled controls, work by keyboard, and expose their pure calculations on `window.Exam2025` so results can be asserted.
- **Simulator** (`sim8051.js`): counts machine cycles per the MCS-51 table and ticks Timer 0 once per cycle. Timing figures quoted in lessons (for example the 288 µs Go state) must come from this model, not estimates.
- `[hidden]` always wins over component `display` rules (base rule in `main.css`).

## 8. Contributor Checklist (humans and AI agents)

### 8.1 Adding an exam set or lab module

1. **Ground the content first.** Transcribe from the source media, then cite the lecture or textbook page for every fact. Do not invent questions to fill a category.
2. **Create the page** from the closest sibling (for example `1/final/real-exam/2025/index.html`). Keep the `<head>` order: charset, viewport, `#theme-boot`, title, meta, stylesheets.
3. **Register it** in `PAGES` in `tools/sync_chrome.py` with its active key. If it needs a menu entry, add one line (title, description, target, key, icon) to the right column of `NAV_GROUPS`. Do not add top-level links: new sections become a new group.
4. **Build cards** with the anatomy in section 6.1: unique `id`, `data-category` keys that match filter buttons, all three tiers.
5. **Write math and code** by section 7: no dollar signs, no LaTeX, no emoji, hex + binary for state bytes, labels instead of the dollar-sign current-address form.
6. **Run** `python3 tools/sync_chrome.py`. It writes the header, drawer, footer link, card footers and code headers.
7. If you changed anything in `assets/`, bump `ASSET_VER` in `sync_chrome.py` and run it again.
8. **Verify:**
   - `python3 tools/audit_content.py` must end with `RESULT: PASS`
   - `python3 tools/check_asm.py <page>` for any page with assembly must end with `RESULT: PASS`
   - `python3 -m http.server 8000 --directory <embedded-system>` then `node tools/check-layout.mjs` must end with `RESULT: PASS`
   - Look at the page in both themes at 390 px and 1280 px.
9. **Update this document** if you added a token, component or rule.

### 8.2 Never

- Inline colors or new spacing literals in components (use tokens).
- A per-section menu, a second header variant, hand-edited nav links, or a GitHub link in the header.
- `target="_blank"` without `rel="noopener noreferrer"`.
- Theme logic in `DOMContentLoaded`.
- Emoji, LaTeX, or the dollar sign anywhere in pages, assets, tools or documentation.
