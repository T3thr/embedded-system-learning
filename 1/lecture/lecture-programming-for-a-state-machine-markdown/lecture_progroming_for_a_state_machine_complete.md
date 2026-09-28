# Lecture Progroming for a state machine
## Complete Single-File AI-Research Document

> **Source File**: Lecture Progroming for a state machine.pdf  
> **Total Pages/Slides**: 14 pages  
> **Format**: Single-File Bundle with Zero-Drift Page Markers, Syntax Highlighting, 300 DPI Cropped Figures, and Deep Domain Walkthrough Descriptions

---


<!-- Page 1 -->
### [PDF Page 1]

Lab 5
Coding State Machine Diagram





<!-- Page 2 -->
### [PDF Page 2]

Traffic 1


> **Transcribed Media / Table Text**:
> 8051
> P1.1
> P1.0
> P2.0


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | **Ready** | State |
> | Feature 2 | push |
> | **Go** | State |
> | Feature 4 | push |
> | Feature 5 | timer |
> | **Ready** | State |
> | **Go** | State |



![Figure [Page 2 Media 1]: Traffic 1](images/fig_002_media_1.png)
*Description*: Finite State Machine (FSM) State Transition Diagram & Controller Architecture [Figure [Page 2 Media 1]: Traffic 1]: Illustrates discrete operational states, state register encoding, input sensory triggers/push buttons, guard conditions, state transition paths, timer delay generation, and output control signals (e.g. Traffic light sequencing or actuator drive) implemented via 8051 microcontroller assembly routines. [Labels & Elements: 8051; P1.1; P1.0; P2.0].

> **Figure [Page 2 Media 1]: Traffic 1**


![Figure [Page 2 Media 2]: Traffic 1](images/fig_002_media_2.png)
*Description*: Finite State Machine (FSM) State Transition Diagram & Controller Architecture [Figure [Page 2 Media 2]: Traffic 1]: Illustrates discrete operational states, state register encoding, input sensory triggers/push buttons, guard conditions, state transition paths, timer delay generation, and output control signals (e.g. Traffic light sequencing or actuator drive) implemented via 8051 microcontroller assembly routines. [Labels & Elements: Ready State; push; Go State; push; timer; Ready State; Go State].

> **Figure [Page 2 Media 2]: Traffic 1**




<!-- Page 3 -->
### [PDF Page 3]

Ready State
push
ReadyState:
mov IØ, #Ø1H ; 10 =state 1
setb P1.1
clr pl.ø
jB p2.Ø, GoState
sjmp ReadyState



![Figure [Slide 3 Diagram]: Ready State](images/fig_003_slide_diagram.png)
*Description*: Finite State Machine (FSM) State Transition Diagram & Controller Architecture [Ready State]: Illustrates discrete operational states, state register encoding, input sensory triggers/push buttons, guard conditions, state transition paths, timer delay generation, and output control signals (e.g. Traffic light sequencing or actuator drive) implemented via 8051 microcontroller assembly routines. [Labels & Elements: Ready State; push; ReadyState:; mov Iø, #Ø1H ;Iø =state 1; setb P1.1; clr pl.ø; jB p2.Ø, GoState; simp ReadyState].

> **Figure [Slide 3 Diagram]: Ready State**




<!-- Page 4 -->
### [PDF Page 4]

Ready State
push
Go State
timer
GoState:
mov IØ, #Ø2H ; rø =state 1
clr P1.1
setb pl.ø
mov r1,#1ø
timer:
call delay
dinz rl, timer
jB p2.Ø, Gostate
simp Readystate



![Figure [Slide 4 Diagram]: Ready State](images/fig_004_slide_diagram.png)
*Description*: Finite State Machine (FSM) State Transition Diagram & Controller Architecture [Ready State]: Illustrates discrete operational states, state register encoding, input sensory triggers/push buttons, guard conditions, state transition paths, timer delay generation, and output control signals (e.g. Traffic light sequencing or actuator drive) implemented via 8051 microcontroller assembly routines. [Labels & Elements: Ready State; push; Go State; timer; GoState:; mov IØ,#Ø2H ; Iø =state 1; clr P1.1; setb pl.ø].

> **Figure [Slide 4 Diagram]: Ready State**




<!-- Page 5 -->
### [PDF Page 5]

delay:
mov tmod,#Ø1H ; timerø model
mov thø,#111111115; FFH
mov t1ø,#11110110b;F6H delay Iøusec
mov toon, #løh;start timer
wait: jnb toon.5, wait
mov toon, #ØøH;stop timer
ret



![Figure [Slide 5 Diagram]: delay:](images/fig_005_slide_diagram.png)
*Description*: Engineering Schematic & Technical Figure [delay:]: Illustrates physical machine construction, magnetic flux paths, electrical equivalent circuits, phasor relationships, or operational characteristic curves. [Labels & Elements: delay:; mov tmod,#Ø1H ; timerø model; mov thø,#11111111b;FFH; mov t1Ø,#1111Ø110b;F6H delay Iøusec; mov tcon, #løH; start timer; wait: jnb tcon.5, wait; mov toon, #ØøH; stop timer; ret].

> **Figure [Slide 5 Diagram]: delay:**




<!-- Page 6 -->
### [PDF Page 6]

Traffic 2


> **Transcribed Media / Table Text**:
> 8051
> P1.4
> P1.3
> P1.2
> P1.1
> P1.0
> P2.0


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | Feature 1 | Ready |
> | Feature 2 | push |
> | Feature 3 | timer |
> | Feature 4 | push |
> | Feature 5 | Prepare |
> | Feature 6 | timer |
> | Feature 7 | Go |
> | Feature 8 | push |



![Figure [Page 6 Media 1]: Traffic 2](images/fig_006_media_1.jpeg)
*Description*: Finite State Machine (FSM) State Transition Diagram & Controller Architecture [Figure [Page 6 Media 1]: Traffic 2]: Illustrates discrete operational states, state register encoding, input sensory triggers/push buttons, guard conditions, state transition paths, timer delay generation, and output control signals (e.g. Traffic light sequencing or actuator drive) implemented via 8051 microcontroller assembly routines. [Labels & Elements: 8051; P1.4; P1.3; P1.2; P1.1; P1.0; P2.0].

> **Figure [Page 6 Media 1]: Traffic 2**


![Figure [Page 6 Media 2]: Traffic 2](images/fig_006_media_2.png)
*Description*: Finite State Machine (FSM) State Transition Diagram & Controller Architecture [Figure [Page 6 Media 2]: Traffic 2]: Illustrates discrete operational states, state register encoding, input sensory triggers/push buttons, guard conditions, state transition paths, timer delay generation, and output control signals (e.g. Traffic light sequencing or actuator drive) implemented via 8051 microcontroller assembly routines. [Labels & Elements: Ready; push; timer; push; Prepare; timer; Go; push].

> **Figure [Page 6 Media 2]: Traffic 2**




<!-- Page 7 -->
### [PDF Page 7]

Raady)
push
Ready State
ReadyState:
mov IØ,#Ø1H ; IØ =state 1
clr pl.4
clr P1.3
setb pl.2
setb P1.1
clr pl.ø
jB p2.Ø, PrepareState
simp Readystate


> **Transcribed Media / Table Text**:
> Ready
> push


> **Transcribed Media / Table Text**:
> Ready State


> **Transcribed Media / Table Text**:
> ```assembly
> ReadyState:
> mov IØ,#Ø1H ;IØ =state 1
> clr pl.4
> clr P1.3
> setb p1.2
> setb P1.1
> olr pl.ø
> jB p2. Ø, PrepareState
> sjmp ReadyState
> ```



![Figure [Page 7 Media 1]: Raady)](images/fig_007_media_1.png)
*Description*: Engineering Schematic & Technical Figure [Figure [Page 7 Media 1]: Raady)]: Illustrates physical machine construction, magnetic flux paths, electrical equivalent circuits, phasor relationships, or operational characteristic curves. [Labels & Elements: Ready; push].

> **Figure [Page 7 Media 1]: Raady)**


![Figure [Page 7 Media 2]: Raady)](images/fig_007_media_2.jpeg)
*Description*: Engineering Schematic & Technical Figure [Figure [Page 7 Media 2]: Raady)]: Illustrates physical machine construction, magnetic flux paths, electrical equivalent circuits, phasor relationships, or operational characteristic curves. [Labels & Elements: Ready State].

> **Figure [Page 7 Media 2]: Raady)**


![Figure [Page 7 Media 3]: Raady)](images/fig_007_media_3.png)
*Description*: Engineering Schematic & Technical Figure [Figure [Page 7 Media 3]: Raady)]: Illustrates physical machine construction, magnetic flux paths, electrical equivalent circuits, phasor relationships, or operational characteristic curves. [Labels & Elements: ReadyState:; mov IØ,#Ø1H ;IØ =state 1; clr pl.4; clr P1.3; setb p1.2; setb P1.1; olr pl.ø; jB p2. Ø, PrepareState].

> **Figure [Page 7 Media 3]: Raady)**




<!-- Page 8 -->
### [PDF Page 8]

push
Prepare
timer
V
Prepare State
Preparestate:
mov IØ, #Ø2H ;IØ =state 2
CLI Pl.4
setb P1.3
clr pl.2
setb P1.1
clr pl.ø
mov I1, #02 ; deley 20 usec
timerP:
call delay
dinz r1, timere
jB p2.Ø, Gostate
sjmp Gostate


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | Feature 1 | push |
> | Feature 2 | Prepare |
> | Feature 3 | timer |


> **Transcribed Media / Table Text**:
> Prepare State


> **Transcribed Media / Table Text**:
> ```assembly
> PrepareState:
> mov IØ, #Ø2H ;IØ =state 2
> clr p1.4
> setb P1.3
> clr p1.2
> setb P1.1
> clr pl.ø
> mov r1, #Ø2 ; deley 2Ø usec
> timerP:
> call delay
> djnz r1, timerP
> jB p2. Ø, Gostate
> sjmp Gostate
> ```



![Figure [Page 8 Media 1]: push](images/fig_008_media_1.png)
*Description*: Engineering Schematic & Technical Figure [Figure [Page 8 Media 1]: push]: Illustrates physical machine construction, magnetic flux paths, electrical equivalent circuits, phasor relationships, or operational characteristic curves. [Labels & Elements: push; Prepare; timer].

> **Figure [Page 8 Media 1]: push**


![Figure [Page 8 Media 2]: push](images/fig_008_media_2.jpeg)
*Description*: Engineering Schematic & Technical Figure [Figure [Page 8 Media 2]: push]: Illustrates physical machine construction, magnetic flux paths, electrical equivalent circuits, phasor relationships, or operational characteristic curves. [Labels & Elements: Prepare State].

> **Figure [Page 8 Media 2]: push**


![Figure [Page 8 Media 3]: push](images/fig_008_media_3.png)
*Description*: Engineering Schematic & Technical Figure [Figure [Page 8 Media 3]: push]: Illustrates physical machine construction, magnetic flux paths, electrical equivalent circuits, phasor relationships, or operational characteristic curves. [Labels & Elements: PrepareState:; mov IØ, #Ø2H ;IØ =state 2; clr p1.4; setb P1.3; clr p1.2; setb P1.1; clr pl.ø; mov r1, #Ø2 ; deley 2Ø usec].

> **Figure [Page 8 Media 3]: push**




<!-- Page 9 -->
### [PDF Page 9]

Go State
push
push
Ready
push
Prepare
timer
Go
timer
GoState:
mov IØ, #Ø3H ; IØ =state 3
setb pl.4
clr P1.3
clr pl.2
clr P1.1
setb pl.ø
mov Il, #1ø ; deley 1øø usec
timer:
call delay
dinz rl, timer
jB p2.Ø, Gostate
simp Readystate


> **Transcribed Media / Table Text**:
> ```assembly
> Gostate:
> mov IØ, #Ø3H ;IØ =state 3
> setb p1.4
> clr P1.3
> clr p1.2
> clr P1.1
> setb pl.ø
> mov r1,#1Ø ; deley 1øø usec
> timer:
> call delay
> djnz r1, timer
> jB p2. Ø, GoState
> sjmp Readystate
> ```


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | Feature 1 | Ready |
> | Feature 2 | push |
> | Feature 3 | timer |
> | Feature 4 | push |
> | Feature 5 | Prepare |
> | Feature 6 | timer |
> | Feature 7 | Go |
> | Feature 8 | push |


> **Transcribed Media / Table Text**:
> Go State



![Figure [Page 9 Media 1]: Go State](images/fig_009_media_1.png)
*Description*: Finite State Machine (FSM) State Transition Diagram & Controller Architecture [Figure [Page 9 Media 1]: Go State]: Illustrates discrete operational states, state register encoding, input sensory triggers/push buttons, guard conditions, state transition paths, timer delay generation, and output control signals (e.g. Traffic light sequencing or actuator drive) implemented via 8051 microcontroller assembly routines. [Labels & Elements: Gostate:; mov IØ, #Ø3H ;IØ =state 3; setb p1.4; clr P1.3; clr p1.2; clr P1.1; setb pl.ø; mov r1,#1Ø ; deley 1øø usec].

> **Figure [Page 9 Media 1]: Go State**


![Figure [Page 9 Media 2]: Go State](images/fig_009_media_2.png)
*Description*: Finite State Machine (FSM) State Transition Diagram & Controller Architecture [Figure [Page 9 Media 2]: Go State]: Illustrates discrete operational states, state register encoding, input sensory triggers/push buttons, guard conditions, state transition paths, timer delay generation, and output control signals (e.g. Traffic light sequencing or actuator drive) implemented via 8051 microcontroller assembly routines. [Labels & Elements: Ready; push; timer; push; Prepare; timer; Go; push].

> **Figure [Page 9 Media 2]: Go State**


![Figure [Page 9 Media 3]: Go State](images/fig_009_media_3.jpeg)
*Description*: Finite State Machine (FSM) State Transition Diagram & Controller Architecture [Figure [Page 9 Media 3]: Go State]: Illustrates discrete operational states, state register encoding, input sensory triggers/push buttons, guard conditions, state transition paths, timer delay generation, and output control signals (e.g. Traffic light sequencing or actuator drive) implemented via 8051 microcontroller assembly routines. [Labels & Elements: Go State].

> **Figure [Page 9 Media 3]: Go State**




<!-- Page 10 -->
### [PDF Page 10]

Traffic 3


> **Transcribed Media / Table Text**:
> | Item / Feature | Technical Specification / Comparison Details |
> | :--- | :--- |
> | Feature 1 | Ready |
> | Feature 2 | push |
> | Feature 3 | push |
> | Feature 4 | Prepare |
> | Feature 5 | stop |
> | Feature 6 | GO |
> | Feature 7 | push |
> | Feature 8 | timer |
> | Feature 9 | timer |
> | Feature 10 | Wait |
> | **Ready** | S |
> | Feature 12 | Prepar |
> | Feature 13 | push |


> **Transcribed Media / Table Text**:
> GPIO 39
> GPIO 34
> GPIO 35
> GPIO 32
> GPIO 33
> GPIO 25
> GPIO 26
> GPIO 27
> GPIO 14
> GPIO 12
> GND]
> GPIO 13~
> GPIO 9
> GPIO 10
> GPIO 11 ~
> WIFI
> Og
> Og!
> LE 235 - 000513
> De
> ESP32
> = 0
> 80
> GND
> GPIO 22
> GPIO :
> GPIO 3
> GPIO 21
> GND
> ~ GPIO 19
> ~ GPIO 18
> ~ GPIO 5
> ~ GPIO 17
> ~ GPIO 16
> GPIO 4
> ~ GPIO 0
> ~ GPIO 2
> ~ GPIO 15
> GPIO 8
> GPIO 7
> 8051
> P2.1
> P1.4
> P1.3
> P1.2
> P1.1
> P1.0
> P2.0



![Figure [Page 10 Media 1]: Traffic 3](images/fig_010_media_1.jpeg)
*Description*: Finite State Machine (FSM) State Transition Diagram & Controller Architecture [Figure [Page 10 Media 1]: Traffic 3]: Illustrates discrete operational states, state register encoding, input sensory triggers/push buttons, guard conditions, state transition paths, timer delay generation, and output control signals (e.g. Traffic light sequencing or actuator drive) implemented via 8051 microcontroller assembly routines. [Labels & Elements: Ready; push; push; Prepare; stop; GO; push; timer].

> **Figure [Page 10 Media 1]: Traffic 3**


![Figure [Page 10 Media 2]: Traffic 3](images/fig_010_media_2.png)
*Description*: Finite State Machine (FSM) State Transition Diagram & Controller Architecture [Figure [Page 10 Media 2]: Traffic 3]: Illustrates discrete operational states, state register encoding, input sensory triggers/push buttons, guard conditions, state transition paths, timer delay generation, and output control signals (e.g. Traffic light sequencing or actuator drive) implemented via 8051 microcontroller assembly routines. [Labels & Elements: GPIO 39; GPIO 34; GPIO 35; GPIO 32; GPIO 33; GPIO 25; GPIO 26; GPIO 27].

> **Figure [Page 10 Media 2]: Traffic 3**




<!-- Page 11 -->
### [PDF Page 11]

Ready State
Ready
push
Readystate:
mov 1Ø,#Ø1H ; IØ =state 1
clr pl.4
clr P1.3
setb pl.2
setb P1.1
clr pl.ø
jB p2.Ø, PrepareState
simp ReadyState


> **Transcribed Media / Table Text**:
> Ready
> push


> **Transcribed Media / Table Text**:
> Ready State


> **Transcribed Media / Table Text**:
> ```assembly
> ReadyState:
> mov IØ, #Ø1H ;IØ =state 1
> olr p1.4
> olr P1.3
> setb p1.2
> setb P1.1
> alr pl.ø
> jB p2.Ø, PrepareState
> simp ReadyState
> ```



![Figure [Page 11 Media 1]: Ready State](images/fig_011_media_1.png)
*Description*: Finite State Machine (FSM) State Transition Diagram & Controller Architecture [Figure [Page 11 Media 1]: Ready State]: Illustrates discrete operational states, state register encoding, input sensory triggers/push buttons, guard conditions, state transition paths, timer delay generation, and output control signals (e.g. Traffic light sequencing or actuator drive) implemented via 8051 microcontroller assembly routines. [Labels & Elements: Ready; push].

> **Figure [Page 11 Media 1]: Ready State**


![Figure [Page 11 Media 2]: Ready State](images/fig_011_media_2.jpeg)
*Description*: Finite State Machine (FSM) State Transition Diagram & Controller Architecture [Figure [Page 11 Media 2]: Ready State]: Illustrates discrete operational states, state register encoding, input sensory triggers/push buttons, guard conditions, state transition paths, timer delay generation, and output control signals (e.g. Traffic light sequencing or actuator drive) implemented via 8051 microcontroller assembly routines. [Labels & Elements: Ready State].

> **Figure [Page 11 Media 2]: Ready State**


![Figure [Page 11 Media 3]: Ready State](images/fig_011_media_3.png)
*Description*: Finite State Machine (FSM) State Transition Diagram & Controller Architecture [Figure [Page 11 Media 3]: Ready State]: Illustrates discrete operational states, state register encoding, input sensory triggers/push buttons, guard conditions, state transition paths, timer delay generation, and output control signals (e.g. Traffic light sequencing or actuator drive) implemented via 8051 microcontroller assembly routines. [Labels & Elements: ReadyState:; mov IØ, #Ø1H ;IØ =state 1; olr p1.4; olr P1.3; setb p1.2; setb P1.1; alr pl.ø; jB p2.Ø, PrepareState].

> **Figure [Page 11 Media 3]: Ready State**




<!-- Page 12 -->
### [PDF Page 12]

push
Prepare
stop
Prepare State
- 
PrepareState:
mov IØ, #Ø2H ; rø =state 2
clr pl.4
setb P1.3
olr pl.2
setb P1.1
clr pl.ø
jB p2.1, Gostate ; wait stop signal
sjmp PrepareState


> **Transcribed Media / Table Text**:
> ```assembly
> Preparestate:
> mov IØ, #Ø2H
> irØ =state 2
> olr p1.4
> setb P1.3
> olr p1.2
> setb P1.1
> clx pl.Ø
> jB p2.1, GoState ; wait stop signal
> sjmp PrepareState
> ```


> **Transcribed Media / Table Text**:
> Prepare State


> **Transcribed Media / Table Text**:
> push
> Prepare
> stop



![Figure [Page 12 Media 1]: push](images/fig_012_media_1.png)
*Description*: Engineering Schematic & Technical Figure [Figure [Page 12 Media 1]: push]: Illustrates physical machine construction, magnetic flux paths, electrical equivalent circuits, phasor relationships, or operational characteristic curves. [Labels & Elements: Preparestate:; mov IØ, #Ø2H; irØ =state 2; olr p1.4; setb P1.3; olr p1.2; setb P1.1; clx pl.Ø].

> **Figure [Page 12 Media 1]: push**


![Figure [Page 12 Media 2]: push](images/fig_012_media_2.jpeg)
*Description*: Engineering Schematic & Technical Figure [Figure [Page 12 Media 2]: push]: Illustrates physical machine construction, magnetic flux paths, electrical equivalent circuits, phasor relationships, or operational characteristic curves. [Labels & Elements: Prepare State].

> **Figure [Page 12 Media 2]: push**


![Figure [Page 12 Media 3]: push](images/fig_012_media_3.png)
*Description*: Engineering Schematic & Technical Figure [Figure [Page 12 Media 3]: push]: Illustrates physical machine construction, magnetic flux paths, electrical equivalent circuits, phasor relationships, or operational characteristic curves. [Labels & Elements: push; Prepare; stop].

> **Figure [Page 12 Media 3]: push**




<!-- Page 13 -->
### [PDF Page 13]

push
Go State
Go
timer
Gostate:
moV IØ,#Ø3H ; IØ =state 3
setb pl.4
clr P1.3
clr pl.2
clr P1.1
setb pl.0
mov rl, #Ø5 ; deley 5ø usec
timer:
call delay
dinz rl, timer
sjmp Waitstate



![Figure [Slide 13 Diagram]: push](images/fig_013_slide_diagram.png)
*Description*: Engineering Schematic & Technical Figure [push]: Illustrates physical machine construction, magnetic flux paths, electrical equivalent circuits, phasor relationships, or operational characteristic curves. [Labels & Elements: push; Go State; Go; timer; GoState:; mOV IØ,#03H ; IØ =state 3; setb pl.4; clr P1.3].

> **Figure [Slide 13 Diagram]: push**




<!-- Page 14 -->
### [PDF Page 14]

Wait State
timer
Wait
push
WaitState:
mov IØ,#Ø4H ; IØ =state 4
clr pl.4
olr P1.3
setb p1.2
setb P1.1
clr pl.ø
mov r1, #Ø5 ; deley 5ø usec
timerw:
call delay
dinz rl, timerw
simp readystate



![Figure [Slide 14 Diagram]: Wait State](images/fig_014_slide_diagram.png)
*Description*: Engineering Schematic & Technical Figure [Wait State]: Illustrates physical machine construction, magnetic flux paths, electrical equivalent circuits, phasor relationships, or operational characteristic curves. [Labels & Elements: Wait State; timer; Wait; push; Waitstate:; moV Iø, #Ø4H ; Iø =state 4; clr pl.4; CLI P1.3].

> **Figure [Slide 14 Diagram]: Wait State**



