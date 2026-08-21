# Appendix I Access Your Embedded Controller with Ease through a Web Server

> **Source PDF**: THE_DEFINITIVE_GUIDE_TO_THE_ARM_CORTEX-МЗ_Stellaris_MCU_9000Series_TEINSTRUMENTS_ARM_SECOND_EDITION.pdf  
> **PDF Page Range**: 478 - 487


---


<!-- Page 478 -->
### [PDF Page 478]

451
I
Besides running the primary control application for an embedded system, a single Stellaris MCU
can also manage the HMI as a dynamic Web server so the system can be readily monitored and
controlled—from across the country, if needed.
The panel through which an operator interacts with a piece of equipment is an important and
­frequently-used feature of that equipment. Information about the equipment—its settings, operational
status, environmental conditions, and production output—can help the user follow progress, take cor-
rective action, make adjustments, or optimize the equipment’s use. The information might also be gath-
ered for off-line long-term analysis of the system. More information is better than less and the more
easily it is obtained, the better.
The designer should also make it as easy as possible to change the settings on a piece of equipment,
reconfigure its operation, or fine-tune the system. The more intuitive and explicit that activity is, the
more likely the result will be what the operator desires. Losing the instruction manual can seriously
impair the user’s operation of many systems.
I.1  The Human-Machine Interface
The design of the human-machine interface (HMI) of a piece of equipment can be key to its effective
use. The HMI can be a physical part of the system, like an LCD panel for the display with buttons
and knobs for various control functions. Alternatively, it can be a virtual interface, implemented in
software and run from a common terminal of the user’s choosing. That terminal could be a PC, laptop,
cell phone, or purpose-made handheld device. With a virtual HMI, especially when accessible over a
network, the operator can be standing at the machine or at a console in a different, environmentally-
comfortable room—or even across the country—and still manage, monitor, and control the system.
A physical HMI will usually reflect the sophistication of the interface. A small panel with a few
buttons will only be able to deal with a small amount of information and offer limited control. It takes
a larger display and more complex inputs to support more intricate management. Touch screens are a
popular means of eliminating troublesome buttons, but are also limited by the capabilities and charac-
teristics of the underlying screen.
With a virtual HMI there is no appreciable impact on the system cost or size, even with a sophis-
ticated information and control center. One basic design can span numerous product categories, serve
multiple levels of system management, and be expanded to add new features—even in the field.
APPENDIX
Access Your Embedded Controller
with Ease through a Web Server



<!-- Page 479 -->
### [PDF Page 479]

452
Appendix I
The Web browser has become a very familiar interface over the last 20 years, has evolved to accom-
modate many forms of media, and is found in all shapes and sizes on all manner of devices. The same
browser interface might see a child perform educational activities at her favorite Web site one moment,
let a consumer securely verify a bank transaction, and enable a petroleum engineer in Lafayette, Loui-
siana to check the pressure in a line on an oil rig in the Gulf of Mexico and adjust the valve settings.
The ubiquity of the Web browser and the number of browser-enabled terminals make a Web
server an ideal vehicle for providing information about a piece of equipment and taking inputs for the
control of that equipment. Web servers can be expanded to accommodate advanced features on more
sophisticated systems, or be quite simple to provide very basic information and take straightforward
inputs.
Because the Web interface is well established and so popular, Web servers are readily available and,
running on the right processors, can provide an ideal HMI for embedded controllers in a compact form,
using minimal development effort, and requiring negligible overhead. The added advantage of remote
monitoring and control made possible over a network connection greatly enhances the applicability of
the equipment.
I.2  Web Server
Web server applications are designed to respond to requests from the network addressed to the equip-
ment location. When a client device asks for it, the Web server creates the appropriate Web page struc-
ture, gathers and inserts relevant data, inserts links to information available outside of the immediate
system, readies media for transmission, and encodes the assembled page so it can be transmitted. The
server then triggers a series of events that are handled by the network protocol stack which transmits
the page to the requesting client over the physical network.
Developing a Web server can seem to be a daunting task, especially for designers and programmers
whose real expertise is in motion control, medical technology, fluid mechanics, or audio processing.
Fortunately, Web server applications and Transmission Control Protocol/Internet Protocol (TCP/IP)
stacks are readily available, sometimes free, and open-source so they can be modified as desired. These
software packages are designed to be used by people with minimal understanding of the underlying
details so network or Web page proficiency is not requisite.
Two popular network stacks are uIP (micro Internet Protocol) and lwIP (lightweight Internet
­Protocol) offered by Adam Dunkels (http://www.sics.se/~adam/software.html). These TCP/IP stacks
are designed to consume very little code space and use the minimal RAM typically found in MCUs
(see Figure I.1).
The primary difference between uIP and lwIP are memory requirements and capabilities. The
smaller uIP package implements the IP, ICMP (Internet Control Message Protocol), UDP (User Data-
gram Protocol), and TCP protocols. The lwIP package is larger adding in PPP (Point-to-Point Protocol)
and DHCP (Dynamic Host Configuration Protocol) plus an operating system emulation layer, buffer
and memory management subsystems, and network interface functions as well. Both packages provide
support for dynamic Web page delivery.
Both include embedded Web server applications that run on top of these stacks to accept commands
for the equipment and to prepare dynamic pages containing status, data, and information from the
equipment.



<!-- Page 480 -->
### [PDF Page 480]

453
Access Your Embedded Controller with Ease through a Web Server
I.2.1  Source of Content
The content of a Web page may be static or dynamic. Static pages read the same every time they are
accessed. Instructions and help menus may be largely static. More interesting and more useful pages
tend to be dynamic as they contain variable information that might show current settings, recent data
captures, images, and data streams. Dynamic Web pages can be built using a function call to a script or
compiled program which uses an enhancement called the common gateway interface (CGI) to merge
the most current data into the page as it is assembled at the client from the HTML description. Exam-
ples of the code and the resulting Web page can be seen in Figure I.2.
HTML also has a powerful “link” capability that lets material from different servers be merged for
the final page at the client. This capability allows proper corporate servers to provide streaming data
like video or audio and rich content like images and photos directly to the client, leaving the embed-
ded Web server to only trigger the page assembly and provide the latest data updates. Such linking can
greatly enhance the viewed page without burdening precious embedded system memory.
Creating and Storing HTML
The system designer can prepare Web pages using common office suite software like Microsoft Word
or more dedicated Web Creation programs like Adobe Dreamweaver. Some photo editors and many
other routine programs can also generate the needed HTML page descriptions. The HTML language
Figure I.1
TCP/IP Stack Comparison.
Feature
lwIP
uIP
Stack code space (kB)
RAM requirements (kB)
IP and TCP checksums
IP fragment reassembly
IP options
Multiple interfaces
UDP
Multiple TCP connections
TCP options
Variable TCP MSS
RTT estimation
TCP flow control
Sliding TCP window
TCP congestion control
Out-of-sequence TCP data
TCP urgent data
Data buffered for rexmit
4.5
2.5
x
x
x
x
x
x
x
Not needed
x
15
25
x
x
x
x
x
x
x
x
x
x
x
x
x
x



<!-- Page 481 -->
### [PDF Page 481]

454
Appendix I
is not difficult to read and, with a little research, Web pages can be created or modified by hand using
a text editor.
The HTML page descriptions can be put into memory on the embedded system via high-level lan-
guage (like ‘C’) data structures, compiled and linked into the on-chip Flash as part of the final code
module. Alternatively, a simple file system could be set up in Flash where the HTML is read sequen-
tially as needed.
The embedded Web server offers many advantages as a means of displaying system information
and controlling the equipment. The footprint in program memory is small, about 20KB including the
lwIP stack. It may take only a few hundred bytes to store the HTML for each page to be displayed, even
though the image in the browser is fairly complex or rich in images. The amount of information that is
available through the Web server is nearly limitless and can be changed in many ways. Different data
can be made available depending on whether the machine operator, service personnel, or production
management is requesting it. Changes can be made, even after the equipment is sold and installed, in
case a Luminary Micro logo needed to be changed to Texas Instruments’.
I.3  Cost-Effective Networked Embedded Control—Stellaris
Only powerful microcontrollers can meticulously control motors and actuators utilizing sophisticated
algorithms to maintain precise motion control in spite of adverse conditions and varying loads. Net-
working these embedded controllers permits coordination between a number of motors and allows
remote management of expanded, more flexible systems. Remote monitoring and control of the equip-
ment keeps people away from dangerous areas while keeping an even better eye on operation and wear-
and-tear of the equipment, maximizing uptime and utilization. Yet the design of such sophisticated
embedded controllers can be easy and the cost of the end system can be kept in check when the right
components are selected.
The performance requirement of a microcontroller to perform today’s advanced motion control
applications is beyond the capabilities of 8-bit and even most 16-bit microcontrollers. Digital signal
processors (DSPs), hybrid MCUs, and 32-bit MCUs are often called into service to handle precision
Figure I.2
Current Data is Inserted into the Page Utilizing a Common Gateway Interface (Cgi).



<!-- Page 482 -->
### [PDF Page 482]

455
Access Your Embedded Controller with Ease through a Web Server
motors, complex algorithms, leading-edge sensing, and high-end applications. Some handle signal
processing without adequate control or data processing capabilities. Often multiple processors must
be engaged to run the complete application which highlights mismatches in development tools and the
cost of multiple development teams, while the added components loom large.
A single, very capable microcontroller is the best answer, but adding in networking can additionally
tax system performance, development effort, and product cost. Stellaris microcontrollers are designed
for serious industrial control applications and have the features and performance to allow the integra-
tion of networking and an embedded Web-server detracting from the primary application. Development
kits like the EK-LM3S8962 are available providing the right tools and examples to guide the system
designer through product development to bring a new application to market quickly and confidently.
A typical embedded control application is shown in Figure I.3. Sophisticated algorithms run a
set of motors to control motion of four complex robotic arms as they shift pieces from one moving
belt to another. This system has many time-critical inputs and outputs working together over
­networks. Seven control boards operate the distributed control system. CAN is used for board-
to-board communication and the overall process is configured and monitored by an embedded
Web server running on a Stellaris EK-LM3S8962 evaluation board.
While this application is sophisticated motion control, any number of other applications require
high performance processing and control along with accessibility via Ethernet. Examples include:
Figure I.3
A Robotic Embedded Control Application Utilizing Ethernet.
Numeric Control Machine
Medical
Scientific Instruments
Test & Measurement Equipment
Instrumentation
Valve Controls
Industrial Control
Process Control
Security Systems
Vision Systems
Building Control
HVAC
Lighting Control
Remote Systems Management
Network Switches
Network Appliances
Point Of Sale Terminals
Barcode Scanners
Brushless DC
motor control
Brushless DC
motor control
Servo controller
Servo controller
Servo controller
Servo controller
LM3S8962
Evaluation board
CAN
Ethernet
Conveyor
Conveyor
Robot arm
Robot arm
Robot arm
Robot arm
Computer with
web browser



<!-- Page 483 -->
### [PDF Page 483]

456
Appendix I
Combining as much functionality into a single electronic component as practical has a number of
advantages. The higher integration minimizes chip count, board space, interconnects, signal degrada-
tion, noise, power consumption, and cost. A few microcontrollers have come on the market the last
few years which include an Ethernet controller but they are still fairly rare and many have capabilities
limited by their weak processor.
The Stellaris 6000, 8000, and 9000 series of microcontrollers include not only the Ethernet media
access controller (MAC) but the physical interface (PHY) on-chip as well. The MAC (a component of
the Data Link Layer—Layer 2 of the network layer model) processes Ethernet frames during transmis-
sion and reception. The PHY interfaces to the network and has the ability to scramble and descramble
packets. With the MAC and PHY consolidated on the MCU, the system designer knows these func-
tions are matched, operating, and tested as a unit. All that is needed to connect to a network is an RJ45
jack and isolation magnetics plus the Category-5 unshielded twisted pair (Cat-5 UTP) cabling for
100BASE-TX (100 Mbps) applications or Cat-3 cable for 10 Mbps networks. The bill of materials
(BOM) couldn’t get much simpler.
There are many other features that make Stellaris microcontrollers an ideal platform for networked
embedded control, especially those utilizing Web servers for monitoring and control. Obviously to run
a network and support Web pages will require both spare performance and additional memory.
With an ARM Cortex-M3 processor at its heart, a powerful, widely-sourced and—broadly-
­supported 32-bit architecture offers performance to complete the most difficult embedded control tasks.
The Cortex-M3 improves execution efficiency and code density by 25% over most 32-bit instruction set
architectures to squeeze more performance from the processor while using far less memory. This gives
plenty of horsepower to the primary controller application while conserving precious memory.
A wide range of memory combinations are available in Stellaris MCUs from 16 KB of Flash and
2 KB of SRAM to 256 KB of Flash and 96 KB of SRAM. The ratio of RAM to Flash is plenty high
to deal with the most complex networking needs, motion control algorithms, data-processing (not just
data-logging) routines, and the single-cycle Flash accesses keep the processor from bogging down. In
Figure I.4
Many Stellaris Microcontrollers Integrate a 10/100 Ethernet MAC and the PHY On-Chip to Build a nearly
Single-Chip Networked Embedded Controller.
Stellaris MCU
ARM Cortex M3
MAC
(Layer 2)
PHY
(Layer 1)
Media
access
controller
Physical
layer entity
Magnetics
RJ45
RJ45 with integrated magnetics



<!-- Page 484 -->
### [PDF Page 484]

457
Access Your Embedded Controller with Ease through a Web Server
addition, on-chip ROM is used to free up the on-chip Flash memory for other user functions by storing
the peripheral APIs, Advanced Encryption Standard (AES) tables for cryptography, Cyclic Redun-
dancy Check (CRC) functionality for error detection, and the SafeRTOS kernel for general RTOS and
safety critical applications.
The peripheral blocks shown in Figure I.5 shows traditional MCU peripherals and important system

### features plus a solid analog section handling up to 10-bit A-to-D and 1 MSPS. Fast interrupt response

and a well-coordinated interrupt handler lets all these peripherals dance together without missing a beat,
whether they’re running motor control algorithms, other primary applications, or multiple ­networks.
The deterministic architecture of the ARM Cortex-M3 and the low overhead of communicating with
the on-chip peripherals allow Stellaris MCUs to offer superior integrated motion control and connectiv-
ity in a single chip. The powerful pulse-width modulators (PWM) and quadrature encoders greatly ease
motor control operations for precision motion control and offload these strenuous activities from the
ARM processor. A single MCU can simultaneously control a variety of motors with up to 8 general-
purpose PWMs and up to 8 channels of motion-control PWMs with dead-band generators providing
shoot-through protection for applications such as 3-phase inverter bridges. Important safety features
are also integrated, such as fault conditioning for each of the four motion-control PWM output pairs in
order to provide quick motor shutdown in low latency situations, synchronization of timers enabling
precise alignment of all edges, and quadrature encoder inputs for precise positioning sensing.
From an analog standpoint, Stellaris microcontrollers feature both analog and digital comparators to
trigger the accurate analog-to-digital converter (ADC) and to trigger an interrupt when needed, which
is useful for infrequent out-of-range events such as a current or voltage spike. This capability elimi-
nates the performance-wasting requirement of constant CPU polling. The ADCs and PWMs are closely
integrated; either one can directly trigger the other under a variety of conditions without intervention by
the CPU. An internal temperature sensor is also provided, which can be used to monitor and shut down
an appliance if it overheats. The dual ADC units provide simultaneous ADC measurement capability
making Stellaris the ideal solution for demanding motion applications that require simultaneous current
and voltage measurements or simultaneous multi-phase measurements, including sophisticated motor
drives for AC Inverters, Brushless DC motors, Stepper motors, and Brushed DC motors.
Other microcontrollers can struggle with an entire networked embedded control system. 8-bit and
even 16-bit MCUs become all-engrossed when servicing requests from the network. Inadequate on-
chip Flash can mean any significant Web page must be pulled from off-chip memory, often through
serial ports. Small on-chip SRAM can thrash about keeping up with network communications demands.
Even static Web pages have to be saved in external memory and be drawn in through serial ports
because inadequate Flash is on-chip. In the meantime the main application might choke.
One of the easiest ways of embarking on a new project is by following an example. Whether it
is determining the best motor control algorithm for the primary application, managing a CAN net-
work, or putting together an embedded Web server so the new system can be checked and adjusted
from across town, the evaluation kits for Stellaris MCUs are a valuable starting point. They come
with fully-operational boards with example motors and sample programs using real control algorithms.
A complete set of peripheral drivers are loaded on the boards. Complete user guides details applica-
tion program interface (API) functions and programming examples giving easy access to the on-chip
peripherals without having extensive deciphering of the data sheet. Software examples for TCP/IP
stacks are given and the Web server is demonstrated. Essentially all software provided is available for
study or modification.



<!-- Page 485 -->
### [PDF Page 485]

458
Appendix I
Figure I.5
Stellaris Family Block Diagram.
EPI
32
32
32
32
SYSTEM
ANALOG
MOTION CONTROL
SERIAL INTERFACES
Precision
oscillator
Battery-Backed
hibernate
LDO Voltage
regulator
3 Analog
comparators
2x 10-bit ADC
Each 8 Channel
1 Msps
Temp sensor
32ch DMA
GPIOs
2 Watchdog timers
Systick timer
Clocks, Reset
system control
ROM
96 KB SRAM
256 KB Flash
JTAG
NVIC
SWD
ARD
CortexTM-M3
100 MHz
3 UARTS
2 SSI/SPI
IEEE 1588
3 CAN
2 I2C
I2S
10/100 Ethernet
MACPHY
USB Full Speed
Host/Device/OTG
2 Quadrature
encoder inputs
8 PWM Outputs
Timer
Comparators
PWM
Generator
Dead-Band
Generator
PWM
Interrupt
4Timer/PWM/CCP
Each 32-bit or 2x16-bit
R
T
C



<!-- Page 486 -->
### [PDF Page 486]

459
Access Your Embedded Controller with Ease through a Web Server
An array of hardware and software development tools are available, including third-party compil-
ers, debuggers, RTOSs, and design support from the vast ARM community.
Beyond the formal resources, a large user community is eager to share their knowledge.
I.4  Summary
An embedded web servers is a great way to provide status, operation, production, and maintenance
information about an embedded control system to an operator that is standing at the equipment or a
thousand miles away. The system can be adjusted, reconfigured, and controlled using the same, famil-
iar, Web-based interface. The detail and display of the information provided can be as rich as desired,
yet the interface is largely the same and adds almost nothing to the cost of the equipment. Web servers
are a bonus to applications that are already taking advantage of being networked, perhaps for coordina-
tion between machines, factories, or the front office. And access to the Internet can expand options that
would be unfathomable in other scenarios.
Network access can be added to any embedded application without requiring additional circuitry,
programming, memory, or performance. Proper selection of the microcontroller will make sure the
main application isn’t impacted by this system administration.
High performance microcontrollers can perform very sophisticated operations. Powerful, peripher-
als dedicated to motion control expand the control capabilities of the processor even more. A micro-
controller family like Stellaris that is designed to also serve the networking needs of an embedded
application can provide a balanced set of resources to make networking and the Web server on top of it
run as smooth as the robot arms of the primary application. And everything integrated nicely together
keeps costs to a minimum.
The system designer doesn’t want to be burdened with learning a new processor instruction set,
implementation of complex algorithms, and the ins and outs of networking protocol. Evaluation kits
that demonstrate a complete working system similar to the end application, provided in a way that it
is easily understood and modified, along with a good set of development tools and reliable support,
enable engineers to put together advanced applications even with limited in-depth expertise in areas
like motor control, networking and Web page design.



<!-- Page 487 -->
### [PDF Page 487]

This page intentionally left blank


