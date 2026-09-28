; Q56 study reference. Original submission files remain unchanged.
; AT89S52, 12 MHz, 12T. EdSim51 syntax.
; R0=state, R1=desired P1, R5=expected PB_CLOSE level,
; R6=coast periods, R7=stroke periods.
; 20H.0=SAFETY_SEEN, 20H.1=CLOSE_ARMED.
; PB_IN=P2.0, PB_OUT=P2.1, BEAM=P2.2, LO=P2.3,
; LC=P2.4, PB_CLOSE=P2.5, ESTOP=P2.7.
                ORG 0000H
                LJMP INIT
                ORG 0030H
INIT:
                SETB P1.2
                MOV P1,#0FCH
                MOV SP,#2FH
                MOV P2,#0FFH
                MOV TMOD,#01H
                CLR 20H.0
                CLR 20H.1
                MOV R0,#7
                LCALL DELAY_20MS
                JNB P2.3,BOOT_OPEN
                JNB P2.4,CLOSED
                LJMP FAULT
BOOT_OPEN:
                JNB P2.4,BOOT_BAD
                LJMP OPEN_HOLD
BOOT_BAD:
                LJMP FAULT
CLOSED:
                MOV A,#0
                LCALL ENTER
                CLR 20H.0
WAIT_OPEN:
                LCALL CHECK
                JNB P2.0,FILTER_OPEN
                JNB P2.1,FILTER_OPEN
                SJMP WAIT_OPEN
FILTER_OPEN:
                LCALL DELAY_20MS
                JNC WAIT_OPEN
OPENING:
                MOV A,#1
                LCALL ENTER
                SJMP MOVE_OPEN
REOPENING:
                MOV A,#5
                LCALL ENTER
MOVE_OPEN:
                MOV R7,#250
OPEN_LOOP:
                LCALL DELAY_20MS
                JNB P2.3,OPEN_END
                DJNZ R7,OPEN_LOOP
                LJMP FAULT
OPEN_END:
                SETB P1.2
                CJNE R0,#5,OPEN_HOLD
                JB 20H.0,SAFETY_HOLD
OPEN_HOLD:
                MOV A,#2
                SJMP HOLD_ENTRY
SAFETY_HOLD:
                MOV A,#6
HOLD_ENTRY:
                LCALL ENTER
RELEASE_CLOSE:
                CLR 20H.1
                MOV R5,#1
                LCALL STABLE_CLOSE
                JNC RELEASE_CLOSE
                SETB 20H.1
NEW_CLOSE:
                LCALL CHECK
                JB P2.5,NEW_CLOSE
                JNB P2.2,RELEASE_CLOSE
                JNB P2.0,RELEASE_CLOSE
                JNB P2.1,RELEASE_CLOSE
                MOV R5,#0
                LCALL STABLE_CLOSE
                JNC RELEASE_CLOSE
                CLR 20H.1
                CLR 20H.0
CLOSING:
                MOV A,#3
                LCALL ENTER
                MOV R7,#250
                LCALL TIMER_START
CLOSE_LOOP:
                LCALL CHECK
                JNB P2.2,OBSTACLE
                JNB P2.0,MANUAL_OPEN
                JNB P2.1,MANUAL_OPEN
                JNB P2.4,CLOSE_END
                JNB TF0,CLOSE_LOOP
                DJNZ R7,CLOSE_NEXT
                LJMP FAULT
CLOSE_NEXT:
                LCALL TIMER_START
                SJMP CLOSE_LOOP
CLOSE_END:
                SETB P1.2
                LJMP CLOSED
OBSTACLE:
                SETB P1.2
                MOV P1,#0FCH
                SETB 20H.0
                SJMP REV_WAIT
MANUAL_OPEN:
                SETB P1.2
                MOV P1,#0FCH
                CLR 20H.0
REV_WAIT:
                MOV A,#4
                LCALL ENTER
                MOV R6,#10
COAST_LOOP:
                LCALL DELAY_20MS
                DJNZ R6,COAST_LOOP
                LJMP REOPENING
FAULT:
                SETB P1.2
                MOV P1,#0FCH
                MOV SP,#2FH
                MOV A,#7
                LCALL ENTER
; Abandon pending calls on a global trip. Reset stack before a manual restart.
FAULT_RELEASE:
                JB P2.7,FAULT_RELEASE
                MOV R5,#1
                LCALL STABLE_CLOSE
                JNC FAULT_RELEASE
FAULT_PRESS:
                MOV R5,#0
                LCALL STABLE_CLOSE
                JNC FAULT_PRESS
                LJMP INIT

; ENTER(A): disable, set P0, preload direction while disabled, apply P1.
; No instruction changes direction while drive is enabled.
ENTER:
                SETB P1.2
                MOV R0,A
                ORL A,#0F8H
                MOV P0,A
                MOV A,R0
                MOV DPTR,#P1_TABLE
                MOVC A,@A+DPTR
                MOV R1,A
                ORL A,#04H
                MOV P1,A
                MOV P1,R1
                RET
P1_TABLE:
                DB 0ECH,0D9H,0DCH,0EAH,0FCH,0D9H,0BCH,0FCH

; CHECK: global trip and stationary endpoint checks.
; FAULT is a non-returning exit, so it resets SP before accepting a reset.
CHECK:
                JB P2.7,TRIP
                MOV A,P2
                ANL A,#18H
                JZ TRIP
                CJNE R0,#0,CHECK_HOLD
                JB P2.4,TRIP
CHECK_HOLD:
                CJNE R0,#2,CHECK_SAFETY
                JB P2.3,TRIP
CHECK_SAFETY:
                CJNE R0,#6,CHECK_END
                JB P2.3,TRIP
CHECK_END:
                RET
TRIP:
                LJMP FAULT

TIMER_START:
                CLR TR0
                MOV TH0,#0B1H
                MOV TL0,#0E0H
                CLR TF0
                SETB TR0
                RET

; 20 ms timer window, with safety polling throughout.
; C=1: full period elapsed. C=0: button changed or motion event needs service.
DELAY_20MS:
                LCALL TIMER_START
D_WAIT:
                LCALL CHECK
                CJNE R0,#0,D_OPEN
                JNB P2.0,D_TIME
                JNB P2.1,D_TIME
                SJMP D_ABORT
D_OPEN:
                CJNE R0,#1,D_REOPEN
                JNB P2.3,D_ABORT
                SJMP D_TIME
D_REOPEN:
                CJNE R0,#5,D_TIME
                JNB P2.3,D_ABORT
D_TIME:
                JNB TF0,D_WAIT
D_DONE:
                CLR TR0
                CLR TF0
                SETB C
                RET
D_ABORT:
                CLR TR0
                CLR C
                RET

; PB_CLOSE must remain R5 (0 or 1) throughout a complete 20 ms window.
; Reject a close press immediately if beam/open-button guards become invalid.
STABLE_CLOSE:
                LCALL TIMER_START
B_WAIT:
                LCALL CHECK
                MOV A,R5
                JZ EXPECT_LOW
                JNB P2.5,D_ABORT
                SJMP B_TIME
EXPECT_LOW:
                JB P2.5,D_ABORT
                CJNE R0,#7,PRESS_GUARD
                SJMP B_TIME
PRESS_GUARD:
                JNB P2.2,D_ABORT
                JNB P2.0,D_ABORT
                JNB P2.1,D_ABORT
B_TIME:
                JNB TF0,B_WAIT
                SJMP D_DONE
                END
