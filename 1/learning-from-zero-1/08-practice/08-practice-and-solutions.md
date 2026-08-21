# บทที่ 8: แบบฝึกหัดและเฉลยเชิงเหตุผล

หลักของชุดแบบฝึกหัดนี้คือ **ตอบพร้อมเหตุผล** ไม่ใช่ตอบเฉพาะตัวเลข. หากคำตอบขึ้นกับ derivative ให้ระบุสมมติฐานว่าใช้ classic MCS-51.

## ตอนที่ 1: ตรวจความเข้าใจพื้นฐาน

### ข้อ 1
อธิบายความแตกต่างระหว่าง embedded system, microcontroller และ firmware.

**เฉลยแนวคิด:** Embedded system คือระบบผลิตภัณฑ์/งานที่ฝัง computation เพื่อหน้าที่เฉพาะ; microcontroller คือชิปที่รวม CPU, memory และ peripheral; firmware คือซอฟต์แวร์ใกล้ฮาร์ดแวร์ที่ทำให้ชิปทำหน้าที่. ทั้งสามคำอยู่คนละระดับ.

### ข้อ 2
เหตุใด 8-bit MCU จึงยังอ้าง address ได้มากกว่า 256 ตำแหน่ง.

**เฉลยแนวคิด:** จำนวนบิตของ data path ไม่เท่ากับจำนวนบิตของ address path. 8051 ทำ data operation จำนวนมากกับ 8 บิต แต่ PC/DPTR เป็น 16 บิต จึงอ้าง logical program/data address ได้กว้างกว่า.

### ข้อ 3
ถ้า `f_osc=12 MHz` และ architecture ใช้ 12 oscillator periods ต่อ machine cycle จงหา oscillator period และ machine-cycle period.

**เฉลย:** `Tosc=1/12 MHz=83.333 ns`; `Tmc=12×83.333 ns≈1 µs`. หากชิปเป็น 1-clock derivative ค่าที่สองไม่ใช่ 1 µs.

## ตอนที่ 2: Memory และ addressing

### ข้อ 4
อธิบายความต่างของคำสั่งต่อไปนี้ในเชิง operand: `MOV A,#30H`, `MOV A,30H`, `MOV A,@R0`.

**เฉลยแนวคิด:** คำสั่งแรกเอา literal 30H เข้า A; คำสั่งที่สองอ่าน data/SFR ที่ direct address 30H; คำสั่งที่สามใช้ค่าของ R0 เป็น address แล้วอ่าน byte จากตำแหน่งนั้น. `#` เปลี่ยนความหมายจาก address เป็นค่าคงที่.

### ข้อ 5
ทำไม SFR ไม่ควรถูกมองเหมือน RAM ทั่วไป.

**เฉลยแนวคิด:** SFR เป็น interface ของ hardware; การเขียนอาจ start timer, enable source, clear flag หรือเปลี่ยน pin mode. บาง bit read-only, set/clear by hardware หรือมี side effect.

### ข้อ 6
ถ้า PSW เปลี่ยน RS1/RS0 ระหว่าง ISR จะกระทบอะไร.

**เฉลยแนวคิด:** R0–R7 จะ map ไป register bank อื่น. หาก ISR ไม่ restore PSW main อาจอ่าน/เขียน byte คนละชุดและเกิด corruption.

## ตอนที่ 3: Stack และ return address

### ข้อ 7
ให้ `SP=2FH` ก่อน interrupt acceptance. Hardware push PC สอง byte แล้ว ISR push ACC, PSW และ B. ค่า SP หลัง push ทั้งหมดเป็นเท่าใด.

**เฉลย:** PC สอง byteทำให้ `SP=31H`; push ACC → 32H; push PSW → 33H; push B → `34H`. สมมติ classic push behavior เพิ่ม SP ก่อนเขียน.

### ข้อ 8
ลำดับ push คือ ACC, PSW, B. ลำดับ pop ที่ถูกต้องคืออะไร.

**เฉลย:** B, PSW, ACC. Stack เป็น LIFO; pop ผิดลำดับทำให้ register ได้ค่าของ register อื่นแม้ SP สุดท้ายอาจกลับที่เดิม.

### ข้อ 9
เหตุใด hardware จึงไม่ save A และ PSW ให้อัตโนมัติเมื่อรับ interrupt.

**เฉลยแนวคิด:** Hardware architecture รับรอง return PC เพื่อกลับ control flow แต่ไม่รู้ว่า ISR ใช้ register ใดหรือ software calling convention เป็นแบบใด. การ save context อื่นจึงเป็นหน้าที่ของ ISR/compiler.

## ตอนที่ 4: Interrupt logic

### ข้อ 10
เขียนเงื่อนไขขั้นต่ำแบบตรรกะสำหรับ timer interrupt request.

**เฉลย:** `timer_request = overflow_flag AND timer_enable`; `cpu_can_accept = timer_request AND EA AND priority/acceptance conditions`. สมการยังต้องเสริม state ของ ISR และ sampling.

### ข้อ 11
flag เป็น 1 แต่ ISR ไม่ถูกเรียก จงระบุสาเหตุที่เป็นไปได้อย่างน้อยแปดข้อ.

**เฉลย:** source enable ปิด; EA=0; priority ถูก block; high-priority ISR ค้าง; current instruction ยังไม่จบ; vector ไม่ถูก; timer ไม่ได้ run แม้ flag ที่ดูเป็นคนละ source; trigger mode ไม่ตรง; derivative ใช้ register/bit mapping ต่าง; interrupt ถูกปิดในช่วง critical section; flag ถูก clear ก่อน CPU sample; tool ดู register คนละ bank/instance.

### ข้อ 12
อธิบายว่า polling ต่างจาก interrupt อย่างไรในระดับ control flow.

**เฉลยแนวคิด:** Polling ให้ main ตรวจ flag ตามรอบของ software; interrupt ให้ hardware request และ CPU เปลี่ยน PC เมื่อ acceptance conditions ผ่าน. Polling ง่ายกว่าแต่ latency ผูกกับรอบตรวจ; interrupt ประหยัดการตรวจซ้ำแต่เพิ่ม concurrency/stack/priority complexity.

### ข้อ 13
ทำไม serial ISR ต้องตรวจ RI และ TI.

**เฉลย:** classic 8051 ใช้ vector เดียวสำหรับ serial receive และ transmit. RI/TI เป็น flags ย่อยที่บอกสาเหตุ; ISR ต้อง service และ clear flag ที่เกี่ยวข้อง.

## ตอนที่ 5: Vector และ instruction return

### ข้อ 14
จับคู่ classic 8051 source กับ vector: INT0, TF0, INT1, TF1, serial.

**เฉลย:** INT0→0003H; TF0→000BH; INT1→0013H; TF1→001BH; serial→0023H. Reset→0000H.

### ข้อ 15
ทำไม vector มักมี `LJMP` ไป ISR จริง.

**เฉลย:** vector slot มีพื้นที่สั้นและ address ถูกกำหนดตายตัว. `LJMP` ใช้พื้นที่ entry เพียงเล็กน้อยแล้วพา control ไป routine ที่วางที่อื่น.

### ข้อ 16
เปรียบเทียบ RET กับ RETI ในหนึ่งย่อหน้า.

**เฉลย:** RET คืนจาก ordinary subroutine และคืน PC; RETI คืนจาก ISR โดยคืน PC พร้อม signaling ให้ interrupt control logic รู้ว่า interrupt service จบ. จึงไม่ควรใช้แทนกันเพียงเพราะทั้งคู่ทำให้ flow กลับ.

### ข้อ 17
อธิบายอย่างระมัดระวังว่าทำไมคำพูด “RETI enable EA” อาจทำให้เข้าใจผิด.

**เฉลย:** EA เป็น global enable bit ใน IE. Lecture อาจใช้คำย่อเพื่อสื่อว่าระบบพร้อมรับ interrupt ต่อ; architectural semantics ของ RETI คือ completion/return behavior และรายละเอียดการ set EA ต้องอ้าง manual/derivative. ไม่ควรถือว่า RETI เขียน EA=1 แบบ universal.

## ตอนที่ 6: Timer และเวลา

### ข้อ 18
Timer 16 บิตต้องการ 10,000 ticks ต่อ overflow. ค่าเริ่มต้นอุดมคติคือเท่าใด.

**เฉลย:** `R=65536−10000=55536 decimal= D8F0H`. แยกเป็น TH= D8H, TL=F0H หาก mode และการ load ของชิปรองรับรูปแบบนี้. ต้องหัก/ชดเชย software overhead เมื่อทำ timing จริง.

### ข้อ 19
เหตุใด timer period จึงไม่เท่ากับ interrupt latency.

**เฉลย:** period คือระยะห่างระหว่าง overflow; latency คือเวลาจาก overflow ถึงเริ่ม ISR. Latency มี sampling, instruction completion, priority block, vector และ prologue.

## ตอนที่ 7: Debug scenarios

### ข้อ 20
โปรแกรมทำ `SETB EA`, `SETB ET0` แล้ว แต่ timer ISR ไม่เข้า. จงวางแผน debug.

**เฉลยแนวทาง:** ตรวจ oscillator/clock; ตรวจ TMOD mode; ตรวจ TR0; ตรวจ TH0/TL0 เดินหรือไม่; force/observe TF0; ตรวจ vector 000BH และ jump; ตรวจว่า interrupt source เป็น timer0 จริง; ตรวจ IP/in-progress; ตรวจ flag-clear code; toggle GPIO ที่ต้น ISR; ตรวจ linker/map/hex; ใช้ datasheet รุ่นจริง.

### ข้อ 21
กดปุ่มหนึ่งครั้งแต่ ISR ทำงานหลายครั้ง. อธิบายสาเหตุสองกลุ่ม.

**เฉลย:** กลุ่มแรก hardware bounce ทำให้หลาย edge; กลุ่มที่สองเป็น level-triggered input ที่ค้าง active หรือ flag ไม่ถูก clear. แก้ด้วย debounce, trigger mode ที่เหมาะสม, acknowledge flag และตรวจวงจร pull-up/pull-down.

### ข้อ 22
main อ่าน `uint16_t ticks` ขณะ timer ISR เพิ่มค่า ทำไมอาจได้ค่าที่ไม่เคยมีจริง.

**เฉลย:** การอ่านสอง byte อาจถูกแทรกหลังอ่าน byte แรกแต่ก่อนอ่าน byte ที่สอง จึงได้ high จากค่าหนึ่งและ low จากอีกค่า. `volatile` บังคับให้ compiler อ่านจริงแต่ไม่ทำให้ multi-byte read atomic. ใช้ critical section หรือ protocol snapshot.

## ตอนที่ 8: คำถามสังเคราะห์

### ข้อ 23
ออกแบบ causal chain สำหรับ timer 0 ทุกขั้น ตั้งแต่ clock ถึง main event.

**เฉลยโครง:** clock tick → TL0/TH0 increment → overflow → TF0 set → ET0/EA gate → acceptance → PC push → 000BH → LJMP TIMER0_ISR → save context → reload/clear/ack → increment tick flag → restore → RETI → main consumes event.

### ข้อ 24
อธิบายว่าทำไม ISR ควรสั้นในระบบที่มี timer และ serial พร้อมกัน.

**เฉลย:** ISR ยาวเพิ่มเวลาที่ low-priority source รอ, ใช้ stack และ register context มาก, เพิ่ม jitter และทำให้ serial overrun หรือ miss deadline. ISR ควร capture byte/flag แล้วส่งงานหนักให้ main.

### ข้อ 25
เขียนคำตอบแบบนักวิศวกรรมเมื่อพบว่า lecture กับ datasheet ให้ถ้อยคำไม่เหมือนกัน.

**เฉลย:** “Lecture ให้ simplified operational model เพื่อสร้าง intuition; datasheet/manual เป็น authoritative สำหรับ chip/architecture ที่ใช้จริง. ผมจะใช้ model จาก lecture อธิบายภาพรวม แล้วระบุ assumption และตรวจ semantics ที่ขึ้นกับ derivative เช่น vector, flag clear, clock division และ RETI.”

## เกณฑ์ตรวจตนเอง

ตอบแต่ละข้อโดยมีสี่องค์ประกอบ: นิยาม, กลไก, สมมติฐาน/ขอบเขต, และผลกระทบเชิงระบบ. หากตอบได้เฉพาะชื่อ bit แต่ไม่อธิบาย state transition ให้กลับไปอ่านบท 5 และวาด causal chain ใหม่.
