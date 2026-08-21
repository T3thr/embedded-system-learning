# Chapter 9: Input and Output

> **Textbook**: Introduction to Embedded Systems - A Cyber-Physical Systems Approach (UC Berkeley)  
> **Authors**: Edward Ashford Lee and Sanjit Arunkumar Seshia  
> **PDF Page Range**: 243 - 284


---


<!-- Page 243 -->
### [PDF Page 243]

9
Input and Output
Contents
9.1
I/O Hardware
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . 224
9.1.1
Pulse Width Modulation . . . . . . . . . . . . . . . . . . . . 226
9.1.2
General-Purpose Digital I/O . . . . . . . . . . . . . . . . . . 226
9.1.3
Serial Interfaces
. . . . . . . . . . . . . . . . . . . . . . . . 230
9.1.4
Parallel Interfaces . . . . . . . . . . . . . . . . . . . . . . . . 234
9.1.5
Buses . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 234
9.2
Sequential Software in a Concurrent World . . . . . . . . . . . . . 236
9.2.1
Interrupts and Exceptions
. . . . . . . . . . . . . . . . . . . 236

### Sidebar: Basics: Timers

. . . . . . . . . . . . . . . . . . . . . . . . 238
9.2.2
Atomicity . . . . . . . . . . . . . . . . . . . . . . . . . . . . 239
9.2.3
Interrupt Controllers . . . . . . . . . . . . . . . . . . . . . . 240
9.2.4
Modeling Interrupts
. . . . . . . . . . . . . . . . . . . . . . 241
9.3
The Analog/Digital Interface . . . . . . . . . . . . . . . . . . . . . 246
9.3.1
Digital to Analog and Analog to Digital . . . . . . . . . . . . 247
9.3.2
Signal Conditioning
. . . . . . . . . . . . . . . . . . . . . . 249
9.3.3
Sampling and Aliasing . . . . . . . . . . . . . . . . . . . . . 252

### Sidebar: Probing Further: Impulse Trains . . . . . . . . . . . . . . . 253

9.4

### Summary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 255


### Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 256

223



<!-- Page 244 -->
### [PDF Page 244]

9.1. I/O HARDWARE
Because cyber-physical systems integrate computing and physical dynamics, the mech-
anisms in processors that support interaction with the outside world are central to any
design. A system designer has to confront a number of issues. First, the mechanical and
electrical properties of the interfaces are important. Incorrect use of parts, such as draw-
ing too much current from a pin, may cause a system to malfunction or may reduce its
useful lifetime. Second, in the physical world, many things happen at once. Software,
by contrast, is mostly sequential. Reconciling these two disparate properties is a major
challenge, and is often the biggest risk factor in the design of embedded systems. Incor-
rect interactions between sequential code and concurrent events in the physical world can
cause dramatic system failures. Third, the physical world functions in a multidimensional
continuum of time and space. It is an analog world. The world of software, however, is
digital, and strictly quantized. Measurements of physical phenomena must be quantized
in both magnitude and time before software can operate on them. And commands to the
physical world that originate from software will also be intrinsically quantized. Under-
standing the effects of this quantization is essential. In this chapter, we deal with these
three issues in order.
9.1
I/O Hardware
Embedded processors, be they microcontrollers, DSP processors, or general-purpose pro-
cessors, typically include a number of input and output (I/O) mechanisms on chip, ex-
posed to designers as pins of the chip. In this section, we review some of the more
common interfaces provided, illustrating their properties through the following running
example.
Example 9.1:

![Figure 9.1: shows an evaluation board for the Luminary Micro](images/fig_244_figure_9_1.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 9.1: shows an evaluation board for the Luminary Micro.

> **Figure 9.1: shows an evaluation board for the Luminary Micro**

Stellaris R⃝microcontroller, which is an ARM CortexTM - M3 32-bit processor.
The microcontroller itself is in the center below the graphics display. Many of the
pins of the microcontroller are available at the connectors shown on either side of
the microcontroller and at the top and bottom of the board. Such a board would
typically be used to prototype an embedded application, and in the ﬁnal product
it would be replaced with a custom circuit board that includes only the hardware
required by the application. An engineer will develop software for the board using
an integrated development environment (IDE) provided by the vendor and load the
224
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 245 -->
### [PDF Page 245]

9. INPUT AND OUTPUT
USB interface
JTAG and SWD interface
graphics
display
CAN bus interface
Ethernet interface
analog
(ADC)
inputs
micro-
controller
removable
ﬂash
memory
slot
PWM outputs
GPIO connectors
switches
connected
to GPIO pins
speaker
connected to
GPIO or PWM

![Figure 9.1: Stellaris R⃝LM3S8962 evaluation board (Luminary Micro R⃝, 2008a).](images/fig_245_figure_9_1.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 9.1: Stellaris R⃝LM3S8962 evaluation board (Luminary Micro R⃝, 2008a)..

> **Figure 9.1: Stellaris R⃝LM3S8962 evaluation board (Luminary Micro R⃝, 2008a).**

(Luminary Micro was acquired by pointerTexas Instruments in 2009.)
software onto ﬂash memory to be inserted into the slot at the bottom of the board.
Alternatively, software might be loaded onto the board through the USB interface
at the top from the development computer.
The evaluation board in the above example is more than a processor since it includes a
display and various hardware interfaces (switches and a speaker, for example). Such a
board is often called a single-board computer or a microcomputer board. We next
discuss a few of the interfaces provided by a microcontroller or single-board computer.
For a more comprehensive description of the many kinds of I/O interfaces in use, we
recommend Valvano (2007) and Derenzo (2003).
Lee & Seshia, Introduction to Embedded Systems
225



<!-- Page 246 -->
### [PDF Page 246]

9.1. I/O HARDWARE
9.1.1
Pulse Width Modulation
Pulse width modulation (PWM) is a technique for delivering a variable amount of power
efﬁciently to external hardware devices. It can be used to control for example the speed of
electric motors, the brightness of an LED light, and the temperature of a heating element.
In general, it can deliver varying amounts of power to devices that tolerate rapid and
abrupt changes in voltage and current.
PWM hardware uses only digital circuits, and hence is easy to integrate on the same chip
with a microcontroller. Digital circuits, by design, produce only two voltage levels, high
and low. A PWM signal rapidly switches between high and low at some ﬁxed frequency,
varying the amount of time that it holds the signal high. The duty cycle is the proportion
of time that the voltage is high. If the duty cycle is 100%, then the voltage is always high.
If the duty cycle is 0%, then the voltage is always low.
Many microcontrollers provide PWM peripheral devices (see Figure 9.1). To use these,
a programmer typically writes a value to a memory-mapped register to set the duty cycle
(the frequency may also be settable). The device then delivers power to external hardware
in proportion to the speciﬁed duty cycle.
PWM is an effective way to deliver varying amounts of power, but only to certain devices.
A heating element, for example, is a resistor whose temperature increases as more cur-
rent passes through it. Temperature varies slowly, compared to the frequency of a PWM
signal, so the rapidly varying voltage of the signal is averaged out by the resistor, and the
temperature will be very close to constant for a ﬁxed duty cycle. Motors similarly aver-
age out rapid variations in input voltage. So do incandescent and LED lights. Any device
whose response to changes in current or voltage is slow compared to the frequency of the
PWM signal is a candidate for being controlled via PWM.
9.1.2
General-Purpose Digital I/O
Embedded system designers frequently need to connect specialized or custom digital
hardware to embedded processors. Many embedded processors have a number general-
purpose I/O pins (GPIO), which enable the software to either read or write voltage levels
representing a logical zero or one. If the processor supply voltage is VDD, in active high
logic a voltage close to VDD represents a logical one, and a voltage near zero represents a
logical zero. In active low logic, these interpretations are reversed.
226
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 247 -->
### [PDF Page 247]

9. INPUT AND OUTPUT
In many designs, a GPIO pin may be conﬁgured to be an output. This enables software to
then write to a memory-mapped register to set the output voltage to be either high or low.
By this mechanism, software can directly control external physical devices.
However, caution is in order. When interfacing hardware to GPIO pins, a designer needs
to understand the speciﬁcations of the device. In particular, the voltage and current levels
vary by device. If a GPIO pin produces an output voltage of VDD when given a logical
one, then the designer needs to know the current limitations before connecting a device
to it. If a device with a resistance of R ohms is connected to it, for example, then Ohm’s
law tells us that the output current will be
I = VDD/R .
It is essential to keep this current within speciﬁed tolerances. Going outside these toler-
ances could cause the device to overheat and fail. A power ampliﬁer may be needed to
deliver adequate current. An ampliﬁer may also be needed to change voltage levels.
Example 9.2: The GPIO pins of the Luminary Micro Stellaris R⃝microcontroller
shown in Figure 9.1 may be conﬁgured to source or sink varying amounts of current
up to 18 mA. There are restrictions on what combinations of pins can handle such
relatively high currents. For example, Luminary Micro R⃝(2008b) states “The high-
current GPIO package pins must be selected such that there are only a maximum of
two per side of the physical package ... with the total number of high-current GPIO
outputs not exceeding four for the entire package.” Such constraints are designed
to prevent overheating of the device.
In addition, it may be important to maintain electrical isolation between processor cir-
cuits and external devices. The external devices may have messy (noisy) electrical char-
acteristics that will make the processor unreliable if the noise spills over into the power
or ground lines of the processor. Or the external device may operate in a very different
voltage or power regime compared to the processor. A useful strategy is to divide a cir-
cuit into electrical domains, possibly with separate power supplies, that have relatively
little inﬂuence on one another. Isolation devices that may be used to enable communi-
cation across electrical domains, including opto-isolators and transformers. The former
convert an electrical signal in one electrical domain into light, and detect the light in the
Lee & Seshia, Introduction to Embedded Systems
227



<!-- Page 248 -->
### [PDF Page 248]

9.1. I/O HARDWARE
other electrical domain and convert it back to an electrical signal. The latter use inductive
coupling between electrical domains.
GPIO pins can also be conﬁgured as inputs, in which case software will be able to react
to externally provided voltage levels. An input pin may be Schmitt triggered, in which
case they have hysteresis, similar to the thermostat of Example 3.5. A Schmitt triggered
input pin is less vulnerable to noise. It is named after Otto H. Schmitt, who invented it in
1934 while he was a graduate student studying the neural impulse propagation in squid
nerves.
Example 9.3:
The GPIO pins of the microcontroller shown in Figure 9.1, when
conﬁgured as inputs, are Schmitt triggered.
In many applications, several devices may share a single electrical connection. The de-
signer must take care to ensure that these devices do not simultaneously drive the voltage
of this single electrical connection to different values, resulting in a short circuit that can
cause overheating and device failure.
Example 9.4: Consider a factory ﬂoor where several independent microcontrollers
are all able to turn off a piece of machinery by asserting a logical zero on an output
GPIO line. Such a design may provide additional safety because the microcon-
trollers may be redundant, so that failure of one does not prevent a safety-related
shutdown from occurring. If all of these GPIO lines are wired together to a single
control input of the piece of machinery, then we have to take precautions to en-
sure that the microcontrollers do not short each other out. This would occur if one
microcontroller attempts to drive the shared line to a high voltage while another
attempts to drive the same line to a low voltage.
GPIO outputs may use open collector circuits, as shown in Figure 9.2. In such a circuit,
writing a logical one into the (memory mapped) register turns on the transistor, which
pulls the voltage on the output pin down to (near) zero. Writing a logical zero into the
register turns off the transistor, which leaves the output pin unconnected, or “open.”
228
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 249 -->
### [PDF Page 249]

9. INPUT AND OUTPUT
microcontroller
register
drive
transistor
GPIO
pin

![Figure 9.2: An open collector circuit for a GPIO pin.](images/fig_249_figure_9_2.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 9.2: An open collector circuit for a GPIO pin..

> **Figure 9.2: An open collector circuit for a GPIO pin.**

A number of open collector interfaces may be connected as shown in Figure 9.3. The
shared line is connected to a pull-up resistor, which brings the voltage of the line up to
VDD when all the transistors are turned off. If any one transistor is turned on, then it will
bring the voltage of the entire line down to (near) zero without creating a short circuit with
the other GPIO pins. Logically, all registers must have zeros in them for the output to be
high. If any one of the registers has a one in it, then the output will be low. Assuming
active high logic, the logical function being performed is NOR, so such a circuit is called
a wired NOR. By varying the conﬁguration, one can similarly create wired OR or wired
AND.
The term “open collector” comes from the name for the terminal of a bipolar transistor. In
CMOS technologies, this type of interface will typically be called an open drain interface.
It functions essentially in the same way.
Example 9.5:
The GPIO pins of the microcontroller shown in Figure 9.1, when
conﬁgured as outputs, may be speciﬁed to be open drain circuits. They may also
optionally provide the pull-up resistor, which conveniently reduces the number of
external discrete components required on a printed circuit board.
GPIO outputs may also be realized with tristate logic, which means that in addition to
producing an output high or low voltage, the pin may be simply turned off. Like an open-
collector interface, this can facilitate sharing the same external circuits among multiple
devices. Unlike an open-collector interface, a tristate design can assert both high and low
voltages, rather than just one of the two.
Lee & Seshia, Introduction to Embedded Systems
229



<!-- Page 250 -->
### [PDF Page 250]

9.1. I/O HARDWARE
microcontroller
microcontroller
microcontroller
register
drive
transistor
pull-up
resistor
VDD
GPIO pin
GPIO pin
GPIO pin

![Figure 9.3: A number of open collector circuits wired together.](images/fig_250_figure_9_3.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 9.3: A number of open collector circuits wired together..

> **Figure 9.3: A number of open collector circuits wired together.**

9.1.3
Serial Interfaces
One of the key constraints faced by embedded processor designers is the need to have
physically small packages and low power consumption. A consequence is that the num-
ber of pins on the processor integrated circuit is limited. Thus, each pin must be used
efﬁciently. In addition, when wiring together subsystems, the number of wires needs to
be limited to keep the overall bulk and cost of the product in check. Hence, wires must
also be used efﬁciently. One way to use pins and wires efﬁciently is to send information
over them serially as sequences of bits. Such an interface is called a serial interface.
A number of standards have evolved for serial interfaces so that devices from different
manufacturers can (usually) be connected.
An old but persistent standard, RS-232, standardized by the Electronics Industries Asso-
ciation (EIA), was ﬁrst introduced in 1962 to connect teletypes to modems. This standard
deﬁnes electrical signals and connector types; it persists because of its simplicity and be-
cause of continued prevalence of aging industrial equipment that uses it. The standard
deﬁnes how one device can transmit a byte to another device asynchronously (meaning
that the devices do not share a clock signal). On older PCs, an RS-232 connection may be
provided via a DB-9 connector, as shown in Figure 9.4. A microcontroller will typically
use a universal asynchronous receiver/transmitter (UART) to convert the contents of
an 8-bit register into a sequence of bits for transmission over an RS-232 serial link.
230
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 251 -->
### [PDF Page 251]

9. INPUT AND OUTPUT
DB-9 serial port
DB-25 parallel port
USB
IEEE 488

![Figure 9.4: Connectors for serial and parallel interfaces.](images/fig_251_figure_9_4.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 9.4: Connectors for serial and parallel interfaces..

> **Figure 9.4: Connectors for serial and parallel interfaces.**

For an embedded system designer, a major issue to consider is that RS-232 interfaces can
be quite slow and may slow down the application software, if the programmer is not very
careful.
Example 9.6: All variants of the Atmel AVR microcontroller include a UART that
can be used to provide an RS-232 serial interface. To send a byte over the serial
port, an application program may include the lines
1

```c
while(!(UCSR0A & 0x20));
```

2
UDR0 = x;
where x is a variable of type uint8 t (a C data type specifying an 8-bit unsigned
integer). The symbols UCSR0A and UDR0 are deﬁned in header ﬁles provided
in the AVR IDE. They are deﬁned to refer to memory locations corresponding to
memory-mapped registers in the AVR architecture.
The ﬁrst line above executes an empty while loop until the serial transmit buffer is
empty. The AVR architecture indicates that the transmit buffer is empty by setting
the sixth bit of the memory mapped register UCSR0A to 1. When that bit becomes
1, the expression !(UCSR0A & 0x20) becomes 0 and the while loop stops
Lee & Seshia, Introduction to Embedded Systems
231



<!-- Page 252 -->
### [PDF Page 252]

9.1. I/O HARDWARE
looping. The second line loads the value to be sent, which is whatever the variable
x contains, into the memory-mapped register UDR0.
Suppose you wish to send a sequence of 8 bytes stored in an array x. You could do
this with the C code
1

```c
for(i = 0; i < 8; i++) {
```

2

```c
while(!(UCSR0A & 0x20));
```

3
UDR0 = x[i];
4
}
How long would it take to execute this code? Suppose that the serial port is set to
operate at 57600 baud, or bits per second (this is quite fast for an RS-232 inter-
face). Then after loading UDR0 with an 8-bit value, it will take 8/57600 seconds or
about 139 microseconds for the 8-bit value to be sent. Suppose that the frequency
of the processor is operating at 18 MHz (relatively slow for a microcontroller).
Then except for the ﬁrst time through the for loop, each while loop will need to
consume approximately 2500 cycles, during which time the processor is doing no
useful work.
To receive a byte over the serial port, a programmer may use the following C code:
1

```c
while(!(UCSR0A & 0x80));
```

2

```c
return UDR0;
```

In this case, the while loop waits until the UART has received an incoming byte.
The programmer must ensure that there will be an incoming byte, or this code will
execute forever. If this code is again enclosed in a loop to receive a sequence of
bytes, then the while loop will need to consume a considerable number of cycles
each time it executes.
For both sending and receiving bytes over a serial port, a programmer may use
an interrupt instead to avoid having an idle processor that is waiting for the serial
communication to occur. Interrupts will be discussed below.
The RS-232 mechanism is very simple. The sender and receiver ﬁrst must agree on a
transmission rate (which is slow by modern standards). The sender initiates transmission
of a byte with a start bit, which alerts the receiver that a byte is coming. The sender then
clocks out the sequence of bits at the agreed-upon rate, following them by one or two stop
232
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 253 -->
### [PDF Page 253]

9. INPUT AND OUTPUT
bits. The receiver’s clock resets upon receiving the start bit and is expected to track the
sender’s clock closely enough to be able to sample the incoming signal sequentially and
recover the sequence of bits. There are many descendants of the standard that support
higher rate communication, such as RS-422, RS-423, and more.
Newer devices designed to connect to personal computers typically use universal serial
bus (USB) interfaces, standardized by a consortium of vendors. USB 1.0 appeared in
1996 and supports a data rate of 12 Mbits/sec. USB 2.0 appeared in 2000 and supports
data rates up to 480 Mbits/sec. USB 3.0 appeared in 2008 and supports data rates up to

## 4.8 Gbits/sec.

USB is electrically simpler than RS-232 and uses simpler, more robust connectors, as
shown in Figure 9.4. But the USB standard deﬁnes much more than electrical transport
of bytes, and more complicated control logic is required to support it. Since modern
peripheral devices such as printers, disk drives, and audio and video devices all include
microcontrollers, supporting the more complex USB protocol is reasonable for these de-
vices.
Another serial interface that is widely implemented in embedded processors is known
as JTAG (Joint Test Action Group), or more formally as the IEEE 1149.1 standard test
access port and boundary-scan architecture. This interface appeared in the mid 1980s
to solve the problem that integrated circuit packages and printed circuit board technology
had evolved to the point that testing circuits using electrical probes had become difﬁcult or
impossible. Points in the circuit that needed to be accessed became inaccessible to probes.
The notion of a boundary scan allows the state of a logical boundary of a circuit (what
would traditionally have been pins accessible to probes) to be read or written serially
through pins that are made accessible. Today, JTAG ports are widely used to provide a
debug interface to embedded processors, enabling a PC-hosted debugging environment
to examine and control the state of an embedded processor. The JTAG port is used, for
example, to read out the state of processor registers, to set breakpoints in a program, and
to single step through a program. A newer variant is serial wire debug (SWD), which
provides similar functionality with fewer pins.
There are several other serial interfaces in use today, including for example I2C (inter-
integrated circuit), SPI (serial peripheral interface bus), PCI Express (peripheral compo-
nent interconnect express), FireWire, MIDI (musical instrument digital interface), and
serial versions of SCSI (described below). Each of these has its use. Also, network inter-
faces are typically serial.
Lee & Seshia, Introduction to Embedded Systems
233



<!-- Page 254 -->
### [PDF Page 254]

9.1. I/O HARDWARE
9.1.4
Parallel Interfaces
A serial interface sends or receives a sequence of bits sequentially over a single line. A
parallel interface uses multiple lines to simultaneously send bits. Of course, each line
of a parallel interface is also a serial interface, but the logical grouping and coordinated
action of these lines is what makes the interface a parallel interface.
Historically, one of the most widely used parallel interfaces is the IEEE-1284 printer port,
which on the IBM PC used a DB-25 connector, as shown in Figure 9.4. This interface
originated in 1970 with the Centronics model 101 printer, and hence is sometimes called
a Centronics printer port. Today, printers are typically connected using USB or wireless
networks.
With careful programming, a group of GPIO pins can be used together to realize a parallel
interface. In fact, embedded system designers sometimes ﬁnd themselves using GPIO
pins to emulate an interface not supported directly by their hardware.
It seems intuitive that parallel interfaces should deliver higher performance than serial
interfaces, because more wires are used for the interconnection. However, this is not
necessarily the case. A signiﬁcant challenge with parallel interfaces is maintaining syn-
chrony across the multiple wires. This becomes more difﬁcult as the physical length of
the interconnection increases. This fact, combined with the requirement for bulkier cables
and more I/O pins has resulted in many traditionally parallel interfaces being replaced by
serial interfaces.
9.1.5
Buses
A bus is an interface shared among multiple devices, in contrast to a point-to-point in-
terconnection linking exactly two devices. Busses can be serial interfaces (such as USB)
or parallel interfaces. A widespread parallel bus is SCSI (pronounced scuzzy, for small
computer system interface), commonly used to connect hard drives and tape drives to
computers. Recent variants of SCSI interfaces, however, depart from the traditional par-
allel interface to become serial interfaces. SCSI is an example of a peripheral bus archi-
tecture, used to connect computers to peripherals such as sound cards and disk drives.
Other widely used peripheral bus standards include the ISA bus (industry standard archi-
tecture, used in the ubiquitous IBM PC architecture), PCI (peripheral component inter-
face), and Parallel ATA (advanced technology attachment). A somewhat different kind
234
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 255 -->
### [PDF Page 255]

9. INPUT AND OUTPUT
of peripheral bus standard is IEEE-488, originally developed more than 30 years ago to
connect automated test equipment to controlling computers. This interface was designed
at Hewlett Packard and is also widely known as HP-IB (Hewlett Packard interface bus)
and GPIB (general purpose interface bus). Many networks also use a bus architecture.
Because a bus is shared among several devices, any bus architecture must include a
media-access control (MAC) protocol to arbitrate competing accesses. A simple MAC
protocol has a single bus master that interrogates bus slaves. USB uses such a mech-
anism. An alternative is a time-triggered bus, where devices are assigned time slots
during which they can transmit (or not, if they have nothing to send). A third alternative
is a token ring, where devices on the bus must acquire a token before they can use the
shared medium, and the token is passed around the devices according to some pattern.
A fourth alternative is to use a bus arbiter, which is a circuit that handles requests for
the bus according to some priorities. A ﬁfth alternative is carrier sense multiple access
(CSMA), where devices sense the carrier to determine whether the medium is in use be-
fore beginning to use it, detect collisions that might occur when they begin to use it, and
try again later when a collision occurs.
In all cases, sharing of the physical medium has implications on the timing of applications.
Example 9.7:
A peripheral bus provides a mechanism for external devices to
communicate with a CPU. If an external device needs to transfer a large amount of
data to the main memory, it may be inefﬁcient and/or disruptive to require the CPU
to perform each transfer. An alternative is direct memory access (DMA). In the
DMA scheme used on the ISA bus, the transfer is performed by a separate device
called a DMA controller which takes control of the bus and transfers the data. In
some more recent designs, such as PCI, the external device directly takes control of
the bus and performs the transfer without the help of a dedicated DMA controller.
In both cases, the CPU is free to execute software while the transfer is occurring,
but if the executed code needs access to the memory or the peripheral bus, then the
timing of the program is disrupted by the DMA. Such timing effects can be difﬁcult
to analyze.
Lee & Seshia, Introduction to Embedded Systems
235



<!-- Page 256 -->
### [PDF Page 256]

9.2. SEQUENTIAL SOFTWARE IN A CONCURRENT WORLD
9.2
Sequential Software in a Concurrent World
As we saw in Example 9.6, when software interacts with the external world, the timing of
the execution of the software may be strongly affected. Software is intrinsically sequen-
tial, typically executing as fast as possible. The physical world, however, is concurrent,
with many things happening at once, and with the pace at which they happen determined
by their physical properties. Bridging this mismatch in semantics is one of the major
challenges that an embedded system designer faces. In this section, we discuss some of
the key mechanisms for accomplishing this.
9.2.1
Interrupts and Exceptions
An interrupt is a mechanism for pausing execution of whatever a processor is currently
doing and executing a pre-deﬁned code sequence called an interrupt service routine
(ISR) or interrupt handler. Three kinds of events may trigger an interrupt. One is
a hardware interrupt, where some external hardware changes the voltage level on an
interrupt request line. In the case of a software interrupt, the program that is executing
triggers the interrupt by executing a special instruction or by writing to a memory-mapped
register. A third variant is called an exception, where the interrupt is triggered by internal
hardware that detects a fault, such as a segmentation fault.
For the ﬁrst two variants, once the ISR completes, the program that was interrupted re-
sumes where it left off. In the case of an exception, once the ISR has completed, the pro-
gram that triggered the exception is not normally resumed. Instead, the program counter
is set to some ﬁxed location where, for example, the operating system may terminate the
offending program.
Upon occurrence of an interrupt trigger, the hardware must ﬁrst decide whether to re-
spond. If interrupts are disabled, it will not respond. The mechanism for enabling or
disabling interrupts varies by processor. Moreover, it may be that some interrupts are
enabled and others are not. Interrupts and exceptions generally have priorities, and an
interrupt will be serviced only if the processor is not already in the middle of servicing
an interrupt with a higher priority. Typically, exceptions have the highest priority and are
always serviced.
When the hardware decides to service an interrupt, it will usually ﬁrst disable interrupts,
push the current program counter and processor status register(s) onto the stack, and
236
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 257 -->
### [PDF Page 257]

9. INPUT AND OUTPUT
branch to a designated address that will normally contain a jump to an ISR. The ISR must
store on the stack the values currently in any registers that it will use, and restore their
values before returning from the interrupt, so that the interrupted program can resume
where it left off. Either the interrupt service routine or the hardware must also re-enable
interrupts before returning from the interrupt.
Example 9.8: The ARM CortexTM - M3 is a 32-bit microcontroller used in indus-
trial automation and other applications. It includes a system timer called SysTick.
This timer can be used to trigger an ISR to execute every 1ms. Suppose for example
that every 1ms we would like to count down from some initial count until the count
reaches zero, and then stop counting down. The following C code deﬁnes an ISR
that does this:
1
volatile uint timerCount = 0;
2

```c
void countDown(void) {
```

3

```c
if (timerCount != 0) {
```

4
timerCount--;
5
}
6
}
Here, the variable timerCount is a global variable, and it is decremented each
time countDown() is invoked, until it reaches zero. We will specify below that
this is to occur once per millisecond by registering countDown() as an ISR. The
variable timerCount is marked with the C volatile keyword, which tells the
compiler that the value of the variable will change at unpredictable times during
execution of the program. This prevents the compiler from performing certain op-
timizations, such as caching the value of the variable in a register and reading it
repeatedly. Using a C API provided by Luminary Micro R⃝(2008c), we can spec-
ify that countDown() should be invoked as an interrupt service routine once per
millisecond as follows:
1
SysTickPeriodSet(SysCtlClockGet() / 1000);
2
SysTickIntRegister(&countDown);
3
SysTickEnable();
4
SysTickIntEnable();
The ﬁrst line sets the number of clock cycles between “ticks” of the SysTick timer.
The timer will request an interrupt on each tick. SysCtlClockGet() is a library
Lee & Seshia, Introduction to Embedded Systems
237



<!-- Page 258 -->
### [PDF Page 258]

9.2. SEQUENTIAL SOFTWARE IN A CONCURRENT WORLD
procedure that returns the number of cycles per second of the target platform’s clock
(e.g., 50,000,000 for a 50 MHz part). The second line registers the ISR by providing
a function pointer for the ISR (the address of the countDown() procedure).
(Note: Some conﬁgurations do not support run-time registration of ISRs, as shown
in this code. See the documentation for your particular system.) The third line
starts the clock, enabling ticks to occur. The fourth line enables interrupts.
The timer service we have set up can be used, for example, to perform some func-
tion for two seconds and then stop. A program to do that is:
1

```c
int main(void) {
```

2
timerCount = 2000;
3
... initialization code from above ...
4

```c
while(timerCount != 0) {
```

5
... code to run for 2 seconds ...
6
}
7
}
Processor vendors provide many variants of the mechanisms used in the previous exam-
ple, so you will need to consult the vendor’s documentation for the particular processor
you are using. Since the code is not portable (it will not run correctly on a different pro-
Basics: Timers
Microcontrollers almost always include some number of peripheral devices called timers.
A programmable interval timer (PIT), the most common type, simply counts down

```python
from some value to zero. The initial value is set by writing to a memory-mapped register,
```

and when the value hits zero, the PIT raises an interrupt request. By writing to a memory-
mapped control register, a timer might be set up to trigger repeatedly without having to
be reset by the software. Such repeated triggers will be more precisely periodic than what
you would get if the ISR restarts the timer each time it gets invoked. This is because the
time between when the count reaches zero in the timer hardware and the time when the
counter gets restarted by the ISR is difﬁcult to control and variable. For example, if the
timer reaches zero at a time when interrupts happen to be disabled, then there will be a
delay before the ISR gets invoked. It cannot be invoked before interrupts are re-enabled.
238
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 259 -->
### [PDF Page 259]

9. INPUT AND OUTPUT
cessor), it is wise to isolate such code from your application logic and document carefully
what needs to be re-implemented to target a new processor.
9.2.2
Atomicity
An interrupt service routine can be invoked between any two instructions of the main
program (or between any two instructions of a lower priority ISR). One of the major chal-
lenges for embedded software designers is that reasoning about the possible interleavings
of instructions can become extremely difﬁcult. In the previous example, the interrupt
service routine and the main program are interacting through a shared variable, namely
timerCount. The value of that variable can change between any two atomic opera-
tions of the main program. Unfortunately, it can be quite difﬁcult to know what operations
are atomic. The term “atomic” comes from the Greek work for “indivisible,” and it is far

```python
from obvious to a programmer what operations are indivisible. If the programmer is writ-
```

ing assembly code, then it may be safe to assume that each assembly language instruction
is atomic, but many ISAs include assembly level instructions that are not atomic.
Example 9.9: The ARM instruction set includes a LDM instruction, which loads
multiple registers from consecutive memory locations. It can be interrupted part
way through the loads (ARM Limited, 2006).
At the level of a C program, it can be even more difﬁcult to know what operations are
atomic. Consider a single, innocent looking statement
timerCount = 2000;
On an 8-bit microcontroller, this statement may take more than one instruction cycle to
execute (an 8-bit word cannot store both the instruction and the constant 2000; in fact, the
constant alone does not ﬁt in an 8-bit word). An interrupt could occur part way through the
execution of those cycles. Suppose that the ISR also writes to the variable timerCount.
In this case, the ﬁnal value of the timerCount variable may be composed of 8 bits set
in the ISR and the remaining bits set by the above line of C, for example. The ﬁnal
value could be very different from 2000, and also different from the value speciﬁed in the
interrupt service routine. Will this bug occur on a 32-bit microcontroller? The only way
Lee & Seshia, Introduction to Embedded Systems
239



<!-- Page 260 -->
### [PDF Page 260]

9.2. SEQUENTIAL SOFTWARE IN A CONCURRENT WORLD
to know for sure is to fully understand the ISA and the compiler. In such circumstances,
there is no advantage to having written the code in C instead of assembly language.
Bugs like this in a program are extremely difﬁcult to identify and correct. Worse, the
problematic interleavings are quite unlikely to occur, and hence may not show up in test-
ing. For safety-critical systems, programmers have to make every effort to avoid such
bugs. One way to do this is to build programs using higher-level concurrent models of
computation, as discussed in Chapter 6. Of course, the implementation of those models
of computation needs to be correct, but presumably, that implementation is constructed
by experts in concurrency, rather than by application engineers.
When working at the level of C and ISRs, a programmer must carefully reason about
the order of operations. Although many interleavings are possible, operations given as a
sequence of C statements must execute in order (more precisely, they must behave as if
they had executed in order, even if out-of-order execution is used).
Example 9.10: In example 9.8, the programmer can rely on the statements within
main() executing in order. Notice that in that example, the statement
timerCount = 2000;
appears before
SysTickIntEnable();
The latter statement enables the SysTick interrupt. Hence, the former statement
cannot be interrupted by the SysTick interrupt.
9.2.3
Interrupt Controllers
An interrupt controller is the logic in the processor that handles interrupts. It supports
some number of interrupts and some number of priority levels. Each interrupt has an
interrupt vector, which is the address of an ISR or an index into an array called the
interrupt vector table that contains the addresses of all the ISRs.
240
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 261 -->
### [PDF Page 261]

9. INPUT AND OUTPUT
Example 9.11: The Luminary Micro LM3S8962 controller, shown in Figure 9.1,
includes an ARM CortexTM - M3 core microcontroller that supports 36 interrupts
with eight priority levels. If two interrupts are assigned the same priority number,
then the one with the lower vector will have priority over the one with the higher
vector.
When an interrupt is asserted by changing the voltage on a pin, the response may be either
level triggered or edge triggered. For level-triggered interrupts, the hardware asserting
the interrupt will typically hold the voltage on the line until it gets an acknowledgement,
which indicates that the interrupt is being handled. For edge-triggered interrupts, the
hardware asserting the interrupt changes the voltage for only a short time. In both cases,
open collector lines can be used so that the same the physical line can be shared among
several devices (of course, the ISR will require some mechanism to determine which
device asserted the interrupt, for example by reading a memory-mapped register in each
device that could have asserted the interrupt).
Sharing interrupts among devices can be tricky, and careful consideration must be given to
prevent low priority interrupts from blocking high priority interrupts. Asserting interrupts
by writing to a designated address on a bus has the advantage that the same hardware can
support many more distinct interrupts, but the disadvantage that peripheral devices get
more complex. The peripheral devices have to include an interface to the memory bus.
9.2.4
Modeling Interrupts
The behavior of interrupts can be quite difﬁcult to fully understand, and many catastrophic
system failures are caused by unexpected behaviors. Unfortunately, the logic of interrupt
controllers is often described in processor documentation very imprecisely, leaving many
possible behaviors unspeciﬁed. One way to make this logic more precise is to model it as
an FSM.
Example 9.12: The program of Example 9.8, which performs some action for two
seconds, is shown in Figure 9.5 together with two ﬁnite state machines that model
the ISR and the main program. The states of the FSMs correspond to positions in
Lee & Seshia, Introduction to Embedded Systems
241



<!-- Page 262 -->
### [PDF Page 262]

9.2. SEQUENTIAL SOFTWARE IN A CONCURRENT WORLD
volatile uint timerCount = 0;

```c
void ISR(void) {
```

… disable interrupts

```c
if(timerCount != 0) {
timerCount--;
}
```

… enable interrupts
}

```c
int main(void) {
// initialization code
SysTickIntRegister(&ISR);
```

… // other init
timerCount = 2000;

```c
while(timerCount != 0) {
```

… code to run for 2 seconds
}
}
… whatever comes next
E
D
A
B
C

![Figure 9.5: State machine models and main program for a program that does](images/fig_262_figure_9_5.png)
*Description*: Finite state machine (FSM) transition diagram specifying states, guard conditions, input triggers, and output actions for Figure 9.5: State machine models and main program for a program that does.

> **Figure 9.5: State machine models and main program for a program that does**

something for two seconds and then continues to do something else.
242
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 263 -->
### [PDF Page 263]

9. INPUT AND OUTPUT
the execution labeled A through E, as shown in the program listing. These positions
are between C statements, so we are assuming here that these statements are atomic
operations (a questionable assumption in general).
We may wish to determine whether the program is assured of always reaching po-
sition C. In other words, can we assert with conﬁdence that the program will even-
tually move beyond whatever computation it was to perform for two seconds? A
state machine model will help us answer that question.
The key question now becomes how to compose these state machines to correctly
model the interaction between the two pieces of sequential code in the procedures
ISR and main. It is easy to see that asynchronous composition is not the right
choice because the interleavings are not arbitrary. In particular, main can be inter-
rupted by ISR, but ISR cannot be interrupted by main. Asynchronous composi-
tion would fail to capture this asymmetry.
Assuming that the interrupt is always serviced immediately upon being requested,
we wish to have a model something like that shown in Figure 9.6. In that ﬁgure, a
two-state FSM models whether an interrupt is being serviced. The transition from
Inactive to Active is triggered by a pure input assert, which models the timer hard-
ware requesting interrupt service. When the ISR completes its execution, another
pure input return triggers a return to the Inactive state. Notice here that the transi-
tion from Inactive to Active is a preemptive transition, indicated by the small circle
at the start of the transition, suggesting that it should be taken immediately when
assert occurs, and that it is a reset transition, suggesting that the state reﬁnement of
Active should begin in its initial state upon entry.
If we combine Figures 9.5 and 9.6 we get the hierarchical FSM in Figure 9.7.
Notice that the return signal is both an input and an output now. It is an output
produced by the state reﬁnement of Active, and it is an input to the top-level FSM,
where it triggers a transition to Inactive. Having an output that is also an input
provides a mechanism for a state reﬁnement to trigger a transition in its container
state machine.
To determine whether the program reaches state C, we can study the ﬂattened state
machine shown in Figure 9.8. Studying that machine carefully, we see that in fact
there is no assurance that state C will be reached! If, for example, assert is present
on every reaction, then C is never reached.
Could this happen in practice? With this program, it is improbable, but not im-
possible. It could happen if the ISR itself takes longer to execute than the time
Lee & Seshia, Introduction to Embedded Systems
243



<!-- Page 264 -->
### [PDF Page 264]

9.2. SEQUENTIAL SOFTWARE IN A CONCURRENT WORLD
E
D
A
B
C

![Figure 9.6: Sketch of a state machine model for the interaction between an ISR](images/fig_264_figure_9_6.png)
*Description*: Finite state machine (FSM) transition diagram specifying states, guard conditions, input triggers, and output actions for Figure 9.6: Sketch of a state machine model for the interaction between an ISR.

> **Figure 9.6: Sketch of a state machine model for the interaction between an ISR**

and the main program.
between interrupts. Is there any assurance that this will not happen? Unfortunately,
our only assurance is a vague notion that processors are faster than that. There is
no guarantee.
In the above example, modeling the interaction between a main program and an interrupt
service routine exposes a potential ﬂaw in the program. Although the ﬂaw may be unlikely
to occur in practice in this example, the fact that the ﬂaw is present at all is disturbing.
In any case, it is better to know that the ﬂaw is present, and to decide that the risk is
acceptable, than to not know it is present.
Interrupt mechanisms can be quite complex. Software that uses these mechanisms to
provide I/O to an external device is called a device driver. Writing device drivers that
are correct and robust is a challenging engineering task requiring a deep understanding
of the architecture and considerable skill reasoning about concurrency. Many failures in
computer systems are caused by unexpected interactions between device drivers and other
programs.
244
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 265 -->
### [PDF Page 265]

9. INPUT AND OUTPUT

![Figure 9.7: Hierarchical state machine model for the interaction between an ISR](images/fig_265_figure_9_7.png)
*Description*: Finite state machine (FSM) transition diagram specifying states, guard conditions, input triggers, and output actions for Figure 9.7: Hierarchical state machine model for the interaction between an ISR.

> **Figure 9.7: Hierarchical state machine model for the interaction between an ISR**

and the main program.
Lee & Seshia, Introduction to Embedded Systems
245



<!-- Page 266 -->
### [PDF Page 266]

9.3. THE ANALOG/DIGITAL INTERFACE

![Figure 9.8: Flattened version of the hierarchical state machine in Figure 9.7.](images/fig_266_figure_9_8.png)
*Description*: Finite state machine (FSM) transition diagram specifying states, guard conditions, input triggers, and output actions for Figure 9.8: Flattened version of the hierarchical state machine in Figure 9.7..

> **Figure 9.8: Flattened version of the hierarchical state machine in Figure 9.7.**

9.3
The Analog/Digital Interface
Cyber-physical systems typically require that measurements of physical properties be
taken and processed by computers that then issue commands to actuators to have some
effect on the physical world. At the boundary of the cyber and physical worlds, mea-
surements must be converted to digital data, and digital data must be converted to analog
effects on the physical world. Issues that arise in these conversions include distortion due
to quantization and sampling and dealing with noise in the physical environment. We
discuss those issues in this section.
246
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 267 -->
### [PDF Page 267]

9. INPUT AND OUTPUT
9.3.1
Digital to Analog and Analog to Digital
An analog signal varies continuously in both time and amplitude. Mathematically, such a
signal might be represented as a function x: R →R, where the domain represents time and
the codomain represents amplitude. A simple conversion of such a signal to digital form is
performed by an analog comparator, which compares the value against a threshold and
produces a binary value, zero or one. For example, we could deﬁne a function q: R →
{0,1} by
q(t) =
 0
if x < 0
1
otherwise
for all t ∈R. Such a signal is discrete in amplitude, but still has a continuous time base.
This signal is quantized, in this case rather harshly so that the quantized signal can only
take on one of two values. The signal q can be viewed as an approximation of the signal
x, albeit not necessarily a very good approximation.
Suppose that we set up a software system to examine this signal at regularly spaced times
called the sample period. For example, given an analog circuit that produces the signal q
as an input to a GPIO pin, we could set up a timer interrupt to regularly examine the value
at that pin and convert it to a boolean value in software. The resulting signal is a function
y: Z →{0,1} given by
y(n) = q(nT)
for all n ∈Z, where T is the sample period. This is a digital signal because it is discrete
in both time and amplitude.
A better approximation of the original signal x might allow more than two possible values
for each sample. The values could be, for example, those that can be represented by some
ﬁxed-point numbering scheme as explained in the box on page 198. An analog to digital
converter (ADC) is a hardware device that performs such a conversion. It has two key
parameters, the sample period T and the number of bits b in the digital representation of
the results. For the analog comparator discussed above, b = 1. The choice of b and T
represents a tradeoff between cost and precision.
Example 9.13:
For audio signals from a compact disc (CD), T = 1/44,100 and
b = 16. This sample period is just adequate to accurately represent frequency ranges
audible to the human ear. And 16 bits is (barely) adequate to reduce quantization
noise (the distortion resulting from quantization) to inaudible levels.
Lee & Seshia, Introduction to Embedded Systems
247



<!-- Page 268 -->
### [PDF Page 268]

9.3. THE ANALOG/DIGITAL INTERFACE
For a given value b, there are 2b possible values, so having a larger value for b results in a
closer approximation to the analog signal x. Moreover, as T decreases, the amount of the
signal’s temporal detail that is preserved in its digital representation increases. In practice,
the larger b is, the more difﬁcult it is to make T small. Thus, high-precision ADCs (those
with large b) tend to support slower sampling rates (larger T).
Example 9.14: The ATSC digital video coding standard includes a format where
the frame rate is 30 frames per second and each frame contains 1080 × 1920 =
2,073,600 pixels. An ADC that is converting one color channel to a digital rep-
resentation must therefore perform 2,073,600 × 30 = 62,208,000 conversions per
second, which yields a sample period T of approximately 16 nsec. With such a
short sample period, increasing b becomes very expensive. For video, a choice
of b = 8 is generally adequate to yield good visual ﬁdelity and can be realized at
reasonable cost.
A digital to analog converter (DAC) performs the converse conversion. Given a sam-
pling period T and a sequence of digital values, each with b bits, it produces a continuous-
time signal (a voltage vs. time) that, were it to be sampled by an ADC with paramters T
and b would yield the same digital sequence (or, at least, a similar digital sequence).
The design of ADC and DAC hardware is itself quite an art. The effects of choices of
T and b are also quite nuanced. Considerable expertise in signal processing is required
to fully understand the implications of choices. In the remainder of this section, we give
only a cursory view of this rather sophisticated topic. We begin with a discussion of how
to mitigate the affect of noise in the environment, showing the intuitive result that it is
beneﬁcial to ﬁlter out frequency ranges that are not of interest. We then follow with a
section on how to understand the effects of sampling, reviewing the Nyquist-Shannon
sampling theorem, which gives us the guideline that we should sample continuous time
signals at rates at least twice as high as the highest frequency of interest.
248
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 269 -->
### [PDF Page 269]

9. INPUT AND OUTPUT
9.3.2
Signal Conditioning1
Sensors convert physical measurements into data. Invariably, they are far from perfect, in
that the data they yield gives information about the physical phenomenon that we wish to
observe and other phenomena that we do not wish to observe. Removing or attenuating
the effects of the phenomena we do not wish to observe is called signal conditioning.
Suppose that a sensor yields a continuous-time signal x. We model it as a sum of a desired
part xd and an undesired part xn,
x(t) = xd(t)+xn(t).
(9.1)
The undesired part is called noise. To condition this signal, we would like to remove
or reduce xn without affecting xd. In order to do this, of course, there has to be some
meaningful difference between xn and xd. Often, the two parts differ considerably in their
frequency content.
Example 9.15:
Consider using an accelerometer to measure the orientation of
a slowly moving object. The accelerometer is attached to the moving object and
reacts to changes in orientation, which change the direction of the gravitational ﬁeld
with respect to the axis of the accelerometer. But it will also report acceleration
due to vibration. Let xd be the signal due to orientation and xn be the signal due to
vibration. We will assume that xn has higher frequency content than xd. Thus, by
frequency-selective ﬁltering, we can reduce the effects of vibration.
To understand the degree to which frequency-selective ﬁltering helps, we need to have
a model of both the desired signal xd and the noise xn. Reasonable models are usually
statistical, and analysis of the signals requires using the techniques of random processes.
Although such analysis is beyond the scope of this text, we can gain insight that is useful
in many practical circumstances through a purely deterministic analysis.
Our approach will be to condition the signal x = xd +xn by ﬁltering it with an LTI system
S called a conditioning ﬁlter. Let the output of the conditioning ﬁlter be given by
y = S(x) = S(xd +xn) = S(xd)+S(xn),
1This section may be skipped on a ﬁrst reading. It requires a background in signals and systems at the
level typically covered in a sophomore or junior engineering course.
Lee & Seshia, Introduction to Embedded Systems
249



<!-- Page 270 -->
### [PDF Page 270]

9.3. THE ANALOG/DIGITAL INTERFACE
where we have used the linearity assumption on S. Let the error signal be deﬁned to be
r = y−xd.
This signal tells us how far off the ﬁltered output is from the desired signal. The energy
in the signal r is deﬁned to be
||r||2 =
∞
Z
−∞
r2(t)dt.
We deﬁne the signal to noise ratio (SNR) to be
SNR = ||xd||2
||r||2 .
Combining the above deﬁnitions, we can write this as
SNR =
||xd||2
||S(xd)−xd +S(xn)||2 .
(9.2)
It is customary to give SNR in decibels, written dB, deﬁned as follows,
SNRdB = 10log10(SNR).
Note that for typical signals in the real world, the energy is effectively inﬁnite if the
signal goes on forever. A statistical model, therefore, would use the power, deﬁned as the
expected energy per unit time. But since we are avoiding using statistical methods here,
we will stick to energy as the criterion.
A reasonable design objective for a conditioning ﬁlter is to maximize the SNR. Of course,
it will not be adequate to use a ﬁlter that maximizes the SNR only for particular signals
xd and xn. We cannot know when we design the ﬁlter what these signals are, so the SNR
needs to be maximized in expectation. That is, over the ensemble of signals we might
see when operating the system, weighted by their likelihood, the expected SNR should be
maximized.
Although determination of this ﬁlter requires statistical methods beyond the scope of this
text, we can draw some intuitively appealing conclusions by examining (9.2). The numer-
ator is not affected by S, so we can ignore it and minimize the denominator. It is easy to
show that the denominator is bounded as follows,
||r||2 ≤||S(xd)−xd||2 +||S(xn)||2
(9.3)
250
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 271 -->
### [PDF Page 271]

9. INPUT AND OUTPUT
which suggests that we may be able to minimize the denominator by making S(xd) close
to xd (i.e., make ||S(xd) −xd||2 small) while making ||S(xn)||2 small. That is, the ﬁlter S
should do minimal damage to the desired signal xd while ﬁltering out as much as possible
of the noise.
As illustrated in Example 9.15, xd and xn often differ in frequency content. We can get
further insight using Parseval’s theorem, which relates the energy to the Fourier trans-
form,
||r||2 =
∞
Z
−∞
(r(t))2dt = 1
2π
∞
Z
−∞
|R(ω)|2dω = 1
2π||R||2
where R is the Fourier transform of r.
The ﬁlter S is an LTI system. It is deﬁned equally well by the function S: (R →R) →
(R →R), by its impulse response h: R →R, a continuous-time signal, or by its transfer
function H : R →C, the Fourier transform of the impulse response. Using the transfer
function and Parseval’s theorem, we can write
SNR =
||Xd||2
||HXd −Xd +HXn||2 ,
(9.4)
where Xd is the Fourier transform of xd and Xn is the Fourier transform of xn. In Problem
7, we explore a very simple strategy that chooses the transfer function so that H(ω) = 1
in the frequency range where xd is present, and H(ω) = 0 otherwise. This strategy is not
exactly realizable in practice, but an approximation of it will work well for the problem
described in Example 9.15.
Note that it is easy to adapt the above analysis to discrete-time signals. If r: Z →R is a
discrete-time signal, its energy is
||r||2 =
∞
∑
n=−∞
(r(n))2.
If its discrete-time Fourier transform (DTFT) is R, then Parseval’s relation becomes
||r||2 =
∞
∑
n=−∞
(r(n))2 = 1
2π
π
Z
−π
|R(ω)|2dω.
Note that the limits on the integral are different, covering one cycle of the periodic DTFT.
All other observations above carry over unchanged.
Lee & Seshia, Introduction to Embedded Systems
251



<!-- Page 272 -->
### [PDF Page 272]

9.3. THE ANALOG/DIGITAL INTERFACE
9.3.3
Sampling and Aliasing2
Almost every embedded system will sample and digitize sensor data. In this section, we
review the phenomenon of aliasing. We use a mathematical model for sampling by using
the Dirac delta function δ. Deﬁne a pulse stream by
∀t ∈R,
p(t) =
∞
∑
k=−∞
δ(t −kT).
Consider a continuous-time signal x that we wish to sample with sampling period T. That
is, we deﬁne a discrete-time signal y: Z →R by y(n) = x(nT). Construct ﬁrst an inter-
mediate continuous-time signal w(t) = x(t)p(t). We can show that the Fourier transform
of w is equal to the DTFT of y. This gives us a way to relate the Fourier transform of x to
the DTFT of its samples y.
Recall that multiplication in the time domain results in convolution in the frequency do-
main, so
W(ω) = 1
2πX(ω)∗P(ω) = 1
2π
∞
Z
−∞
X(Ω)P(ω−Ω)dΩ.
It can be shown (see box on page 253) that the Fourier transform of p(t) is
P(ω) = 2π
T
∞
∑
k=−∞
δ(ω−k2π
T ),
so
W(ω)
=
1
2π
∞
Z
−∞
X(Ω)2π
T
∞
∑
k=−∞
δ(ω−Ω−k2π
T )dΩ
=
1
T
∞
∑
k=−∞
∞
Z
−∞
X(Ω)δ(ω−Ω−k2π
T )dΩ
=
1
T
∞
∑
k=−∞
X(ω−k2π
T )
where the last equality follows from the sifting property of Dirac delta functions. The
next step is to show that
Y(ω) = W(ω/T),
2This section may be skipped on a ﬁrst reading. It requires a background in signals and systems at the
level typically covered in a sophomore or junior engineering course.
252
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 273 -->
### [PDF Page 273]

9. INPUT AND OUTPUT
which follows easily from the deﬁnition of the DTFT Y and the Fourier transform W.
From this, the Nyquist-Shannon sampling theorem follows,
Y(ω) = 1
T
∞
∑
k=−∞
X
ω−2πk
T

.
This relates the Fourier transform X of the signal being sampled x to the DTFT Y of the
discrete-time result y.
This important relation says that the DTFT Y of y is the sum of the Fourier transform X
with copies of it shifted by multiples of 2π/T. Also, the frequency axis is normalized

### Probing Further: Impulse Trains

Consider a signal p consisting of periodically repeated Dirac delta functions with period
T,
∀t ∈R,
p(t) =
∞
∑
k=−∞
δ(t −kT).
This signal has the Fourier series expansion
∀t ∈R,
p(t) =
∞
∑
m=−∞
1
T eiω0mt,
where the fundamental frequency is ω0 = 2π/T. The Fourier series coefﬁcients can be
given by
∀m ∈Z,
Pm = 1
T
T/2
Z
−T/2
"
∞
∑
k=−∞
δ(t −kT)
#
eiω0mtdt.
The integral is over a range that includes only one of the delta functions. The quantity
being integrated is zero everywhere in the integration range except when t = 0, so by
the sifting rule of the Dirac delta function, the integral evaluates to 1. Thus, all Fourier
series coefﬁcients are Pm = 1/T. Using the relationship between the Fourier series and
the Fourier Transform of a periodic signal, we can write the continuous-time Fourier
transform of p as
∀ω ∈R,
P(ω) = 2π
T
∞
∑
k=−∞
δ

ω−2π
T k

.
Lee & Seshia, Introduction to Embedded Systems
253



<!-- Page 274 -->
### [PDF Page 274]

9.3. THE ANALOG/DIGITAL INTERFACE
ω
π
−π
ω
X(ω)
Y(ω)
1
π/T
−π/T
1/T
...
...
3π
−3π

![Figure 9.9: Relationship between the Fourier transform of a continuous-time sig-](images/fig_274_figure_9_9.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 9.9: Relationship between the Fourier transform of a continuous-time sig-.

> **Figure 9.9: Relationship between the Fourier transform of a continuous-time sig-**

nal and the DTFT of its discrete-time samples. The DTFT is the sum of the Fourier
transform and its copies shifted by multiples of 2π/T, the sampling frequency in
radians per second. The frequency axis is also normalized.
by dividing ω by T. There are two cases to consider, depending on whether the shifted
copies overlap.
First, if X(ω) = 0 outside the range −π/T < ω < π/T, then the copies will not overlap,
and in the range −π < ω < π,
Y(ω) = 1
T X
ω
T

.
(9.5)
In this range of frequencies, Y has the same shape as X, scaled by 1/T. This relationship
between X and Y is illustrated in Figure 9.9, where X is drawn with a triangular shape.
In the second case, illustrated in Figure 9.10, X does have non-zero frequency components
higher than π/T. Notice that in the sampled signal, the frequencies in the vicinity of π
are distorted by the overlapping of frequency components above and below π/T in the
original signal. This distortion is called aliasing distortion.
254
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 275 -->
### [PDF Page 275]

9. INPUT AND OUTPUT
ω
ω
−π
π
X(ω)
Y(ω)
1
π/T
−π/T
1/T

![Figure 9.10: Relationship between the Fourier transform of a continuous-time](images/fig_275_figure_9_10.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 9.10: Relationship between the Fourier transform of a continuous-time.

> **Figure 9.10: Relationship between the Fourier transform of a continuous-time**

signal and the DTFT of its discrete-time samples when the continuous-time signal
has a broad enough bandwidth to introduce aliasing distortion.
From these ﬁgures, we get the guideline that we should sample continuous time signals
at rates at least twice as high as the largest frequency component. This avoids aliasing
distortion.
9.4

### Summary

This chapter has reviewed hardware and software mechanisms used to get sensor data
into processors and commands from the processor to actuators. The emphasis is on un-
derstanding the principles behind the mechanisms, with a particular focus on the bridging
between the sequential world of software and the parallel physical world. This chapter
also covers the analog/digital interface from a signal processing perspective, emphasizing
the artifacts that may be introduced by quantization, noise, and sampling.
Lee & Seshia, Introduction to Embedded Systems
255



<!-- Page 276 -->
### [PDF Page 276]


### EXERCISES


### Exercises

1. Similar to Example 9.6, consider a C program for an Atmel AVR that uses a UART
to send 8 bytes to an RS-232 serial interface, as follows:
1

```c
for(i = 0; i < 8; i++) {
```

2

```c
while(!(UCSR0A & 0x20));
```

3
UDR0 = x[i];
4
}
Assume the processor runs at 50 MHz; also assume that initially the UART is idle,
so when the code begins executing, UCSR0A & 0x20 == 0x20 is true; further,
assume that the serial port is operating at 19,200 baud. How many cycles are re-
quired to execute the above code? You may assume that the for statement executes
in three cycles (one to increment i, one to compare it to 8, and one to perform the
conditional branch); the while statement executes in 2 cycles (one to compute
!(UCSR0A & 0x20) and one to perform the conditional branch); and the assig-
ment to UDR0 executes in one cycle.
2. Figure 9.11 gives the sketch of a program for an Atmel AVR microcontroller that
performs some function repeatedly for three seconds. The function is invoked by
calling the procedure foo(). The program begins by setting up a timer interrupt
to occur once per second (the code to do this setup is not shown). Each time the
interrupt occurs, the speciﬁed interrupt service routine is called. That routine decre-
ments a counter until the counter reaches zero. The main() procedure initializes the
counter with value 3 and then invokes foo() until the counter reaches zero.
(a) We wish to assume that the segments of code in the grey boxes, labeled A, B,
and C, are atomic. State conditions that make this assumption valid.
(b) Construct a state machine model for this program, assuming as in part (a)
that A, B, and C, are atomic. The transitions in your state machine should
be labeled with “guard/action”, where the action can be any of A, B, C, or
nothing. The actions A, B, or C should correspond to the sections of code in
the grey boxes with the corresponding labels. You may assume these actions
are atomic.
(c) Is your state machine deterministic? What does it tell you about how many
times foo() may be invoked? Do all the possible behaviors of your model
correspond to what the programmer likely intended?
256
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 277 -->
### [PDF Page 277]

9. INPUT AND OUTPUT

```c
#include <avr/interrupt.h>
volatile uint16_t timer_count = 0;
// Interrupt service routine.
SIGNAL(SIG_OUTPUT_COMPARE1A) {
if(timer_count > 0) {
timer_count--;
}
}
// Main program.
int main(void) {
// Set up interrupts to occur
// once per second.
```

...
// Start a 3 second timer.
timer_count = 3;
// Do something repeatedly
// for 3 seconds.

```c
while(timer_count > 0) {
foo();
}
}
```

A
B
C

![Figure 9.11: Sketch of a C program that performs some function by calling proce-](images/fig_277_figure_9_11.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 9.11: Sketch of a C program that performs some function by calling proce-.

> **Figure 9.11: Sketch of a C program that performs some function by calling proce-**

dure foo() repeatedly for 3 seconds, using a timer interrupt to determine when to
stop.
Lee & Seshia, Introduction to Embedded Systems
257



<!-- Page 278 -->
### [PDF Page 278]


### EXERCISES

Note that there are many possible answers. Simple models are preferred over elab-
orate ones, and complete ones (where everything is deﬁned) over incomplete ones.
Feel free to give more than one model.
3. In a manner similar to example 9.8, create a C program for the ARM CortexTM -
M3 to use the SysTick timer to invoke a system-clock ISR with a jiffy interval of
10 ms that records the time since system start in a 32-bit int. How long can this
program run before your clock overﬂows?
4. Consider a dashboard display that displays “normal” when brakes in the car operate
normally and “emergency” when there is a failure. The intended behavior is that
once “emergency” has been displayed, “normal” will not again be displayed. That
is, “emergency” remains on the display until the system is reset.
In the following code, assume that the variable display deﬁnes what is displayed.
Whatever its value, that is what appears on the dashboard.
1
volatile static uint8_t alerted;
2
volatile static char* display;
3

```c
void ISRA() {
```

4

```c
if (alerted == 0) {
```

5
display = "normal";
6
}
7
}
8

```c
void ISRB() {
```

9
display = "emergency";
10
alerted = 1;
11
}
12

```c
void main() {
```

13
alerted = 0;
14
...set up interrupts...
15
...enable interrupts...
16
...
17
}
Assume that ISRA is an interrupt service routine that is invoked when the brakes
are applied by the driver. Assume that ISRB is invoked if a sensor indicates that the
brakes are being applied at the same time that the accelerator pedal is depressed.
Assume that neither ISR can interrupt itself, but that ISRB has higher priority than
258
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 279 -->
### [PDF Page 279]

9. INPUT AND OUTPUT
ISRA, and hence ISRB can interrupt ISRA, but ISRA cannot interrupt ISRB.
Assume further (unrealistically) that each line of code is atomic.
(a) Does this program always exhibit the intended behavior? Explain. In the
remaining parts of this problem, you will construct various models that will
either demonstrate that the behavior is correct or will illustrate how it can be
incorrect.
(b) Construct a determinate extended state machine modeling ISRA. Assume
that:
• alerted is a variable of type {0,1} ⊂uint8 t,
• there is a pure input A that when present indicates an interrupt request for
ISRA, and
• display is an output of type char*.
(c) Give the size of the state space for your solution.
(d) Explain your assumptions about when the state machine in (b) reacts. Is this
time triggered, event triggered, or neither?
(e) Construct a determinate extended state machine modeling ISRB. This one has
a pure input B that when present indicates an interrupt request for ISRB.
(f) Construct a ﬂat (non-hierarchical) determinate extended state machine de-
scribing the joint operation of the these two ISRs. Use your model to argue
the correctness of your answer to part (a).
(g) Give an equivalent hierarchical state machine. Use your model to argue the
correctness of your answer to part (a).
5. Suppose a processor handles interrupts as speciﬁed by the following FSM:
Lee & Seshia, Introduction to Embedded Systems
259



<!-- Page 280 -->
### [PDF Page 280]


### EXERCISES

Here, we assume a more complicated interrupt controller than that considered in
Example 9.12, where there are several possible interrupts and an arbiter that de-
cides which interrupt to service. The above state machine shows the state of one
interrupt. When the interrupt is asserted, the FSM transitions to the Pending state,
and remains there until the arbiter provides a handle input. At that time, the FSM
transitions to the Active state and produces an acknowledge output. If another in-
terrupt is asserted while in the Active state, then it transitions to Active and Pend-
ing. When the ISR returns, the input return causes a transition to either Inactive
or Pending, depending on the starting point. The deassert input allows external
hardware to cancel an interrupt request before it gets serviced.
Answer the following questions.
(a) If the state is Pending and the input is return, what is the reaction?
(b) If the state is Active and the input is assert ∧deassert, what is the reaction?
(c) Suppose the state is Inactive and the input sequence in three successive reac-
tions is:
i. assert ,
ii. deassert ∧handle ,
iii. return .
260
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 281 -->
### [PDF Page 281]

9. INPUT AND OUTPUT
What are all the possible states after reacting to these inputs? Was the interrupt
handled or not?
(d) Suppose that an input sequence never includes deassert. Is it true that every
assert input causes an acknowledge output? In other words, is every interrupt
request serviced? If yes, give a proof. If no, give a counterexample.
6. Suppose you are designing a processor that will support two interrupts whose logic
is given by the FSM in Exercise 5. Design an FSM giving the logic of an arbiter
that assigns one of these two interrupts higher priority than the other. The inputs
should be the following pure signals:
assert1,return1,assert2,return2
to indicate requests and return from interrupt for interrupts 1 and 2, respectively.
The outputs should be pure signals handle1 and handle2. Assuming the assert
inputs are generated by two state machines like that in Exercise 5, can you be sure
that this arbiter will handle every request that is made? Justify your answer.
7. Consider the accelerometer problem described in Example 9.15. Suppose that the
change in orientation xd is a low frequency signal with Fourier transform given by
Xd(ω) =
 2 for |ω| < π
0 otherwise
This is an ideally bandlimited signal with no frequency content higher than π radi-
ans/second, or 0.5 Hertz. Suppose further that the vibration xn has higher frequency
components, having Fourier transform given by
Xn(ω) =
 1 for |ω| < 10π
0 otherwise
This is again an ideally bandlimited signal with frequency content up to 5 Hertz.
(a) Assume there is no frequency conditioning at all, or equivalently, the condi-
tioning ﬁlter has transfer function
∀ω ∈R,
H(ω) = 1.
Find the SNR in decibels.
Lee & Seshia, Introduction to Embedded Systems
261



<!-- Page 282 -->
### [PDF Page 282]


### EXERCISES

(b) Assume the conditioning ﬁlter is an ideal lowpass ﬁlter with transfer function
H(ω) =
 1 for |ω| < π
0 otherwise
Find the SNR in decibels. Is this better or worse than the result in part (a)?
By how much?
(c) Find a conditioning ﬁlter that makes the error signal identically zero (or equiv-
alently makes the SNR inﬁnite). Clearly, this conditioning ﬁlter is optimal for
these signals. Explain why this isn’t necessarily the optimal ﬁlter in general.
(d) Suppose that as in part (a), there is no signal conditioning. Sample the signal
x at 1 Hz and ﬁnd the SNR of the resulting discrete-time signal.
(e) Describe a strategy that minimizes the amount of signal conditioning that is
done in continuous time in favor of doing signal conditioning in discrete time.
The motivation for doing this is that analog circuitry can be much more ex-
pensive than digital ﬁlters.
8. Consider the following program that monitors two sensors. Here sensor1 and
sensor2 denote the variables storing the readouts from two sensors. The actual
read is performed by the functions readSensor1() and readSensor2(), re-
spectively, which are called in the interrupt service routine ISR.
1
volatile static char flag = 0;
2
volatile static char* display;
3
volatile static short sensor1, sensor2;
4
5

```c
void ISR() {
```

6

```c
if (flag) {
```

7
sensor1 = readSensor1();
8
} else {
9
sensor2 = readSensor2();
10
}
11
}
12
13

```c
int main() {
```

14
// ... set up interrupts ...
15
// ... enable interrupts ...
16

```c
while(1) {
```

17

```c
if (flag) {
```

18
if isFaulty2(sensor2) {
19
display = "Sensor2 Faulty";
20
}
262
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 283 -->
### [PDF Page 283]

9. INPUT AND OUTPUT
21
} else {
22
if isFaulty1(sensor1) {
23
display = "Sensor1 Faulty";
24
}
25
}
26
flag = !flag;
27
}
28
}
Functions isFaulty1() and isFaulty2() check the sensor readings for any
discrepancies, returning 1 if there is a fault and 0 otherwise. Assume that the vari-
able display deﬁnes what is shown on the monitor to alert a human operator
about faults.
Answer the following questions:
(a) Is it possible for the ISR to update the value of sensor1 while the main
function is checking whether sensor1 is faulty? Why or why not?
(b) Suppose a spurious error occurs that causes sensor1 or sensor2 to be a
faulty value for one measurement. Is it possible for that this code would not
report “Sensor1 faulty” or “Sensor2 faulty”?
(c) Assuming the interrupt source for ISR() is timer-driven, what conditions
would cause this code to never check whether the sensors are faulty?
(d) Suppose that instead being interrupt driven, ISR and main are executed con-
currently, each in its own thread. Assume a microkernel that can interrupt
any thread at any time and switch contexts to execute another thread. In this
scenario, is it possible for the ISR to update the value of sensor1 while the
main function is checking whether sensor1 is faulty? Why or why not?
Lee & Seshia, Introduction to Embedded Systems
263



<!-- Page 284 -->
### [PDF Page 284]


### EXERCISES

264
Lee & Seshia, Introduction to Embedded Systems


