# Technical Specification: Sliding Door Safety Control (Version 2)

## 1. Hardware Pinout & Port Contract

### Port 0: State Code Monitor (Open-Drain, 10 kΩ pull-ups required)
- `P0.2 .. P0.0`: 3-bit binary state code (0..6 for operational states, 7 for Fault).
- High nibble maintained at `0FH` -> `P0 = F8H OR state_index`.
  - State 0 (CLOSED): `F8H`
  - State 1 (OPENING): `F9H`
  - State 2 (OPEN_HOLD): `FAH`
  - State 3 (CLOSING): `FBH`
  - State 4 (REV_WAIT): `FCH`
  - State 5 (REOPENING): `FDH`
  - State 6 (SAFETY_HOLD): `FEH`
  - State 7 (FAULT): `FFH`

---

### Port 1: Actuators, Enable Interlock, and Status Indicators
- `P1.0`: `IN1` (Direction 1 to L293D pin 2)
- `P1.1`: `IN2` (Direction 2 to L293D pin 7)
- `P1.2`: `RUN_N` (Active-low drive request; inverted by SN74HCT14 -> series NC1 E-stop -> L293D EN1 pin 1)
  - `RUN_N = 1` -> `EN1 = 0` (High-Z coast, safe stop)
  - `RUN_N = 0` -> `EN1 = 1` (Active drive)
- `P1.3`: Reserved (Always maintained at 1)
- `P1.4`: `RED_N` (Active-low Red LED; 0 = ON, 1 = OFF)
- `P1.5`: `GREEN_N` (Active-low Green LED; 0 = ON, 1 = OFF)
- `P1.6`: `ORANGE_N` (Active-low Orange LED; 0 = ON, 1 = OFF)
- `P1.7`: Reserved (Always maintained at 1)

#### Exact P1 Output Byte per State Table

| State Name | State # | Motor Shaft | IN1 (P1.0) | IN2 (P1.1) | RUN_N (P1.2) | P1.3 | RED_N (P1.4) | GREEN_N (P1.5) | ORANGE_N (P1.6) | P1.7 | P1 Hex Value |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **CLOSED** | 0 | STOP | 0 | 0 | 1 | 1 | 0 | 1 | 1 | 1 | **ECH** |
| **OPENING** | 1 | CW | 1 | 0 | 0 | 1 | 1 | 0 | 1 | 1 | **D9H** |
| **OPEN_HOLD** | 2 | STOP | 0 | 0 | 1 | 1 | 1 | 0 | 1 | 1 | **DCH** |
| **CLOSING** | 3 | CCW | 0 | 1 | 0 | 1 | 0 | 1 | 1 | 1 | **EAH** |
| **REV_WAIT** | 4 | Coast | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | **FCH** |
| **REOPENING** | 5 | CW | 1 | 0 | 0 | 1 | 1 | 0 | 1 | 1 | **D9H** |
| **SAFETY_HOLD** | 6 | STOP | 0 | 0 | 1 | 1 | 1 | 1 | 0 | 1 | **BCH** |
| **FAULT** | 7 | Coast | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | **FCH** |

---

### Port 2: Sensor and Control Inputs (Initialized with latch = FFH)
- `P2.0`: `PB_IN` (Push button Inside, NO, active low: 0 = pressed, 1 = released)
- `P2.1`: `PB_OUT` (Push button Outside, NO, active low: 0 = pressed, 1 = released)
- `P2.2`: `BEAM_DET` (Photoelectric through-beam receiver: 1 = Beam Clear, 0 = Obstacle / Beam Interrupted)
- `P2.3`: `LO` (Limit Open switch, NO: 0 = door fully open, 1 = not at open)
- `P2.4`: `LC` (Limit Closed switch, NO: 0 = door fully closed, 1 = not at closed)
- `P2.5`: `PB_CLOSE` (Push button Close, NO, active low: 0 = pressed, 1 = released, pin 26)
- `P2.6`: Unused (Pull-up)
- `P2.7`: `ESTOP` (Emergency Stop NC contact 2: 0 = Healthy/Normal, 1 = Tripped/Open/Fault)

---

## 2. Finite State Machine (FSM) Transition Logic

```text
       +-------------------------------------------------------------+
       |                                                             |
       v                                                             |
  +---------+   PB_IN / PB_OUT press (debounced 20ms)   +----------+ |
  | CLOSED  | ----------------------------------------> | OPENING  | |
  +---------+                                           +----------+ |
       ^                                                     |       |
       | LC = 0 (at closed limit)                            | LO = 0|
       |                                                     v       |
  +----------+         PB_CLOSE press (debounced 20ms)  +-----------+|
  | CLOSING  | <--------------------------------------- | OPEN_HOLD ||
  +----------+         [BEAM_DET = 1, open buttons rel] +-----------+|
       |                                                     ^       |
       | Obstacle (BEAM_DET = 0) -> SAFETY_SEEN = 1          |       |
       | OR Reopen (PB_IN / OUT) -> SAFETY_SEEN = 0          | LO = 0|
       v                                                     |   ∧   |
  +----------+         Coast >= 200 ms          +-----------+|   |   |
  | REV_WAIT | -------------------------------> | REOPENING |+---+   |
  +----------+                                  +-----------+        |
                                                      |              |
                                                      | LO = 0 ∧     |
                                                      | SAFETY_SEEN=1|
                                                      v              |
                                               +-------------+       |
                                               | SAFETY_HOLD |       |
                                               +-------------+       |
                                                      |              |
                                                      +--------------+
                                                PB_CLOSE fresh press
                                                (after release >= 20ms)
                                                [BEAM_DET = 1]
```

---

## 3. Critical Timing Parameters

1. **System Clock:** 12.000 MHz, 12T classic 8051.
   `1 machine cycle = 12 / 12,000,000 = 1.0 µs`.
2. **Timer 0 (Delay Generator):**
   - Mode 1: 16-bit timer/counter.
   - Preload value for 20 ms (20,000 µs):
     `65,536 - 20,000 = 45,536 = B1E0H`.
     `TH0 = 0B1H`, `TL0 = 0E0H`.
3. **Button Debounce:** 20 ms continuous sample.
4. **Coast Window:** >= 200 ms (10 loops of 20 ms delay).
5. **Travel Stroke Maximum Timeout:** 5.00 seconds (250 loops of 20 ms delay). Exceeding this triggers `FAULT`.
6. **Held-Button Security Guard:** Upon entering `OPEN_HOLD` or `SAFETY_HOLD`, the system requires `PB_CLOSE` to be observed continuously released for at least 20 ms before arming acceptance of a fresh press.
