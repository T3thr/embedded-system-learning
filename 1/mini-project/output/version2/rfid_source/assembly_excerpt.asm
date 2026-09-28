; RFID v2: teaching excerpt, not a complete assembled firmware image.
; AT89S52 classic 12T, 12.000 MHz.
; Call this only while STATE=CLOSING after the global ESTOP/limit checks.
; MAIN performs a non-blocking poll of RFID_DET, limits, button events,
; travel timeout, and the latched software fault.
; P1.3/P1.7 remain 1. LEDs sink current: 0=on.
;
; Required interfaces for the complete firmware:
; RFID_SEEN: bit variable, 1 only when RFID caused reversal.
; ENTER_REV_WAIT: STATE=REV_WAIT, elapsed=0. Must not block for 200ms.
; CHECK_OPEN_EVENT: C=1 on one debounced new PB_IN/PB_OUT press.
; REVERSE_MANUAL: SETB P1.2; MOV P1,#0FCH; CLR RFID_SEEN;
;                 ENTER_REV_WAIT; SJMP MAIN.
; ENTER_CLOSED: disable EN first, then STATE=CLOSED, MOV P1,#0ECH.
; Timer0 mode1 proposed 1ms preload FC18H; ISR latency must be measured.
; PB_CLOSE release/press filter takes 20 stable samples of a 1ms tick.
; No routine may close the door just because an elapsed timer expires.

ClosingLoop:
    JB   P2.2,CheckOpen
    SETB P1.2
    MOV  P1,#0FCH
    SETB RFID_SEEN
    LCALL ENTER_REV_WAIT
    SJMP MAIN

CheckOpen:
    LCALL CHECK_OPEN_EVENT
    JC   REVERSE_MANUAL
    JNB  P2.4,ENTER_CLOSED
    SJMP MAIN

; State outputs (P1 bit order 7..0):
; CLOSED     EC = 11101100
; OPENING    D9 = 11011001
; OPEN_HOLD  DC = 11011100
; CLOSING    EA = 11101010
; REV_WAIT   FC = 11111100
; REOPENING  D9 = 11011001
; RFID_HOLD  BC = 10111100
