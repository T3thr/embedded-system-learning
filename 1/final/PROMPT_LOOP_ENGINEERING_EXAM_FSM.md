# MASTER LOOP ENGINEERING PROMPT: 8051 FSM & SLIDING DOOR FINAL EXAM SOLUTION

```markdown
# TASK SPECIFICATION: 8051 FSM SLIDING DOOR GROUP PROJECT (QUESTION 56)

## 1. CONTEXT & METADATA
- Course: 305341 Embedded Systems 1
- Instructor: Dr. Saengchai Mangkornthong
- Authors: Theeraphat Phuraya, Pranpriya Sriyong (Group 1)
- Project Title: Single-Panel Residential Sliding Door with Photoelectric Obstacle Detection and Automatic Reopening
- Target Architecture: Classic 8051 / AT89S52 @ 12.000 MHz (12T, 1 machine cycle = 1.0 us)
- Canonical Source of Truth: embedded-system/1/mini-project/submission/Sliding_Door_Safety_Control_Infrared_FSM.pdf
- Canonical Firmware: embedded-system/1/mini-project/submission/firmware/SLIDING_DOOR_V2.asm
- Target Exam Question: Final Exam Question 56 (Draw State Diagram and Write Assembly Code for Group's Sliding Door)

## 2. HARDWARE PINOUT & PORT CONTRACT (IMMUTABLE INVARIANTS)
### Port 0: State Code Monitor (Open-Drain, 10 kOhm external pull-ups required)
- P0.2 .. P0.0 = 3-bit state code (0..6 operational, 7 fault).
- High nibble maintained at 0FH -> Formula: `P0 = F8H OR State`.

### Port 1: Actuator, Enable Interlock, and Status Indicators
- P1.0 = IN1 (L293D pin 2)
- P1.1 = IN2 (L293D pin 7)
  - Direction logic: 00 = STOP, 10 = CW (Open rightwards), 01 = CCW (Close leftwards)
- P1.2 = RUN_N (Active-Low drive request)
  - Inverted by SN74HCT14 -> NC1 of E-stop -> L293D EN1 (pin 1).
  - RUN_N = 1 -> EN1 = 0 (Motor Coast / High-Z).
  - RUN_N = 0 -> EN1 = 1 (Motor Driven).
- P1.3 = Reserved (Maintained at 1).
- P1.4 = RED_N (Active-Low Red LED; 0 = ON).
- P1.5 = GREEN_N (Active-Low Green LED; 0 = ON).
- P1.6 = ORANGE_N (Active-Low Orange LED; 0 = ON).
- P1.7 = Reserved (Maintained at 1).

### Port 1 Exact State Byte Table:
- State 0: CLOSED      -> 1110 1100B = ECH (STOP, RED ON)
- State 1: OPENING     -> 1101 1001B = D9H (CW, GREEN ON)
- State 2: OPEN_HOLD   -> 1101 1100B = DCH (STOP, GREEN ON)
- State 3: CLOSING     -> 1110 1010B = EAH (CCW, RED ON)
- State 4: REV_WAIT    -> 1111 1100B = FCH (Coast, All LEDs OFF)
- State 5: REOPENING   -> 1101 1001B = D9H (CW, GREEN ON)
- State 6: SAFETY_HOLD -> 1011 1100B = BCH (STOP, ORANGE ON)
- State 7: FAULT       -> 1111 1100B = FCH (Coast, All LEDs OFF)

### Port 2: Sensors and Operator Controls (Latch written FFH once at boot)
- P2.0 = PB_IN (Push button inside, NO: 0 = pressed)
- P2.1 = PB_OUT (Push button outside, NO: 0 = pressed)
- P2.2 = BEAM_DET (Through-Beam Omron E3Z-T61 + VO617A + 74HCT14: 1 = Beam Clear, 0 = Obstacle / Beam Interrupted)
- P2.3 = LO (Limit Open switch, NO: 0 = fully open)
- P2.4 = LC (Limit Closed switch, NO: 0 = fully closed)
- P2.5 = PB_CLOSE (Push button close, NO: 0 = pressed, pin 26)
- P2.6 = Unused (Pull-up)
- P2.7 = ESTOP (Emergency Stop NC contact 2: 0 = Normal / Healthy, 1 = Tripped / Open Wire / Fault)

## 3. FINITE STATE MACHINE (FSM) RULES
1. Start / Initialization:
   - Check limit switches: If LC=0 -> CLOSED; If LO=0 -> OPEN_HOLD; If neither or both -> FAULT.
2. Opening Trigger:
   - PB_IN = 0 or PB_OUT = 0 (debounced 20 ms) -> enter OPENING.
3. Open Limit Reached:
   - LO = 0 -> enter OPEN_HOLD. Motor stops, Green LED remains on.
4. Closing Trigger (Strict Manual Safety Policy):
   - No automatic close timer exists.
   - Closing requires PB_CLOSE to be released >= 20 ms after entering hold, then freshly pressed (debounced 20 ms), with BEAM_DET = 1 and both open buttons released.
5. Obstacle Detection During CLOSING:
   - BEAM_DET = 0 is polled continuously (no 20 ms delay filter).
   - Instant response: SETB P1.2 (cut enable immediately), write P1 = FCH, set bit SAFETY_SEEN = 1, enter REV_WAIT.
   - If manual open requested (PB_IN/OUT = 0) during closing: SETB P1.2, write P1 = FCH, set bit SAFETY_SEEN = 0, enter REV_WAIT.
6. Kinetic Coast Interval:
   - Remain in REV_WAIT for >= 200 ms (10 loops of DELAY_20MS) to dissipate mechanical kinetic energy and avoid inductive voltage spikes on L293D. E-stop must be monitored during coast.
7. Reopening Stroke:
   - After coast, pre-load direction (P1 = DDH), clear P1.2 (P1 = D9H) -> enter REOPENING.
   - Drive CW until LO = 0.
8. Destination Selection:
   - If LO = 0 and SAFETY_SEEN = 1 -> enter SAFETY_HOLD (Orange LED ON, P1 = BCH).
   - If LO = 0 and SAFETY_SEEN = 0 -> enter OPEN_HOLD (Green LED ON, P1 = DCH).
9. Safety Hold Recovery:
   - Requires human inspection of doorway threshold.
   - Must observe PB_CLOSE released for >= 20 ms, then a fresh debounced press with BEAM_DET = 1.
10. Global Trip:
    - ESTOP = 1, simultaneous LO=LC=0, or travel stroke timeout > 5.0 s immediately transitions to FAULT (P0 = FFH, P1 = FCH).

## 4. LOOP REFINEMENT & VERIFICATION PASSES
Execute the following 5 verification passes on all generated documentation and solutions:
- PASS 1 (Hardware Consistency): Confirm all pin numbers, logic polarities, active-low declarations, and optocoupler isolation boundaries match Version 2 specifications.
- PASS 2 (FSM Rigor): Ensure all 7 operational states plus FAULT are defined. Reject any 4-state or 5-state generic sliding door models. Verify that no automatic close timer exists.
- PASS 3 (Assembly Execution Correctness): Verify 8051 assembly code adheres to EdSim51 syntax. Confirm Timer 0 Mode 1 16-bit preload for 20 ms is B1E0H (65536 - 20000 = 45536). Verify that every state transition precedes direction change with SETB P1.2 (Interlock).
- PASS 4 (Format & Syntax Constraints):
  - Strictly enforce ZERO DOLLAR SIGN POLICY. Never output `$` or `$$` for variables, math, formulas, or formatting.
  - Strictly enforce ZERO LATEX COMMANDS. Never use `\rightarrow`, `\times`, `\frac`, etc. Use Unicode: `→`, `⇒`, `×`, `÷`, `≤`, `≥`, superscripts, subscripts, and code backticks.
  - Zero emojis throughout the entire text.
- PASS 5 (File Mention Standards):
  - All file references must use RFC 8089 file URIs `[FileName](file:///absolute/path/to/file)` or Antigravity mention tags `@[/absolute/path/to/file]`.
  - Never output raw unformatted file paths. Never use broken semicolon schemes like `(file;...)`.
```
