# Front Matter (Title, Preface, Acknowledgements)

> **Textbook**: Embedded Systems: Real-Time Operating Systems for ARM Cortex-M Microcontrollers  
> **Author**: Jonathan W. Valvano  
> **PDF Page Range**: 1 - 17


---


<!-- Page 1 -->
### [PDF Page 1]

Real-Time Operating Systems for
ARM Cortex-M Microcontrollers
29800
16023
EMBEDDED SYSTEMS
JONATHAN VALVANO



<!-- Page 2 -->
### [PDF Page 2]

EM BED D ED  S Y S TEM S :
REAL-TIME OPERATING SYSTEMS FOR
ARM CORTEX-M MICROCONTROLLERS
Volume 3
Fourth Edition,
January 2017
Jonathan W. Valvano



<!-- Page 3 -->
### [PDF Page 3]

Fourth edition
January 2017
ARM and uVision are registered trademarks of ARM Limited.
Cortex and Keil are trademarks of ARM Limited.
Stellaris and Tiva are registered trademarks Texas Instruments.
Code Composer Studio is a trademark of Texas Instruments.
All other product or service names mentioned herein are the trademarks of their respective
owners.
In order to reduce costs, this college textbook has been self-published. For more
information about my classes, my research, and my books, see
http://users.ece.utexas.edu/~valvano/
For corrections and comments, please contact me at: valvano@mail.utexas.edu.
Please cite this book as: J. W. Valvano, Embedded Systems: Real-Time Operating
Systems for ARM ® Cortex -M Microcontrollers, Volume 3,
http://users.ece.utexas.edu/~valvano/, ISBN: 978-1466468863.
Copyright © 2017 Jonathan W. Valvano
All rights reserved. No part of this work covered by the copyright herein may be
reproduced, transmitted, stored, or used in any form or by any means graphic,
electronic, or mechanical, including but not limited to photocopying, recording,
scanning, digitizing, taping, web distribution, information networks, or
information storage and retrieval, except as permitted under Section 107 or 108 of
the 1976 United States Copyright Act, without the prior written permission of the
publisher.
ISBN-13: 978-1466468863
ISBN-10: 1466468866



<!-- Page 4 -->
### [PDF Page 4]

Table of Contents
Preface to The Fourth Edition
Preface to Volume 3
Acknowledgements
1. Computer Architecture
1.1. Introduction to Real-Time Operating Systems
1.1.1. Real-time operating systems
1.1.2. Embedded Systems
1.2. Computer Architecture
1.2.1. Computers, processors, and microcontrollers
1.2.2. Memory
1.3. Cortex-M Processor Architecture
1.3.1. Registers
1.3.2. Stack
1.3.3. Operating modes
1.3.4. Reset
1.3.5. Clock system
1.4. Texas Instruments Cortex-M Microcontrollers
1.4.1. Introduction to I/O
1.4.2. Texas Instruments TM4C123 LaunchPad I/O pins
1.4.3. Texas Instruments TM4C1294 Connected LaunchPad I/O pins
1.4.4. Texas Instruments MSP432 LaunchPad I/O pins
1.4.5. Interfacing to a LaunchPad
1.5. ARM Cortex-M Assembly Language
1.5.1. Syntax
1.5.2. Addressing modes and operands
1.5.3. List of twelve instructions
1.5.4. Accessing memory



<!-- Page 5 -->
### [PDF Page 5]

1.5.5. Functions
1.5.6. ARM Cortex Microcontroller Software Interface Standard
1.5.7. Conditional execution
1.5.8. Stack usage
1.5.9. Floating-point math
1.5.10. Keil assembler directives
1.6. Pointers in C
1.6.1. Pointers
1.6.2. Arrays
1.6.3. Linked lists
1.7. Memory Management
1.7.1. Use of the heap
1.7.2. Simple fixed-size heap
1.7.3. Memory manager: malloc and free
1.8. Introduction to debugging
1.9. Exercises
2. Microcontroller Input/Output
2.1. Parallel I/O
2.1.1. TM4C I/O programming
2.1.2. MSP432 I/O programming
2.2. Interrupts
2.2.1. NVIC
2.2.2. SysTick periodic interrupts
2.2.3. Periodic timer interrupts
2.2.4. Critical sections
2.2.5. Executing periodic tasks
2.2.6. Software interrupts
2.3. First in First Out (FIFO) Queues
2.4. Edge-triggered Interrupts
2.4.1. Edge-triggered interrupts on the TM4C123
2.4.2. Edge-triggered Interrupts on the MSP432



<!-- Page 6 -->
### [PDF Page 6]

2.5. UART Interface
2.5.1. Transmitting in asynchronous mode
2.5.2. Receiving in asynchronous mode
2.5.3. Interrupt-driven UART on the TM4C123
2.5.4. Interrupt-driven UART on the MSP432
2.6. Synchronous Transmission and Receiving using the SSI
2.7. Input Capture or Input Edge Time Mode
2.7.1. Basic principles
2.7.2. Period measurement on the TM4C123
2.7.3. Period measurement on the MSP432
2.7.4. Pulse width measurement
2.7.5. Ultrasonic distance measurement
2.8. Pulse Width Modulation
2.8.1. Pulse width modulation on the TM4C123
2.8.2. Pulse width modulation on the MSP432
2.9. Analog Output
2.10. Analog Input
2.10.1. ADC Parameters
2.10.2. Internal ADC on TM4C
2.10.3. Internal ADC on MSP432
2.10.4. IR distance measurement
2.11. OS Considerations for I/O Devices

### 2.11.1 Board Support Package


### 2.11.2 Path Expression

2.12. Debugging
2.12.1. Functional Debugging
2.12.2. Performance Debugging (FFT analysis)
2.12.3. Debugging heartbeat
2.12.4. Profiling
2.13. Exercises
3. Thread Management



<!-- Page 7 -->
### [PDF Page 7]

3.1. Introduction to RTOS
3.1.1. Motivation
3.1.2. Parallel, distributed and concurrent programming
3.1.3. Introduction to threads
3.1.4. States of a main thread
3.1.5. Real-time systems
3.1.6. Producer/Consumer problem using a mailbox
3.1.7. Scheduler
3.2. Function pointers
3.3. Thread Management
3.3.1. Two types of threads
3.3.2. Thread Control Block (TCB)
3.3.3. Creation of threads
3.3.4. Launching the OS
3.3.5. Switching threads
3.3.6. Profiling the OS
3.3.7. Linking assembly to C
3.3.8. Periodic tasks
3.4. Semaphores
3.5. Thread Synchronization
3.5.1. Resource sharing, nonreentrant code or mutual exclusion
3.5.2. Condition variable
3.5.3. Thread communication between two threads using a mailbox
3.6. Process Management
3.7. Dynamic loading and linking
3.8. Exercises
4. Time Management
4.1. Cooperation
4.1.1. Spin-lock semaphore implementation with cooperation
4.1.2. Cooperative Scheduler
4.2. Blocking semaphores



<!-- Page 8 -->
### [PDF Page 8]

4.2.1. The need for blocking
4.2.2. The blocked state
4.2.3. Implementation
4.2.4. Thread rendezvous
4.3. First In First Out Queue
4.3.1. Producer/Consumer problem using a FIFO
4.3.2. Little’s Theorem
4.3.3. FIFO implementation
4.3.4. Three-semaphore FIFO implementation
4.3.5. Two-semaphore FIFO implementation
4.3.6. One-semaphore FIFO implementation
4.3.7. Kahn Process Networks
4.4. Thread sleeping
4.5. Deadlocks
4.6. Monitors
4.7. Fixed Scheduling
4.8. Exercises
5. Real-time Systems
5.1. Data Acquisition Systems
5.1.1. Approach
5.1.2. Performance Metrics
5.1.3. Audio Input/Output
5.2. Priority scheduler
5.2.1. Implementation
5.2.2. Multi-level Feedback Queue
5.2.3. Starvation and aging
5.2.4. Priority inversion and inheritance on Mars Pathfinder
5.3. Debouncing a switch
5.3.1. Approach to debouncing
5.3.2. Debouncing a switch on TM4C123
5.3.3. Debouncing a switch on MSP432



<!-- Page 9 -->
### [PDF Page 9]

5.4. Running event threads as high priority main threads
5.5. Available RTOS
5.5.1. Micrium uC/OS-II
5.5.2. Texas Instruments RTOS
5.5.3. ARM RTX Real-Time Operating System
5.5.4. FreeRTOS
5.5.5. Other Real Time Operating Systems
5.6. Exercises
6. Digital Signal Processing
6.1. Basic Principles
6.2. Multiple Access Circular Queue
6.3. Using the Z-Transform to Derive Filter Response
6.4. IIR Filter Design Using the Pole-Zero Plot
6.5. Discrete Fourier Transform
6.6. FIR Filter Design
6.7. Direct-Form Implementations.
6.8. Exercises
7. High-Speed Interfacing
7.1. The Need for Speed
7.2. High-Speed I/O Applications
7.3. General Approaches to High-Speed Interfaces
7.3.1. Hardware FIFO
7.3.2. Dual Port Memory
7.3.3. Bank-Switched Memory
7.4. Fundamental Approach to DMA
7.4.1. DMA Cycles
7.4.2. DMA Initiation
7.4.3. Burst versus Single Cycle DMA
7.4.4. Single Address versus Dual Address DMA
7.4.5. DMA programming on the TM4C123
7.6. Exercises



<!-- Page 10 -->
### [PDF Page 10]

8. File system management
8.1. Performance Metrics
8.1.1. Usage
8.1.2. Specifications
8.1.3. Fragmentation
8.2. File System Allocation
8.2.1. Contiguous allocation
8.2.2. Linked allocation
8.2.3. Indexed allocation
8.2.4. File allocation table (FAT)
8.3. Solid State Disk
8.3.1. Flash memory
8.3.2. Flash device driver
8.3.3. eDisk device driver
8.3.4. Secure digital card interface
8.4. Simple File System
8.4.1. Directory
8.4.2. Allocation
8.4.3. Free space management
8.5. Write-once File System
8.5.1. Usage
8.5.2. Allocation
8.5.3. Directory
8.5.4. Append
8.5.5. Free space management
8.6. Readers-Writers Problem
8.7. Exercises
9. Communication Systems
9.1. Fundamentals
9.1.1. The network
9.1.2. Physical Channel



<!-- Page 11 -->
### [PDF Page 11]

9.1.3. Wireless Communication
9.1.4. Radio
9.2. Controller Area Network (CAN)
9.2.1. The Fundamentals of CAN
9.2.2. Texas Instruments TM4C CAN
9.3. Embedded Internet
9.3.1. Abstraction
9.3.2. Message Protocols
9.3.3. Ethernet Physical Layer
9.3.4. Ethernet on the TM4C1294
9.4. Internet of Things
9.4.1. Basic Concepts
9.4.2. UDP and TCP Packets
9.4.3. Web server
9.4.4. UDP communication over WiFi
9.4.5. Other CC3100 Applications
9.4. Bluetooth Fundamentals
9.4.1. Bluetooth Protocol Stack
9.4.2. Client-server Paradigm
9.5. CC2650 Solutions
9.5.1. CC2650 Microcontroller
9.5.2. Single Chip Solution, CC2650 LaunchPad
9.6. Network Processor Interface (NPI)
9.6.1. Overview
9.6.2. Services and Characteristics
9.6.3. Advertising
9.6.4. Read and Write Indications
9.7. Application Layer Protocols for Embedded Systems
9.7.1. CoAP

### 9.7.2 MQTT

9.8. Exercises



<!-- Page 12 -->
### [PDF Page 12]

10. Robotic Systems
10.1. Introduction to Digital Control Systems
10.2. Binary Actuators
10.2.1. Electrical Interface
10.2.2. DC Motor Interface with PWM
10.3. Sensors
10.4. Odometry
10.5. Simple Closed-Loop Control Systems.
10.6. PID Controllers
10.6.1. General Approach to a PID Controller
10.6.2. Design Process for a PID Controller
10.7. Fuzzy Logic Control
10.8. Exercises
Appendix 1. Glossary
Appendix 2. Solutions to Checkpoints
Reference Material



<!-- Page 13 -->
### [PDF Page 13]

Preface to The Fourth Edition
There are two major additions to this fourth edition. First, this version supports both
the TM4C and the MSP432 architectures. The material for the LM3S series has been
removed. Volumes 1 and 2 focused on the hardware and software aspects I/O
interfacing. In this volume we provide a set of low level device drivers allowing this
volume to focus on real-time operating systems, digital signal processing, control
systems, and the internet of things. The second addition is Bluetooth Low Energy
(BLE), which will be implemented by interfacing a CC2650, in a similar manner
with which IEEE802.11b wifi is implemented in this book using the CC3100.
Running on the CC2650 will be an application programmer interface called Simple
Network Processor (SNP). SNP allows the TM4C123/MSP432 microcontroller to
implement BLE using a simple set of UART messaging. Off-loading the BLE
functions to the CC2650 allows the target microcontroller to implement system level
functions without the burden of satisfying the real-time communication required by
Bluetooth.



<!-- Page 14 -->
### [PDF Page 14]

Preface to Volume 3
Embedded systems are a ubiquitous component of our everyday lives. We interact
with hundreds of tiny computers every day that are embedded into our houses, our
cars, our toys, and our work. As our world has become more complex, so have the
capabilities of the microcontrollers embedded into our devices. The ARM Cortex-M
family represents the new class of microcontrollers much more powerful than the
devices available ten years ago. The purpose of this book is to present the design
methodology to train young engineers to understand the basic building blocks that
comprise devices like a cell phone, an MP3 player, a pacemaker, antilock brakes,

```assembly
and an engine controller.
```

This book is the third in a series of three books that teach the fundamentals of
embedded systems as applied to the ARM Cortex-M family of microcontrollers. This
third volume is primarily written for senior undergraduate or first-year graduate
electrical and computer engineering students. It could also be used for professionals
wishing to design or deploy a real-time operating system onto an ARM platform. The
first book Embedded Systems: Introduction to ARM Cortex-M Microcontrollers is an
introduction to computers and interfacing focusing on assembly language and C
programming. The second book Embedded Systems: Real-Time Interfacing to ARM
Cortex-M Microcontrollers focuses on interfacing and the design of embedded
systems. This third book is an advanced book focusing on operating systems, high-
speed interfacing, control systems, and robotics.
An embedded system is a system that performs a specific task and has a computer
embedded inside. A system is comprised of components and interfaces connected
together for a common purpose. This book presents components, interfaces and
methodologies for building systems. Specific topics include microcontrollers, design,
verification, hardware/software synchronization, interfacing devices to the computer,
timing diagrams, real-time operating systems, data collection and processing, motor
control, analog filters, digital filters, and real-time signal processing.
In general, the area of embedded systems is an important and growing discipline
within electrical and computer engineering. In the past, the educational market of
embedded systems has been dominated by simple microcontrollers like the PIC, the
9S12, and the 8051. This is because of their market share, low cost, and historical
dominance. However, as problems become more complex, so must the systems that
solve them. A number of embedded system paradigms must shift in order to
accommodate this growth in complexity. First, the number of calculations per second
will increase from millions/sec to billions/sec. Similarly, the number of lines of
software code will also increase from thousands to millions. Thirdly, systems will
involve multiple microcontrollers supporting many simultaneous operations. Lastly,
the need for system verification will continue to grow as these systems are deployed
into safety critical applications. These changes are more than a simple growth in size

```assembly
and bandwidth. These systems must employ parallel programming, high-speed
```

synchronization, real-time operating systems, fault tolerant design, priority interrupt



<!-- Page 15 -->
### [PDF Page 15]

handling, and networking. Consequently, it will be important to provide our students
with these types of design experiences. The ARM platform is both low cost and
provides the high performance features required in future embedded systems.
Although the ARM market share is large and will continue to grow. Furthermore,
students trained on the ARM will be equipped to design systems across the complete
spectrum from simple to complex. The purpose of writing these three books at this
time is to bring engineering education into the 21st century.
This book employs many approaches to learning. It will not include an exhaustive
recapitulation of the information in data sheets. First, it begins with basic
fundamentals, which allows the reader to solve new problems with new technology.
Second, the book presents many detailed design examples. These examples illustrate
the process of design. There are multiple structural components that assist learning.

### Checkpoints, with answers in the back, are short easy to answer questions providing

immediate feedback while reading. Homework problems, which typically are
simpler than labs, provide more learning opportunities. The book includes an index

```assembly
and a glossary so that information can be searched. The most important learning
```

experiences in a class like this are of course the laboratories. More detailed lab
descriptions are available on the web. Specifically for Volume 1, look at the lab
assignments for EE319K. For Volume 2 refer to the EE445L labs, and for this
volume, look at the lab assignments for EE445M/EE380L.6.
There
is
a
web
site
accompanying
this
book
http://users.ece.utexas.edu/~valvano/arm. Posted here are ARM Keil™ uVision®

```assembly
and Texas Instruments Code Composer Studio™ projects for each of the example
```

programs in the book. You will also find data sheets and Excel spreadsheets relevant
to the material in this book.
The book will cover embedded systems for ARM ®  Cortex™-M microcontrollers
with specific details on the TM4C123, TM4C1294, and MSP432. Most of the topics
can be run on any Texas Instruments Cortex M microcontroller. In these books the
terms MSP432 and TM4C will refer to any of the Texas Instruments ARM Cortex-M
based microcontrollers. Although the solutions are specific for the MSP432 and
TM4C families, it will be possible to use these books for other ARM derivatives.



<!-- Page 16 -->
### [PDF Page 16]

Acknowledgements
I owe a wonderful debt of gratitude to Daniel Valvano. He wrote and tested most of
the software examples found in these books. Secondly, he maintains the example web
site, http://users.ece.utexas.edu/~valvano/arm. Lastly, he meticulously proofread
this manuscript.
Many shared experiences contributed to the development of this book. First I would
like to acknowledge the many excellent teaching assistants I have had the pleasure of
working with. Some of these hard-working, underpaid warriors include Pankaj
Bishnoi, Rajeev Sethia, Adson da Rocha, Bao Hua, Raj Randeri, Santosh Jodh,
Naresh Bhavaraju, Ashutosh Kulkarni, Bryan Stiles, V. Krishnamurthy, Paul Johnson,
Craig Kochis, Sean Askew, George Panayi, Jeehyun Kim, Vikram Godbole, Andres
Zambrano, Ann Meyer, Hyunjin Shin, Anand Rajan, Anil Kottam, Chia-ling Wei,
Jignesh Shah, Icaro Santos, David Altman, Nachiket Kharalkar, Robin Tsang, Byung
Geun Jun, John Porterfield,  Daniel Fernandez,  Deepak Panwar, Jacob Egner, Sandy
Hermawan, Usman Tariq, Sterling Wei, Seil Oh, Antonius Keddis, Lev Shuhatovich,
Glen Rhodes, Geoffrey Luke, Karthik Sankar, Tim Van Ruitenbeek, Raffaele Cetrulo,
Harshad Desai, Justin Capogna, Arindam Goswami, Jungho Jo, Mehmet Basoglu,
Kathryn Loeffler, Evgeni Krimer, Nachiappan Valliappan, Razik Ahmed, Sundeep
Korrapati, Song Zhang,  Zahidul Haq, Matthew Halpern, Cruz Monrreal II, Pohan
Wu, Saugata Bhattacharyya, Dayo Lawal, Abhishek Agarwal, Sparsh Singhai,
Nagaraja Revanna, Mahesh Srinivasan, Victoria Bill, Alex Hsu, Dylan Zika, Chun-
Kai Chang, Zhao Zheng, Ce Wei, Kelsey Taylor Ball, Brandon Nguyen, Turan Vural,
Schuyler Christensen, Danny Vo, Justin Nguyen, Danial Rizvi, Armand Behroozi,
Vivian Tan, Anthony Bauer,  Jun Qi Lau, Corey Cormier, Cody Horton, Youngchun
Kim, Ryan Chow, Cody Horton, Corey Cormier, and Dylan Zika. These teaching
assistants have contributed greatly to the contents of this book and particularly to its
laboratory assignments. Since 1981, I estimate I have taught embedded systems to
over 5000 students. My students have recharged my energy each semester with their
enthusiasm, dedication, and quest for knowledge. I have decided not to acknowledge
them all individually. However, they know I feel privileged to have had this
opportunity.
Next, I appreciate the patience and expertise of my fellow faculty members here at
the University of Texas at Austin. From a personal perspective Dr. John Pearce
provided much needed encouragement and support throughout my career. Over the
last few years, I have enjoyed teaching embedded systems with Drs. Ramesh
Yerraballi, Mattan Erez, Andreas Gerstlauer, and William Bard. Bill has contributed
to both the excitement and substance of our laboratory based on this book. Many of
the suggestions and corrections from Chris Shore and Drew Barbier of ARM about
Volume 1 applied equally to this volume. Austin Blackstone created and debugged the
Code Composer StudioTM versions of the example programs posted on the web.
Austin also taught me how to run the CC3000 and CC3100 Wifi examples on the
LaunchPad.



<!-- Page 17 -->
### [PDF Page 17]

Ramesh Yerraballi and I have created two MOOCs, which have had over 110,000
students, and delivered to 110 countries. The new material in this book was
developed under the watchful eye of Professor Yerraballi. It has been an honor and
privilege to work with such a skilled and dedicated educator.
Andreas Gerstlauer has taught a course based on this book multiple times, and I have
incorporated many of his ideas into this edition of the book. Furthermore, you will
find a rich set of material if you search with these keywords Gerstlauer RTOS
utexas.
Sincerely, I appreciate the valuable lessons of character and commitment taught to me
by my parents and grandparents. I recall how hard my parents and grandparents
worked to make the world a better place for the next generation. Most significantly, I
acknowledge the love, patience and support of my wife, Barbara, and my children,
Ben Dan and Liz. In particular, Dan designed and tested most of the MSP432 and
TM4C software presented in this book.
By the grace of God, I am truly the happiest man on the planet, because I am
surrounded by these fine people.
Jonathan W. Valvano
Good luck


