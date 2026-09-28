/* fsm-engine.js — 8-state sliding door FSM matching PROPOSED_SOLUTION_DESIGN */
(function (global) {
  const ST = {
    INIT: 0,
    CLOSED: 1,
    OPENING: 2,
    HOLD: 3,
    CLOSING: 4,
    REV_WAIT: 5,
    REOPEN: 6,
    FAULT: 7,
  };

  const STATE_META = [
    { id: ST.INIT, name: "INIT", th: "เริ่มต้น ตรวจปลายทาง", p0: 0xf8, p1: 0xec },
    { id: ST.CLOSED, name: "CLOSED", th: "ปิดสนิท มอเตอร์หยุด", p0: 0xf9, p1: 0xfc },
    { id: ST.OPENING, name: "OPENING", th: "กำลังเปิด", p0: 0xfa, p1: 0xd9 },
    { id: ST.HOLD, name: "HOLD", th: "เปิดค้าง", p0: 0xfb, p1: 0xdc },
    { id: ST.CLOSING, name: "CLOSING", th: "กำลังปิด (ไฟแดง/เสียง)", p0: 0xfc, p1: 0x6a },
    { id: ST.REV_WAIT, name: "REV_WAIT", th: "coast ก่อนกลับทิศ", p0: 0xfd, p1: 0x6c },
    { id: ST.REOPEN, name: "REOPEN", th: "เปิดกลับ", p0: 0xfe, p1: 0x69 },
    { id: ST.FAULT, name: "FAULT", th: "ขัดข้อง รอรีเซ็ต", p0: 0xff, p1: 0x6c },
  ];

  // Design intervals (seconds)
  const T = {
    qualify: 0.02,
    coast: 0.2,
    sourceRelease: 0.5,
    clearHold: 3.0,
    travel: 5.0,
  };

  /**
   * Input model (semantic, not raw pin volts):
   *   pbIn/pbOut  true = pressed
   *   bLow/bHigh  true = beam blocked
   *   lo          true = at OPEN limit  (LO pin 0)
   *   lc          true = at CLOSED limit (LC pin 0)
   *   resetBtn    true = pressed
   *   estop       true = unsafe / NC chain open (ESTOP pin 1)
   */
  class FsmEngine {
    constructor() {
      this.reset();
    }

    reset() {
      this.state = ST.INIT;
      this.stateAge = 0;
      this.qualTimer = 0;
      this.holdTimer = 0;
      this.sourceTimer = 0;
      this.reqTimer = 0;
      this.limitLostTimer = 0;
      this.resetArm = true;
      this.resetTimer = 0;
      this.lastEvent = "boot";
      this.inputs = {
        pbIn: false,
        pbOut: false,
        bLow: false,
        bHigh: false,
        lo: false,
        lc: true,
        resetBtn: false,
        estop: false,
      };
    }

    get meta() {
      return STATE_META[this.state];
    }

    get outputs() {
      const meta = this.meta;
      const p1 = meta.p1;
      return {
        p0: meta.p0,
        p1,
        in1: (p1 >> 0) & 1,
        in2: (p1 >> 1) & 1,
        runN: (p1 >> 2) & 1,
        redN: (p1 >> 4) & 1,
        greenN: (p1 >> 5) & 1,
        buzzN: (p1 >> 7) & 1,
        p2Latch: 0xff,
        state: this.state,
        stateName: meta.name,
      };
    }

    signals(inp) {
      const i = inp || this.inputs;
      const req = !!(i.pbIn || i.pbOut);
      const block = !!(i.bLow || i.bHigh);
      const clear = !block && !req;
      const conflict = !!(i.lo && i.lc);
      return { req, block, clear, conflict, estop: !!i.estop };
    }

    step(dt, inputs) {
      if (inputs) Object.assign(this.inputs, inputs);
      this.stateAge += dt;
      const s = this.signals(this.inputs);
      const prev = this.state;

      const enter = (next, ev) => {
        if (next === this.state) return;
        this.state = next;
        this.stateAge = 0;
        this.lastEvent = ev || ("→ " + STATE_META[next].name);
        this.qualTimer = 0;
        this.reqTimer = 0;
        this.sourceTimer = 0;
        this.limitLostTimer = 0;
        if (next === ST.HOLD) this.holdTimer = 0;
        if (next === ST.FAULT) {
          this.resetArm = !this.inputs.resetBtn;
          this.resetTimer = 0;
        }
      };

      // Priority 1 — every state: E-Stop or limit conflict
      if (s.estop || s.conflict) {
        enter(ST.FAULT, s.estop ? "ESTOP / NC chain" : "LO=LC conflict");
        return this.state !== prev;
      }

      switch (this.state) {
        case ST.INIT: {
          if (this.stateAge < T.qualify) break;
          if (this.inputs.lc && !this.inputs.lo) enter(ST.CLOSED, "boot @ LC");
          else if (this.inputs.lo && !this.inputs.lc) enter(ST.HOLD, "boot @ LO");
          else enter(ST.FAULT, "unknown endpoint");
          break;
        }

        case ST.CLOSED: {
          // LC must remain asserted while parked closed
          if (!this.inputs.lc) {
            this.limitLostTimer += dt;
            if (this.limitLostTimer >= T.qualify) {
              enter(ST.FAULT, "LC lost 20 ms");
              break;
            }
          } else {
            this.limitLostTimer = 0;
          }

          // REQ stable ≥20 ms and CLOSED age ≥200 ms → OPENING
          if (s.req) {
            this.reqTimer += dt;
            if (this.reqTimer >= T.qualify && this.stateAge >= T.coast) {
              enter(ST.OPENING, "REQ qualified");
            }
          } else {
            this.reqTimer = 0;
          }
          break;
        }

        case ST.OPENING:
        case ST.REOPEN: {
          // destination open limit
          if (this.inputs.lo) {
            enter(ST.HOLD, "arrived LO");
            break;
          }

          // source-limit release deadline (OPENING leaves LC)
          if (this.state === ST.OPENING) {
            if (this.inputs.lc) {
              this.sourceTimer += dt;
              if (this.sourceTimer >= T.sourceRelease) {
                enter(ST.FAULT, "source LC stuck 500 ms");
                break;
              }
            } else {
              this.sourceTimer = 0;
            }
          }

          if (this.stateAge >= T.travel) {
            enter(ST.FAULT, "travel timeout 5 s");
          }
          break;
        }

        case ST.HOLD: {
          // LO must remain asserted while parked open
          if (!this.inputs.lo) {
            this.limitLostTimer += dt;
            if (this.limitLostTimer >= T.qualify) {
              enter(ST.FAULT, "LO lost 20 ms");
              break;
            }
          } else {
            this.limitLostTimer = 0;
          }

          // continuous clear ≥3 s → CLOSING; any BLOCK/REQ restarts
          if (s.clear) {
            this.holdTimer += dt;
            if (this.holdTimer >= T.clearHold) {
              enter(ST.CLOSING, "clear 3 s");
            }
          } else {
            this.holdTimer = 0;
          }
          break;
        }

        case ST.CLOSING: {
          // Priority 2 — obstruction or request coasts drive, then REV_WAIT
          if (s.block || s.req) {
            enter(ST.REV_WAIT, s.block ? "BLOCK during CLOSING" : "REQ during CLOSING");
            break;
          }

          // Priority 3 — arrived closed
          if (this.inputs.lc) {
            enter(ST.CLOSED, "arrived LC");
            break;
          }

          // source LO must release within 500 ms
          if (this.inputs.lo) {
            this.sourceTimer += dt;
            if (this.sourceTimer >= T.sourceRelease) {
              enter(ST.FAULT, "source LO stuck 500 ms");
              break;
            }
          } else {
            this.sourceTimer = 0;
          }

          if (this.stateAge >= T.travel) {
            enter(ST.FAULT, "travel timeout 5 s");
          }
          break;
        }

        case ST.REV_WAIT: {
          // coast ≥200 ms then REOPEN regardless of beams
          if (this.stateAge >= T.coast) {
            enter(ST.REOPEN, "coast done → REOPEN");
          }
          break;
        }

        case ST.FAULT: {
          const releasedBtns = !this.inputs.pbIn && !this.inputs.pbOut;
          const beamsClear = !this.inputs.bLow && !this.inputs.bHigh;
          const oneEndpoint = this.inputs.lo !== this.inputs.lc;
          const healthy = !this.inputs.estop && beamsClear && releasedBtns && oneEndpoint;

          if (this.inputs.resetBtn) {
            if (!this.resetArm) {
              this.resetTimer = 0;
            } else if (healthy) {
              this.resetTimer += dt;
              if (this.resetTimer >= T.qualify) {
                this.resetArm = false;
                this.resetTimer = 0;
                enter(ST.INIT, "qualified reset");
              }
            } else {
              this.resetTimer = 0;
            }
          } else {
            this.resetArm = true;
            this.resetTimer = 0;
          }
          break;
        }

        default:
          break;
      }

      return this.state !== prev;
    }

    /** P2 pin byte as the MCU would sample (0/1) */
    p2Pins() {
      const i = this.inputs;
      const bit = (n, high) => (high ? 1 : 0) << n;
      return (
        bit(0, !i.pbIn) |
        bit(1, !i.pbOut) |
        bit(2, !!i.bLow) |
        bit(3, !i.lo) |
        bit(4, !i.lc) |
        bit(5, !!i.bHigh) |
        bit(6, !i.resetBtn) |
        bit(7, !!i.estop)
      );
    }
  }

  global.MPFsm = { FsmEngine, ST, STATE_META, T };
})(window);
