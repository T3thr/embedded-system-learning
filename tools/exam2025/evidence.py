"""Evidence layer for the 2025 exam page: real slide/book images per question, course map, gallery and modal data.

build.py calls: evidence_block(n), course_map(), gallery(), modal_shell(), data_script().
render_slides.py imports SLIDES and SOURCES from here.
"""
import html
import json
from urllib.parse import quote

from slides_data import SLIDES, SOURCES  # noqa: F401  (re-exported)
from qevidence import BOOKS, POS, QEVID, STAGES

STAGE_NO = {s[0]: i + 1 for i, s in enumerate(STAGES)}
STAGE = {s[0]: s for s in STAGES}
N_STAGES = len(STAGES)

# slide key -> questions that cite it (sorted)
QUSE = {}
for _q, _items in QEVID.items():
    for _k, _ in _items:
        QUSE.setdefault(_k, []).append(_q)
for _k in QUSE:
    QUSE[_k].sort()

assert sorted(QEVID) == list(range(1, 22)) and sorted(POS) == list(range(1, 22)), "every one of the 21 questions needs evidence and a course position"
_unknown = [k for items in QEVID.values() for k, _ in items if k not in SLIDES]
assert not _unknown, f"evidence refers to slides that are not catalogued: {_unknown}"


def esc(s):
    return html.escape(s, quote=True)


def page_label(key):
    s = SLIDES[key]
    src = SOURCES[s["src"]]
    if src["kind"] == "book":
        return f'{src["name"]} · PDF หน้า {s["page"]}'
    return f'{src["name"]} · หน้า {s["page"]}'


def section_label(key):
    s = SLIDES[key]
    src = SOURCES[s["src"]]
    names = src["sections"]
    if src["kind"] == "book":
        return f'ตำราเสริม · {names[s["sec"] - 1]}'
    return (f'ลำดับที่ {STAGE_NO[s["src"]]} จาก {N_STAGES} · หัวข้อ {s["sec"]} จาก {len(names)}: {names[s["sec"] - 1]}')


def source_href(key):
    s = SLIDES[key]
    src = SOURCES[s["src"]]
    href = "../../../" + quote(src["file"])
    if src["file"].lower().endswith(".pdf"):
        href += f'#page={s["page"]}'
    return href


def alt_text(key):
    return f'{page_label(key)}: {SLIDES[key]["title"]}'


# ------------------------------------------------------------------ course position strip (in each card)
def course_position(n):
    (main_src, main_sec), before, after = POS[n]
    used_stages = {SLIDES[k]["src"] for k, _ in QEVID[n]}
    pills = []
    for sid, short, *_ in STAGES:
        cls = "cp-pill"
        if sid == main_src:
            cls += " main"
        elif sid in used_stages or any(sid == b for b, _ in before):
            cls += " support"
        pills.append(f'<a class="{cls}" href="#course-map" title="{esc(STAGE[sid][2])}"><span>{STAGE_NO[sid]}</span> {esc(short)}</a>')
    if used_stages & set(BOOKS):
        pills.append('<a class="cp-pill support book" href="#course-map" title="ตำราอ้างอิง"><span>+</span> ตำรา</a>')
    src = SOURCES[main_src]
    sec_names = src["sections"]
    sec_name = sec_names[main_sec - 1]
    pre = "".join(f'<li><strong>{esc(SOURCES[b]["name"])}:</strong> {esc(why)}</li>' for b, why in before)
    return (
        '<div class="course-pos">'
        f'<div class="cp-track" role="list" aria-label="ลำดับวิชา Embedded Systems 1">{"".join(pills)}</div>'
        '<div class="cp-detail">'
        f'<p><i class="fas fa-map-pin" aria-hidden="true"></i> <strong>ข้อนี้อยู่ตรงไหนของวิชา:</strong> {esc(src["name"])} '
        f'(ลำดับที่ {STAGE_NO[main_src]} จาก {N_STAGES}) · หัวข้อที่ {main_sec} จาก {len(sec_names)} "{esc(sec_name)}"</p>'
        f'<div class="cp-cols"><div><strong class="cp-h">ต้องรู้ก่อนถึงจะทำข้อนี้ได้</strong><ul>{pre}</ul></div>'
        f'<div><strong class="cp-h">ข้อนี้ไปต่อยอดที่</strong><p>{esc(after)}</p></div></div>'
        '</div></div>'
    )


# ------------------------------------------------------------------ evidence block (in each card)
def evidence_block(n):
    items = QEVID[n]
    cards = []
    for key, use in items:
        s = SLIDES[key]
        cards.append(
            f'<button type="button" class="ev-card" data-key="{key}" data-set="q{n}" aria-haspopup="dialog">'
            f'<span class="ev-thumb"><img src="slides/{key}-t.webp" alt="{esc(alt_text(key))}" loading="lazy" decoding="async"></span>'
            f'<span class="ev-badge">{esc(page_label(key))}</span>'
            f'<span class="ev-title">{esc(s["title"])}</span>'
            f'<span class="ev-use">{esc(use)}</span>'
            '<span class="ev-open"><i class="fas fa-expand" aria-hidden="true"></i> ดูภาพเต็มและข้อความ</span>'
            '</button>'
        )
    return (
        f'<div class="evidence" id="q{n}-evidence">'
        '<div class="evidence-head"><i class="fas fa-images" aria-hidden="true"></i> '
        f'<strong>ภาพจริงจากสไลด์และตำราที่ข้อ {n} อ้างถึง</strong>'
        f'<span class="evidence-count">{len(items)} ภาพ · คลิกภาพเพื่อเปิดหน้าต่างขยาย (ลูกศรซ้ายขวาเลื่อนดูภาพถัดไป)</span></div>'
        f'{course_position(n)}'
        f'<div class="evidence-grid">{"".join(cards)}</div>'
        '</div>'
    )


# ------------------------------------------------------------------ course map (top of page)
def course_map():
    main_of, support_of = {}, {}
    for n in QEVID:
        main_src = POS[n][0][0]
        main_of.setdefault(main_src, []).append(n)
        for k, _ in QEVID[n]:
            src = SLIDES[k]["src"]
            if src != main_src:
                support_of.setdefault(src, set()).add(n)
    counts = {}
    for k, s in SLIDES.items():
        counts[s["src"]] = counts.get(s["src"], 0) + 1

    def chips(qs, cls):
        return "".join(f'<a class="cm-q {cls}" href="#q{q}">ข้อ {q}</a>' for q in sorted(qs))

    items = []
    for sid, short, name, what, why in STAGES:
        src = SOURCES[sid]
        secs = "".join(f'<li><span>{i}</span> {esc(t)}</li>' for i, t in enumerate(src["sections"], 1))
        main_q = main_of.get(sid, [])
        sup_q = sorted(support_of.get(sid, set()) - set(main_q))
        qhtml = ""
        if main_q:
            qhtml += f'<div class="cm-qrow"><span class="cm-qlabel">ข้อสอบที่มาจากบทนี้เป็นหลัก</span>{chips(main_q, "main")}</div>'
        if sup_q:
            qhtml += f'<div class="cm-qrow"><span class="cm-qlabel">ข้อที่ใช้บทนี้เป็นพื้นฐาน</span>{chips(sup_q, "support")}</div>'
        if not qhtml:
            qhtml = '<div class="cm-qrow"><span class="cm-qlabel">ไม่มีข้อสอบตรง ๆ แต่เป็นพื้นฐานของบทถัดไป</span></div>'
        items.append(
            f'<li class="cm-item"><div class="cm-num" aria-hidden="true">{STAGE_NO[sid]}</div>'
            f'<div class="cm-body"><h3>{esc(short)} · {esc(name)}</h3>'
            f'<p class="cm-what">{esc(what)}</p>'
            f'<ol class="cm-secs">{secs}</ol>'
            f'{qhtml}'
            f'<p class="cm-why"><i class="fas fa-bullseye" aria-hidden="true"></i> {esc(why)}</p>'
            f'<a class="cm-gal" href="#gal-{sid}">ดูสไลด์ {counts.get(sid, 0)} หน้าที่ข้อสอบเรียกใช้ <i class="fas fa-arrow-down" aria-hidden="true"></i></a>'
            '</div></li>'
        )
    book_rows = "".join(
        f'<li><strong>{esc(SOURCES[b]["name"])}</strong> · {esc(SOURCES[b]["full"].split("· ", 1)[-1])} '
        f'<a class="cm-q support" href="#gal-books">{counts.get(b, 0)} หน้า</a></li>' for b in BOOKS)
    return (
        '<section class="course-map" id="course-map" aria-labelledby="cm-title">'
        '<h2 id="cm-title"><i class="fas fa-route" style="color: var(--accent-cyan);" aria-hidden="true"></i> แผนที่วิชา Embedded Systems 1: ข้อสอบ 21 ข้อมาจากบทไหน</h2>'
        '<p class="cm-intro">เรียงตามลำดับที่เรียนจริง (1 ถึง 8) ตัวเลขในวงกลมคือลำดับบท ข้อสอบที่อยู่ท้ายแผนที่ต้องอาศัยความรู้ของบทก่อนหน้าเสมอ '
        'จึงอย่าท่องเฉพาะคำตอบ ให้ไล่ย้อนตามลำดับ เช่น ข้อ 4 ต้องรู้ 1 µs ต่อ count (บท 1) ตำแหน่ง TH/TL (บท 3) และคำสั่ง MOV (บท 4) ก่อนใช้สูตรของบท 5</p>'
        f'<ol class="cm-list">{"".join(items)}</ol>'
        '<div class="cm-books"><h3><i class="fas fa-book" aria-hidden="true"></i> ตำราอ้างอิงเพิ่มเติม (นอกลำดับสไลด์)</h3>'
        f'<ul>{book_rows}</ul></div>'
        '</section>'
    )


# ------------------------------------------------------------------ gallery of every cited page
def gallery():
    by_src = {}
    for key, s in SLIDES.items():
        by_src.setdefault(s["src"], []).append(key)
    blocks = []
    order = [s[0] for s in STAGES] + ["books"]
    for sid in order:
        if sid == "books":
            keys = [k for b in BOOKS for k in sorted(by_src.get(b, []), key=lambda x: SLIDES[x]["page"])]
            title, gid = "ตำราอ้างอิง (Mazidi และ Lee & Seshia)", "gal-books"
        else:
            keys = sorted(by_src.get(sid, []), key=lambda x: SLIDES[x]["page"])
            title, gid = f'{STAGE[sid][1]} · {STAGE[sid][2]}', f"gal-{sid}"
        if not keys:
            continue
        cards = []
        for k in keys:
            s = SLIDES[k]
            qs = "".join(f'<a href="#q{q}">{q}</a>' for q in QUSE.get(k, []))
            cards.append(
                '<div class="gal-card">'
                f'<button type="button" class="gal-open" data-key="{k}" data-set="{gid}" aria-haspopup="dialog">'
                f'<span class="ev-thumb"><img src="slides/{k}-t.webp" alt="{esc(alt_text(k))}" loading="lazy" decoding="async"></span>'
                f'<span class="ev-badge">{esc(page_label(k))}</span>'
                f'<span class="ev-title">{esc(s["title"])}</span></button>'
                f'<div class="gal-qs"><span>ข้อ</span>{qs}</div></div>'
            )
        blocks.append(
            f'<details class="gal-stage" id="{gid}"><summary><span>{esc(title)}</span>'
            f'<small>{len(keys)} หน้า</small></summary><div class="gal-grid">{"".join(cards)}</div></details>'
        )
    return (
        '<section class="slide-gallery" id="slide-gallery" aria-labelledby="sg-title">'
        f'<h2 id="sg-title"><i class="fas fa-photo-film" style="color: var(--accent-purple);" aria-hidden="true"></i> คลังสไลด์และตำรา ({len(SLIDES)} หน้า) ที่ข้อสอบเรียกใช้</h2>'
        '<p class="cm-intro">รวมทุกหน้าที่ข้อ 1 ถึง 21 อ้างถึง เรียงตามลำดับวิชา ใต้ภาพบอกว่าข้อไหนใช้หน้านี้ คลิกภาพเพื่อเปิดหน้าต่างขยายพร้อมข้อความที่ถอดจากสไลด์</p>'
        f'{"".join(blocks)}</section>'
    )


# ------------------------------------------------------------------ modal shell + data
def modal_shell():
    return '''
  <div class="sm-overlay" id="slide-modal" hidden>
    <div class="sm-dialog" role="dialog" aria-modal="true" aria-labelledby="sm-title" tabindex="-1">
      <header class="sm-head">
        <div class="sm-head-text"><span class="sm-crumb" id="sm-crumb"></span><h3 id="sm-title"></h3></div>
        <div class="sm-tools">
          <a class="sm-btn" id="sm-open" target="_blank" rel="noopener"><i class="fas fa-file-pdf" aria-hidden="true"></i> <span>ไฟล์ต้นฉบับ</span></a>
          <button type="button" class="sm-btn" id="sm-zoom" aria-pressed="false"><i class="fas fa-search-plus" aria-hidden="true"></i> <span>ขยาย 100%</span></button>
          <button type="button" class="sm-btn sm-close" id="sm-close" aria-label="ปิดหน้าต่าง"><i class="fas fa-times" aria-hidden="true"></i></button>
        </div>
      </header>
      <div class="sm-body">
        <div class="sm-stage">
          <div class="sm-view">
            <button type="button" class="sm-nav prev" id="sm-prev" aria-label="ภาพก่อนหน้า"><i class="fas fa-chevron-left" aria-hidden="true"></i></button>
            <div class="sm-img-wrap" id="sm-img-wrap"><img id="sm-img" alt=""></div>
            <button type="button" class="sm-nav next" id="sm-next" aria-label="ภาพถัดไป"><i class="fas fa-chevron-right" aria-hidden="true"></i></button>
          </div>
          <div class="sm-counter" id="sm-counter" aria-live="polite"></div>
          <div class="sm-strip" id="sm-strip" role="tablist" aria-label="ภาพทั้งหมดในชุดนี้"></div>
        </div>
        <aside class="sm-side">
          <section><h4><i class="fas fa-map-pin" aria-hidden="true"></i> ตำแหน่งในวิชา</h4><p id="sm-where"></p></section>
          <section><h4><i class="fas fa-eye" aria-hidden="true"></i> รูปนี้แสดงอะไร</h4><p id="sm-shows"></p></section>
          <section id="sm-use-sec"><h4><i class="fas fa-link" aria-hidden="true"></i> <span id="sm-use-h">ใช้ตอบข้อสอบอย่างไร</span></h4><p id="sm-use"></p></section>
          <section><h4><i class="fas fa-align-left" aria-hidden="true"></i> ข้อความบนสไลด์ (ถอดจากภาพ) <button type="button" class="sm-copy" id="sm-copy">คัดลอก</button></h4><pre id="sm-text"></pre><p class="sm-note" id="sm-note"></p></section>
          <section><h4><i class="fas fa-list-ol" aria-hidden="true"></i> ข้อสอบที่อ้างถึงหน้านี้</h4><div id="sm-qs" class="sm-qs"></div></section>
        </aside>
      </div>
    </div>
  </div>
'''


def data_script():
    slides = {}
    for key, s in SLIDES.items():
        slides[key] = dict(
            label=page_label(key), title=s["title"], where=section_label(key), shows=s["shows"], text=s["text"],
            note=s["note"], qs=QUSE.get(key, []), href=source_href(key),
            book=SOURCES[s["src"]]["kind"] == "book", pdf=SOURCES[s["src"]]["file"].lower().endswith(".pdf"),
        )
    sets = {f"q{n}": [k for k, _ in items] for n, items in QEVID.items()}
    uses = {f"q{n}|{k}": use for n, items in QEVID.items() for k, use in items}
    by_src = {}
    for key, s in SLIDES.items():
        by_src.setdefault(s["src"], []).append(key)
    for sid in [s[0] for s in STAGES]:
        sets[f"gal-{sid}"] = sorted(by_src.get(sid, []), key=lambda x: SLIDES[x]["page"])
    sets["gal-books"] = [k for b in BOOKS for k in sorted(by_src.get(b, []), key=lambda x: SLIDES[x]["page"])]
    payload = json.dumps(dict(slides=slides, sets=sets, uses=uses), ensure_ascii=False).replace("</", "<\\/").replace("$", "\\u0024")  # slide text has the 8051 symbol for the current address; keep the page free of literal dollar signs
    return f'<script type="application/json" id="slide-data">{payload}</script>'
