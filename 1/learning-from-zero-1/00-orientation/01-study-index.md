# สารบัญชุดเรียน Embedded Systems จากศูนย์

## 1. ชุดนี้กำลังสอนอะไร

ชุดเอกสารนี้ถอดขอบเขตจาก Lecture 1–4 และ coursework เรื่อง interrupt mechanism โดยใช้ classic 8051/MCS-51 เป็นแกนตัวอย่าง. เป้าหมายไม่ใช่ให้จำชื่อ register อย่างเดียว แต่ให้สร้างแบบจำลองเหตุและผลตั้งแต่สัญญาณภายนอกจน CPU เปลี่ยน PC, ใช้ stack, เข้า ISR และคืนด้วย RETI.

> หลักการอ่าน: อ่านจากบริบทระบบ → สถาปัตยกรรม → memory/SFR/stack → timer/time → interrupt → coursework → แบบฝึกหัดและอภิธานศัพท์

## 2. ลำดับไฟล์หลัก

| ลำดับ | ไฟล์ | หน้าที่ |
|---:|---|---|
| 1 | `00-orientation/README.md` | คำแนะนำเริ่มต้นและขอบเขตวิชา |
| 2 | `00-orientation/03-three-day-study-plan.md` | แผนเรียน 24 ชั่วโมง/3 วัน |
| 3 | `01-foundations/01-embedded-systems-from-zero.md` | ปูพื้น embedded, MCU, CPU, memory, I/O, firmware และ prerequisite |
| 4 | `02-8051-architecture/02-8051-architecture.md` | CPU, ALU, registers, pins, ports, clock, timer, serial |
| 5 | `03-memory-stack-sfr/03-memory-stack-sfr.md` | memory map, SFR, register bank, addressing, stack และ PC |
| 6 | `04-timer-and-time/04-timer-and-time.md` | clock, machine cycle, timer/counter, overflow, delay และ latency |
| 7 | `05-interrupt-mechanism/05-interrupt-mechanism-deep-dive.md` | กลไก interrupt ตั้งแต่ event ถึง RETI |
| 8 | `06-coursework-preparation/06-interrupt-coursework-guide.md` | โครงนำเสนอ สคริปต์ คำถาม และจุดที่ต้องระวัง |
| 9 | `07-glossary-and-concepts/07-glossary-and-concept-map.md` | อภิธานศัพท์และ dependency map |
| 10 | `08-practice/08-practice-and-solutions.md` | แบบฝึกหัดและเฉลยเชิงเหตุผล |

## 3. แผนภาพ

ไฟล์ใน `diagrams/` มีทั้ง source `.mmd` และภาพ `.png`. Source ใช้แก้ไข/ตรวจสอบ logic; PNG ใช้เปิดดูและแทรกใน presentation.

| แผนภาพ | ประเด็น |
|---|---|
| `embedded-system-context` | โลกจริง → sensor/peripheral → MCU → actuator |
| `8051-memory-spaces` | code/data/RAM/SFR/external space |
| `interrupt-causal-chain` | event → flag → gate → acceptance → ISR → RETI |
| `interrupt-vector-table` | source กับ classic vector address |
| `stack-on-interrupt` | PC และ context บน stack |
| `interrupt-polling-timing` | sampling, instruction completion และ block |
| `ret-vs-reti` | ordinary subroutine return กับ interrupt completion |
| `timer-to-interrupt` | clock → overflow → flag → ISR |

## 4. สื่อจาก lecture

สื่อที่คัดลอกจาก lecture อยู่ใน `media/course-figures/` และมีบัญชีที่มาใน `references/course-sources/research-notes/media-source-catalog.md`. ภาพ lecture ใช้เพื่ออธิบาย notation และภาพตามที่อาจารย์สอน; แผนภาพใน `diagrams/` สร้างใหม่แบบ deterministic เพื่อเชื่อม causal relationship ให้เห็นชัด.

## 5. แหล่งอ้างอิงหลัก

| รหัส | แหล่ง | ใช้ยืนยัน |
|---|---|---|
| [1] | Intel, *MCS-51 Microcontroller Family User’s Manual* | interrupt response, RETI, vector, stack และ instruction semantics |
| [2] | NXP/Philips, *8XC51/8XC52 Product Specification* | pin, SFR, IE/IP/TCON และรายละเอียด classic derivative |
| [3] | Valvano and Yerraballi, *Introduction to Embedded Systems* | นิยาม embedded system, MCU, I/O และ system context |
| [4] | UCB, *Cyber-Physical Systems: A Computational Perspective* บท 7–11 | embedded processor, memory, I/O, concurrency และ scheduling |
| [5] | Lecture 1–4 และ coursework ของรายวิชา | ขอบเขตที่อาจารย์สอน ลำดับเนื้อหา และโจทย์ presentation |

เอกสาร PDF ของ [1] และ [2] อยู่ใน `references/`. เอกสารต้นฉบับ lecture, coursework, mapping และ textbook ที่คัดเลือกอยู่ใน `references/course-sources/`.

## 6. ขอบเขตและคำเตือนทางวิศวกรรม

คำอธิบายที่ใช้ตัวเลข vector, bit name และ semantics เฉพาะให้ถือว่าเป็น **classic MCS-51 assumption** เว้นแต่ระบุเป็นอย่างอื่น. 8051 derivative อาจเพิ่ม interrupt source, เปลี่ยน clock division, มี vector map อื่น, เพิ่ม priority level หรือเปลี่ยนวิธี clear flag. ก่อนนำโค้ดไปใช้กับชิปจริงต้องตรวจ datasheet/reference manual ของรุ่นนั้น.

## 7. วิธีใช้ใน presentation

อ่านบท 5 แล้วเปิด `06-coursework-preparation/06-interrupt-coursework-guide.md`. เลือก diagram สามภาพเป็นแกน: causal chain, vector table และ stack. ใช้ worked example เพียง source เดียวให้จบครบ. หากต้องอธิบาย RETI ให้ใช้ถ้อยคำที่แยก simplified lecture statement จาก architectural guarantee ตามคู่มือ Intel.
