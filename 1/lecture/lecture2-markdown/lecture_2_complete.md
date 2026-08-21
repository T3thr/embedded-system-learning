# Lecture 2
## Complete Single-File AI-Research Document

> **Source PDF**: Lecture 2.pdf  
> **Total Pages**: 11 pages  
> **Format**: Single-File Bundle with Zero-Drift Page Markers, Syntax Highlighting, 300 DPI Cropped Figures, and Deep Domain Walkthrough Descriptions

---


<!-- Page 1 -->
### [PDF Page 1]

Lecture 2
Pin Diagram and Description





<!-- Page 2 -->
### [PDF Page 2]

Feature of Microcontroller


> **Transcribed Media / Table Text**:
> U 8051 is complete computer system built on one Chip. It has CPU, RAM, ROM, Serial port, Parallel Port,
> Interrupt, Timer on single chip.
> - 8051 operates at 12MHz clock frequency.
> - 8051 has 8 bits of ALU.
> - 8051 has 8 bits of Data lines.
> - 8051 follows Harvard architecture. {So, it has separate memory for program and data storage.}
> - 8051 has 4KB of internal ROM for program storage.
> - 8051 has 128 bytes of RAM for data storage.
> - 8051 has Four 8 bits of 10 ports. (This ports can be used for interfacing of peripherals like Keyboard, display,
> stepper motor, LEDs & switches etc}
> - 8051 has a serial port synchronous and asynchronous communication.
> ] 8051 has two 16 bits 'UP' timers. (which can be used for delay generation.)
> - 8051 has Five interrupts operating at priority levels.
> - 8051 has two power saving modes. (Idle mode and Power down mode}
> - 8051 has 16 bits of address bus which can be used to interface external memory of RAM or ROM. (64KB can
> be interfaced with 16 address lines.)



![Figure [Page 2 Media 1]](images/fig_002_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 2 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [U 8051 is complete computer system built on one Chip. It has CPU, RAM, ROM, Serial port, Parallel Port,; Interrupt, Timer on single chip.; • 8051 operates at 12MHz clock frequency.; • 8051 has 8 bits of ALU.; • 8051 has 8 bits of Data lines.; • 8051 follows Harvard architecture. {So, it has separate memory for program and data storage.}; • 8051 has 4KB of internal ROM for program storage.; • 8051 has 128 bytes of RAM for data storage.].

> **Figure [Page 2 Media 1]**




<!-- Page 3 -->
### [PDF Page 3]

Pin Diagram of 8051


> **Transcribed Media / Table Text**:
> P1.001
> P1.1 0 2
> P1.203
> P1.3C4
> P1.4 [5
> P1.5 [ 6
> P1.6 • 7
> P1.7 • 8
> RST [ 9
> (RXD) P3.0 • 10
> (TXD) P3.1 • 11
> (INTO) P3.2 [
> 12
> (INT1) P3.3
> 13
> (TO) P3.4 •
> 14
> (T1) P3.5 • 15
> (WR) P3.6 [ 16
> (RD) P3.7 [
> 17
> XTAL2 L
> 18
> XTAL1 E 19
> GND C
> 20
> 8051
> 40
> - VCC
> 39
> - PO.0 (ADO)
> 38
> - PO.1 (AD1)
> 37
> 3 P0.2 (AD2)
> 36
> PO.3 (AD3)
> 35
> - P0.4 (AD4)
> 34
> - P0.5 (AD5)
> 33
> - P0.6 (AD6)
> 32
> - P0.7 (AD7)
> 31
> | EAVPP
> 30
> - ALE/PROG
> 29
> O PSEN
> 28
> - P2.7 (A15)
> 27
> - P2.6 (A14)
> 26
> - P2.5 (A13)
> 25
> - P2.4 (A12)
> 24
> - P2.3 (A11)
> 23
> P2.2 (A10)
> 22
> - P2.1 (A9)
> 21
> - P2.0 (A8)



![Figure [Page 3 Media 1]](images/fig_003_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 3 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [P1.001; P1.1 0 2; P1.203; P1.3C4; P1.4 [5; P1.5 [ 6; P1.6 • 7; P1.7 • 8].

> **Figure [Page 3 Media 1]**




<!-- Page 4 -->
### [PDF Page 4]

Pin Description
- Intel 8051 is a 40 pin IC available in Dual-In line package (DIP), which is an
electronic component package with a rectangular housing and two parallel
rows of electrical connecting pins.
- Requires a single power supply of +5V
- VCC and GND
- P0 Port 0 is multiplexed address and data bus
- P1 Port 1
- P2 input/output ports and it can allow 16-bit data bus
- P3 Port 3 and each pin has a special function
- XTAL1 and XTAL2 is External Crystal
- RST ReSeT pin
- EA/Vpp Enable Address  pin is used to supply programming voltage 12V to
EPROM/ROM
- Address latch enable It is used to demuliplex address and data bus. It
separated A0-A7 address from AD0-AD7


> **Transcribed Media / Table Text**:
> P1.001
> P1.1 0 2
> P1.203
> P1.3C4
> P1.4 [5
> P1.5 [ 6
> P1.6 • 7
> P1.7 • 8
> RST [ 9
> (RXD) P3.0 • 10
> (TXD) P3.1 • 11
> (INTO) P3.2 [
> 12
> (INT1) P3.3
> 13
> (TO) P3.4 •
> 14
> (T1) P3.5 • 15
> (WR) P3.6 [ 16
> (RD) P3.7 [
> 17
> XTAL2 L
> 18
> XTAL1 E 19
> GND C
> 20
> 8051
> 40
> - VCC
> 39
> - PO.0 (ADO)
> 38
> - PO.1 (AD1)
> 37
> 3 P0.2 (AD2)
> 36
> PO.3 (AD3)
> 35
> - P0.4 (AD4)
> 34
> - P0.5 (AD5)
> 33
> - P0.6 (AD6)
> 32
> - P0.7 (AD7)
> 31
> | EAVPP
> 30
> - ALE/PROG
> 29
> O PSEN
> 28
> - P2.7 (A15)
> 27
> - P2.6 (A14)
> 26
> - P2.5 (A13)
> 25
> - P2.4 (A12)
> 24
> - P2.3 (A11)
> 23
> P2.2 (A10)
> 22
> - P2.1 (A9)
> 21
> - P2.0 (A8)



![Figure [Page 4 Media 1]](images/fig_004_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 4 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [P1.001; P1.1 0 2; P1.203; P1.3C4; P1.4 [5; P1.5 [ 6; P1.6 • 7; P1.7 • 8].

> **Figure [Page 4 Media 1]**




<!-- Page 5 -->
### [PDF Page 5]

Pin Diagram
- PSEN is used to enabke external program memory(ROM) It is
connected to (OE)of external ROM


> **Transcribed Media / Table Text**:
> PO
> ALE
> P2
> 8051
> MICROCONTROLLER
> PSEN
> Doso (9-7).
> (Loen®
> Andros: (o.m
> Adelress(8-18)
> LOE
> RAM
> (64K)
> ROM
> (64K)



![Figure [Page 5 Media 1]](images/fig_005_media_1.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 5 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [PO; ALE; P2; 8051; MICROCONTROLLER; PSEN; Doso (9-7).; (Loen®].

> **Figure [Page 5 Media 1]**




<!-- Page 6 -->
### [PDF Page 6]

PSW Program Status Word Register of 8051
- Format of Program Status Word Registor


> **Transcribed Media / Table Text**:
> D3
> RSO



![Figure [Page 6 Media 1]](images/fig_006_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 6 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [D3; RSO].

> **Figure [Page 6 Media 1]**




<!-- Page 7 -->
### [PDF Page 7]

- CY Carry Flag


> **Transcribed Media / Table Text**:
> 11110101
> +
> 10001010
> 1
> CY
> 01111111


> **Transcribed Media / Table Text**:
> D3
> RSO



![Figure [Page 7 Media 1]](images/fig_007_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 7 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [11110101; +; 10001010; 1; CY; 01111111].

> **Figure [Page 7 Media 1]**


![Figure [Page 7 Media 2]](images/fig_007_media_2.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 7 Media 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [D3; RSO].

> **Figure [Page 7 Media 2]**




<!-- Page 8 -->
### [PDF Page 8]

- AC Auxiliary Carry Flag


> **Transcribed Media / Table Text**:
> D3
> RSO


> **Transcribed Media / Table Text**:
> CY
> 1
> 1101
> 1101
> +
> 0000
> 1010
> 01110111



![Figure [Page 8 Media 1]](images/fig_008_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 8 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [D3; RSO].

> **Figure [Page 8 Media 1]**


![Figure [Page 8 Media 2]](images/fig_008_media_2.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 8 Media 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [CY; 1; 1101; 1101; +; 0000; 1010; 01110111].

> **Figure [Page 8 Media 2]**




<!-- Page 9 -->
### [PDF Page 9]

- F0 Frag 0 available to user for general purpose


> **Transcribed Media / Table Text**:
> D3
> RSO



![Figure [Page 9 Media 1]](images/fig_009_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 9 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [D3; RSO].

> **Figure [Page 9 Media 1]**




<!-- Page 10 -->
### [PDF Page 10]

- RS1 and RS0 is 2 bits of Register bank selector (bit 1 and 0) of internal
RAM for pointing a sector of internal memery


> **Transcribed Media / Table Text**:
> D3
> RSO


> **Transcribed Media / Table Text**:
> RS1
> 0
> 1
> 1
> RSO
> 0
> 1
> 1
> Register Bank
> 0
> 1
> 2
> 3



![Figure [Page 10 Media 1]](images/fig_010_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 10 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [D3; RSO].

> **Figure [Page 10 Media 1]**


![Figure [Page 10 Media 2]](images/fig_010_media_2.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 10 Media 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [RS1; 0; 1; 1; RSO; 0; 1; 1].

> **Figure [Page 10 Media 2]**




<!-- Page 11 -->
### [PDF Page 11]

- OV Overflow flag is set to 1 when the result of operation is greater
than 8 bits or can be stored in 8 bit registors
- P Parity Flag set or cleared by hardware during instruction cycle to
indicate even(P=0 ) or odd(P=1) of 1 bit in accumulator


> **Transcribed Media / Table Text**:
> D3
> RSO


> **Transcribed Media / Table Text**:
> 10010100
> 11010100
> P=1
> P=0



![Figure [Page 11 Media 1]](images/fig_011_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 11 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [D3; RSO].

> **Figure [Page 11 Media 1]**


![Figure [Page 11 Media 2]](images/fig_011_media_2.png)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 11 Media 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [10010100; 11010100; P=1; P=0].

> **Figure [Page 11 Media 2]**



