"""Static markup for the interactive widgets on the 2025 exam page (behavior lives in exam2025.js)."""

LAB5_PROGRAM = """        ORG   0000H
ReadyState:
        MOV   R0, #01H        ; state 1 = Ready
        SETB  P1.1            ; คนสีแดง ON
        CLR   P1.0            ; คนสีเขียว OFF
        JB    P2.0, GoState   ; push -> Go State
        SJMP  ReadyState      ; ไม่กด -> อยู่ Ready
GoState:
        MOV   R0, #02H        ; state 2 = Go
        CLR   P1.1            ; คนสีแดง OFF
        SETB  P1.0            ; คนสีเขียว ON
        MOV   R1, #10         ; 10 รอบ x Delay
Timer:
        ACALL Delay           ; สไลด์เขียน call delay
        DJNZ  R1, Timer
        JB    P2.0, GoState   ; ยังกดอยู่ -> เริ่ม Go ใหม่
        SJMP  ReadyState      ; timer หมด -> Ready
Delay:
        MOV   TMOD, #01H      ; Timer 0 Mode 1
        MOV   TH0, #0FFH      ; 11111111B
        MOV   TL0, #0F6H      ; 11110110B -> 10 counts
        MOV   TCON, #10H      ; TR0 = 1 เริ่มนับ
Wait:
        JNB   TCON.5, Wait    ; รอ TF0
        MOV   TCON, #00H      ; หยุด Timer, ล้าง TF0
        RET
        END"""


def head(wid, icon, title, sub):
    return (f'<header class="widget-head"><div><h4 id="{wid}-h"><i class="fas {icon}" aria-hidden="true"></i> {title}</h4>'
            f'<p class="widget-sub">{sub}</p></div><span class="widget-tag"><i class="fas fa-hand-pointer" aria-hidden="true"></i> Interactive</span></header>')


def jump(target, label, preset=""):
    p = f' data-preset="{preset}"' if preset else ""
    return (f'<button type="button" class="widget-jump" data-target="{target}"{p}>'
            f'<i class="fas fa-sliders-h" aria-hidden="true"></i> {label}</button>')


TIMER_WORKBENCH = '<section class="widget" id="w-timer" aria-labelledby="w-timer-h">' + head(
    "w-timer", "fa-stopwatch", "Timer / Counter Workbench",
    "เครื่องจำลองโจทย์ Timer/Counter: แก้ตัวเลขได้อิสระ สุ่มโจทย์ตามระดับความยาก ฝึกตอบแล้วตรวจ และดูเฉลยเต็มทุกขั้น") + '''
  <div class="tabs" role="tablist" aria-label="โหมดของเครื่องจำลอง">
    <button type="button" role="tab" class="tab" data-wt-tab="calc" aria-selected="true">คำนวณอิสระ (ข้อ 4, 9)</button>
    <button type="button" role="tab" class="tab" data-wt-tab="solve" aria-selected="false">ตัวแก้โจทย์ทุกแบบ</button>
    <button type="button" role="tab" class="tab" data-wt-tab="practice" aria-selected="false">ฝึกสอบ สุ่มโจทย์</button>
    <button type="button" role="tab" class="tab" data-wt-tab="map" aria-selected="false">ตัวเลขที่เปลี่ยนได้</button>
  </div>
  <div data-wt-panel="calc">
  <div class="widget-grid">
    <div class="widget-controls">
      <label class="field">ความถี่คริสตอล
        <select id="wt-fosc"><option value="12" selected>12 MHz (1 MC = 1 µs)</option><option value="11.0592">11.0592 MHz (UART)</option><option value="custom">กำหนดเอง</option></select>
      </label>
      <label class="field" id="wt-custom-wrap" hidden>ความถี่ (MHz)
        <input id="wt-fosc-custom" type="number" min="1" max="40" step="0.0001" value="24">
      </label>
      <label class="field">โหมด Timer (M1 M0)
        <select id="wt-mode"><option value="1" selected>Mode 1: 16 บิต</option><option value="0">Mode 0: 13 บิต</option><option value="2">Mode 2: 8 บิต auto-reload</option></select>
      </label>
      <fieldset class="field seg">
        <legend>สิ่งที่ต้องการสร้าง</legend>
        <label><input type="radio" name="wt-kind" value="delay" checked> หน่วงเวลา</label>
        <label><input type="radio" name="wt-kind" value="square"> Square wave</label>
      </fieldset>
      <label class="field" id="wt-time-wrap">เวลาหน่วง (µs)
        <input id="wt-time" type="number" min="1" step="1" value="100">
      </label>
      <label class="field" id="wt-freq-wrap" hidden>ความถี่ square wave (Hz)
        <input id="wt-freq" type="number" min="1" step="1" value="1000">
      </label>
      <div class="preset-row" role="group" aria-label="ค่าตัวอย่างจากข้อสอบ">
        <button type="button" class="chip-btn" data-wt="delay:100">ข้อ 4: 100 µs</button>
        <button type="button" class="chip-btn" data-wt="delay:10">ข้อ 9: 10 µs</button>
        <button type="button" class="chip-btn" data-wt="square:1000">1 kHz square</button>
        <button type="button" class="chip-btn" data-wt="delay:20">Lecture 5: 20 µs</button>
      </div>
    </div>
    <div class="widget-out">
      <ol class="calc-steps" id="wt-steps" aria-live="polite"></ol>
      <div class="reg-chips" id="wt-regs"></div>
      <svg id="wt-wave" class="widget-svg" viewBox="0 0 460 120" role="img" aria-label="รูปคลื่นที่ได้"></svg>
    </div>
  </div>
  </div>
  <div data-wt-panel="solve" hidden>
    <div class="sim-intro" id="ts-idea"></div>
    <div class="widget-grid">
      <div class="widget-controls">
        <label class="field">ชนิดโจทย์<select id="ts-fam"></select></label>
        <div id="ts-form" class="widget-controls"></div>
        <label class="field">ระดับความยากที่จะสุ่ม<select id="ts-level"><option value="1">ระดับ 1: ตรงตามสไลด์</option><option value="2">ระดับ 2: ดัดแปลงจากข้อสอบเก่า</option><option value="3">ระดับ 3: พลิกแพลงหนัก</option></select></label>
        <div class="preset-row">
          <button type="button" class="chip-btn primary" id="ts-random"><i class="fas fa-dice" aria-hidden="true"></i> สุ่มตัวเลขในโจทย์ชนิดนี้</button>
          <button type="button" class="chip-btn" id="ts-reset">คืนค่าตั้งต้น</button>
        </div>
      </div>
      <div class="widget-out"><div id="ts-out" aria-live="polite"></div></div>
    </div>
    <details class="sim-vary" id="ts-vary"></details>
  </div>
  <div data-wt-panel="practice" hidden>
    <div class="widget-grid">
      <div class="widget-controls">
        <fieldset class="field"><legend>ชนิดโจทย์ที่จะสุ่ม</legend><div id="tp-fams" class="tp-fams"></div></fieldset>
        <label class="field">ระดับความยาก<select id="tp-level"><option value="1">ระดับ 1: ตรงตามสไลด์</option><option value="2" selected>ระดับ 2: ดัดแปลงจากข้อสอบเก่า</option><option value="3">ระดับ 3: พลิกแพลงหนัก</option></select></label>
        <label class="field">รหัสโจทย์ (พิมพ์ซ้ำเพื่อได้โจทย์เดิม)<input id="tp-seed" type="number" min="1" step="1"></label>
        <div class="preset-row">
          <button type="button" class="chip-btn" id="tp-seed-go">โหลดรหัสนี้</button>
          <button type="button" class="chip-btn primary" id="tp-new"><i class="fas fa-dice" aria-hidden="true"></i> โจทย์ใหม่</button>
        </div>
        <p class="widget-sub" id="tp-score">ยังไม่ได้ทำ</p>
      </div>
      <div class="widget-out">
        <div id="tp-question" class="sim-q"></div>
        <div id="tp-inputs" class="tp-inputs"></div>
        <div class="preset-row">
          <button type="button" class="chip-btn primary" id="tp-check">ตรวจคำตอบ</button>
          <button type="button" class="chip-btn" id="tp-reveal">ดูเฉลยเต็ม</button>
        </div>
        <p id="tp-feedback" class="tp-feedback" aria-live="polite"></p>
        <div id="tp-solution" hidden></div>
      </div>
    </div>
  </div>
  <div data-wt-panel="map" hidden>
    <p class="widget-sub">ทุกแถวคือ "ตัวเลขที่อาจารย์เปลี่ยนได้" ของโจทย์แต่ละชนิด เทียบกับค่าที่เคยออก คำตอบแบบสำเร็จของทุกชนิดอยู่ในแท็บ "ตัวแก้โจทย์ทุกแบบ"</p>
    <div id="tm-map"></div>
  </div>
</section>'''

SFR_REGISTERS = '''<div class="tabs" role="tablist" aria-label="เลือกรีจิสเตอร์">
        <button type="button" role="tab" class="tab" data-reg="TMOD" aria-selected="true">TMOD (89H)</button>
        <button type="button" role="tab" class="tab" data-reg="TCON" aria-selected="false">TCON (88H)</button>
        <button type="button" role="tab" class="tab" data-reg="IE" aria-selected="false">IE (A8H)</button>
        <button type="button" role="tab" class="tab" data-reg="IP" aria-selected="false">IP (B8H)</button>
      </div>'''

SFR_FLIPPER = '<section class="widget" id="w-sfr" aria-labelledby="w-sfr-h">' + head(
    "w-sfr", "fa-toggle-on", "SFR Bit-Flipper: TMOD / TCON / IE / IP",
    "กดที่บิตเพื่อสลับ 0/1 แล้วดูความหมายของค่าทั้งไบต์แบบเรียลไทม์") + f'''
  {SFR_REGISTERS}
  <div class="bit-row" id="ws-bits" role="group" aria-label="บิต 7 ถึง 0"></div>
  <div class="widget-grid">
    <div class="widget-out">
      <div class="reg-chips" id="ws-value"></div>
      <ul class="meaning-list" id="ws-meaning" aria-live="polite"></ul>
    </div>
    <div class="widget-controls">
      <label class="field">ค่าตัวอย่าง
        <select id="ws-preset"></select>
      </label>
      <p class="widget-note" id="ws-note"></p>
    </div>
  </div>
</section>'''

UART_FRAME = '<section class="widget" id="w-uart" aria-labelledby="w-uart-h">' + head(
    "w-uart", "fa-wave-square", "UART Frame Explorer: Mode 0 / 1 / 2 / 3",
    "พิมพ์ข้อมูล 1 ไบต์ แล้วดูว่าออกทาง TxD เป็นบิตอะไรบ้าง เรียงตามเวลา (LSB ก่อน)") + '''
  <div class="widget-grid">
    <div class="widget-controls">
      <label class="field">ข้อมูล (hex 00–FF)
        <input id="wu-data" type="text" inputmode="text" maxlength="2" value="41" spellcheck="false" autocomplete="off">
      </label>
      <label class="field">โหมด (SM0 SM1)
        <select id="wu-mode"><option value="0">Mode 0: Shift Register (00)</option><option value="1" selected>Mode 1: 8-bit UART (01)</option><option value="2">Mode 2: 9-bit UART (10)</option><option value="3">Mode 3: 9-bit UART (11)</option></select>
      </label>
      <label class="field">ความถี่คริสตอล
        <select id="wu-fosc"><option value="12">12 MHz</option><option value="11.0592" selected>11.0592 MHz</option></select>
      </label>
      <label class="field" id="wu-baud-wrap">Baud rate (Mode 1/3, Timer 1 Mode 2, SMOD = 0)
        <select id="wu-baud"><option>2400</option><option>4800</option><option selected>9600</option><option>19200</option></select>
      </label>
      <label class="check" id="wu-tb8-wrap" hidden><input id="wu-tb8" type="checkbox"> TB8 (บิตที่ 9) = 1</label>
      <button type="button" class="chip-btn" id="wu-parity" hidden>ตั้ง TB8 = parity (ให้จำนวน 1 เป็นคู่)</button>
    </div>
    <div class="widget-out">
      <div class="frame-row frame-live" id="wu-frame" aria-live="polite"></div>
      <ol class="calc-steps" id="wu-steps"></ol>
    </div>
  </div>
</section>'''

IRQ_EXPLORER = '<section class="widget" id="w-irq" aria-labelledby="w-irq-h">' + head(
    "w-irq", "fa-bolt", "Interrupt Vector &amp; Priority Explorer",
    "เปิด/ปิด interrupt, ตั้ง priority แล้วจำลองว่าถ้าเกิดพร้อมกัน CPU จะกระโดดไป vector ไหนก่อน") + '''
  <label class="check ea-toggle"><input id="wi-ea" type="checkbox" checked> EA = 1 (IE.7 เปิด interrupt ทั้งระบบ)</label>
  <div class="table-responsive">
    <table class="custom-table irq-table">
      <thead><tr><th>ลำดับ</th><th>Source</th><th>Vector</th><th>เปิด (IE)</th><th>High (IP)</th><th>เกิดขึ้น (flag = 1)</th></tr></thead>
      <tbody id="wi-rows"></tbody>
    </table>
  </div>
  <div class="widget-out">
    <ol class="calc-steps" id="wi-result" aria-live="polite"></ol>
    <div class="reg-chips" id="wi-regs"></div>
  </div>
</section>'''

MOTOR_SANDBOX = '<section class="widget" id="w-motor" aria-labelledby="w-motor-h">' + head(
    "w-motor", "fa-fan", "Motor Control Sandbox: H-Bridge + PWM",
    "เลือกทิศด้วยคู่สวิตช์ และปรับ duty cycle ด้วย PWM แล้วดูกระแส แรงดันเฉลี่ย และค่าโหลด Timer") + '''
  <div class="widget-grid">
    <div class="widget-controls">
      <fieldset class="field seg seg-col">
        <legend>สถานะ H-Bridge (Mazidi Table 16-2)</legend>
        <label><input type="radio" name="wm-dir" value="off"> Off: เปิดทุกสวิตช์</label>
        <label><input type="radio" name="wm-dir" value="cw" checked> Clockwise: SW1 + SW4</label>
        <label><input type="radio" name="wm-dir" value="ccw"> Counterclockwise: SW2 + SW3</label>
        <label><input type="radio" name="wm-dir" value="invalid"> Invalid: ปิดทุกสวิตช์</label>
      </fieldset>
      <label class="field">Duty cycle: <strong id="wm-duty-val">60%</strong>
        <input id="wm-duty" type="range" min="0" max="100" step="5" value="60">
      </label>
      <label class="field">แรงดันแหล่งจ่ายมอเตอร์ (V)
        <input id="wm-volt" type="number" min="1" max="48" step="1" value="12">
      </label>
      <label class="field">ความถี่ PWM (Hz, Fosc 12 MHz)
        <input id="wm-freq" type="number" min="16" max="20000" step="1" value="1000">
      </label>
    </div>
    <div class="widget-out">
      <svg id="wm-bridge" class="widget-svg" viewBox="0 0 420 250" role="img" aria-label="วงจร H-Bridge และทางเดินกระแส"></svg>
      <svg id="wm-wave" class="widget-svg" viewBox="0 0 420 90" role="img" aria-label="รูปคลื่น PWM"></svg>
      <ol class="calc-steps" id="wm-steps" aria-live="polite"></ol>
    </div>
  </div>
</section>'''


def fsm_simulator(listing_html):
    return '<section class="widget widget-flagship" id="w-fsm" aria-labelledby="w-fsm-h">' + head(
        "w-fsm", "fa-traffic-light", "Traffic 1 FSM Simulator (Lab 5, นับ machine cycle)",
        "รันโปรแกรม Lab 5 จริงทีละคำสั่งบนแบบจำลอง 8051 (12 MHz, 1 MC = 1 µs) กดปุ่ม P2.0 แล้วดูรีจิสเตอร์เปลี่ยน") + f'''
  <div class="fsm-toolbar" role="group" aria-label="ควบคุมการจำลอง">
    <button type="button" class="chip-btn primary" id="wf-run"><i class="fas fa-play" aria-hidden="true"></i> <span>Run</span></button>
    <button type="button" class="chip-btn" id="wf-step"><i class="fas fa-shoe-prints" aria-hidden="true"></i> Step 1 คำสั่ง</button>
    <button type="button" class="chip-btn" id="wf-reset"><i class="fas fa-rotate-left" aria-hidden="true"></i> Reset</button>
    <label class="field inline">ความเร็ว
      <select id="wf-speed"><option value="1">1 คำสั่ง/เฟรม</option><option value="4" selected>4 คำสั่ง/เฟรม</option><option value="20">20 คำสั่ง/เฟรม</option><option value="200">200 คำสั่ง/เฟรม</option></select>
    </label>
  </div>
  <div class="fsm-grid">
    <div class="fsm-board">
      <div class="lamps" aria-live="polite">
        <div class="lamp lamp-red" id="wf-red"><span class="lamp-dot" aria-hidden="true"></span><span>P1.1 คนสีแดง</span></div>
        <div class="lamp lamp-green" id="wf-green"><span class="lamp-dot" aria-hidden="true"></span><span>P1.0 คนสีเขียว</span></div>
      </div>
      <button type="button" class="push-btn" id="wf-push" aria-pressed="false">
        <i class="fas fa-hand-point-up" aria-hidden="true"></i> กดปุ่ม P2.0 (กดค้างได้)
      </button>
      <label class="check"><input type="checkbox" id="wf-hold"> ล็อกปุ่มค้างไว้ (P2.0 = 1 ตลอด)</label>
      <div class="fsm-states" aria-hidden="true">
        <span class="fsm-state" id="wf-s-ready">Ready (R0 = 01H)</span>
        <span class="fsm-arrow">push →<br>← timer</span>
        <span class="fsm-state" id="wf-s-go">Go (R0 = 02H)</span>
      </div>
      <dl class="reg-grid" id="wf-regs"></dl>
      <ol class="fsm-log" id="wf-log" aria-live="polite"></ol>
    </div>
    <div class="fsm-code">
      <pre class="code-content" id="wf-listing">{listing_html}</pre>
    </div>
  </div>
  <p class="widget-note">แบบจำลองนับ machine cycle ตามตาราง MCS-51 และเดิน Timer 0 ทีละ cycle ขณะ TR0 = 1 ใช้เพื่อเรียนรู้ลำดับเหตุการณ์ ไม่ใช่ตัวแทนของ EdSim51 หรือบอร์ดจริงทุกรายละเอียด</p>
</section>'''
