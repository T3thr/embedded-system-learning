# Media Source Catalog: Embedded Systems Lecture 1–4

เอกสารนี้ระบุที่มาของภาพที่นำมาใช้ในชุด `learning-from-zero` และแยกให้ชัดเจนระหว่าง **ภาพจากสื่อการสอนของรายวิชา** กับ **แผนภาพที่ผู้จัดทำสร้างขึ้นใหม่**. ภาพจาก lecture ถูกคัดลอกเพื่อการศึกษาในบริบทเดียวกับเอกสารต้นฉบับและคงชื่อแหล่งที่มาไว้ใน metadata ของเอกสาร.

## A. ภาพจาก lecture ของรายวิชา

| ไฟล์สื่อที่จัดเตรียม | ที่มาเดิม | หัวข้อที่ใช้ | วิธีใช้ |
|---|---|---|---|
| `lecture1-building-blocks.png` | `lecture1-markdown/images/fig_004_slide_diagram.png`, Lecture 1, PDF page 4 | building blocks ของ embedded system | ใช้เปิดบทและแสดง input–controller–output |
| `lecture1-von-neumann-vs-harvard.png` | `lecture1-markdown/images/fig_013_slide_diagram.png`, Lecture 1, PDF page 13 | Von Neumann กับ Harvard | ใช้สร้างพื้นฐาน memory architecture |
| `lecture1-8051-block.png` | `lecture1-markdown/images/fig_018_media_1.jpeg`, Lecture 1, PDF page 18 | ภาพรวม 8051 | ใช้เชื่อม CPU, RAM, ROM, timer, serial และ interrupt |
| `lecture1-memory-map.png` | `lecture1-markdown/images/fig_021_media_1.jpeg`, Lecture 1, PDF page 21 | memory size และ address range | ใช้ปู code/data/SFR และ address |
| `lecture1-alu.png` | `lecture1-markdown/images/fig_022_media_1.jpeg`, Lecture 1, PDF page 22 | ALU และ accumulator | ใช้อธิบาย datapath กับ flags |
| `lecture1-program-counter.png` | `lecture1-markdown/images/fig_023_media_1.png`, Lecture 1, PDF page 23 | program counter | ใช้อธิบาย execution flow และ return address |
| `lecture1-8051-features.png` | `lecture1-markdown/images/fig_025_media_1.jpeg`, Lecture 1, PDF page 25 | คุณสมบัติ 8051 | ใช้เป็น checklist ก่อนลงสถาปัตยกรรม |
| `lecture2-8051-pinout.png` | `lecture2-markdown/images/fig_003_media_1.jpeg`, Lecture 2, PDF page 3 | DIP-40 pinout | ใช้เน้น P3.2/INT0, P3.3/INT1, T0/T1 และ serial |
| `lecture2-port-bus-functions.png` | `lecture2-markdown/images/fig_005_media_1.png`, Lecture 2, PDF page 5 | Port 0, ALE, PSEN และ bus | ใช้แยก port function กับ alternate bus function |
| `lecture2-psw.png` | `lecture2-markdown/images/fig_006_media_1.jpeg`, Lecture 2, PDF page 6 | PSW และ register bank bits | ใช้เชื่อม PSW กับ context preservation |
| `lecture3-memory-organization.png` | `lecture3-markdown/images/fig_002_media_1.jpeg`, Lecture 3, PDF page 2 | internal/external memory | ใช้แยก address spaces |
| `lecture3-register-banks.png` | `lecture3-markdown/images/fig_005_media_1.jpeg`, Lecture 3, PDF page 5 | register banks R0–R7 | ใช้สอน context และ PSW.RS1/RS0 |
| `lecture3-bit-addressable-area.png` | `lecture3-markdown/images/fig_006_media_1.jpeg`, Lecture 3, PDF page 6 | bit-addressable RAM | ใช้สอน flag และ bit manipulation |
| `lecture3-stack.png` | `lecture3-markdown/images/fig_009_media_1.jpeg`, Lecture 3, PDF page 9 | stack, SP, LIFO | ใช้สาธิต return address และ save/restore |
| `lecture3-sfr.png` | `lecture3-markdown/images/fig_010_media_1.jpeg`, Lecture 3, PDF page 10 | SFR address range | ใช้เชื่อม IE, IP, TCON กับ hardware |
| `lecture4-development-toolchain.png` | `lecture4-markdown/images/fig_002_media_1.jpeg`, Lecture 4, PDF page 2 | editor และ source file | ใช้เปิด workflow จาก source ถึง MCU |
| `lecture4-number-formats.png` | `lecture4-markdown/images/fig_005_media_1.jpeg`, Lecture 4, PDF page 5 | binary/decimal/hex | ใช้เป็นแบบฝึกอ่าน address/register |
| `lecture4-jump-call.png` | `lecture4-markdown/images/fig_027_media_1.jpeg`, Lecture 4, PDF page 27 | JMP กับ CALL | ใช้เปรียบเทียบ control flow |
| `lecture4-ret-reti.png` | `lecture4-markdown/images/fig_028_media_1.jpeg`, Lecture 4, PDF page 28 | RET กับ RETI | ใช้ประกอบบทแก้ความเข้าใจเรื่อง return จาก ISR |

**ที่มาหลักของชุดภาพ:** ไฟล์ lecture ที่ผู้เรียนอัปโหลดใน `embedded-system/1/lecture/lecture1-markdown` ถึง `lecture4-markdown`. ชื่อไฟล์ในตารางอ้างตาม path ภายใน ZIP ที่ได้รับ.

## B. แผนภาพที่สร้างขึ้นใหม่

แผนภาพใหม่จะอยู่ในโฟลเดอร์ `diagrams/` และมี source file คู่กันทุกภาพ ได้แก่ `.mmd` หรือ `.d2` และไฟล์ PNG ที่ render แล้ว. เนื้อหาสังเคราะห์จาก lecture และ datasheet/manual ที่อ้างในเอกสาร จึงต้องติด citation ใต้ภาพ เช่น “ผู้จัดทำสังเคราะห์จาก [Intel MCS-51 manual] และ [NXP 8XC51/8XC52 datasheet]”.

แผนภาพที่ควรมีอย่างน้อยมีดังนี้:

| ชื่อแผนภาพ | จุดประสงค์ | แหล่งข้อเท็จจริง |
|---|---|---|
| `embedded-system-context` | แสดงโลกจริง–sensor–MCU–actuator | Lecture 1 และ Valvano [1] |
| `8051-memory-spaces` | แยก program/data memory และ internal RAM/SFR | Lecture 1/3 และ Intel manual [2] |
| `8051-port3-alternate-functions` | แสดง P3.2/P3.3/T0/T1/serial | Lecture 2 และ NXP datasheet [3] |
| `interrupt-causal-chain` | source→flag→enable→priority→vector→ISR→RETI | Intel manual [2], NXP datasheet [3] |
| `interrupt-vector-table` | ตาราง vector addresses ของ classic MCS-51 | Intel manual [2] |
| `stack-on-interrupt` | PC push, ISR save context, RETI pop PC | Intel manual [2], Lecture 3/4 |
| `interrupt-polling-timing` | flag sampling, polling, blocked acceptance และ latency | Intel manual [2] |
| `ret-vs-reti` | ความแตกต่างด้าน PC กับ interrupt-control state | Intel manual [2], Lecture 4 |
| `timer-to-interrupt` | timer overflow→flag→interrupt request | NXP datasheet [3] |

## C. แหล่งอ้างอิงภายนอก

[1]: https://users.ece.utexas.edu/~valvano/mspm0/ebook/Ch1_Introduction.html "Valvano and Yerraballi, Introduction to Embedded Systems"
[2]: https://cos.colorado.edu/Documents/DCE/BOOT/8051_Manual.pdf "Intel, MCS-51 Microcontroller Family User’s Manual, 1994"
[3]: https://www.nxp.com/docs/en/data-sheet/8XC51_8XC52.pdf "NXP/Philips, 8XC51/8XC52 Product Specification"

## D. หลักการใช้งานสื่อ

ภาพจาก lecture ใช้เพื่ออ่านภาพต้นฉบับควบคู่กับคำอธิบาย ไม่ควรใช้แทนการตรวจสอบ datasheet. หากตัวเลขในภาพ lecture แตกต่างจาก derivative ที่ผู้เรียนใช้จริง ให้ถือ datasheet ของชิปรุ่นนั้นเป็น authority. แผนภาพที่ผู้จัดทำสร้างขึ้นมีจุดประสงค์เพื่ออธิบาย causal relationship และอาจลดรายละเอียดบางส่วนเพื่อให้เห็นกลไก จึงต้องอ่านคำเตือนเรื่อง assumption ใต้ภาพเสมอ.
