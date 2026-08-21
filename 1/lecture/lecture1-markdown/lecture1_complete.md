# Lecture1
## Complete Single-File AI-Research Document

> **Source PDF**: Lecture1.pdf  
> **Total Pages**: 33 pages  
> **Format**: Single-File Bundle with Zero-Drift Page Markers, Syntax Highlighting, 300 DPI Cropped Figures, and Deep Domain Walkthrough Descriptions

---


<!-- Page 1 -->
### [PDF Page 1]

Lecture 1





<!-- Page 2 -->
### [PDF Page 2]

Embedded System
- It is an arrangement in which all its units assembled work together
according to set of rules
EWatch is a time displaying system





<!-- Page 3 -->
### [PDF Page 3]

Embedded System
- It is a combination of software and H/W
- It is designed to perform a particular task
- The task has to be completed in a given time.
  - *Eg Washing machine,  Micro oven and etc*





<!-- Page 4 -->
### [PDF Page 4]


### Building blocks of ES

Input
Sensers
Touch panels
Buttons
Bluetooth IR
Output
LED t
LCDs
Bluetooth IR
Power supply
Controller
ROM
RAM
ALU
CU
Code memory
Runtime data memory
Frequency
generation



![Figure [Page 4 Diagram]: Building blocks of ES](images/fig_004_slide_diagram.png)
*Description*: System Functional Block Diagram [Building blocks of ES]: Details embedded system hardware/software building blocks, including Input Units (Sensors, Touch panels, Buttons, Bluetooth/IR), Output Units (LEDs, LCDs, Bluetooth/IR), Power Supply, Controller Unit (Processor, ROM, RAM, ALU, CU), Code Memory, Runtime Data Memory, and Frequency Generation module. Internal elements: [Input -> Sensers -> Touch panels; Buttons -> Bluetooth IR; Output; LED t; LCDs -> Bluetooth IR; Power supply; Controller; ROM].

> **Figure [Page 4 Diagram]: Building blocks of ES**




<!-- Page 5 -->
### [PDF Page 5]


### Applications of Embedded System

- Medical System pace-maker patient monitor system
- Office Equipment Print er and copiet fax
- Tool multiments oscilloscope GPS
- Banking ATMs statement printers
- Transportation Planes, Trains, Boats,
- Automobilers: Engine management trip computer car alarms immobilized
airbags Abs
- Building systems: Elevator heater air conditions lighting keycard cntries lock
- Agriculture: Feeding system





<!-- Page 6 -->
### [PDF Page 6]

Characteristics of Embeded System
- Sophisticated functionality
- Realtime operation operation has to be compledted by deadline
- Low manufacturing cost
- Low power consumption
- Application dependent processor and not general-purpose processor
which we find in computers
- Restricted Memory





<!-- Page 7 -->
### [PDF Page 7]

General Purpose Computer  Vs  Embedded System
- Purpose
- Constrained
- Performance
- Interface
Multipurpose
Low or no resource
constrained
Faster and better
Keyboard, Display,
Mouse, Touch screen
Single functioned
Size, Power, cost,
Memory, Real time
Fixed runtime
requirement
Integrated into the
real world Button
sensors





<!-- Page 8 -->
### [PDF Page 8]

Microprocessor and Microcontroller
- Digital Device
- Arithmetic and Logical Operation
- Instructions given by users





<!-- Page 9 -->
### [PDF Page 9]


### Difference between Microprocessor and

Microcontroller

### Block Diagram



> **Transcribed Media / Table Text**:
> Microprocessor
> ALU
> Registers
> Control Unit


> **Transcribed Media / Table Text**:
> Microcontroller
> ALU
> Registers
> Control Unit
> RAM
> ROM
> Timers
> Serial
> Communication
> Interrupts
> Watchdog
> Timer
> Ports



![Figure [Page 9 Media 1]](images/fig_009_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 9 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [Microprocessor; ALU; Registers; Control Unit].

> **Figure [Page 9 Media 1]**


![Figure [Page 9 Media 2]](images/fig_009_media_2.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 9 Media 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [Microcontroller; ALU; Registers; Control Unit; RAM; ROM; Timers; Serial].

> **Figure [Page 9 Media 2]**




<!-- Page 10 -->
### [PDF Page 10]

Microprocessor Based System


> **Transcribed Media / Table Text**:
> CPU
> CLOCK
> ADDRESS BUS
> ROM
> RAM
> DATA BUS
> CONTROL BUS
> 1/0
> PARALLEL
> IO
> SERIAL



![Figure [Page 10 Media 1]](images/fig_010_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 10 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [CPU; CLOCK; ADDRESS BUS; ROM; RAM; DATA BUS; CONTROL BUS; 1/0].

> **Figure [Page 10 Media 1]**




<!-- Page 11 -->
### [PDF Page 11]


### Difference between Microprocessor and

Microcontroller
- Microprocessor based systems are more flexible
- Microcontroller based system are less flexible
- Microprocessors are used for general purpose applications
Ex Desktop PC Laptop notepads
- Microcontrollers are designed to perform specific tasks. Where some
controlling actions are required
Ex keyboards printers, mouse, washing machine, digicam and pen drive





<!-- Page 12 -->
### [PDF Page 12]

Von Neumann Vs Harvard
- Types of architecture
- 
Von Neumann: data and code lie in same memory block
- 1 data bus used for both instruction and data

# 1. CPU can be performed only one operation at a time

- 2 set of clocks cycles required 1 for data fetch and 1 for instruction fetch
- Pipelining is not possible
- Simple in design
- Harvard: data and code lie in different memory block
- Separate memory for code and data
- Single clocks cycle  for data fetch and  instruction fetch
- Pipelining is possible
- Complex in design





<!-- Page 13 -->
### [PDF Page 13]

Von Neumann Vs Harvard
- Von Neumann
Memory
instruction
Data
Von Neumann
CPU
Address
Data
Control


> **Transcribed Media / Table Text**:
> Registers
> Arithmetic & Logic
> Unit
> Timing & Control
> Unit
> 1/O
> Peripherals
> System Bus
> Main Memory



![Figure [Page 13 Diagram]: Von Neumann Vs Harvard](images/fig_013_slide_diagram.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Von Neumann Vs Harvard]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [• Von Neumann; Memory; instruction; Data; Von Neumann; CPU; Address; Data].

> **Figure [Page 13 Diagram]: Von Neumann Vs Harvard**


![Figure [Page 13 Media 1]](images/fig_013_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 13 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [Registers; Arithmetic & Logic; Unit; Timing & Control; Unit; 1/O; Peripherals; System Bus].

> **Figure [Page 13 Media 1]**




<!-- Page 14 -->
### [PDF Page 14]

- Von Neumann Architecture
Input
Control Unit
ALU
Output
CPU
Memory Unit
- Named after the computer scientist John Von
Neumann.
- The computer has single memory for storing data as
well as program.
- Von Neumann architecture has only one bus for
instruction and data.
- Design of the von Neumann architecture is simple.
- It is cheaper.


> **Transcribed Media / Table Text**:
> - Von Neumann Architecture
> Control Unit
> ALU
> Input
> Output
> CPU
> Memory Unit
> - Named after the computer scientist John Von
> Neumann.
> - The computer has single memory for storing data as
> well as program.
> - Von Neumann architecture has only one bus for
> instruction and data.
> - Design of the von Neumann architecture is simple.
> - It is cheaper.



![Figure [Page 14 Media 1]](images/fig_014_media_1.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 14 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [• Von Neumann Architecture; Control Unit; ALU; Input; Output; CPU; Memory Unit; • Named after the computer scientist John Von].

> **Figure [Page 14 Media 1]**




<!-- Page 15 -->
### [PDF Page 15]

Von Neumann Vs Harvard
- Harvard Architecture
Memory
instruction
Data
Von Neumann
CPU
Address
Data
Control
Data
Control
Address
Memory


> **Transcribed Media / Table Text**:
> Instruction
> Memory
> V/O
> Peripherals
> Processor
> Data
> Memory



![Figure [Page 15 Diagram]: Von Neumann Vs Harvard](images/fig_015_slide_diagram.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Von Neumann Vs Harvard]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [• Harvard Architecture; Memory; instruction -> Data; Von Neumann; CPU; Address; Data -> Control; Data].

> **Figure [Page 15 Diagram]: Von Neumann Vs Harvard**


![Figure [Page 15 Media 1]](images/fig_015_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 15 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [Instruction; Memory; V/O; Peripherals; Processor; Data; Memory].

> **Figure [Page 15 Media 1]**




<!-- Page 16 -->
### [PDF Page 16]

- Harvard Architecture
ALU
Instruction
Memory
Control
Unit
Data
Memory
1/0
- The computer has two separate memories for storing
data and program.
- Harvard architecture is required separate bus for
instruction and data.
- Most of the modern computing architectures are based
on Harvard architecture.
- Design of Harvard architecture is complicated.
- Comparatively high cost.


> **Transcribed Media / Table Text**:
> - Harvard Architecture
> ALU
> Instruction
> Memory
> →
> Control
> Unit
> Data
> Memory
> 1/0
> The computer has two separate memories for storing
> data and program.
> - Harvard architecture is required separate bus for
> instruction and data.
> - Most of the modern computing architectures are based
> on Harvard architecture.
> - Design of Harvard architecture is complicated.
> - Comparatively high cost.



![Figure [Page 16 Media 1]](images/fig_016_media_1.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 16 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [•Harvard Architecture; ALU; Instruction; Memory; →; Control; Unit; Data].

> **Figure [Page 16 Media 1]**




<!-- Page 17 -->
### [PDF Page 17]

RISC and CISC


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | Feature 1 | RISC |
> | **Stands** | for "Reduced Instruction Set |
> | Feature 3 | Computing". |
> | **It** | has less number of instructions and a |
> | **comparatively** | smaller instruction set. |
> | **Less** | addressing modes. |
> | **Fixed** | instruction size and hence each |
> | **instruction** | takes one machine cycle to |
> | Feature 9 | execute. |
> | **Simple** | hardware, lower manufacturing |
> | Feature 11 | costs. |
> | **Low** | power consumption. |
> | **PIC,** | ARM |
> | Feature 14 | CISC |
> | **Stands** | for "Complex Instruction Set |
> | Feature 16 | Computing". |
> | **It** | has more instructions and a more |
> | **complex** | instruction set. |
> | **More** | addressing modes. |
> | **Each** | instruction can take 2-10 machine |
> | Feature 21 | cycles. |
> | **Complex** | hardware and higher costs. |
> | **High** | power consumption. |
> | **x86,** | 8051 |



![Figure [Page 17 Media 1]](images/fig_017_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 17 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [RISC; Stands for "Reduced Instruction Set; Computing".; It has less number of instructions and a; comparatively smaller instruction set.; Less addressing modes.; Fixed instruction size and hence each; instruction takes one machine cycle to].

> **Figure [Page 17 Media 1]**




<!-- Page 18 -->
### [PDF Page 18]

Architecture of 8051 Microcontroller
8 bit microcontroller
Internal rom 4 kbyte
000H to FFFH
Internal RAM 128 byte
00 Hto 7FH
Two timer for timing delays
4 General Input port P0to
P3Intermal Serial Port TXD and
RXD


> **Transcribed Media / Table Text**:
> External Interrupts
> Interrupt Control
> 4 Kbyte
> ROM
> SFR
> 128 byte
> RAM
> Timer 0
> Timer 1
> Counter 0 Input
> Counter 1 Input
> CPU
> XTAL
> OSC
> I0F
> Bus Control
> XTAL?
> VO Ports
> 1111
> PO P1 P2 P3
> Serial
> Port
> EA
> XTALI PSEN Vee
> ALE XTAL: Reset Gnd
> TXD RXD



![Figure [Page 18 Media 1]](images/fig_018_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 18 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [External Interrupts; Interrupt Control; 4 Kbyte; ROM; SFR; 128 byte; RAM; Timer 0].

> **Figure [Page 18 Media 1]**




<!-- Page 19 -->
### [PDF Page 19]

Feature of 8051


> **Transcribed Media / Table Text**:
> Operating frequency range is from 1 MHz to 16MHz.
> C2
> XTAL 2
> 30pF
> 30pF
> C1
> 1
> XTAL 1
> Crystal Frequency = 11.0592 MHz
> GND



![Figure [Page 19 Media 1]](images/fig_019_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 19 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [Operating frequency range is from 1 MHz to 16MHz.; C2; XTAL 2; 30pF; 30pF; C1; 1; XTAL 1].

> **Figure [Page 19 Media 1]**




<!-- Page 20 -->
### [PDF Page 20]

Feature of 8051
Maximum memery size is 216 or 64 Kbytes


> **Transcribed Media / Table Text**:
> - Data bus size is 8 bit
> CPU
> - Address bus size is 16 bit
> 8 bit Data Bus
> 16 bit Address Bus



![Figure [Page 20 Media 1]](images/fig_020_media_1.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 20 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [• Data bus size is 8 bit; CPU; • Address bus size is 16 bit; 8 bit Data Bus; 16 bit Address Bus].

> **Figure [Page 20 Media 1]**




<!-- Page 21 -->
### [PDF Page 21]

Feature of 8051


> **Transcribed Media / Table Text**:
> - Internal ROM memory size is 4 Kbyte
> FFF h
> 4 KByte
> 000 h
> - Internal RAM memory size is 128 bytes
> 7F h
> 128 Byte
> 00 h
> - It has special function registers
> FF h
> SFR
> 80 h



![Figure [Page 21 Media 1]](images/fig_021_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 21 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [• Internal ROM memory size is 4 Kbyte; FFF h; 4 KByte; 000 h; • Internal RAM memory size is 128 bytes; 7F h; 128 Byte; 00 h].

> **Figure [Page 21 Media 1]**




<!-- Page 22 -->
### [PDF Page 22]

Feature of 8051
Stack memory is in Internal RAM and the top of stack is address of 07H


> **Transcribed Media / Table Text**:
> - 8 bit ALU having registers A (8 bit) which is called as an accumulator and
> register B (8 bit) called as math register.
> 0
> 1
> 1
> 1
> 0
> 10
> - 8 bit Program status word register (PSW)
> - 8 bit stack pointer register (SP)
> SP
> 0X07
> 0X07
> Address Bus
> 0x00c
> 0x00b
> 0x00a
> 0x009
> Ox008
> 0x007
> Ox006
> 0x005
> 0x004
> 0x003
> 0x002
> 0x001
> 0x000



![Figure [Page 22 Media 1]](images/fig_022_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 22 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [• 8 bit ALU having registers A (8 bit) which is called as an accumulator and; register B (8 bit) called as math register.; 0; 1; 1; 1; 0; 10].

> **Figure [Page 22 Media 1]**




<!-- Page 23 -->
### [PDF Page 23]

- 16 bit program counter register (PC)
PC
0X009
0X009
Address Bus
54H
0x00c
Ox00b
Ox00a
0x009
0x008
0x007
0x006
0x005
0x004
0x003
0x002
0x001
0x000
Internal/External Program Memory


> **Transcribed Media / Table Text**:
> - 16 bit program counter register (PC)
> PC
> 0X009
> 0X009
> Address Bus
> 54H
> 0x00c
> 0x00b
> 0x00a
> 0x009
> 0x008
> 0x007
> 0x006
> 0x005
> 0x004
> 0x003
> 0x002
> 0x001
> 0x000
> Internal/External Program Memory



![Figure [Page 23 Media 1]](images/fig_023_media_1.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 23 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [•16 bit program counter register (PC); PC; 0X009; 0X009; Address Bus; 54H; 0x00c; 0x00b].

> **Figure [Page 23 Media 1]**




<!-- Page 24 -->
### [PDF Page 24]

Feature of 8051


> **Transcribed Media / Table Text**:
> - 16 bit Data pointer register (DPTR)
> DPTR
> 0X09
> 0X09
> Address Bus
> DPTR
> DPH
> DPL
> 54H
> OxOc
> Oxob
> OxOa
> 0x09
> 0x08
> 0x07
> 0x06
> 0x05
> 0x04
> 0x03
> 0x02
> 0x01
> 0x00
> Internal/External Data Memory



![Figure [Page 24 Media 1]](images/fig_024_media_1.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 24 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [• 16 bit Data pointer register (DPTR); DPTR; 0X09; 0X09; Address Bus; DPTR; DPH; DPL].

> **Figure [Page 24 Media 1]**




<!-- Page 25 -->
### [PDF Page 25]

Feature of 8051


> **Transcribed Media / Table Text**:
> - Two, 16 bit timers/counters
> - 5 interrupts +1 Reset
> - It has Universal asynchronous receiver transmitter (UART) block for
> serial communication.
> - 4 input/output ports. Each port is of 8 bit.



![Figure [Page 25 Media 1]](images/fig_025_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 25 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [• Two, 16 bit timers/counters; • 5 interrupts +1 Reset; • It has Universal asynchronous receiver transmitter (UART) block for; serial communication.; • 4 input/output ports. Each port is of 8 bit.].

> **Figure [Page 25 Media 1]**




<!-- Page 26 -->
### [PDF Page 26]

Various Versions of 8051


> **Transcribed Media / Table Text**:
> Intel fabricated the original 8051 which is known as MCS-5
> The other two members of the 8051 family are 8052 and 8031:
> Features
> RAM(bytes)
> 8051
> 128
> 8052
> 256
> 8031
> 128
> ROM
> 4K
> 8K
> OK
> Timers
> Serial port
> 1/0 pins
> Interrupt sources
> 2
> 1
> 32
> 6
> 3
> 1
> 32
> 8
> 2
> 1
> 32
> 6



![Figure [Page 26 Media 1]](images/fig_026_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 26 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [Intel fabricated the original 8051 which is known as MCS-5; The other two members of the 8051 family are 8052 and 8031:; Features; RAM(bytes); 8051; 128; 8052; 256].

> **Figure [Page 26 Media 1]**




<!-- Page 27 -->
### [PDF Page 27]

AT89C51 from Atmel Corporation
Part Number
AT89C51
AT89C52
AT89C1051
AT89C2051
AT89LV51
AT89LV52
ROM
4K
8K
1K
2K
4K
8K
RAM
128
256
64
128
128
128
1/O pins
32
32
15
32
32
32
Timer
2
3
1
3
2
3
Interrupt
6
8
3
8
6
8
Vcc
5V
5V
3V
3V
3V
3V
Packaging
40
40
20
20
40
40


> **Transcribed Media / Table Text**:
> AT89C51 from Atmel Corporation
> Part Number
> AT89C51
> AT89C52
> AT89C1051
> AT89C2051
> AT89LV51
> AT89LV52
> ROM
> 4K
> 8K
> 1K
> 2K
> 4K
> 8K
> RAM
> 128
> 256
> 64
> 128
> 128
> 128
> 1/0 pins
> 32
> 32
> 15
> 32
> 32
> 32
> Timer
> 2
> 3
> 1
> 3
> 2
> 3
> Interrupt
> 6
> 8
> 3
> 8
> 6
> 8
> Vcc
> 5V
> 5V
> 3V
> 3V
> 3V
> 3V
> Packaging
> 40
> 40
> 20
> 20
> 40
> 40



![Figure [Page 27 Media 1]](images/fig_027_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 27 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [AT89C51 from Atmel Corporation; Part Number; AT89C51; AT89C52; AT89C1051; AT89C2051; AT89LV51; AT89LV52].

> **Figure [Page 27 Media 1]**




<!-- Page 28 -->
### [PDF Page 28]

DS5000 from Dallas Semiconductor
Part Number
DS5000-8
DS5000-32
DS5000T-8
DS5000T-8
RAM
128
128
128
128
ROM
8K
32K
8K
32K
Timers 1/0 pins Interrupts
2
2
2
2
32
32
32
32
6
6
6
6
Vcc
5V
5V
5V
5V
Packaging
40
40
40
40


> **Transcribed Media / Table Text**:
> DS5000 from Dallas Semiconductor
> Part Number
> DS5000-8
> DS5000-32
> DS5000T-8
> DS5000T-8
> RAM
> 128
> 128
> 128
> 128
> ROM
> Timers
> 8K
> 32K
> 8K
> 32K
> 2
> 2
> 2
> 2
> 1/0 pins Interrupts
> 32
> 32
> 32
> 32
> 6
> 6
> 6
> 6
> Vcc
> 5V
> 5V
> 5V
> 5V
> Packaging
> 40
> 40
> 40
> 40



![Figure [Page 28 Media 1]](images/fig_028_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 28 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [DS5000 from Dallas Semiconductor; Part Number; DS5000-8; DS5000-32; DS5000T-8; DS5000T-8; RAM; 128].

> **Figure [Page 28 Media 1]**




<!-- Page 29 -->
### [PDF Page 29]

Format of Program Status Word Registor


> **Transcribed Media / Table Text**:
> D7
> CY
> D6
> AC
> FO
> D4
> RS1
> D3
> RSO
> D2
> OV
> D1
> -
> DO
> P
> CY Carry Flag
> AC Auxiliary Carry Flag
> F0 Flag 0 available to user for general purpose.
> RS1 Register Bank selector bit 1
> RSO Register Bank selector bit 0
> OV Overflow Flag
> Reserved
> P
> Parity FLAG. Set/ cleared by hardware during
> instruction cycle to indicate even/odd number of 1 bit in
> accumulator.


> **Transcribed Media / Table Text**:
> +
> 11110101
> 10001010
> 101111111
> CY



![Figure [Page 29 Media 1]](images/fig_029_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 29 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [D7; CY; D6; AC; FO; D4; RS1; D3].

> **Figure [Page 29 Media 1]**


![Figure [Page 29 Media 2]](images/fig_029_media_2.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 29 Media 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [+; 11110101; 10001010; 101111111; CY].

> **Figure [Page 29 Media 2]**




<!-- Page 30 -->
### [PDF Page 30]

Format of Program Status Word Registor


> **Transcribed Media / Table Text**:
> D7
> CY
> D6
> AC
> FO
> D4
> RS1
> D3
> RSO
> D2
> OV
> D1
> -
> DO
> P
> CY Carry Flag
> AC Auxiliary Carry Flag
> F0 Flag 0 available to user for general purpose.
> RS1 Register Bank selector bit 1
> RSO Register Bank selector bit 0
> OV Overflow Flag
> Reserved
> P
> Parity FLAG. Set/ cleared by hardware during
> instruction cycle to indicate even/odd number of 1 bit in
> accumulator.


> **Transcribed Media / Table Text**:
> +
> CY
> 1
> 1101
> 1101
> 0000
> 1010
> 0 1 11 0111



![Figure [Page 30 Media 1]](images/fig_030_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 30 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [D7; CY; D6; AC; FO; D4; RS1; D3].

> **Figure [Page 30 Media 1]**


![Figure [Page 30 Media 2]](images/fig_030_media_2.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 30 Media 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [+; CY; 1; 1101; 1101; 0000; 1010; 0 1 11 0111].

> **Figure [Page 30 Media 2]**




<!-- Page 31 -->
### [PDF Page 31]

Format of Program Status Word Registor


> **Transcribed Media / Table Text**:
> D7
> CY
> D6
> AC
> FO
> D4
> RS1
> D3
> RSO
> D2
> OV
> D1
> -
> DO
> P
> CY Carry Flag
> AC Auxiliary Carry Flag
> F0 Flag 0 available to user for general purpose.
> RS1 Register Bank selector bit 1
> RSO Register Bank selector bit 0
> OV Overflow Flag
> Reserved
> P
> Parity FLAG. Set/ cleared by hardware during
> instruction cycle to indicate even/odd number of 1 bit in
> accumulator.


> **Transcribed Media / Table Text**:
> RS1
> RSO
> U
> 0
> 0
> 1
> 1
> 0
> 1
> 1
> Register Bank
> 0
> 1
> 2
> 3



![Figure [Page 31 Media 1]](images/fig_031_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 31 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [D7; CY; D6; AC; FO; D4; RS1; D3].

> **Figure [Page 31 Media 1]**


![Figure [Page 31 Media 2]](images/fig_031_media_2.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 31 Media 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [RS1; RSO; U; 0; 0; 1; 1; 0].

> **Figure [Page 31 Media 2]**




<!-- Page 32 -->
### [PDF Page 32]

Format of Program Status Word Registor


> **Transcribed Media / Table Text**:
> D7
> CY
> D6
> AC
> FO
> D4
> RS1
> D3
> RSO
> D2
> OV
> D1
> -
> DO
> P
> CY Carry Flag
> AC Auxiliary Carry Flag
> F0 Flag 0 available to user for general purpose.
> RS1 Register Bank selector bit 1
> RSO Register Bank selector bit 0
> OV Overflow Flag
> Reserved
> P
> Parity FLAG. Set/ cleared by hardware during
> instruction cycle to indicate even/odd number of 1 bit in
> accumulator.


> **Transcribed Media / Table Text**:
> 10010100
> 11010100
> P=1
> P=0



![Figure [Page 32 Media 1]](images/fig_032_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 32 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [D7; CY; D6; AC; FO; D4; RS1; D3].

> **Figure [Page 32 Media 1]**


![Figure [Page 32 Media 2]](images/fig_032_media_2.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 32 Media 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [10010100; 11010100; P=1; P=0].

> **Figure [Page 32 Media 2]**




<!-- Page 33 -->
### [PDF Page 33]

Packaging Types


> **Transcribed Media / Table Text**:
> 8051 Microcontroller Packaging Types
> CPGA
> Ceramic through-hole package
> Packages
> SDIP
> Plastic through-hole package
> PLCC
> Plastic leaded chip carrier
> QFP
> Quad flat package
> HDIP
> Plastic through-hole package with
> higher heat dissipation rate
> HSOP
> Plastic dual-construction surface mount
> package with higher heat dissipation rate



![Figure [Page 33 Media 1]](images/fig_033_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 33 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [8051 Microcontroller Packaging Types; CPGA; Ceramic through-hole package; Packages; SDIP; Plastic through-hole package; PLCC; Plastic leaded chip carrier].

> **Figure [Page 33 Media 1]**



