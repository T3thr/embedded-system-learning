/*
 * Timer / Counter Workbench, exam-variant engine.
 * Pure engine (window.Exam2025Sim.FAMILIES, solve, random) plus the UI for the tabs inside #w-timer:
 *   solve    = pick a problem family, edit every number freely, get the full worked solution at once
 *   practice = seeded random problem by difficulty, type answers, check, reveal the worked solution
 *   map      = which numbers the lecturer can change in each family
 * Style rules of this codebase: no template literals and no regex end anchors (zero dollar-sign policy).
 */
(function (root) {
  'use strict';

  var MAXC = { 0: 8192, 1: 65536, 2: 256 };
  var MODE_NAME = { 0: 'Mode 0 (13 บิต)', 1: 'Mode 1 (16 บิต)', 2: 'Mode 2 (8 บิต auto-reload)', 3: 'Mode 3' };

  /* ------------------------------------------------------------ small helpers */
  function fmt(n, d) { return Number(n).toLocaleString('en-US', { maximumFractionDigits: d === undefined ? 4 : d }); }
  function hex0(v, digits) {
    var s = Math.round(v).toString(16).toUpperCase();
    while (s.length < digits) s = '0' + s;
    return s;
  }
  function hex(v, digits) { return hex0(v, digits) + 'H'; }
  function imm(v, digits) { var h = hex0(v, digits) + 'H'; return (/[A-F]/.test(h.charAt(0)) ? '#0' : '#') + h; }
  function bin8(v) { var s = (v & 255).toString(2); while (s.length < 8) s = '0' + s; return s.slice(0, 4) + ' ' + s.slice(4) + 'B'; }
  function c(x) { return '<code>' + x + '</code>'; }
  function fmtTime(us) {
    if (us >= 1e6) return fmt(us / 1e6, 4) + ' s';
    if (us >= 1000) return fmt(us / 1000, 4) + ' ms';
    return fmt(us, 4) + ' µs';
  }
  function near(a, b) { return Math.abs(a - b) < 1e-7 * Math.max(1, Math.abs(a), Math.abs(b)); }
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function pick(r, arr) { return arr[Math.floor(r() * arr.length)]; }
  function regs(timer) {
    return timer === 1
      ? { th: 'TH1', tl: 'TL1', tr: 'TR1', tf: 'TF1', tconRun: 0x40, tfBit: 'TCON.7', sh: 4, pin: 'T1 (P3.5)' }
      : { th: 'TH0', tl: 'TL0', tr: 'TR0', tf: 'TF0', tconRun: 0x10, tfBit: 'TCON.5', sh: 0, pin: 'T0 (P3.4)' };
  }
  function reloadDigits(mode) { return mode === 2 ? 2 : 4; }
  function split(reload, mode) {
    if (mode === 0) return { th: reload >> 5, tl: reload & 31 };
    if (mode === 2) return { th: reload, tl: reload };
    return { th: reload >> 8, tl: reload & 255 };
  }
  function step(t, why) { return { t: t, why: why || '' }; }
  function ans(key, label, kind, val, disp, tol) { return { key: key, label: label, kind: kind, val: val, disp: disp, tol: tol || 0 }; }

  /* choose loops when N exceeds the mode limit: prefer a "nice" per-loop time */
  function loopPlan(timeUs, tmc, max) {
    var best = null, L, per, tier, k, tiers = [10000, 1000, 100, 10, 1];
    for (L = Math.ceil(timeUs / tmc / max); L <= 5000; L++) {
      per = timeUs / L / tmc;
      if (per > max || per < 1 || !near(per, Math.round(per))) continue;
      per = Math.round(per);
      tier = 0;
      for (k = 0; k < tiers.length; k++) { if (per % tiers[k] === 0) { tier = tiers.length - k; break; } }
      if (!best || tier > best.tier) best = { L: L, per: per, tier: tier };
    }
    return best;
  }

  function waitCode(timer, mode, th, tl, tmodVal, label) {
    var r = regs(timer);
    return [
      '        MOV   TMOD, ' + imm(tmodVal, 2),
      '        MOV   ' + r.th + ', ' + imm(th, 2),
      '        MOV   ' + r.tl + ', ' + imm(tl, 2),
      '        MOV   TCON, ' + imm(r.tconRun, 2) + '        ; ' + r.tr + ' = 1 เริ่มนับ',
      label + ':  JNB   ' + r.tfBit + ', ' + label + '       ; รอ ' + r.tf + ' = 1',
      '        MOV   TCON, #00H        ; หยุด Timer และล้าง ' + r.tf
    ].join('\n');
  }

  /* ------------------------------------------------------------ families */
  var FAMILIES = {};
  var ORDER = [];
  function def(f) { FAMILIES[f.id] = f; ORDER.push(f.id); }

  var FOSC_OPT = [
    { v: 12, l: '12 MHz (1 count = 1 µs)' }, { v: 6, l: '6 MHz (1 count = 2 µs)' }, { v: 24, l: '24 MHz (1 count = 0.5 µs)' },
    { v: 11.0592, l: '11.0592 MHz (1 count = 1.0851 µs)' }, { v: 16, l: '16 MHz (1 count = 0.75 µs)' }, { v: 22.1184, l: '22.1184 MHz' }
  ];
  var MODE_OPT = [{ v: 1, l: 'Mode 1: 16 บิต' }, { v: 0, l: 'Mode 0: 13 บิต' }, { v: 2, l: 'Mode 2: 8 บิต auto-reload' }];
  var TIMER_OPT = [{ v: 0, l: 'Timer 0 (TH0, TL0)' }, { v: 1, l: 'Timer 1 (TH1, TL1)' }];

  /* ---- 1. delay ---- */
  def({
    id: 'delay', name: 'หน่วงเวลา (Delay) แล้วหาค่า TH/TL', tag: 'ข้อ 4, 9',
    idea: ['Timer นับเพิ่มทีละ 1 ทุก machine cycle จึงแปลง "เวลา" เป็น "จำนวน count" ก่อนเสมอ', 'ตัวนับนับขึ้นและล้นที่ค่าสูงสุดของโหมด จึงโหลดค่า สูงสุด - N (สูตรอาจารย์ FFFFH - N + 1)', 'ถ้า N เกินสูงสุดของโหมด ให้แบ่งเป็นหลายรอบด้วยลูป DJNZ'],
    schema: [
      { k: 'fosc', l: 'ความถี่คริสตัล', t: 'select', o: FOSC_OPT, d: 12 },
      { k: 'timeUs', l: 'เวลาที่ต้องการ (µs)', t: 'num', min: 0.1, step: 'any', d: 100 },
      { k: 'mode', l: 'โหมด', t: 'select', o: MODE_OPT, d: 1 },
      { k: 'timer', l: 'Timer ที่ใช้', t: 'select', o: TIMER_OPT, d: 0 }
    ],
    vary: [
      ['เวลาที่ต้องการ', '100 µs (ข้อ 4), 10 µs (ข้อ 9), 20 µs (Lecture 5)', '50, 200, 250, 500 µs, 1 ms, 2 ms, 50 ms หรือ 1 วินาที (ต้องทำลูป)'],
      ['ความถี่คริสตัล', '12 MHz ทุกข้อ', '6 MHz, 24 MHz หรือ 11.0592 MHz (ทำให้ N เป็นทศนิยมต้องปัดและคิด error)'],
      ['โหมด', 'Mode 1', 'Mode 0 (13 บิต) หรือ Mode 2 (ค่า reload 8 บิต)'],
      ['Timer', 'Timer 0', 'Timer 1: เปลี่ยนเป็น TH1, TL1, TMOD = 10H, TCON = 40H และตรวจ TF1 = TCON.7']
    ],
    question: function (p) {
      return 'คริสตัล ' + fmt(p.fosc) + ' MHz จงคำนวณค่าที่ต้องโหลดใน ' + regs(+p.timer).th + '/' + regs(+p.timer).tl + ' และค่า TMOD เพื่อให้ Timer ' + p.timer + ' ใน ' + MODE_NAME[p.mode] + ' หน่วงเวลา ' + fmtTime(+p.timeUs);
    },
    random: function (r, lv) {
      if (lv === 1) return { fosc: 12, timeUs: pick(r, [10, 20, 30, 40, 50, 60, 80, 100, 150, 200, 250, 500]), mode: 1, timer: 0 };
      if (lv === 2) {
        var f = pick(r, [12, 12, 6, 24]);
        var n = pick(r, [50, 100, 200, 250, 500, 1000, 2000, 2500, 5000, 10000, 20000, 50000]);
        var m = pick(r, [1, 1, 1, 0, 2]);
        if (m === 2) n = pick(r, [20, 50, 100, 200, 250]);
        if (m === 0) n = pick(r, [100, 500, 1000, 2000, 5000, 8000]);
        return { fosc: f, timeUs: n * 12 / f, mode: m, timer: pick(r, [0, 1]) };
      }
      var f3 = pick(r, [11.0592, 12, 6, 24, 16]);
      return { fosc: f3, timeUs: pick(r, [1000, 2000, 5000, 10000, 20000, 50000, 100000, 250000, 500000, 1000000]), mode: pick(r, [1, 1, 1, 0]), timer: pick(r, [0, 1]) };
    },
    solve: function (p) {
      var f = +p.fosc, t = +p.timeUs, m = +p.mode, tm = +p.timer, R = regs(tm);
      var tmc = 12 / f, max = MAXC[m], nEx = t / tmc, n = Math.round(nEx);
      var steps = [], notes = [], answers = [], code = '', loops = 1, per = n;
      if (!(f > 0) || !(t > 0)) return { ok: false, steps: [step('ใส่ค่าที่มากกว่า 0')], answers: [], notes: [], code: '' };
      steps.push(step('1 count = ' + c('12 ÷ ' + fmt(f) + ' MHz = ' + fmt(tmc) + ' µs'), '8051 แบบ 12T ใช้ 12 จังหวะ clock ต่อ 1 machine cycle และ Timer นับ 1 ต่อ 1 machine cycle'));
      steps.push(step('จำนวน count ' + c('N = ' + fmtTime(t) + ' ÷ ' + fmt(tmc) + ' µs = ' + fmt(nEx, 3)) + (near(nEx, n) ? '' : ' ปัดเป็น ' + c(String(n))), 'เวลา ÷ เวลาต่อ count = จำนวน count (ถ้าไม่ลงตัวต้องปัดและจะมี error)'));
      if (n < 1) return { ok: false, steps: steps.concat([step('N น้อยกว่า 1 count: Timer หน่วงได้ละเอียดสุด ' + fmt(tmc) + ' µs')]), answers: [], notes: [], code: '' };
      if (n > max) {
        var plan = loopPlan(t, tmc, max);
        if (!plan) { plan = { L: Math.ceil(n / max), per: Math.round(n / Math.ceil(n / max)) }; notes.push('หาตัวหารลงตัวไม่ได้ จึงปัดรอบละ ' + plan.per + ' counts (มี error)'); }
        loops = plan.L; per = plan.per;
        steps.push(step(c('N = ' + fmt(n) + ' > ' + fmt(max)) + ' เกินค่าสูงสุดของ ' + MODE_NAME[m] + ' จึงต้องวนลูป: ' + c(loops + ' รอบ × ' + fmt(per) + ' counts (' + fmtTime(per * tmc) + ' ต่อรอบ)'), 'Timer นับได้ไม่เกิน ' + fmt(max) + ' counts ต่อรอบ จึงแบ่งเวลาเป็นก้อนเท่า ๆ กันแล้วนับซ้ำด้วย DJNZ'));
      }
      var reload = max - per, sp = split(reload, m), dg = reloadDigits(m);
      if (m === 1) steps.push(step(c('FFFFH − ' + hex(per, 1) + ' + 1 = ' + hex(reload, 4)) + ' (เท่ากับ ' + c('65,536 − ' + fmt(per) + ' = ' + fmt(reload)) + ')', 'ตัวนับ 16 บิตล้นเมื่อผ่าน FFFFH จึงเริ่มห่างจากจุดล้นเท่ากับ N'));
      if (m === 0) steps.push(step(c('8,192 − ' + fmt(per) + ' = ' + fmt(reload) + ' = ' + hex(reload, 4)) + ' แล้ว TH = ค่า ÷ 32, TL = 5 บิตล่าง', 'Mode 0 ใช้ 13 บิต (TL 5 บิต + TH 8 บิต) จึงนับได้ 8,192 counts'));
      if (m === 2) steps.push(step(c('256 − ' + fmt(per) + ' = ' + fmt(reload) + ' = ' + hex(reload, 2)) + ' ใส่ทั้ง TH และ TL', 'Mode 2 ใช้ TL นับ 8 บิต และ TH เก็บค่า reload โหลดกลับอัตโนมัติเมื่อล้น'));
      steps.push(step(c(R.th + ' = ' + hex(sp.th, 2) + ',  ' + R.tl + ' = ' + hex(sp.tl, 2)), 'แยกค่าโหลดเป็นไบต์บนและไบต์ล่างของรีจิสเตอร์นับ'));
      var tmod = m << R.sh;
      steps.push(step(c('TMOD = ' + hex(tmod, 2) + ' (' + bin8(tmod) + ')') + ' และเริ่มนับด้วย ' + c('MOV TCON, ' + imm(R.tconRun, 2)), 'Timer ' + tm + ' ใช้ครึ่' + (tm === 1 ? 'งบน' : 'งล่าง') + 'ของ TMOD, C/T = 0 คือ Timer และ GATE = 0; ' + R.tr + ' = 1 คือสั่งเริ่มนับ'));
      var actual = per * loops * tmc, err = (actual - t) / t * 100;
      steps.push(step('ตรวจเวลาจริง ' + c(fmt(per) + ' × ' + fmt(tmc) + ' µs' + (loops > 1 ? ' × ' + loops : '') + ' = ' + fmtTime(actual)) + ' คลาด ' + c(fmt(err, 3) + '%') + ' (ยังไม่รวมเวลาคำสั่งควบคุม)', 'ตรวจย้อนกลับเสมอ: ถ้าไม่ตรงเวลาที่โจทย์ขอ แปลว่าลืม +1 หรือกลับ TH/TL'));
      if (m === 0 || m === 2) notes.push('สูตร FFFFH − N + 1 ของ Lecture 5 ใช้กับ Mode 1 ส่วนโหมดอื่นให้ใช้ (ค่าสูงสุดของโหมด − N) หลักเดียวกัน');
      if (Math.abs(err) > 0.5) notes.push('error เกิน 0.5% เพราะ N ไม่ลงตัว: ข้อสอบมักให้ตัวเลขที่ลงตัว ถ้าไม่ลงตัวให้เขียนว่าปัดค่าและบอก error');
      if (loops > 1) {
        answers.push(ans('loops', 'จำนวนรอบลูป (R2)', 'dec', loops, String(loops)), ans('per', 'N ต่อรอบ (count)', 'dec', per, fmt(per)));
        code = '        MOV   R2, #' + loops + '           ; จำนวนรอบ\nLoop:\n' + waitCode(tm, m, sp.th, sp.tl, tmod, 'Wait').replace(/\n/g, '\n') + '\n        DJNZ  R2, Loop';
      } else {
        answers.push(ans('n', 'จำนวน count N', 'dec', per, fmt(per)));
        code = waitCode(tm, m, sp.th, sp.tl, tmod, 'Wait');
      }
      answers.push(ans('reload', 'ค่าโหลด (ฐาน 16)', 'hex', reload, hex(reload, dg)), ans('th', R.th, 'hex', sp.th, hex(sp.th, 2)), ans('tl', R.tl, 'hex', sp.tl, hex(sp.tl, 2)), ans('tmod', 'TMOD', 'hex', tmod, hex(tmod, 2)));
      return { ok: true, steps: steps, answers: answers, notes: notes, code: code };
    }
  });

  /* ---- 2. square wave / PWM duty ---- */
  def({
    id: 'square', name: 'คลื่นสี่เหลี่ยม / PWM duty cycle', tag: 'ตัวอย่าง 1 kHz, ข้อ 19',
    idea: ['ความถี่ f ให้คาบ T = 1 ÷ f แล้วแบ่งเป็นช่วง High กับ Low', 'แต่ละช่วงคือ "การหน่วงเวลา" หนึ่งครั้ง คำนวณ N และค่าโหลดแบบเดียวกับข้อ 4', 'duty 50% ใช้ CPL ทุกครั้งที่ TF = 1 ส่วน duty อื่นต้องโหลดสองค่า (High กับ Low ต่างกัน) สลับ SETB / CLR'],
    schema: [
      { k: 'fosc', l: 'ความถี่คริสตัล', t: 'select', o: FOSC_OPT, d: 12 },
      { k: 'freq', l: 'ความถี่ที่ต้องการ (Hz)', t: 'num', min: 0.01, step: 'any', d: 1000 },
      { k: 'duty', l: 'Duty cycle (% ช่วง High)', t: 'num', min: 1, max: 99, step: 'any', d: 50 },
      { k: 'mode', l: 'โหมด', t: 'select', o: MODE_OPT, d: 1 },
      { k: 'timer', l: 'Timer ที่ใช้', t: 'select', o: TIMER_OPT, d: 0 }
    ],
    vary: [
      ['ความถี่', '1 kHz (Lecture 5 หน้า 21)', '500 Hz, 2 kHz, 5 kHz, 50 Hz, 100 Hz (ครึ่งคาบต้องไม่เกิน 65,536 counts)'],
      ['Duty cycle', '50% (High = Low)', '25%, 75% (PWM ข้อ 19), 10%, 60%: High กับ Low ใช้ค่าโหลดต่างกัน'],
      ['คริสตัล', '12 MHz', '6, 24, 11.0592 MHz'],
      ['ขาที่ออก', 'P3.1 (TxD) ใน Lecture 5', 'ขาใดก็ได้ เช่น P1.0 (แค่เปลี่ยนชื่อบิตใน CPL / SETB / CLR)']
    ],
    question: function (p) {
      return 'คริสตัล ' + fmt(p.fosc) + ' MHz จงคำนวณค่า ' + regs(+p.timer).th + '/' + regs(+p.timer).tl + ' เพื่อสร้างคลื่นสี่เหลี่ยมความถี่ ' + fmt(p.freq) + ' Hz duty cycle ' + fmt(p.duty) + '% ด้วย Timer ' + p.timer + ' ' + MODE_NAME[p.mode];
    },
    random: function (r, lv) {
      if (lv === 1) return { fosc: 12, freq: pick(r, [500, 1000, 1000, 2000, 2500, 4000, 5000, 10000]), duty: 50, mode: 1, timer: 0 };
      if (lv === 2) return { fosc: pick(r, [12, 6, 24]), freq: pick(r, [50, 100, 200, 250, 400, 500, 800, 1000, 2000]), duty: 50, mode: 1, timer: pick(r, [0, 1]) };
      return { fosc: pick(r, [12, 12, 6, 24, 11.0592]), freq: pick(r, [100, 200, 250, 500, 1000, 2000]), duty: pick(r, [25, 75, 20, 80, 10, 60, 30]), mode: 1, timer: pick(r, [0, 1]) };
    },
    solve: function (p) {
      var f = +p.fosc, hz = +p.freq, d = +p.duty, m = +p.mode, tm = +p.timer, R = regs(tm);
      if (!(f > 0) || !(hz > 0) || !(d > 0) || !(d < 100)) return { ok: false, steps: [step('ใส่ความถี่ > 0 และ duty ระหว่าง 1 ถึง 99')], answers: [], notes: [], code: '' };
      var tmc = 12 / f, max = MAXC[m], period = 1e6 / hz, hi = period * d / 100, lo = period - hi;
      var nh = Math.round(hi / tmc), nl = Math.round(lo / tmc), steps = [], notes = [], answers = [];
      steps.push(step('คาบ ' + c('T = 1 ÷ ' + fmt(hz) + ' Hz = ' + fmtTime(period)), 'ความถี่ = จำนวนรอบต่อวินาที คาบคือเวลาต่อ 1 รอบ'));
      steps.push(step('High = ' + c(fmt(d) + '% × ' + fmtTime(period) + ' = ' + fmtTime(hi)) + ' , Low = ' + c(fmtTime(lo)), 'duty cycle คือสัดส่วนเวลาที่สัญญาณเป็น 1 ต่อคาบ (50% คือ High = Low)'));
      steps.push(step('1 count = ' + c('12 ÷ ' + fmt(f) + ' = ' + fmt(tmc) + ' µs') + ' ดังนั้น ' + c('N(High) = ' + fmt(nh) + ', N(Low) = ' + fmt(nl)), 'แปลงแต่ละช่วงเวลาเป็นจำนวน count เหมือนข้อ 4'));
      if (nh < 1 || nl < 1 || nh > max || nl > max) {
        return { ok: false, steps: steps.concat([step('N เกิน ' + fmt(max) + ' หรือน้อยกว่า 1 ใน ' + MODE_NAME[m] + ': เปลี่ยนโหมดหรือทำลูป', '')]), answers: [], notes: [], code: '' };
      }
      var rh = max - nh, rl = max - nl, sh = split(rh, m), sl = split(rl, m), dg = reloadDigits(m), same = nh === nl;
      steps.push(step(c('โหลด High = ' + hex(rh, dg) + ' → ' + R.th + '=' + hex(sh.th, 2) + ', ' + R.tl + '=' + hex(sh.tl, 2)) + (same ? '' : ' และ ' + c('โหลด Low = ' + hex(rl, dg) + ' → ' + R.th + '=' + hex(sl.th, 2) + ', ' + R.tl + '=' + hex(sl.tl, 2))), 'ค่าโหลด = ค่าสูงสุดของโหมด − N ของแต่ละช่วง'));
      var actualF = 1e6 / ((nh + nl) * tmc), err = (actualF - hz) / hz * 100;
      steps.push(step('ตรวจความถี่จริง ' + c(fmt(actualF, 3) + ' Hz') + ' คลาด ' + c(fmt(err, 3) + '%') + ' (ไม่รวมเวลาคำสั่ง)', 'ทำให้รู้ว่าปัดแล้วยังใช้ได้ไหม'));
      var tmod = m << R.sh;
      answers.push(ans('nh', 'N ช่วง High', 'dec', nh, fmt(nh)), ans('rh', 'ค่าโหลด High', 'hex', rh, hex(rh, dg)));
      if (!same) answers.push(ans('nl', 'N ช่วง Low', 'dec', nl, fmt(nl)), ans('rl', 'ค่าโหลด Low', 'hex', rl, hex(rl, dg)));
      answers.push(ans('th', R.th + ' (High)', 'hex', sh.th, hex(sh.th, 2)), ans('tl', R.tl + ' (High)', 'hex', sh.tl, hex(sh.tl, 2)));
      var code;
      if (same) {
        code = '        CLR   P1.0\nRepeat:\n' + waitCode(tm, m, sh.th, sh.tl, tmod, 'Wait') + '\n        CPL   P1.0             ; สลับ High/Low\n        SJMP  Repeat';
      } else {
        code = 'Repeat:\n        SETB  P1.0             ; ช่วง High\n' + waitCode(tm, m, sh.th, sh.tl, tmod, 'WaitH') + '\n        CLR   P1.0             ; ช่วง Low\n' + waitCode(tm, m, sl.th, sl.tl, tmod, 'WaitL') + '\n        SJMP  Repeat';
        notes.push('duty ไม่ใช่ 50% จึงต้องโหลดค่าใหม่ทุกครั้งที่สลับ (High กับ Low ใช้ค่าโหลดต่างกัน)');
      }
      if (Math.abs(err) > 0.5) notes.push('ความถี่จริงคลาดเกิน 0.5% เพราะปัด N: ควรบอก error ในคำตอบ');
      return { ok: true, steps: steps, answers: answers, notes: notes, code: code };
    }
  });

  /* ---- 3. reverse: from TH/TL to time ---- */
  def({
    id: 'reverse', name: 'ย้อนกลับ: ให้ TH/TL แล้วหาเวลาที่ได้', tag: 'ข้อ 3, 4 (กลับทาง)',
    idea: ['จำนวน count ก่อนล้น = ค่าสูงสุดของโหมด − ค่าที่โหลด', 'เวลา = จำนวน count × เวลาต่อ count (12 ÷ Fosc)', 'รอบถัดไปถ้าไม่โหลดใหม่ ตัวนับเริ่มจาก 0000H จึงนับเต็มค่าสูงสุด (Mode 2 โหลดจาก TH อัตโนมัติ)'],
    schema: [
      { k: 'fosc', l: 'ความถี่คริสตัล', t: 'select', o: FOSC_OPT, d: 12 },
      { k: 'mode', l: 'โหมด', t: 'select', o: MODE_OPT, d: 1 },
      { k: 'th', l: 'ค่า TH (ฐาน 16)', t: 'hex', d: 'FC' },
      { k: 'tl', l: 'ค่า TL (ฐาน 16)', t: 'hex', d: '18' }
    ],
    vary: [
      ['ค่า TH/TL ที่ให้', 'FF9CH (100 µs), FFF6H (10 µs), FFECH (20 µs), FE0CH (500 µs)', 'ค่าใดก็ได้ เช่น FC18H (1 ms), 3CB0H (50 ms), 0000H (นับเต็ม)'],
      ['ถามอะไร', 'เวลาหน่วงครั้งแรก', 'เวลารอบถัดไปโดยไม่โหลดใหม่ (65,536 µs) หรือ TF ขึ้นหลังกี่ count'],
      ['โหมด / คริสตัล', 'Mode 1, 12 MHz', 'Mode 2 (TL ล้นแล้วโหลดจาก TH) หรือคริสตัลอื่น']
    ],
    question: function (p) {
      return 'คริสตัล ' + fmt(p.fosc) + ' MHz ' + MODE_NAME[p.mode] + ' โหลด TH = ' + String(p.th).toUpperCase() + 'H, TL = ' + String(p.tl).toUpperCase() + 'H จงหาเวลาที่ Timer นับจนธง TF = 1 ครั้งแรก และรอบถัดไปถ้าไม่โหลดใหม่';
    },
    random: function (r, lv) {
      var m = lv === 1 ? 1 : pick(r, [1, 1, 0, 2]), f = lv === 1 ? 12 : pick(r, [12, 6, 24, 11.0592]), n, max = MAXC[m], rel;
      if (lv === 1) n = pick(r, [10, 20, 50, 100, 200, 500, 1000]); else n = pick(r, [10, 50, 100, 250, 500, 1000, 2500, 5000, 20000, 50000]);
      if (n > max) n = Math.floor(max / 2);
      rel = max - n;
      var s = split(rel, m);
      return { fosc: f, mode: m, th: hex0(s.th, 2), tl: hex0(s.tl, 2) };
    },
    solve: function (p) {
      var f = +p.fosc, m = +p.mode, th = parseInt(p.th, 16), tl = parseInt(p.tl, 16), tmc = 12 / f, max = MAXC[m];
      if (isNaN(th) || isNaN(tl) || th > 255 || tl > 255 || th < 0 || tl < 0) return { ok: false, steps: [step('ใส่ TH และ TL เป็นเลขฐาน 16 ไม่เกิน FF')], answers: [], notes: [], code: '' };
      var reload, steps = [], notes = [], answers = [];
      if (m === 1) reload = th * 256 + tl; else if (m === 0) { reload = th * 32 + (tl & 31); if (th > 255 || (tl & 224)) notes.push('Mode 0 ใช้ TL แค่ 5 บิตล่าง จึงตัดบิตบนของ TL ทิ้ง'); } else reload = tl;
      var n = max - reload, next = m === 2 ? (256 - th) : max;
      steps.push(step('ค่าที่โหลด ' + c(m === 1 ? hex(th, 2) + hex0(tl, 2) : m === 0 ? 'TH×32 + TL(5 บิต) = ' + fmt(reload) : 'TL = ' + hex(tl, 2)) + ' = ' + c(fmt(reload)) + ' (ฐาน 10)', 'รวมไบต์บนและล่างกลับเป็นค่าเดียวของตัวนับ'));
      steps.push(step('count ก่อนล้น ' + c('N = ' + fmt(max) + ' − ' + fmt(reload) + ' = ' + fmt(n)), 'ตัวนับนับขึ้นจนล้นที่ ' + fmt(max) + ' จึงเหลืออีก (สูงสุด − ค่าที่โหลด) ครั้ง'));
      steps.push(step('เวลาแรก ' + c(fmt(n) + ' × ' + fmt(12 / f) + ' µs = ' + fmtTime(n * tmc)), 'จำนวน count × เวลาต่อ count'));
      steps.push(step(m === 2 ? 'Mode 2 โหลดจาก TH อัตโนมัติ รอบถัดไป ' + c(fmt(next) + ' × ' + fmt(tmc) + ' = ' + fmtTime(next * tmc)) : 'รอบถัดไปไม่โหลดใหม่ ตัวนับเริ่มที่ 0 จึงนับเต็ม ' + c(fmt(max) + ' × ' + fmt(tmc) + ' = ' + fmtTime(next * tmc)), 'จุดที่ข้อสอบชอบถาม: ลืมโหลดซ้ำแล้วเวลาเพี้ยน'));
      answers.push(ans('n', 'จำนวน count ก่อนล้น', 'dec', n, fmt(n)), ans('t1', 'เวลาครั้งแรก (µs)', 'num', n * tmc, fmt(n * tmc, 3), 0.005), ans('t2', 'เวลารอบถัดไป (µs)', 'num', next * tmc, fmt(next * tmc, 3), 0.005));
      return { ok: true, steps: steps, answers: answers, notes: notes, code: '' };
    }
  });

  /* ---- 4. counter ---- */
  def({
    id: 'counter', name: 'ตั้งเป็น Counter นับพัลส์ภายนอก', tag: 'ข้อ 1, 8',
    idea: ['Counter ต่างจาก Timer แค่แหล่ง clock: บิต C/T = 1 นับขอบขาลงที่ขา T0 (P3.4) หรือ T1 (P3.5)', 'อยากให้ TF ขึ้นหลังนับ N พัลส์ ก็โหลด สูงสุด − N เหมือน Timer', 'ความถี่ของพัลส์ไม่มีผลกับค่าโหลด แต่ต้องไม่เกิน Fosc ÷ 24'],
    schema: [
      { k: 'fosc', l: 'ความถี่คริสตัล (ใช้เช็กขีดจำกัดพัลส์)', t: 'select', o: FOSC_OPT, d: 12 },
      { k: 'n', l: 'จำนวนพัลส์ที่ให้ TF ขึ้น', t: 'num', min: 1, step: 1, d: 100 },
      { k: 'mode', l: 'โหมด', t: 'select', o: MODE_OPT, d: 1 },
      { k: 'timer', l: 'Timer ที่ใช้', t: 'select', o: TIMER_OPT, d: 0 },
      { k: 'gate', l: 'GATE', t: 'select', o: [{ v: 0, l: 'GATE = 0 (ไม่ขึ้นกับ INTx)' }, { v: 1, l: 'GATE = 1 (นับเมื่อ INTx = 1)' }], d: 0 }
    ],
    vary: [
      ['Timer ที่ใช้', 'Timer 0 (ข้อ 8: ขา T0)', 'Timer 1 (ขา T1 = P3.5, TMOD = 50H สำหรับ Mode 1)'],
      ['จำนวนพัลส์', 'ไม่ระบุตัวเลขในข้อสอบ', 'นับ 100, 1000 หรือ 50,000 พัลส์แล้วขอค่าโหลด'],
      ['GATE', '0', '1 (วัดความกว้างพัลส์ที่ขา INT0 / INT1)'],
      ['โหมด', 'Mode 1', 'Mode 2 (นับได้ไม่เกิน 255 พัลส์)']
    ],
    question: function (p) {
      return 'ตั้ง Timer ' + p.timer + ' ให้เป็น Counter ' + MODE_NAME[p.mode] + ' นับพัลส์จากขา ' + regs(+p.timer).pin + ' ให้ธง TF' + p.timer + ' = 1 เมื่อนับครบ ' + fmt(p.n) + ' พัลส์ จงหาค่า TMOD และค่าที่ต้องโหลด';
    },
    random: function (r, lv) {
      var m = lv === 1 ? 1 : pick(r, [1, 1, 2]);
      return { fosc: 12, n: m === 2 ? pick(r, [10, 50, 100, 200]) : pick(r, lv === 1 ? [10, 100, 200, 500] : [100, 500, 1000, 5000, 20000]), mode: m, timer: lv === 1 ? 0 : pick(r, [0, 1]), gate: lv === 3 ? pick(r, [0, 1]) : 0 };
    },
    solve: function (p) {
      var m = +p.mode, tm = +p.timer, n = Math.round(+p.n), max = MAXC[m], R = regs(tm), f = +p.fosc, g = +p.gate;
      if (!(n >= 1) || n > max) return { ok: false, steps: [step('จำนวนพัลส์ต้องอยู่ระหว่าง 1 ถึง ' + fmt(max) + ' สำหรับ ' + MODE_NAME[m])], answers: [], notes: [], code: '' };
      var reload = max - n, sp = split(reload, m), dg = reloadDigits(m), nib = (g << 3) | 4 | m, tmod = nib << R.sh;
      var steps = [
        step('เลือก Counter: ตั้ง ' + c('C/T = 1') + ' ของ Timer ' + tm, 'C/T = 1 ทำให้ตัวนับรับพัลส์จากขา ' + R.pin + ' แทน clock ภายใน (Lecture 5 หน้า 11)'),
        step(c('TMOD = GATE' + '(' + g + ') C/T(1) M1M0(' + (m >> 1) + (m & 1) + ') = ' + bin8(tmod).slice(0, 9) + ' = ' + hex(tmod, 2)), 'ประกอบบิต GATE, C/T, M1, M0 ของ Timer ที่เลือกเป็นครึ่งไบต์ (Timer 1 อยู่ครึ่งบน)'),
        step(c('โหลด = ' + fmt(max) + ' − ' + fmt(n) + ' = ' + fmt(reload) + ' = ' + hex(reload, dg) + ' → ' + R.th + '=' + hex(sp.th, 2) + ', ' + R.tl + '=' + hex(sp.tl, 2)), 'นับขึ้นจนล้นหลัง N พัลส์เหมือนข้อ 4 (1 พัลส์ = 1 count)'),
        step('สั่งเริ่มนับ ' + c('SETB ' + R.tr) + (g ? ' และต้องให้ขา INT' + tm + ' = 1 ด้วยจึงจะนับ' : ''), 'ต้อง TR = 1 ตัวนับจึงจะทำงาน (ข้อ 5)'),
        step('ขีดจำกัดความถี่พัลส์ ' + c('Fosc ÷ 24 = ' + fmt(f / 24, 4) + ' MHz'), 'ขา T0/T1 ถูกสุ่มอ่านทุก machine cycle ต้องเห็น 1 แล้ว 0 จึงนับได้ 1 ครั้ง (นอกสไลด์)')
      ];
      var answers = [ans('tmod', 'TMOD', 'hex', tmod, hex(tmod, 2)), ans('reload', 'ค่าโหลด', 'hex', reload, hex(reload, dg)), ans('th', R.th, 'hex', sp.th, hex(sp.th, 2)), ans('tl', R.tl, 'hex', sp.tl, hex(sp.tl, 2))];
      var code = '        MOV   TMOD, ' + imm(tmod, 2) + '\n        MOV   ' + R.th + ', ' + imm(sp.th, 2) + '\n        MOV   ' + R.tl + ', ' + imm(sp.tl, 2) + '\n        SETB  ' + R.tr + '\nWait:   JNB   ' + R.tfBit + ', Wait       ; นับครบ ' + fmt(n) + ' พัลส์\n        CLR   ' + R.tr + '\n        CLR   ' + R.tf;
      return { ok: true, steps: steps, answers: answers, notes: [], code: code };
    }
  });

  /* ---- 5. TMOD builder ---- */
  def({
    id: 'tmod', name: 'ประกอบค่า TMOD และ TCON', tag: 'ข้อ 5, 7, 8',
    idea: ['TMOD 8 บิต แบ่งครึ่ง: ครึ่งบน (บิต 7 ถึง 4) คุม Timer 1 ครึ่งล่าง (บิต 3 ถึง 0) คุม Timer 0', 'แต่ละครึ่งเรียง GATE, C/T, M1, M0 จากซ้ายไปขวา', 'TCON: TR0 = บิต 4 (10H), TR1 = บิต 6 (40H) ใช้สั่งเริ่มนับ'],
    schema: [
      { k: 't1f', l: 'Timer 1 ทำหน้าที่', t: 'select', o: [{ v: 0, l: 'Timer (C/T = 0)' }, { v: 1, l: 'Counter (C/T = 1)' }], d: 0 },
      { k: 't1m', l: 'Timer 1 โหมด', t: 'select', o: [{ v: 0, l: 'Mode 0' }, { v: 1, l: 'Mode 1' }, { v: 2, l: 'Mode 2' }], d: 2 },
      { k: 't1g', l: 'Timer 1 GATE', t: 'select', o: [{ v: 0, l: '0' }, { v: 1, l: '1' }], d: 0 },
      { k: 't0f', l: 'Timer 0 ทำหน้าที่', t: 'select', o: [{ v: 0, l: 'Timer (C/T = 0)' }, { v: 1, l: 'Counter (C/T = 1)' }], d: 0 },
      { k: 't0m', l: 'Timer 0 โหมด', t: 'select', o: [{ v: 0, l: 'Mode 0' }, { v: 1, l: 'Mode 1' }, { v: 2, l: 'Mode 2' }, { v: 3, l: 'Mode 3' }], d: 1 },
      { k: 't0g', l: 'Timer 0 GATE', t: 'select', o: [{ v: 0, l: '0' }, { v: 1, l: '1' }], d: 0 }
    ],
    vary: [
      ['Timer ที่ตั้ง', 'Timer 0 Mode 1 = 01H (ข้อ 4, 9)', 'Timer 1 Mode 2 = 20H (baud rate), ตั้งสองตัวพร้อมกัน เช่น 21H'],
      ['C/T', 'Counter Timer 0 = 05H (ข้อ 8)', 'Counter Timer 1 = 50H หรือ Timer 0 Counter Mode 2 = 06H'],
      ['GATE', '0', 'GATE = 1 เช่น 09H (Timer 0 Mode 1 คุมด้วย INT0)']
    ],
    question: function (p) {
      function t(f, m, g, n) { return 'Timer ' + n + ' เป็น ' + (+f ? 'Counter' : 'Timer') + ' Mode ' + m + ' GATE = ' + g; }
      return 'จงหาค่า TMOD (ฐาน 16) เมื่อ ' + t(p.t1f, p.t1m, p.t1g, 1) + ' และ ' + t(p.t0f, p.t0m, p.t0g, 0) + ' แล้วหาค่า TCON เพื่อสั่งให้ทั้งสองตัวเริ่มนับ';
    },
    random: function (r, lv) {
      if (lv === 1) return { t1f: 0, t1m: 1, t1g: 0, t0f: pick(r, [0, 1]), t0m: pick(r, [0, 1, 2]), t0g: 0 };
      return { t1f: pick(r, [0, 1]), t1m: pick(r, [0, 1, 2]), t1g: lv === 3 ? pick(r, [0, 1]) : 0, t0f: pick(r, [0, 1]), t0m: pick(r, [0, 1, 2, 3]), t0g: lv === 3 ? pick(r, [0, 1]) : 0 };
    },
    solve: function (p) {
      var hi = (+p.t1g << 3) | (+p.t1f << 2) | +p.t1m, lo = (+p.t0g << 3) | (+p.t0f << 2) | +p.t0m, tmod = (hi << 4) | lo;
      function b4(v) { var s = v.toString(2); while (s.length < 4) s = '0' + s; return s; }
      var steps = [
        step('Timer 1 (ครึ่งบน): ' + c('GATE ' + p.t1g + ' | C/T ' + p.t1f + ' | M1M0 ' + b4(+p.t1m).slice(2)) + ' = ' + c(b4(hi)), 'GATE 1 = คุมด้วยขา INT, C/T 1 = Counter, M1M0 เลือกโหมด 0 ถึง 3'),
        step('Timer 0 (ครึ่งล่าง): ' + c('GATE ' + p.t0g + ' | C/T ' + p.t0f + ' | M1M0 ' + b4(+p.t0m).slice(2)) + ' = ' + c(b4(lo)), 'ทำแบบเดียวกันกับครึ่งล่าง'),
        step('ต่อกัน ' + c(b4(hi) + ' ' + b4(lo) + 'B = ' + hex(tmod, 2)), 'ครึ่งบนคือเลขฐาน 16 หลักหน้า ครึ่งล่างคือหลักหลัง'),
        step('TCON เริ่มทั้งสองตัว: ' + c('TR1 (บิต 6) + TR0 (บิต 4) = 0101 0000B = 50H'), 'TR0 = 10H, TR1 = 40H รวมกันเป็น 50H (ถ้าเริ่มตัวเดียว ใช้ 10H หรือ 40H)')
      ];
      return { ok: true, steps: steps, answers: [ans('tmod', 'TMOD', 'hex', tmod, hex(tmod, 2)), ans('tcon', 'TCON (เริ่มทั้งคู่)', 'hex', 0x50, '50H')], notes: +p.t0m === 3 ? ['Mode 3 มีเฉพาะ Timer 0: TL0 และ TH0 เป็น Timer 8 บิตอิสระสองตัว (TH0 ใช้ TR1 และ TF1)'] : [], code: '        MOV   TMOD, ' + imm(tmod, 2) + '\n        MOV   TCON, #50H       ; TR1 = 1, TR0 = 1' };
    }
  });

  /* ---- 6. max delay ---- */
  def({
    id: 'maxdelay', name: 'ค่าสูงสุดของแต่ละโหมด', tag: 'ข้อ 7',
    idea: ['จำนวน count สูงสุด: Mode 0 = 8,192, Mode 1 = 65,536, Mode 2 = 256', 'เวลาสูงสุด = จำนวน count สูงสุด × (12 ÷ Fosc) (Lecture 5 หน้า 15 ถึง 17 เขียนเป็น 8192 (12/Fosc) ฯลฯ)', 'อยากได้เวลายาวกว่านั้น ต้องวนลูป'],
    schema: [
      { k: 'fosc', l: 'ความถี่คริสตัล', t: 'select', o: FOSC_OPT, d: 12 },
      { k: 'mode', l: 'โหมด', t: 'select', o: MODE_OPT, d: 1 },
      { k: 'target', l: 'เวลาที่อยากได้ (ms) เพื่อหาจำนวนรอบ', t: 'num', min: 0.001, step: 'any', d: 1000 }
    ],
    vary: [
      ['โหมด', 'ทั้ง 4 โหมดในสไลด์', 'ถามค่าสูงสุดของโหมดใดก็ได้'],
      ['คริสตัล', '12 MHz', 'ค่าอื่น: เวลาสูงสุดเปลี่ยนตาม 12 ÷ Fosc'],
      ['เวลาเป้าหมาย', '-', '1 วินาที: ต้องวนกี่รอบ']
    ],
    question: function (p) { return 'คริสตัล ' + fmt(p.fosc) + ' MHz ' + MODE_NAME[p.mode] + ' หน่วงได้นานสุดเท่าไร และถ้าต้องการ ' + fmt(p.target) + ' ms ต้องวนกี่รอบ'; },
    random: function (r, lv) { return { fosc: lv === 1 ? 12 : pick(r, [12, 6, 24, 11.0592]), mode: pick(r, [0, 1, 2]), target: pick(r, [100, 500, 1000, 2000]) }; },
    solve: function (p) {
      var f = +p.fosc, m = +p.mode, max = MAXC[m], tmc = 12 / f, tmax = max * tmc, tgt = +p.target * 1000;
      var loops = Math.ceil(tgt / tmax);
      var steps = [
        step('จำนวน count สูงสุดของ ' + MODE_NAME[m] + ' = ' + c(fmt(max)), 'Mode 0: 2^13, Mode 1: 2^16, Mode 2: 2^8 (จำนวนบิตของตัวนับ)'),
        step('1 count = ' + c(fmt(tmc) + ' µs'), '12 ÷ Fosc'),
        step('เวลาสูงสุด ' + c(fmt(max) + ' × ' + fmt(tmc) + ' = ' + fmtTime(tmax)), 'ค่านี้เกิดเมื่อโหลด 0000H (นับเต็ม)'),
        step('เป้าหมาย ' + c(fmtTime(tgt)) + ' ต้องวนอย่างน้อย ' + c(fmt(tgt) + ' ÷ ' + fmt(tmax, 3) + ' → ' + loops + ' รอบ'), 'ปัดขึ้นเสมอ แล้วแบ่งเวลาเท่า ๆ กันเพื่อให้ลงตัว')
      ];
      return { ok: true, steps: steps, answers: [ans('max', 'count สูงสุด', 'dec', max, fmt(max)), ans('tmax', 'เวลาสูงสุด (µs)', 'num', tmax, fmt(tmax, 3), 0.005), ans('loops', 'จำนวนรอบขั้นต่ำ', 'dec', loops, String(loops))], notes: [], code: '' };
    }
  });

  /* ---- 7. baud rate ---- */
  def({
    id: 'baud', name: 'Baud rate ด้วย Timer 1 Mode 2', tag: 'ข้อ 10 (ต่อยอด)',
    idea: ['Serial Mode 1 ใช้ Timer 1 Mode 2 (auto-reload) สร้าง baud rate: สไลด์ Lecture 6 หน้า 4 ระบุแค่ Variable', 'สูตรมาตรฐานของ 8051: TH1 = 256 − (2 ยกกำลัง SMOD × Fosc) ÷ (384 × baud)', '11.0592 MHz ลงตัวพอดี จึงเป็นคริสตัลของงาน UART (Mazidi หน้า 428)'],
    schema: [
      { k: 'fosc', l: 'ความถี่คริสตัล', t: 'select', o: FOSC_OPT, d: 11.0592 },
      { k: 'baud', l: 'Baud rate', t: 'select', o: [{ v: 1200, l: '1200' }, { v: 2400, l: '2400' }, { v: 4800, l: '4800' }, { v: 9600, l: '9600' }, { v: 19200, l: '19200' }], d: 9600 },
      { k: 'smod', l: 'SMOD (PCON.7)', t: 'select', o: [{ v: 0, l: '0' }, { v: 1, l: '1 (baud เร็วขึ้น 2 เท่า)' }], d: 0 }
    ],
    vary: [
      ['Baud rate', '9600 (ตัวอย่างทั่วไป)', '1200, 2400, 4800, 19200 (SMOD = 1 สำหรับ 19200 ที่ 11.0592 MHz)'],
      ['คริสตัล', '11.0592 MHz', '12 MHz: ได้ค่าโหลดปัดแล้วมี error หลายเปอร์เซ็นต์'],
      ['ถามอะไร', 'TH1', 'baud จริงและ error, ค่า SCON (50H = Mode 1 + REN)']
    ],
    question: function (p) { return 'คริสตัล ' + fmt(p.fosc) + ' MHz ต้องการสื่อสารอนุกรม Mode 1 ที่ ' + p.baud + ' baud (SMOD = ' + p.smod + ') จงหา TH1, TMOD และ baud จริงที่ได้'; },
    random: function (r, lv) { return { fosc: lv === 1 ? 11.0592 : pick(r, [11.0592, 11.0592, 12, 22.1184]), baud: pick(r, [1200, 2400, 4800, 9600, 19200]), smod: lv === 3 ? pick(r, [0, 1]) : 0 }; },
    solve: function (p) {
      var f = +p.fosc, b = +p.baud, s = +p.smod, k = Math.pow(2, s) * f * 1e6 / (384 * b), q = Math.round(k);
      if (q < 1 || q > 255) return { ok: false, steps: [step('ค่าหารเป็น ' + fmt(k, 3) + ' อยู่นอกช่วง 1 ถึง 255: baud นี้ทำไม่ได้กับคริสตัลนี้')], answers: [], notes: [], code: '' };
      var th = 256 - q, actual = Math.pow(2, s) * f * 1e6 / (384 * q), err = (actual - b) / b * 100;
      var steps = [
        step(c('ตัวหาร = (2^' + s + ' × ' + fmt(f) + 'M) ÷ (384 × ' + b + ') = ' + fmt(k, 4)), 'Timer 1 Mode 2 ล้นทุก (256 − TH1) counts และ UART หารต่ออีกตามสูตรมาตรฐาน'),
        step('ปัดเป็น ' + c(String(q)) + ' ดังนั้น ' + c('TH1 = 256 − ' + q + ' = ' + fmt(th) + ' = ' + hex(th, 2)), 'Mode 2 ต้องโหลด TH1 (ค่า reload) และ TL1 ค่าเดียวกัน'),
        step(c('TMOD = 20H') + ' (Timer 1 Mode 2) และ ' + c('SCON = 50H') + ' (Serial Mode 1, REN = 1) แล้ว ' + c('SETB TR1'), 'M1M0 = 10 ที่ครึ่งบนของ TMOD; SCON: SM0 SM1 = 01, REN = 1'),
        step('baud จริง ' + c(fmt(actual, 1)) + ' คลาด ' + c(fmt(err, 2) + '%'), 'error เกินประมาณ 2 ถึง 3% อาจสื่อสารผิดพลาด จึงเลือกคริสตัล 11.0592 MHz')
      ];
      return { ok: true, steps: steps, answers: [ans('th', 'TH1', 'hex', th, hex(th, 2)), ans('tmod', 'TMOD', 'hex', 0x20, '20H'), ans('act', 'baud จริง', 'num', actual, fmt(actual, 1), 0.005)], notes: Math.abs(err) > 2.5 ? ['error เกิน 2.5%: ไม่เหมาะกับงานจริง'] : [], code: '        MOV   TMOD, #20H\n        MOV   TH1, ' + imm(th, 2) + '\n        MOV   SCON, #50H\n        ' + (s ? 'ORL   PCON, #80H       ; SMOD = 1\n        ' : '') + 'SETB  TR1' };
    }
  });

  /* ------------------------------------------------------------ public engine */
  var LEVELS = { 1: 'ระดับ 1: ตรงตามสไลด์', 2: 'ระดับ 2: ดัดแปลงจากข้อสอบเก่า', 3: 'ระดับ 3: พลิกแพลงหนัก' };

  function defaults(id) { var o = {}; FAMILIES[id].schema.forEach(function (f) { o[f.k] = f.d; }); return o; }
  function makeProblem(id, level, seed) {
    var r = mulberry32(seed), fam = FAMILIES[id], p, i, res;
    for (i = 0; i < 40; i++) {
      p = fam.random(r, level);
      res = fam.solve(p);
      if (res.ok) return p;
    }
    return defaults(id);
  }

  var api = { FAMILIES: FAMILIES, ORDER: ORDER, LEVELS: LEVELS, makeProblem: makeProblem, defaults: defaults, solve: function (id, p) { return FAMILIES[id].solve(p); }, mulberry32: mulberry32 };
  root.Exam2025Sim = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof document === 'undefined') return;

  /* ------------------------------------------------------------ UI */
  function byId(id) { return document.getElementById(id); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; }

  function readParams(form, fam) {
    var p = {};
    fam.schema.forEach(function (f) {
      var node = form.querySelector('[data-k="' + f.k + '"]');
      if (!node) return;
      p[f.k] = f.t === 'hex' ? node.value.trim() : (node.value === '' ? NaN : parseFloat(node.value));
    });
    return p;
  }
  function buildForm(form, fam, values, onChange) {
    form.innerHTML = '';
    fam.schema.forEach(function (f) {
      var lab = el('label', 'field', f.l), inp;
      if (f.t === 'select') {
        inp = el('select');
        f.o.forEach(function (o) { var op = el('option'); op.value = String(o.v); op.textContent = o.l; inp.appendChild(op); });
        inp.value = String(values[f.k]);
        if (inp.value !== String(values[f.k])) {
          var op2 = el('option'); op2.value = String(values[f.k]); op2.textContent = fmt(values[f.k]); inp.appendChild(op2); inp.value = String(values[f.k]);
        }
      } else {
        inp = el('input');
        inp.type = f.t === 'hex' ? 'text' : 'number';
        if (f.min !== undefined) inp.min = f.min;
        if (f.max !== undefined) inp.max = f.max;
        if (f.step) inp.step = f.step;
        inp.value = values[f.k];
        if (f.t === 'hex') { inp.maxLength = 2; inp.autocapitalize = 'characters'; }
      }
      inp.setAttribute('data-k', f.k);
      inp.addEventListener('input', onChange);
      inp.addEventListener('change', onChange);
      lab.appendChild(inp);
      form.appendChild(lab);
    });
  }
  function renderSolution(box, fam, res, question) {
    var h = '<p class="sim-q"><strong>โจทย์:</strong> ' + question + '</p>';
    if (!res.ok) {
      box.innerHTML = h + '<ol class="calc-steps">' + res.steps.map(function (s) { return '<li class="bad">' + s.t + '</li>'; }).join('') + '</ol>';
      return;
    }
    h += '<ol class="calc-steps sim-steps">' + res.steps.map(function (s) { return '<li>' + s.t + (s.why ? '<small class="why">หลักการ: ' + s.why + '</small>' : '') + '</li>'; }).join('') + '</ol>';
    h += '<div class="reg-chips">' + res.answers.map(function (a) { return '<span class="reg-chip"><small>' + a.label + '</small>' + a.disp + '</span>'; }).join('') + '</div>';
    if (res.notes.length) h += '<ul class="meaning-list">' + res.notes.map(function (n) { return '<li class="warn">' + n + '</li>'; }).join('') + '</ul>';
    if (res.code) h += '<pre class="sim-code"><code>' + res.code.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</code></pre>';
    box.innerHTML = h;
  }
  function varyTable(fam) {
    return '<div class="table-responsive"><table class="custom-table"><thead><tr><th>ตัวแปร</th><th>ที่เคยเห็นในข้อสอบ / สไลด์</th><th>ที่อาจารย์อาจเปลี่ยน</th></tr></thead><tbody>' +
      fam.vary.map(function (v) { return '<tr><td><strong>' + v[0] + '</strong></td><td>' + v[1] + '</td><td>' + v[2] + '</td></tr>'; }).join('') + '</tbody></table></div>';
  }
  function famSelect(sel) {
    ORDER.forEach(function (id) { var o = el('option'); o.value = id; o.textContent = FAMILIES[id].name + ' (' + FAMILIES[id].tag + ')'; sel.appendChild(o); });
  }

  function initSolve() {
    var sel = byId('ts-fam'), form = byId('ts-form'), out = byId('ts-out'), idea = byId('ts-idea'), vary = byId('ts-vary');
    if (!sel) return;
    famSelect(sel);
    var fam;
    function solveNow() {
      var p = readParams(form, fam);
      renderSolution(out, fam, fam.solve(p), fam.question(p));
    }
    function load(values) {
      fam = FAMILIES[sel.value];
      idea.innerHTML = '<strong>แนวคิดของโจทย์ชนิดนี้</strong><ol>' + fam.idea.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ol>';
      vary.innerHTML = '<summary>ตัวเลขที่อาจารย์อาจเปลี่ยนในโจทย์ชนิดนี้</summary>' + varyTable(fam);
      buildForm(form, fam, values || defaults(sel.value), solveNow);
      solveNow();
    }
    sel.addEventListener('change', function () { load(); });
    byId('ts-random').addEventListener('click', function () {
      var lv = parseInt(byId('ts-level').value, 10);
      load(makeProblem(sel.value, lv, Math.floor(Math.random() * 1e6)));
    });
    byId('ts-reset').addEventListener('click', function () { load(); });
    load();
    api.loadSolve = function (id, values) { sel.value = id; load(values); };
  }

  function initPractice() {
    var famBox = byId('tp-fams'), lvSel = byId('tp-level'), seedIn = byId('tp-seed'), qBox = byId('tp-question'), inputs = byId('tp-inputs'),
      fb = byId('tp-feedback'), sol = byId('tp-solution'), score = byId('tp-score');
    if (!famBox) return;
    ORDER.forEach(function (id) {
      var lab = el('label', 'tp-fam');
      lab.innerHTML = '<input type="checkbox" value="' + id + '" checked> ' + FAMILIES[id].name;
      famBox.appendChild(lab);
    });
    var cur = null, stats = { done: 0, ok: 0 };
    function chosen() { return Array.prototype.slice.call(famBox.querySelectorAll('input:checked')).map(function (i) { return i.value; }); }
    function normalize(a, txt) {
      var s = String(txt).replace(/[\s,#]/g, '').replace(/^0x/i, '').replace(/[hH]/g, '');
      if (s === '') return NaN;
      if (a.kind === 'hex') return s.replace(/[0-9a-fA-F]/g, '') === '' ? parseInt(s, 16) : NaN;
      return s.replace(/[0-9.\-]/g, '') === '' ? parseFloat(s) : NaN;
    }
    function isOk(a, txt) {
      var v = normalize(a, txt);
      if (isNaN(v)) return false;
      if (a.kind === 'num') return Math.abs(v - a.val) <= Math.max(a.tol * Math.abs(a.val), 0.0005);
      return v === a.val;
    }
    function newProblem(seedVal) {
      var ids = chosen();
      if (!ids.length) { qBox.textContent = 'เลือกชนิดโจทย์อย่างน้อย 1 ชนิด'; return; }
      var lv = parseInt(lvSel.value, 10);
      var seed = seedVal !== undefined ? seedVal : Math.floor(Math.random() * 900000) + 100000;
      var r = mulberry32(seed), id = ids[Math.floor(r() * ids.length)], p = makeProblem(id, lv, seed), fam = FAMILIES[id], res = fam.solve(p);
      cur = { id: id, p: p, res: res, seed: seed, level: lv, question: fam.question(p), checked: false };
      seedIn.value = seed;
      qBox.innerHTML = '<span class="tp-badge">' + LEVELS[lv] + '</span> <span class="tp-badge alt">' + fam.tag + '</span><p>' + cur.question + '</p>';
      inputs.innerHTML = '';
      res.answers.forEach(function (a) {
        var lab = el('label', 'field', a.label);
        var inp = el('input'); inp.type = 'text'; inp.setAttribute('data-key', a.key); inp.autocomplete = 'off';
        inp.placeholder = a.kind === 'hex' ? 'เช่น FF9C (ฐาน 16)' : (a.kind === 'num' ? 'ตัวเลข' : 'จำนวนเต็ม');
        lab.appendChild(inp); inputs.appendChild(lab);
      });
      fb.textContent = ''; fb.className = 'tp-feedback'; sol.innerHTML = ''; sol.hidden = true;
    }
    function check() {
      if (!cur) return;
      var okN = 0;
      cur.res.answers.forEach(function (a) {
        var inp = inputs.querySelector('[data-key="' + a.key + '"]');
        var good = isOk(a, inp.value);
        inp.classList.toggle('right', good); inp.classList.toggle('wrong', !good);
        if (good) okN++;
      });
      var all = okN === cur.res.answers.length;
      fb.className = 'tp-feedback ' + (all ? 'good' : 'bad');
      fb.textContent = all ? 'ถูกครบทุกช่อง (' + okN + '/' + okN + ')' : 'ถูก ' + okN + ' จาก ' + cur.res.answers.length + ' ช่อง: ช่องที่แดงยังไม่ตรง ลองดูเฉลยเต็มเพื่อหาว่าพลาดขั้นไหน';
      if (!cur.checked) { cur.checked = true; stats.done++; if (all) stats.ok++; score.textContent = 'ทำแล้ว ' + stats.done + ' ข้อ ถูกครบ ' + stats.ok + ' ข้อ'; }
    }
    byId('tp-new').addEventListener('click', function () { newProblem(); });
    byId('tp-check').addEventListener('click', check);
    byId('tp-reveal').addEventListener('click', function () {
      if (!cur) return;
      sol.hidden = false;
      renderSolution(sol, FAMILIES[cur.id], cur.res, cur.question);
      var open = el('button', 'chip-btn', 'เปิดในตัวแก้โจทย์เพื่อเปลี่ยนตัวเลข');
      open.type = 'button';
      open.addEventListener('click', function () { api.loadSolve(cur.id, cur.p); showTab('solve'); });
      sol.appendChild(open);
    });
    byId('tp-seed-go').addEventListener('click', function () { var s = parseInt(seedIn.value, 10); if (s > 0) newProblem(s); });
    lvSel.addEventListener('change', function () { newProblem(); });
    newProblem();
  }

  function initMap() {
    var box = byId('tm-map');
    if (!box) return;
    box.innerHTML = ORDER.map(function (id) {
      var f = FAMILIES[id];
      return '<details class="sim-map-item"><summary><strong>' + f.name + '</strong> <small>' + f.tag + '</small></summary>' + varyTable(f) + '</details>';
    }).join('');
  }

  var tabs, panels;
  function showTab(name) {
    tabs.forEach(function (t) { var on = t.getAttribute('data-wt-tab') === name; t.setAttribute('aria-selected', on ? 'true' : 'false'); });
    panels.forEach(function (p) { p.hidden = p.getAttribute('data-wt-panel') !== name; });
  }
  document.addEventListener('DOMContentLoaded', function () {
    var rootEl = byId('w-timer');
    if (!rootEl) return;
    tabs = Array.prototype.slice.call(rootEl.querySelectorAll('[data-wt-tab]'));
    panels = Array.prototype.slice.call(rootEl.querySelectorAll('[data-wt-panel]'));
    tabs.forEach(function (t) { t.addEventListener('click', function () { showTab(t.getAttribute('data-wt-tab')); }); });
    initSolve(); initPractice(); initMap();
    showTab('calc');
  });
})(typeof window !== 'undefined' ? window : globalThis);
