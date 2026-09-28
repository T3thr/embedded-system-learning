/* register-view.js — live P0 / P1 / P2 port bit LEDs */
(function (global) {
  const P1_BITS = [
    { n: 0, name: "IN1", activeLow: false },
    { n: 1, name: "IN2", activeLow: false },
    { n: 2, name: "RUN_N", activeLow: false },
    { n: 3, name: "rsvd", activeLow: false },
    { n: 4, name: "RED_N", activeLow: true },
    { n: 5, name: "GREEN_N", activeLow: true, green: true },
    { n: 6, name: "rsvd", activeLow: false },
    { n: 7, name: "BUZZ_N", activeLow: true },
  ];

  const P2_BITS = [
    { n: 0, name: "PB_IN" },
    { n: 1, name: "PB_OUT" },
    { n: 2, name: "B_LOW" },
    { n: 3, name: "LO" },
    { n: 4, name: "LC" },
    { n: 5, name: "B_HIGH" },
    { n: 6, name: "RESET_N" },
    { n: 7, name: "ESTOP" },
  ];

  function hex2(v) {
    return "0x" + (v & 0xff).toString(16).toUpperCase().padStart(2, "0") + "H";
  }

  class RegisterView {
    constructor(root) {
      this.root = root;
      this.build();
    }

    build() {
      if (!this.root) return;
      this.root.innerHTML = "";

      this.stateBox = document.createElement("div");
      this.stateBox.className = "state-banner";
      this.root.appendChild(this.stateBox);

      const mkBank = (title, bits, key) => {
        const bank = document.createElement("div");
        bank.className = "port-bank";
        const head = document.createElement("h4");
        head.innerHTML = "<span>" + title + "</span><span class='port-hex' data-hex='" + key + "'></span>";
        bank.appendChild(head);
        const row = document.createElement("div");
        row.className = "led-row";
        bits.forEach((b) => {
          const item = document.createElement("div");
          item.className = "led-item";
          const dot = document.createElement("div");
          dot.className = "led-dot" + (b.green ? " led-green" : "");
          dot.dataset.led = key + ":" + b.n;
          const lab = document.createElement("div");
          lab.className = "led-label";
          lab.textContent = b.name;
          const val = document.createElement("div");
          val.className = "led-value";
          val.dataset.val = key + ":" + b.n;
          val.textContent = "0";
          item.appendChild(dot);
          item.appendChild(lab);
          item.appendChild(val);
          row.appendChild(item);
        });
        bank.appendChild(row);
        this.root.appendChild(bank);
        return bank;
      };

      mkBank("P0 STATE[2:0] + F8H", [0, 1, 2, 3, 4, 5, 6, 7].map((n) => ({ n, name: "P0." + n })), "p0");
      mkBank("P1 DRIVER / LEDS", P1_BITS, "p1");
      mkBank("P2 SENSORS", P2_BITS, "p2");

      this.inv = document.createElement("ul");
      this.inv.className = "inv-list";
      this.root.appendChild(this.inv);
    }

    setHex(key, value) {
      const el = this.root.querySelector("[data-hex='" + key + "']");
      if (el) el.textContent = hex2(value);
    }

    setBit(key, n, high, mode) {
      const led = this.root.querySelector("[data-led='" + key + ":" + n + "']");
      const val = this.root.querySelector("[data-val='" + key + ":" + n + "']");
      if (val) val.textContent = high ? "1" : "0";
      if (!led) return;
      led.classList.remove("is-high", "is-active-low-on");
      if (mode === "active-low") {
        if (!high) led.classList.add("is-active-low-on");
      } else if (high) {
        led.classList.add("is-high");
      }
    }

    update(outputs, p2Pins, invariants) {
      const o = outputs;
      if (this.stateBox) {
        this.stateBox.innerHTML =
          "<div><div class='state-name'>" +
          o.stateName +
          " · state=" +
          o.state +
          "</div><div class='state-desc'>" +
          (global.MPFsm.STATE_META[o.state] || {}).th +
          "</div></div>" +
          "<div class='mono soft'>P0 " +
          hex2(o.p0) +
          " · P1 " +
          hex2(o.p1) +
          "</div>";
      }

      this.setHex("p0", o.p0);
      this.setHex("p1", o.p1);
      this.setHex("p2", p2Pins);

      for (let n = 0; n < 8; n += 1) {
        this.setBit("p0", n, (o.p0 >> n) & 1, "normal");
        const def = P1_BITS[n];
        this.setBit("p1", n, (o.p1 >> n) & 1, def.activeLow ? "active-low" : "normal");
        this.setBit("p2", n, (p2Pins >> n) & 1, "normal");
      }

      if (this.inv) {
        const items = invariants || [];
        this.inv.innerHTML = items
          .map(
            (it) =>
              "<li class='" +
              (it.ok ? "ok" : "bad") +
              "'>" +
              it.text +
              (it.ok ? " ✓" : " ✗") +
              "</li>"
          )
          .join("");
      }
    }
  }

  global.MPRegs = { RegisterView, P1_BITS, P2_BITS, hex2 };
})(window);
