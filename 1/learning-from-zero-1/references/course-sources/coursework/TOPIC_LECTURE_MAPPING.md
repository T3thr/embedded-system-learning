# Knowledge Cross-Reference Mapping: Course Topics vs Lecture & Textbook Modules

## Coursework Topic Mapping Repository

> **Source Excel**: `Topic-lists.xlsx` -> [`Topic-lists.md`](Topic-lists.md)  
> **Source Assignment**: `Course Work.pdf` -> [`coursework-markdown/course_work_complete.md`](coursework-markdown/course_work_complete.md)  
> **Course**: Embedded System (1)  
> **Selected Presentation Topic**: **Interrupt Mechanism** (Student: **ธีรภัทร ภู่ระย้า**, ID: **66362416**, Group 1, Seq 4)

---


## 🌟 User Selected Topic Highlight: [No. 41] Interrupt Mechanism

> [!IMPORTANT]

> **Student**: ธีรภัทร ภู่ระย้า (Student ID: 66362416 | Group 1 | Sequence 4)  

> **Topic**: `Interrupt Mechanism`  

> **Coursework Target**: 4-5 Slide PPTX Presentation + 4 Page DOCX Report + Appendix Source Highlight


### Direct Lecture Cross-References for Interrupt Mechanism

1. **[Lecture 1 Complete Markdown](../../lecture/lecture1-markdown/lecture1_complete.md)**:

   - **Page 9** ([`fig_009_media_2.jpeg`](../../lecture/lecture1-markdown/images/fig_009_media_2.jpeg)): Microcontroller Hardware Architecture including `Interrupts` block.

   - **Page 18** ([`fig_018_media_1.jpeg`](../../lecture/lecture1-markdown/images/fig_018_media_1.jpeg)): 8051 Internal Hardware Block Diagram (`External Interrupts` & `Interrupt Control`).

2. **[Lecture 2 Complete Markdown](../../lecture/lecture2-markdown/lecture_2_complete.md)**:

   - **Page 2** ([`fig_002_media_1.jpeg`](../../lecture/lecture2-markdown/images/fig_002_media_1.jpeg)): 8051 5-Interrupt Vector Feature List (`Five interrupts operating at priority levels`).

   - **Page 3** ([`fig_003_media_1.jpeg`](../../lecture/lecture2-markdown/images/fig_003_media_1.jpeg)): 40-Pin DIP Hardware Pinout (`Pin 12: P3.2/INT0`, `Pin 13: P3.3/INT1`).

3. **[Lecture 2V2 Complete Markdown](../../lecture/lecture2v2-pptx-markdown/lecture_2v2_complete.md)**:

   - **Pages 7, 10, 11, 12, 13**: Interrupt Controller block diagram, Port 3 pin multiplexing (`INT0`, `INT1`).

4. **[Lecture 3 Complete Markdown](../../lecture/lecture3-markdown/lecture_3_complete.md)**:

   - **Page 10 & Page 12**: Special Function Register (SFR) Bank detailing `IE` (Interrupt Enable at A8H) and `IP` (Interrupt Priority at B8H).

5. **[Lecture 4 Complete Markdown](../../lecture/lecture4-markdown/lecture_4_complete.md)**:

   - **Page 28**: `RETI` (Return from Interrupt) Instruction execution flow & Interrupt Service Routine (ISR) return mechanism (`POP PC`, `EA = 1`).


### Recommended Textbook Reference Mappings

- **ATmega328P Datasheet**: [`atmega328p-datasheet-markdown/atmega328p_complete.md`](../../textbook/atmega328p-datasheet-markdown/atmega328p_complete.md) (Chapter 13: Interrupts, External Interrupts INT0/INT1, PCINT).

- **AVR Microcontroller by Mazidi**: [`avr-mazidi-markdown/avr_mazidi_complete.md`](../../textbook/avr-mazidi-markdown/avr_mazidi_complete.md) (Chapter 9: AVR Interrupt Programming in C & Assembly).

- **ARM Cortex-M RTOS by Valvano**: [`arm-rtos-cortex-m-markdown/arm_rtos_cortex_m_complete.md`](../../textbook/arm-rtos-cortex-m-markdown/arm_rtos_cortex_m_complete.md) (Chapter 4: Nested Vectored Interrupt Controller NVIC & Thread Synchronization).


---


## 📋 Complete Master Topic-to-Lecture Mapping Table (All 120 Topics)


| No. | Topic | Assigned Student | Student ID | Grp | Seq | Linked Lecture File & Page References |

| :--- | :--- | :--- | :--- | :--- | :--- | :--- |

| 1 | CPU | นางสาวนรมน พุ่มไสว | 67363139 | 2 | 11 | [Lecture 1 (P.10,12,13,14,15,18,20)](../../lecture/lecture1-markdown/lecture1_complete.md) <br> [Lecture 2 (P.2)](../../lecture/lecture2-markdown/lecture_2_complete.md) |
| 2 | RAM | นายนราวิชญ์ พรมฝาย | 67363153 | 2 | 12 | [Lecture 1 (P.4,9,10,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33)](../../lecture/lecture1-markdown/lecture1_complete.md) <br> [Lecture 2 (P.1,2,3,4,5,6,7,8,9,10,11)](../../lecture/lecture2-markdown/lecture_2_complete.md) <br> [Lecture 2V2 (P.2,3,4,5,7,8,9,10,11,12,13,14,15)](../../lecture/lecture2v2-pptx-markdown/lecture_2v2_complete.md) <br> [Lecture 3 (P.2,3,4,5,6,7,8,9,10,11,12,13)](../../lecture/lecture3-markdown/lecture_3_complete.md) <br> [Lecture 4 (P.2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31)](../../lecture/lecture4-markdown/lecture_4_complete.md) |
| 3 | ROM | นายทักษ์ดนัยใจดี | 67362330 | 2 | 9 | [Lecture 1 (P.4,9,10,18,19,21,26,27,28)](../../lecture/lecture1-markdown/lecture1_complete.md) <br> [Lecture 2 (P.2,4,5)](../../lecture/lecture2-markdown/lecture_2_complete.md) <br> [Lecture 2V2 (P.5,7,8,10,11,12,13)](../../lecture/lecture2v2-pptx-markdown/lecture_2v2_complete.md) <br> [Lecture 3 (P.2,3,4,6,7,9,10)](../../lecture/lecture3-markdown/lecture_3_complete.md) <br> [Lecture 4 (P.13,23,24,28)](../../lecture/lecture4-markdown/lecture_4_complete.md) |
| 4 | Bus structure | นาย ณวัตร เสือสีนาค | 67361739 | 2 | 6 | [Lecture 1](../../lecture/lecture1-markdown/lecture1_complete.md) / [Textbook](../../textbook/) |
| 5 | Time Diagram | *Unassigned* | - | - | - | [Lecture 3](../../lecture/lecture3-markdown/lecture_3_complete.md) |
| 6 | BCD Code | นาย กฤติน บูรณโชคไพศาล | 67360398 | 1 | 11 | [Textbook Reference Core](../../textbook/) |
| 7 | Block diagram | นาย ฉมาบดี สระทองพิม | 67361272 | 2 | 5 | [Lecture 1 (P.4,9)](../../lecture/lecture1-markdown/lecture1_complete.md) <br> [Lecture 2V2 (P.10)](../../lecture/lecture2v2-pptx-markdown/lecture_2v2_complete.md) |
| 8 | Buffer | นายไกรวิชญ์ คุ้มสิงสัน | 67360787 | 2 | 2 | [Lecture 3 (P.12)](../../lecture/lecture3-markdown/lecture_3_complete.md) |
| 9 | 8051 | นายชัยสิทธิ์ บุญประเสริฐ | 66361174 | 1 | 3 | [Lecture 1 (P.17,18,19,20,21,22,24,25,26,33)](../../lecture/lecture1-markdown/lecture1_complete.md) <br> [Lecture 2 (P.2,3,4,5,6)](../../lecture/lecture2-markdown/lecture_2_complete.md) <br> [Lecture 2V2 (P.6,8,10)](../../lecture/lecture2v2-pptx-markdown/lecture_2v2_complete.md) <br> [Lecture 3 (P.2,3,5,6,7,9,10,11,12)](../../lecture/lecture3-markdown/lecture_3_complete.md) <br> [Lecture 4 (P.5,6,10,25,26,27,28,29)](../../lecture/lecture4-markdown/lecture_4_complete.md) |
| 10 | 8085 | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 11 | 8086 | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 12 | 8088 | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 13 | 80486SX | นาย ณัฐวัฒน์ ปายิ้ม | 67362088 | 1 | 20 | [Textbook Reference Core](../../textbook/) |
| 14 | 80386DX | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 15 | 80x86 | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 16 | UDART | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 17 | Accumulators | นายปิยพนธ์ อ่วมเปี่ยม | 67363733 | 1 | 31 | [Lecture 3](../../lecture/lecture3-markdown/lecture_3_complete.md) |
| 18 | ADC structures | นายภูเบศ วันดี | 67364686 | 1 | 39 | [Textbook Reference Core](../../textbook/) |
| 19 | AMD Sx86 | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 20 | AMD KS | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 21 | Cyrix SX8 | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 22 | Cyrix 6X86 | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 23 | CISC | นายพสุธร พิพัฒน์ธาดานุกูล | 67364174 | 1 | 36 | [Lecture 1 (P.17)](../../lecture/lecture1-markdown/lecture1_complete.md) |
| 24 | COM programs | *Unassigned* | - | - | - | [Lecture 3](../../lecture/lecture3-markdown/lecture_3_complete.md) |
| 25 | Arithmetic instructions | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 26 | machine cycles | นายปุณณัตถ์ พรหมเลิศ | 67363849 | 1 | 33 | [Textbook Reference Core](../../textbook/) |
| 27 | DAC | นายธนกฤต ศรีเดช | 67362415 | 1 | 23 | [Textbook Reference Core](../../textbook/) |
| 28 | ADC | กมลพร พิสุทธไทรงาม | 67360275 | 1 | 10 | [Textbook Reference Core](../../textbook/) |
| 29 | Data transfer schemes | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 30 | RISC | รัตติกาญจน์ ก้านแก้ว | 67365126 | 2 | 19 | [Lecture 1 (P.17)](../../lecture/lecture1-markdown/lecture1_complete.md) |
| 31 | DMA operation | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 32 | Discrete implementation | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 33 | Direct memory access | พีรพล สุริยะ | 66363635 | 1 | 8 | [Lecture 3](../../lecture/lecture3-markdown/lecture_3_complete.md) |
| 34 | Evolution of intel processo | นางสาวจิรัชญา นิลพันธุ์ | 67361067 | 1 | 13 | [Textbook Reference Core](../../textbook/) |
| 35 | Evolution of a microprocessor | รัชพล หอมสะอาด | 67365065 | 2 | 18 | [Textbook Reference Core](../../textbook/) |
| 36 | Flip-flop | วรัญยา พันชมภู | 67365409 | 2 | 20 | [Textbook Reference Core](../../textbook/) |
| 37 | Functional description | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 38 | General purpose registers | *Unassigned* | - | - | - | [Lecture 1](../../lecture/lecture1-markdown/lecture1_complete.md) / [Textbook](../../textbook/) |
| 39 | Immediate addressing mode | ปกรธรรม มีบุญ | 67363474 | 2 | 13 | [Lecture 4 (P.9)](../../lecture/lecture4-markdown/lecture_4_complete.md) |
| 40 | Instruction cycle | *Unassigned* | - | - | - | [Lecture 1 (P.29,30,31,32)](../../lecture/lecture1-markdown/lecture1_complete.md) <br> [Lecture 2 (P.11)](../../lecture/lecture2-markdown/lecture_2_complete.md) |
| **41** | **Interrupt Mechanism** ⭐ | **ธีรภัทร ภู่ระย้า** | **66362416** | **1** | **4** | **[Textbook Reference Core](../../textbook/)** |
| 42 | Linker | ต้นน้ำ พวงวิไล | 67362248 | 1 | 22 | [Lecture 4 (P.4)](../../lecture/lecture4-markdown/lecture_4_complete.md) |
| 43 | MSI implementation | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 44 | Multiplexed address/data bus | นายธนกฤต ทรงวิรัตน์ | 67362422 | 2 | 10 | [Lecture 1](../../lecture/lecture1-markdown/lecture1_complete.md) / [Textbook](../../textbook/) |
| 45 | Mainframe computer | ฉัตรดนัย สุฤทธิ์ | 67361296 | 1 | 14 | [Lecture 3](../../lecture/lecture3-markdown/lecture_3_complete.md) |
| 46 | Operational description | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 47 | Pin configuration | ณิชารีย์ วิศิษฏ์ศิริโสภา | 67362187 | 2 | 7 | [Lecture 2](../../lecture/lecture2-markdown/lecture_2_complete.md) / [Lecture 2V2](../../lecture/lecture2v2-pptx-markdown/lecture_2v2_complete.md) |
| 48 | Program counte | นางสาวสิริวรรณ บุญเจริญ | 67366178 | 2 | 22 | [Lecture 1 (P.23)](../../lecture/lecture1-markdown/lecture1_complete.md) |
| 49 | clock frequency signals | นายปิยะวัฒน์ ใจเงิน | 67363788 | 1 | 32 | [Textbook Reference Core](../../textbook/) |
| 50 | RISC | นางสาวอมรรัตน์ วัฒทา | 67366796 | 1 | 44 | [Lecture 1 (P.17)](../../lecture/lecture1-markdown/lecture1_complete.md) |
| 51 | Register addressing mode | *Unassigned* | - | - | - | [Lecture 4 (P.10)](../../lecture/lecture4-markdown/lecture_4_complete.md) |
| 52 | Register indirect addressing | *Unassigned* | - | - | - | [Lecture 1](../../lecture/lecture1-markdown/lecture1_complete.md) / [Textbook](../../textbook/) |
| 53 | Stack pointer | เมธิชไชย ลำนวล | 67364877 | 1 | 41 | [Lecture 1 (P.22)](../../lecture/lecture1-markdown/lecture1_complete.md) <br> [Lecture 3 (P.12)](../../lecture/lecture3-markdown/lecture_3_complete.md) |
| 54 | Supercompute | อัครพล เหล่ารอด | 67366901 | 1 | 45 | [Textbook Reference Core](../../textbook/) |
| 55 | Scalar processor | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 56 | Three-byte instructions | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 57 | Instruction Cycle | *Unassigned* | - | - | - | [Lecture 1 (P.29,30,31,32)](../../lecture/lecture1-markdown/lecture1_complete.md) <br> [Lecture 2 (P.11)](../../lecture/lecture2-markdown/lecture_2_complete.md) |
| 58 | Intel Pentium | นายนครนพ ศรีเดช | 66362492 | 1 | 5 | [Textbook Reference Core](../../textbook/) |
| 59 | intel Pentium with MMX Technology | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 60 | intel Pentium Pro | นายนราวิชญ์ อินทุทรัพย์ | 66362614 | 1 | 6 | [Textbook Reference Core](../../textbook/) |
| 61 | Bit Manipulation | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 62 | Vector Processor | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 63 | ALU | นางสาวภัทราพร แสงแก้วสุข | 67364525 | 2 | 17 | [Lecture 1 (P.4,9,14,16,22)](../../lecture/lecture1-markdown/lecture1_complete.md) <br> [Lecture 2 (P.2)](../../lecture/lecture2-markdown/lecture_2_complete.md) <br> [Lecture 4 (P.7,21)](../../lecture/lecture4-markdown/lecture_4_complete.md) |
| 64 | Commpliers | นายปภังกร หัสรังษี | 67363542 | 2 | 15 | [Textbook Reference Core](../../textbook/) |
| 65 | AT&T syntax | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 66 | MSB | *Unassigned* | - | - | - | [Lecture 2V2 (P.14)](../../lecture/lecture2v2-pptx-markdown/lecture_2v2_complete.md) <br> [Lecture 3 (P.6)](../../lecture/lecture3-markdown/lecture_3_complete.md) |
| 67 | bits bytes, nimbles and number conversion | นายปภังกร คงการุณ | 67363535 | 1 | 30 | [Textbook Reference Core](../../textbook/) |
| 68 | Low pin count devices | *Unassigned* | - | - | - | [Lecture 2](../../lecture/lecture2-markdown/lecture_2_complete.md) / [Lecture 2V2](../../lecture/lecture2v2-pptx-markdown/lecture_2v2_complete.md) |
| 69 | SPI | นางสาวณัฐธิณี รักษายศ | 67361890 | 1 | 18 | [Textbook Reference Core](../../textbook/) |
| 70 | PROM | นายนันทพงศ์ ชาติสุนทร | 67363252 | 1 | 29 | [Lecture 2 (P.4)](../../lecture/lecture2-markdown/lecture_2_complete.md) |
| 71 | EPROM | กัณณสุข เฉลิมวิสุตม์กุล | 67360534 | 2 | 1 | [Lecture 2 (P.4)](../../lecture/lecture2-markdown/lecture_2_complete.md) |
| 72 | EEPROM | นางสาวปัณฑารีย์ ฟักปลั่ง | 67363672 | 2 | 16 | [Lecture 3](../../lecture/lecture3-markdown/lecture_3_complete.md) |
| 73 | I2C | นายชยานันต์ รอดซุง | 67361425 | 1 | 16 | [Textbook Reference Core](../../textbook/) |
| 74 | XA | *Unassigned* | - | - | - | [Lecture 2V2 (P.3,4,5,11,12,13,14)](../../lecture/lecture2v2-pptx-markdown/lecture_2v2_complete.md) <br> [Lecture 4 (P.5,8,9,10,11,13,16)](../../lecture/lecture4-markdown/lecture_4_complete.md) |
| 75 | Dual in line | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 76 | XAG49 devices | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 77 | PLCC | *Unassigned* | - | - | - | [Lecture 1 (P.33)](../../lecture/lecture1-markdown/lecture1_complete.md) |
| 78 | Watchdog timer | นายธีรนัย เสนพนัสสัก | 67362835 | 1 | 26 | [Textbook Reference Core](../../textbook/) |
| 79 | Special F'I,ctopm Regosters (SFR) | *Unassigned* | - | - | - | [Lecture 3](../../lecture/lecture3-markdown/lecture_3_complete.md) |
| 80 | Multiprocessor system | ณัฐมน แสงลี | 67362057 | 1 | 19 | [Textbook Reference Core](../../textbook/) |
| 81 | Multitasking | นางสาวชิตาพัณณ์ จิตร์ธนาวัฒน์ | 67361517 | 1 | 17 | [Textbook Reference Core](../../textbook/) |
| 82 | WinISP | *Unassigned* | - | - | - | [Lecture 4](../../lecture/lecture4-markdown/lecture_4_complete.md) |
| 83 | Full Duplex | ผกามาศ อินกรัด | 67363917 | 1 | 34 | [Lecture 2](../../lecture/lecture2-markdown/lecture_2_complete.md) / [Lecture 2V2](../../lecture/lecture2v2-pptx-markdown/lecture_2v2_complete.md) |
| 84 | Half Duplex | จักรภัทร ก้อนทอง | 67360909 | 2 | 3 | [Lecture 2](../../lecture/lecture2-markdown/lecture_2_complete.md) / [Lecture 2V2](../../lecture/lecture2v2-pptx-markdown/lecture_2v2_complete.md) |
| 85 | Baud rate | นายอัษณัช แก้วเผือก | 67366925 | 1 | 46 | [Lecture 2](../../lecture/lecture2-markdown/lecture_2_complete.md) / [Lecture 2V2](../../lecture/lecture2v2-pptx-markdown/lecture_2v2_complete.md) |
| 86 | Latch | นพกร กันทากาศ | 67363030 | 1 | 28 | [Lecture 2 (P.4)](../../lecture/lecture2-markdown/lecture_2_complete.md) <br> [Lecture 2V2 (P.9)](../../lecture/lecture2v2-pptx-markdown/lecture_2v2_complete.md) <br> [Lecture 3 (P.12)](../../lecture/lecture3-markdown/lecture_3_complete.md) |
| 87 | Hybrid Real-time System | นายอภิชาติ วงค์เมือง | 67366680 | 2 | 24 | [Textbook Reference Core](../../textbook/) |
| 88 | Polling Method | นายเตชิต เชตพันธ์ | 67362255 | 2 | 8 | [Textbook Reference Core](../../textbook/) |
| 89 | Bus Request Method | *Unassigned* | - | - | - | [Lecture 1](../../lecture/lecture1-markdown/lecture1_complete.md) / [Textbook](../../textbook/) |
| 90 | Daisy Chain Method | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 91 | Asynchronous Serial Data Tansmission | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 92 | Synchronous Serial Data Tansmission | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 93 | Jitter | ชนณัฐ ไพรทอง | 66361075 | 1 | 2 | [Textbook Reference Core](../../textbook/) |
| 94 | Overlapping interuptes | *Unassigned* | - | - | - | [Lecture 2](../../lecture/lecture2-markdown/lecture_2_complete.md) / [Lecture 2V2](../../lecture/lecture2v2-pptx-markdown/lecture_2v2_complete.md) |
| 95 | Object Linkiing and Embedding (OLE) | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 96 | RIM instruction | นายภานุพงษ์ นวลเกตุ | 67364648 | 1 | 38 | [Textbook Reference Core](../../textbook/) |
| 97 | Real Time operation System | สุวิจักขณ์ พรหมบุญ | 67366475 | 2 | 23 | [Textbook Reference Core](../../textbook/) |
| 98 | Specific Integrated Circuits | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 99 | White-box testing | เมธัส แก้วบัวรมย์ | 66364120 | 1 | 9 | [Textbook Reference Core](../../textbook/) |
| 100 | Black-box testing | สุภชัย ใบบัวเงิน | 67366406 | 1 | 42 | [Textbook Reference Core](../../textbook/) |
| 101 | Cache memory | พชร กลางจิต | 67363955 | 1 | 35 | [Lecture 3](../../lecture/lecture3-markdown/lecture_3_complete.md) |
| 102 | Kennel systems | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 103 | In Circuit emulator | นาย จาตุรนต์ มูลงาม | 67360947 | 2 | 4 | [Lecture 4](../../lecture/lecture4-markdown/lecture_4_complete.md) |
| 104 | Archicture of AVR | ภัสสร เอี่ยมสนาม | 67364556 | 1 | 37 | [Textbook Reference Core](../../textbook/) |
| 105 | PIC Microcontroller | นายชยานนท์ วันเย็น | 67361418 | 1 | 15 | [Textbook Reference Core](../../textbook/) |
| 106 | SPAC Architecture | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 107 | MIPS Processor | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 108 | Task,Thread Proeesses | นางสาวเหมหงษ์ จำปานวน | 67366536 | 1 | 43 | [Textbook Reference Core](../../textbook/) |
| 109 | FPGA | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 110 | Microchip | ธีรวัจน์ ยอดทองดี | 67362934 | 1 | 27 | [Textbook Reference Core](../../textbook/) |
| 111 | PGA (Pin Grid Arra;y) | *Unassigned* | - | - | - | [Lecture 2](../../lecture/lecture2-markdown/lecture_2_complete.md) / [Lecture 2V2](../../lecture/lecture2v2-pptx-markdown/lecture_2v2_complete.md) |
| 112 | OTP(One Time Programable memory) | ปราณปรียา ศรียอง | 66363116 | 1 | 7 | [Lecture 3](../../lecture/lecture3-markdown/lecture_3_complete.md) |
| 113 | Opto sensor | ธนัท โพธิ์ทอง | 67362620 | 1 | 24 | [Textbook Reference Core](../../textbook/) |
| 114 | Sleep Operation | ณิชาภัทร แสงสุวรรณ | 67362156 | 1 | 21 | [Textbook Reference Core](../../textbook/) |
| 115 | SCADA | สิทธิพล แซว้า | 67366062 | 2 | 21 | [Textbook Reference Core](../../textbook/) |
| 116 | Circuit diagram | *Unassigned* | - | - | - | [Lecture 3](../../lecture/lecture3-markdown/lecture_3_complete.md) |
| 117 | stripboard layout | *Unassigned* | - | - | - | [Textbook Reference Core](../../textbook/) |
| 118 | Block Diagram | นายกฤษณะพงษ์  อินหา | 67360466 | 1 | 12 | [Lecture 1 (P.4,9)](../../lecture/lecture1-markdown/lecture1_complete.md) <br> [Lecture 2V2 (P.10)](../../lecture/lecture2v2-pptx-markdown/lecture_2v2_complete.md) |
| 119 | flowchart | นางสาวมณฑิตา พลายทอง | 67364808 | 1 | 40 | [Textbook Reference Core](../../textbook/) |
| 120 | TTL | นางสาวปณิตา เถา | 67363511 | 2 | 14 | [Textbook Reference Core](../../textbook/) |