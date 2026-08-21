# Manifest ของชุดเรียน Embedded Systems จากศูนย์

## วัตถุประสงค์

ชุดนี้ออกแบบสำหรับนิสิตวิศวกรรมคอมพิวเตอร์ที่ต้องการเข้าใจ lecture 1–4 และเตรียมนำเสนอ coursework เรื่อง **interrupt mechanism** โดยเริ่มจากพื้นฐานระบบฝังตัว แล้วค่อยลงสู่ classic MCS-51/8051 อย่างมีสมมติฐานชัดเจน.

## ลำดับการเปิดไฟล์

| ลำดับ | ไฟล์ | จุดประสงค์ |
|---:|---|---|
| 0 | `00-orientation/README.md` | รู้ว่าอาจารย์กำลังสอนอะไร เรียนไปทำไม และมีขอบเขตใด |
| 1 | `00-orientation/01-study-index.md` | สารบัญหลักและการจับคู่กับ lecture 1–4 |
| 2 | `00-orientation/03-three-day-study-plan.md` | ตารางเรียนต่อเนื่อง 24 ชั่วโมงหรือ 3 วัน |
| 3 | `01-foundations/01-embedded-systems-from-zero.md` | Embedded system, MCU, CPU, memory, I/O, timing และ prerequisite |
| 4 | `02-8051-architecture/02-8051-architecture.md` | CPU, ALU, registers, ports, timers, serial และ interrupt controller |
| 5 | `03-memory-stack-sfr/03-memory-stack-sfr.md` | Memory spaces, SFR, register banks, addressing และ stack |
| 6 | `04-timer-and-time/04-timer-and-time.md` | Clock, machine cycle, timer/counter, overflow, delay และ latency |
| 7 | `05-interrupt-mechanism/05-interrupt-mechanism-deep-dive.md` | Event → flag → enable → acceptance → vector → ISR → RETI |
| 8 | `06-coursework-preparation/06-interrupt-coursework-guide.md` | โครงนำเสนอ คำตอบเชิงเหตุผล และคำถามที่อาจารย์อาจถาม |
| 9 | `07-glossary-and-concepts/07-glossary-and-concept-map.md` | อภิธานศัพท์และความสัมพันธ์ของแนวคิด |
| 10 | `08-practice/08-practice-and-solutions.md` | แบบฝึกหัดพร้อมเฉลย trace memory, stack, timer และ interrupt |

## สื่อประกอบ

โฟลเดอร์ `diagrams/` มี source Mermaid (`.mmd`) และภาพที่ render แล้ว (`.png`) สำหรับบริบท embedded system, memory spaces, causal chain, vector table, stack, timing, RET/RETI และ timer-to-interrupt.

โฟลเดอร์ `media/course-figures/` มีภาพที่คัดจาก lecture ของรายวิชา พร้อม catalog ใน `references/course-sources/research-notes/media-source-catalog.md`.

โฟลเดอร์ `references/` มี lecture 1–4, coursework, topic mapping, บันทึกวิจัย, textbook excerpts และ PDF ของ Intel MCS-51 manual กับ NXP/Philips 8XC51/8XC52 datasheet.

## ข้อจำกัดเชิงสถาปัตยกรรมที่ต้องจำ

เนื้อหาใช้ **classic MCS-51 model** เป็นแกน ไม่ได้อ้างว่า 8051-compatible ทุกตัวเหมือนกัน. Vector, SFR address, flag-clear behavior, clock division, priority และ RETI semantics ต้องตรวจ datasheet ของชิปจริงเมื่อเขียนโปรแกรมหรือทำ lab.

ใน presentation ให้แยกสองระดับเสมอ:

> ระดับชั้นเรียน: RETI คือคำสั่งจบ ISR และทำให้ระบบพร้อมรับ interrupt ต่อ.
>
> ระดับ architecture: RETI คืน PC และแจ้ง interrupt-control logic ว่า interrupt service จบแล้ว; อย่าเหมารวมว่า RETI เขียน `EA=1` ในทุก derivative.

## การตรวจสอบ

- เอกสารหลัก 12 ไฟล์เขียนและตรวจโครงสร้างแล้ว.
- Diagram source และ PNG มีครบ 8 ชุด.
- ภาพจาก lecture มี catalog และที่มา.
- Lecture 1–4 และ coursework ถูกคัดสำเนาไว้ใน `references/course-sources/`.
- ลิงก์อ้างอิงภายนอกใช้ Intel MCS-51 manual, NXP/Philips datasheet และแหล่งมหาวิทยาลัย UT Austin.
- ไฟล์ในโฟลเดอร์ learning-from-zero เดิมของผู้ใช้ไม่ได้ถูกลบ; ชุดใหม่นี้อยู่ในโฟลเดอร์ย่อยชื่อแบบตัวเลขและขีดกลางเพื่อแยกจากไฟล์เดิม.
