# ชุดบทพูดนำเสนอ Interrupt Mechanism

เอกสารชุดนี้จัดทำขึ้นเพื่อใช้คู่กับไฟล์ `interrupt-mechanism-coursework.pdf` และ `Course Work.pdf` ของรายวิชา Embedded System 1 โดยแบ่งเนื้อหาออกเป็นสามระดับ ได้แก่ บทพูดที่ใช้จริงระหว่างนำเสนอ บทเรียนปูพื้นเพื่อทำความเข้าใจ และหลักฐานอ้างอิงสำหรับตรวจสอบย้อนกลับ

## ลำดับการอ่าน

| ลำดับ | ไฟล์ | จุดประสงค์ |
|---|---|---|
| 1 | `01-presentation-script-interrupt-mechanism.md` | บทพูดตามสไลด์ทั้ง 5 หน้า พร้อมเวลา คำเชื่อม และแหล่งอ้างอิง |
| 2 | `02-teaching-notes-before-speaking.md` | บทเรียนจากศูนย์และคำอธิบายกลไกที่ต้องเข้าใจก่อนพูด |
| 3 | `03-source-mapping-and-evidence.md` | ตารางจับคู่ข้อความกับ lecture, textbook, datasheet, URL, หน้า และบรรทัด |
| 4 | `04-technical-glossary-and-qa.md` | อภิธานศัพท์เชิงเทคนิคและแนวตอบคำถามหลังนำเสนอ |
| 5 | `05-rehearsal-and-final-checklist.md` | ตารางซ้อมพูด การควบคุมเวลา และการตรวจตามเกณฑ์ coursework |

## ขอบเขตทางวิชาการ

สไลด์ใช้กรอบแนวคิด interrupt แบบทั่วไป และอ้างอิงตัวอย่างจาก AVR กับ ARM ขณะที่ lecture 1–4 ของรายวิชาเน้นสถาปัตยกรรม 8051/MCS-51 ดังนั้นเอกสารนี้จะแยกให้ชัดเจนว่าเนื้อหาใดเป็นหลักการร่วม และเนื้อหาใดเป็นพฤติกรรมเฉพาะของ 8051, AVR หรือ Cortex-M3 ไม่ควรนำ vector address, register name หรือคำสั่ง return ของสถาปัตยกรรมหนึ่งไปกล่าวว่าเป็นของอีกสถาปัตยกรรมหนึ่ง

## วิธีใช้

ควรอ่านไฟล์ที่ 02 ก่อนท่องบทพูด จากนั้นอ่านไฟล์ที่ 03 เพื่อเห็นหลักฐาน แล้วฝึกพูดจากไฟล์ที่ 01 โดยพยายามมองเฉพาะหัวข้อย่อ ไม่อ่านทั้งย่อหน้า การนำเสนอฉบับนี้ออกแบบให้ใช้เวลาประมาณ 2 นาที 25 วินาที ซึ่งอยู่ในช่วง 2:00–2:59 นาทีตามข้อกำหนดที่ตรวจสอบจาก Course Work.pdf

> หมายเหตุสำคัญ: เอกสารนี้มุ่งให้การนำเสนอมีความถูกต้องและตรวจสอบได้ ไม่สามารถรับประกันคะแนนเต็มแทนการซ้อม น้ำเสียง การออกเสียง และการตอบคำถามจริงของผู้พูดได้

## ไฟล์ต้นฉบับที่ใช้ตรวจสอบ

- `../interrupt-mechanism-coursework.pdf`
- `../assignment/Course Work.pdf`
- `../../lecture/lecture1-markdown/lecture1_complete.md`
- `../../lecture/lecture2-markdown/lecture2_complete.md`
- `../../lecture/lecture3-markdown/lecture3_complete.md`
- `../../lecture/lecture4-markdown/lecture4_complete.md`
- `../../textbook/avr-mazidi-markdown/ch10_avr_interrupt_programming_in_assembly_and_c.md`
- `../../textbook/atmega328p-datasheet-markdown/ch02_clock_power_reset_interrupts.md`
