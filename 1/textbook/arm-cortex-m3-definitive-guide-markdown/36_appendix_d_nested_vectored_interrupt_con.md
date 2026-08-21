# Appendix D Nested Vectored Interrupt Controller and System Control Block Registers Quick Reference

> **Source PDF**: THE_DEFINITIVE_GUIDE_TO_THE_ARM_CORTEX-МЗ_Stellaris_MCU_9000Series_TEINSTRUMENTS_ARM_SECOND_EDITION.pdf  
> **PDF Page Range**: 436 - 447


---


<!-- Page 436 -->
### [PDF Page 436]

409
D
Appendix
Nested Vectored Interrupt
Controller and System Control
Block Registers Quick Reference
Table D.1  Interrupt Controller Type Register (0xE000E004)
Bits
Name
Type
Reset Value
Description
4:0
INTLINESNUM
R
—
Number of interrupt inputs in steps
of 32
0 = 1–32
1 = 33–64
…
Table D.2  Auxiliary Control Register (0xE000E008)
Bits
Name
Type
Reset Value
Description
2
DISFOLD
R/W
0
When this bit is set, it disables the overlapping of
the IT execution cycle with another instruction. The
overlapping (called IT folding) is an optimization to
allow faster execution of conditional execution.
1
DISDEFWBUF
R/W
0
When this bit is set, it disables the use of write buffers
within the processor so that an instruction following a
store instruction must not start until the store operation
is completed. This bit does not affect write buffer
outside the processor (e.g., in bus bridge).
0
DISMCYCINT
R/W
0
When this bit is set, it disables interruption of
multicycle instructions.
Note: The Auxiliary Control register is available from Cortex™-M3 revision 2.
Table D.3  SYSTICK Control and Status Register (0xE000E010)
Bits
Name
Type
Reset Value
Description
16
COUNTFLAG
R
0
Read as 1 if counter reaches 0 since this is the last
time this register is read. Clear to 0 automatically
when read or when current counter value is cleared.
2
CLKSOURCE
R/W
0
0 = External reference clock (STCLK)
1 = Use core clock
1
TICKINT
R/W
0
1 = Enable SYSTICK interrupt generation when
SYSTICK timer reaches 0
0 = Do not generate interrupt
0
ENABLE
R/W
0
SYSTICK timer enable



<!-- Page 437 -->
### [PDF Page 437]

410
APPENDIX D
Table D.4  SYSTICK Reload Value Register (0xE000E014)
Bits
Name
Type
Reset Value
Description
23:0
RELOAD
R/W
0
Reload value when timer reaches 0.
Table D.5  SYSTICK Current Value Register (0xE000E018)
Bits
Name
Type
Reset Value
Description
23:0
CURRENT
R/Wc
0
Read to return current value of the timer.
Write to clear counter to 0; clearing of current value
should also clear COUNTFLAG in SYSTICK Control and
Status register.
Table D.6  SYSTICK Calibration Value Register (0xE000E01C)
Bits
Name
Type
Reset Value
Description
31
NOREF
R
—
1 = No external reference clock (STCLK not available)
0 = External reference clock available
30
SKEW
R
—
1 = Calibration value is not exactly 10 ms
0 = Calibration value is accurate
23:0
TENMS
R/W
0
Calibration value for 10 ms. SoC designer should provide
this value through Cortex-M3 input signals. If this value is
read as 0, it means calibration value is not available.
Table D.7  External Interrupt SETEN Registers (0xE000E100-0xE000E11C)
Address
Name
Type
Reset Value
Description
0xE000E100
SETENA0
R/W
0
Enable for external Interrupt #0–#31
bit[0] for Interrupt #0
bit[1] for Interrupt #1
…
bit[31] for Interrupt #31
0xE000E104
SETENA1
R/W
0
Enable for external Interrupt #32–#63
…
…
…
…
…
Table D.8  External Interrupt CLREN Registers (0xE000E180-0xE000E19C)
Address
Name
Type
Reset Value
Description
0xE000E180
CLRENA0
R/W
0
Clear Enable for external Interrupt #0–#31
bit[0] for Interrupt #0
bit[1] for Interrupt #1
…
bit[31] for Interrupt #31
0xE000E184
CLRENA1
R/W
0
Clear Enable for external Interrupt #32–#63
…
…
…
…
…



<!-- Page 438 -->
### [PDF Page 438]

411
NVIC and SCB Registers Quick Reference
Table D.9  External Interrupt SETPEND Registers (0xE000E200-0xE000E21C)
Address
Name
Type
Reset Value
Description
0xE000E200
SETPEND0
R/W
0
Pending for external Interrupt #0–#31
bit[0] for Interrupt #0
bit[1] for Interrupt #1
…
bit[31] for Interrupt #31
0xE000E204
SETPEND1
R/W
0
Pending for external Interrupt #32–#63
…
…
…
…
…
Table D.10  External Interrupt CLRPEND Registers (0xE000E280-0xE000E29C)
Address
Name
Type
Reset Value
Description
0xE000E280
CLRPEND0
R/W
0
Clear Pending for external Interrupt #0–#31
bit[0] for Interrupt #0
bit[1] for Interrupt #1
…
bit[31] for Interrupt #31
0xE000E284
CLRPEND1
R/W
0
Clear Pending for external Interrupt #32–#63
…
…
…
…
…
Table D.11  External Interrupt ACTIVE Registers (0xE000E300-0xE000E31C)
Address
Name
Type
Reset Value
Description
0xE000E300
ACTIVE0
R
0
Active status for external Interrupt #0–#31
bit[0] for Interrupt #0
bit[1] for Interrupt #1
…
bit[31] for Interrupt #31
0xE000E304
ACTIVE1
R
0
Active status for external Interrupt #32–#63
…
…
…
…
…
Table D.12  External Interrupt Priority Level Register (0xE000E400-0xE000E4EF; listed
as byte addresses)
Address
Name
Type
Reset Value
Description
0xE000E400
PRI_0
R/W
0
Priority level external Interrupt #0
0xE000E401
PRI_1
R/W
0
Priority level external Interrupt #1
…
…
…
…
…
0xE000E41F
PRI_31
R/W
0
Priority level external Interrupt #31
…
…
…
…
…



<!-- Page 439 -->
### [PDF Page 439]

412
APPENDIX D
Table D.13  CPU ID Base Register (address 0xE000ED00)
Bits
Name
Type
Reset Value
Description
31:24
IMPLEMENTER
R
0x41
Implementer code; ARM is 0x41
23:20
VARIANT
R
0x0/0x1/0x2
Implementation defined variant number
19:16
Constant
R
0xF
Constant
15:4
PARTNO
R
0xC23
Part number
3:0
REVISION
R
0x0/0x1
Revision code
Table D.14  Interrupt Control and State Register (0xE000ED04)
Bits
Name
Type
Reset Value
Description
31
NMIPENDSET
R/W
0
NMI Pended
28
PENDSVSET
R/W
0
Write 1 to pend system call;
Read value indicates pending status
27
PENDSVCLR
W
0
Write 1 to clear PendSV pending status
26
PENDSTSET
R/W
0
Write 1 to pend SYSTICK exception;
Read value indicates pending status
25
PENDSTCLR
W
0
Write 1 to clear SYSTICK pending status
23
ISRPREEMPT
R
0
Indicates that a pending interrupt is going to be
active in next step (for debug).
22
ISRPENDING
R
0
External Interrupt Pending (excluding system
exceptions like NMI for fault)
21:12
VECTPENDING
R
0
Pending ISR number
11
RETTOBASE
R
0
Set to 1 when the processor is running an
exception handler and will return to thread level if
interrupt return and no other exceptions pending
8:0
VECTACTIVE
R
0
Current running interrupt service routine
Table D.15  Vector Table Offset Register (address 0xE000ED08)
Bits
Name
Type
Reset Value
Description
29
TBLBASE
R/W
0
Table base in Code (0) or RAM (1) memory region
28:7
TBLOFF
R/W
0
Table offset value from Code region or RAM region
Table D.16  Application Interrupt and Reset Control Register (address 0xE000ED0C)
Bits
Name
Type
Reset Value
Description
31:16
VECTKEY
R/W
—
Access key; 0x05FA must be written to this field
to write to this register, otherwise the write will be
ignored. The read back value is 0xFA05.
15
ENDIANESS
R
—
Indicates endianness for data: 1 for big endian (BE8)
and 0 for little endian. This can only change after a reset.



<!-- Page 440 -->
### [PDF Page 440]

413
NVIC and SCB Registers Quick Reference
Table D.16  Application Interrupt and Reset Control Register (address 0xE000ED0C)  Continued
Bits
Name
Type
Reset Value
Description
10:8
PRIGROUP
R/W
0
Priority group
2
SYSRESETREQ
W
—
Request chip control logic to generate a reset
1
VECTCLRACTIVE
W
—
Clear all active state information for exceptions;
typically used in debug or OS to allow system to
recover from system error (Reset is safer).
0
VECTRESET
W
—
Reset Cortex-M3 (except debug logic); but this
will not reset circuits outside the processor.
Table D.17  System Control Register (0xE000ED10)
Bits
Name
Type
Reset Value
Description
4
SEVONPEND
R/W
0
Send Event on Pending. Wake up from WFE if a
new interrupt is pended regardless of whether the
interrupt has priority higher than current level.
3
Reserved
—
—
—
2
SLEEPDEEP
R/W
0
Enable SLEEPDEEP output signal when entering
sleep mode.
1
SLEEPONEXIT
R/W
0
Enable Sleep on Exit feature
0
Reserved
—
—
—
Table D.18  Configuration Control Register (0xE000ED14)
Bits
Name
Type
Reset Value
Description
9
STKALIGN
R/W
0 or 1
Force exception stacking start in double word
aligned address. This bit is reset as zero on
Cortex-M3 revision 1, and is reset as one
on revision 2. Revision 0 does not have this
feature.
8
BFHFNMIGN
R/W
0
Ignore data bus fault during hard fault and
NMI handlers.
7:5
Reserved
—
—
Reserved
4
DIV_0_TRP
R/W
0
Trap on divide by 0
3
UNALIGN_TRP
R/W
0
Trap on unaligned accesses
2
Reserved
—
—
Reserved
1
USERSETMPEND
R/W
0
If set to 1, allow user code to write to
Software Trigger Interrupt register
0
NONBASETHRDENA
R/W
0
Nonbase Thread Enable. If set to 1, allows
exception handler to return to thread state
at any level by controlling return value.



<!-- Page 441 -->
### [PDF Page 441]

414
APPENDIX D
Table D.19  System Exceptions Priority Level Register (0xE000ED18–0xE000ED23; listed
as byte addresses)
Address
Name
Type
Reset Value
Description
0xE000ED18
PRI_4
R/W
0
Priority level for memory management fault
0xE000ED19
PRI_5
R/W
0
Priority level for bus fault
0xE000ED1A
PRI_6
R/W
0
Priority level for usage fault
0xE000ED1B
—
—
—
—
0xE000ED1C
—
—
—
—
0xE000ED1D
—
—
—
—
0xE000ED1E
—
—
—
—
0xE000ED1F
PRI_11
R/W
0
Priority level for SVC
0xE000ED20
PRI_12
R/W
0
Priority level for debug monitor
0xE000ED21
—
—
—
—
0xE000ED22
PRI_14
R/W
0
Priority level for PendSV
0xE000ED23
PRI_15
R/W
0
Priority level for SYSTICK
Table D.20  System Handler Control and State Register (0xE000ED24)
Bits
Name
Type
Reset Value
Description
18
USGFAULTENA
R/W
0
Usage Fault Handler Enable
17
BUSFAULTENA
R/W
0
Bus Fault Handler Enable
16
MEMFAULTENA
R/W
0
Memory Management Fault Enable
15
SVCALLPENDED
R/W
0
SVC pended; SVC is started but was replaced
by a higher priority exception
14
BUSFAULTPENDED
R/W
0
Bus fault pended; bus fault is started, but was
replaced by a higher priority exception
13
MEMFAULTPENDED
R/W
0
Memory management fault pended; memory
management fault started but was replaced by
a higher priority exception
12
USGFAULTPENDED
R/W
0
Usage fault pended; usage fault started but was
replaced by a higher-priority exceptiona
11
SYSTICKACT
R/W
0
Read as 1 if SYSTICK exception is active
10
PENDSVACT
R/W
0
Read as 1 if PendSV exception is active
8
MONITORACT
R/W
0
Read as 1 if debug monitor exception is active
7
SVCALLACT
R/W
0
Read as 1 if SVC exception is active
3
USGFAULTACT
R/W
0
Read as 1 if usage fault exception is active
1
BUSFAULTACT
R/W
0
Read as 1 if bus fault exception is active
0
MEMFAULTACT
R/W
0
Read as 1 if memory management fault is active
a Bit 12 (USGFAULTPENDED) is not available on revision 0 of Cortex-M3 processor.



<!-- Page 442 -->
### [PDF Page 442]

415
NVIC and SCB Registers Quick Reference
Table D.21  Memory Management Fault Status Register (0xE000ED28; byte size)
Bits
Name
Type
Reset Value
Description
7
MMARVALID
—
0
Indicates MMAR is valid
6:5
—
—
—
—
4
MSTKERR
R/Wc
0
Stacking error
3
MUNSTKERR
R/Wc
0
Unstacking error
2
—
—
—
—
1
DACCVIOL
R/Wc
0
Data access violation
0
IACCVIOL
R/Wc
0
Instruction access violation
Table D.22  Bus Fault Status Register (0xE000ED29; byte size)
Bits
Name
Type
Reset Value
Description
7
BFARVALID
—
0
Indicates BFAR is valid
6:5
—
—
—
—
4
STKERR
R/Wc
0
Stacking error
3
UNSTKERR
R/Wc
0
Unstacking error
2
IMPREISERR
R/Wc
0
Imprecise data access violation
1
PRECISERR
R/Wc
0
Precise data access violation
0
IBUSERR
R/Wc
0
Instruction access violation
Table D.23  Usage Fault Status Register (0xE000ED2A; half word size)
Bits
Name
Type
Reset Value
Description
9
DIVBYZERO
R/Wc
0
Indicates divide by zero takes place (can only be set
if DIV_0_TRP is set)
8
UNALIGNED
R/Wc
0
Indicates unaligned access takes place (can only be
set if UNALIGN_TRP is set)
7:4
—
—
—
—
3
NOCP
R/Wc
0
Attempts to execute a coprocessor instruction
2
INVPC
R/Wc
0
Attempts to do exception with bad value in
EXC_RETURN number
1
INVSTATE
R/Wc
0
Attempts to switch to invalid state (e.g., ARM)
0
UNDEFINSTR
R/Wc
0
Attempts to execute an undefined instruction



<!-- Page 443 -->
### [PDF Page 443]

416
APPENDIX D
Table D.25  Debug Fault Status Register (0xE000ED30)
Bits
Name
Type
Reset Value
Description
4
EXTERNAL
R/Wc
0
EDBGRQ signal asserted
3
VCATCH
R/Wc
0
Vector fetch occurred
2
DWTTRAP
R/Wc
0
DWT match occurred
1
BKPT
R/Wc
0
BKPT instruction executed
0
HALTED
R/Wc
0
Halt requested in NVIC
Table D.26  Memory Manage Address Register MMAR (0xE000ED34)
Bits
Name
Type
Reset Value
Description
31:0
MMAR
R
—
Address that caused memory manage fault
Table D.27  Bus Fault Manage Address Register BFAR (0xE000ED38)
Bits
Name
Type
Reset Value
Description
31:0
BFAR
R
—
Address that caused bus fault
Table D.28  Auxiliary Fault Status Register (0xE000ED3C)
Bits
Name
Type
Reset Value
Description
31:0
Vendor controlled
R/Wc
0
Vendor controlled (optional)
Table D.29  MPU Type Register (0xE000ED90)
Bits
Name
Type
Reset Value
Description
23:16
IREGION
R
—
Number Instruction region
Because ARM v7-M architecture uses a unified MPU,
this is always 0.
15:8
DREGION
R
—
Number of regions supported by this MPU
0
SEPARATE
R
—
This is always 0 as the MPU is always unified.
Table D.24  Hard Fault Status Register (0xE000ED2C)
Bits
Name
Type
Reset Value
Description
31
DEBUGEVT
R/Wc
0
Indicates hard fault is triggered by debug event
30
FORCED
R/Wc
0
Indicates hard fault is taken because of bus fault/
memory management fault/usage fault
29:2
—
—
—
—
1
VECTBL
R/Wc
0
Indicates hard fault is caused by failed vector fetch
0
—
—
—
—



<!-- Page 444 -->
### [PDF Page 444]

417
NVIC and SCB Registers Quick Reference
Table D.30  MPU Control Register (0xE000ED94)
Bits
Name
Type
Reset Value
Description
2
PRIVDEFENA
R/W
0
Privileged Default memory map enable
1
HFNMIENA
R/W
0
If set to 1, it enables MPU during hard fault
handler and NMI handler. Otherwise, the MPU is
not enabled for hard fault handler and NMI.
0
ENABLE
R/W
0
Enable the MPU if set to 1.
Table D.31  MPU Region Number Register (0xE000ED98)
Bits
Name
Type
Reset Value
Description
7:0
REGION
R/W
0
Select which region is being programmed
Table D.32  MPU Region Base Address Register (0xE000ED9C)
Bits
Name
Type
Reset Value
Description
31:N
ADDR
R/W
0
Base address of the region. N is dependent on the
region size.
4
VALID
R/W
0
If this is 1, the region defined in bit[3:0] will be used
in this programming step, otherwise, the region
selected by MPU Region Number register is used.
3:0
REGION
R/W
0
This field overrides MPU Region Number register if
VALID is 1, otherwise, this is ignored.
Table D.33  MPU Region Base Attribute and Size Register (0xE000EDA0)
Bits
Name
Type
Reset Value
Description
31:29
Reserved
—
—
28
XN
R/W
0
Instruction access disable (1 = Disable)
27
Reserved
—
—
26:24
AP
R/W
000
Data access permission field
23:22
Reserved
—
—
21:19
TEX
R/W
000
Type extension field
18
S
R/W
—
Shareable
17
C
R/W
—
Cacheable
16
B
R/W
—
Bufferable
15:8
SRD
R/W
0x00
Sub region disable
7:6
Reserved
—
—
5:1
REGION SIZE
R/W
—
MPU protection region size
0
ENABLE
R/W
0
Region enable



<!-- Page 445 -->
### [PDF Page 445]

418
APPENDIX D
Table D.34  MPU Alias Registers (0xE000EDA4–0xE000EDB8)
Address
Name
Description
0xE000EDA4
Alias of D9C
MPU Alias 1 Region Base Address register
0xE000EDA8
Alias of DA0
MPU Alias 1 Region Attribute and Size register
0xE000EDAC
Alias of D9C
MPU Alias 2 Region Base Address register
0xE000EDB0
Alias of DA0
MPU Alias 2 Region Attribute and Size register
0xE000EDB4
Alias of D9C
MPU Alias 3 Region Base Address register
0xE000EDB8
Alias of DA0
MPU Alias 3 Region Attribute and Size register
Table D.35  Debug Halting Control and Status Register (0xE000EDF0)
Bits
Name
Type
Reset Value
Description
31:16
KEY
W
—
Debug key; value of 0xA05F must be written
to this field to write to this register, otherwise,
the write will be ignored.
25
S_RESET_ST
R
—
Core has been reset or is being reset. This
bit is cleared on read.
24
S_RETIRE_ST
R
—
Instruction is completed since last read. This
bit is cleared on read.
19
S_LOCKUP
R
—
When this bit is 1, the core is in locked-up
state.
18
S_SLEEP
R
—
When this bit is 1, the core is in sleep mode.
17
S_HALT
R
—
When this bit is 1, the core is halted.
16
S_REGRDY
R
—
Register read/write operation is completed.
15:6
Reserved
—
—
Reserved
5
C_SNAPSTALL
R/W
—
Used to break a stalled memory access
4
Reserved
—
—
Reserved
3
C_MASKINTS
R/W
—
Mask interrupts while stepping; can only be
modified when the processor is halted.
2
C_STEP
R/W
—
Single step the processor, valid only if
C_DEBUGEN is set.
1
C_HALT
R/W
—
Halt the processor core, valid only if
C_DEBUGEN is set.
0
C_DEBUGEN
R/W
—
Enable halt mode debug



<!-- Page 446 -->
### [PDF Page 446]

419
NVIC and SCB Registers Quick Reference
Table D.36  Debug Core Register Selector Register (0xE000EDF4)
Bits
Name
Type
Reset Value
Description
16
REGWnR
W
—
Direction of data transfer
Write = 1, Read = 0
15:5
Reserved
—
—
—
4:0
REGSEL
W
—
Register to be accessed
00000 = R0
00001 = R1
…
01111 = R15
10000 = xPSR/Flags
10001 = MSP (Main Stack Pointer)
10010 = PSP (Process Stack Pointer)
10100 = Special registers:
[31:24] CONTROL,
[23:16] FAULTMASK,
[15:8] BASEPRI,
[7:0] PRIMASK.
Others values are reserved
Table D.37  Debug Core Register Data Register (0xE000EDF8)
Bits
Name
Type
Reset Value
Description
31:0
Data
R/W
—
Data register to hold register read result or to
write data into the selected register.
Table D.38  Debug Exception and Monitor Control Register (0xE000EDFC)
Bits
Name
Type
Reset Value
Description
24
TRCENA
R/W
0
Trace system enable; to use DWT, ETM, ITM,
and TPIU, this bit must be set to 1.
23:20
Reserved
—
—
Reserved
19
MON_REQ
R/W
0
Indication that the debug monitor is caused by
a manual pending request rather than hardware
debug events.
18
MON_STEP
R/W
0
Single step the processor; valid only if MON_EN
is set.
17
MON_PEND
R/W
0
Pend the monitor exception request; the core
will enter monitor exception when priority is
allowed.
16
MON_EN
R/W
0
Enable the debug monitor exception
15:11
Reserved
—
—
Reserved
Continued



<!-- Page 447 -->
### [PDF Page 447]

420
APPENDIX D
Table D.39  Software Trigger Interrupt Register (0xE000EF00)
Bits
Name
Type
Reset Value
Description
8:0
INTID
W
—
Writing the interrupt number sets the pending bit of
the interrupt.
Table D.40  NVIC Peripheral ID Registers (0xE000EFD0-0xE000EFFC)
Address
Name
Type
Reset Value
Description
0xE000EFD0
PERIPHID4
R
0x04
Peripheral ID register
0xE000EFD4
PERIPHID5
R
0x00
Peripheral ID register
0xE000EFD8
PERIPHID6
R
0x00
Peripheral ID register
0xE000EFDC
PERIPHID7
R
0x00
Peripheral ID register
0xE000EFE0
PERIPHID0
R
0x00
Peripheral ID register
0xE000EFE4
PERIPHID1
R
0xB0
Peripheral ID register
0xE000EFE8
PERIPHID2
R
0x0B/0x1B/0x2B
Peripheral ID register
0xE000EFEC
PERIPHID3
R
0x00
Peripheral ID register
0xE000EFF0
PCELLID0
R
0x0D
Component ID register
0xE000EFF4
PCELLID1
R
0xE0
Component ID register
0xE000EFF8
PCELLID2
R
0x05
Component ID register
0xE000EFFC
PCELLID0
R
0xB1
Component ID register
Note: PERIPHID2 value is 0x0B for Cortex-M3 revision 0, 0x1B for revision 1, and 0x2B for revision 2.
Table D.38  Debug Exception and Monitor Control Register (0xE000EDFC)  Continued
Bits
Name
Type
Reset Value
Description
10
VC_HARDERR
R/W
0
Debug trap on hard faults
9
VC_INTERR
R/W
0
Debug trap on interrupt/exception service
errors
8
VC_BUSERR
R/W
0
Debug trap on bus faults
7
VC_STATERR
R/W
0
Debug trap on usage fault state errors
6
VC_CHKERR
R/W
0
Debug trap on usage fault enabled checking
errors (e.g., unaligned, divide by zero)
5
VC_NOCPERR
R/W
0
Debug trap on usage fault; no coprocessor
errors
4
VC_MMERR
R/W
0
Debug trap on memory management fault
3:1
Reserved
—
—
Reserved
0
VC_CORERESET
R/W
0
Debug trap on core reset


