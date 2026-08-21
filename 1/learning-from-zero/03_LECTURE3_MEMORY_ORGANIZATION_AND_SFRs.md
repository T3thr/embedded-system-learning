# 📘 Module 03: เจาะลึกโครงสร้างหน่วยความจำและรีจิสเตอร์ SFRs (Lecture 3 Breakdown)

> **อ้างอิงเอกสารประกอบการสอน:** `Lecture 3.pdf` (13 หน้า)  
> **ไฟล์สไลด์ในระบบ:** [lecture_3_complete.md](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture3-markdown/lecture_3_complete.md)  
> **ภาพประกอบฮาร์ดแวร์:** ฝังรูปภาพจริงจากสไลด์ไว้ในเอกสารเรียบร้อยแล้ว

---

## 1. วิเคราะห์สาระสำคัญของ Lecture 3: อาจารย์กำลังสอนอะไร?

ใน Lecture 3 อาจารย์เน้นสอนเรื่อง **"โครงสร้างผังหน่วยความจำ (Memory Organization)"** และ **"กลุ่มรีจิสเตอร์หน้าที่พิเศษ (Special Function Registers - SFRs)"**:
1. **ทำไมต้องแยก ROM กับ RAM?** เพราะไมโครคอนโทรลเลอร์ฝังตัวต้องเก็บโค้ดโปรแกรมไว้ใน ROM (ไม่สูญหายเมื่อดับไฟ - Non-volatile) และใช้ RAM สำหรับเก็บตัวแปรที่เปลี่ยนแปลงขณะรันไทม์ (สูญหายเมื่อดับไฟ - Volatile)
2. **SFRs คืออะไร?** คือศูนย์บัญชาการฮาร์ดแวร์ภายใน 8051 เช่น สั่งเปิด-ปิดระบบ Interrupt, ตั้งค่าไทม์เมอร์, สื่อสารซีเรียล ทั้งหมดทำผ่านการเขียนค่าลงในแอดเดรส SFRs!

![8051 Memory Structure Diagram](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture3-markdown/images/fig_002_media_1.jpeg)
*รูปที่ 3.1: แผนผังประเภทย่านหน่วยความจำ 8051 (Internal ROM 4KB, Internal RAM 128B, External ROM/RAM)*

---

## 2. โครงสร้างหน่วยความจำโปรแกรม (Program Memory / ROM Organization)

8051 มีบัสแอดเดรสขนาด 16 บิต สามารถอ้างอิงตำแหน่ง ROM ได้สูงสุด $2^{16} = 64 \text{ KB}$ (`0000H - FFFFH`):

![ROM Memory Organization Diagram](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture3-markdown/images/fig_004_media_1.jpeg)
*รูปที่ 3.2: แผนที่แอดเดรส ROM เมื่อตั้งพิน \EA = 1 (อ่าน Internal 4KB ก่อน) และ \EA = 0 (อ่าน External 64KB)*

```
       [ EA = 1: ใช้งาน Internal ROM ]           [ EA = 0: ใช้งาน External ROM ทั้งหมด ]
       +-----------------------------+          +-----------------------------+
FFFFH  | External ROM (60KB)         |   FFFFH  | External ROM (64KB)         |
       | Address: 1000H - FFFFH      |          | Address: 0000H - FFFFH      |
1000H  +-----------------------------+          |                             |
0FFFH  | Internal ROM (4KB)          |          |                             |
0000H  | Address: 0000H - 0FFFH      |   0000H  |                             |
       +-----------------------------+          +-----------------------------+
```

### การตั้งค่าพิน `\EA` (External Access)
- **เมื่อ `\EA = 1` (ต่อไฟ +5V):** CPU จะรันโค้ดจาก **Internal ROM (4KB)** ที่ตำแหน่ง `0000H - 0FFFH` ก่อน หากโปรแกรมยาวเกิน 4KB CPU จะสลับไปอ่าน **External ROM** ที่ตำแหน่ง `1000H - FFFFH` โดยอัตโนมัติ
- **เมื่อ `\EA = 0` (ต่อลง Ground 0V):** CPU จะข้าม Internal ROM และอ่านโค้ดจาก **External ROM (64KB)** ตั้งแต่ตำแหน่ง `0000H - FFFFH` ทั้งหมด

---

## 3. โครงสร้างหน่วยความจำข้อมูลภายใน (Internal Data RAM Organization)

Internal RAM ภายใน 8051 มีขนาด 128 Bytes (แอดเดรส `00H` ถึง `7FH`) แบ่งออกเป็น 3 ย่านหลักที่มีหน้าที่ต่างกันสิ้นเชิง:

![Internal RAM Structure Diagram](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture3-markdown/images/fig_005_media_1.jpeg)
*รูปที่ 3.3: โครงสร้างผัง RAM ภายใน 128 ไบต์ (Register Banks, Bit-Addressable RAM, Scratchpad & Stack)*

```
Address
+-------+-------------------------------------------------------+
| 7FH   | Scratchpad RAM (80 Bytes: 30H - 7FH)                  |
| 30H   | (ย่าน RAM อรรถประโยชน์ทั่วไป สำหรับเก็บตัวแปรและ Stack)    |
+-------+-------------------------------------------------------+
| 2FH   | Bit-Addressable RAM (16 Bytes: 20H - 2FH)             |
| 20H   | (สามารถเข้าถึงรายบิตได้ 128 บิต: Bit 00H ถึง 7FH)       |
+-------+-------------------------------------------------------+
| 1FH   | Register Bank 3 (R0 - R7) [Address 18H - 1FH]         |
| 17H   | Register Bank 2 (R0 - R7) [Address 10H - 17H]         |
| 0FH   | Register Bank 1 (R0 - R7) [Address 08H - 0FH]         |
| 07H   | Register Bank 0 (R0 - R7) [Address 00H - 07H] *Default|
+-------+-------------------------------------------------------+
```

### 3.1 Register Banks (32 Bytes: `00H - 1FH`)
- แบ่งเป็น 4 แบงก์ (Bank 0, 1, 2, 3) แต่ละแบงก์มีรีจิสเตอร์อเนกประสงค์ 8 ตัวคือ **R0 ถึง R7**
- เมื่อเปิดเครื่อง ระบบจะเลือกใช้ **Bank 0 (`00H - 07H`)** เป็นค่าเริ่มต้น
- สลับแบงก์ได้โดยตั้งค่าบิต `RS1`, `RS0` ในรีจิสเตอร์ **PSW (Program Status Word)**  
  *ทำไมมี 4 แบงก์?* ช่วยให้สลับบริบท (Context Switch) ขณะเกิด Interrupt ได้รวดเร็ว โดยไม่ต้อง PUSH R0-R7 ลงสแต็ก แค่สั่งสลับแบงก์!

### 3.2 Bit-Addressable RAM (16 Bytes: `20H - 2FH`)
- สามารถอ้างอิงตำแหน่งเป็นรายบิต (Individual Bit Addressing) ได้รวม 128 บิต (บิตเลขที่ `00H` ถึง `7FH`)
- เหมาะสำหรับเก็บตัวแปรแฟล็กแบบ 1 บิต (Boolean Flags) เช่น `SETB 00H` หรือ `CLR 7FH`

### 3.3 Scratchpad RAM & Stack Area (80 Bytes: `30H - 7FH`)
- ย่าน RAM สำหรับเก็บข้อมูลตัวแปรอรรถประโยชน์ และเป็นย่านที่ใช้ทำ **Stack (สแต็ก)**
- หลังการ Reset ค่า Stack Pointer (`SP`) จะถูกตั้งไว้ที่ `07H` ดังนั้นเมื่อมีการ PUSH หรือเกิด Interrupt ข้อมูลสแต็กจะเริ่มเขียนที่แอดเดรส **`08H`** เป็นต้นไป

---

## 4. กลุ่มรีจิสเตอร์หน้าที่พิเศษ (Special Function Registers - SFRs)

SFRs คือรีจิสเตอร์ขนาด 8 บิต จำนวน 21 ตัว ที่ถูกจัดวางอยู่ในพื้นที่แอดเดรส **`80H` ถึง `FFH`**:

![SFR Address Map Diagram](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture3-markdown/images/fig_010_media_1.jpeg)
*รูปที่ 3.4: ผังตำแหน่ง Special Function Registers (SFRs) ในแอดเดรส 80H - FFH*

```
SFR Address Map (Selected Key SFRs):
+---------+-------------------+-----------------------------------------+
| Address | SFR Name          | Function Description                    |
+---------+-------------------+-----------------------------------------+
|   E0H   | ACC (A)           | Accumulator Register                    |
|   F0H   | B                 | B Register (ใช้สำหรับคูณ/หาร MUL/DIV)    |
|   D0H   | PSW               | Program Status Word (Flags)             |
|   81H   | SP                | Stack Pointer                           |
|   82/83H| DPL / DPH         | Data Pointer Low / High (DPTR 16-bit)   |
|   80H   | P0                | Port 0 Latch                            |
|   90H   | P1                | Port 1 Latch                            |
|   A0H   | P2                | Port 2 Latch                            |
|   B0H   | P3                | Port 3 Latch                            |
|   A8H   | IE                | Interrupt Enable Register *Bit-Addressable|
|   B8H   | IP                | Interrupt Priority Register *Bit-Address|
|   88H   | TCON              | Timer Control Register *Bit-Addressable |
|   89H   | TMOD              | Timer Mode Register                     |
|   98H   | SCON              | Serial Control Register                 |
+---------+-------------------+-----------------------------------------+
```

> **ข้อสังเกตฮาร์ดแวร์:** SFR ตัวใดที่มีแอดเดรสลงท้ายด้วย **`0H` หรือ `8H`** (เช่น `80H`, `88H`, `A8H`, `B8H`) จะเป็น **Bit-Addressable SFRs** สามารถสั่งงานรายบิตได้โดยตรง!

---

## 5. ถอดรหัสบิตรีจิสเตอร์ที่ควบคุมการขัดจังหวะ (Bit-Level Dissection for Interrupts)

นี่คือรีจิสเตอร์ 3 ตัวที่เป็นหัวใจของ **Topic 41: Interrupt Mechanism**!

### 5.1 รีจิสเตอร์ `IE` (Interrupt Enable Register - Address `A8H`, Bit-Addressable)
ใช้สำหรับเปิดหรือปิดสวิตช์ยอมรับการขัดจังหวะ:

```
Bit Map of IE (A8H):
+-------+-------+-------+-------+-------+-------+-------+-------+
| Bit 7 | Bit 6 | Bit 5 | Bit 4 | Bit 3 | Bit 2 | Bit 1 | Bit 0 |
|   EA  |   -   |   -   |   ES  |  ET1  |  EX1  |  ET0  |  EX0  |
+-------+-------+-------+-------+-------+-------+-------+-------+
```

```
+-------+----------+-------------------------------------------------------------------+
|  บิต  | ชื่อบิต  |                         หน้าที่และกลไก                            |
+-------+----------+-------------------------------------------------------------------+
| Bit 7 | EA       | Enable All (Global Interrupt Enable)                             |
|       |          | 1 = เปิดสวิตช์ยอมรับ Interrupt ทั้งหมดในระบบ                      |
|       |          | 0 = ปิดสวิตช์ยับยั้ง Interrupt ทั้งหมดทันที (Master Switch)        |
| Bit 6 | -        | Reserved (ไม่ใช้งาน)                                              |
| Bit 5 | -        | Reserved (ไม่ใช้งาน)                                              |
| Bit 4 | ES       | Enable Serial Port Interrupt (1 = เปิดรับ RI/TI)                  |
| Bit 3 | ET1      | Enable Timer 1 Overflow Interrupt (1 = เปิดรับ TF1)               |
| Bit 2 | EX1      | Enable External Interrupt 1 (1 = เปิดรับสัญญาณจากพิน \INT1 P3.3)   |
| Bit 1 | ET0      | Enable Timer 0 Overflow Interrupt (1 = เปิดรับ TF0)               |
| Bit 0 | EX0      | Enable External Interrupt 0 (1 = เปิดรับสัญญาณจากพิน \INT0 P3.2)   |
+-------+----------+-------------------------------------------------------------------+
```

> **กฎการเปิดใช้งาน Interrupt (AND Logic Gate):**  
> สัญญาณ Interrupt จะผ่านเข้าไปยัง CPU ได้ ก็ต่อเมื่อ **`EA = 1` AND `บิตประจำช่อง = 1`** เท่านั้น!  
> ตัวอย่าง: เปิดรับ External Interrupt 0 -> สั่ง `SETB EA` (หรือ `IE.7`) และ `SETB EX0` (หรือ `IE.0`)

---

### 5.2 รีจิสเตอร์ `IP` (Interrupt Priority Register - Address `B8H`, Bit-Addressable)
ใช้สำหรับจัดระดับความสำคัญ (Priority) ของการขัดจังหวะออกเป็น 2 ระดับ: **High Priority (1)** และ **Low Priority (0)**

```
Bit Map of IP (B8H):
+-------+-------+-------+-------+-------+-------+-------+-------+
| Bit 7 | Bit 6 | Bit 5 | Bit 4 | Bit 3 | Bit 2 | Bit 1 | Bit 0 |
|   -   |   -   |   -   |   PS  |  PT1  |  PX1  |  PT0  |  PX0  |
+-------+-------+-------+-------+-------+-------+-------+-------+
```

```
+-------+----------+-------------------------------------------------------------------+
|  บิต  | ชื่อบิต  |                         หน้าที่และกลไก                            |
+-------+----------+-------------------------------------------------------------------+
| Bit 4 | PS       | Priority Serial Port Interrupt (1 = High, 0 = Low)                |
| Bit 3 | PT1      | Priority Timer 1 Interrupt (1 = High, 0 = Low)                    |
| Bit 2 | PX1      | Priority External Interrupt 1 (1 = High, 0 = Low)                 |
| Bit 1 | PT0      | Priority Timer 0 Interrupt (1 = High, 0 = Low)                    |
| Bit 0 | PX0      | Priority External Interrupt 0 (1 = High, 0 = Low)                 |
+-------+----------+-------------------------------------------------------------------+
```

---

### 5.3 รีจิสเตอร์ `TCON` (Timer Control Register - Address `88H`, Bit-Addressable)
มี 4 บิตล่างที่ทำหน้าที่ควบคุมแฟล็กและรูปแบบของ External Interrupt 0 และ 1:

```
Bit Map of TCON (88H) - [Lower 4 Bits for External Interrupts]:
+-------+-------+-------+-------+-------+-------+-------+-------+
| Bit 7 | Bit 6 | Bit 5 | Bit 4 | Bit 3 | Bit 2 | Bit 1 | Bit 0 |
|  TF1  |  TR1  |  TF0  |  TR0  |  IE1  |  IT1  |  IE0  |  IT0  |
+-------+-------+-------+-------+-------+-------+-------+-------+
```

```
+-------+----------+-------------------------------------------------------------------+
|  บิต  | ชื่อบิต  |                         หน้าที่และกลไก                            |
+-------+----------+-------------------------------------------------------------------+
| Bit 3 | IE1      | External Interrupt 1 Edge Flag (ถูกตั้งเป็น 1 ฮาร์ดแวร์เมื่อเกิด INT1) |
| Bit 2 | IT1      | Interrupt 1 Type Control (1 = Falling-Edge, 0 = Low-Level)        |
| Bit 1 | IE0      | External Interrupt 0 Edge Flag (ถูกตั้งเป็น 1 ฮาร์ดแวร์เมื่อเกิด INT0) |
| Bit 0 | IT0      | Interrupt 0 Type Control (1 = Falling-Edge, 0 = Low-Level)        |
+-------+----------+-------------------------------------------------------------------+
```

---

## 💡 สรุปความเชื่อมโยงของโมดูล 03

ในโมดูลนี้ เราได้เห็นโครงสร้างความจำและผังบิตในรีจิสเตอร์ **`IE`, `IP`, `TCON`** ซึ่งเป็น "สวิตช์ฮาร์ดแวร์" ที่ใช้ควบคุมกลไกขัดจังหวะ ในโมดูล 04 ถัดไป เราจะไปดูคำสั่งภาษาแอสเซมบลีที่ใช้เขียนควบคุมรีจิสเตอร์เหล่านี้ พร้อมการสั่งงานคำสั่ง `RETI`!
