# ข้อสอบปลายภาค 305341 Embedded Systems 1 — Final 1/2568 (2025)
## ถอดโจทย์จากกระดาษข้อสอบจริง 21 ข้อ (ตรวจทานกับภาพต้นฉบับแล้ว)

- วิชา: 305341 ระบบสมองกลฝังตัว 1 (Embedded Systems 1) — อาจารย์ผู้สอน ดร.แสงชัย มังกรทอง
- สถาปัตยกรรมอ้างอิง: 8051 แบบ 12T, คริสตอล 12 MHz → `1 Machine Cycle = 12 / 12 MHz = 1 µs = 1 count`
- จำนวนข้อ: **21 ข้อ** (ข้อ 21 มีคะแนน [5]) — ไม่ใช่ 20 ข้อตามที่ไฟล์ฉบับก่อนหน้าระบุ

---

## 1. แหล่งที่มาและการตรวจสอบไขว้ (Provenance)

| แหล่ง | ไฟล์ | สิ่งที่ยืนยันได้ |
| :--- | :--- | :--- |
| กระดาษข้อสอบพิมพ์ (ภาพถ่าย 3 หน้า) | [Final-Embedded .pdf](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/final/real-exam/2025/Final-Embedded%20.pdf) | หน้า 1 และ 3 เห็นโจทย์พิมพ์ครบ 21 ข้อ พร้อมรูปประกอบข้อ 21 (State chart, สัญญาณคนข้าม Ready/Go, Hardware Diagram ขา P1.1, P1.0, P2.0) หน้า 3 เป็นกระดาษที่ตรวจให้คะแนนแล้ว หัวกระดาษพิมพ์ระบุ "305385 Embedded System วันที่ 1 ต.ค. 2567 เวลา 13:00–15:00" |
| สมุดบันทึกหลังสอบ หน้า 1 | [S__324124684_0.jpg](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/final/real-exam/2025/S__324124684_0.jpg) | หัวเรื่อง "Embedded Final 1/68" — ข้อ 1–4 และตัวอย่างเสริม Square Wave 1 kHz |
| สมุดบันทึกหลังสอบ หน้า 2 | [S__324124685_0.jpg](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/final/real-exam/2025/S__324124685_0.jpg) | ข้อ 5–9 (Flowchart ข้อ 9 เป็นแบบ Timer; แบบ software counter ถูกขีดฆ่าทิ้ง) |
| สมุดบันทึกหลังสอบ หน้า 3 | [S__324124686_0.jpg](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/final/real-exam/2025/S__324124686_0.jpg) | ข้อ 10–16 |
| สมุดบันทึกหลังสอบ หน้า 4 | [S__324124687_0.jpg](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/final/real-exam/2025/S__324124687_0.jpg) | ข้อ 17–21 พร้อม State chart และโค้ด ReadyState / GoState / delay |

ผลการตรวจไขว้: ลำดับและถ้อยคำของโจทย์ทั้ง 21 ข้อในสมุด "Final 1/68" ตรงกับกระดาษพิมพ์ทุกข้อ ข้อมูลส่วนตัวของนักศึกษาที่ปรากฏบนกระดาษคำตอบ (ชื่อ, รหัส) ไม่ถูกคัดลอกมาในเอกสารนี้

### รายการแก้ไขจากไฟล์ถอดความฉบับก่อนหน้า

1. จำนวนข้อคือ 21 ไม่ใช่ 20 และเลขข้อทุกข้อเลื่อนตามกระดาษจริง
2. ข้อ 5 จริงถามเฉพาะ "TR ย่อมาจาก" (TF เป็นหมายเหตุเสริมในสมุด ไม่ใช่ข้อแยก)
3. ข้อ 8 จริงคือ "ตั้งค่าให้ 8051 เป็น Counter สัญญาณที่ขา T0" (ฉบับเก่าไม่มีข้อนี้)
4. ข้อ 9 จริงคือ Flowchart หน่วงเวลา **10 µsec** ไม่ใช่ 100 µsec
5. ข้อ 12 (9-bit UART เทียบ 8-bit UART), ข้อ 14 (ประเภทของ Interrupt) และข้อ 15 (Register เก็บสถานะโปรแกรม PC) เป็นข้อจริงที่ฉบับเก่าตกหล่น
6. ข้อ 18 จริงถาม "Interrupt ที่มีความสำคัญสูงลำดับ 2" (คำตอบ TF0) ไม่ได้ถามวิธีตั้ง PT0
7. ข้อ "วงจร H-Bridge L293D ต่อ IN1/IN2 กับ P1.0/P1.1" ในฉบับเก่า**ไม่มีอยู่ในข้อสอบ** — ข้อ 19 และ 20 ถามเพียงวิธีปรับความเร็ว และวิธีกลับทิศทางมอเตอร์กระแสตรง
8. Square Wave 1 kHz ไม่ใช่ข้อสอบแยก เป็นตัวอย่างเสริมที่ผู้จดเขียนต่อท้ายข้อ 4 (ทำเครื่องหมาย "Ex")
9. ข้อ 21 ใช้ฮาร์ดแวร์ตาม Lab 5 "Traffic 1": ปุ่ม P2.0 อ่านด้วย `JB P2.0, GoState` (กด = 1) และ Go State มีทางวนกลับตัวเองเมื่อกดปุ่มซ้ำ

---

## 2. โจทย์ 21 ข้อ (ถ้อยคำตามกระดาษพิมพ์)

### ตอนที่ 1 — Timers & Counters (ข้อ 1–4) · สมุดหน้า 1

1. **Timer กับ Counter แตกต่างกันอย่างไร**
   - ใจความคำตอบ: Timer นับสัญญาณนาฬิกาภายใน (Fosc / 12) ส่วน Counter นับสัญญาณนาฬิกาภายนอกที่ขา T0 (P3.4) หรือ T1 (P3.5) เลือกด้วยบิต C/T ใน TMOD — Lecture 5 หน้า 5, 11
2. **Timer ใน 8051 มีกี่บิตและใช้รีจิสเตอร์ในการนับ**
   - ใจความคำตอบ: มี 2 ตัว (T0, T1) ตัวละ 16 บิต นับขึ้น (up counter) แยกเป็นรีจิสเตอร์ 8 บิต TH0/TL0 และ TH1/TL1 — Lecture 5 หน้า 3
3. **Time Overflow Interrupt จะทำงานเมื่อไร**
   - ใจความคำตอบ: เมื่อค่านับ roll over จาก FFFFH กลับเป็น 0000H ฮาร์ดแวร์เซต TF0/TF1 = 1 — Lecture 5 หน้า 4, 6, 9
4. **จงเขียนวิธีคำนวณในการตั้ง Timer นับ 100 µsec กรณี 8051 ใช้ความถี่ 12 MHz**
   - `1 Machine Cycle = 12 / 12 MHz = 1 µs` → `N = 100 µs / 1 µs = 100 = 64H`
   - `Count = FFFFH − 64H + 1 = FF9CH` (ตรวจ: `65536 − 100 = 65436 = FF9CH`) → `TH0 = FFH`, `TL0 = 9CH` — สูตรจาก Lecture 5 หน้า 4
   - ตัวอย่างเสริมในสมุด (Ex): Square Wave 1 kHz → High = Low = 0.5 ms = 500 µs → `N = 500 = 1F4H` → `Count = FFFFH − 1F4H + 1 = FE0CH` → `TH0 = FEH`, `TL0 = 0CH` — ตรงกับ Lecture 5 หน้า 21

### ตอนที่ 2 — บิตควบคุม โหมด และ Flowchart (ข้อ 5–9) · สมุดหน้า 2

5. **TR ย่อมาจาก**
   - ใจความคำตอบ: Timer Run Control Bit (TR0 = TCON.4, TR1 = TCON.6) — 1 = เริ่มนับ, 0 = หยุด (หมายเหตุ: TF = Timer Overflow Flag) — Lecture 5 หน้า 9
6. **Negative Edge trigger เป็นอย่างไร**
   - ใจความคำตอบ: การกระตุ้นเมื่อสัญญาณเปลี่ยนจากระดับสูง (1) ไประดับต่ำ (0) ใช้กับ INT0/INT1 เมื่อ IT0/IT1 = 1 (ถ้า IT = 0 เป็น low level trigger) — Lecture 5 หน้า 10
7. **M1 and M0 ใช้ทำอะไร**
   - ใจความคำตอบ: บิตเลือกโหมด Timer ใน TMOD: 00 = Mode 0 (13 บิต), 01 = Mode 1 (16 บิต), 10 = Mode 2 (8 บิต auto-reload), 11 = Mode 3 (แยก 8 บิต 2 ตัว) — Lecture 5 หน้า 11, 15–19
8. **ทำอย่างไรตั้งค่าให้ 8051 เป็น Counter สัญญาณที่ขา T0**
   - ใจความคำตอบ: เซตบิต C/T ของ Timer 0 (TMOD.2) = 1 เช่น `MOV TMOD, #05H` (Counter, Mode 1) แล้ว `SETB TR0` — Lecture 5 หน้า 11
9. **จงเขียน Flowchart ของโปรแกรมสำหรับการตั้งหน่วงเวลา (Delay) 10 µsec**
   - `N = 10 = 0AH` → `Count = FFFFH − 0AH + 1 = FFF6H` → `TH0 = FFH`, `TL0 = F6H`
   - ลำดับ: Start → TMOD = 01H → โหลด TH0, TL0 → TR0 = 1 → รอจน TF0 = 1 → Clear TF0 → TR0 = 0 → End — ตรงกับซับรูทีน `delay` ใน Lab 5 (Lecture State Machine หน้า 5)

### ตอนที่ 3 — Serial และ Interrupts (ข้อ 10–16) · สมุดหน้า 3

10. **รีจิสเตอร์ที่ใช้ในการรับส่งข้อมูลสำหรับการสื่อสารผ่าน TxD และ RxD**
    - ใจความคำตอบ: SCON (98H) ตั้งโหมดและควบคุมการรับส่ง, SBUF (99H) เก็บข้อมูล 8 บิตที่ส่ง/รับ — Lecture 6 หน้า 2–6, Lecture 3 หน้า 12
11. **การส่งข้อมูลแบบ Shift Register แตกต่างจาก 8 bit UART อย่างไร**
    - ใจความคำตอบ: Mode 0 Shift Register ส่งเฉพาะข้อมูล 8 บิต ไม่มี start/stop bit, baud คงที่ Fosc/12 ส่วน Mode 1 8-bit UART มี start bit 0 + 8 data bits + stop bit 1, baud ปรับได้ — Lecture 6 หน้า 4–5
12. **การส่งข้อมูลแบบ 9 bit UART แตกต่างจาก 8 bit UART อย่างไร**
    - ใจความคำตอบ: Mode 2/3 เพิ่มบิตที่ 9 (parity ที่โปรแกรมเมอร์กำหนดผ่าน TB8, รับเข้าที่ RB8) ระหว่าง data กับ stop bit — Lecture 6 หน้า 5–6
13. **8051 มี 5 Interrupt ได้แก่**
    - ใจความคำตอบ: INT0, TF0, INT1, TF1, Serial (RI หรือ TI) — Lecture 6 หน้า 8–9
14. **8051 มี Interrupt กี่ประเภท**
    - ใจความคำตอบ: 3 ประเภท: External hardware (INT0, INT1), Timer overflow internal (TF0, TF1), Serial communication internal (RI/TI) — Lecture 6 หน้า 8
15. **8051 ใช้ Register อะไรในการเก็บสถานะของโปรแกรม (PC)**
    - ใจความคำตอบ: Program Counter (PC) 16 บิต เก็บแอดเดรสคำสั่งถัดไป เมื่อเกิด interrupt จะ PUSH PC และ RETI จะ POP PC — Lecture 1, Lecture 6 หน้า 9
16. **Vector Address คืออะไร**
    - ใจความคำตอบ: แอดเดรสคงที่ในหน่วยความจำโปรแกรมที่ CPU กระโดดไปเริ่ม ISR ของแต่ละ interrupt: 0003H, 000BH, 0013H, 001BH, 0023H (Reset 0000H) — Lecture 6 หน้า 9, 13

### ตอนที่ 4 — Priority, Motors & FSM (ข้อ 17–21) · สมุดหน้า 4

17. **IE Register ย่อมาจาก**
    - ใจความคำตอบ: Interrupt Enable Register (A8H): EA, ES, ET1, EX1, ET0, EX0 (หมายเหตุ: IP = Interrupt Priority Register, B8H) — Lecture 6 หน้า 10–11
18. **Interrupt ที่มีความสำคัญสูงลำดับ 2**
    - ใจความคำตอบ: TF0 (Timer 0 Overflow, 000BH) — ลำดับ INT0 = 1, TF0 = 2, INT1 = 3, TF1 = 4, RI/TI = 5 — Lecture 6 หน้า 9
19. **การเพิ่มลดความเร็วมอเตอร์กระแสตรงด้วย 8051 ทำได้โดยใช้วิธีการอะไร**
    - ใจความคำตอบ: PWM (Pulse Width Modulation) ปรับ duty cycle ของพัลส์แอมพลิจูดคงที่ พัลส์กว้างขึ้น = กำลังเฉลี่ยมากขึ้น = เร็วขึ้น — Mazidi บทที่ 16.1
20. **การเปลี่ยนทิศทางการหมุนของมอเตอร์กระแสตรงด้วย 8051 ทำได้โดยใช้วิธีการอะไร**
    - ใจความคำตอบ: กลับขั้วแรงดันที่จ่ายให้มอเตอร์ผ่านวงจร H-Bridge (SW1+SW4 = ทิศหนึ่ง, SW2+SW3 = ทิศตรงข้าม) — Mazidi บทที่ 16.1, Figure 16-2 ถึง 16-5, Table 16-2
21. **จงเขียนโปรแกรมสำหรับ Ready State โดยกำหนดให้ State chart และ Hardware Diagram [5]**
    - รูปประกอบบนกระดาษ: State chart (เริ่ม → Ready State; Ready --push--> Go State; Go --timer--> Ready; Go --push--> Go), Ready State = สัญญาณคนสีแดง (หยุด), Go State = สัญญาณคนสีเขียว (เดิน), 8051: P1.1 → คนสีแดง, P1.0 → คนสีเขียว, P2.0 → ปุ่มกด
    - ตรงกับ Lab 5 "Traffic 1" ในเอกสาร [Lecture Programming for a State Machine](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture-programming-for-a-state-machine-markdown/lecture_progroming_for_a_state_machine_complete.md) หน้า 2–5

```assembly
ReadyState:
        MOV   R0, #01H        ; R0 = state 1 (Ready)
        SETB  P1.1            ; คนสีแดง ON
        CLR   P1.0            ; คนสีเขียว OFF
        JB    P2.0, GoState   ; กดปุ่ม (P2.0 = 1) -> Go
        SJMP  ReadyState
GoState:
        MOV   R0, #02H        ; R0 = state 2 (Go)
        CLR   P1.1
        SETB  P1.0
        MOV   R1, #10         ; 10 x 10 us = 100 us
Timer:
        ACALL Delay
        DJNZ  R1, Timer
        JB    P2.0, GoState   ; กดซ้ำ -> เริ่มนับ Go ใหม่
        SJMP  ReadyState      ; หมดเวลา -> Ready
Delay:
        MOV   TMOD, #01H      ; Timer 0 Mode 1
        MOV   TH0, #0FFH
        MOV   TL0, #0F6H      ; FFF6H = 10 counts = 10 us
        MOV   TCON, #10H      ; TR0 = 1
Wait:   JNB   TCON.5, Wait    ; รอ TF0
        MOV   TCON, #00H      ; หยุด Timer และล้าง TF0
        RET
```

---

## 3. เฉลยฉบับเต็ม

เฉลยละเอียด (การ์ด 3 ชั้น, Flowchart, State chart, Hardware Diagram และโค้ด) อยู่ที่ [real-exam/2025/index.html](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/final/real-exam/2025/index.html)
