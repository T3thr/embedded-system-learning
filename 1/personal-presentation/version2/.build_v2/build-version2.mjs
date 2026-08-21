import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, PresentationFile } from "@oai/artifact-tool";

process.on("uncaughtException", (error) => {
  console.error(`BUILD ERROR: ${error?.message ?? error}`);
  process.exit(1);
});
process.on("unhandledRejection", (error) => {
  console.error(`BUILD REJECTION: ${error?.message ?? error}`);
  process.exit(1);
});

const BUILD_DIR = "/Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/personal-presentation/version2/.build_v2";
const STARTER_PPTX = path.join(BUILD_DIR, "template-starter.pptx");
const FINAL_PPTX = "/Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/personal-presentation/version2/interrupt-mechanism-coursework-version2.pptx";
const PREVIEW_DIR = path.join(BUILD_DIR, "final-preview");
const LAYOUT_DIR = path.join(BUILD_DIR, "final-layout");

const COLORS = {
  navy: "#0B2A4A",
  blue: "#1677A7",
  green: "#2D8B67",
  red: "#D1493F",
  orange: "#DE7B00",
  gold: "#C89B3C",
  text: "#202A36",
  muted: "#667382",
  white: "#FFFFFF",
};

const presentation = await PresentationFile.importPptx(await FileBlob.load(STARTER_PPTX));

const AID_MAP = new Map();
for (let slideNumber = 1; slideNumber <= 5; slideNumber += 1) {
  const sourcePath = path.join(BUILD_DIR, "template-inspect", "layouts", `source-slide-${String(slideNumber).padStart(2, "0")}.layout.json`);
  const sourceLayout = JSON.parse(await fs.readFile(sourcePath, "utf8"));
  const liveLayoutBlob = await presentation.slides.getItem(slideNumber - 1).export({ format: "layout" });
  const liveLayout = JSON.parse(await liveLayoutBlob.text());
  for (const sourceElement of sourceLayout.elements) {
    const liveElement = liveLayout.elements.find(
      (candidate) => candidate.order === sourceElement.order && candidate.kind === sourceElement.kind,
    );
    if (sourceElement.aid && liveElement?.aid) AID_MAP.set(sourceElement.aid, liveElement.aid);
  }
}

function shape(id) {
  return presentation.resolve(AID_MAP.get(id) ?? id);
}

function setText(id, value, style = undefined, frame = undefined) {
  const target = shape(id);
  target.text = value;
  if (style) target.text.style = style;
  if (frame) target.frame = frame;
  return target;
}

function remove(ids) {
  for (const id of ids) shape(id).delete();
}

function titleStyle(size = 38, color = COLORS.navy) {
  return {
    typeface: "Tahoma",
    fontSize: size,
    bold: true,
    color,
    alignment: "left",
    verticalAlignment: "top",
  };
}

function bodyStyle(size = 18, color = COLORS.text, alignment = "left", bold = false) {
  return {
    typeface: "Tahoma",
    fontSize: size,
    bold,
    color,
    alignment,
    verticalAlignment: "middle",
  };
}

function footerStyle() {
  return {
    typeface: "Tahoma",
    fontSize: 11,
    color: COLORS.muted,
    alignment: "left",
    verticalAlignment: "middle",
  };
}

// Slide 1 — compliant cover; reveal inherited, editable IRQ diagram.
remove([
  "sh/kbmh0v25",
  "sh/5cvy903q",
  "im/8rq98nyl",
  "sh/jadg7ql0",
  "sh/sf6h4v2h",
  "sh/tgfyd032",
]);
setText("sh/k3yl0zql", "NARESUAN UNIVERSITY  •  COMPUTER ENGINEERING  •  305341", bodyStyle(15, COLORS.gold, "left", true));
setText("sh/7qp4be9c", "Interrupt\nMechanism", titleStyle(62, COLORS.white));
setText(
  "sh/65g3298r",
  "CPU ตอบสนองต่อ Event แล้วกลับมาทำงานเดิมอย่างไร",
  bodyStyle(25, COLORS.gold),
  { left: 72, top: 326, width: 650, height: 60 },
);
setText("sh/sryl4zqx", "ผู้นำเสนอ", bodyStyle(16, "#D9E4EC", "left", false));
setText("sh/fu94fe98", "ธีรภัทร ภู่ระย้า", bodyStyle(18, COLORS.white, "left", true));
setText("sh/utg3698n", "รหัส / ลำดับ", bodyStyle(16, "#D9E4EC", "left", false));
setText("sh/wn6dc7eh", "66362416  •  กลุ่ม 1  •  ลำดับที่ 4", bodyStyle(18, COLORS.white, "left", true));
setText("sh/hofulsf2", "หัวข้อ", bodyStyle(16, "#D9E4EC", "left", false));
setText("sh/ul4vaxgb", "41  •  Interrupt Mechanism", bodyStyle(18, COLORS.white, "left", true), { left: 190, top: 496, width: 430, height: 28 });
setText("sh/vmdcj2xw", "EVENT", bodyStyle(18, COLORS.gold, "center", true));
setText("sh/5sfepcfe", "CPU", bodyStyle(29, COLORS.white, "center", true));
setText("sh/ipovexwn", "Main → ISR → Resume", bodyStyle(17, COLORS.white, "center", false));
setText("sh/sfqdkrep", "IRQ", bodyStyle(20, COLORS.navy, "center", true));
setText("sh/0bmd476t", "STACK", bodyStyle(18, COLORS.navy, "center", true));
setText("sh/e94v2hon", "Event  •  Gate  •  Context  •  Vector  •  Return", bodyStyle(16, "#D9E4EC", "center", false));

// Slide 2 — meaning/background; farmer/chicken analogy is adapted from Valvano.
remove(["sh/fi5gz2hk", "im/cfy1orq5", "sh/hk7y1czq", "sh/2lgfahgb"]);
setText("sh/9072xkry", "ความหมาย • ความเป็นมา", bodyStyle(14, COLORS.blue, "left", true));
setText("sh/ozy1ofad", "เหตุการณ์มาเมื่อไร CPU ค่อยตอบสนอง [5][8]", titleStyle(36));
setText("sh/b29kza94", "02", bodyStyle(16, COLORS.gold, "right", true));
setText("sh/w3i1sfa9", "MAIN TASK", bodyStyle(27, COLORS.white, "center", true));
setText("sh/r65knqtk", "ไถนา • ทำงานหลัก", bodyStyle(17, COLORS.white, "center", false));
setText("sh/ove9o7yd", "INTERRUPT [8]", bodyStyle(17, COLORS.blue, "left", true));
setText("sh/9wnqhczy", "เสียงไก่ดัง → หยุดไถ\nไปจัดการชั่วคราว", bodyStyle(17, COLORS.text));
setText("sh/nu58f2hs", "ตรวจซ้ำ (POLLING) [5]", bodyStyle(16, COLORS.red, "left", true));
setText("sh/wjy9sry9", "หยุดไถไปตรวจเล้า\nทุกช่วงเวลา", bodyStyle(17, COLORS.text));
setText("sh/ahwrqhgj", "EVENT SOURCES [2][6]", bodyStyle(16, COLORS.orange, "left", true));
setText("sh/bip8jmho", "Timer • Peripheral\nINT0/INT1 • PCINT", bodyStyle(17, COLORS.text));
setText("sh/do3q9szq", "RESUME [5][7]", bodyStyle(17, COLORS.green, "left", true));
setText("sh/t8byxkn2", "จัดการเหตุ → กลับมา\nทำงานหลักต่อ", bodyStyle(17, COLORS.text));
setText(
  "sh/gbmxszmt",
  "ขัดจังหวะเมื่อจำเป็น - ไม่หยุดตรวจซ้ำ [5][8]",
  bodyStyle(24, COLORS.navy, "center", true),
  { left: 160, top: 600, width: 960, height: 48 },
);
setText("sh/u94fqp4n", "อ้างอิงหัวข้อ: [2] Lecture 2 หน้า 2-3 • [5] Mazidi หน้า 375 • [8] Valvano หน้า 208", footerStyle());
setText("sh/p0vy54na", "305341 • ธีรภัทร 66362416 • 02", { ...footerStyle(), alignment: "right" });

// Slide 3 — architecture-neutral six-step mechanism.
setText("sh/cza94vmx", "กลไก • การทำงาน", bodyStyle(14, COLORS.blue, "left", true));
setText("sh/d0jax03i", "เส้นทาง 6 ขั้น: Event ถึง Resume [5][6][7]", titleStyle(36));
setText("sh/298ryl4v", "03", bodyStyle(16, COLORS.gold, "right", true));
setText("sh/m5cra54z", "1", bodyStyle(19, COLORS.white, "center", true));
setText("sh/n6ls3alk", "EVENT", bodyStyle(23, COLORS.blue, "left", true));
setText("sh/n2l4fq98", "Request / Flag\nเข้าสถานะ Pending", bodyStyle(18));
setText("sh/83ulovat", "2", bodyStyle(19, COLORS.white, "center", true));
setText("sh/v6l4jq94", "GATE", bodyStyle(23, COLORS.navy, "left", true));
setText("sh/a5c3ql8z", "Enable • Mask\nPriority ตัดสิน", bodyStyle(18));
setText("sh/ja54na9g", "3", bodyStyle(19, COLORS.white, "center", true));
setText("sh/i9w3u58v", "SAVE", bodyStyle(23, COLORS.green, "left", true));
setText("sh/e10f2twf", "จบคำสั่ง • เก็บ PC\nและ Context ที่จำเป็น", bodyStyle(18));
setText("sh/14ryd8fq", "4", bodyStyle(19, COLORS.white, "center", true));
setText("sh/6d0fytg3", "VECTOR", bodyStyle(23, COLORS.orange, "left", true));
setText("sh/re9g7yxo", "โหลดตำแหน่ง ISR\nจาก Vector Table", bodyStyle(18));
setText("sh/a9kfadwn", "5", bodyStyle(19, COLORS.white, "center", true));
setText("sh/batgjixs", "ISR / ACK", bodyStyle(22, COLORS.red, "left", true));
setText("sh/l4fi9cza", "จัดการเหตุ • Clear\nหรือ Acknowledge แหล่งคำขอ", bodyStyle(17));
setText("sh/y14jehgj", "6", bodyStyle(19, COLORS.white, "center", true));
setText("sh/x0vi5czy", "RETURN", bodyStyle(23, COLORS.blue, "left", true));
setText("sh/czmhc7id", "Restore • RETI\nหรือ EXC_RETURN", bodyStyle(18));
setText("sh/po3ilcvm", "ทำงานต่อจาก instruction ถัดไป", bodyStyle(17, COLORS.blue, "center", true));
setText("sh/cruhwrud", "อ้างอิงหัวข้อ: [5] Mazidi หน้า 376 • [6] ATmega328/P หน้า 33-35 • [7] Yiu หน้า 172-175", footerStyle());
setText("sh/ds3ipcvy", "305341 Embedded System 1 • ธีรภัทร 66362416 • 03", { ...footerStyle(), alignment: "right" });

// Slide 4 — reveal native comparison and make the architecture caveat explicit.
remove(["sh/rilczq5s", "sh/qhcb6l47", "im/pkredwn6", "sh/sjut8vmd", "sh/3elcv65w"]);
setText("sh/1cj2d8b6", "กลไก • การทำงาน", bodyStyle(14, COLORS.blue, "left", true));
setText("sh/0ba143al", "Context เดียวกัน - Hardware Save ต่างกัน [3][6][7]", titleStyle(34));
setText("sh/rm1k7yt4", "04", bodyStyle(16, COLORS.gold, "right", true));
setText("sh/doj29oba", "8051 / AVR: เก็บ PC เป็นหลัก", bodyStyle(25, COLORS.blue, "left", true));
setText("sh/sna103ap", "Cortex-M: Hardware stack 8 รีจิสเตอร์", bodyStyle(24, COLORS.red, "left", true));
setText("sh/ih8ju9sn", "8051: IE / IP = Enable + Priority", bodyStyle(18, COLORS.text));
setText("sh/5cva1cfq", "AVR: SREG.I = Global Enable", bodyStyle(18, COLORS.text));
setText("sh/jadsz2xk", "Hardware: Push return PC", bodyStyle(18, COLORS.text));
setText("sh/x8vaxsfe", "Software/compiler: Save status + regs", bodyStyle(17, COLORS.text));
setText("sh/a5kr2xg3", "GATE", bodyStyle(16, COLORS.blue, "left", true));
setText("sh/v6tsv2xo", "SAVE", bodyStyle(16, COLORS.orange, "left", true));
setText("sh/oz29krqh", "xPSR", bodyStyle(20, COLORS.navy, "center", true));
setText("sh/2xkrih8b", "PC", bodyStyle(20, COLORS.navy, "center", true));
setText("sh/gv29g7q5", "LR", bodyStyle(20, COLORS.navy, "center", true));
setText("sh/et0reh8f", "R12", bodyStyle(20, COLORS.navy, "center", true));
setText("sh/sri9s7q9", "R3", bodyStyle(20, COLORS.navy, "center", true));
setText("sh/jm5gze1g", "R2", bodyStyle(20, COLORS.navy, "center", true));
setText("sh/5ony1oj6", "R1", bodyStyle(20, COLORS.navy, "center", true));
setText("sh/vy5gbe14", "R0", bodyStyle(20, COLORS.navy, "center", true));
setText("sh/wzex4z2p", "R0-R3, R12, LR, PC, xPSR = 32 bytes", bodyStyle(18, COLORS.navy, "center", true));
setText("sh/xknyx4ja", "EXC_RETURN → Hardware unstack", bodyStyle(17, COLORS.red, "center", true));
setText(
  "sh/nulw7u18",
  "อย่าเหมารวม: Full-context stacking ไม่ได้เกิดด้วย Hardware ในทุกสถาปัตยกรรม",
  bodyStyle(23, COLORS.white, "center", true),
);
setText("sh/elwba54j", "อ้างอิงหัวข้อ: [3] Lecture 3 หน้า 9,12 • [4] Lecture 4 หน้า 28 • [6] ATmega หน้า 26,33-35 • [7] Yiu หน้า 172-175", footerStyle());
setText("sh/18nu50nu", "305341 Embedded System 1 • ธีรภัทร 66362416 • 04", { ...footerStyle(), alignment: "right" });

// Slide 5 — reveal inherited eight-item reference layout; remove copied cover images.
remove([
  "sh/3md0bu94", "sh/2l4zip8j", "sh/povid4ra", "im/p4vi14jy", "sh/bqx0fe9g", "sh/qp4jm98v",
  "im/exkzmp0b", "sh/9gfy5o7e", "sh/mdoza9o3", "sh/nexg3epo", "sh/0r6h8z6x", "sh/lcfy147i",
  "sh/yp4z69or", "sh/zqxgzupc", "sh/cnmh4z61", "sh/dovyx476", "sh/t8n6lwvy", "sh/s7u5crud",
  "sh/r6lojmds", "sh/65cnahc7", "sh/5436hcv2", "sh/43u587uh", "sh/j2lofmdw",
]);
setText("sh/dgbulwnm", "REFERENCES • เอกสารอ้างอิง", bodyStyle(14, COLORS.blue, "left", true));
setText("sh/cf2tcr61", "เอกสารอ้างอิงตามรูปแบบรายวิชา", titleStyle(36));
setText("sh/z2tcnm5s", "05", bodyStyle(16, COLORS.gold, "right", true));

const refs = [
  ["sh/l4bupwny", "sh/032tgr6d", "sh/n6dcr65o", "[1]", "เอกสารประกอบการสอน 305341. (ม.ป.ป.).", "Lecture 1, หน้า 18, 25. มหาวิทยาลัยนเรศวร."],
  ["sh/w32dkbuh", "sh/x4vedgvm", "sh/ahkvi1cb", "[2]", "เอกสารประกอบการสอน 305341. (ม.ป.ป.).", "Lecture 2, หน้า 2-3. มหาวิทยาลัยนเรศวร."],
  ["sh/k7mxovud", "sh/58vehgvy", "sh/i54fmlc7", "[3]", "เอกสารประกอบการสอน 305341. (ม.ป.ป.).", "Lecture 3, หน้า 9, 12. มหาวิทยาลัยนเรศวร."],
  ["sh/sb6xsvu9", "sh/tcfel0vu", "sh/hgrmpwj2", "[4]", "เอกสารประกอบการสอน 305341. (ม.ป.ป.).", "Lecture 4, หน้า 28. มหาวิทยาลัยนเรศวร."],
  ["sh/fe94nm1w", "sh/ud0ne10b", "sh/pkr6tgjy", "[5]", "Mazidi, M. A., Naimi, S., & Naimi, S. (2011).", "The AVR Microcontroller and Embedded Systems. pp. 375-376, Prentice Hall."],
  ["sh/3i94r61s", "sh/2h0ni107", "sh/5o7mhcju", "[6]", "Microchip Technology Inc. (2018).", "ATmega328/P Datasheet. pp. 26, 33-35, 89, Microchip Technology Inc."],
  ["sh/atcjidg7", "sh/vu5kbihc", "sh/wve1knyx", "[7]", "Yiu, J. (2010).", "The Definitive Guide to the ARM Cortex-M3. 2nd ed., pp. 172-175, Newnes."],
  ["sh/ihw3mxg3", "sh/ji5kf2ho", "sh/kjelony9", "[8]", "Valvano, J. W. (2017).", "Embedded Systems: RTOS for ARM Cortex-M. 4th ed., p. 208, self-published."],
];

for (const [numberId, authorId, detailId, number, author, detail] of refs) {
  setText(numberId, number, bodyStyle(17, COLORS.blue, "center", true));
  setText(authorId, author, bodyStyle(17, COLORS.navy, "left", true));
  setText(detailId, detail, bodyStyle(15.5, COLORS.muted, "left", false));
}

setText("sh/zmlk3yhk", "ภาพทุกภาพวาดใหม่ด้วยรูปทรง PowerPoint • อ้างอิงเนื้อหาด้วย [1]-[8]", bodyStyle(17, COLORS.blue, "center", true));
setText("sh/ehkzepsn", "แหล่งข้อมูลภายในระบบ • ตรวจทาน 9 ส.ค. 2569", footerStyle());
setText("sh/1kvi94re", "305341 Embedded System 1 • ธีรภัทร 66362416 • 05", { ...footerStyle(), alignment: "right" });

const slide1 = presentation.slides.getItem(0);
const slide2 = presentation.slides.getItem(1);
const slide3 = presentation.slides.getItem(2);
const slide4 = presentation.slides.getItem(3);
const slide5 = presentation.slides.getItem(4);

slide1.speakerNotes.text = `บทบรรยาย (ประมาณ 0:00-0:15)\nสวัสดีครับ ผมธีรภัทร ภู่ระย้า รหัส 66362416 หัวข้อที่ 41 Interrupt Mechanism วันนี้เราจะตอบคำถามว่า เมื่อเหตุการณ์เข้ามา CPU จะหยุดงานเดิม ไปจัดการ และกลับมาทำงานต่อได้อย่างไร โดยไม่ทำสถานะเดิมหาย\n\n[Sources]\n- /Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/info/student-course-enrollment.md\n- /Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/personal-presentation/assignment/Topic-lists.md\n- /Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/personal-presentation/assignment/Course Work.pdf, pp. 3, 5`;
slide2.speakerNotes.text = `บทบรรยาย (ประมาณ 0:15-0:45)\nลองนึกถึงชาวนากำลังไถนา ถ้าเขาต้องหยุดไปตรวจเล้าไก่ทุกครู่ นั่นคือการตรวจซ้ำหรือ polling และเสียเวลางานหลัก แต่ถ้าเขาไถต่อจนได้ยินเสียงไก่หนี แล้วค่อยไปจับกลับ นั่นคือ interrupt ในระบบจริง Event อาจมาจาก Timer, Peripheral, INT0/INT1 หรือ PCINT เป้าหมายคือให้ CPU ทำงานหลักต่อ จนมีเหตุจำเป็นต้องตอบสนอง\n\n[Sources]\n- [2] /Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/Lecture 2.pdf, pp. 2-3\n- [5] /Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/textbook/avr-microcontroller-and-embedded-systems-by-ali-mazidi.pdf, p. 375\n- [6] /Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/textbook/Microchip-Technology(2018)_ATmega328P 8-bit_AVR_Microcontroller.pdf, p. 89\n- [8] /Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/textbook/Embedded-Systems_Real_Time_Operating_Systems_for_ARM_Cortex-M_Microcontrollers.pdf, p. 208\nVisual: original PowerPoint shapes; analogy adapted from [8], no copied figure.`;
slide3.speakerNotes.text = `บทบรรยาย (ประมาณ 0:45-1:28)\nกลไกสรุปได้หกขั้น หนึ่ง Event ทำให้ Request หรือ Flag เข้าสถานะ Pending สอง Gate ตรวจ Enable, Mask และ Priority ถ้ายังไม่ผ่าน คำขออาจรออยู่ สาม CPU จบคำสั่งปัจจุบันและเก็บ PC กับ Context ที่จำเป็น สี่ Vector ส่งไปยัง ISR ห้า ISR จัดการเหตุและ Clear หรือ Acknowledge แหล่งคำขอ หก RETI หรือ EXC_RETURN คืนบริบท แล้วทำงานต่อจาก instruction ถัดไป ลำดับนี้เป็นแบบจำลองร่วม รายละเอียดบางขั้นอาจทำพร้อมกันตามสถาปัตยกรรม\n\n[Sources]\n- [5] /Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/textbook/avr-microcontroller-and-embedded-systems-by-ali-mazidi.pdf, p. 376\n- [6] /Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/textbook/Microchip-Technology(2018)_ATmega328P 8-bit_AVR_Microcontroller.pdf, pp. 33-35\n- [7] /Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/textbook/THE_DEFINITIVE_GUIDE_TO_THE_ARM_CORTEX-МЗ_Stellaris_MCU_9000Series_TEINSTRUMENTS_ARM_SECOND_EDITION.pdf, pp. 172-175\nVisual: redrawn as editable PowerPoint shapes from the cited mechanism descriptions.`;
slide4.speakerNotes.text = `บทบรรยาย (ประมาณ 1:28-2:08)\nจุดที่ต้องระวังคือ Context Saving ไม่เหมือนกันทุก CPU ใน 8051 รีจิสเตอร์ IE และ IP ใช้เปิดและจัดลำดับความสำคัญ ส่วน AVR ใช้ SREG.I เป็น Global Enable สำหรับ 8-bit MCU เหล่านี้ Hardware เก็บ Return PC เป็นหลัก ขณะที่ Status และรีจิสเตอร์ที่ ISR ใช้ต้องให้ Software หรือ Compiler ช่วยรักษา แต่ Cortex-M จะ Stack R0 ถึง R3, R12, LR, PC และ xPSR รวม 32 ไบต์ด้วย Hardware และใช้ EXC_RETURN เพื่อ Unstack ดังนั้น Flow เหมือนกัน แต่สิ่งที่ Hardware ช่วยต่างกัน\n\n[Sources]\n- [3] /Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/Lecture 3.pdf, pp. 9, 12\n- [4] /Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/lecture/Lecture 4.pdf, p. 28\n- [6] /Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/textbook/Microchip-Technology(2018)_ATmega328P 8-bit_AVR_Microcontroller.pdf, pp. 26, 33-35\n- [7] /Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/textbook/THE_DEFINITIVE_GUIDE_TO_THE_ARM_CORTEX-МЗ_Stellaris_MCU_9000Series_TEINSTRUMENTS_ARM_SECOND_EDITION.pdf, pp. 172-175\nVisual: native PowerPoint comparison redrawn from the cited register/stack descriptions.`;
slide5.speakerNotes.text = `บทบรรยาย (ประมาณ 2:08-2:23)\nสรุปคือ Interrupt มีแกนเดียวกัน: รับคำขอ ตรวจสิทธิ์ เก็บบริบท ไป ISR แล้วคืนบริบท โปรแกรมหลักจึงทำงานต่อได้อย่างถูกต้อง ภาพทั้งหมดวาดใหม่ด้วยรูปทรง PowerPoint และเนื้อหาอ้างอิงทั้ง Lecture, ตำรา และ Datasheet ตามรายการนี้ ขอบคุณครับ\n\n[Sources]\n- [1] Lecture1.pdf, pp. 18, 25\n- [2] Lecture 2.pdf, pp. 2-3\n- [3] Lecture 3.pdf, pp. 9, 12\n- [4] Lecture 4.pdf, p. 28\n- [5] Mazidi et al., The AVR Microcontroller and Embedded Systems, 2011, pp. 375-376\n- [6] Microchip Technology Inc., ATmega328/P Datasheet, 2018, pp. 26, 33-35, 89\n- [7] Yiu, The Definitive Guide to the ARM Cortex-M3, 2nd ed., 2010, pp. 172-175\n- [8] Valvano, Embedded Systems: RTOS for ARM Cortex-M, 4th ed., 2017, p. 208`;

for (const slide of [slide1, slide2, slide3, slide4, slide5]) slide.speakerNotes.setVisible(true);

await fs.mkdir(PREVIEW_DIR, { recursive: true });
await fs.mkdir(LAYOUT_DIR, { recursive: true });

for (const [index, slide] of presentation.slides.items.entries()) {
  const stem = `final-slide-${String(index + 1).padStart(2, "0")}`;
  const png = await presentation.export({ slide, format: "png", scale: 2 });
  await fs.writeFile(path.join(PREVIEW_DIR, `${stem}.png`), new Uint8Array(await png.arrayBuffer()));
  const layout = await slide.export({ format: "layout" });
  await fs.writeFile(path.join(LAYOUT_DIR, `${stem}.layout.json`), await layout.text());
}

const montage = await presentation.export({ format: "webp", montage: true, scale: 1 });
await fs.writeFile(path.join(BUILD_DIR, "final-montage.webp"), new Uint8Array(await montage.arrayBuffer()));

const inspection = await presentation.inspect({
  kind: "slide,textbox,shape,image,table,chart,notes,layout",
  maxChars: 80000,
});
await fs.writeFile(path.join(BUILD_DIR, "final-inspect.ndjson"), inspection.ndjson, "utf8");

const pptx = await PresentationFile.exportPptx(presentation);
await pptx.save(FINAL_PPTX);

console.log(FINAL_PPTX);
