# Technical Glossary and Q&A

## วิธีใช้เอกสารนี้

ก่อนซ้อมบทพูด ให้ปิดไฟล์บทพูดแล้วลองอธิบายคำศัพท์ในตารางด้วยภาษาของตนเอง หากอธิบายไม่ได้ ให้กลับไปอ่านหัวข้อที่ระบุใน `02-teaching-notes-before-speaking.md` เป้าหมายไม่ใช่จำคำแปล แต่ต้องเข้าใจว่าแต่ละคำมีบทบาทใดใน causal chain ของ interrupt

## อภิธานศัพท์

| คำศัพท์ | ความหมายที่ควรพูด | การทำงานที่ต้องเข้าใจจริง |
|---|---|---|
| Embedded system | ระบบคอมพิวเตอร์ที่ฝังในอุปกรณ์เพื่อหน้าที่เฉพาะ | มีข้อจำกัดด้านเวลา พลังงาน หน่วยความจำ และต้องเชื่อมกับโลกจริง |
| Microcontroller (MCU) | ชิปที่รวม CPU, memory, I/O และ peripheral สำคัญ | รับ input ประมวลผล และควบคุม output ในชิปเดียว |
| CPU | หน่วยประมวลผลกลาง | fetch, decode, execute คำสั่งและเปลี่ยน control flow |
| Peripheral | วงจรประกอบ เช่น timer, serial, GPIO | สร้างหรือรับเหตุการณ์ที่ CPU ต้องจัดการ |
| Interrupt mechanism | กลไกเปลี่ยนการควบคุมไปยัง ISR แล้วกลับมา | ประกอบด้วย request, eligibility, entry, service และ return |
| Event | เหตุการณ์ที่เกิดในระบบ | เช่น edge, timer overflow หรือข้อมูล serial มาถึง |
| Asynchronous | ไม่จำเป็นต้องเกิดตรงกับลำดับคำสั่งหลัก | event อาจเกิดระหว่างที่ CPU ทำคำสั่งอื่น |
| Request | คำขอให้ controller พิจารณาบริการ | เกิดจาก flag/line และอาจถูก enable, mask หรือ priority คัดกรอง |
| Flag | บิตสถานะที่บอกว่าเงื่อนไขเกิดขึ้น | อาจค้างจน software หรือ hardware เคลียร์ ขึ้นกับอุปกรณ์ |
| Pending | คำขอเกิดแล้วแต่ยังรอการรับบริการ | pending ไม่ได้แปลว่า ISR เริ่มแล้ว |
| Polling | โปรแกรมวนอ่านสถานะอุปกรณ์เอง | เข้าใจง่ายและคาดการณ์ได้ในบางงาน แต่ใช้ CPU ตรวจซ้ำ |
| Control flow | เส้นทางที่คำสั่งไหลไป | interrupt ทำให้เส้นทางชั่วคราวเปลี่ยนไปยัง handler |
| Handler | โค้ดที่จัดการเหตุการณ์ | ISR เป็น handler ชนิดหนึ่งสำหรับ interrupt |
| ISR | Interrupt Service Routine | ตรวจสาเหตุ จัดการข้อมูล เคลียร์/acknowledge และ return |
| Vector | ข้อมูลหรือตำแหน่งที่ใช้หา handler | ไม่จำเป็นต้องเป็น ISR ทั้งฟังก์ชัน; 8051 มี fixed vector แบบของตน |
| Vector table | ตารางที่จับคู่แหล่งเหตุการณ์กับ handler/vector | รูปแบบและตำแหน่งขึ้นกับ architecture |
| Entry | ขั้นตอนที่ CPU เข้าสู่ handler | acceptance, save context ที่กำหนด และ vector fetch |
| Service | ช่วงที่ ISR ทำงาน | ต้องบริการต้นเหตุและหลีกเลี่ยงงานหนักที่ไม่จำเป็น |
| Acknowledge | การยืนยัน/จัดการว่า request ถูกพบแล้ว | อาจเคลียร์ flag, อ่าน register หรือเขียนค่าตาม datasheet |
| Clear flag | ทำให้สถานะ request ไม่ค้าง | วิธี clear ไม่เหมือนกันทุก peripheral |
| Return address | ตำแหน่งที่จะกลับไปทำงาน | มักเกี่ยวข้องกับ PC และ stack |
| PC / Program Counter | register ที่ชี้คำสั่งถัดไป | ต้องรักษาไว้หรือ restore เพื่อให้โปรแกรมเดิม resume ถูกจุด |
| Register | หน่วยเก็บข้อมูลขนาดเล็กใกล้ CPU | ISR อาจแก้ register จึงต้อง save/restore ตามข้อกำหนด |
| Context | สถานะรวมที่ทำให้โปรแกรมเดิมทำต่อได้ | มี PC, registers, status และข้อมูลตาม architecture |
| Stack | พื้นที่หน่วยความจำแบบ LIFO | เก็บ return address และ context ชั่วคราว |
| LIFO | Last-In, First-Out | ข้อมูลที่ push ล่าสุดต้อง pop ก่อน |
| SP / Stack Pointer | register ชี้ยอด stack | push/pop ผิดสมดุลทำให้ return และ memory เสีย |
| SFR | Special Function Register ของ 8051 | register ควบคุม I/O, timer, serial และ interrupt |
| IE | Interrupt Enable ของ 8051 | ควบคุม global/local interrupt enable ตาม bit ของรุ่นนั้น |
| EA | External/global enable bit ใน IE ของ 8051 | เป็น gate ระดับรวม ไม่ควรนำไปเรียกแทน global bit ของ AVR/ARM |
| IP | Interrupt Priority ของ 8051 | กำหนด priority ตามความสามารถของ device/derivative |
| Enable | การอนุญาตให้ request ตอบสนอง | มีได้ทั้ง global และ per-source enable |
| Mask | การป้องกันหรือกรอง request | request อาจเกิดแต่ไม่สามารถทำให้ control flow เปลี่ยน |
| Priority | กฎจัดลำดับ request | ไม่ได้แทนที่ enable และ mask; ต้องผ่าน eligibility ก่อน |
| RET | คำสั่งคืนจาก normal subroutine | คืน PC แต่ไม่ใช่ end-of-interrupt signaling |
| RETI | คำสั่งจบ ISR ใน 8051/AVR บางบริบท | คืน PC และแจ้ง interrupt-control logic; semantics ต้องอ่านตาม architecture |
| EA=1 | ค่า global enable bit ของ 8051 | ไม่ควรพูดว่า RETI ทำให้เป็น 1 เสมอโดยไม่มี device-specific source |
| Latency | เวลาจาก event/request ถึง ISR เริ่ม | ขึ้นกับ instruction boundary, masking, priority และ hardware |
| Jitter | ความแปรผันของ latency | เกิดจาก ISR อื่น, critical section หรือความยาวงานที่ไม่คงที่ |
| Bounded ISR | ISR ที่มีขอบเขตเวลาที่อธิบาย/ประมาณได้ | ช่วยวิเคราะห์ worst-case และลดผลกระทบต่อ request อื่น |
| Real-time | ระบบที่ความถูกต้องรวมข้อจำกัดด้านเวลา | ไม่ได้หมายถึงเร็วที่สุด แต่ต้องเสร็จภายใน deadline ที่กำหนด |
| ABI | Application Binary Interface | กติกาว่า register ใด caller/callee ต้องรักษา; ISR ต้องเคารพบริบทที่โปรแกรมใช้ |
| Compiler | โปรแกรมแปล source code เป็น machine code | อาจใช้ register และกำหนด calling convention ที่ ISR ต้องไม่ทำลาย |
| Architecture-specific | พฤติกรรมเฉพาะสถาปัตยกรรม | เช่น 8051 `IE/IP/RETI`, AVR vector/`RETI`, Cortex-M stacking/exception return |

## แนวตอบคำถามที่มีโอกาสถูกถาม

### 1. Interrupt ต่างจาก polling อย่างไร

Polling ให้โปรแกรมหลักวนตรวจ flag หรือสถานะเอง ส่วน interrupt ให้ hardware/peripheral สร้าง request และ controller เปลี่ยนไปยัง handler เมื่อผ่านเงื่อนไข Interrupt ลดการตรวจซ้ำของ CPU ได้ แต่เพิ่มความซับซ้อนเรื่อง context, priority และ latency; จึงไม่มีคำตอบว่าแบบใดดีกว่าในทุกงาน

### 2. เหตุใดต้องมีทั้ง global enable และ local enable

Global enable เป็น gate ระดับรวม ส่วน local enable ระบุแหล่งที่อนุญาต หาก global ปิด ต่อให้ local เปิดก็ยังไม่ควรรับ interrupt ตามกติกาของอุปกรณ์ การมีสองระดับช่วยปิด interrupt ทั้งระบบหรือเลือกปิดเฉพาะแหล่งได้

### 3. Flag กับ interrupt request เหมือนกันหรือไม่

ไม่จำเป็นต้องเหมือนกัน Flag เป็นสถานะของ peripheral ส่วน request เป็นผลจาก flag ผ่าน logic เช่น enable, mask และ priority flag อาจเป็น 1 ได้โดย request ยังไม่ทำให้ CPU เข้า ISR

### 4. ทำไมต้องใช้ vector

CPU ต้องรู้ว่าจะเริ่ม handler ที่ไหนเมื่อมีหลายแหล่ง interrupt vector ทำหน้าที่จับคู่ source กับ entry point แต่รูปแบบ vector table เป็นรายละเอียดของ architecture

### 5. 8051 เก็บอะไรตอนเข้า interrupt

สำหรับ classic MCS-51 manual ระบุว่า hardware response เก็บ PC แต่ไม่เก็บ PSW และ register อื่นทั้งหมดโดยอัตโนมัติ ISR จึงต้อง save/restore สิ่งที่แก้ไขตามความจำเป็นและ convention

### 6. ทำไม RET ใช้แทน RETI ไม่ได้

ทั้งสองอาจนำ return address กลับเข้า PC แต่ RETI ยังทำหน้าที่บอก interrupt-control logic ว่า ISR จบแล้ว หากใช้ RET ธรรมดา controller อาจยังถือว่า interrupt ระดับนั้นกำลังบริการอยู่

### 7. RETI ตั้ง EA เป็น 1 หรือไม่

คำตอบที่แม่นยำคือ ไม่ควรกล่าวเป็นกฎสากล Lecture 4 มีคำอธิบายย่อว่า RETI ทำให้ EA เป็น 1 แต่ Intel MCS-51 manual อธิบาย RETI เป็น end-of-interrupt ที่คืน PC และ restore interrupt-control state เพื่อรับ interrupt priority เดิมได้อีก ค่า EA ต้องตรวจสอบจาก datasheet ของ derivative ที่ใช้

### 8. ทำไม ISR ต้องสั้น

เพราะระหว่าง ISR request อื่นอาจรอหรือถูก mask ทำให้ latency และ jitter เพิ่มขึ้น ISR ควรทำงานจำเป็น เช่น capture data/clear source แล้วส่งงานหนักไป main loop หรือ task เมื่อทำได้

### 9. Priority สูงจะทำงานทันทีหรือไม่

ไม่เสมอไป ต้องผ่าน global/local enable, mask, กฎการ polling และเงื่อนไขว่ามี interrupt ระดับเดียวกันหรือสูงกว่ากำลังทำงานอยู่หรือไม่

### 10. Vector address ของ 8051 คืออะไร

สำหรับ classic MCS-51 vector มาตรฐานที่ manual ระบุ ได้แก่ `0003H` external interrupt 0, `000BH` timer 0, `0013H` external interrupt 1, `001BH` timer 1 และ `0023H` serial แต่ต้องตรวจ exact derivative ก่อนใช้เขียนโปรแกรม เพราะบางรุ่นเพิ่ม source เช่น timer 2

### 11. ถ้า flag ไม่ถูก clear จะเกิดอะไรขึ้น

ขึ้นกับ peripheral อาจเกิด ISR ซ้ำหรือ request ค้าง หาก ISR จัดการต้นเหตุไม่ครบ ระบบอาจกลับเข้า ISR ทันทีหรือไม่สามารถรับเหตุการณ์ใหม่ได้ การ clear ต้องทำตาม datasheet ไม่ใช่เดา

### 12. Interrupt เป็น real-time เสมอหรือไม่

ไม่เสมอ Interrupt เป็นกลไกตอบสนองเหตุการณ์ ส่วน real-time เป็นข้อกำหนดว่าการตอบสนองต้องเสร็จภายในเวลา/เพดานที่กำหนด ระบบจะเป็น real-time ได้ก็ต่อเมื่อวิเคราะห์ worst-case latency และ deadline ได้เพียงพอ

### 13. ทำไมสไลด์ใช้ AVR และ ARM ในวิชา 8051

ให้ตอบว่าใช้เป็นแหล่งเปรียบเทียบหลักการร่วมของ interrupt เช่น vector, context และ entry/return แต่รายละเอียด register, stack frame, vector address และ return instruction เป็น architecture-specific จึงใช้ lecture 3–4 และ Intel MCS-51 manual เป็นแหล่งตัดสินเมื่อพูดถึง 8051

### 14. ถ้าอาจารย์ถามว่า interrupt เกิดตรงไหนของคำสั่ง

ตอบว่าขึ้นกับ architecture และกฎ acceptance ของมัน สำหรับ MCS-51 manual flags ถูก sample/poll ตามจังหวะ machine cycle และ hardware response ไม่ได้แทรกกลางคำสั่งแบบไร้กฎ ต้องตรวจคู่มือเมื่อจะอ้าง cycle-accurate timing

## คำตอบสั้นสำหรับกรณีจำเป็นต้องหยุดคิด

> “ประเด็นนี้ต้องแยกระหว่างหลักการร่วมกับรายละเอียดของ architecture ครับ หลักการร่วมคือ request ต้องผ่านเงื่อนไขก่อน entry และต้อง preserve context ก่อน return ส่วนค่า register, vector และ semantics ของ RETI ต้องดู manual ของชิปที่ระบุครับ”

> “ผมไม่ขอสรุปว่าเป็นพฤติกรรมของ 8051 ทุก derivative โดยไม่มี datasheet รองรับครับ สิ่งที่ยืนยันได้จาก MCS-51 manual คือ PC, vector, interrupt-control state และ RETI ตามที่ระบุใน source mapping”
