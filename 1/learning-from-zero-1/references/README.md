# แหล่งอ้างอิงและการตรวจสอบข้อเท็จจริง

## 1. แหล่งอ้างอิงที่ใช้เป็นหลัก

### [1] Intel MCS-51 Family User’s Manual

Intel, *MCS-51 Microcontroller Family User’s Manual*, 1994. สำเนา PDF อยู่ที่ `intel-mcs51-users-manual-1994.pdf`.

ลิงก์สาธารณะ: [https://cos.colorado.edu/Documents/DCE/BOOT/8051_Manual.pdf](https://cos.colorado.edu/Documents/DCE/BOOT/8051_Manual.pdf)

ใช้ยืนยัน interrupt response, sampling/polling, vector spacing, hardware-generated LCALL, stack behavior, RET/RETI และข้อจำกัดของ interrupt acceptance.

### [2] NXP/Philips 80C51/87C51/80C52/87C52 Product Specification

NXP/Philips, *80C51/87C51/80C52/87C52 Product Specification*. สำเนา PDF อยู่ที่ `nxp-8xc51-8xc52-datasheet.pdf`.

ลิงก์สาธารณะ: [https://www.nxp.com/docs/en/data-sheet/8XC51_8XC52.pdf](https://www.nxp.com/docs/en/data-sheet/8XC51_8XC52.pdf)

ใช้ยืนยัน pin alternate functions, SFR addresses, IE/IP/priority, interrupt-source count และความแตกต่างระหว่าง 80C51 กับ 80C52. รุ่นจริงอาจแตกต่างจาก datasheet นี้.

### [3] Valvano and Yerraballi, Introduction to Embedded Systems

Jonathan W. Valvano and Ramesh Yerraballi, *Introduction to Embedded Systems*, Chapter 1, The University of Texas at Austin.

ลิงก์: [https://users.ece.utexas.edu/~valvano/mspm0/ebook/Ch1_Introduction.html](https://users.ece.utexas.edu/~valvano/mspm0/ebook/Ch1_Introduction.html)

ใช้วางนิยาม embedded system, microcomputer, processor/memory/I/O และ input–decision–output loop รวมถึงลำดับ prerequisite.

### [4] University of California, Berkeley, Cyber-Physical Systems

Edward A. Lee and Sanjit A. Seshia, *Introduction to Embedded Systems: A Cyber-Physical Systems Approach*, เอกสาร/บทที่คัดเลือกในโฟลเดอร์ `course-sources/textbook-selected/`.

ใช้ขยาย embedded processors, memory architectures, I/O, concurrency และ scheduling. ใช้เป็นกรอบแนวคิด ไม่ใช้แทน semantics เฉพาะของ 8051.

### [5] เอกสารรายวิชา

Lecture 1–4, coursework และ topic-to-lecture mapping ที่ผู้เรียนอัปโหลด. สำเนาคัดเลือกอยู่ใน `course-sources/lectures/` และ `course-sources/coursework/`.

ใช้กำหนดขอบเขตการสอนและถ้อยคำที่อาจารย์คาดหวัง. เมื่อถ้อยคำใน lecture เป็น simplified model และขัดกับ manual ให้เขียนแยก “แบบจำลองในชั้นเรียน” กับ “architectural fact” อย่างชัดเจน.

## 2. ตารางจับคู่แหล่งกับหัวข้อ

| หัวข้อ | แหล่งหลัก | หมายเหตุ |
|---|---|---|
| Embedded system และ MCU | [3], Lecture 1 | ใช้ [3] อธิบายเหตุผลและภาพ input–decision–output |
| CPU, ALU, register, PC | Lecture 1–2, [1] | ชื่อและภาพตาม lecture; semantics ตรวจ manual |
| Program/data spaces | Lecture 1–3, [1] | ต้องแยก logical address spaces ของ classic MCS-51 |
| Ports และ alternate function | Lecture 2, [2] | pin function ขึ้นกับรุ่นชิป |
| SFR, IE, IP, timer flags | Lecture 2–4, [2] | ใช้ datasheet ของ derivative จริงก่อนเขียนโค้ด |
| Stack และ PC | Lecture 3–4, [1] | hardware interrupt response push PC; register context เป็นหน้าที่ ISR |
| Timer และ machine cycle | Lecture 4, [1], [2] | 12 MHz/12 clocks เป็นตัวอย่าง ไม่ใช่ universal property |
| Vector addresses | Lecture 4, [1], [2] | classic vector 5 แหล่ง; 80C52 เพิ่ม Timer 2 |
| Interrupt polling/latency | Lecture 4, [1] | sampling/polling และ blocked acceptance ต้องอธิบายตาม manual |
| RET vs RETI | Lecture 4, [1] | ห้ามสรุปว่า RETI เขียน EA=1 ในทุก derivative |
| Real-time/concurrency | [3], [4] | ใช้ขยาย latency, jitter, shared state และ scheduling |

## 3. นโยบายเมื่อแหล่งอ้างอิงไม่ตรงกัน

1. ใช้ lecture เป็นหลักในการกำหนด **ขอบเขตและภาษาการสอบ**.
2. ใช้ manual/datasheet ของชิปเป็นหลักในการยืนยัน **ข้อเท็จจริงเชิงสถาปัตยกรรมและ register semantics**.
3. ระบุชื่อชิป/derivative และสมมติฐานทุกครั้งที่อ้าง vector, bit, clock หรือ flag behavior.
4. หากยังไม่มีเอกสารของรุ่นจริง ให้ใช้คำว่า “classic MCS-51 model” ไม่ใช้คำว่า “8051 ทุกตัว”.
5. แหล่ง AVR/ARM ใน textbook มีไว้เปรียบเทียบแนวคิดเท่านั้น ห้ามย้าย semantics ของ interrupt มาปะปนกับ 8051.

## 4. ที่มาภาพ

ภาพใน `../media/course-figures/` คัดจาก lecture markdown ของรายวิชา. แผนภาพใน `../diagrams/` เป็น source Mermaid ที่สร้างขึ้นใหม่สำหรับชุดเรียนนี้ และ render เป็น PNG ด้วยเครื่องมือ deterministic. รายละเอียดชื่อไฟล์ ต้นทาง และจุดประสงค์อยู่ใน `course-sources/research-notes/media-source-catalog.md`.
