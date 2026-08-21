# Lecture 4
## Complete Single-File AI-Research Document

> **Source File**: Lecture 4.pdf  
> **Total Pages/Slides**: 31 pages  
> **Format**: Single-File Bundle with Zero-Drift Page Markers, Syntax Highlighting, 300 DPI Cropped Figures, and Deep Domain Walkthrough Descriptions

---


<!-- Page 1 -->
### [PDF Page 1]

Lecture 4





<!-- Page 2 -->
### [PDF Page 2]

System development tool


> **Transcribed Media / Table Text**:
> - In Editor we write programs for Microcontroller.
> - Programs may be written in Assembly Language or Higher Level
> Language (C Language).
> - By writing program we generate source file.


> **Transcribed Media / Table Text**:
> Editor
> Higher Level
> Language
> (Program)
> Assembly
> Language
> (Program)
> Source
> File
> Source
> File



![Figure [Page 2 Media 1]](images/fig_002_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 2 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [• In Editor we write programs for Microcontroller.; • Programs may be written in Assembly Language or Higher Level; Language (C Language).; • By writing program we generate source file.].

> **Figure [Page 2 Media 1]**


![Figure [Page 2 Media 2]](images/fig_002_media_2.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 2 Media 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [Editor; Higher Level; Language; (Program); Assembly; Language; (Program); Source].

> **Figure [Page 2 Media 2]**




<!-- Page 3 -->
### [PDF Page 3]

System development tool


> **Transcribed Media / Table Text**:
> Editor
> Higher Level
> Language
> (Program)
> Assembly
> Language
> (Program)
> Source
> File
> Source
> File
> Compiler / Assembler
> Object
> File
> Complier
> Object
> File
> Assembler


> **Transcribed Media / Table Text**:
> Assembler: It is used to convert Assembly language into
> machine code or object file. It also shows errors if any syntax
> error is there in program.
> Complier: It is used to convert Higher Level language into
> machine code or object file. It also shows errors if any syntax
> error is there in program. It also gives warnings if it is there
> with programs.



![Figure [Page 3 Media 1]](images/fig_003_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 3 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [Editor; Higher Level; Language; (Program); Assembly; Language; (Program); Source].

> **Figure [Page 3 Media 1]**


![Figure [Page 3 Media 2]](images/fig_003_media_2.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 3 Media 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [Assembler: It is used to convert Assembly language into; machine code or object file. It also shows errors if any syntax; error is there in program.; Complier: It is used to convert Higher Level language into; machine code or object file. It also shows errors if any syntax; error is there in program. It also gives warnings if it is there; with programs.].

> **Figure [Page 3 Media 2]**




<!-- Page 4 -->
### [PDF Page 4]

System development tool


> **Transcribed Media / Table Text**:
> Editor
> Higher Level
> Language
> (Program)
> Assembly
> Language
> (Program)
> Source
> File
> Source
> File
> Compiler / Assembler
> Object
> File
> - 
> Complier
> Object
> File
> Assembler
> L
> I
> N
> Executable File
> E
> R
> Library
> Loader
> - Memory


> **Transcribed Media / Table Text**:
> - Linker: It is linking all the object files of compiler
> and assembler with the use of library.
> - It will generate executable files.
> - Loader: It is used to load executable files into the
> memory of microcontroller.
> - Once program
> is loaded into
> microcontroller can
> execute
> it
> memory,
> as per the
> requirement of USER.



![Figure [Page 4 Media 1]](images/fig_004_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 4 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [Editor; Higher Level; Language; (Program); Assembly; Language; (Program); Source].

> **Figure [Page 4 Media 1]**


![Figure [Page 4 Media 2]](images/fig_004_media_2.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 4 Media 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [• Linker: It is linking all the object files of compiler; and assembler with the use of library.; • It will generate executable files.; • Loader: It is used to load executable files into the; memory of microcontroller.; • Once program; is loaded into; microcontroller can].

> **Figure [Page 4 Media 2]**




<!-- Page 5 -->
### [PDF Page 5]

Data Types


> **Transcribed Media / Table Text**:
> - Data Types of 8051 microcontroller
> - 8051 Microcontroller supports Binary, Decimal and Hexadecimal
> data formats.
> Example:
> MOVA,#00110110B ; A - 00110110, Binary 00110110 is loaded
> in A which is equivalent of 36H.
> MOV A,#15
> ; A - 15, Decimal 15 is loaded in A which is
> equivalent of OFH.
> MOV A,#15H
> ; A - 15H, Hexadecimal 15H is loaded in A.



![Figure [Page 5 Media 1]](images/fig_005_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 5 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [• Data Types of 8051 microcontroller; • 8051 Microcontroller supports Binary, Decimal and Hexadecimal; data formats.; Example:; MOVA,#00110110B ; A - 00110110, Binary 00110110 is loaded; in A which is equivalent of 36H.; MOV A,#15; ; A - 15, Decimal 15 is loaded in A which is].

> **Figure [Page 5 Media 1]**




<!-- Page 6 -->
### [PDF Page 6]

Assembler Directives


> **Transcribed Media / Table Text**:
> - Assembler Directives of 8051 microcontroller
> Assembler directives are also referred as pseudo Opcodes.
> Assembler directives are not instructions, so they are not
> executed by MPU, it is used to give directions to assembler.


> **Transcribed Media / Table Text**:
> - ORG (Origin}
> ORG 1000H
> - ORG directives is used indicate beginning address.
> - After writing ORG 1000H, program or data will be stored at
> 1000H memory location.
> - Some assembler may use .ORG, so you need check that as well.
> - If you don't write H after number then it will consider decimal
> address with ORG.



![Figure [Page 6 Media 1]](images/fig_006_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 6 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [• Assembler Directives of 8051 microcontroller; Assembler directives are also referred as pseudo Opcodes.; Assembler directives are not instructions, so they are not; executed by MPU, it is used to give directions to assembler.].

> **Figure [Page 6 Media 1]**


![Figure [Page 6 Media 2]](images/fig_006_media_2.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 6 Media 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [* ORG (Origin}; ORG 1000H; • ORG directives is used indicate beginning address.; • After writing ORG 1000H, program or data will be stored at; 1000H memory location.; • Some assembler may use .ORG, so you need check that as well.; • If you don't write H after number then it will consider decimal; address with ORG.].

> **Figure [Page 6 Media 2]**




<!-- Page 7 -->
### [PDF Page 7]

Assembler Directives


> **Transcribed Media / Table Text**:
> - END {Terminate)
> - It is used to END source file (asm file).
> - Anything after END directive will be ignored by assembler.
> - EQU {Equate)
> It is used to define constant without occupying a memory
> location.
> - It is used for constant values in program.
> pp EQU 25H
> ;constant with pp label
> MOV R1, #pp
> ;constant loaded in R1



![Figure [Page 7 Media 1]](images/fig_007_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 7 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [* END {Terminate); • It is used to END source file (asm file).; • Anything after END directive will be ignored by assembler.; * EQU {Equate); It is used to define constant without occupying a memory; location.; • It is used for constant values in program.; pp EQU 25H].

> **Figure [Page 7 Media 1]**




<!-- Page 8 -->
### [PDF Page 8]

Assembler Directives


> **Transcribed Media / Table Text**:
> - DB {Define Byte}
> - 
> It is used to define byte data.
> - Here, 8 bits (Byte) number can be decimal, Hexadecimal, Binary
> or ASCIl number.
> ORG 1000H
> datal:
> data2:
> data3:
> data4:
> data5:
> DB 25
> DB 25H
> DB 00110011B
> DB 'A'
> DB "EF"
> ;data 1 is defined by 25 decimal no.
> ;data 2 is defined by 25H Hex no.
> ;data 3 is defined by 33H binary no.
> ;data 4 is defined by ASCIl of A.
> ;data 5 is defined by string of ASCII.



![Figure [Page 8 Media 1]](images/fig_008_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 8 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [* DB {Define Byte}; •; It is used to define byte data.; • Here, 8 bits (Byte) number can be decimal, Hexadecimal, Binary; or ASCIl number.; ORG 1000H; datal:; data2:].

> **Figure [Page 8 Media 1]**




<!-- Page 9 -->
### [PDF Page 9]

Addressing Mode


> **Transcribed Media / Table Text**:
> 0
> 0
> Addressing mode: The Various formats of specifying the
> operands are called addressing modes.
> Immediate Addressing Mode
> In this Addressing mode, data (1byte/2bytes) specified in
> instruction itself.
> Data is specified by '#' symbol before data in the instruction.
> Example:
> MOV A,#15H
> MOV DPTR,#1000H
> ; A -- 15H
> ; DPTR - 1000H



![Figure [Page 9 Media 1]](images/fig_009_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 9 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [0; 0; Addressing mode: The Various formats of specifying the; operands are called addressing modes.; Immediate Addressing Mode; In this Addressing mode, data (1byte/2bytes) specified in; instruction itself.; Data is specified by '#' symbol before data in the instruction.].

> **Figure [Page 9 Media 1]**




<!-- Page 10 -->
### [PDF Page 10]

Addressing Mode


> **Transcribed Media / Table Text**:
> - 
> - 
> Register Addressing Mode
> In this Addressing mode, data is specified by registers in
> instruction.
> The permitted registers are A, R7, R6, .., RO.
> Example:
> MOV A,R2
> MOV R2,A
> MOV R1,R2
> ; A - R2
> : R2 - A
> ; Not Allowed with 8051,



![Figure [Page 10 Media 1]](images/fig_010_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 10 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [•; •; Register Addressing Mode; In this Addressing mode, data is specified by registers in; instruction.; The permitted registers are A, R7, R6, .., RO.; Example:; MOV A,R2].

> **Figure [Page 10 Media 1]**




<!-- Page 11 -->
### [PDF Page 11]

Addressing Mode


> **Transcribed Media / Table Text**:
> 0
> - 
> Direct Addressing Mode
> In this Addressing mode, address of operand is given in
> instruction.
> Only Internal RAM and SFR address are allowed.
> Example:
> MOV A,35H
> MOV A,80H
> MOV 30H, 35H
> ; A - [35H)
> ; A + [80H], Content of port 0 is [80H]
> ; [30H] - [35H]



![Figure [Page 11 Media 1]](images/fig_011_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 11 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [0; •; Direct Addressing Mode; In this Addressing mode, address of operand is given in; instruction.; Only Internal RAM and SFR address are allowed.; Example:; MOV A,35H].

> **Figure [Page 11 Media 1]**




<!-- Page 12 -->
### [PDF Page 12]

Addressing Mode


> **Transcribed Media / Table Text**:
> Indirect Addressing Mode
> In this Addressing mode, address of operand will be given by
> register.
> Internal and External RAM can be accessed by this mode.
> - Internal RAM with 8bits of addressing.
> "@" is used here
> MOV A,@R1
> ; A - (R1)
> MOV @R2,A
> : [R2] - A
> - External RAM with 16bits of addressing by DPTR, "X" is used here
> MOVX A,@DPTR
> ; A - (DPTR]
> MOVX @DPTR,A
> ; DPTR + A
> - External RAM with 8bits of addressing by R0 or R1
> MOVX A,@R1
> ; A - [R1], If R1 is 25H then
> 81= 0025H
> MOVX @RO,A
> ; (RO] - A, If RO is 35H then
> [RO] = (0035H]



![Figure [Page 12 Media 1]](images/fig_012_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 12 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [Indirect Addressing Mode; In this Addressing mode, address of operand will be given by; register.; Internal and External RAM can be accessed by this mode.; • Internal RAM with 8bits of addressing.; "@" is used here; MOV A,@R1; ; A - (R1)].

> **Figure [Page 12 Media 1]**




<!-- Page 13 -->
### [PDF Page 13]

Addressing Mode


> **Transcribed Media / Table Text**:
> - 
> - 
> Indexed Addressing Mode
> This addressing mode is used to access data from code memory
> (Internal ROM or External ROM).
> In instruction, we use 'C' to operate with Indexed Addressing
> mode.
> Example:
> MOVC A,@A+DPTR
> MOVC A,@A+PC
> ; A - [A+DPTR]
> ; A - [A+PC]



![Figure [Page 13 Media 1]](images/fig_013_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 13 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [•; •; Indexed Addressing Mode; This addressing mode is used to access data from code memory; (Internal ROM or External ROM).; In instruction, we use 'C' to operate with Indexed Addressing; mode.; Example:].

> **Figure [Page 13 Media 1]**




<!-- Page 14 -->
### [PDF Page 14]

/ Addition instructions
- ADD - It will Add Accumulator data with 8 bits & stores result
into A.
ADD A, #50H
; A + A + 50H
ADD A, R1
; A + A + R1
ADD A, 17H
; A + A + [17H]
ADD A, @R1
; A - A + [R1]
ADDC - It will Add Accumulator data with 8 bits along with
Carry & stores result into A.
ADDC A, #50H
ADDC A, R1
ADDC A, 17H
ADDC A, @R1
; A + A + 50H + Carry
; A + A + R1 + Carry
; A + A + [17H] + Carry
; A ~ A + [R1] + Carry


> **Transcribed Media / Table Text**:
> V Addition instructions
> ADD - It will Add Accumulator data with 8 bits & stores result
> into A.
> ADD A, #S0H
> ; A - A + 50H
> ADD A, R1
> ; A - A + R1
> ADD A, 17H
> ; A + A + (17H)
> ADD A, @R1
> ; A - A + [R1]
> - ADDC - It will Add Accumulator data with 8 bits along with
> Carry & stores result into A.
> ADDC A, #50H
> ADDC A, R1
> ADDC A, 17H
> ADDC A, @R1
> ; A - A + 50H + Carry
> ; A + A + R1 + Carry
> ; A + A + [17H] + Carry
> ; A - A + [R1] + Carry



![Figure [Page 14 Media 1]](images/fig_014_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 14 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [V Addition instructions; ADD - It will Add Accumulator data with 8 bits & stores result; into A.; ADD A, #S0H; ; A - A + 50H; ADD A, R1; ; A - A + R1; ADD A, 17H].

> **Figure [Page 14 Media 1]**




<!-- Page 15 -->
### [PDF Page 15]

/ Subtraction instructions
- SUBB - It will Sub Accumulator data with 8 bits along with
Carry & stores result into A.
SUBA, #50
SUBB A, RI
SUBBA, 17H
SUBB A, @R1
; A + A - 50H - Carry
; A + A - R1 - Carry
; A - A - [17H] - Carry
; A + A - [R1] - Carry
V Increment instructions
- INC - It will increment Register, Pointer or data of memory
locations.
INCA ;A - A +1
INC R1 ; R1- R1+1
INC 25H ; [25H] - [25H] + 1
INC @R1 ; [1] - [R1] + 1
INC DPTR; DPTR - DPTR + 1
/ Decrement instructions
0
DEC - It will decrement Register, Pointer or data of memory
locations.
DEC A : A - A - 1
DEC R1 ; R1 - R1 - 1
DEC 25H : 25H] - [25H] - 1


> **Transcribed Media / Table Text**:
> V Subtraction instructions
> SUBB - It will Sub Accumulator data with 8 bits along with
> Carry & stores result into A.
> SUBB A, #50H
> SUBB A, R1
> SUBB A, 17H
> SUBB A, @R1
> ; A + A - 50H - Carry
> ; A - A - R1 - Carry
> ; A - A - (17H] - Carry
> ; A +- A - [R1] - Carry


> **Transcribed Media / Table Text**:
> V Increment instructions
> INC - It will increment Register, Pointer or data of memory
> locations.
> INC A
> ;A-A+1
> INC R1 ; R1- R1 + 1
> INC 25H ; [25H] - [25H] + 1
> INC @R1 ; [R1] ~ [R1] + 1
> INC DPTR; DPTR - DPTR + 1
> - Decrement instructions
> DEC - It will decrement Register, Pointer or data of memory
> locations.
> DEC A ; A - A - 1
> DEC R1 ; R1 - R1 - 1
> DEC 25H ; [25H] ~ [25H] - 1



![Figure [Page 15 Media 1]](images/fig_015_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 15 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [V Subtraction instructions; SUBB - It will Sub Accumulator data with 8 bits along with; Carry & stores result into A.; SUBB A, #50H; SUBB A, R1; SUBB A, 17H; SUBB A, @R1; ; A + A - 50H - Carry].

> **Figure [Page 15 Media 1]**


![Figure [Page 15 Media 2]](images/fig_015_media_2.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 15 Media 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [V Increment instructions; INC - It will increment Register, Pointer or data of memory; locations.; INC A; ;A-A+1; INC R1 ; R1- R1 + 1; INC 25H ; [25H] - [25H] + 1; INC @R1 ; [R1] ~ [R1] + 1].

> **Figure [Page 15 Media 2]**




<!-- Page 16 -->
### [PDF Page 16]

- Multiplication instruction
- MUL AB - It will Multiply A and B and Answer will be stored in
BA where B hold higher Byte and A hold Lower Byte.
MUL AB ; (BHigher Byte ALower Byte) - AX B
- Division instruction
- DIV AB - It will Divide A by B and Answer remainder will be
stored in B & Quotient will be stored in A.
DIV AB ; (B Remainder Aquotient) - A / B
- Decimal Adjustment instruction
- DA A - It will be used after ADD instruction.
- It is used to convert that given Hex addition in BCD addition.
- Normal Addition is done by ADD that is Binary or Hex Addition.
- After when you use DA A, it adjust that addition in BCD form.
- DA A performs following adjustments to show given addition in
BCD addition.
- If Lower Nibble > 9 or Auxiliary Carry is 1 then Add 06H with A
- If Higher Nibble > 9 or Carry is 1 then Add 60H with A
Example:
ADD A, R1
DA A
A = 56H
R1 = 23H
A = 79H
A = 36H
R1 = 29H
A = 5FH
06H
A = 65H
; A - A + R1
; BCD Addition Adjustment
AC = 1
A = 38H
R1 = 29H
A = 61H
06H
A = 67H
A = 60H
R1 = 70H
A = DOH
60H
A = 30H
Carry = 1
11
A = 99H
81= 99H
A = 32H
06H
60H
AL = 98H
Carry = 1


> **Transcribed Media / Table Text**:
> / Multiplication instruction
> - MUL AB - It will Multiply A and B and Answer will be stored in
> BA where B hold higher Byte and A hold Lower Byte.
> MUL AB ; (B Higher Byte ALower Byte) - A X B
> V Division instruction
> - DIV AB - It will Divide A by B and Answer remainder will be
> stored in B & Quotient will be stored in A.
> DIV AB ; (B Remainder Aquotient) - A / B
> / Decimal Adjustment instruction
> - DA A - It will be used after ADD instruction.
> It is used to convert that given Hex addition in BCD addition.
> 0
> - 
> Normal Addition is done by ADD that is Binary or Hex Addition.
> After when you use DA A, it adjust that addition in BCD form.
> DA A performs following adjustments to show given addition in
> BCD addition.
> If Lower Nibble > 9 or Auxiliary Carry is 1 then Add 06H with A
> - If Higher Nibble > 9 or Carry is 1 then Add 60H with A


> **Transcribed Media / Table Text**:
> Example:
> ADD A, R1
> DA A
> A = 56H
> R1 = 23H
> A = 79H
> A = 36H
> R1 = 29H
> A = 5FH
> 06H
> A = 65H
> ; A - A + R1
> ; BCD Addition Adjustment
> AC = 1
> A = 38H
> R1 = 29H
> A = 61H
> 06H
> A = 67H
> A = 60H
> R1 = 70H
> A = DOH
> 60H
> A = 30H
> Carry = 1
> 11
> A = 99H
> R1 = 99H
> A = 32H
> 06H
> 60H
> AL = 98H
> Carry = 1



![Figure [Page 16 Media 1]](images/fig_016_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 16 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [/ Multiplication instruction; • MUL AB - It will Multiply A and B and Answer will be stored in; BA where B hold higher Byte and A hold Lower Byte.; MUL AB ; (B Higher Byte ALower Byte) - A X B; V Division instruction; • DIV AB - It will Divide A by B and Answer remainder will be; stored in B & Quotient will be stored in A.; DIV AB ; (B Remainder Aquotient) - A / B].

> **Figure [Page 16 Media 1]**


![Figure [Page 16 Media 2]](images/fig_016_media_2.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 16 Media 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [Example:; ADD A, R1; DA A; A = 56H; R1 = 23H; A = 79H; A = 36H; R1 = 29H].

> **Figure [Page 16 Media 2]**




<!-- Page 17 -->
### [PDF Page 17]

/ Logic AND instructions
ANL - It will perform logic AND in between two 8 bits numbers.
ANLA, #50H
; A - A AND SOH
ANL A, R1
; A - A AND R1
ANL A, 17H
; A - A AND [17H]
ANL A, @R1
; A - A AND [R1]
ANL 25H, A
; [25H] - [25H] AND A
ANL 25H, #50H
; [25H] - [25H] AND 50H
- Logic OR instructions
ORL - It will perform logic OR in between two 8 bits numbers.
ORL A, #50H
; A + A OR 50H
ORL A, R1
; A - A OR R1
ORL A, 17H
; A - A OR [17H]
ORL A, @R1
; A - A OR [R1]
ORL 25H, A
; [25H] - [25H] OR A
ORL 25H, #50H
; [25H] - (25H] OR 50H


> **Transcribed Media / Table Text**:
> / Logic AND instructions
> - ANL - It will perform logic AND in between two 8 bits numbers.
> ANL A, #50H
> ; A - A AND 50H
> ANL A, R1
> ; A - A AND R1
> ANL A, 17H
> ; A - A AND (17H]
> ANL A, @R1
> ; A - A AND [R1]
> ANL 25H, A
> ; [25H] - [25H] AND A
> ANL 25H, #50H
> ; [25H] - (25H] AND 50H
> - Logic OR instructions
> - ORL - It will perform logic OR in between two 8 bits numbers.
> ORL A, #50H
> ; A - A OR 50H
> ORL A, R1
> ; A - A OR R1
> ORL A, 17H
> ; A - A OR (17H]
> ORL A, @R1
> ; A - A OR [R1)
> ORL 25H, A
> ; [25H] - [25H] OR A
> ORL 25H, #50H
> ; [25H] - [25H] OR 50H



![Figure [Page 17 Media 1]](images/fig_017_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 17 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [/ Logic AND instructions; • ANL - It will perform logic AND in between two 8 bits numbers.; ANL A, #50H; ; A - A AND 50H; ANL A, R1; ; A - A AND R1; ANL A, 17H; ; A - A AND (17H]].

> **Figure [Page 17 Media 1]**




<!-- Page 18 -->
### [PDF Page 18]

~ Logic XOR instructions
- XRL - It will perform logic XOR in between two 8 bits numbers.
XRL A, #50H
; A - A XOR 50H
XRL A, R1
; A ~ A XOR R1
XRL A, 17H
; A - A XOR [17H]
XRL A, @R1
; A - A XOR [R1]
XRL 25H, A
; [25H] - [25H] XOR A
XRL 25H, #50H
; [25H] - [25H] XOR 50H
- Other Logical instructions
- CPL A - It will perform 1's compliment of A, meant NOT
operation of A.
- CLR A - It will Clear Accumulator. So A = 00H after instruction.


> **Transcribed Media / Table Text**:
> - Logic XOR instructions
> XRL - It will perform logic XOR in between two 8 bits numbers.
> XRL A, #50H
> ; A - A XOR 50H
> XRL A, R1
> ; A - A XOR R1
> XRL A, 17H
> ; A - A XOR [17H]
> XRL A, @R1
> ; A - A XOR [R1]
> XRL 25H, A
> ; [25H] - [25H] XOR A
> XRL 25H, #50H
> ; [25H] - [25H] XOR 50H
> - Other Logical instructions
> - CPL A - It will perform 1's compliment of A, meant NOT
> operation of A.
> - CLR A - It will Clear Accumulator. So A = 00H after instruction.



![Figure [Page 18 Media 1]](images/fig_018_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 18 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [• Logic XOR instructions; XRL - It will perform logic XOR in between two 8 bits numbers.; XRL A, #50H; ; A - A XOR 50H; XRL A, R1; ; A - A XOR R1; XRL A, 17H; ; A - A XOR [17H]].

> **Figure [Page 18 Media 1]**




<!-- Page 19 -->
### [PDF Page 19]

/ Rotate without Carry instructions
- It will perform rotate Right of A without carry by 1 bit.
If initially A = 46H & Carry = 1
- —baboobad-
Carry
- After Instruction
0 0 10
011
Carry
- After Instruction, A = 23H and Carry = 0
RL A - It will perform rotate Left of A without carry by 1 bit.
If initially A = 46H & Carry = 1
010
0
0110
Carry
- After Instruction
0
1 0
Carry
- After Instruction, A = 8CH and Carry = 0
11
0 0


> **Transcribed Media / Table Text**:
> - Rotate without Carry instructions
> - RR A - It will perform rotate Right of A without carry by 1 bit.
> - If initially A = 46H & Carry = 1
> 1
> Carry
> After Instruction
> 10
> 0
> 1
> 1
> 1
> 1 1
> Carry
> - After Instruction, A = 23H and Carry = 0
> - 
> RL A - It will perform rotate Left of A without carry by 1 bit.
> If initially A = 46H & Carry = 1
> 1
> Carry
> - After Instruction
> 0100
> 1 1 0
> 0
> 0
> 1
> Carry
> - After Instruction, A = 8CH and Carry = 0
> 1
> 0
> 0



![Figure [Page 19 Media 1]](images/fig_019_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 19 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [• Rotate without Carry instructions; • RR A - It will perform rotate Right of A without carry by 1 bit.; • If initially A = 46H & Carry = 1; 1; Carry; After Instruction; 10; 0].

> **Figure [Page 19 Media 1]**




<!-- Page 20 -->
### [PDF Page 20]

- Rotate with Carry instructions
RRC A - It will perform rotate Right of A with carry by 1 bit.
If initially A = 46H & Carry = 1
- 1•
- 0 1 00 0110
Carry
0
After Instruction
10100011
Carry
After Instruction, A = A3H and Carry = 0
RLC A - It will perform rotate Left of A with carry by 1 bit.
If initially A = 46H & Carry = 1
1
Carry
After Instruction
0
1
0
0 110
100
Carry
- After Instruction, A = 8DH and Carry = 0
01101


> **Transcribed Media / Table Text**:
> / Rotate with Carry instructions
> - RRC A - It will perform rotate Right of A with carry by 1 bit.
> - If initially A = 46H & Carry = 1
> 0 1 000110
> 1
> Carry
> After Instruction
> 1 0 1 0 0 011
> Carry
> - After Instruction, A = AH and Carry = 0
> RLC A - It will perform rotate Left of A with carry by 1 bit.
> If initially A = 46H & Carry = 1
> 0 10 0 0110
> 1
> Carry
> After Instruction
> 1 0 00 1101
> Carry
> - After Instruction, A = 8DH and Carry = 0



![Figure [Page 20 Media 1]](images/fig_020_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 20 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [/ Rotate with Carry instructions; • RRC A - It will perform rotate Right of A with carry by 1 bit.; • If initially A = 46H & Carry = 1; 0 1 000110; 1; Carry; After Instruction; 1 0 1 0 0 011].

> **Figure [Page 20 Media 1]**




<!-- Page 21 -->
### [PDF Page 21]

Boolean Instruction


> **Transcribed Media / Table Text**:
> 16 Bytes of
> RAM for Bit
> wise
> Addressing
> 2FH 7F 7E 7D .... 79 78
> Bit Addressable
> Area of RAM
> OF OE OD .... 09 08
> 20H
> 07 06 05 ..... 01 00


> **Transcribed Media / Table Text**:
> - Set, Clear & Complement Carry instructions
> SETB C - It will make Carry Flag = 1
> CLR C - It will make Carry Flag = 0
> CPL C- It will Complement Carry Flag
> / Set, Clear & Complement Bit instructions
> - SETB - It will make given bit = Logic "1'
> SETB PO.2
> ; P0.2 + 1
> SETB 07H
> ; 07H bit location in RAM - 1
> - CLR - It will make given bit = Logic '0'
> CLR PO.2
> ; P0.2 - 0
> CLR 07H
> ; 07H bit location in RAM +- 0
> - CPL - It will make given bit = complement of initial value
> CPL PO.2
> ; PO.2 will get complemented
> CPL 07H
> ; 07H bit location in RAM will
> get complemented



![Figure [Page 21 Media 1]](images/fig_021_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 21 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [16 Bytes of; RAM for Bit; wise; Addressing; 2FH 7F 7E 7D .... 79 78; Bit Addressable; Area of RAM; OF OE OD .... 09 08].

> **Figure [Page 21 Media 1]**


![Figure [Page 21 Media 2]](images/fig_021_media_2.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 21 Media 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [• Set, Clear & Complement Carry instructions; SETB C - It will make Carry Flag = 1; CLR C - It will make Carry Flag = 0; CPL C- It will Complement Carry Flag; / Set, Clear & Complement Bit instructions; • SETB - It will make given bit = Logic "1'; SETB PO.2; ; P0.2 + 1].

> **Figure [Page 21 Media 2]**




<!-- Page 22 -->
### [PDF Page 22]

Boolean Instruction


> **Transcribed Media / Table Text**:
> / Logic AND & OR Bit instructions
> - 
> ANL C, b - It will do logic AND between Carry flag and bit b and
> result will be stored into Carry flag.
> ANL C, PO.2
> ; C +- C AND PO.2
> ANL C,07H
> ; C - C AND [07H] bit in RAM
> ANL C, /b - It will do logic AND between Carry flag and
> complemented bit b and result will be stored into Carry flag.
> ANL C,/PO.2
> ; C - C AND (NOT) PO.2
> ANL C,/07H
> ; C+ CAND (NOT) [07H] bit in RAM
> - 
> ORL C, b - It will do logic OR between Carry flag and bit b and
> result will be stored into Carry flag.
> ORL C, PO.2
> ; C - C OR PO.2
> ORL C,07H
> ; C + COR [07H] bit in RAM
> ORL C, /b - It will do logic OR between Carry flag and
> complemented bit b and result will be stored into Carry flag.
> ORL C,/P0.2
> ; C + COR (NOT) PO.2
> ORL C,/07H
> ; C + COR (NOT) [07H) bit in RAM



![Figure [Page 22 Media 1]](images/fig_022_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 22 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [/ Logic AND & OR Bit instructions; •; ANL C, b - It will do logic AND between Carry flag and bit b and; result will be stored into Carry flag.; ANL C, PO.2; ; C +- C AND PO.2; ANL C,07H; ; C - C AND [07H] bit in RAM].

> **Figure [Page 22 Media 1]**




<!-- Page 23 -->
### [PDF Page 23]

Data Transfers


> **Transcribed Media / Table Text**:
> v Move instructions
> - MOV - It will move data from one location to another location.
> MOV A, #50H
> ; A + 50H
> MOV A, R1
> ; A - R1
> MOV A, 50H
> ; A - [50H]
> MOV A, @R1
> ; A + [R1]
> MOV R1, A
> ; R1 - A
> MOV R1, #50H
> ; R1 - 50H
> MOV R1, S0H
> ; R1+ [50H]
> MOV 50H, R1
> ; [50H] - R1
> MOV S0H, 40H
> ; [50H] - (40H]
> MOV 50H, @81 : [50] - [1]
> MOV @R1, A
> ; [R1] - A
> MOV @R1, #25H [R1] - -25H
> MOV @R1, 25H
> ; [R1] - (25H]
> MOV DPTR,#2525H; DPTR - 2525H
> MOVX A, @R1
> ; A + [00-R1] from External RAM
> MOVX A, @DPTR ; A - [DPTR] from External RAM
> MOVX @R1, A ; [00-R1] - A for External RAM
> MOVX @DPTR, A ; [DPTR] - A for External RAM
> MOVC A,@A+DPTR; A - [A+DPTR] for ROM
> MOVC A,@A+PC ; A + [A+PC] for ROM



![Figure [Page 23 Media 1]](images/fig_023_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 23 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [v Move instructions; • MOV - It will move data from one location to another location.; MOV A, #50H; ; A + 50H; MOV A, R1; ; A - R1; MOV A, 50H; ; A - [50H]].

> **Figure [Page 23 Media 1]**




<!-- Page 24 -->
### [PDF Page 24]

Stack and Exchange


> **Transcribed Media / Table Text**:
> V Stack instructions
> - PUSH - It will store data on stack
> - In PUSH, 1" SP will increment by 1, then it will store data on stack.
> 0
> POP - It will load data from stack
> - 
> In POP, 1" load data from stack, then it will decrement SP by 1.
> PUSH R1
> ; R1 will be stored on stack
> PUSH 25H
> ; [25H] will be stored on stack
> POP R1
> ; R1 will be loaded from stack
> POP 25H
> ; [25H] will be loaded from stack
> - Exchange instructions
> - XCH - It will exchange the mentioned two data.
> XCH A, RO
> ; A + → RO
> XCH A, 25H
> ; A + → [25H]
> XCH A, @R1
> ; A + → [R1)
> XCHD A, @x - It will exchange lower Nibble of the mentioned
> two data.
> XCHD A, @R1
> ; A + → [R1] only Lower Nibble.



![Figure [Page 24 Media 1]](images/fig_024_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 24 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [V Stack instructions; • PUSH - It will store data on stack; • In PUSH, 1" SP will increment by 1, then it will store data on stack.; 0; POP - It will load data from stack; •; In POP, 1" load data from stack, then it will decrement SP by 1.; PUSH R1].

> **Figure [Page 24 Media 1]**




<!-- Page 25 -->
### [PDF Page 25]

Brand Operation


> **Transcribed Media / Table Text**:
> Parameters
> Name
> Syntax
> Range
> Size
> Address
> calculation
> Instructions
> SJMP
> AJMP
> - SJMP - Short Jump
> - AJMP - Absolute Jump
> - SJMP Labell
> - AJMP Label2
> - -128 to +127 locations, because • Maximum range is 2KB.
> of Labell is 8 bits signed No.
> - 2 Bytes (1 Opcode + 1 Label)
> - PC = PC of Next instruction +
> Labell
> - SJMP
> - All conditional Jump available
> - 2 Bytes (1 Opcode + 1 Label)
> - PC = 1** 5 bits same of PC +
> 3bits of AJMP + 8 bits of Label2
> - AJMP
> - ACALL
> UMP
> - UMP - Long Jump
> - LIMP Label3
> - Maximum range is 64KB.
> - 3 Bytes (1 Opcode + 2 Label)
> - PC = 16 bits Label3
> - UMP
> - LCALL


> **Transcribed Media / Table Text**:
> Usage
> - Generally, we use it in same
> program jump with many
> conditions and unconditional.
> - We use it for jump within same • We use it to jump anywhere
> page of 2KB.
> in 64KB of 8051 /C.
> - 64Kb is bisected into 32 pages
> of 2KB



![Figure [Page 25 Media 1]](images/fig_025_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 25 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [Parameters; Name; Syntax; Range; Size; Address; calculation; Instructions].

> **Figure [Page 25 Media 1]**


![Figure [Page 25 Media 2]](images/fig_025_media_2.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 25 Media 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [Usage; • Generally, we use it in same; program jump with many; conditions and unconditional.; • We use it for jump within same • We use it to jump anywhere; page of 2KB.; in 64KB of 8051 /C.; • 64Kb is bisected into 32 pages].

> **Figure [Page 25 Media 2]**




<!-- Page 26 -->
### [PDF Page 26]

JMP and Call in 8051
JMP
CALL


> **Transcribed Media / Table Text**:
> Program
> UMP L1
> PC + L1
> - L1: Address


> **Transcribed Media / Table Text**:
> Program
> PUSH PC; PA on stack
> PC + L1
> LCALL L1
> L1: Address
> Physical
> Address of Next
> instruction in PC.
> POP PC; PA on PC
> RET



![Figure [Page 26 Media 1]](images/fig_026_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 26 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [Program; UMP L1; PC + L1; • L1: Address].

> **Figure [Page 26 Media 1]**


![Figure [Page 26 Media 2]](images/fig_026_media_2.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 26 Media 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [Program; PUSH PC; PA on stack; PC + L1; LCALL L1; L1: Address; Physical; Address of Next; instruction in PC.].

> **Figure [Page 26 Media 2]**




<!-- Page 27 -->
### [PDF Page 27]

JMP and Call


> **Transcribed Media / Table Text**:
> JMP
> - Here, we just jump to new location and then we move on with
> given program.
> - No need of retrieve back to branch location.
> - JMP doesn't stores branch location.
> - In 8051, JMP is of three types:
> - SJMP, AJMP and LIMP
> CALL
> - Here, we jump to new location for subroutine, after subroutine
> we come back to that location again.
> - By RET at the end of subroutine, it will retrieve back to branch
> location.
> - CALL stores branch location on Stack.
> - In 8051, CALL is of two types:
> - ACALL and LCALL


> **Transcribed Media / Table Text**:
> Program
> UMP L1 -
> PC + L1
> - L1: Address


> **Transcribed Media / Table Text**:
> Program
> PUSH PC; PA on stack
> PC + L1
> LCALL L1
> L1: Address
> Physical
> Address of Next
> instruction in PC.
> POP PC; PA on PC
> RET


> **Transcribed Media / Table Text**:
> - In 8051, SJMP can be conditional and unconditional.
> - In 8051, we have only unconditional CALL instructions.



![Figure [Page 27 Media 1]](images/fig_027_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 27 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [JMP; • Here, we just jump to new location and then we move on with; given program.; • No need of retrieve back to branch location.; • JMP doesn't stores branch location.; • In 8051, JMP is of three types:; • SJMP, AJMP and LIMP; CALL].

> **Figure [Page 27 Media 1]**


![Figure [Page 27 Media 2]](images/fig_027_media_2.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 27 Media 2]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [Program; UMP L1 -; PC + L1; • L1: Address].

> **Figure [Page 27 Media 2]**


![Figure [Page 27 Media 3]](images/fig_027_media_3.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 27 Media 3]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [Program; PUSH PC; PA on stack; PC + L1; LCALL L1; L1: Address; Physical; Address of Next; instruction in PC.].

> **Figure [Page 27 Media 3]**


![Figure [Page 27 Media 4]](images/fig_027_media_4.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 27 Media 4]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [• In 8051, SJMP can be conditional and unconditional.; • In 8051, we have only unconditional CALL instructions.].

> **Figure [Page 27 Media 4]**




<!-- Page 28 -->
### [PDF Page 28]

RET and RETI


> **Transcribed Media / Table Text**:
> RET
> - Used with normal subroutine.
> - With RET, 8051 just return back to
> main program from subroutine.
> - Operation:
> POP PC ; PCH + [SP]
> ; PCL + [SP-1]
> ; SP - SP - 2
> RETI
> - Used with ISR - Interrupt Service
> Routine
> - With RETI, 8051 return back to main
> program + It will Enable Interrupt by
> making EA = 1.
> - Operation:
> POP PC ; PCH + [SP]
> ; PCL - [SP-1]
> ; SP - SP - 2
> EA + 1



![Figure [Page 28 Media 1]](images/fig_028_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 28 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [RET; * Used with normal subroutine.; * With RET, 8051 just return back to; main program from subroutine.; *Operation:; POP PC ; PCH + [SP]; ; PCL + [SP-1]; ; SP - SP - 2].

> **Figure [Page 28 Media 1]**




<!-- Page 29 -->
### [PDF Page 29]

Unconditional Jump instructions


> **Transcribed Media / Table Text**:
> 0
> SJMP Label - It jump to location with respect to Label (8 bits).
> Range of SJMP is -128 to +127 locations.
> Final Address will be PC • PC + Label
> AJMP Label - It jump to location with respect to Label (8 bits).
> Range of AJMP is 2KB.
> Final Address will be PC = 1" 5 bits of PC + 3 bits of AJMP + Label.
> LIMP Label - It jump to location at Label (16 bits).
> It can jump anywhere in 64KB memory of 8051.
> Final Address will be PC = Label
> JMP @A+DPTR - It will jump to the location A + DPTR.



![Figure [Page 29 Media 1]](images/fig_029_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 29 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [0; SJMP Label - It jump to location with respect to Label (8 bits).; Range of SJMP is -128 to +127 locations.; Final Address will be PC • PC + Label; AJMP Label - It jump to location with respect to Label (8 bits).; Range of AJMP is 2KB.; Final Address will be PC = 1" 5 bits of PC + 3 bits of AJMP + Label.; LIMP Label - It jump to location at Label (16 bits).].

> **Figure [Page 29 Media 1]**




<!-- Page 30 -->
### [PDF Page 30]

Conditional Jump instructions


> **Transcribed Media / Table Text**:
> - DINZ R3, Label - It will decrement R3, and jump to the Label
> only if R3 is not Zero.
> DINZ 25H, Label - It will decrement [25H], and jump to the
> Label only if [25H] is not Zero.
> CINE A, #25H, Label - It will compare A with #25H and jump to
> the Label only if A and #25H are not equal.
> CINE A, 25H, Label - It will compare A with [25H] and jump to
> the Label only if A and [25H] are not equal.
> CINE R2, #25H, Label - It will compare R2 with #25H and jump
> to the Label only if R2 and #25H are not equal.
> CINE @R2, #25H, Label - It will compare [R2] with #25H and
> jump to the Label only if [R2] and #25H are not equal.
> JC Label - It will jump to Label if with previous instruction, carry
> flag is 1.
> JNC Label - It will jump to Label if with previous instruction,
> carry flag is 0.
> IZ Label - It will jump to Label if with previous instruction, Zero
> flag is 1.
> JNZ Label - It will jump to Label if with previous instruction,
> Zero flag is 0.



![Figure [Page 30 Media 1]](images/fig_030_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 30 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [• DINZ R3, Label - It will decrement R3, and jump to the Label; only if R3 is not Zero.; DINZ 25H, Label - It will decrement [25H], and jump to the; Label only if [25H] is not Zero.; CINE A, #25H, Label - It will compare A with #25H and jump to; the Label only if A and #25H are not equal.; CINE A, 25H, Label - It will compare A with [25H] and jump to; the Label only if A and [25H] are not equal.].

> **Figure [Page 30 Media 1]**




<!-- Page 31 -->
### [PDF Page 31]

Boolean Conditional Jump Instructions


> **Transcribed Media / Table Text**:
> JB PO.0, Label - Jump to Label Only if PO.0 = 1
> JNB PO.0, Label - Jump to Label Only if P0.0 = 0
> JBC PO.0, Label - Jump to Label Only if PO.0 = 1 and also make
> PO.0 = 0



![Figure [Page 31 Media 1]](images/fig_031_media_1.jpeg)
*Description*: Technical Schematic & Presentation Visual Diagram [Figure [Page 31 Media 1]]: Illustrates system flow, hardware interconnects, or functional building blocks. Internal elements: [JB PO.0, Label - Jump to Label Only if PO.0 = 1; JNB PO.0, Label - Jump to Label Only if P0.0 = 0; JBC PO.0, Label - Jump to Label Only if PO.0 = 1 and also make; PO.0 = 0].

> **Figure [Page 31 Media 1]**



