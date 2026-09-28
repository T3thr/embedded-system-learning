/* assembly-viewer.js — dual firmware inspector with cycle notes */
(function (global) {
  const CYCLES = [
    { op: "MOV Rn,#data", us: 2, note: "2 machine cycles × 1 µs" },
    { op: "MOV direct,#data", us: 3, note: "เขียนพอร์ต/ตัวแปร" },
    { op: "SETB / CLR bit", us: 2, note: "รวม SETB P1.2" },
    { op: "JB / JNB (not taken)", us: 3, note: "3 µs" },
    { op: "JB / JNB (taken)", us: 4, note: "4 µs" },
    { op: "SJMP", us: 2, note: "2 µs" },
    { op: "DJNZ (loop)", us: 4, note: "4 µs" },
    { op: "CALL / RET", us: 8 / 4, note: "LCALL 8 µs · RET 4 µs" },
    { op: "JNB TF0,DelayWait", us: 4, note: "poll loop ภายใน Delay" },
  ];

  const CLASSROOM_BLOCKS = [
    {
      id: "overview",
      label: "ภาพรวมฉบับสอน",
      title: "SLIDING_DOOR_CLASSROOM.asm",
      lines: global.MPSlides.ASM_EXCERPTS.START,
      cycles: "START: MOV×3 + SETB + CALL Delay ≈ 20 ms qualification แรก",
    },
    {
      id: "delay",
      label: "Delay 20 ms",
      title: "Timer 0 mode 1 · B1E0H",
      lines: global.MPSlides.ASM_EXCERPTS.Delay,
      cycles: "t = 20,000 × 1 µs = 20 ms · R1=10 → 200 ms · R1=150 → 3.00 s · R1=250 → 5.00 s",
    },
    { id: "closed", label: "CLOSED", title: "State 1 CLOSED", lines: global.MPSlides.ASM_EXCERPTS.CLOSED, cycles: "settle 10×20 ms = 200 ms · qualify 20 ms" },
    { id: "opening", label: "OPENING", title: "State 2 OPENING", lines: global.MPSlides.ASM_EXCERPTS.OPENING, cycles: "250×20 ms = 5 s travel timeout" },
    { id: "hold", label: "HOLD", title: "State 3 HOLD", lines: global.MPSlides.ASM_EXCERPTS.HOLD, cycles: "150×20 ms = 3.00 s continuous clear" },
    { id: "closing", label: "CLOSING", title: "State 4 CLOSING", lines: global.MPSlides.ASM_EXCERPTS.CLOSING, cycles: "ClosingStop: SETB P1.2 ก่อน REV_WAIT = coast interlock" },
    { id: "revwait", label: "REV_WAIT", title: "State 5 REV_WAIT", lines: global.MPSlides.ASM_EXCERPTS.REV_WAIT, cycles: "10×20 ms = 200 ms deadtime" },
    { id: "reopen", label: "REOPEN", title: "State 6 REOPEN", lines: global.MPSlides.ASM_EXCERPTS.REOPEN, cycles: "timeout 5 s เหมือน OPENING" },
    { id: "fault", label: "FAULT", title: "State 7 FAULT", lines: global.MPSlides.ASM_EXCERPTS.FAULT, cycles: "release → press 20 ms + safe guards" },
  ];

  const EXTENDED_NOTES = [
    "Timer0 mode 2 auto-reload: TH0=TL0=06H → 256−6=250 counts → overflow ทุก250 µs",
    "T0_DIV=40 → software tick 10 ms (TICK_FLAG)",
    "IE=082H: เปิดเฉพาะ Timer0 · ไม่ใช้ INT0/INT1 ในแบบนี้",
    "POLL_RAW อ่าน P2 pins (ไม่ใช่ latch) ระหว่างรอ tick จึงตัด hazard ได้เร็ว",
    "Direction interlock: SETB RUN_N ก่อนตั้งทิศทาง แล้วจึงเขียน P1 byte ของสถานะ",
    "P2 latch เขียน FFH ครั้งเดียวตั้งแต่ BOOT และคงไว้ตลอด",
  ];

  function highlightLine(line) {
    let html = line
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const cmtIdx = html.indexOf(";");
    let cmt = "";
    if (cmtIdx >= 0) {
      cmt = html.slice(cmtIdx);
      html = html.slice(0, cmtIdx);
    }
    html = html.replace(/^(\s*)([A-Za-z_][A-Za-z0-9_]*:)/, function (_, sp, lab) {
      return sp + "<span class='lbl'>" + lab + "</span>";
    });
    html = html.replace(
      /\b(MOV|SETB|CLR|JB|JNB|SJMP|LJMP|DJNZ|CALL|LCALL|RET|RETI|CJNE|JBC|ANL|ORL|NOP|END|ORG|EQU)\b/g,
      function (_, op) { return "<span class='op'>" + op + "</span>"; }
    );
    html = html.replace(
      /\b(P0|P1|P2|P3|TMOD|TCON|TH0|TL0|TF0|TR0|IE|SP|PSW|A|C|R0|R1|R2|R3|R4|R5|R6|R7|T0_DIV|STATE|RUN_N|INPUTS)\b/g,
      function (_, reg) { return "<span class='reg'>" + reg + "</span>"; }
    );
    if (cmt) html += "<span class='cmt'>" + cmt + "</span>";
    return html;
  }

  class AssemblyViewer {
    constructor(els) {
      this.els = els;
      this.edition = "classroom";
      this.blockId = "overview";
      this.bindTabs();
      this.render();
    }

    bindTabs() {
      document.querySelectorAll("[data-asm-edition]").forEach((btn) => {
        btn.addEventListener("click", () => {
          this.edition = btn.dataset.asmEdition;
          document.querySelectorAll("[data-asm-edition]").forEach((b) => {
            b.classList.toggle("is-active", b === btn);
          });
          this.render();
        });
      });
      if (this.els.blockTabs) {
        this.els.blockTabs.addEventListener("click", (e) => {
          const t = e.target.closest("[data-asm-block]");
          if (!t) return;
          this.blockId = t.dataset.asmBlock;
          document.querySelectorAll("[data-asm-block]").forEach((b) => {
            b.classList.toggle("is-active", b === t);
          });
          this.render();
        });
      }
    }

    focusBlock(id) {
      if (!id || !global.MPSlides.ASM_EXCERPTS[id]) return;
      const map = {
        START: "overview",
        Delay: "delay",
        CLOSED: "closed",
        OPENING: "opening",
        HOLD: "hold",
        CLOSING: "closing",
        REV_WAIT: "revwait",
        REOPEN: "reopen",
        FAULT: "fault",
      };
      const bid = map[id] || id;
      if (!CLASSROOM_BLOCKS.some((b) => b.id === bid)) return;
      this.blockId = bid;
      document.querySelectorAll("[data-asm-block]").forEach((b) => {
        b.classList.toggle("is-active", b.dataset.asmBlock === bid);
      });
      this.render();
    }

    render() {
      const code = this.els.code;
      const side = this.els.side;
      const title = this.els.title;

      if (this.edition === "classroom") {
        const block = CLASSROOM_BLOCKS.find((b) => b.id === this.blockId) || CLASSROOM_BLOCKS[0];
        if (title) title.textContent = block.title + " · SLIDING_DOOR_CLASSROOM.asm";
        if (code) {
          code.innerHTML = block.lines
            .map((ln) => "<span class='ln'>" + highlightLine(ln) + "</span>")
            .join("");
        }
        if (side) {
          side.innerHTML =
            "<h4>Machine cycles (12 MHz 12T)</h4>" +
            "<div class='formula-block'>" +
            block.cycles +
            "</div>" +
            "<table class='cycle-table'><thead><tr><th>Opcode</th><th>µs</th><th>บันทึก</th></tr></thead><tbody>" +
            CYCLES.map(
              (c) =>
                "<tr><td>" +
                c.op +
                "</td><td>" +
                c.us +
                "</td><td>" +
                c.note +
                "</td></tr>"
            ).join("") +
            "</tbody></table>" +
            "<p class='muted' style='margin-top:0.75rem;font-size:0.8125rem'>" +
            "1 machine cycle = 1 µs ที่ 12.000 MHz แบบ classic 12T · t = count × 1 µs" +
            "</p>";
        }
      } else {
        if (title) title.textContent = "SLIDING_DOOR.asm · Timer 0 ISR 10 ms";
        if (code) {
          const lines = [
            "BOOT:",
            "    MOV IE,#00H",
            "    SETB RUN_N",
            "    MOV P1,#0ECH",
            "    MOV P0,#0F8H",
            "    MOV P2,#0FFH",
            "    MOV TMOD,#02H",
            "    MOV TH0,#06H",
            "    MOV TL0,#06H",
            "    MOV T0_DIV,#40",
            "    MOV IE,#082H",
            "    SETB TR0",
            "MAIN:",
            "    LCALL WAIT_TICK",
            "    JBC ENTRY_PARTIAL,MAIN",
            "    LCALL FSM_TICK",
            "    LJMP MAIN",
            "TIMER0_ISR:",
            "    DJNZ T0_DIV,TIMER0_DONE",
            "    MOV T0_DIV,#40",
            "    SETB TICK_FLAG",
            "TIMER0_DONE:",
            "    RETI",
          ];
          code.innerHTML = lines
            .map((ln) => "<span class='ln'>" + highlightLine(ln) + "</span>")
            .join("");
        }
        if (side) {
          side.innerHTML =
            "<h4>ฉบับขยาย · จุดต่าง</h4><ul class='inv-list'>" +
            EXTENDED_NOTES.map((n) => "<li>" + n + "</li>").join("") +
            "</ul>" +
            "<div class='formula-block'>overflow = 256 − 6 = 250 counts → 250 µs<br>" +
            "tick = 40 × 250 µs = 10 ms<br>qualification 3 ticks → 20–30 ms</div>" +
            "<table class='truth-table'><thead><tr><th>State</th><th>P0</th><th>P1</th></tr></thead><tbody>" +
            global.MPFsm.STATE_META.map(
              (s) =>
                "<tr><td>" +
                s.name +
                "</td><td>" +
                global.MPRegs.hex2(s.p0) +
                "</td><td>" +
                global.MPRegs.hex2(s.p1) +
                "</td></tr>"
            ).join("") +
            "</tbody></table>";
        }
      }
    }
  }

  global.MPAsm = { AssemblyViewer, CLASSROOM_BLOCKS, CYCLES };
})(window);
