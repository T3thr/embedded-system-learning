# แผนการเรียน 24 ชั่วโมงและ 3 วัน

เอกสารชุดนี้ตั้งใจให้เรียนได้ต่อเนื่อง แต่ไม่ควรนั่งอ่านแบบรับข้อมูลอย่างเดียว. ทุกช่วงควรสลับระหว่างอ่าน วาด state trace อธิบายด้วยคำตนเอง และทำแบบฝึกหัด. เวลาที่ระบุเป็นเวลาศึกษาโดยประมาณ ไม่รวมพัก.

## 1. แผนเร่งรัด 24 ชั่วโมง

| ชั่วโมง | หัวข้อ | ผลลัพธ์ที่ต้องทำได้ |
|---:|---|---|
| 1 | ปฐมนิเทศและภาพรวม | อธิบาย embedded system, MCU, firmware และเหตุผลที่ต้องสนใจ timing |
| 2–3 | prerequisite: binary, hex, bit/byte, logic | แปลงฐานและอ่าน bit field ได้ |
| 4–5 | CPU, ALU, register, PC, SP, instruction | trace fetch/execute และอธิบาย PC ได้ |
| 6–7 | 8051 block, pins, ports, clock | อ่าน pinout และแยก GPIO/alternate function ได้ |
| 8–9 | memory spaces, RAM, SFR, register bank | อ่าน memory map และอธิบาย PSW/RS bits ได้ |
| 10 | addressing modes | แปลความหมาย `#`, direct, indirect, indexed ได้ |
| 11–12 | stack, CALL, return address | คำนวณ SP และลำดับ push/pop ได้ |
| 13 | timer/counter และ clock | คำนวณ machine cycle และ overflow แบบมีสมมติฐาน |
| 14 | polling เทียบ interrupt | เลือกวิธีให้เหมาะกับ deadline และ CPU budget |
| 15–16 | flag, enable, EA, IE, IP | อธิบาย request eligibility เป็นสมการเชิงตรรกะได้ |
| 17 | vector table | จำ mapping classic 8051 พร้อมข้อจำกัด derivative ได้ |
| 18–19 | acceptance และ latency | อธิบาย polling boundary/current instruction/block ได้ |
| 20 | ISR และ context | เขียน pseudocode save/service/restore ได้ |
| 21 | RET vs RETI | อธิบายความต่างเชิง architectural semantics ได้ |
| 22 | timer/external/serial case study | trace source หนึ่งตั้งแต่ event ถึง main resume ได้ |
| 23 | coursework rehearsal | พูด presentation 90 วินาทีโดยไม่อ่านสคริปต์ |
| 24 | แบบฝึกหัดและทบทวน | ทำข้อ 1–25 และระบุจุดที่ยังสับสนได้ |

## 2. แผน 3 วันแบบไม่เร่งเกินไป

### วันแรก: รากฐานและสถาปัตยกรรม

อ่านบท 0–2 และบท 7 เฉพาะคำศัพท์ชั้นระบบ อุปกรณ์ CPU และ memory. วาดภาพ `embedded-system-context`, `8051-memory-spaces` และทำแบบฝึกหัดข้อ 1–9. เมื่อจบวันต้องตอบได้ว่า MCU ต่างจาก CPU อย่างไร, PC/SP/A/PSW ทำหน้าที่อะไร, address space แยกอย่างไร และเหตุใด 8-bit ไม่ได้หมายถึง address 8-bit.

### วันที่สอง: เวลา, peripheral และ interrupt mechanism

อ่านบท 3–5 โดยเปิดภาพ lecture ควบคู่. ทำความเข้าใจ timer/counter, SFR, IE/IP/TCON, flag, enable, priority, polling, vector และ stack. วาด `interrupt-causal-chain`, `interrupt-vector-table`, `stack-on-interrupt` และ `timer-to-interrupt` ด้วยมือ. ทำแบบฝึกหัดข้อ 10–19. เมื่อจบวันต้อง trace timer interrupt ได้ตั้งแต่ overflow ถึง RETI.

### วันที่สาม: การสังเคราะห์และ coursework

อ่านบท 6–8, ทำแบบฝึกหัดข้อ 20–25, ซ้อมสคริปต์ 90 วินาทีและตอบคำถามคาดการณ์. จากนั้นทำ presentation rehearsal สามรอบ: รอบแรกดูเอกสาร, รอบสองดูเฉพาะ diagram, รอบสามไม่ดูเอกสาร. ตรวจว่าพูดแยก event/flag/request/acceptance ได้ และตอบประเด็น RETI/EA ด้วยถ้อยคำที่ไม่เหมารวม.

## 3. วิธีอ่านหนึ่งบทให้เข้าใจลึก

รอบแรกอ่านเพื่อจับคำถามใหญ่: บทนี้แก้ปัญหาอะไร. รอบสองอ่านพร้อมเขียน state table: ก่อน event, หลัง flag, หลัง acceptance, ระหว่าง ISR และหลัง RETI. รอบสามปิดเอกสารแล้วอธิบายด้วยภาษาตนเอง. หากติดคำ ให้เปิดอภิธานศัพท์และย้อนกลับไป prerequisite ที่คำนี้พึ่งพา.

## 4. จุดตรวจความเข้าใจ

| จุดตรวจ | คำถามที่ต้องตอบโดยไม่เปิดเอกสาร |
|---|---|
| A | ถ้า flag set แต่ EA=0 ระบบอยู่สถานะใด |
| B | Hardware รับรองการ save state ใดเมื่อรับ interrupt |
| C | ทำไม serial vector ต้องตรวจ RI/TI |
| D | ทำไม RETI ไม่ควรอธิบายว่าเป็น RET ธรรมดา |
| E | ทำไม timer period กับ interrupt latency ไม่เท่ากัน |
| F | ถ้า SP ไม่กลับค่าเดิมหลัง ISR ต้องสงสัยอะไร |
| G | ถ้าชิปไม่ใช่ classic MCS-51 ต้องตรวจเอกสารใด |

## 5. วิธีใช้เวลาเพิ่มหลังครบ 24 ชั่วโมง

หากต้องการเรียนต่อสามวันเต็ม ให้ใช้เวลาที่เหลือทำ trace หลายกรณี: interrupt เกิดตอน main instruction สั้น/ยาว, interrupt ซ้อน priority สูง, serial RI/TI พร้อมกัน, timer flag ค้าง, external level-trigger ค้าง และ stack ใกล้ชน buffer. อย่าเพิ่มการท่อง register โดยไม่ผูกกับ state transition.
