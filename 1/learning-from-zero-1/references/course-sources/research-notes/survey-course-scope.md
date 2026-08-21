# ผลสำรวจขอบเขตวิชา Embedded System (Lecture 1–4)

## 1. ขอบเขตการสอนของอาจารย์

### Lecture 1: ภาพรวม Embedded System และพื้นฐานสถาปัตยกรรม
Lecture 1 เริ่มจากนิยามระบบฝังตัวในฐานะการรวม hardware และ software เพื่อทำงานเฉพาะภายใต้ข้อจำกัดด้านเวลา จากนั้นกล่าวถึง building blocks ได้แก่ input, sensor, touch panel, button, wireless/IR, output, LED/LCD, power supply, controller, ROM, RAM, ALU, control unit, code memory, runtime data memory และ clock/frequency generation. เนื้อหาต่อด้วยตัวอย่างการใช้งานและคุณลักษณะสำคัญ เช่น real-time operation, ต้นทุน, กำลังไฟฟ้า, memory จำกัด และ processor ที่เลือกให้เหมาะกับงาน.

Lecture 1 เปรียบเทียบ general-purpose computer กับ embedded system และอธิบาย microprocessor กับ microcontroller ผ่าน block diagram. เนื้อหาสถาปัตยกรรมที่อาจารย์เน้น ได้แก่ Von Neumann กับ Harvard, RISC กับ CISC, ภาพรวม 8051, crystal oscillator, data/address bus, memory organization, program counter, stack pointer, register และ instruction cycle. จุดสำคัญต่อหัวข้อ interrupt คือ microcontroller มี interrupt controller/interrupt inputs และต้องเข้าใจ CPU, memory, register, clock และ stack ก่อน.

### Lecture 2: 8051 pin diagram และ PSW
Lecture 2 เจาะลึก 8051 แบบ 40-pin DIP: VCC, GND, Port 0–3, XTAL1/XTAL2, RST, EA/VPP, ALE/PROG, PSEN และ alternate functions ของ Port 3 ได้แก่ RXD, TXD, INT0, INT1, T0, T1, WR และ RD. เอกสารระบุคุณลักษณะของ 8051 เช่น ALU/data lines 8-bit, address bus 16-bit, internal program ROM 4 KB, internal RAM 128 bytes, timers, serial port และ interrupt sources.

ส่วนท้ายอธิบาย PSW: carry flag, auxiliary carry, user flag, register-bank selection bits RS1/RS0, overflow flag และ parity flag. ความรู้ส่วนนี้จำเป็นต่อการเข้าใจ context/state ที่ ISR อาจเปลี่ยนแปลงและ register bank ของ 8051.

### Lecture 3: memory organization, stack และ SFR
Lecture 3 อธิบายพื้นที่ memory ของ 8051 ได้แก่ internal program ROM, internal data RAM, external program ROM และ external data RAM; อธิบาย internal RAM 00H–7FH เป็น register banks 00H–1FH, bit-addressable area 20H–2FH และ general-purpose/scratchpad RAM 30H–7FH. อธิบาย stack แบบ LIFO, SP, PUSH/POP, การเก็บ return address และการตั้งค่า SP.

Lecture 3 อธิบาย SFR 80H–FFH และระบุ registers ที่เกี่ยวกับ interrupt ได้แก่ IE ที่ A8H และ IP ที่ B8H รวมถึง A, B, PSW, SP, DPTR, ports, SCON/SBUF, TCON/TMOD และ timer registers. ส่วนนี้เป็นสะพานตรงไปสู่ interrupt enable, priority, flag และการควบคุม peripheral.

### Lecture 4: toolchain และ 8051 instruction/addressing/control flow
Lecture 4 อธิบาย editor → source file → compiler/assembler → object file → linker/library → executable file → loader/memory. ต่อด้วย binary/decimal/hexadecimal, assembler directives ORG/END/EQU/DB, addressing modes (immediate, register, direct, indirect, indexed), data transfer, arithmetic/logical/boolean operations, stack/exchange, jump และ call.

จุดที่ตรงกับ interrupt โดยตรงคือการแยก JMP กับ CALL, การเก็บ return address บน stack ของ CALL, การใช้ RET สำหรับ subroutine และ RETI สำหรับ ISR. เอกสาร lecture ระบุว่า RETI ทำ POP PC, ปรับ SP และ EA=1; ข้อนี้ต้องตรวจสอบกับ datasheet ของชิปเป้าหมายก่อนใช้เป็นข้อเท็จจริงทั่วไป เพราะรายละเอียด RETI และ global interrupt-enable semantics อาจแตกต่างกันตาม 8051 derivative และเอกสารต้นฉบับอาจถอดความคลาดเคลื่อน.

## 2. ขอบเขต coursework

หัวข้อที่เลือกคือ Interrupt Mechanism. งานให้จัดทำ PPTX 4–5 หน้า ได้แก่ ปก 1 หน้า เนื้อหา 2–3 หน้า และอ้างอิง 1 หน้า; รายงาน DOCX 4 หน้า ได้แก่ ปก เนื้อหา 2 หน้า อ้างอิง และภาคผนวกที่ highlight แหล่งข้อมูล. เนื้อหาบนสไลด์เลือกได้ไม่เกิน 2 มิติจากความหมาย/ความเป็นมา, การใช้งาน/ประโยชน์, คุณลักษณะ/องค์ประกอบ, กลไก/การทำงาน และตัวอย่างเทคโนโลยี. ทุกหัวข้อต้องมีการอ้างอิง, ห้ามคัดลอกข้อความหรือรูปโดยตรง และต้องมีรูปอธิบายอย่างน้อย 1 รูป.

สำหรับการนำเสนอแบบสั้น จุดมุ่งหมายไม่ใช่ใส่รายละเอียดทั้งหมดลงสไลด์ แต่ต้องมีเอกสารเรียนแยกต่างหากเพื่อให้ผู้เรียนเข้าใจเหตุผลและตอบคำถามได้. โครงที่เหมาะสมสำหรับหัวข้อนี้คือเลือกสองมิติ ได้แก่ (1) คุณลักษณะและองค์ประกอบ และ (2) กลไกและการทำงาน.

## 3. สายโซ่ความรู้ที่ต้องสอนก่อน Interrupt Mechanism

ต้องปูพื้นตามลำดับต่อไปนี้: ระบบฝังตัวและ real-time → microcontroller กับ CPU/peripheral → clock และ machine cycle → register/memory address → 8051 pin multiplexing และ Port 3 → SFR และ bit addressing → stack/SP/return address → control flow CALL/RET → interrupt source, flag, enable, priority → vector/ISR → context preservation → RETI และ latency.

## 4. แหล่งอ้างอิงภายใน ZIP ที่พบ

เอกสารหลักคือ lecture1–4 markdown และภาพที่สกัดไว้ในแต่ละโฟลเดอร์. แหล่งประกอบมี AVR Mazidi, ATmega328P datasheet, ARM Cortex-M3 Definitive Guide, ARM RTOS/Cortex-M และหนังสือ Berkeley Cyber-Physical Embedded Systems. ไม่มีหนังสือ 8051 เฉพาะเล่มที่เห็นเป็นชุดหลักในโฟลเดอร์ textbook ดังนั้นเอกสารฉบับสอนต้องใช้ lecture เป็น primary course source และใช้ datasheet/คู่มือผู้ผลิต 8051 ที่ตรงรุ่นเป็น authority สำหรับข้อเท็จจริงระดับ register และ timing.

## 5. ประเด็นที่ต้องตรวจสอบและแก้ให้ชัดในเอกสารสอน

คำว่า Harvard ใน lecture ควรอธิบายอย่างระมัดระวังว่า 8051 แบบดั้งเดิมมี code space และ data space แยกกันในเชิง address space/สัญญาณ access แต่รายละเอียดภายในและ derivative อาจเรียกว่า modified Harvard ตาม implementation. คำว่า 12 MHz ต้องระบุว่าเป็นคุณลักษณะของรุ่นหรือสไลด์ตัวอย่าง ไม่ใช่กฎของ 8051 ทุกตัว. จำนวน interrupt sources, vector addresses, IE/IP bit definitions, trigger mode และพฤติกรรม RETI ต้องอ้างอิง datasheet ของ device family ที่เลือก.

## 6. สไลด์ version 2 ที่วิเคราะห์

สไลด์มี 5 หน้า: ปก, นิยาม interrupt ในฐานะการถ่ายโอนการควบคุมตามเหตุการณ์, การตอบสนอง 3 ระยะ, state/latency และ references. จุดแข็งคือโครงเรื่องสั้นและเหมาะกับการพูดสองนาที. จุดที่เอกสารเรียนต้องเสริมคือการทำให้คำว่า event, request/flag, enable, priority, vector, ISR, stack/context และ return semantics เป็นกระบวนการที่ตรวจสอบได้ ไม่ใช่เพียงถ้อยคำเชิงแนวคิด.
