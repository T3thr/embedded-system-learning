# Lecture 2V2
## Complete Single-File AI-Research Document

> **Source File**: Lecture 2V2.pptx  
> **Total Pages/Slides**: 15 pages  
> **Format**: Single-File Bundle with Zero-Drift Page Markers, Syntax Highlighting, 300 DPI Cropped Figures, and Deep Domain Walkthrough Descriptions

---


<!-- Page 1 -->
### [PDF Page 1]

Lecture 2





<!-- Page 2 -->
### [PDF Page 2]



> **Transcribed Media / Table Text**:
> 7F
> 30
> General Purpose



![Figure [Slide 2 Rendered Preview]](images/fig_002_slide_preview.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Slide 2 Rendered Preview]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [7F; 30; General Purpose].

> **Figure [Slide 2 Rendered Preview]**




<!-- Page 3 -->
### [PDF Page 3]



> **Transcribed Media / Table Text**:
> - Register B
> - It is 8 bits register.
> - It is dedicated for Multiplication and Division.
> U Example:
> MUL AB
> DIV AB
> ;BA-A X B
> ;A/B, stores quotient in
> A & remainder in BE



![Figure [Slide 3 Rendered Preview]](images/fig_003_slide_preview.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Slide 3 Rendered Preview]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [• Register B; • It is 8 bits register.; • It is dedicated for Multiplication and Division.; U Example:; MUL AB; DIV AB; ;BA-A X B; ;A/B, stores quotient in].

> **Figure [Slide 3 Rendered Preview]**




<!-- Page 4 -->
### [PDF Page 4]



> **Transcribed Media / Table Text**:
> - Accumulator A
> - Accumulator is 8 bits register.
> - Most of Arithmetic and Logical operations are
> performed with respect to accumulator.
> - Example:
> ADD A, RO
> ANL A,R1
> ;A-A+RO
> ;A-A AND R1



![Figure [Slide 4 Rendered Preview]](images/fig_004_slide_preview.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Slide 4 Rendered Preview]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [* Accumulator A; • Accumulator is 8 bits register.; • Most of Arithmetic and Logical operations are; performed with respect to accumulator.; • Example:; ADD A, RO; ANL A,R1; ;A-A+RO].

> **Figure [Slide 4 Rendered Preview]**




<!-- Page 5 -->
### [PDF Page 5]



> **Transcribed Media / Table Text**:
> - DPTR - Data Pointer
> - It is 16 bits register.
> - It holds address of Data in memory of RAM.
> - DPTR is further divided into two registers of
> 8bits {DPH - Higher Byte & DPL - Lower Byte}.
> - It is used by programmer to transfer data from
> external RAM.
> - It can also be used as pointer for look up table
> in ROM, using indexed Addressing Mode.
> - Example:
> MOVX A,@DPTR ;A will get data from
> RAM pointed by DPTR
> MOVC A,@A+DPTR;A will get data from
> ROM pointed by DPTR+A|



![Figure [Slide 5 Rendered Preview]](images/fig_005_slide_preview.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Slide 5 Rendered Preview]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [* DPTR - Data Pointer; • It is 16 bits register.; • It holds address of Data in memory of RAM.; • DPTR is further divided into two registers of; 8bits {DPH - Higher Byte & DPL - Lower Byte}.; • It is used by programmer to transfer data from; external RAM.; • It can also be used as pointer for look up table].

> **Figure [Slide 5 Rendered Preview]**




<!-- Page 6 -->
### [PDF Page 6]

IO Ports of 8051





<!-- Page 7 -->
### [PDF Page 7]



> **Transcribed Media / Table Text**:
> External Interrupts
> Interrupt
> Control
> 4KB ROM
> 128 Byte
> RAM
> CPŮ
> Oscillator
> Bus
> Control
> XTAL1
> XTAL2
> 12MHz
> Four
> I0 Ports
> IIII
> P2
> P1 P3
> Address / Data
> Timer 1
> Timer 0
> Serial
> Ports
> TxD
> RxD
> Timer
> Clock
> Input



![Figure [Slide 7 Rendered Preview]](images/fig_007_slide_preview.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Slide 7 Rendered Preview]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [External Interrupts; Interrupt; Control; 4KB ROM; 128 Byte; RAM; CPŮ; Oscillator].

> **Figure [Slide 7 Rendered Preview]**




<!-- Page 8 -->
### [PDF Page 8]



> **Transcribed Media / Table Text**:
> PSEN +
> EA
> ALE 4
> RESET
> XTAL1
> 12MHz
> XTAL2
> Vcc
> Vss •
> Microcontroller
> 8051
> PIN Diagram
> - EA - Enable External Access
> - 8051 has internal 4KB ROM.
> - If EA = 0, 8051 will discards internal 4KB ROM and
> external ROM memory location will starts from
> 0000H.
> - If EA = 1, 8051 will consider internal 4KB ROM with
> starting address 0000H to ending address OFFFH and
> External ROM memory location will starts from
> 1000H.
> '; PSEN - Program Status Enable
> - 8051 has 16 bits Address AO-A15. by that we can
> interface 64KB of external ROM and 64KB of external
> RAM, making it total 128KB memory space.
> - Both have same address range 0000H to FFFFH
> - PSEN reads data from external ROM.
> - RD and WR are used for read and write of external
> RAM.
> O PSEN is referred as program status enable, as it
> allows program to be read from external ROM.



![Figure [Slide 8 Rendered Preview]](images/fig_008_slide_preview.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Slide 8 Rendered Preview]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [PSEN +; EA; ALE 4; RESET; XTAL1; 12MHz; XTAL2; Vcc].

> **Figure [Slide 8 Rendered Preview]**




<!-- Page 9 -->
### [PDF Page 9]



> **Transcribed Media / Table Text**:
> Read
> Latch
> Internal
> Bus
> Write
> Latch
> D
> CL
> P2.X
> Latch
> Read
> Pin
> Q
> Address
> Control
> Vcc
> MUX
> P2.X
> PIN
> -
> PORT 2 BIT



![Figure [Slide 9 Rendered Preview]](images/fig_009_slide_preview.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Slide 9 Rendered Preview]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [Read; Latch; Internal; Bus; Write; Latch; D; CL].

> **Figure [Slide 9 Rendered Preview]**




<!-- Page 10 -->
### [PDF Page 10]


### Block Diagram of 8051



> **Transcribed Media / Table Text**:
> External Interrupts
> Interrupt
> Control
> 4KB ROM
> 128 Byte
> RAM
> CPŮ
> Oscillator
> Bus
> Control
> XTAL1
> XTAL2
> 12MHz
> Four
> I0 Ports
> IIII
> P2
> P1 P3
> Address / Data
> Timer 1
> Timer 0
> Serial
> Ports
> TxD
> RxD
> Timer
> Clock
> Input



![Figure [Slide 10 Picture 1]](images/fig_010_pic_1.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Slide 10 Picture 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [External Interrupts; Interrupt; Control; 4KB ROM; 128 Byte; RAM; CPŮ; Oscillator].

> **Figure [Slide 10 Picture 1]**




<!-- Page 11 -->
### [PDF Page 11]



> **Transcribed Media / Table Text**:
> External Interrupts
> Interrupt
> Control
> 4KB ROM
> 128 Byte
> RAM
> CPŮ
> Oscillator
> Bus
> Control
> XTAL1
> XTAL2
> 12MHz
> Four
> I0 Ports
> IIII
> P2
> P1 P3
> Address / Data
> Timer 1
> Timer 0
> Serial
> Ports
> TxD
> RxD
> Timer
> Clock
> Input


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | ***** | Accumulator A |
> | **•** | Accumulator is 8 bits register. |
> | **•** | Most of Arithmetic and Logical operations are |
> | **performed** | with respect to accumulator. |
> | **•** | Example: |
> | **ADD** | A, RO |
> | **ANL** | A,R1 |
> | Feature 8 | ;A-A+RO |
> | **;A-A** | AND R1 |


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | **•** | Register B |
> | **•** | It is 8 bits register. |
> | **•** | It is dedicated for Multiplication and Division. |
> | **U** | Example: |
> | **MUL** | AB |
> | **DIV** | AB |
> | **;BA-A** | X B |
> | **;A/B,** | stores quotient in |
> | **A** | & remainder in BE |



![Figure [Slide 11 Picture 1]](images/fig_011_pic_1.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Slide 11 Picture 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [External Interrupts; Interrupt; Control; 4KB ROM; 128 Byte; RAM; CPŮ; Oscillator].

> **Figure [Slide 11 Picture 1]**


![Figure [Slide 11 Picture 2]](images/fig_011_pic_2.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Slide 11 Picture 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [* Accumulator A; • Accumulator is 8 bits register.; • Most of Arithmetic and Logical operations are; performed with respect to accumulator.; • Example:; ADD A, RO; ANL A,R1; ;A-A+RO].

> **Figure [Slide 11 Picture 2]**


![Figure [Slide 11 Picture 3]](images/fig_011_pic_3.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Slide 11 Picture 3]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [• Register B; • It is 8 bits register.; • It is dedicated for Multiplication and Division.; U Example:; MUL AB; DIV AB; ;BA-A X B; ;A/B, stores quotient in].

> **Figure [Slide 11 Picture 3]**




<!-- Page 12 -->
### [PDF Page 12]



> **Transcribed Media / Table Text**:
> External Interrupts
> Interrupt
> Control
> 4KB ROM
> 128 Byte
> RAM
> CPŮ
> Oscillator
> Bus
> Control
> XTAL1
> XTAL2
> 12MHz
> Four
> I0 Ports
> IIII
> P2
> P1 P3
> Address / Data
> Timer 1
> Timer 0
> Serial
> Ports
> TxD
> RxD
> Timer
> Clock
> Input


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | ***** | DPTR - Data Pointer |
> | **•** | It is 16 bits register. |
> | **•** | It holds address of Data in memory of RAM. |
> | **•** | DPTR is further divided into two registers of |
> | **8bits** | {DPH - Higher Byte & DPL - Lower Byte}. |
> | **•** | It is used by programmer to transfer data from |
> | **external** | RAM. |
> | **•** | It can also be used as pointer for look up table |
> | **in** | ROM, using indexed Addressing Mode. |
> | **•** | Example: |
> | **MOVX** | A,@DPTR ;A will get data from |
> | **RAM** | pointed by DPTR |
> | **MOVC** | A,@A+DPTR;A will get data from |
> | **ROM** | pointed by DPTR+A| |



![Figure [Slide 12 Picture 1]](images/fig_012_pic_1.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Slide 12 Picture 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [External Interrupts; Interrupt; Control; 4KB ROM; 128 Byte; RAM; CPŮ; Oscillator].

> **Figure [Slide 12 Picture 1]**


![Figure [Slide 12 Picture 2]](images/fig_012_pic_2.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Slide 12 Picture 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [* DPTR - Data Pointer; • It is 16 bits register.; • It holds address of Data in memory of RAM.; • DPTR is further divided into two registers of; 8bits {DPH - Higher Byte & DPL - Lower Byte}.; • It is used by programmer to transfer data from; external RAM.; • It can also be used as pointer for look up table].

> **Figure [Slide 12 Picture 2]**




<!-- Page 13 -->
### [PDF Page 13]



> **Transcribed Media / Table Text**:
> External Interrupts
> Interrupt
> Control
> 4KB ROM
> 128 Byte
> RAM
> CPŮ
> Oscillator
> Bus
> Control
> XTAL1
> XTAL2
> 12MHz
> Four
> I0 Ports
> IIII
> P2
> P1 P3
> Address / Data
> Timer 1
> Timer 0
> Serial
> Ports
> TxD
> RxD
> Timer
> Clock
> Input


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | **•** | PSW - Program Status Word |
> | **•** | It is 8 bits register. |
> | **•** | It is also called the "Flag Register". |
> | **•** | It gives status after every instruction execution |
> | **in** | program. |
> | **•** | The flags can also be changed by programmer. |
> | **•** | PSW is bit addressable register. |
> | **•** | Example: |
> | **SETB** | PSW.2 |
> | **CLR** | PSW.2 |
> | **;PSW.2** | = 1 |
> | **;PSW.2** | = 0 |



![Figure [Slide 13 Picture 1]](images/fig_013_pic_1.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Slide 13 Picture 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [External Interrupts; Interrupt; Control; 4KB ROM; 128 Byte; RAM; CPŮ; Oscillator].

> **Figure [Slide 13 Picture 1]**


![Figure [Slide 13 Picture 2]](images/fig_013_pic_2.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Slide 13 Picture 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [• PSW - Program Status Word; • It is 8 bits register.; • It is also called the "Flag Register".; • It gives status after every instruction execution; in program.; • The flags can also be changed by programmer.; • PSW is bit addressable register.; • Example:].

> **Figure [Slide 13 Picture 2]**




<!-- Page 14 -->
### [PDF Page 14]

PSW / Flag Register


> **Transcribed Media / Table Text**:
> CY
> AC
> FO
> RS1
> RSO
> OVR
> P


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | **•;** | OVR - Overflow Flag |
> | **•** | OVR = 1, Signed overflow |
> | **•** | OVR = 0, No Signed overflow |
> | **•** | It happens when result goes beyond 127 to -128. |
> | **•** | After overflow, sign of result (MSB} becomes wrong. |
> | **•** | RS - Register Bank Select |
> | **•** | RS = 00, Register Bank 0, {Default} |
> | **•** | RS = 01, Register Bank 1 |
> | **•** | RS = 10, Register Bank 2 |
> | **•** | RS = 11, Register Bank 3 |
> | **•** | By CLR and SETB instructions we can select register bank. |
> | Feature 12 | Example |
> | **CLR** | PSW.4 |
> | **SETB** | PSW.3 ; Here RS = 01 means bank 1 is selected |


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | **"** | FO - User Defined Flag |
> | **•** | Set by user using SETB PSW.5 |
> | **•** | Clear by user using CLR PSW.5 |
> | ***** | AC - Axillary Carry Flag |
> | **•** | AC = 1, Nibble to Nibble Carry |
> | **•** | AC = 0, No Nibble to Nibble Carry |


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | ***** | CY - Carry Flag |
> | **•** | cY = 1, Result has Carry. |
> | **•** | cY = 0, Result has no Carry. |



![Figure [Slide 14 Picture 1]](images/fig_014_pic_1.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Slide 14 Picture 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [CY; AC; FO; RS1; RSO; OVR; P].

> **Figure [Slide 14 Picture 1]**


![Figure [Slide 14 Picture 2]](images/fig_014_pic_2.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Slide 14 Picture 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [•; OVR - Overflow Flag; • OVR = 1, Signed overflow; • OVR = 0, No Signed overflow; • It happens when result goes beyond 127 to -128.; • After overflow, sign of result (MSB} becomes wrong.; • RS - Register Bank Select; • RS = 00, Register Bank 0, {Default}; • RS = 01, Register Bank 1].

> **Figure [Slide 14 Picture 2]**


![Figure [Slide 14 Picture 3]](images/fig_014_pic_3.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Slide 14 Picture 3]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [" FO - User Defined Flag; • Set by user using SETB PSW.5; • Clear by user using CLR PSW.5; * AC - Axillary Carry Flag; • AC = 1, Nibble to Nibble Carry; • AC = 0, No Nibble to Nibble Carry].

> **Figure [Slide 14 Picture 3]**


![Figure [Slide 14 Picture 4]](images/fig_014_pic_4.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Slide 14 Picture 4]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [* CY - Carry Flag; • cY = 1, Result has Carry.; • cY = 0, Result has no Carry.].

> **Figure [Slide 14 Picture 4]**




<!-- Page 15 -->
### [PDF Page 15]

Internal Memory Organization
ขนาด 00 H- 7F H


> **Transcribed Media / Table Text**:
> 2F
> 2€
> 2D
> 2C
> 2B
> 2A
> 29
> 28
> 27
> 26
> 25
> 24
> 23
> 22
> 21
> 20
> 77
> 6F
> 67
> 5F
> 57
> 4F
> 47
> 3F
> 37
> 2F
> 27
> 1F
> 17
> OF
> 07
> 78
> 70
> 68
> 60
> 58
> 50
> 48
> 40
> 38
> 30
> 28
> 20
> 18
> 10
> 08
> 00
> Bit Addressable


> **Transcribed Media / Table Text**:
> 7F
> 30
> General Purpose



![Figure [Slide 15 Picture 1]](images/fig_015_pic_1.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Slide 15 Picture 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [2F; 2€; 2D; 2C; 2B; 2A; 29; 28].

> **Figure [Slide 15 Picture 1]**


![Figure [Slide 15 Picture 2]](images/fig_015_pic_2.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Slide 15 Picture 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [7F; 30; General Purpose].

> **Figure [Slide 15 Picture 2]**



