# Lecture 3
## Complete Single-File AI-Research Document

> **Source File**: Lecture 3.pdf  
> **Total Pages/Slides**: 13 pages  
> **Format**: Single-File Bundle with Zero-Drift Page Markers, Syntax Highlighting, 300 DPI Cropped Figures, and Deep Domain Walkthrough Descriptions

---


<!-- Page 1 -->
### [PDF Page 1]

Lecture 3





<!-- Page 2 -->
### [PDF Page 2]

Memory Organization


> **Transcribed Media / Table Text**:
> - * 8051 Microcontroller Memory
> - 8051 can have four different memories:
> - Internal ROM {4KB)
> - Internal RAM (128 byte}
> - External ROM {Max 64KB}
> - External RAM (Max 64KB}
> - Architecture of 8051 Microcontroller
> - 8051 follows Harvard Architecture.
> - So, with 8051 Program memory is ROM and
> Data memory is RAM.



![Figure [Page 2 Media 1]](images/fig_002_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 2 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [** 8051 Microcontroller Memory; • 8051 can have four different memories:; • Internal ROM {4KB); • Internal RAM (128 byte}; • External ROM {Max 64KB}; • External RAM (Max 64KB}; • Architecture of 8051 Microcontroller; • 8051 follows Harvard Architecture.].

> **Figure [Page 2 Media 1]**




<!-- Page 3 -->
### [PDF Page 3]

Memory Organization


> **Transcribed Media / Table Text**:
> - Applications of 8051 Microcontroller
> - Microcontroller is used in many embedded
> system
> applications.
> {Remote
> control,
> Microwave Oven, Watching Machine etc.}
> - Once controller is embedded in application,
> program of controller should be fixed and it
> should be stored in ROM.
> - Data may change in application like time,
> temperature and it will be stored in RAM.
> - Fixed data will be stored in ROM as look up
> table. (ASCII, SSD etc.}



![Figure [Page 3 Media 1]](images/fig_003_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 3 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [* Applications of 8051 Microcontroller; • Microcontroller is used in many embedded; system; applications.; {Remote; control,; Microwave Oven, Watching Machine etc.}; • Once controller is embedded in application,].

> **Figure [Page 3 Media 1]**




<!-- Page 4 -->
### [PDF Page 4]

Only Internal ROM
EA = 1
0000H
Internal ROM
4KB
ROM Organization
Internal & External
ROM
EA = 1
0000H
Internal ROM
4KB
Only External ROM
EA = 0
0000H
OFFH
OFFFH
1000H
External ROM
064KB
External ROM
60KB
FFFFH
FFFFH


> **Transcribed Media / Table Text**:
> Only Internal ROM
> EA = 1
> 0000H
> Internal ROM
> 4KB
> ROM Organization
> Internal & External
> ROM
> EA = 1
> 0000H
> Internal ROM
> 4KB
> Only External ROM
> EA = 0
> 0000H
> OFFFH
> OFFFH
> 1000H
> External ROM
> ° 64KB
> External ROM
> 60KB
> FFFFH
> FFFFH



![Figure [Page 4 Media 1]](images/fig_004_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 4 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [Only Internal ROM; EA = 1; 0000H; Internal ROM; 4KB; ROM Organization; Internal & External; ROM].

> **Figure [Page 4 Media 1]**




<!-- Page 5 -->
### [PDF Page 5]

Internal RAM Structure


> **Transcribed Media / Table Text**:
> 8051 Microcontroller Register Bank in RAM
> - 8051 has four register banks. Each register bank has Eight registers RO-R7.
> - Selection of register bank can be done by two bits of PSW register, by
> PSW.3 and PSW.4 we can select any register bank.
> CLR PSW.4
> SETB PSW.3
> ;Here RS = 01 means bank 1 is selected
> U RAM address 00H to 1FH holds four register banks.
> MOV A, RO
> ;Copy RO into A
> MOV A,08H
> ;Copy RO of register bank 1 into A


> **Transcribed Media / Table Text**:
> 32 Bytes
> of RAM
> for
> Register
> bank
> 1FH
> 18H
> 17H
> 10H
> OFH
> 08H
> 07H
> 00H
> R7
> RO
> R7
> RO
> R7
> RO
> R7
> RO
> Bank 3
> Bank 2
> Bank 1
> Bank 0


> **Transcribed Media / Table Text**:
> RS1
> 0
> 0
> 1
> 1
> RSO
> 0
> 1
> 0
> 1
> Register Bank
> 0
> 1
> 2
> 3



![Figure [Page 5 Media 1]](images/fig_005_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 5 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [8051 Microcontroller Register Bank in RAM; • 8051 has four register banks. Each register bank has Eight registers RO-R7.; • Selection of register bank can be done by two bits of PSW register, by; PSW.3 and PSW.4 we can select any register bank.; CLR PSW.4; SETB PSW.3; ;Here RS = 01 means bank 1 is selected; U RAM address 00H to 1FH holds four register banks.].

> **Figure [Page 5 Media 1]**


![Figure [Page 5 Media 2]](images/fig_005_media_2.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 5 Media 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [32 Bytes; of RAM; for; Register; bank; 1FH; 18H; 17H].

> **Figure [Page 5 Media 2]**


![Figure [Page 5 Media 3]](images/fig_005_media_3.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 5 Media 3]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [RS1; 0; 0; 1; 1; RSO; 0; 1].

> **Figure [Page 5 Media 3]**




<!-- Page 6 -->
### [PDF Page 6]

Internal RAM Structure


> **Transcribed Media / Table Text**:
> - 8051 Microcontroller Bit Addressable Area in RAM
> - 16 Byte of RAM from 20H to 2FH holds bit addressable area in internal
> RAM of 8051 microcontroller.
> - 16 x 8 = 128 Addressable bits in these area.
> - These bits are addressed as per 00H to 7FH, in total 128 bits.
> - These locations can have bit as well byte wise operations.
> SETB 7FH
> ;Set MSB of 2FH RAM location
> CLR 08H
> ;Clear LSB of 21H RAM location
> MOV 20H, #FFH
> ;Set all bits 20H RAM locations


> **Transcribed Media / Table Text**:
> 16 Bytes of
> RAM for Bit
> wise
> Addressing
> 32 Bytes
> of RAM
> for
> Register
> bank
> 2FH
> 7F 7E 7D .... 79 78
> Bit Addressable
> Area of RAM
> 20H
> OF OE OD .... 09 08
> 07 06 05...
> 01.00
> 1FH
> R7
> Bank 3
> 18H
> 17H
> RO
> R7
> Bank 2
> 10H
> OFH
> RO
> R7
> Bank 1
> 08H
> 07H
> RO
> R7
> Bank 0
> 00H
> RO



![Figure [Page 6 Media 1]](images/fig_006_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 6 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [* 8051 Microcontroller Bit Addressable Area in RAM; • 16 Byte of RAM from 20H to 2FH holds bit addressable area in internal; RAM of 8051 microcontroller.; • 16 x 8 = 128 Addressable bits in these area.; • These bits are addressed as per 00H to 7FH, in total 128 bits.; • These locations can have bit as well byte wise operations.; SETB 7FH; ;Set MSB of 2FH RAM location].

> **Figure [Page 6 Media 1]**


![Figure [Page 6 Media 2]](images/fig_006_media_2.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 6 Media 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [16 Bytes of; RAM for Bit; wise; Addressing; 32 Bytes; of RAM; for; Register].

> **Figure [Page 6 Media 2]**




<!-- Page 7 -->
### [PDF Page 7]

Internal RAM Structure


> **Transcribed Media / Table Text**:
> 8051 Microcontroller General Purpose Area in RAM (Scratchpad RAM}
> - 80 Byte of RAM from 30H to 7FH holds general purpose area in internal
> RAM of 8051 microcontroller.
> - It can be used for general purpose operations.


> **Transcribed Media / Table Text**:
> 80 Bytes of
> RAM for
> general
> Purpose
> 16 Bytes of
> RAM for Bit
> wise
> Addressing
> 32 Bytes
> of RAM
> for
> Register
> bank
> 7FH
> 30H
> 2FH
> 20H
> 1FH
> 18H
> 17H
> 10H
> OFH
> 08H
> 07H
> O0H
> Scratchpad
> RAM
> 7F 7E 7D .... 79 78
> Bit Addressable
> Area of RAM
> OF OE OD .... 09 08
> 07 06 05 .... 01 00
> R7
> Bank 3
> RO
> R7
> Bank 2
> RO
> R7
> Bank 1
> RO
> R7
> Bank 0
> RO



![Figure [Page 7 Media 1]](images/fig_007_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 7 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [8051 Microcontroller General Purpose Area in RAM (Scratchpad RAM}; • 80 Byte of RAM from 30H to 7FH holds general purpose area in internal; RAM of 8051 microcontroller.; • It can be used for general purpose operations.].

> **Figure [Page 7 Media 1]**


![Figure [Page 7 Media 2]](images/fig_007_media_2.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 7 Media 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [80 Bytes of; RAM for; general; Purpose; 16 Bytes of; RAM for Bit; wise; Addressing].

> **Figure [Page 7 Media 2]**




<!-- Page 8 -->
### [PDF Page 8]

Internal Memory Organization
ขนาด 00 H- 7F H


> **Transcribed Media / Table Text**:
> Bank 3
> Bank 2
> Bank 1
> RS
> Bank o
> Working
> Internal RAM organization
> RS1
> 0
> 1
> 1
> RSO
> 0
> 1
> 0
> 1
> Register Bank
> 0
> 1
> 2
> 3


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



![Figure [Page 8 Media 1]](images/fig_008_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 8 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [Bank 3; Bank 2; Bank 1; RS; Bank o; Working; Internal RAM organization; RS1].

> **Figure [Page 8 Media 1]**


![Figure [Page 8 Media 2]](images/fig_008_media_2.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 8 Media 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [2F; 2€; 2D; 2C; 2B; 2A; 29; 28].

> **Figure [Page 8 Media 2]**


![Figure [Page 8 Media 3]](images/fig_008_media_3.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 8 Media 3]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [7F; 30; General Purpose].

> **Figure [Page 8 Media 3]**




<!-- Page 9 -->
### [PDF Page 9]

Stack of 8051


> **Transcribed Media / Table Text**:
> - Stack of 8051 operating with respect to only memory of
> Internal RAM of 8051 microcontroller.
> - Stack memory works as per LIFO {Last In First Out}.
> - Stack is used to store return address during ISRs and
> Subroutines.
> - Stack is also used by programmer using PUSH and POP
> instructions.
> - Top of stack is pointed by SP register.
> - SP is 8 bits register.
> - On RESET of 8051, SP holds 07H address.
> - Programmer can change the SP address as per their
> requirement. Range is available from 00H to 7FH as
> internal RAM size is of 128 bytes.
> MOV SP,#20H
> ;SP holds 20H address of RAM
> - Program to access stack memory using PUSH and POP
> MOV R1,#11H
> ;R1 - 11H
> MOV R2,#22H
> ;R2 - 22H
> MOV SP,#2FH
> ;SP - 2FH
> PUSH R1
> ;Push R1 on stack
> PUSH R2
> ;Push R2 on stack
> POP R3
> ;POP R3 from stack
> POP R4
> ;POP R4 from stack


> **Transcribed Media / Table Text**:
> SP →
> Add
> 09H
> 08H
> 07H
> Data
> SP →
> Add
> 31H
> 30H
> 2FH
> Data
> SP →
> - 
> re
> MOV SP,#2FH
> Add
> 31H
> 30H
> 2FH
> Data
> XX
> SP →
> fter MOV SP,#2Fl
> Add
> 31H
> 30H
> 2FH
> Data
> 22H
> 11H
> After PUSH R1
> After PUSH R2
> SP →
> Add
> 31H
> 30H
> 2FH
> Data
> 22H
> 11H
> SP →
> Add
> 31H
> 30H
> 2FH
> Data
> 22H
> 11H
> After POP R3 : R3
> = 22H
> fter POP R4 ; R4
> 1H



![Figure [Page 9 Media 1]](images/fig_009_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 9 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [• Stack of 8051 operating with respect to only memory of; Internal RAM of 8051 microcontroller.; • Stack memory works as per LIFO {Last In First Out}.; • Stack is used to store return address during ISRs and; Subroutines.; • Stack is also used by programmer using PUSH and POP; instructions.; • Top of stack is pointed by SP register.].

> **Figure [Page 9 Media 1]**


![Figure [Page 9 Media 2]](images/fig_009_media_2.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 9 Media 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [SP →; Add; 09H; 08H; 07H; Data; SP →; Add].

> **Figure [Page 9 Media 2]**




<!-- Page 10 -->
### [PDF Page 10]

SFR of 8051


> **Transcribed Media / Table Text**:
> - SFR - Special Function Registers with size of 8 bits.
> - SFRs are On chip registers for special functions of
> 8051. (Timers, Counter, I0, Serial Communication,
> Interrupt, Power Saving Modes, etc.)
> - There are 21 SFR registers with 8051, which are
> used with their addresses in instructions to reduce
> number of opcodes in 8051.
> - We have seen that internal RAM is used with
> addressing from 00H to 7FH. Likewise SFRs are used
> with addressing in between 80H to FFH.



![Figure [Page 10 Media 1]](images/fig_010_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 10 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [• SFR - Special Function Registers with size of 8 bits.; • SFRs are On chip registers for special functions of; 8051. (Timers, Counter, I0, Serial Communication,; Interrupt, Power Saving Modes, etc.); • There are 21 SFR registers with 8051, which are; used with their addresses in instructions to reduce; number of opcodes in 8051.; • We have seen that internal RAM is used with].

> **Figure [Page 10 Media 1]**




<!-- Page 11 -->
### [PDF Page 11]

SFR of 8051


> **Transcribed Media / Table Text**:
> - This addressing supports byte and bit wise
> operations.
> - This addressing reduces numbers of opcodes for
> total instructions.
> SETB PO.O
> ;SETB has opcode & P0.0 has
> address 80H
> - 8051 supports bit wise special functions and byte
> wise special functions, if addressing is not done
> with SFRs then there would be to many opcodes
> and that will make too much complicated
> instruction decode circuit.



![Figure [Page 11 Media 1]](images/fig_011_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 11 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [• This addressing supports byte and bit wise; operations.; • This addressing reduces numbers of opcodes for; total instructions.; SETB PO.O; ;SETB has opcode & P0.0 has; address 80H; • 8051 supports bit wise special functions and byte].

> **Figure [Page 11 Media 1]**




<!-- Page 12 -->
### [PDF Page 12]

SFR of 8051


> **Transcribed Media / Table Text**:
> Data and
> Status
> Pointer of
> Memory
> IO Ports
> Serial
> Ports
> Timer
> Control
> Interrupt
> Control
> Power
> Control
> Name
> A
> B
> PSW
> SP
> DPL
> DPH
> PO
> P1
> P2
> P3
> SCON
> SBUF
> TCON
> TMOD
> TLO
> TL1
> THO
> TH1
> IE
> IP
> PCON
> Function
> Accumulator
> Arithmetic {Mul. & Div.}
> Flag Register
> Stack Pointer
> Address External Memory
> Address External Memory
> IO Latch Port
> IO Latch Port
> IO Latch Port
> IO Latch Port
> Serial Port Control
> Serial Port Data Buffer
> Timer/Counter Control
> Timer/Counter Mode Control
> Timer 0 Lower Byte
> Timer 1 Lower Byte
> Timer 0 Higher Byte
> Timer 1 Higher Byte
> Interrupt Enable
> Interrupt Priority
> Power Control
> Byte Add
> EOH
> FOH
> DOH
> 81H
> 82H
> 83H
> 80H
> 90H
> AOH
> BOH
> 98H
> 99H
> 88H
> 89H
> 8AH
> 8BH
> 8CH
> 8DH
> A8H
> B8H
> 87H
> Bit Add
> E7 - EOH
> F7 - FOH
> D7 - DOH
> NA
> NA
> NA
> 87 - 80H
> 97 - 90H
> A7 - AOH
> B7 - BOH
> 9F - 98H
> NA
> 8F - 88H
> NA
> NA
> NA
> NA
> NA
> AF - A8H
> BF - B8H
> NA



![Figure [Page 12 Media 1]](images/fig_012_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 12 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [Data and; Status; Pointer of; Memory; IO Ports; Serial; Ports; Timer].

> **Figure [Page 12 Media 1]**




<!-- Page 13 -->
### [PDF Page 13]

Internal and External Memory


> **Transcribed Media / Table Text**:
> FFH
> 80H
> 7FH
> OOH
> SFRS
> 128
> bytes of
> internal
> data
> memory


> **Transcribed Media / Table Text**:
> FFFFH!
> External
> Data
> Memory
> (max64K)
> OOOOHL



![Figure [Page 13 Media 1]](images/fig_013_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 13 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [FFH; 80H; 7FH; OOH; SFRS; 128; bytes of; internal].

> **Figure [Page 13 Media 1]**


![Figure [Page 13 Media 2]](images/fig_013_media_2.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 13 Media 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [FFFFH!; External; Data; Memory; (max64K); OOOOHL].

> **Figure [Page 13 Media 2]**



