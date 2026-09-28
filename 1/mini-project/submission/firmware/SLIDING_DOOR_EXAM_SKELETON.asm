; ==============================================================================
; SLIDING_DOOR_EXAM_SKELETON.asm
; Compact, High-Scoring 8051 Assembly Skeleton for Exam Paper (305341 Final Q56)
; Architecture: 7-State Moore FSM with Obstacle Reversal & Safe Coast Window
; Length: ~85 lines (Optimized for hand-writing under 15 minutes)
; ==============================================================================
; Port Mapping:
;   P2.0: PB_IN (0=press), P2.1: PB_OUT (0=press), P2.2: BEAM_DET (0=obstacle)
;   P2.3: LO (0=open limit), P2.4: LC (0=close limit), P2.5: PB_CLOSE (0=press)
;   P1.0: IN1, P1.1: IN2, P1.2: RUN_N (0=drive, 1=coast via SN74HCT14 inverter)
;   P1.4: RED_N, P1.5: GREEN_N, P1.6: ORANGE_N (0=ON)
; State Outputs:
;   CLOSED=ECH, OPENING=D9H, OPEN_HOLD=DCH, CLOSING=EAH, REV_WAIT=FCH,
;   REOPENING=D9H, SAFETY_HOLD=BCH
; ==============================================================================

            ORG     0000H
            LJMP    MAIN

            ORG     0030H
MAIN:
            MOV     P2, #0FFH           ; Configure P2 as input
            SETB    P1.2                ; Disable motor drive
            MOV     P1, #0ECH           ; Start in CLOSED (P1=ECH: Red ON)
            CLR     20H.0               ; 20H.0 = SAFETY_SEEN flag

; ---------- STATE 0: CLOSED ----------
S_CLOSED:
            MOV     P1, #0ECH           ; Red LED ON, Motor STOP
WAIT_OPEN:
            JNB     P2.0, DO_OPEN       ; Inside button pressed
            JNB     P2.1, DO_OPEN       ; Outside button pressed
            SJMP    WAIT_OPEN
DO_OPEN:
            LCALL   DELAY_20MS          ; Debounce
            JNB     P2.0, S_OPENING
            JNB     P2.1, S_OPENING
            SJMP    WAIT_OPEN

; ---------- STATE 1: OPENING ----------
S_OPENING:
            SETB    P1.2                ; Interlock: cut drive before CW
            MOV     P1, #0D9H           ; CW rotation, Green LED ON
WAIT_LO:
            JNB     P2.3, S_OPEN_HOLD   ; Reached Limit Open (LO)
            SJMP    WAIT_LO

; ---------- STATE 2: OPEN_HOLD ----------
S_OPEN_HOLD:
            SETB    P1.2
            MOV     P1, #0DCH           ; Motor STOP, Green LED ON
WAIT_CLOSE:
            JNB     P2.5, CHECK_CLOSE   ; PB_CLOSE pressed
            SJMP    WAIT_CLOSE
CHECK_CLOSE:
            LCALL   DELAY_20MS          ; Debounce
            JB      P2.5, WAIT_CLOSE    ; Noise rejection
            JNB     P2.2, WAIT_CLOSE    ; Beam interrupted -> reject close command
            SJMP    S_CLOSING

; ---------- STATE 3: CLOSING ----------
S_CLOSING:
            SETB    P1.2                ; Interlock: cut drive before CCW
            MOV     P1, #0EAH           ; CCW rotation, Red LED ON
CLOSE_LOOP:
            ; Check safety beam first (Obstacle detection)
            JNB     P2.2, OBSTACLE_HIT  ; Beam broken (0) -> Reversal!
            ; Check manual reopen request
            JNB     P2.0, MANUAL_REOPEN
            JNB     P2.1, MANUAL_REOPEN
            ; Check closed limit
            JNB     P2.4, S_CLOSED      ; Fully closed
            SJMP    CLOSE_LOOP

OBSTACLE_HIT:
            SETB    20H.0               ; Latch SAFETY_SEEN = 1
            SJMP    DO_REV_WAIT
MANUAL_REOPEN:
            CLR     20H.0               ; SAFETY_SEEN = 0
DO_REV_WAIT:
            SETB    P1.2                ; Cut drive immediately!
            MOV     P1, #0FCH           ; LEDs off, High-Z Coast
            SJMP    S_REV_WAIT

; ---------- STATE 4: REV_WAIT (Coast >= 200 ms) ----------
S_REV_WAIT:
            MOV     R6, #10             ; 10 x 20 ms = 200 ms
COAST_LOOP:
            LCALL   DELAY_20MS
            DJNZ    R6, COAST_LOOP
            SJMP    S_REOPENING

; ---------- STATE 5: REOPENING ----------
S_REOPENING:
            SETB    P1.2                ; Interlock before CW
            MOV     P1, #0D9H           ; CW rotation, Green LED ON
WAIT_REOPEN_LO:
            JNB     P2.3, REOPEN_DONE   ; Reached LO
            SJMP    WAIT_REOPEN_LO
REOPEN_DONE:
            JB      20H.0, S_SAFETY_HOLD ; If obstacle triggered -> SAFETY_HOLD
            SJMP    S_OPEN_HOLD         ; If manual button triggered -> OPEN_HOLD

; ---------- STATE 6: SAFETY_HOLD ----------
S_SAFETY_HOLD:
            SETB    P1.2
            MOV     P1, #0BCH           ; Motor STOP, Orange LED ON
WAIT_SAFE_REL:
            JB      P2.5, WAIT_SAFE_PRESS ; Must observe PB_CLOSE released
            SJMP    WAIT_SAFE_REL
WAIT_SAFE_PRESS:
            JNB     P2.5, DO_SAFE_CLOSE ; Fresh press
            SJMP    WAIT_SAFE_PRESS
DO_SAFE_CLOSE:
            LCALL   DELAY_20MS
            JB      P2.5, WAIT_SAFE_PRESS
            JNB     P2.2, WAIT_SAFE_PRESS ; Beam must be clear
            CLR     20H.0               ; Clear safety flag
            SJMP    S_CLOSING

; ---------- TIMER 0 DELAY (20 ms @ 12 MHz) ----------
DELAY_20MS:
            MOV     TMOD, #01H          ; Timer 0 Mode 1 (16-bit)
            CLR     TR0
            MOV     TH0, #0B1H          ; B1E0H = 65536 - 20000
            MOV     TL0, #0E0H
            CLR     TF0
            SETB    TR0
WAIT_TF:    JNB     TF0, WAIT_TF
            CLR     TR0
            CLR     TF0
            RET

            END
