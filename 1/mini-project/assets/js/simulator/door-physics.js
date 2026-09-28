/* door-physics.js — 200 mm sliding panel, dual beams @ 20/80 mm, limits LO/LC */
(function (global) {
  const TRAVEL_MM = 200;
  const BEAM_LOW_MM = 20;
  const BEAM_HIGH_MM = 80;
  const SPEED_MM_S = 60; // design target ≤ 80 mm/s
  const PANEL_THICK = 18;

  class DoorPhysics {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.pos = 0; // 0 = closed (LC), 200 = open (LO)
      this.vel = 0; // mm/s (+ open, − close)
      this.obstacles = []; // {x, y0, y1} in mm along travel
      this.buttons = { pbIn: false, pbOut: false, resetBtn: false, estop: false };
      this.manualPins = { bLow: false, bHigh: false };
      this.onLog = null;
      this._dpr = window.devicePixelRatio || 1;
      this._resize();
      window.addEventListener("resize", () => this._resize());
      this._bindPointer();
    }

    _resize() {
      const rect = this.canvas.getBoundingClientRect();
      this.w = Math.max(320, rect.width || 640);
      this.h = 380;
      this.canvas.width = Math.floor(this.w * this._dpr);
      this.canvas.height = Math.floor(this.h * this._dpr);
      this.canvas.style.height = this.h + "px";
      this.ctx.setTransform(this._dpr, 0, 0, this._dpr, 0, 0);
    }

    _bindPointer() {
      const toMm = (evt) => {
        const rect = this.canvas.getBoundingClientRect();
        const x = ((evt.clientX - rect.left) / rect.width) * (TRAVEL_MM + 80) - 40;
        const yPx = (evt.clientY - rect.top) / rect.height;
        // map y: floor at bottom → height mm up to 120
        const hMm = (1 - yPx) * 120;
        return { x, y: hMm };
      };

      this.canvas.addEventListener("pointerdown", (evt) => {
        const p = toMm(evt);
        // toggle beam if click near beam line and outside panel? click in gap areas
        // Simple interaction: click left/right third toggles obstacle on nearest beam
        if (p.y >= BEAM_LOW_MM - 18 && p.y <= BEAM_LOW_MM + 18) {
          this.toggleObstacle(p.x, BEAM_LOW_MM);
        } else if (p.y >= BEAM_HIGH_MM - 18 && p.y <= BEAM_HIGH_MM + 18) {
          this.toggleObstacle(p.x, BEAM_HIGH_MM);
        } else {
          this.toggleObstacle(p.x, p.y < 50 ? BEAM_LOW_MM : BEAM_HIGH_MM);
        }
      });
    }

    toggleObstacle(xMm, heightMm) {
      const y0 = heightMm === BEAM_LOW_MM ? 0 : BEAM_LOW_MM + 10;
      const y1 = heightMm === BEAM_LOW_MM ? BEAM_LOW_MM + 5 : 120;
      const key = heightMm === BEAM_LOW_MM ? "low" : "high";
      const existing = this.obstacles.findIndex((o) => o.key === key && Math.abs(o.x - xMm) < 25);
      if (existing >= 0) {
        this.obstacles.splice(existing, 1);
        this.log("remove obstacle " + key + " @ " + xMm.toFixed(0) + " mm", "ok");
      } else {
        const x = Math.max(0, Math.min(TRAVEL_MM, xMm));
        this.obstacles.push({ key, x, y0, y1, h: heightMm });
        this.log("place obstacle " + key + " @ " + x.toFixed(0) + " mm", "hazard");
      }
      this.draw();
    }

    clearObstacles() {
      this.obstacles = [];
      this.log("clear all obstacles", "ok");
      this.draw();
    }

    log(msg, cls) {
      if (this.onLog) this.onLog(msg, cls);
    }

    /**
     * Compute sensor pins from geometry.
     * Beam is blocked if an obstacle intersects the beam plane in the doorway gap.
     * Doorway gap is x in (pos, pos+opening?) — simplified model:
     * Door panel occupies [pos - PANEL, pos] where pos is leading edge from closed.
     * Closed (pos=0): panel covers x=0..18 covering full opening path for objects?
     * Better model used in sandbox:
     *  - Opening path along x = 0..200 mm of travel.
     *  - Door panel width = 200 mm (covers entire travel when closed).
     *  - When pos=0 (closed), panel covers 0..200 and doorway is sealed.
     *  - When pos=200 (open), panel is retracted to 200..400 (off to the side).
     *  - Doorway free interval = (pos, 200) when opening from left.
     */
    panelRange() {
      const left = this.pos;
      const right = this.pos + TRAVEL_MM;
      return { left, right };
    }

    doorwayFree() {
      // free space for people: from pos to 200 along travel axis (opening)
      return { a: this.pos, b: TRAVEL_MM };
    }

    beamBlocked(heightMm) {
      const free = this.doorwayFree();
      const forced = heightMm === BEAM_LOW_MM ? this.manualPins.bLow : this.manualPins.bHigh;
      if (forced) return true;
      return this.obstacles.some((o) => {
        if (o.h !== heightMm) return false;
        return o.x >= free.a - 2 && o.x <= free.b + 2;
      });
    }

    pins() {
      const atLO = this.pos >= TRAVEL_MM - 0.05;
      const atLC = this.pos <= 0.05;
      return {
        pbIn: !!this.buttons.pbIn,
        pbOut: !!this.buttons.pbOut,
        bLow: this.beamBlocked(BEAM_LOW_MM),
        bHigh: this.beamBlocked(BEAM_HIGH_MM),
        lo: atLO,
        lc: atLC,
        resetBtn: !!this.buttons.resetBtn,
        estop: !!this.buttons.estop,
      };
    }

    /** Drive motor from FSM outputs */
    drive(outputs) {
      if (outputs.runN === 1) {
        this.vel = 0;
        return;
      }
      if (outputs.in1 === 1 && outputs.in2 === 0) this.vel = SPEED_MM_S;
      else if (outputs.in1 === 0 && outputs.in2 === 1) this.vel = -SPEED_MM_S;
      else this.vel = 0;
    }

    step(dt) {
      // coast when vel==0; integrate when driving
      if (this.vel !== 0) {
        this.pos += this.vel * dt;
        if (this.pos < 0) {
          this.pos = 0;
          this.vel = 0;
        }
        if (this.pos > TRAVEL_MM) {
          this.pos = TRAVEL_MM;
          this.vel = 0;
        }
      }
    }

    /** Cosmetic coast damping when drive cut (does not change FSM pins) */
    coastStep(dt) {
      if (this.vel === 0) return;
      // brief mechanical coast of 80 ms after enable off — visual only
      this.pos += this.vel * dt;
      this.vel *= Math.exp(-dt * 12);
      if (Math.abs(this.vel) < 0.5) this.vel = 0;
      this.pos = Math.max(0, Math.min(TRAVEL_MM, this.pos));
    }

    draw() {
      const ctx = this.ctx;
      const w = this.w;
      const h = this.h;
      ctx.clearRect(0, 0, w, h);

      const padX = 36;
      const usable = w - padX * 2;
      const mmToPx = usable / (TRAVEL_MM + 60);
      const originX = padX + 20 * mmToPx;
      const floorY = h - 48;
      const mmToPy = 1.55;

      // floor / rail
      ctx.strokeStyle = "#64748B";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(originX - 24, floorY);
      ctx.lineTo(originX + (TRAVEL_MM + 40) * mmToPx, floorY);
      ctx.stroke();

      // door panel (2.5D)
      const panelX = originX + this.pos * mmToPx;
      const panelW = TRAVEL_MM * mmToPx;
      const panelH = 130 * mmToPy * 0.55;
      ctx.fillStyle = "#94A3B8";
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 1.5;
      ctx.fillRect(panelX, floorY - panelH, panelW, panelH);
      ctx.strokeRect(panelX, floorY - panelH, panelW, panelH);
      // 2.5D side face
      ctx.fillStyle = "#64748B";
      ctx.beginPath();
      ctx.moveTo(panelX + panelW, floorY - panelH);
      ctx.lineTo(panelX + panelW + 10, floorY - panelH - 8);
      ctx.lineTo(panelX + panelW + 10, floorY - 8);
      ctx.lineTo(panelX + panelW, floorY);
      ctx.closePath();
      ctx.fill();

      // limit switches LO / LC
      const drawLimit = (xMm, label, active) => {
        const x = originX + xMm * mmToPx;
        ctx.fillStyle = active ? "#DC2626" : "#059669";
        ctx.fillRect(x - 4, floorY - 8, 8, 12);
        ctx.fillStyle = "#334155";
        ctx.font = "11px ui-monospace, monospace";
        ctx.textAlign = "center";
        ctx.fillText(label, x, floorY + 18);
      };
      drawLimit(0, "LC", this.pos <= 0.05);
      drawLimit(TRAVEL_MM, "LO", this.pos >= TRAVEL_MM - 0.05);

      // IR beams (through-beam across doorway gap)
      const drawBeam = (yMm, label, blocked) => {
        const y = floorY - yMm * mmToPy;
        const x1 = originX + Math.max(this.pos, 0) * mmToPx;
        const x2 = originX + TRAVEL_MM * mmToPx;
        ctx.strokeStyle = blocked ? "#F87171" : "#34D399";
        ctx.lineWidth = blocked ? 3 : 2;
        ctx.setLineDash(blocked ? [6, 4] : []);
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();
        ctx.setLineDash([]);
        // emitter / receiver
        ctx.fillStyle = blocked ? "#DC2626" : "#059669";
        ctx.fillRect(x2 - 2, y - 5, 6, 10);
        ctx.fillRect(x1 - 4, y - 5, 6, 10);
        ctx.fillStyle = "#64748B";
        ctx.font = "11px ui-monospace, monospace";
        ctx.textAlign = "left";
        ctx.fillText(label + (blocked ? " BLOCK" : " CLEAR"), x2 + 6, y + 4);
      };
      drawBeam(BEAM_LOW_MM, "B_LOW 20mm", this.beamBlocked(BEAM_LOW_MM));
      drawBeam(BEAM_HIGH_MM, "B_HIGH 80mm", this.beamBlocked(BEAM_HIGH_MM));

      // obstacles
      this.obstacles.forEach((o) => {
        const x = originX + o.x * mmToPx;
        const y = floorY - o.h * mmToPy;
        ctx.fillStyle = "#F59E0B";
        ctx.fillRect(x - 7, y - 14, 14, 28);
        ctx.strokeStyle = "#B45309";
        ctx.strokeRect(x - 7, y - 14, 14, 28);
      });

      // travel scale
      ctx.fillStyle = "#94A3B8";
      ctx.font = "11px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.fillText("0 mm", originX, floorY + 34);
      ctx.fillText("200 mm", originX + TRAVEL_MM * mmToPx, floorY + 34);
      ctx.fillText("pos = " + this.pos.toFixed(1) + " mm", w / 2, 18);

      // domain legend corner
      ctx.textAlign = "right";
      ctx.fillStyle = "#0284C7";
      ctx.fillText("5 V logic / 12 V sensor-motor", w - 12, 18);
    }
  }

  global.MPDoor = { DoorPhysics, TRAVEL_MM, BEAM_LOW_MM, BEAM_HIGH_MM, SPEED_MM_S };
})(window);
