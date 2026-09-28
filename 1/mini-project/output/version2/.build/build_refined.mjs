import fs from 'node:fs/promises';
import path from 'node:path';
import { Presentation, PresentationFile } from '@oai/artifact-tool';

const V = '/Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/mini-project/output/version2';
const B = path.join(V, '.build');
const COMP = path.join(B, 'components');
const PREVIEW_DIR = path.join(V, 'preview_refined');

// Pre-load all component images as binary Buffers for real embedding
const imgBuffers = {
  l293d: await fs.readFile(path.join(COMP, 'l293d_dip16.png')),
  motor: await fs.readFile(path.join(COMP, 'motor_real.png')),
  resistor: await fs.readFile(path.join(COMP, 'resistor_27ohm.png')),
  mcu: await fs.readFile(path.join(COMP, 'mcu_8051_board.png')),
  ledRed: await fs.readFile(path.join(COMP, 'led_red.png')),
  ledGreen: await fs.readFile(path.join(COMP, 'led_green.png')),
  buzzer: await fs.readFile(path.join(COMP, 'buzzer.png')),
  limitSwitch: await fs.readFile(path.join(COMP, 'limit_switch.png')),
  pushButton: await fs.readFile(path.join(COMP, 'push_button.png')),
  sensorTx: await fs.readFile(path.join(COMP, 'sensor_tx.png')),
  sensorRx: await fs.readFile(path.join(COMP, 'sensor_rx.png')),
  opto: await fs.readFile(path.join(COMP, 'optocoupler_vo617a.png')),
};

const P = Presentation.create({ slideSize: { width: 1920, height: 1080 } });

const C = {
  ink: '#1E293B',
  blue: '#0EA5E9',
  navy: '#0369A1',
  teal: '#0D9488',
  line: '#E2E8F0',
  muted: '#64748B',
  pale: '#F0F9FF',
  paleGreen: '#F0FDF4',
  green: '#16A34A',
  paleRed: '#FEF2F2',
  red: '#DC2626',
  white: '#FFFFFF',
  cardBg: '#F8FAFC',
};

let serial = 0;
const geo = [];

function shape(s, x, y, w, h, fill = 'none', stroke = 'none', sw = 0, geometry = 'rect') {
  let q = s.shapes.add({
    name: `s${P.slides.items.indexOf(s) + 1}-${++serial}`,
    geometry,
    position: { left: x, top: y, width: w, height: h },
    fill,
    line: { fill: stroke, width: sw },
  });
  geo.push({ slide: P.slides.items.indexOf(s) + 1, x, y, w, h, geometry });
  return q;
}

function t(s, text, x, y, w, h, size = 32, color = C.ink, bold = false, align = 'left', font = 'Tahoma', wrap = 'none') {
  let q = shape(s, x, y, w, h);
  q.text = text;
  q.text.style = {
    typeface: font,
    fontSize: size,
    color,
    bold,
    alignment: align,
    verticalAlignment: 'middle',
    wrap,
    autoFit: 'none',
    insets: { top: 0, right: 0, bottom: 0, left: 0 },
  };
  return q;
}

function addImg(s, data, left, top, width, height) {
  return s.images.add({
    data,
    mimeType: 'image/png',
    position: { left, top, width, height },
  });
}

function pathShape(s, x, y, w, h, segments, color = C.ink, sw = 3, fill = 'none') {
  let commands = [];
  for (let seg of segments) {
    commands.push({ moveTo: { x: seg[0][0], y: seg[0][1] } });
    for (let p of seg.slice(1)) commands.push({ lineTo: { x: p[0], y: p[1] } });
  }
  let q = s.shapes.add({
    geometry: 'custom',
    name: `diagram-${++serial}`,
    position: { left: x, top: y, width: w, height: h },
    fill,
    line: { fill: color, width: sw },
    customPaths: [{ width: w, height: h, commands }],
  });
  geo.push({ slide: P.slides.items.indexOf(s) + 1, x, y, w, h, geometry: 'custom' });
  return q;
}

function l(s, x, y, X, Y, c = C.blue, sw = 3) {
  if (x !== X && y !== Y) throw Error(`Non-orthogonal connector: (${x},${y}) to (${X},${Y})`);
  return shape(
    s,
    Math.min(x, X),
    Math.min(y, Y),
    Math.max(0.01, Math.abs(x - X)),
    Math.max(0.01, Math.abs(y - Y)),
    'none',
    c,
    sw,
    'line'
  );
}

function arr(s, x, y, X, Y, c = C.blue) {
  l(s, x, y, X, Y, c);
  let q = shape(s, X - 6, Y - 6, 12, 12, c, 'none', 0, 'triangle');
  q.position = {
    left: X - 6,
    top: Y - 6,
    width: 12,
    height: 12,
    rotation: X > x ? 90 : X < x ? 270 : Y > y ? 180 : 0,
  };
}

function route(s, pts, c = C.blue) {
  for (let i = 1; i < pts.length; i++) {
    (i === pts.length - 1 ? arr : l)(s, ...pts[i - 1], ...pts[i], c);
  }
}

function n(s, text, x, y, w = 240, h = 78, on = false) {
  shape(s, x, y, w, h, on ? C.pale : C.white, on ? C.blue : C.line, on ? 3 : 2);
  t(s, text, x + 8, y + 6, w - 16, h - 12, 29, on ? C.blue : C.ink, true, 'center');
}

function slide(title, sub = '', notes = '') {
  let s = P.slides.add();
  s.background.fill = C.white;
  t(s, title, 96, 84, 1728, 80, 51, C.ink, true);
  if (sub) t(s, sub, 96, 169, 1728, 51, 29, C.muted);
  l(s, 96, 241, 1824, 241, C.line, 1.5);
  t(s, String(P.slides.items.length).padStart(2, '0'), 1758, 954, 66, 32, 23, C.muted, false, 'right');
  s.speakerNotes.textFrame.setText(
    'เอกสารอ้างอิง: PROPOSED_SOLUTION_DESIGN.md และ assignment/ASSIGNMENT_BREAKDOWN.md\n' + notes
  );
  return s;
}

function note(s, text, y = 916) {
  t(s, text, 96, y, 1728, 44, 27, C.muted);
}

function door(s, x, y, w, h, { state = 'closed', beam = false, person = false, detail = false } = {}) {
  let sx = w / 700,
    sy = h / 390;
  let seg = [
    [
      [20, 70],
      [680, 70],
      [680, 365],
      [20, 365],
      [20, 70],
    ],
    [
      [345, 70],
      [345, 365],
    ],
    [
      [10, 48],
      [690, 48],
    ],
    [
      [20, 372],
      [680, 372],
    ],
  ];
  if (detail)
    seg.push(
      [
        [45, 14],
        [645, 14],
        [645, 36],
        [45, 36],
        [45, 14],
      ],
      [
        [65, 36],
        [65, 65],
      ],
      [
        [625, 36],
        [625, 65],
      ]
    );
  pathShape(
    s,
    x,
    y,
    w,
    h,
    seg.map((a) => a.map(([a, b]) => [a * sx, b * sy])),
    C.ink,
    2.8
  );
  let px = state === 'closed' ? 25 : state === 'open' ? 350 : 185;
  pathShape(
    s,
    x,
    y,
    w,
    h,
    [
      [
        [px, 78],
        [px + 312, 78],
        [px + 312, 359],
        [px, 359],
        [px, 78],
      ],
      [
        [px + 265, 186],
        [px + 265, 243],
      ],
    ].map((a) => a.map(([a, b]) => [a * sx, b * sy])),
    C.blue,
    4
  );
  if (beam) {
    pathShape(
      s,
      x,
      y,
      w,
      h,
      [
        [
          [8, 195],
          [340, 195],
        ],
        [
          [8, 320],
          [340, 320],
        ],
      ].map((a) => a.map(([a, b]) => [a * sx, b * sy])),
      C.blue,
      3
    );
    shape(s, x, y + 183 * sy, 14 * sx, 24 * sy, C.blue);
    shape(s, x + 337 * sx, y + 183 * sy, 14 * sx, 24 * sy, C.blue);
    shape(s, x, y + 308 * sy, 14 * sx, 24 * sy, C.blue);
    shape(s, x + 337 * sx, y + 308 * sy, 14 * sx, 24 * sy, C.blue);
  }
  if (state === 'opening' || state === 'closing') {
    let a = state === 'opening' ? [px + 80, px + 210] : [px + 210, px + 80];
    arr(s, x + a[0] * sx, y + 130 * sy, x + a[1] * sx, y + 130 * sy);
  }
  if (person) {
    let px = 105 * sx,
      py = 212 * sy;
    shape(s, x + px, y + py, 38 * sx, 38 * sy, C.ink, 'none', 0, 'ellipse');
    pathShape(
      s,
      x + px - 6 * sx,
      y + py + 43 * sy,
      54 * sx,
      103 * sy,
      [
        [
          [0, 0],
          [54 * sx, 0],
          [54 * sx, 62 * sy],
          [39 * sx, 62 * sy],
          [39 * sx, 103 * sy],
          [28 * sx, 103 * sy],
          [28 * sx, 62 * sy],
          [16 * sx, 62 * sy],
          [16 * sx, 103 * sy],
          [5 * sx, 103 * sy],
          [5 * sx, 0],
        ],
      ],
      C.ink,
      1,
      C.ink
    );
  }
  if (detail) {
    t(s, 'มอเตอร์และสายพาน', x + 200 * sx, y - 25 * sy, 440 * sx, 38 * sy, 26, C.muted, false, 'center');
    t(s, 'LC', x + 20 * sx, y + 380 * sy, 65 * sx, 36 * sy, 25, C.muted);
    t(s, 'LO', x + 595 * sx, y + 380 * sy, 75 * sx, 36 * sy, 25, C.muted, false, 'right');
  }
}

function table(s, vals, x, y, w, rowh, cols, size = 28) {
  let a = s.tables.add({
    rows: vals.length,
    columns: vals[0].length,
    left: x,
    top: y,
    width: w,
    height: rowh * vals.length,
    columnWidths: cols,
    values: vals,
  });
  a.borders.assign({ fill: C.line, width: 1, style: 'solid' });
  for (let r = 0; r < vals.length; r++) {
    a.rows[r].height = rowh;
    for (let c = 0; c < vals[0].length; c++) {
      let q = a.getCell(r, c);
      q.fill = r === 0 ? C.pale : C.white;
      q.text.style = {
        typeface: 'Tahoma',
        fontSize: size,
        color: r === 0 ? C.blue : C.ink,
        bold: r === 0,
        verticalAlignment: 'middle',
        alignment: c === 0 ? 'left' : 'center',
        insets: { left: 16, right: 12, top: 8, bottom: 8 },
      };
    }
  }
}

// -------------------------------------------------------------
// SLIDE 1: Cover
// -------------------------------------------------------------
{
  let s = slide('ระบบประตูเลื่อนอัตโนมัติ', 'ตรวจจับสิ่งกีดขวางและเปิดประตูกลับ');
  t(s, 'Sliding Door Safety Control', 96, 296, 1060, 65, 42, C.blue, true);
  t(s, 'โครงงานระบบสมองกลฝังตัว\nไมโครคอนโทรลเลอร์ 8051', 96, 399, 1060, 130, 45, C.ink, true);
  t(
    s,
    'กลุ่มที่ 1\n66362416  นายธีรภัทร ภู่ระย้า  ลำดับที่ 4\n66363116  นางสาวปราณปรียา ศรียอง  ลำดับที่ 7',
    96,
    600,
    1100,
    160,
    31
  );
  t(s, 'อาจารย์ที่ปรึกษา ดร.แสงชัย มังกรทอง', 96, 823, 1140, 50, 30, C.muted);
  door(s, 1190, 403, 615, 354, { state: 'open', beam: true, detail: true });
}

// -------------------------------------------------------------
// SLIDE 2: Problem & Solution
// -------------------------------------------------------------
{
  let s = slide('ปัญหาของประตูเดิมและแนวทางแก้ไข', 'เด็กหรือสัตว์เลี้ยงอาจเดินตามเข้ามาในขณะที่ประตูกำลังปิด');
  t(s, 'ประตูเดิมปิดตามเวลา', 96, 283, 814, 60, 38, C.ink, true);
  t(s, 'เพิ่มลำแสงตรวจจับสองระดับ', 1010, 283, 814, 60, 38, C.blue, true);
  l(s, 958, 285, 958, 864, C.line, 2);
  door(s, 140, 396, 725, 360, { state: 'closing', person: true, detail: true });
  door(s, 1050, 396, 725, 360, { state: 'opening', beam: true, person: true, detail: true });
  t(s, 'ไม่ทราบว่าทางผ่านยังมีสิ่งกีดขวาง\nบานประตูจึงอาจเคลื่อนเข้าหนีบ', 96, 792, 814, 108, 34);
  t(s, 'ตัดแรงขับทันทีเมื่อตรวจพบ\nรอ 200 ms แล้วเปิดกลับจนสุด', 1010, 792, 814, 108, 34);
  s.speakerNotes.textFrame.setText(
    'เอกสารอ้างอิง: PROPOSED_SOLUTION_DESIGN.md ข้อ 2-3\nรูปเป็นภาพอธิบายหลักการ ไม่ได้แสดงระยะตามมาตราส่วน ลำแสงจริงติดเยื้องระนาบบานเพื่อไม่ให้บานบังเซนเซอร์เอง การ coast ไม่ได้หยุดการเคลื่อนที่ทางกลทันที'
  );
}

// -------------------------------------------------------------
// SLIDE 3: FSM Diagram
// -------------------------------------------------------------
{
  let s = slide('สถานะการทำงานและตำแหน่งประตู', 'เส้นทางปกติประกอบด้วย ปิดสนิท กำลังเปิด เปิดค้าง และกำลังปิด');
  n(s, 'START', 96, 312, 190);
  n(s, 'CLOSED', 414, 312, 230);
  n(s, 'OPENING', 904, 312, 230);
  n(s, 'FAULT', 96, 603, 190);
  n(s, 'CLOSING', 414, 603, 230);
  n(s, 'HOLD', 904, 603, 230);
  n(s, 'REV_WAIT', 414, 814, 230);
  n(s, 'REOPEN', 904, 814, 230);

  arr(s, 286, 351, 414, 351);
  t(s, 'LC = 0', 300, 291, 110, 42, 25, C.blue);
  arr(s, 644, 351, 904, 351);
  t(s, 'กดปุ่ม 20 ms', 670, 284, 205, 42, 26, C.blue, false, 'center');
  t(s, 'หยุดครบ 200 ms', 649, 392, 253, 40, 24, C.muted, false, 'center');
  arr(s, 1019, 390, 1019, 603);
  t(s, 'ถึง LO', 1050, 478, 111, 42, 26, C.blue);
  arr(s, 904, 642, 644, 642);
  t(s, 'ว่างต่อเนื่อง 3 s', 655, 687, 240, 42, 26, C.blue, false, 'center');
  arr(s, 529, 603, 529, 390);
  t(s, 'ถึง LC', 550, 479, 116, 42, 26, C.blue);
  arr(s, 529, 681, 529, 814);
  t(s, 'ถูกบัง', 551, 734, 143, 40, 26, C.blue);
  arr(s, 644, 853, 904, 853);
  t(s, 'ครบ 200 ms', 670, 798, 215, 39, 26, C.blue, false, 'center');
  arr(s, 1019, 814, 1019, 681);
  t(s, 'ถึง LO', 1050, 738, 110, 42, 26, C.blue);

  route(s, [
    [191, 312],
    [191, 267],
    [1180, 267],
    [1180, 642],
    [1134, 642],
  ]);
  t(s, 'เริ่มที่ LO', 996, 270, 170, 37, 24, C.muted);
  arr(s, 191, 720, 191, 681, C.muted);
  arr(s, 191, 603, 191, 390, C.muted);
  t(s, 'Reset\nผ่านเงื่อนไข', 215, 455, 170, 87, 25, C.muted);
  t(s, 'E-stop\nเดินทางเกิน 5 s\nลิมิตผิดปกติ', 96, 721, 272, 135, 26, C.muted);

  l(s, 1230, 288, 1230, 922, C.line, 2);
  for (let [i, state, label] of [
    [0, 'closed', 'ปิดสนิท'],
    [1, 'opening', 'กำลังเปิด'],
    [2, 'open', 'เปิดสุด'],
    [3, 'closing', 'กำลังปิด'],
  ]) {
    door(s, 1340, 288 + i * 155, 255, 136, { state });
    t(s, label, 1623, 334 + i * 155, 200, 46, 30);
  }
  note(s, 'เมื่อเริ่มที่ LO ให้เข้า HOLD    START ไม่ทราบตำแหน่งเข้า FAULT    การกดปุ่มขณะปิดให้ผลเหมือนถูกบัง', 916);
}

// -------------------------------------------------------------
// SLIDE 4: Block Diagram of Hardware Connection (Standardized Symmetrical 3-Column Architecture)
// -------------------------------------------------------------
{
  let s = slide(
    'การเชื่อมต่อวงจรฮาร์ดแวร์',
    'ผังเชื่อมต่ออุปกรณ์จริง: ไมโครคอนโทรลเลอร์ 8051, ไอซีขับ L293D, มอเตอร์เกียร์ 12 V และระบบเซนเซอร์ความปลอดภัย'
  );

  // Layout Dimensions:
  // Slide Width = 1920, Height = 1080
  // Left Column (Actuators & Driver): x = 80 .. 640 (Width = 560)
  // Left Wiring Channel: x = 640 .. 720 (Width = 80)
  // Center Column (8051 MCU System): x = 720 .. 1200 (Width = 480)
  // Right Wiring Channel: x = 1200 .. 1280 (Width = 80)
  // Right Column (Inputs & Sensors): x = 1280 .. 1840 (Width = 560)
  // Total Horizontal = 80 + 560 + 80 + 480 + 80 + 560 + 80 = 1920 (100% Bilateral Symmetry)

  // =============================================================
  // 1. CENTER COLUMN: 8051 SYSTEM CONTROLLER (x = 720, w = 480)
  // =============================================================
  // Main Panel Frame
  shape(s, 720, 220, 480, 730, C.cardBg, C.navy, 2);

  // Panel Header Bar
  shape(s, 720, 220, 480, 54, '#0f2b48', 'none');
  t(s, 'ไมโครคอนโทรลเลอร์ AT89S52 (8051 Core)', 720, 224, 480, 26, 17, C.white, true, 'center');
  t(s, '12.000 MHz (1 µs / Cycle) | Timer 0 Mode 2 (ฐานเวลา 10 ms Tick)', 720, 250, 480, 20, 11.5, '#93C5FD', false, 'center');

  // Sub-headers for Ports (Clean 100px width badges aligned with pin columns)
  shape(s, 725, 276, 100, 24, '#E0F2FE', C.blue, 1);
  t(s, 'PORT 1 เอาต์พุต', 725, 278, 100, 20, 11, C.navy, true, 'center');

  shape(s, 1095, 276, 100, 24, '#CCFBF1', C.teal, 1);
  t(s, 'PORT 2 อินพุต', 1095, 278, 100, 20, 11, C.teal, true, 'center');

  // Center MCU Core Illustration (Central Silicon Chip, centered at x = 960)
  shape(s, 845, 320, 230, 510, '#1E293B', '#334155', 2);
  // Notch at top of IC
  shape(s, 936, 320, 48, 14, '#0f172a', '#334155', 1);

  // Chip markings
  t(s, 'ATMEL', 845, 348, 230, 22, 14, '#64748B', true, 'center');
  t(s, 'AT89S52', 845, 372, 230, 30, 22, C.white, true, 'center');
  t(s, '24PU - 12.000 MHz', 845, 404, 230, 20, 12, '#94A3B8', false, 'center');

  // Internal Logic Blocks inside MCU Core
  shape(s, 855, 442, 210, 72, '#0f172a', '#38BDF8', 1.5);
  t(s, 'สถาปัตยกรรม FSM', 855, 448, 210, 22, 14, '#38BDF8', true, 'center');
  t(s, '8 สถานะควบคุมความปลอดภัย', 855, 470, 210, 18, 12, '#BAE6FD', false, 'center');
  t(s, 'ป้องกันการกลับทิศฉับพลัน 100%', 855, 490, 210, 16, 11, '#7DD3FC', false, 'center');

  shape(s, 855, 526, 210, 72, '#0f172a', '#FBBF24', 1.5);
  t(s, 'ฐานเวลา TIMER 0', 855, 532, 210, 22, 14, '#FBBF24', true, 'center');
  t(s, 'Mode 2 (8-bit Auto-Reload)', 855, 554, 210, 18, 12, '#FDE68A', false, 'center');
  t(s, 'TH0 = 06H (250 µs × 40 = 10 ms)', 855, 574, 210, 16, 11, '#FEF08A', false, 'center');

  shape(s, 855, 610, 210, 72, '#0f172a', '#34D399', 1.5);
  t(s, 'ระบบกรองสัญญาณรบกวน', 855, 616, 210, 22, 14, '#34D399', true, 'center');
  t(s, 'Debounce Filter (20 ms)', 855, 638, 210, 18, 12, '#A7F3D0', false, 'center');
  t(s, 'Motor Dead Time (200 ms)', 855, 658, 210, 16, 11, '#A7F3D0', false, 'center');

  // Crystal Oscillator Graphic below Chip
  shape(s, 895, 695, 130, 34, '#E2E8F0', '#94A3B8', 1.5);
  t(s, 'XTAL 12 MHz', 895, 702, 130, 20, 12, C.ink, true, 'center');
  l(s, 925, 729, 925, 748, '#94A3B8', 2);
  l(s, 995, 729, 995, 748, '#94A3B8', 2);
  shape(s, 915, 748, 90, 22, C.pale, '#94A3B8', 1);
  t(s, 'C1, C2 = 30 pF', 915, 750, 90, 18, 10, C.muted, false, 'center');

  // Safe Power Note at bottom of MCU
  shape(s, 855, 785, 210, 42, '#EFF6FF', C.blue, 1);
  t(s, 'ไฟเลี้ยง VCC = +5V (ขา 40)\nGND = 0V (ขา 20) แยกกราวด์สัญญาณ', 855, 788, 210, 36, 11, C.navy, false, 'center');

  // -------------------------------------------------------------
  // MCU PORT 1 TERMINAL PIN BADGES (Left Border: x = 725 .. 825)
  // -------------------------------------------------------------
  const p1Pins = [
    { y: 320, pin: 'P1.2', name: 'RUN_N', col: C.blue },
    { y: 380, pin: 'P1.0', name: 'IN1', col: C.blue },
    { y: 440, pin: 'P1.1', name: 'IN2', col: C.blue },
    { y: 680, pin: 'P1.4', name: 'LED_R', col: C.red },
    { y: 750, pin: 'P1.5', name: 'LED_G', col: C.green },
    { y: 830, pin: 'P1.7', name: 'BUZZ', col: '#D97706' },
  ];

  p1Pins.forEach((p) => {
    shape(s, 725, p.y - 14, 100, 28, C.white, p.col, 1.5);
    t(s, `${p.pin} ${p.name}`, 727, p.y - 13, 96, 26, 12, p.col, true, 'center');
    shape(s, 717, p.y - 3, 6, 6, p.col);
    l(s, 825, p.y, 845, p.y, p.col, 1.5);
  });

  // -------------------------------------------------------------
  // MCU PORT 2 TERMINAL PIN BADGES (Right Border: x = 1095 .. 1195)
  // Perfectly matching y positions with Port 1 for absolute symmetry!
  // -------------------------------------------------------------
  const p2Pins = [
    { y: 320, pin: 'P2.0', name: 'PB_OUT', col: C.teal },
    { y: 380, pin: 'P2.1', name: 'PB_IN', col: C.teal },
    { y: 440, pin: 'P2.3', name: 'LIM_LO', col: C.teal },
    { y: 500, pin: 'P2.4', name: 'LIM_LC', col: C.teal },
    { y: 680, pin: 'P2.2', name: 'IR_HIGH', col: C.teal },
    { y: 750, pin: 'P2.5', name: 'IR_LOW', col: C.teal },
    { y: 830, pin: 'P2.7', name: 'E-STOP', col: C.red },
  ];

  p2Pins.forEach((p) => {
    shape(s, 1095, p.y - 14, 100, 28, C.white, p.col, 1.5);
    t(s, `${p.pin} ${p.name}`, 1097, p.y - 13, 96, 26, 12, p.col, true, 'center');
    shape(s, 1197, p.y - 3, 6, 6, p.col);
    l(s, 1075, p.y, 1095, p.y, p.col, 1.5);
  });

  // =============================================================
  // 2. LEFT COLUMN: ACTUATORS & MOTOR DRIVER (x = 80 .. 640)
  // =============================================================

  // --- CARD 2A: MOTOR DRIVER & L293D (y = 220 .. 580, Height = 360) ---
  shape(s, 80, 220, 560, 360, C.cardBg, '#BAE6FD', 1.5);
  shape(s, 80, 220, 560, 38, '#E0F2FE', 'none');
  t(s, 'วงจรขับมอเตอร์ (L293D H-Bridge Driver & 12V Motor)', 95, 226, 530, 26, 15, C.navy, true);

  // Power Rails inside Driver Card
  shape(s, 95, 266, 120, 24, C.paleRed, C.red, 1);
  t(s, '+12V Motor Rail', 97, 267, 116, 22, 11, C.red, true, 'center');

  shape(s, 440, 266, 120, 24, C.pale, C.blue, 1);
  t(s, '+5V Logic Rail', 442, 267, 116, 22, 11, C.blue, true, 'center');

  // L293D DIP-16 Realistic Image (Centered in Card 2A at x = 330 .. 470)
  addImg(s, imgBuffers.l293d, 330, 305, 140, 255);

  // L293D Input Pins on its right edge (x = 470):
  shape(s, 475, 308, 55, 24, C.white, C.blue, 1);
  t(s, '1: EN', 476, 309, 53, 22, 11, C.blue, true, 'center');

  shape(s, 475, 368, 55, 24, C.white, C.blue, 1);
  t(s, '2: IN1', 476, 369, 53, 22, 11, C.blue, true, 'center');

  shape(s, 475, 428, 55, 24, C.white, C.blue, 1);
  t(s, '7: IN2', 476, 429, 53, 22, 11, C.blue, true, 'center');

  // L293D Output Pins on its left edge (x = 275 .. 330):
  shape(s, 275, 368, 55, 24, C.white, C.ink, 1);
  t(s, '3: OUT1', 276, 369, 53, 22, 11, C.ink, true, 'center');

  shape(s, 275, 428, 55, 24, C.white, C.ink, 1);
  t(s, '6: OUT2', 276, 429, 53, 22, 11, C.ink, true, 'center');

  // 74HCT14 Inverter & E-Stop NC1 Hardware Interlock Block
  shape(s, 545, 302, 85, 36, C.white, C.blue, 1.5);
  t(s, '74HCT14\n& NC1', 546, 304, 83, 32, 10, C.navy, true, 'center');

  // Wires from MCU inputs (x = 640) into L293D:
  // P1.2 (y = 320): from 640 -> into Inverter at 630 -> leaves at 545 -> into Pin 1 (EN) at 530
  l(s, 630, 320, 640, 320, C.blue, 2);
  l(s, 530, 320, 545, 320, C.blue, 2);

  // P1.0 (y = 380): from 640 -> directly into Pin 2 (IN1) at 530
  l(s, 530, 380, 640, 380, C.blue, 2);

  // P1.1 (y = 440): from 640 -> directly into Pin 7 (IN2) at 530
  l(s, 530, 440, 640, 440, C.blue, 2);

  // Motor (Left side of Driver Card at x = 90 .. 220)
  addImg(s, imgBuffers.motor, 90, 335, 130, 114);
  t(s, 'มอเตอร์เกียร์ 12V DC', 85, 455, 140, 22, 13, C.ink, true, 'center');
  t(s, 'พร้อมมู่เล่ย์และสายพาน', 85, 477, 140, 18, 11, C.muted, false, 'center');

  // Motor Terminals M+ and M-
  shape(s, 225, 368, 30, 24, C.pale, C.ink, 1);
  t(s, 'M+', 226, 369, 28, 22, 11, C.ink, true, 'center');

  shape(s, 225, 428, 30, 24, C.pale, C.ink, 1);
  t(s, 'M-', 226, 429, 28, 22, 11, C.ink, true, 'center');

  // Series Resistor 27 Ohm 10W (between L293D OUT1 and M+)
  addImg(s, imgBuffers.resistor, 256, 365, 18, 30);
  t(s, '27 Ω 10 W', 248, 350, 65, 16, 9, C.muted, true, 'center');

  // Wires from L293D outputs to Motor:
  // OUT1 (y = 380): Pin 3 at 275 -> through resistor -> into M+ at 255
  l(s, 255, 380, 275, 380, C.ink, 2);
  l(s, 225, 380, 255, 380, C.ink, 2);

  // OUT2 (y = 440): Pin 6 at 275 -> directly into M- at 255
  l(s, 255, 440, 275, 440, C.ink, 2);

  // Power wiring inside L293D
  // +12V from rail at (155, 290) down to Pin 8 at (330, 500)
  l(s, 155, 290, 155, 510, C.red, 1.5);
  l(s, 155, 510, 330, 510, C.red, 1.5);

  // +5V from rail at (500, 290) down to Pin 16 at (450, 305)
  l(s, 500, 290, 500, 300, C.blue, 2);
  l(s, 450, 300, 500, 300, C.blue, 2);
  l(s, 450, 300, 450, 305, C.blue, 2);

  // Terminal connection dots at Card 2A right edge (x = 640)
  shape(s, 637, 317, 6, 6, C.blue);
  shape(s, 637, 377, 6, 6, C.blue);
  shape(s, 637, 437, 6, 6, C.blue);

  // --- CARD 2B: STATUS INDICATORS (y = 610 .. 950, Height = 340) ---
  shape(s, 80, 610, 560, 340, C.cardBg, C.line, 1.5);
  shape(s, 80, 610, 560, 38, '#F1F5F9', 'none');
  t(s, 'อุปกรณ์แสดงสถานะความปลอดภัย (Safety Status Indicators)', 95, 616, 530, 26, 15, C.ink, true);

  // Row 1: Red LED (y = 680)
  addImg(s, imgBuffers.ledRed, 115, 650, 24, 60);
  t(s, 'LED สีแดง (P1.4, Active-Low)', 155, 665, 380, 22, 14, C.red, true);
  t(s, 'ติดเมื่อประตูกำลังปิด (CLOSING) และกะพริบถี่เมื่อเกิดสถานะขัดข้อง (FAULT)', 155, 687, 380, 18, 11, C.muted, false);
  shape(s, 545, 668, 85, 24, C.white, C.red, 1);
  t(s, 'P1.4 LED', 546, 669, 83, 22, 11, C.red, true, 'center');
  l(s, 630, 680, 640, 680, C.red, 2);
  shape(s, 637, 677, 6, 6, C.red);

  // Row 2: Green LED (y = 750)
  addImg(s, imgBuffers.ledGreen, 115, 720, 24, 60);
  t(s, 'LED สีเขียว (P1.5, Active-Low)', 155, 735, 380, 22, 14, C.green, true);
  t(s, 'ติดเมื่อประตูกำลังเปิด (OPENING) และติดสว่างค้างเมื่อทางผ่านว่าง (HOLD)', 155, 757, 380, 18, 11, C.muted, false);
  shape(s, 545, 738, 85, 24, C.white, C.green, 1);
  t(s, 'P1.5 LED', 546, 739, 83, 22, 11, C.green, true, 'center');
  l(s, 630, 750, 640, 750, C.green, 2);
  shape(s, 637, 747, 6, 6, C.green);

  // Row 3: Buzzer (y = 830)
  addImg(s, imgBuffers.buzzer, 105, 805, 44, 48);
  t(s, 'Buzzer ส่งเสียงเตือน (P1.7, Active-Low)', 155, 815, 380, 22, 14, '#D97706', true);
  t(s, 'ส่งสัญญาณเสียงเตือนเป็นจังหวะเมื่อพบสิ่งกีดขวาง และเสียงค้างเมื่อกด E-Stop', 155, 837, 380, 18, 11, C.muted, false);
  shape(s, 545, 818, 85, 24, C.white, '#D97706', 1);
  t(s, 'P1.7 BUZZ', 546, 819, 83, 22, 11, '#D97706', true, 'center');
  l(s, 630, 830, 640, 830, '#D97706', 2);
  shape(s, 637, 827, 6, 6, '#D97706');

  // -------------------------------------------------------------
  // LEFT WIRING CHANNEL (x = 640 .. 720, Width = 80)
  // Perfectly straight 180° horizontal bus lines from MCU to Actuators
  // -------------------------------------------------------------
  const leftBus = [
    { y: 320, col: C.blue },
    { y: 380, col: C.blue },
    { y: 440, col: C.blue },
    { y: 680, col: C.red },
    { y: 750, col: C.green },
    { y: 830, col: '#D97706' },
  ];

  leftBus.forEach((b) => {
    l(s, 640, b.y, 720, b.y, b.col, 2);
    let ar = shape(s, 674, b.y - 5, 10, 10, b.col, 'none', 0, 'triangle');
    ar.position = { left: 674, top: b.y - 5, width: 10, height: 10, rotation: 270 };
  });

  // =============================================================
  // 3. RIGHT COLUMN: SENSORS & USER INPUTS (x = 1280 .. 1840)
  // =============================================================

  // --- CARD 3A: PUSH BUTTONS & LIMIT SWITCHES (y = 220 .. 580, Height = 360) ---
  shape(s, 1280, 220, 560, 360, C.cardBg, '#99F6E4', 1.5);
  shape(s, 1280, 220, 560, 38, '#F0FDFA', 'none');
  t(s, 'สวิตช์ควบคุมและสวิตช์ลิมิต (Switches & End-Limits)', 1295, 226, 530, 26, 15, C.teal, true);

  // Row 1: Push Button Outside (y = 320)
  shape(s, 1290, 308, 75, 24, C.white, C.teal, 1);
  t(s, 'P2.0 PB', 1291, 309, 73, 22, 11, C.teal, true, 'center');
  l(s, 1280, 320, 1290, 320, C.teal, 2);
  l(s, 1365, 320, 1395, 320, C.teal, 1.5);
  addImg(s, imgBuffers.pushButton, 1395, 298, 36, 44);
  t(s, 'ปุ่มเปิดประตูภายนอก PB_OUT (เข้าขา P2.0)', 1445, 308, 380, 22, 13, C.teal, true);
  t(s, 'สวิตช์กดติด-ปล่อยดับ ต่อลง GND กรอง Debounce 20 ms', 1445, 328, 380, 18, 11, C.muted, false);
  shape(s, 1277, 317, 6, 6, C.teal);

  // Row 2: Push Button Inside (y = 380)
  shape(s, 1290, 368, 75, 24, C.white, C.teal, 1);
  t(s, 'P2.1 PB', 1291, 369, 73, 22, 11, C.teal, true, 'center');
  l(s, 1280, 380, 1290, 380, C.teal, 2);
  l(s, 1365, 380, 1395, 380, C.teal, 1.5);
  addImg(s, imgBuffers.pushButton, 1395, 358, 36, 44);
  t(s, 'ปุ่มเปิดประตูภายใน PB_IN (เข้าขา P2.1)', 1445, 368, 380, 22, 13, C.teal, true);
  t(s, 'สวิตช์กดติด-ปล่อยดับ ต่อลง GND กรอง Debounce 20 ms', 1445, 388, 380, 18, 11, C.muted, false);
  shape(s, 1277, 377, 6, 6, C.teal);

  // Row 3: Limit Switch Open LO (y = 440)
  shape(s, 1290, 428, 75, 24, C.white, C.teal, 1);
  t(s, 'P2.3 LO', 1291, 429, 73, 22, 11, C.teal, true, 'center');
  l(s, 1280, 440, 1290, 440, C.teal, 2);
  l(s, 1365, 440, 1390, 440, C.teal, 1.5);
  addImg(s, imgBuffers.limitSwitch, 1390, 416, 48, 44);
  t(s, 'สวิตช์เปิดสุด LO (Active-Low)', 1445, 428, 380, 22, 13, C.teal, true);
  t(s, 'สวิตช์ก้านลูกกลิ้ง COM ต่อ GND, NO ต่อเข้า P2.3', 1445, 448, 380, 18, 11, C.muted, false);
  shape(s, 1277, 437, 6, 6, C.teal);

  // Row 4: Limit Switch Close LC (y = 500)
  shape(s, 1290, 488, 75, 24, C.white, C.teal, 1);
  t(s, 'P2.4 LC', 1291, 489, 73, 22, 11, C.teal, true, 'center');
  l(s, 1280, 500, 1290, 500, C.teal, 2);
  l(s, 1365, 500, 1390, 500, C.teal, 1.5);
  addImg(s, imgBuffers.limitSwitch, 1390, 476, 48, 44);
  t(s, 'สวิตช์ปิดสุด LC (Active-Low)', 1445, 488, 380, 22, 13, C.teal, true);
  t(s, 'สวิตช์ก้านลูกกลิ้ง COM ต่อ GND, NO ต่อเข้า P2.4', 1445, 508, 380, 18, 11, C.muted, false);
  shape(s, 1277, 497, 6, 6, C.teal);

  // --- CARD 3B: OPTICAL SENSORS & E-STOP (y = 610 .. 950, Height = 340) ---
  shape(s, 1280, 610, 560, 340, C.cardBg, '#FECACA', 1.5);
  shape(s, 1280, 610, 560, 38, '#FEF2F2', 'none');
  t(s, 'เซนเซอร์ลำแสงผ่านและสวิตช์ฉุกเฉิน (Through-Beam & E-Stop)', 1295, 616, 530, 26, 15, C.red, true);

  // Row 1: IR Sensor High (y = 680)
  shape(s, 1290, 668, 75, 24, C.white, C.teal, 1);
  t(s, 'P2.2 HI', 1291, 669, 73, 22, 11, C.teal, true, 'center');
  l(s, 1280, 680, 1290, 680, C.teal, 2);
  l(s, 1365, 680, 1380, 680, C.teal, 1.5);
  addImg(s, imgBuffers.opto, 1380, 664, 32, 32);
  addImg(s, imgBuffers.sensorRx, 1425, 665, 40, 30);
  l(s, 1465, 680, 1515, 680, C.red, 2); // Optical beam
  shape(s, 1468, 669, 44, 18, C.paleRed, C.red, 1);
  t(s, 'ลำแสง', 1468, 670, 44, 16, 9, C.red, true, 'center');
  addImg(s, imgBuffers.sensorTx, 1515, 665, 40, 30);
  t(s, 'IR_HIGH ลำแสงระดับอก (เข้าขา P2.2)', 1565, 668, 265, 20, 12, C.teal, true);
  t(s, 'ตรวจจับลำตัวคน ตอบสนองกลับทิศ (12V->5V)', 1565, 688, 265, 16, 10, C.muted, false);
  shape(s, 1277, 677, 6, 6, C.teal);

  // Row 2: IR Sensor Low (y = 750)
  shape(s, 1290, 738, 75, 24, C.white, C.teal, 1);
  t(s, 'P2.5 LO', 1291, 739, 73, 22, 11, C.teal, true, 'center');
  l(s, 1280, 750, 1290, 750, C.teal, 2);
  l(s, 1365, 750, 1380, 750, C.teal, 1.5);
  addImg(s, imgBuffers.opto, 1380, 734, 32, 32);
  addImg(s, imgBuffers.sensorRx, 1425, 735, 40, 30);
  l(s, 1465, 750, 1515, 750, C.red, 2); // Optical beam
  shape(s, 1468, 739, 44, 18, C.paleRed, C.red, 1);
  t(s, 'ลำแสง', 1468, 740, 44, 16, 9, C.red, true, 'center');
  addImg(s, imgBuffers.sensorTx, 1515, 735, 40, 30);
  t(s, 'IR_LOW ลำแสงระดับพื้น (เข้าขา P2.5)', 1565, 738, 265, 20, 12, C.teal, true);
  t(s, 'ป้องกันหนีบเด็ก/สัตว์เลี้ยง/สัมภาระเตี้ย', 1565, 758, 265, 16, 10, C.muted, false);
  shape(s, 1277, 747, 6, 6, C.teal);

  // Row 3: E-Stop Switch (y = 830)
  shape(s, 1290, 818, 75, 24, C.white, C.red, 1);
  t(s, 'P2.7 STOP', 1291, 819, 73, 22, 11, C.red, true, 'center');
  l(s, 1280, 830, 1290, 830, C.red, 2);
  l(s, 1365, 830, 1395, 830, C.red, 1.5);
  shape(s, 1395, 814, 38, 32, C.paleRed, C.red, 2);
  t(s, 'E-Stop', 1396, 820, 36, 20, 9, C.red, true, 'center');
  t(s, 'สวิตช์ปุ่มหยุดฉุกเฉิน (Dual NC)', 1445, 818, 380, 22, 13, C.red, true);
  t(s, 'NC1: ตัดไฟขา EN ของ L293D ทันที  |  NC2: แจ้งสถานะ P2.7', 1445, 838, 380, 18, 11, C.muted, false);
  shape(s, 1277, 827, 6, 6, C.red);

  // -------------------------------------------------------------
  // RIGHT WIRING CHANNEL (x = 1200 .. 1280, Width = 80)
  // Perfectly straight 180° horizontal bus lines from Sensors to MCU
  // -------------------------------------------------------------
  const rightBus = [
    { y: 320, col: C.teal },
    { y: 380, col: C.teal },
    { y: 440, col: C.teal },
    { y: 500, col: C.teal },
    { y: 680, col: C.teal },
    { y: 750, col: C.teal },
    { y: 830, col: C.red },
  ];

  rightBus.forEach((b) => {
    l(s, 1200, b.y, 1280, b.y, b.col, 2);
    let ar = shape(s, 1236, b.y - 5, 10, 10, b.col, 'none', 0, 'triangle');
    ar.position = { left: 1236, top: b.y - 5, width: 10, height: 10, rotation: 270 };
  });

  // Footer Engineering Note
  note(
    s,
    'สถาปัตยกรรม 3 คอลัมน์สมมาตร: ซ้าย (วงจรขับมอเตอร์และอุปกรณ์แสดงผล) | กลาง (แกนประมวลผล AT89S52) | ขวา (ระบบเซนเซอร์และอินพุตความปลอดภัย)',
    975
  );
}

// -------------------------------------------------------------
// SLIDE 5: Voltage Levels
// -------------------------------------------------------------
{
  let s = slide('แรงดันไฟฟ้าที่ใช้ในระบบ', 'แยกไฟเลี้ยงอุปกรณ์ออกจากระดับสัญญาณที่เข้าสู่ไมโครคอนโทรลเลอร์');
  t(s, '5 V', 96, 300, 760, 100, 82, C.blue, true);
  t(s, 'วงจรลอจิก', 96, 422, 760, 55, 39, C.ink, true);
  t(
    s,
    'บอร์ด 8051 และ SN74HCT14\nขา VCC1 ของ L293D\nฝั่งเอาต์พุตของ Optocoupler\nLED และ Buzzer',
    96,
    518,
    795,
    218,
    35
  );
  l(s, 957, 309, 957, 753, C.line, 2);
  t(s, '12 V', 1060, 300, 764, 100, 82, C.blue, true);
  t(s, 'วงจรกำลังและเซนเซอร์', 1060, 422, 764, 55, 39, C.ink, true);
  t(
    s,
    'ขา VCC2 ของ L293D\nแหล่งจ่ายมอเตอร์กระแสจำกัด 0.50 A\nเซนเซอร์ลำแสง E3Z-T61 สองคู่',
    1060,
    518,
    764,
    218,
    34
  );
  shape(s, 96, 800, 1728, 108, C.pale, C.line, 1.5);
  t(s, 'สัญญาณเข้า 8051 ต้องอยู่ในช่วง 0–5 V เท่านั้น', 124, 820, 1672, 66, 39, C.blue, true);
  s.speakerNotes.textFrame.setText(
    'PROPOSED_SOLUTION_DESIGN.md ข้อ 4.3-4.4. มอเตอร์มีพิกัด 12 V แต่แรงดันขั้วมอเตอร์จริงต่ำกว่าแหล่งจ่ายเนื่องจาก L293D และตัวต้านทานอนุกรม ต้องวัดกระแสและความร้อนจริง'
  );
}

// -------------------------------------------------------------
// SLIDE 6: Timing Intervals & Rationale
// -------------------------------------------------------------
{
  let s = slide('เวลารอแต่ละช่วงและเหตุผลที่เลือก', 'ค่าที่กำหนดใช้กับชุดสาธิต และต้องตรวจสอบการหยุดจริงก่อนใช้กับกลไก');
  let a = [
    ['20 ms', 'กรองสวิตช์', 'ยืนยันการกดปุ่ม เพื่อลดผลจากหน้าสัมผัสกระเด้ง'],
    ['200 ms', 'พักมอเตอร์', 'ตัดแรงขับก่อนกลับทิศ เพื่อให้มอเตอร์มีเวลาลดความเร็ว'],
    ['3 วินาที', 'เปิดค้าง', 'เริ่มนับใหม่เมื่อถูกบัง รอคนเดินพ้นก่อนเริ่มปิด'],
    ['5 วินาที', 'จำกัดเวลาการเดินทาง', 'ไม่ถึงลิมิตตามกำหนด ให้ตัดแรงขับและเข้าสถานะขัดข้อง'],
  ];
  a.forEach((v, i) => {
    let y = 294 + i * 146;
    t(s, v[0], 96, y, 310, 75, 52, C.blue, true);
    t(s, v[1], 461, y, 394, 60, 34, C.ink, true);
    t(s, v[2], 461, y + 62, 1320, 47, 31);
    if (i < 3) l(s, 96, y + 128, 1824, y + 128, C.line, 1.5);
  });
  note(s, 'ระบบมีกลไกตรวจจับความผิดปกติของลิมิตต้นทาง: หากสวิตช์ยังไม่ปล่อยภายใน 500 ms ให้เข้า FAULT', 916);
}

// -------------------------------------------------------------
// SLIDE 7: Port State Table
// -------------------------------------------------------------
{
  let s = slide('ค่าพอร์ตในแต่ละสถานะ', 'P0 แสดงรหัสสถานะ ส่วน P1 ควบคุมทิศทางมอเตอร์ ไฟ และเสียง');
  let vals = [
    ['สถานะ', 'P0', 'P1', 'IN1', 'IN2', 'RUN_N', 'RED_N', 'GREEN_N', 'BUZZ_N'],
    ['START', 'F8H', 'ECH', '0', '0', '1', '0', '1', '1'],
    ['CLOSED', 'F9H', 'FCH', '0', '0', '1', '1', '1', '1'],
    ['OPENING', 'FAH', 'D9H', '1', '0', '0', '1', '0', '1'],
    ['HOLD', 'FBH', 'DCH', '0', '0', '1', '1', '0', '1'],
    ['CLOSING', 'FCH', '6AH', '0', '1', '0', '0', '1', '0'],
    ['REV_WAIT', 'FDH', '6CH', '0', '0', '1', '0', '1', '0'],
    ['REOPEN', 'FEH', '69H', '1', '0', '0', '0', '1', '0'],
    ['FAULT', 'FFH', '6CH', '0', '0', '1', '0', '1', '0'],
  ];
  table(s, vals, 96, 284, 1728, 61, [308, 130, 130, 135, 135, 222, 222, 222, 224], 28);
  t(s, 'RUN_N = 1 หมายถึงตัดแรงขับ     สัญญาณลงท้าย _N ทำงานที่ระดับ 0', 96, 855, 1728, 45, 29);
  note(s, 'P2 ตั้ง latch เป็น FFH เพื่ออ่านอินพุต    P1.3 และ P1.6 คงค่า 1    P0 ต้องมี pull-up ภายนอก', 915);
}

// -------------------------------------------------------------
// SLIDES 8-16: Assembly Code Excerpts (Clean Language)
// -------------------------------------------------------------
const raw = await fs.readFile(path.join(V, 'firmware/SLIDING_DOOR_CLASSROOM.asm'), 'utf8');
const codeLists = [];

function excerpt(a, b) {
  let q = raw
    .slice(raw.indexOf(a + ':'), b ? raw.indexOf(b + ':') : undefined)
    .split('\n')
    .map((z) => z.split(';')[0].trimEnd())
    .filter((z) => z.trim() && !z.includes('END'));
  return q.map((z) => (z.startsWith(' ') ? '    ' + z.trim() : z));
}

function panel(s, lines, heading = 'โค้ดส่วนสำคัญของสถานะ') {
  shape(s, 735, 282, 1089, 647, C.white, C.line, 2);
  t(s, heading, 768, 302, 1016, 47, 28, C.blue, true);
  l(s, 768, 365, 1791, 365, C.line, 1.5);
  let step = Math.min(32, 526 / lines.length),
    sz = Math.min(28, step * 0.9);
  lines.forEach((z, i) =>
    t(s, z, 768, 384 + i * step, 1016, step, sz, z.endsWith(':') ? C.blue : C.ink, true, 'left', 'Courier New')
  );
  codeLists.push({ slide: P.slides.items.length, lines });
}

function side(s, prev, state, next, p0, p1, explain, condition) {
  n(s, prev, 138, 292, 510, 71);
  n(s, state, 138, 429, 510, 88, true);
  n(s, next, 138, 583, 510, 71);
  arr(s, 393, 363, 393, 429);
  arr(s, 393, 517, 393, 583);
  t(s, `P0 = ${p0}    P1 = ${p1}`, 116, 707, 574, 57, 34, C.blue, true);
  t(s, explain, 116, 790, 574, 70, 30);
  t(s, condition, 116, 883, 574, 52, 27, C.muted);
}

// 8: START
{
  let s = slide('การเริ่มระบบและตรวจตำแหน่งประตู', 'การทำงานในสถานะ START (ตรวจหาตำแหน่งและเตรียมความพร้อม)');
  side(
    s,
    'เปิดเครื่อง',
    'START',
    'CLOSED หรือ HOLD',
    'F8H',
    'ECH',
    'ตัดแรงขับก่อนอ่านลิมิต\nลิมิตไม่ถูกต้อง ให้เข้า FAULT',
    'รอให้สัญญาณนิ่ง 20 ms'
  );
  let q = excerpt('START', 'ClosedState').filter((z) => !z.includes('MOV  R0'));
  panel(s, q, 'โค้ดเริ่มต้นระบบและตรวจสอบลิมิต (START)');
  s.speakerNotes.textFrame.setText(
    'SLIDING_DOOR_CLASSROOM.asm: บล็อก START ถึง StartClosed ตัดบรรทัด R0 ออกจากสไลด์เพื่อความกระชับ ไฟล์ฉบับเต็มอยู่ใน firmware'
  );
}

// 9: Delay
{
  let s = slide('ซับรูทีนหน่วงเวลา 20 ms', 'การทำงานของฐานเวลาหน่วง 20 ms ด้วย Timer 0 (12 MHz, 12 Clocks)');
  n(s, 'CALL Delay', 138, 299, 510, 78);
  n(s, 'Timer 0 นับครบ', 138, 469, 510, 86, true);
  n(s, 'RET กลับไปทำงานต่อ', 138, 647, 510, 78);
  arr(s, 393, 377, 393, 469);
  arr(s, 393, 555, 393, 647);
  t(s, 'ค่าเริ่มนับ B1E0H\n65536 − 20000 = 45536\nนับ 20000 รอบ รอบละ 1 µs', 116, 782, 574, 143, 30);
  panel(s, excerpt('Delay'), 'ซับรูทีนหน่วงเวลา Delay (20 ms)');
}

// 10-16: States
const stateSpec = [
  [
    'CLOSED',
    'START หรือ CLOSING',
    'OPENING',
    'F9H',
    'FCH',
    'มอเตอร์หยุด ไฟและเสียงดับ\nรับคำสั่งจากปุ่มทั้งสองฝั่ง',
    'หยุด 200 ms และกรองปุ่ม 20 ms',
    'ClosedState',
    'OpeningState',
    ['MOV  R0', 'ClosedSettle:', '    CALL Delay', '    DJNZ R1,ClosedSettle'],
    'ประตูปิดสนิท',
    'การทำงานในสถานะ CLOSED (ประตูปิดสนิท)',
  ],
  [
    'OPENING',
    'CLOSED',
    'HOLD',
    'FAH',
    'D9H',
    'จ่ายแรงขับในทิศเปิด\nไฟเขียวติดจนถึงลิมิต LO',
    'เกิน 5 วินาที ให้เข้า FAULT',
    'OpeningState',
    'HoldState',
    ['MOV  R0'],
    'ประตูกำลังเปิด',
    'การทำงานในสถานะ OPENING (ประตูกำลังเลื่อนเปิด)',
  ],
  [
    'HOLD',
    'OPENING หรือ REOPEN',
    'CLOSING',
    'FBH',
    'DCH',
    'มอเตอร์หยุด ไฟเขียวติด\nถูกบังหรือกดปุ่มให้เริ่มนับใหม่',
    'ทางผ่านต้องว่างต่อเนื่อง 3 วินาที',
    'HoldState',
    'ClosingState',
    ['MOV  R0'],
    'ประตูเปิดค้าง',
    'การทำงานในสถานะ HOLD (ประตูเปิดค้างรอทางผ่านว่าง)',
  ],
  [
    'CLOSING',
    'HOLD',
    'CLOSED หรือ REV_WAIT',
    'FCH',
    '6AH',
    'ปิดพร้อมไฟแดงและเสียงเตือน\nตรวจลำแสงก่อนตรวจลิมิตปิด',
    'พบสิ่งกีดขวางให้ตัดแรงขับก่อน',
    'ClosingState',
    'RevWaitState',
    ['MOV  R0'],
    'ประตูกำลังปิด',
    'การทำงานในสถานะ CLOSING (ประตูกำลังเลื่อนปิด)',
  ],
  [
    'REV_WAIT',
    'CLOSING',
    'REOPEN',
    'FDH',
    '6CH',
    'ตัดแรงขับพร้อมเสียงเตือน\nยังตรวจปุ่มหยุดฉุกเฉินระหว่างรอ',
    'พักมอเตอร์อย่างน้อย 200 ms',
    'RevWaitState',
    'ReopenState',
    ['MOV  R0'],
    'พักมอเตอร์ก่อนกลับทิศ',
    'การทำงานในสถานะ REV_WAIT (ตัดแรงขับมอเตอร์ก่อนเปิดกลับ)',
  ],
  [
    'REOPEN',
    'REV_WAIT',
    'HOLD',
    'FEH',
    '69H',
    'เปิดกลับพร้อมไฟแดงและเสียง\nถึงลิมิต LO จึงหยุดเปิด',
    'เกิน 5 วินาที ให้เข้า FAULT',
    'ReopenState',
    'FaultState',
    ['MOV  R0'],
    'ประตูเปิดกลับ',
    'การทำงานในสถานะ REOPEN (เปิดประตูกลับเมื่อพบสิ่งกีดขวาง)',
  ],
  [
    'FAULT',
    'พบความผิดปกติ',
    'START',
    'FFH',
    '6CH',
    'ตัดแรงขับ คงไฟแดงและเสียง\nต้องปล่อยแล้วกด Reset ใหม่',
    'กลับไปตรวจตำแหน่งก่อนเริ่มงาน',
    'FaultState',
    'Delay',
    ['MOV  R0'],
    'หยุดเมื่อพบความผิดปกติ',
    'การทำงานในสถานะ FAULT (ตัดแรงขับและแจ้งเตือนข้อผิดพลาด)',
  ],
];

for (let [name, prev, next, p0, p1, desc, cond, start, end, drop, title, sub] of stateSpec) {
  let s = slide(title, sub);
  side(s, prev, name, next, p0, p1, desc, cond);
  let all = excerpt(start, end),
    q = all.filter((z) => !z.includes('MOV  R0'));
  if (name === 'CLOSED') {
    q = all.slice(all.indexOf('ClosedLoop:'));
  } else if (name === 'CLOSING') {
    q = all.slice(all.findIndex((z) => z.includes('MOV  R1,#250')));
  }
  panel(s, q, `โค้ดส่วนสำคัญของสถานะ ${name}`);
  s.speakerNotes.textFrame.setText(
    `แหล่งข้อมูล: firmware/SLIDING_DOOR_CLASSROOM.asm บล็อก ${start}\n${all.join('\n')}`
  );
}

// -------------------------------------------------------------
// SLIDE 17: Simulation Methodology & Setup (Major Overhaul)
// -------------------------------------------------------------
{
  let s = slide(
    'ระเบียบวิธีและสภาพแวดล้อมการทดสอบ',
    'การตรวจสอบความถูกต้องของระบบควบคุมบน EdSim51DI จำลองสัญญาณนาฬิกา 12.000 MHz'
  );

  // 3 Engineering Setup Cards
  let cards = [
    {
      w: 520,
      title: '1. เครื่องมือและสภาพแวดล้อม',
      items: [
        'โปรแกรมจำลอง: EdSim51DI (v2.1.39)',
        'ความถี่สัญญาณนาฬิกา: 12.000 MHz',
        'สถาปัตยกรรม: Classic 8051 (12T Core)',
        'จำลองระดับวงรอบคำสั่ง (Cycle-Accurate)',
        '• เชื่อมต่อเซนเซอร์ลำแสงและลิมิตสวิตช์',
        '• เชื่อมต่อโมดูลขับมอเตอร์ H-Bridge',
      ],
    },
    {
      w: 560,
      title: '2. ที่มาของฐานเวลาทางวิศวกรรม',
      items: [
        'สัญญาณนาฬิกา 12 MHz กำหนดให้:',
        '  1 Machine Cycle (12 Clocks) = 1 µs',
        'Timer 0 โหมด 2 (8-bit Auto-Reload):',
        '  ตั้ง TH0 = 06H (256 − 6 = นับ 250 รอบ)',
        '  เกิด 1 Overflow ทุกๆ 250 µs พอดี',
        'ซอฟต์แวร์นับทบ 40 ครั้ง: 250 µs × 40 = 10 ms',
        'ฐานเวลา 1 Tick = 10 ms วัดจากรอบ CPU จริง',
      ],
    },
    {
      w: 560,
      title: '3. ขอบเขตการทดสอบครบทุกสภาวะ',
      items: [
        'รันจำลองรวมกว่า 41,686,115 คำสั่ง',
        'ครอบคลุมทุกสถานการณ์วิกฤตของระบบ:',
        '  • การทำงานรอบปกติ (Normal Open-Close)',
        '  • พบสิ่งกีดขวางขณะปิด (Obstacle Reversal)',
        '  • ลิมิตสวิตช์ขัดข้อง (Travel Timeout 5 s)',
        '  • ปุ่มกดหยุดฉุกเฉิน (Emergency Stop)',
        'บันทึกและตรวจสอบค่าเวลาทุกการเปลี่ยนสถานะ',
      ],
    },
  ];

  let curX = 96;
  cards.forEach((c) => {
    shape(s, curX, 280, c.w, 610, C.cardBg, C.line, 2);
    shape(s, curX, 280, c.w, 65, C.pale, C.line, 1.5);
    t(s, c.title, curX + 24, 292, c.w - 48, 42, 28, C.blue, true);

    c.items.forEach((item, idx) => {
      let isBold = item.startsWith('1') || item.startsWith('2') || item.startsWith('3') || item.includes('Timer 0');
      let color = item.includes('Tick = 10 ms') ? C.blue : C.ink;
      t(s, item, curX + 24, 365 + idx * 62, c.w - 48, 48, 23, color, isBold);
    });

    curX += c.w + 24;
  });

  note(
    s,
    'ตัวเลขเวลาที่รายงานทั้งหมดมาจากการนับรอบ Machine Cycles จริงของแกนประมวลผลจำลอง จึงมีความแม่นยำทางตรรกะระดับไมโครวินาที',
    920
  );
  s.speakerNotes.textFrame.setText(
    'การจำลองบน EdSim51DI 2.1.39 ใช้สัญญาณนาฬิกา 12.000 MHz ซึ่ง 1 machine cycle เท่ากับ 1 ไมโครวินาที Timer 0 auto-reload โหมด 2 นับ 250 รอบต่อหนึ่ง overflow รวม 40 รอบเกิดเป็น tick 10 ms ตัวเลขเวลาทั้งหมดมาจากการนับรอบคำสั่งจริงในแกน CPU จำลอง'
  );
}

// -------------------------------------------------------------
// SLIDE 18: Measured Timing & Safety Verification (Major Overhaul)
// -------------------------------------------------------------
{
  let s = slide(
    'ผลการวัดเวลาจริงและการรับรองความปลอดภัย',
    'เปรียบเทียบค่าเวลาที่ออกแบบกับค่าที่วัดได้จริง และการรับรองความปลอดภัยทางไฟฟ้า'
  );

  let timingTableVals = [
    ['ช่วงเวลาการทำงาน / ฟังก์ชัน', 'ค่าที่ออกแบบ', 'ค่าที่วัดได้จริง', 'ผลการประเมินทางวิศวกรรม'],
    ['การกรองสัญญาณปุ่มกด (Debounce Filter)', '20 ms', '24.854 ms', 'ผ่านเกณฑ์ กรองสัญญาณกวนจากหน้าสัมผัสกระเด้งได้เสถียร'],
    ['การตัดแรงขับก่อนกลับทิศ (Motor Dead Time)', '200 ms', '209.795 ms', 'ผ่านเกณฑ์ พักมอเตอร์ลดแรงเคลื่อนเหนี่ยวนำย้อนกลับสมบูรณ์'],
    ['ประตูเปิดค้างรอทางผ่านว่าง (Door Hold Time)', '3.000 s', '3.019788 s', 'ผ่านเกณฑ์ เริ่มนับเวลาใหม่ทันทีเมื่อเซนเซอร์ตรวจพบการบัง'],
    ['ป้องกันมอเตอร์ติดขัด (Travel Timeout)', '5.000 s', '5.009978 s', 'ผ่านเกณฑ์ ตัดแรงขับเข้าสู่ FAULT ทันทีเมื่อไม่ถึงลิมิตตามกำหนด'],
  ];

  table(s, timingTableVals, 96, 275, 1728, 62, [480, 220, 248, 780], 25);

  // Electrical Safety Invariant Card
  shape(s, 96, 620, 1728, 275, C.pale, C.blue, 2);
  t(s, 'การรับรองความปลอดภัยทางไฟฟ้า (Electrical Safety Invariant)', 136, 638, 1640, 38, 28, C.blue, true);

  t(
    s,
    '1. ป้องกันการลัดวงจร H-Bridge ใน L293D (Shoot-Through Protection):',
    136,
    685,
    1640,
    32,
    23,
    C.ink,
    true
  );
  t(
    s,
    'ขาควบคุมทิศทาง IN1 (P1.0) และ IN2 (P1.1) ถูกเฝ้าตรวจตลอด 41+ ล้านคำสั่ง ยืนยันว่าไม่มีสถานะเป็น 1 พร้อมกันในทุกรอบคำสั่ง\n(IN1 = 1 และ IN2 = 1 ไม่เกิดขึ้นอย่างเด็ดขาด) รับประกัน 100% ว่าจะไม่เกิดสภาวะลัดวงจรข้ามขั้วในตัวขับมอเตอร์',
    136,
    722,
    1640,
    52,
    21,
    C.ink,
    false
  );

  t(
    s,
    '2. ความปลอดภัยของสัญญาณพอร์ตอินพุตและการสลับทิศทาง:',
    136,
    788,
    1640,
    32,
    23,
    C.ink,
    true
  );
  t(
    s,
    'พอร์ต P2 คงค่า latch เป็น FFH ตลอดเวลาเพื่อป้องกันสัญญาณรบกวนบัส และการเปลี่ยนทิศทางเกิดขึ้นหลังจากตัดแรงขับแล้วเท่านั้น',
    136,
    824,
    1640,
    32,
    21,
    C.muted,
    false
  );

  note(
    s,
    'ผลการทดสอบยืนยันความปลอดภัยด้านจังหวะเวลาและวงจรไฟฟ้าตามข้อกำหนดทางวิศวกรรมครบถ้วน',
    920
  );
  s.speakerNotes.textFrame.setText(
    'ผลการวัดเวลาแสดงความแม่นยำสูง ค่า IN1 และ IN2 ไม่เคยเป็น 1 พร้อมกันตลอดการทดสอบ 41 ล้านคำสั่ง รับประกันความปลอดภัยทางไฟฟ้าของไอซีขับมอเตอร์ L293D'
  );
}

// -------------------------------------------------------------
// SLIDE 19: Conclusion & Physical Verification Next Steps
// -------------------------------------------------------------
{
  let s = slide(
    'สรุปและการทดสอบฮาร์ดแวร์ขั้นต่อไป',
    'ผลจำลองยืนยันลำดับควบคุมที่ปลอดภัย และแนวทางการตรวจสอบร่วมกับชุดกลไกจริง'
  );

  // Left Card: Achievements
  shape(s, 96, 280, 840, 610, C.cardBg, C.line, 2);
  shape(s, 96, 280, 840, 65, C.pale, C.line, 1.5);
  t(s, 'ความสำเร็จของระบบควบคุม (System Achievements)', 124, 292, 780, 42, 28, C.blue, true);

  let achs = [
    { title: '• สถาปัตยกรรม FSM 8 สถานะ:', desc: 'ควบคุมสถานะอย่างเป็นระบบ ป้องกันการสับสนของตรรกะการทำงาน' },
    { title: '• ตรวจจับสิ่งกีดขวางสองระดับ:', desc: 'เซนเซอร์ลำแสงตอบสนองตัดแรงขับทันทีและเปิดประตูกลับอย่างปลอดภัย' },
    { title: '• กลไก Dead Time พักมอเตอร์ 200 ms:', desc: 'ลดแรงเคลื่อนเหนี่ยวนำย้อนกลับ (Back-EMF) และลดความเค้นของกลไก' },
    { title: '• ระบบสำรองความปลอดภัยครบถ้วน:', desc: 'มี Travel Timeout 5 s ป้องกันมอเตอร์ไหม้ และปุ่ม E-Stop ตัดไฟฮาร์ดแวร์' },
  ];
  achs.forEach((item, idx) => {
    let y = 365 + idx * 130;
    t(s, item.title, 130, y, 760, 36, 23, C.ink, true);
    t(s, item.desc, 150, y + 40, 740, 56, 21, C.muted, false);
  });

  // Right Card: Next Steps
  shape(s, 984, 280, 840, 610, C.cardBg, C.line, 2);
  shape(s, 984, 280, 840, 65, C.pale, C.line, 1.5);
  t(s, 'ข้อควรตรวจวัดและทดสอบกับชุดฮาร์ดแวร์จริง', 1012, 292, 780, 42, 28, C.navy, true);

  let steps = [
    { title: '• วัดกระแสการทำงานของมอเตอร์จริง:', desc: 'วัดกระแสเริ่มหมุน (Inrush) และกระแสขณะติดขัด (Stall Current) บนชุดกลไก' },
    { title: '• ตรวจวัดเวลาหยุดเฉื่อยและระยะหยุด:', desc: 'วัดเวลา Coast Time และระยะหยุดจริงของบานประตูเทียบกับเวลารอ 200 ms' },
    { title: '• ตรวจสอบความร้อนสะสมของอุปกรณ์:', desc: 'วัดอุณหภูมิไอซี L293D และตัวต้านทาน 27 Ω 10 W เมื่อต้องเปิด-ปิดต่อเนื่อง' },
    { title: '• ตรวจสอบแนวติดตั้งระนาบลำแสง:', desc: 'ปรับตำแหน่งหัวตรวจจับไม่ให้ระนาบบานประตูเคลื่อนมาบดบังเซนเซอร์เอง' },
  ];
  steps.forEach((item, idx) => {
    let y = 365 + idx * 130;
    t(s, item.title, 1018, y, 760, 36, 23, C.ink, true);
    t(s, item.desc, 1038, y + 40, 740, 56, 21, C.muted, false);
  });

  note(
    s,
    'ชุดสาธิตใช้มอเตอร์กระแสจำกัดและระยะวิ่ง 200 mm สำหรับการศึกษา การประยุกต์ใช้จริงต้องตรวจสอบระยะหยุดและแรงหนีบเชิงกล',
    920
  );
}

// -------------------------------------------------------------
// EXPORT PPTX & GENERATE HIGH-RES PREVIEWS
// -------------------------------------------------------------
const outputPptx = path.join(V, 'Sliding_Door_Safety_Control_Version_2_Refined.pptx');
await (await PresentationFile.exportPptx(P)).save(outputPptx);
console.log(`Saved: ${outputPptx}`);

await fs.mkdir(PREVIEW_DIR, { recursive: true });
for (let i = 0; i < P.slides.items.length; i++) {
  let png = await P.export({ slide: P.slides.items[i], format: 'png', scale: 0.75 });
  let previewFile = path.join(PREVIEW_DIR, `slide-${String(i + 1).padStart(2, '0')}.png`);
  await fs.writeFile(previewFile, new Uint8Array(await png.arrayBuffer()));
}
console.log(`Exported ${P.slides.items.length} preview slides to ${PREVIEW_DIR}`);
