"""Deep lessons Q1-Q7 (Timers & Counters, control bits). HTML fragments; no dollar signs, LaTeX or emoji."""
from figures import TIMER_PATH, OVERFLOW_LINE, NEG_EDGE, MODES, TCON_BITS, TMOD_BITS, TCON_EDGE
from widgets import jump

DS = '<span class="src-tag">datasheet 8051 มาตรฐาน · นอกสไลด์</span>'
ISA = '<span class="src-tag">ตาราง MCS-51 · นอกสไลด์</span>'

L = {}

L[1] = dict(
    time="8 นาที",
    terms=[
        ("Timer", "ไท-เมอร์", "ตัวจับเวลา มาจาก time: นับจังหวะนาฬิกาที่รู้คาบแน่นอน จำนวนที่นับได้จึงแปลงเป็นเวลาได้"),
        ("Counter", "เคา-เทอร์", "ตัวนับ มาจากละติน computare (นับ, คำนวณ): นับเหตุการณ์ภายนอกที่ไม่รู้จังหวะล่วงหน้า"),
        ("Oscillator / Crystal", "ออส-ซิล-เล-เตอร์ / คริส-ตัล", "วงจรกำเนิดสัญญาณนาฬิกา คริสตัลควอตซ์สั่นที่ความถี่คงที่ (12 MHz) เป็นหัวใจของเวลาทั้งชิป"),
        ("C/T bit", "ซี-ที บิต", "บิตเลือก Counter/Timer ใน TMOD: 0 = Timer, 1 = Counter"),
    ],
    physics='''<p>คริสตัล 12 MHz สั่น 12 ล้านครั้งต่อวินาที คาบละ <code>1 ÷ 12 MHz = 83.33 ns</code> 8051 แบบคลาสสิก (12T) ใช้ 12 จังหวะต่อ 1 machine cycle จึงได้ <code>12 × 83.33 ns = 1 µs</code> วงจร ÷12 นี้คือสิ่งที่ Lecture 5 เรียกว่า <code>Fosc/12</code></p>
<p>ตัวนับ TL0/TH0 คือ flip-flop 16 ตัวต่อกันเป็นตัวนับไบนารี ทุกครั้งที่มีขอบสัญญาณเข้ามา ค่าเพิ่ม 1 ความต่างระหว่าง Timer กับ Counter อยู่ที่ "สายที่ต่อเข้า" ตัวนับเท่านั้น: สาย 1 µs จากภายใน หรือสายจากขา T0 (P3.4) ภายนอก ซึ่งเป็นสัญญาณ TTL (ต่ำกว่า 0.8 V = 0, สูงกว่า 2.0 V = 1)</p>''',
    analogy="นาฬิกาจับเวลา (Timer) กดแล้วเข็มเดินตามจังหวะของมันเอง ส่วนเครื่องกดนับคนเข้างาน (Counter) จะเพิ่มก็ต่อเมื่อมีคนเดินผ่านจริง",
    limits="อุปมานี้ใช้ไม่ได้ตรงที่ในชิปเป็นวงจรนับตัวเดียวกันทั้งสองแบบ แค่สลับแหล่งสัญญาณด้วย C/T และตัวนับนับได้สูงสุด 65,536 ก่อนวนกลับ ไม่ได้นับไปเรื่อย ๆ แบบนาฬิกา",
    derive='''<ol><li>Timer: <code>1 count = 12 ÷ Fosc = 12 ÷ 12 MHz = 1 µs</code> ดังนั้น N counts = N µs</li>
<li>Counter: 1 count = 1 ขอบขาลงที่ขา T0 เวลาต่อ count ขึ้นกับสัญญาณภายนอก ไม่ใช่คริสตัล</li>
<li>ตรวจการตั้งค่า: <code>TMOD = 01H (0000 0001B)</code> → C/T ของ T0 (บิต 2) = 0 → Timer; <code>TMOD = 05H (0000 0101B)</code> → บิต 2 = 1 → Counter</li></ol>''',
    whatif=f'''<ul><li><strong>เปลี่ยนคริสตัลเป็น 11.0592 MHz:</strong> Timer เปลี่ยนเวลาต่อ count เป็น <code>12 ÷ 11.0592 MHz = 1.0851 µs</code> แต่ Counter ไม่เปลี่ยนเลย เพราะนับเหตุการณ์ภายนอก</li>
<li><strong>พัลส์ภายนอกเร็วเกินไป:</strong> ขา T0 ถูกสุ่มอ่านทุก machine cycle ต้องเห็น 1 แล้ว 0 จึงนับ จึงนับได้เร็วสุดราว <code>Fosc ÷ 24 = 500 kHz</code> ที่ 12 MHz {DS}</li></ul>''',
    traps=["ตอบว่า \"Timer นับเวลา Counter นับจำนวน\" เฉย ๆ ได้คะแนนไม่เต็ม ต้องบอกแหล่ง clock (Fosc/12 กับขา T0/T1) และบิตที่เลือก (C/T)",
           "สลับความหมาย C/T: <code>C/T = 1</code> คือ Counter ไม่ใช่ Timer"],
    drill_q="ถ้าตั้ง Timer 0 เป็น Counter แล้วต่อสัญญาณ 1 kHz เข้าขา T0 เป็นเวลา 50 ms ค่าที่นับได้คือเท่าไร และถ้าเปลี่ยนคริสตัลเป็น 24 MHz ผลเปลี่ยนไหม",
    drill_a="<p>1 kHz = 1,000 พัลส์ต่อวินาที ใน 50 ms ได้ <code>1000 × 0.05 = 50 counts = 32H</code> เปลี่ยนคริสตัลแล้วผล<strong>ไม่เปลี่ยน</strong> เพราะ Counter นับพัลส์ภายนอก (ตราบที่ 1 kHz ต่ำกว่าขีดจำกัด Fosc ÷ 24)</p>",
    blueprint=["Timer = clock ภายใน <code>Fosc ÷ 12</code> (1 µs ที่ 12 MHz)", "Counter = พัลส์ภายนอกที่ขา T0 (P3.4) / T1 (P3.5)", "เลือกด้วยบิต <code>C/T</code> ใน TMOD (0 = Timer, 1 = Counter)"],
    sources=[("L5", "หน้า 2, 5, 11, 14", "Timer or Counter, บิต C/T, pinout"), ("L1", "หน้า 19", "วงจรคริสตัล")],
    figure=TIMER_PATH,
    jump=jump("w-timer", "ลองคำนวณใน Timer Workbench"),
)

L[2] = dict(
    time="7 นาที",
    terms=[
        ("Register", "เรจ-จิส-เตอร์", "หน่วยเก็บข้อมูลเล็กที่สุดใน CPU สร้างจาก flip-flop 8 ตัวเก็บ 8 บิต มาจากละติน regesta (บัญชีบันทึก)"),
        ("High byte / Low byte", "ไฮ ไบต์ / โลว์ ไบต์", "ไบต์บน (บิต 15–8) และไบต์ล่าง (บิต 7–0) ของค่า 16 บิต"),
        ("SFR", "เอส-เอฟ-อาร์", "Special Function Register รีจิสเตอร์ควบคุมฮาร์ดแวร์ ที่แอดเดรส 80H–FFH"),
        ("Up counter", "อัป เคา-เทอร์", "ตัวนับขาขึ้น: ค่าเพิ่มทีละ 1"),
    ],
    physics='''<p>8051 เป็นซีพียู 8 บิต: ALU และบัสข้อมูลกว้าง 8 บิต แต่ต้องนับได้ถึง 65,536 จึงต่อ flip-flop 16 ตัวเป็นตัวนับเดียว แล้ว "เปิดหน้าต่าง" ให้ซีพียูอ่านเขียนทีละ 8 บิตผ่านสอง SFR: <code>TL0</code> (8AH) และ <code>TH0</code> (8CH) เมื่อ TL0 นับจาก FFH กลับ 00H จะส่ง carry ไปเพิ่ม TH0 หนึ่งค่า เหมือนหลักหน่วยทดไปหลักสิบ</p>''',
    analogy="มาตรวัดระยะทางรถยนต์ 4 หลัก: หลักขวาสองหลัก (TL) หมุนครบแล้วดันหลักซ้าย (TH) ให้ขยับ",
    limits="มาตรวัดใช้ฐาน 10 แต่ตัวนับใช้ฐาน 2 (แสดงเป็นฐาน 16) และแต่ละ \"หลัก\" คือ 8 บิต ไม่ใช่ 1 หลักทศนิยม",
    derive='''<ol><li>ค่าสูงสุด 16 บิต: <code>2¹⁶ − 1 = 65,535 = FFFFH</code> จำนวนสถานะทั้งหมด <code>2¹⁶ = 65,536</code></li>
<li>แยกค่า 16 บิตเป็นสองไบต์: <code>FF9CH → TH0 = FFH, TL0 = 9CH</code> (ไบต์บน = หารด้วย 256, ไบต์ล่าง = เศษ)</li>
<li>ตรวจ: <code>FFH × 256 + 9CH = 255 × 256 + 156 = 65,436</code></li></ol>''',
    whatif="<ul><li><strong>Mode 2:</strong> ใช้แค่ TL0 นับ (8 บิต, 256 ค่า) ส่วน TH0 เป็นที่เก็บค่า reload</li><li><strong>8052:</strong> มี Timer 2 เพิ่มอีกตัว (บิต ET2/PT2 ที่สไลด์ระบุว่า reserved ใน 8051)</li></ul>",
    traps=["เขียนว่า \"รีจิสเตอร์คือ T0, T1\" ถูกหักคะแนน ต้องตอบ <code>TH0/TL0</code> และ <code>TH1/TL1</code>", "ลืมว่าเป็นตัวนับ<strong>ขาขึ้น</strong> ทำให้คำนวณค่าโหลดผิด (ข้อ 4)"],
    drill_q="ถ้าอ่านได้ <code>TH1 = 3CH</code>, <code>TL1 = B0H</code> ตัวนับมีค่าเท่าไรในฐานสิบ และต้องนับอีกกี่ครั้งจึงล้น",
    drill_a="<p><code>3CB0H = 3 × 4096 + 12 × 256 + 11 × 16 + 0 = 15,536</code> อีก <code>65,536 − 15,536 = 50,000</code> ครั้งจึงล้น (50 ms ที่ 12 MHz)</p>",
    blueprint=["มี 2 Timer: T0, T1", "ขนาด 16 บิต นับขึ้น", "รีจิสเตอร์นับ: <code>TH0/TL0</code>, <code>TH1/TL1</code> (8 บิตคู่กัน)", "ควบคุมด้วย TMOD, TCON"],
    sources=[("L5", "หน้า 3", "Two 16 bits Timers T0 &amp; T1, up counters"), ("L3", "หน้า 12", "ตาราง SFR: TL0 8AH, TH0 8CH, TL1 8BH, TH1 8DH")],
    figure="",
    jump="",
)

L[3] = dict(
    time="7 นาที",
    terms=[
        ("Overflow", "โอ-เวอร์-โฟลว์", "ล้น: ค่าเกินที่ตัวนับจุได้ ตัวนับจึงวนกลับเริ่มนับใหม่"),
        ("Roll over", "โรล โอ-เวอร์", "วนกลับจาก FFFFH เป็น 0000H"),
        ("Flag", "แฟล็ก", "ธงสัญญาณ: บิตที่ฮาร์ดแวร์ยกขึ้นเพื่อบอกว่ามีเหตุการณ์เกิดขึ้น"),
        ("Polling", "โพ-ลิ่ง", "การวนถามสถานะ flag ซ้ำ ๆ ด้วยซอฟต์แวร์ แทนการรอ interrupt"),
    ],
    physics='''<p>ตัวนับ 16 บิตมีสถานะจำกัด 65,536 ค่า เมื่ออยู่ที่ FFFFH แล้วได้รับขอบนาฬิกาอีกครั้ง บิตทั้ง 16 กลับเป็น 0 และเกิด carry ออกจากบิตที่ 15 carry นี้ไปเซต flip-flop ชื่อ <code>TF0</code> (TCON.5) ให้เป็น 1 ซึ่งเป็นทั้งผลให้โปรแกรม polling อ่าน และเป็นสัญญาณขอ interrupt ไปยัง vector 000BH</p>''',
    analogy="แก้วน้ำที่เติมทีละหยด เมื่อหยดสุดท้ายทำให้ล้น น้ำจะไหลไปกดกริ่ง (TF0) แล้วแก้วก็ว่างเปล่าอีกครั้ง",
    limits="แก้วน้ำล้นแล้วไม่ว่างเอง แต่ตัวนับวนกลับ 0000H ทันทีและนับต่อ ถ้าไม่โหลดค่าใหม่ (Mode 1) รอบต่อไปจะนับครบ 65,536 เต็ม",
    derive='''<ol><li>โหลด <code>FF9CH</code> แล้วนับ: FF9CH, FF9DH, …, FFFFH, 0000H</li>
<li>จำนวนก้าวจนล้น = <code>10000H − FF9CH = 64H = 100</code> ครั้ง</li>
<li>จังหวะที่ TF0 = 1 คือก้าวที่ 100 (FFFFH → 0000H) ไม่ใช่ตอนค่าเป็น FFFFH (ก้าวที่ 99)</li></ol>''',
    whatif="<ul><li><strong>ใช้ interrupt:</strong> CPU ล้าง TF0 ให้อัตโนมัติเมื่อกระโดดเข้า ISR (Lecture 5 หน้า 9)</li><li><strong>ใช้ polling:</strong> ต้องล้างเองด้วย <code>CLR TF0</code> หรือ <code>MOV TCON, #00H</code> ไม่อย่างนั้นรอบถัดไปจะเห็น TF0 = 1 ค้างอยู่ทันที</li></ul>",
    traps=["ตอบ \"เมื่อเป็น FFFFH\" ถูกกากบาทบนกระดาษที่ตรวจแล้ว ต้องมีคำว่า roll over / วนกลับเป็น 0000H", "ลืมบอกว่า flag ที่เซตคือ TF0 / TF1"],
    drill_q="Timer 0 Mode 1 เริ่มที่ <code>FFF0H</code> ที่ 12 MHz: TF0 จะเป็น 1 หลังเวลาเท่าไร และถ้าไม่โหลดค่าใหม่ ครั้งถัดไปล้นหลังอีกกี่ µs",
    drill_a="<p>ครั้งแรก <code>10000H − FFF0H = 10H = 16</code> counts = 16 µs ครั้งถัดไปเริ่มจาก 0000H จึงต้องนับครบ <code>65,536</code> counts = 65,536 µs ≈ 65.5 ms</p>",
    blueprint=["นับจนถึง <code>FFFFH</code> แล้ว <strong>roll over</strong> เป็น <code>0000H</code>", "ฮาร์ดแวร์เซต <code>TF0</code> / <code>TF1</code> = 1", "ถ้า EA และ ET0/ET1 เปิด → กระโดดไป 000BH / 001BH"],
    sources=[("L5", "หน้า 4, 6, 9", "rolls back to 0000H … Timer Overflow interrupt")],
    figure=OVERFLOW_LINE,
    jump=jump("w-timer", "ดูการนับใน Timer Workbench"),
)

L[4] = dict(
    time="12 นาที",
    terms=[
        ("Machine cycle", "มะ-ชีน ไซ-เคิล", "หน่วยเวลาพื้นฐานของคำสั่ง 8051 = 12 จังหวะ oscillator"),
        ("Reload / Preload value", "รี-โหลด / พรี-โหลด แวลู", "ค่าที่ใส่ไว้ก่อนเริ่มนับ ให้ \"ห่างจากจุดล้น\" เท่ากับจำนวนที่ต้องการ"),
        ("Two's complement", "ทูส์ คอม-พลี-เมนต์", "ส่วนเติมเต็มฐานสอง: ค่าลบในระบบ n บิตคือ 2ⁿ − ค่า สูตรโหลด 65536 − N คือค่า −N ใน 16 บิต"),
    ],
    physics='''<p>เวลาของ Timer มาจากการนับ machine cycle ที่ 12 MHz ทุก 1 µs ตัวนับเพิ่ม 1 เราจึงเปลี่ยน "เวลา" เป็น "จำนวน count" แล้วโหลดค่าเริ่มต้นให้ตัวนับไปถึงจุดล้นพอดีหลัง N count</p>''',
    analogy="อยากให้กริ่งดังหลังเดิน 100 ก้าว บนทางที่ยาว 65,536 ก้าว ก็ให้เริ่มยืนที่ก้าวที่ 65,436",
    limits="ในชิปจริง คำสั่งโหลดค่าและเริ่ม Timer ก็ใช้เวลาเช่นกัน โปรแกรมจริงจึงช้ากว่าค่าที่คำนวณเล็กน้อย (ดูหัวข้อ Assembly)",
    derive='''<ol><li><code>Tmc = 12 ÷ 12 MHz = 1 µs</code></li>
<li><code>N = 100 µs ÷ 1 µs = 100 = 64H</code> (100 ÷ 16 = 6 เศษ 4 → 64H)</li>
<li>สูตรรายวิชา: <code>Count = FFFFH − N + 1 = FFFFH − 64H + 1 = FF9BH + 1 = FF9CH</code></li>
<li>มองแบบ two's complement: <code>−100</code> ใน 16 บิต = <code>65,536 − 100 = 65,436 = FF9CH</code> (กลับบิต 0064H ได้ FF9BH แล้วบวก 1)</li>
<li>แยกไบต์: <code>TH0 = FFH</code>, <code>TL0 = 9CH</code></li></ol>''',
    asm=[
        ("MOV TMOD, #01H", "Timer 0 Mode 1, C/T = 0, GATE = 0", "2", "ไม่มี", "TMOD ไม่ bit-addressable จึงเขียนทั้งไบต์"),
        ("MOV TH0, #0FFH", "โหลดไบต์บน", "2", "ไม่มี", "ใส่ 0 นำหน้าให้แอสเซมเบลอร์รู้ว่า FF เป็นตัวเลข ไม่ใช่ชื่อ label"),
        ("MOV TL0, #9CH", "โหลดไบต์ล่าง", "2", "ไม่มี", "โหลดก่อนเริ่มนับ ค่าจึงไม่เปลี่ยนระหว่างเขียน"),
        ("MOV TCON, #10H", "TR0 = 1 เริ่มนับ (และล้าง TF0)", "2", "ไม่มี", "รูปแบบเดียวกับ Lecture 5 หน้า 20"),
        ("WAIT100: JNB TCON.5, WAIT100", "วนจน TF0 = 1", "2 ต่อรอบ", "ไม่มี", "polling แทน interrupt ง่ายและเดาได้"),
        ("MOV TCON, #00H", "หยุด Timer และล้าง TF0", "2", "ไม่มี", "เตรียมรอบถัดไป"),
        ("RET", "กลับผู้เรียก", "2", "ไม่มี", "ซับรูทีนเรียกด้วย ACALL/LCALL"),
    ],
    asm_note=f"<p>แบบจำลองบนหน้านี้ (sim8051.js) นับได้ <strong>114 machine cycles</strong> ตั้งแต่คำสั่งแรกถึง RET และ <strong>116 µs</strong> ถ้ารวม ACALL ของผู้เรียก ส่วนเกิน 16 µs คือเวลาของคำสั่งควบคุม ข้อสอบต้องการค่า FF9CH ไม่ใช่การชดเชยนี้ {ISA}</p>",
    whatif='''<ul><li><strong>11.0592 MHz:</strong> <code>Tmc = 1.0851 µs</code>, <code>N = 100 ÷ 1.0851 = 92.16 → 92 = 5CH</code>, <code>65,536 − 92 = 65,444 = FFA4H</code>, เวลาจริง <code>92 × 1.0851 = 99.83 µs</code> (คลาด −0.17%)</li>
<li><strong>Mode 2 (auto-reload):</strong> <code>256 − 100 = 156 = 9CH</code> → <code>TH0 = TL0 = 9CH</code> ไม่ต้องโหลดใหม่ทุกรอบ เหมาะกับสัญญาณคาบคงที่</li>
<li><strong>1 kHz square wave (ตัวอย่างเสริมในสมุด):</strong> ครึ่งคาบ 500 µs → <code>65,536 − 500 = FE0CH</code></li></ul>''',
    traps=["เอา N ใส่ตรง ๆ (<code>TL0 = 64H</code>) ลืมว่าตัวนับนับขึ้น", "ลืม +1 ในสูตร FFFFH − N + 1 ได้ FF9BH (คลาด 1 µs)", "สลับ TH0 กับ TL0"],
    drill_q="ที่ 12 MHz ต้องการหน่วง 2 ms ด้วย Timer 1 Mode 1 ให้หาค่า TH1, TL1 และค่า TMOD",
    drill_a="<p><code>N = 2000 = 07D0H</code>, <code>65,536 − 2,000 = 63,536 = F830H</code> → <code>TH1 = F8H</code>, <code>TL1 = 30H</code>; Timer 1 อยู่ครึ่งบนของ TMOD: <code>TMOD = 10H (0001 0000B)</code></p>",
    blueprint=["<code>Tmc = 12 ÷ 12 MHz = 1 µs</code>", "<code>N = 100 = 64H</code>", "<code>FFFFH − 64H + 1 = FF9CH</code>", "<code>TH0 = FFH, TL0 = 9CH, TMOD = 01H</code>"],
    sources=[("L5", "หน้า 4, 20, 21", "สูตร Count = FFFFH − Value + 1 และโปรแกรมตัวอย่าง")],
    figure="",
    jump="",
)

L[5] = dict(
    time="6 นาที",
    terms=[
        ("TR (Timer Run control bit)", "ที-อาร์", "บิตสั่งเดิน/หยุดตัวนับ ซอฟต์แวร์เป็นผู้เขียน"),
        ("TF (Timer overflow Flag)", "ที-เอฟ", "บิตที่ฮาร์ดแวร์ยกเมื่อตัวนับล้น"),
        ("Bit-addressable", "บิต-แอด-เดรส-ซะ-เบิล", "SFR ที่แอดเดรสลงท้าย 0H หรือ 8H สั่ง SETB/CLR ทีละบิตได้"),
    ],
    physics='''<p>TR0 เป็น flip-flop ที่ต่อเข้า "ประตู AND" หน้าตัวนับ: เมื่อ TR0 = 1 (และ GATE = 0) พัลส์ 1 µs ผ่านประตูไปถึงตัวนับ เมื่อ TR0 = 0 ประตูปิด ตัวนับค้างค่าเดิม TCON อยู่ที่ 88H ซึ่งหารด้วย 8 ลงตัว จึง bit-addressable</p>''',
    analogy="TR คือสวิตช์เปิดน้ำ TF คือทุ่นลอยที่เด้งขึ้นเมื่อถังเต็ม",
    limits="สวิตช์น้ำเราเปิดปิดเองทั้งคู่ แต่ TF ฮาร์ดแวร์เป็นคนยก เราทำได้แค่ล้าง",
    derive='''<ol><li>ตำแหน่งบิต: <code>TCON = TF1 TR1 TF0 TR0 IE1 IT1 IE0 IT0</code> (บิต 7 → 0)</li>
<li><code>MOV TCON, #10H</code>: <code>10H = 0001 0000B</code> → บิต 4 = TR0 = 1</li>
<li>bit address: TCON เริ่มที่ 88H ดังนั้น <code>TR0 = 88H + 4 = 8CH</code>, <code>TF0 = 88H + 5 = 8DH</code></li>
<li>สามแบบนี้ทำงานเหมือนกัน: <code>SETB TR0</code> = <code>SETB TCON.4</code> = <code>SETB 8CH</code></li></ol>''',
    whatif="<ul><li><strong><code>MOV TCON, #10H</code> กับ <code>SETB TR0</code>:</strong> แบบแรกเขียนทับทั้งไบต์ (ล้าง IT0, TR1 ไปด้วย) แบบหลังแตะแค่บิตเดียว ปลอดภัยกว่าเมื่อใช้ interrupt ภายนอกร่วมด้วย</li><li><strong>TR0 = 0 กลางทาง:</strong> ตัวนับหยุด ค่า TH0:TL0 ค้างอยู่ อ่านได้ และสั่งเดินต่อได้</li></ul>",
    traps=["ตอบ \"Time Reference\" ถูกกากบาท", "สับสน TR (ซอฟต์แวร์สั่ง) กับ TF (ฮาร์ดแวร์บอก)"],
    drill_q="เขียนคำสั่ง<strong>หนึ่งบรรทัด</strong>ที่เริ่มทั้ง Timer 0 และ Timer 1 พร้อมกัน โดยไม่แตะบิตอื่นใน TCON",
    drill_a="<p><code>ORL TCON, #50H</code> (<code>0101 0000B</code> = TR1 และ TR0) ORL ตั้งเฉพาะบิตที่เป็น 1 บิตอื่นคงเดิม</p>",
    blueprint=["TR = <strong>Timer Run control bit</strong>", "TR0 = TCON.4 (8CH), TR1 = TCON.6 (8EH)", "1 = เริ่มนับ, 0 = หยุด", "คู่กับ TF = Timer overflow Flag"],
    sources=[("L5", "หน้า 9", "TR1 and TR0 - Timer Run Control Bit"), ("L3", "หน้า 12", "TCON 88H bit address 8FH–88H")],
    figure='<figure class="fig-card">' + TCON_BITS + '<figcaption>TCON: TR0 (บิต 4) และ TR1 (บิต 6) พร้อม bit address</figcaption></figure>',
    jump=jump("w-sfr", "ลอง TCON ใน Bit-Flipper", "TCON:10"),
)

L[6] = dict(
    time="8 นาที",
    terms=[
        ("Edge", "เอจ", "ขอบสัญญาณ: จังหวะที่ระดับเปลี่ยน ขาขึ้น 0 → 1 หรือขาลง 1 → 0"),
        ("Level", "เล-เวล", "ระดับสัญญาณที่ค้างอยู่ (0 หรือ 1)"),
        ("Trigger", "ทริก-เกอร์", "ไกปืน: เงื่อนไขที่ทำให้เหตุการณ์เริ่ม"),
        ("Active-low", "แอค-ทีฟ โลว์", "สัญญาณที่ \"ทำงาน\" เมื่อเป็น 0 เช่น INT0 เขียนมีขีดบน"),
    ],
    physics=f'''<p>ขา INT0 (P3.2) และ INT1 (P3.3) ถูกสุ่มอ่านทุก machine cycle ในโหมด edge (IT0 = 1) วงจรจะจำค่าก่อนหน้าไว้ ถ้ารอบก่อนเป็น 1 และรอบนี้เป็น 0 จึงเซต IE0 = 1 ครั้งเดียว ในโหมด level (IT0 = 0) IE0 ตามระดับ 0 ที่ค้างอยู่ สัญญาณต้องค้างสูงและต่ำอย่างน้อย 1 machine cycle จึงถูกเห็น {DS}</p>''',
    analogy="กริ่งประตูแบบกดครั้งเดียวดังครั้งเดียว (edge) เทียบกับออดที่ดังตลอดเวลาที่นิ้วยังกด (level)",
    limits="ในโหมด level ISR จะถูกเรียกซ้ำทันทีหลัง RETI ถ้าสัญญาณยังเป็น 0 ซึ่งกริ่งจริงไม่มีพฤติกรรม \"เรียกซ้ำ\" แบบนี้",
    derive='''<ol><li>ตั้ง INT0 เป็น edge: <code>IT0 = TCON.0 = 1</code></li>
<li>bit address <code>IT0 = 88H + 0 = 88H</code> ดังนั้น <code>SETB TCON.0</code> = <code>SETB IT0</code> = <code>SETB 88H</code></li>
<li>ขอบขาลงหนึ่งครั้ง → <code>IE0 = 1</code> → ถ้า <code>EA = EX0 = 1</code> CPU กระโดด <code>0003H</code> และล้าง IE0 ให้ (edge)</li></ol>''',
    whatif="<ul><li><strong>ปุ่มกดมี bounce:</strong> สัมผัสกระเด้งหลายครั้งใน 1–20 ms จะเกิดหลายขอบ ต้อง debounce ด้วยซอฟต์แวร์หรือวงจร RC</li><li><strong>เปลี่ยนเป็น level:</strong> เหมาะกับอุปกรณ์ที่ค้างสัญญาณจนกว่าจะได้รับบริการ</li></ul>",
    traps=["ตอบว่า \"ขอบขาลงคือ 0 → 1\" สลับทิศ", "ไม่บอกว่าเลือกด้วยบิต IT0/IT1", "เรียก edge/level trigger ว่า \"ประเภทของ interrupt\" (เป็นความผิดในข้อ 14)"],
    drill_q="ต้องให้ INT1 เป็น edge trigger และเปิด interrupt นี้ เขียนโค้ดที่สั้นที่สุด พร้อมระบุ vector",
    drill_a="<p><code>SETB IT1</code> (TCON.2), <code>SETB EX1</code> (IE.2), <code>SETB EA</code> (IE.7) vector ของ INT1 คือ <code>0013H</code></p>",
    blueprint=["Negative edge = ขอบ<strong>ขาลง</strong> 1 → 0", "ใช้กับ INT0/INT1 เมื่อ <code>IT0/IT1 = 1</code>", "<code>IT = 0</code> = low level trigger"],
    sources=[("L5", "หน้า 9, 10", "IT1 and IT0 - External Interrupt Type bit"), ("L6", "หน้า 12", "setb TCON.0 ; set int type")],
    figure=NEG_EDGE + '<figure class="fig-card">' + TCON_EDGE + '<figcaption>IT0 (TCON.0) และ IT1 (TCON.2) เลือกชนิดการกระตุ้น</figcaption></figure>',
    jump=jump("w-sfr", "ลอง IT0 ใน Bit-Flipper", "TCON:01"),
)

L[7] = dict(
    time="10 นาที",
    terms=[
        ("Mode", "โหมด", "รูปแบบการต่อบิตของตัวนับ เลือกด้วย M1 M0"),
        ("Auto-reload", "ออ-โต้ รี-โหลด", "เติมค่าเริ่มต้นกลับอัตโนมัติเมื่อล้น (Mode 2: TH → TL)"),
        ("Nibble", "นิบ-เบิล", "ครึ่งไบต์ 4 บิต: TMOD ครึ่งบนของ Timer 1 ครึ่งล่างของ Timer 0"),
        ("GATE", "เกต", "บิตให้ขา INTx ควบคุมการเดินของ Timer ด้วยฮาร์ดแวร์"),
    ],
    physics='''<p>M1 M0 เป็นสายควบคุมมัลติเพล็กเซอร์ที่ \"ต่อ\" flip-flop ของ TL และ TH ให้เป็นตัวนับขนาดต่าง ๆ: 13 บิต (TL ใช้ 5 บิต), 16 บิต, หรือ 8 บิตที่มีทางเดินข้อมูลจาก TH กลับไป TL เมื่อ TL ล้น</p>''',
    analogy="กระดุมเลือกเกียร์: เกียร์เดียวกันเปลี่ยนอัตราทดได้ ไม่ต้องเปลี่ยนเครื่องยนต์",
    limits="เกียร์รถเปลี่ยนได้ขณะวิ่ง แต่ควรตั้ง TMOD ก่อนเริ่ม Timer (TR = 0) เพื่อไม่ให้ค่ากระโดดระหว่างเปลี่ยน",
    derive='''<ol><li>TMOD = <code>[GATE C/T M1 M0]<sub>T1</sub> [GATE C/T M1 M0]<sub>T0</sub></code></li>
<li>Timer 0 Mode 1: nibble ล่าง <code>0001</code> → <code>TMOD = 01H</code>; Timer 1 Mode 2: nibble บน <code>0010</code> → <code>20H</code></li>
<li>รวมกัน: <code>20H OR 01H = 21H (0010 0001B)</code></li>
<li>นับได้สูงสุด: Mode 0 <code>2¹³ = 8,192</code>, Mode 1 <code>2¹⁶ = 65,536</code>, Mode 2 <code>2⁸ = 256</code> → ที่ 12 MHz ได้ 8.192 ms, 65.536 ms, 256 µs</li></ol>''',
    whatif="<ul><li><strong>Mode 3:</strong> Timer 0 แยกเป็น TL0 (ใช้ TF0) กับ TH0 (ยืม TF1) Timer 1 ยังเดินได้แต่ไม่มี flag ของตัวเอง นิยมให้ Timer 1 สร้าง baud rate</li><li><strong>Mode 2 กับ UART:</strong> Timer 1 Mode 2 ให้คาบคงที่โดยไม่ต้องโหลดซ้ำ จึงเป็นมาตรฐานของ baud rate</li></ul>",
    traps=["ตอบแค่ \"ใช้เลือกโหมด\" ได้คะแนนไม่เต็ม ต้องมีตาราง 00/01/10/11", "ใส่ค่าโหมดของ Timer 0 ในครึ่งบน (Timer 1) ของ TMOD", "Mode 0 เป็น 13 บิต ไม่ใช่ 8 บิต"],
    drill_q="ต้องการ Timer 1 เป็น Timer Mode 2 และ Timer 0 เป็น Counter Mode 1 (GATE = 0 ทั้งคู่) หาค่า TMOD",
    drill_a="<p>T1: <code>0 0 1 0</code>, T0: <code>0 1 0 1</code> → <code>0010 0101B = 25H</code></p>",
    blueprint=["M1 M0 = Mode Control bits ใน TMOD", "00 = 13 บิต, 01 = 16 บิต, 10 = 8 บิต auto-reload, 11 = แยก 8 บิต 2 ตัว", "ตัวอย่าง <code>MOV TMOD, #01H</code> = Timer 0 Mode 1"],
    sources=[("L5", "หน้า 11, 15–19", "Mode Control bits และ Timer Mode 0–3")],
    figure=MODES + '<figure class="fig-card">' + TMOD_BITS + '<figcaption>TMOD: M1 M0 ของ Timer 0 คือบิต 1–0 ของ Timer 1 คือบิต 5–4</figcaption></figure>',
    jump="",
    widget_key="sfr",
)
