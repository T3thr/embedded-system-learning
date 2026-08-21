# Appendix 2: Solutions to Checkpoints

> **Textbook**: Embedded Systems: Real-Time Operating Systems for ARM Cortex-M Microcontrollers  
> **Author**: Jonathan W. Valvano  
> **PDF Page Range**: 555 - 562


---


<!-- Page 555 -->
### [PDF Page 555]

Appendix 2. Solutions to Checkpoints
Checkpoint 1.1: A characteristic of a system that can guarantee that important tasks get run at the
correct time. We define latency as the difference between the time a task is scheduled to run, and
the time when the task is actually run. A real-time system guarantees the latency will be small and
bounded.
Checkpoint 1.2: An embedded system performs a specific dedicated operation where the
computer is hidden or embedded inside the machine.
Checkpoint 1.3: Minimize size, minimize weight, minimize power, provide for proper operation
in harsh environments, maximize safety, and minimize cost.
Checkpoint 1.4: Multiple busses allow multiple operations to occur in parallel, resulting in
higher performance (more operations/sec).
Checkpoint 1.5: The system does not run slower during debugging, because debugger functions
occur simultaneously with program operation.
Checkpoint 1.6: Variables, the heap, and the stack go in RAM. Constants and machine code go in
ROM. Basically, items that can change over time go in RAM and items that do not change go in
ROM.
Checkpoint 1.7: The ROM on our microcontroller is electrically erasable programmable read
only memory (EEPROM). So yes the software can erase the memory and reprogram it. Under
normal conditions however software does not write to ROM. However, you can create a file
system using a piece of ROM, where your software will be writing to ROM..
Checkpoint 1.8: 0x2200.0000 + 32*n + 4*b=0x2200.0000 + 32*0x1010 +4*3 =0x2200.0000
+0x20200 + 0x0C = 0x2202.020C.
Checkpoint 1.9: 0x2200.0000 + 32*n + 4*b=0x2200.0000 + 32*0x10000+4*22 =0x2200.0000
+0x200000 + 0x58 = 0x2220.0058.
Checkpoint 1.10: 0x4200.0000 + 32*n + 4*b=0x4200.0000 + 32*0x30 +4*7 =0x4200.0000
+0x00600 + 0x1C = 0x4200.061C.
Checkpoint 1.11: R13 is the stack pointer, used to create temporary storage (also called SP).
R14 is the link register (also called LR), containing the return address when a function is called.
R15 is the program counter, containing the address of the instruction as software executes (also
called PC).
Checkpoint 1.12: The I bit in bit 0 of the PRIMASK register. If I=0 interrupts are enabled. If I=1
interrupts are disabled (postponed).
Checkpoint 1.13: A pin is an individual wire on the microcontroller, pins can be used for input,
output, debugging, or power. A port is a collection of input/output pins with a common operation.
Checkpoint 1.14: Parallel, serial, analog and time.
Checkpoint 1.15: The addressing mode specifies how the instruction accesses data.
Checkpoint 1.16: Data are numbers and addresses are memory locations that point to data. The
processor does not know if a value in R0 is data or an address. It is the responsibility of the
programmer (you) to use data as numbers and addresses as pointers in the way you write your
programs.
Checkpoint 1.17: Since this instruction pushes 4 registers, the SP is decremented by 16.
Checkpoint 1.18: The return address is saved in the link register, R14 or LR. However, when a
first function calls a second function, the first function must save the LR onto the stack.



<!-- Page 556 -->
### [PDF Page 556]

Checkpoint 1.19: Standards allows software written by one company to work properly with
software written by another company. A similar concept is CMSIS, which allows the
standardization
of
I/O
functions,
see
http://www.keil.com/pack/doc/CMSIS/General/html/index.html.
Checkpoint 1.20: A pointer is an address that points to data. Pointers are important because they
allow us to pass large amounts of data with a single 32-bit entity.
Checkpoint 1.21: An array of 10 elements is accessed with indices from 0 to 9.
Checkpoint 1.22: A linked list is a collection of nodes, where each node contains data and a
pointer to the next node. The advantage of linked list is the data can grow and shrink in size, and
you can sort the order dynamically. In real-time systems we must guarantee execution of important
tasks occur at the proper time, so we will be careful when implementing flexible behavior, which
in some instances may not finish. Sometimes we sacrifice flexibility of linked lists for the
stability and simplicity of arrays.
Checkpoint 1.23: This is internal fragmentation because it is wasted space for efficiency or the
convenience of the operating system.
Checkpoint 1.24: Search the free list to see if the address &Heap[SIZE*i]  is free.
Checkpoint 1.25: Ignore size parameter, return 100 bytes regardless of the request.
Checkpoint 1.26: The block is lost. This is an example of a memory leak.
Checkpoint 1.27: Sort the free blocks by size using a binary tree. This way it will be faster to
search for the best free block during allocation.
Checkpoint 1.28: Each block has two counters. Dividing a block into two creates one more
block. There needs to be two more counters for the new block.
Checkpoint 1.29: Weird and crazy bugs will occur, because that memory may be allocated to
another task.
Checkpoint 1.30: The existence of the instrument has a small but inconsequential effect on the
system performance. The time to execute the instrument is small compared to the time between
executions of the instrument. There are three advantages of leaving the instruments in the final
system. First, the system was tested with the instruments and works to specification with the
instruments. There is no guarantee the system will still work if the instruments are removed.
Second, the instruments could provide run time checks to catch failures during operation. Third,
the instruments could be used during system checkup (recalibration, diagnostic checkup etc.)
Checkpoint 2.1: Not all pins of a port must have the same direction. Some may be inputs while
others are outputs. Furthermore, some pins may be off, meaning neither input or output.
Checkpoint 2.2:  If we activate the HFXT to run the microcontroller at 48 MHz, then the SysTick
counter decrements every 20.83 ns. To make it interrupt every 10ms, it should interrupt every
480000 cycles. Thus, we set reload to 479999.
Checkpoint 2.3: Since real-time events trigger interrupts, and the ISR software services the
requests, disabling interrupts will postpone the response causing latency or jitter. The maximum
jitter will be the maximum time running with interrupts disabled.
Checkpoint 2.4: Notice there are two disable interrupt and two enable interrupt functions,
occurring in this order: 1) disable, 2) disable, 3) enable, 4) enable. Interrupts will be incorrectly
enabled after step 3). Since the 1-4 represents a critical section and 2-3 is inside this section, a
bug will probably be introduced. In this example Stuff1B  runs with interrupts enabled.



<!-- Page 557 -->
### [PDF Page 557]

Critical1
Critical2
Disable // 1
Disable // 2
Stuff1A
Stuff2A
Call Critical2
Enable  // 3
Stuff1B
return
Enable // 4
return
Checkpoint 2.5: Negative logic means when we touch the switch the voltage goes to 0 (low).
Formally, negative logic means the true voltage is lower than the false voltage. Positive logic
means when we touch the switch the voltage goes to +3.3 (high). Formally, positive logic means
the true voltage is higher than the false voltage.
Checkpoint 2.6: For PF4, we need input with pull-up. DIR bit 4 is low (input), AFSEL bit 4 is
low (not alternate), PUE bit 4 high (pull-up) and PDE bit 4 low (not pull-down). For PF0, we
also need input with pull-down. DIR bit 0 is low (input), AFSEL bit 0 is low (not alternate), PUE
bit 0 high (pull-up) and PDE bit 0 low (not pull-down).
Checkpoint 2.7: For the TM4C one interrupt is generated, both flags are set, and both counts will
be increments. Compare this to the MSP432 version that will generate two sequential interrupts

```assembly
and each interrupt will service one request. In both cases, no events are lost.
```

Checkpoint 2.8: There is 1 byte of data per 10 bits of transmission. So, there are 11520
bytes/sec.
Checkpoint 2.9: The RxFifo is empty when there is no input data. Software is waiting for
hardware. We classify this condition as I/O bound, because the system bandwidth is limited by
I/O hardware.
Checkpoint 2.10: The TxFifo is empty when there is no output data. Hardware is waiting for
software. We classify this condition as CPU bound, because the system bandwidth is limited by
software execution speed.
Checkpoint 2.11: PWM: on the cycle when the timer equals the value in the Match Register or
the Interval Load Register.
Checkpoint 2.12: PWM: output pin cleared (set if inverting mode) on match or set (cleared if
inverting mode) on reload.
Checkpoint 2.13: 1V*16384/2.5V = 6553 (or 6554) . The TM4C range is 0 to 3.3V,
1V*4095/3.3V = 1241.
Checkpoint 2.14: P1OUT ^= 0x08;  GPIO_PORTA_DATA_R ^= 0x08;
#define PA3 (*((volatile uint32_t *)0x40000020))
#define Debug_HeartBeat() (PA3 ^= 0x08)
Checkpoint 3.1: A program is a list of commands, while a thread is the action cause by the
execution of software. For example, there might be one copy of a program that searches the card
catalog of a library, while separate threads are created for each user that logs into a terminal to
perform a search. Similarly, there might be one set of programs that implement the features of a
window (open, minimize, maximize, etc.), while there will be a separate thread for each window
created.
Checkpoint 3.2: Threads can’t communicate with each other using the stack, because they have
physically separate stacks. Global variables will be used, because one thread may write to the



<!-- Page 558 -->
### [PDF Page 558]

global, and another can read from it.
Checkpoint 3.3: It is hard real time because if the response is late, data may be lost.
Checkpoint 3.4: It is firm real time because it causes an error that can be perceived but the effect
is harmless and does not significantly alter the quality of the experience.
Checkpoint 3.5: It is soft real time because the faster it responses the better, but the value of the
system (bandwidth is amount of data printed per second) diminishes with latency.
Checkpoint 3.6: With the flowchart in Figure 3.8, the Status will be set twice and the first data
value will be lost. We will fix this error in the next using a first in first out (FIFO) queue.
Checkpoint 3.7: The system will not work, because there is more work to do than there are
processor resources to accomplish them.
Checkpoint 3.8: The system will work some of the time, but there are times the system will not
work.
Checkpoint 3.9:  The function OS_Wait  will crash because it is spinning with interrupts
disabled.
Checkpoint 3.10:  The function OS_Wait  has a critical section around the read-modify-write
access to the semaphore. If we remove the mutual exclusion, multiple threads could pass.
Checkpoint 3.11: Notice this function discards the new data on error

```c
void SendMail(uint32_t int data){
if(Send){
Lost++; // discard new data
}else{
Mail = data;
OS_Signal(&Send);
}
}
```

Checkpoint 4.1:  Each thread runs for 1ms, so each thread runs every 5ms. The spinning thread
will be run 200 times, wasting 200ms while it waits for its semaphore to be signaled. This is a
20% waste of processor time.
Checkpoint 4.2:  Other threads run for 1 ms each, the semaphore is checked every 4 ms.
However, the amount of time wasted will be quite small because the spinning thread will go
through the loop once and suspend. Obviously, once the semaphore goes above 0, the OS_Wait
will return.
Checkpoint 4.3:  The worst case is you must look at all 5 blocked threads, so the while loop
executes 5 times. This is a waste of 5*150 = 750ns. Since the scheduler runs every 1 ms, this
waste is 0.075% of processor time.
Checkpoint 4.4: Since Signal increments and Wait decrements, we expect the average to be
equal.  On average, over a long period of time, the number of calls to Wait equals the number of
calls to Signal. If Signal were called more often, then the semaphore value would become
infinite. If Wait were called more often, then all threads would become blocked/stalled.
Checkpoint 4.5:  Since put enters data and get removes, we expect the average to be equal.  If put
were called more often, then the FIFO would become full and another call to put could not occur.
If get were called more often, then FIFO would become empty and another successful call to get



<!-- Page 559 -->
### [PDF Page 559]

could not occur. If the FIFO can store N pieces of data, then the total number of successful puts
minus the total number of successful gets must be a value between 0 and N. On average, over a
long period of time, the number of calls to put equals the number of calls to get.
Checkpoint 4.6:  If CurrentSize is 0, the FIFO is empty. If CurrentSize is equal to FIFOSIZE, the
FIFO is full.
Checkpoint 4.7:  Use AND instead of modulo divide when incrementing the index because it is
faster
PutI = (PutI+1)&(FIFOSIZE-1);
GetI = (GetI+1)&(FIFOSIZE-1);
Checkpoint 5.1:  This priority scheduler must look at them all, so it will run N times through the
loop. Looking at all the threads is ok if N is small, but becomes inefficient if I is large.
Checkpoint 5.2:  The maximum latency is 20 ms, because the switch will be recognized at the
next interrupt. The minimum latency is 0, and the latencies are uniformly distributed from 0 to 20,
so the average is 10 ms.
Checkpoint 6.1:  At 60 Hz, f/fs is 1/6.
Gain  = 0.5
Checkpoint 6.2:  If the gain is larger than one, amplification occurs. For example, if the gain is
1.2, if you put in a sinusoidal wave with amplitude 100, then the output of the filter will be a
sinusoidal wave with amplitude 120. This is important because a filtered signal from an 8-bit
ADC will not fit into an 8-bit variable.
Checkpoint 6.3:  The Q is much higher for the IIR filter. This means it rejects just 60 Hz, and
passes most of the other frequencies. This greatly improved performance comes with only a
modest increase the computational complexity. The additional computation is 2 multiplies and a
subtraction. The performance for the IIR filter is superior.
Checkpoint 6.4:  First, sum all the positive terms, 76050. The largest positive value will be if
the ADC values for the positive terms are 4095 and the ADC values for the negative terms is 0.
76050*4095 is less than 231.  Next, sum all the negative terms, -76048. The largest negative value
will be if the ADC values for the negative terms are 4095 and the ADC values for the positive
terms is 0. -76048*4095 is greater than -231. The input is bounded from 0 to 4095 because the
data comes from the 12-bit ADC. The largest gain in this filter is 5, the fixed-point coefficient is
16384. 4095*5*16384 will fit in the 32-bit signed intermediate result, sum.
Checkpoint 6.5:  Because of the linear phase the h(n) filter coefficients are symmetric. Notice
that h(k) equals h(50-k). For example, 4·x(n)+ 4·x(n-50) can be replaced with 4·(x(n)+x(n-50)).
In general, h(k)·x(n‑k)+ h(50-k)·x(n-50-k) can be replaced with h(k)·(x(n-k)+x(n-50-k)), saving
25 multiplies.
Checkpoint 7.1: Both refer to the speed of communication. Latency is the response time to a
question and bandwidth is the information transfer rate.
Checkpoint 7.2: If we do not meet the latency requirement, that data is lost. If it happens every
time the system doesn’t work. If it happens occasionally, it will run slow because we will have to
wait for the disk to spin around one revolution and try it again.
Checkpoint 7.3: A portion of the sound is lost, and it will sound like a skip. We may also hear a



<!-- Page 560 -->
### [PDF Page 560]

click because the waveform is discontinuous. It is firm real time because it causes an error that
can be perceived but the effect is harmless and does not significantly alter the quality of the
experience.
Checkpoint 7.4: The system runs slow, because the transmitter will timeout and try to resend the
packets.
Checkpoint 7.5: The bidirectional driver has three possibilities, determined by two control pins.
An example of this type of logic is the 74HC245. It can drive data left to right, making the left
input and right output.  It can drive data right to left, making the right input and left output. The
third possibility is that the device can be off, driving neither the left nor the right. This is a
noninverting driver, so the output equals the input.
Checkpoint 7.6: Substitute the four bidirectional data bus drivers with four unidirectional tristate
drivers. All four data bus drivers operate in the direction of the simplex transfer (left to right).
The bank-switched memory looks like a write-only memory to the computer and a read-only
memory to the I/O hardware.
Checkpoint 7.7: The maximum latency for cycle steal DMA is one bus cycle, assume there is
only one DMA channel active. If there is more than one DMA channel operating, one DMA
request may have to wait for another.
Checkpoint 7.8: On some systems the latency is only one bus cycle. On others it may be 2 or 3
bus cycles. In all cases it is very short.
Checkpoint 7.9: On most systems, the instruction must finish, so the latency will be the maximum
instruction length. In all cases burst DMA has a longer latency than cycle steal.
Checkpoint 8.1: On average, each file wastes ½ n bytes. Since this is inside the file, this wasted
space is classified as internal fragmentation.
Checkpoint 8.2: The best way to cut the wood is obviously at one end or the other, generating the
2-meter piece and leaving 8 meters free. If you were to cut at the 4-meter and 6-meter spots, you
would indeed have the 2-meter piece as needed, but this cutting would leave you two 4-meter
leftover pieces. The largest available piece now is 4 meters, but the total amount free would be 8
meters. This condition is classified as external fragmentation.
Checkpoint 8.3: The largest contiguous part of the disk is 8 blocks. So the largest new file can
have 8*512 bytes of data (4096 bytes). This is less than the available 16 free blocks, therefore
there is external fragmentation.
Checkpoint 8.4: First fit would put the file in block 1 (block 0 has the directory). Best fit would
put the file in block 10, because it is the smallest free space that is big enough. Worst fit would
put it in block 14, because it is the largest free space.
Checkpoint 8.5: A gibibyte is 230 bytes. Each sector is 212 bytes, so there are 218 sectors. So you
need 218  bits in the table, one for each sector. There are 23 bits in a byte, so the table should be
215 (32768) bytes long.
Checkpoint 8.6: 2 Gibibytes is 231 bytes. 512 bytes is 29 bytes. 31-9 = 22, so it would take 22
bits to store the block number.
Checkpoint 8.7: 2 Gibibytes is 231 bytes. 32k bytes is 215 bytes. 31-15 = 16, so it would take 16
bits to store the block number.
Checkpoint 8.8: There are 16 free blocks, they can all be linked together to create one new file.
This means there is no external fragmentation.



<!-- Page 561 -->
### [PDF Page 561]

Checkpoint 8.9: There are many answers. One answer is you could store a byte count in the
directory. Another answer is you could store a byte count in each block.
Checkpoint 8.10: 16+9=25. 225 is 32 Mebibytes, which is the largest possible disk.
Checkpoint 8.11: There are 231/210=221 blocks, so the 21-bit block address will be stored as a
32-bit number. One can store 1024/4=256 index entries in one 1024-byte block. So the maximum
file size is 256*1024 = 28*210 = 218 = 256 kibibytes. You can increase the block size or store the
index in multiple blocks.
Checkpoint 8.12:  There are 15 free blocks, and they can create an index table using all the free
blocks to create one new file. This means there is no external fragmentation.
Checkpoint 8.13:  There are 15 free blocks, they can create FAT using all the free blocks to
create one new file. Each block is 512 bytes, so the largest file is 15 time 512 bytes; there is no
external fragmentation.
Checkpoint 8.14: Each directory entry now requires 10 bytes. You could have 50 files, leaving
some space for the free space management.
Checkpoint 8.15: Change the 1024 to 4096.
Checkpoint 9.1: Most people communicate in half-duplex. Normally, when we are talking, the
sound of our voice overwhelms our ears, so we usually cannot listen while we are talking.
Checkpoint 9.2: Since information is encoded as energy, and data is transferred at a fixed rate,
each energy packet will exist for a finite time. Energy per time is power.
Checkpoint 9.3: If the units of a signal x is something like volts or watts, we cannot take the
log10(x), because the units of log10(x) is not defined. Whenever we use the log10 to calculate the
amplitude of a signal, we always perform the logarithm on a value without dimensions. In other
words, we always perform the logarithm on a ratio of one signal to another.
Checkpoint 9.4: The performance measure for a storage system is information density in
bits/cm3.
Checkpoint 9.5:  With open collector outputs, the low will dominate over HiZ. The signal will
be low.
Checkpoint 10.1: The VOL of the 7406 at 40 mA will be 0.7V. This means there will be 4.3V
across the coil.
Checkpoint 10.2:  If they are too close, then the system can turn on-off-on-off-… very quickly,
causing the electromagnetic relays to prematurely fail. If they are too far apart, then the system
will oscillate with large positive and negative errors.
Checkpoint 10.3:  Every interrupt, the actuator would be increased or decreased, causing a lot of
output changes.
Checkpoint 10.4:  If the interrupt period were too small, the actuator would be increased to
maximum or decreased to minimum, causing it to behave like a bang-bang controller. Basically,
the plant would not have time to react to changes in the actuator.
Checkpoint 10.5:  The output will saturate. The error increases to a very large positive value or
decreases down to a very large negative value.
Checkpoint 10.6:  The limit of the discrete integral as Δt goes to zero is the continuous integral.
Checkpoint 10.7:  The limit of the discrete derivative as Δt goes to zero is the continuous
derivative.



<!-- Page 562 -->
### [PDF Page 562]

Checkpoint 10.8:  Yes. Let watts be the units of the actuator output and RPM be the units of the
sensor input. The units of the lag L is sec. The units of the rate R is cm/sec. The units of ΔU is
watts.
Proportional KP = 1.2 ΔU/(L*R)
watts/(sec*(RPM sec)) = watts/ RPM
Integral
KI  = 0.5 KP /L
watts/(RPM-sec)
Derivative
KD = 0.5 KP L
(watts-sec)/RPM
Checkpoint 10.9:  E = X*-X, so the error is very negative, causing the P term to be very
negative, making U=100. This removes power and gravity will force it down.
Checkpoint 10.10:  SlowDown=WayTooFast+SpeedingUp*LittleBitFast=50+(40*60)=50
The true engineering experience occurs not with your eyes and ears, but rather with your
fingers and elbows. In other words, engineering education does not happen by listening in
class or reading a book; rather it happens by designing under the watchful eyes of a patient
mentor. So, go build something today, then show it to someone you respect!


