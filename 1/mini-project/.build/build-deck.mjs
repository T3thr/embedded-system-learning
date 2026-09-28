import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, PresentationFile } from "@oai/artifact-tool";

const REF = "/Users/3rapat/.codex/skills/artifact-template-academic-engineering-project-presentation/assets/reference.pptx";
const TMP_DIR = "/Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/mini-project/.build";

const THAI = "Sukhumvit Set";
const MONO = "Menlo";
const HEAD = "Muli Ultra-Bold";
const NAVY = "#113E7A";
const DARK = "#0D2648";
const BLUE = "#175DBD";
const MID = "#3199CE";
const CYAN = "#77E8FF";
const PANEL = "#EAF6FD";
const BORDER = "#9FCDEA";
const WHITE = "#FFFFFF";

const presentation = await PresentationFile.importPptx(await FileBlob.load(REF));
const originals = presentation.slides.items.slice();

function byName(slide, name) {
  const hit = slide.shapes.items.find((s) => s.name === name);
  if (!hit) throw new Error("shape not found: " + name + " on slide");
  return hit;
}

function toPx(style) {
  const out = { ...style };
  if (out.fontSizePt !== undefined) {
    out.fontSize = Math.round((out.fontSizePt * 4) / 3);
    delete out.fontSizePt;
  }
  return out;
}

function setText(shape, value, style) {
  shape.text = value;
  shape.text.style = toPx({ autoFit: "none", wrap: "square", ...style });
  return shape;
}

function title(slide, text, size = 54) {
  const t = byName(slide, "TextBox 42");
  setText(t, text, { typeface: HEAD, fontSizePt: size, bold: true, color: NAVY, alignment: "left", verticalAlignment: "middle" });
  return t;
}

function textBox(slide, o) {
  const shape = slide.shapes.add({
    geometry: "textbox",
    name: o.name,
    position: { left: o.x, top: o.y, width: o.w, height: o.h },
    fill: o.fill ?? "none",
    line: o.line ?? { fill: "none", width: 0 },
    ...(o.radius ? { borderRadius: o.radius } : {}),
  });
  setText(shape, o.text, {
    typeface: o.font ?? THAI,
    fontSizePt: o.size ?? 22,
    bold: o.bold ?? false,
    color: o.color ?? DARK,
    alignment: o.align ?? "left",
    verticalAlignment: o.valign ?? "top",
    lineSpacing: o.lineSpacing ?? 1.06,
    insets: o.insets ?? { top: 10, right: 14, bottom: 10, left: 14 },
  });
  return shape;
}

function box(slide, o) {
  const shape = slide.shapes.add({
    geometry: o.geometry ?? "rect",
    name: o.name,
    position: { left: o.x, top: o.y, width: o.w, height: o.h },
    fill: o.fill ?? PANEL,
    line: o.line ?? { style: "solid", fill: BORDER, width: 2 },
    ...(o.radius !== undefined ? { borderRadius: o.radius } : {}),
  });
  if (o.text !== undefined) {
    setText(shape, o.text, {
      typeface: o.font ?? THAI,
      fontSizePt: o.size ?? 21,
      bold: o.bold ?? false,
      color: o.color ?? DARK,
      alignment: o.align ?? "center",
      verticalAlignment: o.valign ?? "middle",
      lineSpacing: o.lineSpacing ?? 1.04,
      insets: o.insets ?? { top: 8, right: 10, bottom: 8, left: 10 },
    });
  }
  return shape;
}

function link(slide, from, to, o = {}) {
  const c = slide.shapes.connect(from, to, {
    kind: o.kind ?? "elbow",
    ...(o.fromSide ? { fromSide: o.fromSide } : {}),
    ...(o.toSide ? { toSide: o.toSide } : {}),
    line: { style: o.dashed ? "dashed" : "solid", fill: o.color ?? MID, width: o.width ?? 3 },
    tail: { type: "triangle", width: "med", length: "med" },
  });
  return c;
}

function label(slide, o) {
  return textBox(slide, {
    name: o.name,
    x: o.x, y: o.y, w: o.w, h: o.h ?? 56,
    text: o.text,
    size: o.size ?? 16,
    color: o.color ?? BLUE,
    align: o.align ?? "center",
    valign: "middle",
    lineSpacing: 1.0,
    insets: { top: 2, right: 4, bottom: 2, left: 4 },
  });
}

function styleTable(table, o) {
  table.borders.assign({ style: "solid", fill: BORDER, width: 1 });
  const cols = o.cols;
  const rows = o.rows;
  for (let c = 0; c < cols; c += 1) {
    const cell = table.getCell(0, c);
    cell.fill = NAVY;
    cell.text.style = toPx({
      typeface: o.headFont ?? THAI, fontSizePt: o.headSize ?? 19, bold: true, color: WHITE,
      alignment: "center", verticalAlignment: "middle", autoFit: "none",
      insets: { top: 6, right: 8, bottom: 6, left: 8 },
    });
  }
  for (let r = 1; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const cell = table.getCell(r, c);
      cell.fill = r % 2 === 1 ? WHITE : PANEL;
      cell.text.style = toPx({
        typeface: o.bodyFonts && o.bodyFonts[c] ? o.bodyFonts[c] : THAI,
        fontSizePt: o.bodySize ?? 18,
        color: DARK,
        alignment: o.aligns ? o.aligns[c] : "center",
        verticalAlignment: "middle",
        autoFit: "none",
        insets: { top: 5, right: 8, bottom: 5, left: 8 },
      });
    }
  }
}

function notes(slide, text) {
  slide.speakerNotes.textFrame.setText(text);
}

function place(shape, o) {
  shape.position = { left: o.x, top: o.y, width: o.w, height: o.h };
  return shape;
}

const built = [];
const dup = (i) => {
  const slide = originals[i].duplicate();
  built.push(slide);
  return slide;
};

// ---------------------------------------------------------------- slide 1
{
  const s = dup(0);
  const t = byName(s, "TextBox 48");
  place(t, { x: 120, y: 330, w: 1680, h: 190 });
  setText(t, "SLIDING DOOR SAFETY CONTROL", {
    typeface: HEAD, fontSizePt: 46, bold: true, color: NAVY,
    alignment: "center", verticalAlignment: "middle", autoFit: "none",
  });
  const sub = byName(s, "TextBox 49");
  place(sub, { x: 600, y: 615, w: 720, h: 56 });
  setText(sub, "ระบบตรวจจับสิ่งกีดขวางและเปิดกลับ", {
    typeface: THAI, fontSizePt: 24, color: BLUE,
    alignment: "center", verticalAlignment: "middle", autoFit: "none",
  });
  textBox(s, {
    name: "metadata", x: 360, y: 730, w: 1200, h: 230, align: "center", size: 21, lineSpacing: 1.3,
    text: [
      "รายวิชา Embedded Systems (8051 และ EdSim51) กลุ่มที่ 1",
      "66362416 นายธีรภัทร ภู่ระย้า ลำดับที่ 4",
      "66363116 นางสาวปราณปรียา ศรียอง ลำดับที่ 7",
      "อาจารย์ที่ปรึกษา ดร.แสงชัย มังกรทอง",
    ],
  });
  notes(s, "SLIDE 1. Mini-project ตามโจทย์ Lab 2 หน้า 14 ที่ให้แสดงปัญหาของประตูเลื่อนและออกแบบ state machine ใหม่ โดยไม่ซ้ำกับกลุ่มตัวอย่างที่ใช้ระบบรหัสผ่าน");
}

// ---------------------------------------------------------------- slide 2
{
  const s = dup(3);
  const t = title(s, "Summary and Objectives");
  place(t, { x: 208, y: 96, w: 1503, h: 151 });
  textBox(s, {
    name: "summary", x: 208, y: 258, w: 1520, h: 92, size: 21, color: BLUE,
    text: "ประตูต้นแบบตัดสินใจปิดจากตัวนับเวลาเพียงอย่างเดียว ระบบที่เสนอเพิ่มลำแสงตรวจจับสองระดับ สถานะรอก่อนกลับทิศ และสถานะขัดข้องที่ต้องรีเซ็ตด้วยมือ",
  });
  const items = [
    ["TextBox 44", "TextBox 43", 380, "ออกแบบ FSM 8 สถานะพร้อมลำดับความสำคัญของเงื่อนไข ให้ชุดสัญญาณเดิมให้ผลลัพธ์เดิมเสมอ"],
    ["TextBox 46", "TextBox 45", 570, "กำหนดค่าตรรกะบนพอร์ต P0 P1 และ P2 ครบทุกสถานะ และบังคับให้หยุดจ่ายแรงขับอย่างน้อย 200 ms ก่อนกลับทิศ"],
    ["TextBox 48", "TextBox 47", 760, "เขียนโปรแกรมภาษาแอสเซมบลีที่ประกอบและทดสอบได้จริงด้วย assembler และ CPU ของ EdSim51"],
  ];
  for (const [numName, bodyName, y, text] of items) {
    const num = byName(s, numName);
    place(num, { x: 202, y: y + 8, w: 177, h: 124 });
    const body = byName(s, bodyName);
    place(body, { x: 408, y, w: 1320, h: 150 });
    setText(body, text, {
      typeface: THAI, fontSizePt: 23, color: DARK, alignment: "left",
      verticalAlignment: "middle", lineSpacing: 1.1, autoFit: "none",
    });
  }
  notes(s, "SLIDE 2. วัตถุประสงค์ทั้งสามข้อวัดผลได้จากเอกสารออกแบบ ตาราง state และผลการประกอบโปรแกรมด้วย EdSim51");
}

// ---------------------------------------------------------------- slide 3
{
  const s = dup(5);
  const t = title(s, "Problem and Scenario");
  place(t, { x: 208, y: 96, w: 1503, h: 151 });
  const h1 = byName(s, "TextBox 44");
  place(h1, { x: 197, y: 268, w: 741, h: 70 });
  setText(h1, "ระบบเดิม (As-Is)", { typeface: THAI, fontSizePt: 29, bold: true, color: BLUE, alignment: "left", verticalAlignment: "middle", autoFit: "none" });
  const b1 = byName(s, "TextBox 43");
  place(b1, { x: 197, y: 356, w: 706, h: 360 });
  setText(b1, [
    "ตัวนับเวลาเพียงอย่างเดียวเป็นตัวสั่งปิด ระบบไม่ทราบว่ามีคนหรือสัตว์เลี้ยงอยู่ในช่องทางผ่าน",
    "ผู้สูงอายุที่เดินช้ากว่าเวลาที่ตั้งไว้จึงพบบานประตูเคลื่อนเข้าหา",
    "เมื่อบานชนสิ่งกีดขวาง ระบบไม่มีสถานะกู้คืน และไม่มีเงื่อนไขตรวจสอบก่อนปิดรอบใหม่",
  ], { typeface: THAI, fontSizePt: 22, color: DARK, alignment: "left", verticalAlignment: "top", lineSpacing: 1.22, autoFit: "none" });
  const h2 = byName(s, "TextBox 46");
  place(h2, { x: 1005, y: 268, w: 741, h: 70 });
  setText(h2, "ระบบที่เสนอ (To-Be)", { typeface: THAI, fontSizePt: 29, bold: true, color: BLUE, alignment: "left", verticalAlignment: "middle", autoFit: "none" });
  const b2 = byName(s, "TextBox 45");
  place(b2, { x: 1005, y: 356, w: 722, h: 360 });
  setText(b2, [
    "ลำแสง through-beam สองระดับเฝ้าช่องทางผ่านตลอดเวลา",
    "ขณะปิด ถ้าลำแสงถูกบังหรือมีการกดปุ่ม ระบบตัดแรงขับมอเตอร์ทันทีแล้วเข้าสถานะรอ",
    "หลังหยุดอย่างน้อย 200 ms ประตูเปิดกลับจนถึงลิมิตเปิด",
    "ปิดรอบใหม่เมื่อทางผ่านว่างและปุ่มถูกปล่อยต่อเนื่อง 3 วินาที",
  ], { typeface: THAI, fontSizePt: 22, color: DARK, alignment: "left", verticalAlignment: "top", lineSpacing: 1.22, autoFit: "none" });
  const steps = [
    ["01", "ผู้ใช้กดปุ่มเปิด"],
    ["02", "ผู้ใช้ยังอยู่ในช่องทางผ่าน"],
    ["03", "ลำแสงถูกบังขณะประตูปิด"],
    ["04", "หยุดจ่ายแรงขับแล้วเปิดกลับ"],
  ];
  steps.forEach(([n, caption], i) => {
    const x = 197 + i * 390;
    box(s, { name: "step-" + n, x, y: 782, w: 356, h: 132, fill: PANEL, radius: 8, text: "" });
    textBox(s, { name: "step-n-" + n, x: x + 18, y: 796, w: 90, h: 50, text: n, size: 24, bold: true, color: MID, align: "left" });
    textBox(s, { name: "step-t-" + n, x: x + 18, y: 838, w: 320, h: 66, text: caption, size: 20, color: DARK, align: "left" });
  });
  notes(s, "SLIDE 3. ลำดับ 01 ถึง 04 คือ storyboard ของสถานการณ์เดียวกันบนระบบใหม่ ตัวเลขเวลาอ้างอิงจากเอกสารออกแบบ");
}
function clearBody(slide, names) {
  for (const n of names) {
    const hit = slide.shapes.items.find((s) => s.name === n);
    if (hit) hit.delete();
  }
  for (const img of slide.images.items.slice()) {
    try { img.delete(); } catch (err) { void err; }
  }
}

function node(slide, o) {
  return box(slide, {
    name: o.name, x: o.x, y: o.y, w: 200, h: 78, radius: 10,
    fill: o.fill ?? WHITE,
    line: { style: "solid", fill: o.stroke ?? MID, width: 3 },
    text: o.name, size: 21, bold: true, color: o.color ?? NAVY, font: MONO,
  });
}

// ---------------------------------------------------------------- slide 4
{
  const s = dup(1);
  const t = title(s, "System Architecture and FSM");
  place(t, { x: 208, y: 96, w: 1503, h: 151 });
  clearBody(s, ["TextBox 43", "TextBox 44"]);
  const n = {};
  n.START = node(s, { name: "START", x: 100, y: 380 });
  n.FAULT = node(s, { name: "FAULT", x: 100, y: 640, fill: DARK, stroke: DARK, color: WHITE });
  n.CLOSED = node(s, { name: "CLOSED", x: 450, y: 380 });
  n.OPENING = node(s, { name: "OPENING", x: 1200, y: 380, fill: BLUE, stroke: BLUE, color: WHITE });
  n.HOLD = node(s, { name: "HOLD", x: 1200, y: 620 });
  n.CLOSING = node(s, { name: "CLOSING", x: 450, y: 620, fill: BLUE, stroke: BLUE, color: WHITE });
  n.REV_WAIT = node(s, { name: "REV_WAIT", x: 640, y: 850, fill: CYAN, stroke: MID });
  n.REOPEN = node(s, { name: "REOPEN", x: 1060, y: 850, fill: BLUE, stroke: BLUE, color: WHITE });
  link(s, n.START, n.CLOSED, { fromSide: "right", toSide: "left" });
  link(s, n.CLOSED, n.OPENING, { fromSide: "right", toSide: "left" });
  link(s, n.OPENING, n.HOLD, { fromSide: "bottom", toSide: "top" });
  link(s, n.HOLD, n.CLOSING, { fromSide: "left", toSide: "right" });
  link(s, n.CLOSING, n.CLOSED, { fromSide: "top", toSide: "bottom" });
  link(s, n.CLOSING, n.REV_WAIT, { fromSide: "bottom", toSide: "left" });
  link(s, n.REV_WAIT, n.REOPEN, { fromSide: "right", toSide: "left" });
  link(s, n.REOPEN, n.HOLD, { fromSide: "right", toSide: "bottom" });
  link(s, n.FAULT, n.START, { fromSide: "top", toSide: "bottom" });
  link(s, n.CLOSING, n.FAULT, { fromSide: "left", toSide: "right", dashed: true, color: DARK });
  const labels = [
    ["l1", 268, 322, 220, "LC ต่อเนื่อง 20 ms"],
    ["l2", 700, 300, 520, "กดปุ่มต่อเนื่อง 20 ms และหยุดครบ 200 ms"],
    ["l3", 1390, 470, 300, "ถึงลิมิตเปิด LO"],
    ["l4", 800, 540, 400, "ทางผ่านว่างต่อเนื่อง 3 s"],
    ["l5", 570, 500, 260, "ถึงลิมิตปิด LC"],
    ["l6", 410, 762, 300, "ลำแสงถูกบังหรือมีการกดปุ่ม"],
    ["l7", 850, 800, 200, "หยุดครบ 200 ms"],
    ["l8", 1290, 790, 260, "ถึงลิมิตเปิด LO"],
    ["l9", 40, 500, 300, "รีเซ็ตที่ผ่านเงื่อนไขปลอดภัย"],
  ];
  for (const [name, x, y, w, text] of labels) {
    const l = label(s, { name, x, y, w, text });
    l.fill = "#F8FCFE";
    l.bringToFront();
  }
  const dl = textBox(s, {
    name: "fault-note", x: 40, y: 748, w: 340, h: 120, size: 15, color: DARK, align: "center",
    text: "จากทุกสถานะเมื่อกดหยุดฉุกเฉิน เดินทางเกิน 5 s หรือหลุดจากลิมิตที่ควรอยู่",
    fill: "#F8FCFE",
  });
  dl.bringToFront();
  box(s, {
    name: "legend", x: 100, y: 952, w: 1720, h: 112, fill: PANEL, radius: 8, size: 17,
    align: "left", valign: "middle", lineSpacing: 1.12,
    text: [
      "LO และ LC คือลิมิตเปิดและลิมิตปิด ระดับ 0 เมื่อถึงตำแหน่ง ลำแสงให้ระดับ 1 เมื่อถูกบังหรือไฟเซนเซอร์หาย ปุ่มให้ระดับ 0 เมื่อกด",
      "ลำดับตรวจสอบขณะปิด คือ หยุดฉุกเฉิน ก่อนสิ่งกีดขวางและการกดปุ่ม ก่อนการถึงลิมิตปิด ส่วนลิมิตขัดแย้งตรวจตอนเริ่มระบบ และ START ไปสถานะ HOLD เมื่อบูตที่ลิมิตเปิด",
      "กล่องสีน้ำเงินคือสถานะที่จ่ายแรงขับมอเตอร์ สีฟ้าคือรอก่อนกลับทิศ สีขาวคือหยุดนิ่ง",
    ],
  });
  notes(s, "SLIDE 4. FSM มี 8 สถานะ เงื่อนไขทุกเส้นมาจากเอกสาร PROPOSED_SOLUTION_DESIGN.md หัวข้อ 5 และตรงกับโปรแกรมใน firmware/SLIDING_DOOR.asm");
}

// ---------------------------------------------------------------- slide 5
{
  const s = dup(6);
  const t = title(s, "State Description");
  place(t, { x: 208, y: 96, w: 1503, h: 151 });
  clearBody(s, ["TextBox 43"]);
  const values = [
    ["สถานะ", "P0", "P1", "IN1", "IN2", "RUN_N", "RED_N", "GREEN_N", "BUZZ_N"],
    ["START ตรวจตำแหน่ง", "F8H", "ECH", "0", "0", "1", "0", "1", "1"],
    ["CLOSED ปิดสนิท", "F9H", "FCH", "0", "0", "1", "1", "1", "1"],
    ["OPENING กำลังเปิด", "FAH", "D9H", "1", "0", "0", "1", "0", "1"],
    ["HOLD เปิดค้าง", "FBH", "DCH", "0", "0", "1", "1", "0", "1"],
    ["CLOSING กำลังปิด", "FCH", "6AH", "0", "1", "0", "0", "1", "0"],
    ["REV_WAIT รอกลับทิศ", "FDH", "6CH", "0", "0", "1", "0", "1", "0"],
    ["REOPEN เปิดกลับ", "FEH", "69H", "1", "0", "0", "0", "1", "0"],
    ["FAULT ขัดข้อง", "FFH", "6CH", "0", "0", "1", "0", "1", "0"],
  ];
  const table = s.tables.add({
    rows: 9, columns: 9, left: 110, top: 300, width: 1700, height: 614, values,
    columnWidths: [340, 150, 150, 135, 135, 180, 180, 230, 200],
  });
  styleTable(table, {
    cols: 9, rows: 9, bodySize: 18, headSize: 18,
    aligns: ["left", "center", "center", "center", "center", "center", "center", "center", "center"],
    bodyFonts: [THAI, MONO, MONO, MONO, MONO, MONO, MONO, MONO, MONO],
  });
  textBox(s, {
    name: "table-note", x: 110, y: 930, w: 1700, h: 124, size: 17, color: DARK, lineSpacing: 1.16,
    text: [
      "ค่าในตารางคือระดับตรรกะที่ขาพอร์ต ไม่ใช่สถานะเปิดปิดของอุปกรณ์ สัญญาณที่ลงท้ายด้วย _N ทำงานที่ระดับ 0 และ P1.3 กับ P1.6 คงระดับ 1 เสมอ",
      "อินพุตอ่านจาก P2 ซึ่งเขียนค่า latch FFH ครั้งเดียว ประกอบด้วย .0 ปุ่มภายใน .1 ปุ่มภายนอก .2 ลำแสงล่าง .3 ลิมิตเปิด .4 ลิมิตปิด .5 ลำแสงบน .6 รีเซ็ต .7 โซ่หยุดฉุกเฉิน",
      "RUN_N ระดับ 1 ปิดการทำงานของ L293D ผ่านวงจรกลับเฟสภายนอก จึงหยุดจ่ายแรงขับทั้งขณะรีเซ็ตไมโครคอนโทรลเลอร์และในสถานะขัดข้อง",
    ],
  });
  notes(s, "SLIDE 5. ค่า P1 ทุกไบต์ตรวจซ้ำกับตารางในโปรแกรมและกับผลการรันบน CPU ของ EdSim51");
}
// ---------------------------------------------------------------- slide 6
{
  const s = dup(1);
  const t = title(s, "Hardware Interface");
  place(t, { x: 208, y: 96, w: 1503, h: 151 });
  clearBody(s, ["TextBox 43", "TextBox 44"]);
  const inputs = [
    ["ปุ่มเปิดภายใน P2.0 และภายนอก P2.1", 300],
    ["ลิมิตเปิด LO P2.3 และลิมิตปิด LC P2.4", 392],
    ["ลำแสงล่าง P2.2 และลำแสงบน P2.5", 484],
    ["หยุดฉุกเฉิน P2.7 และรีเซ็ต P2.6", 576],
  ];
  const mcu = box(s, {
    name: "mcu", x: 740, y: 330, w: 330, h: 240, radius: 10, fill: PANEL,
    line: { style: "solid", fill: NAVY, width: 4 },
    text: ["8051", "12.000 MHz"], size: 26, bold: true, color: NAVY, font: MONO, lineSpacing: 1.2,
  });
  const inputShapes = inputs.map(([text, y], i) => box(s, {
    name: "in-" + i, x: 130, y, w: 470, h: 76, radius: 8, size: 18, align: "left", text,
    insets: { top: 6, right: 12, bottom: 6, left: 16 },
  }));
  for (const shape of inputShapes) link(s, shape, mcu, { fromSide: "right", toSide: "left", width: 2 });
  const hct = box(s, { name: "hct", x: 1180, y: 450, w: 280, h: 96, radius: 8, size: 19, font: MONO, text: "SN74HCT14" });
  const drv = box(s, { name: "drv", x: 740, y: 660, w: 330, h: 110, radius: 8, size: 21, font: MONO, bold: true, text: "L293D" });
  const mot = box(s, { name: "mot", x: 1520, y: 650, w: 300, h: 130, radius: 8, size: 18, text: ["มอเตอร์เกียร์ 12 V", "และตัวต้านทาน 27 Ω"] });
  const ind = box(s, { name: "ind", x: 1520, y: 300, w: 300, h: 130, radius: 8, size: 18, text: ["LED แดง P1.4 เขียว P1.5", "บัซเซอร์ P1.7"] });
  link(s, mcu, drv, { fromSide: "bottom", toSide: "top" });
  link(s, mcu, hct, { fromSide: "right", toSide: "left", width: 2 });
  link(s, hct, drv, { fromSide: "bottom", toSide: "right" });
  link(s, drv, mot, { fromSide: "right", toSide: "left" });
  link(s, mcu, ind, { fromSide: "right", toSide: "left", width: 2 });
  const hwLabels = [
    ["h1", 640, 596, 300, "IN1 P1.0 และ IN2 P1.1"],
    ["h2", 1090, 400, 210, "RUN_N P1.2"],
    ["h3", 1140, 596, 200, "EN ของ L293D"],
    ["h4", 1130, 690, 260, "กระแสจำกัด 0.50 A"],
  ];
  for (const [name, x, y, w, text] of hwLabels) {
    const l = label(s, { name, x, y, w, text, size: 16 });
    l.fill = "#F8FCFE";
    l.bringToFront();
  }
  const values = [
    ["อุปกรณ์", "รุ่นอ้างอิง", "ประเด็นที่ต้องตรวจก่อนใช้งาน"],
    ["ไมโครคอนโทรลเลอร์", "8051 แบบ 12 clock, คริสตัล 12.000 MHz", "เขียน P2 เป็น FFH ก่อนอ่านอินพุตทุกครั้ง"],
    ["ไดรเวอร์มอเตอร์", "L293D จ่ายได้ 600 mA ต่อช่อง", "EN มาจากการกลับเฟส RUN_N ด้วย SN74HCT14"],
    ["มอเตอร์", "เกียร์ DC 12 V กับตัวต้านทาน 27 Ω 10 W", "วัดกระแสจริงให้ไม่เกิน 0.50 A ก่อนต่อบานประตู"],
    ["เซนเซอร์ลำแสง", "E3Z-T61 แบบ NPN ร่วมกับ VO617A", "แปลงระดับ 12 V เป็น 5 V ห้ามต่อเข้าขาโดยตรง"],
  ];
  const table = s.tables.add({
    rows: 5, columns: 3, left: 110, top: 810, width: 1700, height: 250, values,
    columnWidths: [380, 620, 700],
  });
  styleTable(table, { cols: 3, rows: 5, bodySize: 17, headSize: 18, aligns: ["left", "left", "left"] });
  notes(s, "SLIDE 6. แผนภาพนี้เป็นการเชื่อมต่อเชิงตรรกะ รายละเอียดขาและค่าอุปกรณ์อยู่ในเอกสารออกแบบหัวข้อ 4");
}

// ---------------------------------------------------------------- slide 7
{
  const s = dup(6);
  const t = title(s, "Power and Delay Budget");
  place(t, { x: 208, y: 96, w: 1503, h: 151 });
  clearBody(s, ["TextBox 43"]);
  const left = s.tables.add({
    rows: 8, columns: 2, left: 110, top: 288, width: 880, height: 512,
    columnWidths: [570, 310],
    values: [
      ["จุดจ่ายไฟ", "แรงดันที่ใช้"],
      ["8051 และ SN74HCT14", "5 V DC"],
      ["L293D ขา VCC1 ฝั่งลอจิก", "5 V DC"],
      ["L293D ขา VCC2 ฝั่งกำลัง", "12 V DC"],
      ["มอเตอร์เกียร์ DC กับตัวต้านทาน 27 Ω", "12 V DC"],
      ["เซนเซอร์ลำแสง E3Z-T61", "12 V DC"],
      ["LED บัซเซอร์ และฝั่งออกของออปโตคัปเปลอร์", "5 V DC"],
      ["สัญญาณทุกเส้นที่เข้าขา 8051", "0 ถึง 5 V"],
    ],
  });
  styleTable(left, { cols: 2, rows: 8, bodySize: 18, aligns: ["left", "center"], bodyFonts: [THAI, MONO] });
  const right = s.tables.add({
    rows: 8, columns: 3, left: 1030, top: 288, width: 780, height: 512,
    columnWidths: [420, 170, 190],
    values: [
      ["ค่าหน่วงเวลา", "R1", "เวลารวม"],
      ["ซับรูทีน Delay หนึ่งครั้ง", "-", "20 ms"],
      ["กันสัญญาณกระเพื่อมของปุ่ม", "1", "20 ms"],
      ["ตรวจตำแหน่งตอนเริ่มระบบ", "1", "20 ms"],
      ["หยุดนิ่งก่อนรับคำสั่งใหม่", "10", "200 ms"],
      ["หยุดนิ่งก่อนกลับทิศ", "10", "200 ms"],
      ["ทางผ่านว่างก่อนเริ่มปิด", "150", "3.00 s"],
      ["เวลาสูงสุดของการเดินทาง", "250", "5.00 s"],
    ],
  });
  styleTable(right, { cols: 3, rows: 8, bodySize: 18, aligns: ["left", "center", "center"], bodyFonts: [THAI, MONO, MONO] });
  box(s, {
    name: "budget-note", x: 110, y: 830, w: 1700, h: 230, fill: PANEL, radius: 8, size: 19,
    align: "left", valign: "middle", lineSpacing: 1.22,
    insets: { top: 18, right: 24, bottom: 18, left: 24 },
    text: [
      "ซับรูทีน Delay ใช้ Timer 0 โหมด 1 ค่าเริ่มนับ B1E0H ซึ่งเท่ากับ 65536 ลบ 20000 ที่คริสตัล 12.000 MHz ให้ 1 machine cycle เท่ากับ 1 µs จึงได้ 20 ms ต่อหนึ่งครั้ง",
      "สถานะที่เคลื่อนที่เรียก Delay อยู่ภายในลูป จึงอ่านลำแสงและปุ่มซ้ำทุก 20 ms เวลาตัดแรงขับหลังพบสิ่งกีดขวางจึงไม่เกิน 20 ms บวกเวลาประมวลผลไม่กี่ไมโครวินาที",
      "มอเตอร์ 12 V ต้องจำกัดกระแสไม่เกิน 0.50 A เพราะ L293D จ่ายได้ 600 mA ต่อช่อง ตัวต้านทาน 27 Ω ขนาด 10 W ทำหน้าที่นี้ และต้องวัดกระแสจริงก่อนต่อบานประตู",
    ],
  });
  notes(s, "SLIDE 7. ตอบคำถามเรื่องแรงดันและค่าหน่วงเวลาโดยตรง ค่าทุกค่าตรงกับไฟล์ firmware/SLIDING_DOOR_CLASSROOM.asm");
}

// ------------------------------------------------- slides 8 to 15: code per state
function stateChain(slide, labels, current) {
  const x = 110, w = 400, h = 78, gap = 116;
  const boxes = labels.map((text, i) => box(slide, {
    name: "chain-" + i, x, y: 296 + i * gap, w, h, radius: 10,
    fill: i === current ? BLUE : WHITE,
    line: { style: "solid", fill: i === current ? BLUE : MID, width: 3 },
    text, size: i === current ? 22 : 18, bold: i === current,
    color: i === current ? WHITE : NAVY, font: i === current ? MONO : THAI,
  }));
  for (let i = 1; i < boxes.length; i += 1) {
    link(slide, boxes[i - 1], boxes[i], { fromSide: "bottom", toSide: "top", width: 3 });
  }
  return 296 + labels.length * gap;
}

function codeSlide(spec) {
  const s = dup(spec.base);
  const t = title(s, spec.title);
  place(t, { x: 208, y: 96, w: 1503, h: 151 });
  clearBody(s, spec.base === 1 ? ["TextBox 43", "TextBox 44"] : ["TextBox 43"]);
  const infoTop = stateChain(s, spec.chain, 1);
  box(s, {
    name: "info", x: 110, y: infoTop + 16, w: 400, h: 1040 - (infoTop + 16), fill: PANEL, radius: 8,
    text: spec.info, size: 17, align: "left", valign: "middle", lineSpacing: 1.34,
    insets: { top: 16, right: 16, bottom: 16, left: 20 },
  });
  box(s, {
    name: "code", x: 556, y: 262, w: 1254, h: 796, radius: 8, fill: "#F2F8FD",
    line: { style: "solid", fill: BORDER, width: 2 }, text: "",
  });
  textBox(s, {
    name: "code-text", x: 574, y: 276, w: 1220, h: 768, font: MONO, size: spec.size ?? 17,
    color: DARK, lineSpacing: 1.0, insets: { top: 10, right: 10, bottom: 10, left: 12 },
    text: spec.lines,
  });
  notes(s, spec.note);
}

const CODE_SLIDES = [
  {
    base: 1, title: "Startup Sequence",
    chain: ["เปิดเครื่อง", "START", "ไปยัง CLOSED หรือ HOLD"],
    info: ["P0 = F8H", "P1 = ECH", "ไฟแดงติด", "มอเตอร์หยุด", "Delay 20 ms", "ตรวจ LO และ LC"],
    note: "SLIDE 8. START ตรวจตำแหน่งก่อนเสมอ ถ้าไม่พบปลายทางที่ชัดเจนจะเข้าสถานะขัดข้องแทนการเคลื่อนที่เอง",
    lines: [
      "START:",
      "    MOV  P2,#0FFH          ; P2 เป็นอินพุตทั้งพอร์ต",
      "    SETB P1.2              ; ตัดแรงขับมอเตอร์",
      "    MOV  P1,#0ECH          ; ไฟแดงติด รอตรวจตำแหน่ง",
      "    MOV  P0,#0F8H",
      "    MOV  R0,#00H           ; R0 = 0 = Start",
      "    MOV  TMOD,#01H         ; Timer 0 โหมด 1 ขนาด 16 บิต",
      "    CALL Delay             ; รอ 20 ms ให้สัญญาณนิ่ง",
      "    JB   P2.7,StartFault   ; หยุดฉุกเฉิน",
      "    JNB  P2.3,StartOpen    ; อยู่ที่ลิมิตเปิด",
      "    JNB  P2.4,StartClosed  ; อยู่ที่ลิมิตปิด",
      "StartFault:",
      "    LJMP FaultState        ; ไม่ทราบตำแหน่ง จึงไม่เคลื่อนที่เอง",
      "StartOpen:",
      "    JNB  P2.4,StartFault   ; ลิมิตสองตัวพร้อมกันคือขัดแย้ง",
      "    LJMP HoldState",
      "StartClosed:",
      "    LJMP ClosedState",
    ],
  },
  {
    base: 6, title: "Subroutine: Delay 20 ms",
    chain: ["ทุกสถานะที่ต้องหน่วงเวลา", "Delay", "กลับไปทำงานต่อ"],
    info: ["Timer 0 โหมด 1", "ค่าเริ่มนับ B1E0H", "65536 ลบ 20000", "1 cycle = 1 µs", "ได้ 20 ms ต่อครั้ง", "R1 คือจำนวนครั้ง"],
    note: "SLIDE 9. Delay คือฐานเวลาเดียวของทั้งโปรแกรม ค่าเวลาอื่นเกิดจากการเรียกซ้ำตามจำนวนใน R1",
    lines: [
      "Delay:                     ; หน่วง 20 ms ด้วย Timer 0",
      "    CLR  TR0               ; หยุดตัวนับก่อนตั้งค่า",
      "    MOV  TH0,#0B1H         ; ไบต์สูงของ B1E0H",
      "    MOV  TL0,#0E0H         ; ไบต์ต่ำของ B1E0H",
      "    CLR  TF0               ; ล้างธงล้น",
      "    SETB TR0               ; เริ่มนับ",
      "DelayWait:",
      "    JNB  TF0,DelayWait     ; รอจนตัวนับล้น",
      "    CLR  TR0",
      "    CLR  TF0",
      "    RET",
      "",
      "; ตัวอย่างการใช้งานในสถานะที่ต้องรอ",
      "    MOV  R1,#150           ; 150 x 20 ms = 3.00 s",
      "HoldLoop:",
      "    CALL Delay",
      "    DJNZ R1,HoldLoop",
    ],
  },
  {
    base: 6, title: "State 1: Closed",
    chain: ["START", "CLOSED", "OPENING"],
    info: ["P0 = F9H", "P1 = FCH", "มอเตอร์หยุด", "ไฟและเสียงดับ", "หยุดนิ่ง 200 ms", "กันกระเพื่อม 20 ms"],
    note: "SLIDE 9. ประตูปิดสนิท หยุดนิ่ง 200 ms ก่อนรับคำสั่ง แล้วยืนยันการกดปุ่มอีก 20 ms",
    lines: [
      "ClosedState:",
      "    SETB P1.2              ; มอเตอร์หยุด",
      "    MOV  R0,#01H           ; R0 = 1 = Closed",
      "    MOV  P0,#0F9H",
      "    MOV  P1,#0FCH          ; ไฟและเสียงเตือนดับ",
      "    MOV  R1,#10            ; 10 x 20 ms = 200 ms",
      "ClosedSettle:",
      "    CALL Delay",
      "    DJNZ R1,ClosedSettle",
      "ClosedLoop:",
      "    JB   P2.7,ClosedFault  ; หยุดฉุกเฉิน",
      "    JB   P2.4,ClosedFault  ; ลิมิตปิดหลุด",
      "    JNB  P2.0,ClosedPress  ; ปุ่มภายใน",
      "    JNB  P2.1,ClosedPress  ; ปุ่มภายนอก",
      "    SJMP ClosedLoop",
      "ClosedPress:",
      "    CALL Delay             ; 20 ms กันสัญญาณกระเพื่อม",
      "    JNB  P2.0,ClosedGo",
      "    JNB  P2.1,ClosedGo",
      "    SJMP ClosedLoop",
      "ClosedGo:",
      "    LJMP OpeningState",
      "ClosedFault:",
      "    LJMP FaultState",
    ],
  },
  {
    base: 1, title: "State 2: Opening",
    chain: ["CLOSED", "OPENING", "HOLD"],
    info: ["P0 = FAH", "P1 = D9H", "มอเตอร์เปิด", "ไฟเขียวติด", "รอลิมิตเปิด LO", "เวลาสูงสุด 5.00 s"],
    note: "SLIDE 10. ตั้งทิศทางขณะยังตัดแรงขับ แล้วจึงจ่ายแรงขับ ลูปนับ 250 รอบเท่ากับ 5 s",
    lines: [
      "OpeningState:",
      "    SETB P1.2              ; ตัดแรงขับก่อนตั้งทิศทาง",
      "    MOV  R0,#02H           ; R0 = 2 = Opening",
      "    MOV  P0,#0FAH",
      "    MOV  P1,#0DDH          ; ตั้งทิศทางเปิดขณะยังตัดแรงขับ",
      "    MOV  P1,#0D9H          ; จ่ายแรงขับ ไฟเขียวติด",
      "    MOV  R1,#250           ; 250 x 20 ms = 5 s เวลาสูงสุด",
      "OpeningLoop:",
      "    JB   P2.7,OpeningFault ; หยุดฉุกเฉิน",
      "    JNB  P2.3,OpeningDone  ; ถึงลิมิตเปิด",
      "    CALL Delay",
      "    DJNZ R1,OpeningLoop",
      "OpeningFault:",
      "    LJMP FaultState        ; เดินทางเกินเวลาที่กำหนด",
      "OpeningDone:",
      "    LJMP HoldState",
    ],
  },
  {
    base: 6, title: "State 3: Hold",
    chain: ["OPENING หรือ REOPEN", "HOLD", "CLOSING"],
    info: ["P0 = FBH", "P1 = DCH", "มอเตอร์หยุด", "ไฟเขียวติด", "ต้องว่าง 3.00 s", "ถูกบังคือนับใหม่"],
    note: "SLIDE 11. ตัวนับ 150 รอบเท่ากับ 3 s และเริ่มนับใหม่ทันทีที่ลำแสงถูกบังหรือมีการกดปุ่ม",
    lines: [
      "HoldState:",
      "    SETB P1.2              ; มอเตอร์หยุด",
      "    MOV  R0,#03H           ; R0 = 3 = Hold",
      "    MOV  P0,#0FBH",
      "    MOV  P1,#0DCH          ; ไฟเขียวติด",
      "HoldRestart:",
      "    MOV  R1,#150           ; 150 x 20 ms = 3.00 s",
      "HoldLoop:",
      "    JB   P2.7,HoldFault    ; หยุดฉุกเฉิน",
      "    JB   P2.3,HoldFault    ; ลิมิตเปิดหลุด",
      "    JB   P2.2,HoldRestart  ; ลำแสงล่างถูกบัง เริ่มนับใหม่",
      "    JB   P2.5,HoldRestart  ; ลำแสงบนถูกบัง เริ่มนับใหม่",
      "    JNB  P2.0,HoldRestart  ; ยังกดปุ่มภายใน",
      "    JNB  P2.1,HoldRestart  ; ยังกดปุ่มภายนอก",
      "    CALL Delay",
      "    DJNZ R1,HoldLoop",
      "    LJMP ClosingState",
      "HoldFault:",
      "    LJMP FaultState",
    ],
  },
  {
    base: 1, title: "State 4: Closing",
    chain: ["HOLD", "CLOSING", "CLOSED หรือ REV_WAIT"],
    info: ["P0 = FCH", "P1 = 6AH", "มอเตอร์ปิด", "ไฟแดงและเสียงเตือน", "ตรวจลำแสงทุก 20 ms", "เวลาสูงสุด 5.00 s"],
    note: "SLIDE 12. ลำแสงและปุ่มถูกตรวจก่อนลิมิตปิด สิ่งกีดขวางจึงมีผลเหนือการปิดจนสุด",
    lines: [
      "ClosingState:",
      "    SETB P1.2              ; ตัดแรงขับก่อนตั้งทิศทาง",
      "    MOV  R0,#04H           ; R0 = 4 = Closing",
      "    MOV  P0,#0FCH",
      "    MOV  P1,#06EH          ; ตั้งทิศทางปิดขณะยังตัดแรงขับ",
      "    MOV  P1,#06AH          ; จ่ายแรงขับ ไฟแดงและเสียงเตือน",
      "    MOV  R1,#250           ; 250 x 20 ms = 5 s เวลาสูงสุด",
      "ClosingLoop:",
      "    JB   P2.7,ClosingFault ; หยุดฉุกเฉิน",
      "    JB   P2.2,ClosingStop  ; ลำแสงล่างถูกบัง",
      "    JB   P2.5,ClosingStop  ; ลำแสงบนถูกบัง",
      "    JNB  P2.0,ClosingStop  ; มีการกดปุ่มภายใน",
      "    JNB  P2.1,ClosingStop  ; มีการกดปุ่มภายนอก",
      "    JNB  P2.4,ClosingDone  ; ถึงลิมิตปิด",
      "    CALL Delay",
      "    DJNZ R1,ClosingLoop",
      "ClosingFault:",
      "    LJMP FaultState        ; เดินทางเกินเวลาที่กำหนด",
      "ClosingStop:",
      "    SETB P1.2              ; ตัดแรงขับทันทีที่พบสิ่งกีดขวาง",
      "    LJMP RevWaitState",
      "ClosingDone:",
      "    LJMP ClosedState",
    ],
  },
  {
    base: 6, title: "State 5: RevWait",
    chain: ["CLOSING", "REV_WAIT", "REOPEN"],
    info: ["P0 = FDH", "P1 = 6CH", "มอเตอร์หยุดสนิท", "ไฟแดงและเสียงเตือน", "รอ 200 ms", "แล้วจึงเปิดกลับ"],
    note: "SLIDE 13. สถานะนี้มีไว้ให้แกนมอเตอร์หยุดก่อนกลับทิศ ป้องกันกระแสย้อนและความเสียหายเชิงกล",
    lines: [
      "RevWaitState:",
      "    SETB P1.2              ; มอเตอร์หยุด",
      "    MOV  R0,#05H           ; R0 = 5 = RevWait",
      "    MOV  P0,#0FDH",
      "    MOV  P1,#06CH          ; ไฟแดงและเสียงเตือนทำงาน",
      "    MOV  R1,#10            ; 10 x 20 ms = 200 ms",
      "RevLoop:",
      "    JB   P2.7,RevFault     ; หยุดฉุกเฉิน",
      "    CALL Delay",
      "    DJNZ R1,RevLoop",
      "    LJMP ReopenState",
      "RevFault:",
      "    LJMP FaultState",
    ],
  },
  {
    base: 1, title: "State 6: Reopen",
    chain: ["REV_WAIT", "REOPEN", "HOLD"],
    info: ["P0 = FEH", "P1 = 69H", "มอเตอร์เปิด", "เสียงเตือนดัง", "รอลิมิตเปิด LO", "เวลาสูงสุด 5.00 s"],
    note: "SLIDE 14. เปิดกลับจนสุดพร้อมเสียงเตือน แล้วกลับเข้าสถานะเปิดค้างเพื่อเริ่มนับเวลาว่างใหม่",
    lines: [
      "ReopenState:",
      "    SETB P1.2              ; ตัดแรงขับก่อนตั้งทิศทาง",
      "    MOV  R0,#06H           ; R0 = 6 = Reopen",
      "    MOV  P0,#0FEH",
      "    MOV  P1,#06DH          ; ตั้งทิศทางเปิดขณะยังตัดแรงขับ",
      "    MOV  P1,#069H          ; เปิดกลับพร้อมเสียงเตือน",
      "    MOV  R1,#250           ; 250 x 20 ms = 5 s เวลาสูงสุด",
      "ReopenLoop:",
      "    JB   P2.7,ReopenFault  ; หยุดฉุกเฉิน",
      "    JNB  P2.3,ReopenDone   ; ถึงลิมิตเปิด",
      "    CALL Delay",
      "    DJNZ R1,ReopenLoop",
      "ReopenFault:",
      "    LJMP FaultState",
      "ReopenDone:",
      "    LJMP HoldState",
    ],
  },
  {
    base: 6, title: "State 7: Fault",
    chain: ["ทุกสถานะที่พบความผิดปกติ", "FAULT", "START"],
    info: ["P0 = FFH", "P1 = 6CH", "มอเตอร์หยุด", "ไฟแดงค้าง", "ต้องปล่อยปุ่มก่อน", "กดรีเซ็ต 20 ms"],
    note: "SLIDE 15. การกู้คืนต้องผ่านการปล่อยปุ่ม การกดค้าง 20 ms และเงื่อนไขความปลอดภัยครบก่อนเริ่มใหม่",
    lines: [
      "FaultState:",
      "    SETB P1.2              ; ตัดแรงขับจนกว่าจะรีเซ็ต",
      "    MOV  R0,#07H           ; R0 = 7 = Fault",
      "    MOV  P0,#0FFH",
      "    MOV  P1,#06CH          ; ไฟแดงค้างและเสียงเตือนค้าง",
      "FaultRelease:",
      "    JNB  P2.6,FaultRelease ; ต้องปล่อยปุ่มรีเซ็ตก่อน",
      "FaultLoop:",
      "    JNB  P2.6,FaultCheck   ; กดปุ่มรีเซ็ต",
      "    SJMP FaultLoop",
      "FaultCheck:",
      "    CALL Delay             ; 20 ms กันสัญญาณกระเพื่อม",
      "    JB   P2.6,FaultLoop    ; ปล่อยเร็วเกินไป ไม่นับ",
      "    JB   P2.7,FaultLoop    ; ยังกดหยุดฉุกเฉินอยู่",
      "    JB   P2.2,FaultLoop    ; ลำแสงล่างยังถูกบัง",
      "    JB   P2.5,FaultLoop    ; ลำแสงบนยังถูกบัง",
      "    LJMP START             ; กลับไปตรวจตำแหน่งใหม่",
    ],
  },
];

for (const spec of CODE_SLIDES) codeSlide(spec);
// ---------------------------------------------------------------- slide 9
{
  const s = dup(6);
  const t = title(s, "Verification Results");
  place(t, { x: 208, y: 96, w: 1503, h: 151 });
  clearBody(s, ["TextBox 43"]);
  const raw = JSON.parse(await fs.readFile(path.join(TMP_DIR, "results.json"), "utf8"));
  const values = [["รายการเวลาที่วัดบนตัวจำลอง", "ค่าที่ออกแบบ", "ค่าที่วัดได้"], ...raw.timingRows];
  const table = s.tables.add({
    rows: values.length, columns: 3, left: 110, top: 300, width: 1010,
    height: 66 + (values.length - 1) * 62,
    columnWidths: [430, 330, 250],
    values,
  });
  styleTable(table, {
    cols: 3, rows: values.length, bodySize: 18,
    aligns: ["left", "left", "center"], bodyFonts: [THAI, THAI, MONO],
  });
  textBox(s, {
    name: "summary", x: 110, y: 872, w: 1010, h: 190, size: 18, color: DARK, lineSpacing: 1.18,
    text: [raw.summary[1], raw.scope],
  });
  textBox(s, { name: "result-head", x: 1160, y: 296, w: 660, h: 58, size: 26, bold: true, color: BLUE, text: raw.summary[0] });
  textBox(s, { name: "coverage", x: 1160, y: 364, w: 660, h: 200, size: 18, color: DARK, lineSpacing: 1.2, text: raw.summary[2] });
  box(s, {
    name: "pending", x: 1160, y: 576, w: 660, h: 486, fill: PANEL, radius: 8, size: 18,
    align: "left", valign: "top", lineSpacing: 1.2,
    insets: { top: 18, right: 20, bottom: 18, left: 20 },
    text: [
      "รายการที่ต้องวัดบนชุดฮาร์ดแวร์จริง",
      "",
      "กระแสมอเตอร์ขณะเริ่มหมุนและขณะติดขัด ต้องไม่เกิน 0.50 A",
      "ระยะเวลาที่แกนหยุดจริงหลังตัดแรงขับ เทียบกับค่า 200 ms",
      "ระยะหยุดของบานประตูหลังลำแสงถูกบัง",
      "ระดับแรงดันของลำแสงและลิมิตที่ฝั่ง 5 V",
      "อุณหภูมิของ L293D และตัวต้านทานจำกัดกระแส",
    ],
  });
  notes(s, "SLIDE 9. ผลในตารางมาจากการรัน assembler และ CPU ของ EdSim51 แบบไม่เปิดหน้าต่างโปรแกรม รายละเอียดอยู่ใน firmware/TEST_RESULTS.md");
}

// ---------------------------------------------------------------- slide 10
{
  const s = dup(8);
  const t = title(s, "Conclusion");
  place(t, { x: 208, y: 186, w: 1503, h: 151 });
  const body = byName(s, "TextBox 43");
  place(body, { x: 400, y: 420, w: 1120, h: 410 });
  setText(body, [
    "ระบบที่เสนอเปลี่ยนการตัดสินใจปิดจากการนับเวลาอย่างเดียว มาเป็นการตรวจสิ่งกีดขวางร่วมกับลำดับหยุดก่อนกลับทิศ และเพิ่มสถานะขัดข้องที่ต้องรีเซ็ตด้วยมือ",
    "",
    "ข้อจำกัด ลำแสงสองระดับไม่ครอบคลุมทุกตำแหน่งในช่องประตู และผลที่ได้มาจากการจำลอง ยังไม่ได้วัดแรงหนีบหรือระยะหยุดบนชุดจริง",
    "",
    "ขั้นถัดไป ประกอบชุดสาธิต วัดกระแสและระยะหยุด แล้วปรับเวลาหยุดก่อนกลับทิศตามผลวัดจริง",
  ], {
    typeface: THAI, fontSizePt: 20, color: DARK, alignment: "center",
    verticalAlignment: "middle", lineSpacing: 1.16, autoFit: "none",
  });
  notes(s, "SLIDE 10. สรุปขอบเขตงานและสิ่งที่ยังต้องตรวจสอบก่อนนำไปใช้กับประตูจริง");
}

for (const slide of originals) slide.delete();
built.forEach((slide, i) => slide.moveTo(i));

const order = presentation.slides.items.map((s, i) => {
  const note = s.speakerNotes.textFrame.text || "";
  return { index: i, note: note.slice(0, 9) };
});
console.log(JSON.stringify(order));

await fs.mkdir(TMP_DIR, { recursive: true });
const candidatePath = path.join(TMP_DIR, "candidate.pptx");
await (await PresentationFile.exportPptx(presentation)).save(candidatePath);
for (let i = 0; i < presentation.slides.items.length; i += 1) {
  const blob = await presentation.export({ slide: presentation.slides.items[i], format: "png", scale: 0.5 });
  await fs.writeFile(path.join(TMP_DIR, "draft-" + (i + 1) + ".png"), new Uint8Array(await blob.arrayBuffer()));
}
console.log("slides", presentation.slides.items.length);
