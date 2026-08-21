# Appendix A: AVR Instructions Explained

> **Textbook**: The AVR Microcontroller and Embedded Systems using Assembly and C

> **PDF Page Range**: 702 - 739


---


<!-- Page 702 -->
### [PDF Page 702]

APPENDIX A
AVR INSTRUCTIONS
EXPLAINED
OVERVIEW
In this appendix, we describe each intruction of th
Tmega32. In many cases, a simple code example is given 1
At the end there is a table that shows all the registers and
their bits.
Instructions are Copyright of Atmel Semiconductor, Inc. 2009, Used by Permission
695



<!-- Page 703 -->
### [PDF Page 703]

SECTION A.1: INSTRUCTION SUMMARY
DATA TRANSFER INSTRUCTIONS
Mnemonics
Operands Description
MOV
Rd, Rr
Move Between Registers
Rd, Rr
Copy Register Word
LDI
Rd, K
Load Immediate
Rd, X
Load Indirect
Rd, X+
Load Indirect and Post-Inc.
Rd, -X
Load Indirect and Pre-Dec.
Rd, Y
Load Indirect
Rd, Y+
Load Indirect and Post-Inc.
Rd, - Y
Load Indirect and Pre-Dec.
Rd, Y+q
Load Indirect with Displacement
Rd, Z
Load Indirect
Rd, Z+
Load Indirect and Post-Inc.
Rd, -Z
Load Indirect and Pre-Dec.
Rd, Z + q
Load Indirect with Displacement
Rd, K
Load Direct from SRAM
X, Rr
Store Indirect
X+, Rr
Store Indirect and Post-Inc.
-X, Rr
Store Indirect and Pre-Dec.
Y, Rr
Store Indirect
Y+, Rr
Store Indirect and Post-Inc.
-Y, Rr
Store Indirect and Pre-Dec.
Y + g, Rr
Store Indirect with Displacement
Z, Rr
Store Indirect
Z+, Rr
Store Indirect and Post-Inc.
-Z, Rr
Store Indirect and Pre-Dec.
Z + 9, Rr
Store Indirect with Displacement
k, Rr
Store Direct to SRAM
Load Program Memory
Rd. Z
Rd, Z+
Load Program Memory
Load Program Memory and Post-Inc.
Store Program Memory
Rd, P
In Port
OUT
PUSH
POP
Out Port
Push Register on Stack
Rd
Pop Register from Stack
Operation
Flags
Rd - Rr
None
IRd + 1:Rd - Rr + 1:Rr| None
Rd + K
None
Rd - (X)
None
Rd - (X), X= X+1
None
X=X- 1, Rd = (x)
None
Rd = (Y)
None
Rd = (Y), Y+ Y + 1
None
Y=Y - Y-1, Rd - (Y)
None
Rd - (Y + q)
None
Rd - (Z)
None
Rd - (Z), Z+ Z+1
None
Z+ Z-1, Rd = (Z)
None
Rd + (Z+ g)
None
Rd + (k)
None
(X) - Rr
None
(X) - Rr, X= X +1
None
X= X- 1, (X) - Rr
None
(Y) - Rr
None
(Y) - Rr, Y + Y + 1
None
Y+ Y - 1, (Y) < Rr
None
(Y + 9) - Rr
None
(2) - Rr
None
(2) - Rr, Z+ Z+ 1
None
Z+ Z-1, (Z) - Rr
None
(Z+ 9) - Rr
None
(k) - Rr
None
RO +- (2)
None
Rd - (Z)
None
Rd - (Z), Z - Z+1
None
(Z) + R1:RO
None
Rd - P
None
P-Rr
None
Stack + Rr
None
Rd - Stack
None
696



<!-- Page 704 -->
### [PDF Page 704]

BRANCH INSTRUCTIONS
Mnem. Oper. Description
Operation
Flags

```assembly
RJMP k
```

Relative Jump
PC + PC + k + 1
IMP
Indirect Jump to (Z)
PC < Z
JMP
Direct Jump
PC < k

```assembly
RCALL k
```

Relative Subroutine Call
PC + PC + k + 1
ICALL
Indirect Call to (Z)
IPC +Z

```assembly
CALL K
```

Direct Subroutine Call
PC + k
RET
Subroutine Return
PC + Stack
None
None
None
RETI
Interrupt Return
PC + Stack
CPSE | Rd, Rr| Compare, Skip if Equal
if (Rd = Rr) PC - PC + 2 or 3
None
CP
Rd,Rr Compare
Rd - Rr
Z.N,V,C.H
CPC
Rd,Rr Compare with Carry
Rd - Rr - C
Z,N,V,C,H
CPI
Rd,K
Compare Register with Immediate
Rd - K
Z,N,V,C,H
SBRC
Rr, b
Skip if Bit in Register Cleared
if (Rr(b)=0) PC - PC + 2 or 3
None
SBRS
Rr, b
Skip if Bit in Register is Set
if (Rr(b)=1) PC + PC + 2 or 3
None
SBIC
P. b
Skip if Bit in I/O Register Cleared
if (P(b)=0) PC .-. PC + 2 or 3
None
SBIS
P, b
Skip if Bit in I/O Register is Set
if (P(b)=1) PC - PC + 2 or 3
None
BRBS
s, K
Branch if Status Flag Set
if (SREG(s)=1) then PC+--PC+k+1
None
BRBC
S. K
Branch if Status Flag Cleared
if (SREG(s)=0) then PC-PC+k+1| None
BREQ
k
Branch if Equal
if (Z = 1) then PC + PC + k + 1
None
BRNE
Branch if Not Equal
if (Z = 0) then PC + PC + k + 1
None
BRCS
Branch if Carry Set
if (C = 1) then PC - PC + k + 1
None

```assembly
BRCC k
```

Branch if Carry Cleared
if (C = 0) then PC - PC + k+ 1
None
BRSH
K
Branch if Same or Higher
if (C = 0) then PC - PC + k + 1
None
BRLO
Branch if Lower
if (C = 1) then PC +- PC + k + 1
None
BRMI
K
Branch if Minus
if (N = 1) then PC +- PC + k + 1
None
BRPL | k
Branch if Plus
if (N = 0) then PC +- PC + k + 1
None
BRGE
Branch if Greater or Equal,Signed
| if (N and V= 0) then PC+-PC + K +1| None
BRLT
k
Branch if Less Than Zero, Signed
if (Nand V= 1) then PC-PC+k+1
None
BRHS
Branch if Half Carry Flag Set
if (H = 1) then PC + PC + K+1
None
BRHC
k
Branch if Half Carry Flag Cleared
if (H = 0) then PC + PC + k+ 1
None
BRTS
Branch if T Flag Set
if (T = 1) then PC - PC + k+1
None
BRTC
K
Branch if T Flag Cleared
if (T = 0) then PC < PC + k + 1
None
BRVS
Branch if Overflow Flag is Set
if (V = 1) then PC + PC + k + 1
None
BRVC
BRIE
k
k
Branch if Overflow Flag is Cleared if (V = 0) then PC - PC + K + 1
None
Branch if Interrupt Enabled
if (I = 1) then PC + PC + k + 1
None
BRID
Branch if Interrupt Disabled
if (I = 0) then PC + PC + k + 1
None
APPENDIX A: AVR INSTRUCTIONS EXPLAINED
697



<!-- Page 705 -->
### [PDF Page 705]

BIT AND BIT-TEST INSTRUCTIONS
Mnem. Operan. Description
SBI
CBI
P, b
Set Bit in I/0 Register
P, b
Clear Bit in //O Register
LSL
Rd
Logical Shift Left
LSR
Rd
Logical Shift Right
ROL
Rd
Rotate Left Through Carry
ROR
Rd
ASR
SWAP
BSET
BCLR
BST
Rd
Rotate Right Through Carry
Arithmetic Shift Right
Rd
Rr, b
Rd, b
CLH
Swap Nibbles
Flag Set
Flag Clear
Bit Store from Register to T
Bit load from T to Register
Set Carry
Clear Carry
Set Negative Flag
Clear Negative Flag
Set Zero Flag
Clear Zero Flag
Global Interrupt Enable
Global Interrupt Disable
Set Signed Test Flag
Clear Signed Test Flag
Set Two's Complement Overflow
Clear Two's Complement Overflow
Set T in SREG
Clear T in SREG
Set Half Carry Flag in SREG
Clear Half Carry Flag in SREG
698
Operation
110(P. b) = 1
110(P, b) = 0
Rd(n + 1) - Rd(n),
Rd(0) - 0
Rd(n) Rd(n+1),
Rd(7) -0
Rd(0)-C,
Rd(n+1)-Rd(n),
C-Rd(7)
Rd(7) - C,
Rd(n) - Rd(n + 1),
C - Rd(0)
Rd(n) - Rd(n + 1),
n = 0.6
Rd(3..0) - Rd(7..4),
Rd(7..4) - Rd (3..0)
SREG(s) + 1
SREG(s) - 0
T + Rr(b)
Rd(b) + T
C + 1
C + 0
N+ 1
N+ O
Z+1
2- 0
11-1
1<0
S- 1
S - 0
V =0
T+ 1
T + 0
H+1
Flags
None
None
Z,C.N,V
Z,C,N.V
Z,C,N.V
Z,C.N,V
Z,C,N,V
None
SREG(S)
SREG(s)
T
None
C
N
N
Z
Z
S
S
V
V
T
T
H
H



<!-- Page 706 -->
### [PDF Page 706]

ARITHMETIC AND LOGIC INSTRUCTIONS
Mnem.
Operands Description
Operation
Flags
ADD
Rd, Rr
Add two Registers
Rd + Rd + Rr
Z.C.N.V.H
ADC
Rd, Rr
Add with Carry two Registers
Rd - Rd + Rr + C
[Z,C,N.V,H
ADIW
Rdi, K
Add Immediate to Word
Rdh:Rdl - Rdh:Rdl + K Z,C,N,V,S
SUB
Rd, Rr
Subtract two Registers
Rd + Rd - Rr
Z,C,N,V.H
SUBI
Rd, K
Subtract Constant from Register
Rd - Rd - K
Z,C,N,V,H
SBC
Rd, Rr
Subtract with Carry two Registers
Rd - Rd - Rr - C
Z,C,N,V.H
SBCI
Rd, K
Subtract with Carry Constant from Reg.
Rd +- Rd - K- C
Z,C,N,V.H
SBIW
Rdl, K
Subtract Immediate from Word
Rdh:Rdl - Rdh:Rdl - K Z,C,N,V,S
AND
Rd, Rr
Logical AND Registers
Rd + Rd • Rr
Z,N,V
ANDI
Rd, K
Logical AND Register and Constant Rd - Rd • K
Z.N, V
OR
Rd, Rr
Logical OR Registers
Rd +- Rd v Rr
Z,N,V
ORI
Rd, K
Logical OR Register and Constant
Rd - Rd v K
Z,N,V
EOR
Rd, Rr
Exclusive OR Registers
Rd + Rd Rr
Z,N,V
COM
Rd
One's Complement
Rd +- $FF - Rd
Z.C,N,V
NEG
Rd
Two's Complement
Rd + $00 - Rd
Z,C,N,V.H
SBR
Rd, K
Set Bit(s) in Register
Rd - Rd v K
Z.N,V
CBR
Rd, K
Clear Bits) in Register
Rd - Rd • ($FF - K)
Z,N,V
INC
Rd
Increment
Rd - Rd + 1
Z,N,V
DEC
Rd
Decrement
Rd + Rd - 1
Z,N,V
TST
Rd
Test for Zero or Minus
Rd + Rd • Rd
Z.N.V
CLR
Rd
Clear Register
Rd + $00
Z,N,V
SER
Rd
Set Register
Rd + $FF
None
MUL
Rd, Rr
Multiply Unsigned
R1:R0 + Rd x Rr
Z,C
MULS
Rd, Rr
Multiply Signed
R1:R0 - Rd x Rr
_Z,C
MULSU
Rd, Rr
Multiply Signed with Unsigned
R1:RO - Rdx Rr
Z,C
FMUL
Rd, Rr
Fractional Multiply Unsigned
R1:RO - (Rd × Rr)«< 1|Z,C
FMULS
Rd, Rr
Fractional Multiply Signed
R1:R0 - (Rd x Rr)<< 1|Z,C
MULSU| Rd, Rr
Fractional Multiply Signed with Unsigned R1:R0 - (Rd x Rr)<< 1 Z,C
MCU CONTROL INSTRUCTIONS
Mnemonics Operands Description
Operation
Flags
NOP
No Operation
SLEEP
Sleep
None
(see specific descr. for Sieep function) None
WDR
Watchdog Reset (see specific descr. for WDR/timer)
BREAK
[Break
For On-Chip Debug Only
None
APPENDIX A: AVR INSTRUCTIONS EXPLAINED
699



<!-- Page 707 -->
### [PDF Page 707]

SECTION A.2: AVR INSTRUCTIONS FORMAT

```assembly
ADC Ra, Rr
```

0≤d ≤ 31,0 ≤r≤31
; Add with carry
; Rd - Rd + Rr + C
Adds two registers and the contents of the C flag and places the result in the des-
tination register Rd.
Flags: H, S, V, N, Z, C
Cycles: 1
Example:
; Add RI:RO to R3:R2
add I2,10
; Add low byte
ada 13, 11
; Add with carry high byte

```assembly
ADD Rd, Rr
; Add without carry
```

0≤d≤31,0 ≤r ≤ 31
; Rd - Rd + Rr
Adds two registers without the C flag and places the result in the destination reg-
ister Rd.
Flags: H, S, V, N, Z, C
Cycles: 1
Example:
add
r1, r2
;Add r2 to rl (rl=r1tr2)
add 128,I28
;Add r28 to itself ([28=r28+r28)
ADIW Ra+1:Rd, K
; Add Immediate to Word
d € {24,26,28,30}, 0 ≤ K ≤ 63
; Rd + 1:Rd - Rd + 1:Rd + K
Adds an immediate value (0-63) to a register pair and places the result in the reg-
ister pair. This instruction operates on the upper four register pairs, and is well suited for
operations on the pointer registers.
Flags: S, V, N, Z, C
Cycles: 2
Example:
adiw 125:24,1
¡ Add 1 to 125:r24
adiw ZH: ZL, 63
¡ Add 63 to the 2-pointer (r31:30)

```assembly
AND Ra, Rr
; Logical AND
```

0≤d ≤ 31,0 ≤r≤31
; Rd - Rd • Rr
Performs the logical AND between the contents of register Rd and register Rr and
places the result in the destination register Rd.
Plags: S, V + 0, N, Z
Cycles: 1
Example:
and 12, 13
¡Bitwise and 12 and I3, result in =2
ldi r16,1
; Set bitmask 0000 0001 in r16
and I2, =16
¡ Isolate bit 0 in I2
ANDI Ra, K
; Logical AND with Immediate
16 ≤d ≤31,0 ≤ K≤255
; Rd - Rd • K
Performs the logical AND between the contents of register Rd and a constant and
places the result in the destination register Rd.
Flags: S, V + O, N, Z
Cycles: 1
700



<!-- Page 708 -->
### [PDF Page 708]

Example:
andi 117, $0F
andi
r18, $10
¡ Clear upper nibbie of r17
¡ Isolate bit 4 in r18
; Arithmetic Shift Right
ASR Rd
0≤d ≤ 31
Shifts all bits in Rd one place to the right. Bit 7
is held constant. Bit O is loaded into the C flag of the
67_____00
SREG. This operation effectively divides a signed value
by two without changing its sign. The Carry flag can be used to round the result.
Flags: S, V, N, Z, C
Cycles: 1
Example:
Idi 116, $10
¡ Load decimal 16 into r16
asr r16
;r16=r16 / 2
Idi r17, SEC
; Load -4 in r17
asr r17
;r17=r17/2
BCLR S
; Bit Clear in SREG
0≤$ ≤7
; SREG(S) - 0
Clears a single flag in SREG (Status Register).
Flags: I, T, H, S, V, N, Z, C Cycles: 1
Example:
bolr 0
; Clear Carry flag
belr 7
¡ Disable interrupts
BLD Rd, b
; Bit Load from the T Flag in SREG to a Bit in Register
0≤d ≤ 31,0≤b ≤7
; Rd(b) - T
Copies the T flag in the SREG (Status Register) to bit b in register Rd.
Flags: ---
Cycles: 1
Example:
bst r1,2
¡ Store bit 2 of r1 in I flag
bld 10, 4
¡ Load I flag into bit 4 of 10
BRBC'S, K
; Branch if Bit in SREG is Cleared
0≤5≤7,-64≤k≤ +63
; If SREG(s) = 0 then PC +- PC + k + 1, else PC - PC + 1
Conditional relative branch. Tests a single bit in SREG (Status Register) and
branches relatively to PC if the bit is set.
Flags: -
Cycles: 1or 2
Example:
cpi
120,5
brbc 1, noteq
¡Compare r20 to the value 5
; Branch if Zero flag cleared
noteq: nop
¡Branch destination (do nothing)
BRBS s, k
; Branch if Bit in SREG is Set
0≤5≤7,-64≤k≤ +63
; If SREG(s) = 1 then PC - PC + k + 1, else PC - PC + 1
Conditional relative branch. Tests a single bit in SREG (Status Register) and
branches relatively to PC if the bit is set.
APPENDIX A: AVR INSTRUCTIONS EXPLAINED
701



<!-- Page 709 -->
### [PDF Page 709]

Flags: -
Example:
bst 10, 3
brbs 6, bitset
bitset: nop
BROCK
64≤k≤ +63
if C is cleared.
Flags: -
Example:
Cycles: 1 or 2
¡ Load I bit with bit 3 of 10
¡Branch I bit was set
¡Branch destination (do nothing)
; Branch if Carry Cleared
; IIC = 0 then PC - PC + k + 1, else PC - PC +1
Conditional relative branch. Tests the Carry flag (C) and branches relatively to PC
Cycles: 1 or 2
nocarry:

```assembly
BRCS K
```

-64 ≤k≤ +63
if C is set.
Flags:
---
Example:
add :22,x23
bree nocarry
••.
nop
; Add 123 to 122
¡Branch if carry cleared
; Branch destination (do nothing)
; Branch if Carry Set
; If C = 1 then PC - PC + k + 1, else PC - PC +1
Conditional relative branch. Tests the Carry flag (C) and branches relatively to PC
Cycles: 1 or 2
carry:
cpi 126, $56
bres carry
пор
¡ Compare 126 with $56
¡Branch if carry set
; Branch destination (do nothing)
BREAK
; Break
The BREAK instruction is used by the on-chip debug system, and is normally not
used in the application software. When the BREAK instruction is executed, the AVR CPU
is set in the stopped mode. This gives the on-chip debugger access to internal resources.
Example:
Flas: =
Cycles: 1

```assembly
BREQ K
; Branch if Equal
```

-64 ≤ k ≤ +63
; If Rd = Rr (Z= 1) then PC - PC + k + 1, else PC - PC + 1
Conditional relative branch. Tests the Zero flag (Z) and branches relatively to PO
if Z is set. If the instruction is executed immediately after any of the instructions CP, CPI,
SUB, or SUBI, the branch will occur if and only if the unsigned or signed binary number
represented in Rd was equal to the unsigned or signed binary number represented in Rr.
Flags: -
Example:
cop II, 10
breg equal
•..
nop
¡ Compare registers 1l and 10
¡Branch if registers equal
¡Branch destination (do nothing)
equal:
702



<!-- Page 710 -->
### [PDF Page 710]

BRGE k
; Branch if Greater or Equal (Signed)
-64 ≤ k≤ +63
; If Rd≥Rr (NĐV = 0) then PC + PC + k + 1, else PC + PC +1
Conditional relative branch. Tests the Signed flag (S) and branches relatively to PC
if S is cleared. If the instruction is executed immediately after any of the instructions CP,
CPI, SUB, or SUBI, the branch will occur if and only if the signed binary number repre-
sented in Rd was greater than or equal to the signed binary number represented in Rr.
Flags: --
Cycles: 1 or 2
Example:
cp r11, x12
brge greateg
; Compare registers 111 and r12
¡Branch if r1l ≥ r12 (signed)
greateq:
; Branch destination (do nothing)
BRHC K
; Branch if Half Carry Flag is Cleared
-64 ≤ k≤ +63
; If H = 0 then PC -- PC + k + 1, else PC -PC +1
Conditional relative branch. Tests the Half Carry flag (H) and branches relatively
to PC if H is cleared.
Flags: ---
Cycles: 1 or 2
Example:
brhe holear
;Branch if Half Carry flag cleared
halear:
nop
; Branch destination (do nothing)
BRAS K
; Branch if Half Carry Flag is Set
64≤k≤ +63
; If H = 1 then PC - PC + k + 1, else PC - PC+1
Conditional relative branch. Tests the Half Carry flag (H) and branches relatively
to PC if His set.
Flags: —
Cycles: 1 or 2
Example:
brhs hset
пор
¡Branch if Half Carry flag set
hset:
¡Branch destination (do nothing)
BRID K
; Branch if Global Interrupt is Disabled
64≤k≤ +63
; If I = 0 then PC-PC + k + 1, else PC--PC +1
Conditional relative branch. Tests the Global Interrupt flag (I) and branches rela-
tively to PC if I is cleared.
Flags:
---
Cycles: 1 or 2
Example:
brid intdis
nop
¡Branch if interrupt disabled
intdis:
; Branch destination (do nothing)
BRIE K
; Branch if Global Interrupt is Enabled
-64 ≤ k ≤ +63
; If1 = 1 then PC - PC + k+ 1, else PC - PC+1
Conditional relative branch. Tests the Global Interrupt flag (I) and branches rela-
tively to PC if I is set.
Flags: -
Cycles: 1 or 2
APPENDIX A: AVR INSTRUCTIONS EXPLAINED
703



<!-- Page 711 -->
### [PDF Page 711]

Example:
brie inten
¡Branch if interrupt enabled
inten:
; Branch destination (do nothing)
BRIO K
; Branch if Lower (Unsigned)
-64 ≤ k ≤ +63
; If Rd < Rr (C = 1) then PC - PC + k + 1, else PC - PC + 1
Conditional relative branch. Tests the Carry flag (C) and branches relatively to PC
if C is set. If the instruction is executed immediately after any of the instructions CP, CPI,
SUB, or SUBI, the branch will occur if and only if the unsigned binary number represent-
ed in Rd was smaller than the unsigned binary number represented in Rr.
Flags:
--.
Cycles: 1 or 2
Example:
loop:
eor 119, r19
inc r19
срі x19,$10
brlo loop
пор
¡ Clear 119
; Increment r19
¡ Compare r19 with $10
¡Branch if r19 < $10 (unsigned)
;Exit from loop (do nothing)
BRET K
; Branch if Less Than (Signed)
-64 ≤ k ≤ +63
; If Rd < Rr (N * V = 1) then PC- PC + k + 1, else PC - PC +1
Conditional relative branch. Tests the Signed flag (S) and branches relatively to
PC if S is set. If the instruction is executed immediately after any of the instructions CP,
CPI, SUB, or SUBI, the branch will occur if and only if the signed binary number repre-
sented in Rd was less than the signed binary number represented in Rr.
Flags: --
Cycles: 1 or 2
Example:
bop 116,r1
brlt less
пор
¡Compare r16 to rl
¡Branch if r16 < rl (signed)
less:
; Branch destination (do nothing)
BRMI K
; Branch if Minus
-64≤ k ≤ +63
; If N=1 then PC-PC + k + 1, else PC-PC +1
Conditional relative branch. Tests the Negative flag (N) and branches relatively to
PC if N is set.
Flags: -
Cycles: 1 or 2
Example:
subi I18,4
brmi negative
...
negative: nop
¡ Subtract 4 from r18
¡Branch if result negative
; Branch destination (do nothing)

```assembly
BRNE k
; Branch if Not Equal
```

-64 ≤ k ≤ +63
; If Rd ‡ Rr (Z = 0) then PC + PC + k + 1, else PC + PC + 1
Conditional relative branch. Tests the Zero flag (Z) and branches relatively to PC
if Z is cleared. If the instruction is executed immediately after any of the instructions CP,
CPI, SUB, or SUBI, the branch will occur if and only if the unsigned or signed binary
704



<!-- Page 712 -->
### [PDF Page 712]

number represented in Rd was not equal to the unsigned or signed binary number repre-
sented in Rr.
Flags: —
Example:
e0I x27,x27
100p:
inc =27
cpi I27,5
brne 1o0p
пор
Cycles: 1 or 2
¡ Clear 127
¡ Increment =27
; Compare 127 to 5
; Branch if 127 not equal 5
; Loop exit (do nothing)
BRPL K
; Branch if Plus
64≤k≤ +63
; IN = 0 then PC - PC+ k + 1, else PC - PC +1
Conditional relative branch. Tests the Negative flag (N) and branches relatively to
PC if N is cleared.
Flags: -
Cycles: 1 or 2
Example:
positive:
subi 126, $50
brpi positive
nop
; Subtract $50 from I26
¡Branch if I26 positive
¡Branch destination (do nothing)
BRSH K
; Branch if Same or Higher (Unsigned)
64 ≤ k ≤ +63
; If Rd ≥Rr (C = 0) then PC - PC + k + 1, else PC + PC + 1
Conditional relative branch. Tests the Carry flag (C) and branches relatively to PO
if C is cleared. If the instruction is executed immediately after execution of any of the
instructions CP, CPI, SUB, or SUBI, the branch will occur if and only if the unsigned bina-
ry number represented in Rd was greater than or equal to the unsigned binary number rep-
resented in Rr.
Flags: --
Cycles: 1 or 2
Example:
subi r19,4
brsh highsm
пор
¡ Subtract 4 from r19
¡Branch if r19 >= 4 (unsigned)
highsm:
BRICK
-64 ≤ k ≤ +63
cleared.
Flags:
---
Example:
; Branch destination (do nothing)
; Branch if the T Flag is Cleared
; IfT = 0 then PC - PC+k + 1, else PC - PC+1
Conditional relative branch. Tests the T flag and branches relatively to PC if T is
Cycles: 1 or 2
bst I3,5
bite tolear
tolear:
¡ Store bit 5 of 13 in I flag
;Branch if this bit was cleared
; Branch destination (do nothing)
APPENDIX A: AVR INSTRUCTIONS EXPLAINED
705



<!-- Page 713 -->
### [PDF Page 713]

BRTS k
645k≤ +63
; Branch if the T Flag is Set
; IT= 1 then PC-PC + k+ 1, else PC - PC +1
Conditional relative branch. Tests the T flag and branches relatively to PC if T is
set.
Flags: -
Example:
Cycles: 1 or 2
tset:
bst 13,5
brts tset
пор
¡ Store bit 5 of 13 in I flag
¡Branch if this bit was set
¡Branch destination (do nothing)
BRYC K
; Branch if Overflow Cleared
-64 ≤k≤ +63
; If V = 0 then PC - PC + k+ 1, else PC - PC +1
Conditional relative branch. Tests the Overflow flag (V) and branches relatively
to PC if V is cleared.
Flags: -
Example:
Cycles: 1 or 2
add r.3, r4
; Add I4 to r3
brvc noover
;Branch if no overflow
noover:
nop
; Branch destination (do nothing)
BRYS K
; Branch if Overflow Set
64 ≤ k ≤ +63
; If V=1 then PC-PC + k + 1, else PC-PC + 1
Conditional relative branch. Tests the Overflow flag (V) and branches relatively
to PC if V is set.
Flags: -
Cycles: 1 or 2
Example:
add 13, 14
¡ Add I4 to r3
bIvs overfl
¡Branch if overflow
overfl:
пор
¡Branch destination (do nothing)
BSET S
; Bit Set in SREG
0 ≤S ≤7
Sets a single flag or bit in SREG (Status Register).
Flags: Any of the flags.
Cycles: 1
Example:
bset 6
bset 7
; Set I flag
¡Enable interrupt
BST Ra,5
; Bit Store from Register to T Flag in SREG
0≤d ≤ 31,0≤b ≤ 7
; T + Rd(b)
Stores bit b from Rd to the T flag in SREG (Status Register).
Flags: T
Cycles: 1
Example:
¡ Copy bit
bst r1,2
bld 10,4
¡Store bit 2 of rl in I flag
¡ Load I into bit 4
of rot
706



<!-- Page 714 -->
### [PDF Page 714]


```assembly
CALL k
; Long Call to a Subroutine
```

0≤k<64K (Devices (Devices with bits bits PC) or ≤k < 4M (Devices with 22 bits PC)
Calls to a subroutine within the entire program memory. The return address (to the
instruction after the CALL) will be stored onto the stack. (See also RCALL.) The stack
pointer uses a post-decrement scheme during CALL.
Flags: -
Cycles: 4
Example:
check:
error:
mov I16,10
call check
пор
срі 116,942
breg
error
ret
rimp error
¡ Copy 10 to 116
¡Call subroutine
; Continue (do nothing)
¡Check if r16 has a special value
;Branch if equal
; Return
• from subroutine
; Infinite 1o0p
СВГ А, Б
; Clear Bit in 170 Register
0≤A ≤31,0≤b ≤7
; I/O(A,b) - 0
Clears a specified bit in an I/O Register. This instruction operates on the lower 32
I/O registers (addresses 0-31).
Flags: --
Cycles: 2
Example:
cbi $12, 7
¡Clear bit 7 in Port D
CBR Ra, F
; Clear Bits in Register
16 ≤ d ≤ 31,0 ≤ K ≤ 255
; Rd - Rd • (SFF - K)
Clears the specified bits in register Rd. Performs the logical AND between the con-
tents of register Rd and the complement of the constant mask K.
Flags: S, N, V - 0,2
Cycles: 1
Example:
cbr r16, $F0
cbI 118,1
¡Clear upper nibble of r16
¡Clear bit 0 in r18
CIC
; Clear Carry Flag
; C=0
Clears the Carry flag (C) in SREG (Status Register).
Flags: C- 0.
Cycles: 1
Example:
add I0, 10
clo
¡ Add 10 to itself
¡ Clear Carry flag
CLH
; Clear Hall Carry Flag
•; H- 0
Clears the Half Carry flag (H) in SREG (Status Register).
Flags: H-0.
Cycles: 1
Example:
clh
¡Clear the Half Carry flag
APPENDIX A: AVR INSTRUCTIONS EXPLAINED
707



<!-- Page 715 -->
### [PDF Page 715]

CLI
; Clear Global Interrupt Flag
; 1+0
Clears the Global Interrupt flag (I) in SREG (Status Register). The interrupts will
be immediately disabled. No interrupt will be executed after the CLI instruction, even if
it occurs simultaneously with the CLI instruction.
Flags: I - O.
Cycles: 1
Example:
in temp, SREG
cli
sbi EECR, EEMWE
sbi EECR, EEWE
out sReG, temp
¡ Store SREG value
; (temp must be defined by user)
¡ Disable interrupts during timed sequence
¡Start EEPROM write
; Restore SREG value (I-flag)
CLN
; Clear Negative Flag
; N-0
Flags: N- O.
Clags the Negative flag (N) in SEs (Status Register).
Example:
add 12, 13
¡ Add r3 to 12
cln
¡ Clear Negative flag

```assembly
CLR Rd
; Clear Register
```

0≤d ≤ 31
; Rd - Rd © Rd
Clears a register. This instruction performs an Exclusive-OR between a register
and itself. This will clear all bits in the register..
Flags: S - 0, N- 0, V =0,2-0
Cycles: 1
Example:
clr 18
¡Clear r18
1oop:
inc 118
; Increment r18
ci 118,350
; Compare 118 to $50
brne 100p
CES
; Clear Signed Flag
; 5-0
Clears the Signed flag (S) in SREG (Status Register).
Flags: S - 0.
Cycles: 1
Example:
add I2,13
cls
¡ Add 13 to I2
¡ Clear Signed flag
CLI
; Clear T Flag
; T=0
Clears the T flag in SREG (Status Register).
Flags: T- O.
Cycles: 1
Example:
clt
¡ Clear I flag
708



<!-- Page 716 -->
### [PDF Page 716]

CLV
; Clear Overflow Flag
; V + 0
Clears the Overflow flag (V) in SREG (Status Register).
Flags: V- O.
Cycles: 1
Example:
add 12, =3
cIv
; Add 13 to r2
¡Clear Overflow flag
CLZ
; Clear Zero Flag
; Z-0
Clears the Zero flag (Z) in SREG (Status Register).
Flags: Z-O.
Cycles: 1
Example:
c1z
¡ Clear zero
cOM Rd
; One's Complement
0≤d ≤ 31
; Rd - $FF - Rd
his instruction performs a one's complement of register Rd.
Flags: S, V + O, N, Z + 1, C.
Example:
com 14
breq
zero
пор
¡ Take one's complement of r4
;Branch if zero
zero:
¡Branch destination (do nothing)
CP Ra,Rr
; Compare
0≤d ≤31,0 ≤r≤31
; Rd - Rr
This instruction performs a compare between two registers, Rd and Rr. None of the
registers are changed. All conditional branches can be used after this instruction.
Flags: H, S,V, N, Z, C.
Cycles: 1
Example:
cp I4, 119
brne noteg
пор
; Compare 14 with r19
¡ Branch if 14 not equal r19
noteq:
; Branch destination (do nothing)
CPC Ra,Rr
; Compare with Carry
0≤d ≤ 31,0≤r ≤ 31
; Rd - Rr -C
This instruction performs a compare between two registers, Rd and Rr, and also
takes into account the previous carry. None of the registers are changed. All conditional
branches can be used after this instruction.
Flags: H, S, V, N, Z, C.
Cycles: 1
Example:
¡Compare r3:12 with r1:10
noteq:
Cp I2,10
срс 13, 11
brne
noteg
nop
Compare bee
¡Branch if not equal
¡Branch destination (do nothing)
APPENDIX A: AVR INSTRUCTIONS EXPLAINED
709



<!-- Page 717 -->
### [PDF Page 717]

CPI Rd,K
; Compare with Immediate
16≤d≤ ≤ K ≤ 255
; Rd - K
This instruction performs a compare between register Rd and a constant. The reg-
ister is not changed. All conditional branches can be used after this instruction.
Flags: H, S,V, N, Z, C.
Cycles: 1
Example:
error:
cpi 119,3
brne error
nop
; Compare 119 with 3
; Branch if r19 not equal 3
; Branch destination (do nothing)
CPSE Ra,Rr
; Compare Skip if Equal
0≤d ≤31,0≤r ≤ 31
; If Rd = Rr then PC — PC + 2 or 3 else PC-PC+1
This instruction performs a compare between two registers Rd and Rr, and skips
the next instruction if Rd = Rr.
Flags:---
Example:
inc r4
apse r4, r0
neg 14
пор
Cycles: 1, 2, or 3
; Increment =4
¡ Compare 14 to 10
¡ Only executed if 14 not equal ro
¡Continue (do nothing)
DEC Ra
0≤ d ≤ 31
; Decrement
; Rd - Rd -1
Subtracts one from the contents of register Rd and places the result in the destina-
tion register Rd.
The C flag in SREG is not affected by the operation, thus allowing the DEC
instruction to be used on a loop counter in multiple-precision computations.
When operating on unsigned values, only BREQ and BRNE branches can be
expected to perform consistently. When operating on two's complement values, all signed
branches are available.
Flags: S,V, N, Z.
Cycles: 1
Example:
1oop:
Idi r17, $10
add I1, 12
dec =17
brne loop
nop
¡ Load constant in r17
¡ Add I2 to r1
; Decrement r17
¡Branch if r17 not equal O
¡Continue (do nothing)

```assembly
EOR Ra,Rr
; Exclusive OR
```

0≤d ≤ 31,0≤r ≤ 31
; Rd - Rd © Rr
Performs the logical Exclusive OR between the contents of register Rd and regis-
ter Rr and places the result in the destination register Rd.
Flags: S, V, Z + O, N, Z.
Cycles: 1
Example:
eor I4,I4
eor 10, I22
¡ Clear 14
¡Bitwise XOR between 10 and =22
710



<!-- Page 718 -->
### [PDF Page 718]

PMUL Rd,Rr
; Fractional Multiply Unsigned
16≤d ≤ 23, 16 ≤ r ≤ 23
; R1:R0 - Rd × Rr (unsigned « unsigned × unsigned)
This instruction performs 8-bit × 8-bit → 16-bit unsigned multiplication and shifts
the result one bit left.
Rd
Rr
Multiplicand
Multiplier
R1
Product High
RO
Product Low
8
8
16
Let (N.Q) denote a fractional number with N binary digits left of the radix point,
and Q binary digits right of the radix point. A multiplication between two numbers in the
formats (N1.Q1) and (N2.Q2) results in the format ((N1 + N2).(Q1 + Q2)). For signal pro-
cessing applications, the (1.7) format is widely used for the inputs, resulting in a (2.14)
format for the product. A left shift is required for the high byte of the product to be in the
same format as the inputs. The FMUL instruction incorporates the shift operation in the
same number of cycles as MUL.
The (1.7) format is most commonly used with signed numbers, while FMUL per-
forms an unsigned multiplication. This instruction is therefore most useful for calculating
one of the partial products when performing a signed multiplication with 16-bit inputs in
the (1.15) format, yielding a result in the (1.31) format. (Note: The result of the FMUL
operation may suffer from a 2's complement overflow if interpreted as a number in the
(1.15) format.) The MSB of the multiplication before shifting must be taken into account,
and is found in the carry bit. See the following example.
The multiplicand Rd and the multiplier Rr are two registers containing unsigned
fractional numbers where the implicit radix point lies between bit 6 and bit 7. The 16-bit
unsigned fractional product with the implicit radix point between bit 14 and bit 15 is
placed in R1 (high byte) and RO (low byte).
Flags: Z, C.
Cycles: 2
Example:
**************
*********************************
;* DESCRIPTION
¡* Signed fractional multiply of two 16-bit numbers with 32-bit result.
¡* r19:r18:r17:r16 = \ r23:r22 * r21:120 \ < 1
¡************************************************************
fmuls 16x16_32:
olr r2
fmuls r23,
I21
; ((signed) ah * (signed) bh) << 1
movw r19:r18,
r1:10
fmul
x22, r20
¡ (al * b1) << 1
ade r18,
I2
movwr17:r16, r1:r0
fmulsu I23,
120
i (signed)ah * bl) << 1
sbe r19,
I2
add r17,
ade r18,
r 1
ade r19,
fmulsu I21,
r22
; ((signed)bh * al) «< 1
sbc r19, r2
add r17,
10
ado
r18,
r1
ade r19,
12
APPENDIX A: AVR INSTRUCTIONS EXPLAINED
711



<!-- Page 719 -->
### [PDF Page 719]

FMULS Rd,Rr
; Fractional Multiply Signed
16≤d ≤ 23, 16 ≤r ≤ 23
; RI:RO - Rd × Rr (signed + signed × signed)
This instruction performs 8-bit × 8-bit → 16-bit signed multiplication and shifts
the result one bit left.
Rd
Rr
Multiplicand
Multiplier
→
R1
Product High
RO
Product Low
8
8
16
Let (N.Q) denote a fractional number with N binary digits left of the radix point,
and Q binary digits right of the radix point. A multiplication between two numbers in the
formats (N1.Q1) and (N2.Q2) results in the format ((N1 + N2).(Q1 + Q2)). For signal pro-
cessing applications, the (1.7) format is widely used for the inputs, resulting in a (2.14)
format for the product. A left shift is required for the high byte of the product to be in the
same format as the inputs. The FMULS instruction incorporates the shift operation in the
same number of cycles as MULS.
The multiplicand Rd and the multiplier Rr are two registers containing signed
fractional numbers where the implicit radix point lies between bit 6 and bit 7. The 16-bit
signed fractional product with the implicit radix point between bit 14 and bit 15 is placed
in RI (high byte) and RO (low byte).
Note that when multiplying 0x80 (-1) with 0x80 (-1), the result of the shift oper-
ation is 0x8000 (-1). The shift operation thus gives a two's complement overflow. This
must be checked and handled by software.
This instruction is not available in all devices. Refer to the device-specific instruc-
tion set summary.
Flags: Z, C.
Cycles: 2
Example:
fmuls r23, r22
¡Multiply signed 123 and =22 in
¡ (1.1) format, result in (1.15) format
moww r23:122,r1:10
¡Copy result back in I23:r22
FMULSU Ra,Rr
; Fractional Multiply Signed with Unsigned
16 ≤ d ≤ 23, 16 ≤ r ≤ 23
; RI:R0 - Rd x Rr
This instruction performs 8-bit × 8-bit → 16-bit signed multiplication and shifts
the result one bit left.
Rd
Multiplicand
8
Rr
Multiplier
8
→
R1
Product High
RO
Product Low
16
Let (N.Q) denote a fractional number with N binary digits left of the radix point,
and Q binary digits right of the radix point. A multiplication between two numbers in the
formats (N1.QI) and (N2.Q2) results in the format ((N1 + N2).(Q1 + Q2))). For signal pro-
cessing applications, the (1.7) format is widely used for the inputs, resulting in a (2.14)
format for the product. A lett shitt is required for the high byte of the product to be in the
same format as the inputs. The FMULSU instruction incorporates the shift operation in
the same number of cycles as MULSU.
The (1.7) format is most commonly used with signed numbers, while FMULSU
712



<!-- Page 720 -->
### [PDF Page 720]

performs a multiplication with one unsigned and one signed input. This instruction is
therefore most useful for calculating two of the partial products when performing a signed
multiplication with 16-bit inputs in the (1.15) format, yielding a result in the (1.31) for-
mat. (Note: The result of the FMULSU operation may suffer from a 2's complement over-
flow if interpreted as a number in the (1.15) format.) The MSB of the multiplication before
shifting must be taken into account, and is found in the carry bit. See the following exam-
ple.
The multiplicand Rd and the multiplier Rr are two registers containing fractional
numbers where the implicit radix point lies between bit 6 and bit 7. The multiplicand Rd
is a signed fractional number, and the multiplier Rr is an unsigned fractional number. The
16-bit signed fractional product with the implicit radix point between bit 14 and bit 15 is
placed in R1 (high byte) and RO (low byte).
This instruction is not available in all devices. Refer to the device-specific instruc-
tion set summary.
Flags: Z, C.
Cycles: 2
Example:
;*****************
*******************************
;* DESCRIPTION
;* Signed fractional multiply of two 16-bit numbers with 32-bit result.
¡* r19:r18:r17:r16 = | r23:r22 * r21:r20 | < 1
;***************************************************************
fmuls16×16_32:
clrr2
fmuls r23, x21
i ((signed) ah * (signed) bh) << 1
movwr19:118, 11:10
fmul r22, x20
¡ (al * bl) << 1
ado r18, r2
movwr17:116, r1:10
fmulsu r 23, r20 ; ((signed)ah * bl) << 1
sbo r19, r2
add r17, r0
ade r18, r1
ado r19, r2
fmulsu r21, r22
i ( (signed)bh * al) << 1
sbe r19, r2
add I17, 10
ade I18, r1
ada I19, 12
ICALL
; Indirect Call to Subroutine
Indirect call of a subroutine pointed to by the Z (16 bits) pointer register in the reg-
ister file. The Z-pointer register is 16 bits wide and allows calls to a subroutine within the
lowest 64K words (128K bytes) section in the program memory space. The stack pointer
uses a post-decrement scheme during ICALL.
This instruction is not available in all devices. Refer to the device-specific instruc-
tion set summary.
Flags: -
Cycles: 3
Example:
mov 130,10
icall
¡ Set offset to call table
¡Call routine pointed to by r31:r30
APPENDIX A: AVR INSTRUCTIONS EXPLAINED
713



<!-- Page 721 -->
### [PDF Page 721]

IJMP
; Indirect Jump
Indirect jump to the address pointed to by the Z (16 bits) pointer register in the
register file. The Z-pointer register is 16 bits wide and allows jumps within the lowest
64K words (128K bytes) of the program memory.
This instruction is not available in all devices. Refer to the device-specific instruc-
tion set summary.
Flags:—
Cycles: 2
Example:
mOv I30, 10
i jmp
¡ Set offset to jump table
; Jump to routine pointed to by 131:130
IN Ra,A
; Load an 170 Location to Register
0≤d ≤ 31,0≤A≤ 63
; Rd - 1/O(A)
Loads data from the I/O space (ports, timers, configuration registers, etc.) into reg-
ister Rd in the register file.
Flags:-
Cycles: 1
Example:
in 125, $16
cpi r25, 4
breg exit
пор
; Read Port B
;Compare read value to constant
¡Branch if r25=4
exit:
INC Rd
0≤d ≤ 31
;Branch destination (do nothing)
; Increment
; Rd - Rd + 1
Adds one to the contents of register Rd and places the result in the destination reg-
ister Rd.
The C flag in SREG is not affected by the operation, thus allowing the INC
instruction to be used on a loop counter in multiple-precision computations.
When operating on unsigned numbers, only BREQ and BRNE branches can be
expected to perform consistently. When operating on two's complement values, all signed
branches are available.
Flags: S, V, N, Z.
Cycles: 1
Example:
c1r I22
10op:
inc r22
¡Clear r22
¡ Increment r22
ei x22,945
brne 100p
nop
¡ Compare r22 to $4f
¡Branch if not equal
¡Continue (do nothing)
JMPK
0<k<4M
; Jump
; PC - k
Jump to an address within the entire 4M (words) program memory. See also
RJMP.
Flags:--
Cycles: 3
714



<!-- Page 722 -->
### [PDF Page 722]

Example:
mov 11, 10
jmp
farplc
¡ Copy 10 to r1
; Unconditional
Jump
¡ Jump destination (do nothing)
farplc:
ID
; Load Indirect from Data Space to Register
; using Index »
Loads one byte indirect from the data space to a register. For parts with SRAM, the
data space consists of the register file, I/O memory, and internal SRAM (and external
SRAM if applicable). For parts without SRAM, the data space consists of the register file
only. The EEPROM has a separate address space.
The data location is pointed to by the X (16 bits) pointer register in the register file.
Memory access is limited to the current data segment of 64K bytes. To access another data
segment in devices with more than 64K bytes data space, the RAMPX in register in the
1/O area has to be changed.
The X-pointer register can either be left unchanged by the operation, or it can be
post-incremented or pre-decremented
These features are especially suited for accessing arrays, tables, and stack pointer
usage of the X-pointer register. Note that only the low byte of the X-pointer is updated in
devices with no more than 256 bytes data space. For such devices, the high byte of the
pointer is not used by this instruction and can be used for other purposes. The RAMPX
register in the I/O area is updated in parts with more than 64K bytes data space or more
than 64K bytes program memory, and the increment/ decrement is added to the entire 24-
bit address on such devices.
Syntax:
(i) LD Rd, X
(ii) LD Rd, X+
(ili) LD Rd, -x
Operation:
Rd + (X)
Rd = (X), X=X+1
x+ X-1, Rd = (x)
Comment:
X: Unchanged
X: Post-incremented
X: Pre-decremented
Flags:--
Example:
Cycles: 2
clr r27
Idi 126, $60
1d 10, x+
¡Clear X high byte
¡ Set X low byte to $60
¡ Load 10 with data space 1oc. $60
¡X post inc)
Id ri, x
Idi 126, $63
Id 12, x
1d r3,-x
¡ Load r1 with data space loc. $61
¡ Set X 1ow byte to $63
¡ Load 12 with data space 1oc. $63
¡ Load 13 with data space
loc.
; $62 (x pre dec)
LD (LDD)
; Load Indirect from Data Space to Register
; using Index Y
Loads one byte indirect with or without displacement from the data space to a reg-
ister. For parts with SRAM, the data space consists of the register file, IO memory, and
internal SRAM (and external SRAM if applicable). For parts without SRAM, the data
space consists of the register file only. The EEPROM has a separate address space.
APPENDIX A: AVR INSTRUCȚIONS EXPLAINED
715



<!-- Page 723 -->
### [PDF Page 723]

The data location is pointed to by the Y (16 bits) pointer register in the register file.
Memory access is limited to the current data segment of 64k bytes. To access another data
segment in devices with more than 64K bytes data space, the RAMPY in register in the
1/O area has to be changed.
The Y-pointer register can either be left unchanged by the operation, or it can be
post-incremented or pre-decremented. These features are especially suited for accessing
arrays, tables, and stack pointer usage of the Y-pointer register. Note that only the low byte
of the Y-pointer is updated in devices with no more than 256 bytes data space. For such
devices, the high byte of the pointer is not used by this instruction and can be used for
other purposes. The RAMPY register in the I/O area is updated in parts with more than
64K bytes data space or more than 64K bytes program memory, and the increment/ decre-
ment/displacement is added to the entire 24-bit address on such devices.
Syntax:
Operation:
(i) LD Rd, Y
Rd + (Y)
(ii) LD Rd, Y+
Rd+ (Y),Y=Y+1
(iii) LD Rd, -Y
Y+Y - 1, Rd + (Y)
(iiii) LDD Rd, Y + q Rd + (Y + q)
Comment:
Y: Unchanged
Y: Postincremented
Y: Predecremented
Y: Unchanged, q: Displacement
Flags:--
Example:
clr r29
Idi =28, $60
Id IO, Y+
ld r1, y
Idi I28,$63
Id I2, Y
1d r3, - y
Idd I4, Y+2
LD (LDD)
Cycles: 2
¡ Clear I high byte
¡ Set y low byte to $60
; Load 10 with data space loc. $60 (Y post inc
; Load r1 with data space loc. $61
¡ Set I low byte to $63
¡ Load
| r2 with data space loc. $63
¡Load r3 with data space loc. $62 (Y pre dec
¡ Load
14
with data space 1oc. $64
; Load Indirect from Data Space to Register
; using Index Z
Loads one byte indirect with or without displacement from the data space to a reg-
ister. For parts with SRAM, the data space consists of the register file, I/O memory, and
internal SRAM (and external SRAM if applicable). For parts without SRAM, the data
space consists of the register file only. The EEPROM has a separate address space.
The data location is pointed to by the Z (16 bits) pointer register in the register file.
Memory access is limited to the current data segment of 64K bytes. To access another data
segment in devices with more than 64K bytes data space, the RAMPZ in register in the
I/O area has to be changed.
The Z-pointer register can either be left unchanged by the operation, or it can be
post-incremented or pre-decremented. These features are especially suited for stack point-
er usage of the Z-pointer register, however because the Z-pointer register can be used for
indirect subroutine calls, indirect jumps, and table lookup, it is often more convenient to
use the X or Y-pointer as a dedicated stack pointer. Note that only the low byte of the Z-
pointer is updated in devices with no more than 256 bytes data space. For such devices,
the high byte of the pointer is not used by this instruction and can be used for other pur-
poses. The RAMPZ register in the I/O area is updated in parts with more than 64k bytes
716



<!-- Page 724 -->
### [PDF Page 724]

data space or more than 64K bytes program memory, and the increment/decrement/dis-
placement is added to the entire 24-bit address on such devices.
Syntax:
Operation:
(i) LD Rd, Z
Rd - (Z)
(ii) LD Rd, Z+
Rd + (Z)Z< Z+ 1
(i11) LD Ra, -Z
Z+ Z-1Rd+ (Z)
(iiii) LDD Rd, Z+ q Rd = (Z + q)
Comment:
Z: Unchanged
Z: Postincrement
Z: Predecrement
Z: Unchanged, q: Displacement
Flags: -
Cycles: 2
Example:
clr
r31
Idi 130,$60
Id ro, z+
Id rl,z
Idi r30, $63
Id =2, z
Id 13, - z
Idd 14,7+2
; Clear Z high byte
¡ Set Z low byte to $60
; Load
with data
space loc.$60(Z
postinc.)
¡Load rl with data space loc. $61
¡ Set 2 low byte to
• $63
¡ Load 12 with data space 1oc. $63
; Load r3 with data space loc. $62 (Z predec.)
¡ Load 14 with data space loc. $64
[DIRA,K
; Load Immediate
16≤d ≤ 31,0≤K ≤ 255
; Rd - K
Loads an 8-bit constant directly to registers 16 to 31.
Flags:--
Cycles: 1
Example:
clr 131
Idi r30, $FO
1pm
¡ Clear Z high byte
¡ Set Z low byte to $FO
¡ Load constant from program
¡ memory pointed to by z
LDS Ra,k
; Load Direct from Data Space
0≤d≤31,0≤k ≤ 65535
; Rd - (k)
Loads one byte from the data space to a register. The data space consists of the reg-
ister file, 1/0 memory, and SRAM.
Flags:---
Cycles: 2
Example:
Ids r2, $FF00
add I2, I1
sts $FF00, I2
LPM
¡ Load I2 with the contents of
¡ data space location $FF00
¡ add Il to r2
¡ Write back
; Load Program Memory
Loads one byte pointed to by the Z-register into the destination register Rd. This
instruction features a 100% space effective constant initialization or constant data fetch.
The program memory is organized in 16-bit words while the Z-pointer is a byte address.
Thus, the least significant bit of the Z-pointer selects either the low byte (ZLSB = 0) or
the high byte (ZLSB = 1). This instruction can address the first 64K bytes (32K words) of
APPENDIX A: AVR INSTRUCTIONS EXPLAINED
717



<!-- Page 725 -->
### [PDF Page 725]

program memory. The Z-pointer register can either be left unchanged by the operation, or
it can be incremented. The incrementation does not apply to the RAMPZ register.
Devices with self-programming capability can use the LPM instruction to read the
Fuse and Lock bit values. Refer to the device documentation for a detailed description.
Syntax:
(i) LPM
(ii) LPM Rd, Z
(iii) LPM Rd, Z+
Operation:
Comment:
RO + (Z)
Z: Unchanged, RO implied Rd
Rd + (Z)
Z: Unchanged
Rd - (Z), Z + Z+ 1Z: Postincremented
Flags:--
Example:
Cycles: 3
ldi ZH, high (Table _1<<1);Initialize Z-pointer
Idi
Zh,
1ow (Table_I<<1)
1pm r16, z
; Load constant from program
; Memory pointed to by Z (131:30)
•..
тан 0x3876
;0x76 is addresses when ZLSB = (
; 0x58 is addresses when ZLSB =
•..
; Logical Shift Left
0≤d ≤ 31
Shifts all bits in Rd one place to
the left. Bit O is cleared. Bit 7 is loaded
b7-..
into the C flag of the SREG (Status
Register). This operation effectively multiplies signed and unsigned values by two.
Flags: H, S, V, N, Z, C.
Cycles: 1
Example:
add 10, 14
Isi 10
¡Add r4 to 10
¡ Multiply 10 by 2
; Logical Shift Left
ISR Rd
0≤d ≤ 31
→
Shifts all bits in Rd one place to the
right. Bit 7 is cleared. Bit O is loaded into
→
b7--
----- bO
→→
C
the C flag of the SREG. This operation
effectively divides an unsigned value by two. The C flag can be used to round the result.
Flags: S, V, N -- 0, Z, C.
Cycles: 1
Example:
add
10, r4
1sr
r0
¡ Add I4 to 10
¡ Divide 10 by 2
MOVRa,Rr
; Copy Register
0≤d ≤31,0≤r≤31
; Rd - Rr
This instruction makes a copy of one register into another. The source register Rr
is left unchanged, while the destination register Rd is loaded with a copy of Rr.
Flags: --
Cycles: 1
718



<!-- Page 726 -->
### [PDF Page 726]

Example:
check:
mov r16,r0
call
check
cp x16,511
¡ Copy r0 to r16
; Call
subroutine
; Compare
r16
to
$11
ret
; Return from subroutine
MOVW Rd + 1:Ra,Rr + TARrd
; Copy Register Word
d € {0,2,...,30%, rE (0,2..,303
; Rd + 1Rd - Rr + 1:Rr
This instruction makes a copy of one register pair into another register pair. The
source register pair Rr + 1:Rr is left unchanged, while the destination register pair Rd +
1:Rd is loaded with a copy of Rr + 1:Rr.
Flags: --
Cycles: 1
Example:
check:
movw r17:16, rl:r0 ;Copy r1:10 to r17:r16
call check
¡ Call
subroutine
cpi 116, $11
; Compare r16 to $11
cpi ×17, $32
¡Compare r17 to $32
•..
ret
; Return from subroutine
MUL Ra,Rr
0≤d≤31,05r ≤ 31
Rd
Rr
Multiplicand
x
Multiplier
; Multiply Unsigned
; R1:RO - Rd × Rr(unsigned - unsigned × unsigned)
R1
Product High
→
RO
Product Low
8
8
16
This instruction performs 8-bit × 8-bit → 16-bit unsigned multiplication.
The multiplicand Rd and the multiplier Rr are two registers containing unsigned
numbers. The 16-bit unsigned product is placed in R1 (high byte) and RO (low byte). Note
that if the multiplicand or the multiplier is selected from RO or R1 the result will overwrite
those after multiplication.
Flags: Z, C.
Cycles: 2
Example:
mul r5, I4
mov
14, 10
¡ Multiply unsigned r5 and I4
¡ Copy result back in r5:14
MULS Ra,Rr
; Multiply Signed
16≤d ≤ 31,16 ≤r ≤ 31
; R1:R0 - Rd × Rr(signed + signed × signed)
This instruction performs 8-bit × 8-bit → 16-bit signed multiplication.
The multiplicand Rd and the multiplier Rr are two registers containing signed
numbers. The 16-bit signed product is placed in R1 (high byte) and RO (low byte).
Flags: Z, C.
Cycles: 2
Example:
muls =21,x20
¡Multiply signed I21 and =20
movw 120, 10
¡Copy result back in r21:120
APPENDIX A: AVR INSTRUCȚIONS EXPLAINED
719



<!-- Page 727 -->
### [PDF Page 727]

MULSU Rd,Rr
; Multiply Signed with Unsigned
16≤d ≤d ≤ ≤r≤31
; R1:RO - Rd × Rr (signed - signed × unsigned)
This instruction performs 8-bit × 8-bit → 16-bit multiplication of a signed and an
unsigned number.
The multiplicand Rd and the multiplier Rr are two registers. The multiplicand Rd
is a signed number, and the multiplier Rr is unsigned. The 16-bit signed product is placed
in RI (high byte) and RO (low byte).
Flags: Z, C.
Cycles: 2
Example:--
NEGRA
; Two's Complement
0≤d ≤ 31
; Rd - $00 - Rd
Replaces the contents of register Rd with its two's complement; the value $80 is
left unchanged.
Flags: H, S, V, N, Z, C.
Example:
Cycles: 1
sub r11,10
brpl positive
neg 111
positive:
nop
¡ Subtract 10 from r11
¡Branch if result positive
¡ Take two' s complement of r11
¡Branch destination (do nothing)
NOP
; No Operation
This instruction performs a single-cycle No Operation.
Flags: -
Cycles: 1
Example:
clr =16
ser r17
out $18, +16
nop
out $18, r17
¡ Clear r16
¡Set r17
¡ write zeros to Port B
¡Wait (do nothing)
¡ Write ones to Port B

```assembly
OR Ra,Rr
; Logical OR
```

0≤d ≤ 31,0≤r ≤ 31
; Rd - Rd OR Rr
Performs the logical OR between the contents of register Rd and register Rr and
places the result in the destination register Rd.
Flags: S, V - 0, N, Z.
Cycles: 1
Example:
or r15, r16
bst r15,6
brts ok
¡Do bitwise or between registers
¡ Store bit 6 of r15 in I flag
¡Branch if I flag set
ok:
;Branch destination (do nothing)
720



<!-- Page 728 -->
### [PDF Page 728]

ORI RA,K
; Logical OR with Immediate
16≤d ≤31,0≤K ≤ 255
; Rd - Rd OR K
Performs the logical OR between the contents of register Rd and a constant and
places the result in the destination register Rd.
Flags: S, V - O, N, Z.
Cycles: 1
Example:
Ori 116, $FO
¡ Set high nibble of 116
ori r17,1
¡ set bit 0 of 117

```assembly
OUT A,Rr
; Store Register to /O Location
```

0≤r ≤ 31,0≤A≤ 63
; I/O(A) + Rr
Stores data from register Rr in the register file to I/O space (ports, timers, config-
uration registers, etc.).
Flags: --
Cycles: 1
Example:
CIr I16
ser r17
out $18, 116
nop
out $18, 117
¡ Clear 116
¡ Set r17
¡ Write zeros to Port B
¡Wait (do nothing)
; Write ones to port B

```assembly
POP Rd
; Pop Register from Stack
```

0≤d ≤ 31
; Rd - STACK
This instruction loads register Rd with a byte from the STACK. The stack pointer
is pre-incremented by 1 before the POP.
Flags: -
Cycles: 2
Example:
routine:
call routine
push x14
push 113
•..
pop r13
pop 114
ret
¡ Call subroutine
¡Save r14 on the stack
¡Save r13 on the stack
¡ Restore r13
¡Restore r14
¡ Return from subroutine

```assembly
PUSH Rr
; Push Register on Stack
```

0≤d ≤31
; STACK - Rr
This instruction stores the contents of register Rr on the STACK. The stack point-
er is post-decremented by 1 after the PUSH.
Flags: --
Cycles: 2
Example:
routine:
call routine
push x14
push r13
pop 113
pop 114
ret
¡ Call subroutine
¡ Save 114 on the stack
¡ Save 113 on the stack
¡ Restore 113
¡ Restore 114
¡ Return from subroutine
APPENDIX A: AVR INSTRUCȚIONS EXPLAINED
721



<!-- Page 729 -->
### [PDF Page 729]


```assembly
RCALL k
; Relative Call to Subroutine
```

-2K ≤k < 2K
; PC-PC+k+1
Relative call to an address within PC - 2K + 1 and PC + 2K (words). The return
address (the instruction after the RCALL) is stored onto the stack. (See also CALL.) In
the assembler, labels are used instead of relative operands. For AVR microcontrollers with
program memory not exceeding 4K words (8K bytes) this instruction can address the
entire memory from every address location. The stack pointer uses a post-decrement
scheme during RCALL.
Flags: --.
Cycles: 3
Example:
routine:
rcall routine
push r14
pop x14
ret
¡ Call subroutine
¡ Save r14 on the stack
; Restore r14
¡ Return from subroutine
RET
; Return from Subroutine
Returns from subroutine. The return address is loaded from the stack. The stack
pointer uses a pre-increment scheme during RET.
Flags:
Cycles: 4
Example:
call routine
¡ Call subroutine
routine:
push z14
¡Save I14 on the stack
...
pop r14
¡ Restore I14
ret
; Return from subroutine
RETT
; Return from Interrupt
Returns from interrupt. The return address is loaded from the stack and the Global
Interrupt flag is set.
Note that the Status Register is not automatically stored when entering an inter-
rupt routine, and it is not restored when returning from an interrupt routine. This must be
handled by the application program. The stack pointer uses a pre-increment scheme dur-
ing RETI.
Flags: -
Cycles: 4
Example:
extint:
push xo
pop Io
reti
; Save 10 on the stack
; Restore 10
¡ Return and enable interrupts
722



<!-- Page 730 -->
### [PDF Page 730]


```assembly
RJMP k
; Relative Jump
```

-2K ≤k< 2K
;PC<PC+ k+1
Relative jump to an address within PC - 2K +1 and PC + 2K (words). In the
assembler, labels are used instead of relative operands. For AVR microcontrollers with
program memory not exceeding 4K words (8K bytes) this instruction can address the
entire memory from every address location.
Flags: -
Cycles: 2
Example:
error:
cpi 116, $42
brne error
rjmp ok
add 116, r17
inc r16
nop
; Compare 116 to $42
¡Branch if r16 not equal $42
; Unconditional branch
¡Add r17 to r16
ok:
ROLRA
0<d ≤ 31
Shifts all bits in Rd one place to the left. The C
flag is shifted into bit 0 of Rd. Bit 7 is shifted into the
C flag. This operation combined with LSL effectively
multiplies multibyte signed and unsigned values by
two.
¡ Destination for rjmp (do nothing)
; Rotate Left through Carry
b7.
........bo
Flags: H, S, V, N, Z, C.
Cycles: 1
Example:
Isl r18
rol r19
bros oneenc
• • •
nop
¡Multiply r19:r18 by two
;r19:118 is a signed or unsigned word
¡Branch if carry set
oneenc:
ROR Ra
; Branch destination (do nothing)
; Rotate Right through Carry
0≤d ≤ 31
Shifts all bits in Rd one place to the right. The
C flag is shifted into bit 7 of Rd. Bit O is shifted into b.
the C flag. This operation combined with ASR effec-
tively divides multibyte signed values by two.
Combined with LSR, it effectively divides multibyte unsigned values by two. The Carry
flag can be used to round the result.
Flags: S, V, N, Z, C.
Cycles: 1
Example:
lsr r19
ror
r18
brec zeroencl
asr r17
roI
116
bree zeroenc2
¡ Divide r19:18 by two
¡ r19:118 is an unsigned two-byte integer
¡Branch if carry cleared
¡ Divide 117:116 by two
¡ 117:116 is a signed two-byte integer
; Branch if carry cleared
zeroenc1:
zeroenc2:
nop
•• •
nop
; Branch destination (do nothing)
; Branch destination (do nothing)
APPENDIX A: AVR INSTRUCTIONS EXPLAINED
723



<!-- Page 731 -->
### [PDF Page 731]

SBC Rd,Rr
; Subtract with Carry
0≤d ≤ 31,0≤r ≤ 31
; Rd - Rd - Rr-C
Subtracts two registers and subtracts with the C flag and places the result in the
destination register Rd.
Flags: H, S, V, N, Z, C.
Example:
sub =2, 10
sbc 13, 11
Cycles: 1
¡ Subtract r1: 10 from 13:I2
; Subtract low byte
¡ Subtract with carry high byte
SBCT RA,K
; Subtract Immediate with Carry
0≤d ≤ 31,0≤r≤ 31
; Rd - Rd - K-C
Subtracts a constant from a register and subtracts with the C flag and places the
result in the destination register Rd.
Flags: H, S, V, N, Z, C.
Example:
Cycles: 1
¡Subtract $4F23 from I17:r16
subi 116, $23
¡ Subtract low byte
sboi r17, $4F
¡ Subtract with carry high byte
; Set Bit in 1/0 Register
0≤A ≤ 31,0≤b≤7
; 1/0(A,b) -1
Sets a specified bit in an I/O register. This instruction operates on the lower 32 I/O
registers.
Flags: -
Cycles: 2
Example:
out $1E, 10
sbi $1C, 0
in r1, $1D
; Write EEPROM address
¡ Set read bit in EECR
¡ Read EEPROM data

```assembly
SBIC A,6
; Skip if Bit in 1/0 Register is Cleared
```

0≤d ≤31,0≤ r≤ 31
; If I/O(A,b) = 0 then PC - PC + 2 (or 3) else PC + PC +1
This instruction tests a single bit in an 1/O register and skips the next instruction
if the bit is cleared. This instruction operates on the lower 32 l/O registers.
Flags:-
Cycles: 1/2/3
Example:
e2wait:
sbic $1C, 1
¡ Skip next inst. if EEWE cleared
rimp e2wait
; EEPROM write not finished
¡Continue (do nothing)

```assembly
SBIS A,5
; Skip if Bit in 1/0 Register is Set
```

0≤d ≤ 31,0≤r≤ 31
; If/O(A,b) = 1 then PC - PC + 2 (or 3) else PC - PC+1
This instruction tests a single bit in an I/O register and skips the next instruction
if the bit is set. This instruction operates on the lower 32 l/O registers.
Flags: --
Cycles: 1/2/3
Example:
waitset:
sbis $10,0
rimp waitset
nop
¡ Skip next inst. if bit 0 in Port D set
¡Bit not set
¡ Continue (do nothing)
724



<!-- Page 732 -->
### [PDF Page 732]

SBIW Rd + 1:Rd,K
; Subtract Immediate from Word
d € (24,26,28,30}, 0 ≤ K ≤ 63
; Rd + 1:Rd - Rd + 1:Rd - K
Subtracts an immediate value (0-63) from a register pair and places the result in
the register pair. This instruction operates on the upper four register pairs, and is well suit-
ed for operations on the pointer registers.
Flags: S, V, N, Z, C.
Cycles: 2
Example:
sbiw r25:124,1
sbiw YH: YI, 63
¡Subtract 1 from r25:r24
; Subtract 63 from the Y-pointer
SBR RA,K
; Set Bits in Register
16≤d≤31,0≤ K ≤ 255
; Rd - Rd OR K
Sets specified bits in register Rd. Performs the logical ORI between the contents
of register Rd and a constant mask K and places the result in the destination register Rd.
Flags: S, V-O, N, Z.
Cycles: 1
Example:
sbr 116,3
sbr 117, $F0
; Set bits 0 and 1 in =16
¡ Set 4 MSB in r17
SBRC Rr,b
; Skip if Bit in Register is Cleared
05r ≤31,0 ≤b ≤7
; If Rr(b) = 0 then PC - PC + 2 or 3 else PC + PC + 1
This instruction tests a single bit in an I/O register and skips the next instruction if
the bit is set. This instruction operates on the lower 32 l/O registers.
Flags: ---
Cycles: 1/2/3
Example:
sub 10, =1
sbre 10, 1
sub r0, r1
nop
¡Subtract rl from 10
¡Skip if bit 7 in r0
cleared
¡Only executed if bitl in r0 not cleared
¡Continue (do nothing)
SBRS Rr,b
; Skip if Bit in Register is Set
0≤r ≤ 31, 0≤b ≤7
; If Rr(b) = 1 then PC +- PC + 2 or 3 else PC + PC + 1
This instruction tests a single bit in a register and skips the next instruction if the
bit is set.
Flags: H, S, V, N, Z, C.
Cycles: 1/2/3
Example:
sub 10, r1
sbrs 10,7
neg ro
nop
¡ Subtract rl from r0
¡ Skip if bit 7 in r0 set
¡Only executed if bit 7 in 10 not set
¡ Continue (do nothing)
SEC
; Set Carry Flag
; C+1
Sets the Carry flag (C) in SREG (Status Register).
Flags: C- 1.
Cycles: 1
Example:
sec
ade 10, r1
¡ Set Carry flag
; r0=r0+r1+1
APPENDIX A: AVR INSTRUCTIONS EXPLAINED
725



<!-- Page 733 -->
### [PDF Page 733]

SEH
; Set Half Carry Flag
; H-1
Sets the Half Carry (H) in SREG (Status Register).
Flags: H+ 1.
Cycles: 1
Example:
seh
; Set Half Carry flag
SET
; Set Global Interrupt Flag
; 1-1
Sets the Global Interrupt flag (I) in SREG (Status Register). The instruction fol-
lowing SEI will be executed before any pending interrupts.
Flags: I- 1.
Cycles: 1
Example:
¡ Set global interrupt enable
¡ Set Carry flag
¡Note: will set Carry flag before any pending interrupt
SEN
; Set Negative Flag
; N-1
Sets the Negative flag (N) in SREG (Status Register).
Flags: N- 1.
Cycles: 1
Example:
add =2,119
sen
¡ Add r19 to I2
¡Set Negative flag

```assembly
SER Rd
; Set all Bits in Register
```

16 ≤ d ≤31
; Rd - $FF
Loads $FF directly to register Rd.
Flags: --
Cycles: 1
Example:
ser 117
out $18,117
¡ Set 117
¡ Write ones to Port B
SES
; Set Signed Flag
;S+1
Sets the Signed flag (S) in SREG (Status Register).
Flags: S- 1.
Cycles: 1
Example:
add 12, =19
ses
¡ Add 119 to r2
¡Set Negative flag
SET
; Set T Flag
; T+1
Sets the T flag in SREG (Status Register).
Flags: T- 1.
Cycles: 1
Example:
set
; Set I flag
726



<!-- Page 734 -->
### [PDF Page 734]

SEV
; Set Overflow Flag
; V-1
Sets the Overflow flag (V) in SREG (Status Register).
Flags: V+ 1.
Cycles: 1
Example:
SEZ
sev
¡ Set Overflow flag
; Set Zero Flag
;Z+1
Sets the Zero flag (Z) in SREG (Status Register).
Flags: Z+ 1.
Cycles: 1
Example:
sez
; Set Z flag
SLEEP
This instruction sets the circuit in sleep mode defined by the MCU control regis-
ter.
Flags: --
Example:
Cycles: 1
mov 10, r11
Idi r16, (1<<SE)
out MCUCR, 116
sleep
¡ Copy I1l to 10
; Enable sleep mode
; Put MCU in sleep mode
SPM
; Store Program Memory
SPM can be used to erase a page in the program memory, to write a page in the
program memory (that is already erased), and to set Boot Loader Lock bits. In some
devices, the program memory can be written one word at a time, in other devices an entire
page can be programmed simultaneously after first filling a temporary page buffer. In all
cases, the program memory must be erased one page at a time. When erasing the program
memory, the RAMPZ and Z-register are used as page address. When writing the program
memory, the RAMPZ and Z-register are used as page or word address, and the KI:RU reg
ister pair is used as data(1). When setting the Boot Loader Lock bits, the RI:RO register
pair is used as data.
Refer to the device documentation for detailed description of SPM usage. This
instruction can address the entire program memory.
Flags: --.
Cycles: depends on the operation
Syntax:
SPM
(ii)
(iii)
(iv)
SPM
SPM
SPM
Operation:
(RAMPZ:Z) + $ffff
(RAMPZ:Z) - RI:RO
(RAMPZ:Z) < R1:R0
(RAMPZ:Z) + TEMP
Comment:
Erase program memory page
Write program memory word
Write temporary page buffer
Write temporary page buffer
to program memory
(v)
SPM
BLBITS - RI:RO
Set Boot Loader Lock bits
APPENDIX A: AVR INSTRUCTIONS EXPLAINED
727



<!-- Page 735 -->
### [PDF Page 735]

ST
; Store Indirect From Register to Data Space
; using Index X
Stores one byte indirect from a register to data space. For parts with SRAM, the
data space consists of the register file, I/O memory, and internal SRAM (and external
SRAM if applicable). For parts without SRAM, the data space consists of the register file
only. The EEPROM has a separate address space.
The data location is pointed to by the X (16 bits) pointer register in the register
file. Memory access is limited to the current data segment of 64K bytes. To access anoth-
er data segment in devices with more than 64K bytes data space, the RAMPX register in
the I/O area has to be changed.
The X-pointer register can either be left unchanged by the operation, or it can be
post-incremented or pre-decremented. These features are especially suited for accessing
arrays, tables, and stack pointer usage of the X-pointer register. Note that only the low
byte of the X-pointer is updated in devices with no more than 256 bytes data space. For
such devices, the high byte of the pointer is not used by this instruction and can be used
for other purposes. The RAMPX register in the I/O area is updated in parts with more than
64K bytes data space or more than 64K bytes program memory, and the increment/ decre-
ment is added to the entire 24-bit address on such devices.
Flags: --•
Cycles: 2
(i)
(ii)
(iii)
Syntax:
ST X, Rr
ST X+, Rr
ST -X, Rr
Operation:
(X) + Rr
(X)-Rr X+ X+1
X=X-1(X) -Rr
Comment:
X: Unchanged
X: Postincremented
X: Predecremented
Example:
clr r27
Idi =26, $60
st X+,10
st X, r1
Idi 126, $63
st X,I2
st -X, I3
¡ Clear X high byte
; Set X low byte to $60
¡store 10 in data space 1oc. $60 (x post inc)
¡ Store Il in data space
: 1oc. $61
; Set X low byte to $63
¡ Store I2 in data space loc. $63
¡ Store r3 in data space loc. $62 (X pre dec)
ST (STD)
; Store Indirect From Register to Data Space
; using Index Y
Stores one byte indirect with or without displacement from a register to data space.
For parts with SRAM, the data space consists of the register file, I/O memory, and inter-
nal SRAM (and external SRAM if applicable). For parts without SRAM, the data space
consists of the register file only. The EEPROM has a separate address space.
The data location is pointed to by the Y (16 bits) pointer register in the register file.
Memory access is limited to the current data segment of 64K bytes. To access another data
segment in devices with more than 64K bytes data space, the RAMPY register in the I/O
area has to be changed.
The Y-pointer register can either be left unchanged by the operation, or it can be
post-incremented or pre-decremented. These features are especially suited for accessing
728



<!-- Page 736 -->
### [PDF Page 736]

arrays, tables, and stack pointer usage of the Y-pointer register. Note that only the low byte
of the Y-pointer is updated in devices with no more than 256 bytes data space. For such
devices, the high byte of the pointer is not used by this instruction and can be used for
other purposes. The RAMPY register in the I/O area is updated in parts with more than
64K bytes data space or more than 64K bytes program memory, and the increment/ decre-
ment/displacement is added to the entire 24-bit address on such devices.
Flags: --.
Cycles:2
(i)
(ii)
(iii)
(illi)
Syntax:
STY, Rr
ST Y+, Rr
ST -Y, Rr
STD Y + q, Rr
Operation:
(Y) - Rr
(Y) < RrY+Y+1
Y=Y - 1(Y)-Rr
(Y + 9) - Rr
Comment:
Y: Unchanged
Y: Postincremented
Y: Predecremented
Y: Unchanged
q: Displacement
Example:
clr 29
Idi I28, $60
st Y+, 10
st Y, I1
Idi r28, $63
st 7, 12
st -y, r3
std Y+2, 14
¡Clear I high byte
; Set I low byte to $60
¡ Store 10 in data space loc. $60
(Y postinc.)
¡ Store 11 in data space loc. $61
¡ Set Y low byte to $63
¡ Store 12 in data space 1oc. $63
¡ Store 13 in data space loc. $62
(y predec.)
¡ Store 14 in data space loc. $64
ST (STD)
; Store Indirect From Register to Data Space using Index Z
Stores one byte indirect with or without displacement from a register to data space.
For parts with SRAM, the data space consists of the register file, I/O memory, and inter-
nal SRAM (and external SRAM if applicable). For parts without SRAM, the data space
consists of the register file only. The EEPROM has a separate address space.
The data location is pointed to by the Z (16 bits) pointer register in the register file.
Memory access is limited to the current data segment of 64K bytes. To access another data
segment in devices with more than 64K bytes data space, the RAMPZ register in the I/O
area has to be changed.
The Z-pointer register can either be left unchanged by the operation, or it can be
post-incremented or pre-decremented. These features are especially suited for stack point-
er usage of the Z-pointer register; however, because the Z-pointer register can be used for
indirect subroutine calls, indirect jumps and table lookup, it is often more convenient to
use the X or Y-pointer as a dedicated stack pointer. Note that only the low byte of the Z-
pointer is updated in devices with no more than 256 bytes data space. For such devices,
the high byte of the pointer is not used by this instruction and can be used for other pur-
poses. The RAMPZ register in the I/O area is updated in parts with more than 64K bytes
data space or more than 64K bytes program memory, and the increment/decrement/dis-
placement is added to the entire 24-bit address on such devices.
Flags: ---.
Cycles: 2
APPENDIX A: AVR INSTRUCTIONS EXPLAINED
729



<!-- Page 737 -->
### [PDF Page 737]

(i)
(ii)
(iii)
(iiii)
Syntax:
ST Z, Rr
ST Z+, Rr
ST-Z, Rr
STD Z + q, Rr
Operation:
(2) -Rr
(2) < Rr Z< Z+1
Z< Z-1 (2) - Rr
(Z+9) - Rr
Comment:
Z: Unchanged
Z: Postincremented
Z: Predecremented
Z: Unchanged,
q: Displacement
Example:
clr r31
¡Clear Z high byte
Idi 130, $60
¡ Set 2 low byte to $60
st 2t, I0
; Store 10 in data space
loc. $60 (Z postinc.)
st 2, 11
¡ Store r1 in data space
1oc.
$61
Idi 130, $63
; Set Z low byte to $63
st 2,I2
¡ Store r2 in data space
loc. $63
st - 2,r3
¡ Store r3 in data space
loc.
$62 (Z predec.)
std 2+2, 14
¡ Store 14 in data space
loc. $64
STS K,Rr
; Store Direct to Data Space
05r ≤31,05k ≤ 65535
; (k) - Rr
Stores one byte from a register to the data space. For parts with SRAM, the data
space consists of the register file, 1/O memory, and internal SRAM (and external SRAM
if applicable). For parts without SRAM, the data space consists of the register file only.
The EEPROM has a separate address space.
A 16-bit address must be supplied. Memory access is limited to the current data
segment of 64K bytes. The STS instruction uses the RAMPD register to access memory
above 64K bytes. To access another data segment in devices with more than 64K bytes
data space, the RAMPD register in the I/O area has to be changed.
Flags:---.
Cycles: 2
Example:
Ids
r2, $FF00
; Load r2 with the contents of location $FF00
add
I2, Il
; Add rl to r2
sts
$FF00, I2
¡Write back

```assembly
SUB Ra,Rr
; Subtract without Carry
```

0≤d ≤31, 05r ≤ 31
; Rd - Rd - Rr
Subtracts two registers and places the result in the destination register Rd.
Flags: H, S, V, N, Z, C.
Cycles: 1
Example:
sub r13, =12
brne noteg
¡ Subtract r12 from r13
¡Branch if r12 not equal r13
noteg:
;Branch destination (do nothing)
SUBT RA,K
; Subtract Immediate
16≤d ≤ 31,0≤K ≤ 255
; Rd - Rd - K
Subtracts a register and a constant and places the result in the destination register
Rd. This instruction works on registers R16 to R31 and is very well suited for operations
on the X, Y, and Z-pointers.
Flags: H, S, V, N, Z, C.
Cycles: 1
730



<!-- Page 738 -->
### [PDF Page 738]

Example:
noteg:
subi 122, $11
brne noteg
пор
; Subtract $11 from 122
¡Branch if 122 not equal $11
; Branch destination (do nothing)
SWAP Rd
0≤d ≤ 31
; Swap Nibbles
; R(7:4) - Rd(3:0), R(3:0) - Rd(7:4)
Cycles: 1
Example:
inc rl
swap r1
inc rl
swap r1
; Increment 11
¡Swap high and low nibble of rl
¡ Increment high nibble of r1
¡Swap back
TST Ra
; Test for Zero or Minus
0≤ d ≤ 31
; Rd - Rd • Rd
Tests if a register is zero or negative. Performs a logical AND between a register
and itself. The register will remain unchanged.
Flags: S, V - 1, N, Z.
Cycles: 1
Example:
tst 10
breg zero
пор
; Test 10
¡Branch if r0=0
zero:
WDR
¡Branch destination (do nothing)
; Watchdog Reset
This instruction resets the watchdog timer. This instruction must be executed with-
in a limited time given by the WD prescaler.
Flags:-
Cycles: 1
Example:
war
; Reset watchdog timer
APPENDIX A: AVR INSTRUCTIONS EXPLAINED
731



<!-- Page 739 -->
### [PDF Page 739]

SECTION A.3: AVR REGISTER SUMMARY
Address
Name
Bit 7
Bit 6
Bit 5
Bit 4
Bit 3
Bit 2
Bit 1
Bit 0
S3F (SSF)
SREG
H
V
$3E ($5E)
SPH
SP11
N
SP10
SP9
SP8
$3D (SSD)
$3C ($5C)
SPL
SPI
SP6
SPS
SP4
SP3
SP2
SP1
SPO
_OCRO
Timer/Counter Output Compare Register
53B ($5B)
GICR
INT1
INTO
INT2
.....
IVSEL
$3A ($5A)
GIFR
INTF1
INTFO
INTF2
SI SAST SR
....
$39 ($59)
TIMSK
OCIE2
TOIE2
TICIE1
OCIE 1B
$38 ($58)
TIFR
OCF2
TOV2
OCIE1A
ICF1
OCF1A
TOIE1
OCIEO
TOLEO
OCF1B
TOV1
OCFO
_TOVO
537 (S57)
SPMCR
SPMIE
RWWSB
SAARWWSRE
TWCR
TWINT
TWSTA
BLBSET
PGWRI
PGERS
SPMEN
$36 ($56)
.535 ($55).
MCUCR
TWEA
SE
JTD
SM2
TWSTO
TWIC
TWEN
TWIE
SM1
SMO
ISC11
ISC10
ISCO1
ISCOO
$34 ($54)
MCUCSR
ISC2
STRE
COMOO
WDRF
BORF
EXTRF
PORF
$33 ($53)
TCCRO
FOCO
COM01
WGM01
CS01
$32 ($52)
TONTO
WGM00
Timer/Countero (8 Bits).
CS02
CS00
$31 ($51)
OSCCAL
Oscillator Calibration Register
$30 ($50)
OCDR
On-Chip Debug Register
SFOR
ADTSL
ADTS1
ADTSO
ACME
COM1A1
PUD
PSR2
$2F ($4F)
TCCRIA
PSR10
FOCIA
FOC1B
WGM11
WGM10
$2E (S4E)
TCCR1B
ICNC1
ICES1
WGM12
$2D ($4D)
TONTIH
CS12
CS11
CS10
Timer/Counter1 - Counter Register High Byte
$2C (S4C)
TCNT1L
Timer/Counter1 - Counter Register Low Byte
$2B ($4B)
OCRIAH
Timer/Countert - Output Compare Register A High Byte.
$2A ($4A)
OCR1AL
$29 ($49)
OCR1BH
Timer/Counter1 - Output Compare Register A Low Byte
Timer/Counter1 - Output Compare Register B High Byte
$28 ($48)
OCRIBL
Timer/Counter1 - Output Compare Register B Low Byte.
$27 ($47)
ICR1H
Timer/Counter1 - Input Capture Register High Byte
$26 ($46)
ICR1L
$25 ($45)
TCCR2
FOC2
WGM20
COM21
COM20 | WGM21
$24 ($44)
TCNT2
Timer/Counter218 Bits)
CS21
CS20
$23 ($43)
OCR2
Timer/Counter2 Output Compare Register
$22 (542)
ASSR
TCNZUB
OCRUB
TORZUB
$21 ($41)
WDTCR
$20 ($40)
UBRRH
URSEL
WDTOE
WDE
WDP2
WDP1
WDPO
UGSRC
UBRR[11:81
URSEL
UMSEL
USZO
UCPOL
$1F ($3F)
EEARH
EEARB
$1E ($3E)
EEARL.
EEDR
EEPROM Address Register Low Byte
EEARS
S1D (83D)
EEPROM Data Register
$1C ($3C)
EECR
$1B ($3B)
PORTA
PORTAZ
EEMWE
EEWE
EERE
PORTA6
PORTAS
$1A (53A)
DDRA
DOAT
DDAG
DDA3
DDAZ
PORTA1
DDA5
PORTA3
PORTAZ
PORTAO
DDAO
$19 ($39)

```c
PINA
```

$18 ($38)
PORT8
PINAZ
PINA6
PINAS
PINA4
PINA3
PINAZ
DDA1
PINA1
PINAO
PORTB7
PORTB6
PORTB5
PORTB4
PORTB3
PORTB2
PORTB1
PORTBO
$17 ($37)
DDRB
DDB7
DDB6
DDBS
DDB4
DDB3
DDB2
DDB1
DDBO
516 ($36)

```c
PINB
```

PINB7
PINB6
PINB5
PINB4
PINB3
PINB2
PINB1
PINBO
$15 ($35)
PORTC
PORTCT
PORTC6
PORTOS
PORTC4
PORTC3
PORTOZ
PORTC1
PORTCO
$14 ($34)
DDRC
DDC7
DDC6
DDCS
DDC4
DDC1
DDCO
$13 ($33)
PING
PINCT
PINCE
PINC5
PINCA
DDC3
PINC3
DDC2
PINCZ
PINC1
$12 ($32)
PINCO
PORTO
PORTD6
PORTDA
PORTD3
PORTD2
PORTD1
PORTDO
$11 ($31)
DDRD
PORTDI
DDD7
DDDE
PORTDS
DDOS
DDD4
DDD3
DDD2
_DDD1
DDDO
$10 ($30)

```c
PIND
```

PIND7
PINDE
PINDS
PINDA
SOF ($2F)
SPDR
PIND3
PIND2
PIND1
PINDO
S0E ($2E)
SPSR
SPIF
WCOL
SPIZX
SOD ($2D)
SPCR
SPIE
SPE
_MSTR|
SOC ($2C)
UDR
USART V/O Data Register
SPRO
SOB ($2B)
UCSRA
RXC
TXC
UDRE
U2X
SOA (S2A)
FE
DOR
PE
UCSRB
RACIE
UDRIE
509 ($29)
UBRRL
TXCIE
TXEN
UCSZ2
USART Baud Rate Register Low Byte
RXB8
TXB8
$08 ($28)
ACSR.
ACD
ACI
ACISO
SOT (827)
ADMUX
REFS1
ACBG
REFSO
ACO
ADLAR
MUX4
ACIE
MUX3
ACIC
MUX2
ACIS1
MUX1
MUXO
506 ($26)
ADCSRA
ADEN
ADSC
ADATE
ADIF
ADIE
ADPSZ
ADPS1
ADPSO
$05 ($25)
ADCH

```assembly
ADC Data Register High Byte
```

504($24)
ADCL

```assembly
ADC Data Register Low Byte
```

803 ($23)
TWDR
502(522
TWSR
TWST
Two-wire Serial Interface Data Register
TWS6
$01 ($21
TWAR
TWAS
TWA4
TWA3
TWA2
TWPS1
TWPSO
$00 ($20)
TWBR
TWA6
TWS5
TWS4
TWS3
TWA1
TWAO
TWGCE
Two-wire Serial interface Bit Rate Register
732


