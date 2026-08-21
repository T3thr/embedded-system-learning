# บทที่ 7: อภิธานศัพท์ Embedded Systems และ 8051

บทนี้ใช้เป็นพจนานุกรมระหว่างอ่านบทอื่น. คำศัพท์ถูกจัดตามชั้นของระบบ เพื่อเห็นว่าคำใดอธิบายโลกจริง คำใดอธิบายวงจร และคำใดอธิบาย instruction/control flow.

## 7.1 ชั้นระบบ

**Embedded system** คือระบบคอมพิวเตอร์ที่ถูกฝังอยู่ในผลิตภัณฑ์หรือระบบที่มีหน้าที่เฉพาะ โดยมีข้อจำกัดด้านพลังงาน ต้นทุน ขนาด เวลา และความน่าเชื่อถือ. Embedded ไม่ได้แปลว่าเล็กเสมอไป; เครื่องยนต์ รถยนต์ และอุปกรณ์เครือข่ายก็เป็น embedded system ได้.

**Application domain** คือบริบทงาน เช่น เครื่องซักผ้า, sensor node, medical device หรือ robot. Domain กำหนดข้อกำหนด เช่น latency, safety, power และ cost.

**Requirement** คือสิ่งที่ระบบต้องทำหรือข้อจำกัดที่ต้องรักษา. **Functional requirement** บอก behavior; **non-functional requirement** บอกเวลา พลังงาน ความน่าเชื่อถือ ความปลอดภัย และต้นทุน.

**Real-time system** คือระบบที่ความถูกต้องขึ้นกับทั้งค่าผลลัพธ์และเวลาที่ผลลัพธ์เกิด. **Hard real-time** พลาด deadline แล้วถือว่าผิดร้ายแรง; **soft real-time** พลาดแล้วคุณภาพลดลงแต่ระบบอาจไปต่อ.

**Firmware** คือซอฟต์แวร์ระดับใกล้ฮาร์ดแวร์ที่เก็บใน non-volatile memory หรือโหลดให้ device ทำงาน. Firmware รวม startup, driver, ISR, control logic และ application code ตาม design.

## 7.2 ชั้นอุปกรณ์

**Microcontroller (MCU)** คือ integrated circuit ที่รวม CPU, memory, GPIO, timer, serial และ peripheral อื่นบนชิปเดียว เพื่อควบคุมงานเฉพาะ.

**Microprocessor (MPU)** มักหมายถึง CPU ที่ต้องใช้ชิปหรือวงจรภายนอกสำหรับ memory/peripheral มากกว่า MCU. ขอบเขตคำอาจทับซ้อนตามยุคและผู้ผลิต.

**System-on-Chip (SoC)** รวม processing cores และ subsystem จำนวนมากบนชิป; MCU เป็น SoC ชนิดหนึ่งในมุมกว้าง แต่ในงานสอนมักใช้ MCU เพื่อเน้น control-oriented embedded.

**CPU** คือหน่วยประมวลผลที่ fetch, decode และ execute instruction.

**Core** คือหน่วยประมวลผลหนึ่งชุดภายใน CPU/SoC. MCU multicore มีหลาย core ซึ่งเพิ่ม concurrency และความซับซ้อนในการ shared state.

**Peripheral** คือวงจรช่วยบนชิป เช่น timer, UART/serial, ADC, PWM, GPIO และ interrupt controller.

**GPIO** คือ General-Purpose Input/Output ขาที่ software ตั้งเป็น input หรือ output และอ่าน/ขับระดับ logic.

**Pin** คือขาทางกายภาพของแพ็กเกจ; **port bit** คือชื่อเชิง logic เช่น P3.2; **alternate function** คือการ multiplex ขาเดียวให้ทำงานเป็น GPIO หรือ serial/timer/external interrupt.

**Sensor** แปลงปริมาณทางกายภาพเป็นสัญญาณที่ MCU อ่าน; **actuator** แปลงคำสั่งไฟฟ้าเป็นการกระทำ เช่น motor, relay หรือ LED.

## 7.3 ชั้นไฟฟ้าและสัญญาณ

**Logic high/low** คือระดับแรงดันที่วงจรตีความเป็น 1/0 ตาม threshold. ค่า voltage จริงและ current drive ต้องดู electrical characteristics.

**Edge** คือการเปลี่ยนระดับ เช่น rising edge 0→1 หรือ falling edge 1→0. **Level** คือสถานะคงอยู่ เช่น pin ยังค้าง low.

**Debounce** คือการจัดการการสั่นของหน้าสัมผัสปุ่มหรือสัญญาณที่เปลี่ยนหลายครั้งในช่วงสั้น. ทำได้ด้วยวงจร RC/Schmitt trigger หรือ software time filter.

**Metastability** คือสถานะที่ flip-flop ใช้เวลาตัดสินใจเมื่อ input เปลี่ยนใกล้ sampling edge. Synchronizer และการออกแบบ timing ช่วยลดความเสี่ยง แต่ไม่ทำให้ probability เป็นศูนย์.

## 7.4 ชั้นข้อมูลและเลขฐาน

**Bit** มีค่า 0 หรือ 1. **Nibble** คือ 4 bits. **Byte** ใน 8051 คือ 8 bits. **Word** เป็นคำที่ขึ้นกับ architecture; ใน 8051 มักใช้พูดถึงข้อมูล/address ที่ใหญ่กว่า byte จึงต้องดูบริบท.

**Binary** ใช้ฐาน 2; **decimal** ฐาน 10; **hexadecimal** ฐาน 16. เลข `15H` คือ hexadecimal 0x15 ไม่ใช่ decimal 15. หนึ่ง hex digit แทน 4 bits.

**Unsigned** แทนค่าบวกและศูนย์; **signed two’s complement** แทนค่าบวก/ลบในจำนวนบิตเท่ากัน. Carry และ overflow เป็นคนละแนวคิด: carry เกี่ยวกับการล้นใน arithmetic แบบ unsigned; overflow เกี่ยวกับผล signed เกินช่วง.

**Endianness** คือการจัดลำดับ byte ของค่าหลาย byte ใน memory. เมื่อ trace PC หรือ 16-bit data ต้องยึดสถาปัตยกรรมว่าผลัก high/low byte ตามลำดับใด.

## 7.5 ชั้น CPU และ instruction

**Instruction** คือคำสั่ง machine-level ที่ CPU execute. **Opcode** คือส่วนที่บอก operation; operand ระบุข้อมูล/register/address ที่เกี่ยวข้อง.

**Fetch** คือการอ่าน instruction จาก code memory ตาม PC. **Decode** คือการตีความ opcode. **Execute** คือการทำ operation และปรับ state.

**ALU** ทำ arithmetic และ logic. **Accumulator (A)** เป็น register หลักที่ใช้กับ operation จำนวนมาก.

**Register** คือ storage ขนาดเล็กและเร็วใน CPU/peripheral. **Register bank** คือชุด registers ที่ map จากชื่อเดียวกันไปยังตำแหน่ง RAM ต่างกัน.

**PC (Program Counter)** ชี้ address ของ instruction ถัดไป. **SP (Stack Pointer)** ชี้ตำแหน่งใช้งานบน stack. **DPTR (Data Pointer)** เป็น pointer 16 บิตของ 8051. **PSW** เก็บ flags และ register-bank selection.

**Branch/jump** เปลี่ยน control flow โดยเขียน PC ใหม่. **CALL** เรียก subroutine และเก็บ return address. **Return address** คือ address ที่ใช้กลับไปทำงานต่อหลัง call/interrupt.

## 7.6 ชั้น memory และ address

**Memory map** แสดงว่า address range ใดผูกกับ code memory, RAM, SFR หรือ external space.

**Program/code memory** เก็บ instruction และ constant. **Data memory** เก็บตัวแปรและ runtime state. ใน 8051 สองพื้นที่นี้มี instruction/access semantics ต่างกัน.

**RAM** เป็นหน่วยความจำอ่านเขียนได้; **ROM/Flash** เป็น non-volatile program storage ตาม implementation. **Internal RAM** อยู่บน MCU; **external memory** อยู่นอกชิป.

**SFR** คือ Special Function Register ที่เป็น software interface ให้ peripheral/control logic. การเขียน SFR อาจมี side effect.

**Direct addressing** ระบุ address โดยตรง; **immediate** ระบุ literal ด้วย `#`; **register addressing** ระบุ R-register; **indirect addressing** ให้ register เก็บ address; **indexed addressing** คำนวณ address จาก base/index.

**Stack** เป็นพื้นที่แบบ LIFO สำหรับ return address และ context. **Push** เพิ่ม item; **pop** เอา item ล่าสุดออก. **Stack overflow/collision** เกิดเมื่อ stack ใช้พื้นที่ทับข้อมูลอื่น.

## 7.7 ชั้นเวลาและ peripheral

**Oscillator** สร้าง periodic signal. **Frequency** คือจำนวนรอบต่อวินาที; **period** คือเวลาต่อรอบ.

**Machine cycle** คือหน่วยเวลาที่ architecture ใช้ทำ sequence ของ CPU. จำนวน oscillator periods ต่อ machine cycle ขึ้นกับ derivative.

**Timer** นับ clock ภายใน. **Counter** นับ transition ภายนอก. **Prescaler/clock divider** ลดความถี่ก่อนป้อน timer.

**Overflow** คือการนับเกินค่าสูงสุดของ register แล้ว wrap/reload. **Reload** คือการใส่ค่าเริ่มต้นใหม่เพื่อกำหนดช่วงเวลาถัดไป.

**Latency** คือเวลาจาก event ถึงเริ่มตอบสนอง. **Jitter** คือความแปรผันของ latency/period. **Deadline** คือเวลาสุดท้ายที่ผลลัพธ์ต้องพร้อม.

## 7.8 ชั้น interrupt

**Interrupt request** คือคำขอให้ CPU service event. **Interrupt flag** เป็น bit ที่บันทึก event. **Interrupt enable** อนุญาต source. **Global enable** เช่น EA อนุญาตระดับระบบ.

**Interrupt controller** จัดการ source, gate, priority, pending state และ acceptance. **Priority** เป็นกติกาเมื่อ request แข่งขันกัน.

**Interrupt vector** คือ address entry ของ source. **Vector table** คือชุด mapping source→address.

**ISR/interrupt handler** คือ routine ที่ service interrupt. **Prologue** คือส่วนต้นที่ save context; **epilogue** คือส่วนท้ายที่ restore context และ return.

**Nested interrupt** คือ interrupt ใหม่แทรก ISR เดิมเมื่อ priority policy อนุญาต. **Reentrant code** คือ routine ที่เรียกซ้ำ/ถูกแทรกได้โดยไม่ทำให้ shared state เสีย.

**RETI** คือ interrupt return instruction. **RET** คือ ordinary subroutine return. ทั้งคู่เกี่ยวกับการคืน PC แต่ semantics ต่อ interrupt controller ต่างกัน.

## 7.9 ชั้น concurrency และการ debug

**Main loop** คือ control flow หลักที่ทำงานต่อเนื่อง. **Polling** คือการตรวจ state ซ้ำ ๆ โดย software. **Asynchronous event** เกิดโดยไม่ตรงกับจังหวะที่ main คาด.

**Shared variable** คือข้อมูลที่ main และ ISR เข้าถึงร่วมกัน. **Race condition** เกิดเมื่อผลขึ้นกับลำดับ timing ที่เปลี่ยนได้. **Atomic operation** คือ operation ที่ observer ไม่เห็นสถานะกึ่งกลางในขอบเขตที่กำหนด.

**Volatile** บอก compiler ว่าค่าอาจเปลี่ยนจาก hardware/ISR; ไม่ได้ทำให้ multi-byte access atomic และไม่แทน synchronization.

**Trace** คือการตามค่า state ทีละขั้น. **Breakpoint** หยุด execution; **logic analyzer/oscilloscope** ตรวจสัญญาณเวลา; **watch register** ดูค่า SFR/RAM.

## 7.10 แผนผัง dependency

```text
ไฟฟ้า/สัญญาณ
    ↓
GPIO และ peripheral
    ↓
SFR + flags + enable
    ↓
interrupt controller + priority
    ↓
CPU/PC/stack/vector
    ↓
ISR + context + RETI
    ↓
main loop และ real-time behavior
```

หากยังไม่เข้าใจชั้นหนึ่ง ไม่ควรกระโดดไปท่องชั้นถัดไป. ตัวอย่างเช่น ถ้ายังไม่แยก edge จาก level จะอธิบาย external interrupt flag ซ้ำได้ไม่ถูก; ถ้ายังไม่เข้าใจ stack จะอธิบาย RETI เป็นเพียง “คำสั่งกลับ” ได้ไม่ลึกพอ.
