; ==============================================================================
; SLIDING_DOOR_V2.asm
; Official Firmware: Single-Panel Residential Sliding Door with Photoelectric
; Obstacle Detection and Automatic Reopening (Version 2 Final Submission)
;
; Course: 305341 Embedded Systems 1
; Authors: Theeraphat Phuraya, Pranpriya Sriyong
; Instructor: Dr. Saengchai Mangkornthong
; Target: Classic 8051 / AT89S52 @ 12.000 MHz (12T, 1 machine cycle = 1 us)
; Assembler / Simulator: EdSim51 2.1.39 / A51
; ==============================================================================
;
; PORT CONTRACT:
; P0: State Code Display (P0.2..P0.0 = State 0..7). Open-drain, requires 10k pull-ups.
;     P0 = F8H OR state index.
;
; P1: Actuator and Indicator Port (Active-low indicators and enable)
;     P1.0 = IN1      (L293D pin 2)
;     P1.1 = IN2      (L293D pin 7)
;     P1.2 = RUN_N    (Active-low run signal; inverted by SN74HCT14 -> L293D EN1)
;                     RUN_N = 1 -> EN = 0 (Motor Coast / Disconnected)
;                     RUN_N = 0 -> EN = 1 (Motor Driven)
;     P1.3 = Reserved (Always 1)
;     P1.4 = RED_N    (Red LED: 0 = ON, 1 = OFF)
;     P1.5 = GREEN_N  (Green LED: 0 = ON, 1 = OFF)
;     P1.6 = ORANGE_N (Orange LED: 0 = ON, 1 = OFF)
;     P1.7 = Reserved (Always 1)
;
; P1 EXACT VALUES PER STATE:
;     CLOSED      : 1110 1100B = ECH (STOP, RED ON)
;     OPENING     : 1101 1001B = D9H (CW, GREEN ON)
;     OPEN_HOLD   : 1101 1100B = DCH (STOP, GREEN ON)
;     CLOSING     : 1110 1010B = EAH (CCW, RED ON)
;     REV_WAIT    : 1111 1100B = FCH (Coast, All LEDs OFF)
;     REOPENING   : 1101 1001B = D9H (CW, GREEN ON)
;     SAFETY_HOLD : 1011 1100B = BCH (STOP, ORANGE ON)
;     FAULT       : 1111 1100B = FCH (Coast, All LEDs OFF)
;
; P2: Input Sensor and Button Port (Latch initialized to FFH once at startup)
;     P2.0 = PB_IN    (Push button inside, NO: 0 = pressed)
;     P2.1 = PB_OUT   (Push button outside, NO: 0 = pressed)
;     P2.2 = BEAM_DET (Through-Beam Omron E3Z-T61 + Optocoupler + 74HCT14:
;                      1 = Beam Clear, 0 = Obstacle / Beam Interrupted)
;     P2.3 = LO       (Limit Open switch, NO: 0 = fully open)
;     P2.4 = LC       (Limit Closed switch, NO: 0 = fully closed)
;     P2.5 = PB_CLOSE (Push button close, NO: 0 = pressed, pin 26)
;     P2.6 = Unused   (External pull-up)
;     P2.7 = ESTOP    (Emergency stop, NC contact: 0 = healthy, 1 = tripped/open)
;
; BIT ALLOCATIONS:
;     20H.0 = SAFETY_SEEN (1 if reversal was triggered by photoelectric beam)
;     20H.1 = CLOSE_ARMED (1 if PB_CLOSE was observed released for >= 20 ms)
;
; TIMING SPECIFICATION:
;     Delay subroutine = 20 ms using Timer 0 Mode 1 (16-bit)
;     Preload = B1E0H (65536 - 20000 = 45536 = B1E0H @ 12 MHz)
;     Button Debounce = 1 x 20 ms = 20 ms
;     Coast Interval  = 10 x 20 ms = 200 ms minimum before reversal
;     Travel Timeout  = 250 x 20 ms = 5.00 s maximum per travel stroke
; ==============================================================================

                ORG     0000H
                LJMP    MAIN

                ORG     0030H
MAIN:
                ; Step 1: Initialize hardware ports and latches
                MOV     P2, #0FFH               ; Configure P2 as input port
                SETB    P1.2                   ; Immediately disable motor driver
                MOV     P1, #0ECH               ; Default to safe STOP, RED indicator
                MOV     P0, #0F8H               ; State 0 monitor
                CLR     20H.0                   ; Clear SAFETY_SEEN flag
                CLR     20H.1                   ; Clear CLOSE_ARMED flag

                ; Step 2: Configure Timer 0 Mode 1 (16-bit software polled timer)
                MOV     TMOD, #01H

                ; Step 3: Initial 20 ms settle time and endpoint verification
                LCALL   DELAY_20MS
                JB      P2.7, JUMP_FAULT        ; E-stop active -> Fault
                JNB     P2.3, CHECK_LO_LC       ; LO active? Check for conflict
                JNB     P2.4, ENTER_CLOSED      ; LC active -> Start in CLOSED state

JUMP_FAULT:
                LJMP    STATE_FAULT             ; Neither limit hit -> Unknown position, go FAULT

CHECK_LO_LC:
                JNB     P2.4, JUMP_FAULT        ; Both LO and LC hit simultaneously -> Fault!
                LJMP    STATE_OPEN_HOLD         ; At open limit -> Start in OPEN_HOLD state

ENTER_CLOSED:
                LJMP    STATE_CLOSED

; ==============================================================================
; STATE 0: CLOSED (Door fully closed, awaiting opening request)
; P0 = F8H, P1 = ECH (STOP, RED ON)
; ==============================================================================
STATE_CLOSED:
                SETB    P1.2                    ; Ensure drive is disabled
                MOV     P0, #0F8H               ; State 0
                MOV     P1, #0ECH               ; ECH: STOP, RED ON
                CLR     20H.0                   ; Reset safety seen flag

CLOSED_LOOP:
                JB      P2.7, CLOSED_TO_FAULT   ; E-stop tripped
                JB      P2.4, CLOSED_TO_FAULT   ; LC lost unexpectedly while stationary
                JNB     P2.0, CLOSED_DEBOUNCE   ; PB_IN pressed
                JNB     P2.1, CLOSED_DEBOUNCE   ; PB_OUT pressed
                SJMP    CLOSED_LOOP

CLOSED_DEBOUNCE:
                LCALL   DELAY_20MS              ; 20 ms debounce window
                JB      P2.7, CLOSED_TO_FAULT
                JNB     P2.0, CLOSED_GO_OPEN
                JNB     P2.1, CLOSED_GO_OPEN
                SJMP    CLOSED_LOOP             ; Glitch rejected

CLOSED_GO_OPEN:
                LJMP    STATE_OPENING

CLOSED_TO_FAULT:
                LJMP    STATE_FAULT

; ==============================================================================
; STATE 1: OPENING (Motor rotating CW, moving toward open limit LO)
; P0 = F9H, P1 = D9H (Motor CW, GREEN ON)
; ==============================================================================
STATE_OPENING:
                SETB    P1.2                    ; Interlock: disable drive before setting direction
                MOV     P0, #0F9H               ; State 1
                MOV     P1, #0DDH               ; Pre-load CW (IN1=1, IN2=0) with RUN_N=1
                CLR     P1.2                    ; Enable CW drive (P1 = D9H)
                MOV     R7, #250                ; Travel timeout countdown: 250 x 20 ms = 5.0 s

OPENING_LOOP:
                JB      P2.7, OPENING_TO_FAULT  ; E-stop tripped -> FAULT
                JNB     P2.3, OPENING_REACHED_LO ; Reached LO limit -> OPEN_HOLD
                LCALL   DELAY_20MS
                DJNZ    R7, OPENING_LOOP

                ; Timeout elapsed (> 5.0 s) without reaching LO
OPENING_TO_FAULT:
                LJMP    STATE_FAULT

OPENING_REACHED_LO:
                LJMP    STATE_OPEN_HOLD

; ==============================================================================
; STATE 2: OPEN_HOLD (Door stationary at open position, manual close required)
; P0 = FAH, P1 = DCH (STOP, GREEN ON)
; NOTE: No automatic-close timer exists. Requires manual press of PB_CLOSE.
; ==============================================================================
STATE_OPEN_HOLD:
                SETB    P1.2                    ; Cut motor drive
                MOV     P0, #0FAH               ; State 2
                MOV     P1, #0DCH               ; DCH: STOP, GREEN ON
                CLR     20H.1                   ; CLOSE_ARMED = 0 (must observe release first)

OPEN_HOLD_LOOP:
                JB      P2.7, HOLD_TO_FAULT     ; E-stop tripped -> FAULT
                JB      P2.3, HOLD_TO_FAULT     ; Door drifted away from LO -> FAULT

                ; Check PB_CLOSE release qualification (>= 20 ms)
                JB      P2.5, HOLD_ARM_CLOSE    ; PB_CLOSE is high (released)
                CLR     20H.1                   ; Still held low -> not armed
                SJMP    HOLD_CHECK_PRESS

HOLD_ARM_CLOSE:
                SETB    20H.1                   ; PB_CLOSE observed released

HOLD_CHECK_PRESS:
                ; If armed, check for a fresh valid press of PB_CLOSE
                JNB     20H.1, OPEN_HOLD_LOOP   ; Not armed yet, ignore
                JNB     P2.5, HOLD_DEBOUNCE_CLOSE
                SJMP    OPEN_HOLD_LOOP

HOLD_DEBOUNCE_CLOSE:
                LCALL   DELAY_20MS              ; Filter debounce 20 ms
                JB      P2.7, HOLD_TO_FAULT
                JB      P2.5, OPEN_HOLD_LOOP    ; Glitch / released early

                ; Qualify safety preconditions:
                ; 1. BEAM_DET must be 1 (Beam clear)
                ; 2. PB_IN and PB_OUT must be released (high)
                JNB     P2.2, OPEN_HOLD_LOOP    ; Beam interrupted -> discard command
                JNB     P2.0, OPEN_HOLD_LOOP    ; PB_IN still held -> discard
                JNB     P2.1, OPEN_HOLD_LOOP    ; PB_OUT still held -> discard

                ; Preconditions met -> Transition to CLOSING
                CLR     20H.0                   ; SAFETY_SEEN = 0
                LJMP    STATE_CLOSING

HOLD_TO_FAULT:
                LJMP    STATE_FAULT

; ==============================================================================
; STATE 3: CLOSING (Motor rotating CCW, moving toward closed limit LC)
; P0 = FBH, P1 = EAH (Motor CCW, RED ON)
; PRIORITY: BEAM_DET > Open Buttons > LC Limit > Travel Timeout
; ==============================================================================
STATE_CLOSING:
                SETB    P1.2                    ; Interlock: disable drive before setting direction
                MOV     P0, #0FBH               ; State 3
                MOV     P1, #0EEH               ; Pre-load CCW (IN1=0, IN2=1) with RUN_N=1
                CLR     P1.2                    ; Enable CCW drive (P1 = EAH)
                MOV     R7, #250                ; Travel timeout countdown: 250 x 20 ms = 5.0 s

CLOSING_LOOP:
                ; Priority 0: Emergency stop
                JB      P2.7, CLOSING_TO_FAULT

                ; Priority 1: Photoelectric Obstacle Detection (BEAM_DET = 0)
                JNB     P2.2, CLOSING_OBSTACLE

                ; Priority 2: Manual reopen buttons pressed
                JNB     P2.0, CLOSING_MANUAL_REOPEN
                JNB     P2.1, CLOSING_MANUAL_REOPEN

                ; Priority 3: Reached closed limit (LC = 0)
                JNB     P2.4, CLOSING_REACHED_LC

                LCALL   DELAY_20MS
                DJNZ    R7, CLOSING_LOOP

                ; Timeout elapsed (> 5.0 s) without reaching LC
CLOSING_TO_FAULT:
                LJMP    STATE_FAULT

CLOSING_OBSTACLE:
                ; Safe Cut-off sequence:
                SETB    P1.2                    ; 1. Immediately cut motor enable
                MOV     P1, #0FCH               ; 2. All indicators off, high-Z coast
                SETB    20H.0                   ; 3. Latch SAFETY_SEEN = 1
                LJMP    STATE_REV_WAIT          ; 4. Enter coast interval

CLOSING_MANUAL_REOPEN:
                ; Manual Reopen sequence:
                SETB    P1.2                    ; 1. Cut motor enable
                MOV     P1, #0FCH               ; 2. Coast
                CLR     20H.0                   ; 3. Latch SAFETY_SEEN = 0 (manual request)
                LJMP    STATE_REV_WAIT

CLOSING_REACHED_LC:
                LJMP    STATE_CLOSED

; ==============================================================================
; STATE 4: REV_WAIT (Motor coasting for >= 200 ms to damp kinetic energy)
; P0 = FCH, P1 = FCH (Motor Coast, All LEDs OFF)
; ==============================================================================
STATE_REV_WAIT:
                SETB    P1.2                    ; Redundant motor drive cut
                MOV     P0, #0FCH               ; State 4
                MOV     P1, #0FCH               ; FCH: Coast, LEDs OFF
                MOV     R6, #10                 ; 10 x 20 ms = 200 ms coast delay

REV_WAIT_LOOP:
                JB      P2.7, REV_TO_FAULT      ; E-stop must be monitored during coast
                LCALL   DELAY_20MS
                DJNZ    R6, REV_WAIT_LOOP

                ; Coast complete -> proceed to REOPENING
                LJMP    STATE_REOPENING

REV_TO_FAULT:
                LJMP    STATE_FAULT

; ==============================================================================
; STATE 5: REOPENING (Motor rotating CW, moving back to LO limit)
; P0 = FDH, P1 = D9H (Motor CW, GREEN ON)
; ==============================================================================
STATE_REOPENING:
                SETB    P1.2                    ; Interlock: cut drive before changing direction
                MOV     P0, #0FDH               ; State 5
                MOV     P1, #0DDH               ; Pre-load CW direction while RUN_N=1
                CLR     P1.2                    ; Enable CW drive (P1 = D9H)
                MOV     R7, #250                ; Travel timeout countdown: 250 x 20 ms = 5.0 s

REOPENING_LOOP:
                JB      P2.7, REOPEN_TO_FAULT   ; E-stop tripped
                JNB     P2.3, REOPEN_REACHED_LO ; Reached LO limit switch
                LCALL   DELAY_20MS
                DJNZ    R7, REOPENING_LOOP

                ; Timeout elapsed (> 5.0 s)
REOPEN_TO_FAULT:
                LJMP    STATE_FAULT

REOPEN_REACHED_LO:
                ; Destination selection based on SAFETY_SEEN:
                JB      20H.0, GOTO_SAFETY_HOLD ; Obstacle occurred -> SAFETY_HOLD
                LJMP    STATE_OPEN_HOLD         ; Manual reopen -> OPEN_HOLD

GOTO_SAFETY_HOLD:
                LJMP    STATE_SAFETY_HOLD

; ==============================================================================
; STATE 6: SAFETY_HOLD (Door stationary at LO after obstacle; ORANGE LED ON)
; P0 = FEH, P1 = BCH (STOP, ORANGE ON)
; NOTE: Requires human verification. User must release PB_CLOSE for >= 20 ms,
;       ensure threshold is clear (BEAM_DET=1), and press PB_CLOSE anew.
; ==============================================================================
STATE_SAFETY_HOLD:
                SETB    P1.2                    ; Cut motor drive
                MOV     P0, #0FEH               ; State 6
                MOV     P1, #0BCH               ; BCH: STOP, ORANGE ON
                CLR     20H.1                   ; Clear CLOSE_ARMED (must observe release)

SAFETY_HOLD_LOOP:
                JB      P2.7, SAFETY_TO_FAULT   ; E-stop tripped -> FAULT
                JB      P2.3, SAFETY_TO_FAULT   ; Door drifted away from LO -> FAULT

                ; Check PB_CLOSE release qualification (>= 20 ms after entry)
                JB      P2.5, SAFETY_ARM_CLOSE  ; PB_CLOSE is high (released)
                CLR     20H.1                   ; Still held low
                SJMP    SAFETY_CHECK_PRESS

SAFETY_ARM_CLOSE:
                SETB    20H.1                   ; Observed released for >= 20 ms

SAFETY_CHECK_PRESS:
                JNB     20H.1, SAFETY_HOLD_LOOP ; Not armed yet, ignore
                JNB     P2.5, SAFETY_DEBOUNCE_CLOSE
                SJMP    SAFETY_HOLD_LOOP

SAFETY_DEBOUNCE_CLOSE:
                LCALL   DELAY_20MS              ; Filter debounce 20 ms
                JB      P2.7, SAFETY_TO_FAULT
                JB      P2.5, SAFETY_HOLD_LOOP  ; Glitch / released early

                ; Preconditions for re-closing:
                ; 1. BEAM_DET must be 1 (Beam clear)
                ; 2. PB_IN and PB_OUT must be released
                JNB     P2.2, SAFETY_HOLD_LOOP  ; Beam interrupted -> reject close command
                JNB     P2.0, SAFETY_HOLD_LOOP  ; PB_IN held -> reject
                JNB     P2.1, SAFETY_HOLD_LOOP  ; PB_OUT held -> reject

                ; All clear -> Start closing and clear safety flag
                CLR     20H.0                   ; SAFETY_SEEN = 0
                LJMP    STATE_CLOSING

SAFETY_TO_FAULT:
                LJMP    STATE_FAULT

; ==============================================================================
; STATE 7: FAULT (Hardware trip, timeout, or sensor conflict; SYSTEM HALTED)
; P0 = FFH, P1 = FCH (Motor Coast, All LEDs OFF / Safe condition)
; ==============================================================================
STATE_FAULT:
                SETB    P1.2                    ; Disconnect motor drive immediately
                MOV     P0, #0FFH               ; State 7
                MOV     P1, #0FCH               ; FCH: All outputs safe

FAULT_LOOP:
                ; Wait until E-stop is healthy and PB_CLOSE is pressed to reset
                JB      P2.7, FAULT_LOOP        ; Still in E-stop condition
                JNB     P2.5, FAULT_RESET_CHECK ; User pressed PB_CLOSE to attempt reset
                SJMP    FAULT_LOOP

FAULT_RESET_CHECK:
                LCALL   DELAY_20MS
                JB      P2.5, FAULT_LOOP        ; Glitch
                ; Return to MAIN to verify endpoints and re-initialize
                LJMP    MAIN

; ==============================================================================
; SUBROUTINE: DELAY_20MS
; Generates an accurate 20,000 us (20 ms) time delay using Timer 0 in Mode 1.
; Clock: 12.000 MHz -> 1 machine cycle = 1 us.
; 65,536 - 20,000 = 45,536 = B1E0H.
; ==============================================================================
DELAY_20MS:
                CLR     TR0                     ; Stop Timer 0
                MOV     TH0, #0B1H              ; Load high byte (B1H)
                MOV     TL0, #0E0H              ; Load low byte (E0H)
                CLR     TF0                     ; Clear overflow flag
                SETB    TR0                     ; Start Timer 0

DELAY_WAIT:
                JNB     TF0, DELAY_WAIT         ; Poll until timer overflows (20 ms)
                CLR     TR0                     ; Stop Timer 0
                CLR     TF0                     ; Clear overflow flag
                RET

                END
