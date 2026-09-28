# Lecture 5
## Complete Single-File AI-Research Document

> **Source File**: Lecture 5.pdf  
> **Total Pages/Slides**: 21 pages  
> **Format**: Single-File Bundle with Zero-Drift Page Markers, Syntax Highlighting, 300 DPI Cropped Figures, and Deep Domain Walkthrough Descriptions

---


<!-- Page 1 -->
### [PDF Page 1]

Lecture 5
Timer and Counter





<!-- Page 2 -->
### [PDF Page 2]

Timer and Counter of 8051


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | Feature 1 | Clock |
> | Feature 2 | To |
> | **A** | Clock |
> | **Timer** | wooking |


> **Transcribed Media / Table Text**:
> T.
> I To
> Extornal
> Clock
> countor Working



![Figure [Page 2 Media 1]: Timer and Counter of 8051](images/fig_002_media_1.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 2 Media 1]: Timer and Counter of 8051]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: Clock; To; A Clock; Timer wooking].

> **Figure [Page 2 Media 1]: Timer and Counter of 8051**


![Figure [Page 2 Media 2]: Timer and Counter of 8051](images/fig_002_media_2.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 2 Media 2]: Timer and Counter of 8051]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: T.; I To; Extornal; Clock; countor Working].

> **Figure [Page 2 Media 2]: Timer and Counter of 8051**




<!-- Page 3 -->
### [PDF Page 3]

Timer and Counter of 8051


> **Transcribed Media / Table Text**:
> | • 8051 has | Two | 16 bits | Timers | TO & T1, working as up counters. |
> | :--- | :--- | :--- | :--- | :--- |
> | TO and | T1 is further divided into | 8bits of registers | THO-TLO and | - |
> | TH1-TL1. | - | - | - | - |
> | TO | - | - | - | - |
> | T1 | - | - | - | - |
> | THO | - | - | - | - |
> | TLO | - | - | - | - |
> | TH1 | - | - | - | - |
> | TL1 | - | - | - | - |



![Figure [Page 3 Media 1]: Timer and Counter of 8051](images/fig_003_media_1.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 3 Media 1]: Timer and Counter of 8051]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: • 8051 has Two 16 bits Timers TO & T1, working as up counters.; TO and T1 is further divided into 8bits of registers THO-TLO and; TH1-TL1.; TO; T1; THO; TLO; TH1].

> **Figure [Page 3 Media 1]: Timer and Counter of 8051**




<!-- Page 4 -->
### [PDF Page 4]

How to Load Count?
- This Timers are Up counter.
- So, on given clock it will increment by 1.
- When it reaches to FFFFH, it will rolls back to 0000H and during
that it will generates Timer Overflow interrupt.
Count = FFFFH - Value + 1
- So, if you wants to count 9 then Count = FFFF - 9 + 1 = FFF7H
MOV THO, #FFH
MOV TLO, #F7H
Clock
COUNT
- This count loaded in TO or T1 will increment after every clock.


> **Transcribed Media / Table Text**:
> ```assembly
> - How to Load Count?
> - This Timers are Up counter.
> - So, on given clock it will increment by 1.
> - When it reaches to FFFFH, it will rolls back to 0000H and during
> that it will generates Timer Overflow interrupt.
> Count = FFFFH - Value + 1
> - So, if you wants to count 9 then Count = FFFF - 9 + 1 = FFF7H
> MOV THO, #FFH
> MOV TLO, #F7H
> COUNT
> Clock
> -ИЛЛ
> - This count loaded in TO or T1 will increment after every clock.
> ```



![Figure [Page 4 Media 1]: How to Load Count?](images/fig_004_media_1.jpeg)
*Description*: Engineering Schematic & Technical Figure [Figure [Page 4 Media 1]: How to Load Count?]: Illustrates physical machine construction, magnetic flux paths, electrical equivalent circuits, phasor relationships, or operational characteristic curves. [Labels & Elements: • How to Load Count?; • This Timers are Up counter.; • So, on given clock it will increment by 1.; • When it reaches to FFFFH, it will rolls back to 0000H and during; that it will generates Timer Overflow interrupt.; Count = FFFFH - Value + 1; • So, if you wants to count 9 then Count = FFFF - 9 + 1 = FFF7H; MOV THO, #FFH].

> **Figure [Page 4 Media 1]: How to Load Count?**




<!-- Page 5 -->
### [PDF Page 5]

Timer or Counter?
- If clock to the count is given by internal clock of 8051 then it
will be timer and if clock is given by external clock on TO and T1
then it will counter.
- That is to be configured by TMOD register of 8051.
- T/C bit will decide timer or counter configuration of 8051.


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | **Timer** | or Counter? |
> | **If** | clock to the count is given by internal clock of 8051 then it |
> | **will** | be timer and if clock is given by external clock on TO and T1 |
> | **then** | it will counter. |
> | **•** | That is to be configured by TMOD register of 8051. |
> | **•** | T/C bit will decide timer or counter configuration of 8051. |



![Figure [Page 5 Media 1]: Timer or Counter?](images/fig_005_media_1.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 5 Media 1]: Timer or Counter?]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: Timer or Counter?; If clock to the count is given by internal clock of 8051 then it; will be timer and if clock is given by external clock on TO and T1; then it will counter.; • That is to be configured by TMOD register of 8051.; • T/C bit will decide timer or counter configuration of 8051.].

> **Figure [Page 5 Media 1]: Timer or Counter?**




<!-- Page 6 -->
### [PDF Page 6]

- How Timer / Counter works?
Load Count in TO or T1
Count will
increase after
every clock
When Count rolls from
FFFFH to 0000H, it will
make TF0 or TF1 bit to 1.
{It is interrupt to 8051}
Make TF0 or TF1 bit
to 0 before it jumps
to ISR Address
ISR Address
RETI


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | **•** | How Timer / Counter works? |
> | **Load** | Count in TO or T1 |
> | **Count** | will |
> | **increase** | after |
> | **every** | clock |
> | **Make** | TF0 or TF1 bit |
> | **to** | 0 before it jumps |
> | **to** | ISR Address |
> | **When** | Count rolls from |
> | **FFFFH** | to 0000H, it will |
> | **make** | TF0 or TF1 bit to 1. |
> | **{It** | is interrupt to 8051} |
> | **ISR** | Address |
> | Feature 14 | RETI |



![Figure [Page 6 Media 1]: • How Timer / Counter works?](images/fig_006_media_1.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 6 Media 1]: • How Timer / Counter works?]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: • How Timer / Counter works?; Load Count in TO or T1; Count will; increase after; every clock; Make TF0 or TF1 bit; to 0 before it jumps; to ISR Address].

> **Figure [Page 6 Media 1]: • How Timer / Counter works?**




<!-- Page 7 -->
### [PDF Page 7]

TCON and TMOD Registers


> **Transcribed Media / Table Text**:
> | 8051 has | Two | 16 bits | Timers | TO & T1, working as up counters. |
> | :--- | :--- | :--- | :--- | :--- |
> | TO and | T1 is further divided into | 8bits of registers | THO-TLO and | - |
> | TH1-TL1. | - | - | - | - |
> | • If | To & T1 counts internal clock pulses, then it is timer. | - | - | - |
> | • If | To & T1 counts | External clock pulses, then it is | Counter. | - |
> | • Timer action is controlled by | TCON and | TMOD registers. | - | - |
> | • TCON register - (Bit | Address | TCON.7 to | TCON.0} | - |



![Figure [Page 7 Media 1]: TCON and TMOD Registers](images/fig_007_media_1.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 7 Media 1]: TCON and TMOD Registers]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: 8051 has Two 16 bits Timers TO & T1, working as up counters.; TO and T1 is further divided into 8bits of registers THO-TLO and; TH1-TL1.; • If To & T1 counts internal clock pulses, then it is timer.; • If To & T1 counts External clock pulses, then it is Counter.; • Timer action is controlled by TCON and TMOD registers.; • TCON register - (Bit Address TCON.7 to TCON.0}].

> **Figure [Page 7 Media 1]: TCON and TMOD Registers**




<!-- Page 8 -->
### [PDF Page 8]

TCON and TMOD Registers


> **Transcribed Media / Table Text**:
> | 8051 has | Two | 16 bits | Timers | TO & T1, working as up counters. |
> | :--- | :--- | :--- | :--- | :--- |
> | TO and | T1 is further divided into | 8bits of registers | THO-TLO and | - |
> | TH1-TL1. | - | - | - | - |
> | • If | To & T1 counts internal clock pulses, then it is timer. | - | - | - |
> | • If | To & T1 counts | External clock pulses, then it is | Counter. | - |
> | • Timer action is controlled by | TCON and | TMOD registers. | - | - |
> | • TCON register - (Bit | Address | TCON.7 to | TCON.0} | - |



![Figure [Page 8 Media 1]: TCON and TMOD Registers](images/fig_008_media_1.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 8 Media 1]: TCON and TMOD Registers]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: 8051 has Two 16 bits Timers TO & T1, working as up counters.; TO and T1 is further divided into 8bits of registers THO-TLO and; TH1-TL1.; • If To & T1 counts internal clock pulses, then it is timer.; • If To & T1 counts External clock pulses, then it is Counter.; • Timer action is controlled by TCON and TMOD registers.; • TCON register - (Bit Address TCON.7 to TCON.0}].

> **Figure [Page 8 Media 1]: TCON and TMOD Registers**




<!-- Page 9 -->
### [PDF Page 9]

- TCON register - {Bit Address TCON.7 to TCON.0}
TF1
TR1
- TF1 and TFO - Timer Overflow Flag
SET 1 = When timer 1 and timer 0 overflows, when timer roll
overs to all O's.
- Clear 0 = When processor executes ISR after overflow. {For
Timer 1 ISR address is 001BH and Timer O ISR address is
000BH}
TR1 and TRO - Timer Run Control Bit
SET 1 = Start Counting Timer.
Clear 0 = Halts Timer.
- IE1 and IEO - External Interrupt bit
SET 1 = when 8051 receives interrupt on INT1 and INTO.
Clear 0= when ISR executed. (For INT1 IS address is 0013H
and INTO ISR address is 0003H}


> **Transcribed Media / Table Text**:
> | • TCON register - {Bit | Address | TCON.7 to | TCON.0} |
> | :--- | :--- | :--- | :--- |
> | TF1 | - | - | - |
> | • | - | - | - |
> | TR1 | - | - | - |
> | TFO | - | - | - |
> | TRO | - | - | - |
> | IE1 | - | - | - |
> | IT1 | - | - | - |
> | IEO | - | - | - |
> | ITO | - | - | - |
> | TF1 and | TFO - Timer | Overflow | Flag |
> | SET 1 = When timer | 1 and timer | 0 overflows, when timer roll | - |
> | overs to all | O's. | - | - |
> | Clear | 0 = When processor executes | IS after overflow. {For | - |
> | Timer | 1 | ISR address is | 001BH and |
> | 000BH} | - | - | - |
> | TR1 and | TRO - Timer | Run | Control |
> | SET 1 = Start | Counting | Timer. | - |
> | Clear | 0 = Halts | Timer. | - |
> | IE1 and | IEO - External | Interrupt bit | - |
> | SET 1 = when | 8051 receives interrupt on | INT1 and | INTO. |
> | Clear | 0 = when | ISR executed. {For | INT1 |
> | and | INTO ISR address is | 0003H} | - |



![Figure [Page 9 Media 1]: • TCON register - {Bit Address TCON.7 to TCON.0}](images/fig_009_media_1.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 9 Media 1]: • TCON register - {Bit Address TCON.7 to TCON.0}]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: • TCON register - {Bit Address TCON.7 to TCON.0}; TF1; •; TR1; TFO; TRO; IE1; IT1].

> **Figure [Page 9 Media 1]: • TCON register - {Bit Address TCON.7 to TCON.0}**




<!-- Page 10 -->
### [PDF Page 10]

IT1 and ITO - External Interrupt Type bit
SET 1 = INT1 and INTO must be -ve edge trigger.
Clear 0 = INT1 and INTO must be low level trigger.
ELegia 1
-Ve edge
trigger
Tragico


> **Transcribed Media / Table Text**:
> | • IT1 and | ITO - External | Interrupt | Type bit |
> | :--- | :--- | :--- | :--- |
> | • SET 1 = INT1 and | INT0 must be -ve edge trigger. | - | - |
> | Clear | 0 = INT1 and | INTO must be low level trigger. | - |


> **Transcribed Media / Table Text**:
> hagia 1
> - Ve edge
> i Tunico
> trigger



![Figure [Page 10 Media 1]: IT1 and ITO - External Interrupt Type bit](images/fig_010_media_1.jpeg)
*Description*: 8051 Interrupt Structure & Vector Table Architecture Diagram [Figure [Page 10 Media 1]: IT1 and ITO - External Interrupt Type bit]: Details 5 core interrupt sources (Reset, External Interrupt 0 INT0, Timer 0 TF0, External Interrupt 1 INT1, Timer 1 TF1, Serial Communication TI/RI), Interrupt Enable (IE) register with EA global enable, Interrupt Priority (IP) register, fixed ROM interrupt vector table memory addresses (0000H, 0003H, 000BH, 0013H, 001BH, 0023H), and Interrupt Service Routine (ISR) execution sequencing. [Labels & Elements: • IT1 and ITO - External Interrupt Type bit; • SET 1 = INT1 and INT0 must be -ve edge trigger.; Clear 0 = INT1 and INTO must be low level trigger.].

> **Figure [Page 10 Media 1]: IT1 and ITO - External Interrupt Type bit**


![Figure [Page 10 Media 2]: IT1 and ITO - External Interrupt Type bit](images/fig_010_media_2.jpeg)
*Description*: 8051 Interrupt Structure & Vector Table Architecture Diagram [Figure [Page 10 Media 2]: IT1 and ITO - External Interrupt Type bit]: Details 5 core interrupt sources (Reset, External Interrupt 0 INT0, Timer 0 TF0, External Interrupt 1 INT1, Timer 1 TF1, Serial Communication TI/RI), Interrupt Enable (IE) register with EA global enable, Interrupt Priority (IP) register, fixed ROM interrupt vector table memory addresses (0000H, 0003H, 000BH, 0013H, 001BH, 0023H), and Interrupt Service Routine (ISR) execution sequencing. [Labels & Elements: hagia 1; - Ve edge; i Tunico; trigger].

> **Figure [Page 10 Media 2]: IT1 and ITO - External Interrupt Type bit**




<!-- Page 11 -->
### [PDF Page 11]

- TMOD register - Timer Mode Control register
GATE C/T
M1
MO
GATE
c/T M1 MO
- Timer 1
Timer 0
- 
C/T - Counter / Timer Type bit
SET 1 = Acts as Counter. {External Frequency on T1 & TO}
Clear 0 = Acts as Timer. {Internal Frequency Fosc/12}
GATE - Gate Enable Control bit
SET 1 = Timer Controlled by Hardware. {INTX Signal}
Clear 0 = Timer independent on INTX signal.
M1 & MO - Mode Control bits
M1 I
MO
Timer Mode
0
0
0
1
Timer Mode 0
Timer Mode 1
1
0
1
1
Timer Mode 2
Timer Mode 3


> **Transcribed Media / Table Text**:
> | V TMOD register - Timer | Mode | Control register |
> | :--- | :--- | :--- |
> | GATE | - | - |
> | C/T | - | - |
> | M1 | - | - |
> | MO | - | - |
> | GATE | - | - |
> | Timer | 1 | - |
> | C/T | - | - |
> | Timer | 0 | - |
> | M1 | - | - |
> | MO | - | - |
> | • C/T - Counter / Timer | Type bit | - |
> | • SET 1 = Acts as | Counter. {External | Frequency on |
> | • Clear | 0 = Acts as | Timer. {Internal |
> | • GATE - Gate | Enable | Control bit |
> | • SET 1 = Timer | Controlled by | Hardware. {INTX Signal) |
> | Clear | 0= Timer independent on | INTX signal. |
> | • M1 & MO - Mode | Control bits | - |
> | M1 | - | - |
> | MO | - | - |
> | Timer | Mode | - |
> | 0 | - | - |
> | 0 | - | - |
> | Timer | Mode | 0 |
> | 0 | - | - |
> | 1 | - | - |
> | Timer | Mode | 1 |
> | 1 | - | - |
> | 0 | - | - |
> | Timer | Mode | 2 |
> | 1 | - | - |
> | 1 | - | - |
> | Timer | Mode | 3 |



![Figure [Page 11 Media 1]: • TMOD register - Timer Mode Control register](images/fig_011_media_1.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 11 Media 1]: • TMOD register - Timer Mode Control register]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: V TMOD register - Timer Mode Control register; GATE; C/T; M1; MO; GATE; Timer 1; C/T].

> **Figure [Page 11 Media 1]: • TMOD register - Timer Mode Control register**




<!-- Page 12 -->
### [PDF Page 12]

Work with Time/ Counter


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | Feature 1 | Oscillator |
> | Feature 2 | Frequency |
> | Feature 3 | Fosc/12 |
> | **C/T** | = 0, Timer |
> | Feature 5 | Timer |
> | **C/T** | = 1, Counter |
> | **TO** | or T1 Pin |
> | Feature 8 | Count |
> | Feature 9 | Stages |
> | Feature 10 | Counter |
> | **TRO** | or TR1 |
> | Feature 12 | INTX |
> | Feature 13 | GATE |


> **Transcribed Media / Table Text**:
> | • TCON register - (Bit | Address | TCON.7 to | TCON.0} |
> | :--- | :--- | :--- | :--- |
> | TF1 | TR1 | TO TRO IE1 | IT1 |
> | / TMOD register - Timer | Mode | Control register | - |
> | GATE C/T M1 | MO GATE C/T M1 | MO | - |
> | Timer | 1 | - | - |
> | Timer o | - | - | - |
> | • 8051 has | Two | 16 bits | Timers |
> | • By | C/T bit we can select timer and counter. | - | - |
> | • In | Timer, clock will be given by internal clock. | - | - |
> | • In counter, clock will be given by | T0 or | T1 | Pin of |



![Figure [Page 12 Media 1]: Work with Time/ Counter](images/fig_012_media_1.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 12 Media 1]: Work with Time/ Counter]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: Oscillator; Frequency; Fosc/12; C/T = 0, Timer; Timer; C/T = 1, Counter; TO or T1 Pin; Count].

> **Figure [Page 12 Media 1]: Work with Time/ Counter**


![Figure [Page 12 Media 2]: Work with Time/ Counter](images/fig_012_media_2.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 12 Media 2]: Work with Time/ Counter]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: • TCON register - (Bit Address TCON.7 to TCON.0}; TF1 TR1 TO TRO IE1 IT1 IEO ITO; / TMOD register - Timer Mode Control register; GATE C/T M1 MO GATE C/T M1 MO; Timer 1; Timer o; • 8051 has Two 16 bits Timers TO & T1, working as up counters.; • By C/T bit we can select timer and counter.].

> **Figure [Page 12 Media 2]: Work with Time/ Counter**




<!-- Page 13 -->
### [PDF Page 13]

Work with Time/ Counter


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | Feature 1 | Oscillator |
> | Feature 2 | Frequency |
> | Feature 3 | Fosc/12 |
> | **C/T** | = 0, Timer |
> | Feature 5 | Timer |
> | **C/T** | = 1, Counter |
> | **TO** | or T1 Pin |
> | Feature 8 | Count |
> | Feature 9 | Stages |
> | Feature 10 | Counter |
> | **TRO** | or TR1 |
> | Feature 12 | INTX |
> | Feature 13 | GATE |


> **Transcribed Media / Table Text**:
> | • TCON register - (Bit | Address | TCON.7 to | TCON.0} |
> | :--- | :--- | :--- | :--- |
> | TF1 | TR1 | TO TRO IE1 | IT1 |
> | / TMOD register - Timer | Mode | Control register | - |
> | GATE C/T M1 | MO GATE C/T M1 | MO | - |
> | Timer | 1 | - | - |
> | Timer o | - | - | - |
> | • 8051 has | Two | 16 bits | Timers |
> | • By | C/T bit we can select timer and counter. | - | - |
> | • In | Timer, clock will be given by internal clock. | - | - |
> | • In counter, clock will be given by | T0 or | T1 | Pin of |


> **Transcribed Media / Table Text**:
> | • To have running counter, TR bit of | TCON register must be | 1. |
> | :--- | :--- | :--- |
> | • If | Timer/Counter is triggered by external signal then | GATE = 1 |
> | of | TOMD register, which means | Timer/ Counter operation will |
> | get trigger by | INTX (INTO or | INT1). |
> | • If | Timer | 0 is configured then with |
> | hardware interrupt to trigger | Timer/Counter. | - |
> | • If | Timer | 1 is configured then with |
> | hardware interrupt to trigger | Timer/Counter. | - |
> | • If | GATE bit is logic | 1, then |
> | only. | - | - |



![Figure [Page 13 Media 1]: Work with Time/ Counter](images/fig_013_media_1.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 13 Media 1]: Work with Time/ Counter]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: Oscillator; Frequency; Fosc/12; C/T = 0, Timer; Timer; C/T = 1, Counter; TO or T1 Pin; Count].

> **Figure [Page 13 Media 1]: Work with Time/ Counter**


![Figure [Page 13 Media 2]: Work with Time/ Counter](images/fig_013_media_2.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 13 Media 2]: Work with Time/ Counter]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: • TCON register - (Bit Address TCON.7 to TCON.0}; TF1 TR1 TO TRO IE1 IT1 IEO ITO; / TMOD register - Timer Mode Control register; GATE C/T M1 MO GATE C/T M1 MO; Timer 1; Timer o; • 8051 has Two 16 bits Timers TO & T1, working as up counters.; • By C/T bit we can select timer and counter.].

> **Figure [Page 13 Media 2]: Work with Time/ Counter**


![Figure [Page 13 Media 3]: Work with Time/ Counter](images/fig_013_media_3.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 13 Media 3]: Work with Time/ Counter]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: • To have running counter, TR bit of TCON register must be 1.; • If Timer/Counter is triggered by external signal then GATE = 1; of TOMD register, which means Timer/ Counter operation will; get trigger by INTX (INTO or INT1).; • If Timer 0 is configured then with GATE bit we use INTO; hardware interrupt to trigger Timer/Counter.; • If Timer 1 is configured then with GATE bit we use INT1; hardware interrupt to trigger Timer/Counter.].

> **Figure [Page 13 Media 3]: Work with Time/ Counter**




<!-- Page 14 -->
### [PDF Page 14]

P1.0 C
1
P1.1 C
2
P1.2C
3
P1.3 C
4
P1.4 [
5
P1.5 C
6
P1.6 C
7
P1.7 C
8
RST I
9
(RXD) P3.0 [
10
(TXD) P3.1 [
(INTO) P3.2 [
(INT1) P3.3
(TO) P3.4
(T1) P3.5
(WR) P3.6
(RD) P3.7 [
XTAL2 [
XTAL1 C
GND C
öũởũ0ů©0®ỞĞĞ8ůQĞ&&8ů
11
12
13
14
15
16
17
18
19
20
8051
40
39
38
37
36
35
34
33
32
31
30
29
28
27
26
25
24
23
22
21


> **Transcribed Media / Table Text**:
> P1.0 C
> P1.1 C
> P1.2 C
> P1.3 C
> P1.4 C
> P1.5 C
> P1.6 C
> P1.7 C
> RST
> (RXD) P3.0
> (TXD) P3.1
> (INTO) P3.2
> (INT1) P3.3
> (TO) P3.4
> (T1) P3.5
> (WR) P3.6
> (RD) P3.7
> XTAL2
> XTAL1
> GND
> 1
> 2
> 3
> 4
> 5
> 6
> 7
> 8
> 10
> 11
> 12
> 13
> 14
> 15
> 16
> 17
> 18
> 19
> 20
> 8051
> 40
> 39
> 38
> 37
> 36
> 35
> 34
> 33
> 32
> 31
> 30
> 29
> 28
> 27
> 26
> 25
> 24
> 23
> 22
> 1
> Vcc
> PO.0 (ADO)
> PO.1 (AD1)
> PO.2 (AD2)
> P0.3 (AD3)
> PO.4 (AD4)
> P0.5 (AD5)
> PO.6 (AD6)
> PO.7 (AD7)
> EAVPP
> ALE/PROG
> PSEN
> P2.7 (A15)
> P2.6 (A14)
> P2.5 (A13)
> P2.4 (A12)
> P2.3 (A11)
> P2.2 (A10)
> P2.
> .1 (A9)
> P2.0 (A8)



![Figure [Page 14 Media 1]: P1.0 C](images/fig_014_media_1.jpeg)
*Description*: Engineering Schematic & Technical Figure [Figure [Page 14 Media 1]: P1.0 C]: Illustrates physical machine construction, magnetic flux paths, electrical equivalent circuits, phasor relationships, or operational characteristic curves. [Labels & Elements: P1.0 C; P1.1 C; P1.2 C; P1.3 C; P1.4 C; P1.5 C; P1.6 C; P1.7 C].

> **Figure [Page 14 Media 1]: P1.0 C**




<!-- Page 15 -->
### [PDF Page 15]

Modes of Timer and Counter


> **Transcribed Media / Table Text**:
> | • Timer | Mode | 0 (13 bits | Timer/ Counter} |
> | :--- | :--- | :--- | :--- |
> | Clock | - | - | - |
> | Interrupt | - | - | - |
> | TLX [5] | - | - | - |
> | THX [8] | - | - | - |
> | TFX | - | - | - |
> | • TLX has | 5 bits for count and | THX has | 8 bits for count. So in |
> | total, 13 bits of count is available in this mode | 0. | - | - |
> | • After | 32 counts | TLX rolls over and it will increment | THX. |
> | • So | TLX will divides the frequency by | 32. | - |
> | • By this mode, total maximum count can be | 213 = 8K. | - | - |
> | • So maximum delay = 8192 (12/Fosc) | - | - | - |



![Figure [Page 15 Media 1]: Modes of Timer and Counter](images/fig_015_media_1.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 15 Media 1]: Modes of Timer and Counter]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: • Timer Mode 0 (13 bits Timer/ Counter}; Clock; Interrupt; TLX [5]; THX [8]; TFX; • TLX has 5 bits for count and THX has 8 bits for count. So in; total, 13 bits of count is available in this mode 0.].

> **Figure [Page 15 Media 1]: Modes of Timer and Counter**




<!-- Page 16 -->
### [PDF Page 16]

Modes of Timer and Counter


> **Transcribed Media / Table Text**:
> | • Timer | Mode | 1 (16 bits | Timer/ Counter} |
> | :--- | :--- | :--- | :--- |
> | Clock | - | - | - |
> | Interrupt | - | - | - |
> | TL [8] | - | - | - |
> | THX [8] | - | - | - |
> | TFX | - | - | - |
> | • TLX and | THX used completely here with | Mode | 1. |
> | • On each clock | 16 bits will increment by | 1. | - |
> | • TFX will set to | 1, when all | 16 bits rolls from | FFFFH to |
> | • By this mode, total maximum count can be | 216= 64K. | - | - |
> | • So maximum delay = 65536 (12/Fosc) | - | - | - |



![Figure [Page 16 Media 1]: Modes of Timer and Counter](images/fig_016_media_1.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 16 Media 1]: Modes of Timer and Counter]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: • Timer Mode 1 (16 bits Timer/ Counter}; Clock; Interrupt; TL [8]; THX [8]; TFX; • TLX and THX used completely here with Mode 1.; • On each clock 16 bits will increment by 1.].

> **Figure [Page 16 Media 1]: Modes of Timer and Counter**




<!-- Page 17 -->
### [PDF Page 17]

Modes of Timer and Counter


> **Transcribed Media / Table Text**:
> | / Timer | Mode | 2 {8 bits | Auto reload | TL from | TH} |
> | :--- | :--- | :--- | :--- | :--- | :--- |
> | Clock | - | - | - | - | - |
> | Interrupt | - | - | - | - | - |
> | TLX [8] | - | - | - | - | - |
> | THX [8] | - | - | - | - | - |
> | TFX | - | - | - | - | - |
> | • TLX will increment on every count. | - | - | - | - | - |
> | When | TLX rolls over from | FF to | 00H, | - | - |
> | Two events are happening. | - | - | - | - | - |
> | 1. TFX will give interrupt | - | - | - | - | - |
> | 2. THX will reload | TLX | - | - | - | - |
> | Maximum count = 28=256 | - | - | - | - | - |
> | Maximum delay = 256 (12/Fosc) | - | - | - | - | - |



![Figure [Page 17 Media 1]: Modes of Timer and Counter](images/fig_017_media_1.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 17 Media 1]: Modes of Timer and Counter]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: / Timer Mode 2 {8 bits Auto reload TL from TH}; Clock; Interrupt; TLX [8]; THX [8]; TFX; • TLX will increment on every count.; When TLX rolls over from FF to 00H,].

> **Figure [Page 17 Media 1]: Modes of Timer and Counter**




<!-- Page 18 -->
### [PDF Page 18]

Modes of Timer and Counter


> **Transcribed Media / Table Text**:
> | / Timer | Mode | 2 {8 bits | Auto reload | TL from | TH} |
> | :--- | :--- | :--- | :--- | :--- | :--- |
> | Clock | - | - | - | - | - |
> | Interrupt | - | - | - | - | - |
> | TLX [8] | - | - | - | - | - |
> | THX [8] | - | - | - | - | - |
> | TFX | - | - | - | - | - |
> | • TLX will increment on every count. | - | - | - | - | - |
> | When | TLX rolls over from | FF to | 00H, | - | - |
> | Two events are happening. | - | - | - | - | - |
> | 1. TFX will give interrupt | - | - | - | - | - |
> | 2. THX will reload | TLX | - | - | - | - |
> | Maximum count = 28=256 | - | - | - | - | - |
> | Maximum delay = 256 (12/Fosc) | - | - | - | - | - |



![Figure [Page 18 Media 1]: Modes of Timer and Counter](images/fig_018_media_1.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 18 Media 1]: Modes of Timer and Counter]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: / Timer Mode 2 {8 bits Auto reload TL from TH}; Clock; Interrupt; TLX [8]; THX [8]; TFX; • TLX will increment on every count.; When TLX rolls over from FF to 00H,].

> **Figure [Page 18 Media 1]: Modes of Timer and Counter**




<!-- Page 19 -->
### [PDF Page 19]

- Timer Mode 3 {Two 8 bits timer by Timer 0}
Clock
Interrupt
TLO [8]
TFO
Clock
Interrupt
THO [8]
TF1
- TLO and THO used with two separate timers.
- TLO will give interrupt to TFO flag bit of Timer 0.
- TO can be used as Timer and Counter.
THO will give interrupt to TF1 flag bit of Timer 1.
- THO can only be used as Timer.


> **Transcribed Media / Table Text**:
> | / Timer | Mode | 3 {Two | 8 bits timer by | Timer | 0} |
> | :--- | :--- | :--- | :--- | :--- | :--- |
> | Clock | - | - | - | - | - |
> | Interrupt | - | - | - | - | - |
> | TLO [8] | - | - | - | - | - |
> | TFO | - | - | - | - | - |
> | Clock | - | - | - | - | - |
> | Interrupt | - | - | - | - | - |
> | THO [8] | - | - | - | - | - |
> | TF1 | - | - | - | - | - |
> | • TLO and | THO used with two separate timers. | - | - | - | - |
> | • TLO will give interrupt to | TFO flag bit of | Timer | 0. | - | - |
> | • TLO can be used as | Timer and | Counter. | - | - | - |
> | • THO will give interrupt to | TF1 flag bit of | Timer | 1. | - | - |
> | • THO can only be used as | Timer. | - | - | - | - |
> | E | - | - | - | - | - |



![Figure [Page 19 Media 1]: • Timer Mode 3 {Two 8 bits timer by Timer 0}](images/fig_019_media_1.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 19 Media 1]: • Timer Mode 3 {Two 8 bits timer by Timer 0}]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: / Timer Mode 3 {Two 8 bits timer by Timer 0}; Clock; Interrupt; TLO [8]; TFO; Clock; Interrupt; THO [8]].

> **Figure [Page 19 Media 1]: • Timer Mode 3 {Two 8 bits timer by Timer 0}**




<!-- Page 20 -->
### [PDF Page 20]

Time Programming in 8051


> **Transcribed Media / Table Text**:
> - Write a program to Generate delay of 20 uSec and
> send logic 1 on P2.0. Assume Fosc = 12MHz


> **Transcribed Media / Table Text**:
> | V TCON register - {Bit | Address | TCON.7 to | TCON.0} |
> | :--- | :--- | :--- | :--- |
> | TF1 | - | - | - |
> | TR1 | - | - | - |
> | TFO | - | - | - |
> | TRO | - | - | - |
> | IE1 | - | - | - |
> | IT1 | - | - | - |
> | IEO | - | - | - |
> | ITO | - | - | - |
> | V TMOD register - Timer | Mode | Control register | - |
> | GATE | - | - | - |
> | C/T | - | - | - |
> | M1 | - | - | - |
> | MO | - | - | - |
> | GATE | - | - | - |
> | Timer | 1 | - | - |
> | C/T | - | - | - |
> | Timer | 0 | - | - |
> | M1 | - | - | - |
> | MO | - | - | - |


> **Transcribed Media / Table Text**:
> | • For | Timer | 0 with | Mode | 1 as | 16 bits timer, TMOD = 0000 0001B |
> | :--- | :--- | :--- | :--- | :--- | :--- |
> | • To start | Timer | 0 with mode | 1, TCON = 0001 | 0000B | - |
> | To stop time | 0 with mode | 1, TCON = 0000 | 0000B | - | - |
> | To calculate | Count, one count time = 12/Fosc = 1uSec. | - | - | - | - |
> | So value of | Count = 20 = 14H | - | - | - | - |
> | As timer is up counter actual value should be loaded will be | - | - | - | - | - |
> | Count = FFFFH - 14H + 1 = FFECH | - | - | - | - | - |
> | • TLO = ECH and | THO = FFH, to be loaded for delay of | 20uSec. | - | - | - |


> **Transcribed Media / Table Text**:
> ```assembly
> Wait:
> Here:
> MOV TMOD, #00000001B
> MOV TLO, #ECH
> MOV THO, #FFH
> MOV TCON, #00010000B
> JNB TCON.5, Wait
> SETB P2.0
> MOV TCON, #00000000B
> SJMP Here
> ;Timer 0 Mode 1
> ;Count 20 = 14H
> ;Start Timer
> ;wait for 20uSec
> ¡logic '1' on P2.0
> ;Stop Timer
> ;End of Program
> ```



![Figure [Page 20 Media 1]: Time Programming in 8051](images/fig_020_media_1.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 20 Media 1]: Time Programming in 8051]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: • Write a program to Generate delay of 20 uSec and; send logic 1 on P2.0. Assume Fosc = 12MHz].

> **Figure [Page 20 Media 1]: Time Programming in 8051**


![Figure [Page 20 Media 2]: Time Programming in 8051](images/fig_020_media_2.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 20 Media 2]: Time Programming in 8051]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: V TCON register - {Bit Address TCON.7 to TCON.0}; TF1; TR1; TFO; TRO; IE1; IT1; IEO].

> **Figure [Page 20 Media 2]: Time Programming in 8051**


![Figure [Page 20 Media 3]: Time Programming in 8051](images/fig_020_media_3.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 20 Media 3]: Time Programming in 8051]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: • For Timer 0 with Mode 1 as 16 bits timer, TMOD = 0000 0001B; • To start Timer 0 with mode 1, TCON = 0001 0000B; To stop time 0 with mode 1, TCON = 0000 0000B; To calculate Count, one count time = 12/Fosc = 1uSec.; So value of Count = 20 = 14H; As timer is up counter actual value should be loaded will be; Count = FFFFH - 14H + 1 = FFECH; • TLO = ECH and THO = FFH, to be loaded for delay of 20uSec.].

> **Figure [Page 20 Media 3]: Time Programming in 8051**


![Figure [Page 20 Media 4]: Time Programming in 8051](images/fig_020_media_4.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 20 Media 4]: Time Programming in 8051]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: Wait:; Here:; MOV TMOD, #00000001B; MOV TLO, #ECH; MOV THO, #FFH; MOV TCON, #00010000B; JNB TCON.5, Wait; SETB P2.0].

> **Figure [Page 20 Media 4]: Time Programming in 8051**




<!-- Page 21 -->
### [PDF Page 21]

Time Programming 2


> **Transcribed Media / Table Text**:
> - Write a program to Generate square wave of 1KHz
> on TxD pin. Assume Fosc = 12MHz


> **Transcribed Media / Table Text**:
> 1 msce


> **Transcribed Media / Table Text**:
> | V TCON register - (Bit | Address | TCON.7 to | TCON.0} |
> | :--- | :--- | :--- | :--- |
> | TF1 | - | - | - |
> | TR1 | - | - | - |
> | TFO | - | - | - |
> | TRO | - | - | - |
> | IE1 | - | - | - |
> | IT1 | - | - | - |
> | IEO | - | - | - |
> | ITO | - | - | - |
> | V TMOD register - Timer | Mode | Control register | - |
> | GATE | - | - | - |
> | c/T | - | - | - |
> | M1 | - | - | - |
> | MO | - | - | - |
> | GATE | - | - | - |
> | Timer | 1 | - | - |
> | c/T | - | - | - |
> | Timer | O | - | - |
> | M1 | - | - | - |
> | MO | - | - | - |


> **Transcribed Media / Table Text**:
> | V TCON register - {Bit | Address | TCON.7 to | TCON.0} |
> | :--- | :--- | :--- | :--- |
> | TF1 | - | - | - |
> | TR1 | - | - | - |
> | TFO | - | - | - |
> | TRO | - | - | - |
> | IE1 | - | - | - |
> | IT1 | - | - | - |
> | IEO | - | - | - |
> | ITO | - | - | - |
> | V TMOD register - Timer | Mode | Control register | - |
> | GATE | - | - | - |
> | C/T | - | - | - |
> | M1 | - | - | - |
> | MO | - | - | - |
> | GATE | - | - | - |
> | Timer | 1 | - | - |
> | C/T | - | - | - |
> | Timer | 0 | - | - |
> | M1 | - | - | - |
> | MO | - | - | - |


> **Transcribed Media / Table Text**:
> | • For | Timer | 0 with | Mode | 1 as | 16 bits timer, TMOD = 0000 0001B |
> | :--- | :--- | :--- | :--- | :--- | :--- |
> | • To start | Timer | 0 with mode | 1, TCON = 0001 | 0000B | - |
> | To stop time | 0 with mode | 1, TCON = 0000 | 0000B | - | - |
> | To calculate | Count, one count time = 12/Fosc = 1uSec. | - | - | - | - |
> | So value of | Count = 20 = 14H | - | - | - | - |
> | As timer is up counter actual value should be loaded will be | - | - | - | - | - |
> | Count = FFFFH - 14H + 1 = FFECH | - | - | - | - | - |
> | • TLO = ECH and | THO = FFH, to be loaded for delay of | 20uSec. | - | - | - |


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | **•** | Square wave of 1KHz has time = 1msec. |
> | **So** | for 0.5msec, It should be high and for 0.5msec, it should be |
> | Feature 3 | low. |
> | Feature 4 | - |
> | **To** | calculate Count, one count time = 12/Fosc = 1uSec. |
> | **So** | value of Count = 0.5msec/1uSec = 500 = 1F4H |
> | **As** | timer is up counter actual value should be loaded will be |
> | **Count** | = FFFFH - 1F4H + 1 = FEOCH |
> | **•** | TLO = OCH and THO = FEH |


> **Transcribed Media / Table Text**:
> ```assembly
> CLR P3.1
> Repeat:
> MOV TMOD, #00000001B
> MOV TLO, #OCH
> MOV THO, #FEH
> MOV TCON, #00010000B
> Wait:
> JNB TCON.5, Wait
> CPL P3.1
> MOV TCON, #00000000B
> SJMP Repeat
> ;Clear TxD line
> ;Timer 0 Mode 1
> ;Count 500 = 1F4H
> ;Start Timer
> ;wait for 0.5mSec
> ;Square wave
> ;Stop Timer
> ;Repeat of Program
> ```



![Figure [Page 21 Media 1]: Time Programming 2](images/fig_021_media_1.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 21 Media 1]: Time Programming 2]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: • Write a program to Generate square wave of 1KHz; on TxD pin. Assume Fosc = 12MHz].

> **Figure [Page 21 Media 1]: Time Programming 2**


![Figure [Page 21 Media 2]: Time Programming 2](images/fig_021_media_2.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 21 Media 2]: Time Programming 2]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: 1 msce].

> **Figure [Page 21 Media 2]: Time Programming 2**


![Figure [Page 21 Media 3]: Time Programming 2](images/fig_021_media_3.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 21 Media 3]: Time Programming 2]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: V TCON register - (Bit Address TCON.7 to TCON.0}; TF1; TR1; TFO; TRO; IE1; IT1; IEO].

> **Figure [Page 21 Media 3]: Time Programming 2**


![Figure [Page 21 Media 4]: Time Programming 2](images/fig_021_media_4.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 21 Media 4]: Time Programming 2]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: V TCON register - {Bit Address TCON.7 to TCON.0}; TF1; TR1; TFO; TRO; IE1; IT1; IEO].

> **Figure [Page 21 Media 4]: Time Programming 2**


![Figure [Page 21 Media 5]: Time Programming 2](images/fig_021_media_5.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 21 Media 5]: Time Programming 2]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: • For Timer 0 with Mode 1 as 16 bits timer, TMOD = 0000 0001B; • To start Timer 0 with mode 1, TCON = 0001 0000B; To stop time 0 with mode 1, TCON = 0000 0000B; To calculate Count, one count time = 12/Fosc = 1uSec.; So value of Count = 20 = 14H; As timer is up counter actual value should be loaded will be; Count = FFFFH - 14H + 1 = FFECH; • TLO = ECH and THO = FFH, to be loaded for delay of 20uSec.].

> **Figure [Page 21 Media 5]: Time Programming 2**


![Figure [Page 21 Media 6]: Time Programming 2](images/fig_021_media_6.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 21 Media 6]: Time Programming 2]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: • Square wave of 1KHz has time = 1msec.; So for 0.5msec, It should be high and for 0.5msec, it should be; low.; -; To calculate Count, one count time = 12/Fosc = 1uSec.; So value of Count = 0.5msec/1uSec = 500 = 1F4H; As timer is up counter actual value should be loaded will be; Count = FFFFH - 1F4H + 1 = FEOCH].

> **Figure [Page 21 Media 6]: Time Programming 2**


![Figure [Page 21 Media 7]: Time Programming 2](images/fig_021_media_7.jpeg)
*Description*: 8051 Timer/Counter Architecture & Special Function Register Diagram [Figure [Page 21 Media 7]: Time Programming 2]: Details 16-bit Timer 0/Timer 1 registers (TH0/TL0, TH1/TL1), TMOD mode configuration (GATE control, C/T counter/timer selection, M1/M0 operating modes: 13-bit Mode 0, 16-bit Mode 1, 8-bit auto-reload Mode 2, and split Mode 3), TCON control flags (TR0/TR1 run bits, TF0/TF1 overflow flags), and machine cycle delay calculation formulas. [Labels & Elements: CLR P3.1; Repeat:; MOV TMOD, #00000001B; MOV TLO, #OCH; MOV THO, #FEH; MOV TCON, #00010000B; Wait:; JNB TCON.5, Wait].

> **Figure [Page 21 Media 7]: Time Programming 2**



