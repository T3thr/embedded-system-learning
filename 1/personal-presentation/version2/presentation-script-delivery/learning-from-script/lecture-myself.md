# เอกสาร Lecture สรุปฉบับสมบูรณ์: กลไก Interrupt (Interrupt Mechanism)
> **คู่ขนานกับบทพูด:** `06-script-natural-delivery.md`  
> **อ้างอิงรายวิชา:** 305341 Embedded System 1 (Lecture 1–4, Mazidi AVR Book)  
> **วัตถุประสงค์:** สกัดและเรียบเรียง Q&A ทั้งหมดให้อยู่ในรูปแบบคู่มือเรียนรู้เชิงระบบ สำหรับนิสิตวิศวกรรมคอมพิวเตอร์

---

## 📑 สารบัญ (Table of Contents)

- [หมวดที่ 1: รากเหง้าและองค์ประกอบพื้นฐาน (Foundations)](#หมวดที่-1-รากเหง้าและองค์ประกอบพื้นฐาน-foundations)
  - [1.1 CPU คืออะไร? (สมองและตัวชี้ PC)](#11-cpu-คืออะไร-สมองและตัวชี้-pc)
  - [1.2 Peripheral คืออะไร? (ผู้ช่วยรอบชิป)](#12-peripheral-คืออะไร-ผู้ช่วยรอบชิป)
  - [1.3 Timer คืออะไร? (Hardware Counter)](#13-timer-คืออะไร-hardware-counter)
  - [1.4 จุดกำเนิด Interrupt: Polling vs Interrupt](#14-จุดกำเนิด-interrupt-polling-vs-interrupt)
  - [1.5 การนำไปใช้จริงในโลกคอมพิวเตอร์ปัจจุบัน](#15-การนำไปใช้จริงในโลกคอมพิวเตอร์ปัจจุบัน)
- [หมวดที่ 2: นิยามและ 4 คุณสมบัติหลัก (คู่ขนาน สไลด์หน้า 2)](#หมวดที่-2-นิยามและ-4-คุณสมบัติหลัก-คู่ขนาน-สไลด์หน้า-2)
  - [2.1 นิยามของ Interrupt และ ISR](#21-นิยามของ-interrupt-และ-isr)
  - [2.2 คุณสมบัติที่ 1: Event-driven](#22-คุณสมบัติที่-1-event-driven)
  - [2.3 คุณสมบัติที่ 2: State-preserving](#23-คุณสมบัติที่-2-state-preserving)
  - [2.4 คุณสมบัติที่ 3: Vectored](#24-คุณสมบัติที่-3-vectored)
  - [2.5 คุณสมบัติที่ 4: Priority-aware](#25-คุณสมบัติที่-4-priority-aware)
  - [2.6 จุดโฟกัสสไลด์หน้า 2 สำหรับการนำเสนอ](#26-จุดโฟกัสสไลด์หน้า-2-สำหรับการนำเสนอ)
- [หมวดที่ 3: 3 ระยะการทำงานของ Interrupt (คู่ขนาน สไลด์หน้า 3)](#หมวดที่-3-3-ระยะการทำงานของ-interrupt-คู่ขนาน-สไลด์หน้า-3)
  - [3.1 ภาพรวม Flow การทำงาน 3 Phase](#31-ภาพรวม-flow-การทำงาน-3-phase)
  - [3.2 Phase 1: Request (ส่งคำขอและ Pending)](#32-phase-1-request-ส่งคำขอและ-pending)
  - [3.3 Phase 2: Entry (ด่านตรวจ, Preserve และ Vector Lookup)](#33-phase-2-entry-ด่านตรวจ-preserve-และ-vector-lookup)
  - [3.4 Phase 3: Service & Return (ทำ ISR, เคลียร์ Flag และย้อนกลับ)](#34-phase-3-service--return-ทำ-isr-เคลียร์-flag-และย้อนกลับ)
  - [3.5 ตัวอย่างจริงใน 8051: Stack และ SP](#35-ตัวอย่างจริงใน-8051-stack-และ-sp)
  - [3.6 เจาะลึก RET vs RETI (ทำไมต้องเปิด Interrupt กลับคืน?)](#36-เจาะลึก-ret-vs-reti-ทำไมต้องเปิด-interrupt-กลับคืน)
- [หมวดที่ 4: 3 เงื่อนไขที่ทำให้ทำงานถูกต้อง (คู่ขนาน สไลด์หน้า 4)](#หมวดที่-4-3-เงื่อนไขที่ทำให้ทำงานถูกต้อง-คู่ขนาน-สไลด์หน้า-4)
  - [4.1 กรอบความเสถียรของระบบ (Stability Framework)](#41-กรอบความเสถียรของระบบ-stability-framework)
  - [4.2 เงื่อนไขที่ 1: Qualify (EA, IE @ A8H, IP @ B8H)](#42-เงื่อนไขที่-1-qualify-ea-ie--a8h-ip--b8h)
  - [4.3 เงื่อนไขที่ 2: Preserve (Context Integrity)](#43-เงื่อนไขที่-2-preserve-context-integrity)
  - [4.4 เงื่อนไขที่ 3: Complete (RETI และ Bounded ISR / Low Latency)](#44-เงื่อนไขที่-3-complete-reti-และ-bounded-isr--low-latency)
- [หมวดที่ 5: สรุปและการอ้างอิงรายวิชา (คู่ขนาน สไลด์หน้า 5)](#หมวดที่-5-สรุปและการอ้างอิงรายวิชา-คู่ขนาน-สไลด์หน้า-5)
  - [5.1 สรุปสาระสำคัญ (Key Takeaways)](#51-สรุปสาระสำคัญ-key-takeaways)
  - [5.2 ตารางดรรชนีการอ้างอิง Lecture และ Textbook](#52-ตารางดรรชนีการอ้างอิง-lecture-และ-textbook)

---

## หมวดที่ 1: รากเหง้าและองค์ประกอบพื้นฐาน (Foundations)

### 1.1 CPU คืออะไร? (สมองและตัวชี้ PC)
* **CPU (Central Processing Unit)** คือหน่วยประมวลผลกลาง ทำหน้าที่อ่านคำสั่งจากหน่วยความจำ (ROM/Flash) ทีละบรรทัด แล้วทำตามคำสั่งนั้นวนไปเรื่อยๆ (Fetch-Decode-Execute Cycle)
* **Program Counter (PC):** คือ Register พิเศษที่เป็นตัวชี้บรรทัดคำสั่งปัจจุบัน
* **ธรรมชาติของ CPU:** CPU โฟกัสงานได้ทีละอย่าง (Single-minded) หากกำลังคำนวณ Main Program อยู่ มันจะไม่รับรู้เหตุการณ์ภายนอก เว้นแต่จะมีกลไกไปสะกิดบอก

### 1.2 Peripheral คืออะไร? (ผู้ช่วยรอบชิป)
* ใน **Microcontroller (MCU)** (เช่น ATmega328P หรือ 8051) CPU ไม่ได้อยู่ตัวคนเดียว แต่อยู่ร่วมกับ **Peripheral (โมดูลอุปกรณ์ต่อพ่วง)** บนชิปเดียวกัน *(Lecture 1 หน้า 9)*
* **หน้าที่:** เปรียบเหมือน "ผู้ช่วยแผนกต่างๆ" เช่น:
  * **GPIO (I/O Ports):** แผนกรับสัญญาณปุ่มกด/แสดงผล LED
  * **UART / Serial:** แผนกรับ-ส่งจดหมายสื่อสารข้อมูล
  * **ADC:** แผนกแปลสัญญาณอนาล็อกเป็นดิจิทัล
  * **Timer/Counter:** แผนกจับเวลา

### 1.3 Timer คืออะไร? (Hardware Counter)
* **Timer** คือวงจรนับตัวเลขฮาร์ดแวร์ (Hardware Counter) ที่นับจังหวะสัญญาณนาฬิกา (Clock Pulse) แยกอิสระจาก CPU
* **ทำไมต้องมี?** หากไม่มี Timer แล้วต้องการหน่วงเวลา CPU ต้องรันลูปหลอก `for(i=0; i<100000; i++)` ทำให้เสียรอบ CPU ไปฟรีๆ พอมี Hardware Timer CPU แค่สั่งให้ Timer นับ แล้ว CPU เอาเวลาไปรันโปรแกรมหลักต่อได้ทันที

### 1.4 จุดกำเนิด Interrupt: Polling vs Interrupt
เมื่อ Peripheral เกิดเหตุการณ์ (Event) การแจ้งบอก CPU ทำได้ 2 วิธี:
1. **Polling (การเดินไปถาม):** CPU ต้องเขียนโค้ดวนถามอุปกรณ์เรื่อยๆ *"เสร็จยัง? เสร็จยัง?"*  
   * *ข้อเสีย:* เปลือง CPU cycles และตอบสนองช้า (High Latency) หาก CPU มัวคำนวณงานใหญ่ อาจพลาดเหตุการณ์ได้ *(Mazidi หน้า 375)*
2. **Interrupt (การสั่นกระดิ่งแจ้งเตือน):** CPU รัน Main Program ไปเรื่อยๆ เมื่อ Peripheral มี Event มันจะส่งสัญญาณ **Interrupt Request (IRQ)** วิ่งไปสะกิด CPU  
   * *เปรียบเทียบ:* เหมือนนั่งทำการบ้าน แล้วพนักงานส่งของมา **กดกริ่งหน้าบ้าน**

### 1.5 การนำไปใช้จริงในโลกคอมพิวเตอร์ปัจจุบัน
กลไก Interrupt ถูกใช้งานในอุปกรณ์ดิจิทัลทุกชนิดในปัจจุบัน:
* **คอมพิวเตอร์/สมาร์ตโฟน:** การกดคีย์บอร์ด, เคลื่อนเมาส์, การแตะหน้าจอสัมผัส
* **ยานยนต์ (ระบบ ABS):** เซนเซอร์ล้อตรวจพบการไถล ส่ง Interrupt ด่วนพิเศษไปสั่งปั๊มเบรกทำงานทันที
* **ระบบเครือข่าย:** การรับแพ็กเกจข้อมูลทาง Wi-Fi/Ethernet เข้ามายัง CPU

---

## หมวดที่ 2: นิยามและ 4 คุณสมบัติหลัก (คู่ขนาน สไลด์หน้า 2)

### 2.1 นิยามของ Interrupt และ ISR
* **Interrupt:** กลไกที่ทำให้ตัวประมวลผลถ่ายโอนการควบคุมชั่วคราวจาก Main Program ไปยังฟังก์ชันบริการขัดจังหวะ
* **ISR (Interrupt Service Routine):** ฟังก์ชันพิเศษที่เขียนขึ้นมาเพื่อรับมือและจัดการเหตุการณ์นั้นๆ โดยเฉพาะ

### 2.2 คุณสมบัติที่ 1: Event-driven
* **ความหมาย:** Control Flow เปลี่ยนเพราะมีเหตุการณ์ (Event) หรือคำขอจากฮาร์ดแวร์ ไม่ใช่การเรียกฟังก์ชันตามลำดับโปรแกรมปกติ
* **อุปมาชีวิตจริง:** เหมือนลุกไปเปิดประตูเพราะ **กริ่งหน้าบ้านดัง** ไม่ใช่ลุกไปเองตามเวลา

### 2.3 คุณสมบัติที่ 2: State-preserving
* **ความหมาย:** ก่อนย้ายไป ISR ระบบต้องบันทึก Context (เช่น PC, Status) ไว้ใน Stack เพื่อให้ทำ ISR เสร็จแล้วกลับมาทำโปรแกรมเดิมต่อได้ถูกต้อง
* **อุปมาชีวิตจริง:** เหมือนอ่านหนังสือถึงหน้า 42 บรรทัดที่ 5 แล้วเอา **ที่คั่นหนังสือ** เสียบไว้ก่อนลุกไปทำธุระ เพื่อกลับมาอ่านต่อจุดเดิมได้ทันที

### 2.4 คุณสมบัติที่ 3: Vectored
* **ความหมาย:** มีตารางดรรชนีระบุตำแหน่งที่อยู่ (**Interrupt Vector Table**) ชัดเจนว่า ISR ของแต่ละแหล่งอยู่ที่ Address ใด
* **อุปมาชีวิตจริง:** เหมือน **ป้ายกริ่งหน้าคอนโด** ที่ระบุว่า ปุ่ม 1 คือห้อง 101, ปุ่ม 2 คือห้อง 102

### 2.5 คุณสมบัติที่ 4: Priority-aware
* **ความหมาย:** มีระบบจัดลำดับความสำคัญ (Priority Queue) Decision ว่าหากมีหลายคำขอเข้ามาพร้อมกัน คำขอใดจะได้เข้าประมวลผลก่อน
* **อุปมาชีวิตจริง:** เสียงแจ้งเตือน LINE (Priority ต่ำ) vs เสียงกริ่งเตือนภัยไฟไหม้ (Priority สูงสุด)

### 2.6 จุดโฟกัสสไลด์หน้า 2 สำหรับการนำเสนอ
* **โซนบน:** เน้นย้ำคีย์เวิร์ด 4 คุณสมบัติ (`Event-driven`, `State-preserving`, `Vectored`, `Priority-aware`)
* **โซนล่าง:** เน้นการเปรียบเทียบ Polling (CPU เดินไปถาม - เปลืองพลังงาน) vs Interrupt (ฮาร์ดแวร์กดกริ่งบอก - มีประสิทธิภาพสูง)

---

## หมวดที่ 3: 3 ระยะการทำงานของ Interrupt (คู่ขนาน สไลด์หน้า 3)

### 3.1 ภาพรวม Flow การทำงาน 3 Phase

```
[ Phase 1: Request ]      [ Phase 2: Entry ]           [ Phase 3: Service & Return ]
┌──────────────────┐      ┌────────────────────┐      ┌────────────────────────────┐
│ • เกิด Event     │ ───► │ • ตรวจสอบสิทธิ์    │ ───► │ • รัน ISR จัดการสาเหตุ     │
│ • ฮาร์ดแวร์ชูธง  │      │ • Preserve Context │      │ • เคลียร์ Flag             │
│   Interrupt Flag │      │ • Vector Lookup    │      │ • ย้อนกลับด้วย RETI        │
│   (Pending)      │      │   เปลี่ยนค่า PC     │      │   (ดึง PC + เปิด EA=1)    │
└──────────────────┘      └────────────────────┘      └────────────────────────────┘
```

### 3.2 Phase 1: Request (ส่งคำขอและ Pending)
* เกิด Event ที่ Peripheral ➔ ฮาร์ดแวร์ชูธง **Interrupt Flag** (เช่น เปลี่ยนบิตจาก 0 เป็น 1)
* คำขออยู่ในสถานะ **Pending** (รอดำเนินการอยู่ในคิว)

### 3.3 Phase 2: Entry (ด่านตรวจ, Preserve และ Vector Lookup)
* **CPU ตั้งด่านตรวจ 3 ข้อ:** Enable? / Mask? / Priority?
* **ถ้าผ่านทุกด่าน:**
  1. **Preserve Context:** ฝากตำแหน่ง PC ค้างไว้ลงใน Stack (RAM)
  2. **Vector Lookup:** เปิดดู Vector Table เพื่อหา Address ของ ISR แล้วเปลี่ยน PC กระโดดไปที่นั่น

### 3.4 Phase 3: Service & Return (ทำ ISR, เคลียร์ Flag และย้อนกลับ)
* **Service:** รันโค้ด ISR (เช่น อ่านค่าคีย์บอร์ด 'W') แล้วทำการ **Clear Flag** ปลดธงสัญญาณลง
* **Return:** ที่บรรทัดสุดท้ายของ ISR เจอคำสั่ง **`RETI`** ➔ ดึง PC เดิมจาก Stack + เปิดสวิตช์ Global Interrupt ➔ กลับมารัน Main Program ต่อทันที

### 3.5 ตัวอย่างจริงใน 8051: Stack และ SP
* **8051 Microcontroller:** ใช้เป็นสถาปัตยกรรมตัวอย่างหลักในวิชานี้ *(Lecture 1 หน้า 18)*
* **[Lecture 3 หน้า 9](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture3-markdown/lecture_3_complete.md#L496-L512):** อธิบายว่า **Stack** คือพื้นที่ RAM ที่ใช้เก็บ Return Address ของทั้ง ISR และ Subroutine โดยมี **SP (Stack Pointer)** เป็นตัวชี้ตำแหน่งบนสุดของ Stack

### 3.6 เจาะลึก RET vs RETI (ทำไมต้องเปิด Interrupt กลับคืน?)

| คุณสมบัติ | คำสั่ง `RET` | คำสั่ง `RETI` |
| :--- | :--- | :--- |
| **การใช้งาน** | ใช้จบ **Subroutine ปกติ** | ใช้จบ **ISR เท่านั้น** |
| **การทำงาน** | ดึงที่อยู่ PC คืนจาก Stack อย่างเดียว | ดึงที่อยู่ PC คืนจาก Stack **+ เปิดสวิตช์ Global Interrupt (`EA = 1`)** |
| **ผลลัพธ์หากใช้ผิด** | หากใช้ `RET` จบ ISR ➔ สวิตช์ปิดขัดจังหวะยังค้าง (`EA = 0`) **ทำให้ระบบล็อกตัวเอง ไม่รับ Interrupt อีกเลย** | ทำให้ CPU กลับไป Main Program + **พร้อมรับ Interrupt ครั้งถัดไปได้อย่างสมบูรณ์** |

---

## หมวดที่ 4: 3 เงื่อนไขที่ทำให้ทำงานถูกต้อง (คู่ขนาน สไลด์หน้า 4)

### 4.1 กรอบความเสถียรของระบบ (Stability Framework)
เพื่อให้ Interrupt ทำงานได้อย่างถูกต้องโดยไม่ทำให้ระบบค้าง หรือข้อมูลในโปรแกรมหลักเสียหาย ต้องปฏิบัติตาม 3 เงื่อนไข:

### 4.2 เงื่อนไขที่ 1: Qualify (การคัดกรองสิทธิ์)
* คำขอต้องผ่านการตรวจสอบสิทธิ์ 3 ชั้นก่อนเปลี่ยน Control Flow:
  1. **Global Enable (`EA`):** Master Switch ปิด/เปิดทั้งระบบ ถ้า `EA = 0` คำขอทั้งหมดจะถูกบล็อก
  2. **Individual Enable (`IE` @ Address `A8H`):** Register คุมเปิด/ปิดรายแหล่ง *(Lecture 3 หน้า 12)*
  3. **Priority (`IP` @ Address `B8H`):** Register กำหนดระดับความสำคัญ *(Lecture 3 หน้า 12)*

### 4.3 เงื่อนไขที่ 2: Preserve (การรักษา Context Integrity)
* ป้องกันไม่ให้ ISR ไปเขียนทับ Register หรือสถานะที่ Main Program ยังคงใช้งานอยู่ (Register Corruption)
* **กลไก:** ใช้คำสั่ง `PUSH` ฝากค่า Register เดิมไว้ใน Stack ก่อนเริ่มงานใน ISR และใช้ `POP` คืนค่ากลับมาก่อนออกจาก ISR

### 4.4 เงื่อนไขที่ 3: Complete (การจบงานสมบูรณ์และ Bounded ISR)
1. **จบอย่างถูกวิธี:** ต้องจบด้วยคำสั่ง `RETI` เสมอ
2. **Bounded ISR (ทำงานสั้นและกระชับ):** ISR ต้องทำงานให้เร็วที่สุด ห้ามใส่ `sleep()` หรือลูปยาวๆ เพื่อลด **Latency** (เวลาที่คำขออื่นต้องรอคิว) และป้องกันข้อมูลสูญหาย (Buffer Overflow)

---

## หมวดที่ 5: สรุปและการอ้างอิงรายวิชา (คู่ขนาน สไลด์หน้า 5)

### 5.1 สรุปสาระสำคัญ (Key Takeaways)
Interrupt ไม่ใช่เพียงการกระโดดไปยังฟังก์ชัน แต่เป็นกลไกทางสถาปัตยกรรมฮาร์ดแวร์ที่ต้อง **คัดกรองคำขอ (Qualify)**, **รักษาสถานะเดิม (Preserve)**, และ **จบการทำงานอย่างถูกต้อง (Complete)** เพื่อให้ระบบฝังตัวทำงานตอบสนองต่อเหตุการณ์ได้อย่างแม่นยำและเสถียร

### 5.2 ตารางดรรชนีการอ้างอิง Lecture และ Textbook

| หัวข้อในสไลด์ / สคริปต์ | ประเด็นเนื้อหา | แหล่งอ้างอิงใน Lecture | แหล่งอ้างอิงใน Textbook |
| :--- | :--- | :--- | :--- |
| **สไลด์หน้า 1** | MCU Block Diagram & Peripherals | [Lecture 1 หน้า 9](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture1-markdown/lecture1_complete.md#L177-L188) | Mazidi Ch 1 |
| **สไลด์หน้า 2** | Polling vs Interrupt & นิยาม ISR | [Lecture 2 หน้า 2](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture2-markdown/lecture_2_complete.md#L40) | Mazidi Ch 10 (p. 375–376) |
| **สไลด์หน้า 3** | Stack, SP & 3 Phase Execution | [Lecture 3 หน้า 9](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture3-markdown/lecture_3_complete.md#L496-L512) | Mazidi Ch 10 (p. 376) |
| **สไลด์หน้า 3 & 4** | คำสั่ง `RET` vs `RETI` | [Lecture 4 หน้า 28](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture4-markdown/lecture_4_complete.md#L1394-L1417) | Mazidi Ch 10 (p. 378 Ex 10-2) |
| **สไลด์หน้า 4** | SFR `IE` (`A8H`) & `IP` (`B8H`) | [Lecture 3 หน้า 12](file:///Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/lecture3-markdown/lecture_3_complete.md#L667-L746) | Mazidi Ch 10 |