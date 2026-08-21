# Appendix E: AVR Primer for 8051 Programmers

> **Textbook**: The AVR Microcontroller and Embedded Systems using Assembly and C

> **PDF Page Range**: 766 - 766


---


<!-- Page 766 -->
### [PDF Page 766]

APPENDIX E
AVR PRIMER FOR
8051 PROGRAMMERS
AVR
8051
8-bit registers:
32 general-purpose registers
A, B, RO, R1, R2, R3,
(RO to R31)
R4, R5, R6, R7
16-bit (data pointer):
: X, Y, Z
DPTR
Program Counter:
PC (up to 22-bit)
PC (16-bit)
Input:
Output:
IN
Rn, PINX
(Use RO, RI,..., R31.)

```assembly
OUT PORIX, Rn
```

Loop:
DEC Rn

```assembly
BRNE TARGET
```

Stack pointer:
SP (16-bit)
As we PUSH data onto the
stack, it decrements the SP.
As we POP data from the stack,
it increments the SP.
Data movement:
From the code segment:
LPM Rn, z
(Use Z only.)
From RAM using indirect addressing:
LD
Rn, x
(Use X, Y, or Z.)
From RAM using direct addressing:
LDS Rn, k
To RAM using indirect addressing mode:
ST
X, Rn
(Use X, Y, or Z.) .
To RAM using direct addressing mode:
STS
k, X
(Use X, Y, or Z.)

```assembly
MOV A, Pn i (n = 0 - 3)
MOV Pn, A ; (n = 0 - 3)
```

DJNZ R3, TARGET
(Using RO-R7)
SP (8-bit)
As we PUSH data onto the
stack, it increments the SP.
As we POP data from the
stack, it decrements the SP.
MOVC A, @A+PC

```assembly
MOV A, GRO
```

(Use RO or RI only.)

```assembly
MOV A, RAM_addI
MOV GRO, A
MOV RAM_addr, A
```

APPENDIX E: AVR PRIMER FOR 8051 PROGRAMMERS
761


