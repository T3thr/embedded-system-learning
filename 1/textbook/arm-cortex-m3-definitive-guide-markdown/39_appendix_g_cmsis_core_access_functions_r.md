# Appendix G CMSIS Core Access Functions Reference

> **Source PDF**: THE_DEFINITIVE_GUIDE_TO_THE_ARM_CORTEX-МЗ_Stellaris_MCU_9000Series_TEINSTRUMENTS_ARM_SECOND_EDITION.pdf  
> **PDF Page Range**: 466 - 473


---


<!-- Page 466 -->
### [PDF Page 466]

439
G
The Cortex™ Microcontroller Software Interface Standard (CMSIS) contains the following standard-
ized functions:
Core peripheral access functions
•
Intrinsic functions
•
In this appendix, the basic information about these standardized functions is covered. Some of the
functions in CMSIS use the standard data types defined in “stdint.h”. For example,
G.1  Exception and Interrupt Numbers
A number of functions in CMSIS use interrupt numbers to access interrupt features. The interrupt number
definition is different from the processor Interrupt Status register (IPSR) definition. In CMSIS, periph-
eral interrupts start from value of 0, and negative numbers are used to indicate system exceptions.
Appendix
CMSIS Core Access
Functions Reference
Table G.1  Standard Data Types Used in CMSIS
Type
Description
uint32_t
Unsigned 32-bit integer

```c
uint16_t
```

Unsigned 16-bit integer

```c
uint8_t
```

Unsigned 8-bit integer
Table G.2  Exception and Interrupt Number
CMSIS
Interrupt
Number
Exception
Number
In Processor
(IPSR)
Exception
Exception Type Name
(enum) – “IRQn_Type”
Exception Handler
Name
—
—
Reset
—
Reset_Handler
−14
2
NMI
NonMaskableInt_IRQn
NMI_Handler
Continued



<!-- Page 467 -->
### [PDF Page 467]

440
APPENDIX G
G.2  NVIC Access Functions
The following functions are available for NVIC feature accesses.
Table G.2  Exception and Interrupt Number  Continued
CMSIS
Interrupt
Number
Exception
Number
In Processor
(IPSR)
Exception
Exception Type Name
(enum) – “IRQn_Type”
Exception Handler
Name
−13
3
Hard fault
—
HardFault_Handler
−12
4
Memory
Management
fault
MemoryManagement_IRQn
MemManage_Handler
−11
5
Bus fault
BusFault_IRQn
BusFault_Handler
−10
6
Usage fault
UsageFault_IRQn
UsageFault_Handler
−5
11
SVC
SVCall_IRQn
SVC_Handler
−4
12
Debug monitor
DebugMonitor_IRQn
DebugMon_Handler
−2
14
PendSV
PendSV_IRQn
PendSV_Handler
−1
15
SysTick
SysTick_IRQn
SysTick_Handler
0
16
Peripheral
interrupt 0
<MCU specific>
<MCU specific>
1
17
Peripheral
interrupt 1
<MCU specific>
<MCU specific>
2
18
Peripheral
interrupt 2
<MCU specific>
<MCU specific>
…
…
…
<MCU specific>
<MCU specific>
Function Name

```c
void NVIC_SetPriorityGrouping(uint32_t PriorityGroup)
```

Description
Set the priority grouping in NVIC Interrupt Controller.
(This function is not available on the Cortex-M0/M1.)
Parameter
PriorityGroup is priority grouping field.
Return
None
Function Name
uint32_t NVIC_GetPriorityGrouping(void)
Description
Get the priority grouping from NVIC Interrupt Controller.
(This function is not available on Cortex-M0/M1.)
Parameter
None
Return
Priority grouping field.



<!-- Page 468 -->
### [PDF Page 468]

441
CMSIS Core Access Functions Reference
Function Name

```c
void NVIC_EnableIRQ(IRQn_Type IRQn)
```

Description
Enable Interrupt in NVIC Interrupt Controller.
Parameter
IRQn_Type IRQn specifies the positive interrupt number. It cannot be system
exception.
Return
None
Function Name

```c
void NVIC_DisableIRQ(IRQn_Type IRQn)
```

Description
Disable Interrupt in NVIC Interrupt Controller.
Parameter
IRQn_Type IRQn is the positive number of the external interrupt. It cannot be
system exception.
Return
None
Function Name
uint32_t NVIC_GetPendingIRQ(IRQn_Type IRQn)
Description
Read the interrupt pending bit for a device-specific interrupt source.
Parameter
IRQn_Type IRQn is the number of the device-specific interrupt. This function
does not support system exception.
Return
1 if pending interrupt, else 0.
Function Name

```c
void NVIC_SetPendingIRQ(IRQn_Type IRQn)
```

Description
Set the pending bit for an external interrupt.
Parameter
IRQn_Type IRQn is the number of the interrupt. This function does not support
system exception.
Return
None
Function Name

```c
void NVIC_ClearPendingIRQ(IRQn_Type IRQn)
```

Description
Clear the pending bit for an external interrupt.
Parameter
IRQn_Type IRQn is the number of the interrupt. This function does not support
system exception.
Return
None
Function Name
uint32_t NVIC_GetActive(IRQn_Type IRQn)
Description
Read the active bit for an external interrupt. (This function is not available on
Cortex-M0/M1.)
Parameter
IRQn_Type IRQn is the number of the interrupt. This function does not support
system exception.
Return
1 if active, else 0.



<!-- Page 469 -->
### [PDF Page 469]

442
APPENDIX G
Function Name

```c
void NVIC_SetPriority(IRQn_Type IRQn, uint32_t priority)
```

Description
Set the priority for an interrupt or system exception with programmable
priority level.
Parameter
IRQn_Type IRQn is the number of the interrupt.
unint32_t priority is the priority for the interrupt. This function automatically
shifts the input priority value left to put priority value in implemented bits.
Return
None
Function Name
uint32_t NVIC_GetPriority(IRQn_Type IRQn)
Description
Read the priority for an interrupt or system exception with programmable
priority level.
Parameter
IRQn_Type IRQn is the number of the interrupt.
Return
Return value (type uint32_t) is the priority for the interrupt. This function
automatically shifts the input priority value right to remove unimplemented
bits in the priority value register.
Function Name
uint32_t NVIC_EncodePriority (uint32_t PriorityGroup, uint32_t
PreemptPriority, uint32_t SubPriority)
Description
Encode the priority for an interrupt: Encode the priority for an interrupt with the
given priority group, preemptive priority value, and subpriority value. In case of
a conflict between priority grouping and available priority bits (__NVIC_PRIO_
BITS), the smallest possible priority group is set. (This function is not available
on Cortex-M0/M1.)
Parameter
PriorityGroup is the used priority group.
PreemptPriority is the preemptive priority value (starting from 0).
SubPriority is the subpriority value (starting from 0).
Return
The priority for the interrupt.
Function Name

```c
void NVIC_DecodePriority (uint32_t Priority, uint32_t PriorityGroup,
```

uint32_t* pPreemptPriority, uint32_t* pSubPriority)
Description
Decode the priority of an interrupt: Decode an interrupt priority value with the
given priority group to preemptive priority value and subpriority value. In case of
a conflict between priority grouping and available priority bits (__NVIC_PRIO_
BITS), the smallest possible priority group is set. (This function is not available
on Cortex-M0/M1.)
Parameter
Priority is the priority for the interrupt.
PriorityGroup is the used priority group.
pPreemptPriority is the preemptive priority value (starting from 0).
pSubPriority is the subpriority value (starting from 0).
Return
None



<!-- Page 470 -->
### [PDF Page 470]

443
CMSIS Core Access Functions Reference
G.3   System and SysTick Functions
The following functions are for system setup.
G.4  Core Registers Access Functions
The following functions are for accessing special registers in the processor core.
Function Name

```c
void SystemInit (void)
```

Description
Initialize the system
Parameter
None
Return
None
Function Name

```c
void NVIC_SystemReset(void)
```

Description
Initiate a system reset request
Parameter
None
Return
None
Function Name
uint32_t SysTick_Config(uint32_t ticks)
Description
Initialize and start the SysTick counter and its interrupt. This function program
the SysTick to generate SysTick exception for every “ticks” number of core
clock cycles.
Parameter
ticks is the number of clock ticks between two interrupts.
Return
None
Function Name
Description
uint32_t __get_MSP(void)
Get MSP value

```c
void __set_MSP(uint32_t topOfMainStack)
```

Change MSP value
Function Name

```c
void SystemCoreClockUpdate(void)
```

Description
Update the SystemCoreClock variable. This function should be used each time
after the processor clock frequency is changed.  This function is introduced
from CMSIS version 1.30. Earlier version of CMSIS do not have this function
and use a different variable called SystemFrequency for timing information.
Parameter
None
Return
None
Continued



<!-- Page 471 -->
### [PDF Page 471]

444
APPENDIX G
G.5   CMSIS Intrinsic Functions
The CMSIS provides a number of intrinsic functions for access to instructions that cannot be generated
by ISO/IEC C. The function “__enable_fault_irq” and “__disable_fault_irq” are not available
for Cortex-M0/M1.
Functions for system features.
Functions for exclusive memory accesses shown in the next table – these functions are not available
on Cortex-M0/M1. Functions for data processing – The “__RBIT” function in the table on the next
page is not available for Cortex-M0/M1.
Function Name
Instruction
Description

```c
void __WFI(void)
```

WFI
Wait for interrupt (sleep)

```c
void __WFE(void)
```

WFE
Wait for event (sleep)

```c
void __SEV(void)
```

SEV
Send event

```c
void __enable_irq(void)
```

CPSIE i
Enable interrupt (clear PRIMASK)

```c
void __disable_irq(void)
```

CPSID i
Disable interrupt (set PRIMASK)

```c
void __enable_fault_irq(void)
```

CPSIE f
Enable interrupt (clear FAULTMASK)

```c
void __disable_fault_irq(void)
```

CPSID f
Disable interrupt (set FAULTMASK)

```c
void __NOP(void)
```

NOP
No operation

```c
void __ISB(void)
```

ISB
Instruction synchronisation barrier

```c
void __DSB(void)
```

DSB
Data synchronisation barrier

```c
void __DMB(void)
```

DMB
Data memory barrier
Function Name
Description
uint32_t __get_PSP(void)
Get PSP value

```c
void __set_PSP(uint32_t topOfProcStack)
```

Change PSP value
uint32_t __get_BASEPRI(void)
Get BASEPRI value

```c
void __set_BASEPRI(uint32_t basePri)
```

Change BASEPRI value
uint32_t __get_PRIMASK(void)
Get PRIMASK value

```c
void __set_PRIMASK(uint32_t priMask)
```

Change PRIMASK value
uint32_t __get_FAULTMASK(void)
Get FAULTMASK value

```c
void __set_FAULTMASK(uint32_t faultMask)
```

Change FAULTMASK value
uint32_t __get_CONTROL(void)
Get CONTROL value

```c
void __set_CONTROL(uint32_t control)
```

Change CONTROL value



<!-- Page 472 -->
### [PDF Page 472]

445
G.6   Debug Message Output Function
A debug message output function is defined to use ITM for message output.
CMSIS Core Access Functions Reference
Function Name
Instruction
Description

```c
uint8_t __LDREXB(uint8_t *addr)
```

LDREXB
Exclusive load byte

```c
uint16_t __LDREXH(uint16_t *addr)
```

LDREXH
Exclusive load half word
uint32_t __LDREXW(uint32_t *addr)
LDREX
Exclusive load word
uint32_t __STREXB(uint8_t value,

```c
uint8_t *addr)
```

STREXB
Exclusive store byte. Return value is the
access status (success = 0, failed = 1).
uint32_t __STREXH(uint16_t value,

```c
uint8_t *addr)
```

STREXH
Exclusive store half word. Return value is
the access status (success = 0,
failed = 1).
uint32_t __STREXW(uint32_t value,

```c
uint8_t *addr)
```

STREX
Exclusive store word. Return value is the
access status (success = 0, failed = 1).

```c
void __CLREX(void)
```

CLREX
Reset exclusive lock created by exclusive
read.
Function Name
Instruction
Description
uint32_t __REV(uint32_t value)
REV
Reverse byte order inside a word.
uint32_t __REV16(uint32_t value)
REV16
Reverse byte order inside each of the
two half words.
uint32_t __REVSH(uint32_t value)
REVSH
Reverse byte order in the lower half
word and then extend the result to
32-bit.
uint32_t __RBIT(uint32_t value)
RBIT
Reverse bit order in the word.
Function Name
uint32_t ITM_putchar(uint32_t chr)
Description
Output a character through the ITM output channel 0. When no debugger is
connected, the function returns immediately. If debugger is connected and
instrumentation trace is enabled, the function outputs the character to ITM
and stalls if the ITM is still busy on the last transfer.
Parameter
“chr” is the character to be output.
Return
The output character “chr”.



<!-- Page 473 -->
### [PDF Page 473]

This page intentionally left blank


