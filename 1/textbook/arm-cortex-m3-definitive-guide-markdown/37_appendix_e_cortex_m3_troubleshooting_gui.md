# Appendix E Cortex-M3 Troubleshooting Guide

> **Source PDF**: THE_DEFINITIVE_GUIDE_TO_THE_ARM_CORTEX-МЗ_Stellaris_MCU_9000Series_TEINSTRUMENTS_ARM_SECOND_EDITION.pdf  
> **PDF Page Range**: 448 - 459


---


<!-- Page 448 -->
### [PDF Page 448]

421
E.1  Overview
One of the challenges of using the Cortex™-M3 is to locate problems when the program goes wrong.
The Cortex-M3 processor provides a number of Fault Status registers to assist in troubleshooting (see
Table E.1).
The MMSR, BFSR, and UFSR registers can be accessed in one go using a word transfer instruc-
tion. In this situation, the combined fault status register is called the Configurable Fault Status register
(CFSR) (see Figure E.1).
For users of CMSIS compliant device drivers, these Fault Status registers can be accessed using the
following symbols:
•
SCB->CFSR:  Configurable Fault Status register
•
SCB->HFSR:  Hard Fault Status register
•
SCB->DFSR:  Debug Fault Status register
•
SCB->AFSR:  Auxiliary Fault Status register
Another important piece of information is the stacked program counter (PC). This is located in
memory address [SP + 24] when a fault exception handler is entered. Because there are two stack point-
ers in the Cortex-M3, the fault handler might need to determine which stack pointer was used before
obtaining the stacked PC.
In addition, for bus faults and memory management faults, you might also be able to determine
the address that caused the fault. This is done by accessing the MemManage (Memory Management)
Fault Address register (MMAR) and the Bus Fault Address register (BFAR). The contents of these two
registers are only valid when the MMAVALID bit (in MMSR) or BFARVALID bit (in BFSR) is set.
The MMAR and BFAR are physically the same register, so only one of them can be valid at a time (see
Table E.2).
For users of CMSIS compliant device drivers, these Fault Address registers can be accessed using
the following symbols:
•
SCB->MMAR:  MemManage Fault Address register
•
SCB->BFAR:  Bus Fault Address register
Finally, the link register (LR) value when entering the fault handler might also provide hints about
the cause of the fault. In the case of faults caused by invalid EXC_RETURN values, the value of LR
when the fault handler is entered shows the previous LR value when the fault occurred. Fault handler
can report the faulty LR value, and software programmers can then use this information to check why
the LR ends up with an illegal return value.
Appendix
Cortex-M3 Troubleshooting
Guide
E



<!-- Page 449 -->
### [PDF Page 449]

422
APPENDIX E
E.2  Developing Fault Handlers
In most cases, fault handlers for development and for real running systems differ from one another.
For software development, the fault handler should focus on reporting the type of error, whereas
the fault handler for running systems will likely focus on system recovery actions. Here, we
cover only the fault reporting because system recovery actions highly depend on design type and
­requirements.
In complex software, instead of outputting the results inside the fault handler, the contents of
these registers can be copied to a memory block and then PendSV can be used to report the fault
details later. This avoids potential faults in display or outputting routines causing lockup. For simple
applications this might not matter, and the fault details can be output directly within the fault handler
routine.
Figure E.1
Accessing Fault Status Registers.
0xE000ED28
0xE000ED2C
0xE000ED30
0xE000ED3C
UFSR
BFSR
MFSR
HFSR
DFSR
AFSR
0
7
8
15
16
Bit 31
CFSR
Table E.2  Fault Address Registers on Cortex-M3
Address
Register
Full Name
Size
0xE000ED34
MMAR
MemManage Fault Address register
Word
0xE000ED38
BFAR
Bus Fault Address register
Word
Table E.1  Fault Status Registers on Cortex-M3
Address
Register
Full Name
Size
0xE000ED28
MMSR
MemManage Fault Status register
Byte
0xE000ED29
BFSR
Bus Fault Status register
Byte
0xE000ED2A
UFSR
Usage Fault Status register
Half word
0xE000ED2C
HFSR
Hard Fault Status register
Word
0xE000ED30
DFSR
Debug Fault Status register
Word
0xE000ED3C
AFSR
Auxiliary Fault Status register
Word



<!-- Page 450 -->
### [PDF Page 450]

423
Cortex-M3 Troubleshooting Guide
E.2.1  Report Fault Status Registers
The most basic step of a fault handler is to report the Fault Status register values. These include the
­following:
UFSR
•
BFSR
•
MMSR
•
HFSR
•
DFSR
•
AFSR (optional)
•
E.2.2  Report Stacked PC and Other Stacked Registers
In a fault handler, the step for getting the stacked PC is similar to the SVC example in this book.
This process can be carried out in assembly language as follows:
TST    LR, #0x4    ; Test EXC_RETURN number in LR bit 2
ITTEE EQ          ; if zero (equal) then
MRSEQ R0, MSP     ; Main Stack was used, put MSP in R0
LDREQ R0,[R0,#24] ; Get stacked PC from stack.
MRSNE R0, PSP     ; else, Process Stack was used, put PSP in R0
LDRNE R0,[R0,#24] ; Get stacked PC from stack.
Most Cortex-M3 developers use C for their projects. However, in C, it is difficult to locate and
directly access the stack frame (stacked register values) as you cannot obtain the stack point value
in C. To report the stack frame contents in your fault handler in C, you need to use a short assembly
code to obtain stack point value, and then pass it to the fault reporting function in C as a parameter (see
­Figure E.2). The mechanism is identical to the SVC example in Chapter 12. The following example
Figure E.2
Getting the Value of a Stacked PC from Stack Memory.
Determine which stack was
used in calling process using
the LR value (bit[2])
Stacked was
done using MSP
Stacking was
done using PSP
Get stacked PC from
stack memory
Bit 2 z 0
Bit 2 z 1



<!-- Page 451 -->
### [PDF Page 451]

424
APPENDIX E
uses embedded ­assembler, which can work with RealView Development Suite (RVDS) and Keil Real-
View ­Microcontroller ­Development Kit (MDK-ARM).
The first part of the program is an assembly wrapper. The vector table should have the starting
address of this wrapper code in the hard fault entry. This wrapper code copies the correct stack pointer
value into R0, and passes it to the C function as a parameter.
// hard fault handler wrapper in assembly
// it extract the location of stack frame and pass it
// to handler in C as pointer.
__asm void hard_fault_handler_asm(void)
{
TST
LR, #4
ITE
EQ
MRSEQ
R0, MSP
MRSNE
R0, PSP
B
__cpp(hard_fault_handler_c )
}
The second part of the handler is in C. Here, we demonstrate how the stacked register contents and the
Fault Status registers can be accessed.
// hard fault handler in C,
// with stack frame location as input parameter

```c
void hard_fault_handler_c(unsigned int * hardfault_args)
```

{
unsigned int stacked_r0;
unsigned int stacked_r1;
unsigned int stacked_r2;
unsigned int stacked_r3;
unsigned int stacked_r12;
unsigned int stacked_lr;
unsigned int stacked_pc;
unsigned int stacked_psr;
stacked_r0  = ((unsigned long) hardfault_args[0]);
stacked_r1  = ((unsigned long) hardfault_args[1]);
stacked_r2  = ((unsigned long) hardfault_args[2]);
stacked_r3  = ((unsigned long) hardfault_args[3]);
stacked_r12 = ((unsigned long) hardfault_args[4]);
stacked_lr  = ((unsigned long) hardfault_args[5]);
stacked_pc  = ((unsigned long) hardfault_args[6]);
stacked_psr = ((unsigned long) hardfault_args[7]);
printf ("[Hard fault handler]\n");
printf ("R0  = %x\n", stacked_r0);
printf ("R1  = %x\n", stacked_r1);
printf ("R2  = %x\n", stacked_r2);
printf ("R3  = %x\n", stacked_r3);
printf ("R12  = %x\n", stacked_r12);
printf ("LR   = %x\n", stacked_lr);
printf ("PC   = %x\n", stacked_pc);



<!-- Page 452 -->
### [PDF Page 452]

425
Cortex-M3 Troubleshooting Guide
printf ("PSR  = %x\n", stacked_psr);
printf ("BFAR = %x\n", (*((volatile unsigned long *)(0xE000ED38))));
printf ("CFSR = %x\n", (*((volatile unsigned long *)(0xE000ED28))));
printf ("HFSR = %x\n", (*((volatile unsigned long *)(0xE000ED2C))));
printf ("DFSR = %x\n", (*((volatile unsigned long *)(0xE000ED30))));
printf ("AFSR = %x\n", (*((volatile unsigned long *)(0xE000ED3C))));
exit(0); // terminate
return;
}
Please note that this handler will not work correctly if the stack pointer is pointing to an invalid
memory region (e.g., because of stack overflow). This affects all C code as stack is required in C func-
tions in most cases.
To help with debugging, we should also create a disassembled code list file so that we can locate
the problem easily.
E.2.3  Read Fault Address Register
The Fault Address register can be erased after the MMARVALID or BFARVALID is cleared. To cor-
rectly access the Fault Address register, the following procedure should be used:
Read BFAR/MMAR.
1.
Read BFARVALID/MMARVALID. If it is 0, the BFAR/MMAR read should be discarded.
2.
Clear BFARVALID/MMARVALID.
3.
The reason for this procedure instead of reading valid bits first is to prevent a fault handler being
preempted by another higher-priority fault handler after the valid bit is read, which could lead to the
following erroneous fault-reporting sequence:
Read BFARVALID/MMARVALID.
1.
Valid bit is set, going to read BFAR/MMAR.
2.
Higher-priority exception preempts existing fault handler, which generates another fault, causing
3.
another fault handler to be executed.
The higher-priority fault handler clears the BFARVALID/MMARVALID bit, causing the BFAR/
4.
MMAR to be erased.
After returning to the original fault handler, the BFAR/MMAR is read, but now the content is
5.
invalid and leads to incorrect reporting of the fault address.
Therefore, it is important to read the BFARVALID/MMARVALID after reading the Fault Address
register to ensure that the address register content is valid.
E.2.4  Clear Fault Status Bits
After the fault reporting is done, the fault status bit in the FSR should be cleared so that next time the
fault handler is executed, the previous faults will not confuse the fault handler. In addition, if the fault
address valid bit is not clear, the Fault Address register will not get an update for the next fault.



<!-- Page 453 -->
### [PDF Page 453]

426
APPENDIX E
E.2.5  Others
It is often necessary to save the contents of LR in the beginning of a fault handler. However, if the fault
is caused by a stack error, pushing the LR to stack might just make things worst. As we know, R0–R3
and R12 should already been saved, so that we could copy LR to one of these registers before doing
any function calls.
E.3  Understanding the Cause of the Fault
After obtaining the information we need, we can establish the cause of the problem. Tables E.3 through
E.7 list some of the common reasons that faults occur.
Table E.4  Bus Fault Status Register
Bit
Possible Causes
BFARVALID (bit 7)
Indicates the Bus Fault Address register contains a valid bus fault address.
STKERR (bit 4)
Error occurred during stacking (starting of exception).

# 1.  Stack pointer is corrupted.


# 2.  Stack size became too large, reaching an undefined memory region.


# 3.  PSP is used but not initialized.

Table E.3  MemManage Fault Status Register
Bit
Possible Causes
MMARVALID (bit 7)
Indicates the Memory Manage Address register (MMAR) contains a valid fault
addressing value.
MSTKERR (bit 4)
Error occurred during stacking (starting of exception).

# 1.  Stack pointer is corrupted.

2.  Stack size is too large, reaching a region not defined by the MPU or disallowed
in the MPU configuration.
MUNSTKERR (bit 3)
Error occurred during unstacking (ending of exception). If there was no error
stacking but error occurred during unstacking, it might be because of the
following reasons:

# 1.  Stack pointer was corrupted during exception.


# 2.  MPU configuration was changed by exception handler.

DACCVIOL (bit 1)
Violation to memory access protection, which is defined by MPU setup. For
example, user application trying to access privileged-only region.
IACCVIOL (bit 0)
1.  Violation to memory access protection, which is defined by MPU setup. For
example, user application trying to access privileged-only region. Stacked PC
might be able to locate the code that has caused the problem.

# 2.  Branch to nonexecutable regions.


# 3.  Invalid exception return code.

4.  Invalid entry in exception vector table. For example, loading of an executable
image for traditional ARM core into the memory, or exception happened before
vector table was set.

# 5.  Stacked PC corrupted during exception handling.




<!-- Page 454 -->
### [PDF Page 454]

427
Cortex-M3 Troubleshooting Guide
Table E.4  Bus Fault Status Register  continued
Bit
Possible Causes
UNSTKERR(bit 3)
Error occurred during unstacking (ending of exception). If there was no error
stacking but error occurred during unstacking, it might be that the stack pointer
was corrupted during exception.
IMPRECISERR (bit 2)
Bus error during data access. Bus error could be caused by the device not being
initialized, access of privileged-only device in user mode, or the transfer size is
incorrect for the specific device.
PRECISERR (bit 1)
Bus error during data access. The fault address may be indicated by BFAR. A bus
error could be caused by the device not being initialized, access of privileged-only
device in user mode, or the transfer size is incorrect for the specific device.
IBUSERR (bit 0)
1.  Branch to invalid memory regions; for example, caused by incorrect function
pointers in program code.

# 2.  Invalid exception return code; for example, a stacked EXC_RETURN code is

corrupted, and as a result, an exception return incorrectly treated as a branch.
3.  Invalid entry in exception vector table. For example, loading of an executable
image for traditional ARM core into the memory, or exception, happens before
the vector table is set.

# 4.  Stacked PC corrupted during function calls.


# 5.  Access to NVIC or SCB in user mode (nonprivileged).

Table E.5  Usage Fault Status Register
Bit
Possible Causes
DIVBYZERO (bit 9)
Divide by 0 takes place and DIV_0_TRP is set. The code causing the fault can be
located using stacked PC.
UNALIGNED (bit 8)
Unaligned access attempted with UNALIGN_TRP is set. The code causing the fault
can be located using stacked PC.
NOCP (bit 3)
Attempt to execute a coprocessor instruction. The code causing the fault can be
located using stacked PC.
INVPC (bit 2)

# 1.  Invalid value in EXC_RETURN number during exception return. For example,

a.  Return to thread with EXC_RETURN = 0xFFFFFFF1
b.  Return to handler with EXC_RETURN = 0xFFFFFFF9
To investigate the problem, the current LR value provides the value of LR at
the failing exception return.

# 2.  Invalid exception active status. For example,

a.  Exception return with exception active bit for the current exception already
cleared. Possibly caused by use of VECTCLRACTIVE, or clearing of exception
active status in NVIC SHCSR.
b.  Exception return to thread with one or more exception active bits still active.

# 3.  Stack corruption causing the stacked IPSR to be incorrect.

For INVPC fault, the stacked PC shows the point where the faulting exception
interrupted the main/preempted program. To investigate the cause of the
problem, it is best to use exception trace feature in the DWT.
4.  ICI/IT bit invalid for current instruction. This can happen when a multiple-load/
store instruction gets interrupted and, during the interrupt handler, the stacked
PC is modified. When the interrupt return takes place, the nonzero ICI bit is
applied to an instruction that does not use ICI bits. The same problem can also
happen because of corruption of stacked PSR.
continued



<!-- Page 455 -->
### [PDF Page 455]

428
APPENDIX E
Table E.5  Usage Fault Status Register  Continued
Bit
Possible Causes
INVSTATE (bit 1)
1.  Loading branch target address to PC with LSB equals 0. Stacked PC should
show the branch target.
2.  LSB of vector address in vector table is 0. Stacked PC should show the starting
of exception handler.
3.  Stacked PSR corrupted during exception handling, so after the exception the
core tries to return to the interrupted code in ARM state.
UNDEFINSTR (bit 0)

# 1.  Use of instructions not supported in Cortex-M3.


# 2.  Bad/corrupted memory contents.


# 3.  Loading of ARM object code during link stage. Checks compile steps.

4.  Instruction align problem. For example, if GNU Tool chain is used, omitting
of .align after .ascii might cause next instruction to be unaligned (start in odd
memory address instead of halfword addresses).
Table E.6  Hard Fault Status Register
Bit
Possible Causes
DEBUGEVF (bit 31)
Fault is caused by debug event:

# 1.  Breakpoint/watchpoint events.

2.  If the hard fault handler is executing, it might be caused by execution of BKPT
without enable monitor handler (MON_EN = 0) and halt debug is not enabled
(C_DEBUGEN = 0). By default, some C compilers might include semihosting
code that use BKPT.
FORCED (bit 30)
1.  Trying to run SVC/BKPT within SVC/monitor or another handler with same or
higher priority.
2.  A fault occurred if the corresponding handler is disabled or cannot be started
because another exception with the same or higher priority is running, or because
exception mask is set.
VECTBL (bit 1)
Vector fetch failed. It could be caused by

# 1.  Bus fault at vector fetch.


# 2.  Incorrect vector table offset setup.

Table E.7  Debug Fault Status Register
Bit
Possible Causes
EXTERNAL (bit 4)
EDBGRQ signal has been asserted.
VCATCH (bit 3)
Vector catch event has occurred.
DWTTRAP (bit 2)
DWT watchpoint event has occurred.
BKPT (bit 1)

# 1.  Breakpoint instruction is executed.


# 2.  FPB unit generated a breakpoint event.

In some cases, BKPT instructions are inserted by C startup code as part of the
semihosting debugging setup. This should be removed for a real application code.
Please refer to your compiler document for details.
HALTED (bit 0)
Halt request in NVIC.



<!-- Page 456 -->
### [PDF Page 456]

429
Cortex-M3 Troubleshooting Guide
E.4  Other Possible Problems
A number of other common problems are in Table E.8.
Table E.8  Other Possible Problems
Situations
Possible Causes
No program execution
Vector table could be set up incorrectly.

# 1.  Located in incorrect memory location.


# 2.  LSB of vectors (including hard fault handler) is not set to 1.

3.  Use of branch instruction (as in vector table in traditional ARM
processor) in the vector table.
Please generate a disassembly code listing to check if the vector
table is set up correctly.
Program crashes after a few numbers
of instructions
Possibly caused by incorrect endian setting, or
incorrect stack pointer setup (check vector table), or
use of C object library for traditional ARM processor (ARM code
instead of Thumb® code). The offending C object library code
could be part of the C startup routine. Please check compiler
and linker options to ensure that Thumb or Thumb-2 library files
are used.
Processor does not enter sleep mode
when WFE is executed
A WFE instruction does not always result in sleep. If the internal
event register was set before the WFE instruction, it will clear the
event register and act as NOP. Therefore, in normal coding WFE
should be used with a loop.
Processor stops executing
unexpectedly
When sleep-on-exit feature is enabled, the processor enters sleep
mode when returning from exception handler to thread mode,
even if no WFI or WFE instructions are used.
Unexpected SEVONPEND behavior
The SEVONPEND in the NVIC System Control register enables
a disabled interrupt to wake up the processor from WFE, but
not WFI. The wake up event is generated only at a new pending
of an interrupt. If the interrupt pending status was already set
before execution of WFE, arrival of a new interrupt request will
not generate the wake up event and hence will not wake up the
processor.
Interrupt priority level not working as
expected
Unlike many other processors, the Cortex-M3 processor uses
value 0 for highest programmable exception priority level. The
larger the priority level value, the lower the priority is.
When programming the priority level registers for interrupt,
make sure the priority values are written to the implemented bits of
the registers. The least significant bits of the priority level registers
are not implemented.
Most Cortex-M3 microcontrollers are either 3 bits (8 levels) or
4 bits (16 levels). When there is less than 8 bits of priority level, the
LSBs are not implemented. So, if you write priority level values like
0x03, 0x07, and so forth to these registers, the value will become
0x00.
Continued



<!-- Page 457 -->
### [PDF Page 457]

430
APPENDIX E
Table E.8  Other Possible Problems  Continued
Situations
Possible Causes
SVC instruction result in fault exception
The Cortex-M3 processor does not support recursive exception—
an exception cannot preempt unless it is higher priority than the
current level. As a result, you cannot use SVC within an SVC, hard
fault or NMI handler, or any other exception handlers which have
the same or higher priority than the SVC exception.
Parameters passing to SVC corrupted
When passing parameters to exception handlers like SVC, the
extraction of parameters (R0–R3) should be carried by getting
the parameters from the stack frame instead of using values on
the register bank. This is because there could be a chance that
another exception was processed just before entering the SVC
(new arrival exception case).
Because the other exception handler can change R0–R3,
R12 (AAPCS does not require a C function to keep R0–R3, R12
unchanged), the values of R0–R3 and R12 can be undefined when
entering the SVC handler. To obtain the parameters correctly, the
stacked data should be used. This involved using a simple SVC
wrapper in assembly to extract the correct stack pointer and pass
it on to the C handler as a C pointer. Example code of this can be
found in chapter 11 of this book and ARM application note AN179.
A similar arrangement can be found in returning data from the
exception handler to the interrupted program. The handler should
store the return data into the stack frame. Otherwise, the value in
the register bank will be overwritten during unstacking.
SysTick exception occur after clearing
TICKINT
The TICKINT bit in the SysTick Control and Status register
enables and disables the generation of SysTick exception.
However, if the SysTick exception is already in pending state,
clearing of TICKINT will not stop the SysTick exception from
getting fired. To ensure the SysTick exception will not be
generated, you need to clear TICKINT and the SysTick pending
status in the Interrupt Control and Status register in the NVIC.
JTAG locked out
In many Cortex-M3-based microcontrollers, the JTAG and I/O pins
are shared. If the I/O functions for these pins are enabled right in
the start of the program, you could find that you will not be able to
debug or erase the Flash again.
Unexpected extra interrupt
Some microcontrollers have a write buffer in the bus bridge for the
peripheral bus. This makes it possible for an exception handler
to clear a peripheral interrupt by writing to the peripherals, exiting
the handler, and then entering the interrupt again as the peripheral
cannot deassert the interrupt request fast enough. There are
several work-arounds for this problem:
1.  The interrupt service routine (ISR) could carry out a dummy
access to the peripheral before exception exit. However, this
can increase the duration of the ISR.
2.  The clearing of the interrupt can be moved to the beginning of
the ISR so that the interrupt is cleared before the ISR end. This
might not work if the ISR duration is shorter than the buffered
write delay, so extensive testing should be carried out for
various peripheral clock ratios.



<!-- Page 458 -->
### [PDF Page 458]

431
Cortex-M3 Troubleshooting Guide
Table E.8  Other Possible Problems  Continued
Situations
Possible Causes
Problem with using the normal interrupt
as software interrupt
Some users might intend to use unassigned exception types
available in NVIC for software interrupt functions. However, the
external interrupt and the PendSV exceptions are imprecise. That
means the exception handler might not happen immediately after
pending it. To handle this, a polling loop can be used to ensure
that the exception is carried out.
Unexpected BLX or BX instructions
which switched to ARM state
For users of GNU assembler, if a function symbol is from a
different file, you need to ensure the function name is declared as
a function:
.text
.global my_function_name
.type my_function_name, %function
Otherwise, a branch or call to this function might result in
accidental switching to ARM state.
In addition, during linking stage, you might need “-mcortex-m3
-mthumb” options for the GNU linker. Otherwise, the GNU linker
might pull in the wrong version of C library code.
Unexpected disabling of interrupt
The behavior of the Cortex-M3 and ARM7TDMI processors are
different regarding exception return. In ARM7TDMI, if the interrupt
is disabled inside an interrupt handler, it will be automatically
reenabled at exception return due to restore of CPSR (I bit).
For the Cortex-M3 processor, if you disable interrupts manually
using PRIMASK (e.g., “CPSID I” instruction or __disable_irq( )), you
will need to reenable it at a later stage inside the interrupt handler.
Otherwise, the PRIMASK register will remain set after exception
return and will block all interrupts from occuring.
Unexpected unaligned accesses
The Cortex-M3 processor supports unaligned transfers on single
load/store. Normally C compilers do not generate unaligned
transfer except for packed structures and manual manipulation
of pointers. For programming in assembly language, it could be a
bigger issue as a user might accidentally use unaligned transfers
and not know it.
For example, when a program reads a peripheral with word
transfer of an unaligned address, the lowest two bits of the
addresses might be ignored when using other ARM processors
(as the AHB to APB bridge might force these two bits to 0). In
the case of the Cortex-M3 processor, if the same software code
is used, it will divide the unaligned transfer into multiple aligned
transfers. This could end up with different results. Equally, issues
can be found when porting software for the Cortex-M3 processor
to other ARM processors that do not support unaligned transfers.
It is easy to detect if the software generates unaligned transfers.
This can be done by setting the UNALIGN_TRP bit in the NVIC
Configuration Control register in the System Control Block. By
doing this, a usage fault will be triggered when an unaligned
transfer happens, and you can then eliminate all unexpected
unaligned transfers.



<!-- Page 459 -->
### [PDF Page 459]

This page intentionally left blank


