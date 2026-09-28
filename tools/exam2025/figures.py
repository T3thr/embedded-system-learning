"""Inline SVG figures for the deep lessons (all colors come from CSS classes backed by theme tokens)."""


def fig(svg, caption):
    return f'<figure class="fig-card">{svg}<figcaption>{caption}</figcaption></figure>'


def bitfield(reg, addr, names, hi=(), bit_base=None, sub=None):
    """8-cell register diagram, bit 7 on the left. hi = bit numbers to highlight. bit_base = bit address of bit 0."""
    w, cw = 460, 52
    x0 = (w - 8 * cw) // 2
    cells = []
    for i, name in enumerate(names):
        bit = 7 - i
        x = x0 + i * cw
        cls = "fx-bit-hi" if bit in hi else "fx-bit"
        cells.append(f'<rect x="{x}" y="34" width="{cw - 4}" height="40" rx="6" class="{cls}"/>'
                     f'<text x="{x + (cw - 4) / 2}" y="59" class="fx-text fx-mono" text-anchor="middle" font-size="12">{name}</text>'
                     f'<text x="{x + (cw - 4) / 2}" y="28" class="fx-sub fx-mono" text-anchor="middle">{bit}</text>')
        if bit_base is not None:
            cells.append(f'<text x="{x + (cw - 4) / 2}" y="92" class="fx-sub fx-mono" text-anchor="middle">{bit_base + bit:02X}H</text>')
    title = f'<text x="{x0}" y="14" class="fx-text" font-weight="700">{reg} ({addr})</text>'
    note = f'<text x="{x0 + 8 * cw - 4}" y="14" class="fx-sub" text-anchor="end">{sub}</text>' if sub else ""
    h = 100 if bit_base is not None else 84
    return f'<svg class="fx-svg" viewBox="0 0 {w} {h}" role="img" aria-label="ผังบิต {reg}">{title}{note}{"".join(cells)}</svg>'


ARROW = ('<defs><marker id="{id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" '
         'orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="fx-head"/></marker></defs>')


def box(x, y, w, h, t1, t2=None, cls="fx-box"):
    s = f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" class="{cls}"/>'
    ty = y + h / 2 + (0 if t2 else 5)
    s += f'<text x="{x + w / 2}" y="{ty - (6 if t2 else 0)}" class="fx-text" text-anchor="middle" font-size="12">{t1}</text>'
    if t2:
        s += f'<text x="{x + w / 2}" y="{ty + 10}" class="fx-sub" text-anchor="middle">{t2}</text>'
    return s


def line(x1, y1, x2, y2, mid="a"):
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" class="fx-line" marker-end="url(#{mid})"/>'


TIMER_PATH = fig(
    '<svg class="fx-svg" viewBox="0 0 460 200" role="img" aria-label="เส้นทางสัญญาณ Timer 0">' + ARROW.format(id="tp") +
    box(8, 20, 96, 40, "OSC 12 MHz", "XTAL1/XTAL2") + line(104, 40, 132, 40, "tp") +
    box(134, 20, 70, 40, "÷ 12", "1 MHz") + line(204, 40, 232, 48, "tp") +
    box(8, 110, 96, 40, "ขา T0 (P3.4)", "พัลส์ภายนอก") + line(104, 130, 232, 72, "tp") +
    '<rect x="234" y="30" width="62" height="56" rx="8" class="fx-dec"/>'
    '<text x="265" y="54" class="fx-text" text-anchor="middle" font-size="12">C/T</text>'
    '<text x="265" y="70" class="fx-sub" text-anchor="middle">0 = บน, 1 = ล่าง</text>' +
    line(296, 58, 318, 58, "tp") +
    box(320, 38, 132, 40, "TL0 | TH0", "นับขึ้นทีละ 1") + line(386, 78, 386, 108, "tp") +
    box(320, 110, 132, 36, "TF0 = 1", "เมื่อ FFFFH → 0000H", "fx-term") +
    '<text x="265" y="118" class="fx-sub" text-anchor="middle">สวิตช์ปิดเมื่อ</text>'
    '<text x="265" y="134" class="fx-text fx-mono" text-anchor="middle" font-size="11">TR0 = 1 และ</text>'
    '<text x="265" y="150" class="fx-text fx-mono" text-anchor="middle" font-size="11">(GATE = 0 หรือ INT0 = 1)</text>'
    '<text x="386" y="176" class="fx-sub" text-anchor="middle">→ interrupt 000BH (ถ้า EA, ET0 = 1)</text></svg>',
    "เส้นทางของ Timer 0: C/T เลือกแหล่ง clock, TR0 กับ GATE ตัดสินว่าตัวนับเดินหรือไม่ (Lecture 5 หน้า 11)")

OVERFLOW_LINE = fig(
    '<svg class="fx-svg" viewBox="0 0 460 110" role="img" aria-label="ค่าตัวนับวนจาก FFFFH กลับ 0000H">' + ARROW.format(id="ov") +
    '<line x1="20" y1="50" x2="440" y2="50" class="fx-line"/>' +
    "".join(f'<line x1="{x}" y1="44" x2="{x}" y2="56" class="fx-line"/><text x="{x}" y="36" class="fx-sub fx-mono" text-anchor="middle">{t}</text>'
            for x, t in [(40, "FF9CH"), (130, "FF9DH"), (250, "FFFEH"), (330, "FFFFH"), (420, "0000H")]) +
    '<text x="190" y="36" class="fx-sub" text-anchor="middle">…</text>'
    '<path d="M330,62 C360,92 400,92 420,62" class="fx-line" marker-end="url(#ov)"/>'
    '<text x="375" y="104" class="fx-text" text-anchor="middle" font-size="12">roll over: TF0 = 1</text>'
    '<text x="130" y="80" class="fx-sub" text-anchor="middle">เริ่มจากค่าที่โหลด นับขึ้นทุก 1 µs</text></svg>',
    "Overflow ไม่ใช่ตอน \"ค่าเป็น FFFFH\" แต่เป็นจังหวะที่นับต่อจาก FFFFH แล้ววนกลับ 0000H")

NEG_EDGE = fig(
    '<svg class="fx-svg" viewBox="0 0 460 130" role="img" aria-label="ขอบขาลงและระดับต่ำ">'
    '<text x="10" y="22" class="fx-sub">INT0 (P3.2)</text>'
    '<polyline points="20,40 140,40 140,90 300,90 300,40 440,40" class="fx-wave"/>'
    '<circle cx="140" cy="65" r="7" class="fx-mark"/>'
    '<text x="148" y="62" class="fx-text" font-size="12">1 → 0 : IT0 = 1 จับที่นี่ครั้งเดียว</text>'
    '<rect x="140" y="92" width="160" height="10" class="fx-band"/>'
    '<text x="220" y="120" class="fx-sub" text-anchor="middle">IT0 = 0: ช่วง LOW ทั้งหมดนี้ถือว่ายัง request อยู่</text></svg>',
    "Negative edge trigger ตรวจ \"จังหวะที่ตกลง\" ส่วน level trigger ดู \"ระดับที่ค้างเป็น 0\" (Lecture 5 หน้า 10)")

MODES = fig(
    '<svg class="fx-svg" viewBox="0 0 460 190" role="img" aria-label="โครงสร้างตัวนับทั้ง 4 โหมด">' + ARROW.format(id="md") +
    "".join(
        f'<text x="8" y="{y + 24}" class="fx-text" font-weight="700" font-size="12">{name}</text>' +
        "".join(box(x, y, w, 36, t, None, c) for x, w, t, c in parts)
        for y, name, parts in [
            (4, "Mode 0", [(86, 70, "TL 5 บิต", "fx-box"), (164, 90, "TH 8 บิต", "fx-box"), (262, 60, "TF", "fx-term")]),
            (50, "Mode 1", [(86, 90, "TL 8 บิต", "fx-box"), (184, 90, "TH 8 บิต", "fx-box"), (282, 60, "TF", "fx-term")]),
            (96, "Mode 2", [(86, 90, "TL 8 บิต", "fx-box"), (184, 60, "TF", "fx-term"), (252, 110, "TH → TL (reload)", "fx-dec")]),
            (142, "Mode 3", [(86, 90, "TL0 8 บิต", "fx-box"), (184, 50, "TF0", "fx-term"), (242, 90, "TH0 8 บิต", "fx-box"), (340, 50, "TF1", "fx-term")]),
        ]) +
    '<text x="360" y="28" class="fx-sub">2¹³ = 8,192</text><text x="360" y="74" class="fx-sub">2¹⁶ = 65,536</text>'
    '<text x="372" y="118" class="fx-sub"></text></svg>',
    "M1 M0 เลือกว่าบิตของ TL/TH ต่อกันอย่างไร (Lecture 5 หน้า 15–19)")

STACK_PC = fig(
    '<svg class="fx-svg" viewBox="0 0 460 170" role="img" aria-label="PC ถูก push ลง stack เมื่อเกิด interrupt">' + ARROW.format(id="sp") +
    box(10, 20, 120, 44, "PC = 0123H", "กำลังจะทำคำสั่งถัดไป") + line(130, 42, 190, 42, "sp") +
    '<text x="160" y="34" class="fx-sub" text-anchor="middle">TF0 = 1</text>' +
    box(192, 20, 120, 44, "PC ← 000BH", "กระโดดไป vector", "fx-dec") + line(312, 42, 352, 42, "sp") +
    box(354, 20, 96, 44, "ISR … RETI", "PC ← 0123H", "fx-term") +
    "".join(f'<rect x="150" y="{y}" width="120" height="24" class="fx-box"/><text x="140" y="{y + 16}" class="fx-sub fx-mono" text-anchor="end">{a}</text>'
            f'<text x="210" y="{y + 16}" class="fx-text fx-mono" text-anchor="middle" font-size="12">{v}</text>'
            for y, a, v in [(84, "09H", "01H (PC high)"), (108, "08H", "23H (PC low)"), (132, "07H", "เดิม")]) +
    '<text x="290" y="100" class="fx-sub">SP: 07H → 09H</text></svg>',
    "เมื่อรับ interrupt ฮาร์ดแวร์ PUSH PC (ไบต์ต่ำก่อน) ลง stack แล้ว RETI จึง POP คืน (Lecture 6 หน้า 9)")

VECTOR_MAP = fig(
    '<svg class="fx-svg" viewBox="0 0 460 220" role="img" aria-label="ตำแหน่ง vector ในหน่วยความจำโปรแกรม">' +
    "".join(f'<rect x="120" y="{y}" width="200" height="26" rx="4" class="{c}"/>'
            f'<text x="110" y="{y + 17}" class="fx-sub fx-mono" text-anchor="end">{a}</text>'
            f'<text x="220" y="{y + 17}" class="fx-text" text-anchor="middle" font-size="12">{t}</text>'
            for y, a, t, c in [(8, "0000H", "Reset → AJMP START", "fx-box"), (38, "0003H", "INT0 (8 ไบต์)", "fx-dec"),
                               (68, "000BH", "Timer 0 (8 ไบต์)", "fx-dec"), (98, "0013H", "INT1 (8 ไบต์)", "fx-dec"),
                               (128, "001BH", "Timer 1 (8 ไบต์)", "fx-dec"), (158, "0023H", "Serial RI/TI (8 ไบต์)", "fx-dec"),
                               (188, "0030H", "โปรแกรมหลักเริ่มที่นี่ได้", "fx-term")]) +
    '<text x="336" y="60" class="fx-sub">ห่างกัน 8 ไบต์</text><text x="336" y="76" class="fx-sub">พอใส่ AJMP/LJMP</text>'
    '<text x="336" y="92" class="fx-sub">ไป ISR ตัวจริง</text></svg>',
    "Vector table อยู่ต้นหน่วยความจำโปรแกรม (Lecture 6 หน้า 9, 13 และตัวอย่าง ORG 0003H ในหน้า 1)")

TCON_BITS = bitfield("TCON", "88H", ["TF1", "TR1", "TF0", "TR0", "IE1", "IT1", "IE0", "IT0"], hi=(4, 6), bit_base=0x88, sub="bit address 8FH–88H")
TMOD_BITS = bitfield("TMOD", "89H", ["GATE", "C/T", "M1", "M0", "GATE", "C/T", "M1", "M0"], hi=(0, 1), sub="ไม่ bit-addressable")
TMOD_CT = bitfield("TMOD", "89H", ["GATE", "C/T", "M1", "M0", "GATE", "C/T", "M1", "M0"], hi=(2,), sub="ไม่ bit-addressable")
IE_BITS = bitfield("IE", "A8H", ["EA", "—", "ET2", "ES", "ET1", "EX1", "ET0", "EX0"], hi=(7,), bit_base=0xA8, sub="bit address AFH–A8H")
SCON_BITS = bitfield("SCON", "98H", ["SM0", "SM1", "SM2", "REN", "TB8", "RB8", "TI", "RI"], hi=(7, 6), bit_base=0x98, sub="bit address 9FH–98H")
TCON_EDGE = bitfield("TCON", "88H", ["TF1", "TR1", "TF0", "TR0", "IE1", "IT1", "IE0", "IT0"], hi=(0, 2), bit_base=0x88)
