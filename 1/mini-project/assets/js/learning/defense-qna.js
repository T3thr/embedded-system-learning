/* defense-qna.js — 6 oral-defense flashcards for ดร.แสงชัย มังกรทอง */
(function (global) {
  const QUESTIONS = [
    {
      id: "q1",
      tag: "8051 I/O",
      q: "ทำไม P0 และ P2 ของ 8051 จึงมีพฤติกรรม quasi-bidirectional และแบบงานนี้กำหนด P2 latch = FFH ตลอดเวลาเพราะอะไร",
      a: "พอร์ต 8051 แบบ quasi-bidirectional มี pull-up ภายในระดับหนึ่งและทรานซิสเตอร์ pull-down แบบ open-drain เมื่อเขียน 1 จึงเปิดทางให้ดึงขึ้น แต่ยังสามารถถูกอุปกรณ์ภายนอกดึงลงเพื่ออ่านเป็น 0 ได้ P2 เป็นอินพุตทั้งพอร์ต จึงเขียน latch เป็น FFH ครั้งเดียวตั้งแต่เริ่มโปรแกรมเพื่อให้เอาต์พุต pull-up เปิดค้าง แล้วอ่านพิน (MOV A,P2 อ่านค่าพิน ไม่ใช่ค่า latch) ส่วน P0 เป็น open-drain แท้ แบบนี้จึงใส่ pull-up 10 kΩ ภายนอกที่ P0.0..P0.7 เพื่อแสดงรหัสสถานะ F8H OR state ได้ชัดเจน",
      ref: "Mazidi 8051 I/O · NXP 8xC51 datasheet · DESIGN_PORT contract",
    },
    {
      id: "q2",
      tag: "Safety",
      q: "ทำไมจึงใช้ E-Stop ทางฮาร์ดแวร์ตัด Enable ของ L293D แทนการใช้ INT0 เพื่อให้ซอฟต์แวร์หยุดมอเตอร์",
      a: "การหยุดด้วยซอฟต์แวร์ผ่าน INT0 หรือ polling ยังขึ้นกับ CPU ทำงาน, oscillator ไม่หยุด และโปรแกรมไม่ค้าง แต่ E-Stop แบบหน้าสัมผัส NC สายหนึ่งตัด EN โดยตรงผ่านวงจรกลับเฟส แม้ MCU ค้างหรือ firmware fault ก็ยังตัดกำลังขับได้ อีกสาย NC2 แจ้ง P2.7 เพื่อให้ FSM เข้า FAULT และบันทึกเหตุผล แบบนี้ไม่ใช้ INT0 เพราะอ่านอุปกรณ์ทั้งหมดผ่าน P2 และต้องการ deterministic polling ด้วย tick 10 ms — software polling ไม่ทดแทนการตัดพลังงานฮาร์ดแวร์",
      ref: "PROPOSED_SOLUTION_DESIGN §4.3–4.5 · Lab safety discussion",
    },
    {
      id: "q3",
      tag: "Motion control",
      q: "เหตุผลของ deadtime 200 ms ก่อนกลับทิศ (REV_WAIT) คืออะไร หากมอเตอร์หยุดแล้วทำไมยังต้องรอ",
      a: "การปิด Enable ของ L293D เป็นการ coast คือหยุดจ่ายแรงขับ แต่แกนมอเตอร์และสายพานยังมีแรงเฉื่อย จึงยังเคลื่อนที่อยู่ช่วงหนึ่ง หากสั่งกลับทิศทันทีจะเกิดแรงกระชากกระแสและแรงกระแทกกลไก รวมถึงเสี่ยงหนีบซ้ำ design จึงกำหนด coast อย่างน้อย 200 ms (Classroom: 10 × Delay 20 ms = 200 ms · Extended: 20 × tick 10 ms) แล้วจึง REOPEN โดยไม่ต้องรอ beam ว่าง เพราะการเปิดออกจากวัตถุคือพฤติกรรมที่ปลอดภัยกว่า ค่า 200 ms เป็นข้อเสนอโครงงานที่ต้องวัดเวลาหยุดจริงบนชุดสาธิตอีกครั้ง",
      ref: "PROPOSED_SOLUTION_DESIGN §5.1 · TEST_RESULTS reversal dead time 209.795 ms",
    },
    {
      id: "q4",
      tag: "Power stage",
      q: "ทำไมต้องมีตัวต้านทานอนุกรม 27 Ω 10 W กับมอเตอร์ และที่มาของตัวเลขนี้คืออะไร",
      a: "มอเตอร์ Pololu #3041 ประมาณ stall current 0.75 A ที่ 12 V ซึ่งเกินพิกัด L293D 0.6 A จึงห้ามต่อตรง ค่าประมาณความต้านทานขดลวดจาก stall คือ 12/0.75 = 16 Ω เมื่ออนุกรมกับ R = 27 Ω กระแส stall ที่ 12 V จึงเหลือประมาณ 12/(16+27) = 0.279 A และที่แหล่งจ่ายสูงสุด 12.6 V กับ R ต่ำสุด 25.65 Ω ขอบเขตบนเชิงตัวต้านทานคือ 12.6/25.65 = 0.491 A ยังอยู่ใต้ current limit 0.50 A ของ motor rail ผลข้างเคียงคือแรงดันตกคร่อมที่มอเตอร์ลดลง แรงบิดและความเร็วลดลง จึงห้ามใช้ค่า 330 RPM ที่ 12 V โดยไม่หักผลของ R และ L293D drop และต้องวัดกระแสเริ่มหมุน/ติดขัดจริงก่อนต่อบานประตู",
      ref: "Pololu #3041 · TI L293D · PROPOSED_SOLUTION_DESIGN §3",
    },
    {
      id: "q5",
      tag: "Isolation",
      q: "ออปโตคัปเปลอร์ VO617A แยกโดเมน 5 V/12 V ในช่องเซนเซอร์อย่างไร และถ้าไม่ใช้จะเกิดอะไร",
      a: "เซนเซอร์ E3Z-T61 เป็น NPN Light-ON อยู่บน motor/sensor rail 12 V เมื่อรับลำแสงจะเปิดเอาต์พุต NPN ดึงกระแส LED ฝั่งปฐมภูมิของ VO617A ผ่าน R 1.5 kΩ ประมาณ (12−1.2−0.2)/1500 = 7.07 mA ทรานซิสเตอร์ทุติยภูมิดึงพิน P2.2/P2.5 ลง LOW ที่โดเมน 5 V โดยมี pull-up 10 kΩ จึงไม่มี 12 V เข้าขา 8051 โดยตรง ถ้าไม่แยก แรงดัน 12 V และ noise ของมอเตอร์จะเข้า MCU เสี่ยง latch-up/ทำลาย I/O และ ground loop จากภาคมอเตอร์จะรบกวนสัญญาณลอจิก",
      ref: "Vishay VO617A · Omron E3Z-T61 · PROPOSED_SOLUTION_DESIGN §4.4",
    },
    {
      id: "q6",
      tag: "Verification",
      q: "ผลทดสอบ 20/36 เคสบน EdSim51 ยืนยันอะไร และยังไม่ยืนยันอะไรที่ต้องวัดบนฮาร์ดแวร์จริง",
      a: "ชุดทดสอบยืนยันตรรกะ FSM, ตารางเอาต์พุต P0/P1, invariant P2 latch = FFH, การไม่เปิด IN1=IN2=1 พร้อมกัน, การกลับทิศเฉพาะขณะ coast, และเวลาขั้นต่ำในโมเดลจำลอง (debounce 20 ms+, coast 200 ms+, clear 3 s+, timeout 5 s+) โดยรันบน assembler และ Cpu ของ EdSim51 แบบ headless แต่ยังไม่ยืนยัน: ระดับสัญญาณจริงของ beam/opto, กระแสและอุณหภูมิของ R27 Ω กับ L293D, เวลาหยุดเชิงกลและระยะหยุด, ความเร็ว ≤ 80 mm/s ตลอด 200 mm, พฤติกรรมในแดด/ฝน/สัญญาณรบกวนมอเตอร์ และการผ่านมาตรฐานความปลอดภัยประตูคนเดินจริง",
      ref: "firmware/TEST_RESULTS.md (36) · TEST_RESULTS_CLASSROOM.md (20) · §8.2",
    },
  ];

  class DefenseQna {
    constructor(root) {
      this.root = root;
      this.order = QUESTIONS.map((q) => q.id);
      this.render();
    }

    shuffle() {
      for (let i = this.order.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        const t = this.order[i];
        this.order[i] = this.order[j];
        this.order[j] = t;
      }
      this.render();
    }

    reset() {
      this.order = QUESTIONS.map((q) => q.id);
      this.render();
    }

    revealAll(open) {
      this.root.querySelectorAll(".qna-a").forEach((el) => {
        el.hidden = !open;
      });
      this.root.querySelectorAll("[data-qna-toggle]").forEach((btn) => {
        btn.textContent = open ? "ซ่อนแนวทางตอบ" : "แสดงแนวทางตอบ";
      });
    }

    render() {
      if (!this.root) return;
      this.root.innerHTML = "";
      const list = document.createElement("div");
      list.className = "qna-list";
      this.order.forEach((id, idx) => {
        const item = QUESTIONS.find((q) => q.id === id);
        const card = document.createElement("article");
        card.className = "qna-card";
        card.innerHTML =
          "<button class='qna-q' type='button' data-qna-toggle='" +
          item.id +
          "'>" +
          "<span>Q" +
          (idx + 1) +
          ". " +
          item.q +
          "</span><span class='qna-badge'>" +
          item.tag +
          "</span></button>" +
          "<div class='qna-a' id='ans-" +
          item.id +
          "' hidden><p style='margin:0'>" +
          item.a +
          "</p><span class='qna-ref'>อ้างอิง: " +
          item.ref +
          "</span></div>";
        list.appendChild(card);
      });
      this.root.appendChild(list);
      this.root.querySelectorAll("[data-qna-toggle]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const ans = document.getElementById("ans-" + btn.dataset.qnaToggle);
          if (!ans) return;
          const open = ans.hidden;
          ans.hidden = !open;
          btn.textContent = open ? "ซ่อนแนวทางตอบ" : "แสดงแนวทางตอบ";
        });
      });
    }
  }

  global.MPQna = { DefenseQna, QUESTIONS };
})(window);
