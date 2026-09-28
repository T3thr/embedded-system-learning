/* timer.js — 8:00 master countdown with 6 milestones */
(function (global) {
  const TOTAL = 480;

  class StudioTimer {
    constructor(els) {
      this.els = els;
      this.remaining = TOTAL;
      this.running = false;
      this.lastTs = null;
      this.raf = null;
      this._buildMilestones();
      this.render();
    }

    _buildMilestones() {
      const bar = this.els.bar;
      const labels = this.els.labels;
      if (!bar || !labels) return;
      bar.innerHTML = "";
      labels.innerHTML = "";
      global.MPSlides.MILESTONES.forEach((m) => {
        const seg = document.createElement("div");
        seg.className = "milestone-seg";
        seg.dataset.mid = m.id;
        seg.title = m.label + " " + m.title;
        bar.appendChild(seg);

        const lab = document.createElement("span");
        lab.dataset.mid = m.id;
        lab.textContent = m.label + " " + m.title;
        labels.appendChild(lab);
      });
    }

    format(sec) {
      const s = Math.max(0, Math.ceil(sec));
      const mm = String(Math.floor(s / 60)).padStart(2, "0");
      const ss = String(s % 60).padStart(2, "0");
      return mm + ":" + ss;
    }

    elapsed() {
      return TOTAL - this.remaining;
    }

    start() {
      if (this.running) return;
      this.running = true;
      this.lastTs = performance.now();
      const tick = (ts) => {
        if (!this.running) return;
        const dt = (ts - this.lastTs) / 1000;
        this.lastTs = ts;
        this.remaining = Math.max(0, this.remaining - dt);
        this.render();
        document.dispatchEvent(
          new CustomEvent("mp:timer", {
            detail: {
              remaining: this.remaining,
              elapsed: this.elapsed(),
              running: true,
              finished: this.remaining <= 0,
            },
          })
        );
        if (this.remaining <= 0) {
          this.running = false;
          this.render();
          document.dispatchEvent(new CustomEvent("mp:timer-end"));
          return;
        }
        this.raf = requestAnimationFrame(tick);
      };
      this.raf = requestAnimationFrame(tick);
      this._syncButtons();
    }

    pause() {
      this.running = false;
      if (this.raf) cancelAnimationFrame(this.raf);
      this._syncButtons();
      document.dispatchEvent(
        new CustomEvent("mp:timer", {
          detail: {
            remaining: this.remaining,
            elapsed: this.elapsed(),
            running: false,
            finished: false,
          },
        })
      );
    }

    reset() {
      this.pause();
      this.remaining = TOTAL;
      this.render();
      document.dispatchEvent(
        new CustomEvent("mp:timer", {
          detail: {
            remaining: this.remaining,
            elapsed: 0,
            running: false,
            finished: false,
          },
        })
      );
    }

    toggle() {
      if (this.running) this.pause();
      else this.start();
    }

    _syncButtons() {
      const startBtn = this.els.startBtn;
      if (startBtn) {
        startBtn.textContent = this.running ? "พัก" : "เริ่ม 8:00";
        startBtn.classList.toggle("is-active", this.running);
      }
    }

    currentMilestone() {
      return global.MPSlides.milestoneForElapsed(this.elapsed());
    }

    render() {
      const t = this.els.display;
      if (t) {
        t.textContent = this.format(this.remaining);
        t.classList.toggle("is-warn", this.remaining <= 60 && this.remaining > 15);
        t.classList.toggle("is-danger", this.remaining <= 15);
      }

      const el = this.elapsed();
      const active = this.currentMilestone();
      document.querySelectorAll(".milestone-seg").forEach((seg) => {
        const m = global.MPSlides.MILESTONES.find((x) => x.id === seg.dataset.mid);
        seg.classList.toggle("is-done", el >= m.end);
        seg.classList.toggle("is-active", m.id === active.id && this.remaining > 0);
        seg.classList.toggle("is-over", this.remaining <= 0 && m.id === global.MPSlides.MILESTONES[5].id);
      });
      document.querySelectorAll(".milestone-labels span").forEach((lab) => {
        lab.classList.toggle("is-active", lab.dataset.mid === active.id);
      });

      const status = this.els.status;
      if (status) {
        status.textContent =
          "ช่วง " + active.label + " · " + active.title + " · เหลือ " + this.format(this.remaining);
      }
    }
  }

  global.MPTimer = { StudioTimer, TOTAL };
})(window);
