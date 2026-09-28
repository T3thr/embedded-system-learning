/* teleprompter.js — dual-pane slides + multi-tab teaching suite (Script, Masterclass Lecture, Hardware, Defense) */
(function (global) {
  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatParagraphs(text) {
    if (!text) return "";
    return text
      .split(/\n\n+/)
      .map((para) => "<p>" + escapeHtml(para).replace(/\n/g, "<br />") + "</p>")
      .join("");
  }

  class Teleprompter {
    constructor(els) {
      this.els = els || {};
      this.index = 0;
      this.wordEls = [];
      this.slides = global.MPSlides.SLIDES;
      this.activeTab = "script";

      // Cache DOM references with fallbacks
      this.els.image = this.els.image || document.getElementById("slide-image");
      this.els.title = this.els.title || document.getElementById("slide-title");
      this.els.counter = this.els.counter || document.getElementById("slide-counter");
      this.els.scriptBody = this.els.scriptBody || document.getElementById("script-body");
      this.els.notes = this.els.notes || document.getElementById("speaker-notes");
      this.els.cues = this.els.cues || document.getElementById("slide-cues");
      this.els.milestone = this.els.milestone || document.getElementById("slide-milestone");
      this.els.lectureBody = this.els.lectureBody || document.getElementById("lecture-body");
      this.els.hardwareBody = this.els.hardwareBody || document.getElementById("hardware-body");
      this.els.defenseBody = this.els.defenseBody || document.getElementById("defense-body");

      this.tabButtons = Array.from(document.querySelectorAll("[data-studio-tab]"));
      this.tabPanels = {
        script: document.getElementById("panel-script"),
        lecture: document.getElementById("panel-lecture"),
        hardware: document.getElementById("panel-hardware"),
        defense: document.getElementById("panel-defense"),
      };

      this.bindTabs();
      this.bindKeys();
      this.render();
    }

    bindTabs() {
      this.tabButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const tab = btn.getAttribute("data-studio-tab");
          if (tab) this.setTab(tab);
        });
      });
    }

    setTab(tabName) {
      if (!this.tabPanels[tabName]) return;
      this.activeTab = tabName;

      this.tabButtons.forEach((btn) => {
        const isMatch = btn.getAttribute("data-studio-tab") === tabName;
        btn.classList.toggle("is-active", isMatch);
        btn.setAttribute("aria-selected", isMatch ? "true" : "false");
      });

      Object.entries(this.tabPanels).forEach(([name, panel]) => {
        if (!panel) return;
        if (name === tabName) {
          panel.removeAttribute("hidden");
          panel.classList.add("is-active");
        } else {
          panel.setAttribute("hidden", "true");
          panel.classList.remove("is-active");
        }
      });
    }

    bindKeys() {
      document.addEventListener("keydown", (e) => {
        if (global.MPRouter && global.MPRouter.getMode() !== "studio") return;
        const tag = (e.target && e.target.tagName) || "";
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

        if (e.key === "ArrowRight" || e.key === "PageDown") {
          e.preventDefault();
          this.next();
        } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
          e.preventDefault();
          this.prev();
        } else if (e.code === "Space") {
          e.preventDefault();
          if (this.onSpace) this.onSpace();
        } else if (e.key === "Home") {
          e.preventDefault();
          this.go(0);
        } else if (e.key === "End") {
          e.preventDefault();
          this.go(this.slides.length - 1);
        } else if (e.key === "1") {
          this.setTab("script");
        } else if (e.key === "2") {
          this.setTab("lecture");
        } else if (e.key === "3") {
          this.setTab("hardware");
        } else if (e.key === "4") {
          this.setTab("defense");
        }
      });
    }

    go(i) {
      const n = this.slides.length;
      this.index = ((i % n) + n) % n;
      this.render();
      document.dispatchEvent(
        new CustomEvent("mp:slide", {
          detail: { index: this.index, slide: this.slides[this.index] },
        })
      );
    }

    next() {
      this.go(this.index + 1);
    }

    prev() {
      this.go(this.index - 1);
    }

    get current() {
      return this.slides[this.index];
    }

    highlightWord(globalIndex) {
      const all = this.wordEls;
      if (!all.length) return;
      const start = this.wordOffsetStart;
      const local = globalIndex - start;
      all.forEach((el, i) => {
        el.classList.toggle("is-spoken", i < local);
        el.classList.toggle("is-current-word", i === local);
      });
      const active = all[Math.max(0, Math.min(all.length - 1, local))];
      if (active && active.scrollIntoView) {
        const box = this.els.scriptBody;
        if (box) {
          const aTop = active.offsetTop;
          const target = aTop - box.clientHeight * 0.35;
          box.scrollTo({ top: Math.max(0, target), behavior: "smooth" });
        }
      }
    }

    render() {
      const slide = this.current;
      const img = this.els.image;
      const title = this.els.title;
      const counter = this.els.counter;
      const scriptBody = this.els.scriptBody;
      const notes = this.els.notes;
      const cues = this.els.cues;
      const milestone = this.els.milestone;

      if (img) {
        img.src = slide.image;
        img.alt = "สไลด์ " + slide.id + ": " + slide.title;
      }
      if (title) title.textContent = slide.id + ". " + slide.title;
      if (counter) counter.textContent = slide.id + " / " + this.slides.length;

      const ms = global.MPSlides.milestoneForSlide(slide.id);
      if (milestone) {
        milestone.innerHTML =
          '<span class="cue-chip">ช่วง ' +
          ms.label +
          "</span>" +
          '<span class="cue-chip">' +
          ms.title +
          "</span>" +
          '<span class="cue-chip">จังหวะ ' +
          global.MPSlides.countWords(slide.script) +
          " คำ</span>";
      }

      if (cues) {
        cues.innerHTML = (slide.cues || [])
          .map((c) => '<span class="cue-chip">' + escapeHtml(c) + "</span>")
          .join("");
      }

      if (notes) notes.textContent = "บันทึกผู้บรรยาย: " + (slide.notes || "");

      // TAB 1: SCRIPT & TELEPROMPTER
      if (scriptBody) {
        const words = slide.script.trim().split(/\s+/);
        this.wordEls = words.map((w) => {
          const s = document.createElement("span");
          s.textContent = w + " ";
          return s;
        });

        let offset = 0;
        for (let i = 0; i < this.index; i += 1) {
          offset += global.MPSlides.countWords(this.slides[i].script);
        }
        this.wordOffsetStart = offset;

        scriptBody.innerHTML = "";
        const block = document.createElement("div");
        block.className = "tele-block is-current";

        const tech = document.createElement("div");
        tech.style.marginBottom = "0.35rem";
        tech.innerHTML = (slide.cues || [])
          .map((c) => '<span class="tech-term">' + escapeHtml(c) + "</span>")
          .join(" · ");
        block.appendChild(tech);

        const p = document.createElement("p");
        p.className = "script-text tele-words";
        p.style.margin = "0";
        this.wordEls.forEach((el) => p.appendChild(el));
        block.appendChild(p);
        scriptBody.appendChild(block);

        const teach = global.MPSlides.teachForSlide(slide);
        if (teach) {
          const card = document.createElement("aside");
          card.className = "teach-card";
          card.innerHTML =
            '<div class="teach-kicker">' +
            escapeHtml(teach.kicker) +
            "</div>" +
            "<h3>" +
            escapeHtml(teach.title) +
            "</h3>" +
            "<p>" +
            escapeHtml(teach.body) +
            "</p>" +
            '<div class="teach-from">ที่มา: ' +
            escapeHtml(teach.from) +
            "</div>";
          scriptBody.appendChild(card);
        }
      }

      // TAB 2: LECTURE MASTERCLASS (30-60 MIN)
      this.renderLecture(slide);

      // TAB 3: HARDWARE SPECS & PINOUT
      this.renderHardware(slide);

      // TAB 4: DEFENSE Q&A
      this.renderDefense(slide);
    }

    renderLecture(slide) {
      const container = this.els.lectureBody;
      if (!container) return;

      const lec = slide.lecture;
      if (!lec) {
        container.innerHTML =
          '<p class="soft">ไม่มีบทบรรยายเพิ่มเติมสำหรับสไลด์นี้</p>';
        return;
      }

      let html = '<div class="lecture-card">';
      html += '<div class="lecture-header">';
      html += '<div class="lecture-meta-bar">';
      html +=
        '<span class="lecture-badge time">⏱️ คาบเวลาบรรยาย: ' +
        escapeHtml(lec.timeEstimate || "40–50 นาที") +
        "</span>";
      html +=
        '<span class="lecture-badge">🎓 ระดับ: นิสิต ป.ตรี ไม่มีพื้นฐาน</span>';
      html +=
        '<span class="lecture-badge">สไลด์ที่ ' +
        slide.id +
        " จาก 19</span>";
      html += "</div>";
      html +=
        '<h2 style="margin:0.25rem 0 0.5rem;font-size:1.35rem;color:var(--ink);">' +
        escapeHtml(slide.title) +
        "</h2>";
      html +=
        '<div class="muted mono" style="font-size:0.8125rem">' +
        escapeHtml(slide.en) +
        "</div>";
      html += "</div>";

      // Objectives
      if (lec.objectives && lec.objectives.length) {
        html += '<div class="lecture-section">';
        html +=
          '<h3>🎯 วัตถุประสงค์การเรียนรู้ประจำสไลด์ (Learning Objectives)</h3>';
        html += '<ul class="lecture-objectives-list">';
        lec.objectives.forEach((obj) => {
          html += "<li>" + escapeHtml(obj) + "</li>";
        });
        html += "</ul></div>";
      }

      // Origin & History
      if (lec.origin) {
        html += '<div class="lecture-section">';
        html +=
          '<h3>🏛️ ความเป็นมา ทฤษฎี และที่มาเชิงวิศวกรรม (Origin & Background)</h3>';
        html += formatParagraphs(lec.origin);
        html += "</div>";
      }

      // Theory
      if (lec.theory) {
        html += '<div class="lecture-section">';
        html +=
          '<h3>📖 ทฤษฎีและข้อกำหนดเชิงวิชาการ (Academic Principles & Standards)</h3>';
        html += formatParagraphs(lec.theory);
        html += "</div>";
      }

      // Deep Dive
      if (lec.deepDive) {
        html += '<div class="lecture-section">';
        html +=
          '<h3>🔬 เจาะลึกการสอนจาก 0 (Step-by-Step Pedagogical Deep-Dive)</h3>';
        html += formatParagraphs(lec.deepDive);
        html += "</div>";
      }

      // Circuit & Math
      if (lec.circuitAndMath) {
        html += '<div class="lecture-section">';
        html +=
          '<h3>⚡ การคำนวณและสถาปัตยกรรมไฟฟ้า (Calculations & Electrical Circuit)</h3>';
        html +=
          '<div class="lecture-callout math">' +
          formatParagraphs(lec.circuitAndMath) +
          "</div>";
        html += "</div>";
      }

      // Assembly Walkthrough
      if (lec.assemblyNotes) {
        html += '<div class="lecture-section">';
        html +=
          '<h3>💻 เจาะลึกโค้ดแอสเซมบลีและการนับรอบเครื่อง (Assembly & Timing Walkthrough)</h3>';
        html += formatParagraphs(lec.assemblyNotes);
        html += "</div>";
      }

      // References
      if (lec.references && lec.references.length) {
        html += '<div class="lecture-references">';
        html += "<strong>📚 เอกสารและตำราอ้างอิง (Citations & Readings):</strong>";
        html += "<ul>";
        lec.references.forEach((ref) => {
          html += "<li>" + escapeHtml(ref) + "</li>";
        });
        html += "</ul></div>";
      }

      html += "</div>";
      container.innerHTML = html;
    }

    renderHardware(slide) {
      const container = this.els.hardwareBody;
      if (!container) return;

      const comps = slide.components;
      if (!comps || !comps.length) {
        // Fallback: general hardware overview for slides without specific device lists
        container.innerHTML =
          '<div class="lecture-card">' +
          '<div class="lecture-header">' +
          '<h3 style="margin:0">ผังการเชื่อมต่อและคุณสมบัติฮาร์ดแวร์ประจำสไลด์</h3>' +
          '<p class="soft" style="margin-top:0.35rem">สไลด์นี้เชื่อมโยงกับระบบพอร์ตและการควบคุมของ 8051 Classic 12T @ 12.000 MHz</p>' +
          "</div>" +
          '<div class="lecture-callout">' +
          "<strong>หลักการเชื่อมโยงฮาร์ดแวร์:</strong><br />" +
          "• Port 0 (P0.0..P0.7): แสดงรหัสสถานะ F8H–FFH (Open-Drain + Pull-up 10 kΩ ภายนอก)<br />" +
          "• Port 1 (P1.0..P1.7): เอาต์พุตขับมอเตอร์ IN1, IN2, RUN_N, ไฟเตือน RED_N, GREEN_N, BUZZ_N<br />" +
          "• Port 2 (P2.0..P2.7): อินพุตเซนเซอร์ สวิตช์ปุ่มกด ลิมิตสวิตช์ ลำแสง Omron และ E-Stop<br />" +
          "• การแยกโดเมน: 5V Logic vs 12V Motor/Sensor ผ่านออปโตคัปเปลอร์ VO617A" +
          "</div>" +
          '<p class="soft">ดูรายละเอียดอุปกรณ์ทุกชิ้นอย่างละเอียดได้ที่แท็บฮาร์ดแวร์ของ <strong>สไลด์ 4 (ผังการเชื่อมต่อฮาร์ดแวร์)</strong></p>' +
          "</div>";
        return;
      }

      let html =
        '<div style="margin-bottom:var(--space-3)">' +
        '<h3 style="margin:0 0 0.25rem">รายการอุปกรณ์และสเปกฮาร์ดแวร์ (' +
        comps.length +
        " รายการ)</h3>" +
        '<p class="soft" style="font-size:0.875rem">อธิบายอุปกรณ์ทุกตัวตั้งแต่ที่มา ความสำคัญ สเปกไฟฟ้า การต่อใช้งาน และบทบาทในโครงงาน</p>' +
        "</div>";

      comps.forEach((comp, idx) => {
        html += '<div class="component-card">';
        html += '<div class="component-header">';
        html +=
          '<h4 class="component-title">' +
          (idx + 1) +
          ". " +
          escapeHtml(comp.name) +
          "</h4>";
        html +=
          '<span class="component-tag">' +
          escapeHtml(comp.type || "Hardware") +
          "</span>";
        html += "</div>";

        if (comp.specs) {
          html +=
            '<div class="component-specs-row"><strong>สเปกหลัก:</strong> ' +
            escapeHtml(comp.specs) +
            "</div>";
        }

        html += '<div class="component-detail-grid">';

        if (comp.origin) {
          html += '<div class="component-field">';
          html +=
            '<div class="component-field-label">🏛️ ที่มาและความเป็นมา (Origin & History):</div>';
          html +=
            '<div class="component-field-content">' +
            escapeHtml(comp.origin) +
            "</div>";
          html += "</div>";
        }

        if (comp.importance) {
          html += '<div class="component-field">';
          html +=
            '<div class="component-field-label">⚠️ ความสำคัญและทำไมต้องมี (Significance & Problem if omitted):</div>';
          html +=
            '<div class="component-field-content">' +
            escapeHtml(comp.importance) +
            "</div>";
          html += "</div>";
        }

        if (comp.howToUse) {
          html += '<div class="component-field">';
          html +=
            '<div class="component-field-label">🔌 การต่อใช้งานและพินเอาต์ (Pinout & Connection):</div>';
          html +=
            '<div class="component-field-content">' +
            escapeHtml(comp.howToUse) +
            "</div>";
          html += "</div>";
        }

        if (comp.projectRole) {
          html += '<div class="component-field">';
          html +=
            '<div class="component-field-label">🎯 บทบาทในระบบประตูเลื่อน (Role in our Project):</div>';
          html +=
            '<div class="component-field-content">' +
            escapeHtml(comp.projectRole) +
            "</div>";
          html += "</div>";
        }

        if (comp.textbookRef) {
          html += '<div class="component-field" style="margin-top:0.25rem">';
          html +=
            '<div class="component-field-label">📖 การอ้างอิงตำรา/สเปกชีต:</div>';
          html +=
            '<div class="component-field-content mono" style="font-size:0.75rem;color:var(--ink-muted)">' +
            escapeHtml(comp.textbookRef) +
            "</div>";
          html += "</div>";
        }

        html += "</div></div>";
      });

      container.innerHTML = html;
    }

    renderDefense(slide) {
      const container = this.els.defenseBody;
      if (!container) return;

      const lec = slide.lecture;
      const questions = (lec && lec.defenseQuestions) || [];

      if (!questions.length) {
        container.innerHTML =
          '<div class="lecture-card">' +
          '<h3 style="margin:0 0 0.5rem">ซ้อมตอบคำถามสอบปากเปล่า</h3>' +
          '<p class="soft">สไลด์นี้เน้นความเข้าใจโฟลว์ระบบ สามารถดูคำถามหลัก 6 ข้อของ ดร.แสงชัย ได้ที่ด้านล่างของหน้า Sandbox</p>' +
          "</div>";
        return;
      }

      let html =
        '<div style="margin-bottom:var(--space-3)">' +
        '<h3 style="margin:0 0 0.25rem">ประเด็นคำถามสอบปากเปล่าประจำสไลด์ที่ ' +
        slide.id +
        "</h3>" +
        '<p class="soft" style="font-size:0.875rem">แนวทางการตอบข้อซักถามของ ดร.แสงชัย มังกรทอง เชิงลึกระดับวิศวกรรม</p>' +
        "</div>";

      questions.forEach((item, idx) => {
        html += '<div class="defense-card">';
        html +=
          '<div class="defense-q">' +
          (idx + 1) +
          ". " +
          escapeHtml(item.q) +
          "</div>";
        html +=
          '<div class="defense-a"><strong>แนวทางการตอบ:</strong> ' +
          escapeHtml(item.a) +
          "</div>";
        html += "</div>";
      });

      container.innerHTML = html;
    }
  }

  global.MPTeleprompter = { Teleprompter };
})(window);
