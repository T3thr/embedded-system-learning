# Appendix D: Flowcharts and Pseudocode

> **Textbook**: The AVR Microcontroller and Embedded Systems using Assembly and C

> **PDF Page Range**: 761 - 765


---


<!-- Page 761 -->
### [PDF Page 761]

APPENDIX D
FLOWCHARTS AND
PSEUDOCODE
OVERVIEW
This appendix provides an introduction to writing flowcharts and
pseudocode.
755



<!-- Page 762 -->
### [PDF Page 762]

Flowcharts
If you have taken any previous
programming courses, you are probably
familiar with flowcharting. Flowcharts
use graphic symbols to represent differ-
ent types of program operations. These
symbols are connected together into a
flowchart to show the flow of execution
of a program. Figure D-1 shows some of
the more commonly used symbols.
Flowchart templates are available to help
you draw the symbols quickly and neatly.
Pseudocode
Flowcharting has been standard
practice in industry for decades.
However, some find limitations in using
flowcharts, such as the fact that you can't
write much in the little boxes, and it is
hard to get the "big picture" of what the
program does without getting bogged
down in the details. An alternative to
using flowcharts is pseudocode, which
involves writing brief descriptions of the
flow of the code. Figures D-2 through
D-6 show flowcharts and pseudocode for
commonly used control structures.
Terminal
Process
Decision
Subroutine
Input/
Output
Connector
Structured programming uses
three basic types of program control Figure D-1. Commonly Used
Flowchart Symbols
structures: sequence, control, and itera-
Statement 1
Statement 1
Statement 2
Statement 2
Figure D-2. SEQUENCE Pseudocode versus Flowchart
756



<!-- Page 763 -->
### [PDF Page 763]

tion. Sequence is simply executing instructions one after another. Figure D-2
shows how sequence can be represented in pseudocode and flowcharts.
Figures D-3 and D-4 show two control programming structures: IF-THEN-
ELSE and IF-THEN in both pseudocode and flowcharts.
Note in Figures D-2 through D-6 that "statement" can indicate one state-
ment or a group of statements.
Figures D-5 and D-6 show two iteration control structures: REPEAT
UNTIL and WHILE DO. Both structures execute a statement or group of state-
ments repeatedly. The difference between them is that the REPEAT UNTIL struc-
ture always executes the statements) at least once, and checks the condition after
each iteration, whereas the WHILE DO may not execute the statements) at all
because the condition is checked at the beginning of each iteration.
Condition
?
IF (condition) THEN
Statement
1
ELSE
Statement 2
Statement 1
Statement 2
Figure D-3. IF THEN ELSE Pseudocode versus Flowchart
No
IF (condition) THEN
Statement
Condition›
?
_ Yes
Statement
Figure D-4. IF THEN Pseudocode versus Flowchart
APPENDIX D: FLOWCHARTS AND PSEUDOCODE
757



<!-- Page 764 -->
### [PDF Page 764]

Statement
REPEAT
Statement
UNTIL (condition)
No
Condition
?
Yes
Figure D-5. REPEAT UNTIL Pseudocode versus Flowchart
No
WHILE
: (condition) DO
Statement
Condition
?
Yes
Statement
Figure D-6. WHILE DO Pseudocode versus Flowchart
Program D-1 finds the sum of a series of bytes. Compare the flowchart ver-
sus the pseudocode for Program D-1 (shown in Figure D-7). In this example, more
program details are given than one usually finds. For example, this shows steps for
initializing and decrementing counters. Another programmer may not include
these steps in the flowchart or pseudocode. It is important to remember that the
purpose of flowcharts or pseudocode is to show the flow of the program and what
the program does, not the specific Assembly language instructions that accomplish
the program's objectives. Notice also that the pseudocode gives the same informa-
tion in a much more compact form than does the flowchart. It is important to note
that sometimes pseudocode is written in layers, so that the outer level or layer
shows the flow of the program and subsequent levels show more details of how
the program accomplishes its assigned tasks.
758



<!-- Page 765 -->
### [PDF Page 765]

count = 5
Address = $140
Repeat
Add next byte
Increment address
Decrement counter
Until Count = 0
Store Sum
Start
Count = 5
Address = $140
Add one byte
Increment address
pointer
Decrement counter
No
Count
= 0?
Yes
Store sum
Stop
Figure D-7. Pseudocode versus Flowchart for Program D-1
¡ COUNT = 5
#define
#define
#define
LDI
CUR
LDI
LDI
L1:
LD
ADD
DEC
BRNE
HERE: RJMP
Program D-1
COUNTVAL
5
COUNTER
R22
SUM
R23
COUNTER, COUNTVAL
SUM
R26, LOW ($140)
R27, HIGH ($140)
R24, xt
SUM, R24
COUNTER
L1
HERE
; R22 = 5
; SUM = 0
¡ load pointer to RAM data address
¡ COPY RAM to R24 and increment pointer
¡ add R24 to SUM
¡ decrement counter
¡ loop until counter = zero
¡ stay here forever
APPENDIX D: FLOWCHARTS AND PSEUDOCODE
759


