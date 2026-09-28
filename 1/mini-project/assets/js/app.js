/* app.js — bootstrap Studio + Sandbox + Learning modules */
(function () {
  const el = (id) => document.getElementById(id);

  function bootStudio() {
    const timer = new window.MPTimer.StudioTimer({
      display: el("timer-display"),
      bar: el("milestone-bar"),
      labels: el("milestone-labels"),
      startBtn: el("timer-toggle"),
      status: el("timer-status"),
    });
    const pacer = new window.MPPacer.SpeechPacer({
      status: el("pacer-status"),
      gauge: el("pace-gauge"),
      spoken: el("pacer-spoken"),
      wpm: el("pacer-wpm"),
      ideal: el("pacer-ideal"),
    });
    const tele = new window.MPTeleprompter.Teleprompter({
      image: el("slide-image"),
      title: el("slide-title"),
      counter: el("slide-counter"),
      scriptBody: el("script-body"),
      notes: el("speaker-notes"),
      cues: el("slide-cues"),
      milestone: el("slide-milestone"),
      lectureBody: el("lecture-body"),
      hardwareBody: el("hardware-body"),
      defenseBody: el("defense-body"),
    });

    tele.onSpace = () => timer.toggle();

    el("timer-toggle").addEventListener("click", () => timer.toggle());
    el("timer-reset").addEventListener("click", () => {
      timer.reset();
      pacer.reset();
    });
    el("pacer-toggle").addEventListener("click", () => pacer.toggle());
    el("slide-prev").addEventListener("click", () => tele.prev());
    el("slide-next").addEventListener("click", () => tele.next());

    el("script-word-total").textContent = String(window.MPSlides.totalWords());
    el("script-slide-count").textContent = String(window.MPSlides.SLIDES.length);

    document.addEventListener("mp:timer", (e) => {
      pacer.render(e.detail.elapsed);
    });

    document.addEventListener("mp:slide", (e) => {
      const asmKey = e.detail.slide.asmKey;
      if (window.MPAsmRef) window.MPAsmRef.focusBlock(asmKey || "overview");
    });

    document.addEventListener("mp:timer-end", () => {
      pacer.pause();
      const log = el("timer-status");
      if (log) log.textContent = "หมดเวลา 8:00 — เชิญรับคำถามสอบปากเปล่า";
    });

    return { timer, pacer, tele };
  }

  function bootSandbox() {
    const canvas = el("door-canvas");
    const door = new window.MPDoor.DoorPhysics(canvas);
    const fsm = new window.MPFsm.FsmEngine();
    const regs = new window.MPRegs.RegisterView(el("port-panel"));

    const logEl = el("sim-log");
    door.onLog = (msg, cls) => {
      if (!logEl) return;
      const line = document.createElement("div");
      line.className = "log-line " + (cls || "");
      const t = (performance.now() / 1000).toFixed(2);
      line.textContent = "[" + t + "s] " + msg;
      logEl.prepend(line);
      while (logEl.children.length > 40) logEl.removeChild(logEl.lastChild);
    };

    // Start closed at LC for a known-good boot path
    door.pos = 0;
    door.buttons.estop = false;

    const btnMap = [
      ["btn-pb-in", "pbIn"],
      ["btn-pb-out", "pbOut"],
      ["btn-estop", "estop"],
      ["btn-reset", "resetBtn"],
      ["btn-beam-low", "bLow"],
      ["btn-beam-high", "bHigh"],
    ];

    btnMap.forEach(([id, key]) => {
      const node = el(id);
      if (!node) return;
      const isHold = key === "pbIn" || key === "pbOut" || key === "estop" || key === "resetBtn";
      const isManualBeam = key === "bLow" || key === "bHigh";

      if (isManualBeam) {
        node.addEventListener("click", () => {
          door.manualPins[key] = !door.manualPins[key];
          node.classList.toggle("is-on", door.manualPins[key]);
          door.draw();
        });
        return;
      }

      if (isHold) {
        const down = () => {
          door.buttons[key] = true;
          node.classList.add("is-on");
        };
        const up = () => {
          door.buttons[key] = false;
          node.classList.remove("is-on");
        };
        node.addEventListener("pointerdown", down);
        node.addEventListener("pointerup", up);
        node.addEventListener("pointerleave", up);
        node.addEventListener("pointercancel", up);
      }
    });

    el("btn-clear-obstacles").addEventListener("click", () => door.clearObstacles());
    el("btn-reset-sim").addEventListener("click", () => {
      fsm.reset();
      door.pos = 0;
      door.vel = 0;
      door.obstacles = [];
      door.manualPins = { bLow: false, bHigh: false };
      door.buttons = { pbIn: false, pbOut: false, resetBtn: false, estop: false };
      el("btn-beam-low").classList.remove("is-on");
      el("btn-beam-high").classList.remove("is-on");
      door.draw();
      door.onLog("sim reset → boot at LC", "ok");
    });

    // seed one demo obstacle outside doorway so user can experiment
    door.obstacles.push({ key: "low", x: 120, y0: 0, y1: 25, h: 20 });
    door.obstacles.push({ key: "high", x: 150, y0: 30, y1: 120, h: 80 });

    let last = performance.now();
    let prevP1 = null;
    let wroteP1 = false;

    function invariants(out) {
      const items = [];
      items.push({
        text: "P2 latch = FFH",
        ok: out.p2Latch === 0xff,
      });
      items.push({
        text: "ไม่ขับ IN1=IN2=1 พร้อมกัน",
        ok: !(out.in1 === 1 && out.in2 === 1),
      });
      const stopped =
        out.stateName === "INIT" ||
        out.stateName === "CLOSED" ||
        out.stateName === "HOLD" ||
        out.stateName === "FAULT" ||
        out.stateName === "REV_WAIT";
      items.push({
        text: "สถานะหยุด ⇒ RUN_N=1",
        ok: !stopped || out.runN === 1,
      });
      items.push({
        text: "state อยู่ใน 0..7",
        ok: out.state >= 0 && out.state <= 7,
      });
      items.push({
        text: "FAULT ⇒ ไม่จ่ายแรงขับ",
        ok: out.stateName !== "FAULT" || out.runN === 1,
      });
      return items;
    }

    function frame(ts) {
      const dt = Math.min(0.05, (ts - last) / 1000);
      last = ts;

      const pins = door.pins();
      const changed = fsm.step(dt, pins);
      const out = fsm.outputs;

      // Drive model: enable + direction. Visual coast when RUN_N=1 and was moving.
      if (out.runN === 0) {
        door.drive(out);
        door.step(dt);
      } else {
        // coast residual then stop
        door.coastStep(dt);
      }

      door.draw();
      const p2 = fsm.p2Pins();
      regs.update(out, p2, invariants(out));

      if (changed) {
        door.onLog("FSM " + out.stateName + " · " + fsm.lastEvent, out.stateName === "FAULT" ? "hazard" : "ok");
        if (window.MPAsmRef) {
          window.MPAsmRef.focusBlock(out.stateName);
        }
        const sb = el("sim-state");
        if (sb) sb.textContent = out.stateName;
      }

      // watch illegal direction while driving
      if (wroteP1 && out.runN === 0 && out.in1 === 1 && out.in2 === 1) {
        door.onLog("INVARIANT FAIL: IN1=IN2=1", "hazard");
      }
      if (out.p1 !== prevP1) {
        prevP1 = out.p1;
        wroteP1 = true;
      }

      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
    return { door, fsm, regs };
  }

  function bootLearning() {
    const asm = new window.MPAsm.AssemblyViewer({
      code: el("asm-code"),
      side: el("asm-side"),
      title: el("asm-title"),
      blockTabs: el("asm-block-tabs"),
    });
    window.MPAsmRef = asm;

    // build state block tabs from data
    const tabs = el("asm-block-tabs");
    if (tabs && !tabs.children.length) {
      window.MPAsm.CLASSROOM_BLOCKS.forEach((b, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn" + (i === 0 ? " is-active" : "");
        btn.dataset.asmBlock = b.id;
        btn.textContent = b.label;
        tabs.appendChild(btn);
      });
    }

    const qna = new window.MPQna.DefenseQna(el("qna-root"));
    el("qna-shuffle").addEventListener("click", () => qna.shuffle());
    el("qna-reveal-all").addEventListener("click", () => {
      const anyClosed = Array.from(document.querySelectorAll(".qna-a")).some((el) => el.hidden);
      qna.revealAll(anyClosed);
      el("qna-reveal-all").textContent = anyClosed ? "ซ่อนทั้งหมด" : "แสดงทั้งหมด";
    });

    // static truth table
    const tt = el("state-truth-body");
    if (tt) {
      tt.innerHTML = window.MPFsm.STATE_META.map((s) => {
        const p1 = s.p1;
        const bits = {
          IN1: (p1 >> 0) & 1,
          IN2: (p1 >> 1) & 1,
          RUN_N: (p1 >> 2) & 1,
          RED_N: (p1 >> 4) & 1,
          GREEN_N: (p1 >> 5) & 1,
          BUZZ_N: (p1 >> 7) & 1,
        };
        return (
          "<tr><td>" +
          s.id +
          " " +
          s.name +
          "</td><td>" +
          window.MPRegs.hex2(s.p0) +
          "</td><td>" +
          window.MPRegs.hex2(s.p1) +
          "</td><td>" +
          [bits.IN1, bits.IN2, bits.RUN_N, bits.RED_N, bits.GREEN_N, bits.BUZZ_N].join(" · ") +
          "</td></tr>"
        );
      }).join("");
    }

    return { asm, qna };
  }

  function bootCompare() {
    const tiles = el("test-tiles");
    if (tiles) {
      tiles.innerHTML =
        "<div class='stat-tile'><strong>20 / 20</strong><span>CLASSROOM · TEST_RESULTS_CLASSROOM.md</span></div>" +
        "<div class='stat-tile'><strong>36 / 36</strong><span>EXTENDED · TEST_RESULTS.md</span></div>" +
        "<div class='stat-tile'><strong>22.0M + 41.7M</strong><span>instructions stepped (EdSim51)</span></div>";
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    window.MPTheme.init();
    window.MPRouter.init();
    bootStudio();
    bootSandbox();
    bootLearning();
    bootCompare();

    document.body.dataset.mobilePane = "slides";
    document.querySelectorAll("[data-mobile-pane]").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.mobilePane === "slides");
    });
  });
})();
