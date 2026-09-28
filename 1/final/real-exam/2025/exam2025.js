/*
 * Real Final 2025 page widgets: Timer Workbench, SFR Bit-Flipper, UART Frame Explorer,
 * Interrupt Explorer, Motor Sandbox, Traffic 1 FSM Simulator.
 * Pure calculations live on window.Exam2025 so they can be checked from the console or tests.
 * Style rule for this codebase: no template literals and no regex end anchors (zero dollar-sign policy).
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------ helpers */
  function byId(id) { return document.getElementById(id); }
  function hex(v, digits) {
    var s = Math.round(v).toString(16).toUpperCase();
    while (s.length < digits) s = '0' + s;
    return s + 'H';
  }
  function asmImm(v, digits) { var h = hex(v, digits); return (/[A-F]/.test(h.charAt(0)) ? '#0' : '#') + h; }
  function bin8(v) { var s = (v & 0xFF).toString(2); while (s.length < 8) s = '0' + s; return s.slice(0, 4) + ' ' + s.slice(4) + 'B'; }
  function code(s) { return '<code>' + s + '</code>'; }
  function fmt(n, d) { return Number(n).toLocaleString('en-US', { maximumFractionDigits: d === undefined ? 4 : d }); }
  function li(html, cls) { return '<li' + (cls ? ' class="' + cls + '"' : '') + '>' + html + '</li>'; }
  function svgEl(tag, attrs, text) {
    var s = '<' + tag;
    Object.keys(attrs).forEach(function (k) { s += ' ' + k + '="' + attrs[k] + '"'; });
    return s + (text === undefined ? '/>' : '>' + text + '</' + tag + '>');
  }
  function popcount(v) { var c = 0; while (v) { c += v & 1; v >>= 1; } return c; }

  /* ------------------------------------------------------------ pure calculations */
  var MAX = { 0: 8192, 1: 65536, 2: 256 };

  function timerCalc(foscMHz, mode, micros) {
    var tmc = 12 / foscMHz;
    var nExact = micros / tmc;
    var n = Math.round(nExact);
    var r = { tmc: tmc, nExact: nExact, n: n, max: MAX[mode], mode: mode, ok: n >= 1 && n <= MAX[mode] };
    if (!r.ok) {
      r.loops = Math.ceil(n / MAX[mode]);
      r.perLoop = Math.round(n / r.loops);
      return r;
    }
    r.reload = MAX[mode] - n;
    if (mode === 1) { r.th = r.reload >> 8; r.tl = r.reload & 0xFF; }
    if (mode === 0) { r.th = r.reload >> 5; r.tl = r.reload & 0x1F; }
    if (mode === 2) { r.th = r.reload; r.tl = r.reload; }
    r.actual = n * tmc;
    r.errorPct = (r.actual - micros) / micros * 100;
    return r;
  }

  function baudCalc(foscMHz, baud) {
    var div = foscMHz * 1e6 / (384 * baud);
    var steps = Math.max(1, Math.min(255, Math.round(div)));
    var actual = foscMHz * 1e6 / (384 * steps);
    return { exact: div, steps: steps, th1: 256 - steps, actual: actual, errorPct: (actual - baud) / baud * 100 };
  }

  function uartFrame(data, mode, tb8) {
    var bits = [];
    var i;
    if (mode !== 0) bits.push({ v: 0, label: 'Start', cls: 's' });
    for (i = 0; i < 8; i++) bits.push({ v: (data >> i) & 1, label: 'D' + i, cls: 'd' });
    if (mode === 2 || mode === 3) bits.push({ v: tb8 ? 1 : 0, label: 'TB8', cls: 'x' });
    if (mode !== 0) bits.push({ v: 1, label: 'Stop', cls: 'p' });
    return bits;
  }

  var IRQ = [
    { name: 'INT0 (External 0)', vec: '0003H', flag: 'IE0 = TCON.1', en: 'EX0 = IE.0', pr: 'PX0 = IP.0' },
    { name: 'TF0 (Timer 0)', vec: '000BH', flag: 'TF0 = TCON.5', en: 'ET0 = IE.1', pr: 'PT0 = IP.1' },
    { name: 'INT1 (External 1)', vec: '0013H', flag: 'IE1 = TCON.3', en: 'EX1 = IE.2', pr: 'PX1 = IP.2' },
    { name: 'TF1 (Timer 1)', vec: '001BH', flag: 'TF1 = TCON.7', en: 'ET1 = IE.3', pr: 'PT1 = IP.3' },
    { name: 'Serial (RI/TI)', vec: '0023H', flag: 'RI = SCON.0 / TI = SCON.1', en: 'ES = IE.4', pr: 'PS = IP.4' }
  ];

  /* ea: bool; rows: [{enabled, high, pending}] in natural order. Returns service order (indices). */
  function irqOrder(ea, rows) {
    if (!ea) return [];
    var ready = [];
    rows.forEach(function (r, i) { if (r.enabled && r.pending) ready.push(i); });
    var high = ready.filter(function (i) { return rows[i].high; });
    var low = ready.filter(function (i) { return !rows[i].high; });
    return high.concat(low);
  }

  function pwmCalc(freqHz, dutyPct, volts) {
    var period = 1e6 / freqHz;
    var ton = period * dutyPct / 100;
    var toff = period - ton;
    return {
      period: period, ton: ton, toff: toff, vavg: volts * dutyPct / 100,
      onReload: ton >= 1 && ton <= 65536 ? 65536 - Math.round(ton) : null,
      offReload: toff >= 1 && toff <= 65536 ? 65536 - Math.round(toff) : null
    };
  }

  window.Exam2025 = { timerCalc: timerCalc, baudCalc: baudCalc, uartFrame: uartFrame, irqOrder: irqOrder, pwmCalc: pwmCalc, hex: hex, bin8: bin8 };

  /* ------------------------------------------------------------ 1. Timer Workbench */
  function initTimer() {
    var root = byId('w-timer');
    if (!root) return null;
    var fosc = byId('wt-fosc'), custom = byId('wt-fosc-custom'), mode = byId('wt-mode');
    var time = byId('wt-time'), freq = byId('wt-freq');

    function kind() { return root.querySelector('input[name="wt-kind"]:checked').value; }
    function foscVal() { return fosc.value === 'custom' ? parseFloat(custom.value) : parseFloat(fosc.value); }

    function wave(r, isSquare, micros) {
      var svg = byId('wt-wave');
      var parts = [];
      if (!r.ok) { svg.innerHTML = svgEl('text', { x: 230, y: 64, 'class': 'fx-sub', 'text-anchor': 'middle' }, 'เกินช่วงของโหมดนี้: ต้องวนหลายรอบ'); return; }
      if (isSquare) {
        var pts = ['20,90'];
        for (var i = 0; i < 4; i++) {
          var x0 = 20 + i * 105;
          pts.push(x0 + ',30', (x0 + 52) + ',30', (x0 + 52) + ',90', (x0 + 105) + ',90');
        }
        parts.push(svgEl('polyline', { points: pts.join(' '), 'class': 'fx-wave' }));
        parts.push(svgEl('text', { x: 46, y: 22, 'class': 'fx-sub', 'text-anchor': 'middle' }, fmt(r.actual, 2) + ' µs'));
        parts.push(svgEl('text', { x: 98, y: 108, 'class': 'fx-sub', 'text-anchor': 'middle' }, fmt(r.actual, 2) + ' µs'));
        parts.push(svgEl('text', { x: 330, y: 22, 'class': 'fx-text', 'text-anchor': 'middle' }, 'CPL ทุกครั้งที่ TF0 = 1'));
      } else {
        parts.push(svgEl('line', { x1: 20, y1: 60, x2: 440, y2: 60, 'class': 'fx-line' }));
        parts.push(svgEl('rect', { x: 40, y: 44, width: 360, height: 32, rx: 6, 'class': 'fx-box' }));
        parts.push(svgEl('text', { x: 220, y: 65, 'class': 'fx-text fx-mono', 'text-anchor': 'middle' }, hex(r.reload, r.mode === 2 ? 2 : 4) + ' → … → overflow'));
        parts.push(svgEl('text', { x: 40, y: 32, 'class': 'fx-sub' }, 'TR0 = 1'));
        parts.push(svgEl('text', { x: 400, y: 32, 'class': 'fx-sub', 'text-anchor': 'end' }, 'TF0 = 1'));
        parts.push(svgEl('text', { x: 220, y: 102, 'class': 'fx-sub', 'text-anchor': 'middle' }, r.n + ' counts × ' + fmt(r.tmc) + ' µs = ' + fmt(r.actual, 3) + ' µs (ขอ ' + fmt(micros, 3) + ' µs)'));
      }
      svg.innerHTML = parts.join('');
    }

    function render() {
      byId('wt-custom-wrap').hidden = fosc.value !== 'custom';
      var sq = kind() === 'square';
      byId('wt-time-wrap').hidden = sq;
      byId('wt-freq-wrap').hidden = !sq;
      var f = foscVal(), m = parseInt(mode.value, 10);
      var steps = [];
      if (!(f > 0)) { byId('wt-steps').innerHTML = li('ใส่ความถี่คริสตอลที่มากกว่า 0', 'bad'); return; }
      var micros;
      if (sq) {
        var hz = parseFloat(freq.value);
        if (!(hz > 0)) { byId('wt-steps').innerHTML = li('ใส่ความถี่ที่มากกว่า 0', 'bad'); return; }
        micros = 1e6 / (2 * hz);
        steps.push(li('คาบ ' + code('T = 1 ÷ ' + fmt(hz) + ' Hz = ' + fmt(2 * micros, 3) + ' µs') + ' ครึ่งคาบ (High = Low) = ' + code(fmt(micros, 3) + ' µs')));
      } else {
        micros = parseFloat(time.value);
        if (!(micros > 0)) { byId('wt-steps').innerHTML = li('ใส่เวลาที่มากกว่า 0', 'bad'); return; }
      }
      var r = timerCalc(f, m, micros);
      steps.push(li(code('Tmc = 12 ÷ ' + fmt(f) + ' MHz = ' + fmt(r.tmc) + ' µs')));
      steps.push(li(code('N = ' + fmt(micros, 3) + ' ÷ ' + fmt(r.tmc) + ' = ' + fmt(r.nExact, 3)) + (Math.abs(r.nExact - r.n) > 1e-9 ? ' ปัดเป็น ' : ' = ') + code(r.n + ' = ' + hex(r.n, 1))));
      if (!r.ok) {
        steps.push(li('N เกินค่าสูงสุดของ Mode ' + m + ' (' + fmt(r.max) + ' counts): ใช้ลูปซ้ำ ' + r.loops + ' รอบ × ราว ' + fmt(r.perLoop) + ' counts หรือเปลี่ยนเป็น Mode 1', 'bad'));
        byId('wt-regs').innerHTML = '';
        byId('wt-steps').innerHTML = steps.join('');
        wave(r, sq, micros);
        return;
      }
      if (m === 1) steps.push(li(code('FFFFH − ' + hex(r.n, 1) + ' + 1 = ' + hex(r.reload, 4)) + ' (หรือ ' + code('65,536 − ' + fmt(r.n) + ' = ' + fmt(r.reload)) + ')'));
      if (m === 0) steps.push(li(code('8,192 − ' + fmt(r.n) + ' = ' + fmt(r.reload) + ' = ' + hex(r.reload, 4)) + ' → TH0 = 8 บิตบน, TL0 = 5 บิตล่าง'));
      if (m === 2) steps.push(li(code('256 − ' + fmt(r.n) + ' = ' + fmt(r.reload) + ' = ' + hex(r.reload, 2)) + ' ใส่ทั้ง TH0 (ค่า reload) และ TL0'));
      steps.push(li(code('TH0 = ' + hex(r.th, 2) + ', TL0 = ' + hex(r.tl, 2))));
      var errCls = Math.abs(r.errorPct) < 0.5 ? 'good' : 'bad';
      steps.push(li('เวลาจริงจากตัวนับ ' + code(fmt(r.actual, 3) + ' µs') + ' คลาด <span class="' + errCls + '">' + fmt(r.errorPct, 3) + '%</span> (ยังไม่รวม overhead ของคำสั่ง)'));
      byId('wt-steps').innerHTML = steps.join('');
      byId('wt-regs').innerHTML = [
        ['TMOD', 'MOV TMOD, ' + asmImm(m, 2), bin8(m)],
        ['TH0', 'MOV TH0, ' + asmImm(r.th, 2), bin8(r.th)],
        ['TL0', 'MOV TL0, ' + asmImm(r.tl, 2), bin8(r.tl)]
      ].map(function (x) { return '<span class="reg-chip"><small>' + x[0] + ' · ' + x[2] + '</small>' + x[1] + '</span>'; }).join('');
      wave(r, sq, micros);
    }

    root.addEventListener('input', render);
    root.addEventListener('change', render);
    root.querySelectorAll('[data-wt]').forEach(function (b) {
      b.addEventListener('click', function () { applyTimerPreset(b.getAttribute('data-wt')); });
    });
    function applyTimerPreset(p) {
      var parts = p.split(':');
      root.querySelector('input[name="wt-kind"][value="' + parts[0] + '"]').checked = true;
      if (parts[0] === 'square') freq.value = parts[1]; else time.value = parts[1];
      mode.value = '1';
      render();
    }
    render();
    return { preset: applyTimerPreset };
  }

  /* ------------------------------------------------------------ 2. SFR Bit-Flipper */
  var SFR = {
    TMOD: { addr: '89H', base: null, names: ['GATE', 'C/T', 'M1', 'M0', 'GATE', 'C/T', 'M1', 'M0'], off: [],
      presets: [['00', 'ค่าหลัง reset'], ['01', 'Timer 0 Mode 1 (ข้อ 4, 9, 21)'], ['05', 'Timer 0 Counter Mode 1 (ข้อ 8)'],
        ['02', 'Timer 0 Mode 2 auto-reload'], ['20', 'Timer 1 Mode 2 (baud rate)'], ['21', 'Timer 1 Mode 2 + Timer 0 Mode 1'], ['0D', 'Timer 0 Counter + GATE (วัดความกว้างพัลส์)']] },
    TCON: { addr: '88H', base: 0x88, names: ['TF1', 'TR1', 'TF0', 'TR0', 'IE1', 'IT1', 'IE0', 'IT0'], off: [],
      presets: [['00', 'ค่าหลัง reset'], ['10', 'TR0 = 1 (MOV TCON, #10H ใน Lab 5)'], ['30', 'TR0 = 1 และ TF0 = 1 (เพิ่งล้น)'],
        ['01', 'IT0 = 1: INT0 เป็น edge (ข้อ 6)'], ['50', 'TR1 + TR0 เดินทั้งคู่']] },
    IE: { addr: 'A8H', base: 0xA8, names: ['EA', '—', 'ET2', 'ES', 'ET1', 'EX1', 'ET0', 'EX0'], off: [6],
      presets: [['00', 'ปิดทั้งหมด'], ['82', 'EA + ET0: Timer 0 (ข้อ 17)'], ['81', 'EA + EX0: INT0 (Lecture 6 ที่ถูกต้อง)'],
        ['01', 'EX0 อย่างเดียว (ลืม EA)'], ['94', 'EA + ES + EX1']] },
    IP: { addr: 'B8H', base: 0xB8, names: ['—', '—', 'PT2', 'PS', 'PT1', 'PX1', 'PT0', 'PX0'], off: [7, 6],
      presets: [['00', 'ทุกตัว low: ลำดับธรรมชาติ'], ['08', 'PT1 = 1: Timer 1 ขึ้นเป็น high'], ['04', 'PX1 = 1: INT1 ขึ้นเป็น high'], ['10', 'PS = 1: Serial ขึ้นเป็น high']] }
  };
  var MODE_TXT = ['Mode 0: 13 บิต (8,192 counts)', 'Mode 1: 16 บิต (65,536 counts)', 'Mode 2: 8 บิต auto-reload (256 counts)', 'Mode 3: แยก 8 บิต 2 ตัว (Timer 0)'];
  var IE_SRC = [['EX0', 'INT0', '0003H'], ['ET0', 'Timer 0', '000BH'], ['EX1', 'INT1', '0013H'], ['ET1', 'Timer 1', '001BH'], ['ES', 'Serial', '0023H']];

  function sfrMeaning(reg, v) {
    var out = [];
    function bit(n) { return (v >> n) & 1; }
    if (reg === 'TMOD') {
      [['Timer 1', 4, 'T1 (P3.5)', 'INT1'], ['Timer 0', 0, 'T0 (P3.4)', 'INT0']].forEach(function (t) {
        var b = t[1], gate = bit(b + 3), ct = bit(b + 2), m = (v >> b) & 3;
        out.push(li('<strong>' + t[0] + '</strong>: ' + (ct ? 'Counter นับพัลส์ที่ขา ' + t[2] : 'Timer นับ Fosc ÷ 12') + ', ' + MODE_TXT[m] +
          (gate ? ', GATE = 1 → เดินเมื่อ TR = 1 และขา ' + t[3] + ' = 1' : ', GATE = 0 → เดินตาม TR อย่างเดียว')));
      });
      if (((v >> 4) & 3) === 3) out.push(li('Timer 1 ใน Mode 3 หยุดนับ (ถือว่าหยุดการทำงาน)', 'warn'));
    } else if (reg === 'TCON') {
      out.push(li('Timer 0 ' + (bit(4) ? '<strong>กำลังนับ</strong> (TR0 = 1)' : 'หยุด (TR0 = 0)') + ', Timer 1 ' + (bit(6) ? '<strong>กำลังนับ</strong> (TR1 = 1)' : 'หยุด (TR1 = 0)')));
      if (bit(5)) out.push(li('TF0 = 1: Timer 0 ล้นแล้ว → ขอ interrupt ที่ 000BH หรือให้ JNB TCON.5 หลุดลูป'));
      if (bit(7)) out.push(li('TF1 = 1: Timer 1 ล้นแล้ว → ขอ interrupt ที่ 001BH'));
      out.push(li('INT0: ' + (bit(0) ? 'negative edge (IT0 = 1)' : 'low level (IT0 = 0)') + ' · INT1: ' + (bit(2) ? 'negative edge (IT1 = 1)' : 'low level (IT1 = 0)')));
      if (bit(1) || bit(3)) out.push(li('IE0/IE1 = 1: มีการขอ interrupt ภายนอกค้างอยู่'));
    } else if (reg === 'IE') {
      var on = IE_SRC.filter(function (s, i) { return bit(i); });
      if (!bit(7)) out.push(li('EA = 0: ไม่มี interrupt ใดทำงานเลย แม้บิตรายตัวจะเป็น 1', 'warn'));
      if (bit(7) && on.length === 0) out.push(li('EA = 1 แต่ยังไม่ได้เปิดต้นเหตุใด', 'warn'));
      on.forEach(function (s) { out.push(li(s[0] + ' = 1 → ' + s[1] + (bit(7) ? ' ใช้งานได้, vector ' + s[2] : ' (ยังถูก EA ปิดกั้น)'), bit(7) ? '' : 'warn')); });
    } else {
      var names = ['INT0', 'Timer 0', 'INT1', 'Timer 1', 'Serial'];
      var high = names.filter(function (n, i) { return bit(i); });
      var low = names.filter(function (n, i) { return !bit(i); });
      out.push(li('ลำดับเมื่อเกิดพร้อมกัน: <strong>' + high.concat(low).join(' → ') + '</strong>'));
      out.push(li(high.length ? 'กลุ่ม high: ' + high.join(', ') + ' (แทรก ISR ระดับ low ได้)' : 'ไม่มีตัวใดเป็น high: ใช้ลำดับธรรมชาติ'));
    }
    return out.join('');
  }

  function initSfr() {
    var root = byId('w-sfr');
    if (!root) return null;
    var state = { reg: 'TMOD', vals: { TMOD: 0x01, TCON: 0x10, IE: 0x82, IP: 0x00 } };
    var bitsEl = byId('ws-bits'), preset = byId('ws-preset');

    function renderBits() {
      var def = SFR[state.reg], v = state.vals[state.reg], html = '';
      for (var i = 0; i < 8; i++) {
        var b = 7 - i, on = (v >> b) & 1, off = def.off.indexOf(b) !== -1;
        var title = def.names[i] + ' = ' + state.reg + '.' + b + (def.base !== null ? ', bit address ' + hex(def.base + b, 2) : '');
        html += '<button type="button" class="bit-btn" data-bit="' + b + '" aria-pressed="' + (on ? 'true' : 'false') + '"' + (off ? ' disabled' : '') +
          ' title="' + title + '" aria-label="' + title + ' ค่า ' + on + '"><span class="b-num">' + b + '</span><span class="b-name">' + def.names[i] + '</span><span class="b-val">' + on + '</span></button>';
      }
      bitsEl.innerHTML = html;
    }
    function render() {
      var def = SFR[state.reg], v = state.vals[state.reg];
      root.querySelectorAll('.tab').forEach(function (t) { t.setAttribute('aria-selected', t.getAttribute('data-reg') === state.reg ? 'true' : 'false'); });
      renderBits();
      var chips = [['ค่า hex', hex(v, 2)], ['binary', bin8(v)], ['คำสั่ง', 'MOV ' + state.reg + ', ' + asmImm(v, 2)]];
      if (def.base !== null) {
        var sets = [];
        for (var b = 7; b >= 0; b--) if ((v >> b) & 1) sets.push('SETB ' + def.names[7 - b]);
        chips.push(['bit-addressable (' + def.addr + ')', sets.length ? sets.join(' / ') : 'ทุกบิต = 0']);
      } else {
        chips.push(['ไม่ bit-addressable', 'ต้อง MOV ทั้งไบต์']);
      }
      byId('ws-value').innerHTML = chips.map(function (c) { return '<span class="reg-chip"><small>' + c[0] + '</small>' + c[1] + '</span>'; }).join('');
      byId('ws-meaning').innerHTML = sfrMeaning(state.reg, v);
      preset.innerHTML = '<option value="">เลือกค่าตัวอย่าง…</option>' + def.presets.map(function (p) { return '<option value="' + p[0] + '">' + p[0] + 'H: ' + p[1] + '</option>'; }).join('');
      byId('ws-note').textContent = state.reg + ' อยู่ที่แอดเดรส ' + def.addr + (def.base !== null ? ' ลงท้าย 0H/8H จึงสั่งทีละบิตได้' : ' ซึ่งไม่ลงท้าย 0H/8H');
    }
    root.querySelectorAll('.tab').forEach(function (t) {
      t.addEventListener('click', function () { state.reg = t.getAttribute('data-reg'); render(); });
    });
    bitsEl.addEventListener('click', function (e) {
      var btn = e.target.closest('.bit-btn');
      if (!btn || btn.disabled) return;
      state.vals[state.reg] ^= 1 << parseInt(btn.getAttribute('data-bit'), 10);
      render();
      var again = bitsEl.querySelector('[data-bit="' + btn.getAttribute('data-bit') + '"]');
      if (again) again.focus();
    });
    preset.addEventListener('change', function () {
      if (!preset.value) return;
      state.vals[state.reg] = parseInt(preset.value, 16);
      render();
    });
    render();
    return {
      preset: function (p) {
        var parts = p.split(':');
        state.reg = parts[0];
        state.vals[parts[0]] = parseInt(parts[1], 16);
        render();
      }
    };
  }

  /* ------------------------------------------------------------ 3. UART Frame Explorer */
  function initUart() {
    var root = byId('w-uart');
    if (!root) return null;
    var data = byId('wu-data'), mode = byId('wu-mode'), fosc = byId('wu-fosc'), baud = byId('wu-baud'), tb8 = byId('wu-tb8');

    function render() {
      var m = parseInt(mode.value, 10), f = parseFloat(fosc.value);
      var raw = data.value.trim().toUpperCase();
      var ok = /^[0-9A-F]{1,2}/.test(raw) && raw.replace(/[0-9A-F]/g, '') === '';
      byId('wu-tb8-wrap').hidden = !(m === 2 || m === 3);
      byId('wu-parity').hidden = !(m === 2 || m === 3);
      byId('wu-baud-wrap').hidden = !(m === 1 || m === 3);
      if (!ok) {
        byId('wu-frame').innerHTML = '';
        byId('wu-steps').innerHTML = li('ใส่ข้อมูลเป็นเลขฐาน 16 หนึ่งไบต์ (00 ถึง FF)', 'bad');
        return;
      }
      var v = parseInt(raw, 16);
      var bits = uartFrame(v, m, tb8.checked);
      byId('wu-frame').innerHTML = bits.map(function (b, i) {
        return '<span class="bit ' + (m === 0 ? 'clk' : b.cls) + '">' + b.v + '<small>' + b.label + '</small></span>';
      }).join('');
      var steps = [];
      var ch = v >= 32 && v < 127 ? ' (ตัวอักษร "' + String.fromCharCode(v) + '")' : '';
      steps.push(li(code(hex(v, 2) + ' = ' + bin8(v)) + ch + ' ส่ง D0 (LSB) ก่อน D7'));
      var rate, scon;
      if (m === 0) {
        rate = f * 1e6 / 12;
        scon = 0x10;
        steps.push(li('Mode 0: ข้อมูลออกทาง RxD, clock ออกทาง TxD, ไม่มี start/stop, baud คงที่ ' + code('Fosc ÷ 12 = ' + fmt(rate) + ' bit/s')));
      } else if (m === 2) {
        rate = f * 1e6 / 64;
        scon = 0x90 | (tb8.checked ? 0x08 : 0);
        steps.push(li('Mode 2: baud คงที่ ' + code('Fosc ÷ 64 = ' + fmt(rate) + ' baud') + ' (SMOD = 0)'));
      } else {
        var b = baudCalc(f, parseInt(baud.value, 10));
        rate = b.actual;
        scon = (m === 1 ? 0x50 : 0xD0) | (m === 3 && tb8.checked ? 0x08 : 0);
        steps.push(li('Timer 1 Mode 2: ' + code(fmt(f) + ' MHz ÷ 384 ÷ ' + baud.value + ' = ' + fmt(b.exact, 3)) + ' ปัดเป็น ' + b.steps + ' → ' + code('TH1 = 256 − ' + b.steps + ' = ' + hex(b.th1, 2))));
        steps.push(li('baud จริง ' + code(fmt(b.actual, 1)) + ' คลาด <span class="' + (Math.abs(b.errorPct) < 2 ? 'good' : 'bad') + '">' + fmt(b.errorPct, 2) + '%</span>'));
      }
      steps.push(li('เฟรมยาว ' + bits.length + ' บิต ใช้เวลา ' + code(fmt(bits.length / rate * 1e6, 2) + ' µs') + ' ต่อไบต์'));
      if (m === 2 || m === 3) steps.push(li('จำนวนบิต 1 ในข้อมูล = ' + popcount(v) + ' → parity คู่ต้องใช้ TB8 = ' + (popcount(v) % 2)));
      steps.push(li(code('MOV SCON, ' + asmImm(scon, 2)) + ' = ' + bin8(scon) + ' (REN = 1)'));
      byId('wu-steps').innerHTML = steps.join('');
    }
    root.addEventListener('input', render);
    root.addEventListener('change', render);
    byId('wu-parity').addEventListener('click', function () {
      var v = parseInt(data.value, 16);
      if (!isNaN(v)) tb8.checked = popcount(v) % 2 === 1;
      render();
    });
    render();
    return { preset: function (p) { mode.value = p.split(':')[1]; render(); } };
  }

  /* ------------------------------------------------------------ 4. Interrupt Explorer */
  function initIrq() {
    var root = byId('w-irq');
    if (!root) return null;
    var rows = IRQ.map(function (s, i) { return { enabled: true, high: false, pending: i === 1 || i === 2 }; });
    var tbody = byId('wi-rows'), ea = byId('wi-ea');
    tbody.innerHTML = IRQ.map(function (s, i) {
      function box(k, label) {
        return '<td><input type="checkbox" data-i="' + i + '" data-k="' + k + '" aria-label="' + label + ' ' + s.name + '"' + (rows[i][k] ? ' checked' : '') + '></td>';
      }
      return '<tr data-row="' + i + '"><td>' + (i + 1) + '</td><td><strong>' + s.name + '</strong><br><small>' + s.flag + '</small></td><td><code>' + s.vec + '</code></td>' +
        box('enabled', s.en) + box('high', s.pr) + box('pending', 'flag') + '</tr>';
    }).join('');
    function render() {
      var order = irqOrder(ea.checked, rows);
      tbody.querySelectorAll('tr').forEach(function (tr) { tr.classList.toggle('winner', order.length > 0 && +tr.getAttribute('data-row') === order[0]); });
      var out = [];
      if (!ea.checked) out.push(li('EA = 0: CPU ไม่รับ interrupt ใดเลย flag ค้างรอจนกว่าจะเปิด EA', 'bad'));
      else if (!order.length) out.push(li('ไม่มีต้นเหตุที่ทั้ง "เปิด" และ "เกิดขึ้น" พร้อมกัน'));
      order.forEach(function (i, k) {
        var s = IRQ[i];
        out.push(li((k === 0 ? '<strong>บริการก่อน:</strong> ' : 'ตามด้วย: ') + s.name + (rows[i].high ? ' (high)' : ' (low)') + ' → PUSH PC → PC = ' + code(s.vec)));
      });
      rows.forEach(function (r, i) {
        if (r.pending && !r.enabled) out.push(li(IRQ[i].name + ': flag = 1 แต่ ' + IRQ[i].en.split(' ')[0] + ' = 0 จึงถูกเพิกเฉย'));
      });
      byId('wi-result').innerHTML = out.join('');
      var ie = (ea.checked ? 0x80 : 0), ip = 0;
      rows.forEach(function (r, i) { if (r.enabled) ie |= 1 << i; if (r.high) ip |= 1 << i; });
      byId('wi-regs').innerHTML = [['IE', ie], ['IP', ip]].map(function (x) {
        return '<span class="reg-chip"><small>' + x[0] + ' · ' + bin8(x[1]) + '</small>MOV ' + x[0] + ', ' + asmImm(x[1], 2) + '</span>';
      }).join('');
    }
    tbody.addEventListener('change', function (e) {
      var t = e.target;
      rows[+t.getAttribute('data-i')][t.getAttribute('data-k')] = t.checked;
      render();
    });
    ea.addEventListener('change', render);
    render();
    return null;
  }

  /* ------------------------------------------------------------ 5. Motor Sandbox */
  function initMotor() {
    var root = byId('w-motor');
    if (!root) return null;
    var duty = byId('wm-duty'), volt = byId('wm-volt'), freq = byId('wm-freq');
    var SW = { 1: [100, 78], 2: [320, 78], 3: [100, 172], 4: [320, 172] };
    var CLOSED = { off: [], cw: [1, 4], ccw: [2, 3], invalid: [1, 2, 3, 4] };

    function bridge(dir) {
      var closed = CLOSED[dir], p = [];
      p.push('<defs><marker id="wm-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="fx-head"/></marker></defs>');
      p.push(svgEl('line', { x1: 60, y1: 24, x2: 360, y2: 24, 'class': 'fx-line' }), svgEl('text', { x: 210, y: 16, 'class': 'fx-sub', 'text-anchor': 'middle' }, '+V'));
      p.push(svgEl('line', { x1: 60, y1: 226, x2: 360, y2: 226, 'class': 'fx-line' }), svgEl('text', { x: 210, y: 244, 'class': 'fx-sub', 'text-anchor': 'middle' }, 'GND'));
      [100, 320].forEach(function (x) { p.push(svgEl('line', { x1: x, y1: 24, x2: x, y2: 226, 'class': 'fx-line' })); });
      p.push(svgEl('line', { x1: 100, y1: 125, x2: 185, y2: 125, 'class': 'fx-line' }), svgEl('line', { x1: 235, y1: 125, x2: 320, y2: 125, 'class': 'fx-line' }));
      if (dir === 'cw') p.push(svgEl('polyline', { points: '100,24 100,125 320,125 320,226', 'class': 'fx-live', 'marker-end': 'url(#wm-ar)' }));
      if (dir === 'ccw') p.push(svgEl('polyline', { points: '320,24 320,125 100,125 100,226', 'class': 'fx-live', 'marker-end': 'url(#wm-ar)' }));
      if (dir === 'invalid') { p.push(svgEl('line', { x1: 100, y1: 24, x2: 100, y2: 226, 'class': 'fx-danger' }), svgEl('line', { x1: 320, y1: 24, x2: 320, y2: 226, 'class': 'fx-danger' })); }
      Object.keys(SW).forEach(function (k) {
        var on = closed.indexOf(+k) !== -1, xy = SW[k];
        p.push(svgEl('rect', { x: xy[0] - 22, y: xy[1] - 16, width: 44, height: 32, rx: 6, 'class': on ? 'fx-sw-on' : 'fx-sw-off' }));
        p.push(svgEl('text', { x: xy[0], y: xy[1] + 4, 'class': 'fx-text', 'text-anchor': 'middle', 'font-size': 11 }, 'SW' + k));
      });
      p.push(svgEl('circle', { cx: 210, cy: 125, r: 25, 'class': 'fx-motor' }), svgEl('text', { x: 210, y: 131, 'class': 'fx-text', 'text-anchor': 'middle', 'font-weight': 700 }, 'M'));
      var label = { off: 'ไม่มีกระแส: มอเตอร์หมุนฟรีจนหยุด', cw: 'กระแสซ้าย → ขวา: Clockwise', ccw: 'กระแสขวา → ซ้าย: Counterclockwise', invalid: 'ลัดวงจร +V → GND ทั้งสองขา' }[dir];
      p.push(svgEl('text', { x: 210, y: 176, 'class': 'fx-sub', 'text-anchor': 'middle' }, label));
      byId('wm-bridge').innerHTML = p.join('');
    }
    function waveSvg(d) {
      var pts = ['10,70'];
      for (var i = 0; i < 4; i++) {
        var x0 = 10 + i * 100, xon = x0 + d;
        if (d === 0) { pts.push((x0 + 100) + ',70'); continue; }
        pts.push(x0 + ',20', xon + ',20', xon + ',70', (x0 + 100) + ',70');
      }
      byId('wm-wave').innerHTML = svgEl('polyline', { points: pts.join(' '), 'class': 'fx-wave' }) +
        svgEl('text', { x: 410, y: 86, 'class': 'fx-sub', 'text-anchor': 'end' }, 'duty ' + d + '% ของทุกคาบ');
    }
    function render() {
      var dir = root.querySelector('input[name="wm-dir"]:checked').value;
      var d = parseInt(duty.value, 10), v = parseFloat(volt.value) || 0, f = parseFloat(freq.value) || 1000;
      byId('wm-duty-val').textContent = d + '%';
      bridge(dir);
      waveSvg(d);
      var r = pwmCalc(f, d, v), steps = [];
      if (dir === 'invalid') steps.push(li('Invalid (Table 16-2): สวิตช์ข้างเดียวกันบนและล่างปิดพร้อมกัน กระแสไหลจาก +V ลงกราวด์โดยไม่ผ่านมอเตอร์ อุปกรณ์เสียหาย', 'bad'));
      else if (dir === 'off') steps.push(li('Off: ไม่มีแรงดันคร่อมมอเตอร์ PWM ไม่มีผล'));
      else steps.push(li(code('Vavg = ' + d + '% × ' + fmt(v) + ' V = ' + fmt(r.vavg, 2) + ' V') + ' → ทิศ ' + (dir === 'cw' ? 'Clockwise (SW1 + SW4)' : 'Counterclockwise (SW2 + SW3)')));
      steps.push(li(code('T = 1 ÷ ' + fmt(f) + ' Hz = ' + fmt(r.period, 1) + ' µs') + ', ' + code('Ton = ' + fmt(r.ton, 1) + ' µs') + ', ' + code('Toff = ' + fmt(r.toff, 1) + ' µs')));
      if (d === 0 || d === 100) steps.push(li('duty ' + d + '%: เป็นระดับคงที่ ไม่ต้องสลับด้วย Timer'));
      else if (r.onReload !== null && r.offReload !== null) steps.push(li('Timer 0 Mode 1 ที่ 12 MHz: ช่วง ON โหลด ' + code(hex(r.onReload, 4)) + ', ช่วง OFF โหลด ' + code(hex(r.offReload, 4)) + ' สลับกันทุกครั้งที่ TF0 = 1 แล้ว CPL ขาควบคุม'));
      else steps.push(li('ช่วงเวลาสั้นกว่า 1 µs หรือยาวเกิน 65,536 µs: ปรับความถี่ PWM', 'bad'));
      byId('wm-steps').innerHTML = steps.join('');
    }
    root.addEventListener('input', render);
    root.addEventListener('change', render);
    render();
    return null;
  }

  /* ------------------------------------------------------------ 6. Traffic 1 FSM Simulator */
  function initFsm() {
    var root = byId('w-fsm');
    if (!root || !window.Sim8051) return null;
    var lines = Array.prototype.map.call(root.querySelectorAll('.lst-line'), function (el) { return el.textContent; });
    var listing = byId('wf-listing');
    var m = new window.Sim8051.Machine(lines.join('\n'));
    var running = false, pressed = false, raf = 0, lastLine = null, prevRegs = {};
    var goStart = null, log = [];
    var push = byId('wf-push'), hold = byId('wf-hold');

    function logLine(text) {
      log.unshift('t = ' + fmt(m.microseconds(), 0) + ' µs · ' + text);
      if (log.length > 30) log.pop();
      byId('wf-log').innerHTML = log.map(function (x) { return li(x); }).join('');
    }
    function setPin() { m.pins['P2.0'] = pressed || hold.checked ? 1 : 0; }

    function stepOnce() {
      var r0Before = m.r[0], greenBefore = m.sfr.P1 & 1;
      var ins = m.step();
      if (!ins) return;
      if (ins.kind === 'MOV_R_IMM' && ins.args[0].toUpperCase() === 'R0') {
        var to = m.r[0];
        if (r0Before === 1 && to === 2) logLine('Ready → Go (guard: push, P2.0 = 1)');
        else if (r0Before === 2 && to === 2) logLine('Go → Go (ยังกดอยู่ เริ่มนับเวลาใหม่)');
        else if (r0Before === 2 && to === 1) logLine('Go → Ready (guard: timer หมด และไม่กด)');
        else if (to === 1 && r0Before === 0) logLine('เริ่มที่ Ready (หลัง reset P1 = FFH ไฟติดทั้งคู่ชั่วครู่)');
      }
      var green = m.sfr.P1 & 1;
      if (green && !greenBefore) goStart = m.cycles;
      if (!green && greenBefore && goStart !== null) { logLine('ไฟเขียวติด ' + (m.cycles - goStart) + ' machine cycles = ' + fmt(m.microseconds() - goStart * 12 / m.fosc * 1e6, 0) + ' µs'); goStart = null; }
    }

    function reg(name, value) {
      var changed = prevRegs[name] !== undefined && prevRegs[name] !== value;
      prevRegs[name] = value;
      return '<div><dt>' + name + '</dt><dd' + (changed ? ' class="changed"' : '') + '>' + value + '</dd></div>';
    }
    function render() {
      var p1 = m.sfr.P1, tcon = m.sfr.TCON;
      byId('wf-red').classList.toggle('on', !!((p1 >> 1) & 1));
      byId('wf-green').classList.toggle('on', !!(p1 & 1));
      byId('wf-s-ready').classList.toggle('active', m.r[0] === 1);
      byId('wf-s-go').classList.toggle('active', m.r[0] === 2);
      byId('wf-regs').innerHTML = [
        reg('R0 (state)', hex(m.r[0], 2)), reg('R1 (รอบ)', String(m.r[1])), reg('TMOD', hex(m.sfr.TMOD, 2)),
        reg('TH0:TL0', hex((m.sfr.TH0 << 8) | m.sfr.TL0, 4)), reg('TR0 / TF0', ((tcon >> 4) & 1) + ' / ' + ((tcon >> 5) & 1)), reg('P2.0', String(m.pins['P2.0'])),
        reg('P1.1 / P1.0', ((p1 >> 1) & 1) + ' / ' + (p1 & 1)), reg('Cycles', fmt(m.cycles, 0)), reg('เวลา', fmt(m.microseconds(), 0) + ' µs')
      ].join('');
      var ins = m.program[m.pc];
      var line = ins ? ins.line : null;
      if (line !== lastLine) {
        if (lastLine !== null) { var old = listing.querySelector('[data-line="' + lastLine + '"]'); if (old) old.classList.remove('current'); }
        var cur = line === null ? null : listing.querySelector('[data-line="' + line + '"]');
        if (cur) {
          cur.classList.add('current');
          var top = cur.offsetTop - listing.offsetTop;
          if (top < listing.scrollTop || top > listing.scrollTop + listing.clientHeight - 24) listing.scrollTop = Math.max(0, top - 60);
        }
        lastLine = line;
      }
    }
    function frame() {
      var n = parseInt(byId('wf-speed').value, 10);
      for (var i = 0; i < n; i++) { setPin(); stepOnce(); }
      render();
      if (running) raf = window.setTimeout(frame, 16); // timer-driven: keeps stepping even when paint is throttled
    }
    function setRunning(on) {
      running = on;
      var btn = byId('wf-run');
      btn.querySelector('span').textContent = on ? 'Pause' : 'Run';
      btn.querySelector('i').className = on ? 'fas fa-pause' : 'fas fa-play';
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      window.clearTimeout(raf);
      if (on) raf = window.setTimeout(frame, 0);
    }
    function setPressed(on) {
      pressed = on;
      push.setAttribute('aria-pressed', on || hold.checked ? 'true' : 'false');
      setPin();
      render();
    }

    byId('wf-run').addEventListener('click', function () { setRunning(!running); });
    byId('wf-step').addEventListener('click', function () { setRunning(false); setPin(); stepOnce(); render(); });
    byId('wf-reset').addEventListener('click', function () {
      setRunning(false); m.reset(); log = []; goStart = null; prevRegs = {}; byId('wf-log').innerHTML = ''; setPin(); render();
    });
    push.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      setPressed(true); // register the press first; capture is only a convenience for drag-off release
      try { push.setPointerCapture(e.pointerId); } catch (err) { /* no active pointer (synthetic or cancelled) */ }
    });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (ev) { push.addEventListener(ev, function () { setPressed(false); }); });
    push.addEventListener('keydown', function (e) { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); setPressed(true); } });
    push.addEventListener('keyup', function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setPressed(false); } });
    hold.addEventListener('change', function () { setPressed(pressed); });
    setPin();
    render();
    return null;
  }

  /* ------------------------------------------------------------ jump buttons */
  document.addEventListener('DOMContentLoaded', function () {
    var api = { 'w-timer': initTimer(), 'w-sfr': initSfr(), 'w-uart': initUart() };
    initIrq(); initMotor(); initFsm();
    document.querySelectorAll('.widget-jump').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-target'), w = byId(id), preset = btn.getAttribute('data-preset');
        if (!w) return;
        if (preset && api[id]) api[id].preset(preset);
        w.scrollIntoView({ behavior: 'smooth', block: 'start' });
        w.classList.add('flash');
        window.setTimeout(function () { w.classList.remove('flash'); }, 1600);
        var first = w.querySelector('select, input, button:not([disabled])');
        if (first) first.focus({ preventScroll: true });
      });
    });
  });
})();

/*
 * Slide modal: opens real lecture / lab / textbook page images from the evidence blocks and the gallery.
 * Data comes from the JSON script tag #slide-data (built by tools/exam2025/evidence.py).
 * Same style rules as above: no template literals and no regex end anchors.
 */
(function () {
  'use strict';
  var dataEl = document.getElementById('slide-data');
  var overlay = document.getElementById('slide-modal');
  if (!dataEl || !overlay) return;

  var data = JSON.parse(dataEl.textContent);
  var dialog = overlay.querySelector('.sm-dialog');
  var el = {
    crumb: document.getElementById('sm-crumb'), title: document.getElementById('sm-title'),
    img: document.getElementById('sm-img'), wrap: document.getElementById('sm-img-wrap'),
    prev: document.getElementById('sm-prev'), next: document.getElementById('sm-next'),
    counter: document.getElementById('sm-counter'), strip: document.getElementById('sm-strip'),
    where: document.getElementById('sm-where'), shows: document.getElementById('sm-shows'),
    useSec: document.getElementById('sm-use-sec'), useH: document.getElementById('sm-use-h'), use: document.getElementById('sm-use'),
    text: document.getElementById('sm-text'), note: document.getElementById('sm-note'), qs: document.getElementById('sm-qs'),
    open: document.getElementById('sm-open'), zoom: document.getElementById('sm-zoom'),
    close: document.getElementById('sm-close'), copy: document.getElementById('sm-copy')
  };
  var state = { set: [], setId: '', index: 0, opener: null, zoomed: false };

  function setText(node, s) { node.textContent = s; }

  function setZoom(on) {
    state.zoomed = on;
    overlay.classList.toggle('zoomed', on);
    el.zoom.setAttribute('aria-pressed', on ? 'true' : 'false');
    setText(el.zoom.querySelector('span'), on ? 'พอดีหน้าต่าง' : 'ขยาย 100%');
    el.zoom.querySelector('i').className = on ? 'fas fa-search-minus' : 'fas fa-search-plus';
    if (on) { el.wrap.scrollTop = 0; el.wrap.scrollLeft = 0; }
  }

  function buildStrip() {
    el.strip.textContent = '';
    state.set.forEach(function (key, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'sm-thumb';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', data.slides[key].label + ': ' + data.slides[key].title);
      var im = document.createElement('img');
      im.src = 'slides/' + key + '-t.webp';
      im.alt = '';
      im.loading = 'lazy';
      b.appendChild(im);
      b.addEventListener('click', function () { go(i); });
      el.strip.appendChild(b);
    });
  }

  function qLabel() {
    if (state.setId.charAt(0) === 'q') return 'ข้อ ' + state.setId.slice(1);
    return 'คลังสไลด์';
  }

  function render() {
    var key = state.set[state.index];
    var s = data.slides[key];
    setText(el.crumb, s.label + '  ·  ' + qLabel());
    setText(el.title, s.title);
    el.img.src = 'slides/' + key + '.webp';
    el.img.alt = s.label + ': ' + s.title;
    setText(el.where, s.where);
    setText(el.shows, s.shows);
    var useKey = state.setId + '|' + key;
    var use = data.uses[useKey];
    if (use) {
      el.useSec.hidden = false;
      setText(el.useH, 'ใช้ตอบข้อ ' + state.setId.slice(1) + ' อย่างไร');
      setText(el.use, use);
    } else {
      el.useSec.hidden = true;
    }
    setText(el.text, s.text);
    setText(el.note, s.note ? 'หมายเหตุเลขหน้า: ' + s.note : (s.book ? 'ข้อความจากตำราเป็นข้อความย่อ ดูรูปเต็มสำหรับเนื้อหาครบถ้วน' : ''));
    el.qs.textContent = '';
    if (s.qs.length) {
      s.qs.forEach(function (q) {
        var a = document.createElement('a');
        a.href = '#q' + q;
        a.textContent = 'ข้อ ' + q;
        a.addEventListener('click', function () { close(false); });
        el.qs.appendChild(a);
      });
    } else {
      var none = document.createElement('span');
      none.className = 'none';
      none.textContent = 'ไม่มีข้อที่อ้างถึงโดยตรง';
      el.qs.appendChild(none);
    }
    el.open.hidden = !s.href;
    if (s.href) el.open.href = s.href;
    el.open.querySelector('span').textContent = s.pdf ? 'เปิดไฟล์ต้นฉบับ (PDF)' : 'ดาวน์โหลดไฟล์ต้นฉบับ';
    el.open.querySelector('i').className = s.pdf ? 'fas fa-file-pdf' : 'fas fa-file-powerpoint';
    setText(el.counter, (state.index + 1) + ' / ' + state.set.length + '  ·  ลูกศรซ้ายขวาเลื่อนภาพ, Esc ปิด');
    el.prev.disabled = state.index === 0;
    el.next.disabled = state.index === state.set.length - 1;
    var thumbs = el.strip.children;
    for (var i = 0; i < thumbs.length; i++) {
      thumbs[i].setAttribute('aria-selected', i === state.index ? 'true' : 'false');
    }
    if (thumbs[state.index]) thumbs[state.index].scrollIntoView({ block: 'nearest', inline: 'center' });
    setZoom(false);
    el.copy.textContent = 'คัดลอก';
    var side = overlay.querySelector('.sm-side');
    if (side) side.scrollTop = 0;
  }

  function go(i) {
    if (i < 0 || i >= state.set.length) return;
    state.index = i;
    render();
  }

  function openModal(key, setId, opener) {
    var set = data.sets[setId];
    if (!set || set.indexOf(key) < 0) return;
    state.set = set;
    state.setId = setId;
    state.index = set.indexOf(key);
    state.opener = opener;
    buildStrip();
    overlay.hidden = false;
    document.body.classList.add('sm-lock');
    render();
    dialog.focus();
  }

  function close(restoreFocus) {
    overlay.hidden = true;
    document.body.classList.remove('sm-lock');
    setZoom(false);
    if (restoreFocus !== false && state.opener && state.opener.focus) state.opener.focus({ preventScroll: true });
  }

  function focusables() {
    return Array.prototype.slice.call(dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]'))
      .filter(function (n) { return n.offsetParent !== null; });
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('.ev-card, .gal-open') : null;
    if (!btn) return;
    e.preventDefault();
    openModal(btn.getAttribute('data-key'), btn.getAttribute('data-set'), btn);
  });

  overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
  el.close.addEventListener('click', function () { close(); });
  el.prev.addEventListener('click', function () { go(state.index - 1); });
  el.next.addEventListener('click', function () { go(state.index + 1); });
  el.zoom.addEventListener('click', function () { setZoom(!state.zoomed); });
  el.img.addEventListener('click', function () { setZoom(!state.zoomed); });

  el.copy.addEventListener('click', function () {
    var txt = el.text.textContent;
    function done() { el.copy.textContent = 'คัดลอกแล้ว'; }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(done, function () { el.copy.textContent = 'คัดลอกไม่ได้'; });
    } else {
      var range = document.createRange();
      range.selectNodeContents(el.text);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      el.copy.textContent = 'เลือกข้อความแล้ว (กด Ctrl+C)';
    }
  });

  document.addEventListener('keydown', function (e) {
    if (overlay.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(state.index - 1); return; }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(state.index + 1); return; }
    if (e.key === 'Tab') {
      var f = focusables();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialog)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* deep links: #gal-L5 opens the gallery stage, #q4-evidence scrolls to the block */
  function openGalleryFromHash() {
    var id = window.location.hash.slice(1);
    var d = id ? document.getElementById(id) : null;
    if (d && d.tagName === 'DETAILS') d.open = true;
  }
  window.addEventListener('hashchange', openGalleryFromHash);
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#gal-"]') : null;
    if (!a) return;
    var d = document.getElementById(a.getAttribute('href').slice(1));
    if (d && d.tagName === 'DETAILS') d.open = true;
  });
  openGalleryFromHash();

  window.Exam2025Slides = { open: openModal, close: close };
})();
