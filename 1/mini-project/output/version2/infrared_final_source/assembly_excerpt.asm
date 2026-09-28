; AT89S52 state-handler excerpt, not a complete assembled firmware image.
; Preconditions: P2 input latch = FFH. P1.3 and P1.7 remain HIGH.
; MAIN checks ESTOP and fault before dispatching this handler.
; SAFETY_SEEN is a bit allocated by the full firmware.
;
; Required contracts for routines implemented by the full firmware:
; ENTER_REV_WAIT: set state, start >=200 ms timer, return without blocking.
; CHECK_OPEN_EVENT: C=1 for a new debounced PB_IN/PB_OUT press, else C=0.
; Enter_Manual_Reopen: disable drive, clear SAFETY_SEEN, start REV_WAIT.
; Enter_Closed: disable drive before applying P1_CLOSED, update state.
; MAIN: services debounce, coast timer, limits, E-stop and travel timeout.

P1_CLOSED       EQU 0ECH
P1_OPENING      EQU 0D9H
P1_OPEN_HOLD    EQU 0DCH
P1_CLOSING      EQU 0EAH
P1_REV_WAIT     EQU 0FCH
P1_REOPENING    EQU 0D9H
P1_SAFETY_HOLD  EQU 0BCH

ClosingLoop:
    JB    P2.2, CheckCloseLimit
    SETB  P1.2
    MOV   P1, #P1_REV_WAIT
    SETB  SAFETY_SEEN
    LCALL ENTER_REV_WAIT
    LJMP  MAIN

CheckCloseLimit:
    LCALL CHECK_OPEN_EVENT
    JC    Enter_Manual_Reopen
    JNB   P2.4, Enter_Closed
    LJMP  MAIN

; After the >=200 ms coast interval, and only if the fault supervisor permits:
;    MOV  P1, #0DDH       ; CW direction prepared while RUN_N=1
;    CLR  P1.2           ; enable CW drive, final P1=D9H
; LO=0 completes reopening. SAFETY_SEEN=1 selects SAFETY_HOLD.
; A SAFETY_HOLD close requires release >=20 ms AFTER hold entry,
; a fresh debounced press, BEAM_DET=1, and both open buttons released.
