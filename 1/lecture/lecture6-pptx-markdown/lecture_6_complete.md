# Lecture 6
## Complete Single-File AI-Research Document

> **Source File**: Lecture 6.pptx  
> **Total Pages/Slides**: 20 pages  
> **Format**: Single-File Bundle with Zero-Drift Page Markers, Syntax Highlighting, 300 DPI Cropped Figures, and Deep Domain Walkthrough Descriptions

---


<!-- Page 1 -->
### [PDF Page 1]

Lecture 6


> **Transcribed Media / Table Text**:
> org ФОФФН
> ØØØØ| AJMP start
> org ØØØ
> 0Ø03| AJMP count
> ;main
> org ØØЗØН
> start:
> ØØ3Ø| mov IE, ØØØØØØØ1B ; set intø
> ØØ33l setb TCON.Ø
> ; set int type
> ØØ35| MOV 4ØH, #ØØH
> ØØ38| SJMP $ ; infinte Loop
> count:
> ØØ| MOV A , 4ØH
> ФЗС| INC A
> ØØD| MOV 4ØH,A
> ØØF| RETI



![Figure [Slide 1 Rendered Preview]: Lecture 6](images/fig_001_slide_preview.png)
*Description*: 8051 Serial Communication Architecture & Interface Diagram [Figure [Slide 1 Rendered Preview]: Lecture 6]: Details UART serial buffer register (SBUF), Serial Control Register (SCON) mode bits (SM0, SM1, SM2, REN receiver enable, TB8, RB8, TI transmit interrupt, RI receive interrupt), Mode 0 (synchronous shift register), Mode 1 (8-bit UART variable baud rate), Mode 2/3 (9-bit UART), baud rate generation via Timer 1 Mode 2 auto-reload, and SMOD baud rate doubling. [Labels & Elements: org ФОФФН; ØØØØ| AJMP start; org ØØØ; 0Ø03| AJMP count; ;main; org ØØЗØН; start:; ØØ3Ø| mov IE, ØØØØØØØ1B ; set intø].

> **Figure [Slide 1 Rendered Preview]: Lecture 6**




<!-- Page 2 -->
### [PDF Page 2]

Serial Communication


> **Transcribed Media / Table Text**:
> SBUF
> Processor
> Ti
> Ri
> SBUF
> 8051 Microcontroller
> TxD Pin
> {P3.1}
> RxD Pin
> {P3.0}


> **Transcribed Media / Table Text**:
> | • For | Serial | Communication, 8051 has two pins: TxD {P3.1) for |
> | :--- | :--- | :--- |
> | serial transmission and | RxD {P3.0) for serial reception. | - |
> | • SBUF register (8 bits) will give and take data serially for serial | - | - |
> | communication on | TxD and | RxD. |
> | • In serial communication, 1" it will send/receive | LSB and at last | - |
> | it will send/receive | MSB. | - |
> | • Once, 1Byte transmission is completed, Ti interrupt tells | - | - |
> | processor | 8 bits transmission is completed. | - |


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | **•** | To configure serial communication, we need to configure SCON |
> | **register** | of 8051. |



![Figure [Slide 2 Picture 1]: Serial Communication](images/fig_002_pic_1.png)
*Description*: 8051 Serial Communication Architecture & Interface Diagram [Figure [Slide 2 Picture 1]: Serial Communication]: Details UART serial buffer register (SBUF), Serial Control Register (SCON) mode bits (SM0, SM1, SM2, REN receiver enable, TB8, RB8, TI transmit interrupt, RI receive interrupt), Mode 0 (synchronous shift register), Mode 1 (8-bit UART variable baud rate), Mode 2/3 (9-bit UART), baud rate generation via Timer 1 Mode 2 auto-reload, and SMOD baud rate doubling. [Labels & Elements: SBUF; Processor; Ti; Ri; SBUF; 8051 Microcontroller; TxD Pin; {P3.1}].

> **Figure [Slide 2 Picture 1]: Serial Communication**


![Figure [Slide 2 Picture 2]: Serial Communication](images/fig_002_pic_2.png)
*Description*: 8051 Serial Communication Architecture & Interface Diagram [Figure [Slide 2 Picture 2]: Serial Communication]: Details UART serial buffer register (SBUF), Serial Control Register (SCON) mode bits (SM0, SM1, SM2, REN receiver enable, TB8, RB8, TI transmit interrupt, RI receive interrupt), Mode 0 (synchronous shift register), Mode 1 (8-bit UART variable baud rate), Mode 2/3 (9-bit UART), baud rate generation via Timer 1 Mode 2 auto-reload, and SMOD baud rate doubling. [Labels & Elements: • For Serial Communication, 8051 has two pins: TxD {P3.1) for; serial transmission and RxD {P3.0) for serial reception.; • SBUF register (8 bits) will give and take data serially for serial; communication on TxD and RxD.; • In serial communication, 1" it will send/receive LSB and at last; it will send/receive MSB.; • Once, 1Byte transmission is completed, Ti interrupt tells; processor 8 bits transmission is completed.].

> **Figure [Slide 2 Picture 2]: Serial Communication**


![Figure [Slide 2 Picture 3]: Serial Communication](images/fig_002_pic_3.png)
*Description*: 8051 Serial Communication Architecture & Interface Diagram [Figure [Slide 2 Picture 3]: Serial Communication]: Details UART serial buffer register (SBUF), Serial Control Register (SCON) mode bits (SM0, SM1, SM2, REN receiver enable, TB8, RB8, TI transmit interrupt, RI receive interrupt), Mode 0 (synchronous shift register), Mode 1 (8-bit UART variable baud rate), Mode 2/3 (9-bit UART), baud rate generation via Timer 1 Mode 2 auto-reload, and SMOD baud rate doubling. [Labels & Elements: • To configure serial communication, we need to configure SCON; register of 8051.].

> **Figure [Slide 2 Picture 3]: Serial Communication**




<!-- Page 3 -->
### [PDF Page 3]

Serial Communication


> **Transcribed Media / Table Text**:
> ```assembly
> Program
> Interrupt
> Ti = 1
> ISR Program
> MOV SBUF, A
> CLR Ti
> ```


> **Transcribed Media / Table Text**:
> ```assembly
> Program
> Interrupt
> Ri = 1
> ISR Program
> MOV A, SBUF
> CLR Ri
> ```


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | **•** | Once, 1Byte transmission is completed, Ti interrupt tells |
> | **processor** | 8 bits transmission is completed. |
> | **•** | Once, 1Byte Reception is completed, Ri interrupt tells processor |
> | **8** | bits reception is completed. |



![Figure [Slide 3 Picture 1]: Serial Communication](images/fig_003_pic_1.png)
*Description*: 8051 Serial Communication Architecture & Interface Diagram [Figure [Slide 3 Picture 1]: Serial Communication]: Details UART serial buffer register (SBUF), Serial Control Register (SCON) mode bits (SM0, SM1, SM2, REN receiver enable, TB8, RB8, TI transmit interrupt, RI receive interrupt), Mode 0 (synchronous shift register), Mode 1 (8-bit UART variable baud rate), Mode 2/3 (9-bit UART), baud rate generation via Timer 1 Mode 2 auto-reload, and SMOD baud rate doubling. [Labels & Elements: Program; Interrupt; Ti = 1; ISR Program; MOV SBUF, A; CLR Ti].

> **Figure [Slide 3 Picture 1]: Serial Communication**


![Figure [Slide 3 Picture 2]: Serial Communication](images/fig_003_pic_2.png)
*Description*: 8051 Serial Communication Architecture & Interface Diagram [Figure [Slide 3 Picture 2]: Serial Communication]: Details UART serial buffer register (SBUF), Serial Control Register (SCON) mode bits (SM0, SM1, SM2, REN receiver enable, TB8, RB8, TI transmit interrupt, RI receive interrupt), Mode 0 (synchronous shift register), Mode 1 (8-bit UART variable baud rate), Mode 2/3 (9-bit UART), baud rate generation via Timer 1 Mode 2 auto-reload, and SMOD baud rate doubling. [Labels & Elements: Program; Interrupt; Ri = 1; ISR Program; MOV A, SBUF; CLR Ri].

> **Figure [Slide 3 Picture 2]: Serial Communication**


![Figure [Slide 3 Picture 3]: Serial Communication](images/fig_003_pic_3.png)
*Description*: 8051 Serial Communication Architecture & Interface Diagram [Figure [Slide 3 Picture 3]: Serial Communication]: Details UART serial buffer register (SBUF), Serial Control Register (SCON) mode bits (SM0, SM1, SM2, REN receiver enable, TB8, RB8, TI transmit interrupt, RI receive interrupt), Mode 0 (synchronous shift register), Mode 1 (8-bit UART variable baud rate), Mode 2/3 (9-bit UART), baud rate generation via Timer 1 Mode 2 auto-reload, and SMOD baud rate doubling. [Labels & Elements: • Once, 1Byte transmission is completed, Ti interrupt tells; processor 8 bits transmission is completed.; • Once, 1Byte Reception is completed, Ri interrupt tells processor; 8 bits reception is completed.].

> **Figure [Slide 3 Picture 3]: Serial Communication**




<!-- Page 4 -->
### [PDF Page 4]

SCON registers


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | **V** | SCON Serial Control register - |
> | **{Bit** | Address SCON.7 to SCON.0} |
> | Feature 3 | sMO |
> | Feature 4 | SM1 |
> | Feature 5 | SM2 |
> | Feature 6 | REN |
> | Feature 7 | TB8 |
> | Feature 8 | RB8 |
> | Feature 9 | TI |
> | Feature 10 | RI |


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | Feature 1 | SMO |
> | Feature 2 | 0 |
> | Feature 3 | 0 |
> | Feature 4 | 1 |
> | Feature 5 | 1 |
> | **SMO** | & SM1 - Mode Control bits |
> | Feature 7 | SM1 |
> | **Serial** | Mode |
> | **Mode** | 0 |
> | Feature 10 | 1 |
> | Feature 11 | 0 |
> | **Mode** | 1 |
> | **Mode** | 2 |
> | Feature 14 | 1 |
> | **Mode** | 3 |
> | Feature 16 | Description |
> | **Shift** | Register |
> | **8** | bit UART |
> | **9** | bit UART |
> | **9** | bit UART |
> | **Baud** | Rate |
> | Feature 22 | Fosc/12 |
> | Feature 23 | Variable |
> | **Fosc/32** | or Fosc/64 |
> | Feature 25 | Variable |



![Figure [Slide 4 Picture 1]: SCON registers](images/fig_004_pic_1.png)
*Description*: 8051 Serial Communication Architecture & Interface Diagram [Figure [Slide 4 Picture 1]: SCON registers]: Details UART serial buffer register (SBUF), Serial Control Register (SCON) mode bits (SM0, SM1, SM2, REN receiver enable, TB8, RB8, TI transmit interrupt, RI receive interrupt), Mode 0 (synchronous shift register), Mode 1 (8-bit UART variable baud rate), Mode 2/3 (9-bit UART), baud rate generation via Timer 1 Mode 2 auto-reload, and SMOD baud rate doubling. [Labels & Elements: V SCON Serial Control register -; {Bit Address SCON.7 to SCON.0}; sMO; SM1; SM2; REN; TB8; RB8].

> **Figure [Slide 4 Picture 1]: SCON registers**


![Figure [Slide 4 Picture 2]: SCON registers](images/fig_004_pic_2.png)
*Description*: 8051 Serial Communication Architecture & Interface Diagram [Figure [Slide 4 Picture 2]: SCON registers]: Details UART serial buffer register (SBUF), Serial Control Register (SCON) mode bits (SM0, SM1, SM2, REN receiver enable, TB8, RB8, TI transmit interrupt, RI receive interrupt), Mode 0 (synchronous shift register), Mode 1 (8-bit UART variable baud rate), Mode 2/3 (9-bit UART), baud rate generation via Timer 1 Mode 2 auto-reload, and SMOD baud rate doubling. [Labels & Elements: SMO; 0; 0; 1; 1; SMO & SM1 - Mode Control bits; SM1; Serial Mode].

> **Figure [Slide 4 Picture 2]: SCON registers**




<!-- Page 5 -->
### [PDF Page 5]

SCON registers


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | **V** | SCON Serial Control register - |
> | **{Bit** | Address SCON.7 to SCON.0} |
> | Feature 3 | sMO |
> | Feature 4 | SM1 |
> | Feature 5 | SM2 |
> | Feature 6 | REN |
> | Feature 7 | TB8 |
> | Feature 8 | RB8 |
> | Feature 9 | TI |
> | Feature 10 | RI |


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | Feature 1 | 0 |
> | **Mode** | 0 {Shift Register sends only data} |
> | Feature 3 | DO |
> | Feature 4 | D1 |
> | Feature 5 | D2 |
> | Feature 6 | D3 |
> | Feature 7 | D4 |
> | Feature 8 | D5 |
> | Feature 9 | D6 |
> | Feature 10 | D7 |
> | **Mode** | 1 {8 Bit UART, 1" Start bit 0, then 8bits data and at last |
> | **stop** | bit 1} |
> | Feature 13 | DO |
> | Feature 14 | D1 |
> | Feature 15 | D2 |
> | Feature 16 | D3 |
> | Feature 17 | D4 |
> | Feature 18 | D5 |
> | Feature 19 | D6 |
> | Feature 20 | D7 |
> | Feature 21 | 1 |
> | **Mode** | 2 & 3 {9 Bit UART, 1s Start bit 0, then 8 bits data, 1 bit |
> | **parity** | and at last stop bit 1} |
> | Feature 24 | DO |
> | Feature 25 | D1 |
> | Feature 26 | D2 |
> | Feature 27 | D3 |
> | Feature 28 | D4 |
> | Feature 29 | D5 |
> | Feature 30 | D6 |
> | Feature 31 | D7 |
> | Feature 32 | P |
> | Feature 33 | 1 |



![Figure [Slide 5 Picture 1]: SCON registers](images/fig_005_pic_1.png)
*Description*: 8051 Serial Communication Architecture & Interface Diagram [Figure [Slide 5 Picture 1]: SCON registers]: Details UART serial buffer register (SBUF), Serial Control Register (SCON) mode bits (SM0, SM1, SM2, REN receiver enable, TB8, RB8, TI transmit interrupt, RI receive interrupt), Mode 0 (synchronous shift register), Mode 1 (8-bit UART variable baud rate), Mode 2/3 (9-bit UART), baud rate generation via Timer 1 Mode 2 auto-reload, and SMOD baud rate doubling. [Labels & Elements: V SCON Serial Control register -; {Bit Address SCON.7 to SCON.0}; sMO; SM1; SM2; REN; TB8; RB8].

> **Figure [Slide 5 Picture 1]: SCON registers**


![Figure [Slide 5 Picture 2]: SCON registers](images/fig_005_pic_2.png)
*Description*: 8051 Serial Communication Architecture & Interface Diagram [Figure [Slide 5 Picture 2]: SCON registers]: Details UART serial buffer register (SBUF), Serial Control Register (SCON) mode bits (SM0, SM1, SM2, REN receiver enable, TB8, RB8, TI transmit interrupt, RI receive interrupt), Mode 0 (synchronous shift register), Mode 1 (8-bit UART variable baud rate), Mode 2/3 (9-bit UART), baud rate generation via Timer 1 Mode 2 auto-reload, and SMOD baud rate doubling. [Labels & Elements: 0; Mode 0 {Shift Register sends only data}; DO; D1; D2; D3; D4; D5].

> **Figure [Slide 5 Picture 2]: SCON registers**




<!-- Page 6 -->
### [PDF Page 6]

SCON registers


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | **V** | SCON Serial Control register - |
> | **{Bit** | Address SCON.7 to SCON.0} |
> | Feature 3 | sMO |
> | Feature 4 | SM1 |
> | Feature 5 | SM2 |
> | Feature 6 | REN |
> | Feature 7 | TB8 |
> | Feature 8 | RB8 |
> | Feature 9 | TI |
> | Feature 10 | RI |


> **Transcribed Media / Table Text**:
> | SM2 - Enables | Multiprocessor | System with | Mode | 2 and | Mode | 3. |
> | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
> | REN - Receiver | Enable | - | - | - | - | - |
> | REN = 0, receiver disabled | - | - | - | - | - | - |
> | REN = 1, receiver enabled | - | - | - | - | - | - |
> | TB8 - Transmitted bit | 8 (Technically it is programmable | 9th bit in | - | - | - | - |
> | mode | 2 and | 3} | - | - | - | - |
> | • Mode | 0 - not used | - | - | - | - | - |
> | • Mode | 1 - stop bit '1' | - | - | - | - | - |
> | • Mode | 2 & 3 - Parity bit, programmed by programmer. | - | - | - | - | - |
> | RB8 - Received bit | 8 {Technically it is programmable gth bit in | - | - | - | - | - |
> | mode | 2 and | 3} | - | - | - | - |
> | • | - | - | - | - | - | - |
> | • | - | - | - | - | - | - |
> | Mode | 0 - not used | - | - | - | - | - |
> | Mode | 1- stop bit | 1' | - | - | - | - |
> | Mode | 2 & 3 - Parity bit, programmed by programmer. | - | - | - | - | - |
> | RI - Receive | Interrupt | - | - | - | - | - |
> | It will be one after | SBUF receives | 8 bits data. | - | - | - | - |
> | • RI will be cleared by programmer in | ISR program. | - | - | - | - | - |
> | TI - Transmit | Interrupt | - | - | - | - | - |
> | • It will be one after | SBUF transmits | 8 bits data. | - | - | - | - |
> | • TI will be cleared by programmer in | ISR program. | - | - | - | - | - |



![Figure [Slide 6 Picture 1]: SCON registers](images/fig_006_pic_1.png)
*Description*: 8051 Serial Communication Architecture & Interface Diagram [Figure [Slide 6 Picture 1]: SCON registers]: Details UART serial buffer register (SBUF), Serial Control Register (SCON) mode bits (SM0, SM1, SM2, REN receiver enable, TB8, RB8, TI transmit interrupt, RI receive interrupt), Mode 0 (synchronous shift register), Mode 1 (8-bit UART variable baud rate), Mode 2/3 (9-bit UART), baud rate generation via Timer 1 Mode 2 auto-reload, and SMOD baud rate doubling. [Labels & Elements: V SCON Serial Control register -; {Bit Address SCON.7 to SCON.0}; sMO; SM1; SM2; REN; TB8; RB8].

> **Figure [Slide 6 Picture 1]: SCON registers**


![Figure [Slide 6 Picture 2]: SCON registers](images/fig_006_pic_2.png)
*Description*: 8051 Serial Communication Architecture & Interface Diagram [Figure [Slide 6 Picture 2]: SCON registers]: Details UART serial buffer register (SBUF), Serial Control Register (SCON) mode bits (SM0, SM1, SM2, REN receiver enable, TB8, RB8, TI transmit interrupt, RI receive interrupt), Mode 0 (synchronous shift register), Mode 1 (8-bit UART variable baud rate), Mode 2/3 (9-bit UART), baud rate generation via Timer 1 Mode 2 auto-reload, and SMOD baud rate doubling. [Labels & Elements: SM2 - Enables Multiprocessor System with Mode 2 and Mode 3.; REN - Receiver Enable; REN = 0, receiver disabled; REN = 1, receiver enabled; TB8 - Transmitted bit 8 (Technically it is programmable 9th bit in; mode 2 and 3}; • Mode 0 - not used; • Mode 1 - stop bit '1'].

> **Figure [Slide 6 Picture 2]: SCON registers**




<!-- Page 7 -->
### [PDF Page 7]

SCON registers


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | **V** | SCON Serial Control register - |
> | **{Bit** | Address SCON.7 to SCON.0} |
> | Feature 3 | sMO |
> | Feature 4 | SM1 |
> | Feature 5 | SM2 |
> | Feature 6 | REN |
> | Feature 7 | TB8 |
> | Feature 8 | RB8 |
> | Feature 9 | TI |
> | Feature 10 | RI |


> **Transcribed Media / Table Text**:
> | SM2 - Enables | Multiprocessor | System with | Mode | 2 and | Mode | 3. |
> | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
> | REN - Receiver | Enable | - | - | - | - | - |
> | REN = 0, receiver disabled | - | - | - | - | - | - |
> | REN = 1, receiver enabled | - | - | - | - | - | - |
> | TB8 - Transmitted bit | 8 (Technically it is programmable | 9th bit in | - | - | - | - |
> | mode | 2 and | 3} | - | - | - | - |
> | • Mode | 0 - not used | - | - | - | - | - |
> | • Mode | 1 - stop bit '1' | - | - | - | - | - |
> | • Mode | 2 & 3 - Parity bit, programmed by programmer. | - | - | - | - | - |
> | RB8 - Received bit | 8 {Technically it is programmable gth bit in | - | - | - | - | - |
> | mode | 2 and | 3} | - | - | - | - |
> | • | - | - | - | - | - | - |
> | • | - | - | - | - | - | - |
> | Mode | 0 - not used | - | - | - | - | - |
> | Mode | 1- stop bit | 1' | - | - | - | - |
> | Mode | 2 & 3 - Parity bit, programmed by programmer. | - | - | - | - | - |
> | RI - Receive | Interrupt | - | - | - | - | - |
> | It will be one after | SBUF receives | 8 bits data. | - | - | - | - |
> | • RI will be cleared by programmer in | ISR program. | - | - | - | - | - |
> | TI - Transmit | Interrupt | - | - | - | - | - |
> | • It will be one after | SBUF transmits | 8 bits data. | - | - | - | - |
> | • TI will be cleared by programmer in | ISR program. | - | - | - | - | - |



![Figure [Slide 7 Picture 1]: SCON registers](images/fig_007_pic_1.png)
*Description*: 8051 Serial Communication Architecture & Interface Diagram [Figure [Slide 7 Picture 1]: SCON registers]: Details UART serial buffer register (SBUF), Serial Control Register (SCON) mode bits (SM0, SM1, SM2, REN receiver enable, TB8, RB8, TI transmit interrupt, RI receive interrupt), Mode 0 (synchronous shift register), Mode 1 (8-bit UART variable baud rate), Mode 2/3 (9-bit UART), baud rate generation via Timer 1 Mode 2 auto-reload, and SMOD baud rate doubling. [Labels & Elements: V SCON Serial Control register -; {Bit Address SCON.7 to SCON.0}; sMO; SM1; SM2; REN; TB8; RB8].

> **Figure [Slide 7 Picture 1]: SCON registers**


![Figure [Slide 7 Picture 2]: SCON registers](images/fig_007_pic_2.png)
*Description*: 8051 Serial Communication Architecture & Interface Diagram [Figure [Slide 7 Picture 2]: SCON registers]: Details UART serial buffer register (SBUF), Serial Control Register (SCON) mode bits (SM0, SM1, SM2, REN receiver enable, TB8, RB8, TI transmit interrupt, RI receive interrupt), Mode 0 (synchronous shift register), Mode 1 (8-bit UART variable baud rate), Mode 2/3 (9-bit UART), baud rate generation via Timer 1 Mode 2 auto-reload, and SMOD baud rate doubling. [Labels & Elements: SM2 - Enables Multiprocessor System with Mode 2 and Mode 3.; REN - Receiver Enable; REN = 0, receiver disabled; REN = 1, receiver enabled; TB8 - Transmitted bit 8 (Technically it is programmable 9th bit in; mode 2 and 3}; • Mode 0 - not used; • Mode 1 - stop bit '1'].

> **Figure [Slide 7 Picture 2]: SCON registers**




<!-- Page 8 -->
### [PDF Page 8]

Basics of Interrupts


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | **•** | 8051 has five interrupts and all are vectored interrupt. |
> | **•** | Two Hardware interrupts : INTO and INT1 |
> | **•** | Two Timer Overflow internal Interrupts : TF0 and TF1 |
> | **•** | Serial Communication internal Interrupt : Common for RI and TI |
> | **•** | All the interrupts are controlled by IE and IP registers. |



![Figure [Slide 8 Picture 1]: Basics of Interrupts](images/fig_008_pic_1.png)
*Description*: 8051 Interrupt Structure & Vector Table Architecture Diagram [Figure [Slide 8 Picture 1]: Basics of Interrupts]: Details 5 core interrupt sources (Reset, External Interrupt 0 INT0, Timer 0 TF0, External Interrupt 1 INT1, Timer 1 TF1, Serial Communication TI/RI), Interrupt Enable (IE) register with EA global enable, Interrupt Priority (IP) register, fixed ROM interrupt vector table memory addresses (0000H, 0003H, 000BH, 0013H, 001BH, 0023H), and Interrupt Service Routine (ISR) execution sequencing. [Labels & Elements: • 8051 has five interrupts and all are vectored interrupt.; • Two Hardware interrupts : INTO and INT1; • Two Timer Overflow internal Interrupts : TF0 and TF1; • Serial Communication internal Interrupt : Common for RI and TI; • All the interrupts are controlled by IE and IP registers.].

> **Figure [Slide 8 Picture 1]: Basics of Interrupts**




<!-- Page 9 -->
### [PDF Page 9]

Basics of Interrupts


> **Transcribed Media / Table Text**:
> ```assembly
> Program
> 1
> Interrupt
> ISR Program
> PUSH PC
> POP PC
> RETI
> ```


> **Transcribed Media / Table Text**:
> | i, Priority and | Vector | Address of | Interrupts in | 8051 |
> | :--- | :--- | :--- | :--- | :--- |
> | Interrupt | - | - | - | - |
> | Priority | - | - | - | - |
> | INTO | - | - | - | - |
> | 1 | - | - | - | - |
> | Vector | Address | - | - | - |
> | 0003H | - | - | - | - |
> | TFO | - | - | - | - |
> | INT1 | - | - | - | - |
> | TF1 | - | - | - | - |
> | Serial (RI or | TI) | - | - | - |
> | 2 | - | - | - | - |
> | 3 | - | - | - | - |
> | 4 | - | - | - | - |
> | 5 | - | - | - | - |
> | 000BH | - | - | - | - |
> | 0013H | - | - | - | - |
> | 001BH | - | - | - | - |
> | 0023H | - | - | - | - |



![Figure [Slide 9 Picture 1]: Basics of Interrupts](images/fig_009_pic_1.png)
*Description*: 8051 Interrupt Structure & Vector Table Architecture Diagram [Figure [Slide 9 Picture 1]: Basics of Interrupts]: Details 5 core interrupt sources (Reset, External Interrupt 0 INT0, Timer 0 TF0, External Interrupt 1 INT1, Timer 1 TF1, Serial Communication TI/RI), Interrupt Enable (IE) register with EA global enable, Interrupt Priority (IP) register, fixed ROM interrupt vector table memory addresses (0000H, 0003H, 000BH, 0013H, 001BH, 0023H), and Interrupt Service Routine (ISR) execution sequencing. [Labels & Elements: Program; 1; Interrupt; ISR Program; PUSH PC; POP PC; RETI].

> **Figure [Slide 9 Picture 1]: Basics of Interrupts**


![Figure [Slide 9 Picture 2]: Basics of Interrupts](images/fig_009_pic_2.png)
*Description*: 8051 Interrupt Structure & Vector Table Architecture Diagram [Figure [Slide 9 Picture 2]: Basics of Interrupts]: Details 5 core interrupt sources (Reset, External Interrupt 0 INT0, Timer 0 TF0, External Interrupt 1 INT1, Timer 1 TF1, Serial Communication TI/RI), Interrupt Enable (IE) register with EA global enable, Interrupt Priority (IP) register, fixed ROM interrupt vector table memory addresses (0000H, 0003H, 000BH, 0013H, 001BH, 0023H), and Interrupt Service Routine (ISR) execution sequencing. [Labels & Elements: i, Priority and Vector Address of Interrupts in 8051; Interrupt; Priority; INTO; 1; Vector Address; 0003H; TFO].

> **Figure [Slide 9 Picture 2]: Basics of Interrupts**




<!-- Page 10 -->
### [PDF Page 10]

IE registers


> **Transcribed Media / Table Text**:
> | •* IE - Interrupt | Enable | Register {Bit | Addressable | IE.7 to | IE.O} |
> | :--- | :--- | :--- | :--- | :--- | :--- |
> | EA | - | - | - | - | - |
> | - | - | - | - | - | - |
> | ET2 | - | - | - | - | - |
> | ES | - | - | - | - | - |
> | ET1 | EX1 | - | - | - | - |
> | ETO | - | - | - | - | - |
> | EXO | - | - | - | - | - |
> | • EA - Enable | All, ET2 - Reserved, ES - Enable | Serial, ET1 - Enable | - | - | - |
> | Timer | 1, EX1 - Enable | INT1, ETO - Enable | Timer | 0 and | EXO - |
> | Enable | INTO. | - | - | - | - |
> | • To | Enable it, make it | 1 | - | - | - |
> | • To | Disable it, make it | O | - | - | - |


> **Transcribed Media / Table Text**:
> | i | Priority and | Vector | Address of | Interrupts in | 8051 |
> | :--- | :--- | :--- | :--- | :--- | :--- |
> | Interrupt | - | - | - | - | - |
> | Priority | - | - | - | - | - |
> | Vector | Address | - | - | - | - |
> | INTO | - | - | - | - | - |
> | 1 | - | - | - | - | - |
> | 0003H | - | - | - | - | - |
> | TFO | - | - | - | - | - |
> | INT1 | - | - | - | - | - |
> | TF1 | - | - | - | - | - |
> | Serial (RI or | TI) | - | - | - | - |
> | 2 | - | - | - | - | - |
> | 3 | - | - | - | - | - |
> | 4 | - | - | - | - | - |
> | 5 | - | - | - | - | - |
> | 000BH | - | - | - | - | - |
> | 0013H | - | - | - | - | - |
> | 001BH | - | - | - | - | - |
> | 0023H | - | - | - | - | - |



![Figure [Slide 10 Picture 1]: IE registers](images/fig_010_pic_1.png)
*Description*: 8051 Interrupt Structure & Vector Table Architecture Diagram [Figure [Slide 10 Picture 1]: IE registers]: Details 5 core interrupt sources (Reset, External Interrupt 0 INT0, Timer 0 TF0, External Interrupt 1 INT1, Timer 1 TF1, Serial Communication TI/RI), Interrupt Enable (IE) register with EA global enable, Interrupt Priority (IP) register, fixed ROM interrupt vector table memory addresses (0000H, 0003H, 000BH, 0013H, 001BH, 0023H), and Interrupt Service Routine (ISR) execution sequencing. [Labels & Elements: •* IE - Interrupt Enable Register {Bit Addressable IE.7 to IE.O}; EA; -; ET2; ES; ET1 EX1; ETO; EXO].

> **Figure [Slide 10 Picture 1]: IE registers**


![Figure [Slide 10 Picture 2]: IE registers](images/fig_010_pic_2.png)
*Description*: 8051 Interrupt Structure & Vector Table Architecture Diagram [Figure [Slide 10 Picture 2]: IE registers]: Details 5 core interrupt sources (Reset, External Interrupt 0 INT0, Timer 0 TF0, External Interrupt 1 INT1, Timer 1 TF1, Serial Communication TI/RI), Interrupt Enable (IE) register with EA global enable, Interrupt Priority (IP) register, fixed ROM interrupt vector table memory addresses (0000H, 0003H, 000BH, 0013H, 001BH, 0023H), and Interrupt Service Routine (ISR) execution sequencing. [Labels & Elements: i Priority and Vector Address of Interrupts in 8051; Interrupt; Priority; Vector Address; INTO; 1; 0003H; TFO].

> **Figure [Slide 10 Picture 2]: IE registers**




<!-- Page 11 -->
### [PDF Page 11]

IP registers


> **Transcribed Media / Table Text**:
> | i | Priority and | Vector | Address of | Interrupts in | 8051 |
> | :--- | :--- | :--- | :--- | :--- | :--- |
> | Interrupt | - | - | - | - | - |
> | Priority | - | - | - | - | - |
> | Vector | Address | - | - | - | - |
> | INTO | - | - | - | - | - |
> | 1 | - | - | - | - | - |
> | 0003H | - | - | - | - | - |
> | TFO | - | - | - | - | - |
> | INT1 | - | - | - | - | - |
> | TF1 | - | - | - | - | - |
> | Serial (RI or | TI) | - | - | - | - |
> | 2 | - | - | - | - | - |
> | 3 | - | - | - | - | - |
> | 4 | - | - | - | - | - |
> | 5 | - | - | - | - | - |
> | 000BH | - | - | - | - | - |
> | 0013H | - | - | - | - | - |
> | 001BH | - | - | - | - | - |
> | 0023H | - | - | - | - | - |


> **Transcribed Media / Table Text**:
> | IP - Interrupt | Priority | Register (Bit | Addressable | IP.7 to | IP.O} |
> | :--- | :--- | :--- | :--- | :--- | :--- |
> | - | - | - | - | - | - |
> | - | - | - | - | - | - |
> | PT2 | - | - | - | - | - |
> | PS | - | - | - | - | - |
> | PT1 | - | - | - | - | - |
> | PX1 | - | - | - | - | - |
> | PTO | - | - | - | - | - |
> | PXO | - | - | - | - | - |
> | • PT2 - Reserved, PS - Priority | Serial, PT1 - Priority | Timer | 1, PX1 - | - | - |
> | Priority | INT1, PTO - Priority | Timer | 0 and | PXO - Priority | INTO. |
> | To have high | Priority, make it | 1 | - | - | - |
> | • To have low | Priority, make it | O | - | - | - |



![Figure [Slide 11 Picture 1]: IP registers](images/fig_011_pic_1.png)
*Description*: 8051 Interrupt Structure & Vector Table Architecture Diagram [Figure [Slide 11 Picture 1]: IP registers]: Details 5 core interrupt sources (Reset, External Interrupt 0 INT0, Timer 0 TF0, External Interrupt 1 INT1, Timer 1 TF1, Serial Communication TI/RI), Interrupt Enable (IE) register with EA global enable, Interrupt Priority (IP) register, fixed ROM interrupt vector table memory addresses (0000H, 0003H, 000BH, 0013H, 001BH, 0023H), and Interrupt Service Routine (ISR) execution sequencing. [Labels & Elements: i Priority and Vector Address of Interrupts in 8051; Interrupt; Priority; Vector Address; INTO; 1; 0003H; TFO].

> **Figure [Slide 11 Picture 1]: IP registers**


![Figure [Slide 11 Picture 2]: IP registers](images/fig_011_pic_2.png)
*Description*: 8051 Interrupt Structure & Vector Table Architecture Diagram [Figure [Slide 11 Picture 2]: IP registers]: Details 5 core interrupt sources (Reset, External Interrupt 0 INT0, Timer 0 TF0, External Interrupt 1 INT1, Timer 1 TF1, Serial Communication TI/RI), Interrupt Enable (IE) register with EA global enable, Interrupt Priority (IP) register, fixed ROM interrupt vector table memory addresses (0000H, 0003H, 000BH, 0013H, 001BH, 0023H), and Interrupt Service Routine (ISR) execution sequencing. [Labels & Elements: IP - Interrupt Priority Register (Bit Addressable IP.7 to IP.O}; -; -; PT2; PS; PT1; PX1; PTO].

> **Figure [Slide 11 Picture 2]: IP registers**




<!-- Page 12 -->
### [PDF Page 12]

ISR programming


> **Transcribed Media / Table Text**:
> ```assembly
> org ФОФФН
> ØØØØ| AJMP start
> org ØØØ
> 0Ø03| AJMP count
> ;main
> org ØØЗØН
> start:
> ØØ3Ø| mov IE, ØØØØØØØ1B ; set intø
> ØØ33l setb TCON.Ø
> ; set int type
> ØØ35| MOV 4ØH, #ØØH
> ØØ38| SJMP $ ; infinte Loop
> count:
> ØØ| MOV A , 4ØH
> ФЗС| INC A
> ØØD| MOV 4ØH,A
> ØØF| RETI
> ```


> **Transcribed Media / Table Text**:
> | Priority and | Vector | Address of | Interrupts in | 8051 |
> | :--- | :--- | :--- | :--- | :--- |
> | Interrupt | - | - | - | - |
> | Priority | - | - | - | - |
> | Vector | Address | - | - | - |
> | INTO | - | - | - | - |
> | 1 | - | - | - | - |
> | 0003H | - | - | - | - |
> | TFO | - | - | - | - |
> | INT1 | - | - | - | - |
> | TF1 | - | - | - | - |
> | Serial (RI or | TI) | - | - | - |
> | 2 | - | - | - | - |
> | 3 | - | - | - | - |
> | 4 | - | - | - | - |
> | 5 | - | - | - | - |
> | 000BH | - | - | - | - |
> | 0013H | - | - | - | - |
> | 001BH | - | - | - | - |
> | 0023H | - | - | - | - |



![Figure [Slide 12 Picture 1]: ISR programming](images/fig_012_pic_1.png)
*Description*: 8051 Interrupt Structure & Vector Table Architecture Diagram [Figure [Slide 12 Picture 1]: ISR programming]: Details 5 core interrupt sources (Reset, External Interrupt 0 INT0, Timer 0 TF0, External Interrupt 1 INT1, Timer 1 TF1, Serial Communication TI/RI), Interrupt Enable (IE) register with EA global enable, Interrupt Priority (IP) register, fixed ROM interrupt vector table memory addresses (0000H, 0003H, 000BH, 0013H, 001BH, 0023H), and Interrupt Service Routine (ISR) execution sequencing. [Labels & Elements: org ФОФФН; ØØØØ| AJMP start; org ØØØ; 0Ø03| AJMP count; ;main; org ØØЗØН; start:; ØØ3Ø| mov IE, ØØØØØØØ1B ; set intø].

> **Figure [Slide 12 Picture 1]: ISR programming**


![Figure [Slide 12 Picture 2]: ISR programming](images/fig_012_pic_2.png)
*Description*: 8051 Interrupt Structure & Vector Table Architecture Diagram [Figure [Slide 12 Picture 2]: ISR programming]: Details 5 core interrupt sources (Reset, External Interrupt 0 INT0, Timer 0 TF0, External Interrupt 1 INT1, Timer 1 TF1, Serial Communication TI/RI), Interrupt Enable (IE) register with EA global enable, Interrupt Priority (IP) register, fixed ROM interrupt vector table memory addresses (0000H, 0003H, 000BH, 0013H, 001BH, 0023H), and Interrupt Service Routine (ISR) execution sequencing. [Labels & Elements: Priority and Vector Address of Interrupts in 8051; Interrupt; Priority; Vector Address; INTO; 1; 0003H; TFO].

> **Figure [Slide 12 Picture 2]: ISR programming**




<!-- Page 13 -->
### [PDF Page 13]

Interrupts 8051 microcontroller Vector Table


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | Feature 1 | Interrupts |
> | Feature 2 | Reset |
> | Feature 3 | Timero |
> | Feature 4 | Timerl |
> | Feature 5 | INTO |
> | Feature 6 | INTI |
> | **Serial** | com |
> | **Memory** | Location Pin |
> | Feature 9 | 0000 |
> | Feature 10 | 9 |
> | Feature 11 | 000B |
> | Feature 12 | 001B |
> | Feature 13 | 0003 |
> | Feature 14 | 0013 |
> | Feature 15 | 12 |
> | Feature 16 | 0023 |
> | **Flag** | Clearing |
> | Feature 18 | Auto |
> | Feature 19 | Auto |
> | Feature 20 | Auto |
> | Feature 21 | Auto |
> | Feature 22 | Auto |
> | **Cleared** | by programmer |



![Figure [Slide 13 Picture 1]: Interrupts 8051 microcontroller Vector Table](images/fig_013_pic_1.png)
*Description*: 8051 Interrupt Structure & Vector Table Architecture Diagram [Figure [Slide 13 Picture 1]: Interrupts 8051 microcontroller Vector Table]: Details 5 core interrupt sources (Reset, External Interrupt 0 INT0, Timer 0 TF0, External Interrupt 1 INT1, Timer 1 TF1, Serial Communication TI/RI), Interrupt Enable (IE) register with EA global enable, Interrupt Priority (IP) register, fixed ROM interrupt vector table memory addresses (0000H, 0003H, 000BH, 0013H, 001BH, 0023H), and Interrupt Service Routine (ISR) execution sequencing. [Labels & Elements: Interrupts; Reset; Timero; Timerl; INTO; INTI; Serial com; Memory Location Pin].

> **Figure [Slide 13 Picture 1]: Interrupts 8051 microcontroller Vector Table**




<!-- Page 14 -->
### [PDF Page 14]

Power Saving Modes


> **Transcribed Media / Table Text**:
> | * Basics of | Power | Saving in | 8051 |
> | :--- | :--- | :--- | :--- |
> | • 8051 has two power saving modes: | - | - | - |
> | 1. Idle | Mode | - | - |
> | 2. Power | Down | Mode | - |
> | • This power saving modes are controlled by | PCON register. | - | - |



![Figure [Slide 14 Picture 1]: Power Saving Modes](images/fig_014_pic_1.png)
*Description*: 8051 Power Management Architecture Diagram [Figure [Slide 14 Picture 1]: Power Saving Modes]: Details Power Control Register (PCON), Idle Mode operation (CPU clock gated, peripherals/timers/interrupts remain active, terminated via enabled interrupts or reset), Power Down Mode (on-chip oscillator halted, RAM contents preserved, micro-power consumption, terminated via hardware reset), and power-saving clock gating circuitry. [Labels & Elements: * Basics of Power Saving in 8051; • 8051 has two power saving modes:; 1. Idle Mode; 2. Power Down Mode; • This power saving modes are controlled by PCON register.].

> **Figure [Slide 14 Picture 1]: Power Saving Modes**




<!-- Page 15 -->
### [PDF Page 15]

Power Saving Modes


> **Transcribed Media / Table Text**:
> Advantages of Power Saving in 8051
> 8051 is used in embedded systems operated with battery, So it
> saves cost of system.
> No need of fans and cooling system due to this modes.
> It makes circuit compact, as we don't need additional circuits for
> cooling.
> - It will increase life & reliability of entire system.



![Figure [Slide 15 Picture 1]: Power Saving Modes](images/fig_015_pic_1.png)
*Description*: 8051 Power Management Architecture Diagram [Figure [Slide 15 Picture 1]: Power Saving Modes]: Details Power Control Register (PCON), Idle Mode operation (CPU clock gated, peripherals/timers/interrupts remain active, terminated via enabled interrupts or reset), Power Down Mode (on-chip oscillator halted, RAM contents preserved, micro-power consumption, terminated via hardware reset), and power-saving clock gating circuitry. [Labels & Elements: Advantages of Power Saving in 8051; 8051 is used in embedded systems operated with battery, So it; saves cost of system.; No need of fans and cooling system due to this modes.; It makes circuit compact, as we don't need additional circuits for; cooling.; • It will increase life & reliability of entire system.].

> **Figure [Slide 15 Picture 1]: Power Saving Modes**




<!-- Page 16 -->
### [PDF Page 16]

PCON register


> **Transcribed Media / Table Text**:
> | •; PCON - Power | Control | Register (No bit addressable} |
> | :--- | :--- | :--- |
> | SMOD | - | - |
> | - | - | - |
> | - | - | - |
> | GF1 | - | - |
> | GFO | - | - |
> | PD | - | - |
> | • | - | - |
> | SMOD - Serial | Baud rate. | - |
> | GF1 & GFO - General | Purpose, left for user to define it. | - |
> | PD - Power | Down | Mode. |
> | If | PD = 1, Power | Down |
> | If | PD = 0, Power | Down |
> | IDL - Power | Idle | Mode. |
> | If | IDL = 1, Idle | Mode is |
> | If | IDL = 0, Idle | Mode is |
> | IDL | - | - |


> **Transcribed Media / Table Text**:
> Note: If PD and IDL, both are enabled by keeping them 1, then
> 8051 will consider PD Mode only.



![Figure [Slide 16 Picture 1]: PCON register](images/fig_016_pic_1.png)
*Description*: 8051 Power Management Architecture Diagram [Figure [Slide 16 Picture 1]: PCON register]: Details Power Control Register (PCON), Idle Mode operation (CPU clock gated, peripherals/timers/interrupts remain active, terminated via enabled interrupts or reset), Power Down Mode (on-chip oscillator halted, RAM contents preserved, micro-power consumption, terminated via hardware reset), and power-saving clock gating circuitry. [Labels & Elements: •; PCON - Power Control Register (No bit addressable}; SMOD; -; -; GF1; GFO; PD; •].

> **Figure [Slide 16 Picture 1]: PCON register**


![Figure [Slide 16 Picture 2]: PCON register](images/fig_016_pic_2.png)
*Description*: 8051 Power Management Architecture Diagram [Figure [Slide 16 Picture 2]: PCON register]: Details Power Control Register (PCON), Idle Mode operation (CPU clock gated, peripherals/timers/interrupts remain active, terminated via enabled interrupts or reset), Power Down Mode (on-chip oscillator halted, RAM contents preserved, micro-power consumption, terminated via hardware reset), and power-saving clock gating circuitry. [Labels & Elements: Note: If PD and IDL, both are enabled by keeping them 1, then; 8051 will consider PD Mode only.].

> **Figure [Slide 16 Picture 2]: PCON register**




<!-- Page 17 -->
### [PDF Page 17]

Idle Mode


> **Transcribed Media / Table Text**:
> | * Idle | Mode of | Power | Saving in | 8051 |
> | :--- | :--- | :--- | :--- | :--- |
> | • PCON is not bit addressable register, so to turn | ON Idle | Mode, we | - | - |
> | can use | ORL 87H, #01H {87H is | Address of | PCON register} | - |
> | • In | Idle | Mode, Clock to | CPU is | Cut |
> | Mode. | - | - | - | - |
> | • Because of | It, we almost saves | 80% of power supplied to | 8051 | - |
> | microcontroller. | - | - | - | - |
> | • In | Idle | Mode, Clock is available to other | On chip components like | - |
> | RAM, Timer, Ports, PC, SP, PSW etc. | - | - | - | - |
> | • By | Interrupt and | RESET, we can terminate | Idle | Mode. |
> | • After | RESET, we can not regain original state of | Controller. | - | - |



![Figure [Slide 17 Picture 1]: Idle Mode](images/fig_017_pic_1.png)
*Description*: 8051 Power Management Architecture Diagram [Figure [Slide 17 Picture 1]: Idle Mode]: Details Power Control Register (PCON), Idle Mode operation (CPU clock gated, peripherals/timers/interrupts remain active, terminated via enabled interrupts or reset), Power Down Mode (on-chip oscillator halted, RAM contents preserved, micro-power consumption, terminated via hardware reset), and power-saving clock gating circuitry. [Labels & Elements: * Idle Mode of Power Saving in 8051; • PCON is not bit addressable register, so to turn ON Idle Mode, we; can use ORL 87H, #01H {87H is Address of PCON register}; • In Idle Mode, Clock to CPU is Cut OFF, Hence CPU will go in Sleep; Mode.; • Because of It, we almost saves 80% of power supplied to 8051; microcontroller.; • In Idle Mode, Clock is available to other On chip components like].

> **Figure [Slide 17 Picture 1]: Idle Mode**




<!-- Page 18 -->
### [PDF Page 18]

Power Down Mode


> **Transcribed Media / Table Text**:
> | Power | Down | Mode of | Power | Saving in | 8051 |
> | :--- | :--- | :--- | :--- | :--- | :--- |
> | • PCON is not bit addressable register, so to turn | ON Power | Down | - | - | - |
> | Mode, we can use | ORL 87H, #02H (87H is | Address of | PCON | - | - |
> | register} | - | - | - | - | - |
> | • In | Power | Down | Mode, Clock to entire | 8051 is | Cut |
> | • In this mode we save maximum | Power. | - | - | - | - |
> | By | RESET only, we can terminate | Power | Down | Mode. | - |
> | • After | RESET, we can not regain original state of | Controller. | - | - | - |



![Figure [Slide 18 Picture 1]: Power Down Mode](images/fig_018_pic_1.png)
*Description*: 8051 Power Management Architecture Diagram [Figure [Slide 18 Picture 1]: Power Down Mode]: Details Power Control Register (PCON), Idle Mode operation (CPU clock gated, peripherals/timers/interrupts remain active, terminated via enabled interrupts or reset), Power Down Mode (on-chip oscillator halted, RAM contents preserved, micro-power consumption, terminated via hardware reset), and power-saving clock gating circuitry. [Labels & Elements: Power Down Mode of Power Saving in 8051; • PCON is not bit addressable register, so to turn ON Power Down; Mode, we can use ORL 87H, #02H (87H is Address of PCON; register}; • In Power Down Mode, Clock to entire 8051 is Cut OFF.; • In this mode we save maximum Power.; By RESET only, we can terminate Power Down Mode.; • After RESET, we can not regain original state of Controller.].

> **Figure [Slide 18 Picture 1]: Power Down Mode**




<!-- Page 19 -->
### [PDF Page 19]

Power Down Mode Circuit


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | Feature 1 | XLAT2 |
> | Feature 2 | Oscillator |
> | Feature 3 | PD |
> | Feature 4 | XLAT1 |
> | Feature 5 | System |
> | Feature 6 | Clock |
> | Feature 7 | Fosc/12 |
> | **To** | Timer, RAM, |
> | **IO** | Ports etc. |



![Figure [Slide 19 Picture 1]: Power Down Mode Circuit](images/fig_019_pic_1.png)
*Description*: Circuit Network Topology & Loop Analysis Diagram [Figure [Slide 19 Picture 1]: Power Down Mode Circuit]: Details circuit schematics, graph topologies, trees/twigs and co-trees/links selection, fundamental loop/tie-set orientations, branch impedance relationships, KVL loop equations, and branch current/voltage matrix formulations. [Labels & Elements: XLAT2; Oscillator; PD; XLAT1; System; Clock; Fosc/12; To Timer, RAM,].

> **Figure [Slide 19 Picture 1]: Power Down Mode Circuit**




<!-- Page 20 -->
### [PDF Page 20]

Idle Mode Circuit


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | Feature 1 | XLAT2 |
> | Feature 2 | Oscillator |
> | Feature 3 | PD |
> | Feature 4 | XLAT1 |
> | Feature 5 | IDL |
> | **→** | To CPU |
> | Feature 7 | System |
> | Feature 8 | Clock |
> | Feature 9 | Fosc/12 |
> | **To** | Timer, RAM, |
> | **IO** | Ports etc. |



![Figure [Slide 20 Picture 1]: Idle Mode Circuit](images/fig_020_pic_1.png)
*Description*: Circuit Network Topology & Loop Analysis Diagram [Figure [Slide 20 Picture 1]: Idle Mode Circuit]: Details circuit schematics, graph topologies, trees/twigs and co-trees/links selection, fundamental loop/tie-set orientations, branch impedance relationships, KVL loop equations, and branch current/voltage matrix formulations. [Labels & Elements: XLAT2; Oscillator; PD; XLAT1; IDL; → To CPU; System; Clock].

> **Figure [Slide 20 Picture 1]: Idle Mode Circuit**



