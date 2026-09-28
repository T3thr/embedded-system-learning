/* pacer.js — speech pacing at 125 Thai words / min */
(function (global) {
  const WPM = 125;

  class SpeechPacer {
    constructor(els) {
      this.els = els;
      this.speaking = false;
      this.spoken = 0;
      this.total = global.MPSlides.totalWords();
      this.startedAt = 0;
      this.raf = null;
    }

    setScriptWordTotal(n) {
      this.total = n || global.MPSlides.totalWords();
    }

    start() {
      if (this.speaking) return;
      this.speaking = true;
      this.startedAt = performance.now() - (this.spoken / WPM) * 60000;
      const tick = () => {
        if (!this.speaking) return;
        const minutes = (performance.now() - this.startedAt) / 60000;
        this.spoken = minutes * WPM;
        this.render();
        this.raf = requestAnimationFrame(tick);
      };
      this.raf = requestAnimationFrame(tick);
    }

    pause() {
      this.speaking = false;
      if (this.raf) cancelAnimationFrame(this.raf);
      this.render();
    }

    toggle() {
      if (this.speaking) this.pause();
      else this.start();
    }

    reset() {
      this.pause();
      this.spoken = 0;
      this.render();
    }

    /** Ideal spoken words given elapsed presentation seconds */
    idealSpoken(elapsedSec) {
      return (elapsedSec / 60) * WPM;
    }

    rateStatus(elapsedSec) {
      if (elapsedSec <= 1) return "on";
      const ideal = this.idealSpoken(elapsedSec);
      const ratio = ideal > 0 ? this.spoken / ideal : 1;
      if (ratio < 0.85) return "slow";
      if (ratio > 1.15) return "fast";
      return "on";
    }

    render(elapsedSec) {
      const status = this.els.status;
      const gauge = this.els.gauge;
      const spokenEl = this.els.spoken;
      const wpmEl = this.els.wpm;
      const idealEl = this.els.ideal;

      const elapsed = typeof elapsedSec === "number" ? elapsedSec : 0;
      const st = this.rateStatus(elapsed);

      if (spokenEl) spokenEl.textContent = String(Math.floor(this.spoken)) + " คำ";
      if (wpmEl) wpmEl.textContent = this.speaking ? WPM + " คำ/นาที" : "พัก";
      if (idealEl) idealEl.textContent = "เป้า " + Math.floor(this.idealSpoken(elapsed)) + " คำ";

      if (gauge) {
        gauge.classList.remove("is-slow", "is-fast", "is-over");
        if (st === "slow") gauge.classList.add("is-slow");
        if (st === "fast") gauge.classList.add("is-fast");
        if (elapsed > 480) gauge.classList.add("is-over");
      }

      if (status) {
        const map = {
          on: "จังหวะตรงเป้า 125 คำ/นาที",
          slow: "พูดช้ากว่าเป้า",
          fast: "พูดเร็วกว่าเป้า",
        };
        status.textContent = map[st] || map.on;
      }

      const idx = Math.min(this.total - 1, Math.floor(this.spoken));
      document.dispatchEvent(
        new CustomEvent("mp:pacer", {
          detail: {
            spoken: this.spoken,
            index: Math.max(0, idx),
            rate: st,
            wpm: this.speaking ? WPM : 0,
          },
        })
      );
    }
  }

  global.MPPacer = { SpeechPacer, WPM };
})(window);
