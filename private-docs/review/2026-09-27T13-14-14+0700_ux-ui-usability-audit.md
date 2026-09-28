# UX / UI / Usability Audit — Embedded Systems Learning Portal

| Field | Value |
|---|---|
| **Document timestamp** | **2026-09-27T13:14:14+0700** |
| **Audit window** | 2026-09-27 13:12:07 +07 → 2026-09-27 13:14:14 +07 |
| **Auditor** | MiMoCode (pair-programming agent) |
| **Scope** | UX / UI / Usability / IA / Responsive / Design System / A11y |
| **Out of scope** | ความถูกต้องของเนื้อหาวิชาการ (8051 theory correctness) |
| **Purpose** | ส่งต่อให้ coding agent ระดับสูงใช้เป็น spec ในการ refactor ก่อนแชร์ให้รุ่นน้อง |
| **Severity scale** | **P0** = ขายหน้าถ้าแชร์ / **P1** = พังจริงบนอุปกรณ์จริง / **P2** = คุณภาพต่ำกว่ามาตรฐานโลก / **P3** = polish |

---

## 0. Verdict (สรุปสั้น)

**สภาพปัจจุบันยังไม่พร้อมแชร์แบบ public** — ถ้าเปิดบนมือถือหรือจอยักษ์ หรือให้คนที่เคยเห็นเว็บดี ๆ มาเห็น จะถูกตีตราว่า "AI slop ไม่ผ่าน QC" ได้จริง

สิ่งที่ดีอยู่แล้ว: content structure (3-tier cards), dark theme palette, มี CSS tokens บางส่วน, มี sticky navbar / sidebar TOC แนวคิดถูก

สิ่งที่พัง: **ไม่มี design system ที่ถูกบังคับใช้จริง** (มีแค่ไฟล์ CSS แต่ทุกหน้า dump inline style / local class เอง), **nav ล้นและ IA ไม่สม่ำเสมอ**, **theme flicker ทุก navigation**, **responsive ทำแบบขอไปที**, **floating TOC มี CSS แต่ไม่มี HTML/ปุ่มจริง**, **Final portal ยังโผล่เป็น "Coming Soon" บนหน้า course hub**

**Grade ปัจจุบัน (ความ UX/UI เท่านั้น): C- / D+**  
**เป้าหมายหลังแก้: A- (world-class docs portal)**

---

## 1. ขอบเขตการตรวจ + ไฟล์ที่ audit

### 1.1 Portal surface หลัก (แก้ UX ที่นี่ก่อน)

| Page | Path | Bytes |
|---|---|---|
| Root hub | `embedded-system/index.html` | 8,166 |
| Course hub | `embedded-system/1/index.html` | 9,836 |
| Midterm hub | `1/midterm/index.html` | 11,090 |
| Midterm recalled | `1/midterm/recalled-questions/index.html` | 119,725 |
| Midterm real exam 2561 | `1/midterm/real-exam-2561/index.html` | 60,746 |
| Midterm analytical | `1/midterm/analytical-questions/index.html` | 89,877 |
| Final hub | `1/final/index.html` | 34,565 |
| Final 56 Q | `1/final/real-exam-recalled/index.html` | 207,193 |
| Final interactive lab | `1/final/interactive-tools/index.html` | 84,878 |
| Final FSM project | `1/final/fsm-sliding-door-project/index.html` | 113,155 |

### 1.2 Shared assets (design system ที่ควรเป็น single source of truth)

| Asset | Path | Bytes |
|---|---|---|
| Core CSS | `embedded-system/assets/css/main.css` | 12,472 |
| Solution CSS | `embedded-system/assets/css/solution.css` | 15,252 |
| Shared JS | `embedded-system/assets/js/main.js` | 10,897 |

### 1.3 Off-system pages (อยู่ใน repo แต่คนละดีไซน์ — ต้องตัดออกจากสารบัญหรือแยกโฟลเดอร์)

- `1/mini-project/index.html` — design ใหม่ทั้งหมด ไม่ใช้ `main.css`
- `1/LAB/lab2_traffic_light_state_diagram.html` — standalone app UI
- `1/mini-project/output/version2/**` — มี `vishay.html` (768 KB) และ `pololu.html` ซึ่งเป็น **หน้า scrape/vendor ที่หลุดเข้ามาใน repo** → ถ้า zip ทั้งโฟลเดอร์ไปให้รุ่นน้องจะดูเหมือน dump ขยะ / ละเมิดลิขสิทธิ์

---

## 2. สิ่งที่ผู้ใช้รายงานมา — ยืนยันด้วยหลักฐานในโค้ด

### 2.1 "ไม่มี design system / UI เละเทะ" — **CONFIRMED (P0)**

**ความจริง:** มีไฟล์ชื่อ design system (`main.css`, `solution.css`) แต่ **ไม่มีการบังคับใช้**

| Evidence | Detail |
|---|---|
| Class ที่ HTML ใช้แต่ **ไม่มีใน CSS กลาง** | **426 classes** (รวม scrap pages) — ใน portal หลักเองก็มีหลายสิบ class ที่ประกาศใน `<style>` หน้านั้น ๆ เช่น `pillar-card`, `link-chip`, `high-yield-table`, `calc-panel`, `countdown-grid`, `mission-banner` |
| Page-local `<style>` | `final/index.html` 4,364 chars · `final/interactive-tools/index.html` 9,772 chars · `final/fsm-sliding-door-project/index.html` 2,262 chars |
| Inline `style="..."` ใน HTML | **หน้าที่หนักที่สุด:** `midterm/recalled-questions` = **125 ครั้ง**, `midterm/analytical-questions` = 23, `midterm/real-exam-2561` = 26, `final/*` = 23–32 ต่อหน้า |
| Hardcoded hex ใน HTML แทน CSS variable | `#7c3aed`, `#4f46e5`, `#dc2626`, `#ea580c`, `#d97706`, `#ca8a04`, `#f87171`, `#38bdf8` ฯลฯ — ทำให้ **light theme เพี้ยน** ทันที (สี gradient ไม่ follow token) |
| Class ชื่อชนกัน | หน้า `midterm/real-exam-2561` ใช้ `.section-senior` (3 จุด) แต่ CSS นิยาม `.section-senior-draft` → **บล็อกสีฟ้าไม่มีสไตล์จริง** |
| `!important` | main.css 5 จุด + solution.css 3 จุด — กลิ่น specificity war |
| ไม่มี spacing/typography scale | ไม่มี `clamp()`, ไม่มี `--space-*`, ไม่มี type ramp — ทุกอย่าง hardcode `0.85rem`, `1.35rem` กระจายทั้งไฟล์ |

**ผลกระทบที่ผู้ใช้เห็น:** "ไม่มี design system" = มี stylesheet แต่ UI ทุกหน้าหน้าตาไม่เหมือนกัน เพราะแต่ละหน้าแต่งเอง

---

### 2.2 "header/nav bar พัง เบียดกัน" — **CONFIRMED (P0)**

| Evidence | Detail |
|---|---|
| จำนวน link ใน desktop nav | **7 items** บน root / course / midterm ทุกหน้า (ยาวสุด label 29 ตัวอักษรไทย: `03. บทเรียนแนวข้อสอบวิเคราะห์`) |
| ไม่มี overflow strategy | `.nav-menu { display:flex; gap:0.5rem }` ไม่มี collapse, dropdown, "More", หรือ horizontal scroll |
| Breakpoint ที่ซ่อนเมนู | `@media (max-width: 840px)` — ช่วง **841–1100px (tablet landscape / เล็ก)** ยังโชว์ 7 items เต็ม → **เบียด/ตัด/หักบรรทัด** |
| `.nav-link { white-space: nowrap }` | ป้องกัน wrap แต่ไม่มีที่พอ = overflow ออกนอก container |
| `mobile-nav-toggle { display: none !important }` + media show | ใช้ `!important` คุมทั้งคู่ = fragile |
| Drawer top คงที่ | `.mobile-drawer { top: 58px }` — **magic number** ไม่ sync กับ height จริงของ navbar (`padding 0.75rem*2 + brand 36px ≈ 52–60px`) ถ้าปรับ font/brand จะเหลื่อม |
| Drawer ใช้ inline `style="display: none;"` ทุกหน้า | **รบกับ CSS** `.mobile-drawer { display:none }` / `.active { display:block !important }` และ JS toggle — สามทางแย่งกัน |
| IA ไม่ consistent ข้าม section | Nav ของ midterm มีลิงก์ midterm ย่อย 3 ตัว / Nav ของ final ตัดออกเหลือ lab + FSM — **ผู้ใช้หลงทาง** เพราะสารบัญเปลี่ยนเมื่อข้าม section |
| `target="_blank"` ไม่มี `rel="noopener"` | ทุกหน้าที่มี GitHub link (**security + a11y smell**) |

**โครง nav ปัจจุบัน (root):**
`หน้าแรก | 305341 Embedded 1 | ข้อสอบ Midterm | 01. แนวข้อสอบ 26 ข้อ | 02. ข้อสอบจริง 2561 | 03. บทเรียนแนวข้อสอบวิเคราะห์ | GitHub`
→ ลึกเกินไปสำหรับ top-level (สิ่งที่ควรอยู่ใน sidebar หรือ dropdown "Midterm")

---

### 2.3 "ไม่มีความ responsive" — **CONFIRMED (P1)**

| Evidence | Detail |
|---|---|
| Breakpoint ไม่สม่ำเสมอ | `main.css`: 840px / 480px · `solution.css`: 960px / 640px / 480px — **คนละระบบ** |
| Sidebar TOC | `260px + minmax(0,1fr)` ตายตัว — ไม่มี intermediate step (tablet ควรมี 220px หรือ drawer) |
| ไม่มี fluid type | `hero-title` 2.25rem → 1.85rem → 1.6rem (step) ไม่มี `clamp(1.5rem, 4vw, 2.5rem)` |
| Stats/portal grid | `minmax(180px|300px, 1fr)` พอใช้ แต่ card badge absolute + long Thai title = **ทับกันบนจอแคบ** |
| Code blocks | `overflow-x: auto` มี แต่ไม่มี max-height + fade/copy affordance ที่ชัด — โค้ดยาว (Q25/Q56) ต้องลากไกล |
| Table | `min-width: 520px` + horizontal scroll — OK แต่ไม่มี sticky header / scroll shadow / "ลากเพื่อดู" hint |
| ไม่มี `viewport-fit` / safe-area | iPhone notch / home indicator ไม่ได้คิดถึง floating button |
| Floating TOC | CSS โชว์ปุ่มที่ `max-width: 960px` แต่ **หน้า HTML ส่วนใหญ่ไม่มี `#mobile-toc-toggle`** → **สารบัญมือถือหาย** (ดู 2.6) |

---

### 2.4 "theme flickering" — **CONFIRMED (P0)**

**Root cause (หลักฐานในโค้ด):**

1. ทุกหน้า hardcode `<html lang="th" data-theme="dark">` ใน markup
2. `assets/js/main.js` → `initTheme()` ทำงานบน **`DOMContentLoaded`** (หลัง paint แล้ว) แล้วค่อย `localStorage.getItem('theme')`
3. **ไม่มี blocking theme bootstrap ใน `<head>`**
4. Icon ปุ่ม theme hardcode `<i class="fas fa-sun">` แล้ว JS ค่อยสลับ — เห็น icon ผิด 1 เฟรม
5. ไม่มี `prefers-color-scheme` และไม่มี `color-scheme: dark light` ใน CSS

**ลำดับการกระพริบที่ผู้ใช้เจอ:**
`paint dark` → `main.js โหลด (CDN font + FA + js)` → `DOMContentLoaded` → ถ้าเคยเลือก light → **กระพริบเป็น light** → icon ค่อยเปลี่ยน

**Fix ที่ต้องทำ:**
- Inline script ใน `<head>` (ก่อน CSS paint) ที่อ่าน `localStorage` / `matchMedia` แล้ว set `data-theme`
- CSS: `:root { color-scheme: dark }` / `[data-theme="light"] { color-scheme: light }`
- Icon ต้อง derive จาก theme ตั้งแต่ render (หรือใช้ CSS mask แทน FA icon)
- ห้ามรอ `DOMContentLoaded` สำหรับ theme

---

### 2.5 "padding / margin เละ อึดอัด" — **CONFIRMED (P1)**

| Evidence | Detail |
|---|---|
| ไม่มี space scale | ทุก component ใช้เลขลอย: `0.85rem`, `1.15rem`, `1.35rem`, `1.75rem`, `2.25rem` |
| Hero padding ถูก override ด้วย inline | `style="padding: 1rem 0 1.5rem; text-align: left;"` / `style="padding-top: 1rem;"` |
| Card body gap | `gap: 1.25rem` ระหว่าง 3-tier + padding `1.35rem` = แน่นเมื่อซ้อนหลายชั้น (แดง/ฟ้า/เขียว ชิดกันเกิน) |
| Solution card stacking | `margin-bottom: 1.75rem` ระหว่าง 56 การ์ด = ยาวมาก ไม่มี section breathing room ที่ 2–3rem |
| Footer | `padding: 2rem 0 1.5rem` แต่ main ไม่มี `padding-bottom` สม่ำเสมอ (บางหน้า inline `padding-bottom: 4rem`) |
| Thai line-height | 1.65 ทั่วไป OK แต่ dense code/table ไม่แยก scale |
| `html { font-size: 15px }` ที่ 480px | ย่อทั้งหน้า = **ทุกอย่างเล็กลง** รวม control ที่ควรคง 44px touch target |

---

### 2.6 "ขาด dynamic / floating index" — **CONFIRMED (P0 สำหรับหน้ายาว)**

| Evidence | Detail |
|---|---|
| CSS มี `.floating-toc-btn` + `.mobile-toc-modal` | `solution.css` 582–650 |
| JS มี `initMobileToc()` | หา `#mobile-toc-toggle` + `.sidebar-toc .toc-list` |
| **แต่ HTML ไม่ใส่ปุ่ม** | `mobile-toc-toggle` ปรากฏเฉพาะ `midterm/recalled-questions` และ `midterm/analytical-questions` — **`final/real-exam-recalled` (56 ข้อ, 207 KB) ไม่มี** |
| ไม่มี back-to-top | ทุกหน้า `back-to-top: False` |
| Scrollspy | มี แต่ TOC link ใช้ `white-space: nowrap` + ellipsis = **หัวข้อไทยถูกตัด** อ่านไม่ออก |
| ไม่มี `scroll-padding-top` | **CSS ทั้งโปรเจกต์ไม่มี `scroll-padding-top`** — sticky navbar ทับ anchor ทุกครั้งที่กดสารบัญ (มีแค่ `.solution-card { scroll-margin-top: 5rem }`) |
| ไม่มี progressive enhancement | Search/filter ต้องใช้ JS; ถ้า JS ตาย หน้า 56 ข้อกลายเป็นก้อนยาวไม่มีทางกระโดด |
| ไม่มี dynamic: collapse หมวด, keyboard `j/k`, URL hash sync, print view | — |

---

## 3. สิ่งที่พบเพิ่ม (ผู้ใช้ยังไม่ได้พูดถึง)

### P0 — ต้องแก้ก่อนแชร์

| ID | Issue | Evidence | Impact |
|---|---|---|---|
| **X1** | **Final portal ยังเป็น "Coming Soon" / ปุ่ม disabled** บน `1/index.html` ทั้งที่ `1/final/` สร้างเสร็จแล้ว | `1/index.html` lines ~121–138: `badge-upcoming` + `course-btn disabled` + ไม่มี `href` ไป `final/` | รุ่นน้องเข้า course hub แล้ว **หา Final ไม่เจอ** = เสียความน่าเชื่อถือทันที |
| **X2** | **ขยะ vendor pages ใน repo พร้อมแชร์** | `1/mini-project/output/version2/.build/vishay.html` (768 KB, class `vsh-*`), `pololu.html` ×2 | ดูเหมือน dump scrape / AI slop / อาจละเมิดลิขสิทธิ์ — **ห้าม zip ส่งต่อทั้งโฟลเดอร์** |
| **X3** | **Nav architecture ไม่ stable ข้าม section** | midterm nav 7 items vs final nav 6 items คนละชุด | ผู้ใช้หลง ไม่รู้ตัวเองอยู่ไหน |
| **X4** | **Theme FOUC ทุกหน้า** | (ข้อ 2.4) | ดูไม่ professional, ปวดตา, "เหมือนเว็บประถม" |
| **X5** | **Off-system pages ในสารบัญเดียวกัน** | `mini-project/index.html`, `LAB/*` ไม่ใช้ design tokens | ถ้ารุ่นน้องคลิกเข้าไป = หน้าคนละโลก |

### P1 — พังบนอุปกรณ์จริง

| ID | Issue | Evidence | Impact |
|---|---|---|---|
| **X6** | Touch targets เล็ก | `.btn-icon` 38×38 (ต่ำกว่า 44×44 WCAG), `.filter-btn` padding 0.4rem | จิ้มผิดบนมือถือ |
| **X7** | `target="_blank"` ไม่มี `noopener` | ทุกหน้าที่มี GitHub | tabnabbing / a11y |
| **X8** | Font Awesome + Google Fonts จาก CDN ไม่มี fallback / `font-display` | `@import` ใน CSS + `cdnjs` | ถ้าเน็ตช้า/บล็อก = **icon หาย + ตัวอักษรกระพริบ (FOUT)** ซ้ำกับ theme flicker |
| **X9** | Lightbox CSS ถูก inject ตอน runtime | `main.js` `initImageLightbox` สร้าง `<style>` เอง | ไม่สามารถ audit/CSP ได้; กระพริบ style |
| **X10** | ไม่มี error state ของ interactive lab | calculator ไม่ validate แบบ accessible (ไม่มี `aria-live` ประกาศผลลัพธ์) | ผู้ใช้ keyboard/reader ตามไม่ทัน |
| **X11** | `search-input` id / filter `data-filter` vs `data-category` ไม่ตรงกันทุกหน้า | `main.js` ลอง `data-category` หรือ `data-filter` | filter อาจเงียบ ๆ ไม่ทำงานถ้า markup ผิด |
| **X12** | `title` ยาวเกิน SEO/Tab (67–79 chars) | ทุกหน้า | Tab ตัด, แชร์ลิงก์ไม่สวย |

### P2 — ต่ำกว่ามาตรฐาน world-class docs

| ID | Issue | Detail |
|---|---|---|
| **X13** | ไม่มี Open Graph / Twitter card / favicon จริง / `meta theme-color` | แชร์ลง LINE/FB แล้ว preview ว่าง |
| **X14** | ไม่มี print stylesheet | นักศึกษาอยาก print เฉลย 56 ข้อ |
| **X15** | ไม่มี skip-to-content | keyboard user ต้อง tab ผ่าน nav ทุกครั้ง |
| **X16** | ไม่มี `:focus-visible` ring | ทั้ง `main.css`/`solution.css` |
| **X17** | ไม่มี `prefers-reduced-motion` | `transform: translateY(-4px)` hover ทั้งเว็บ |
| **X18** | ไม่มี URL deep-link state สำหรับ filter (`#timer` หรือ `?cat=`) | reload แล้ว filter หาย |
| **X19** | Breadcrumb ไม่มี `aria-label="Breadcrumb"` / schema.org | SEO + a11y |
| **X20** | ไม่มี i18n token / ข้อความ UI ไทย-อังกฤษปนกันแบบไม่มีระบบ (`Course Dashboard` vs `หน้าแรก`) | น้ำเสียงไม่สม่ำเสมอ |
| **X21** | Code copy ไม่บอก keyboard shortcut / ไม่มี "copied" ที่เข้าถึงได้ (`aria-live`) | |
| **X22** | TOC ไม่มี collapse หมวด / progress indicator / "อ่านถึงไหนแล้ว" | |
| **X23** | ไม่มี favicon.svg / manifest / offline fallback | |

### P3 — Polish

| ID | Issue |
|---|---|
| **X24** | Icon library ใหญ่เกิน (FA full CSS) — ควร subset หรือใช้ lucide/inline SVG |
| **X25** | `version query string ?v=2.3` แต่ไม่มี build step — cache busting ทำมือ |
| **X26** | ไม่มี empty state สวย ๆ ตอน search ไม่เจอ (แค่ซ่อนการ์ด) |
| **X27** | ไม่มี loading skeleton (ยังไม่จำเป็นถ้าเป็น static) |
| **X28** | Hardcoded "48 hours" countdown บน final hub ไม่ใช่ real date |

---

## 4. Root-cause analysis (ทำไมถึงเละ)

```
[ Content-first generation ]
        │
        ▼
[ ทุกหน้า dump HTML + inline style + local <style> ]
        │
        ├── ไม่มี token กลางที่ทุกหน้าใช้ (color/spacing/radius/z)
        ├── ไม่มี component library ที่ reuse ได้จริง
        ├── ไม่มี visual QA pass (ไม่มี screenshot diff / ไม่มี review checklist)
        └── Shared CSS เขียนทีหลัง / ไม่ sync กับ markup
                │
                ▼
        [ UI drift รายหน้า + breakpoint ปนกัน + nav ปนกัน ]
                │
                ▼
        [ ผู้ใช้รู้สึก "ไม่มี design system" ]
```

**ปัญหาเชิงระบบ 3 ข้อ:**
1. **Single source of truth ไม่มีอยู่จริง** — CSS กลางมี ~100 class แต่ HTML ใช้ class นอกนั้นอีกเป็นร้อย
2. **Composition ไม่เป็น component** — ทุกหน้าเขียน navbar/footer/hero ซ้ำด้วยมือ → drift ทันที
3. **ไม่มี Definition of Done ด้าน UI** — ตรวจแค่ "โค้ดถูก content" ไม่เคยตรวจ "responsive 3 ขนาด + contrast + focus + flicker"

---

## 5. Design system ที่ควรตั้งเป็นเป้า (spec ให้ coding agent)

### 5.1 Tokens (ย้ายทุกค่าออกจาก HTML)

```css
:root {
  /* color — ขยายจากของเดิม ห้าม hardcode hex ใน HTML อีก */
  --bg-primary: #0b1120;
  --bg-secondary: #111a2e;
  --bg-tertiary: #1e293b;
  --bg-card: #131d35;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --accent-blue: #38bdf8;
  --accent-green: #34d399;
  --accent-amber: #fbbf24;
  --accent-rose: #f87171;
  --accent-purple: #c084fc;
  --border-color: rgba(148, 163, 184, 0.12);

  /* NEW: semantic */
  --surface-glass: rgba(11, 17, 32, 0.85);
  --focus-ring: 0 0 0 3px rgba(56, 189, 248, 0.45);

  /* spacing scale */
  --space-1: 0.25rem;  --space-2: 0.5rem;   --space-3: 0.75rem;
  --space-4: 1rem;     --space-5: 1.5rem;   --space-6: 2rem;
  --space-7: 3rem;     --space-8: 4rem;

  /* radius */
  --radius-sm: 8px; --radius-md: 12px; --radius-lg: 18px; --radius-full: 9999px;

  /* type scale (fluid) */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: clamp(1.25rem, 2vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 3vw, 2rem);
  --text-3xl: clamp(1.75rem, 4vw, 2.5rem);

  /* layout */
  --nav-height: 64px;
  --container-max: 1200px;
  --toc-width: 260px;
  --z-nav: 100; --z-drawer: 110; --z-fab: 120; --z-modal: 200;

  color-scheme: dark;
}
[data-theme="light"] { color-scheme: light; /* ทำ mirror palette เดิม */ }
```

### 5.2 Components ที่ต้องมีชื่อเดียวทั้งเว็บ

- `Navbar` (desktop + mobile drawer) — **ชุดเดียว ข้ามทุก section**
- `Breadcrumbs`
- `Hero`
- `Card` / `CourseCard` / `PillarCard` / `StatCard`
- `SolutionCard` + `TierRecalled` (red) / `TierSenior` (blue) / `TierOfficial` (green) — **เลิกใช้ `.section-senior` แล้ว**
- `CodeBlock` (header + copy + syntax tokens)
- `DataTable` (responsive + scroll hint)
- `Toolbar` (search + filter pills + match count)
- `TocSidebar` + `TocFab` (mobile) + `BackToTop`
- `Callout` (`note` / `warning` / `danger` / `tip`)

### 5.3 Nav IA ที่แนะนำ (ลดเหลือ ≤ 5 top-level)

```
หน้าแรก
คอร์ส 305341
  ├─ Midterm Hub
  └─ Final Hub
เครื่องมือ (Lab)
โปรเจกต์ (Sliding Door)
[GitHub] [Theme]
```
- ลิงก์ลึก (01/02/03, 56 ข้อ) ไปอยู่ **dropdown หรือ sidebar ของ section**
- **ใช้ nav เดียวกันทุกหน้า** (ปุ่ม active ต่างกันอย่างเดียว)

### 5.4 Responsive breakpoints (ระบบเดียว)

| Token | Value | Behavior |
|---|---|---|
| `bp-sm` | 480px | single column, type scale down, FAB safe-area |
| `bp-md` | 768px | nav → hamburger, TOC → FAB |
| `bp-lg` | 1024px | sidebar TOC กลับมา |
| `bp-xl` | 1280px | container max |

### 5.5 Theme bootstrap (กัน flicker) — ต้องอยู่ใน `<head>` ทุกหน้า

```html
<script>
(function () {
  try {
    var t = localStorage.getItem('theme');
    if (!t) t = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) { document.documentElement.setAttribute('data-theme', 'dark'); }
})();
</script>
```

---

## 6. Acceptance Criteria สำหรับ agent ที่จะแก้ (DoD)

### A. Visual / IA
- [ ] Navbar ชุดเดียวกัน 100% ทุกหน้า portal, ≤ 5 top-level items
- [ ] ไม่มี `style="..."` ตกค้างในหน้า portal หลัก (0 occurrences)
- [ ] ไม่มี `#hex` hardcode ใน HTML (ย้ายเข้า CSS token / utility class)
- [ ] ทุก component ใช้ class จาก `design system` เท่านั้น
- [ ] Final hub ถูก lin ค์จาก `1/index.html` (ลบ Coming Soon)
- [ ] ซ่อน/ย้าย `vishay.html`, `pololu.html`, build scrap ออกจากสารบัญ (หรือ `.gitignore` / `output/_vendor/`)

### B. Theme
- [ ] ไม่มี flash ตอน reload / ตอนสลับหน้า (ตรวจ light→dark และ dark→light)
- [ ] `color-scheme` ถูกต้องทั้งสอง theme
- [ ] Icon ปุ่ม theme ไม่กระพริบ

### C. Responsive (ตรวจ 360 / 768 / 1024 / 1440)
- [ ] Nav ไม่ overflow ที่ 841–1100px
- [ ] Code block อ่านได้ + copy ง่ายบนมือถือ
- [ ] Table มี scroll affordance
- [ ] Touch target ≥ 44×44
- [ ] Floating TOC + BackToTop ทำงานบน `final/real-exam-recalled` (56 ข้อ)

### D. Navigation / TOC
- [ ] `scroll-padding-top` = `calc(var(--nav-height) + 12px)`
- [ ] กด TOC แล้วหัวข้อไม่ถูก navbar ทับ
- [ ] TOC label ไม่ถูก ellipsis ตัดจนอ่านไม่ออก (wrap หรือ tooltip)
- [ ] Filter/search คงสถานะผ่าน URL (query หรือ hash)

### E. A11y / Share
- [ ] skip-link, focus-visible, aria-expanded บน drawer, aria-live บน copy/search
- [ ] `rel="noopener noreferrer"` ทุก `target="_blank"`
- [ ] `prefers-reduced-motion`
- [ ] og:title / og:description / og:image + favicon ทุกหน้า
- [ ] Print stylesheet สำหรับ solution pages

### F. QA checklist ก่อน push
1. เปิดทุกหน้าบน Chrome 360px + 1440px + Firefox
2. ปิด JS แล้วเนื้อหายังอ่าน/กระโดดขั้นพื้นฐานได้
3. Lighthouse: A11y ≥ 95, Best Practices ≥ 95
4. Theme toggle 20 ครั้งเร็ว ๆ ไม่มี flicker
5. ให้เพื่อนที่ไม่รู้จักเว็บใช้หา "ข้อ 24" ให้เจอใน ≤ 20 วินาที

---

## 7. Suggested fix order (ให้ agent ทำตามลำดับ)

| Phase | Work | ประมาณ |
|---|---|---|
| **1. ตัดหางขยะ** | ซ่อน vendor/scrap pages, แก้ `1/index.html` ให้ลิงก์ Final จริง, ลบ Coming Soon | 0.5 ชม. |
| **2. Theme bootstrap** | inline head script + `color-scheme` + icon sync | 0.5 ชม. |
| **3. Design tokens** | สร้าง `tokens.css` (หรือ section บนของ `main.css`), ลบ hex ออกจาก HTML | 2–3 ชม. |
| **4. Navbar component กลาง** | ลดเหลือ 5 items, dropdown, drawer ไม่ใช้ inline style, `--nav-height`, `rel=noopener` | 2 ชม. |
| **5. Spacing / type scale** | replace magic numbers, fluid type | 2 ชม. |
| **6. TOC + FAB + scroll-padding** | ใส่ `#mobile-toc-toggle` ทุกหน้ายาว, BackToTop, fix ellipsis | 1.5 ชม. |
| **7. Responsive pass** | breakpoint กลาง, tablet nav, code/table mobile | 2 ชม. |
| **8. A11y + share meta + print** | skip-link, focus, og:, print css | 1.5 ชม. |
| **9. Visual QA** | screenshot 3 ขนาด, Lighthouse, checklist ข้อ 6 | 1 ชม. |

**รวมราว 13–15 ชม. ของการ refactor (ไม่แตะ content วิชาการ)**

---

## 8. File-level checklist สำหรับ coding agent

```
assets/css/
  tokens.css          (NEW — color/space/type/z/layout)
  main.css            (layout, navbar, hero, cards, footer — ใช้ token เท่านั้น)
  solution.css        (solution cards, TOC, code, toolbar — ใช้ token)
  utilities.css       (NEW — .text-*, .stack-*, .surface-*, .focus-ring)
  print.css           (NEW)

assets/js/
  theme.js            (NEW — bootstrap + toggle, ไม่รอ DOMContentLoaded สำหรับ set)
  nav.js              (NEW — drawer + dropdown + aria)
  toc.js              (NEW — FAB + scrollspy + back-to-top + hash)
  main.js             (slim — search/filter/copy/lightbox)

index.html
1/index.html                    ← ลบ Coming Soon, ชี้ไป final/index.html
1/midterm/**/*.html             ← nav กลาง + tokens + ลบ inline style
1/final/**/*.html               ← nav กลาง + FAB TOC + tokens + ลบ page-local <style>
```

---

## 9. Direct quotes from user (log)

> "มันไม่มี design system ถมยัง ui เละเทะ"
> "header/nav bar พัง เบียดกันไม่ได้มาตรฐาน"
> "และไม่มีความ responsive"
> "flicekering theme"
> "padding , margin เละ อึดอัด"
> "ขาด dynamic และ floating index ที่เหมาะสม"
> "ถ้าไปสภาพนี้โดนประจาน และโดนด่าว่าเอา ai slop มาให้คนอื่นไม่คัดกรองแน่นอน"

**ยืนยัน:** ทั้ง 6 ข้อของผู้ใช้ **เป็นจริงทั้งหมด** และมี **P0 เพิ่มอีก 5 หัวข้อ (X1–X5)** ที่ต้องแก้ก่อนแชร์

---

## 10. Log

| Timestamp (+0700) | Event |
|---|---|
| 2026-09-27T13:12:07+0700 | เริ่ม inventory HTML/CSS/JS ทั้ง repo |
| 2026-09-27T13:12:40+0700 | ตรวจ missing classes, inline styles, head checklist |
| 2026-09-27T13:13:20+0700 | ตรวจ nav crowding, CSS gaps, TOC/FAB, theme FOUC |
| 2026-09-27T13:13:55+0700 | ตรวจ a11y, share meta, hardcoded colors, drawer |
| 2026-09-27T13:14:14+0700 | เขียนรายงานฉบับนี้ (เอกสาร timestamp) |

---

## 11. คำแนะนำต่อเจ้าของเว็บ (ก่อนส่งต่อ agent)

1. **ส่งโฟลเดอร์ `assets/` + หน้า portal 10 หน้าเท่านั้น** — อย่า zip ทั้ง `1/` พร้อม `output/vendor`
2. บอก agent ชัดว่า **"ห้ามแก้เนื้อหาวิชาการ ห้ามแก้สูตร/โค้ด 8051"** (นอก scope รอบนี้)
3. ยึด **Acceptance Criteria ข้อ 6** เป็น definition of done
4. หลัง refactor ให้เพื่อนที่ไม่รู้จักโปรเจกต์ใช้งานจริง 5 นาที แล้วค่อยแชร์

---

*End of report — timestamp 2026-09-27T13:14:14+0700*
