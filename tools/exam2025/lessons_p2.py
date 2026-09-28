"""Deep lessons Q8-Q14 (counter setup, delay flowchart, serial, interrupt basics)."""
from figures import TMOD_CT, SCON_BITS, fig
from widgets import jump

DS = '<span class="src-tag">datasheet 8051 มาตรฐาน · นอกสไลด์</span>'
ISA = '<span class="src-tag">ตาราง MCS-51 · นอกสไลด์</span>'

L = {}

L[8] = dict(
    time="8 นาที",
    terms=[
        ("Counter mode", "เคา-เทอร์ โหมด", "Timer ที่นับพัลส์ภายนอกแทน clock ภายใน"),
        ("Alternate function", "ออล-เทอร์-เนต ฟังก์-ชัน", "หน้าที่ที่สองของขาพอร์ต: P3.4 เป็นขา T0 ได้"),
        ("Port latch", "พอร์ต แลตช์", "flip-flop ที่จำค่าที่เขียนออกขาพอร์ต ต้องเป็น 1 ขาจึงอ่านสัญญาณภายนอกได้"),
    ],
    physics=f'''<p>ขาพอร์ต 8051 เป็นแบบ quasi-bidirectional: เมื่อ latch เป็น 1 ทรานซิสเตอร์ดึงลงปิด เหลือ pull-up อ่อน ๆ อุปกรณ์ภายนอกจึงดึงขาลงเป็น 0 ได้ เมื่อ latch เป็น 0 ขาถูกบังคับเป็น 0 ตลอดและอ่านอะไรไม่ได้ หลัง reset latch ของ P3 เป็น 1 อยู่แล้ว ขา T0 จึงพร้อมรับสัญญาณ {DS}</p>
<p>เมื่อ <code>C/T = 1</code> มัลติเพล็กเซอร์หน้าตัวนับสลับจากสาย Fosc/12 ไปสายจากขา T0 ตัวนับเพิ่ม 1 ต่อขอบขาลงหนึ่งครั้ง</p>''',
    analogy="เปลี่ยนเครื่องนับก้าวจาก \"นับวินาที\" เป็น \"นับรถที่วิ่งผ่านเซนเซอร์\" แค่ย้ายสายเข้าตัวนับ",
    limits="เซนเซอร์จริงต้องให้พัลส์สะอาดและช้ากว่า Fosc ÷ 24 ไม่เช่นนั้นจะนับหล่น",
    derive='''<ol><li>C/T ของ Timer 0 = TMOD บิต 2 (nibble ล่าง: GATE = บิต 3, C/T = บิต 2, M1 = บิต 1, M0 = บิต 0)</li>
<li>Counter + Mode 1 + GATE = 0: <code>0000 0101B = 05H</code></li>
<li>อยากให้ interrupt หลังนับครบ 1,000 พัลส์: โหลด <code>65,536 − 1,000 = 64,536 = FC18H</code> → <code>TH0 = FCH, TL0 = 18H</code></li></ol>''',
    asm=[
        ("MOV TMOD, #05H", "T0 = Counter, Mode 1, GATE = 0", "2", "ไม่มี", "TMOD ไม่ bit-addressable เขียนทั้งไบต์"),
        ("MOV TH0, #00H", "ล้างไบต์บน", "2", "ไม่มี", "เริ่มนับจาก 0"),
        ("MOV TL0, #00H", "ล้างไบต์ล่าง", "2", "ไม่มี", "เริ่มนับจาก 0"),
        ("SETB TR0", "เปิดประตูให้พัลส์เข้าตัวนับ", "1", "ไม่มี", "แตะเฉพาะบิต TR0 ไม่กระทบบิตอื่นของ TCON"),
        ("MOV A, TL0", "อ่านจำนวนพัลส์ไบต์ล่าง", "1", "P (parity) ใน PSW ตามค่า A", "MOV เข้า A เปลี่ยน parity flag P เท่านั้น"),
    ],
    asm_note=f"<p>ถ้าต้องอ่านค่า 16 บิตขณะตัวนับยังเดิน ให้อ่าน TH0, TL0 แล้วอ่าน TH0 ซ้ำ ถ้าไม่เท่ากันแปลว่ามีการทดระหว่างอ่าน ให้อ่านใหม่ {DS}</p>",
    whatif="<ul><li><strong>GATE = 1:</strong> ตัวนับเดินเฉพาะเมื่อ TR0 = 1 และขา INT0 = 1 ใช้วัดความกว้างพัลส์ได้ (Lecture 5 หน้า 11: Timer controlled by hardware)</li><li><strong>Timer 1 เป็น Counter:</strong> ตั้งบิต 6 (<code>TMOD = 50H</code> สำหรับ Mode 1) และต่อสัญญาณที่ T1 = P3.5</li></ul>",
    traps=["ตั้งบิต C/T ของ Timer 1 (บิต 6) แทน Timer 0 (บิต 2)", "ลืม <code>SETB TR0</code> ตัวนับจึงไม่นับเลย", "ตอบว่าต้องต่อสัญญาณที่ INT0 (P3.2) แทน T0 (P3.4)"],
    drill_q="ต้องการ Timer 0 เป็น Counter ที่วัดจำนวนพัลส์เฉพาะช่วงที่ขา INT0 เป็น 1 (GATE = 1, Mode 1) หาค่า TMOD และอธิบายเงื่อนไขการเดินของตัวนับ",
    drill_a="<p>nibble ล่าง <code>GATE = 1, C/T = 1, M1 M0 = 01</code> → <code>1101B</code> → <code>TMOD = 0DH</code> ตัวนับเดินเมื่อ <code>TR0 = 1</code> และ <code>INT0 = 1</code> พร้อมกัน</p>",
    blueprint=["ตั้ง <code>C/T = 1</code> ของ Timer 0 = TMOD บิต 2", "ตัวอย่าง <code>MOV TMOD, #05H</code> (Counter, Mode 1)", "สัญญาณเข้าขา T0 = P3.4", "<code>SETB TR0</code> เพื่อเริ่มนับ"],
    sources=[("L5", "หน้า 5, 11, 14", "C/T bit, GATE, pinout T0 = P3.4")],
    figure='<figure class="fig-card">' + TMOD_CT + '<figcaption>C/T ของ Timer 0 คือบิต 2 ของ TMOD</figcaption></figure>',
    jump=jump("w-sfr", "ลอง TMOD = 05H ใน Bit-Flipper", "TMOD:05"),
)

L[9] = dict(
    time="10 นาที",
    terms=[
        ("Flowchart", "โฟลว์-ชาร์ต", "ผังงาน: สี่เหลี่ยม = การกระทำ, ข้าวหลามตัด = การตัดสินใจ, วงรี = เริ่ม/จบ"),
        ("Busy-wait loop", "บิซี่-เวต ลูป", "วนรอโดยให้ CPU ถาม flag ซ้ำ ๆ"),
        ("Subroutine", "ซับ-รู-ทีน", "โปรแกรมย่อย เรียกด้วย ACALL/LCALL จบด้วย RET"),
    ],
    physics="<p>Flowchart ของข้อนี้สะท้อนฮาร์ดแวร์ตรง ๆ: ตั้งโหมด → โหลดค่าเข้า flip-flop ของตัวนับ → เปิดประตู TR0 → ข้าวหลามตัดคือคำสั่ง <code>JNB TCON.5</code> ที่อ่านบิต TF0 → ล้าง flag และปิดประตู</p>",
    analogy="ตั้งเวลาไมโครเวฟ: ตั้งโหมด, ใส่ตัวเลข, กด start, ยืนมองจอจนมันดัง, เปิดประตูหยุดเครื่อง",
    limits="ไมโครเวฟนับถอยหลัง แต่ Timer 8051 นับขึ้นไปหาจุดล้น และ CPU ที่ยืนรอทำงานอื่นไม่ได้เลยระหว่างนั้น",
    derive='''<ol><li><code>N = 10 µs ÷ 1 µs = 10 = 0AH</code></li>
<li><code>FFFFH − 0AH + 1 = FFF5H + 1 = FFF6H</code> (ตรวจ: <code>65,536 − 10 = 65,526 = FFF6H</code>)</li>
<li><code>TH0 = FFH (1111 1111B)</code>, <code>TL0 = F6H (1111 0110B)</code> ตรงกับคอมเมนต์ใน Lab 5</li></ol>''',
    asm=[
        ("MOV TMOD, #01H", "Timer 0 Mode 1", "2", "ไม่มี", "กล่อง \"ตั้งโหมด\""),
        ("MOV TH0, #0FFH", "ไบต์บนของ FFF6H", "2", "ไม่มี", "กล่อง \"โหลดค่า\""),
        ("MOV TL0, #0F6H", "ไบต์ล่างของ FFF6H", "2", "ไม่มี", "กล่อง \"โหลดค่า\""),
        ("MOV TCON, #10H", "TR0 = 1", "2", "ไม่มี", "กล่อง \"เริ่มนับ\""),
        ("WAIT10: JNB TCON.5, WAIT10", "ถาม TF0 ซ้ำ", "2 ต่อรอบ", "ไม่มี", "ข้าวหลามตัด TF0 = 1 ? (No วนกลับ)"),
        ("MOV TCON, #00H", "TF0 = 0, TR0 = 0", "2", "ไม่มี", "กล่อง \"ล้าง flag\" + \"หยุด\" รวมในคำสั่งเดียว"),
        ("RET", "กลับ", "2", "ไม่มี", "วงรี End"),
    ],
    asm_note=f"<p>แบบจำลองนับได้ <strong>24 machine cycles</strong>: MOV 4 คำสั่ง = 8, JNB 6 รอบ = 12 (ตัวนับล้นระหว่างรอบที่ 5 รอบที่ 6 จึงหลุดลูป), MOV TCON + RET = 4 ดังนั้น \"Delay 10 µs\" จริงใช้ 24 µs เพราะที่เวลาสั้นขนาดนี้ overhead ใหญ่กว่าเวลาที่นับ {ISA}</p>",
    whatif="<ul><li><strong>11.0592 MHz:</strong> <code>N = 10 ÷ 1.0851 = 9.22 → 9</code>, <code>65,536 − 9 = FFF7H</code>, ได้ <code>9.77 µs</code></li><li><strong>ต้องการ 10 µs ที่แม่นจริง:</strong> ใช้ DJNZ นับรอบ (2 µs ต่อรอบ) หรือใช้ Mode 2 + interrupt สำหรับงานคาบซ้ำ</li></ul>",
    traps=["วาด flowchart แบบ software counter (counter++) ไม่ได้ใช้ Timer ตามโจทย์", "ไม่มีข้าวหลามตัดวนรอ TF0", "ลืมกล่อง TMOD หรือไม่ใส่ค่า FFH/F6H", "ลืมล้าง TF0 ทำให้เรียกครั้งถัดไปหลุดทันที"],
    drill_q="ดัดแปลงซับรูทีนให้หน่วง 50 µs ที่ 12 MHz ระบุ TH0, TL0 และจำนวนรอบ JNB โดยประมาณ",
    drill_a="<p><code>N = 50 = 32H</code>, <code>65,536 − 50 = 65,486 = FFCEH</code> → <code>TH0 = FFH, TL0 = CEH</code> JNB วนราว 26 รอบ (2 µs ต่อรอบ) รวมทั้งซับรูทีนประมาณ 64 µs</p>",
    blueprint=["Start → TMOD = 01H → TH0 = FFH, TL0 = F6H → TR0 = 1", "ข้าวหลามตัด <code>TF0 = 1 ?</code> No วนกลับ", "Yes → TF0 = 0 → TR0 = 0 → End/RET", "แสดงการคำนวณ <code>FFFFH − 0AH + 1 = FFF6H</code>"],
    sources=[("LSM", "หน้า 5", "delay subroutine F6H delay 10usec"), ("L5", "หน้า 4, 20", "สูตรและโครงโปรแกรม delay")],
    figure="",
    jump=jump("w-timer", "ลอง 10 µs ใน Timer Workbench", "delay:10"),
)

L[10] = dict(
    time="9 นาที",
    terms=[
        ("Serial", "ซี-เรียล", "ส่งทีละบิตเรียงตามเวลาบนสายเดียว"),
        ("SBUF (Serial Buffer)", "เอส-บัฟ", "บัฟเฟอร์ข้อมูลอนุกรม แอดเดรส 99H"),
        ("SCON (Serial Control)", "เอส-คอน", "รีจิสเตอร์ควบคุมพอร์ตอนุกรม แอดเดรส 98H"),
        ("TxD / RxD", "ที-เอ็กซ์-ดี / อาร์-เอ็กซ์-ดี", "Transmit Data (P3.1) / Receive Data (P3.0)"),
    ],
    physics=f'''<p>SBUF เป็นสองรีจิสเตอร์ใช้แอดเดรสเดียวกัน: เขียน SBUF = ใส่ข้อมูลเข้า shift register ส่ง, อ่าน SBUF = ได้ข้อมูลจาก shift register รับ ทำให้รับและส่งพร้อมกันได้ {DS} วงจร shift register เลื่อนทีละบิตออก TxD ตามจังหวะ baud rate เริ่มจาก LSB (Lecture 6 หน้า 2)</p>''',
    analogy="SBUF คือตู้จดหมายสองช่อง ช่องส่งกับช่องรับ ส่วน SCON คือป้ายตั้งค่าบอกบุรุษไปรษณีย์ว่าจะใช้บริการแบบไหน และมีธง TI/RI บอกว่าส่งเสร็จ/มีจดหมายเข้า",
    limits="ตู้จดหมายเก็บได้หลายฉบับ แต่ SBUF ฝั่งรับเก็บได้ทีละไบต์ ถ้าไม่อ่านก่อนไบต์ถัดไปมาถึง ข้อมูลเก่าจะหาย",
    derive='''<ol><li>SCON bit-addressable (98H): <code>RI = 98H</code>, <code>TI = 99H</code>, <code>REN = 9CH</code></li>
<li>ตั้ง Mode 1 และเปิดรับ: <code>SM0 SM1 = 0 1</code>, <code>REN = 1</code> → <code>0101 0000B = 50H</code></li>
<li>ข้อควรระวัง: SBUF มี <strong>byte address</strong> 99H ส่วน TI มี <strong>bit address</strong> 99H คนละพื้นที่ คำสั่งแยกกันเอง (<code>MOV SBUF, A</code> กับ <code>JNB TI, …</code>)</li></ol>''',
    asm=[
        ("MOV TMOD, #20H", "Timer 1 Mode 2 เป็นตัวสร้าง baud", "2", "ไม่มี", "Mode 2 reload เองทุกรอบ"),
        ("MOV TH1, #0FDH", "9600 baud ที่ 11.0592 MHz", "2", "ไม่มี", "256 − 3 = 253 = FDH"),
        ("MOV SCON, #50H", "Mode 1, REN = 1", "2", "ไม่มี", "ตั้งทั้งไบต์ครั้งเดียว"),
        ("SETB TR1", "เริ่ม baud clock", "1", "ไม่มี", "ไม่มี clock ก็ไม่มีการส่ง"),
        ("MOV SBUF, A", "เริ่มส่ง 1 ไบต์", "1", "ไม่มี", "การเขียน SBUF คือคำสั่งเริ่มส่ง"),
        ("WAITTX: JNB TI, WAITTX", "รอส่งเสร็จ", "2 ต่อรอบ", "ไม่มี", "ฮาร์ดแวร์เซต TI เมื่อส่ง stop bit"),
        ("CLR TI", "ล้าง TI เอง", "1", "ไม่มี", "Serial ไม่ล้างอัตโนมัติ (Lecture 6 หน้า 13)"),
    ],
    asm_note="",
    whatif="<ul><li><strong>12 MHz กับ 9600 baud:</strong> <code>12,000,000 ÷ 384 ÷ 9600 = 3.26</code> ปัดเป็น 3 ได้จริง 10,417 baud คลาด +8.5% ส่งพลาดได้ จึงนิยม 11.0592 MHz (Mazidi บทที่ 11 หน้า 428)</li><li><strong>REN = 0:</strong> ส่งได้แต่ไม่รับ</li></ul>",
    traps=["ตอบแค่ SBUF ถูกกากบาท ต้องตอบคู่ SCON + SBUF", "ลืมล้าง TI/RI เอง ทำให้รอบถัดไปหลุดทันที"],
    drill_q="ต้องการรับอย่างเดียวใน Mode 1 ด้วย Timer 1 ที่ 9600 baud (11.0592 MHz) เขียนค่า SCON, TMOD, TH1 และคำสั่งรอรับ 1 ไบต์",
    drill_a="<p><code>SCON = 50H</code>, <code>TMOD = 20H</code>, <code>TH1 = FDH</code>, <code>SETB TR1</code> แล้ว <code>WAITRX: JNB RI, WAITRX</code>, <code>MOV A, SBUF</code>, <code>CLR RI</code></p>",
    blueprint=["<strong>SCON</strong> (98H): ตั้งโหมด SM0 SM1, REN, TB8/RB8, flag TI/RI", "<strong>SBUF</strong> (99H): เก็บข้อมูล 8 บิตที่ส่ง/รับ", "TxD = P3.1, RxD = P3.0"],
    sources=[("L6", "หน้า 2–6", "Serial Communication, SCON, SBUF"), ("L3", "หน้า 12", "SCON 98H, SBUF 99H"), ("MZ11", "หน้า 428", "11.0592 MHz สำหรับ baud แม่นยำ")],
    figure='<figure class="fig-card">' + SCON_BITS + '<figcaption>SCON: SM0 SM1 เลือกโหมด, REN เปิดรับ, TI/RI เป็น flag ส่ง/รับเสร็จ</figcaption></figure>',
    jump=jump("w-uart", "เปิด UART Frame Explorer"),
)

L[11] = dict(
    time="9 นาที",
    terms=[
        ("Synchronous", "ซิง-โคร-นัส", "ส่งพร้อมสัญญาณนาฬิการ่วม ผู้รับรู้จังหวะจาก clock"),
        ("Asynchronous", "เอ-ซิง-โคร-นัส", "ไม่ส่ง clock ผู้รับหาจังหวะเองจาก start bit"),
        ("Start / Stop bit", "สตาร์ต / สต็อป บิต", "บิต 0 ขึ้นต้นเฟรม และบิต 1 ปิดท้ายเฟรม"),
        ("Shift register", "ชิฟต์ เรจ-จิส-เตอร์", "รีจิสเตอร์ที่เลื่อนบิตออกทีละตำแหน่งต่อ clock"),
    ],
    physics=f'''<p>Mode 0: ขา RxD เป็นสายข้อมูล (ทั้งเข้าและออก) ขา TxD ส่งสัญญาณ clock ที่ Fosc/12 = 1 MHz ผู้รับเลื่อนบิตตาม clock นั้น จึงไม่ต้องมี start/stop {DS}</p>
<p>Mode 1: สายว่างอยู่ที่ 1 ผู้ส่งดึงลงเป็น 0 หนึ่งบิต (start) ผู้รับเห็นขอบขาลงนี้แล้วเริ่มจับเวลา อ่าน 8 บิตกลางช่วงบิต แล้วคาดว่าบิตสุดท้ายเป็น 1 (stop)</p>''',
    analogy="Mode 0 คือเดินแถวตามจังหวะกลองที่ทุกคนได้ยิน Mode 1 คือโทรศัพท์: ไม่มีกลองกลาง ผู้ฟังต้องจับจังหวะจากคำว่า \"ฮัลโหล\" (start bit)",
    limits="ในโทรศัพท์คุยยาวได้ แต่ UART ต้อง sync ใหม่ทุกเฟรม (ทุก 10 บิต) ความคลาดของ baud ระหว่างสองฝั่งจึงต้องน้อย",
    derive='''<ol><li>Mode 0: 8 บิตต่อไบต์ ที่ 1 Mbit/s → <code>8 µs</code> ต่อไบต์ (12 MHz)</li>
<li>Mode 1: <code>1 + 8 + 1 = 10</code> บิตต่อไบต์ ที่ 9600 baud → <code>10 ÷ 9600 = 1.042 ms</code> ต่อไบต์ ≈ 960 ไบต์/วินาที</li>
<li>ประสิทธิภาพข้อมูล Mode 1: <code>8 ÷ 10 = 80%</code></li></ol>''',
    whatif="<ul><li><strong>ต่อสาย Mode 0 เข้าคอมพิวเตอร์:</strong> ใช้ไม่ได้ เพราะคอมพิวเตอร์คาดหวัง UART แบบ asynchronous</li><li><strong>ขยายพอร์ต:</strong> Mode 0 ต่อกับ shift register ภายนอก เช่น 74HC595 เพื่อเพิ่มขาเอาต์พุต</li></ul>",
    traps=["ลืมบอก start bit = 0 และ stop bit = 1", "บอกว่า Mode 0 เป็น asynchronous", "บอก baud Mode 0 ปรับได้ (จริงคงที่ Fosc/12)"],
    drill_q="ส่ง 100 ไบต์ด้วย Mode 1 ที่ 9600 baud ใช้เวลาเท่าไร ถ้าใช้ Mode 0 ที่ 12 MHz จะใช้เวลาเท่าไร",
    drill_a="<p>Mode 1: <code>100 × 10 ÷ 9600 = 104.2 ms</code>; Mode 0: <code>100 × 8 ÷ 1,000,000 = 0.8 ms</code></p>",
    blueprint=["Mode 0 = Shift Register: ส่ง<strong>เฉพาะข้อมูล</strong> 8 บิต, synchronous, baud คงที่ Fosc/12", "Mode 1 = 8-bit UART: <code>start 0 + 8 data + stop 1</code> = 10 บิต, asynchronous, baud ปรับได้ (Timer 1)"],
    sources=[("L6", "หน้า 4–5", "Mode 0 Shift Register sends only data; Mode 1 start/stop")],
    figure="",
    jump=jump("w-uart", "เทียบเฟรม Mode 0 / Mode 1 ใน UART Explorer", "uart:0"),
)

L[12] = dict(
    time="9 นาที",
    terms=[
        ("Parity", "แพ-ริ-ตี้", "บิตตรวจความเท่าเทียม มาจากละติน paritas (ความเท่ากัน) ทำให้จำนวนบิต 1 เป็นคู่หรือคี่ตามที่ตกลง"),
        ("TB8 / RB8", "ที-บี-แปด / อาร์-บี-แปด", "Transmit/Receive Bit 8 บิตที่ 9 ของเฟรม"),
        ("Multiprocessor (SM2)", "มัล-ติ-โพร-เซส-เซอร์", "โหมดหลายชิปบนสายเดียว ใช้บิตที่ 9 แยก \"แอดเดรส\" กับ \"ข้อมูล\""),
    ],
    physics=f'''<p>ในเฟรม 9 บิต หลัง D7 ฮาร์ดแวร์ส่งค่า TB8 เป็นบิตถัดไป แล้วจึง stop bit ฝั่งรับเก็บบิตนั้นไว้ใน RB8 ไม่มีวงจรคำนวณ parity อัตโนมัติ ผู้เขียนโปรแกรมต้องใส่ TB8 เอง (Lecture 6 หน้า 6) แต่ 8051 ช่วยได้ด้วย flag <code>P</code> ใน PSW ซึ่งฮาร์ดแวร์คำนวณ parity ของ A ทุก instruction cycle (Lecture 2)</p>''',
    analogy="พัสดุ 8 ชิ้นที่แนบใบตรวจนับ (บิตที่ 9) ถ้าปลายทางนับแล้วไม่ตรงกับใบ แปลว่ามีชิ้นหายระหว่างทาง",
    limits="parity จับได้เฉพาะความผิดพลาดจำนวนคี่บิต ถ้าเพี้ยน 2 บิตพร้อมกัน parity ยังดูถูกต้อง",
    derive='''<ol><li>ข้อมูล <code>41H = 0100 0001B</code> มีบิต 1 สองตัว (คู่)</li>
<li>หลัง <code>MOV A, #41H</code> ได้ <code>P = 0</code> (P = 1 เมื่อ A มีบิต 1 จำนวนคี่)</li>
<li>parity คู่ทั้งเฟรม: <code>MOV C, P</code> แล้ว <code>MOV TB8, C</code> → TB8 = 0</li>
<li>เฟรม Mode 2/3: <code>1 + 8 + 1 + 1 = 11</code> บิต</li></ol>''',
    whatif="<ul><li><strong>Mode 2:</strong> baud คงที่ <code>Fosc ÷ 64</code> (SMOD = 0) = 187,500 baud ที่ 12 MHz หรือ <code>Fosc ÷ 32</code> เมื่อ SMOD = 1</li><li><strong>Mode 3:</strong> 9 บิตเหมือน Mode 2 แต่ baud มาจาก Timer 1</li><li><strong>SM2 = 1:</strong> ตัวรับเซต RI เฉพาะเฟรมที่ RB8 = 1 (แอดเดรส) ประหยัดเวลา CPU ของ slave</li></ul>",
    traps=["คิดว่าฮาร์ดแวร์คำนวณ parity บิตที่ 9 ให้เอง", "บอกว่าเฟรม 9-bit UART มี 9 บิต (จริงมี 11 บิตรวม start/stop)"],
    drill_q="จะส่ง <code>C3H</code> แบบ parity คู่ใน Mode 3 TB8 ต้องเป็นเท่าไร และเฟรมยาวกี่บิต",
    drill_a="<p><code>C3H = 1100 0011B</code> มีบิต 1 สี่ตัว (คู่) → <code>P = 0</code> → <code>TB8 = 0</code> เฟรมยาว 11 บิต</p>",
    blueprint=["9-bit UART = Mode 2/3", "เพิ่มบิตที่ 9 (parity) หลัง 8 data ก่อน stop", "ส่งจาก <code>TB8</code>, รับเข้า <code>RB8</code>", "เฟรม 11 บิต"],
    sources=[("L6", "หน้า 5–6", "Mode 2 &amp; 3 9 Bit UART, TB8/RB8 programmed by programmer"), ("L2", "หน้า 11", "PSW: Parity flag P ตั้งโดยฮาร์ดแวร์ทุก instruction cycle")],
    figure="",
    jump="",
)

L[13] = dict(
    time="8 นาที",
    terms=[
        ("Interrupt", "อิน-เทอร์-รัปต์", "การขัดจังหวะ มาจากละติน interrumpere (แทรกกลาง) ฮาร์ดแวร์หยุดงานปัจจุบันไปทำงานด่วนแล้วกลับมาต่อ"),
        ("Interrupt source", "อิน-เทอร์-รัปต์ ซอร์ส", "ต้นเหตุที่ขอ interrupt"),
        ("Vectored interrupt", "เวก-เตอร์ อิน-เทอร์-รัปต์", "แต่ละต้นเหตุมีแอดเดรสปลายทางของตัวเอง"),
    ],
    physics="<p>ต้นเหตุทั้ง 5 ต่างเป็น flip-flop (flag) หนึ่งตัว: IE0, TF0, IE1, TF1 อยู่ใน TCON ส่วน RI/TI อยู่ใน SCON ทุก machine cycle วงจร interrupt จะสุ่มดู flag เหล่านี้ ถ้ามี flag = 1 ที่เปิดไว้ใน IE มันจะแทรกคำสั่ง LCALL ไปยัง vector ของต้นเหตุนั้น</p>",
    analogy="พนักงานต้อนรับที่มีกริ่ง 5 ปุ่ม แต่ละปุ่มพาไปยังห้องบริการเฉพาะ",
    limits="พนักงานคนจริงตัดสินใจได้เอง แต่ 8051 ตอบสนองตามตาราง priority ที่ตายตัวเท่านั้น",
    derive='''<ol><li>External: INT0 (P3.2), INT1 (P3.3) → 2 ตัว</li>
<li>Timer overflow: TF0, TF1 → 2 ตัว</li>
<li>Serial: RI หรือ TI (ใช้ vector ร่วม) → 1 ตัว</li>
<li>รวม <code>2 + 2 + 1 = 5</code> (Reset 0000H ไม่นับ)</li></ol>''',
    whatif="<ul><li><strong>การล้าง flag:</strong> TF0/TF1 และ IE0/IE1 (edge) ล้างเองเมื่อเข้า ISR ส่วน RI/TI ผู้เขียนโปรแกรมต้องล้าง (Lecture 6 หน้า 13) เพราะ ISR ต้องตรวจก่อนว่ามาจาก RI หรือ TI</li><li><strong>8052:</strong> เพิ่ม Timer 2 เป็นต้นเหตุที่ 6</li></ul>",
    traps=["นับ Reset เป็น interrupt ตัวที่ 6", "แยก RI และ TI เป็นสองตัว (จริงใช้ vector เดียว)"],
    drill_q="ถ้า ISR ของ serial ถูกเรียก จะรู้ได้อย่างไรว่ามาจากการรับหรือการส่ง เขียนโครงคำสั่ง",
    drill_a="<p>ตรวจ flag: <code>JB RI, RX_PART</code> แล้วตรวจ <code>JB TI, TX_PART</code> ในแต่ละส่วนต้อง <code>CLR RI</code> หรือ <code>CLR TI</code> เอง จบด้วย <code>RETI</code></p>",
    blueprint=["INT0, TF0, INT1, TF1, Serial (RI/TI)", "External 2 + Timer 2 + Serial 1 = 5"],
    sources=[("L6", "หน้า 8, 9, 13", "five interrupts, vector table, flag clearing")],
    figure="",
    jump=jump("w-irq", "เปิด Interrupt Explorer"),
)

L[14] = dict(
    time="6 นาที",
    terms=[
        ("External interrupt", "เอ็กซ์-เทอร์-นัล", "มาจากขาภายนอกชิป (INT0, INT1)"),
        ("Internal interrupt", "อิน-เทอร์-นัล", "มาจาก peripheral ในชิป (Timer, Serial)"),
        ("Taxonomy", "แทก-ซอ-โน-มี", "การจัดหมวดหมู่ตามต้นกำเนิด"),
    ],
    physics="<p>จัดประเภทตามตำแหน่งของต้นเหตุ: อยู่นอกชิป (ขา P3.2/P3.3) หรือเป็นวงจรในชิป (ตัวนับ 2 ตัว และพอร์ตอนุกรม) การแบ่งนี้คนละแกนกับ edge/level ซึ่งเป็นวิธีตรวจสัญญาณของ external interrupt เท่านั้น</p>",
    analogy="แบ่งสายโทรเข้าเป็น \"ลูกค้าภายนอก\" กับ \"แผนกในบริษัท 2 แผนก\"",
    limits="ในบริษัทจริงแผนกเพิ่มได้ แต่ 8051 มีต้นเหตุตายตัว 5 ตัว",
    derive="<ol><li>External hardware: INT0, INT1</li><li>Timer overflow internal: TF0, TF1</li><li>Serial communication internal: RI/TI</li><li>สามประเภท รวม 5 ต้นเหตุ</li></ol>",
    whatif="<ul><li><strong>ถ้าข้อสอบถาม \"กี่ตัว\":</strong> ตอบ 5 (ข้อ 13) ถ้าถาม \"กี่ประเภท\": ตอบ 3 (ข้อนี้)</li></ul>",
    traps=["ตอบ \"Edge trigger และ Level trigger\" ถูกกากบาทบนกระดาษที่ตรวจแล้ว", "ตอบ 2 ประเภท (external/internal) โดยไม่แยก Timer กับ Serial ตามสไลด์"],
    drill_q="จัดต้นเหตุต่อไปนี้ลงประเภท: TI, INT1, TF0",
    drill_a="<p>TI → Serial communication internal; INT1 → External hardware; TF0 → Timer overflow internal</p>",
    blueprint=["<strong>3 ประเภท</strong>: External (INT0, INT1), Timer overflow (TF0, TF1), Serial (RI/TI)"],
    sources=[("L6", "หน้า 8", "Two Hardware / Two Timer / Serial Communication internal")],
    figure="",
    jump="",
)
