"""Deep lessons Q15-Q21 (PC, vectors, IE/IP, motors, FSM)."""
from figures import STACK_PC, VECTOR_MAP, IE_BITS
from widgets import jump

DS = '<span class="src-tag">datasheet 8051 มาตรฐาน · นอกสไลด์</span>'
ISA = '<span class="src-tag">ตาราง MCS-51 · นอกสไลด์</span>'

L = {}

L[15] = dict(
    time="7 นาที",
    terms=[
        ("Program Counter (PC)", "โปร-แกรม เคา-เทอร์", "ตัวชี้แอดเดรสของคำสั่งถัดไป ขนาด 16 บิต"),
        ("Stack / Stack Pointer (SP)", "สแตก / สแตก พอย-เตอร์", "พื้นที่ใน RAM แบบเข้าหลังออกก่อน และตัวชี้ยอดของมัน (เริ่ม 07H)"),
        ("PUSH / POP", "พุช / ป๊อป", "ดันค่าลง stack / ดึงค่าออกจาก stack"),
        ("Context", "คอน-เท็กซ์", "สถานะการทำงานที่ต้องคืนกลับหลังขัดจังหวะ PC เป็นส่วนสำคัญที่สุด"),
    ],
    physics='''<p>PC เป็น flip-flop 16 ตัวต่อกับบัสแอดเดรส A15–A0 ทุกครั้งที่ fetch ไบต์คำสั่ง PC เพิ่มขึ้น 16 บิตจึงชี้ได้ <code>2¹⁶ = 65,536</code> แอดเดรส = 64 KB ของหน่วยความจำโปรแกรม (Lecture 1 หน้า 23) PC ไม่ใช่ SFR จึงอ่านด้วย MOV ตรง ๆ ไม่ได้ เปลี่ยนได้ผ่านคำสั่งกระโดด/เรียก/คืนเท่านั้น</p>''',
    analogy="ที่คั่นหนังสือ: บอกว่ากำลังอ่านหน้าไหน ถ้ามีคนขัดจังหวะ เราเสียบที่คั่นไว้ในกองเอกสาร (stack) ก่อนไปทำงานอื่น แล้วหยิบกลับมาอ่านต่อ",
    limits="ที่คั่นจริงไม่เปลี่ยนเอง แต่ PC เพิ่มขึ้นเองทุกไบต์ที่ fetch และ stack ของ 8051 อยู่ใน RAM ภายในที่มีจำกัด ถ้าซ้อนลึกเกินจะเขียนทับข้อมูลอื่น",
    derive=f'''<ol><li><code>2¹⁶ = 65,536 bytes = 64 KB</code> (1 KB = 1,024 bytes)</li>
<li>สมมติ PC = 0123H และ SP = 07H ตอนรับ interrupt: <code>SP ← 08H</code>, <code>(08H) ← 23H</code> (ไบต์ต่ำ) → <code>SP ← 09H</code>, <code>(09H) ← 01H</code> (ไบต์สูง) {DS}</li>
<li><code>PC ← 000BH</code> (vector Timer 0) → ISR → <code>RETI</code> ดึง 01H, 23H กลับ → PC = 0123H, SP = 07H</li></ol>''',
    whatif="<ul><li><strong>ใช้ RET แทน RETI ใน ISR:</strong> PC กลับถูก แต่วงจร interrupt ยังคิดว่ากำลังบริการอยู่ interrupt ระดับเดียวกันถัดไปจะไม่ถูกรับ</li><li><strong>ย้าย stack:</strong> <code>MOV SP, #5FH</code> เพื่อหลบ register bank 1–3</li></ul>",
    traps=["ตอบ SCON ถูกกากบาทบนกระดาษที่ตรวจแล้ว", "ตอบว่า PC ขนาด 8 บิต", "สับสน PC กับ DPTR (DPTR ก็ 16 บิต แต่ชี้ข้อมูล ไม่ใช่คำสั่ง)"],
    drill_q="ขณะ PC = 0456H และ SP = 30H เกิด interrupt INT0 หลังจากกระโดดแล้ว SP, (31H), (32H) และ PC มีค่าเท่าไร",
    drill_a="<p><code>SP = 32H</code>, <code>(31H) = 56H</code>, <code>(32H) = 04H</code>, <code>PC = 0003H</code></p>",
    blueprint=["<strong>Program Counter (PC)</strong> 16 บิต", "ชี้แอดเดรสคำสั่งถัดไป", "interrupt → PUSH PC ลง stack, RETI → POP PC"],
    sources=[("L1", "หน้า 23", "16 bit program counter register (PC)"), ("L6", "หน้า 9", "PUSH PC / POP PC / RETI")],
    figure=STACK_PC,
    jump="",
)

L[16] = dict(
    time="9 นาที",
    terms=[
        ("Vector", "เวก-เตอร์", "มาจากละติน vector (ผู้พาไป) แอดเดรสที่ \"พา\" CPU ไปยัง ISR"),
        ("ISR", "ไอ-เอส-อาร์", "Interrupt Service Routine โปรแกรมย่อยที่บริการ interrupt"),
        ("ORG", "ออร์ก", "directive บอกแอสเซมเบลอร์ให้วางโค้ดที่แอดเดรสนั้น"),
        ("AJMP / LJMP", "เอ-จัมป์ / แอล-จัมป์", "กระโดดภายในบล็อก 2 KB (2 ไบต์) / กระโดดได้ทั้ง 64 KB (3 ไบต์)"),
    ],
    physics="<p>เมื่อรับ interrupt ฮาร์ดแวร์สร้างคำสั่ง LCALL ไปยังแอดเดรสที่ \"ต่อสายไว้ในซิลิคอน\" ของต้นเหตุนั้น ไม่ต้องอ่านตารางจาก RAM ช่องว่างระหว่าง vector แต่ละตัวมีแค่ 8 ไบต์ จึงวางได้เพียง ISR สั้นมาก ๆ หรือคำสั่งกระโดดไป ISR ตัวจริง</p>",
    analogy="ป้ายทางออกฉุกเฉินที่ติดตายไว้ในอาคาร: แต่ละเหตุการณ์มีประตูประจำ เปิดประตูแล้วเจอลูกศรชี้ต่อไปห้องที่ใหญ่กว่า",
    limits="ป้ายในอาคารย้ายได้ แต่ vector ของ 8051 คงที่ เปลี่ยนไม่ได้",
    derive='''<ol><li>ระยะห่าง: <code>000BH − 0003H = 8</code> ไบต์, <code>0013H − 000BH = 8</code> ไบต์</li>
<li>รูปแบบ: <code>vector = 0003H + 8 × (ลำดับ − 1)</code> → ลำดับ 1–5 ได้ 0003H, 000BH, 0013H, 001BH, 0023H</li>
<li>โปรแกรมหลักควรเริ่มหลัง 0023H + 8 = 002BH จึงนิยม <code>ORG 0030H</code></li></ol>''',
    asm=[
        ("ORG 0000H / AJMP START", "reset vector กระโดดข้ามตาราง", "2", "ไม่มี", "AJMP 2 ไบต์ ไม่ทับ 0003H"),
        ("ORG 0003H / AJMP COUNT", "vector INT0 ส่งต่อไป ISR", "2", "ไม่มี", "ISR ยาวเกิน 8 ไบต์"),
        ("MOV IE, #10000001B", "EA = 1, EX0 = 1", "2", "ไม่มี", "ต้องเปิด EA ด้วย (ตัวอย่างในสไลด์เปิดแค่ EX0)"),
        ("SETB TCON.0", "IT0 = 1 edge", "1", "ไม่มี", "นับหนึ่งครั้งต่อการกด"),
        ("MOV A, 40H / INC A / MOV 40H, A", "ตัวนับใน RAM + 1", "1 + 1 + 1", "P ใน PSW", "INC ไม่เปลี่ยน CY"),
        ("RETI", "คืน PC และปลด interrupt", "2", "ไม่มี", "ต้องใช้ RETI ไม่ใช่ RET"),
    ],
    asm_note=f"<p>จำนวน cycle ตาม {ISA}</p>",
    whatif="<ul><li><strong>ISR สั้นมาก:</strong> ถ้า ISR ยาวไม่เกิน 8 ไบต์ (เช่น <code>CPL P1.0</code> + <code>RETI</code> = 3 ไบต์) วางที่ vector ได้เลยโดยไม่ต้องกระโดด</li><li><strong>ลืม ORG 0030H:</strong> โค้ดหลักทับ vector table ทำให้ interrupt กระโดดเข้ากลางคำสั่ง</li></ul>",
    traps=["ตอบว่าเป็นแอดเดรสใน RAM (จริงอยู่ในหน่วยความจำโปรแกรม)", "ลืม Reset 0000H เมื่อถามตาราง", "ลืมว่า vector แต่ละตัวมีพื้นที่ 8 ไบต์"],
    drill_q="ISR ของ Timer 1 ยาว 20 ไบต์ ต้องวางโค้ดอย่างไรที่ vector ของมัน",
    drill_a="<p><code>ORG 001BH</code> แล้ว <code>LJMP T1_ISR</code> (หรือ AJMP ถ้าอยู่บล็อก 2 KB เดียวกัน) แล้ววาง ISR ตัวจริงที่แอดเดรสอื่น จบด้วย RETI</p>",
    blueprint=["Vector Address = แอดเดรส<strong>คงที่</strong>ในหน่วยความจำโปรแกรมที่ CPU กระโดดไปเริ่ม ISR", "ตาราง: 0000H Reset, 0003H INT0, 000BH TF0, 0013H INT1, 001BH TF1, 0023H Serial"],
    sources=[("L6", "หน้า 9, 12, 13", "โค้ดตัวอย่าง ORG 0003H และตาราง vector")],
    figure=VECTOR_MAP,
    jump="",
)

L[17] = dict(
    time="8 นาที",
    terms=[
        ("IE (Interrupt Enable)", "ไอ-อี", "รีจิสเตอร์เปิด/ปิด interrupt แอดเดรส A8H"),
        ("EA (Enable All)", "อี-เอ", "สวิตช์หลักของ interrupt ทั้งหมด (IE.7)"),
        ("Mask", "มาสก์", "การปิดกั้น interrupt ด้วยบิต 0"),
        ("IP (Interrupt Priority)", "ไอ-พี", "รีจิสเตอร์ตั้งลำดับความสำคัญ แอดเดรส B8H"),
    ],
    physics="<p>แต่ละ flag ของต้นเหตุต่อผ่านประตู AND สองชั้น: ชั้นแรกกับบิตรายตัว (EX0, ET0, …) ชั้นที่สองกับ EA ถ้า EA = 0 ทุกเส้นทางถูกตัดทั้งหมด แม้บิตรายตัวจะเป็น 1</p>",
    analogy="EA คือเมนเบรกเกอร์ของบ้าน บิตรายตัวคือสวิตช์ไฟแต่ละห้อง",
    limits="ปิดเมนแล้วไฟทุกห้องดับจริง แต่ flag ยังถูกเซตได้ตามปกติ เมื่อเปิด EA ภายหลัง interrupt ที่ค้างอยู่จะถูกรับทันที",
    derive='''<ol><li>IE: <code>EA — ET2 ES ET1 EX1 ET0 EX0</code> (บิต 7 → 0)</li>
<li>เปิด Timer 0: <code>EA = 1, ET0 = 1</code> → <code>1000 0010B = 82H</code></li>
<li>bit address: IE เริ่ม A8H → <code>EA = AFH</code>, <code>ET0 = A9H</code> ดังนั้น <code>SETB EA</code> + <code>SETB ET0</code> ให้ผลเท่ากัน</li>
<li>ตัวอย่างในสไลด์ <code>00000001B</code> เปิดแค่ EX0 ขาด EA ต้องเป็น <code>1000 0001B = 81H</code></li></ol>''',
    whatif="<ul><li><strong>ปิดชั่วคราวระหว่างแก้ข้อมูลร่วม:</strong> <code>CLR EA</code> … <code>SETB EA</code> ป้องกัน ISR เขียนค่าที่โปรแกรมหลักกำลังอ่านอยู่</li></ul>",
    traps=["เขียนแค่ Enable Register ไม่มีคำว่า Interrupt", "เปิดบิตรายตัวแต่ลืม EA"],
    drill_q="ต้องการเปิดเฉพาะ Serial และ INT1 หาค่า IE",
    drill_a="<p><code>EA = 1</code> (บิต 7), <code>ES = 1</code> (บิต 4), <code>EX1 = 1</code> (บิต 2) → <code>1001 0100B = 94H</code></p>",
    blueprint=["IE = <strong>Interrupt Enable Register</strong> (A8H)", "EA, ES, ET1, EX1, ET0, EX0; 1 = เปิด", "ตัวอย่าง <code>MOV IE, #82H</code> เปิด Timer 0", "คู่กับ IP = Interrupt Priority Register (B8H)"],
    sources=[("L6", "หน้า 10–11", "IE และ IP registers"), ("L3", "หน้า 12", "IE A8H, IP B8H, bit addresses")],
    figure='<figure class="fig-card">' + IE_BITS + '<figcaption>IE: EA (บิต 7) ต้องเป็น 1 ก่อน บิตรายตัวจึงมีผล</figcaption></figure>',
    jump=jump("w-sfr", "ลอง IE = 82H ใน Bit-Flipper", "IE:82"),
)

L[18] = dict(
    time="8 นาที",
    terms=[
        ("Priority", "ไพร-ออ-ริ-ตี้", "ลำดับความสำคัญเมื่อหลายต้นเหตุเกิดพร้อมกัน"),
        ("Natural (polling) priority", "เนเชอรัล ไพร-ออ-ริ-ตี้", "ลำดับที่ฮาร์ดแวร์ไล่ตรวจ flag เมื่ออยู่ระดับเดียวกัน"),
        ("Nesting", "เนส-ติ้ง", "ISR ระดับสูงขัดจังหวะ ISR ระดับต่ำได้"),
    ],
    physics="<p>เมื่อหลาย flag เป็น 1 ในรอบเดียวกัน วงจรเลือกกลุ่มที่ IP = 1 (high) ก่อน ภายในกลุ่มเดียวกันไล่ตามลำดับคงที่ INT0 → TF0 → INT1 → TF1 → Serial ซึ่งตรงกับลำดับแอดเดรส vector</p>",
    analogy="คิวโรงพยาบาล: ผู้ป่วยฉุกเฉิน (IP = 1) ได้ตรวจก่อน ในกลุ่มเดียวกันเรียงตามหมายเลขบัตรคิวที่พิมพ์ไว้แล้ว",
    limits="ในโรงพยาบาลหมอตัดสินใจเพิ่มได้ แต่ 8051 มีแค่ 2 ระดับ (high/low) และลำดับในระดับเปลี่ยนไม่ได้",
    derive='''<ol><li>IP = 00H (0000 0000B): ทุกตัวอยู่ low → ใช้ลำดับธรรมชาติ INT0 (1), TF0 (2), INT1 (3), TF1 (4), Serial (5)</li>
<li>ถ้า <code>IP = 08H (0000 1000B)</code> → PT1 = 1 → TF1 ขึ้นเป็น high: เมื่อ INT0 กับ TF1 เกิดพร้อมกัน TF1 ได้ก่อน</li>
<li>ISR ระดับ low ถูก ISR ระดับ high แทรกได้ แต่ low แทรก high ไม่ได้</li></ol>''',
    whatif="<ul><li><strong>ตั้ง IP ทุกบิตเป็น 1:</strong> ทุกตัวอยู่ high เท่ากัน ผลเท่ากับไม่ได้ตั้ง (กลับไปใช้ลำดับธรรมชาติ)</li></ul>",
    traps=["ตอบ \"Timer Interrupt\" ถูกกากบาท ต้องระบุ Timer 0 (TF0)", "สลับลำดับ TF0 กับ INT1"],
    drill_q="IP = 04H, เกิด INT0, INT1 และ TF1 พร้อมกัน CPU บริการตัวไหนก่อน",
    drill_a="<p><code>04H = 0000 0100B</code> → PX1 = 1 → INT1 เป็น high จึงได้ก่อน ตามด้วย INT0 แล้ว TF1 (ลำดับธรรมชาติในกลุ่ม low)</p>",
    blueprint=["ลำดับที่ 2 = <strong>TF0 (Timer 0 Overflow)</strong> vector 000BH", "INT0 = 1, TF0 = 2, INT1 = 3, TF1 = 4, RI/TI = 5 (เมื่อ IP = 00H)"],
    sources=[("L6", "หน้า 9, 11", "ตาราง priority และ IP register")],
    figure="",
    jump=jump("w-irq", "จำลองการเกิดพร้อมกันใน Interrupt Explorer"),
)

L[19] = dict(
    time="10 นาที",
    terms=[
        ("PWM", "พี-ดับเบิลยู-เอ็ม", "Pulse Width Modulation การปรับความกว้างพัลส์ modulation มาจากละติน modulari (ปรับจังหวะ)"),
        ("Duty cycle", "ดิว-ตี้ ไซ-เคิล", "สัดส่วนเวลาที่สัญญาณเป็น 1 ในหนึ่งคาบ"),
        ("Average voltage", "แอฟ-เวอ-เรจ โวลต์-เทจ", "แรงดันเฉลี่ยที่มอเตอร์ \"รู้สึก\""),
        ("Inductance", "อิน-ดัก-แทนซ์", "คุณสมบัติขดลวดมอเตอร์ที่ต้านการเปลี่ยนกระแสอย่างรวดเร็ว"),
    ],
    physics='''<p>มอเตอร์ DC มีขดลวด (inductance) และมวลหมุน (ความเฉื่อย) ถ้าสลับไฟเปิดปิดเร็วพอ กระแสและความเร็วจะไม่ตามทันแต่ละพัลส์ แต่ตอบสนองต่อค่าเฉลี่ย <code>Vavg = D × Vs</code> Mazidi 16.1: \"the wider the pulse, the higher the speed\" ขา 8051 จ่ายกระแสได้เพียงระดับ mA จึงต้องผ่านไอซีขับ เช่น L298 (Mazidi Fig. 16-6)</p>''',
    analogy="เปิดปิดก๊อกน้ำเร็ว ๆ: เปิดนาน ปิดสั้น ถังเต็มเร็ว; เปิดสั้น ปิดนาน ถังเต็มช้า",
    limits="ก๊อกน้ำเปิดครึ่ง ๆ ได้ แต่ขา digital มีแค่ 0 กับ 1 PWM จึงใช้ \"เวลา\" แทน \"ระดับ\" และถ้าความถี่ต่ำเกินมอเตอร์จะสั่นกระตุก",
    derive='''<ol><li><code>D = Ton ÷ (Ton + Toff) × 100%</code></li>
<li>1 kHz → <code>T = 1 ms = 1,000 µs</code>; D = 75% → <code>Ton = 750 µs</code>, <code>Toff = 250 µs</code></li>
<li>ค่าโหลด Mode 1: <code>65,536 − 750 = 64,786 = FD12H</code>, <code>65,536 − 250 = 65,286 = FF06H</code></li>
<li>ที่ Vs = 12 V: <code>Vavg = 0.75 × 12 = 9 V</code></li></ol>''',
    whatif="<ul><li><strong>11.0592 MHz:</strong> ต้องคำนวณ count ใหม่ (<code>750 µs ÷ 1.0851 µs ≈ 691</code>)</li><li><strong>ใช้ DAC แทน PWM:</strong> ได้แรงดันต่อเนื่องแต่ทรานซิสเตอร์ขับร้อนกว่า PWM ที่สลับเต็มเปิด/เต็มปิดสูญเสียน้อยกว่า</li></ul>",
    traps=["ตอบว่า \"ลดแรงดันไฟ\" โดยไม่พูดถึง PWM / duty cycle", "บอกว่าเปลี่ยนความถี่ PWM เพื่อเปลี่ยนความเร็ว (จริงปรับ duty ที่ความถี่คงที่)"],
    drill_q="ต้องการ PWM 500 Hz duty 40% ที่ 12 MHz หาค่าโหลด ON และ OFF (Mode 1)",
    drill_a="<p><code>T = 2,000 µs</code>, <code>Ton = 800 µs</code> → <code>65,536 − 800 = 64,736 = FCE0H</code>; <code>Toff = 1,200 µs</code> → <code>65,536 − 1,200 = 64,336 = FB50H</code></p>",
    blueprint=["ใช้ <strong>PWM</strong>", "คาบคงที่ ปรับ <strong>duty cycle</strong> = Ton ÷ T", "duty มาก = แรงดันเฉลี่ยมาก = หมุนเร็ว", "สร้างด้วย Timer ของ 8051 + วงจรขับ"],
    sources=[("MZ16", "หน้า 565", "Pulse width modulation (PWM)"), ("MZ16", "หน้า 562", "L298 bidirectional control")],
    figure="",
    jump=jump("w-motor", "ลองปรับ duty ใน Motor Sandbox"),
)

L[20] = dict(
    time="9 นาที",
    terms=[
        ("Polarity", "โพ-ลา-ริ-ตี้", "ขั้วไฟฟ้า +/−"),
        ("H-Bridge", "เอช-บริดจ์", "วงจรสวิตช์ 4 ตัวเรียงเป็นรูปตัว H รอบมอเตอร์"),
        ("Shoot-through", "ชูต-ทรู", "สวิตช์ขาเดียวกันบนและล่างปิดพร้อมกัน ลัดวงจร +V ลงกราวด์"),
        ("Back-EMF", "แบ็ก-อี-เอ็ม-เอฟ", "แรงดันย้อนที่มอเตอร์สร้างขณะหมุน/หยุดกระทันหัน"),
    ],
    physics=f'''<p>ทิศการหมุนของมอเตอร์ DC ขึ้นกับทิศกระแสในขดลวด (แรงลอเรนซ์) ปิด SW1 + SW4: กระแสไหลจากซ้ายไปขวา; ปิด SW2 + SW3: กระแสไหลกลับทาง (Mazidi Fig. 16-3, 16-4) ไอซี H-Bridge เช่น L298 รับลอจิก TTL จากขา 8051 แล้วขับทรานซิสเตอร์กำลังแทนสวิตช์ ส่วน L293D ที่พบบ่อยในแล็บใช้หลักการเดียวกัน (ขา IN1/IN2 กำหนดทิศ, EN เปิดการขับ) {DS}</p>''',
    analogy="ถนนทางเดียวที่สลับป้ายทิศได้: เปิดประตูคู่ทแยงคู่หนึ่ง รถไหลไปทางหนึ่ง เปิดอีกคู่ รถไหลย้อนกลับ",
    limits="ถ้าเปิดประตูฝั่งเดียวกันทั้งบนและล่าง ไม่ใช่รถติด แต่เป็นไฟลัดวงจรที่ทำให้สวิตช์พัง (Invalid ใน Table 16-2)",
    derive='''<ol><li>Off: ทุกสวิตช์เปิด → ไม่มีกระแส</li>
<li>Clockwise: SW1, SW4 ปิด</li>
<li>Counterclockwise: SW2, SW3 ปิด</li>
<li>Invalid: ปิดทั้งหมด → +V ลัดลงกราวด์ผ่าน SW1+SW3 และ SW2+SW4</li>
<li>ถ้าใช้ 2 ขาพอร์ตคุมคู่สวิตช์: <code>P1.0 = 1, P1.1 = 0</code> → ทิศหนึ่ง; <code>P1.0 = 0, P1.1 = 1</code> → ทิศตรงข้าม</li></ol>''',
    whatif="<ul><li><strong>ปิด SW3 + SW4 (ฝั่งล่างทั้งคู่):</strong> ขั้วมอเตอร์ถูกต่อถึงกัน back-EMF ทำให้เกิดกระแสต้าน มอเตอร์หยุดเร็ว (dynamic brake) เป็นเทคนิคทั่วไป ไม่อยู่ในตาราง 16-2</li><li><strong>สลับทิศทันทีขณะหมุนเร็ว:</strong> กระแสกระชากสูง ควรหยุด/หน่วงก่อนกลับทิศ (โปรเจกต์ Sliding Door ใช้ coast 200 ms)</li></ul>",
    traps=["ตอบว่า \"เปลี่ยนความเร็ว\" แทนการกลับขั้ว", "วาด H-Bridge ที่คู่สวิตช์ฝั่งเดียวกันปิดพร้อมกัน"],
    drill_q="มอเตอร์หมุน CW อยู่ ต้องการกลับเป็น CCW อย่างปลอดภัย เขียนลำดับสถานะสวิตช์",
    drill_a="<p>SW1+SW4 (CW) → Off (เปิดทั้งหมด) รอให้ความเร็วลดลง → SW2+SW3 (CCW) ห้ามผ่านสถานะที่สวิตช์บนและล่างข้างเดียวกันปิดพร้อมกัน</p>",
    blueprint=["<strong>กลับขั้ว</strong>แรงดันที่จ่ายให้มอเตอร์", "ใช้วงจร <strong>H-Bridge</strong>: SW1+SW4 = ทิศหนึ่ง, SW2+SW3 = ทิศตรงข้าม", "ห้ามปิดคู่บน-ล่างข้างเดียวกัน (ลัดวงจร)"],
    sources=[("MZ16", "หน้า 559", "reversing the polarity"), ("MZ16", "หน้า 562", "Table 16-2 H-Bridge logic, Fig. 16-5 invalid")],
    figure="",
    jump="",
)

L[21] = dict(
    time="15 นาที",
    terms=[
        ("Finite State Machine (FSM)", "ไฟ-ไนต์ สเตต แมชชีน", "ระบบที่อยู่ในสถานะใดสถานะหนึ่งจากชุดสถานะจำกัด และเปลี่ยนสถานะตามเงื่อนไข"),
        ("State", "สเตต", "สถานะ: ที่นี่คือ Ready (R0 = 01H) และ Go (R0 = 02H)"),
        ("Transition / Guard", "ทราน-ซิ-ชัน / การ์ด", "เส้นเปลี่ยนสถานะ และเงื่อนไขบูลีนที่อนุญาตให้เปลี่ยน (push, timer)"),
        ("Moore machine", "มัวร์ แมชชีน", "FSM ที่เอาต์พุตขึ้นกับสถานะเท่านั้น: Ready → แดง, Go → เขียว"),
    ],
    physics='''<p>สถานะของโปรแกรมนี้เก็บอยู่สองที่: ตำแหน่ง PC (อยู่ในลูป ReadyState หรือ GoState) และค่าใน R0 ที่บันทึกไว้เพื่อให้ตรวจสอบได้ เอาต์พุต P1.1/P1.0 เป็น port latch ที่ค้างค่าไว้จนกว่าจะเขียนใหม่ อินพุต P2.0 ต้องมี latch = 1 (ค่าหลัง reset) จึงอ่านระดับจริงของปุ่มได้</p>''',
    analogy="สัญญาณไฟคนข้ามถนน: ปกติเป็นคนสีแดง กดปุ่มแล้วเป็นคนสีเขียวชั่วระยะหนึ่ง ถ้ามีคนกดซ้ำ ระยะเวลาเริ่มนับใหม่",
    limits="ไฟข้ามถนนจริงต้องมีสถานะเหลืองกระพริบและเวลาเป็นวินาที โปรแกรมแล็บนี้ใช้เวลาระดับไมโครวินาทีเพื่อให้จำลองใน EdSim51 ได้เร็ว",
    derive='''<ol><li>Delay 1 ครั้ง: ตั้งใจ 10 µs (<code>FFF6H</code>) แต่แบบจำลองนับได้ <strong>26 machine cycles</strong> รวม ACALL และ RET</li>
<li>รอบละ <code>26 + 2 (DJNZ) = 28 µs</code> × 10 รอบ = <code>280 µs</code></li>
<li>บวกคำสั่งเข้า/ออกสถานะ: ไฟเขียวติดจริงประมาณ <strong>288 µs</strong> (วัดจากแบบจำลอง) ไม่ใช่ 100 µs ตามที่ตั้งใจ</li>
<li>สรุปตาราง FSM: Ready --push--> Go, Go --timer ∧ ¬push--> Ready, Go --timer ∧ push--> Go</li></ol>''',
    asm=[
        ("MOV R0, #01H", "บันทึกหมายเลขสถานะ Ready", "1", "ไม่มี", "Rn,#data 1 cycle 2 ไบต์"),
        ("SETB P1.1 / CLR P1.0", "เอาต์พุตของ Ready (Moore)", "1 + 1", "ไม่มี", "สั่งทีละบิต ไม่กระทบขาอื่นของ P1"),
        ("JB P2.0, GoState", "guard: push", "2", "ไม่มี", "ทดสอบบิตและกระโดดในคำสั่งเดียว"),
        ("SJMP ReadyState", "วนอยู่ในสถานะ", "2", "ไม่มี", "กระโดดสั้น 2 ไบต์พอ"),
        ("MOV R1, #10", "ตัวนับรอบ Delay", "1", "ไม่มี", "ใช้ R1 แยกจาก R0 ที่เก็บ state"),
        ("ACALL Delay", "เรียกหน่วง 10 µs (ตั้งใจ)", "2", "ไม่มี", "ACALL 2 ไบต์ พอภายใน 2 KB"),
        ("DJNZ R1, Timer", "ลด R1 ถ้าไม่ใช่ 0 วนต่อ", "2", "ไม่มี", "DJNZ ไม่เปลี่ยน flag ใดใน PSW"),
        ("JB P2.0, GoState", "guard: ยังกดอยู่ → Go ใหม่", "2", "ไม่มี", "สร้างเส้น self-loop ของ Go"),
    ],
    asm_note=f"<p>ไม่มีคำสั่งใดในโปรแกรมนี้เปลี่ยน flag CY, AC, OV ใน PSW จึงไม่ต้อง PUSH PSW จำนวน cycle ตาม {ISA} และยืนยันด้วยแบบจำลองด้านบน</p>",
    whatif='''<ul><li><strong>ปุ่ม active-low (pull-up, กด = 0):</strong> เปลี่ยน <code>JB</code> ทั้งสองจุดเป็น <code>JNB</code></li>
<li><strong>ต้องการไฟเขียว 1 วินาที:</strong> Delay 50 ms (<code>65,536 − 50,000 = 3CB0H</code>) × <code>R1 = 20</code></li>
<li><strong>คริสตัล 11.0592 MHz:</strong> ทุกเวลาคูณ <code>1.0851</code> → ประมาณ 312 µs</li>
<li><strong>เพิ่มสถานะ Prepare (Lab 5 Traffic 2):</strong> R0 = 02H สำหรับ Prepare, 03H สำหรับ Go</li></ul>''',
    traps=["ไม่วาดเส้น push วนกลับ Go (self-loop) ที่อยู่ในรูปโจทย์", "ตั้งเอาต์พุตไม่ครบทั้งสองขาในแต่ละสถานะ", "ใช้ JNB กับบอร์ดแล็บที่กด = 1", "ไม่มีซับรูทีน Delay หรือไม่ใช้ Timer ตามที่สอน"],
    drill_q="ปรับโปรแกรมให้ปุ่มเป็น active-low และไฟเขียวติดประมาณ 1 วินาที เขียนเฉพาะบรรทัดที่เปลี่ยน",
    drill_a="<p><code>JNB P2.0, GoState</code> (ทั้งสองจุด), <code>MOV R1, #20</code>, และใน Delay <code>MOV TH0, #3CH</code>, <code>MOV TL0, #0B0H</code> (50 ms ต่อครั้ง)</p>",
    blueprint=["State chart: Ready (แดง) --push--> Go (เขียว) --timer--> Ready, Go --push--> Go", "Hardware: P1.1 แดง, P1.0 เขียว, P2.0 ปุ่ม", "โค้ด ReadyState, GoState, Delay (Timer 0 Mode 1, FFF6H)", "R0 เก็บ state, R1 นับรอบ"],
    sources=[("LSM", "หน้า 2–5", "Traffic 1 state chart และโค้ด"), ("UCB3", "หน้า 67–68", "FSM, guard / action"), ("UCB3", "หน้า 78", "Moore vs Mealy")],
    figure="",
    jump="",
)
