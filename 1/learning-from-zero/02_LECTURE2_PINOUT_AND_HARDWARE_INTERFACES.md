# 📘 Module 02: เจาะลึกพินฮาร์ดแวร์และการเชื่อมต่อพอร์ต (Lecture 2 & 2V2 Breakdown)

> **อ้างอิงเอกสารประกอบการสอน:** `Lecture 2.pdf` (11 หน้า) และ `Lecture 2V2.pptx` (15 หน้า)  
> **ไฟล์สไลด์ในระบบ:** [lecture_2_complete.md](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture2-markdown/lecture_2_complete.md) และ [lecture_2v2_complete.md](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture2v2-pptx-markdown/lecture_2v2_complete.md)  
> **ภาพประกอบฮาร์ดแวร์:** ฝังรูปภาพจริงจากสไลด์ไว้ในเอกสารเรียบร้อยแล้ว

---

## 1. วิเคราะห์สาระสำคัญของ Lecture 2 & 2V2: อาจารย์กำลังสอนอะไร?

หลังจากดูบล็อกเชิงตรรกะใน Lecture 1 อาจารย์พาเรามาดู **"ตัวถังฮาร์ดแวร์ไอซีจริง (Physical IC Package)"** ของไมโครคอนโทรลเลอร์ 8051:
- **ตัวถังแบบ 40-Pin DIP (Dual In-line Package):** ไอซีสี่เหลี่ยมผืนผ้าที่มีพินขาโลหะยื่นออกมา 2 แถวขนานกัน แถวละ 20 พิน (นับวนทวนเข็มนาฬิกาตั้งแต่ Pin 1 ถึง Pin 40)
- **ทำไมวิศวกรต้องเข้าใจหน้าที่ของทุกพิน?** เพราะไมโครคอนโทรลเลอร์มีจำนวนพินจำกัด (32 พินสำหรับ I/O จาก 40 พิน) จึงต้องมีการ **ซ้อนทับฟังก์ชัน (Port Pin Multiplexing)** เพื่อให้พิน 1 ขาสามารถทำหน้าที่ได้หลายอย่าง เช่น เป็น General Purpose I/O ก็ได้ หรือเปลี่ยนเป็นพินรับสัญญาณ Interrupt ภายนอกก็ได้!

![8051 Feature Summary](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture2-markdown/images/fig_002_media_1.jpeg)
*รูปที่ 2.1: คุณสมบัติทางฮาร์ดแวร์หลักของไมโครคอนโทรลเลอร์ 8051 จากสไลด์ Lecture 2 หน้า 2*

---

## 2. แผนผังพินฮาร์ดแวร์ 40-Pin DIP 8051 (Complete Pinout Diagram)

![8051 40-Pin DIP Pinout Diagram](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture2-markdown/images/fig_003_media_1.jpeg)
*รูปที่ 2.2: ผังพินไอซี 40-Pin DIP 8051 จากสไลด์ Lecture 2 หน้า 3 (แสดงพิน P3.2/\INT0 และ P3.3/\INT1)*

```
                     +---  ---+
        (P1.0) Pin 1 |1    40| Pin 40 (VCC: +5V Power Supply)
        (P1.1) Pin 2 |2    39| Pin 39 (P0.0 / AD0)
        (P1.2) Pin 3 |3    38| Pin 38 (P0.1 / AD1)
        (P1.3) Pin 4 |4    37| Pin 37 (P0.2 / AD2)
        (P1.4) Pin 5 |5    36| Pin 36 (P0.3 / AD3)
        (P1.5) Pin 6 |6    35| Pin 35 (P0.4 / AD4)
        (P1.6) Pin 7 |7    34| Pin 34 (P0.5 / AD5)
        (P1.7) Pin 8 |8    33| Pin 33 (P0.6 / AD6)
        (RST)  Pin 9 |9    32| Pin 32 (P0.7 / AD7)
  (RxD) (P3.0) Pin 10|10   31| Pin 31 (\EA / VPP)
  (TxD) (P3.1) Pin 11|11   30| Pin 30 (ALE / \PROG)
 (\INT0)(P3.2) Pin 12|12   29| Pin 29 (\PSEN)
 (\INT1)(P3.3) Pin 13|13   28| Pin 28 (P2.7 / A15)
   (T0) (P3.4) Pin 14|14   27| Pin 27 (P2.6 / A14)
   (T1) (P3.5) Pin 15|15   26| Pin 26 (P2.5 / A13)
  (\WR) (P3.6) Pin 16|16   25| Pin 25 (P2.4 / A12)
  (\RD) (P3.7) Pin 17|17   24| Pin 24 (P2.3 / A11)
      (XTAL2)  Pin 18|18   23| Pin 23 (P2.2 / A10)
      (XTAL1)  Pin 19|19   22| Pin 22 (P2.1 / A9)
        (GND)  Pin 20|20   21| Pin 21 (P2.0 / A8)
                     +--------+
```

---

## 3. จำแนกกลุ่มพินฮาร์ดแวร์ทั้ง 40 พิน (Exhaustive Pin Group Classification)

### 3.1 กลุ่มพินจ่ายกำลังไฟฟ้าและคริสตัลนาฬิกา (Power & Oscillator Pins)
1. **Pin 40 (VCC):** จ่ายแรงดันไฟเลี้ยงกระแสตรง $+5\text{V DC}$
2. **Pin 20 (GND):** ต่อลงกราวด์ $0\text{V}$
3. **Pin 19 (XTAL1) & Pin 18 (XTAL2):** ขาต่อเข้ากับคริสตัลควอตซ์ (Quartz Crystal) และตัวเก็บประจุ เพื่อสร้างสัญญาณนาฬิกาฐานความถี่ 12 MHz ให้ระบบ

### 3.2 กลุ่มพินสัญญาณควบคุมระบบ (System Control Pins)
1. **Pin 9 (RST - Reset):** พินรีเซ็ตฮาร์ดแวร์ ทำงานแบบ **Active-HIGH**  
   - เมื่อจ่ายแรงดัน HIGH เป็นเวลาอย่างน้อย 2 Machine Cycles (24 Clock Periods) จะรีเซ็ต 8051 กลับไปจุดเริ่มต้น (`PC = 0000H`, `SP = 07H`, เคลียร์พอร์ตเป็น `FFH`)
2. **Pin 31 (\EA / VPP - External Access):** พินเลือกหน่วยความจำโค้ด ทำงานแบบ **Active-LOW**  
   - `\EA = 1` (+5V): บังคับให้ CPU อ่านโค้ดจาก Internal ROM 4KB ก่อน (`0000H - 0FFFH`)
   - `\EA = 0` (0V): บังคับให้ CPU ข้าม Internal ROM และอ่านโค้ดจาก External ROM ทั้งหมด (`0000H - FFFFH`)
3. **Pin 30 (ALE / \PROG - Address Latch Enable):**  
   - ส่งลูกคลื่นพัลส์ออกมาแยกสาย Address บิตต่ำ ($A_0-A_7$)ออกจาก Data ($D_0-D_7$) ที่ซ้อนทับกันอยู่บน Port 0
4. **Pin 29 (\PSEN - Program Store Enable):** พินอ่านหน่วยความจำโปรแกรมภายนอก ทำงานแบบ **Active-LOW**  
   - ส่งสัญญาณ 0V ออกไปเปิด Tri-state buffer ของชิป External ROM เมื่อ CPU ต้องการ Fetch คำสั่ง

---

## 4. เจาะลึกโครงสร้างพอร์ต I/O ทั้ง 4 พอร์ต (P0, P1, P2, P3)

8051 มีพิน I/O รวม 32 พิน แบ่งออกเป็น 4 พอร์ต พอร์ตละ 8 บิต:

### 4.1 Port 0 (Pin 32 - Pin 39: P0.0 - P0.7)
- **การทำงานปกติ:** เป็น General Purpose I/O แบบ **Open-Drain** (ไม่มี Internal Pull-up resistor ต้องต่อตัวต้านทาน Pull-up 10k$\Omega$ ภายนอกเสมอ!)
- **ฟังก์ชันพินควบ (Multiplexed Function):** ทำหน้าที่เป็น **Address/Data Bus บิตต่ำ ($AD_0 - AD_7$)** เมื่อเชื่อมต่อความจำภายนอก  
  *หลักการส่งสัญญาณ:* จังหวะแรกส่ง Address $A_0-A_7$ ออกมา แล้วใช้สัญญาณ ALE สั่งไอซีสลัก (Latch 74HC573) จำค่าไว้ จากนั้นพินชุดเดิมจะเปลี่ยนหน้าที่เป็น Data Bus $D_0-D_7$ ทันที!

### 4.2 Port 1 (Pin 1 - Pin 8: P1.0 - P1.7)
- **การทำงาน:** เป็น General Purpose I/O พอร์ตเดียวที่มี **Internal Pull-up Resistors** ฝังอยู่ภายใน ใช้งานง่ายที่สุด ไม่ทำหน้าที่บัสความจำภายนอก

### 4.3 Port 2 (Pin 21 - Pin 28: P2.0 - P2.7)
- **การทำงานปกติ:** เป็น General Purpose I/O พร้อม Internal Pull-up
- **ฟังก์ชันพินควบ:** ทำหน้าที่เป็น **Address Bus บิตสูง ($A_8 - A_{15}$)** เมื่อเชื่อมต่อหน่วยความจำภายนอก 64KB

### 4.4 Port 3 (Pin 10 - Pin 17: P3.0 - P3.7) **[หัวใจหลักของ Interrupt System]**
- **การทำงานปกติ:** เป็น General Purpose I/O พร้อม Internal Pull-up
- **ฟังก์ชันพิเศษเฉพาะพิน (Alternate Special Functions):** ทุกพินของ Port 3 มีหน้าที่ฮาร์ดแวร์พิเศษเฉพาะตัว!

```
+-------+---------------+---------------------------------------------------------+
|  พิน  | ฟังก์ชันพิเศษ |                     หน้าที่ทางฮาร์ดแวร์                   |
+-------+---------------+---------------------------------------------------------+
| P3.0  | RxD           | Serial Input Port (รับข้อมูลอนุกรม UART)                  |
| P3.1  | TxD           | Serial Output Port (ส่งข้อมูลอนุกรม UART)                 |
| P3.2  | \INT0         | External Interrupt 0 (ขาขัดจังหวะภายนอก 0 - Active-LOW) |
| P3.3  | \INT1         | External Interrupt 1 (ขาขัดจังหวะภายนอก 1 - Active-LOW) |
| P3.4  | T0            | Timer 0 External Input (ขาขัดนับสวิตช์ภายนอก ไทม์เมอร์ 0)|
| P3.5  | T1            | Timer 1 External Input (ขาขัดนับสวิตช์ภายนอก ไทม์เมอร์ 1)|
| P3.6  | \WR           | External Data Memory Write Strobe (สัญญาณเขียน RAM)     |
| P3.7  | \RD           | External Data Memory Read Strobe (สัญญาณอ่าน RAM)       |
+-------+---------------+---------------------------------------------------------+
```

---

## 5. เจาะลึกพินขัดจังหวะภายนอก: Pin 12 (`P3.2 / \INT0`) และ Pin 13 (`P3.3 / \INT1`)

นี่คือส่วนสำคัญสำหรับ **Topic 41: Interrupt Mechanism**!

```
                 8051 Microcontroller
               +----------------------+
               |                      |
[Switch/Sensor]|---> Pin 12 (P3.2/\INT0) --> [Interrupt Detect Logic]
 (External Event) |                   |          |
               |---> Pin 13 (P3.3/\INT1) --------+
               |                      |          v
               +----------------------+   Sets IE0 / IE1 Flags
```

### 5.1 สัญญาณควบคุมการขัดจังหวะภายนอกทำงานอย่างไร?
1. **พิน `P3.2 (\INT0)` (Pin 12):** รับสัญญาณขัดจังหวะจากสวิตช์หรือเซนเซอร์ภายนอกช่องที่ 0  
2. **พิน `P3.3 (\INT1)` (Pin 13):** รับสัญญาณขัดจังหวะจากสวิตช์หรือเซนเซอร์ภายนอกช่องที่ 1  

### 5.2 รูปแบบการจุดชนวนสัญญาณ (Triggering Modes)
ขาขัดจังหวะทั้งสองนี้ สามารถตั้งค่ารูปแบบการรับสัญญาณขัดจังหวะได้ 2 รูปแบบผ่านบิต `IT0` และ `IT1` ในรีจิสเตอร์ `TCON`:
1. **Low-Level Triggered (การรับด้วยระดับแรงดันต่ำ):**  
   - เมื่อแรงดันที่พินถูกดึงลงเป็น **0V (LOW)** ค้างไว้ ฮาร์ดแวร์จะส่งสัญญาณแจ้ง CPU ขัดจังหวะทันที
2. **Falling-Edge Triggered (การรับด้วยขอบขาลงของสัญญาณ):**  
   - ฮาร์ดแวร์จะตรวจจับจังหวะการเปลี่ยนระดับแรงดัน **จาก 5V (HIGH) ลบลงมาเป็น 0V (LOW)** (การกดปุ่ม) แล้วลักช์เก็บสภาวะลงแฟล็กทันที

---

## 💡 สรุปความเชื่อมโยงของโมดูล 02

ในโมดูลนี้ เราเห็นภาพพินฮาร์ดแวร์จริงของ 8051 โดยเฉพาะ **Pin 12 (`P3.2/\INT0`) และ Pin 13 (`P3.3/\INT1`)** ซึ่งเป็นประตูทางเข้าของสัญญาณขัดจังหวะจากโลกภายนอก เมื่อสัญญาณไฟตกลงมาที่พินเหล่านี้ วงจรภายในจะไปอัปเดตสภาวะในรีจิสเตอร์ SFRs ซึ่งเราจะเจาะลึกในโมดูล 03 ถัดไป!
