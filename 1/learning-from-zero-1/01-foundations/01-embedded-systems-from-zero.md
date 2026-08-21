# บทที่ 1: Embedded Systems จากศูนย์

## 1.1 คำว่า system หมายถึงอะไร

คำว่า **ระบบ** ในวิศวกรรมหมายถึงองค์ประกอบหลายส่วนที่มีความสัมพันธ์กันเพื่อเปลี่ยน input ให้เป็น output ภายใต้เงื่อนไขบางอย่าง. เครื่องวัดอุณหภูมิรับอุณหภูมิจริงเป็น input, แปลงด้วย sensor และวงจร interface, ประมวลผลด้วย controller, แล้วแสดงผลหรือสั่งพัดลมเป็น output. การมองเป็นระบบช่วยไม่ให้เราเริ่มจากคำสั่ง `MOV` โดยไม่รู้ว่าคำสั่งนั้นมีหน้าที่อยู่ในห่วงโซ่อะไร.

## 1.2 Embedded system คืออะไร

> **Embedded system** คือระบบคอมพิวเตอร์ที่ถูกสร้างหรือฝังอยู่ภายในผลิตภัณฑ์หรือระบบที่ใหญ่กว่า เพื่อทำหน้าที่เฉพาะหรือกลุ่มหน้าที่ที่กำหนดไว้ ภายใต้ข้อจำกัดด้านทรัพยากร เวลา พลังงาน ต้นทุน และความน่าเชื่อถือ [1].

คำว่า “ฝังตัว” ไม่ได้หมายความว่าอุปกรณ์ต้องเล็กเสมอไป แต่หมายถึงคอมพิวเตอร์ไม่ใช่ผลิตภัณฑ์ที่ผู้ใช้ซื้อมาเพื่อรันโปรแกรมทั่วไปโดยตรง. ในเครื่องซักผ้า controller ทำหน้าที่ควบคุมลำดับการเติมน้ำ หมุน และระบายน้ำ; ในรถยนต์ controller อ่าน sensor แล้วควบคุม actuator; ในอุปกรณ์วัด controller ทำให้สัญญาณไฟฟ้ากลายเป็นค่าที่ผู้ใช้เข้าใจ.

| มิติ | คอมพิวเตอร์ทั่วไป | Embedded system |
|---|---|---|
| เป้าหมาย | รองรับงานหลายชนิด | ทำหน้าที่เฉพาะที่กำหนด |
| ทรัพยากร | มักมีหน่วยความจำและพลังงานมากกว่า | ถูกจำกัดและต้องออกแบบให้พอ |
| เวลา | latency มีผลแต่ไม่เสมอไป | deadline อาจเป็นเงื่อนไขความถูกต้อง |
| การเชื่อมต่อ | ผู้ใช้สั่งผ่าน OS/UI | sensor, actuator และสัญญาณไฟฟ้า |
| ซอฟต์แวร์ | application บน OS | firmware ใกล้ฮาร์ดแวร์ |
| ความผิดพลาด | โปรแกรมค้างอาจเปิดใหม่ | อาจทำให้เครื่องจักรเสียหายหรือไม่ปลอดภัย |

## 1.3 Microprocessor, microcontroller และ SoC

**Microprocessor** โดยทั่วไปหมายถึงชิปที่เน้น CPU และพึ่งพาชิปภายนอกสำหรับ RAM, ROM และ peripheral. **Microcontroller (MCU)** รวม CPU, memory และ peripheral หลายชนิดไว้บนชิปเดียว เช่น port, timer, serial interface และ interrupt control. 8051 จึงเป็นตัวอย่างคลาสสิกของ MCU: มี CPU 8 บิต, program memory ตามรุ่น, internal data RAM, I/O ports, timer, serial port และ interrupt mechanism [2] [3].

**System-on-Chip (SoC)** เป็นคำกว้างกว่าที่อาจรวม CPU หลายคอร์, memory controller, accelerator, radio และ peripheral ที่ซับซ้อน. เส้นแบ่งระหว่าง MCU กับ SoC ไม่ได้แข็งตัว แต่หลักการที่ต้องจำคือ เรากำลังศึกษาความสัมพันธ์ระหว่าง **core ที่ execute instruction** กับ **peripheral ที่สัมผัสโลกจริง**.

## 1.4 CPU ทำอะไรจริง ๆ

CPU ไม่ได้ “เข้าใจ” sensor หรือ LED โดยตรง. CPU ทำงานกับ bit pattern ใน register และ memory ตาม instruction. ลำดับพื้นฐานคือ fetch instruction จาก program memory ผ่าน program counter (PC), decode ว่า opcode หมายถึงอะไร, read operand, execute operation, update flags/registers และเลื่อนไป instruction ถัดไป. หาก instruction เป็น branch หรือ call ค่า PC จะเปลี่ยนตามกติกาของ instruction.

ตัวอย่างเชิงแนวคิด:

```text
PC = 0100H
memory[0100H] = opcode ของ MOV A,#25H
CPU fetch opcode และ byte operand
A ← 25H
PC ← 0102H  ; สมมติ instruction มี 2 bytes
```

ค่า `25H` ในตัวอย่างเป็น data ไม่ใช่ address. ถ้าเขียน `MOV A,25H` ความหมายเปลี่ยนเป็นอ่านค่าจาก data address 25H. ความแตกต่างนี้จะถูกขยายในบท addressing mode.

## 1.5 Memory ไม่ใช่เพียง “ที่เก็บข้อมูล”

หน่วยความจำใน MCU มีบทบาทอย่างน้อยสามแบบ. Program memory เก็บ instruction และค่าคงที่; data memory เก็บตัวแปร, stack และสถานะชั่วคราว; SFR ทำหน้าที่เป็นจุดควบคุมและสถานะของ peripheral. เมื่อ software เขียนบิตใน SFR จึงอาจทำให้ขาไฟฟ้าเปลี่ยน, เปิด timer หรืออนุญาต interrupt ได้.

ใน classic 8051 มีแนวคิด Harvard architecture คือ program memory และ data memory เป็น address space ที่แยกกัน [2]. คำว่า “แยก” ไม่ได้หมายความว่ามีเพียงชิปสองตัว แต่หมายถึง CPU ใช้กลไกและคำสั่งคนละแบบในการเข้าถึง code memory กับ data memory. นี่เป็นเหตุผลที่มี `MOVC` สำหรับอ่าน code memory และ `MOVX` สำหรับ external data memory.

## 1.6 I/O: ทำไม pin จึงเป็นทั้ง software และ electronics

Port pin เป็นจุดที่โลกไฟฟ้าเข้าสู่ register หรือ register ออกไปขับวงจร. เมื่ออ่าน pin เราต้องคิดถึง voltage level, input buffer, pull-up, load และ timing; เมื่อเขียน port เราต้องคิดถึง output driver, current และอุปกรณ์ภายนอก. ใน 8051 บาง pin มี alternate function เช่น P3.2 เป็น INT0, P3.3 เป็น INT1, P3.4 เป็น T0 และ P3.5 เป็น T1 ตาม pin description ของตระกูล 8051 [3]. ดังนั้นการใช้ pin เป็น GPIO หรือเป็น interrupt input เป็นการเลือกโหมดการใช้ทรัพยากรเดียวกัน ไม่ใช่การสร้าง pin ใหม่.

## 1.7 เวลาใน embedded system

คำตอบของ embedded system ไม่ได้มีเพียง “ถูกหรือผิด” แต่มี “ถูกทันเวลาหรือไม่” ด้วย. **Latency** คือเวลาตั้งแต่ event เกิดจน system เริ่มตอบสนอง; **execution time** คือเวลาที่ routine ใช้ทำงาน; **deadline** คือเวลาสูงสุดที่ผลลัพธ์ยังถือว่าทัน; **jitter** คือความแปรปรวนของเวลาตอบสนอง. Interrupt ช่วยลดการเสียเวลาตรวจ polling อย่างต่อเนื่อง แต่ไม่ได้ทำให้ latency เป็นศูนย์ เพราะ CPU ต้องรอ polling boundary, current instruction, priority และเงื่อนไข enable.

## 1.8 Firmware และเครื่องมือพัฒนา

Firmware คือซอฟต์แวร์ที่ออกแบบให้ทำงานใกล้ฮาร์ดแวร์และมักถูกเก็บใน non-volatile program memory. workflow พื้นฐานจาก source ไปสู่ MCU คือ editor → source file → compiler หรือ assembler → object file → linker/library → executable/hex file → loader/programmer → memory ของ MCU. Compiler แปลงภาษาระดับสูง, assembler แปลง assembly, linker รวม object และแก้ symbol/address, loader/programmer นำผลลัพธ์ไปวางใน memory.

การรู้ workflow สำคัญต่อการ debug. หาก source ถูกต้องแต่ linker script วาง vector ผิด address, interrupt ก็ยังไม่ทำงาน. หาก hex ถูกต้องแต่ `EA` ไม่ถูก enable, hardware event ก็ยังไม่ถูกส่งเข้า CPU. ปัญหา embedded จึงต้องแยกเป็น software syntax, binary layout, register configuration, electrical signal และ timing.

## 1.9 prerequisite ที่ควรทบทวน

### เลขฐานและขนาดข้อมูล

หนึ่ง bit มีค่า 0 หรือ 1; 8 bits คือ 1 byte; 16 bits สามารถแทนค่า unsigned ได้ตั้งแต่ 0 ถึง 65535 หรือ `0000H` ถึง `FFFFH`. การอ่าน `23H` ต้องเข้าใจว่าเป็นค่าฐานสิบหก 35 ในฐานสิบ ไม่ใช่ address เสมอไป. ความหมายขึ้นกับตำแหน่งที่เขียนใน instruction.

### Boolean และ bit logic

AND ใช้ตรวจว่าทุกเงื่อนไขเป็นจริง, OR ใช้รวมทางเลือก, XOR ใช้ตรวจความแตกต่าง, NOT กลับค่า. Register control มักประกอบด้วย bit ที่แต่ละ bit มีหน้าที่คนละอย่าง เช่น `EA`, `ET0`, `EX0`; การตั้งค่า register จึงต้องระวังไม่เขียนทับ bit อื่นโดยไม่ตั้งใจ.

### Address กับ data

Address คือ “สถานที่”; data คือ “สิ่งที่อยู่ ณ สถานที่”. `MOV A,#20H` หมายถึงเอาค่า 20H มาใส่ A; `MOV A,20H` หมายถึงอ่าน content ที่ address 20H. ความสับสนนี้ทำให้การอธิบาย stack และ SFR ผิดได้ทันที.

### Stack และ function call

Stack เป็นโครงสร้าง LIFO: สิ่งที่ push ล่าสุดจะถูก pop ก่อน. Function call ต้องเก็บ return address เพื่อกลับไปยัง caller. Interrupt ก็ต้องเก็บจุดที่โปรแกรมถูกขัดจังหวะไว้เช่นกัน แต่ interrupt มี state ของ interrupt controller เพิ่มจาก subroutine ธรรมดา จึงต้องใช้ `RETI` ไม่ใช่สรุปว่าเป็น `RET` ที่ชื่อแตกต่างเฉย ๆ.

## 1.10 แบบจำลอง mental model ที่ต้องรักษา

ให้คิดว่า 8051 มีสามโลกที่ทำงานพร้อมกันแต่เชื่อมกันด้วย register: **โลกไฟฟ้า** มี voltage และ transition, **โลกฮาร์ดแวร์** มี latch, flag, counter, priority และ bus, และ **โลกซอฟต์แวร์** มี instruction, label, ISR และ state. เหตุการณ์ interrupt คือการข้ามจากโลกไฟฟ้าหรือ peripheral ไปสู่ control flow ของ CPU ผ่านสะพานที่เรียกว่า interrupt controller.

## คำถามตรวจความเข้าใจ

1. ทำไม MCU จึงเหมาะกับเครื่องใช้ไฟฟ้าเฉพาะหน้าที่มากกว่า microprocessor ที่ไม่มี peripheral ในตัว
2. ถ้า input pin เป็น P3.2 ของ 8051 ทำไมการใช้งาน INT0 จึงเกี่ยวข้องกับทั้งวงจรไฟฟ้า, TCON และ IE
3. จงอธิบายความแตกต่างระหว่าง `#25H`, `25H` และ `@R0`
4. เหตุใด latency ของ interrupt จึงไม่เท่ากับศูนย์ แม้ flag จะถูก set แล้ว
5. ถ้า instruction และ data ใช้ address space เดียวกัน เราเรียก architecture นั้นว่าอะไร และ 8051 classic มีลักษณะอย่างไร

## References

[1]: https://users.ece.utexas.edu/~valvano/mspm0/ebook/Ch1_Introduction.html "Valvano and Yerraballi, Introduction to Embedded Systems"
[2]: https://cos.colorado.edu/Documents/DCE/BOOT/8051_Manual.pdf "Intel, MCS-51 Microcontroller Family User’s Manual"
[3]: https://www.nxp.com/docs/en/data-sheet/8XC51_8XC52.pdf "NXP/Philips, 8XC51/8XC52 Product Specification"
