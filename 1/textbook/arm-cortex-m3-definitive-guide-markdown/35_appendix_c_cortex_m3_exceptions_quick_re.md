# Appendix C Cortex-M3 Exceptions Quick Reference

> **Source PDF**: THE_DEFINITIVE_GUIDE_TO_THE_ARM_CORTEX-МЗ_Stellaris_MCU_9000Series_TEINSTRUMENTS_ARM_SECOND_EDITION.pdf  
> **PDF Page Range**: 434 - 435


---


<!-- Page 434 -->
### [PDF Page 434]

407
C
C.1  Exception Types and Enables
Appendix
Cortex-M3 Exceptions
Quick Reference
Table C.1  Quick Summary of Cortex™-M3 Exception Types and Their Priority Configurations
Exception Type
Name
Priority (Level Address)
Enable
1
Reset
–3
Always
2
NMI
–2
Always
3
Hard fault
–1
Always
4
MemManage fault
Programmable
(0xE000ED18)
NVIC SHCSR
(0xE000ED24) bit[16]
5
Bus fault
Programmable
(0xE000ED19)
NVIC SHCSR
(0xE000ED24) bit[17]
6
Usage fault
Programmable
(0xE000ED1A)
NVIC SHCSR
(0xE000ED24) bit[18]
7–10
—
—
—
11
SVC
Programmable
(0xE000ED1F)
Always
12
Debug monitor
Programmable
(0xE000ED20)
NVIC DEMCR
(0xE000EDFC) bit[16]
13
—
—
—
14
PendSV
Programmable
(0xE000ED22)
Always
15
SYSTICK
Programmable
(0xE000ED23)
SYSTICK CTRLSTAT
(0xE000E010) bit[1]
16–255
IRQ
Programmable
(0xE000E400)
NVIC SETEN
(0xE000E100)



<!-- Page 435 -->
### [PDF Page 435]

408
APPENDIX C
C.2  Stack Contents After Exception Stacking
Table C.2  Exception Stack Frame
Address
Data
Push Order
Old SP (N+32)→
(Previously pushed data)
—
(N+28)
PSR
2
(N+24)
PC
1
(N+20)
LR
8
(N+16)
R12
7
(N+12)
R3
6
(N+8)
R2
5
(N+4)
R1
4
New SP (N)→
R0
3
Note: If double word stack alignment feature is used and the SP was not double word aligned when the exception occurred,
the stack frame top might begin at ([OLD_SP-4] AND 0xFFFFFFF8), and the rest of the table moves one word down.


