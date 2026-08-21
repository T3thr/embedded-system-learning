# บทที่ 6: เตรียม coursework และ presentation เรื่อง Interrupt Mechanism

## 6.1 เป้าหมายของการนำเสนอ

การนำเสนอที่ดีไม่ใช่การอ่านนิยาม interrupt จากสไลด์ แต่ต้องแสดง causal model ว่า source event เดินทางผ่าน hardware state จนกลายเป็นการเปลี่ยน control flow ได้อย่างไร. ผู้ฟังควรเห็นความสัมพันธ์ระหว่าง pin/peripheral, flag, enable, priority, vector, PC, stack, ISR และ RETI ในภาพเดียว.

โจทย์ coursework ของรายวิชาวาง interrupt mechanism ไว้บนความรู้จาก lecture 1–4. ดังนั้น presentation ไม่ควรเริ่มด้วย `RETI` โดยไม่มีพื้นฐาน; ควรปูคำว่า embedded system, MCU, register, SFR, stack และ program counter สั้น ๆ แล้วเจาะ interrupt.

## 6.2 โครงสร้างการพูดที่แนะนำ

| ส่วน | เวลาโดยประมาณ | สิ่งที่ต้องพิสูจน์ |
|---|---:|---|
| Motivation | 1 นาที | ทำไม polling อย่างเดียวไม่พอในระบบจริง |
| System context | 1 นาที | event มาจากโลกจริงและเข้าถึง MCU อย่างไร |
| Vocabulary | 2 นาที | event, flag, enable, priority, vector, ISR, RETI ไม่ใช่คำเดียวกัน |
| Mechanism | 4–6 นาที | causal chain ตั้งแต่ flag ถึง acceptance |
| Stack/context | 2–3 นาที | PC ถูกเก็บอย่างไร และ register ใดต้อง save เอง |
| RET vs RETI | 2 นาที | ความต่างเชิง architectural semantics |
| Example | 3 นาที | timer หรือ external interrupt แบบ trace ทีละขั้น |
| Limitations | 1 นาที | derivative, latency, flag-clear, debounce |
| Conclusion | 1 นาที | สรุปเป็น causal chain และข้อควรตรวจ datasheet |

หากเวลาน้อย ให้ลดรายละเอียด pin แต่ไม่ควรตัด stack, vector และ RETI เพราะเป็นแกนของหัวข้อ.

## 6.3 Slide narrative ที่ไม่ท่อง

### Slide 1: ปัญหา
เริ่มจากระบบที่ main loop กำลังทำงาน แต่มี event ภายนอกเกิดขึ้น. ถ้าใช้ polling, CPU ต้องตรวจซ้ำจนกว่าจะเห็น event; ถ้า event สั้นหรือ deadline เข้ม อาจพลาด. Interrupt ทำให้ hardware เก็บหลักฐานและขอความสนใจ CPU.

### Slide 2: แผนที่ระบบ
แสดง source → peripheral → flag → interrupt controller → CPU → ISR → output. ย้ำว่า interrupt ไม่ได้ทำให้ sensor “เรียก function” โดยตรง; hardware ทำให้ CPU เปลี่ยน PC ตามกติกา.

### Slide 3: Vocabulary
ใช้ตารางสั้น ๆ แยก flag จาก enable และ vector. คำตอบที่ดีต้องพูดว่า flag อาจ set แม้ EA ปิด; เมื่อเปิดภายหลัง request อาจยังรออยู่หรือ behavior ขึ้นกับ flag semantics.

### Slide 4: Registers
แสดง IE, IP, TCON/serial flags และบอกว่า address/bit mapping ต้องอ้าง derivative. อย่าใส่ตารางจำนวนมากจนผู้ฟังไม่เห็น causal relationship.

### Slide 5: Acceptance
แสดง polling boundary, current instruction, priority และ blocked conditions. อธิบาย latency ว่ามาจากอะไร.

### Slide 6: Vector table
ใช้ vector address ของ classic 8051: reset 0000H, INT0 0003H, TF0 000BH, INT1 0013H, TF1 001BH, serial 0023H [1]. ใส่คำเตือนว่าชิปอื่นอาจเพิ่มหรือเปลี่ยน source.

### Slide 7: Stack
แสดง PC high/low ที่ hardware เก็บ แล้วแสดง A/PSW/B ที่ software ต้อง push ถ้า ISR ใช้. ย้ำว่า hardware ไม่รู้ register contract ของ programmer.

### Slide 8: ISR pseudocode
แสดง save → identify → capture/clear → set event → restore → RETI. อย่าใส่ implementation ยาวเกินเวลาพูด.

### Slide 9: RET vs RETI
อธิบาย RET สำหรับ ordinary subroutine และ RETI สำหรับ ISR. ใช้ประโยคที่ระวังเรื่อง EA ตามหัวข้อ 6.5.

### Slide 10: Worked example
เลือก timer 0 หรือ INT0 เพียงหนึ่ง source แล้ว trace ตัวเลขจริง: flag bit, IE bit, vector, SP ก่อน/หลัง, register ที่ save และจุดที่ main resume.

### Slide 11: Pitfalls
รวม missing EA, wrong vector, flag not cleared, stack collision, long ISR, button bounce, shared data race และ derivative mismatch.

### Slide 12: Conclusion
ปิดด้วย causal chain และบอกว่ารายละเอียดที่ขึ้นกับ chip ต้องตรวจ datasheet ไม่ใช่สรุปจากชื่อ 8051 เพียงอย่างเดียว.

## 6.4 Worked example: External Interrupt 0

สมมติใช้ classic map และตั้ง INT0 แบบ edge-triggered. ลำดับเชิงเหตุผลคือ:

1. วงจรภายนอกสร้าง falling/rising transition ตาม trigger mode ที่ตั้งไว้.
2. hardware ของ INT0 set `IE0`.
3. หาก `EX0=1` และ `EA=1`, source request ผ่าน gate เบื้องต้น.
4. CPU รอ acceptance boundary ที่ไม่ถูก block ด้วย priority/current state.
5. hardware เก็บ return PC ลง stack และ load `PC=0003H`.
6. vector ที่ 0003H กระโดดไป `EXT0_ISR`.
7. ISR save A/PSW และ register ที่ใช้, อ่าน input/capture event และจัดการ flag ตาม datasheet.
8. ISR restore context แล้วใช้ `RETI`.
9. interrupt control state ถูก mark complete และ PC เดิมถูกคืน; main ทำงานต่อ.

สิ่งที่ไม่ควรพูดเกินหลักฐานคือ “CPU กระโดดทันทีที่ edge” เพราะยังมี sampling, current instruction และ acceptance conditions.

## 6.5 วิธีตอบประเด็น RETI และ EA

### คำตอบที่สั้นและปลอดภัย

> “EA เป็น global enable bit ใน IE. Lecture สรุป RETI ว่า return และ enable interrupt เพื่อให้เห็นผลทางการใช้งาน แต่ใน MCS-51 manual ความหมาย architectural ของ RETI คือการคืน PC พร้อมแจ้ง interrupt control logic ว่า ISR ปัจจุบันจบแล้ว; เราจึงไม่ควรถือว่า RETI เขียน EA เป็น 1 ในทุก chip derivative. การเปิด EA ต้องตรวจจาก code และ datasheet ของรุ่นจริง.” [1] [2]

### ถ้าอาจารย์ถามว่าใช้ RET แทนได้ไหม

ตอบว่า `RET` อาจ pop PC ได้ แต่ไม่ใช่คำสั่ง completion ของ interrupt controller. การใช้ RET ใน ISR จึงไม่ใช่เพียง stylistic difference; อาจทำให้ interrupt state ยังค้างหรือการรับ request ระดับเดิมผิดไป. สำหรับ ISR ให้ใช้ RETI ตามสถาปัตยกรรม.

### ถ้าอาจารย์ถามว่าทำไม slide เขียน EA=1

ตอบอย่างเคารพว่า slide เป็น simplified operational description ที่ต้องการสื่อว่า “หลัง ISR ระบบพร้อมรับ interrupt ต่อ”. จาก manual ควรแยกเรื่อง readiness ของ interrupt logic ออกจากค่าบิต EA. ถ้าเป็น derivative เฉพาะ ให้ยึด datasheet ของ derivative นั้น.

## 6.6 คำถามที่คาดว่าจะถูกถาม

### “Flag set แล้วทำไม ISR ไม่ทำงาน”

เพราะ flag เป็นเพียงเงื่อนไขหนึ่ง. ตรวจ source enable, EA, priority, trigger mode, current ISR, current instruction boundary, vector placement และ flag-clear semantics.

### “ทำไมต้อง save PSW”

เพราะ PSW เก็บ flags และ register-bank selection. ISR ที่ใช้ arithmetic หรือเปลี่ยน bank อาจทำให้ main program เห็น state ผิดหากไม่ restore.

### “ทำไม vector address ห่างกัน 8 หรือ 16 bytes”

เพราะ architecture จัดพื้นที่ entry point คงที่ต่อ source. ช่องสั้นจึงนิยมใช้ jump ไป ISR จริง; ระยะห่างเป็น property ของ vector map ไม่ใช่ขนาด ISR.

### “Priority ทำให้ interrupt เร็วขึ้นหรือไม่”

ไม่โดยตรง. Priority เปลี่ยนสิทธิ์การแทรก/การรอเมื่อหลาย request พร้อมกัน. Latency ยังขึ้นกับ instruction, sampling, disabled interval และความยาว ISR อื่น.

### “ทำไม serial interrupt ต้องตรวจ RI และ TI”

เพราะ receive และ transmit share vector เดียวใน classic 8051. ISR ต้องอ่าน flags ย่อยเพื่อรู้สาเหตุและ clear เฉพาะสิ่งที่ service.

### “ทำไมไม่ทำทุกอย่างใน ISR”

เพราะ ISR ที่ยาวเพิ่ม latency, block priority เดิม, ใช้ stack/context มาก และเพิ่ม race. ISR ควร capture event แล้วให้ main ทำงานหนัก.

## 6.7 สิ่งที่ควรสาธิตบนกระดาน

วาดสามแถว: `PC`, `SP/stack`, `IE/IP/flag`. เขียน main `PC=0120H`, `SP=2FH`; จากนั้นเขียน `IE0=1`, `EX0=1`, `EA=1`; วาด hardware push PC และ `PC←0003H`; วาด `PUSH ACC`, `PUSH PSW`; ต่อด้วย `POP` ย้อนลำดับและ `RETI`. การสาธิตนี้ทำให้ผู้ฟังเห็นว่าคำว่า “return” มีทั้ง return address และ interrupt state.

## 6.8 Rubric ส่วนตัวก่อนส่ง

| เกณฑ์ | ผ่านเมื่อ |
|---|---|
| Conceptual accuracy | แยก event/flag/request/acceptance ได้ |
| Architectural detail | กล่าวถึง vector, PC, SP, context และ RETI |
| Source discipline | อ้าง Intel/NXP และระบุจุดที่ derivative-dependent |
| Explanation | มี causal diagram และ worked example |
| Critical thinking | ระบุข้อจำกัดของ simplified lecture statement |
| Delivery | อธิบายด้วยคำตนเอง ไม่อ่านนิยามยาว |
| Safety | ไม่สรุป timing/flag clear/EA แบบ universal |

## 6.9 สคริปต์ซ้อมพูด 90 วินาที

“Interrupt mechanism คือสะพานจาก event ของ peripheral ไปสู่การเปลี่ยน control flow ของ CPU. Event ทำให้ flag set; source enable และ EA เป็น gate; priority และสถานะ interrupt ปัจจุบันกำหนดว่า request รับได้หรือยัง. ที่ polling boundary CPU รับ request โดย hardware เก็บ return PC ลง stack แล้ว load vector address. Vector มัก jump ไป ISR จริง. ISR ต้อง save register ที่ใช้ เพราะ hardware รับรองการเก็บ PC แต่ไม่รู้ context contract ของเรา. จากนั้น ISR identify source, capture data, clear flag ตาม datasheet, restore context และใช้ RETI. RETI ไม่ใช่ RET ที่เปลี่ยนชื่อ เพราะมันทำหน้าที่จบ interrupt state ของ controller ด้วย. รายละเอียด vector, flag-clear และ clock ต้องตรวจ derivative datasheet เสมอ.”

## References

[1]: https://cos.colorado.edu/Documents/DCE/BOOT/8051_Manual.pdf "Intel, MCS-51 Microcontroller Family User’s Manual"
[2]: https://www.nxp.com/docs/en/data-sheet/8XC51_8XC52.pdf "NXP/Philips, 8XC51/8XC52 Product Specification"
[3]: ../../personal-presentation/assignment/coursework-markdown/course_work_complete.md "Coursework source file"
[4]: ../../personal-presentation/assignment/TOPIC_LECTURE_MAPPING.md "Course-to-topic mapping source file"
