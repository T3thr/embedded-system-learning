# EdSim51 sliding-door test results

Status: **COMPLETE. 36 of 36 scenarios passed, 0 failed.**

The harness is `EdSimDoorTest.java`. The actual 481-line `SLIDING_DOOR.asm` has
been read, and timing assertions adjusted to its full-interval contract. No firmware was
created or modified. No GUI validation is claimed.

## Actual results

Run on 17 September 2026 with Java 21.0.10, headless, against
`SLIDING_DOOR.asm` SHA-256 `9989f89bccc8c6af84f2e05fbcdc22459bacb68977841a27fc619eeb3781e2a0`.

| Check | Result |
| --- | --- |
| Assembly with the actual EdSim51 two-pass assembler | PASS; image slots 65536 |
| Scenario tests executed on the EdSim51 `Cpu` | 36 PASS, 0 FAIL |
| Instructions stepped and checked | 41,686,115 |
| P2 latch FFH after every stepped instruction | PASS |
| P1.0 and P1.1 never both high after the first P1 write | PASS |

Scenario groups that passed: full normal cycle with exact P0/P1 bytes, inside and
outside requests, CLOSED 200 ms minimum age, 20 ms button qualification with short
pulses rejected, obstruction on each beam during CLOSING with reversal and REOPEN,
HOLD clear-countdown resets from either beam and from a button, boot classification
at each endpoint, unknown boot position, conflicting limits at boot and in motion,
emergency stop in every motion phase, 5 s travel timeouts for OPENING, CLOSING and
REOPEN, stuck source limits at 500 ms, obstruction winning over a simultaneous
destination limit, and eight fault-recovery cases covering held reset, short reset
pulses and resets attempted while a hazard is still present.

Measured simulated intervals, reported from EdSim51 machine cycles at 12 MHz:

| Interval | Design minimum | Measured |
| --- | --- | --- |
| Button qualification | 20 ms | 24.854 ms |
| CLOSED age before OPENING | 200 ms | 210.009 ms |
| Reversal dead time | 200 ms | 209.795 ms |
| HOLD continuous clear | 3.000 s | 3.019788 s |
| Source-limit release deadline | 500 ms | 509.988 ms |
| Travel timeout | 5.000 s | 5.009978 s |
| Reset qualification | 20 ms | 29.691 ms |

Every measured value sits inside its asserted bound, above the design minimum and
within one scheduler tick plus jitter of it.

Earlier read-only feasibility probes, distinct from the door tests, assembled six
existing LAB programs with EdSim51, executed `lab1_3.asm`, drove an external input
low and released it, and exercised Timer0 overflow, vector and RETI with EA enabled
and disabled. Those probes established feasibility; the results above are the door
firmware evidence.

## Reproduction

Run from the workspace root, after the firmware is available:

```bash
/opt/homebrew/opt/openjdk@21/bin/java \
  -XX:-UsePerfData -Djava.awt.headless=true \
  --class-path embedded-system/edsim51di_version_2.1.39/edsim51di/lib/edsim51sh.jar \
  --source 21 embedded-system/1/mini-project/firmware/EdSimDoorTest.java
```

The harness prints the firmware SHA-256, individual PASS/FAIL results, failure
traces, and a total to stdout. It does not write the report automatically. A test
failure produces exit code 1. Source-file mode compiles Java in memory.

## Planned scope and method

- Actual EdSim51 assembler: reflective invocation of `firstPass` and `secondPass`;
  bypasses only the GUI bookkeeping in public `assemble()`.
- Actual `Cpu` execution with its timers and interrupt controller. No replacement
  FSM model, instruction interpreter, forced PC, or firmware RAM/timer writes.
- External P2 pin stimuli through EdSim51 port hardware APIs. Pin latches remain FF.
- Timing uses EdSim51 `programCycles` at 1 microsecond per machine cycle, matching
  the requested classic 12-clock core at 12 MHz. This is simulated time, not host time.
- Normal cycle, inside/outside requests, CLOSED age, debounce, each obstruction
  beam, continuous-clear HOLD reset, reversal delay, boot classification, unknown
  position, conflicting limits, E-stop, travel timeouts, stuck source limits,
  and fault reset safety including held reset and short reset pulses.
- Exact settled P0/P1 state bytes. P1.0/P1.1 mutual exclusion is checked after each
  instruction once firmware first writes P1; the hardware reset FF latch before
  that first write is explicitly outside this invariant. P2 latch FF is checked
  after every stepped instruction, including startup.
- Tests allow timer sampling and instruction completion tolerance on upper
  bounds. Debounce, CLOSED age, REV_WAIT and HOLD enforce the specified minimum
  continuous durations: 20ms, 200ms, 200ms and 3000ms respectively.

This is deterministic headless simulation, not physical electrical, motor,
mechanical stopping-distance, GUI, or exhaustive all-interleavings verification.
