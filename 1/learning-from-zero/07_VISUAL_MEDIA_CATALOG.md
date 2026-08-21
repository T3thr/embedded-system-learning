# 🖼️ Module 07: คลังสื่อการสอนและรูปภาพประกอบฮาร์ดแวร์ (Visual Media Catalog)

> **คำแนะนำ:** ไม่ต้องไปหารูปเองเลยครับ! รูปภาพทั้งหมดสกัดจากสไลด์อาจารย์ด้วยความละเอียดสูง (300 DPI) และถูกจัดเก็บอยู่ในระบบเรียบร้อยแล้ว ในโมดูลนี้และเอกสารทุกเล่มได้ทำการ **ฝังภาพจริง (Embedded Images)** ไว้เรียบร้อยแล้ว สามารถคลิกเปิดดูภาพหรืออ่านควบคู่ใน IDE ได้ทันที!

---

## 📸 หมวดที่ 1: ภาพรวมสถาปัตยกรรมและบล็อกประมวลผล (Lecture 1 Media)

### 1.1 องค์ประกอบระบบฝังตัว (Embedded System Building Blocks)
![Building blocks of ES](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture1-markdown/images/fig_004_slide_diagram.png)
- **ตำแหน่งในสไลด์:** Lecture 1 Slide 4  
- **ไฟล์รูปภาพ:** [`fig_004_slide_diagram.png`](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture1-markdown/images/fig_004_slide_diagram.png)  
- **คำอธิบายภาพ:** แสดงบล็อกการทำงานของระบบฝังตัวตั้งแต่ Input (Sensors, Touch, Buttons), Controller Unit (Processor, ROM, RAM, ALU, CU), Power Supply และ Output (LED, LCD, Motors)

---

### 1.2 เปรียบเทียบฮาร์ดแวร์ Microprocessor vs Microcontroller
![Microprocessor vs Microcontroller](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture1-markdown/images/fig_009_media_2.jpeg)
- **ตำแหน่งในสไลด์:** Lecture 1 Slide 9  
- **ไฟล์รูปภาพ:** [`fig_009_media_2.jpeg`](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture1-markdown/images/fig_009_media_2.jpeg)  
- **คำอธิบายภาพ:** แผนภาพแสดงความแตกต่างระหว่าง Microprocessor (มีเฉพาะ CPU) และ Microcontroller (รวม CPU, RAM, ROM, Timers, Serial, Interrupts, Ports ไว้บนชิปเดียว)

---

### 1.3 สถาปัตยกรรมบัสของ Microprocessor-Based System
![Microprocessor Bus Architecture](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture1-markdown/images/fig_010_media_1.jpeg)
- **ตำแหน่งในสไลด์:** Lecture 1 Slide 10  
- **ไฟล์รูปภาพ:** [`fig_010_media_1.jpeg`](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture1-markdown/images/fig_010_media_1.jpeg)  
- **คำอธิบายภาพ:** แสดงการเชื่อมต่อบัส 3 สาย (Address Bus, Data Bus, Control Bus) ระหว่าง CPU กับ ROM, RAM, และ I/O Peripherals ภายนอก

---

### 1.4 สถาปัตยกรรมหน่วยความจำ Von Neumann Architecture
![Von Neumann Architecture](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture1-markdown/images/fig_013_slide_diagram.png)
- **ตำแหน่งในสไลด์:** Lecture 1 Slide 13 & 14  
- **ไฟล์รูปภาพ:** [`fig_013_slide_diagram.png`](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture1-markdown/images/fig_013_slide_diagram.png)  
- **คำอธิบายภาพ:** แสดงโครงสร้าง Von Neumann ที่ใช้บัสร่วมชุดเดียวกันในการดึง Instruction และ Data จากหน่วยความจำบล็อกเดียวกัน

---

### 1.5 สถาปัตยกรรมหน่วยความจำ Harvard Architecture
![Harvard Architecture](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture1-markdown/images/fig_015_slide_diagram.png)
- **ตำแหน่งในสไลด์:** Lecture 1 Slide 15  
- **ไฟล์รูปภาพ:** [`fig_015_slide_diagram.png`](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture1-markdown/images/fig_015_slide_diagram.png)  
- **คำอธิบายภาพ:** แสดงโครงสร้าง Harvard ที่แยกบัสและแยกหน่วยความจำระหว่าง Instruction Memory (ROM) กับ Data Memory (RAM) ออกจากกันเพื่อประสิทธิภาพสูงสุด

---

### 1.6 แผนผังบล็อกฮาร์ดแวร์ภายในของ 8051 (8051 Internal Hardware Block Diagram)
![8051 Internal Hardware Block Diagram](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture1-markdown/images/fig_018_media_1.jpeg)
- **ตำแหน่งในสไลด์:** Lecture 1 Slide 18  
- **ไฟล์รูปภาพ:** [`fig_018_media_1.jpeg`](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture1-markdown/images/fig_018_media_1.jpeg)  
- **คำอธิบายภาพ:** ผังแสดงส่วนประกอบภายใน 8051 ทั้ง 4KB ROM, 128B RAM, Oscillator, CPU, Timers, Serial Port, I/O Ports และ **External Interrupts / Interrupt Control Block**

---

## 📸 หมวดที่ 2: ผังพินฮาร์ดแวร์ 40-Pin DIP (Lecture 2 Media)

### 2.1 คุณลักษณะเฉพาะ 8051 (8051 Features List)
![8051 Feature Summary](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture2-markdown/images/fig_002_media_1.jpeg)
- **ตำแหน่งในสไลด์:** Lecture 2 Slide 2  
- **ไฟล์รูปภาพ:** [`fig_002_media_1.jpeg`](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture2-markdown/images/fig_002_media_1.jpeg)  
- **คำอธิบายภาพ:** สรุปคุณสมบัติทางฮาร์ดแวร์ 8051 เช่น 12MHz, 4KB ROM, 128B RAM, 5 Interrupts, 2 Timers

---

### 2.2 ผังพินไอซี 40-Pin DIP 8051 (8051 Complete Pin Diagram)
![8051 40-Pin DIP Pinout](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture2-markdown/images/fig_003_media_1.jpeg)
- **ตำแหน่งในสไลด์:** Lecture 2 Slide 3  
- **ไฟล์รูปภาพ:** [`fig_003_media_1.jpeg`](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture2-markdown/images/fig_003_media_1.jpeg)  
- **คำอธิบายภาพ:** ภาพแสดงตำแหน่งพินทั้ง 40 พิน เช่น พิน 12 (`P3.2/\INT0`), พิน 13 (`P3.3/\INT1`), พิน 31 (`\EA`), พิน 30 (`ALE`), พิน 29 (`\PSEN`)

---

## 📸 หมวดที่ 3: โครงสร้างความจำและ SFR Registers (Lecture 3 Media)

### 3.1 โครงสร้างผังความจำ ROM และ RAM (8051 Memory Map)
![8051 Memory Structure](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture3-markdown/images/fig_002_media_1.jpeg)
- **ตำแหน่งในสไลด์:** Lecture 3 Slide 2  
- **ไฟล์รูปภาพ:** [`fig_002_media_1.jpeg`](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture3-markdown/images/fig_002_media_1.jpeg)  
- **คำอธิบายภาพ:** แสดงการแบ่งหน่วยความจำ 4 ประเภท: Internal ROM 4KB, Internal RAM 128B, External ROM 64KB, External RAM 64KB

---

### 3.2 ผังหน่วยความจำ ROM และพิน `\EA` (ROM Organization)
![ROM Organization EA Pin](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture3-markdown/images/fig_004_media_1.jpeg)
- **ตำแหน่งในสไลด์:** Lecture 3 Slide 4  
- **ไฟล์รูปภาพ:** [`fig_004_media_1.jpeg`](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture3-markdown/images/fig_004_media_1.jpeg)  
- **คำอธิบายภาพ:** แสดงความแตกต่างของแผนที่แอดเดรส ROM เมื่อตั้งพิน `\EA = 1` (อ่าน Internal 4KB ก่อน) และ `\EA = 0` (อ่าน External 64KB ทั้งหมด)

---

### 3.3 โครงสร้างหน่วยความจำ Internal RAM 128 Bytes (Internal RAM Map)
![Internal RAM Structure](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture3-markdown/images/fig_005_media_1.jpeg)
- **ตำแหน่งในสไลด์:** Lecture 3 Slide 5  
- **ไฟล์รูปภาพ:** [`fig_005_media_1.jpeg`](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture3-markdown/images/fig_005_media_1.jpeg)  
- **คำอธิบายภาพ:** ผังแสดงพื้นที่ RAM 3 ย่าน: Register Banks 0-3 (`00H-1FH`), Bit-Addressable RAM (`20H-2FH`), Scratchpad/Stack (`30H-7FH`)

---

### 3.4 ผังตำแหน่ง Special Function Registers (SFR Address Map)
![SFR Address Map](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture3-markdown/images/fig_010_media_1.jpeg)
- **ตำแหน่งในสไลด์:** Lecture 3 Slide 10 & 12  
- **ไฟล์รูปภาพ:** [`fig_010_media_1.jpeg`](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture3-markdown/images/fig_010_media_1.jpeg)  
- **คำอธิบายภาพ:** แสดงตำแหน่ง SFRs แอดเดรส `80H` ถึง `FFH` รวมถึงตำแหน่งของรีจิสเตอร์ `IE` (A8H) และ `IP` (B8H)

---

## 📸 หมวดที่ 4: เครื่องมือพัฒนาภาษาซอฟต์แวร์ และคำสั่ง `RETI` (Lecture 4 Media)

### 4.1 วงจรเครื่องมือพัฒนาซอฟต์แวร์ (Development Toolchain Cycle)
![Software Toolchain Flow](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture4-markdown/images/fig_002_media_2.jpeg)
- **ตำแหน่งในสไลด์:** Lecture 4 Slide 2 - 4  
- **ไฟล์รูปภาพ:** [`fig_002_media_2.jpeg`](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture4-markdown/images/fig_002_media_2.jpeg) และ [`fig_004_media_1.jpeg`](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture4-markdown/images/fig_004_media_1.jpeg)  
- **คำอธิบายภาพ:** ผังแสดงขั้นตอนการเปลี่ยนโค้ดจาก Editor -> Assembler/Compiler -> Linker -> Loader

---

### 4.2 เปรียบเทียบการทำงานของคำสั่ง `RET` vs `RETI` (Interrupt Return Mechanism)
![RET vs RETI Mechanics](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture4-markdown/images/fig_028_media_1.jpeg)
- **ตำแหน่งในสไลด์:** Lecture 4 Slide 28  
- **ไฟล์รูปภาพ:** [`fig_028_media_1.jpeg`](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture4-markdown/images/fig_028_media_1.jpeg)  
- **คำอธิบายภาพ:** แสดงกลไกการ Pop Program Counter จากสแต็ก และการล้างสภาวะ In-Service Flag โดยคำสั่ง `RETI` เพื่อเปิดทางให้ Interrupt ถัดไป

---

## 💡 วิธีการใช้งานรูปภาพ

คุณสามารถคลิกที่ลิงก์ไฟล์ภาพในแต่ละหัวข้อเพื่อเปิดดูภาพขยายเต็มจอใน IDE หรือดูภาพที่ฝังอยู่ในเอกสาร [00_FOUNDATION_PREREQUISITES.md](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/learning-from-zero/00_FOUNDATION_PREREQUISITES.md) ถึง [06_PRESENTATION_DEFENSE_AND_MASTERY_GUIDE.md](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/learning-from-zero/06_PRESENTATION_DEFENSE_AND_MASTERY_GUIDE.md) ได้ทันที!
