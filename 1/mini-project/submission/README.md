# Official Submission Manifest: Sliding Door Safety Control

## Project Metadata
- **Project Title:** Single-Panel Residential Sliding Door with Photoelectric Obstacle Detection and Automatic Reopening
- **Thai Title:** ระบบประตูเลื่อนบานเดี่ยวพร้อมโฟโต้เซนเซอร์ตรวจจับสิ่งกีดขวางและเปิดกลับอัตโนมัติ
- **Course:** 305341 Embedded Systems 1
- **Authors:** นายธีรภัทร ภู่ระย้า (Theeraphat Phuraya), นางสาวปราณปรียา ศรียอง (Pranpriya Sriyong)
- **Instructor:** ดร.แสงชัย มังกรทอง (Dr. Saengchai Mangkornthong)
- **Status:** **FINAL OFFICIAL SUBMISSION (VERSION 2)** — Submitted to instructor.
- **Canonical Files in this Directory:**
  - `Sliding_Door_Safety_Control_Infrared_FSM.pdf` (Official Presentation Deck PDF)
  - `Sliding_Door_Safety_Control_Infrared_FSM.pptx` (Official Presentation Deck PPTX with full Thai speaker notes)
  - `firmware/SLIDING_DOOR_V2.asm` (Official production-ready 8051 assembly firmware)
  - `firmware/SLIDING_DOOR_EXAM_SKELETON.asm` (Exam-length ~85 lines assembly answer for Final Exam Q56)
  - `SPECIFICATION.md` (Detailed hardware pinout, port contract, FSM state table, timing rules)

---

## Notice for AI Agents & Collaborators (Single Source of Truth)
1. **Canonical Scope:** This directory (`embedded-system/1/mini-project/submission/`) contains the single source of truth for the mini-project.
2. **Do Not Confuse with Iteration Folders:** Files under `output/` or `output/version2/` represent iterative working workspaces used during collaborative prompt engineering. The official files here represent what was finalized and submitted.
3. **Exam Alignment:** All final exam questions (especially Question 56 in `embedded-system/1/final/`) MUST strictly reference the pinouts, port contract, 7-state FSM, and assembly logic documented in this submission directory.

---

## Core System Architecture Summary
- **Controller:** Classic 8051 / AT89S52 @ 12.000 MHz (12T architecture, 1 machine cycle = 1 µs).
- **Driver:** L293D H-Bridge Quad Half-H Driver (logic 5 V, motor 12 V).
- **Safety Interlock:**
  - P1.2 `RUN_N` is active-low. Inverted by SN74HCT14 to feed L293D `EN1`.
  - When MCU resets or P1.2 = 1, `EN1` = 0 (Motor coast / high-Z).
  - Hardware E-stop NC1 contact is wired directly in series with L293D `EN1` to guarantee hardware-level cut-off.
- **Photoelectric Detection:**
  - Omron E3Z-T61 Through-Beam (Light-ON mode, 12 V_S) + Vishay VO617A Optocoupler + SN74HCT14 Schmitt Inverter.
  - Signal connected to `P2.2` (`BEAM_DET`).
  - Logic: 1 = Beam Clear (Light passes), 0 = Obstacle / Beam Interrupted.
- **Door Movement Logic:**
  - Manual buttons: `PB_IN` (P2.0), `PB_OUT` (P2.1), `PB_CLOSE` (P2.5).
  - No automatic-close timer (residential sliding door security policy).
  - On obstacle during `CLOSING`: Cut enable immediately, enter `REV_WAIT` for >= 200 ms (coast), then enter `REOPENING` to drive door CW back to open limit `LO`.
  - Upon reaching `LO`: transitions to `SAFETY_HOLD` (Orange LED ON, P1 = BCH), requiring manual inspection, PB_CLOSE release qualification (>= 20 ms), and fresh press with clear beam before re-closing.
