# Appendix J Stellaris® Family of Microcontrollers

> **Source PDF**: THE_DEFINITIVE_GUIDE_TO_THE_ARM_CORTEX-МЗ_Stellaris_MCU_9000Series_TEINSTRUMENTS_ARM_SECOND_EDITION.pdf  
> **PDF Page Range**: 488 - 523


---


<!-- Page 488 -->
### [PDF Page 488]

461
J
Appendix
Stellaris® Family
of Microcontrollers
100 LQFP
100 LQFP
64 LQFP
64 LQFP
108 BGA
108
48 QFP
48 QFP
48 QFN



<!-- Page 489 -->
### [PDF Page 489]

462
Appendix J
Notes
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................



<!-- Page 490 -->
### [PDF Page 490]

463
Stellaris® Family of Microcontrollers
Contents
• Getting Started
pg.
• Stellaris
® Family of Microcontrollers
pg.
• StellarisWare
® Software
pg.
• Reference Design Kits & Modules
pg.
• Real-Time MCUs
pg.
• Ethernet Connected MCUs
pg. 474
• USB Connected MCUs
pg.
• USB+CAN Internetworking MCUs
pg.
• CAN Connected MCUs
480
• Ethernet+CAN Internetworking MCUs
pg.
• Ethernet+USB+CAN Internetworking MCUs
pg.
• Development Kits
pg. 486
• Connected Reference Design Kits
pg.
• Motion Reference Design Kits
pg.
464
465
466
468
469
476
478
482
484
487
491
pg.
Copyright © 2009 Texas Instruments Incorporated



<!-- Page 491 -->
### [PDF Page 491]

464
Appendix J
Copyright © 2009 Texas Instruments Incorporated
Getting Started
Product development
We provide a range of support designed to get your applications to market faster and easier than ever before. Compact, versatile, and connected!  Our evaluation kits
provide a low-cost and effective means of evaluating our microcontrollers and getting a jump start on your design (www.ti.com/stellaris_evkits).
Software made easy!
With Stellaris microcontrollers, all your programming can be in C/C++, even
interrupt service routines and startup code. We make it even easier by provid-
ing StellarisWare
® software support that includes code and royalty-free librar-
ies for applications support. The Stellaris Peripheral Driver Library provides
a royalty-free set of drivers for controlling the peripherals found on Stellaris
MCUs, and can be used as applications examples or directly included in user
applications as-is. The Stellaris USB Library is a set of data types and func-
tions for creating USB device, host, or On-the-Go (OTG) applications for
Stellaris microcontroller-based systems. We provide a Stellaris Graphics
Stellaris LM3S811
Evaluation kit
Stellaris LM3S1968
Evaluation Kit
Stellaris LM3S2965
Evaluation Kit
Stellaris LM3S3748
Evaluation Kit
Stellaris LM3S6965
Evaluation Kit
Stellaris LM3S8962
Evaluation Kit
Stellaris LM3S9B92
Evaluation Kit
Stellaris LM3S9B90
Evaluation Kit
Stellaris LM3S9B96
Development Kit
Stellaris Intelligent
Display Module –
Single Board Computer
Reference Design Kit
Stellaris Intelligent
Display Module Reference
Design Kit
Intelligent Display Module
with 3.5” Landscape Display
Reference Design Kit
Stellaris Serial to
Ethernet Reference
Design Kit
Stellaris Stepper Motor
Reference Design Kit
Stellaris Brushless
DC Motor Reference
Design Kit
Stellaris Brushed DC Motor
Control with CAN Reference
Design Kit
Stellaris AC Induction
Motor Reference
Design Kit
Library that supports graphics primitives and a widget set for creating
graphical user interfaces for Stellaris microcontroller-based systems that have
a graphical display.
All Stellaris MCUs ship with either a serial ﬂ ash loader programmed into ﬂ ash or
a boot loader in ROM, providing maximum ﬂ exibility for production programming
options. We provide a royalty-free Stellaris boot loader that facilitates in-ﬁ eld up-
dates for end applications, with ﬂ exible interface options and program signaling.
In some Stellaris microcontrollers, the Stellaris boot loader is included in ROM.
Our reference design kits accelerate product development by providing ready-to-run hardware, software, and comprehensive documentation including hardware
design ﬁ les (www.ti.com/stellaris_rdkits).



<!-- Page 492 -->
### [PDF Page 492]

465
Stellaris® Family of Microcontrollers
Copyright © 2009 Texas Instruments Incorporated
Stellaris
® Family of Microcontrollers
Stellaris is the industry’s leading family of robust, real-time microcontrollers
(MCUs) based on the revolutionary Cortex™-M3 technology from ARM
®.
The award-winning Stellaris 32-bit MCUs combine sophisticated, ﬂ exible
mixed-signal system-on-chip integration with unparalleled real-time multi-
tasking capabilities. Complex applications previously impossible with legacy
MCUs can now be accommodated with ease by powerful, cost-effective
and simple-to-program Stellaris MCUs.  With over 160 members in its family,
the Stellaris family offers the widest selection of precisely compatible MCUs
in the industry.
The Stellaris family is positioned for cost-conscious applications requiring
signiﬁ cant control processing and connectivity capabilities, including motion
control, monitoring (remote, ﬁ re/security, etc.), HVAC and building controls,
power and energy monitoring and conversion, network appliances and switches,
factory automation, electronic point-of-sale machines, test and measurement
equipment, medical instrumentation, and gaming equipment.
In addition to MCUs conﬁ gured for general-purpose real-time systems, the Stel-
laris family offers distinct solutions for advanced motion control and energy
conversion applications, real-time networking and real-time internetworking,
and combinations of these applications including connected motion control
and hard real-time networking.  Welcome to the future of microcontrollers!
Why choose the ARM architecture?
For the ﬁ rst time ever, embedded microcontroller system designers can
utilize 32-bit performance for the same price as their current 8- and 16-bit
microcontroller designs!
• With entry-level pricing at $1.00 for an ARM technology-based MCU,
the Stellaris product line allows for standardization that eliminates future
architectural upgrades or software tools changes.
• With an ARM-based embedded market that is currently shipping at a rate
of greater than 4.6 billion processors per year, the ARM ecosystem of
third-party tools and solutions providers is the largest in the world.
• With the ARM Cortex architecture, designers have access to an
instruction-set-compatible family that ranges from $1 to 1 GHz.
Why choose Cortex-M3?
Cortex-M3 is the MCU version of ARM’s V7 instruction set
architecture family of cores:
• Optimized for single-cycle ﬂ ash usage
• Deterministic, fast interrupt processing: always 12 cycles, or
just 6 cycles with tail-chaining
• Three sleep modes with clock gating for low power
• Single-cycle multiply instruction and hardware divide
• Atomic operations
• ARM Thumb2 mixed 16-/32-bit instruction set
• 1.25 DMIPS/MHz—better than ARM7 and ARM9
• Extra debug support including data watchpoints and ﬂ ash patching
Capabilities beyond ARM7 for the microcontroller market:
• Requires approximately 1/2 the ﬂ ash (code space) of ARM7 applications
• 2–4 times faster on MCU control applications
• No assembly code required—ever!
Why choose the Stellaris Family?
Designed for serious microcontroller applications, the Stellaris family provides
the entry into the industry’s strongest ecosystem, with code compatibility
ranging from $1 to 1 GHz.
• Superior integration saves up to $3.28 in system cost
• Over 160 Stellaris family members to choose from
• Real MCU GPIOs—all can generate interrupts, are 5V-tolerant, and
have programmable drive strength and slew rate control
• Advanced communication capabilities, including 10/100 Ethernet MAC/PHY,
USB and USB OTG, CAN controllers, and extended peripheral interfaces
• Sophisticated motion control support in hardware and software
• Both analog comparators and ADC functionality provide on-chip system
options to balance hardware and software performance
• Development is easy with the royalty-free StellarisWare software
Stellaris family block diagram



<!-- Page 493 -->
### [PDF Page 493]

466
Appendix J
Copyright © 2009 Texas Instruments Incorporated
StellarisWare
®  Software
StellarisWare®
Our StellarisWare software is an extensive suite of software designed to simplify and speed development of Stellaris-based microcontroller applications, containing:
Stellaris Peripheral Driver Library
The Stellaris Peripheral Driver Library is a royalty-free set of functions for controlling the peripherals found on the Stellaris family of ARM Cortex-M3 microcontrollers.
Vastly superior to a GUI peripheral conﬁ guration tool, the Stellaris Peripheral Driver Library performs both peripheral initialization and peripheral control functions with a
choice of polled or interrupt-driven peripheral support.
The Stellaris Peripheral Driver Library provides support for two programming models: the direct register access model
and the software driver model. Each programming model can be used independently or combined, based on the needs
of the application or the programming environment desired by the developer. The direct register access model includes
header ﬁ les for each speciﬁ c Stellaris MCU and will generally result in smaller and more efﬁ cient code in a software development environment familiar to most deeply
embedded ﬁ rmware engineers and to engineers used to working with 8- and 16-bit MCUs. The software driver model insulates the software engineer from hardware
details including the operation of each register, bit ﬁ eld, their interactions, and sequencing required for the proper operation of the peripheral, generally requiring less time
to develop applications. Some Stellaris microcontrollers provide the Stellaris Peripheral Driver Library on-chip in ROM (read-only memory). With the Stellaris Peripheral
Driver Library in ROM, it is easier than ever to use the library to quickly develop efﬁ cient and functional applications in an environment where the entire ﬂ ash memory is
available for use for the application. The ROM-based Stellaris Peripheral Driver Library also supports user ﬂ ash-based overrides of standard Stellaris Peripheral Driver
Library functions, for complete ﬂ exibility in functionality.
Stellaris Graphics Library
The Stellaris Graphics Library is a royalty-free set of graphics primitives and a widget set for creating graphical user interfaces on Stellaris microcontroller-based boards
that have a graphical display. The graphical library consists of three building layers of functionality: the display driver layer, speciﬁ c to the display in use; the graphics
primitives layer, which draws points, lines, rectangles, circles, fonts, bitmap images, and text, either in the active display buffer or in an off-screen buffer for ﬂ icker-free
operation; and the widget layer, which provides checkboxes, push buttons, radio buttons, sliders, list boxes, and a generic encapsulation of one or more graphics primi-
tives to draw a user interface element on the display, along with the ability to provide application-deﬁ ned responses to user interaction with the widget element.
Stellaris USB Library
Stellaris microcontrollers with USB functionality have all passed USB Device and USB Embedded Host compliance testing. The Stellaris
USB Library is a royalty-free set of data types and functions for creating USB device, host, or On-the-Go (OTG) applications for Stellaris
microcontroller-based systems.  Several programming interfaces are provided, ranging from the thinnest layer, which merely abstracts the
underlying USB controller hardware, to high-level interfaces offering simple APIs supporting speciﬁ c devices. USB device examples provided
include HID keyboard, HID mouse, CDC serial, and generic bulk. USB host examples provided include mass storage (USB ﬂ ash stick), HID keyboard, and HID mouse. In
addition, the Stellaris USB library provides a Windows™-based INF for the supported USB classes in a precompiled DLL that saves development time.
•  Stellaris Peripheral Driver Library for Stellaris peripheral initialization
and control functions
•  Stellaris USB Library for USB device, USB host, or USB On-the-Go (OTG)
applications
•  Stellaris Graphics Library for graphical display support
StellarisWare software packages have the following features and beneﬁ ts:
•  Free license and royalty-free use (for use with Stellaris MCUs).
•  Simplify and speed the development of applications—can be used for
application development or as a programming example.
• Allow the creation of full-function, easy-to-maintain code.
• Written entirely in C except where absolutely not possible. Even written in C,
the software is reasonably efﬁ cient in terms of memory and processor usage
due to the compact nature of the Cortex-M3 Thumb2 instruction set.
•  Take full advantage of the stellar interrupt performance of the Cortex-M3 core,
without requiring any special pragmas or custom assembly code prologue/
epilogue functions.
• Can be compiled with error-checking code (for development use) or without
(for ﬁ nal production use in an MCU with a smaller memory conﬁ guration).
• Available as both object library and source code, so that the library can be
used as-is or adapted as desired.
• Compiles on ARM/Keil, IAR, Code Red, Code Sourcery, and generic GNU
development tools.



<!-- Page 494 -->
### [PDF Page 494]

467
Stellaris® Family of Microcontrollers
Copyright © 2009 Texas Instruments Incorporated
StellarisWare
® Software
Stellaris code examples
All Stellaris development and evaluation kits ship with a rich set of applications that provide examples of how to use Stellaris microcontrollers and the StellarisWare
Software. Every kit ships with a quickstart application that is tailored to use the features provided on the evaluation board. Because the quickstart application uses many
of the peripherals on the board simultaneously, the kits also ship with a set of simpler applications. These simpler applications provide stand-alone coding examples for
all peripherals that are supported in the kit. To support user development with the kit, source code and project ﬁ les are provided for the quickstart application and the
simpler example applications. Documentation is provided for all example projects that explains the functionality of each example application.
Stellaris in-system programming support
Stellaris microcontrollers provide a number of different mechanisms for in-system programming support. Many Stellaris microcontrollers ship with a royalty-free one-
time-use serial ﬂ ash loader application pre-programmed into ﬂ ash. For these microcontrollers, the serial ﬂ ash loader can be used in conjunction with our LMFlash ap-
plication, a standard JTAG debugger, or a production programmer to load the end application into ﬂ ash during manufacturing.
Some Stellaris microcontrollers provide the Stellaris boot loader in read-only memory (ROM) integrated on the device.  These microcontrollers provide ﬂ exible interface
options for ﬂ ash programming (both manufacturing and in-ﬁ eld updates) directly through the on-chip ROM.
Stellaris serial ﬂ ash loader
Some Stellaris microcontrollers ship with a royalty-free serial ﬂ ash loader application pre-programmed into ﬂ ash. The serial ﬂ ash loader is a small application that allows
programming of the ﬂ ash without the need for a debugger interface or production programmer. With easy interface options including UART or SSI, the serial ﬂ ash loader
provides users with maximum ﬂ exibility in their production programming options. We provide a free ﬂ ash programming utility for PCs called LMFlash that supports either
command line or GUI usage and makes full use of all the commands supported by the serial ﬂ ash loader application.  For users desiring to build their own ﬂ ash program-
mers,  we also supply a sample UART download utility that makes full use of all the commands supported by the serial ﬂ ash loader application. Application note AN01242
provides source code and information about the serial ﬂ ash loader and the sample UART download utility sﬂ ash.exe.
• Pre-loaded in ﬂ ash on all shipped Stellaris MCUs that do not have the ROM-based Stellaris Boot Loader.
• Small piece of code that allows programming of the ﬂ ash without the need for a debugger interface.
• Interface options include UART or SSI.
• Free LMFlash utility makes full use of all commands supported by the serial ﬂ ash loader.
Stellaris boot loader
For applications desiring in-ﬁ eld programmability, we also provide royalty-free Stellaris boot loader source code that can be added to your application at the beginning of
the ﬂ ash memory. This small piece of code can act as an application loader and stay resident to support in-ﬁ eld programmability for your end application. With ﬂ exible
interface options including a UART, I2C, SSI, USB host, USB device or Ethernet, and selectable methods for signaling an in-ﬁ eld update, the Stellaris boot loader provides
users with maximum ﬂ exibility in boot loader requirements. The Stellaris Peripheral Driver Library includes source code and information about the Stellaris boot loader,
including example applications that utilize the boot loader for in-ﬁ eld updates. Some Stellaris microcontrollers provide the Stellaris boot loader in read-only memory (ROM)
integrated on the device.
• Free license and royalty-free use (for use with Stellaris MCUs).
•  Small piece of code that can be programmed at the beginning of ﬂ ash to act as an application loader;
available integrated on-chip in ROM on some Stellaris microcontrollers.
•  Also used as an update mechanism for an application running on a Stellaris microcontroller.
•  Interface options include UART (default), I2C, SSI, USB host, USB device or Ethernet.
Software
© 2009 TEXAS INSTRUMENTS
www.ti.com



<!-- Page 495 -->
### [PDF Page 495]

468
Appendix J
Copyright © 2009 Texas Instruments Incorporated
Reference Design Kits & Modules
Flexibility in production
We provide ﬂ exibility in go-to-market strategies for a range of applications areas.  Engineers can start product evaluation and development with a Stellaris Evaluation
Kit (www.ti.com/stellaris_evkits) or with a ready-to-run Stellaris Reference Design Kit (www.ti.com/stellaris_rdkits). Engineers can then go directly into production
using an off-the-shelf, ready-to-integrate Stellaris Module (www.ti.com/stellaris_modules), or by integrating the open-tooled royalty-free reference design hardware
and software into the embedded application system.
Our modules accelerate time to market by providing ready-to-run hardware and useful software in a convenient module form-factor. With an open-tooled approach to
reference design kits and modules, users can either obtain pre-built modules from us, or build the modules using their own board manufacturing facilities. The board
development packages available for each module from www.ti.com/stellaris_modules provide schematics, BOM, and Gerbers.
Stellaris Brushed DC
Motor Module
Stellaris Brushless DC
Motor Module
Stellaris Stepper
Motor Module
Stellaris AC Induction
Motor Module
Stellaris Serial to
Ethernet Module
Stellaris Intelligent
Display Module with
Power-over-Ethernet
Stellaris Intelligent
Display Module
with Ethernet
Stellaris Intelligent
Display Module with
3.5” Landscape Display
Evaluation
Production
Stellaris
Open-Tooled
Reference Design Kits
Stellaris
Quickstart
Evaluation Kits
Stellaris Modules
Stellaris MCUs
Use our
Complete Open-Tool
HW & SW Design
Off-the-Shelf &
Ready-to-Integrate
PRODUCTION
SUCCESS!
PRODUCTION
SUCCESS!
Evaluation
Complete
GO



<!-- Page 496 -->
### [PDF Page 496]

469
Stellaris® Family of Microcontrollers
Copyright © 2009 Texas Instruments Incorporated
r e a l - t i m e  m c u s
Real-time MCUs
We offer thirty low pin count, low-cost, and
feature-rich Stellaris ARM Cortex-M3 micro-
controllers in two packages: a 48-pin LFQP,
and a new space-saving 48-pin QFN. The
LM3S100 Series and LM3S300 Series are
perfect for basic embedded control applica-
tions and 8-/16-bit upgrades. The LM3S600
Series and LM3S800 Series are optimized
for embedded control applications requir-
ing more sophisticated algorithms. Each Stellaris microcontroller offers efﬁ cient
performance and extensive integration, favorably positioning the devices into cost-
conscious applications requiring signiﬁ cant control processing capabilities such as
motion control, medical instrumentation, HVAC and building control, factory automa-
tion, transportation, electronic point-of-sale machines, and gaming equipment.
Stellaris LM3S811 Evaluation Kit
• Evaluation board with 50 MHz LM3S811 microcontroller
• 96 x 16 pixel OLED display
• User-programmable push button and LED
• Convenient reset push button and power indicator LED
• Thumbwheel potentiometer input to the on-chip ADC
• Serial in-circuit debug interface over USB
• USB cable
• 20-pin JTAG/SWD target cable
• CD containing:
– Evaluation version of the software tools
– Complete documentation
– Quickstart guide and source code
– StellarisWare software including peripheral driver library
and example source code
• Example applications demonstrating the use of various third
party Real-Time Operating Systems are available for download
from www.ti.com/stellaris_lm3s811.
Our LM3S1000 Series of Stellaris ARM
Cortex-M3 microcontrollers feature new
combinations of expanded general-
purpose I/O, larger on-chip memory,
and low-power optimization for battery-
backed applications. Offered in a 64-pin
LQFP, 100-pin LQFP or 108-pin BGA
package, the LM3S1000 Series offers
efﬁ cient performance and extensive integration, favorably positioning the de-
vice into cost-conscious applications requiring signiﬁ cant control processing
capabilities such as motion control, medical instrumentation, HVAC and building
control, factory automation, transportation, electronic point-of-sale machines,
and gaming equipment.
Stellaris LM3S1968 Evaluation Kit
• LM3S1968 Evaluation Board with a quickstart sample application
– Stellaris LM3S1968 MCU with 256K ﬂ ash, 64K SRAM, 8 ADCs, and
up to 52 GPIOs
– All LM3S1968 I/O available on labeled break-out pads
– Support for battery-backed hibernate mode
– Simple setup: USB cable provides serial communication, debugging,
and power
– OLED graphics display with 128 x 64 pixel resolution and 16 shades
of gray
– User LED, navigation switches, and select pushbuttons, magnetic speaker
– Standard ARM 20-pin JTAG debug connector with input and output modes
• USB and JTAG cables
• CD containing:
– Evaluation version of the software tools, complete documentation,
Quickstart guide and source code
– StellarisWare software including peripheral driver library and example
source code
Evaluation kit ordering information
Part number
Description
EKK-LM3S811
Stellaris LM3S811 Evaluation Kit for Keil RealView MDK-ARM (32 KB
code-size limited)
EKI-LM3S811
Stellaris LM3S811 Evaluation Kit for IAR Systems Embedded Workbench
(32 KB code-size limited)
EKC-LM3S811
Stellaris LM3S811 Evaluation Kit for CodeSourcery G++ GNU (30-day
ltd.)
EKT-LM3S811
Stellaris LM3S811 Evaluation Kit for Code Red Technologies Red Suite
(32 KB code-size limited)
Evaluation kit ordering information
Part number
Description
EKK-LM3S1968
Stellaris LM3S1968 Evaluation Kit for Keil RealView
MDK-ARM (32 KB code-size limitation)
EKI-LM3S1968
Stellaris LM3S1968 Evaluation Kit for IAR Systems
Embedded Workbench (32 KB code-size limited)
EKC-LM3S1968
Stellaris LM3S1968 Evaluation Kit for CodeSourcery
G++ GNU (30-day limited)
EKT-LM3S1968
Stellaris LM3S1968 Evaluation Kit for Code Red Tech-
nologies Red Suite (90-day limited)



<!-- Page 497 -->
### [PDF Page 497]

470
Appendix J
Copyright © 2009 Texas Instruments Incorporated
Real-Time MCUs
r e a l - t i m e  m c u s
LM3S101
LM3S102
LM3S300
LM3S301
LM3S308
LM3S310
LM3S315
LM3S316
LM3S317
LM3S328
LM3S600
LM3S601
LM3S608
LM3S610
memory
Flash (KB)
8
8
16
16
16
16
16
16
16
16
32
32
32
32
SRAM (KB)
2
2
4
2
4
4
4
4
4
4
8
8
8
8
ROM Software
Libraries
–
–
–
–
–
–
–
–
–
–
–
–
–
–
DMA
–
–
–
–
–
–
–
–
–
–
–
–
–
–
SAFERTOS™
–
–
–
–
–
–
–
–
–
–
–
–
–
–
core
Max Speed (MHz)
20
20
25
20
25
25
25
25
25
25
50
50
50
50
Internal Precision
Oscillator
–
–
–
–
–
–
–
–
–
–
–
–
–
–
MPU
–
–
P
P
P
P
P
P
P
P
P
P
P
P
timers
SysTick (24-bit)
P
P
P
P
P
P
P
P
P
P
P
P
P
P
General-Purpose
2
2
3
2
3
3
3
3
3
3
3
3
3
3
Real-Time Clock (RTC)
P
P
P
P
P
P
P
P
P
P
P
P
P
P
Watchdog
1
1
1
1
1
1
1
1
1
1
1
1
1
1
Motion Control
PWM
–
–
–
2
–
6
2
4
6
–
–
6
–
6
PWM Fault
–
–
–
1
–
1
1
1
1
–
–
1
–
1
Dead-Band
Generator
–
–
–
P
–
P
P
P
P
–
–
√
–
√
CCP
1
2
6
2
6
6
6
6
6
6
6
6
6
6
QEI Channels
–
–
–
–
–
–
–
–
–
–
–
1
–
–
external peripheral
interface
–
–
–
–
–
–
–
–
–
–
–
–
–
–
serial interfaces
Ethernet
10/100 MAC+PHY
–
–
–
–
–
–
–
–
–
–
–
–
–
–
IEEE 1588
–
–
–
–
–
–
–
–
–
–
–
–
–
–
CAN MAC
–
–
–
–
–
–
–
–
–
–
–
–
–
–
USB D, H, or O
–
–
–
–
–
–
–
–
–
–
–
–
–
–
UART
1
1
2
1
2
2
2
2
1
2
2
2
2
2
I2C
–
1
1
–
1
–
–
1
–
1
1
1
1
1
SSI/SPI
1
1
1
1
1
1
1
1
1
1
1
1
1
1
I2S
–
–
–
–
–
–
–
–
–
–
–
–
–
–
analog
ADC (10-bit)
ADC Units
–
–
–
1
1
–
1
1
1
1
–
–
1
1
ADC Channels
–
–
–
3
8
–
4
4
6
8
–
–
8
2
ADC Speed
(samples per
second)
–
–
–
250K
500K
–
250K
250K
250K
500K
–
–
500K
500K
Internal Temp Sensor
–
–
–
P
P
–
P
P
P
P
–
–
P
P
Analog/Digital
Comparators
2/-
1/-
3/-
2/-
1/-
3/-
1/-
1/-
1/-
-/-
3/-
3/-
1/-
-/-
gpios (5-v tolerant)
2-18
0-18
8-36
12-33
5-28
3-36
7-32
3-32
3-30
7-28
8-36
0-36
5-28
6-34
battery-backed
hibernation
–
–
–
–
–
–
–
–
–
–
–
–
–
–
ldo voltage regulator
P
P
P
P
P
P
P
P
P
P
P
P
P
P
operating temperature
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
package
28SOIC
48QFP
48QFN
28SOIC
48QFP
48QFN
48QFP
48QFN
48QFP
48QFN
48QFP
48QFN
48QFP
48QFN
48QFP
48QFN
48QFP
48QFN
48QFP
48QFN
48QFP
48QFN
48QFP
48QFN
48QFP
48QFN
48QFP
48QFN
48QFP
48QFN
production (p) or
sampling (s)
P
P
P
P
P
P
P
P
P
P
P
P
P
P



<!-- Page 498 -->
### [PDF Page 498]

471
Stellaris® Family of Microcontrollers
s e c t i o n  h e a d
Copyright © 2009 Texas Instruments Incorporated
r e a l - t i m e  m c u s
Real-Time MCUs
[a] PWM motion-control functionality can be achieved through dedicated motion control hardware (the PWM pins) or through the motion control features of the general-purpose timers (the CCP pins). See data sheet for details.  [b] Minimum is number
of pins dedicated to GPIO; additional pins are available if certain peripherals are not used. See data sheet for details. [c] Industrial (I) is -40 to +85 °C and Extended (E) is -40 to +105 °C. [d] 108-pin BGA and 64-pin LQFP package only available in
Industrial temperature.
LM3S611
LM3S612
LM3S613
LM3S615
LM3S617
LM3S618
LM3S628
LM3S800
LM3S801
LM3S808
LM3S811
LM3S812
LM3S815
LM3S817
LM3S818
LM3S828
32
32
32
32
32
32
32
64
64
64
64
64
64
64
64
64
8
8
8
8
8
8
8
8
8
8
8
8
8
8
8
8
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
50
50
50
50
50
50
50
50
50
50
50
50
50
50
50
50
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
3
3
3
3
3
3
3
3
3
3
3
3
3
3
3
3
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
6
2
4
6
6
6
–
–
6
–
6
2
6
6
6
–
1
1
1
1
1
1
–
–
1
–
1
1
1
1
1
–
√
√
√
√
√
√
–
–
P
–
P
P
P
P
P
–
6
6
6
6
6
4
4
6
6
6
6
6
6
6
4
6
–
–
–
–
–
1
–
–
1
–
–
–
–
–
1
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
2
2
2
2
2
2
2
2
2
2
2
2
2
2
2
2
1
1
1
1
–
–
1
1
1
1
1
1
1
–
–
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
1
1
1
1
1
1
1
–
–
1
1
1
1
1
1
1
4
2
4
2
6
6
8
–
–
8
4
2
2
6
6
8
500K
500K
500K
500K
500K
500K
1M
–
–
500K
500K
250K
500K
1M
1M
1M
P
P
P
P
P
P
P
–
–
P
P
P
P
P
P
P
-/-
1/-
1/-
3/-
1/-
1/-
-/-
3/-
3/-
1/-
1/-
1/-
3/-
1/-
1/-
-/-
4-32
7-34
3-32
0-34
1-30
0-30
9-28
8-36
0-36
5-28
1-32
7-34
0-34
1-30
0-30
7-28
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
48QFP
48QFN
48QFP
48QFN
48QFP
48QFN
48QFP
48QFN
48QFP
48QFN
48QFP
48QFN
48QFP
48QFN
48QFP
48QFN
48QFP
48QFN
48QFP
48QFN
48QFP
48QFN
48QFP
48QFN
48QFP
48QFN
48QFP
48QFN
48QFP
48QFN
48QFP
48QFN
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P



<!-- Page 499 -->
### [PDF Page 499]

472
Appendix J
Copyright © 2009 Texas Instruments Incorporated
Real-Time MCUs
r e a l - t i m e  m c u s
LM3S1110
LM3S1133
LM3S1138
LM3S1150
LM3S1162
LM3S1165
LM3S1332
LM3S1435
LM3S1439
LM3S1512
LM3S1538
LM3S1601
LM3S1607
LM3S1608
LM3S1620
LM3S1625
LM3S1626
memory
Flash (KB)
64
64
64
64
64
64
96
96
96
96
96
128
128
128
128
128
128
SRAM (KB)
16
16
16
16
16
16
16
32
32
64
64
32
32
32
32
32
32
ROM Software
Libraries
–
–
–
–
–
–
–
–
–
–
–
–
P
–
–
P
P
DMA
–
–
–
–
–
–
–
–
–
–
–
–
P
–
–
P
P
SAFERTOS™
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
core
Max Speed (MHz)
25
50
50
50
50
50
50
50
50
25
50
50
50
50
25
50
50
Internal Precision
Oscillator
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
MPU
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
timers
SysTick (24-bit)
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
General-Purpose
3
4
4
4
4
4
4
3
3
4
4
4
4
4
3
4
4
Real-Time Clock (RTC)
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
Watchdog
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
Motion Control
PWM
–
2
–
6
6
6
–
2
6
–
–
–
–
–
6
4
4
PWM Fault
–
1
–
1
1
1
–
1
1
–
–
–
–
–
1
1
1
Dead-Band
Generator
–
P
–
P
P
P
–
P
P
–
–
–
–
–
P
P
P
CCP
2
8
6
6
6
8
8
4
6
8
8
8
6
8
4
4
4
QEI Channels
–
–
–
1
–
–
–
–
1
1
1
–
–
–
1
–
1
external peripheral
interface
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
serial interfaces
Ethernet
10/100 MAC+PHY
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
IEEE 1588
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
CAN MAC
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
USB D, H, or O
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
UART
2
3
3
3
3
3
2
2
2
3
3
3
3
2
2
1
2
I2C
–
1
2
1
1
1
–
1
1
2
2
2
2
2
1
2
1
SSI/SPI
1
2
2
2
2
2
1
1
2
2
2
2
1
2
2
1
1
I2S
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
analog
ADC (10-bit)
ADC Units
–
1
1
–
1
1
1
1
1
1
1
–
1
1
–
1
1
ADC Channels
–
2
8
–
2
4
3
2
4
2
8
–
8
8
-
6
6
ADC Speed
(samples per
second)
–
250K
1M
–
500K
500K
250K
500K
500K
250K
500K
–
500K
500K
–
500K
500K
Internal Temp Sensor
–
P
P
–
P
P
P
P
P
P
P
–
P
P
–
P
P
Analog/Digital
Comparators
2/-
1/-
3/-
3/-
3/-
1/-
3/-
1/-
1/-
3/-
-/-
2/-
-/-
2/-
3/-
1/-
-/-
gpios (5-v tolerant)
20-41
9-44
9-46
7-52
4-46
4-43
29-57
21-46
14-52
15-58
9-43
23-60
0-33
17-52
11-52
0-33
0-33
battery-backed
hibernation
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
–
–
ldo voltage regulator
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
operating temperature
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I
I/E
I/E
I
I
package
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
64LQFP
100LQFP
108BGA
100LQFP
108BGA
64LQFP
64LQFP
production (p) or
sampling (s)
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P



<!-- Page 500 -->
### [PDF Page 500]

473
Stellaris® Family of Microcontrollers
Copyright © 2009 Texas Instruments Incorporated
Real-Time MCUs
r e a l - t i m e  m c u s
[a] PWM motion-control functionality can be achieved through dedicated motion control hardware (the PWM pins) or through the motion control features of the general-purpose timers (the CCP pins). See data sheet for details.  [b] Minimum is number
of pins dedicated to GPIO; additional pins are available if certain peripherals are not used. See data sheet for details. [c] Industrial (I) is -40 to +85 °C and Extended (E) is -40 to +105 °C. [d] 108-pin BGA and 64-pin LQFP package only available in
Industrial temperature.
LM3S1627
LM3S1635
LM3S1637
LM3S1751
LM3S1776
LM3S1811
LM3S1816
LM3S1850
LM3S1911
LM3S1918
LM3S1937
LM3S1958
LM3S1960
LM3S1968
LM3S1J11
LM3S1J16
LM3S1N11
LM3S1N16
LM3S1W16
LM3S1Z16
128
128
128
128
128
256
256
256
256
256
256
256
256
256
128
128
64
64
32
16
32
32
32
64
64
32
32
32
64
64
64
64
64
64
20
20
12
12
8
6
P
–
–
–
P
P
P
–
–
–
–
–
–
–
P
P
P
P
P
P
P
–
–
–
P
P
P
–
–
–
–
–
–
–
P
P
P
P
P
P
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
50
50
50
50
50
50
50
50
50
50
50
50
50
50
50
50
50
50
50
50
–
–
–
–
–
1
1
–
–
–
–
–
–
–
1
1
1
1
1
1
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
4
4
4
3
3
4
4
3
4
4
3
4
4
4
3
3
3
3
3
3
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
1
1
1
1
1
2
2
1
1
1
1
1
1
1
2
2
2
2
2
2
6
6
6
4
8
–
–
6
–
–
6
–
6
6
–
–
–
–
–
–
1
1
1
1
3
–
–
1
–
–
1
–
1
1
–
–
–
–
–
–
P
P
P
P
P
–
–
P
–
–
P
–
P
P
–
–
–
–
–
–
4
8
6
6
2
8
8
6
8
8
4
8
8
4
6
6
6
6
6
6
1
–
1
–
–
–
–
1
–
–
–
–
2
2
–
–
–
–
–
–
–
–
–
–
–
P
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
2
3
3
3
1
3
3
2
3
2
2
3
3
3
3
3
3
3
3
3
1
2
1
1
1
2
2
1
2
2
1
2
2
2
2
2
2
2
2
2
1
2
1
2
1
2
2
1
2
2
1
2
2
2
2
2
2
2
2
2
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
1
1
1
1
1
1
1
–
–
1
1
1
–
1
1
1
1
1
1
1
4
4
4
4
6
8
8
–
–
8
4
8
–
8
8
8
8
8
8
8
500K
500K
1M
500K
1M
1M
1M
–
–
500K
1M
1M
–
1M
1M
1M
1M
1M
1M
1M
P
P
P
P
P
P
P
–
–
P
P
P
–
P
P
P
P
P
P
P
-/-
2/-
1/-
1/-
-/-
2/8
2/8
3/-
2/-
2/-
1/-
-/-
3/-
3/-
2/8
2/8
2/8
2/8
2/8
2/8
0-33
12-56
7-43
21-56
1-33
0-67
0-33
17-56
23-60
17-52
27-56
21-52
7-60
5-52
0-67
0-33
0-67
0-33
0-33
0-33
–
P
P
P
P
√
√
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
√
√
P
P
P
P
P
P
P
P
P
P
P
P
P
I
I/E
I/E
I/E
I
I
I
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I
I
I
I
I
I
64LQFP
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
64LQFP
100LQFP
64LQFP
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
64LQFP
100LQFP
64LQFP
64LQFP
64LQFP
P
P
P
P
P
S
S
P
P
P
P
P
P
P
S
S
S
S
S
S



<!-- Page 501 -->
### [PDF Page 501]

474
Appendix J
Copyright © 2009 Texas Instruments Incorporated
Ethernet Connected MCUs
e t h e r n e t  c o n n e c t e d  m c u s
Stellaris LM3S6965 Ethernet
Evaluation Kit
Stellaris LM3S6965 Evaluation Kits provide a compact and versatile
evaluation platform for Ethernet-enabled Stellaris ARM Cortex-M3-based
microcontrollers. The kit includes two examples of an embedded web-server
demonstration application. The quickstart application that runs out-of-the-box
includes an embedded web server utilizing the Open Source lwIP Ethernet
stack. The kit also contains a web server application with FreeRTOS.org™
RTOS and the Open Source uIP Ethernet stack. Each board has an In-Circuit
Debug Interface (ICDI) that provides hardware debugging functionality not
only for the on-board Stellaris device, but also for any Stellaris microcontroller-
based target board. The evaluation kits contain all cables, software, and
documentation needed to develop and run applications for Stellaris
microcontrollers easily and quickly. In addition, example applications
demonstrating the use of various third-party Real-Time Operating Systems
and commercial Ethernet stacks are available for download from
www.ti.com/stellaris_lm3s6965.
Stellaris LM3S6965 Ethernet Evaluation
Kit features
• LM3S6965 Evaluation Board
• Stellaris LM3S6965 microcontroller with fully integrated 10/100
(MAC+PHY) Ethernet controller
• Simple setup: USB cable provides serial communication, debugging,
and power
• OLED graphics display with 128 x 64 pixel resolution and 16 shades of gray
• User LED, navigation switches, and select pushbuttons
• Magnetic speaker
• All LM3S6965 I/O available on labeled break-out pads
• Standard ARM 20-pin JTAG debug connector with input and output modes
• MicroSD card slot
• Retracting Ethernet cable, USB cable, and JTAG cable
• Quickstart sample application runs with or without Ethernet (direct
connection to your PC), right out of the box
• CD containing:
– Evaluation version of the software tools
– Quickstart guide and source code
– Complete documentation
– StellarisWare software including peripheral driver library and example
source code
Evaluation kit ordering information
Part number
Description
EKK-LM3S6965
Stellaris LM3S6965 Ethernet Evaluation Kit for Keil RealView MDK-ARM (32 KB code-size limited)
EKI-LM3S6965
Stellaris LM3S6965 Ethernet Evaluation Kit for IAR Systems Embedded Workbench (32 KB code-size limited)
EKC-LM3S6965
Stellaris LM3S6965 Ethernet Evaluation Kit for CodeSourcery G++ GNU (30-day limited)
EKT-LM3S6965
Stellaris LM3S6965 Evaluation Kit for Code Red Technologies Red Suite (90-day limited)
Our LM3S6000 Series of Stellaris ARM Cortex-M3 microcontrollers feature new combinations of industrial real-time connectivity, expanded general-purpose I/O, larger
on-chip memory, and low-power optimization for battery-backed applications. The LM3S6000 series provides the world’s ﬁ rst MCUs featuring a fully integrated 10/100
Mbps Ethernet solution with ARM architecture compatibility. The LM3S6000 devices combine both the Ethernet Media Access Control (MAC) and Physical (PHY) layers,
marking the ﬁ rst time that integrated connectivity is available with an ARM Cortex-M3 MCU and the only integrated 10/100 Ethernet MAC and PHY available in an ARM
architecture MCU. In addition, selected LM3S6000 Series Stellaris MCUs also feature hardware assist for IEEE 1588 Precision Time Protocol support.



<!-- Page 502 -->
### [PDF Page 502]

475
Stellaris® Family of Microcontrollers
Copyright © 2009 Texas Instruments Incorporated
Ethernet Connected MCUs
e t h e r n e t  c o n n e c t e d  m c u s
[a] PWM motion-control functionality can be achieved through dedicated motion control hardware (the PWM pins) or through the motion control features of the general-purpose timers (the CCP pins). See data sheet for details.  [b] Minimum is
number of pins dedicated to GPIO; additional pins are available if certain peripherals are not used. See data sheet for details. [c] Industrial (I) is -40 to +85 °C and Extended (E) is -40 to +105 °C. [d] 108-pin BGA package only available in Industrial
temperature.
LM3S6100
LM3S6110
LM3S6420
LM3S6422
LM3S6432
LM3S6537
LM3S6610
LM3S6611
LM3S6618
LM3S6633
LM3S6637
LM3S6730
LM3S6753
LM3S6911
LM3S6918
LM3S6938
LM3S6950
LM3S6952
LM3S6965
memory
Flash (KB)
64
64
96
96
96
96
128
128
128
128
128
128
128
256
256
256
256
256
256
SRAM (KB)
16
16
32
32
32
64
32
32
32
32
32
64
64
64
64
64
64
64
64
ROM Software
Libraries
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
DMA
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
SAFERTOS™
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
core
Max Speed (MHz)
25
25
25
25
50
50
25
50
50
50
50
50
50
50
50
50
50
50
50
Internal Precision
Oscillator
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
MPU
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
timers
SysTick (24-bit)
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
General-Purpose
3
3
3
3
3
4
4
4
4
3
4
3
4
4
4
4
4
3
4
Real-Time Clock (RTC)
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
Watchdog
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
Motion Control
PWM
–
2
–
–
2
6
4
–
–
–
–
–
6
–
–
–
6
4
6
PWM Fault
–
1
–
–
1
1
1
–
–
–
–
–
1
–
–
–
1
1
1
Dead-Band
Generator
–
P
–
–
P
P
P
–
–
–
–
–
P
–
–
–
P
P
P
CCP
4
4
4
4
4
6
6
6
6
6
6
4
4
6
6
6
6
4
4
QEI Channels
–
–
–
–
–
–
1
–
–
–
–
–
1
–
–
–
1
1
2
external peripheral
interface
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
serial interfaces
Ethernet
10/100 MAC+PHY
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
IEEE 1588
–
–
–
–
–
P
–
–
–
–
–
–
P
–
–
–
P
–
–
CAN MAC
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
USB D, H, or O
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
UART
1
1
1
1
2
2
3
3
2
2
2
1
2
3
2
3
3
3
3
I2C
–
–
–
–
1
1
1
2
2
1
1
-
1
2
2
1
1
1
2
SSI/SPI
1
1
1
1
1
1
1
2
2
1
1
1
1
2
2
1
2
1
1
I2S
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
analog
ADC (10-bit)
ADC Units
–
–
–
1
1
1
–
–
1
1
1
–
1
–
1
1
–
1
1
ADC Channels
–
–
–
2
3
4
–
–
8
3
4
–
4
–
8
8
–
3
4
ADC Speed
(samples per
second)
–
–
–
250K
250K
500K
–
–
500K
500K
1M
–
500K
–
500K
1M
–
500K
1M
Internal Temp Sensor
–
–
–
P
P
P
–
–
P
P
P
–
P
–
P
P
–
P
P
Analog/Digital
Comparators
1/-
3/-
2/-
2/-
2/-
2/-
3/-
2/-
2/-
1/-
3/-
2/-
2/-
2/-
2/-
3/-
3/-
3/-
2/-
gpios (5-v tolerant)
10-30
8-35
23-46
12-34
14-43
6-41
5-46
10-46
5-38
15-41
11-41
23-46
5-41
10-46
5-38
7-38
1-46
6-43
0-42
battery-backed
hibernation
–
–
–
–
–
P
P
P
P
P
P
–
P
P
P
P
P
P
P
ldo voltage regulator
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
operating temperature
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
package
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
production (p) or
sampling (s)
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P



<!-- Page 503 -->
### [PDF Page 503]

476
Appendix J
Copyright © 2009 Texas Instruments Incorporated
USB Connected MCUs
u s b  c o n n e c t e d  m c u s
Evaluation kit ordering information
Part number
Description
EKK-LM3S3748
Stellaris LM3S3748 USB Host/Device Evaluation Kit for
Keil™ RealView® MDK-ARM (32 KB code-size limited)
EKI-LM3S3748
Stellaris LM3S3748 USB Host/Device Evaluation Kit for
IAR Systems Embedded Workbench® (32 KB code-size limited)
EKC-LM3S3748
Stellaris LM3S3748 USB Host/Device Evaluation Kit for
CodeSourcery G++ GNU (30-day limited)
EKT-LM3S3748
Stellaris LM3S3748 USB Host/Device Evaluation Kit for
Code Red Technologies Red Suite (90-day limited)
Stellaris LM3S3748 USB Host/Device
Evaluation Kit
The Stellaris® LM3S3748 Evaluation Board design highlights the LM3S3748
microcontroller’s key features including a USB 2.0 full-speed (12 Mbps) Host/
Device controller, Analog-to-Digital Converter (ADC), and serial interfaces. In
USB Device mode, a small switch selects between bus-powered and selfpow-
ered options. The quickstart application that runs out-of-the-box uses four ADC
signals paired as two differential channels to implement a 1MS/s oscilloscope
application on the LCD display, illustrating high-frequency data acquisition
and processing with a sophisticated user interface developed using the Stel-
larisWare Graphics Library. The quickstart application utilizes the StellarisWare
USB library to operate in both USB Host and USB Device modes, saving signal
display bitmaps and CSV data to the included USB stick and connecting to a
PC for remotely controlled data display. The LM3S3748 board also has an In-
Circuit Debug Interface (ICDI) that provides hardware debugging not only for the
on-board Stellaris device, but also for any Stellaris microcontroller-based tar-
get board. In Debug Interface mode, the on-board microcontroller is bypassed,
allowing programming or debugging of an external target.  Example applica-
tions demonstrating the use of various third-party Real-Time Operating Sys-
tems and commercial communications stacks are available for download from
www.ti.com/stellaris_lm3s3748.
• 50 MHz Stellaris LM3S3748 microcontroller with 128 KB Flash and
64 KB SRAM
• 2 channel oscilloscope quickstart application
• Bus-powered or self-powered USB support
• Color LCD graphics display with 128 x 128 pixel resolution
• User LED and navigation switch with press-to-select functionality
• 8-Ohm magnetic speaker with ampliﬁ er
• microSD card slot
• Standard ARM® 20-pin JTAG/SWD debug connector with input and
output modes and JTAG/SWD target cable
• LM3S3748 microcontroller I/O available on labeled break-out pads
• USB cables and oscilloscope test leads for quickstart application
• USB ﬂ ash memory stick
• CD containing:
– Evaluation version of the software tools, complete documentation,
Quickstart guide and source code
– StellarisWare software including peripheral driver library and
example source code
Stellaris LM3S9B92 Ethernet+CAN
Evaluation Kit
With two boards separately containing an Ethernet+USB-OTG+CAN LM3S9B92
microcontroller and the BD-ICDI In-Circuit Debug Interface board, the Stellaris
LM3S9B92 Evaluation Kit provides a low-cost, compact and versatile evaluation
platform for simultaneous Ethernet+USB+CAN-enabled Stellaris ARM Cortex-
M3-based microcontrollers. The evaluation board uses the LM3S9B92 micro-
controller which features advanced motion control including eight PWM out-
puts for motion and energy and two Quadrature Encoder Inputs (QEI) modules.
The LM3S9B92 microcontroller also features an external 16-MHz crystal that
provides the main oscil-
lator clock which can
directly drive the ARM
core clock or an inter-
nal PLL to increase the
core clock up to 80
MHz. A 25-MHz crystal
is used for the Ethernet
clock. The LM3S9B92
microcontroller also has
an internal LDO voltage
regulator that supplies
power for internal use.
Evaluation kit ordering information
Part number
Description
EKK-LM3S9B92
Stellaris® LM3S9B92 Low-Cost Evaluation Kit for
Keil™ RealView® MDK-ARM (32 KB code-size limited)
EKI-LM3S9B92
Stellaris® LM3S9B92 Low-Cost Evaluation Kit for
IAR Systems Embedded Workbench® (32 KB code-size limited)
EKC-LM3S9B92
Stellaris® LM3S9B92 Low-Cost Evaluation Kit for
CodeSourcery G++ GNU (30-day limited)
EKT-LM3S9B92
Stellaris® LM3S9B92 Low-Cost Evaluation Kit for
Code Red Technologies Red Suite (90-day limited)
Stellaris LM3S3748 USB Host/Device Evaluation Kit
Stellaris LM3S9B92 Ethernet+CAN Evaluation Kit



<!-- Page 504 -->
### [PDF Page 504]

477
Stellaris® Family of Microcontrollers
Copyright © 2009 Texas Instruments Incorporated
USB Connected MCUs
u s b  c o n n e c t e d  m c u s
[a] PWM motion-control functionality can be achieved through dedicated motion control hardware (the PWM pins) or through the motion control features of the general-purpose timers (the CCP pins). See data sheet for details.  [b] Minimum is number
of pins dedicated to GPIO; additional pins are available if certain peripherals are not used. See data sheet for details. [c] Industrial (I) is -40 to +85 °C and Extended (E) is -40 to +105 °C.
LM3S3651
LM3S3739
LM3S3748
LM3S3749
LM3S3826
LM3S3J26
LM3S3N26
LM3S3W26
LM3S3Z26
memory
Flash (KB)
128
128
128
128
256
128
64
32
16
SRAM (KB)
32
64
64
64
32
20
12
8
6
ROM Software
Libraries
P
P
P
P
P
P
P
P
P
DMA
P
P
P
P
P
P
P
P
P
SAFERTOS™
–
–
–
–
–
–
–
–
–
core
Max Speed (MHz)
50
50
50
50
50
50
50
50
50
Internal Precision
Oscillator
–
–
–
–
P
P
P
P
P
MPU
P
P
P
P
P
P
P
P
P
timers
SysTick (24-bit)
P
P
P
P
P
P
P
P
P
General-Purpose
4
4
4
4
3
3
3
3
3
Real-Time Clock (RTC)
P
P
P
P
P
P
P
P
P
Watchdog
1
1
1
1
2
2
2
2
2
Motion Control
PWM
–
–
8
8
–
–
–
–
–
PWM Fault
–
–
4
4
–
–
–
–
–
Dead-Band
Generator
–
–
P
P
–
–
–
–
–
CCP
8
8
8
7
6
6
6
6
6
QEI Channels
–
–
1
1
–
–
–
–
–
external peripheral
interface
–
–
–
–
–
–
–
–
–
serial interfaces
Ethernet
10/100 MAC+PHY
–
–
–
–
–
–
–
–
–
IEEE 1588
–
–
–
–
–
–
–
–
–
CAN MAC
–
–
–
–
–
–
–
–
–
USB D, H, or O
O
H
H
H
D
D
D
D
D
UART
1
3
2
3
3
3
3
3
3
I2C
1
2
2
2
2
2
2
2
2
SSI/SPI
1
2
2
2
2
2
2
2
2
I2S
–
–
–
–
–
–
–
–
–
analog
ADC (10-bit)
ADC Units
1
1
1
1
1
1
1
1
1
ADC Channels
4
8
8
8
8
8
8
8
8
ADC Speed
(samples per
second)
500K
500K
1M
1M
1M
1M
1M
1M
1M
Internal Temp Sensor
P
P
P
P
P
P
P
P
P
Analog/Digital
Comparators
2/-
2/-
2/-
2/-
2/8
2/8
2/8
2/8
2/8
gpios (5-v tolerant)
0-33
14-61
3-61
0-61
0-33
0-33
0-33
0-33
0-33
battery-backed
hibernation
P
P
P
P
P
P
P
P
P
ldo voltage regulator
P
P
P
P
P
P
P
P
P
operating temperature
I
I
I
I
I
I
I
I
I
package
64LQFP
100LQFP
100LQFP
100LQFP
64LQFP
64LQFP
64LQFP
64LQFP
64LQFP
production (p) or
sampling (s)
P
P
P
P
S
S
S
S
S



<!-- Page 505 -->
### [PDF Page 505]

478
Appendix J
Copyright © 2009 Texas Instruments Incorporated
USB+CAN Internetworking MCUs
u s b + c a n  i n t e r n e t w o r k i n g  m c u s
Evaluation kit ordering information
Part number
Description
EKK-LM3S3748
Stellaris LM3S3748 USB Host/Device Evaluation Kit for
Keil™ RealView® MDK-ARM (32 KB code-size limited)
EKI-LM3S3748
Stellaris LM3S3748 USB Host/Device Evaluation Kit for
IAR Systems Embedded Workbench® (32 KB code-size limited)
EKC-LM3S3748
Stellaris LM3S3748 USB Host/Device Evaluation Kit for
CodeSourcery G++ GNU (30-day limited)
EKT-LM3S3748
Stellaris LM3S3748 USB Host/Device Evaluation Kit for
Code Red Technologies Red Suite (90-day limited)
Stellaris LM3S3748 USB Host/Device
Evaluation Kit
The Stellaris® LM3S3748 Evaluation Board design highlights the LM3S3748
microcontroller’s key features including a USB 2.0 full-speed (12 Mbps) Host/
Device controller, Analog-to-Digital Converter (ADC), and serial interfaces. In
USB Device mode, a small switch selects between bus-powered and selfpow-
ered options. The quickstart application that runs out-of-the-box uses four ADC
signals paired as two differential channels to implement a 1MS/s oscilloscope
application on the LCD display, illustrating high-frequency data acquisition
and processing with a sophisticated user interface developed using the Stel-
larisWare Graphics Library. The quickstart application utilizes the StellarisWare
USB library to operate in both USB Host and USB Device modes, saving signal
display bitmaps and CSV data to the included USB stick and connecting to a
PC for remotely controlled data display. The LM3S3748 board also has an In-
Circuit Debug Interface (ICDI) that provides hardware debugging not only for the
on-board Stellaris device, but also for any Stellaris microcontroller-based tar-
get board. In Debug Interface mode, the on-board microcontroller is bypassed,
allowing programming or debugging of an external target.  Example applica-
tions demonstrating the use of various third-party Real-Time Operating Sys-
tems and commercial communications stacks are available for download from
www.ti.com/stellaris_lm3s3748.
• 50 MHz Stellaris LM3S3748 microcontroller with 128 KB Flash and
64 KB SRAM
• 2 channel oscilloscope quickstart application
• Bus-powered or self-powered USB support
• Color LCD graphics display with 128 x 128 pixel resolution
• User LED and navigation switch with press-to-select functionality
• 8-Ohm magnetic speaker with ampliﬁ er
• microSD card slot
• Standard ARM® 20-pin JTAG/SWD debug connector with input and
output modes and JTAG/SWD target cable
• LM3S3748 microcontroller I/O available on labeled break-out pads
• USB cables and oscilloscope test leads for quickstart application
• USB ﬂ ash memory stick
• CD containing:
– Evaluation version of the software tools, complete documentation,
Quickstart guide and source code
– StellarisWare software including peripheral driver library and
example source code
Stellaris LM3S9B92 Ethernet+CAN
Evaluation Kit
With two boards separately containing an Ethernet+USB-OTG+CAN LM3S9B92
microcontroller and the BD-ICDI In-Circuit Debug Interface board, the Stellaris
LM3S9B92 Evaluation Kit provides a low-cost, compact and versatile evaluation
platform for simultaneous Ethernet+USB+CAN-enabled Stellaris ARM Cortex-
M3-based microcontrollers. The evaluation board uses the LM3S9B92 micro-
controller which features advanced motion control including eight PWM out-
puts for motion and energy and two Quadrature Encoder Inputs (QEI) modules.
The LM3S9B92 microcontroller also features an external 16-MHz crystal that
provides the main oscil-
lator clock which can
directly drive the ARM
core clock or an inter-
nal PLL to increase the
core clock up to 80
MHz. A 25-MHz crystal
is used for the Ethernet
clock. The LM3S9B92
microcontroller also has
an internal LDO voltage
regulator that supplies
power for internal use.
Evaluation kit ordering information
Part number
Description
EKK-LM3S9B92
Stellaris® LM3S9B92 Low-Cost Evaluation Kit for
Keil™ RealView® MDK-ARM (32 KB code-size limited)
EKI-LM3S9B92
Stellaris® LM3S9B92 Low-Cost Evaluation Kit for
IAR Systems Embedded Workbench® (32 KB code-size limited)
EKC-LM3S9B92
Stellaris® LM3S9B92 Low-Cost Evaluation Kit for
CodeSourcery G++ GNU (30-day limited)
EKT-LM3S9B92
Stellaris® LM3S9B92 Low-Cost Evaluation Kit for
Code Red Technologies Red Suite (90-day limited)
Stellaris LM3S3748 USB Host/Device Evaluation Kit
Stellaris LM3S9B92 Ethernet+CAN Evaluation Kit



<!-- Page 506 -->
### [PDF Page 506]

479
Stellaris® Family of Microcontrollers
Copyright © 2009 Texas Instruments Incorporated
USB+CAN Internetworking MCUs
u s b + c a n  i n t e r n e t w o r k i n g  m c u s
[a] PWM motion-control functionality can be achieved through dedicated motion control hardware (the PWM pins) or through the motion control features of the general-purpose timers (the CCP pins). See data sheet for details.  [b] Minimum is number
of pins dedicated to GPIO; additional pins are available if certain peripherals are not used. See data sheet for details. [c] Industrial (I) is -40 to +85 °C and Extended (E) is -40 to +105 °C.
LM3S5632
LM3S5651
LM3S5652
LM3S5656
LM3S5662
LM3S5732
LM3S5737
LM3S5739
LM3S5747
LM3S5749
LM3S5752
LM3S5762
LM3S5791
LM3S5951
LM3S5956
LM3S5B91
LM3S5K31
LM3S5K36
LM3S5P31
LM3S5P36
LM3S5P51
LM3S5P56
LM3S5R31
LM3S5R36
LM3S5T36
LM3S5Y36
memory
Flash (KB)
128
128
128
128
128
128
128
128
128
128
128
128
128
256
256
256
128
128
64
64
64
64
256
256
32
16
SRAM (KB)
32
32
32
32
32
64
64
64
64
64
64
64
64
64
64
96
24
24
24
24
24
24
48
48
12
8
ROM Software
Libraries
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
DMA
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
SAFERTOS™
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
core
Max Speed (MHz)
50
80
50
80
50
50
50
50
50
50
50
50
80
80
80
80
80
80
80
80
80
80
80
80
80
80
Internal Precision
Oscillator
–
P
–
P
–
–
–
–
–
–
–
–
P
P
P
P
P
P
P
P
P
P
P
P
P
P
MPU
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
timers
SysTick (24-bit)
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
General-Purpose
3
4
3
4
3
3
3
4
3
4
3
3
4
4
4
4
3
3
3
3
4
4
4
4
3
3
Real-Time Clock (RTC)
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
Watchdog
1
2
1
2
1
1
1
1
1
1
1
1
2
2
2
2
2
2
2
2
2
2
2
2
2
2
Motion Control
PWM
–
6
–
6
6
–
–
–
6
8
–
6
8
6
6
8
6
6
6
6
6
6
8
8
6
6
PWM Fault
–
4
–
4
1
–
–
–
1
4
–
1
4
4
4
4
4
4
4
4
4
4
4
4
4
4
Dead-Band
Generator
–
P
–
P
P
–
–
–
P
P
–
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
CCP
5
8
6
8
5
5
3
8
2
5
6
5
8
8
8
8
6
6
6
6
8
8
8
8
6
6
QEI Channels
–
2
–
1
–
–
–
–
–
1
–
–
2
2
1
2
2
1
2
1
2
1
2
1
1
1
external peripheral
interface
–
–
–
–
–
–
–
–
–
–
–
–
P
–
–
P
–
–
–
–
–
–
P
–
–
–
serial interfaces
Ethernet
10/100 MAC+PHY
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
IEEE 1588
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
CAN MAC
1
2
1
1
1
1
1
1
1
2
1
1
2
2
1
2
1
1
1
1
2
1
1
1
1
1
USB D, H, or O
H
O
O
O
O
H
H
H
H
H
O
O
O
O
O
O
D
D
D
D
O
O
D
D
D
D
UART
2
3
1
3
1
2
1
3
1
2
1
1
3
3
3
3
3
3
3
3
3
3
3
3
3
3
I2C
2
2
1
2
–
2
2
2
1
2
1
–
2
2
2
2
2
2
2
2
2
2
2
2
2
2
SSI/SPI
1
2
1
2
1
1
2
2
1
2
1
1
2
2
2
2
2
2
2
2
2
2
2
2
2
2
I2S
–
P
–
–
–
–
–
–
–
–
–
–
P
P
–
P
–
–
–
–
P
–
P
–
–
–
analog
ADC (10-bit)
ADC Units
1
2
1
2
1
1
1
1
1
1
1
1
2
2
2
2
2
2
2
2
2
2
2
2
2
2
ADC Channels
6
16
6
8
4
6
8
8
8
8
6
4
16
16
8
16
16
8
16
8
16
8
16
8
8
8
ADC Speed
(samples per
second)
500K
1M
500K
1M
500K
500K
500K
500K
500K
1M
500K
500K
1M
1M
1M
1M
1M
1M
1M
1M
1M
1M
1M
1M
1M
1M
Internal Temp Sensor
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
Analog/Digital
Comparators
-/-
2/16
1/-
2/16
-/-
-/-
-/-
2/-
-/-
2/-
1/-
-/-
3/16
2/16
2/16
3/16
2/16
2/16
2/16
2/16
2/16
2/16
2/16
2/16
2/16
2/16
gpios (5-v tolerant)
1-33
0-67
0-33
0-33
0-33
1-33
27-61
12-61
27-61
0-61
0-33
0-33
0-72
0-67
0-33
0-72
0-67
0-33
0-67
0-33
0-67
0-33
0-67
0-33
0-33
0-33
battery-backed
hibernation
P
P
P
P
P
P
P
P
P
P
P
P
-
P
P
-
P
P
P
P
P
P
P
P
P
P
ldo voltage regulator
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
operating temperature
I
I
I
I
I
I
I
I
I
I
I
I
I
I
I
I
I
I
I
I
I
I
I
I
I
I
package
64
lqfp
100
lqfp
64
lqfp
64
lqfp
64
lqfp
64
lqfp
100
lqfp
100
lqfp
100
lqfp
100
lqfp
64
lqfp
64
lqfp
100
lqfp
100
lqfp
64
lqfp
100
lqfp
100
lqfp
64
lqfp
100
lqfp
64
lqfp
100
lqfp
64
lqfp
100
lqfp
64
lqfp
64
lqfp
64
lqfp
production (p) or
sampling (s)
P
S
P
S
P
P
P
P
P
P
P
P
S
S
S
S
S
S
S
S
S
S
S
S
S
S



<!-- Page 507 -->
### [PDF Page 507]

480
Appendix J
Copyright © 2009 Texas Instruments Incorporated
CAN Connected MCUs
c a n  c o n n e c t e d  m c u s
Our LM3S2000 Series of Stellaris ARM Cortex-M3 microcontrollers
feature new combinations of industrial connectivity, expanded general-
purpose I/O, larger on-chip memory, and low-power optimization for
battery-backed applications. The Stellaris LM3S2000 series, designed
for Controller Area Network (CAN) applications, extends the Stellaris
family with Bosch CAN 2.0 A/B networking technology, the golden
standard in short-haul industrial networks.
Stellaris LM3S2965 CAN Evaluation Kit
Stellaris LM3S2965 Evaluation Kits provide a compact and versatile evaluation platform for CAN-enabled
Stellaris ARM Cortex-M3-based microcontrollers. With two evaluation boards separately featuring a
CAN-enabled LM3S2965 and a CAN-enabled LM3S2110 in the kit, the evaluation kit provides a complete CAN
network running right out of the box. The quickstart application demonstrates the transmission and receipt of
CAN packets between the two evaluation boards. The LM3S2965 board also has an In-Circuit Debug Interface
(ICDI) that provides hardware debugging functionality not only for the on-board Stellaris device, but also for any
Stellaris microcontroller-based target board. The evaluation kits contain all cables, software, and documentation
needed to develop and run applications for Stellaris microcontrollers easily and quickly. In addition, example
applications demonstrating the use of various third party Real-Time Operating Systems and commercial CAN
stacks are available for download from www.ti.com/stellaris_lm3s2965.
Stellaris LM3S2965 CAN Evaluation Kit features
• Fully operational CAN network-in-a-box, with a quickstart sample application that includes a
CAN network and CAN trafﬁ c
• LM3S2965 CAN Evaluation Board and separate LM3S2110 CAN Device Board
• Stellaris LM3S2965 and LM3S2110 microcontrollers, each with fully integrated CAN MAC
• Simple setup: USB cable provides serial communication, debugging, and power
• OLED graphics display with 128 x 64 pixel resolution and 16 shades of gray
• User LED, navigation switches, and select pushbuttons
• Magnetic speaker
• All LM3S2965 and LM3S2110 I/O available on labeled break-out pads
• Standard ARM 20-pin JTAG debug connector with input and output modes
• CAN ribbon cable, USB cable, and JTAG cable
• CD containing:
– Evaluation version of the software tools
– Quickstart guide and source code
– Complete documentation
– StellarisWare software including peripheral driver library and example source code
Evaluation kit ordering information
Part number
Description
EKK-LM3S2965
Stellaris LM3S2965 CAN Evaluation Kit for Keil RealView MDK-ARM (32 KB code-size limited)
EKI-LM3S2965
Stellaris LM3S2965 CAN Evaluation Kit for IAR Systems Embedded Workbench (32 KB code-size
limited)
EKC-LM3S2965
Stellaris LM3S2965 CAN Evaluation Kit for CodeSourcery Sourcery G++ GNU (30-day limited)
EKT-LM3S2965
Stellaris LM3S2965 Evaluation Kit for Code Red Technologies Red Suite (90-day limited)
INC.
LM3S2110
LM3S2139
LM3S2276
memory
Flash (KB)
64
64
64
SRAM (KB)
16
16
32
ROM Software
Libraries
–
–
1
DMA
–
–
1
SAFERTOS™
–
–
–
core
Max Speed (MHz)
25
25
50
Internal Precision
Oscillator
–
–
–
MPU
P
P
P
timers
SysTick (24-bit)
P
P
P
General-Purpose
3
3
3
Real-Time Clock (RTC)
P
P
P
Watchdog
1
1
1
Motion Control
PWM
2
–
8
PWM Fault
1
–
3
Dead-Band
Generator
P
–
P
CCP
4
6
1
QEI Channels
–
–
–
external peripheral
interface
–
–
–
serial interfaces
Ethernet
10/100 MAC+PHY
–
–
–
IEEE 1588
–
–
–
CAN MAC
1
1
1
USB D, H, or O
–
–
–
UART
1
2
1
I2C
1
1
1
SSI/SPI
1
1
1
I2S
–
–
–
analog
ADC (10-bit)
ADC Units
–
1
1
ADC Channels
–
4
6
ADC Speed
(samples per
second)
–
250K
1M
Internal Temp Sensor
–
P
P
Analog/Digital
Comparators
3/-
3/-
-/-
gpios (5-v tolerant)
11-40
26-56
0-33
battery-backed
hibernation
–
–
P
ldo voltage regulator
P
P
P
operating temperature
I/E
I/E
I
package
100LQFP
108BGA
100LQFP
108BGA
64LQFP
production (p) or
sampling (s)
P
P
P



<!-- Page 508 -->
### [PDF Page 508]

481
Stellaris® Family of Microcontrollers
Copyright © 2009 Texas Instruments Incorporated
CAN Connected MCUs
c a n  c o n n e c t e d  m c u s
[a] PWM motion-control functionality can be achieved through dedicated motion control hardware (the PWM pins) or through the motion control features of the general-purpose timers (the CCP pins). See data sheet for details.  [b] Minimum is number
of pins dedicated to GPIO; additional pins are available if certain peripherals are not used. See data sheet for details. [c] Industrial (I) is -40 to +85 °C and Extended (E) is -40 to +105 °C. [d] 108-pin BGA and 64-pin LQFP package only available in
Industrial temperature.
LM3S2410
LM3S2412
LM3S2432
LM3S2533
LM3S2601
LM3S2608
LM3S2616
LM3S2620
LM3S2637
LM3S2651
LM3S2671
LM3S2678
LM3S2730
LM3S2739
LM3S2776
LM3S2793
LM3S2911
LM3S2918
LM3S2939
LM3S2948
LM3S2950
LM3S2965
LM3S2B93
96
96
96
96
128
128
128
128
128
128
128
128
128
128
128
128
256
256
256
256
256
256
256
32
32
32
64
32
32
16
32
32
32
32
32
64
64
64
64
64
64
64
64
64
64
96
–
–
–
–
–
–
P
–
–
–
P
P
–
–
P
P
–
–
–
–
–
–
P
–
–
–
–
–
–
P
–
–
–
P
P
–
–
P
P
–
–
–
–
–
–
P
–
–
–
–
–
–
-
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
25
25
50
50
50
50
50
25
50
50
50
50
50
50
50
80
50
50
50
50
50
50
80
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
P
–
–
–
–
–
–
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
√
√
√
√
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
√
√
√
√
3
3
3
4
4
4
4
4
4
4
4
4
3
3
3
4
4
4
3
4
4
4
4
P
P
P
P
P
P
–
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
2
1
1
1
1
1
1
2
–
2
2
6
–
–
6
4
–
4
2
4
–
6
8
8
–
–
4
–
6
6
8
–
1
1
1
–
–
1
1
–
1
1
2
–
1
3
4
–
–
1
–
1
1
4
–
P
P
P
–
–
P
P
–
P
P
P
–
P
P
P
–
–
P
–
P
P
P
4
4
4
6
8
8
–
6
6
6
2
2
4
6
1
8
8
8
4
8
6
6
8
–
–
–
–
–
–
1
1
–
–
–
1
–
1
–
2
–
–
1
–
1
2
2
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
P
–
–
–
–
–
–
P
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
1
1
1
1
1
1
1
2
1
1
1
1
1
1
1
2
1
1
1
2
2
2
2
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
1
2
2
2
3
2
1
1
2
3
1
1
1
2
1
3
3
2
3
3
3
3
3
–
1
1
1
2
2
1
1
1
1
1
–
–
1
1
2
2
2
1
1
1
2
2
1
1
1
1
2
2
–
1
1
2
1
1
1
1
1
2
2
2
1
2
2
2
2
–
–
–
–
–
–
–
–
–
–
–
–
–
–
–
P
–
–
–
–
–
–
P
–
1
1
1
–
1
1
–
1
1
1
1
–
1
1
2
–
1
1
1
–
1
2
–
3
3
3
–
8
6
–
4
4
4
8
–
4
6
16
–
8
3
8
–
4
16
–
250K
250K
250K
–
500K
1M
–
500K
500K
500K
500K
–
500K
1M
1M
–
500K
500K
1M
–
1M
1M
–
P
P
P
–
P
P
–
P
P
P
P
–
P
P
P
–
P
P
P
–
P
P
2/-
2/-
2/-
3/-
2/-
2/-
2/-
3/-
3/-
1/-
3/-
-/-
2/-
1/-
-/-
3/16
2/-
2/-
3/-
3/-
3/-
3/-
3/16
37-60
20-49
5-34
11-48
21-60
15-52
1-33
12-52
15-46
16-53
3-33
1-33
37-60
20-56
0-33
0-67
21-60
15-52
18-57
12-52
10-60
3-56
0-67
–
–
–
P
P
P
P
P
P
P
–
–
–
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
I/E
I/E
I/E
I/E
I/E
I/E
I
I/E
I/E
I/E
I
I
I/E
I/E
I
I
I/E
I/E
I/E
I/E
I/E
I/E
I
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
64LQFP
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
64LQFP
64LQFP
100LQFP
108BGA
100LQFP
108BGA
64LQFP
100LQFP
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
P
P
P
P
P
P
P
P
P
P
P
P
P
P
P
S
P
P
P
P
P
P
S



<!-- Page 509 -->
### [PDF Page 509]

482
Appendix J
Copyright © 2009 Texas Instruments Incorporated
Ethernet+CAN Internetworking MCUs
e t h e r n e t + c a n  i n t e r n e t w o r k i n g  m c u s
Stellaris LM3S8962 Ethernet+CAN
Evaluation Kit
Stellaris LM3S8962 Evaluation Kits provide a compact and versatile
evaluation platform for simultaneous Ethernet-and-CAN-enabled Stellaris
ARM Cortex-M3-based microcontrollers. With two evaluation boards
separately featuring an Ethernet+CAN LM3S8962 and a CAN-enabled
LM3S2110 in the kit, the evaluation kit provides a complete CAN network
running right out of the box. The kit also includes two examples of an
embedded web-server demonstration application. The quickstart applica-
tion that runs out-of-the-box includes an embedded web server utilizing the
Open Source lwIP Ethernet stack and also demonstrates the transmission
and receipt of CAN packets between the two evaluation boards. The kit also
contains a web server application with FreeRTOS.org™ RTOS and the Open
Source uIP Ethernet stack. The LM3S8962 board also has an In-Circuit
Debug Interface (ICDI) that provides hardware debugging functionality not only
for the on-board Stellaris device, but also for any Stellaris microcontroller-based
target board. The evaluation kits contain all cables, software, and documenta-
tion needed to develop and run applications for Stellaris microcontrollers easily
and quickly. In addition, example applications demonstrating the use of various
third-party Real-Time Operating Systems and commercial Ethernet and CAN
stacks are available for download from www.ti.com/stellaris_lm3s8962.
Stellaris LM3S8962 Evaluation Kit features
• Fully operational Ethernet+CAN Network-in-a-box, with a quickstart sample
application that includes simultaneous Ethernet and CAN network trafﬁ c
• LM3S8962 Ethernet+CAN Evaluation Board and separate LM3S2110
CAN Device Board
– Stellaris LM3S8962 microcontroller with fully integrated 10/100
Ethernet (MAC+PHY) and CAN MAC
– Stellaris LM3S2110 microcontroller with fully integrated CAN MAC
– Simple setup: USB cable provides serial communication, debugging,
and power
– OLED graphics display with 128 x 64 pixel resolution and 16 shades
of gray
– User LED, navigation switches, and select pushbuttons
– Magnetic speaker
– All LM3S8962 and LM3S2110 I/O available on labeled break-out pads
– Standard ARM 20-pin JTAG debug connector with input and output
modes
• Retracting Ethernet cable, CAN ribbon cable, USB cable, and JTAG cable
• CD containing:
– Evaluation version of the software tools
– Complete documentation
– Quickstart guide and source code
– StellarisWare software including peripheral driver library and example
source code
Part number
Description
EKK-LM3S8962
Stellaris LM3S8962 Evaluation Kit for Keil RealView MDK-ARM (32 KB code-size limitation)
EKI-LM3S8962
Stellaris LM3S8962 Evaluation Kit for IAR Systems Embedded Workbench (32 KB code-size limited)
EKC-LM3S8962
Stellaris LM3S8962 Evaluation Kit for CodeSourcery G++ GNU (30-day limited)
EKT-LM3S8962
Stellaris LM3S8962 Evaluation kit for Code Red Technologies Red Suite (90-day limited)
Evaluation kit ordering information
INC.
Our LM3S8000 Series of Stellaris ARM Cortex-M3 microcontrollers feature new combinations of industrial connectivity, expanded motion control I/O, larger on-chip
memory, and low-power optimization for battery-backed applications.  The LM3S8000 series provides the world’s ﬁ rst MCUs featuring the combination of a fully inte-
grated 10/100 Mbps Ethernet solution and Bosch Controller Area Network networking technology with ARM architecture compatibility. The LM3S8000 devices combine up
to three CAN 2.0 A/B controllers with both the Ethernet Media Access Control (MAC) and Physical (PHY) layers. In addition, selected LM3S8000 Series Stellaris MCUs
also feature hardware assist for IEEE 1588 Precision Time Protocol support.



<!-- Page 510 -->
### [PDF Page 510]

483
Stellaris® Family of Microcontrollers
Copyright © 2009 Texas Instruments Incorporated
Ethernet+CAN Internetworking MCUs
e t h e r n e t + c a n  i n t e r n e t w o r k i n g  m c u s
[a] PWM motion-control functionality can be achieved through dedicated motion control hardware (the PWM pins) or through the motion control features of the general-purpose timers (the CCP pins). See data sheet for details.  [b] Minimum is number
of pins dedicated to GPIO; additional pins are available if certain peripherals are not used. See data sheet for details. [c] Industrial (I) is -40 to +85 °C and Extended (E) is -40 to +105 °C. [d] 108-pin BGA only available in Industrial temperature.
LM3S8530
LM3S8538
LM3S8630
LM3S8730
LM3S8733
LM3S8738
LM3S8930
LM3S8933
LM3S8938
LM3S8962
LM3S8970
LM3S8971
memory
Flash (KB)
96
96
128
128
128
128
256
256
256
256
256
256
SRAM (KB)
64
64
32
64
64
64
64
64
64
64
64
64
ROM Software
Libraries
–
–
–
–
–
–
–
–
–
–
–
–
DMA
–
–
–
–
–
–
–
–
–
–
–
–
SAFERTOS™
–
–
–
–
–
–
–
–
–
–
–
–
core
Max Speed (MHz)
50
50
50
50
50
50
50
50
50
50
50
50
Internal Precision
Oscillator
–
–
–
–
–
–
–
–
–
–
–
–
MPU
P
P
P
P
P
P
P
P
P
P
P
P
timers
SysTick (24-bit)
P
P
P
P
P
P
P
P
P
P
P
P
General-Purpose
4
4
4
4
4
4
4
4
4
4
4
4
Real-Time Clock (RTC)
P
P
P
P
P
P
P
P
P
P
P
P
Watchdog
1
1
1
1
1
1
1
1
1
1
1
1
Motion Control
PWM
–
–
–
–
–
–
–
–
–
6
–
6
PWM Fault
–
–
–
–
–
–
–
–
–
1
–
1
Dead-Band
Generator
–
–
–
–
–
–
–
–
–
P
–
P
CCP
2
4
2
2
4
6
2
4
6
2
2
6
QEI Channels
2
–
–
–
–
–
–
–
–
2
–
1
external peripheral
interface
–
–
–
–
–
–
–
–
–
–
–
–
serial interfaces
Ethernet
10/100 MAC+PHY
P
P
P
P
P
P
P
P
P
P
P
P
IEEE 1588
–
P
–
P
–
–
–
P
P
P
P
–
CAN MAC
3
1
1
1
1
1
2
1
1
1
3
1
USB D, H, or O
–
–
–
–
–
–
–
–
–
–
–
–
UART
1
2
2
2
2
3
1
2
3
2
2
1
I2C
1
1
1
1
1
1
1
1
2
1
1
–
SSI/SPI
2
1
1
1
1
2
1
1
1
1
2
1
I2S
–
–
–
–
–
–
–
–
–
–
–
–
analog
ADC (10-bit)
ADC Units
–
1
–
–
1
1
–
1
1
1
–
1
ADC Channels
–
8
–
–
4
8
–
4
8
4
–
8
ADC Speed
(samples per
second)
–
1M
–
–
500K
500K
–
1M
1M
500K
–
1M
Internal Temp Sensor
–
P
–
–
P
P
–
P
P
P
–
P
Analog/Digital
Comparators
-/-
3/-
-/-
-/-
3/-
1/-
-/-
3/-
3/-
1/-
-/-
1/-
gpios (5-v tolerant)
8-35
7-36
10-31
11-32
5-35
4-38
13-34
6-36
3-38
5-42
17-46
4–38
battery-backed
hibernation
–
–
P
P
P
P
P
P
P
P
P
P
ldo voltage regulator
P
P
P
P
P
P
P
P
P
P
P
P
operating temperature
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
I/E
package
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
100LQFP
108BGA
production (p) or
sampling (s)
P
P
P
P
P
P
P
P
P
P
P
P



<!-- Page 511 -->
### [PDF Page 511]

484
Appendix J
s e c t i o n  h e a d
Copyright © 2009 Texas Instruments Incorporated
Ethernet+USB+CAN Internetworking MCUs
e t h e r n e t + u s b + c a n  i n t e r n e t w o r k i n g  m c u s
Stellaris LM3S9B92 Ethernet+USB+CAN Evaluation Kit
With two boards separately containing an Ethernet+USB-OTG+CAN LM3S9B92 microcontroller and the BD-ICDI In-Circuit Debug Interface board, the
Stellaris LM3S9B92 Evaluation Kit provides a low cost, compact and versatile evaluation platform for simultaneous Ethernet+USB+CAN-enabled Stellaris ARM
Cortex-M3-based microcontrollers. The evaluation board uses the LM3S9B92 microcontroller which features advanced motion control including eight PWM
outputs for motion and energy and two Quadrature Encoder Inputs (QEI) modules. The LM3S9B92 microcontroller also features an external 16 MHz crystal that
provides the main oscillator clock which can directly drive the ARM core clock or an internal PLL to increase the core clock up to 80 MHz. A 25 MHz crystal is used for
the Ethernet clock. The LM3S9B92 microcontroller also has an internal LDO voltage regulator that supplies power for internal use.
Ordering information
Part number
Description
EKK-LM3S9B92
Stellaris® LM3S9B92 Low-Cost Evaluation Kit for Keil™ RealView® MDK-ARM (32 KB code-size limited)
EKI-LM3S9B92
Stellaris® LM3S9B92 Low-Cost Evaluation Kit for IAR Systems Embedded Workbench® (32 KB code-size limited)
EKC-LM3S9B92
Stellaris® LM3S9B92 Low-Cost Evaluation Kit for CodeSourcery G++ GNU (30-day limited)
EKT-LM3S9B92
Stellaris® LM3S9B92 Low-Cost Evaluation Kit for Code Red Technologies Red Suite (90-day limited)
Stellaris LM3S9B90 Ethernet+USB-OTG+CAN Evaluation Kit
With two boards separately containing an Ethernet+USB-OTG+CAN LM3S9B90 microcontroller and the BD-ICDI In-Circuit Debug Interface board, the Stellaris
LM3S9B90 Evaluation Kit provides a low cost, compact and versatile evaluation platform for simultaneous Ethernet-USB-CAN-enabled Stellaris ARM Cortex-M3-
based microcontrollers. The evaluation board uses the LM3S9B90 microcontroller which features a Hibernation module to efﬁ ciently power down the device to a
low-power state during extended periods of inactivity.  The LM3S9B90 microcontroller also features an external 16 MHz crystal that provides the main oscillator
clock which can directly drive the ARM core clock or an internal PLL to increase the core clock up to 80 MHz. A 25 MHz crystal is used for the Ethernet clock and a
4.194304 MHz crystal is used for the real-time clock.  The LM3S9B90 microcontroller also has an internal LDO voltage regulator that supplies power for internal use.
Ordering information
Part number
Description
EKK-LM3S9B90
Stellaris® LM3S9B90 Low-Cost Evaluation Kit for Keil™ RealView® MDK-ARM (32 KB code-size limited)
EKI-LM3S9B90
Stellaris® LM3S9B90 Low-Cost Evaluation Kit for IAR Systems Embedded Workbench® (32 KB code-size limited)
EKC-LM3S9B90
Stellaris® LM3S9B90 Low-Cost Evaluation Kit for CodeSourcery G++ GNU (30-day limited)
EKT-LM3S9B90
Stellaris® LM3S9B90 Low-Cost Evaluation Kit for Code Red Technologies Red Suite (90-day limited)
Kit features
• Stellaris high-performance microcontroller with
large memory
– 32-bit ARM® Cortex™-M3 core
– 256 KB main Flash memory, 96 KB SRAM
– StellarisWare in ROM
• Ethernet 10/100 port with two LED indicators
• USB 2.0 Full-Speed OTG port
• Virtual serial communications port capability
• Oversized board pads for GPIO
Kit contents
• Evaluation Board (EVB)
• BD-ICDI In-Circuit Debug Interface Board
• Cables
– USB cable
– 10-pin ribbon cable for JTAG
– 8-pin ribbon cable for power/UART connection
• Evaluation Kit CD containing:
– Complete source code, schematics, and PCB gerber ﬁ les
– StellarisWare software including peripheral driver library
and example source code
– A choice of evaluation software development tools
Our LM3S9000 Series of Stellaris ARM Cortex-M3 microcontrollers feature higher performance along with new combinations of industrial connectivity, expanded
peripheral interface connectivity, and low-power optimization for battery-backed applications. The LM3S9000 series provides the world’s ﬁ rst MCUs featuring the
combination of a fully integrated 10/100 Mbps Ethernet solution, USB On-the-Go, and Bosch Controller Area Network networking technology with ARM archi-
tecture compatibility. The LM3S9000 devices combine up to two CAN 2.0 A/B controllers with both the Ethernet Media Access Control (MAC) and Physical (PHY)
layers and USB full speed OTG or Host/Device with integrated PHY. All LM3S9000 series microcontrollers feature two separate ADC units along with extended
StellarisWare™ software in ROM, including the Peripheral Driver Library and Boot Loader, AES cryptography tables, and CRC error detection functionality. In addition,
selected LM3S9000 series Stellaris MCUs also include the SafeRTOS™ kernel in ROM and hardware assist for IEEE 1588 Precision Time Protocol support.
The LM3S9000 series Stellaris MCUs also include an internal 16 MHz precision oscillator with software trim capability, and a second watchdog timer on an independent
clock domain. Selected LM3S9000 series devices also feature a uniquely ﬂ exible external peripheral interface (EPI), which is a dedicated parallel bus (up to 32-bit) for
external peripherals that supports SDRAM, SRAM/Flash, and Machine-to-Machine (M2M) (up to 150 Mbytes/sec) usage.



<!-- Page 512 -->
### [PDF Page 512]

485
Stellaris® Family of Microcontrollers
s e c t i o n  h e a d
Copyright © 2009 Texas Instruments Incorporated
Ethernet+USB+CAN Internetworking MCUs
e t h e r n e t + u s b + c a n  i n t e r n e t w o r k i n g  m c u s
[a] PWM motion-control functionality can be achieved through dedicated motion control hardware (the PWM pins) or through the motion control features of the general-purpose timers (the CCP pins). See data sheet for details.  [b] Minimum is number
of pins dedicated to GPIO; additional pins are available if certain peripherals are not used. See data sheet for details. [c] Industrial (I) is -40 to +85 °C and Extended (E) is -40 to +105 °C.
Stellaris LM3S9B92 Ethernet+
USB-OTG+CAN Evaluation Kit
Stellaris LM3S9B90 Ethernet+
USB-OTG+CAN Evaluation Kit
Stellaris LM3S9B96 features
SAFERTOS in ROM
LM3S9790
LM3S9792
LM3S9997
LM3S9B90
LM3S9B92
LM3S9B95
LM3S9B96
LM3S9L97
memory
Flash (KB)
128
128
256
256
256
256
256
128
SRAM (KB)
64
64
64
96
96
96
96
48
ROM Software
Libraries
P
P
P
P
P
P
P
P
DMA
P
P
P
P
P
P
P
P
SAFERTOS™
–
–
–
–
–
–
1
–
core
Max Speed (MHz)
80
80
80
80
80
80
100
80
80
Internal Precision
Oscillator
P
P
P
P
P
P
P
P
MPU
P
P
P
P
P
P
P
P
timers
SysTick (24-bit)
P
P
P
P
P
P
P
P
General-Purpose
4
4
4
4
4
4
4
4
Real-Time Clock (RTC)
P
P
P
P
P
P
P
P
Watchdog
2
2
2
2
2
2
2
2
Motion Control
PWM
–
8
6
–
8
8
8
6
PWM Fault
–
4
4
–
4
4
4
4
Dead-Band
Generator
–
P
P
–
P
P
P
P
CCP
8
8
8
8
8
8
8
8
QEI Channels
–
2
2
–
2
2
2
2
external peripheral
interface
P
P
–
P
P
P
P
–
serial interfaces
Ethernet
10/100 MAC+PHY
P
P
P
P
P
P
P
P
IEEE 1588
–
–
P
–
–
P
P
P
CAN MAC
2
2
2
2
2
2
2
2
USB D, H, or O
O
O
O
O
O
O
O
O
UART
3
3
3
3
3
3
3
3
I2C
2
2
2
2
2
2
2
2
SSI/SPI
2
2
2
2
2
2
2
2
I2S
P
P
P
P
P
P
P
P
analog
ADC (10-bit)
ADC Units
2
2
2
2
2
2
2
2
ADC Channels
16
16
16
16
16
16
16
16
ADC Speed
(samples per
second)
1M
1M
1M
1M
1M
1M
1M
1M
Internal Temp Sensor
P
P
P
P
P
P
P
P
Analog/Digital
Comparators
3/16
3/16
2/16
3/16
3/16
3/16
3/16
2/16
gpios (5-v tolerant)
0-60
0-65
0-60
0-60
0-65
0-65
0-65
0-60
battery-backed
hibernation
P
–
P
P
–
–
–
P
ldo voltage regulator
P
P
P
P
P
P
P
P
operating temperature
I
I
I
I
I
I
I
I
package
100
lqfp
100
lqfp
100
lqfp
100
lqfp
100
lqfp
100
lqfp
100
lqfp
100
lqfp
production (p) or
sampling (s)
S
S
S
S
S
S
S
S



<!-- Page 513 -->
### [PDF Page 513]

486
Appendix J
Copyright © 2009 Texas Instruments Incorporated
Stellaris
® LM3S9B96 Microcontroller
Development Kit
d e v e l o p m e n t  k i t s
The Stellaris® LM3S9B96 Microcontroller Development Kit (DK-LM3S9B96) is a full-featured development kit for LM3S9000 series devices. The LM3S9B96 develop-
ment board has a maximum set of peripherals to demonstrate the microcontroller’s capabilities and provides maximum ﬂ exibility with break-out header pads for all
I/O. The LM3S9B96 development board provides a platform for evaluating memory-demanding applications as well as applications that utilize new capabilities such as
I2S audio, extended peripheral interface (EPI) capability, and the simultaneous availability of Ethernet, USB OTG, and CAN communications. Target applications include
networking, graphical user-interface (GUI), and connected Human Machine Interface (HMI) applications. The LM3S9B96 development board is also a useful development
vehicle for systems programmed using tools such as Microsoft’s .NET Micro Framework and Embedded LabView from National Instruments.
The quickstart application that runs out-of-the-box is a widget-based application which exercises many of the peripherals found on the DK-LM3S9B96 development kit
board through a touch-screen demo menu.  The various demo modes incorporate USB mouse support, a TFTP server for ﬁ le system accessing the 1MB serial Flash,
a web server using the lwIP TCP/IP stack, microSD card access, a JPEG image viewer, a serial command line and an audio player. The development board includes an
on-board in-circuit debug interface (ICDI) that supports both JTAG and SWD debugging. A standard ARM 20-pin debug header supports an array of debugging solutions.
The kit also includes extensive example applications and complete source code.
Ordering information
Part number
Description
DK-LM3S9B96
Development Kit including evaluation tools from Keil, IAR, Code Red Technologies, and CodeSourcery
Stellaris LM3S9B96 Development
Kit features
• 3.5” landscape color LCD graphics display
– TFT LCD module with 320 x 240 resolution
– Resistive touch interface
• 80 MHz LM3S9B96 microcontroller with 256 K Flash,
96 K SRAM, and integrated Ethernet MAC+PHY, USB OTG, and
CAN communications
• 8 MB SDRAM (plug-in EPI option board)
• Break-out board for External Peripheral Interface
(EPI) signals
• 1 MB serial ﬂ ash memory
• Precision 3.00 V Voltage reference
• SafeRTOS™ operating system in microcontroller ROM
• I2S stereo audio codec
– Line Out
– Headphone Out
– Microphone In
– Line In
• Controller Area Network (CAN) interface
• 10/100 BaseT Ethernet connector
• USB OTG connector
– Device, Host, and OTG modes
• User LED and pushbutton
• Thumbwheel potentiometer
• MicroSD card slot
• Standard ARM® 10-pin JTAG debug connector
• Integrated In-Circuit Debug Interface (ICDI)
• USB virtual com port
• Jumper shunts to conveniently reallocate I/O resources
• Supported by StellarisWare® software including the
Stellaris Graphics Library and the Stellaris Peripheral Driver Library
Stellaris LM3S9B96 Development
Kit contents
The Stellaris® DK-LM3S9B96 Development Kit provides the tools engineers
need to develop and prototype embedded applications right out of the box
including:
• Stellaris® LM3S9B96 development board with 8 MB SDRAM EPI board and
EPI break-out board
• Mini-B USB cable (3-foot) for debug function
• Micro-A plug to Std-A receptacle (connects to USB ﬂ ash drive)
• Std-A plug to Micro-B plug (connects to PC as a USB device)
• USB Flash Drive (128 MB)
• 20-way target cable
• Ethernet cable
• MicroSD card
• 5 V wall power supply with international plug adapters
• CDs with tools, documentation, and example source code
– Includes evaluation versions of development tools from
Keil, IAR, Code Red Technologies, and Code Sourcery
Stellaris LM3S9B96 Microcontroller Development Kit



<!-- Page 514 -->
### [PDF Page 514]

487
Stellaris® Family of Microcontrollers
Copyright © 2009 Texas Instruments Incorporated
Stellaris
® Intelligent Display Module
Single-Board Computer
c o n n e c t e d  r e f e r e n c e  d e s i g n  k i t s
The Stellaris Intelligent Display Module Single-Board Computer (IDM-SBC) offers a complete QVGA touch-screen user interface for control, automation, and instrumen-
tation applications and is the ﬁ rst reference design featuring the powerful LM3S9B92 microcontroller. The IDM-SBC offers USB, Ethernet, 8 MB of SDRAM, 1 MB of
serial Flash, integrated 256 KB ﬂ ash, and 96 KB SRAM, and provides simpliﬁ ed software development for the reference design kit using our comprehensive Stellar-
isWare with its graphics library and ARM development tools from ARM tools partners. The 8 MB of SDRAM is connected to  the LM3S9B92 microcontroller using the
new External Peripheral Interface (EPI) bus.
Stellaris IDMs are the ﬁ rst display modules available with the efﬁ cient performance and robust integration of an ARM® Cortex™-M3 microcontroller, positioning them
for use in building access controllers and security systems, intelligent white goods and home appliances, thin clients, and factory automation applications.
Stellaris Intelligent Display Module Single-Board Computer
Stellaris Intelligent Display Module
Single-Board Computer features
• Bright QVGA LCD touch-screen display
– 262 K colors, 3.5” QVGA 320 x 240 pixels
– White LED backlight with resistive touch panel
• Serial connectivity options
– USB 2.0 Host
– 10/100 Ethernet MAC and PHY
• 1 MBPS Controller Area Network (CAN)
• I2C Interface for external peripherals and sensors
• UART serial port with TTL signal levels
• High-performance 80 MHz LM3S9B92 microcontroller
– 32-bit ARM® Cortex™-M3 core
– 256 KB single-cycle Flash, 96 KB single-cycle SRAM
• Versatile board-level memories
– 8 MB SDRAM connected by EPI
– 1 MB serial ﬂ ash connected by SPI
– microSD card slot
– USB Host connector for external mass-storage devices
• Power supply
– Wide input range 12-40 Vdc power supply with auxiliary
5 V power output
• I2S mono Codec for high-quality audio with 0.8 W ampliﬁ er
for external 8-Ohm speaker
• Screw terminal block for I2C, CAN, and power connections
• Compact 2.0” x 3.0” PCB footprint
• Easy to customize
– Includes full source code, example applications, and
design ﬁ les
– Develop using tools from Keil, IAR, Code Sourcery, and Code
Red Technologies (using a Stellaris evaluation kit or preferred
ARM Cortex-M3 debugger)
– Supported by StellarisWare® software including the
Stellaris Graphics Library and the Stellaris Peripheral Driver Library
–  Comes with factory-programmed quickstart game
demo application
–  Ethernet boot loader for ﬁ rmware update
Reference design kit contents
The Stellaris® IDM-SBC is offered as a complete open-tool reference
design kit (RDK-IDM-SBC) and ships with everything needed to quickly
evaluate the IDM-SBC including:
• Stellaris® IDM-SBC board
• MDL-ADA2 10-pin to 20-pin debug adapter
• USB ﬂ ash drive (128 MB)
• 5 V power supply with international plug-set
• Ethernet cable
• 8 Ohm speaker
• CD with tools, documentation and source code including:
Quickstart Guide, User’s Manual, Software Reference
Manual, Board Data Sheet, BOM, schematics, and
Gerber ﬁ les
Ordering information
Part number
Description
RDK-IDM-SBC
Stellaris Single Board Computer Intelligent Display Module Reference Design Kit



<!-- Page 515 -->
### [PDF Page 515]

488
Appendix J
s e c t i o n  h e a d
Copyright © 2009 Texas Instruments Incorporated
h e a d
e a d
c o n n e c t e d  r e f e r e n c e  d e s i g n  k i t s
Intelligent Display Module Reference Design Kit

### Features

At the heart of the Stellaris Intelligent Display Module Reference Design is a
highly-integrated 32-bit LM3S6918 ARM Cortex-M3 Stellaris microcon-
troller featuring 10/100 Ethernet MAC and PHY integrated on-chip. With the
ARM architecture, you have access to the world’s most extensive ecosystem
for development tools, applications, training and support, operating systems,
and software stacks. Customized development of software for the RDK-IDM
is simpliﬁ ed with our comprehensive Stellaris Graphics Library and ARM
development tools from trusted tools partners.
The RDK-IDM includes the following product features:
• Bright QVGA LCD touch-screen display
– 16-bit color, 2.8” QVGA 240 x 320 pixels
– White LED backlight with resistive touch panel
• Ethernet and serial connectivity options
– 10/100 Ethernet with Auto MDI/MDIX and Trafﬁ c/Link indicator LED
– Header provides TXD and RXD signals
– RS232 signal levels
• High performance 50 MHz LM3S6918 microcontroller with 256 KB
on-chip ﬂ ash and 64 KB on-chip SRAM
• Flexible interfaces and terminal block connections
– microSD slot
– Relay output
– Four ADC terminal block inputs
• Flexible power supply options
– Power over Ethernet (IEEE 802.3af compliant)
– 24 V DC power jack, 5 V DC terminals
• Easy to customize
– Includes full source code and design ﬁ les
– Includes complete example applications
– Develop using tools from Keil, IAR, Code Sourcery, and Code
Red Technologies
– Supported by Stellaris Graphics Library and Stellaris Peripheral
Driver Library
Kit contents
The Stellaris Intelligent Display Module is offered in as a reference design and
development kit (RDK-IDM) as well as a stand-alone, ready-for-production
module (MDL-IDM with Power-over-Ethernet or MDL-IDM28 with Ethernet). The
reference design and development kit ships with everything needed to quickly
evaluate and easily customize the Intelligent Display Module for your speciﬁ c
application, including:
• Stellaris® Intelligent Display Module (MDL-IDM with metal standoffs)
• 80 MHz LM3S9B92 microcontroller with 256 K Flash, 96 K SRAM,
and integrated Ethernet MAC+PHY, USB OTG, and CAN communications
• 24 V power supply with international plug adapters
• Retractable Ethernet cable
• Debug adapter
• Quickstart Guide, User’s Manual, Software Reference  Manual,
Board Data Sheet, software source code, BOM, schematics,
and Gerber ﬁ les on CD
Stellaris Intelligent Display Module Reference Design Kit
Stellaris Intelligent Display Module
Ordering information
Part number
Description
RDK-IDM
Stellaris Ethernet-Enabled Intelligent Display Module Reference Design Kit (RDK)
MDL-IDM
Stellaris Intelligent Display Module with Power-over-Ethernet for Single-Unit Packaging
MDL-IDM-B
Stellaris Intelligent Display Module with Power-over-Ethernet for Volume Packaging
MDL-IDM28
Stellaris Ethernet-Enabled Intelligent Display Module for Single-Unit Packaging
MDL-IDM28-B
Stellaris Ethernet-Enabled Intelligent Display Module for Volume Packaging
The Stellaris® Intelligent Display Reference Design Kit (RDK-IDM) offers a complete, open-tooled Ethernet-connected graphical touch-screen user interface design solu-
tion.  The kit contains all the necessary hardware and software for you to design, develop, and integrate your Intelligent Display Module into industrial control, automation,
and instrumentation applications. Featuring the option of Power-over-Ethernet (PoE) or DC power input, the Stellaris® Intelligent Display Module Reference Design Kit
offers a simple method to produce intelligent terminals that can be simultaneously powered and network-connected by a single CAT5 Ethernet cable. The design also

### features additional serial connectivity options for easy implementation as a Human Machine Interface (HMI) touch display panel in an embedded control device. The RDK-

IDM is the ﬁ rst display module design available with the efﬁ cient performance and robust integration of an ARM® Cortex™-M3 microcontroller, positioning the design
into building access controllers and security systems, intelligent white goods and home appliances, thin clients, and factory automation applications.



<!-- Page 516 -->
### [PDF Page 516]

489
Stellaris® Family of Microcontrollers
Copyright © 2009 Texas Instruments Incorporated
Intelligent Display Module with 3.5” Landscape
Display Reference Design Kit
c o n n e c t e d  r e f e r e n c e  d e s i g n  k i t s

### Features

The MDL-IDM-L35 ships as a software-customizable module with the
following features:
• Bright QVGA LCD touch-screen display
– 262 K colors, 3.5” QVGA 320 x 240 pixels
– White LED backlight with resistive touch panel
• Serial connectivity options
– RS232 serial port with RS232 signal levels
– UART serial port with TTL signal levels
• High performance Stellaris LM3S1958 microcontroller and large memory
– 50 MHz 32-bit ARM® Cortex™-M3 core
– 256 KB main ﬂ ash memory, 64 KB SRAM
• MicroSD card slot
• 5 V power supply with DC regulator that generates 3.3 V for powering
the board
• Easy to customize
– Includes full source code, example applications, and design ﬁ les
– Develop using tools supporting the IDM-L35 from Keil, IAR, Code
Sourcery, and Code Red (using a Stellaris evaluation kit or preferred
ARM Cortex-M3 debugger)
– Supported by Stellaris® Graphics Library and Stellaris® Peripheral
Driver Library
Kit contents
The Stellaris Intelligent Display Module is offered as a reference design and
development kit (RDK-IDM-L35) as well as a stand-alone, ready-for-production
module (MDL-IDM-L35).
The reference design and development kit ships with everthing needed to
quickly evaluate and easily customize the Intelligent Display Module for
your speciﬁ c application, including:
• Stellaris Intelligent QVGA 3.5” Touch Panel Module (MDL-IDM-L35) with
metal standoffs
• USB to TTL serial cable to simultaneously power the board and connect
to  the LM3S1958 Stellaris microcontroller via UART0
• JTAG debug adapter for 10-pin ﬁ ne-pitch connection to a standard
20-pin connector
• 24 V power supply with international plug adapters
• Quickstart Guide, User’s Manual, Software Reference Manual, Board
Data Sheet, source code, BOM, schematics, and Gerber ﬁ les on CD
Ordering information
Part number
Description
RDK-IDM-L35
Stellaris  Intelligent Display Module with 3.5” Landscape Display Reference Design Kit (RDK)
MDL-IDM-L35
Stellaris  Intelligent Display Module with 3.5” Landscape Display for Single-Unit Packaging
MDL-IDM-L35-B
Stellaris  Intelligent Display Module with 3.5” Landscape Display for Volume Packaging
Stellaris Intelligent Display Module with 3.5” Landscape Display
Stellaris Intelligent Display Module with 3.5”
Landscape Display
The Stellaris® Intelligent Display Module with 3.5” Landscape Display (MDL-IDM-L35) offers a complete QVGA touch-screen user interface for control, automation, and
instrumentation applications. The MDL-IDM-L35 features several serial, digital, and analog connectivity options for easy implementation as a Human Machine Interface
(HMI) touch display panel in an embedded control device. Software development for the RDK-IDM-L35 is simpliﬁ ed by using our comprehensive graphics library and
ARM development tools from ARM tools partners. Stellaris® IDMs are the ﬁ rst display modules available with the efﬁ cient performance and robust integration of an
ARM® Cortex™-M3 microcontroller, positioning the modules for use in building access controllers and security systems, intelligent white goods and home appliances,
thin clients, and factory automation applications.



<!-- Page 517 -->
### [PDF Page 517]

490
Appendix J
Copyright © 2009 Texas Instruments Incorporated
Serial-to-Ethernet Reference Design Kit
c o n n e c t e d  r e f e r e n c e  d e s i g n  k i t s

### Features

The RDK-S2E is the ﬁ rst Serial-to-Ethernet converter design available with
the efﬁ cient performance and robust integration of an ARM Cortex-M3
microcontroller. At the heart of the Stellaris Serial-to-Ethernet design is a
highly-integrated 32-bit Stellaris LM3S6432 ARM Cortex-M3 microcontroller
with 50 MHz of performance and ample single-cycle on-chip Flash and SRAM
memory to handle efﬁ cient network trafﬁ cking.  For maximum space savings,
the Stellaris microcontroller is offered in a small BGA package and integrates
the 10/100 Ethernet MAC and PHY on-chip.  With ARM, you have access to the
world’s most extensive ecosystem for development tools, applications, training
and support, operating systems, and software stacks.
The RDK-S2E includes the following product features:
• Stellaris® LM3S6432 ARM® Cortex™-M3 microcontroller in a
10 x 10 mm BGA package for reduced board size
• 10/100 Mbit Ethernet port
– Auto MDI/MDIX cross-over correction
– Trafﬁ c and link indicators
• 2 UART ports include RTS/CTS for ﬂ ow control
– UART0 has RS232 levels, transceiver runs at up to 250 Kbits/sec
– UART1 has CMOS/TTL levels, can run at 1.5 Mbits/sec
• Software
– IP conﬁ guration with static IP address or DHCP
– Telnet server for access to serial port
– Web server for module conﬁ guration
– UDP responder for device discovery
– Telnet client for Ethernet-based serial port extender
– SSH server for secure communications
• Module supports 5 V and 3.3 V supplies
• Multiple mounting options including optional mounting bracket
• JTAG port pads for factory programming
Kit contents
The Stellaris® Serial-to-Ethernet Module is offered as a reference design kit
(RDK-S2E) as well as a stand-alone, ready-for-production module (MDL-S2E).
The RDK ships with everything needed to quickly evaluate and easily customize
the MDL-S2E for your speciﬁ c application, including:
• Stellaris® Serial-to-Ethernet Module (MDL-S2E)
• RS-232 adaptor board
• Retractable Ethernet cable
• DB9 serial cable
• USB cable
• Quickstart Guide, User’s Manual, Software Reference Manual, Board Data
Sheet, software source code, BOM, schematics, and Gerber ﬁ les on CD
Stellaris Serial-to-Ethernet Reference Design Kit
Stellaris Serial-to-Ethernet Module
(actual size)
Ordering information
Part number
Description
RDK-S2E
Stellaris Serial-to-Ethernet Reference Design Kit (RDK)
MDL-S2E
Stellaris Serial-to-Ethernet Module for Single-Unit Packaging
MDL-S2E-B
Stellaris Serial-to-Ethernet Module for Volume Packaging
The Stellaris® Serial-to-Ethernet Reference Design Kit (RDK-S2E) offers a complete, open-tooled, and ready-to-implement solution designed to add Ethernet connectivity
to any serial device. The kit contains all the necessary hardware and software for you to design, develop, and integrate your serial-to-Ethernet design into industrial ap-
plications. The most common application for the RDK-S2E is for augmenting legacy products that contain a serial port for a conﬁ guration or control interface. In addition,
newer computers, especially laptop computers, do not necessarily have serial ports, and a serial connection is limited by cable length (typically 10 m).  Implementing
a Stellaris® Serial-to-Ethernet design into the legacy serial device provides many beneﬁ ts including no major board redesign or software changes, easy sharing on a
network other than Ethernet, tiny form-factor for unobtrusive implementation, and no limitation on maximum cable length for serial connections.



<!-- Page 518 -->
### [PDF Page 518]

491
Stellaris® Family of Microcontrollers
Copyright © 2009 Texas Instruments Incorporated
Stepper Motor Reference Design Kit
m o t i o n  r e f e r e n c e  d e s i g n  k i t s

### Features

The RDK-Stepper contains our feature-rich Stellaris LM3S617 microcontroller
designed for motion control applications, a Fairchild Semiconductor
power stage consisting of Fairchild’s FAN73832 HVIC Driver and FDMS3672
MOSFET, a NEMA23 stepper motor, a graphical control program for Windows™,
and accompanying cables, source code, and documentation. The Stepper RDK
takes advantage of the integrated features of the Stellaris microcontroller and the
processing power of the ARM Cortex-M3 core to implement chopper control
without the need for an external step controller or comparator circuits. The
graphical control program allows users to experiment with varying drive param-
eters and observe the effect on motor performance.
The Stepper RDK includes the following product features:
• Advanced chopper control of bipolar stepper motors
• Software-based chopper control to operate high-torque
steppers at high step rates
• Fast and slow decay modes
• Full-step, half-step, micro-step, and wave modes
• High step rates up to 10,000 steps/sec
• Programmable holding current
• Integrated USB virtual COM port
• Support for external debugger through standard 20-pin ARM header
• Easy power and motor connection through pluggable terminal blocks
• Bootloader for ﬁ rmware upgrades over serial port
Kit contents
The Stepper RDK ships with everything needed to evaluate bipolar
stepper motor control including:
• Main control circuit board
• NEMA23 stepper motor
• 24 V wall power supply with international plug kit
• USB cable
• Graphical control program for Windows on CD
• Quickstart Guide, User’s Manual, Software Reference Manual,
source code, BOM, schematics, and Gerber ﬁ les on CD
Stellaris Stepper Motor Reference Design Kit
Ordering information
Part number
Description
RDK-Stepper
Stellaris Stepper Motor Reference Design Kit
MDL-Stepper
Stellaris Stepper Motor Control Board Only Single-Unit Packaging
MDL-Stepper-B
Stellaris Stepper Motor Central Board Only Volume Packaging
RDK-Stepper Windows graphical control program screen shot
The Stellaris Stepper Motor Control Reference Design Kit (RDK-Stepper) contains all the necessary hardware and software for you to design, develop, and integrate state-
of-the-art stepper motor applications. The RDK-Stepper combines the strength and ﬂ exibility of Stellaris microcontrollers with Fairchild Semiconductor’s gate drivers and
MOSFETs to create an advanced stepper motor control design that has been carefully engineered for performance, cost, and ﬂ exibility. Stepper motors are particularly
suited for use in two- and three-axis CNC equipment, sorting and grading equipment, specialized printers and scanners, and factory automation.
The kit’s software architecture is directly scalable from micro-horsepower applications to the largest current stepper designs. Structured as prioritized Interrupt
Service Routines (ISRs), this powerful and ﬂ exible software architecture runs efﬁ ciently in the background, leaving signiﬁ cant headroom for system application and/or
networking tasks.



<!-- Page 519 -->
### [PDF Page 519]

492
Appendix J
Copyright © 2009 Texas Instruments Incorporated
m o t i o n  r e f e r e n c e  d e s i g n  k i t s
Brushless DC Reference Design Kit

### Features

The RDK-BLDC contains our feature-rich Stellaris LM3S8971 microcon-
troller with Ethernet and CAN, a three-phase brushless DC motor, a graphical
control program for Windows™, and accompanying cables, source code, and
documentation. The RDK-BLDC takes advantage of the integrated motion and
communications features of the Stellaris LM3S8971 microcontroller and the
processing power of the ARM® Cortex™-M3 core to optimally control a wide
range of brushless DC motors in diverse applications. The graphical control
program allows you to experiment with varying drive parameters and observe
the effect on motor performance.
The RDK-BLDC includes the following product features:
• 10/100 Ethernet and CAN communications interfaces
• Advanced motor control for three-phase brushless DC motors
• Four quadrant operation for precise motion control
• Hall Effect, Quadrature, and Sensorless operation modes
• Controls 3-phase BLDC motors up to 36 V 500 W
• Easy to customize – full source code and design ﬁ les available
• Interrupt-driven motion software, easily extendable
• 30 MIPS headroom for system software
• On-board braking circuit
• Incremental quadrature encoder input
• Analog and digital control inputs
• Test mode push-button
• Status LEDs indicate Power, Run, and Fault conditions
• Optional power-managed fan for forced-air cooling
• Screw terminals for all power and signal wiring
• JTAG/SWD port for software debugging
Kit contents
The RDK-BLDC ships with everything needed to evaluate brushless
DC motor control including:
• Main control circuit board
• 3-phase brushless DC motor
• 24 V power supply
• Retractable ethernet cable
• Debug adapter
• Graphical control program for Windows on CD
• Quickstart Guide, User’s Manual, Software Reference Manual,
Board Data Sheet, source code, BOM, schematics, and Gerber ﬁ les on CD
Stellaris Brushless DC Motor Reference Design Kit
Ordering information
Part number
Description
RDK-BLDC
Stellaris Brushless DC Motor Control Reference Design Kit
MDL-BLDC
Stellaris Brushless DC Motor Control Board Only Single-Unit Packaging
MDL-BLDC-B
Stellaris Brushless DC Motor Control Board Only Volume Packaging
RDK-BLDC Windows graphical control program screen shot
The Stellaris Brushless DC (BLDC) Motor Control Reference Design Kit (RDK-BLDC) with Ethernet and CAN contains all the necessary hardware and software for you to
design, develop, and integrate your BLDC motor applications in industrial networks. The RDK-BLDC combines the strength and ﬂ exibility of Stellaris microcontrollers with
Fairchild Semiconductor’s power modules to deliver a sophisticated four-quadrant motor control for three-phase brushless DC motors rated at up to 36 V. Brushless DC
motors are particularly suited for use in factory automation, robotics, electric wheelchairs and mobility devices, pumping and ventilation systems, and small appliances.



<!-- Page 520 -->
### [PDF Page 520]

493
Stellaris® Family of Microcontrollers
Copyright © 2009 Texas Instruments Incorporated
m o t i o n  r e f e r e n c e  d e s i g n  k i t s
Brushed DC Motor Control with CAN
Reference Design Kit

### Features

The MDL-BDC ships as a ready-to-run, yet software-customizable
module with the following features:
• Quiet control of brushed DC motors
– 15 kHz PWM frequency
• Two options for Speed control
– Industry-standard R-C servo type (PWM) interface
– Controller Area Network (CAN) interface
• CAN communication
– Full conﬁ gurability of module options
– Real-time monitoring of current, voltage, and speed
– Load ﬁ rmware over CAN
• Status LED indicates Run, Direction, and Fault Conditions
• Motor brake/coast selector
• Limit switch inputs for forward and reverse directions
• Quadrature encoder input (QEI) and Analog input
• Colored screw terminals for all power wiring
– Headers (0.1 inch pitch) for all control signals
• Easy to customize
– Includes full source code, example applications, and
design ﬁ les
– Develop using tools from Keil, IAR, Code Sourcery, or Code Red (using a
Stellaris evaluation kit or preferred ARM Cortex-M3 debugger)
– Supported by Stellaris Peripheral Driver Library
Kit contents
In addition to being offered as a stand-alone, ready-for-production module (MDL-
BDC), the Stellaris MDL-BDC is also offered as a complete open-tool reference
design kit (RDK-BDC). The RDK ships with everything needed to quickly evaluate
and easily customize the MDL-BDC for your speciﬁ c application, including:
• MDL-BDC motor control module
• Mabuchi RS-555PH3255 Brushed DC Motor (rated 5000 RPM, 12 V, 3 A)
• Universal input wall power supply
• BDC CAN console based on EK-LM3S2965 Evaluation Kit
• CAN cable and terminator; USB cable; ARM JTAG/SWD ribbon cable
• JTAG debug adapter for 10-pin ﬁ ne-pitch connection to a standard
20-pin connector
• Quickstart Guide, User’s Manual, Software Reference Manual, Board
Data Sheet, source code, BOM, schematics, and Gerber ﬁ les on CD
Ordering information
Part number
Description
RDK-BDC
Stellaris Brushed DC Motor Control with CAN Reference Design Kit (RDK)
MDL-BDC
Stellaris Brushed DC Motor Control with CAN Module Single-Unit Packaging
MDL-BDC-B
Stellaris Brushed DC Motor Control with CAN Module Volume Packaging
Stellaris Brushed DC Motor Control with CAN Reference Design Kit
The Stellaris® Brushed DC Motor Control Reference Design Kit (RDK-BDC) with CAN contains all the necessary hardware and software for you to design, develop, and integrate
your brushed DC motor applications in industrial networks.  The Brushed DC motor control design offers high performance CAN networking with variable speed control for
12 V brushed DC motors at up to 40 A continuous current,  along with a rich set of control options and sensor interfaces, including analog and quadrature encoder interfaces.
The design uses highly optimized software and a powerful 32-bit Stellaris LM3S2616 microcontroller to implement open-loop speed control as well as closed-loop control
of speed, position, or motor current.The motor control design is powered by the Stellaris LM3S2616 microcontroller, featuring Controller Area Network and advanced mo-
tion control capabilities. The high-frequency Stellaris-based PWM enables DC motors to run smoothly and quietly over a wide speed range. The LM3S2616 microcontroller’s
robust combination of features, along with the efﬁ cient and deterministic performance of the ARM Cortex-M3 core, positions the design into a wide variety of consumer and
industrial applications, including factory automation devices and systems, mobile robots, household appliances, pumping and ventilation systems, and electric wheelchairs
and mobility devices.
Most users will use the supplied software as-is for brushed DC motor control applications.  For other users, software development for the RDK-BDC is simpliﬁ ed by using
our comprehensive Stellaris peripheral driver library and ARM development tools from our tools partners.



<!-- Page 521 -->
### [PDF Page 521]

494
Appendix J
Copyright © 2009 Texas Instruments Incorporated
AC Induction Motor Reference Design Kit
m o t i o n  r e f e r e n c e  d e s i g n  k i t s

### Features

The RDK-ACIM contains our feature-rich Stellaris LM3S818 microcon-
troller designed for motion control applications, Fairchild Semiconductor’s
FSBS10CH60 power module, a Selni three-phase appliance AC motor, a
graphical control program for Windows™, and accompanying cables, source
code, schematics, BOM, and documentation. The RDK-ACIM takes advantage of
the integrated features and processing power of the Stellaris microcontroller
to implement energy-efﬁ cient, modern control algorithms including Space
Vector Modulation (SVM). The graphical control program allows users to
experiment with varying drive parameters and observe the effect on
motor performance.
The RDK-ACIM includes the following product features:
• Advanced motor control for three-phase and single-phase
AC induction motors
• Active braking circuit
• Active in-rush control circuit
• Optional control of external Power Factor Correction (PFC) stage
• Easily change line ﬁ lter, bus capacitors, and JTAG interface
• Includes code for main control algorithms including space-vector
modulation and sine control
• Accurate current sensing through split low-side current sensing
• Several isolated control input options including:
– Virtual COM port using integrated USB port
– Windows GUI application for conﬁ guration, control, and monitoring
– Logic-level serial port
– Speed potentiometer and mode switch
– Speed and position monitoring through quadrature
encoder/tachometer input
• Electrically isolated JTAG port for software debugging
• Bootloader for ﬁ rmware upgrades over serial port
Kit contents
The RDK-ACIM ships with everything needed to evaluate AC induction
motor control including:
• Main control circuit board with a factory-installed heat sink
• 3-phase appliance AC motor (0-20000 rpm)
• Power cables
• USB cable
• Graphical control program for Windows on CD
• Quickstart Guide, User’s Manual, Software Reference Manual, source code,
BOM, schematics, and Gerber ﬁ les on CD
• Bootloader for ﬁ rmware upgrades over serial port
Stellaris AC Induction Motor Reference Design Kit
Ordering information
Part number
Description
RDK-ACIM
Stellaris AC Induction Motor Reference Design Kit
MDL-ACIM
Stellaris AC Induction Motor Control Board Only Single-Unit Packaging
MDL-ACIM-B
Stellaris AC Induction Motor Only Control Board Volume Packaging
The Stellaris AC Induction Motor Reference Design Kit (RDK-ACIM) contains all the necessary hardware and software for you to design, develop, and integrate state-
of-the-art AC induction motor applications. The ACIM design combines the strength and ﬂ exibility of Stellaris microcontrollers with Fairchild Semiconductor’s power
modules to create an advanced variable speed AC motor control design that has been carefully engineered for performance, cost, and ﬂ exibility.  AC induction motors
are particularly suited for use in major home appliances (refrigerators, dishwashers, washing machines, and dryers), residential and light commercial HVAC systems, and
three-phase industrial motor drives.
The kit’s software architecture is directly scalable from fractional-horsepower applications to those in the hundreds of kilowatts of power. Structured as prioritized Inter-
rupt Service Routines (ISRs), this powerful and ﬂ exible software architecture runs efﬁ ciently in the background, leaving signiﬁ cant headroom for system application and/
or networking tasks.
RDK-ACIM Windows graphical  control program screen shot



<!-- Page 522 -->
### [PDF Page 522]

495
Stellaris® Family of Microcontrollers
Copyright © 2009 Texas Instruments Incorporated
Introduction to TI ARM
®-Based
Embedded Processors
Target Applications for TI’s ARM-Based Devices
ARM processors cover a wide range of performance and features enabling system
designers to create solutions that meet their precise requirements.
Target applications include:
• Data processing
– POS
– Handheld computing
• Wired communications
– Networking
– Broadcast equipment
• Wireless communications
– Handsets
– LAN/WAN routers
• Consumer electronics
– Portable A/V players
– Digital set-top-box
– Digital cameras
– Network appliances
– HVAC
– Gaming equipment
• Automotive
– Infotainment
– Safety and control
– Body electronics
• Industrial
– Medical
– Automation and drives
– Metering
– Power supplies
– Remote monitoring
– Building controls
– Factory automation
– Test and measurement
equipment
TI offers a broad range of ARM-based products that address a wide variety of applications while delivering optimum performance, power consumption and system cost.
These ARM-based products span a variety of TI’s product lines. See the chart below for how these products map to the ARM offerings. For more information please visit
www.ti.com/arm.
TI’s ARM-Based Devices
TI Processor
CPU
MHz
Operating System
Key Peripherals
Sitara AM3517
ARM Cortex-A8 + NEON™
coprocessor
500
Linux, Windows CE
EMAC, CAN, I2C, McBSP, McSPI, UART, DDR2,
MMC/SD/SDIO, USB 2.0 HS H, USB 2.0 HS
OTG, Display subsystem
Sitara AM3505
ARM Cortex-A8
500
Linux, Windows CE
EMAC, CAN, I2C, McBSP, McSPI, UART, DDR2,
MMC/SD/SDIO, USB 2.0 HS H, USB 2.0 HS
OTG, Display subsystem
OMAP3503
ARM Cortex™-A8
600
Linux, Windows CE,
Symbian, Palm
MMC/SD, McBSP, UART, USB 2.2 HS 3-Port,
USB 2.0 HS OTG
OMAP3515
ARM Cortex-A8
600
Linux, Windows CE,
Symbian, Palm
MMC/SD, McBSP, UART, USB 2.2 HS 3-Port,
USB 2.0 HS OTG
OMAP3525
ARM Cortex-A8 + C64x™
DSP
600
Linux, Windows CE,
Symbian, Palm
MMC/SD, McBSP, UART, USB 2.2 HS 3-Port,
USB 2.0 HS OTG
OMAP3530
ARM Cortex-A8 + C64x DSP
600
Linux, Windows CE,
Symbian, Palm
MMC/SD, McBSP, UART, USB 2.2 HS 3-Port,
USB 2.0 HS OTG
OMAP-L137
"ARM926 + C674x DSP”
300
Linux, Windows CE,
VxWorks
MMC/SD, SDRAM/NAND, EMAC, UART, USB 2.0
HS OTG, USB 1.1
OMAP-L138
"ARM926 + C674x DSP”
300
Linux, Windows CE,
VxWorks
mDDR/DDR2, SDRAM/NAND, SATA, uPP, EMAC,
USB 2.0 HS OTG, USB 1.1
TMS320DM355
ARM926
135, 216, 270
Linux
mDDR/DDR2, USB 2.0  H/OTG
TMS320DM335
ARM926
135, 216
Linux
mDDR/DDR2, USB 2.0  H/OTG
TMS320DM357
ARM926
270
Linux
EMAC, DDR2, JTAG, USB 2.0 OTG
TMS320DM365
ARM926
216, 270, 300
Linux
EMAC, mDDR/DDR2, HPI, voice codec, USB

## 2.0 H/OTG

TMS320DM6467
ARM926 + C64x DSP
594/729,
297/365
Linux, Windows CE
EMAC, DDR2, USB 2.0, HPI, PCI, ATA
TMS320DM6446
ARM926 + C64x DSP
300/600
Linux, Windows CE
EMAC, DDR2, USB 2.0, HPI, ATA, Flash card I/F
TMS320DM6443
ARM926 + C64x DSP
300/600
Linux, Windows CE
EMAC, DDR2, USB 2.0, HPI, ATA, Flash card I/F
TMS320DM6441
ARM926 + C64x DSP
256/512
Linux, Windows CE
EMAC, DDR2, USB 2.0, HPI, ATA, Flash card I/F
Stellaris
LM3Sx00's
ARM Cortex-M3
20 - 50
various embedded
RTOS
(MCU) ADC, SSI/SPI, UART, I2C, motion control
unit
Stellaris
LM3S1000's
ARM Cortex-M3
25 - 80
various embedded
RTOS
(MCU) ADC, SSI/SPI, UART, I2C, motion control
unit, hibernate
Stellaris
LM3S2000's
ARM Cortex-M3
25 - 80
various embedded
RTOS
(MCU) CAN, ADC, SSI/SPI, UART, I2C, motion
control unit, hibernate
Stellaris
LM3S3000's
ARM Cortex-M3
50
various embedded
RTOS
(MCU) USB 2.0 FS D/H/OTG, ADC, SSI/SPI,
UART, I2C, motion control unit, hibernate, Stel-
larisWare in ROM
Stellaris
LM3S5000's
ARM Cortex-M3
50 - 80
various embedded
RTOS
(MCU) USB 2.0 FS D/H/OTG, CAN, ADC, SSI/
SPI, UART, I2C, motion control unit, hibernate,
StellarisWare in ROM
Stellaris
LM3S6000's
ARM Cortex-M3
25 - 50
various embedded
RTOS
(MCU) 10/100 Ethernet MAC+PHY, ADC, SSI/
SPI, UART, I2C, motion control unit, hibernate
Stellaris
LM3S8000's
ARM Cortex-M3
50
various embedded
RTOS
(MCU) 10/100 Ethernet MAC+PHY, CAN,
ADC, SSI/SPI, UART, I2C, motion control unit,
hibernate
Stellaris
LM3S9000's
ARM Cortex-M3
80 - 100
various embedded
RTOS
(MCU) 10/100 Ethernet MAC+PHY, USB 2.0 FS
D/H/OTG, CAN, ADC, SSI/SPI, UART, I2C, motion
control unit, hibernate, StellarisWare in ROM



<!-- Page 523 -->
### [PDF Page 523]

496
Appendix J
SLAB054B
TI Worldwide Technical Support
Internet
TI Semiconductor Product Information Center Home
Page
support.ti.com
TI Semiconductor KnowledgeBase Home Page
support.ti.com/sc/knowledgebase
Product Information Centers
Americas Phone
+1(972) 644-5580
Brazil
Phone
0800-891-2616
Mexico
Phone
0800-670-7544
Fax
+1(972) 927-6377
Internet/Email
support.ti.com/sc/pic/americas.htm
Europe, Middle East, and Africa
Phone
European Free Call
00800-ASK-TEXAS
(00800 275 83927)
International
+49 (0) 8161 80 2121
Russian Support
+7 (4) 95 98 10 701
Note: The European Free Call (Toll Free) number is not active in all
countries. If you have technical difficulty calling the free call number,
please use the international number above.
Fax
+(49) (0) 8161 80 2045
Internet
support.ti.com/sc/pic/euro.htm
Japan
Fax
International
+81-3-3344-5317
Domestic
0120-81-0036
Internet/Email
International
support.ti.com/sc/pic/japan.htm
Domestic
www.tij.co.jp/pic
Asia
Phone
International
+91-80-41381665
Domestic
Toll-Free Number
Australia
1-800-999-084
China
800-820-8682
Hong Kong
800-96-5941
India
1-800-425-7888
Indonesia
001-803-8861-1006
Korea
080-551-2804
Malaysia
1-800-80-3973
New Zealand
0800-446-934
Philippines
1-800-765-7404
Singapore
800-886-1028
Taiwan
0800-006800
Thailand
001-800-886-0010
Fax
+886-2-2378-6808
Email
tiasia@ti.com or ti-china@ti.com
Internet
support.ti.com/sc/pic/asia.htm
Important Notice: The products and services of Texas Instruments Incorporated and its
subsidiaries described herein are sold subject to TI’s standard terms and conditions of
sale. Customers are advised to obtain the most current and complete information about TI
products and services before placing orders. TI assumes no liability for applications
assistance, customer’s applications or product designs, software performance, or
infringement of patents. The publication of information regarding any other company’s
products or services does not constitute TI’s approval, warranty or endorsement thereof.
© 2009 Texas Instruments Incorporated
The platform bar, Stellaris and StellarisWare are registered trademarks of Texas Instruments.
All other trademarks are the property of their respective owners.
Safe Harbor Statement: This publication may contain forward-looking statements that
involve a number of risks and uncertainties. These “forward-looking statements” are
intended to qualify for the safe harbor from liability established by the Private Securities
Litigation Reform Act of 1995. These forward-looking statements generally can be identified
by phrases such as TI or its management “believes,” “expects,” “anticipates,” “foresees,”
“forecasts,” “estimates” or other words or phrases of similar import. Similarly, such
statements herein that describe the company's products, business strategy, outlook,
objectives, plans, intentions or goals also are forward-looking statements. All such forward-
looking statements are subject to certain risks and uncertainties that could cause actual
results to differ materially from those in forward-looking statements. Please refer to TI's
most recent Form 10-K for more information on the risks and uncertainties that could
materially affect future results of operations. We disclaim any intention or obligation to
update any forward-looking statements as a result of developments occurring after the date
of this publication.
E093008


