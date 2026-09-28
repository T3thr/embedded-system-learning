"""Generate final/real-exam/2025/index.html (21-question real Final 1/2568 portal)."""
import html
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
sys.path.insert(0, str(HERE.parent))
import sync_chrome  # noqa: E402
import widgets  # noqa: E402
from lessons_p1 import L as L1  # noqa: E402
from lessons_p2 import L as L2  # noqa: E402
from lessons_p3 import L as L3  # noqa: E402

PAGE = "1/final/real-exam/2025/index.html"
OUT = HERE.parent.parent / PAGE
LESSONS = {**L1, **L2, **L3}

# ---------------------------------------------------------------- helpers
DIRECTIVES = {"ORG", "END", "EQU", "DB", "DW", "BIT", "DATA"}


def esc(s):
    return html.escape(s, quote=False)


def _hl_code(part):
    out, seen_mnemonic, mnemonic = [], False, ""
    for tok in re.split(r"(\s+|,)", part):
        if tok == "" or tok.isspace() or tok == ",":
            out.append(esc(tok))
            continue
        if not seen_mnemonic and tok.endswith(":"):
            out.append(f'<span class="operand">{esc(tok)}</span>')
            continue
        if not seen_mnemonic:
            seen_mnemonic, mnemonic = True, tok.upper()
            cls = "directive" if mnemonic in DIRECTIVES else "opcode"
            out.append(f'<span class="{cls}">{esc(tok)}</span>')
            continue
        if tok.startswith("#"):
            cls = "immediate"
        elif mnemonic == "ORG" or re.fullmatch(r"[0-9][0-9A-Fa-f]*[Hh]", tok):
            cls = "address"
        else:
            cls = "operand"
        out.append(f'<span class="{cls}">{esc(tok)}</span>')
    return "".join(out)


def asm(code, title="8051 Assembly (.asm)"):
    lines = []
    for ln in code.strip("\n").split("\n"):
        code_part, sep, cmt = ln.partition(";")
        h = _hl_code(code_part)
        if sep:
            h += f'<span class="comment">{esc(";" + cmt)}</span>'
        lines.append(h)
    body = "\n".join(lines)
    return (f'<div class="code-wrapper">\n  <div class="code-header">\n    <span>{title}</span>\n'
            f'    <button class="btn-copy" type="button">Copy Code</button>\n  </div>\n'
            f'  <pre class="code-content"><code>{body}</code></pre>\n</div>')


def table(head, rows):
    th = "".join(f"<th>{h}</th>" for h in head)
    tr = "\n".join("<tr>" + "".join(f"<td>{c}</td>" for c in r) + "</tr>" for r in rows)
    return (f'<div class="table-responsive">\n  <table class="custom-table">\n'
            f'    <thead><tr>{th}</tr></thead>\n    <tbody>\n{tr}\n    </tbody>\n  </table>\n</div>')


L = "../../../lecture/"
REFS = {
    "L1": (L + "lecture1-markdown/lecture1_complete.md", "Lecture 1"),
    "L3": (L + "lecture3-markdown/lecture_3_complete.md", "Lecture 3"),
    "L5": (L + "lecture5-markdown/lecture_5_complete.md", "Lecture 5"),
    "L6": (L + "lecture6-pptx-markdown/lecture_6_complete.md", "Lecture 6"),
    "LSM": (L + "lecture-programming-for-a-state-machine-markdown/lecture_progroming_for_a_state_machine_complete.md",
            "Lab 5 State Machine"),
    "L2": (L + "lecture2-markdown/lecture_2_complete.md", "Lecture 2"),
    "MZ16": ("../../../textbook/avr-mazidi-markdown/ch16_pwm_programming_and_dc_motor_control.md",
             "Mazidi (AVR) บทที่ 16"),
    "MZ11": ("../../../textbook/avr-mazidi-markdown/ch11_avr_serial_port_programming.md",
             "Mazidi (AVR) บทที่ 11"),
    "UCB3": ("../../../textbook/ucb-cyber-physical-embedded-systems-markdown/ch03_discrete_dynamics.md",
             "Lee &amp; Seshia บทที่ 3"),
}
PHOTOS = {1: "S__324124684_0.jpg", 2: "S__324124685_0.jpg", 3: "S__324124686_0.jpg", 4: "S__324124687_0.jpg"}


def refs(*items):
    chips = []
    for key, pages in items:
        href, name = REFS[key]
        chips.append(f'<a class="ref-chip" href="{href}"><i class="fas fa-book-open"></i> {name} · {pages}</a>')
    return '<div class="ref-row">' + "".join(chips) + "</div>"


def trap(text):
    return (f'<div class="box-warning" style="margin-top: 0.85rem;">\n'
            f'  <div class="box-warning-header"><i class="fas fa-exclamation-triangle"></i> กับดักจากกระดาษที่ตรวจแล้ว</div>\n'
            f'  <div class="box-warning-text">{text}</div>\n</div>')


# ---------------------------------------------------------------- SVG figures
SVG_FLOW_Q9 = '''<figure class="fig-card">
<svg class="fx-svg" viewBox="0 0 440 610" role="img" aria-label="Flowchart หน่วงเวลา 10 ไมโครวินาทีด้วย Timer 0 Mode 1">
  <defs><marker id="ar9" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="fx-head"/></marker></defs>
  <rect x="150" y="12" width="140" height="38" rx="19" class="fx-term"/>
  <text x="220" y="36" class="fx-text" text-anchor="middle">Start (DELAY_10US)</text>
  <line x1="220" y1="50" x2="220" y2="76" class="fx-line" marker-end="url(#ar9)"/>
  <rect x="90" y="78" width="260" height="44" rx="6" class="fx-box"/>
  <text x="220" y="98" class="fx-text fx-mono" text-anchor="middle">TMOD ← 01H</text>
  <text x="220" y="114" class="fx-sub" text-anchor="middle">Timer 0, Mode 1 (16 บิต), C/T = 0</text>
  <line x1="220" y1="122" x2="220" y2="146" class="fx-line" marker-end="url(#ar9)"/>
  <rect x="90" y="148" width="260" height="44" rx="6" class="fx-box"/>
  <text x="220" y="168" class="fx-text fx-mono" text-anchor="middle">TH0 ← FFH , TL0 ← F6H</text>
  <text x="220" y="184" class="fx-sub" text-anchor="middle">FFFFH − 0AH + 1 = FFF6H (10 counts)</text>
  <line x1="220" y1="192" x2="220" y2="216" class="fx-line" marker-end="url(#ar9)"/>
  <rect x="90" y="218" width="260" height="44" rx="6" class="fx-box"/>
  <text x="220" y="238" class="fx-text fx-mono" text-anchor="middle">TR0 ← 1</text>
  <text x="220" y="254" class="fx-sub" text-anchor="middle">เริ่มนับ (MOV TCON, #10H)</text>
  <line x1="220" y1="262" x2="220" y2="290" class="fx-line" marker-end="url(#ar9)"/>
  <polygon points="220,292 320,330 220,368 120,330" class="fx-dec"/>
  <text x="220" y="335" class="fx-text fx-mono" text-anchor="middle">TF0 = 1 ?</text>
  <path d="M320,330 H392 V278 H224" class="fx-line" marker-end="url(#ar9)"/>
  <text x="340" y="322" class="fx-sub">No</text>
  <line x1="220" y1="368" x2="220" y2="398" class="fx-line" marker-end="url(#ar9)"/>
  <text x="228" y="388" class="fx-sub">Yes (ครบ 10 µs)</text>
  <rect x="90" y="400" width="260" height="44" rx="6" class="fx-box"/>
  <text x="220" y="420" class="fx-text fx-mono" text-anchor="middle">TF0 ← 0</text>
  <text x="220" y="436" class="fx-sub" text-anchor="middle">ล้างแฟล็กเพื่อใช้รอบถัดไป</text>
  <line x1="220" y1="444" x2="220" y2="468" class="fx-line" marker-end="url(#ar9)"/>
  <rect x="90" y="470" width="260" height="44" rx="6" class="fx-box"/>
  <text x="220" y="490" class="fx-text fx-mono" text-anchor="middle">TR0 ← 0</text>
  <text x="220" y="506" class="fx-sub" text-anchor="middle">หยุด Timer (MOV TCON, #00H)</text>
  <line x1="220" y1="514" x2="220" y2="540" class="fx-line" marker-end="url(#ar9)"/>
  <rect x="150" y="542" width="140" height="38" rx="19" class="fx-term"/>
  <text x="220" y="566" class="fx-text" text-anchor="middle">End (RET)</text>
</svg>
<figcaption>Flowchart ข้อ 9 — ทุกกล่องสอดคล้องกับคำสั่งในซับรูทีน <code>Delay</code> ของ Lab 5 บรรทัดต่อบรรทัด</figcaption>
</figure>'''

SVG_STATE_Q21 = '''<figure class="fig-card">
<svg class="fx-svg" viewBox="0 0 460 320" role="img" aria-label="State chart Ready State และ Go State">
  <defs><marker id="ar21" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="fx-head"/></marker></defs>
  <circle cx="190" cy="22" r="9" class="fx-init"/>
  <line x1="190" y1="31" x2="190" y2="62" class="fx-line" marker-end="url(#ar21)"/>
  <rect x="100" y="64" width="180" height="56" rx="12" class="fx-state-red"/>
  <text x="190" y="88" class="fx-text" text-anchor="middle" font-weight="700">Ready State</text>
  <text x="190" y="106" class="fx-sub fx-mono" text-anchor="middle">R0=01H · P1.1=1 · P1.0=0</text>
  <line x1="190" y1="120" x2="190" y2="190" class="fx-line" marker-end="url(#ar21)"/>
  <text x="198" y="152" class="fx-sub">push</text>
  <text x="198" y="167" class="fx-sub fx-mono">JB P2.0, GoState</text>
  <rect x="100" y="192" width="180" height="56" rx="12" class="fx-state-green"/>
  <text x="190" y="216" class="fx-text" text-anchor="middle" font-weight="700">Go State</text>
  <text x="190" y="234" class="fx-sub fx-mono" text-anchor="middle">R0=02H · P1.1=0 · P1.0=1</text>
  <path d="M280,220 H372 V92 H284" class="fx-line" marker-end="url(#ar21)"/>
  <text x="380" y="150" class="fx-sub">timer</text>
  <text x="380" y="165" class="fx-sub fx-mono">R1 × 10 µs</text>
  <path d="M140,248 V290 H62 V220 H96" class="fx-line" marker-end="url(#ar21)"/>
  <text x="18" y="306" class="fx-sub">push (กดซ้ำ → นับ Go ใหม่)</text>
</svg>
<figcaption>State chart ตามรูปบนกระดาษข้อสอบ (ตรงกับ Lab 5 "Traffic 1") — มี 3 เส้นเปลี่ยนสถานะ: push, timer และ push วนกลับ Go</figcaption>
</figure>'''

SVG_HW_Q21 = '''<figure class="fig-card">
<svg class="fx-svg" viewBox="0 0 460 250" role="img" aria-label="Hardware diagram 8051 ต่อ P1.1 P1.0 และ P2.0">
  <rect x="24" y="24" width="150" height="200" rx="8" class="fx-box"/>
  <text x="99" y="50" class="fx-text" text-anchor="middle" font-weight="700">8051</text>
  <text x="99" y="68" class="fx-sub" text-anchor="middle">12 MHz</text>
  <text x="164" y="100" class="fx-text fx-mono" text-anchor="end">P1.1</text>
  <text x="164" y="150" class="fx-text fx-mono" text-anchor="end">P1.0</text>
  <text x="164" y="200" class="fx-text fx-mono" text-anchor="end">P2.0</text>
  <line x1="174" y1="96" x2="300" y2="96" class="fx-line"/>
  <line x1="174" y1="146" x2="300" y2="146" class="fx-line"/>
  <line x1="174" y1="196" x2="300" y2="196" class="fx-line"/>
  <circle cx="316" cy="96" r="15" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
  <circle cx="316" cy="146" r="15" fill="#22c55e" stroke="#166534" stroke-width="1.5"/>
  <rect x="301" y="182" width="30" height="28" rx="5" class="fx-btn"/>
  <circle cx="316" cy="196" r="7" class="fx-btn-cap"/>
  <text x="342" y="92" class="fx-text">คนสีแดง</text>
  <text x="342" y="108" class="fx-sub">Ready (หยุด)</text>
  <text x="342" y="142" class="fx-text">คนสีเขียว</text>
  <text x="342" y="158" class="fx-sub">Go (เดินได้)</text>
  <text x="342" y="192" class="fx-text">ปุ่มกด</text>
  <text x="342" y="208" class="fx-sub">กด → P2.0 = 1</text>
</svg>
<figcaption>Hardware Diagram ตามกระดาษข้อสอบ: เอาต์พุต 2 บิต (P1.1, P1.0) และอินพุต 1 บิต (P2.0)</figcaption>
</figure>'''

SVG_PWM_Q19 = '''<figure class="fig-card">
<svg class="fx-svg" viewBox="0 0 460 190" role="img" aria-label="PWM duty cycle 25 เปอร์เซ็นต์ และ 75 เปอร์เซ็นต์">
  <text x="10" y="26" class="fx-sub">Duty 25% → ช้า</text>
  <polyline points="10,70 10,40 60,40 60,70 210,70 210,40 260,40 260,70 410,70 410,40 450,40" class="fx-wave"/>
  <text x="10" y="116" class="fx-sub">Duty 75% → เร็ว</text>
  <polyline points="10,160 10,130 160,130 160,160 210,160 210,130 360,130 360,160 410,160 410,130 450,130" class="fx-wave"/>
  <line x1="10" y1="178" x2="210" y2="178" class="fx-line"/>
  <text x="110" y="174" class="fx-sub" text-anchor="middle">คาบ T คงที่</text>
</svg>
<figcaption>แอมพลิจูดคงที่ คาบคงที่ เปลี่ยนเฉพาะความกว้างพัลส์ (Mazidi 16.1: wider pulse → higher speed)</figcaption>
</figure>'''

SVG_HB_Q20 = '''<figure class="fig-card">
<svg class="fx-svg" viewBox="0 0 420 250" role="img" aria-label="วงจร H-Bridge สี่สวิตช์">
  <line x1="60" y1="24" x2="360" y2="24" class="fx-line"/>
  <text x="210" y="18" class="fx-sub" text-anchor="middle">+V</text>
  <line x1="60" y1="226" x2="360" y2="226" class="fx-line"/>
  <text x="210" y="244" class="fx-sub" text-anchor="middle">GND</text>
  <line x1="100" y1="24" x2="100" y2="60" class="fx-line"/><rect x="80" y="60" width="40" height="36" rx="5" class="fx-box"/><text x="100" y="83" class="fx-text" text-anchor="middle">SW1</text>
  <line x1="100" y1="96" x2="100" y2="154" class="fx-line"/>
  <rect x="80" y="154" width="40" height="36" rx="5" class="fx-box"/><text x="100" y="177" class="fx-text" text-anchor="middle">SW3</text><line x1="100" y1="190" x2="100" y2="226" class="fx-line"/>
  <line x1="320" y1="24" x2="320" y2="60" class="fx-line"/><rect x="300" y="60" width="40" height="36" rx="5" class="fx-box"/><text x="320" y="83" class="fx-text" text-anchor="middle">SW2</text>
  <line x1="320" y1="96" x2="320" y2="154" class="fx-line"/>
  <rect x="300" y="154" width="40" height="36" rx="5" class="fx-box"/><text x="320" y="177" class="fx-text" text-anchor="middle">SW4</text><line x1="320" y1="190" x2="320" y2="226" class="fx-line"/>
  <line x1="100" y1="125" x2="185" y2="125" class="fx-line"/><line x1="235" y1="125" x2="320" y2="125" class="fx-line"/>
  <circle cx="210" cy="125" r="25" class="fx-motor"/><text x="210" y="131" class="fx-text" text-anchor="middle" font-weight="700">M</text>
</svg>
<figcaption>ตำแหน่งสวิตช์ตาม Mazidi Figure 16-2: ปิด SW1+SW4 กระแสไหลผ่านมอเตอร์ทางหนึ่ง ปิด SW2+SW3 กระแสไหลทางตรงข้าม</figcaption>
</figure>'''


def frame(cells):
    tds = "".join(f'<span class="bit {c[1]}">{c[0]}</span>' for c in cells)
    return f'<div class="frame-row">{tds}</div>'


D8 = [(f"D{i}", "d") for i in range(8)]
FRAME_M0 = frame(D8)
FRAME_M1 = frame([("0", "s")] + D8 + [("1", "p")])
FRAME_M23 = frame([("0", "s")] + D8 + [("P / TB8", "x"), ("1", "p")])

# ---------------------------------------------------------------- 21 questions
# cat: timer | control | serial | fsm   part: notebook page / exam part (1-4)
Q = []


def q(num, cat, part, title, prompt, notebook, analysis, solution):
    Q.append(dict(num=num, cat=cat, part=part, title=title, prompt=prompt,
                  notebook=notebook, analysis=analysis, solution=solution))


# ---------- Part 1: Q1-Q4
q(1, "timer", 1, "Timer กับ Counter แตกต่างกันอย่างไร",
  "Timer กับ Counter แตกต่างกันอย่างไร",
  "Timer ใช้นับสัญญาณใน Internal clock ส่วน Counter ใช้นับสัญญาณใน External clock on T0 และ T1 — ถูกต้อง ควรเติมชื่อบิต C/T และขาจริง",
  refs(("L5", "หน้า 5, 11, 14")) + '''<ul>
<li>ฮาร์ดแวร์ตัวเดียวกัน (T0/T1 เป็นตัวนับขึ้น 16 บิต) ต่างกันแค่ <strong>แหล่งสัญญาณนาฬิกา</strong> ที่ป้อนเข้าตัวนับ</li>
<li>Lecture 5 หน้า 5: ถ้านับ clock ภายในเป็น Timer ถ้านับ clock ภายนอกที่ขา T0/T1 เป็น Counter และบิต C/T ใน TMOD เป็นตัวเลือก</li>
<li>Lecture 5 หน้า 11: <code>C/T = 0</code> → Timer (Internal Frequency Fosc/12), <code>C/T = 1</code> → Counter (External Frequency on T1 &amp; T0)</li>
</ul>''',
  table(["หัวข้อ", "Timer", "Counter"], [
      ["แหล่ง clock", "ภายในชิป <code>Fosc / 12</code>", "ภายนอก ผ่านขา <code>T0 = P3.4</code>, <code>T1 = P3.5</code>"],
      ["บิตเลือกใน TMOD", "<code>C/T = 0</code>", "<code>C/T = 1</code>"],
      ["ค่าที่นับได้หมายถึง", "เวลา: 1 count = 1 µs ที่ 12 MHz", "จำนวนพัลส์/เหตุการณ์ภายนอก"],
      ["ตัวอย่างใช้งาน", "Delay, สร้าง Square Wave", "นับชิ้นงาน, นับรอบมอเตอร์"],
  ]) + '<p><strong>คำตอบ:</strong> Timer นับสัญญาณนาฬิกาภายใน (Fosc/12) จึงใช้วัดเวลา ส่วน Counter นับพัลส์จากภายนอกที่ขา T0 (P3.4) หรือ T1 (P3.5) เลือกโหมดด้วยบิต <code>C/T</code> ใน TMOD</p>')

q(2, "timer", 1, "Timer ใน 8051 มีกี่บิต ใช้รีจิสเตอร์อะไรนับ",
  "Timer ใน 8051 มีกี่บิตและใช้รีจิสเตอร์ในการนับ",
  "Timer ใน 8051 มี 16 bit คือ T0 และ T1 ... แบ่งออกเป็น register 8 bit คือ TH0, TL0 และ TH1, TL1 — ถูกต้อง",
  refs(("L5", "หน้า 3"), ("L3", "หน้า 12")) + '''<ul>
<li>Lecture 5 หน้า 3: "8051 has Two 16 bits Timers T0 &amp; T1, working as up counters"</li>
<li>CPU 8 บิตเข้าถึงทีละไบต์ จึงแยกตัวนับ 16 บิตเป็น 2 SFR: ไบต์สูง TH และไบต์ต่ำ TL</li>
<li>แอดเดรส SFR จาก Lecture 3 หน้า 12: <code>TL0 = 8AH</code>, <code>TL1 = 8BH</code>, <code>TH0 = 8CH</code>, <code>TH1 = 8DH</code></li>
</ul>''' + trap("คำตอบที่เขียนว่า \"แบ่งเป็น 2 Register คือ T0, T1\" ได้คะแนนไม่เต็ม เพราะ T0/T1 คือชื่อ Timer ไม่ใช่รีจิสเตอร์นับ ต้องตอบ TH0/TL0 และ TH1/TL1"),
  table(["Timer", "ขนาด", "ไบต์สูง", "ไบต์ต่ำ", "ช่วงนับ (Mode 1)"], [
      ["Timer 0", "16 บิต", "<code>TH0</code> (8CH)", "<code>TL0</code> (8AH)", "<code>0000H → FFFFH</code>"],
      ["Timer 1", "16 บิต", "<code>TH1</code> (8DH)", "<code>TL1</code> (8BH)", "<code>0000H → FFFFH</code>"],
  ]) + '<p><strong>คำตอบ:</strong> 8051 มี Timer 2 ตัว (T0, T1) ขนาดตัวละ <strong>16 บิต</strong> นับขึ้น ใช้รีจิสเตอร์ 8 บิตคู่กัน: <code>TH0/TL0</code> สำหรับ T0 และ <code>TH1/TL1</code> สำหรับ T1 ควบคุมด้วย <code>TMOD</code> และ <code>TCON</code></p>')

q(3, "timer", 1, "Timer Overflow Interrupt ทำงานเมื่อไร",
  "Time Overflow Interrupt จะทำงานเมื่อไร",
  "จะทำงานเมื่อถึงค่า FFFFH และ rolls back กลับไปเป็นค่า 0000H — ถูกต้อง",
  refs(("L5", "หน้า 4, 6, 9")) + '''<ul>
<li>Lecture 5 หน้า 4: "When it reaches to FFFFH, it will rolls back to 0000H and during that it will generates Timer Overflow interrupt"</li>
<li>Lecture 5 หน้า 6: เมื่อ count roll จาก FFFFH เป็น 0000H จะทำให้บิต TF0 หรือ TF1 เป็น 1 ("It is interrupt to 8051") แล้ว CPU กระโดดไป ISR และจบด้วย RETI</li>
<li>Lecture 5 หน้า 9: TF ถูกล้างเป็น 0 เมื่อ CPU เข้า ISR (ISR ของ Timer 0 ที่ 000BH, Timer 1 ที่ 001BH)</li>
</ul>''' + trap("คำตอบ \"เมื่อเป็น FFFFH\" ถูกกากบาท จุดที่ต้องเขียนคือ <strong>การล้น (roll over) จาก FFFFH ไป 0000H</strong> ไม่ใช่แค่ตอนค่าเท่ากับ FFFFH"),
  '''<ol>
<li>Timer นับขึ้นทีละ 1 ทุก machine cycle (1 µs ที่ 12 MHz)</li>
<li>เมื่อค่านับเป็น <code>FFFFH</code> แล้วนับต่ออีก 1 จะ <strong>roll over เป็น 0000H</strong></li>
<li>ฮาร์ดแวร์เซต <code>TF0 = 1</code> (TCON.5) หรือ <code>TF1 = 1</code> (TCON.7)</li>
<li>ถ้าเปิด <code>EA = 1</code> และ <code>ET0/ET1 = 1</code> ใน IE CPU จะกระโดดไป Vector <code>000BH</code> หรือ <code>001BH</code> ถ้าไม่เปิด โปรแกรมต้องวน polling TF เอง (แบบ <code>JNB TCON.5, Wait</code>)</li>
</ol>
<p><strong>คำตอบ:</strong> Timer Overflow Interrupt เกิดขึ้นเมื่อตัวนับ 16 บิตนับเกิน FFFFH แล้ววนกลับเป็น 0000H ทำให้แฟล็ก TF0/TF1 เป็น 1</p>''')

q(4, "timer", 1, "คำนวณตั้ง Timer นับ 100 µsec ที่ 12 MHz (+ Square Wave 1 kHz)",
  "จงเขียนวิธีคำนวณในการตั้ง Timer นับ 100 µsec กรณี 8051 ใช้ความถี่ 12 MHz",
  "ใช้สูตร Count = FFFFH − Value + 1 ได้ FF9CH, TL0 = 9CH, TH0 = FFH — ถูกต้อง และผู้จดเพิ่มตัวอย่าง (Ex) Square Wave 1 kHz ได้ FE0CH",
  refs(("L5", "หน้า 4, 20, 21")) + '''<ul>
<li>สูตรของรายวิชา (Lecture 5 หน้า 4): <code>Count = FFFFH − Value + 1</code> ตัวอย่างในสไลด์: นับ 9 → <code>FFF7H</code></li>
<li>Timer เป็น up counter จึงต้องโหลดค่าเริ่มต้นให้ "ห่างจากจุดล้น" เท่ากับจำนวน count ที่ต้องการ</li>
<li>สูตรนี้เท่ากับ <code>65536 − N</code> ในเลขฐานสิบ ใช้ตรวจคำตอบได้</li>
<li>ตัวอย่างเสริม Square Wave 1 kHz ตรงกับโปรแกรมใน Lecture 5 หน้า 21 ทุกค่า</li>
</ul>''',
  '''<p><strong>ขั้นที่ 1: หาเวลา 1 count</strong></p>
<p><code>Machine Cycle = 12 / Fosc = 12 / 12 MHz = 1 µs</code> → 1 count = 1 µs</p>
<p><strong>ขั้นที่ 2: หาจำนวน count</strong></p>
<p><code>N = 100 µs ÷ 1 µs = 100 = 64H</code></p>
<p><strong>ขั้นที่ 3: หาค่าโหลด (Mode 1, 16 บิต)</strong></p>
<p><code>Count = FFFFH − 64H + 1 = FF9BH + 1 = FF9CH</code></p>
<p>ตรวจด้วยฐานสิบ: <code>65536 − 100 = 65436 = FF9CH</code></p>
<p><strong>ขั้นที่ 4: แยกโหลดเข้า SFR</strong> → <code>TH0 = FFH</code>, <code>TL0 = 9CH</code>, <code>TMOD = 01H (0000 0001B)</code></p>
''' + asm('''; DELAY_100US : Timer 0 Mode 1, Fosc = 12 MHz (รูปแบบเดียวกับ Lecture 5 หน้า 20)
DELAY_100US:
        MOV   TMOD, #01H      ; Timer 0, Mode 1 (16 บิต), C/T = 0
        MOV   TH0, #0FFH      ; ไบต์สูงของ FF9CH
        MOV   TL0, #9CH       ; ไบต์ต่ำของ FF9CH
        MOV   TCON, #10H      ; TR0 = 1 เริ่มนับ
WAIT100:
        JNB   TCON.5, WAIT100 ; รอ TF0 = 1 (ครบ 100 count)
        MOV   TCON, #00H      ; TR0 = 0 หยุด และ TF0 = 0
        RET''') + '''
<div class="box-info">
  <div class="box-info-header"><i class="fas fa-wave-square"></i> ตัวอย่างเสริม (Ex ในสมุด): Square Wave 1 kHz, High = Low = 0.5 ms</div>
  <p><code>T = 1 / 1 kHz = 1 ms</code> → ครึ่งคาบ <code>0.5 ms = 500 µs</code> → <code>N = 500 = 1F4H</code></p>
  <p><code>Count = FFFFH − 1F4H + 1 = FE0CH</code> (ตรวจ: <code>65536 − 500 = 65036 = FE0CH</code>) → <code>TH0 = FEH</code>, <code>TL0 = 0CH</code></p>
  <p>ทุกครั้งที่ TF0 = 1 ให้กลับสถานะขา (<code>CPL</code>) ครบ 2 ครั้ง = 1 คาบ</p>
</div>
''' + asm('''; Square wave 1 kHz บนขา TxD (P3.1) — ตาม Lecture 5 หน้า 21
        CLR   P3.1            ; เริ่มจาก TxD = 0
REPEAT:
        MOV   TMOD, #01H      ; Timer 0 Mode 1
        MOV   TL0, #0CH       ; count 500 = 1F4H -> FE0CH
        MOV   TH0, #0FEH
        MOV   TCON, #10H      ; เริ่ม Timer
WAIT_H:
        JNB   TCON.5, WAIT_H  ; รอ 0.5 ms
        CPL   P3.1            ; สลับขา = square wave
        MOV   TCON, #00H      ; หยุด Timer
        SJMP  REPEAT''', "8051 Assembly — Square Wave 1 kHz") +
  '<p style="margin-top:0.75rem; color: var(--text-muted); font-size: 0.88rem;">หมายเหตุเชิงวิศวกรรม: คำสั่งโหลดและวนลูปใช้ machine cycle เพิ่มอีกเล็กน้อย ครึ่งคาบจริงจึงยาวกว่า 500 µs ไม่กี่ µs ข้อสอบระดับนี้ไม่นำ overhead มาคิด</p>')

# ---------- Part 2: Q5-Q9
q(5, "control", 2, "TR ย่อมาจากอะไร",
  "TR ย่อมาจาก",
  "TR ย่อมาจาก Timer Run Control (TF = Timer Overflow Flag) — ถูกต้อง",
  refs(("L5", "หน้า 9")) + '''<ul>
<li>Lecture 5 หน้า 9: "TR1 and TR0 - Timer Run Control Bit — SET 1 = Start Counting Timer, Clear 0 = Halts Timer"</li>
<li>TR เป็นบิตที่ <strong>ซอฟต์แวร์</strong> เขียน ส่วน TF เป็นบิตที่ <strong>ฮาร์ดแวร์</strong> เซตเมื่อล้น</li>
<li>ในโค้ดรายวิชาใช้ <code>MOV TCON, #00010000B</code> เพื่อเซต TR0 (บิต 4) และ <code>JNB TCON.5</code> เพื่อรอ TF0 (บิต 5)</li>
</ul>''' + trap("คำตอบ \"Time Reference\" ถูกกากบาท TR ต้องเป็น <strong>Timer Run control bit</strong>"),
  table(["บิต TCON", "7", "6", "5", "4", "3", "2", "1", "0"], [
      ["ชื่อ", "TF1", "<strong>TR1</strong>", "TF0", "<strong>TR0</strong>", "IE1", "IT1", "IE0", "IT0"],
  ]) + '''<p><strong>คำตอบ:</strong> TR ย่อมาจาก <strong>Timer Run Control Bit</strong> (TR0 = TCON.4, TR1 = TCON.6) เซตเป็น 1 เพื่อเริ่มให้ Timer นับ และเคลียร์เป็น 0 เพื่อหยุด</p>
<p>คู่ที่ควรจำไปพร้อมกัน: <strong>TF = Timer Overflow Flag</strong> (TF0 = TCON.5, TF1 = TCON.7)</p>''')

q(6, "control", 2, "Negative Edge Trigger เป็นอย่างไร",
  "Negative Edge trigger เป็นอย่างไร",
  "เป็นการกระตุ้น trigger เมื่อสัญญาณเปลี่ยนสถานะจากระดับสูงไปสู่ระดับต่ำ — ถูกต้อง ควรเติมบิต IT0/IT1",
  refs(("L5", "หน้า 9, 10")) + '''<ul>
<li>Lecture 5 หน้า 10: "IT1 and IT0 - External Interrupt Type bit — SET 1 = INT1 and INT0 must be −ve edge trigger, Clear 0 = low level trigger"</li>
<li>Lecture 5 หน้า 9: IE0/IE1 เป็น 1 เมื่อ 8051 รับ interrupt ที่ INT0/INT1 และเคลียร์เมื่อ ISR ทำงาน</li>
<li>ข้อดีของ edge trigger: กดค้างนานแค่ไหนก็นับเป็น 1 เหตุการณ์ เพราะดูเฉพาะ "จังหวะที่ตกลง"</li>
</ul>''',
  '''<p><strong>คำตอบ:</strong> Negative Edge Trigger คือการกระตุ้น interrupt ณ <strong>ขอบขาลง</strong> เมื่อสัญญาณที่ขา INT0 (P3.2) หรือ INT1 (P3.3) เปลี่ยนจากลอจิก 1 เป็นลอจิก 0 เลือกได้โดยเซต <code>IT0 = 1</code> หรือ <code>IT1 = 1</code> ใน TCON</p>
''' + table(["IT0 / IT1", "ชนิดการกระตุ้น", "เกิด interrupt เมื่อ"], [
      ["<code>1</code>", "Negative edge trigger", "สัญญาณเปลี่ยน 1 → 0 (ครั้งเดียวต่อขอบ)"],
      ["<code>0</code>", "Low level trigger", "สัญญาณอยู่ที่ระดับ 0"],
  ]) + asm('''; ตั้ง INT0 เป็น negative edge (ตาม Lecture 6 หน้า 1)
        SETB  TCON.0          ; IT0 = 1 -> edge trigger''', "ตัวอย่างการตั้งค่า"))

q(7, "control", 2, "M1 และ M0 ใช้ทำอะไร",
  "M1 and M0 ใช้ทำอะไร",
  "ใช้ในการเลือกโหมดการทำงานของ Timer — ถูกต้อง แต่ควรตอบเป็นตาราง 4 โหมดเพื่อคะแนนเต็ม",
  refs(("L5", "หน้า 11, 15–19")) + '''<ul>
<li>Lecture 5 หน้า 11: "M1 &amp; M0 - Mode Control bits" อยู่ใน TMOD ของแต่ละ Timer (TMOD แบ่งครึ่ง: บิต 7–4 = Timer 1, บิต 3–0 = Timer 0)</li>
<li>TMOD แต่ละครึ่งเรียงเป็น <code>GATE | C/T | M1 | M0</code></li>
<li>รายละเอียดแต่ละโหมดมาจากสไลด์ Modes of Timer and Counter หน้า 15–19</li>
</ul>''',
  table(["M1 M0", "โหมด", "โครงสร้างตัวนับ", "นับได้สูงสุด", "Delay สูงสุด @ 12 MHz"], [
      ["<code>0 0</code>", "Mode 0", "13 บิต: TLX 5 บิต + THX 8 บิต", "2¹³ = 8,192", "8,192 µs"],
      ["<code>0 1</code>", "Mode 1", "16 บิต: TLX 8 บิต + THX 8 บิต", "2¹⁶ = 65,536", "65,536 µs"],
      ["<code>1 0</code>", "Mode 2", "8 บิต auto-reload: TLX นับ, THX โหลดคืนให้ TLX เมื่อล้น", "2⁸ = 256", "256 µs"],
      ["<code>1 1</code>", "Mode 3", "แยก Timer 0 เป็น 8 บิต 2 ตัว: TL0 → TF0, TH0 → TF1", "256 ต่อตัว", "256 µs"],
  ]) + '''<p><strong>คำตอบ:</strong> M1 และ M0 เป็น <strong>บิตเลือกโหมด (Mode Control bits)</strong> ใน TMOD กำหนดว่า Timer จะทำงานแบบ 13 บิต, 16 บิต, 8 บิต auto-reload หรือแยก 8 บิต 2 ตัว</p>
<p>ตัวอย่าง: <code>MOV TMOD, #01H</code> → Timer 0 ใช้ M1 M0 = 01 (Mode 1, 16 บิต) ซึ่งเป็นค่าที่ใช้ในทุกโปรแกรม Delay ของรายวิชา</p>''')

q(8, "control", 2, "ตั้งค่าให้ 8051 เป็น Counter ที่ขา T0",
  "ทำอย่างไรตั้งค่าให้ 8051 เป็น Counter สัญญาณที่ขา T0",
  "ตั้งค่าบิต C/T ใน TMOD Register SET ให้เป็น 1 — ถูกต้อง",
  refs(("L5", "หน้า 5, 11, 14")) + '''<ul>
<li>Lecture 5 หน้า 11: "C/T - Counter / Timer Type bit — SET 1 = Acts as Counter (External Frequency on T1 &amp; T0)"</li>
<li>ขา T0 คือ P3.4 (ขา 14 ของชิป 40 ขา ตาม pinout Lecture 5 หน้า 14)</li>
<li>C/T ของ Timer 0 อยู่ที่ TMOD บิต 2 เพราะครึ่งล่างของ TMOD คือ <code>GATE | C/T | M1 | M0</code> (บิต 3–0)</li>
</ul>''',
  table(["TMOD บิต", "7", "6", "5", "4", "3", "2", "1", "0"], [
      ["ชื่อ", "GATE", "C/T", "M1", "M0", "GATE", "<strong>C/T</strong>", "M1", "M0"],
      ["เป็นของ", "Timer 1", "Timer 1", "Timer 1", "Timer 1", "Timer 0", "<strong>Timer 0</strong>", "Timer 0", "Timer 0"],
      ["ค่า (05H)", "0", "0", "0", "0", "0", "<strong>1</strong>", "0", "1"],
  ]) + '''<ol>
<li>เซต <code>C/T = 1</code> ของ Timer 0 (TMOD.2) → นับพัลส์จากขา T0 (P3.4) แทน clock ภายใน</li>
<li>เลือกโหมด เช่น Mode 1 (M1 M0 = 01) และ <code>GATE = 0</code> → <code>TMOD = 00000101B = 05H</code></li>
<li>ล้างค่าเริ่ม <code>TH0 = TL0 = 00H</code> แล้ว <code>SETB TR0</code> ให้เริ่มนับ ค่าที่นับได้อ่านจาก TH0:TL0</li>
</ol>
''' + asm('''; Timer 0 เป็น Counter นับพัลส์ภายนอกที่ขา T0 (P3.4)
        MOV   TMOD, #05H      ; T0: GATE=0, C/T=1 (Counter), M1 M0 = 01
        MOV   TH0, #00H       ; เริ่มนับจาก 0
        MOV   TL0, #00H
        SETB  TR0             ; เริ่มนับพัลส์
        MOV   A, TL0          ; อ่านจำนวนพัลส์ (ไบต์ต่ำ)'''))

q(9, "control", 2, "Flowchart หน่วงเวลา (Delay) 10 µsec",
  "จงเขียน Flowchart ของโปรแกรมสำหรับการตั้งหน่วงเวลา (Delay) 10 µsec",
  "Flowchart แบบ Timer: Load TH0, TL0 → Set TR0 = 1 → Wait until TF0 = 1 → Clear TF0 → Stop Timer (TR0 = 0) → End ส่วน flowchart แบบ counter++ ถูกขีดฆ่าทิ้ง — แนวทางถูก ควรเพิ่มกล่อง TMOD และค่าตัวเลข FFF6H",
  refs(("LSM", "หน้า 5"), ("L5", "หน้า 4, 20")) + '''<ul>
<li>โจทย์จริงคือ <strong>10 µsec</strong> (ไม่ใช่ 100 µsec) ตรงกับซับรูทีน <code>delay</code> ใน Lab 5 หน้า 5 ที่เขียนคอมเมนต์ว่า "F6H delay 10usec"</li>
<li>คำนวณ: <code>N = 10 = 0AH</code> → <code>FFFFH − 0AH + 1 = FFF6H</code> → <code>TH0 = FFH</code>, <code>TL0 = F6H</code> (ตรวจ: <code>65536 − 10 = 65526 = FFF6H</code>)</li>
<li>Flowchart ที่ได้คะแนนต้องเป็นแบบใช้ Timer และต้องมี decision วนรอ TF0 แบบ software counter (counter++) ไม่ได้ใช้ฮาร์ดแวร์ Timer ตามที่บทเรียนสอน</li>
</ul>''',
  SVG_FLOW_Q9 + asm('''; DELAY_10US : Lab 5 delay subroutine (Fosc = 12 MHz)
DELAY_10US:
        MOV   TMOD, #01H      ; Timer 0 Mode 1
        MOV   TH0, #0FFH      ; 11111111B
        MOV   TL0, #0F6H      ; 11110110B -> FFF6H = 10 counts
        MOV   TCON, #10H      ; TR0 = 1 เริ่มนับ
WAIT10:
        JNB   TCON.5, WAIT10  ; รอ TF0 = 1
        MOV   TCON, #00H      ; TR0 = 0, TF0 = 0
        RET''') + '<p style="margin-top:0.75rem; color: var(--text-muted); font-size: 0.88rem;">หมายเหตุ: ที่ 10 µs คำสั่งโหลดค่า เริ่ม และหยุด Timer เองก็ใช้เวลาหลาย µs ดังนั้น delay รวมจริงยาวกว่า 10 µs แต่คำตอบที่ข้อสอบต้องการคือค่า <code>TH0 = FFH</code>, <code>TL0 = F6H</code> และลำดับขั้นใน Flowchart</p>')

# ---------- Part 3: Q10-Q16
q(10, "serial", 3, "รีจิสเตอร์สำหรับรับส่งข้อมูลผ่าน TxD / RxD",
  "รีจิสเตอร์ที่ใช้ในการรับส่งข้อมูลสำหรับการสื่อสารผ่าน TxD และ RxD",
  "SCON ใช้ควบคุมการรับส่งข้อมูล และ SBUF ใช้ในการเก็บข้อมูลที่จะส่งหรือรับเข้ามา — ถูกต้อง",
  refs(("L6", "หน้า 2–6"), ("L3", "หน้า 12")) + '''<ul>
<li>Lecture 6 หน้า 2: TxD (P3.1) สำหรับส่ง, RxD (P3.0) สำหรับรับ, SBUF (8 บิต) ส่งและรับข้อมูลแบบอนุกรม ส่ง LSB ก่อน MSB สุดท้าย</li>
<li>Lecture 6 หน้า 2: "To configure serial communication, we need to configure SCON register"</li>
<li>Lecture 3 หน้า 12: SCON = Serial Port Control (98H, bit addressable 9FH–98H), SBUF = Serial Port Data Buffer (99H)</li>
</ul>''' + trap("คำตอบที่ตอบเพียง \"SBUF\" ถูกกากบาท ต้องตอบ<strong>ครบทั้งคู่</strong>: SCON (ควบคุม) และ SBUF (ข้อมูล)"),
  table(["รีจิสเตอร์", "แอดเดรส", "หน้าที่"], [
      ["<code>SBUF</code>", "99H", "บัฟเฟอร์ข้อมูล 8 บิต: <code>MOV SBUF, A</code> = ส่งออก TxD, <code>MOV A, SBUF</code> = อ่านข้อมูลที่รับจาก RxD"],
      ["<code>SCON</code>", "98H", "เลือกโหมด (SM0, SM1), เปิดรับ (REN), บิตที่ 9 (TB8, RB8) และแฟล็ก TI/RI"],
  ]) + table(["SCON บิต", "7", "6", "5", "4", "3", "2", "1", "0"], [
      ["ชื่อ", "SM0", "SM1", "SM2", "REN", "TB8", "RB8", "TI", "RI"],
  ]) + '<p><strong>คำตอบ:</strong> ใช้ <strong>SCON</strong> (Serial Control Register) กำหนดโหมดและควบคุมการรับส่ง และ <strong>SBUF</strong> (Serial Buffer) เก็บข้อมูล 8 บิตที่จะส่งออกทาง TxD หรือที่รับเข้ามาทาง RxD เมื่อส่งครบ 1 ไบต์ TI = 1 เมื่อรับครบ RI = 1</p>')

q(11, "serial", 3, "Shift Register (Mode 0) ต่างจาก 8-bit UART (Mode 1)",
  "การส่งข้อมูลแบบ Shift Register แตกต่างจาก 8 bit UART อย่างไร",
  "Shift Register (Mode 0) เป็นแบบ Synchronous ใช้ส่งแค่ data เท่านั้น ส่วน 8 bit UART (Mode 1) เป็นแบบ Asynchronous มี Start bit 0 และ Stop bit 1 เป็นตัวกำหนดขอบข้อมูล — ถูกต้อง",
  refs(("L6", "หน้า 4–5")) + '''<ul>
<li>Lecture 6 หน้า 4: ตาราง SM0 SM1 → Mode 0 Shift Register (Fosc/12), Mode 1 8-bit UART (Variable), Mode 2 9-bit UART (Fosc/32 หรือ Fosc/64), Mode 3 9-bit UART (Variable)</li>
<li>Lecture 6 หน้า 5: "Mode 0 {Shift Register sends only data}", "Mode 1 {8 Bit UART, 1st Start bit 0, then 8 bits data and at last stop bit 1}"</li>
<li>เพราะ Mode 1 มี start/stop bit ผู้รับจึงหาจุดเริ่มต้นของข้อมูลได้เองโดยไม่ต้องใช้ clock ร่วม (asynchronous)</li>
</ul>''',
  '<p><strong>รูปแบบเฟรม (ส่ง LSB ก่อน):</strong></p><p>Mode 0 — Shift Register</p>' + FRAME_M0 +
  '<p>Mode 1 — 8-bit UART (10 บิตต่อเฟรม)</p>' + FRAME_M1 +
  table(["หัวข้อ", "Shift Register (Mode 0)", "8-bit UART (Mode 1)"], [
      ["SM0 SM1", "<code>0 0</code>", "<code>0 1</code>"],
      ["ข้อมูลในเฟรม", "เฉพาะ 8 data bits", "Start 0 + 8 data bits + Stop 1"],
      ["Baud rate", "คงที่ <code>Fosc/12</code> (1 MHz ที่ 12 MHz)", "ปรับได้ (Variable) ตั้งจาก Timer 1"],
      ["ลักษณะ", "Synchronous", "Asynchronous"],
  ]) + '<p><strong>คำตอบ:</strong> Shift Register (Mode 0) ส่งเฉพาะข้อมูล 8 บิต ไม่มี start/stop bit และ baud rate คงที่ที่ Fosc/12 ส่วน 8-bit UART (Mode 1) ห่อข้อมูลด้วย start bit 0 และ stop bit 1 เป็นเฟรม 10 บิต ใช้สื่อสารแบบ asynchronous และกำหนด baud rate ได้</p>')

q(12, "serial", 3, "9-bit UART ต่างจาก 8-bit UART อย่างไร",
  "การส่งข้อมูลแบบ 9 bit UART แตกต่างจาก 8 bit UART อย่างไร",
  "9 bit UART จะเพิ่ม 1 bit parity เข้ามา — ถูกต้อง ควรระบุว่าบิตนี้มาจาก TB8 และรับเข้าที่ RB8",
  refs(("L6", "หน้า 4–6")) + '''<ul>
<li>Lecture 6 หน้า 5: "Mode 2 &amp; 3 {9 Bit UART, 1st Start bit 0, then 8 bits data, 1 bit parity and at last stop bit 1}"</li>
<li>Lecture 6 หน้า 6: TB8 = programmable 9th bit ในโหมด 2 และ 3 ("Parity bit, programmed by programmer") และ RB8 = บิตที่ 9 ที่รับเข้ามา</li>
<li>SM2 ใช้เปิดระบบ Multiprocessor ได้เฉพาะ Mode 2 และ 3 เพราะอาศัยบิตที่ 9 นี้</li>
</ul>''',
  '<p>Mode 1 — 8-bit UART (10 บิต)</p>' + FRAME_M1 + '<p>Mode 2 / 3 — 9-bit UART (11 บิต)</p>' + FRAME_M23 +
  table(["หัวข้อ", "8-bit UART (Mode 1)", "9-bit UART (Mode 2 / 3)"], [
      ["บิตต่อเฟรม", "10 (Start + 8 + Stop)", "11 (Start + 8 + บิตที่ 9 + Stop)"],
      ["บิตที่ 9", "ไม่มี (RB8 เก็บ stop bit)", "ส่งจาก <code>TB8</code>, รับเข้า <code>RB8</code>"],
      ["Baud rate", "Variable", "Mode 2: Fosc/32 หรือ Fosc/64 · Mode 3: Variable"],
      ["Multiprocessor (SM2)", "ไม่ใช้", "ใช้ได้"],
  ]) + '<p><strong>คำตอบ:</strong> 9-bit UART เพิ่ม<strong>บิตข้อมูลที่ 9</strong> (มักใช้เป็น parity bit) ต่อจาก 8 data bits ก่อน stop bit ทำให้เฟรมยาว 11 บิต ผู้เขียนโปรแกรมกำหนดค่าบิตนี้ผ่าน TB8 ตอนส่ง และอ่านจาก RB8 ตอนรับ ขณะที่ 8-bit UART มีเฟรม 10 บิตไม่มีบิตที่ 9</p>')

q(13, "serial", 3, "8051 มี 5 Interrupt ได้แก่อะไรบ้าง",
  "8051 มี 5 Interrupt ได้แก่",
  "INT0, INT1, TF0, TF1, RI/TI และหมายเหตุว่า interrupt เริ่มทำงานที่ 0003H — ถูกต้อง",
  refs(("L6", "หน้า 8, 9")) + '''<ul>
<li>Lecture 6 หน้า 8: "8051 has five interrupts and all are vectored interrupt" — 2 hardware (INT0, INT1), 2 timer overflow (TF0, TF1), 1 serial (common for RI and TI)</li>
<li>Reset (0000H) ไม่นับเป็นหนึ่งใน 5 interrupt</li>
<li>Serial มีแฟล็ก 2 ตัวแต่ใช้ Vector เดียว ISR ต้องตรวจเองว่าเกิดจาก RI หรือ TI</li>
</ul>''',
  table(["#", "Interrupt", "แหล่งกำเนิด", "แฟล็ก", "Vector"], [
      ["1", "External 0 (<code>INT0</code>)", "ขา P3.2", "IE0 (TCON.1)", "<code>0003H</code>"],
      ["2", "Timer 0 Overflow (<code>TF0</code>)", "Timer 0 ล้น", "TF0 (TCON.5)", "<code>000BH</code>"],
      ["3", "External 1 (<code>INT1</code>)", "ขา P3.3", "IE1 (TCON.3)", "<code>0013H</code>"],
      ["4", "Timer 1 Overflow (<code>TF1</code>)", "Timer 1 ล้น", "TF1 (TCON.7)", "<code>001BH</code>"],
      ["5", "Serial (<code>RI</code> หรือ <code>TI</code>)", "รับ/ส่งครบ 1 ไบต์", "RI (SCON.0), TI (SCON.1)", "<code>0023H</code>"],
  ]) + '<p><strong>คำตอบ:</strong> INT0, TF0 (Timer 0 Overflow), INT1, TF1 (Timer 1 Overflow) และ Serial Port Interrupt (RI หรือ TI)</p>')

q(14, "serial", 3, "8051 มี Interrupt กี่ประเภท",
  "8051 มี Interrupt กี่ประเภท",
  "มี 3 ประเภท คือ External Interrupt, Timer Overflow Internal Interrupt และ Serial Communication Internal Interrupt (ISR = Interrupt Service Routine) — ถูกต้อง",
  refs(("L6", "หน้า 8")) + '''<ul>
<li>ข้อ 13 ถามว่า "มีอะไรบ้าง" (5 ตัว) ส่วนข้อ 14 ถาม "กี่ประเภท" ให้จัดกลุ่มตามแหล่งกำเนิดที่ Lecture 6 หน้า 8 แบ่งไว้</li>
<li>คำว่า Edge / Level trigger เป็น "วิธีกระตุ้น" ของ INT0/INT1 (ข้อ 6) ไม่ใช่ประเภทของ interrupt</li>
</ul>''' + trap("คำตอบ \"Edge trigger interrupt และ Level trigger interrupt\" ถูกกากบาท เพราะเป็นชนิดการกระตุ้น ไม่ใช่ประเภทแหล่งกำเนิด คำตอบที่ได้คะแนนคือ \"มี 3 ประเภท\""),
  table(["ประเภท", "สมาชิก", "จำนวน"], [
      ["1. External hardware interrupt", "INT0, INT1", "2"],
      ["2. Timer overflow internal interrupt", "TF0, TF1", "2"],
      ["3. Serial communication internal interrupt", "RI / TI (ใช้ร่วมกัน)", "1"],
  ]) + '<p><strong>คำตอบ:</strong> <strong>3 ประเภท</strong> ได้แก่ External Interrupt (INT0, INT1), Timer Overflow Interrupt (TF0, TF1) และ Serial Communication Interrupt (RI/TI) รวมเป็น 5 interrupt</p>')

q(15, "serial", 3, "Register ที่เก็บสถานะของโปรแกรม (PC)",
  "8051 ใช้ Register อะไรในการเก็บสถานะของโปรแกรม (PC)",
  "Program Counter (PC) — ถูกต้อง",
  refs(("L1", "Architecture"), ("L6", "หน้า 9")) + '''<ul>
<li>Lecture 1: 8051 มี "16 bit program counter register (PC)" จึงอ้างถึงหน่วยความจำโปรแกรมได้ 64 KB</li>
<li>Lecture 6 หน้า 9 (ภาพลำดับการเกิด interrupt): เมื่อ interrupt เกิด → <strong>PUSH PC</strong> ลง Stack → กระโดดไป Vector → ทำ ISR → <strong>RETI</strong> → <strong>POP PC</strong> กลับมาทำงานต่อที่เดิม</li>
<li>โจทย์ใส่ "(PC)" ไว้ในวงเล็บแล้ว สิ่งที่ต้องเขียนคือชื่อเต็มและหน้าที่</li>
</ul>''' + trap("คำตอบ \"SCON\" ถูกกากบาท SCON เป็นรีจิสเตอร์ของพอร์ตอนุกรม ไม่เกี่ยวกับตำแหน่งการทำงานของโปรแกรม"),
  '''<p><strong>คำตอบ:</strong> <strong>Program Counter (PC)</strong> ขนาด 16 บิต เก็บแอดเดรสของคำสั่งถัดไปที่ CPU จะดึงมาทำงาน</p>
<ol>
<li>ทำงานปกติ: PC เพิ่มค่าตามความยาวคำสั่งทุกครั้งที่ fetch</li>
<li>เกิด interrupt: ฮาร์ดแวร์ PUSH PC ลง Stack (ผ่าน SP) แล้วโหลด PC ด้วย Vector Address</li>
<li>จบ ISR ด้วย <code>RETI</code>: POP ค่า PC เดิมกลับ โปรแกรมหลักทำงานต่อจากจุดที่ถูกขัดจังหวะ</li>
</ol>''')

q(16, "serial", 3, "Vector Address คืออะไร",
  "Vector Address คืออะไร",
  "ที่อยู่เริ่มต้นของคำสั่งสำหรับ ISR ของแต่ละ interrupt — ถูกต้อง",
  refs(("L6", "หน้า 1, 9, 13")) + '''<ul>
<li>Lecture 6 หน้า 8: interrupt ทั้ง 5 เป็น "vectored interrupt" คือแต่ละตัวมีแอดเดรสปลายทางตายตัว</li>
<li>Lecture 6 หน้า 13: ตาราง Vector: Reset 0000, INT0 0003, Timer0 000B, INT1 0013, Timer1 001B, Serial 0023</li>
<li>Vector ห่างกันเพียง 8 ไบต์ จึงนิยมวาง <code>AJMP</code>/<code>LJMP</code> ไปยัง ISR ตัวจริง ตามตัวอย่าง Lecture 6 หน้า 1</li>
</ul>''',
  '''<p><strong>คำตอบ:</strong> Vector Address คือ<strong>แอดเดรสคงที่ในหน่วยความจำโปรแกรม</strong>ที่ CPU จะกระโดดไปเมื่อเกิด interrupt แต่ละชนิด เป็นจุดเริ่มต้นของ ISR (Interrupt Service Routine) ของ interrupt นั้น</p>
''' + table(["Source", "Vector Address", "ลำดับ Priority"], [
      ["Reset", "<code>0000H</code>", "—"],
      ["INT0", "<code>0003H</code>", "1"],
      ["TF0", "<code>000BH</code>", "2"],
      ["INT1", "<code>0013H</code>", "3"],
      ["TF1", "<code>001BH</code>", "4"],
      ["Serial (RI/TI)", "<code>0023H</code>", "5"],
  ]) + asm('''; โครง Vector Table จาก Lecture 6 หน้า 1 (เพิ่ม EA ให้เปิดได้จริง)
        ORG   0000H
        AJMP  START           ; Reset vector
        ORG   0003H
        AJMP  COUNT           ; INT0 vector -> ISR ตัวจริง
        ORG   0030H
START:
        MOV   IE, #10000001B  ; EA = 1, EX0 = 1
        SETB  TCON.0          ; IT0 = 1 (edge trigger)
        MOV   40H, #00H
HERE:
        SJMP  HERE            ; รอ interrupt
COUNT:
        MOV   A, 40H          ; ISR: นับจำนวนครั้งที่กด
        INC   A
        MOV   40H, A
        RETI''', "8051 Assembly — Vector + ISR"))

# ---------- Part 4: Q17-Q21
q(17, "fsm", 4, "IE Register ย่อมาจากอะไร",
  "IE Register ย่อมาจาก",
  "Interrupt Enable Register (และหมายเหตุ IP = Interrupt Priority Register) — ถูกต้อง",
  refs(("L6", "หน้า 10, 11"), ("L3", "หน้า 12")) + '''<ul>
<li>Lecture 6 หน้า 10: "IE - Interrupt Enable Register {Bit Addressable IE.7 to IE.0}" เขียน 1 = เปิด, 0 = ปิด</li>
<li>Lecture 6 หน้า 11: IP - Interrupt Priority Register เขียน 1 = high priority, 0 = low priority</li>
<li>Lecture 3 หน้า 12: IE อยู่ที่ A8H, IP อยู่ที่ B8H</li>
<li>จุดที่พลาดบ่อย: ต้องเปิด <strong>EA</strong> (Enable All) ด้วยเสมอ ไม่เช่นนั้นบิตย่อยทุกบิตไม่มีผล ตัวอย่างใน Lecture 6 หน้า 1 เขียน <code>00000001B</code> (EX0 อย่างเดียว) ถ้าใช้งานจริงต้องเป็น <code>10000001B</code></li>
</ul>''',
  table(["IE บิต", "7", "6", "5", "4", "3", "2", "1", "0"], [
      ["ชื่อ", "EA", "—", "ET2", "ES", "ET1", "EX1", "ET0", "EX0"],
      ["ความหมาย", "Enable All", "—", "Reserved", "Serial", "Timer 1", "INT1", "Timer 0", "INT0"],
  ]) + table(["IP บิต", "7", "6", "5", "4", "3", "2", "1", "0"], [
      ["ชื่อ", "—", "—", "PT2", "PS", "PT1", "PX1", "PT0", "PX0"],
  ]) + '<p><strong>คำตอบ:</strong> IE ย่อมาจาก <strong>Interrupt Enable Register</strong> (SFR A8H) ใช้เปิด/ปิด interrupt รวม (EA) และรายตัว (ES, ET1, EX1, ET0, EX0) เช่น เปิด Timer 0 interrupt: <code>MOV IE, #82H</code> (EA = 1, ET0 = 1)</p>')

q(18, "fsm", 4, "Interrupt ที่มีความสำคัญสูงเป็นลำดับ 2",
  "Interrupt ที่มีความสำคัญสูงลำดับ 2",
  "TF0 (Timer 0 Overflow) พร้อมเขียนลำดับ INT0 = 1, TF0 = 2, INT1 = 3, TF1 = 4, RI/TI = 5 — ถูกต้อง",
  refs(("L6", "หน้า 9, 11")) + '''<ul>
<li>Lecture 6 หน้า 9: ตาราง Priority and Vector Address — INT0 (1), TF0 (2), INT1 (3), TF1 (4), Serial (5)</li>
<li>ลำดับนี้คือ natural priority เมื่อ IP = 00H (0000 0000B) (ทุกตัวอยู่ระดับ low เท่ากัน) ถ้าตั้งบิตใน IP (Lecture 6 หน้า 11) ตัวที่ตั้งเป็น high จะมาก่อน</li>
<li>สังเกต: ลำดับ priority เรียงตามแอดเดรส Vector จากน้อยไปมาก</li>
</ul>''' + trap("คำตอบ \"Timer Interrupt\" ถูกกากบาท เพราะมี Timer 2 ตัว ต้องระบุให้ชัดว่าเป็น <strong>Timer 0 Overflow (TF0)</strong>"),
  table(["ลำดับ", "Interrupt", "Vector"], [
      ["1 (สูงสุด)", "INT0", "0003H"],
      ["<strong>2</strong>", "<strong>TF0 — Timer 0 Overflow</strong>", "<strong>000BH</strong>"],
      ["3", "INT1", "0013H"],
      ["4", "TF1 — Timer 1 Overflow", "001BH"],
      ["5 (ต่ำสุด)", "Serial (RI / TI)", "0023H"],
  ]) + '<p><strong>คำตอบ:</strong> <strong>TF0 (Timer 0 Overflow Interrupt)</strong> Vector 000BH เป็นลำดับที่ 2 รองจาก INT0 ตามลำดับเริ่มต้นของ 8051</p>')

q(19, "fsm", 4, "เพิ่ม/ลดความเร็วมอเตอร์ DC ด้วย 8051",
  "การเพิ่มลดความเร็วมอเตอร์กระแสตรงด้วย 8051 ทำได้โดยใช้วิธีการอะไร",
  "เปลี่ยนปริมาณพลังงานที่ใช้โดยใช้เทคนิค PWM (Pulse Width Modulation) — ถูกต้อง",
  refs(("MZ16", "Section 16.1")) + '''<ul>
<li>Mazidi 16.1: "By changing (modulating) the width of the pulse applied to the DC motor we can increase or decrease the amount of power provided to the motor"</li>
<li>แรงดันมีแอมพลิจูดคงที่ แต่ duty cycle เปลี่ยนได้ — พัลส์กว้างขึ้น ความเร็วสูงขึ้น</li>
<li>8051 รุ่นมาตรฐานไม่มีวงจร PWM ในตัว จึงสร้างด้วยซอฟต์แวร์ + Timer: ตั้งเวลา ON และ OFF สลับกันบนขาพอร์ต</li>
<li>ขาพอร์ตจ่ายกระแสมอเตอร์ตรงไม่ได้ ต้องผ่านวงจรขับ เช่น H-Bridge หรือชิป L298 (Mazidi Figure 16-6)</li>
</ul>''',
  SVG_PWM_Q19 + '''<p><code>Duty Cycle = Ton ÷ (Ton + Toff) × 100%</code></p>
<p><strong>ตัวอย่างออกแบบ</strong> (คาบ 1 ms, duty 75%): <code>Ton = 750 µs</code> → <code>65536 − 750 = 64786 = FD12H</code> และ <code>Toff = 250 µs</code> → <code>65536 − 250 = 65286 = FF06H</code> สลับโหลดสองค่านี้เข้า TH0/TL0 ทุกครั้งที่ Timer ล้น แล้ว <code>CPL</code> ขาที่ต่อวงจรขับมอเตอร์</p>
<p><strong>คำตอบ:</strong> ใช้ <strong>PWM (Pulse Width Modulation)</strong> ส่งพัลส์ที่มีคาบคงที่ไปยังวงจรขับมอเตอร์ แล้วปรับความกว้างพัลส์ (duty cycle) ด้วย Timer ของ 8051 duty มาก = กำลังเฉลี่ยมาก = หมุนเร็ว duty น้อย = หมุนช้า</p>''')

q(20, "fsm", 4, "เปลี่ยนทิศทางการหมุนมอเตอร์ DC ด้วย 8051",
  "การเปลี่ยนทิศทางการหมุนของมอเตอร์กระแสตรงด้วย 8051 ทำได้โดยใช้วิธีการอะไร",
  "สลับขั้วมอเตอร์ (ควบคุม H-Bridge) — ถูกต้อง",
  refs(("MZ16", "Section 16.1, Fig. 16-2 ถึง 16-5, Table 16-2")) + '''<ul>
<li>Mazidi 16.1: "Connecting them to a DC voltage source moves the motor in one direction. By reversing the polarity, the DC motor will move in the opposite direction."</li>
<li>H-Bridge ใช้สวิตช์ 4 ตัวรอบมอเตอร์: ปิด SW1 และ SW4 → หมุนทางหนึ่ง, ปิด SW2 และ SW3 → กระแสไหลย้อน หมุนอีกทาง</li>
<li>Figure 16-5 / Table 16-2: การปิดสวิตช์ผิดคู่ (แถว Invalid) ทำให้ลัดวงจรจาก +V ลงกราวด์ วงจรจริงต้องป้องกันไม่ให้เกิด</li>
</ul>''',
  SVG_HB_Q20 + table(["การทำงาน (Table 16-2)", "SW1", "SW2", "SW3", "SW4"], [
      ["หยุด (Off)", "Open", "Open", "Open", "Open"],
      ["หมุนตามเข็ม (Clockwise)", "<strong>Closed</strong>", "Open", "Open", "<strong>Closed</strong>"],
      ["หมุนทวนเข็ม (Counterclockwise)", "Open", "<strong>Closed</strong>", "<strong>Closed</strong>", "Open"],
      ["ห้ามใช้ (Invalid — ลัดวงจร)", "Closed", "Closed", "Closed", "Closed"],
  ]) + '<p><strong>คำตอบ:</strong> เปลี่ยนทิศทางโดย<strong>กลับขั้วแรงดัน</strong>ที่จ่ายให้มอเตอร์ผ่านวงจร <strong>H-Bridge</strong> 8051 ใช้ขาพอร์ต 2 ขาสั่งคู่สวิตช์ (SW1+SW4 หรือ SW2+SW3) เพื่อเลือกทิศการไหลของกระแสผ่านมอเตอร์</p>')

q(21, "fsm", 4, "โปรแกรม Ready State จาก State chart และ Hardware Diagram [5 คะแนน]",
  "จงเขียนโปรแกรมสำหรับ Ready State โดยกำหนดให้ State chart และ Hardware Diagram [5]",
  "วาด State chart (Ready --push--> Go, Go --timer--> Ready, Go --push--> Go), กำหนด P1.1 = คนสีแดง, P1.0 = คนสีเขียว, P2.0 = ปุ่มกด และเขียนโค้ด ReadyState / GoState / delay ครบ 3 ส่วน — ตรงกับ Lab 5",
  refs(("LSM", "หน้า 2–5")) + '''<ul>
<li>โจทย์นี้คือ <strong>Lab 5 "Traffic 1"</strong> จากเอกสาร Programming for a State Machine ทั้งรูป State chart และขา P1.1 / P1.0 / P2.0</li>
<li>Ready State = สัญญาณคนสีแดง (หยุด), Go State = สัญญาณคนสีเขียว (เดินได้) ตามรูปบนกระดาษข้อสอบ</li>
<li>Lab 5 ใช้ <code>R0</code> เก็บหมายเลขสถานะ (01H = Ready, 02H = Go) และ <code>R1</code> เป็นตัวนับรอบ delay</li>
<li>สไลด์ใช้ <code>JB P2.0, GoState</code> แปลว่าบอร์ดแล็บต่อปุ่มให้ <strong>กด = 1</strong> ถ้าต่อปุ่มแบบ active-low (pull-up, กด = 0) ให้เปลี่ยนเป็น <code>JNB</code></li>
<li>ใน Go State ถ้ากดปุ่มอีกครั้งหลังครบเวลา โปรแกรมกลับไปเริ่ม Go ใหม่ (เส้น push วนกลับตัวเองใน State chart)</li>
</ul>''',
  '<div class="fig-grid">' + SVG_STATE_Q21 + SVG_HW_Q21 + '</div>' +
  table(["State", "R0", "P1.1 (คนสีแดง)", "P1.0 (คนสีเขียว)", "เงื่อนไขออก"], [
      ["Ready", "01H", "1 (ON)", "0 (OFF)", "P2.0 = 1 (push) → Go"],
      ["Go", "02H", "0 (OFF)", "1 (ON)", "ครบ R1 × 10 µs → ตรวจ P2.0: กดอยู่ → Go ใหม่, ไม่กด → Ready"],
  ]) + asm('''; ===============================================================
; Ready / Go pedestrian FSM  (Lab 5 "Traffic 1", Fosc = 12 MHz)
; Output : P1.1 = คนสีแดง (Ready), P1.0 = คนสีเขียว (Go)
; Input  : P2.0 = ปุ่มกด (บอร์ดแล็บ: กด = 1)
; State  : R0 = 01H Ready, R0 = 02H Go
; ===============================================================
        ORG   0000H
ReadyState:
        MOV   R0, #01H        ; state 1 = Ready
        SETB  P1.1            ; คนสีแดง ON
        CLR   P1.0            ; คนสีเขียว OFF
        JB    P2.0, GoState   ; push -> Go State
        SJMP  ReadyState      ; ไม่กด -> อยู่ Ready

GoState:
        MOV   R0, #02H        ; state 2 = Go
        CLR   P1.1            ; คนสีแดง OFF
        SETB  P1.0            ; คนสีเขียว ON
        MOV   R1, #10         ; 10 รอบ x 10 us = 100 us
Timer:
        ACALL Delay           ; สไลด์เขียน call delay
        DJNZ  R1, Timer
        JB    P2.0, GoState   ; ยังกดอยู่ -> เริ่ม Go ใหม่
        SJMP  ReadyState      ; timer หมด -> Ready

; ---- Delay 10 us : Timer 0 Mode 1, FFF6H ----
Delay:
        MOV   TMOD, #01H      ; Timer 0 Mode 1
        MOV   TH0, #0FFH      ; 11111111B
        MOV   TL0, #0F6H      ; 11110110B -> 10 counts
        MOV   TCON, #10H      ; TR0 = 1 เริ่มนับ
Wait:
        JNB   TCON.5, Wait    ; รอ TF0
        MOV   TCON, #00H      ; หยุด Timer, ล้าง TF0
        RET
        END''', "8051 Assembly — Ready / Go FSM") + '''
<div class="box-info">
  <div class="box-info-header"><i class="fas fa-ruler-combined"></i> ขยายผล: ถ้าอยากให้ไฟเขียวติดนานพอให้คนเดินข้ามจริง</div>
  <p>โค้ดแล็บตั้งใจ 10 × 10 µs = 100 µs แต่แบบจำลองนับได้ราว 288 µs เพราะ overhead ของคำสั่ง (ดูบทเรียนเชิงลึก) ซึ่งยังสั้นเกินกว่าตาจะเห็น ถ้าต้องการ 1 วินาที ให้เปลี่ยน Delay เป็น 50 ms: <code>N = 50000 = C350H</code> → <code>65536 − 50000 = 15536 = 3CB0H</code> (<code>TH0 = 3CH</code>, <code>TL0 = B0H</code>) แล้วตั้ง <code>R1 = 20</code> → <code>20 × 50 ms = 1 s</code> โครงสร้าง FSM เดิมไม่ต้องเปลี่ยน</p>
</div>
<p><strong>เกณฑ์ 5 คะแนนที่ควรมีครบ:</strong> (1) State chart พร้อมเงื่อนไข push / timer (2) Hardware Diagram ขา P1.1, P1.0, P2.0 (3) โค้ด Ready State (4) โค้ด Go State + การวนนับเวลา (5) ซับรูทีน Delay ด้วย Timer 0</p>''')

# ---------------------------------------------------------------- page assembly
PARTS = {
    1: ("timer", "fa-stopwatch", "var(--accent-cyan)", "ตอนที่ 1: Timers &amp; Counters (ข้อ 1–4)",
        "Timer vs Counter, ขนาดรีจิสเตอร์ TH/TL, การล้น และการคำนวณค่าโหลด 100 µs (+ Square Wave 1 kHz)"),
    2: ("control", "fa-sliders-h", "var(--accent-blue)", "ตอนที่ 2: Control &amp; Modes (ข้อ 5–9)",
        "บิต TR/TF, Negative edge trigger, M1 M0, C/T สำหรับ Counter และ Flowchart Delay 10 µs"),
    3: ("serial", "fa-network-wired", "var(--accent-green)", "ตอนที่ 3: Serial &amp; Interrupts (ข้อ 10–16)",
        "SCON/SBUF, Mode 0 / 1 / 2-3, 5 interrupts, 3 ประเภท, Program Counter และ Vector Address"),
    4: ("fsm", "fa-project-diagram", "var(--accent-amber)", "ตอนที่ 4: Priority, Motors &amp; FSM (ข้อ 17–21)",
        "IE/IP, ลำดับ Priority, PWM, H-Bridge และโปรแกรม Ready / Go State Machine"),
}

TOC_SHORT = {1: "Timer vs Counter", 2: "16 บิต TH/TL", 3: "Overflow FFFFH → 0000H", 4: "คำนวณ 100 µs (FF9CH)",
             5: "TR = Timer Run", 6: "Negative Edge", 7: "M1 M0 เลือกโหมด", 8: "Counter ที่ขา T0",
             9: "Flowchart 10 µs", 10: "SCON + SBUF", 11: "Shift Reg vs 8-bit UART", 12: "9-bit vs 8-bit UART",
             13: "5 Interrupts", 14: "3 ประเภท", 15: "Program Counter", 16: "Vector Address",
             17: "IE Register", 18: "Priority ลำดับ 2 = TF0", 19: "PWM ความเร็ว", 20: "H-Bridge ทิศทาง",
             21: "Ready / Go FSM [5]"}


WIDGET_AT = {4: "timer", 7: "sfr", 12: "uart", 16: "irq", 20: "motor", 21: "fsm"}
SECTIONS = [  # (key, number label, Thai title, English subtitle, icon)
    ("terms", "ศัพท์และที่มา", "Terminology &amp; Etymology", "fa-language"),
    ("physics", "ฟิสิกส์และฮาร์ดแวร์ซิลิคอน", "Physics &amp; Silicon", "fa-microchip"),
    ("analogy", "กลไกเชิงสัญชาตญาณ", "Intuitive Mechanism", "fa-lightbulb"),
    ("derive", "คำนวณทีละขั้น", "Step-by-Step Derivation", "fa-calculator"),
    ("asm", "วิเคราะห์ Assembly ทีละบรรทัด", "Assembly Analysis", "fa-code"),
    ("whatif", "ถ้าเปลี่ยนเงื่อนไข", "What-If Exploration", "fa-flask"),
    ("traps", "กับดักที่เสียคะแนน", "Common Traps", "fa-triangle-exclamation"),
    ("drill", "แบบฝึกหัดทดสอบตนเอง", "Self-Assessment Drill", "fa-dumbbell"),
    ("blueprint", "พิมพ์เขียวคำตอบคะแนนเต็ม", "Full-Mark Blueprint", "fa-clipboard-check"),
    ("sources", "แหล่งอ้างอิงและแผนภาพ", "Sources &amp; Schematics", "fa-book"),
]


def lst_listing(program):
    """FSM listing: one span per source line (data-line = 0-based line index used by sim8051.js)."""
    out = []
    for i, ln in enumerate(program.split("\n")):
        code_part, sep, cmt = ln.partition(";")
        h = _hl_code(code_part)
        if sep:
            h += f'<span class="comment">{esc(";" + cmt)}</span>'
        out.append(f'<span class="lst-line" data-line="{i}">{h or " "}</span>')
    return "".join(out)  # each span is display:block, so no newline characters between them


WIDGET_HTML = {
    "timer": widgets.TIMER_WORKBENCH, "sfr": widgets.SFR_FLIPPER, "uart": widgets.UART_FRAME,
    "irq": widgets.IRQ_EXPLORER, "motor": widgets.MOTOR_SANDBOX,
    "fsm": widgets.fsm_simulator(lst_listing(widgets.LAB5_PROGRAM)),
}


def sec(num, title, sub, icon, body):
    return (f'<section class="deep-sec"><h4><span class="deep-num">{num}</span>'
            f'<i class="fas {icon}" aria-hidden="true"></i> {title} <small>{sub}</small></h4>{body}</section>')


def deep_lesson(n, les):
    parts, num = [], 0
    for key, title, sub, icon in SECTIONS:
        if key == "asm" and not les.get("asm"):
            continue  # section 5 appears only when the question has code
        num += 1
        if key == "terms":
            body = table(["คำศัพท์", "อ่านว่า", "ความหมาย / ที่มา"],
                         [(f"<strong>{t}</strong>", p, m) for t, p, m in les["terms"]])
        elif key == "analogy":
            body = (f'<p><strong>อุปมา:</strong> {les["analogy"]}</p>'
                    f'<p class="deep-limit"><i class="fas fa-ruler" aria-hidden="true"></i> <strong>ขอบเขตของอุปมา:</strong> {les["limits"]}</p>')
        elif key == "asm":
            body = table(["คำสั่ง", "ทำอะไร", "Machine cycles", "Flag ใน PSW", "ทำไมเลือกแบบนี้"],
                         [(f"<code>{esc(c)}</code>", w, cy, fl, why) for c, w, cy, fl, why in les["asm"]]) + les.get("asm_note", "")
        elif key == "traps":
            body = "<ul class=\"trap-list\">" + "".join(f"<li>{t}</li>" for t in les["traps"]) + "</ul>"
        elif key == "drill":
            body = (f'<div class="drill"><p class="drill-q">{les["drill_q"]}</p>'
                    f'<details class="drill-answer"><summary>ดูเฉลยแบบฝึกหัด</summary>{les["drill_a"]}</details></div>')
        elif key == "blueprint":
            body = '<ul class="blueprint">' + "".join(f"<li>{b}</li>" for b in les["blueprint"]) + "</ul>"
        elif key == "sources":
            chips = "".join(f'<a class="ref-chip" href="{REFS[k][0]}"><i class="fas fa-book-open" aria-hidden="true"></i> '
                            f'{REFS[k][1]} · {pg}</a>' for k, pg, _ in les["sources"])
            notes = "".join(f"<li><strong>{REFS[k][1]} {pg}:</strong> {note}</li>" for k, pg, note in les["sources"])
            body = f'<div class="ref-row">{chips}</div><ul class="src-notes">{notes}</ul>{les.get("figure", "")}'
        else:
            body = les[key]
        parts.append(sec(num, title, sub, icon, body))
    return (f'<details class="deep-lesson" id="q{n}-deep">'
            f'<summary><span class="deep-summary-title"><i class="fas fa-graduation-cap" aria-hidden="true"></i> '
            f'บทเรียนเชิงลึกจากศูนย์ ข้อ {n}</span><span class="deep-summary-meta">{num} หัวข้อ · ราว {les["time"]}</span></summary>'
            f'<div class="deep-body">{"".join(parts)}</div></details>')


def card(d):
    cat, _, _, _, _ = PARTS[d["part"]]
    photo = PHOTOS[d["part"]]
    les = LESSONS[d["num"]]
    widget = WIDGET_HTML.get(WIDGET_AT.get(d["num"]), "")
    extras = (f'<div class="widget-jumps">{les["jump"]}</div>' if les.get("jump") else "") + widget
    return f"""
        <article class="solution-card" id="q{d["num"]}" data-category="{cat}">
          <div class="card-header">
            <div class="card-title-group">
              <span class="q-badge red">ข้อ {d["num"]}</span>
              <h3 class="card-title">{d["title"]}</h3>
            </div>
            <span class="ref-pill">ตอนที่ {d["part"]}</span>
          </div>
          <div class="card-body">
            <div class="section-recalled">
              <div class="section-recalled-header"><i class="fas fa-quote-left"></i> โจทย์จากกระดาษข้อสอบจริง</div>
              <div class="content-block">
                <p><strong>{d["num"]}. {d["prompt"]}</strong></p>
                <p class="media-attr"><i class="fas fa-camera"></i> ถ้อยคำตามกระดาษข้อสอบพิมพ์ · คำตอบที่จดไว้: <a href="{photo}">สมุดหน้า {d["part"]}</a></p>
              </div>
            </div>
            <div class="section-senior-draft">
              <div class="section-senior-header"><i class="fas fa-microscope"></i> วิเคราะห์ทฤษฎี &amp; อ้างอิงบทเรียน</div>
              <div class="section-senior-content">
                <p class="notebook-line"><i class="fas fa-pen-nib"></i> <strong>สมุดบันทึกตอบ:</strong> {d["notebook"]}</p>
                {d["analysis"]}
              </div>
            </div>
            <div class="section-official">
              <div class="section-official-header">
                <div class="official-badge-title"><i class="fas fa-check-circle"></i> เฉลยฉบับวิศวกรรม</div>
              </div>
              <div class="content-block">
{d["solution"]}
              </div>
            </div>
            {extras}
            {deep_lesson(d["num"], les)}
          </div>
        </article>"""


def build():
    toc, body = [], []
    for part in (1, 2, 3, 4):
        cat, icon, color, head, desc = PARTS[part]
        qs = [d for d in Q if d["part"] == part]
        toc.append(f'          <li class="toc-group"><a href="#part-{part}" style="color: {color};">'
                   f'{head.split("(")[0].rstrip()}</a></li>')
        for d in qs:
            toc.append(f'          <li class="toc-item"><a href="#q{d["num"]}">ข้อ {d["num"]}: {TOC_SHORT[d["num"]]}</a></li>')
        body.append(f"""
        <div id="part-{part}" class="part-head" style="border-bottom-color: {color};">
          <h2 style="color: {color};"><i class="fas {icon}"></i> {head}</h2>
          <p>{desc}</p>
        </div>""")
        body.extend(card(d) for d in qs)

    counts = {c: sum(1 for d in Q if PARTS[d["part"]][0] == c) for c in ("timer", "control", "serial", "fsm")}
    assert len(Q) == 21 and [d["num"] for d in Q] == list(range(1, 22))
    assert sorted(LESSONS) == list(range(1, 22)), "every question needs a deep lesson"

    html_out = TEMPLATE.replace("{{NAV}}", "").replace("{{DRAWER}}", "") \
        .replace("{{TOC}}", "\n".join(toc)) \
        .replace("{{CARDS}}", "\n".join(body)) \
        .replace("{{C_TIMER}}", str(counts["timer"])).replace("{{C_CONTROL}}", str(counts["control"])) \
        .replace("{{C_SERIAL}}", str(counts["serial"])).replace("{{C_FSM}}", str(counts["fsm"]))
    return sync_chrome.sync(PAGE, html_out)  # shared header, drawer, footer link, card footers


TEMPLATE = (HERE / "template.html").read_text(encoding="utf-8")

if __name__ == "__main__":
    OUT.write_text(build(), encoding="utf-8")
    print("wrote", OUT, OUT.stat().st_size, "bytes")
