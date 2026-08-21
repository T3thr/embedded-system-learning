# External research notes

## Source A: Valvano & Yerraballi, Chapter 1: Introduction to Embedded Systems
URL: https://users.ece.utexas.edu/~valvano/mspm0/ebook/Ch1_Introduction.html

The University of Texas chapter decomposes “embedded microcomputer system” into embedded, micro, computer, and system. It explains that a computer contains a processor, memory, and a means to exchange data with the external world. It describes a microcontroller as a complete computer incorporating processor, RAM, ROM, and I/O ports in one package, often selected for low cost, small size, and low power. It defines an embedded system as a microcomputer connected to mechanical, chemical, and electrical devices, programmed for a specific dedicated purpose, with sensors, interface electronics, software decisions/calculations, and actuators forming an input–decision–output loop.

The same chapter lays out a useful prerequisite sequence: digital/binary information, number representation, CPU components (ALU, control unit, registers), memory, instruction-set architecture, structured programming, stack, and functions. This supports a teaching order that starts from physical signals and binary state, then moves through CPU/memory/ISA, then stack/control flow, and only then interrupt response.

## Source B: Philips/NXP 80C51/87C51/80C52/87C52 product specification
URL: https://www.nxp.com/docs/en/data-sheet/8XC51_8XC52.pdf

The datasheet states that this 80C51 family variant has 128×8 RAM (80C51), 32 I/O lines, timer/counters, serial I/O, oscillator/clock circuits, and a six-source, four-priority-level nested interrupt structure. It emphasizes that 8051-family features vary by derivative: 80C51 and 80C52 differ in ROM/RAM and timer resources, and the frequency range is not a universal fixed 12 MHz.

The pin descriptions identify P3.2 as INT0 and P3.3 as INT1, while other Port 3 alternate functions include serial RXD/TXD, timer inputs T0/T1, WR and RD. The SFR table gives IE at A8H and IP at B8H; the specific IE bits include EA (global enable), ET2, ES, ET1, EX1, ET0 and EX0 for this derivative. IP bits include PT2, PS, PT1, PX1, PT0 and PX0. IPH at B7H exists in this derivative to combine with IP for four priority levels.

The datasheet’s interrupt table gives the classic vector addresses for the standard sources: external interrupt 0 at 03H, timer 0 at 0BH, external interrupt 1 at 13H, timer 1 at 1BH, serial port at 23H, and the additional timer 2 source at its derivative-specific vector. The exact table should be cited from the device datasheet when writing code or claiming a vector address.

The datasheet states that EA=0 disables all interrupts; when EA=1, each interrupt can be enabled or disabled individually. It also documents that an enabled interrupt can terminate idle mode and that an external interrupt can wake certain devices from power-down under configured conditions. For timer 2, flags such as TF2 and EXF2 can generate the same timer-2 interrupt vector and the ISR must inspect the flags to determine the cause.

## Critical corrections to carry into teaching documents

1. “8051 has five interrupts” describes the classic 8051 set (INT0, Timer0, INT1, Timer1, serial). Derivatives such as 80C52 add Timer 2 and therefore have six sources. Always name the exact device family.
2. “12 MHz” is a common teaching example for classic 8051 timing, not a universal 8051 property. The derivative datasheet specifies its oscillator range and whether a machine cycle is oscillator/12 or another implementation.
3. The lecture transcription states that RETI makes EA=1. This should not be taught as a universal rule without a device-specific authority. The datasheet material gathered here emphasizes interrupt enable bits and vector/ISR behavior; the final explanation should distinguish the architectural end-of-interrupt signaling of RETI from the explicit software state of EA.
4. The lecture’s “Harvard” label should be explained as separate code and data address spaces in the classic MCS-51 model, while noting that implementation terminology such as modified Harvard can vary by derivative.

## Planned use
Use the lecture files as the course-scope primary sources, the device datasheet as the authority for 8051 register/vector/timing claims, and Valvano as a pedagogical source for prerequisites and the physical input–computation–output model. Use AVR/ARM sources for comparison only, not to silently substitute their interrupt semantics for 8051 semantics.

## Source C: Intel MCS-51 Family User’s Manual (1994)
URL: https://cos.colorado.edu/Documents/DCE/BOOT/8051_Manual.pdf

The manual describes the original 8051 core as an 8-bit control-oriented CPU with separate 64K program and data address spaces, 32 individually addressable I/O lines, two 16-bit timer/counters, a full-duplex UART, and a six-source/five-vector interrupt structure with two priority levels. It explicitly says that each interrupt is assigned a fixed program-memory location; classic vector locations are 0003H (External Interrupt 0), 000BH (Timer 0), 0013H (External Interrupt 1), 001BH (Timer 1), and 0023H (serial). Longer service routines must jump out of the 8-byte vector intervals.

The manual defines `RETI` more precisely than the lecture transcription: it pops the high- and low-order PC bytes from the stack, restores the interrupt logic so that additional interrupts at the same priority can be accepted, decrements SP by two, and does not automatically restore other registers or PSW. The manual explicitly contrasts `RET` and `RETI`: both can restore the PC, but a plain `RET` leaves the interrupt-control system believing an interrupt remains in progress.

The manual’s interrupt-handling section states that interrupt flags are sampled at S5P2 of each machine cycle and polled in the following machine cycle. The hardware-generated LCALL is blocked when an equal-or-higher-priority interrupt is already in progress, when the current polling cycle is not the final cycle of the instruction in progress, or when the instruction in progress is `RETI` or a write to IE/IP. It also states that the hardware-generated LCALL pushes only the PC, not the PSW; therefore an ISR must save any register/state it will modify and later restore it explicitly.

The manual distinguishes flag-clearing behavior by source: transition-activated external interrupt flags may be cleared by hardware, while serial-port and Timer 2 flags are not cleared automatically and must be handled in software. The final teaching document must therefore avoid the oversimplification “hardware always clears the interrupt flag.”

## High-confidence interrupt facts to use

The causal model for classic 8051 is: source event → flag/latch → enable and priority eligibility → polling/acceptance at an instruction boundary → hardware-generated LCALL to fixed vector → ISR → explicit state/flag handling → RETI → restored PC and interrupt-controller state. `EA` is a global enable gate; `RETI` is an end-of-interrupt instruction, not a universal synonym for “set EA to 1.”

## Important correction: lecture slide versus architectural manual

Lecture 4 transcribed text says that `RETI` returns to the main program and enables interrupts by making `EA = 1`. The Intel MCS-51 manual gives the safer architectural statement: `RETI` restores the interrupt logic so that additional interrupts at the same priority can be accepted and pops the PC; it does not state that RETI writes `EA=1`, and it explicitly says that other registers and PSW are not automatically restored. The teaching document must present this as a **course-slide simplification or derivative-dependent claim**, not as a universal fact. The accurate explanation is: `EA` is the global enable bit; `RETI` marks completion of the current interrupt in the interrupt-control logic. Whether a particular derivative or software sequence changes EA must be verified against that device’s datasheet.

This distinction is central to the presentation because it demonstrates source criticism: the student can respectfully state what the lecture intends to communicate while separating it from the exact MCS-51 architectural semantics.
