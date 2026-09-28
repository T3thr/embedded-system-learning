; SLIDING_DOOR.asm -- classic 8051 / EdSim51, 12 MHz, 12 clocks/cycle.
; Only this firmware file is owned by this implementation.
;
; PORT CONTRACT (do not connect a motor directly to the MCU):
; P0 = F8H OR state (0..7). Fit external 10k pullups on open-drain P0.
; P1.0=IN1, P1.1=IN2, P1.2=RUN_N. External inversion drives L293D EN.
; RUN_N=1 disables EN, including the MCU's reset-high port condition.
; P1.4=RED_N, P1.5=GREEN_N, P1.7=BUZZ_N are active low.
; Reserved P1.3 and P1.6 always remain high.
; State: INIT CLOSED OPENING HOLD CLOSING REV_WAIT REOPEN FAULT
; P1:     EC     FC      D9   DC      6A       6C     69    6C
; P2 latch is written FFH once and NEVER modified afterward:
; .0 inside / .1 outside request, .3 LO, .4 LC, .6 reset: NO, active 0.
; .2 lower / .5 upper beam: 0=healthy clear, 1=blocked/unpowered/open.
; .7 NC emergency chain: 0=healthy, 1=unsafe/disconnected.
;
; TIMING / SCHEDULING:
; Timer0 mode 2: TH0=TL0=06H, 250 machine cycles = 250 us/overflow.
; Divide 40 overflows -> 10 ms flag. Timer0 runs continuously.
; IE=82H: ONLY Timer0 interrupt enabled; external interrupts are disabled.
; ISR uses DJNZ/MOV direct/SETB only: neither ACC nor PSW is modified,
; hence neither needs a push/pop. All decisions/output writes are in main.
; JBC consumes the flag atomically. Each state entry clears any old flag
; and discards its first (possibly partial) tick. State timers therefore
; count FULL intervals: INIT >=20ms, CLOSED coast >=200ms, REV_WAIT
; >=200ms, source release deadline nominal 500ms, travel timeout >=5s.
; These state windows complete in N*10ms .. (N+1)*10ms plus short main
; scheduling jitter. Source release is polled continuously; its timeout
; consequently occurs at 500..510ms plus jitter after motor start.
; Qualification reload 3 -> 20..30ms; HOLD reload 301 -> 3000..3010ms,
; plus scheduler jitter, because a condition can change between ticks.
; Entry's discarded tick can add another <=10ms to condition windows.
; No long delays: WAIT_TICK repeatedly polls RAW safety/requests/limits.
; Short pulses between polls cannot be detected; use appropriate external
; conditioning. Poll and FSM work must stay below 10ms: this flag is not
; a queue. Do not add blocking work, disable interrupts for long periods,
; or change the oscillator/12T assumption without rechecking timing.
;
; DIRECTION INTERLOCK:
; Every state change FIRST sets RUN_N, then updates direction with EN off,
; then writes its exact P1 byte. CLOSED must age >=200ms AND have a stable
; request >=20ms before OPENING. HOLD requires >=3s continuously clear
; and released before CLOSING. CLOSING raw obstruction/request immediately
; disables EN and enters REV_WAIT; >=200ms later it REOPENs regardless of
; beams. These are the agreed endpoint and obstruction reversal guards.
; Fault recovery always goes through stationary INIT; it never resumes
; interrupted motion. CLOSED/HOLD guards also apply after fault recovery.
;
; DATA INTERFACE: 20H flags, 21H raw input snapshot, 30H state,
; 31H divider, 32H/33H state countdown low/high, 34H source countdown,
; 35H request debounce, 36H missing-limit debounce, 37H/38H hold low/high,
; 39H reset debounce, 3AH output scratch. Stack starts above 5FH.
; Flags bit addresses 00H=tick, 01H=discard entry tick,
; 02H=source released, 03H=reset armed. No BIT declarations are used.
;
; HARDWARE CAUTIONS: NO limit wiring alone cannot distinguish an inactive
; switch from an open wire; endpoint qualification, source release and
; travel timeout cover specified faults, not every wiring failure.
; EdSim's default peripherals may share these pins: map/disable them for
; this interface. Bench-check polarity, motor direction and the external
; EN inverter before powered travel. Software polling cannot replace a
; hardware emergency stop that removes drive energy if the CPU fails.

TICK_FLAG       EQU 00H
ENTRY_PARTIAL   EQU 01H
SOURCE_FREE     EQU 02H
RESET_ARMED     EQU 03H
FLAG_BYTE       EQU 20H
INPUTS          EQU 21H
REQ_INSIDE      EQU 08H
REQ_OUTSIDE     EQU 09H
BEAM_LOW        EQU 0AH
LIMIT_OPEN      EQU 0BH
LIMIT_CLOSED    EQU 0CH
BEAM_HIGH       EQU 0DH
RESET_INPUT     EQU 0EH
ESTOP_INPUT     EQU 0FH
RUN_N           EQU 092H

STATE           EQU 30H
T0_DIV          EQU 31H
TIME_LO         EQU 32H
TIME_HI         EQU 33H
SOURCE_TIME     EQU 34H
REQUEST_TIME    EQU 35H
LIMIT_TIME      EQU 36H
HOLD_LO         EQU 37H
HOLD_HI         EQU 38H
RESET_TIME      EQU 39H
OUTPUT_BYTE     EQU 3AH

ST_INIT         EQU 00H
ST_CLOSED       EQU 01H
ST_OPENING      EQU 02H
ST_HOLD         EQU 03H
ST_CLOSING      EQU 04H
ST_REV_WAIT     EQU 05H
ST_REOPEN       EQU 06H
ST_FAULT        EQU 07H

                ORG 0000H
                LJMP BOOT
                ORG 000BH
                LJMP TIMER0_ISR
                ORG 0030H

BOOT:
                MOV IE,#00H
                SETB RUN_N
                MOV P1,#0ECH
                MOV P0,#0F8H
                MOV P2,#0FFH
                MOV SP,#05FH
                MOV PSW,#00H
                MOV FLAG_BYTE,#00H
                MOV TCON,#00H
                MOV TMOD,#02H
                MOV TH0,#06H
                MOV TL0,#06H
                MOV T0_DIV,#40
                MOV A,#ST_INIT
                LCALL ENTER_STATE
                MOV IE,#082H
                SETB TR0
MAIN:
                LCALL WAIT_TICK
                JBC ENTRY_PARTIAL,MAIN
                LCALL FSM_TICK
                LJMP MAIN

TIMER0_ISR:
                DJNZ T0_DIV,TIMER0_DONE
                MOV T0_DIV,#40
                SETB TICK_FLAG
TIMER0_DONE:
                RETI

; Polling never waits for a tick to shut down an unsafe drive. Only this
; scheduler loop waits; reset, debounce and all state timers are bounded.
WAIT_TICK:
                LCALL POLL_RAW
                JBC TICK_FLAG,WAIT_READY
                SJMP WAIT_TICK
WAIT_READY:
                RET

; One coherent pin sample per poll (MOV reads pins, not the P2 latch).
; Highest priority in EVERY state: emergency unsafe OR LO=LC=0.
POLL_RAW:
                MOV INPUTS,P2
                JB ESTOP_INPUT,RAW_FAULT
                JB LIMIT_OPEN,RAW_GLOBAL_OK
                JNB LIMIT_CLOSED,RAW_FAULT
RAW_GLOBAL_OK:
                MOV A,STATE
                CJNE A,#ST_CLOSING,RAW_NOT_CLOSING
                JB BEAM_LOW,RAW_REVERSE
                JB BEAM_HIGH,RAW_REVERSE
                JNB REQ_INSIDE,RAW_REVERSE
                JNB REQ_OUTSIDE,RAW_REVERSE
                JNB LIMIT_CLOSED,RAW_CLOSED
                JB LIMIT_OPEN,RAW_SOURCE_FREE
                RET
RAW_REVERSE:
                SETB RUN_N
                MOV A,#ST_REV_WAIT
                LJMP ENTER_STATE
RAW_CLOSED:
                SETB RUN_N
                MOV A,#ST_CLOSED
                LJMP ENTER_STATE
RAW_SOURCE_FREE:
                SETB SOURCE_FREE
                RET
RAW_NOT_CLOSING:
                CJNE A,#ST_OPENING,RAW_NOT_OPENING
                SJMP RAW_OPEN_MOTION
RAW_NOT_OPENING:
                CJNE A,#ST_REOPEN,RAW_STATIONARY
RAW_OPEN_MOTION:
                JNB LIMIT_OPEN,RAW_HOLD
                JB LIMIT_CLOSED,RAW_SOURCE_FREE
                RET
RAW_HOLD:
                SETB RUN_N
                MOV A,#ST_HOLD
                LJMP ENTER_STATE
RAW_FAULT:
                SETB RUN_N
                CLR RESET_ARMED
                MOV A,STATE
                CJNE A,#ST_FAULT,RAW_NEW_FAULT
                MOV RESET_TIME,#3
                RET
RAW_NEW_FAULT:
                MOV A,#ST_FAULT
                LJMP ENTER_STATE

RAW_STATIONARY:
                CJNE A,#ST_CLOSED,RAW_NOT_CLOSED
                JB LIMIT_CLOSED,RAW_REQUEST_RESET
                MOV LIMIT_TIME,#3
                JNB REQ_INSIDE,RAW_RETURN
                JNB REQ_OUTSIDE,RAW_RETURN
RAW_REQUEST_RESET:
                MOV REQUEST_TIME,#3
RAW_RETURN:
                RET
RAW_NOT_CLOSED:
                CJNE A,#ST_HOLD,RAW_NOT_HOLD
                JB LIMIT_OPEN,RAW_HOLD_RESET
                MOV LIMIT_TIME,#3
                JB BEAM_LOW,RAW_HOLD_RESET
                JB BEAM_HIGH,RAW_HOLD_RESET
                JNB REQ_INSIDE,RAW_HOLD_RESET
                JNB REQ_OUTSIDE,RAW_HOLD_RESET
                RET
RAW_HOLD_RESET:
                MOV HOLD_LO,#02DH
                MOV HOLD_HI,#01H
                RET
RAW_NOT_HOLD:
                CJNE A,#ST_FAULT,RAW_RETURN
                JB RESET_INPUT,RAW_RESET_RELEASED
; Invalid press consumes the arm; becoming safe with reset HELD cannot
; restart. A new release then a fresh valid >=20ms press is required.
                LCALL RESET_CONDITIONS
                JC RAW_RESET_INVALID
                RET
RAW_RESET_RELEASED:
                SETB RESET_ARMED
                MOV RESET_TIME,#3
                RET
RAW_RESET_INVALID:
                CLR RESET_ARMED
                MOV RESET_TIME,#3
                RET

; CY=0 iff healthy emergency, exactly one endpoint, clear beams, released
; requests. Uses the latest INPUTS; never changes any output/state itself.
RESET_CONDITIONS:
                JB ESTOP_INPUT,RESET_BAD
                JB BEAM_LOW,RESET_BAD
                JB BEAM_HIGH,RESET_BAD
                JNB REQ_INSIDE,RESET_BAD
                JNB REQ_OUTSIDE,RESET_BAD
                MOV A,INPUTS
                ANL A,#018H
                CJNE A,#008H,RESET_TRY_OPEN
                CLR C
                RET
RESET_TRY_OPEN:
                CJNE A,#010H,RESET_BAD
                CLR C
                RET
RESET_BAD:
                SETB C
                RET

; Called once per consumed full state tick. Raw poll just ran; tick code
; repeats conditions before transitions, and raw polling resets debounce
; on intervening bounces even if they occur entirely between tick samples.
FSM_TICK:
                MOV A,STATE
                CJNE A,#ST_INIT,TICK_NOT_INIT
                LJMP TICK_INIT
TICK_NOT_INIT:
                CJNE A,#ST_CLOSED,TICK_NOT_CLOSED
                LJMP TICK_CLOSED
TICK_NOT_CLOSED:
                CJNE A,#ST_OPENING,TICK_NOT_OPENING
                LJMP TICK_MOTION
TICK_NOT_OPENING:
                CJNE A,#ST_HOLD,TICK_NOT_HOLD
                LJMP TICK_HOLD
TICK_NOT_HOLD:
                CJNE A,#ST_CLOSING,TICK_NOT_CLOSING
                LJMP TICK_MOTION
TICK_NOT_CLOSING:
                CJNE A,#ST_REV_WAIT,TICK_NOT_REV
                LJMP TICK_REV
TICK_NOT_REV:
                CJNE A,#ST_REOPEN,TICK_NOT_REOPEN
                LJMP TICK_MOTION
TICK_NOT_REOPEN:
                CJNE A,#ST_FAULT,TICK_INVALID
                LJMP TICK_FAULT
TICK_INVALID:
                LJMP ENTER_FAULT

TICK_INIT:
                LCALL DEC_TIME
                JNZ TICK_INIT_DONE
                MOV A,INPUTS
                ANL A,#018H
                CJNE A,#008H,INIT_TRY_OPEN
                MOV A,#ST_CLOSED
                LJMP ENTER_STATE
INIT_TRY_OPEN:
                CJNE A,#010H,INIT_BAD
                MOV A,#ST_HOLD
                LJMP ENTER_STATE
INIT_BAD:
                LJMP ENTER_FAULT
TICK_INIT_DONE:
                RET

TICK_CLOSED:
; TIME counts CLOSED coast independently of request debounce. It stops
; at zero, so indefinitely held requests cannot wrap and lose eligibility.
                LCALL DEC_TIME
                JNB LIMIT_CLOSED,CLOSED_LIMIT_OK
                MOV REQUEST_TIME,#3
                DJNZ LIMIT_TIME,CLOSED_DONE
                LJMP ENTER_FAULT
CLOSED_LIMIT_OK:
                MOV LIMIT_TIME,#3
                JNB REQ_INSIDE,CLOSED_REQUEST
                JNB REQ_OUTSIDE,CLOSED_REQUEST
                MOV REQUEST_TIME,#3
                RET
CLOSED_REQUEST:
                MOV A,REQUEST_TIME
                JZ CLOSED_QUALIFIED
                DEC REQUEST_TIME
                MOV A,REQUEST_TIME
                JNZ CLOSED_DONE
CLOSED_QUALIFIED:
                MOV A,TIME_LO
                ORL A,TIME_HI
                JNZ CLOSED_DONE
                MOV A,#ST_OPENING
                LJMP ENTER_STATE
CLOSED_DONE:
                RET

TICK_MOTION:
; Raw destination detection already stops first; CLOSING raw obstruction
; wins over LC. SOURCE_FREE latches the first observed source release.
                LCALL DEC_TIME
                JZ MOTION_BAD
                JB SOURCE_FREE,MOTION_DONE
                DJNZ SOURCE_TIME,MOTION_DONE
MOTION_BAD:
                LJMP ENTER_FAULT
MOTION_DONE:
                RET

TICK_HOLD:
                JNB LIMIT_OPEN,HOLD_LIMIT_OK
                MOV HOLD_LO,#02DH
                MOV HOLD_HI,#01H
                DJNZ LIMIT_TIME,HOLD_DONE
                LJMP ENTER_FAULT
HOLD_LIMIT_OK:
                MOV LIMIT_TIME,#3
                JB BEAM_LOW,HOLD_RELOAD
                JB BEAM_HIGH,HOLD_RELOAD
                JNB REQ_INSIDE,HOLD_RELOAD
                JNB REQ_OUTSIDE,HOLD_RELOAD
                MOV A,HOLD_LO
                JNZ HOLD_DEC_LOW
                DEC HOLD_HI
HOLD_DEC_LOW:
                DEC HOLD_LO
                MOV A,HOLD_LO
                ORL A,HOLD_HI
                JNZ HOLD_DONE
                MOV A,#ST_CLOSING
                LJMP ENTER_STATE
HOLD_RELOAD:
                MOV HOLD_LO,#02DH
                MOV HOLD_HI,#01H
HOLD_DONE:
                RET

TICK_REV:
                LCALL DEC_TIME
                JNZ REV_DONE
; Global emergency/both-limit check still runs throughout this wait.
; Beam or request state cannot extend REV_WAIT or prevent reopening.
                MOV A,#ST_REOPEN
                LJMP ENTER_STATE
REV_DONE:
                RET

TICK_FAULT:
                JB RESET_INPUT,FAULT_RELEASED
                JNB RESET_ARMED,FAULT_DONE
                LCALL RESET_CONDITIONS
                JC FAULT_INVALID
                DJNZ RESET_TIME,FAULT_DONE
                CLR RESET_ARMED
                MOV A,#ST_INIT
                LJMP ENTER_STATE
FAULT_RELEASED:
                SETB RESET_ARMED
                MOV RESET_TIME,#3
                RET
FAULT_INVALID:
                CLR RESET_ARMED
                MOV RESET_TIME,#3
FAULT_DONE:
                RET

; Saturating 16-bit countdown; returns A=0 iff elapsed. No register bank
; or DPTR use; timer ISR does not touch the accumulator or carry.
DEC_TIME:
                MOV A,TIME_LO
                ORL A,TIME_HI
                JZ DEC_TIME_DONE
                MOV A,TIME_LO
                JNZ DEC_TIME_LOW
                DEC TIME_HI
DEC_TIME_LOW:
                DEC TIME_LO
                MOV A,TIME_LO
                ORL A,TIME_HI
DEC_TIME_DONE:
                RET

ENTER_FAULT:
                MOV A,#ST_FAULT
; ENTER_STATE(A) never waits. Calls/tail jumps return to the original
; poll or tick caller, so state transitions cannot grow the stack.
ENTER_STATE:
                SETB RUN_N
                MOV STATE,A
                ORL A,#0F8H
                MOV P0,A
                MOV TIME_LO,#00H
                MOV TIME_HI,#00H
                MOV SOURCE_TIME,#50
                MOV REQUEST_TIME,#3
                MOV LIMIT_TIME,#3
                MOV HOLD_LO,#02DH
                MOV HOLD_HI,#01H
                MOV RESET_TIME,#3
                CLR SOURCE_FREE
                CLR RESET_ARMED
                MOV A,STATE
                CJNE A,#ST_INIT,ENTRY_NOT_INIT
                MOV TIME_LO,#2
                SJMP ENTRY_OUTPUT
ENTRY_NOT_INIT:
                CJNE A,#ST_CLOSED,ENTRY_NOT_CLOSED
                MOV TIME_LO,#20
                SJMP ENTRY_OUTPUT
ENTRY_NOT_CLOSED:
                CJNE A,#ST_REV_WAIT,ENTRY_NOT_REV
                MOV TIME_LO,#20
                SJMP ENTRY_OUTPUT
ENTRY_NOT_REV:
                CJNE A,#ST_OPENING,ENTRY_NOT_OPENING
                SJMP ENTRY_MOTION
ENTRY_NOT_OPENING:
                CJNE A,#ST_CLOSING,ENTRY_NOT_CLOSING
                SJMP ENTRY_MOTION
ENTRY_NOT_CLOSING:
                CJNE A,#ST_REOPEN,ENTRY_OUTPUT
ENTRY_MOTION:
                MOV TIME_LO,#0F4H
                MOV TIME_HI,#01H
ENTRY_OUTPUT:
                MOV DPTR,#P1_VALUES
                MOV A,STATE
                MOVC A,@A+DPTR
                MOV OUTPUT_BYTE,A
                ORL A,#04H
                MOV P1,A
; Direction is now correct with EN disabled. Recheck pins immediately
; before a moving state's final enable; do not use an old tick snapshot.
                MOV A,OUTPUT_BYTE
                ANL A,#04H
                JNZ ENTRY_COMMIT
                MOV INPUTS,P2
                JB ESTOP_INPUT,ENTRY_UNSAFE
                JB LIMIT_OPEN,ENTRY_GLOBAL_OK
                JNB LIMIT_CLOSED,ENTRY_UNSAFE
ENTRY_GLOBAL_OK:
                MOV A,STATE
                CJNE A,#ST_CLOSING,ENTRY_OPEN_CHECK
                JB BEAM_LOW,ENTRY_REVERSE
                JB BEAM_HIGH,ENTRY_REVERSE
                JNB REQ_INSIDE,ENTRY_REVERSE
                JNB REQ_OUTSIDE,ENTRY_REVERSE
                JNB LIMIT_CLOSED,ENTRY_AT_CLOSED
                SJMP ENTRY_COMMIT
ENTRY_OPEN_CHECK:
                JNB LIMIT_OPEN,ENTRY_AT_OPEN
ENTRY_COMMIT:
                MOV P1,OUTPUT_BYTE
; Start timing AFTER actual output commit. Clearing a flag is atomic;
; any pending tick from setup is discarded, as is the first new boundary.
; No interrupt masking or prescaler manipulation is necessary.
                SETB ENTRY_PARTIAL
                CLR TICK_FLAG
                RET
ENTRY_UNSAFE:
                LJMP RAW_FAULT
ENTRY_REVERSE:
                LJMP RAW_REVERSE
ENTRY_AT_CLOSED:
                LJMP RAW_CLOSED
ENTRY_AT_OPEN:
                LJMP RAW_HOLD

P1_VALUES:
                DB 0ECH,0FCH,0D9H,0DCH,06AH,06CH,069H,06CH
                END
