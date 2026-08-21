# Source Mapping and Evidence

เอกสารนี้ใช้ตรวจสอบว่าแต่ละข้อความในบทพูดมาจากที่ใด จุดประสงค์คือป้องกันการมโนและช่วยให้ตอบอาจารย์ได้ว่า “ข้อมูลนี้อยู่หน้าไหน บรรทัดไหน และเป็นข้อเท็จจริงของสถาปัตยกรรมใด”

## วิธีอ่านเลขอ้างอิง

เลขหน้าในตารางหมายถึงหน้า PDF เดิมของ lecture หรือ textbook เมื่อไฟล์ถูกแปลงเป็น Markdown จะมีหัวข้อ `PDF Page` กำกับ ส่วนเลขบรรทัดหมายถึงบรรทัดในไฟล์ Markdown ที่อยู่ในชุดต้นฉบับของโครงการ ณ วันที่จัดทำเอกสาร บรรทัดของ PDF ที่สกัดด้วย OCR อาจเปลี่ยนได้ตามเครื่องมือ จึงให้ยึดเลขหน้าและถ้อยคำใน PDF เป็นหลักเมื่อเลขบรรทัดไม่ตรง

## ตารางจับคู่กับข้อกำหนด coursework

| ข้อกำหนด/สิ่งที่ต้องมี | หลักฐาน | ตำแหน่ง | การนำไปใช้ |
|---|---|---|---|
| หัวข้อ Interrupt Mechanism | `Course Work.pdf` | หน้า 3 และ 5 | กำหนดชื่อหัวข้อและขอบเขตของสคริปต์ |
| แบ่งเนื้อหาเป็นความหมาย/ความเป็นมา และกลไก/การทำงาน | `Course Work.pdf` และ `Topic-lists.md` | หน้า 3–5 | สไลด์ 1–2 อธิบายความหมาย; สไลด์ 3–4 อธิบายกลไก; สไลด์ 5 สรุป |
| นำเสนอภายใน 2:00–2:59 นาที | `Course Work.pdf` | หน้า 5 | สคริปต์กำหนดเวลา 0:00–2:25 |
| มีแหล่งอ้างอิง | `Course Work.pdf` | หน้า 5 | สไลด์ 5 และไฟล์นี้แสดง source list เต็ม |

## ตารางหลักฐานรายสไลด์

| สไลด์ | ข้อความ/แนวคิดที่พูด | แหล่งหลัก | หน้า/บรรทัดหรือ section | สถานะ |
|---|---|---|---|---|
| 1 | Embedded system, MCU และ input–computation–output | Lecture 1 | PDF หน้า 2–4, 9; บรรทัด 23–74 และ 160–199 | ตรงกับบทนำ |
| 1 | ขอบเขตหัวข้อและเวลา | Course Work.pdf | หน้า 3 และ 5 | อ้างจากโจทย์งาน |
| 2 | นิยาม interrupt, ISR, polling และ vector | Mazidi AVR | บท 10 หน้า 375–376; ไฟล์ `ch10_avr_interrupt_programming_in_assembly_and_c.md` | แหล่งเสริมสำหรับ AVR |
| 2 | Event-driven, state-preserving, vectored, priority-aware | การสังเคราะห์จาก Mazidi, Microchip และ Arm | Mazidi หน้า 375–376; Microchip หน้า 33–34; Arm exception model | ต้องเรียกว่า “กรอบสังเคราะห์” ไม่ใช่ข้อความคำต่อคำจากแหล่งเดียว |
| 2 | ข้อจำกัดของระบบฝังตัวและการตอบสนองตามเวลา | Lecture 1; Valvano | Lecture 1 หน้า 3–4 บรรทัด 35–74; Valvano Chapter 1 | ใช้ปูพื้น |
| 3 | Request: event/flag/pending | Microchip AVR; MCS-51 manual | ATmega328/P หน้า 33–34; Intel manual ส่วน interrupt handling | หลักการร่วม แต่ flag behavior ต้องแยกตามชิป |
| 3 | Entry: enable/mask/priority/context/vector | Mazidi; Microchip; Arm | Mazidi หน้า 376; ATmega328/P หน้า 33–34; Arm exception entry | แยก architecture ในบทพูด |
| 3 | AVR เก็บ PC และใช้ vector table | Mazidi; ATmega328/P | Mazidi หน้า 376; ATmega328/P หน้า 33–34 และ 84–92 ในบท datasheet ที่สกัดไว้ | ใช้เป็นตัวอย่าง AVR |
| 3 | Cortex-M3 stacking และ exception return | Arm Generic User Guide; Yiu | Arm section “Exception entry and return”; Yiu หน้า 172–175 | ใช้เปรียบเทียบ ไม่ใช่ 8051 |
| 3 | 8051 fixed vector และ hardware-generated LCALL | Intel MCS-51 manual; NXP | Intel manual ส่วน interrupt structure/handling; NXP datasheet ตาราง interrupt vectors | เป็นข้อเท็จจริงของ MCS-51/derivative ที่ระบุ |
| 3 | 8051 hardware เก็บ PC แต่ไม่เก็บ PSW | Intel MCS-51 manual | ส่วน interrupt handling และ interrupt response | ใช้เตือนเรื่อง context |
| 3 | SFR, IE และ IP | Lecture 3 | PDF หน้า 10–12; บรรทัด 606–619, 667–746 | ตรงกับ lecture |
| 3 | Stack และ return address | Lecture 3 | PDF หน้า 9; บรรทัด 496–512 | ตรงกับ lecture |
| 4 | Enable, mask และ priority | NXP; Lecture 3; Microchip | NXP IE/IP section; Lecture 3 หน้า 12 บรรทัด 667–746; Microchip หน้า 33–34 | ชื่อ register ต้องระบุ architecture |
| 4 | `EA` เป็น global enable; `IE` ที่ A8H; `IP` ที่ B8H | NXP/Philips 80C51/80C52 datasheet; Lecture 3 | NXP IE/IP section; Lecture 3 หน้า 12 บรรทัด 700–746 | ใช้เฉพาะ 8051 family ที่อ้างถึง |
| 4 | Context integrity และการ save/restore | Intel MCS-51 manual; Lecture 3 | Intel manual interrupt response; Lecture 3 หน้า 9 บรรทัด 496–512 | ตรงกับสถาปัตยกรรม 8051 |
| 4 | `RET` กับ `RETI` แตกต่างกัน | Lecture 4; Intel MCS-51 manual | Lecture 4 หน้า 28 บรรทัด 1391–1416; Intel manual ส่วน RETI | ต้องกล่าว correction เรื่อง EA อย่างระมัดระวัง |
| 4 | RETI ไม่ควรถูกอธิบายว่าเขียน EA=1 ทุก derivative | Intel MCS-51 manual | ส่วน interrupt handling/RETI; บันทึกวิจัย `external-research-notes.md` บรรทัด 31–50 | เป็นการตรวจแก้คำอธิบาย lecture ให้แม่นยำ |
| 4 | ISR ต้องสั้น, bounded, ลด latency/jitter | หลักการ real-time; Arm; Lecture 1 | Arm exception/priority; Lecture 1 เรื่อง timing; อธิบายใน teaching notes | เป็นการสังเคราะห์เชิงวิศวกรรม ไม่ใช่เลขเวลาของชิปใดชิปหนึ่ง |
| 5 | สรุป request–entry–service/return | แหล่งทั้งหมด | ตารางนี้และบทพูดสไลด์ 2–4 | เป็น synthesis ที่ประกาศอย่างชัดเจน |

## แหล่ง lecture พร้อมตำแหน่งใช้งาน

### Lecture 1

- หน้า 2–4: แนวคิด embedded system, system components และบทบาทของ processor/memory/I/O
- หน้า 9: ภาพรวม 8051 และ interrupt sources ตามเนื้อหา lecture
- บรรทัด 23–74: บทนำระบบและองค์ประกอบ
- บรรทัด 160–199: MCU/8051 และแนวคิดการเชื่อมอุปกรณ์

### Lecture 2

- หน้า 2 เป็นต้นไป: pin, port และองค์ประกอบของ 8051
- ช่วง PSW และ register bank: ใช้ปูพื้นคำว่า status register และ register context
- ใช้ประกอบ teaching notes แต่ไม่อ้างเลข vector หรือ semantics ของ RETI จาก lecture 2

### Lecture 3

- หน้า 9, บรรทัด 496–512: stack, SP และการเก็บ return address
- หน้า 10, บรรทัด 604–624: SFR เป็น on-chip registers สำหรับ timer, I/O, serial และ interrupt; internal RAM ใช้ 00H–7FH และ SFR ใช้ 80H–FFH
- หน้า 12, บรรทัด 667–746: ตารางชื่อ SFR, `IE` = Interrupt Enable ที่ A8H และ `IP` = Interrupt Priority ที่ B8H

### Lecture 4

- หน้า 27: CALL และการเก็บ return address ใน stack
- หน้า 28, บรรทัด 1391–1416: `RET` ใช้กับ normal subroutine; `RETI` ใช้กับ ISR และข้อความ lecture ที่กล่าวถึง EA
- เนื้อหา RETI ต้องอ่านคู่กับ Intel MCS-51 manual เพราะข้อความใน lecture เป็นคำอธิบายแบบย่อ

## แหล่ง textbook และผู้ผลิต

| รหัส | แหล่ง | ใช้ยืนยัน |
|---|---|---|
| T1 | Mazidi, Naimi & Naimi, *The AVR Microcontroller and Embedded Systems*, หน้า 375–376 | interrupt, polling, ISR, vector และ AVR return |
| T2 | Microchip, *ATmega328/P Datasheet Complete*, หน้า 33–34 และ 84–92 | AVR interrupt vectors, enable/flags และ external interrupt registers |
| T3 | Yiu, *The Definitive Guide to the ARM Cortex-M3*, หน้า 172–175 | exception entry, context และ exception return |
| T4 | Arm, *Cortex-M3 Devices Generic User Guide*, section “Exception entry and return” | ARM exception entry/return ออนไลน์ |
| T5 | Intel, *MCS-51 Family User’s Manual*, section “Interrupt Structure/Handling” | fixed vector, polling/acceptance, PC stacking และ RETI |
| T6 | NXP/Philips, *80C51/87C51/80C52/87C52 Product Specification* | 8051-family IE/IP, vector, interrupt source และ derivative differences |

## สิ่งที่เป็น synthesis และสิ่งที่เป็น quotation-like fact

คำว่า **synthesis** ในเอกสารนี้หมายถึงการนำข้อเท็จจริงจากหลายแหล่งมาเรียงเป็น causal chain เดียว ได้แก่ source event → flag/request → eligibility → entry/vector → ISR → acknowledge/clear → return สิ่งนี้ไม่ควรพูดว่าเป็นประโยคที่คัดมาจาก textbook เล่มใดเล่มหนึ่ง

ข้อเท็จจริงแบบ architecture-specific ได้แก่ `IE` = A8H, `IP` = B8H, fixed vector address ของ 8051, hardware save PC, และ semantics ของ `RETI` ต้องใส่ชื่อ architecture และ source กำกับเสมอ

## ลิงก์อ้างอิงออนไลน์

- [Valvano & Yerraballi: Introduction to Embedded Systems][valvano]
- [NXP 80C51/80C52 Product Specification][nxp]
- [Intel MCS-51 Family User’s Manual][intel]
- [Microchip ATmega documentation: Interrupt vectors][microchip]
- [Arm Cortex-M3: Exception entry and return][arm]

[valvano]: https://users.ece.utexas.edu/~valvano/mspm0/ebook/Ch1_Introduction.html
[nxp]: https://www.nxp.com/docs/en/data-sheet/8XC51_8XC52.pdf
[intel]: https://cos.colorado.edu/Documents/DCE/BOOT/8051_Manual.pdf
[microchip]: https://onlinedocs.microchip.com/oxy/GUID-B84B70FB-3A2A-4032-8108-E46D2240EB3A-en-US-9/GUID-3C3A0504-066B-4FBB-AC89-295B76DACB65.html
[arm]: https://developer.arm.com/documentation/dui0552/a/the-cortex-m3-processor/exception-model/exception-entry-and-return
