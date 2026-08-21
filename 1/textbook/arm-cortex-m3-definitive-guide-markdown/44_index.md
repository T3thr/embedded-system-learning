# Index

> **Source PDF**: THE_DEFINITIVE_GUIDE_TO_THE_ARM_CORTEX-МЗ_Stellaris_MCU_9000Series_TEINSTRUMENTS_ARM_SECOND_EDITION.pdf  
> **PDF Page Range**: 526 - 531


---


<!-- Page 526 -->
### [PDF Page 526]

Copyright © 2010, Elsevier Inc. All rights reserved.
DOI: 10.1016/B978-0-12-382091-4.00041-4
A
AAPCS (Procedure Call Standard for ARM Architecture),
159, 204
assembly code and C program interactions, 170
double-word stack alignment, 204
Access port (AP), 245
AFSR (Auxiliary Fault Status Register), 126, 416, 421
AHB (Advanced High-performance Bus), 80, 101, 146, 207
AHB-AP, 102, 245, 264–265
AHB-to-APB, 102, 107
in BE-8 Big Endian mode, 95, 96
BusMatrix, 102, 105–107
error responses, causes, 121
in word-invariant big endian, 95, 96
AIRCR (NVIC Application Interrupt and Reset Control
­Register), 113, 125, 241, 254, 412
AMBA (Advanced Microcontroller Bus Architecture), 101, 244
APB (Advanced Peripheral Bus), 80, 101, 104, 244
APB-AP, 246
API (Application Programming Interface), 126, 193
APSR (Application Program Status Register), 29, 279, 358,
359
flag bits for conditional branches, 62
and MSR instruction, 29, 55
signed saturation results, 69
updating instructions, 58
with traditional Thumb instruction syntax, 45
ARM Architecture Reference Manual, The, 8
ATB (Advanced Trace Bus), 103, 246, 255, 256
ATB funnel, 246, 256
Auxiliary Control Register, 275, 277, 281
B
Background region (MPU), 212, 225
BASEPRI, 16, 30
special register, 136–137
use, 31
BFAR (Bus Fault Address Register), 122, 421
BFSR (Bus Fault Status Register), 121, 122, 152, 153,
415, 426
Big Endian
in ARM7, 95, 96, 284
in Cortex-M3, 95, 96
memory views, 95
Bit band
alias, 79, 80, 289
vs. bit bang, 87
operations, 84–91
semaphore operation, 179–180
Breakpoint, 21, 262
in cortex-M3, 251–253
and Flash Patch, 21, 103, 253, 255, 262–264
Insert/Remove breakpoint, 323
Bus Fault, 121–122
precise and imprecise, 122
stacking error, 152
status register, 121, 122, 152, 153, 415, 426
unstacking error, 153
BusMatrix, 102, 105–107
Byte-invariant big endian, 95, 96
C
CFSR (Configurable Fault Status Register), 421
CMSIS (Cortex Microcontroller Software Interface
Standard), 67, 95, 164–165, 185
areas of standardization, 165–166
benefit of, 168–169
core access functions, 186, 439–445
example, 168
intrinsic functions, 167, 444–445
MPU register names in, 218
organization of, 166
port existing applications using, 334
stopwatch example with interrupts, 327–333
Context Switching, 127
example, 128
in simple OS, 203
CONTROL (one of the special registers), 14, 31–32
CoreSight architecture, 21, 255
debugging hardware, 21

### overview, 244–248

Cortex-A8, 5, 7
Cortex-M0, 278–281, 444
Cortex-M3
advantages, 1–2, 18, 22–24, 277–278
applications, 9, 334
barrier instructions, 67
bit-band operation
advantages, 87–90
in C programs, 90
of different data sizes, 90
breakpoint instruction in, 251–253
bus faults, 121
bus interfaces on, 17–18, 104–105
connection of AHB-AP in, 265
data transfers, 53
debugging components, 11
debugging features, 243
Index
499



<!-- Page 527 -->
### [PDF Page 527]

500
Index
debugging functions in, 244
debugging support, 21–22
debug modes in, 248–250
debug systems in, 247
default configuration, 83
default ROM table values, 266
differences between Cortex-M0, 278–281
differences among other versions, 272–277
ETM in, 260–261
exception types and enables, 407–408
instructions, 19, 57, 58, 60, 70, 349
interrupt and exceptions, 19–21, 35–36
linker script for, 433–437
link register (LR), 28
memory attributes 82–83
memory map, 16–17, 79–82
MPU, 18
registers, 212–217
multiprocessor communication, 236–241
nested interrupt support in, 148
NVIC in, 15–16
operation modes, 14–15, 32–34, 285
priority levels, 111–116
privilege levels in, 15
processor-based microcontrollers, 2
program counter, 28
registers, 12–14, 25–26, 29–32
reset types and signals on, 107–108
simple timer, 141
sleep modes, 232–234
stack memory operations, 36–40
stack pointer (SP) in, 26–28
supporting endian modes, 95–97
tail chaining interrupt, 148–149
three-stage pipeline in, 99–101
trace interfaces in, 246
trace system in, 255–256
troubleshooting guide, 421
unaligned transfers in, 92–93
vector table definition in CS3, 302
vs. Cortex-M3-based MCUs, 3
Cortex-R4, 5, 7
CPI (Cycle Per Instruction), 257
CS3, 301, 302
CYCCNT (Cycle Counter in DWT), 256, 257
D
DAP (Debug Access Port), 21, 102, 104, 244, 245
D-Code bus, 17, 103, 273
Data abort, 121
Debug registers
DCRDR (Debug Core Register Data Register), 253,
254, 419
DCRSR (Debug Core Register Selector Register), 253,
254, 419
DEMCR (Debug Exception and Monitor Control Register),
249, 250, 419–420
DFSR (Debug Fault Status Register), 252, 254, 416, 428
DHCSR (Debug Halting Control and Status Register), 248,
249, 418
DP (Debug Port), 21, 244, 245
DWT (Data Watchpoint and Trace unit), 21, 80, 102, 256–258
and ETM, 260
and ITM, 260
E
Embedded Assembler, 163–164, 197, 288, 423
EPSR (Execution Program Status Register), 29, 152
ETM (Embedded Trace Macrocell), 21, 80, 102, 246, 256,
260–261, 267
Exception exit, 119, 147–148
Exception Return, 148, 149–151
Exceptions
ARM7TDMI mapping, 285
configuration registers, 137–138
exception handler, 14, 33, 88, 117, 121, 147, 149, 189,
327
exits, 147–148
fault exceptions, 120–126
handling, 19, 36, 125, 148, 149, 152, 204
and interrupts, 19–21, 35
PendSV, 126–129
PRIMASK register, 135–136
priority levels, 111–117
priority setup, 185
register updates, 147
return value, 149–151
stacking, 145–147, 408
SVC, 126–129
SYSTICK, 141, 229, 232, 328
types, 35, 109–111, 407
vector, 117, 147
vector table, 36, 117–118
Exclusive accesses, 93–95
for semaphores, 177–179
EXC_RETURN, 147, 149–151, 153, 202
F
FAULTMASK, 14, 16, 30, 31, 135–136, 210
FPB (Flash Patch and Breakpoint Unit), 21, 103, 253,
255, 262–264
H
Halt mode debug, 250, 251, 254
Hard fault
avoiding lockup, 210
Cortex-M3 Continued



<!-- Page 528 -->
### [PDF Page 528]

501
Index
priority level, 111
status register, 125, 416, 428
HFSR (Hard Fault Status Register), 125, 416, 428
High registers, 25
I
I-Code interface bus, 17, 103
ICI (Interrupt-Continuable Instructions)
bit field in PSR, 30
Inline assembler, 163–164, 198–199, 288, 305
Instruction Barrier (ISB), 67
Instruction trace, 12, 21
ETM, 102, 260
Instrumentation Trace, 172
Intellectual property (IP) licensing, 3
Interrupt latency, 16, 22, 23, 152, 207
Interrupt return, 147–148, 284, 287
Intrinsic functions, 135, 163, 165, 167,
444–445
IPSR (Interrupt Program Status Register), 29, 168, 206
IRQ (Interrupt Request), 20, 131, 189
IT (IF-THEN), 65, 152, 393–394
assembler language, 65–66
Thumb-2 instructions, 70–72
ITM (Instrumentation Trace Macrocell)
ATB interface, 105
debugging component, 22, 258–260
functionalities, 258–259
hardware trace, 260
software trace, 259
timestamp feature, 260
L
LabVIEW, 335–336
for ARM porting, 345–347
application areas, 337
development of, 337–339

### features in, 344–345

project, example of, 339–343
working, 343–344
Literal pool, 263
Load/store operations, 84, 152, 287, 427
Lockup, 422
situations, 208–210
Low registers, 25
LR (link register), 149
branch and link instructions, 60
R14, 13, 28
saving, 62
stacking, 145, 146
update, 147, 149
value, 421
LSU (Load Store Unit), 257
M
Memory Barrier Instructions, 67
Memory Management fault, 122–123, 137
MMAR, 416, 421
and MPU violation, 152, 218
status register, 415
Memory Map, 16–17, 67, 79–82, 83, 103, 161–163, 211,
284, 325
MFSR (Memory-management Fault Status Register), 123,
152, 426
MMAR (Memory-management Fault Address Register),
416, 421
Monitor exception, 21, 35, 110, 248, 251–253
MPU (Memory Protection Unit), 6, 9, 11, 18, 83, 102,
122, 211
registers, 212–217
setup, 218–224
system characteristics, 285
MSP (Main Stack Pointer), 12, 26, 28, 39, 40, 145, 183
MSTKERR (Memory Management Stacking Error), 152,
426
MUNSTKERR (Memory Management Unstacking Error),
153, 426
N
NMI (nonmaskable interrupt), 2, 23, 35
double fault situations, 209
and FIQ, 286
Nonbase Thread Enable, 205–206, 413
NVIC (Nested Vectored Interrupt Controller), 131
accessing, 186
and CPU core, 101–103
DCRDR, 253, 254
DCRSR, 253, 254
debugging features, 254
enabling and disabling interrupts, 187
fault status register, 121–122, 123, 124

### features, 15–16

registers, 409
ROM table, 265–266
SCS, 81, 131
System Control register, 232
SYSTICK registers, 141–143, 229
P
PC (Program Counter)
R15, 13, 28
register updation, 147
stacked PC, 421
value, 288
PendSV
context switching, 128
and SVC, 126–129



<!-- Page 529 -->
### [PDF Page 529]

502
Index
Pipeline, 99–100, 288
PPB (Private Peripheral Bus), 18
AHB, 80
APB, 80
external PPB, 104–105
Preempt Priority, 113, 114, 115, 116
Prefetch abort, 121
PRIMASK, 29, 135–136, 178
function, 14
interrupt masking, 16, 30, 31
Priority Group, 113, 114, 115, 116, 132, 193
Privileged mode, 70, 131, 178, 205
Profiling (Data Watchpoint and Trace unit),
256–258
PSP (Process Stack Pointer)
ARM documentation, 26, 28
MRS and MSR instructions, 40
stacking, 145
two-stack model, 39–41
PSR (Program Status register), 29, 145
APSR, 29
bit fields, 30
EPSR, 29
flags, 62
IPSR, 29, 146, 147
Q
Q flag, 62, 69, 387
R
R13/SP, 28
Real time, 4
Reset
control, 254
fault handling method, 125
self-reset control, 241–242
signals, 107–108
vector, 41, 46, 295
Reset sequence, 41–42
Retargeting, 302–304, 315, 317
ROM Table, 103, 265–267
RXEV (Receive Event), 232, 237
S
Saturation
instructions, 68, 69
operation, 68–70
Semaphores
bit band, usage, 179–180
exclusive access, usage, 93, 177–179, 287
Serial-Wire Viewer, 172, 257
Serial-Wire, 102, 244, 245
Sleep modes, 20, 23, 232–234, 276
Sleep-On-Exit, 234
Software Trace (Instrumentation Trace
Macrocell), 259
Special registers, 14, 29, 70
accessing, 304
BASEPRI, 14, 30–31, 136–137
control register, 31–32
FAULTMASK, 14, 30–31, 135–136
for MRS and MSR instructions, 71
PRIMASK, 14, 30–31, 135–136
PSRs, 29–30
Stack alignment, 204, 275, 277
Stack Pointer (SP), 204, 206
R13, 12, 26–28
stack memory operations, 36
types, 26, 39
updating, 147
Stacking
error, 152
exception sequence, 145–147
STIR (Software Trigger Interrupt register), 131, 141, 420
STKERR (stacking error), 152
Subpriority, 113, 114
Subregion, 215, 225
SVC (Supervisor Call), 126–129, 193, 206, 210
handler, 205
for output functions, 194–197
and SWI, 127
user applications, 193–194
using with C, 197–199
SWI (Software Interrupt Instruction), 127, 287
SWJ-DP, Serial Wire JTAG – Debug Port, 21, 102, 274
System Control register, 233, 413
System Control Space (SCS), 32, 81, 131
SYSTICK
context switching, 127
registers, 141–143
stopwatch, example, 328
Timer, 102, 141–143, 229–232, 277
T
Table Branch, 75–77, 181
and SVC, 194
Timestamp, 260
TPIU (Trace Port Interface Unit), 21, 103, 246,
255, 261
Trace Enable (TRCENA), 256
debug, 250
in DEMCR, 259, 262
TXEV (Transmit Event), 105, 236
U
UFSR (Usage Fault Status Register), 124, 415, 427–428
Unaligned transfers, 92–93
and D-Code bus, 103



<!-- Page 530 -->
### [PDF Page 530]

503
Index
Unified Assembler Language (UAL), 49–50
Unstacking
and bus fault, 121
error, 153
interrupt return instruction, 147–148
UNSTKERR (Unstacking error), 153
Usage fault, 123–124, 137, 153
User mode, 131, 205
V
Vector catch (Debug event), 249
Vector fetch, 121, 147, 153, 207
Vector Table Offset register, 117, 132, 279, 412
Vector table relocation, 190–193
Vector table, 36, 190
and exceptions, 117–118
difference in traditional ARM cores, 286
modification, 326–327
remapping, 284
setup and enabling interrupt, 184–188
Virtual instrument (VI), 336, 337, 339, 340, 346
W
WIC (Wakeup Interrupt Controller), 21, 102, 234–236,
276, 277
Word-invariant big endian, 95, 96
X
xPSR – combined Program Status Register (PSR), 14,
29, 204, 287



<!-- Page 531 -->
### [PDF Page 531]

This page intentionally left blank


