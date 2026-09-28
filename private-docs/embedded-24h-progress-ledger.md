# Progress Ledger — Embedded 56 ข้อ + Q56 (เริ่ม 28 ก.ย. 2026)

## Target checkout (แก้จริงที่นี่เท่านั้น)
- `/Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/.claude/worktrees/thai-exam-portal-ux-db7a64/1/final/real-exam-recalled/index.html` (worktree, 215461 bytes, assets v3.0 + theme-boot.js)
- `/Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/.claude/worktrees/thai-exam-portal-ux-db7a64/1/final/index.html`
- `/Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/.claude/worktrees/thai-exam-portal-ux-db7a64/1/final/interactive-tools/index.html`
- `/Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/.claude/worktrees/thai-exam-portal-ux-db7a64/1/final/fsm-sliding-door-project/index.html`
- `/Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/.claude/worktrees/thai-exam-portal-ux-db7a64/assets/css/main.css` (29016 bytes), `solution.css`, `assets/js/main.js`, `assets/js/theme-boot.js`
- Branch worktree: claude/thai-exam-portal-ux-db7a64 (f9a8716). ไม่ reset/clean/merge

## Comparison only (ห้ามทับ)
- `/Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/final/real-exam-recalled/index.html` (221883 bytes, assets v2.3)
- `/Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/final/index.html`
- `/Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/final/interactive-tools/index.html`
- `/Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/final/fsm-sliding-door-project/index.html`
- Branch main: f0175ae. โฟลเดอร์ 1/final/, 1/mini-project/, 1/LAB/ ยัง untracked

## ผลตรวจเบื้องต้น (ยืนยันด้วย grep/ls แล้ว)
- 56/56 anchors q1-q56 + solution-card 56 ใบ ตรงกันทั้งสองชุด
- worktree = v3.0 + theme-boot.js / main-1/final = v2.3 ไม่มี theme-boot.js — ห้ามทับ CSS/JS ข้ามรุ่น
- Q56 worktree ยังเป็น 5 สถานะ CLOSED/OPENING/OPEN/HOLD/CLOSING + dwell timeout + P2.0 limit OPEN/P2.1 limit CLOSE/P2.2 object/P1.2-3 motor — ขัดสเปกปัจจุบัน (7+FAULT, P2.0 PB_IN, P2.1 PB_OUT, P2.2 BEAM_DET 0=ขาด, P2.3 LO, P2.4 LC, P2.5 PB_CLOSE, P2.7 ESTOP 1=หยุด, P1.0 IN1, P1.1 IN2, P1.2 RUN_N, P1.4-6 LED active-low, P0=F8H OR State, codes ECH/D9H/DCH/EAH/FCH/D9H/BCH/FCH, ไม่มี auto-close) — ต้องแก้ก่อนเพิ่มบทเรียน
- OCR: main มี ocr_page_1-6.txt + ภาพครบ / worktree มีแค่ ocr_page_2.txt — ตรวจโจทย์ต้องใช้ชุด main
- ป้าย “เฉลยฉบับวิศวกรรม” ที่ q56 ไม่ใช่หลักฐานความถูกต้อง

## รอบงาน
- [in_progress] R1 survey: 4 subagents ขนาน (coverage 56, source catalog, Q56 audit, web-tech audit) — deleg_c0b2b566
- [pending] R2 pilot 3 ข้อ (พื้นฐาน+คำนวณ+Q56) + เปิด browser
- [pending] R3 แก้ Q56 ตามสเปกปัจจุบัน
- [pending] R4 บทเรียน q1-q56 + accordion + แบบฝึก
- [pending] R5 interactive + เส้นทาง 24 ชม. + ตรวจ 5 มุม

## งานถัดไปหลัง subagents กลับมา
1. รวม coverage matrix + source map เป็นไฟล์ตรวจนับ 56 ข้อ
2. เลือกข้อ pilot แล้วลงมือแก้ worktree ทันที
