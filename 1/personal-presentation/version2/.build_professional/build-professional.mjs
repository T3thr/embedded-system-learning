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

const ROOT = "/Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system";
const BUILD_DIR = path.join(ROOT, "1/personal-presentation/version2/.build_professional");
const STARTER_PPTX = path.join(BUILD_DIR, "template-starter.pptx");
const FINAL_PPTX = path.join(ROOT, "1/personal-presentation/version2/interrupt-mechanism-coursework-version2-professional.pptx");
const PREVIEW_DIR = path.join(BUILD_DIR, "final-preview");
const LAYOUT_DIR = path.join(BUILD_DIR, "final-layout");

const C = {
  bg: "#071A2C",
  surface: "#102A43",
  surface2: "#173B5E",
  ink: "#F4F8FC",
  muted: "#B8C7D9",
  accent: "#7DD3FC",
  accent2: "#60A5FA",
  rule: "#335B7A",
};
const FONT = "Tahoma";

const presentation = await PresentationFile.importPptx(await FileBlob.load(STARTER_PPTX));

const AID_MAP = new Map();
for (let slideNumber = 1; slideNumber <= 5; slideNumber += 1) {
  const sourcePath = path.join(
    BUILD_DIR,
    "template-starter-layout",
    `starter-slide-${String(slideNumber).padStart(2, "0")}.layout.json`,
  );
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

function resolve(id) {
  return presentation.resolve(AID_MAP.get(id) ?? id);
}

function remove(id) {
  resolve(id).delete();
}

function setText(id, value, style = {}) {
  const target = resolve(id);
  target.text = value;
  target.text.style = {
    typeface: FONT,
    color: C.ink,
    alignment: "left",
    verticalAlignment: "top",
    autoFit: "shrinkText",
    ...style,
  };
  return target;
}

function setTwoPartText(id, heading, body, style = {}, headingColor = C.ink) {
  const target = setText(id, `${heading}\n${body}`, style);
  const headingRange = target.text.get(heading);
  headingRange.bold = true;
  headingRange.fill = headingColor;
  return target;
}

function titleStyle(size = 38.67) {
  return { fontSize: size, bold: true, color: C.ink, autoFit: "shrinkText" };
}

function pageStyle() {
  return { fontSize: 13.33, color: C.muted, alignment: "right", verticalAlignment: "bottom" };
}

function accentLabelStyle(size = 20) {
  return { fontSize: size, bold: true, color: C.accent, verticalAlignment: "middle" };
}

for (const slide of presentation.slides.items) {
  slide.background.fill = C.bg;
}

// Slide 1 — retained centered cover.
setText("sh/ixkbmdoj", "41  Interrupt\nMechanism", {
  fontSize: 66,
  bold: true,
  color: C.accent,
  alignment: "center",
  verticalAlignment: "middle",
  autoFit: "shrinkText",
});
setText("sh/4z2to36p", "นายธีรภัทร ภู่ระย้า  •  66362416  •  กลุ่ม 1  •  ลำดับ 4", {
  fontSize: 23,
  color: C.ink,
  alignment: "center",
  verticalAlignment: "middle",
  autoFit: "shrinkText",
});
const coverBadge = setText("sh/dova1s76", "305341  •  EMBEDDED SYSTEM 1", {
  fontSize: 12.5,
  bold: true,
  color: C.ink,
  alignment: "center",
  verticalAlignment: "middle",
  autoFit: "shrinkText",
});
coverBadge.fill = C.surface2;
coverBadge.line = { style: "solid", fill: C.rule, width: 1 };

// Slide 2 — definition and properties. No example or comparison appears on-slide.
remove("sh/ned8z61c");
setText("sh/by5wbi94", "2", pageStyle());
setText("sh/axwvidsz", "Interrupt คือการถ่ายโอนการควบคุมตามเหตุการณ์ [1][2]", titleStyle(37));
setText(
  "sh/mtkr61kr",
  "กลไกที่ทำให้ CPU เปลี่ยนจากโปรแกรมปัจจุบันไปยัง ISR เมื่อคำขอผ่านเงื่อนไขการตอบรับ จากนั้นคืนบริบทและดำเนินงานต่อ ณ ตำแหน่งเดิม",
  { fontSize: 27, color: C.ink, verticalAlignment: "middle", autoFit: "shrinkText" },
);

const propertyRows = [
  ["sh/jmx83mto", "sh/8bq9gba5", "EVENT-DRIVEN", "เหตุการณ์สร้างคำขอแบบอะซิงโครนัส"],
  ["sh/lofq5wbu", "sh/kn69cra9", "STATE-PRESERVING", "เก็บสถานะที่จำเป็นก่อนเปลี่ยนเส้นทาง"],
  ["sh/3i1sfqts", "sh/ih8rmls7", "VECTORED", "Vector table ระบุตำแหน่งของ handler"],
  ["sh/e90fi94n", "sh/fa9wre58", "PRIORITY-AWARE", "Enable, mask และ priority กำกับการตอบรับ"],
];
for (const [headingId, bodyId, heading, body] of propertyRows) {
  setText(headingId, heading, accentLabelStyle(19));
  setText(bodyId, body, { fontSize: 19.5, color: C.ink, verticalAlignment: "middle", autoFit: "shrinkText" });
}

// Slide 3 — technical mechanism as three architectural phases.
remove("sh/ypg7uxkf");
setText("sh/ls765s36", "3", pageStyle());
setText("sh/zu1k3u5o", "การตอบสนองแบ่งเป็น 3 ระยะต่อเนื่อง [1][2][3][4]", titleStyle(37));

const finalPhaseSurface = resolve("sh/kvalcz69");
finalPhaseSurface.fill = C.surface;
finalPhaseSurface.line = { style: "solid", fill: C.rule, width: 1 };
const timelineRule = resolve("sh/b25ozil4");
timelineRule.line = { style: "solid", fill: C.accent2, width: 2 };
for (const id of ["sh/q1w7qd4j", "sh/0rypwn2l", "sh/zqpo3il0"]) {
  const marker = resolve(id);
  marker.fill = C.accent;
  marker.line = { style: "solid", fill: C.accent, width: 1 };
}
setText("sh/8vip072x", "PHASE 01", accentLabelStyle(17));
setText("sh/lwj254nu", "PHASE 02", accentLabelStyle(17));
setText("sh/mhc3e9of", "PHASE 03", accentLabelStyle(17));

setTwoPartText(
  "sh/7il47e50",
  "REQUEST",
  "1  Event / flag สร้างคำขอ\nและเข้าสถานะ Pending",
  { fontSize: 18, color: C.muted, autoFit: "shrinkText" },
  C.ink,
);
setTwoPartText(
  "sh/9wrq9c3i",
  "ENTRY",
  "2–4  Qualify → Save → Vector\nก่อนเริ่ม handler",
  { fontSize: 18, color: C.muted, autoFit: "shrinkText" },
  C.ink,
);
setTwoPartText(
  "sh/nmhkvapw",
  "SERVICE / RETURN",
  "5–6  ISR / acknowledge → restore\nแล้ว resume โปรแกรมเดิม",
  { fontSize: 18, color: C.muted, autoFit: "shrinkText" },
  C.ink,
);

// Slide 4 — correctness constraints; no architecture comparison.
remove("sh/cfyxk3il");
setText("sh/apsre5of", "4", pageStyle());
const slide4Title = setText(
  "sh/bq1snap0",
  "ความถูกต้องของ Interrupt ขึ้นกับ State และ Latency [2][3][4]",
  titleStyle(35),
);
slide4Title.frame = { left: 41.33, top: 44, width: 1197.33, height: 96 };
setText("sh/repwby10", "01  •  QUALIFY", accentLabelStyle(17));
setText("sh/4bexg3i9", "02  •  PRESERVE", accentLabelStyle(17));
setText("sh/pcne9oju", "03  •  COMPLETE", accentLabelStyle(17));

const constraints = [
  [
    "sh/kva9kf6h",
    "ENABLE / MASK / PRIORITY",
    "คำขอต้องผ่านเงื่อนไขการตอบรับก่อนเปลี่ยน control flow",
  ],
  [
    "sh/z2pwfi1w",
    "CONTEXT INTEGRITY",
    "ขอบเขตการ Save / Restore กำหนดโดยสถาปัตยกรรมและ ABI",
  ],
  [
    "sh/ehgfmd0b",
    "BOUNDED ISR",
    "Acknowledge แหล่งคำขอ และทำเฉพาะงานจำเป็นเพื่อลด latency และ jitter",
  ],
];
for (const [id, heading, body] of constraints) {
  setTwoPartText(
    id,
    heading,
    body,
    { fontSize: 18, color: C.muted, autoFit: "shrinkText" },
    C.ink,
  );
}

// Slide 5 — academic references only; no production claims.
remove("sh/j29wj6hk");
setText("sh/bepwf6h8", "5", pageStyle());
setText("sh/adgvm1gn", "เอกสารอ้างอิง", titleStyle(38.67));

const references = [
  [
    "sh/y5o7q9sv",
    "[1]  Mazidi et al. (2011).",
    "M. A. Mazidi, S. Naimi และ S. Naimi. The AVR Microcontroller and Embedded Systems. หน้า 375–376, Prentice Hall.",
  ],
  [
    "sh/z6xojetg",
    "[2]  Microchip Technology Inc. (2018).",
    "ATmega328/P AVR Microcontroller Datasheet Complete. หน้า 33–34, Microchip Technology.",
  ],
  [
    "sh/l4relgza",
    "[3]  Yiu, J. (2010).",
    "The Definitive Guide to the ARM Cortex-M3. 2nd ed. หน้า 172–175, Newnes.",
  ],
  [
    "sh/k3idsbyp",
    "[4]  Arm Ltd. (2010).",
    "Cortex-M3 Devices Generic User Guide (ออนไลน์). สืบค้นจาก https://developer.arm.com/documentation/dui0552/a [10 สิงหาคม 2569]",
  ],
];
for (const [id, author, detail] of references) {
  setTwoPartText(
    id,
    author,
    detail,
    { fontSize: 16.5, color: C.ink, autoFit: "shrinkText" },
    C.accent,
  );
}

const slide1 = presentation.slides.getItem(0);
const slide2 = presentation.slides.getItem(1);
const slide3 = presentation.slides.getItem(2);
const slide4 = presentation.slides.getItem(3);
const slide5 = presentation.slides.getItem(4);

slide1.speakerNotes.textFrame.setText(`บทบรรยาย 0:00–0:15\nสวัสดีครับ ผมธีรภัทร ภู่ระย้า รหัส 66362416 หัวข้อที่ 41 Interrupt Mechanism วันนี้จะอธิบายว่า CPU รับคำขอขัดจังหวะ เปลี่ยนไปทำ ISR และกลับมาทำงานเดิมอย่างถูกต้องได้อย่างไร\n\n[Sources]\n- ${ROOT}/1/info/student-course-enrollment.md\n- ${ROOT}/1/personal-presentation/assignment/Topic-lists.md\n- ${ROOT}/1/personal-presentation/assignment/Course Work.pdf, pp. 3, 5`);

slide2.speakerNotes.textFrame.setText(`บทบรรยาย 0:15–0:48\nInterrupt คือกลไกถ่ายโอนการควบคุมจากโปรแกรมปัจจุบันไปยัง Interrupt Service Routine เมื่อมีคำขอที่ผ่านเงื่อนไข จุดสำคัญคือคำขอเกิดได้แบบอะซิงโครนัส ระบบต้องเก็บสถานะที่จำเป็น ใช้ Vector ระบุตำแหน่ง Handler และใช้ Enable, Mask กับ Priority กำกับการตอบรับ ในการอธิบายด้วยวาจา เราอาจเทียบสั้น ๆ ว่า CPU ไม่จำเป็นต้องวนตรวจสถานะอุปกรณ์ทุกจังหวะเหมือน polling แต่ความเปรียบเทียบนี้ไม่ใช่แกนเนื้อหาบนสไลด์\n\n[Sources]\n- [1] ${ROOT}/1/textbook/avr-microcontroller-and-embedded-systems-by-ali-mazidi.pdf, pp. 375–376\n- [2] ${ROOT}/1/textbook/Microchip-Technology(2018)_ATmega328P 8-bit_AVR_Microcontroller.pdf, pp. 33–34`);

slide3.speakerNotes.textFrame.setText(`บทบรรยาย 0:48–1:34\nกระบวนการแบ่งเป็นสามระยะ ระยะแรก Request: Event หรือ Flag สร้างคำขอและอาจค้างในสถานะ Pending ระยะที่สอง Entry: วงจรควบคุมตรวจ Enable, Mask และ Priority จากนั้นเก็บบริบทที่สถาปัตยกรรมกำหนด และอ่าน Vector เพื่อเริ่ม Handler ระยะที่สาม Service and Return: ISR จัดการเหตุ Acknowledge หรือ Clear แหล่งคำขอ แล้วใช้กลไก Return เพื่อคืนสถานะและ Resume โปรแกรมเดิม ลำดับนี้เป็นแบบจำลองร่วม ส่วนรายละเอียดการเก็บ Register และคำสั่ง Return ขึ้นกับสถาปัตยกรรม\n\n[Sources]\n- [1] ${ROOT}/1/textbook/avr-microcontroller-and-embedded-systems-by-ali-mazidi.pdf, p. 376\n- [2] ${ROOT}/1/textbook/Microchip-Technology(2018)_ATmega328P 8-bit_AVR_Microcontroller.pdf, pp. 33–34\n- [3] ${ROOT}/1/textbook/THE_DEFINITIVE_GUIDE_TO_THE_ARM_CORTEX-МЗ_Stellaris_MCU_9000Series_TEINSTRUMENTS_ARM_SECOND_EDITION.pdf, pp. 172–175\n- [4] https://developer.arm.com/documentation/dui0552/a/the-cortex-m3-processor/exception-model/exception-entry-and-return`);

slide4.speakerNotes.textFrame.setText(`บทบรรยาย 1:34–2:12\nความถูกต้องมีสามเงื่อนไข หนึ่ง คำขอต้องผ่านกฎ Enable, Mask และ Priority เพื่อไม่ให้ Control Flow เปลี่ยนผิดจังหวะ สอง ต้องรักษา Context Integrity โดย Hardware เก็บเฉพาะสถานะที่สถาปัตยกรรมกำหนด ส่วนสถานะเพิ่มเติมที่ ISR แก้ไขต้องเป็นไปตาม ABI และ Compiler สาม ISR ต้อง Acknowledge แหล่งคำขอและทำเฉพาะงานจำเป็นให้เสร็จเร็ว เพราะช่วงเวลาที่ Interrupt ถูกปิดหรือ ISR ทำงานนานจะเพิ่ม Latency และ Jitter ของเหตุการณ์อื่น\n\n[Sources]\n- [2] ${ROOT}/1/textbook/Microchip-Technology(2018)_ATmega328P 8-bit_AVR_Microcontroller.pdf, pp. 33–34\n- [3] ${ROOT}/1/textbook/THE_DEFINITIVE_GUIDE_TO_THE_ARM_CORTEX-МЗ_Stellaris_MCU_9000Series_TEINSTRUMENTS_ARM_SECOND_EDITION.pdf, pp. 172–175\n- [4] https://developer.arm.com/documentation/dui0552/a/the-cortex-m3-processor/exception-model/exception-entry-and-return`);

slide5.speakerNotes.textFrame.setText(`บทบรรยาย 2:12–2:25\nสรุปคือ Interrupt ไม่ใช่เพียงการกระโดดไปยังฟังก์ชัน แต่เป็นลำดับทางสถาปัตยกรรมที่ต้องควบคุมการตอบรับ รักษาสถานะ จัดการแหล่งคำขอ และคืนการทำงานเดิมอย่างมีขอบเขตเวลา เอกสารหลักที่ใช้คือหนังสือ AVR, Datasheet ของ Microchip, ตำรา Cortex-M3 และเอกสารทางการของ Arm ขอบคุณครับ\n\n[Sources]\n- [1] Mazidi, M. A., Naimi, S., and Naimi, S. (2011). The AVR Microcontroller and Embedded Systems. pp. 375–376, Prentice Hall.\n- [2] Microchip Technology Inc. (2018). ATmega328/P Datasheet Complete. pp. 33–34, Microchip Technology Inc.\n- [3] Yiu, J. (2010). The Definitive Guide to the ARM Cortex-M3. 2nd ed. pp. 172–175, Newnes.\n- [4] Arm Ltd. (2010). Cortex-M3 Devices Generic User Guide, ARM DUI 0552A. pp. 2-26–2-27, Arm Ltd.`);

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
  maxChars: 100000,
});
await fs.writeFile(path.join(BUILD_DIR, "final-inspect.ndjson"), inspection.ndjson, "utf8");

const pptx = await PresentationFile.exportPptx(presentation);
await pptx.save(FINAL_PPTX);

console.log(FINAL_PPTX);
