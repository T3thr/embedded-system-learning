# Front Matter (Title, Contents, Preface)

> **Textbook**: The AVR Microcontroller and Embedded Systems using Assembly and C

> **PDF Page Range**: 1 - 16


---


<!-- Page 1 -->
### [PDF Page 1]

the avr
microcontroller
and embedded
system
using assembly and c
MUHAMMAD ALI MAZIDI
SARMAD NAIMI
SEPEHR NAIMI



<!-- Page 2 -->
### [PDF Page 2]

the avr microcontroller
and embedded systems
using assembly and c
MUHAMMAD ALI MAZIDI, SARMAD NAIMI, AND SEPEHR NAIMI
The AVR microcontroller
from Atmel is one of the
most widely used 8-bit
microcontrollers in the
world. In this book the
authors use a step-by-step
and systematic approach to
show the programming of
the AVR chip. Examples in
both Assembly language
and C show how to program
many of the AVR features,
such as timers, serial
communication, ADC, SPI, 12C, and PWM. The text is
organized into two parts:
• The first seven chapters use Assembly language
programming to examine the internal architecture of
the AVR.
• Chapters 7-18 use both Assembly and C to show the
AVR peripherals and I/O interfacing to real-world
devices such as LCDs, motors, and sensors.
The AVR Microcontroller and Embedded Systems is the
latest volume in the series of textbooks by Mazidi et al.
This series of texts is widely used around the world by
both industry and academics and has been translated
into many languages. The other titles in the series are:
The x86 PC (5th ed.)
The 8051 Microcontroller and Embedded Systems
(2nd ed.)
The PIC Microcontroller and Embedded Systems
The HCS12 Microcontroller and Embedded Systems
Titles to come include:
The ARM Microcontroller and Embedded Systems
CHAPTERS
O: Introduction to Computing
1: The AVR Microcontroller: History and
Features
2: AVR Architecture and Assembly Language
Programming
3: Branch, Call, and Time Delay Loop
4: AVR I/O Port Programming
5: Arithmetic, Logic Instructions,
and Programs
6: AVR Advanced Assembly Language
Programming
7: AVR Programming in C
8: AVR Hardware Connection, Hex File, and
Flash Loaders
9: AVR Timer Programming in Assembly and C
10: AVR Interrupt Programming in Assembly
and C
11: AVR Serial Port Programming in Assembly
and C
12: LCD and Keyboard Interfacing
13:
ADC, DAC, and Sensor Interfacing
14:
Relay, Optoisolator, and Stepper Motor
Interfacing with AVR
15:
16:
Input Capture and Wave Generation in AVR
PWM Programming and DC Motor
Control in AVR
17:
SPI Protocol and MAX7221 Display
Interfacing
18:
12C Protocol and DS1307 RTC Interfacing
-ISBN-13: 978-0-13-800331-9
ISBN-10:
0-13-800331-9
90000
Prentice Hall
is an imprint of
PEARSON
9
780138003319
www.pearsonhighered.com



<!-- Page 3 -->
### [PDF Page 3]

THE AVR MICROCONTROLLER

```assembly
AND EMBEDDED SYSTEMS
```

Using Assembly and C
Muhammad Ali Mazidi
Sarmad Naimi
Sepehr Naimi
Prentice Hall
Boston Columbus Indianapolis New York San Francisco Upper Saddle River
Amsterdam Cape Town Dubai London Madrid Milan Munich Paris Montreal Toronto
Delhi Mexico City Sao Paulo Sydney Hong Kong Seoul Singapore Taipei Tokyo



<!-- Page 4 -->
### [PDF Page 4]

Editor in Chief: Vernon Anthony
Acquisitions Editor: Wyatt Morris
Editorial Assistant: Chris Reed
Director of Marketing: David Gesell
Marketing Manager: Kara Clark
Senior Managing Coordinator: Alicia
Wozniak
Marketing Assistant: Les Roberts
Senior Managing Editor: JoEllen Gohr
Project Manager: Rex Davidson
Senior Operations Supervisor: Pat Tonneman
Operations Specialist: Laura Weaver
Art Director: Dianne Ernsberger
Cover Designer: Jeff Vanik
Cover Art: Antonis Papantoniou, Fotolia.com
Printer/Binder: Courier/Kendallville
Cover Printer: Demand Production Center
Text Font: Times Roman
Copyright © 2011 Pearson Education, Inc., publishing as Prentice Hall, 1 Lake Street, Upper Saddle
River, New Jersey, 07458. All rights reserved. Manufactured in the United States of America. This
publication is protected by Copyright, and permission should be obtained from the publisher prior to
any prohibited reproduction, storage in a retrieval system, or transmission in any form or by any
means, electronic, mechanical, photocopying, recording, or likewise. To obtain permission(s) to use
material from this work, please submit a written request to Pearson Education, Inc., Permissions
Department, 1 Lake Street, Upper Saddle River, New Jersey, 07458.
Library of Congress Cataloging in Publication Data
Mazidi, Muhammad Ali.
The AVR microcontroller and embedded systems: using Assembly and C/
Muhammad Ali Mazidi, Sarmad Naimi, Sepehr Naimi.
p.cm.
ISBN-13: 978-0-13-800331-9 (alk. paper)
ISBN-10: 0-13-800331-9 (alk. paper)
1. Atmel AVR microcontroller. 2. Embedded computer systems. 3. Assembler language
(Computer program language) 4. C (Computer program language) I. Naimi, Sarmad. II. Naimi,
Sepehr. III. Title.
TJ223.P76M378136 2009
004.16--dc22
2009039790
10987654321
Prentice Hall
is an imprint of
PEARSON
www.pearsonhighered.com
ISBN 10: 0-13-800331-9
ISBN 13: 978-0-13-800331-9
il



<!-- Page 5 -->
### [PDF Page 5]

This book is dedicated
to the memory of Dr. Kamal Bakhtavar
for all his sacrifices.
- Muhammad Ali Mazidi
This book is dedicated
to the memory of Dr. P. Javid
for his inspiring example of dedication to the education of young people.
- Sarmad Naimi
This book is dedicated to
Yaran.
- Sepehr Naimi
iii



<!-- Page 6 -->
### [PDF Page 6]

Regard man as a mine rich in gems of
inestimable value. Education can, alone, cause it
to reveal its treasures, and enable mankind to
benefit therefrom.
Baha'u'llah
iv



<!-- Page 7 -->
### [PDF Page 7]

BRIEF CONTENTS
CHAPTERS
in
ö
7:
Introduction to Computing
The AVR Microcontroller: History and Features
AVR Architecture and Assembly Language Programming
Branch, Call, and Time Delay Loop
18:
Arithmetic, Logic Instructions, and Programs
AVR Advanced Assembly Language Programming
AVR Hardware Connection, Hex File, and Flash Loaders
AVR Timer Programming in Assembly and C
AVR Interrupt Programming in Assembly and C
AVR Serial Port Programming in Assembly and C
LCD and Keyboard Interfacing
ADC, DAC, and Sensor Interfacing
Relay, Optoisolator, and Stepper Motor Interfacing with AVR
Input Capture and Wave Generation in AVR
PWM Programming and DC Motor Control in AVR
SPI Protocol and MAX7221 Display Interfacing
12C Protocol and DS1307 RTC Interfacing
APPENDICES
AVR Instructions Explained
Basics of Wire Wrapping
IC Interfacing and System Design Issues
D: Flowcharts and Pseudocode
AVR Primer for 8051 Programmers
ASCIl Codes
Assemblers, Development Resources, and Suppliers
Data Sheets
1
55
107
139
161
197
255
289
311
363
395
429
463
491
509
549
603
629
695
733
737
755
761
762
764
766



<!-- Page 8 -->
### [PDF Page 8]

CONTENTS
CHAPTER 0: INTRODUCTION TO COMPUTING

## SECTION 0.1: NUMBERING AND CODING SYSTEMS


## SECTION 0.2: DIGITAL PRIMER


## SECTION 0.3: SEMICONDUCTOR MEMORY


## SECTION 0.4: CPU ARCHITECTURE

1
2
9
13
29
CHAPTER 1: THE AVR MICROCONTROLLER: HISTORY AND
FEATURES
39

## SECTION 1.1: MICROCONTROLLERS AND EMBEDDED

PROCESSORS

## SECTION 1.2: OVERVIEW OF THE AVR FAMILY

40
44
CHAPTER 2: AVR ARCHITECTURE AND ASSEMBLY LANGUAGE
PROGRAMMING

## SECTION 2.1: THE GENERAL PURPOSE REGISTERS IN THE AVR

55
56

## SECTION 2.2: THE AVR DATA MEMORY


## SECTION 2.3: USING INSTRUCTIONS WITH THE DATA MEMORY


## SECTION 2.4: AVR STATUS REGISTER


## SECTION 2.5: AVR DATA FORMAT AND DIRECTIVES


## SECTION 2.6: INTRODUCTION TO AVR ASSEMBLY PROGRAMMING 80


## SECTION 2.7: ASSEMBLING AN AVR PROGRAM

61
71
75
82

## SECTION 2.8: THE PROGRAM COUNTER AND PROGRAM ROM

SPACE IN THE AVR

## SECTION 2.9: RISC ARCHITECTURE IN THE AVR

85
93

## SECTION 2.10: VIEWING REGISTERS AND MEMORY WITH AVR

STUDIO IDE
97
CHAPTER 3: BRANCH, CALL, AND TIME DELAY LOOP
107

## SECTION 3.1: BRANCH INSTRUCTIONS AND LOOPING

108

## SECTION 3.2: CALL INSTRUCTIONS AND STACK

118

## SECTION 3.3: AVR TIME DELAY AND INSTRUCTION PIPELINE

128
CHAPTER 4: AVR I/O PORT PROGRAMMING

## SECTION 4.1: I/O PORT PROGRAMMING IN AVR

139
140

## SECTION 4.2: V/O BIT MANIPULATION PROGRAMMING

149
CHAPTER 5: ARITHMETIC, LOGIC INSTRUCTIONS, AND PROGRAMS 161

## SECTION 5.1: ARITHMETIC INSTRUCTIONS

162

## SECTION 5.2: SIGNED NUMBER CONCEPTS AND ARITHMETIC

OPERATIONS

## SECTION 5.3: LOGIC AND COMPARE INSTRUCTIONS

170
176

## SECTION 5.4: ROTATE AND SHIFT INSTRUCTIONS AND DATA

SERIALIZATION

## SECTION 5.5: BCD AND ASCII CONVERSION

183
190
CHAPTER 6: AVR ADVANCED ASSEMBLY LANGUAGE PROGRAMMING 197

## SECTION 6.1: INTRODUCING SOME MORE ASSEMBLER

DIRECTIVES

## SECTION 6.2: REGISTER AND DIRECT ADDRESSING MODES


## SECTION 6.3: REGISTER INDIRECT ADDRESSING MODE

198
202
208
vi



<!-- Page 9 -->
### [PDF Page 9]


## SECTION 6.4: LOOK-UP TABLE AND TABLE PROCESSING


## SECTION 6.5: BIT-ADDRESSABILITY


## SECTION 6.6: ACCESSING EEPROM IN AVR


## SECTION 6.7: CHECKSUM AND ASCII SUBROUTINES


## SECTION 6.8: MACROS

CHAPTER 7: AVR PROGRAMMING IN C

## SECTION 7.1: DATA TYPES AND TIME DELAYS IN C


## SECTION 7.2: I/O PROGRAMMING IN C


## SECTION 7.3: LOGIC OPERATIONS IN C


## SECTION 7.4: DATA CONVERSION PROGRAMS IN C


## SECTION 7.5: DATA SERIALIZATION IN C


## SECTION 7.6: MEMORY ALLOCATION IN C

CHAPTER 8: AVR HARDWARE CONNECTION, HEX FILE, AND
FLASH LOADERS

## SECTION 8.1: ATMEGA32 PIN CONNECTION


## SECTION 8.2: AVR FUSE BITS


## SECTION 8.3: EXPLAINING THE HEX FILE FOR AVR


## SECTION 8.4: AVR PROGRAMMING AND TRAINER BOARD

CHAPTER 9: AVR TIMER PROGRAMMING IN ASSEMBLY AND C

## SECTION 9.1: PROGRAMMING TIMERS 0, 1, AND 2


## SECTION 9.2: COUNTER PROGRAMMING


## SECTION 9.3: PROGRAMMING TIMERS IN C

CHAPTER 10: AVR INTERRUPT PROGRAMMING IN ASSEMBLY

```assembly
AND C
```


## SECTION 10.1: AVR INTERRUPTS


## SECTION 10.2: PROGRAMMING TIMER INTERRUPTS


## SECTION 10.3: PROGRAMMING EXTERNAL HARDWARE

INTERRUPTS

## SECTION 10.4: INTERRUPT PRIORITY IN THE AVR


## SECTION 10.5: INTERRUPT PROGRAMMING IN C

CHAPTER 11: AVR SERIAL PORT PROGRAMMING IN ASSEMBLY
216
226
233
238
244
255
256
263
265
275
280
282
289
290
294
300
305
311
313
348
353
363
364
369
376
381
385

```assembly
AND C
```

395

## SECTION 11.1: BASICS OF SERIAL COMMUNICATION

396

## SECTION 11.2: ATMEGA32 CONNECTION TO RS232

403

## SECTION 11.3: AVR SERIAL PORT PROGRAMMING IN ASSEMBLY

405

## SECTION 11.4: AVR SERIAL PORT PROGRAMMING IN C

419

## SECTION 11.5: AVR SERIAL PORT PROGRAMMING IN ASSEMBLY


```assembly
AND C USING INTERRUPTS
```

422
CHAPTER 12: LCD AND KEYBOARD INTERFACING

## SECTION 12.1: LCD INTERFACING


## SECTION 12.2: KEYBOARD INTERFACING

429
430
452
CHAPTER 13: ADC, DAC, AND SENSOR INTERFACING

## SECTION 13.1: ADC CHARACTERISTICS


## SECTION 13.2: ADC PROGRAMMING IN THE AVR

463
464
469
vii



<!-- Page 10 -->
### [PDF Page 10]


## SECTION 13.3: SENSOR INTERFACING AND SIGNAL'

CONDITIONING

## SECTION 13.4: DAC INTERFACING

480
484
CHAPTER 14: RELAY, OPTOISOLATOR, AND STEPPER MOTOR
INTERFACING WITH AVR

## SECTION 14.1: RELAYS AND OPTOISOLATORS


## SECTION 14.2: STEPPER MOTOR INTERFACING

491
492
498
CHAPTER 15: INPUT CAPTURE AND WAVE GENERATION IN AVR

## SECTION 15.1: WAVE GENERATION USING 8-BIT TIMERS


## SECTION 15.2: WAVE GENERATION USING TIMERI


## SECTION 15.3: INPUT CAPTURE PROGRAMMING


## SECTION 15.4: C PROGRAMMING

509
510
520
531
539
CHAPTER 16: PWM PROGRAMMING AND DC MOTOR CONTROL
IN AVR

## SECTION 16.1: DC MOTOR INTERFACING AND PWM


## SECTION 16.2: PWM MODES IN 8-BIT TIMERS


## SECTION 16.3: PWM MODES IN TIMERI


## SECTION 16.4: DC MOTOR CONTROL USING PWM

549
550
560
574
597
CHAPTER 17: SPI PROTOCOL AND MAX7221 DISPLAY INTERFACING 603

## SECTION 17.1: SPI BUS PROTOCOL


## SECTION 17.2: SPI PROGRAMMING IN AVR


## SECTION 17.3: MAX7221 INTERFACING AND PROGRAMMING

604
609
615
CHAPTER 18: 12C PROTOCOL AND DS1307 RTC INTERFACING

## SECTION 18.1: I2C BUS PROTOCOL


## SECTION 18.2: 1 WI (12C) IN THE AVR


## SECTION 18.3: AVR TWI PROGRAMMING IN ASSEMBLY AND C


## SECTION 18.4: DS1307 RTC INTERFACING AND PROGRAMMING


## SECTION 18.5: TWI PROGRAMMING WITH CHECKING STATUS

REGISTER
629
630
638
642
654
668
APPENDIX A: AVR INSTRUCTIONS EXPLAINED
SECTION A.I: INSTRUCTION SUMMARY
SECTION A.2: AVR INSTRUCTIONS FORMAT
SECTION A.3: AVR REGISTER SUMMARY
695
696
700
732
APPENDIX B: BASICS OF WIRE WRAPPING
733
APPENDIX C: IC INTERFACING AND SYSTEM DESIGN ISSUES
SECTION C.1: OVERVIEW OF IC TECHNOLOGY
SECTION C.2: AVR I/O PORT STRUCTURE AND INTERFACING
SECTION C.3: SYSTEM DESIGN ISSUES
737
738
744
750
APPENDIX D: FLOWCHARTS AND PSEUDOCODE
755
APPENDIX E: AVR PRIMER FOR 8051 PROGRAMMERS
761
vili



<!-- Page 11 -->
### [PDF Page 11]

APPENDIX F: ASCII CODES
APPENDIX G: ASSEMBLERS, DEVELOPMENT RESOURCES, AND
SUPPLIERS
APPENDIX H: DATA SHEETS
INDEX
762
764
766
771
ix



<!-- Page 12 -->
### [PDF Page 12]

PREFACE
Products using microprocessors generally fall into two categories. The first
category uses high-performance microprocessors such as the Pentium in applications
where system performance is critical. We have an entire book dedicated to this topic,
The x86 PC: Assembly Language, Design, and Interfacing, published by Prentice
Hall. In the second category of applications, performance is secondary; issues of
cost, space, power, and rapid development are more critical than raw processing
power. The microprocessor for this category is often called a microcontroller.
This book is for the second category of applications. The AVR is a wide-
ly used microcontroller. This book is intended for use in college-level courses
teaching microcontrollers and embedded systems. It not only establishes a foun-
dation of Assembly language programming, but also provides a comprehensive
treatment of AVR interfacing for engineering students. From this background, the
design and interfacing of microcontroller-based embedded systems can be
explored. This book can also be used by practicing technicians, hardware engi-
neers, computer scientists, and hobbyists.
Prerequisites
Readers should have had an introductory digital course. Knowledge of
Assembly language would be helpful, but is not necessary. Although this book is
written for those with no background in Assembly language programming, stu-
dents with prior Assembly language experience will be able to gain a mastery of
AVR architecture very rapidly and start on their projects right away. For the AVR
C programming sections of the book, a basic knowledge of C programming is
required. We use the AVR Studio compiler IDE from Atmel throughout the book.
The AVR Studio compiler is available for free from the Atmel website
(www.atmel.com). We encourage you to use the AVR Studio or some other IDE
to simulate and run the programs in this book.
Overview
A systematic, step-by-step approach is used to cover various aspects of
AVR C and Assembly language programming and interfacing. Many examples and
sample programs are given to clarify the concepts and provide students with an
opportunity to learn by doing. Review questions are provided at the end of each
section to reinforce the main points of the section.
Chapter 0 covers number systems (binary, decimal, and hex), and provides
an introduction to basic logic gates and computer memory. This chapter is
designed especially for students, such as mechanical engineering students, who
have not taken a digital logic course or those who need to refresh their memory on
these topics.
Chapter 1 discusses the history of the AVR and features of the members
such as ATmega32. It also provides a list of various members of the AVR family.
Chapter 2 discusses the internal architecture of the AVR and explains the
use of a AVR assembler to create ready-to-run programs. It also explores the pro-
gram counter and the flag register.
In Chapter 3 the topics of loop, jump, and call instructions are discussed,



<!-- Page 13 -->
### [PDF Page 13]

with many programming examples.
Chapter 4 is dedicated to the discussion of 1/O ports. This allows students
who are working on a project to start experimenting with AVR I/O interfacing and
start the hardware project as soon as possible.
Chapter 5 is dedicated to arithmetic, logic instructions, and programs.
Chapter 6 covers the AVR advanced addressing modes and explains how
to access the data stored in the look-up table, as well as how to use EEPROM to
store data and how to do macros.
The C programming of the AVR is covered in Chapter 7. We use the
WinAVR compiler for this and throughout the book. The WinAVR is available for
free from the winavr.sourceforge.net website.
In Chapter 8 we discuss the hardware connection of the AVR chip.
Chapter 9 describes the AVR timers and how to use them as event counters.
Chapter 10 provides a detailed discussion of AVR interrupts with many
examples on how to write interrupt handler programs.
Chapter 11 is dedicated to serial data communication of the AVR and its
interfacing to the RS232. It also shows AVR communication with COM ports of
the x86 IBM PC and compatible computers.
Chapter 12 shows AVR interfacing with real-world devices such as LCDs
and keyboards.
Chapter 13 shows AVR interfacing with real-world devices such as DAC
chips, ADC chips, and sensors.
Chapter 14 covers the basic interfacing of the AVR chip to relays, optoiso-
lators, and stepper motors.
In Chapter 15 we cover how to use AVR timers to generate waves and
explain how to capture waves to measure period and duty cycle.
Chapter 16 shows PWM and basic interfacing to DC motors.
Chapter 17 covers the SPI bus protocol and describes how to interface
7-segment displays using MAX7221.
Finally, Chapter 18 shows how to connect and program the DS1307 real-
time clock chip using the TWI (I2C) bus protocol.
The appendices have been designed to provide all reference material
required for the topics covered in the book. Appendix A describes each AVR
instruction in detail, with examples. Appendix A also provides the clock count for
instructions and AVR I/O registers. Appendix B describes the basics of wire wrap-
ping. Appendix C examines IC interfacing and logic families, as well as AVR I/0
port interfacing and fan-out. Make sure you study this section before connecting
the AVR to an external device. In Appendix D, the use of flowcharts and
pseudocode is explored. Appendix E is for students familiar with 8051 architec-
tures who need to make a rapid transition to AVR architecture. Appendix F pro-
vides the table of ASCII characters. Appendix G lists resources for assembler
shareware, AVR trainers, and electronics parts. Appendix H contains data sheets
for the AVR chip.
Lab Manual
The lab manual covers some very basic labs and can be found at the
www.MicroDigitalEd.com website. The more advanced and rigorous lab assign-
xi



<!-- Page 14 -->
### [PDF Page 14]

ments are left up to the instructors depending on the course objectives, class level,
and whether the course is graduate or undergraduate. The support materials for this
text and other books by the authors can be found on this website, too.
Solutions Manual/PowerPoint® Slides
The end-of-chapter problems cover some very basic concepts. The more
challenging and rigorous homework assignments are left up to the instructors
depending on the course objectives, class level, and whether the course is gradu-
ate or undergraduate. The solutions manual and PowerPoint® slides for the draw-
ings are available online for instructors only.
Online Instructor Resources
To access supplementary materials online, instructors need to request an
instructor access code. Go to www.prenhall.com, click the Instructor Resource
Center link, and then click Register Today for an instructor access code. Within
48 hours after registering you will receive a confirming e-mail including an
instructor access code. Once you have received your code, go to the site and log
on for full instructions on downloading the materials you wish to use.
Acknowledgments
This book is the result of the dedication and encouragement of many indi-
viduals. Our sincere and heartfelt appreciation goes to all of them.
Thanks to the reviewers of this edition:
Orod Haghighi Ara, BIHE University;
Arona Kosari, BIHE University;
Anahita Omidvar, BIHE University;
Vahid Mokhtari, BIHE University;
Farshid Hoori, BIHE University;
Navid HajatDoost, BIHE University;
Hootan Rahmanian, BIHE University;
Farzad Sabeti, BIHE University;
Moshtagh Samandari, BIHE University.
Numerous students found errors or made suggestions in improving this
book. We would like to thank all of them for their enthusiasm and support. Those
students are: Arash Noori, Soroush Taefi, Golriz Nourani, Mozhdeh Amiri, Negar
Ziaee Nasrabadi, and Maryam NouhNezhad, all from the computer engineering
department of BIHE.
Finally, we would like to thank the people at Prentice Hall, in particular our
editor, Wyatt Morris, who continues to support and encourage our writing, and our
project manager, Rex Davidson, who made the book a reality. We were lucky to
get the best copy editors in the world, Janice Mazidi and Bret Workman. Thank
you both for your fantastic job, as usual.
We enjoyed writing this book, and hope you enjoy reading it and using it
for your courses and projects. Please let us know if you have any suggestions or
find any errors.
xii



<!-- Page 15 -->
### [PDF Page 15]

Assemblers/Compilers
The AVR Studio can be downloaded from the following website:
http://www.Atmel.com
The WinAVR C compiler for AVR can be downloaded from the following
website:
http://winavr.sourceforge.net
The tutorials for all the above assemblers/compilers and AVR Trainer
boards can be found on the following website:
http://www.MicroDigitalEd.com
Trademark Information and Acknowledgments
All the figures, tables, and instructions related to the AVR family of microcontrollers
used in this textbook belong to Atmel Corporation. Copyright of Atmel Corporation,
Inc. 2009, used by permission.
Instruction mnemonics listed in Appendix A are from Atmel Corporation. Copyright of
Atmel Corporation, Inc. 2009, used by permission.
The AVR data sheets listed in Appendix H are from Atmel Semiconductor. Copyright of
Atmel Semiconductor, Inc. 2009, used by permission.
Xili



<!-- Page 16 -->
### [PDF Page 16]

ABOUT THE AUTHORS
Muhammad Ali Mazidi went to Tabriz University and holds Master's
degrees from both Southern Methodist University and the University of Texas at
Dallas. He is currently a.b.d. on his Ph.D. in the Electrical Engineering
Department of Southern Methodist University. He is co-author of some widely
used textbooks, including The x86 PC, The 8051 Microcontroller and Embedded
Systems, The PIC Microcontroller and Embedded Systems, and The HCS12
Microcontroller and Embedded Systems, also available from Prentice Hall. He
teaches microprocessor-based system design at DeVry University in Dallas, Texas.
He is the founder of MicroDigitalEd.com.
Sarmad Naimi graduated from the Computer Engineering department of
BIHE university and is currently working on his Master's degree. His areas of
interest include FPGA, RTOS, and real-time embedded systems.
Sepehr Naimi graduated from the Computer Engineering department of
BIHE university and is currently working on his Master's degree. His areas of
interest include high-performance microcontrollers, RTOS, and real-time embed-
ded systems.
The authors can be contacted at the following e-mail addresses if you have
any comments or suggestions, or if you find any errors.
mdebooks@yahoo.com
mmazidi@microdigitaled.com
SarmadNaimi@gmail.com
Sepehr.Naimi@gmail.com
xiv


