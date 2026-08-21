# รวมข้อสอบและแนวข้อสอบกลางภาค วิชา Embedded Systems (MCS-51 / 8051)

โฟลเดอร์นี้รวบรวมและวิเคราะห์ข้อสอบจริงและแนวข้อสอบกลางภาค วิชา **ระบบสมองกลฝังตัว (Embedded Systems)** โดยถอดโจทย์ รูปภาพ ไดอะแกรมวงจร และคำสั่งภาษาแอสเซมบลี พร้อมเฉลยและวิธีทำอย่างละเอียดทุกขั้นตอน

---

## โครงสร้างโฟลเดอร์และสารบัญเอกสาร

```
midterm/
├── 01-midterm-recalled-questions/
│   └── midterm-recalled-questions-analysis.md    # ถอดแนวข้อสอบความจำ 26 ข้อ (ทฤษฎี & ชุดคำสั่ง)
│
├── 02-midterm-real-exam-2561/
│   ├── images/                                   # คลังรูปภาพและไดอะแกรมตัดเฉพาะจุดสำคัญ
│   │   ├── q1-led-logic-monitor-circuit.png
│   │   ├── q2-memory-map-diagram.png
│   │   ├── q2-subquestions.png
│   │   ├── q3-q4-q5-questions.png
│   │   ├── q6-cross-assembler-table.png
│   │   └── page-scans/                           # รูปสแกนเต็มหน้า 7 - 11
│   │       ├── page-07.png
│   │       ├── page-08.png
│   │       ├── page-09.png
│   │       ├── page-10.png
│   │       └── page-11.png
│   └── midterm-real-exam-2561-complete-analysis.md # ถอดข้อสอบจริงปี 2561 ฉบับสมบูรณ์ (ข้อ 1-6)
│
├── Mid (1).pdf                                   # ไฟล์ PDF ต้นฉบับ (สรุปเลกเชอร์ + ภาพถ่ายข้อสอบ)
├── midterm.docx.pdf                              # ไฟล์ PDF แนวข้อสอบความจำต้นฉบับ
└── README.md                                     # ดัชนีนำทาง (หน้านี้)
```

---

## 1. [01-midterm-recalled-questions-analysis.md](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/midterm/01-midterm-recalled-questions/midterm-recalled-questions-analysis.md)
- **แหล่งที่มา:** [midterm.docx.pdf](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/midterm/midterm.docx.pdf)
- **เนื้อหาหลัก:**
  - **ส่วนที่ 1 (ทฤษฎี บทที่ 1-4):** นิยาม Embedded Systems, MPU vs MCU, สถาปัตยกรรม Von Neumann vs Harvard, โครงสร้างหน่วยความจำ 8051 Internal ROM/RAM, ขาพอร์ต P0-P3, Register B, PSW Flags, การทำงานของ Assembler
  - **ส่วนที่ 2 (วิเคราะห์ชุดคำสั่ง Assembly 8051):** `ORG 1000H`, `MOV A, R2`, `MOV A, 35H`, `MOV A, @R1`, `ADD A, #50H`, `SUBB A, R1`, `INC 25H`, `ANL C, P0.2`, `DJNZ 25H, Label`, `SJMP Label`

---

## 2. [02-midterm-real-exam-2561-complete-analysis.md](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/midterm/02-midterm-real-exam-2561/midterm-real-exam-2561-complete-analysis.md)
- **แหล่งที่มา:** [Mid (1).pdf](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/midterm/Mid%20(1).pdf) (ภาพถ่ายข้อสอบจริง หน้า 7 – 11)
- **ข้อสอบจริง ภาควิชาวิศวกรรมไฟฟ้าและคอมพิวเตอร์ 28 ก.ย. 2561:**
  - **ข้อ 1 (8 คะแนน):** เขียนโปรแกรม Assembly ควบคุม LED 0 และ LED 1 บน Logic Monitor กระพริบสลับกันตัวละ 5 ครั้ง วนลูปไม่รู้จบ (พร้อมโค้ดและ Delay Routine)
  - **ข้อ 2 (4 คะแนน):** การเข้าถึง Memory Map 8052 ใน 3 โซน (Internal RAM 80H, SFR 80H, External RAM 0080H) พร้อมวิเคราะห์และแก้จุดผิดในลายมือรุ่นพี่
  - **ข้อ 3 (4 คะแนน):** คำนวณคำสั่ง `RLC A`, `ANL A, #33H`, `SWAP A`, `MUL AB` เมื่อกำหนด $A = \text{F5H}, B = 20\text{H}, CY = 0$
  - **ข้อ 4 (2 คะแนน):** คำนวณ Machine Cycle จาก Crystal 18.4321 MHz ($T_{\text{machine}} \approx 0.651 \ \mu\text{s}$)
  - **ข้อ 5 (10 คะแนน):** เปรียบเทียบ Microprocessor vs Microcontroller เชิงลึก 8 มิติ
  - **ข้อ 6 (10 คะแนน):** วิเคราะห์ผลลัพธ์จาก 8051 Cross-Assembler ตารางที่ 1, คำนวณขนาดโปรแกรม (8 ไบต์), หาค่าช่องว่าง `(*)` = `80H`, หาค่า Relative Offset `(**)` = `FAH`, และสร้างไฟล์ Intel HEX (`TEST.HEX`) พร้อมแสดงวิธีคำนวณ Checksum ละเอียด

---

## แหล่งข้อมูลและเลกเชอร์อ้างอิง
- [โฟลเดอร์เอกสารประกอบการสอน (lecture)](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture)
- [โฟลเดอร์คู่มือการเรียนรู้ฉบับสมบูรณ์ (learning-from-zero-1)](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/learning-from-zero-1)
