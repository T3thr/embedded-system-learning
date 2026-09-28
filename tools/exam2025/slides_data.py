"""Catalogue of the real lecture / lab / textbook pages the 2025 exam page cites.

SOURCES  : where each page comes from (file under 1/, page count, section outline in course order)
SLIDES   : one entry per cited page: title, section index, what the picture shows, captured text.

Text was transcribed by hand from the rendered page image (the PDFs are screenshots, so they have no text layer)
and cross-checked against the OCR markdown in 1/lecture/*-markdown. Book pages carry short excerpts only.
Page numbers are PDF page numbers (book printed page numbers differ: see BOOK_OFFSET note in each entry).
"""

SOURCES = {
    "L1": dict(name="Lecture 1", full="Lecture 1 · Embedded System และสถาปัตยกรรม 8051", file="lecture/Lecture1.pdf", kind="slide", total=33,
               sections=["ภาพรวมระบบฝังตัว", "Microprocessor กับ Microcontroller", "Von Neumann, Harvard, RISC, CISC", "โครงสร้าง 8051", "คุณสมบัติ 8051 (clock, bus, register)", "PSW และการบรรจุชิป"]),
    "L2": dict(name="Lecture 2", full="Lecture 2 · Pin diagram และ PSW", file="lecture/Lecture 2.pdf", kind="slide", total=11,
               sections=["คุณสมบัติและขาของ 8051", "Program Status Word (PSW)"]),
    "L3": dict(name="Lecture 3", full="Lecture 3 · หน่วยความจำ, Stack และ SFR", file="lecture/Lecture 3.pdf", kind="slide", total=13,
               sections=["Memory organization", "Internal RAM", "Stack", "Special Function Registers (SFR)", "หน่วยความจำภายในและภายนอก"]),
    "L4": dict(name="Lecture 4", full="Lecture 4 · Assembler และชุดคำสั่ง 8051", file="lecture/Lecture 4.pdf", kind="slide", total=31,
               sections=["เครื่องมือพัฒนาและ directive", "Addressing mode", "คำสั่ง Boolean, Move, Stack", "คำสั่ง Jump, Call, Return"]),
    "L5": dict(name="Lecture 5", full="Lecture 5 · Timer และ Counter", file="lecture/Lecture 5.pdf", kind="slide", total=21,
               sections=["แนวคิด Timer และ Counter", "การโหลดค่านับและการทำงาน", "รีจิสเตอร์ TCON และ TMOD", "วงจรภายใน Timer/Counter", "โหมด 0 ถึง 3", "การเขียนโปรแกรม Timer"]),
    "L6": dict(name="Lecture 6", full="Lecture 6 · Serial, Interrupt และ Power saving", file="lecture/Lecture 6.pptx", kind="slide", total=20,
               sections=["Serial communication และ SCON", "พื้นฐาน Interrupt", "IE และ IP", "การเขียน ISR และ Vector table", "Power saving"]),
    "LAB3": dict(name="Lab 3", full="Lab 3 · Hardware block diagram (DC motor และไฟจราจร)", file="lecture/Lab Hardware Block Diagram.pptx", kind="slide", total=15,
                 sections=["ความรู้พื้นฐาน DC motor", "ทิศทางและ H-bridge", "ความเร็วด้วย PWM และไดรเวอร์ L293D", "ฮาร์ดแวร์ไฟจราจร (8051)"]),
    "LSM": dict(name="Lab 5", full="Lab 5 · Coding State Machine Diagram", file="lecture/Lecture Progroming for a state machine.pdf", kind="slide", total=14,
                sections=["Traffic 1 (Ready / Go)", "Traffic 2 (เพิ่ม Prepare)", "Traffic 3 (เพิ่ม Wait และ ESP32)"]),
    "MZ16": dict(name="Mazidi บทที่ 16", full="Mazidi (AVR) บทที่ 16 · PWM และ DC motor", file="textbook/avr-microcontroller-and-embedded-systems-by-ali-mazidi.pdf", kind="book", total=781,
                 sections=["DC motor และ H-bridge (16.1)", "PWM (16.1)"]),
    "MZ11": dict(name="Mazidi บทที่ 11", full="Mazidi (AVR) บทที่ 11 · Serial port", file="textbook/avr-microcontroller-and-embedded-systems-by-ali-mazidi.pdf", kind="book", total=781,
                 sections=["Baud rate"]),
    "UCB3": dict(name="Lee & Seshia บทที่ 3", full="Lee & Seshia · Introduction to Embedded Systems บทที่ 3", file="textbook/Introduction-to-Embedded-Systems_UC-Berkeley.pdf", kind="book", total=511,
                 sections=["Finite-state machines"]),
}

SLIDES = {}


def S(src, page, title, sec, shows, text, thumb=None, note=""):
    key = f"{src}-{page:02d}" if SOURCES[src]["kind"] == "slide" else f"{src}-{page}"
    SLIDES[key] = dict(src=src, page=page, title=title, sec=sec, shows=shows, text=text.strip("\n"), thumb=thumb, note=note)


# ------------------------------------------------------------------ Lecture 1
S("L1", 18, "Architecture of 8051 Microcontroller", 4,
  "แผนผังบล็อกภายในชิป: CPU, ROM 4 KB, RAM 128 ไบต์, SFR, Timer 0 และ Timer 1 (มีช่อง Counter 0/1 Input), Interrupt Control, Bus Control, I/O Ports P0–P3 และ Serial Port (TXD, RXD) ดูว่าทุกอย่างรวมอยู่ในชิปตัวเดียว",
  """Architecture of 8051 Microcontroller
- 8 bit microcontroller
- Internal ROM 4 Kbyte, 000H to FFFH
- Internal RAM 128 byte, 00H to 7FH
- Two timer for timing delays
- 4 General Input port P0 to P3
- Internal Serial Port TXD and RXD
[แผนผัง] External Interrupts, Interrupt Control, 4 Kbyte ROM, SFR, 128 byte RAM,
Timer 0 (Counter 0 Input), Timer 1 (Counter 1 Input), CPU, OSC (XTAL1, XTAL2),
Bus Control, I/O Ports (P0 P1 P2 P3), Serial Port (TXD, RXD), EA, ALE, PSEN, Vcc, Reset, Gnd""")

S("L1", 19, "Feature of 8051 (clock)", 5,
  "วงจรคริสตัลต่อที่ขา XTAL1/XTAL2 พร้อมตัวเก็บประจุ 30 pF สองตัว และรูปคลื่นสี่เหลี่ยมที่ได้ นี่คือต้นกำเนิดของ clock ที่ Timer ใช้นับ",
  """Feature of 8051
- Operating frequency range is from 1 MHz to 16 MHz.
[วงจร] C2 30 pF, C1 30 pF, XTAL 1, XTAL 2, GND
Crystal Frequency = 11.0592 MHz""")

S("L1", 20, "Feature of 8051 (bus)", 5,
  "CPU 8 บิตต่อกับ Data bus 8 บิต และ Address bus 16 บิต ทำให้ระบุแอดเดรสได้ 64 KB (แอดเดรส 16 บิตคือเหตุผลที่ PC และ Vector address ยาว 16 บิต)",
  """Feature of 8051
- Data bus size is 8 bit
- Address bus size is 16 bit
[แผนผัง] CPU --- 8 bit Data Bus / 16 bit Address Bus
Maximum memory size is 2^16 or 64 Kbytes""")

S("L1", 22, "Feature of 8051 (A, B, PSW, SP)", 5,
  "รีจิสเตอร์ 8 บิตของ ALU (A, B), PSW และ Stack Pointer SP ที่ชี้แอดเดรส 07H ในรูปวาดหน่วยความจำ Stack อยู่ใน Internal RAM",
  """Feature of 8051
- 8 bit ALU having registers A (8 bit) which is called as an accumulator and
  register B (8 bit) called as math register.
- 8 bit Program status word register (PSW)
- 8 bit stack pointer register (SP)
[รูป] SP = 0x07 ชี้ไปที่แอดเดรส 0x007 ของหน่วยความจำ
Stack memory is in Internal RAM and the top of stack is address of 07H""")

S("L1", 23, "Feature of 8051 (Program Counter)", 5,
  "PC 16 บิต (ตัวอย่างค่า 0x009) ส่งแอดเดรสไปยัง Address bus เพื่ออ่านคำสั่งที่แอดเดรสนั้นในหน่วยความจำโปรแกรม (ตัวอย่างอ่านได้ 54H) นี่คือรีจิสเตอร์ที่ข้อ 15 ถาม",
  """- 16 bit program counter register (PC)
[รูป] PC = 0X009 --Address Bus--> หน่วยความจำ แอดเดรส 0x009 เก็บค่า 54H
Internal/External Program Memory""")

# ------------------------------------------------------------------ Lecture 2
S("L2", 6, "PSW Program Status Word Register of 8051", 2,
  "รูปแบบ 8 บิตของ PSW จาก D7 ถึง D0 ให้ดูบิต P ที่ D0 (Parity) ซึ่งเป็นฐานของคำว่า parity bit ในข้อ 12",
  """PSW Program Status Word Register of 8051
- Format of Program Status Word Registor
D7 D6 D5 D4 D3 D2 D1 D0
CY AC F0 RS1 RS0 OV - P""")

S("L2", 11, "PSW: OV และ Parity flag", 2,
  "ตัวอย่างบิต P: ข้อมูล 10010100 มีเลข 1 สามตัว (คี่) ได้ P = 1 ส่วน 11010100 มีเลข 1 สี่ตัว (คู่) ได้ P = 0",
  """- OV Overflow flag is set to 1 when the result of operation is greater
  than 8 bits or can be stored in 8 bit registors
- P Parity Flag set or cleared by hardware during instruction cycle to
  indicate even(P=0) or odd(P=1) of 1 bit in accumulator
[ตัวอย่าง] 10010100  P=1
           11010100  P=0""")

# ------------------------------------------------------------------ Lecture 3
S("L3", 9, "Stack of 8051", 3,
  "กลไก Stack แบบ LIFO ที่ใช้ SP ชี้ตำแหน่งบนสุด มีตัวอย่าง PUSH R1, PUSH R2, POP R3, POP R4 และภาพหน่วยความจำก่อนและหลังแต่ละคำสั่ง ข้อความบรรทัดที่ 3 บอกว่า Stack ใช้เก็บ return address ของ ISR และซับรูทีน",
  """Stack of 8051
- Stack of 8051 operating with respect to only memory of Internal RAM of 8051 microcontroller.
- Stack memory works as per LIFO {Last In First Out}.
- Stack is used to store return address during ISRs and Subroutines.
- Stack is also used by programmer using PUSH and POP instructions.
- Top of stack is pointed by SP register.
- SP is 8 bits register.
- On RESET of 8051, SP holds 07H address.
- Programmer can change the SP address as per their requirement. Range is available from 00H to 7FH
  as internal RAM size is of 128 bytes.
  MOV SP,#20H    ;SP holds 20H address of RAM
- Program to access stack memory using PUSH and POP
  MOV R1,#11H    ;R1 <- 11H
  MOV R2,#22H    ;R2 <- 22H
  MOV SP,#2FH    ;SP <- 2FH
  PUSH R1        ;Push R1 on stack
  PUSH R2        ;Push R2 on stack
  POP R3         ;POP R3 from stack
  POP R4         ;POP R4 from stack""")

S("L3", 12, "SFR of 8051 (ตารางที่อยู่ SFR)", 4,
  "ตาราง SFR ทั้ง 21 ตัว พร้อมแอดเดรสไบต์และแอดเดรสบิต ใช้หาแอดเดรสของ TCON (88H), TMOD (89H), TL0/TH0 (8AH/8CH), TL1/TH1 (8BH/8DH), SCON (98H), SBUF (99H), IE (A8H), IP (B8H)",
  """SFR of 8051
Name  Function                        Byte Add   Bit Add
A     Accumulator                     E0H        E7 - E0H
B     Arithmetic (Mul. & Div.)        F0H        F7 - F0H
PSW   Flag Register                   D0H        D7 - D0H
SP    Stack Pointer                   81H        NA
DPL   Address External Memory         82H        NA
DPH   Address External Memory         83H        NA
P0    IO Latch Port                   80H        87 - 80H
P1    IO Latch Port                   90H        97 - 90H
P2    IO Latch Port                   A0H        A7 - A0H
P3    IO Latch Port                   B0H        B7 - B0H
SCON  Serial Port Control             98H        9F - 98H
SBUF  Serial Port Data Buffer         99H        NA
TCON  Timer/Counter Control           88H        8F - 88H
TMOD  Timer/Counter Mode Control      89H        NA
TL0   Timer 0 Lower Byte              8AH        NA
TL1   Timer 1 Lower Byte              8BH        NA
TH0   Timer 0 Higher Byte             8CH        NA
TH1   Timer 1 Higher Byte             8DH        NA
IE    Interrupt Enable                A8H        AF - A8H
IP    Interrupt Priority              B8H        BF - B8H
PCON  Power Control                   87H        NA""")

# ------------------------------------------------------------------ Lecture 4
S("L4", 21, "Boolean Instruction: SETB, CLR, CPL", 3,
  "คำสั่งตั้ง/ล้าง/กลับบิตเดี่ยว เช่น SETB P0.2 และ CLR P0.2 ใช้ควบคุมขาพอร์ตทีละบิต (ข้อ 21 ใช้ SETB P1.1 / CLR P1.0 เปิดปิดไฟ)",
  """Boolean Instruction
- Set, Clear & Complement Carry instructions
  SETB C - It will make Carry Flag = 1
  CLR C  - It will make Carry Flag = 0
  CPL C  - It will Complement Carry Flag
- Set, Clear & Complement Bit instructions
  SETB - It will make given bit = Logic '1'
    SETB P0.2   ; P0.2 <- 1
    SETB 07H    ; 07H bit location in RAM <- 1
  CLR - It will make given bit = Logic '0'
    CLR P0.2    ; P0.2 <- 0
    CLR 07H     ; 07H bit location in RAM <- 0
  CPL - It will make given bit = complement of initial value
    CPL P0.2    ; P0.2 will get complemented
    CPL 07H     ; 07H bit location in RAM will get complemented""")

S("L4", 23, "Data Transfers: MOV", 3,
  "รูปแบบคำสั่ง MOV ทุกแบบ ดูแถว MOV A,#50H และ MOV R1,#50H ซึ่งเป็นรูปแบบ immediate เดียวกับ MOV TH0,#0FFH และ MOV R1,#10 ที่ใช้ในเฉลย",
  """Data Transfers
- Move instructions
  MOV - It will move data from one location to another location.
  MOV A, #50H       ; A <- 50H
  MOV A, R1         ; A <- R1
  MOV A, 50H        ; A <- [50H]
  MOV A, @R1        ; A <- [R1]
  MOV R1, A         ; R1 <- A
  MOV R1, #50H      ; R1 <- 50H
  MOV R1, 50H       ; R1 <- [50H]
  MOV 50H, R1       ; [50H] <- R1
  MOV 50H, 40H      ; [50H] <- [40H]
  MOV 50H, @R1      ; [50H] <- [R1]
  MOV @R1, A        ; [R1] <- A
  MOV @R1, #25H     ; [R1] <- 25H
  MOV @R1, 25H      ; [R1] <- [25H]
  MOV DPTR, #2525H  ; DPTR <- 2525H
  MOVX A, @R1       ; A <- [00-R1] from External RAM
  MOVX A, @DPTR     ; A <- [DPTR] from External RAM
  MOVX @R1, A       ; [00-R1] <- A for External RAM
  MOVX @DPTR, A     ; [DPTR] <- A for External RAM
  MOVC A, @A+DPTR   ; A <- [A+DPTR] for ROM
  MOVC A, @A+PC     ; A <- [A+PC] for ROM""")

S("L4", 26, "JMP and Call in 8051", 4,
  "แผนภาพเทียบ JMP กับ CALL: JMP ไปแล้วไม่กลับ (PC ← L1) ส่วน CALL จะ PUSH PC เก็บแอดเดรสถัดไปลง Stack แล้วกระโดด และ RET จะ POP PC กลับมา เป็นกลไกเดียวกับการเข้า-ออก ISR ในข้อ 15",
  """JMP and Call in 8051
JMP:  Program -> LJMP L1 -- PC <- L1 --> L1: Address
CALL: Program -> LCALL L1 -- PUSH PC ; PA on stack, PC <- L1 --> L1: Address
      ... RET -- POP PC ; PA on PC
      (Physical Address of Next instruction in PC)""")

S("L4", 28, "RET and RETI", 4,
  "ตารางเทียบ RET (ซับรูทีนธรรมดา) กับ RETI (ISR) ทั้งสองทำ POP PC แต่ RETI ตั้ง EA = 1 เปิด interrupt กลับด้วย ดูบรรทัด Operation",
  """RET and RETI
RET
- Used with normal subroutine.
- With RET, 8051 just return back to main program from subroutine.
- Operation:
  POP PC ; PCH <- [SP]
         ; PCL <- [SP-1]
         ; SP <- SP - 2
RETI
- Used with ISR - Interrupt Service Routine
- With RETI, 8051 return back to main program + It will Enable Interrupt by making EA = 1.
- Operation:
  POP PC ; PCH <- [SP]
         ; PCL <- [SP-1]
         ; SP <- SP - 2
  EA <- 1""")

S("L4", 29, "Unconditional Jump instructions", 4,
  "ชุดคำสั่งกระโดดไม่มีเงื่อนไข SJMP (ช่วง -128 ถึง +127), AJMP (2 KB), LJMP (64 KB) ข้อ 21 ใช้ SJMP ReadyState วนกลับ",
  """Unconditional Jump instructions
- SJMP Label - It jump to location with respect to Label (8 bits).
  Range of SJMP is -128 to +127 locations.
  Final Address will be PC = PC + Label
- AJMP Label - It jump to location with respect to Label (8 bits).
  Range of AJMP is 2KB.
  Final Address will be PC = 1st 5 bits of PC + 3 bits of AJMP + Label.
- LJMP Label - It jump to location at Label (16 bits).
  It can jump anywhere in 64KB memory of 8051.
  Final Address will be PC = Label
- JMP @A+DPTR - It will jump to the location A + DPTR.""")

S("L4", 30, "Conditional Jump instructions (DJNZ)", 4,
  "คำสั่งกระโดดมีเงื่อนไข ดูบรรทัดแรก DJNZ R3, Label: ลดค่า R3 แล้วกระโดดถ้ายังไม่เป็นศูนย์ คือกลไกวนซ้ำ R1 = 10 รอบในข้อ 21",
  """Conditional Jump instructions
- DJNZ R3, Label - It will decrement R3, and jump to the Label only if R3 is not Zero.
- DJNZ 25H, Label - It will decrement [25H], and jump to the Label only if [25H] is not Zero.
- CJNE A, #25H, Label - It will compare A with #25H and jump to the Label only if A and #25H are not equal.
- CJNE A, 25H, Label - It will compare A with [25H] and jump to the Label only if A and [25H] are not equal.
- CJNE R2, #25H, Label - It will compare R2 with #25H and jump to the Label only if R2 and #25H are not equal.
- CJNE @R2, #25H, Label - It will compare [R2] with #25H and jump to the Label only if [R2] and #25H are not equal.
- JC Label - It will jump to Label if with previous instruction, carry flag is 1.
- JNC Label - It will jump to Label if with previous instruction, carry flag is 0.
- JZ Label - It will jump to Label if with previous instruction, Zero flag is 1.
- JNZ Label - It will jump to Label if with previous instruction, Zero flag is 0.""")

S("L4", 31, "Boolean Conditional Jump Instructions (JB, JNB, JBC)", 4,
  "คำสั่งกระโดดตามค่าบิต JB (กระโดดถ้าบิต = 1), JNB (กระโดดถ้าบิต = 0), JBC ข้อ 21 ใช้ JB P2.0, GoState อ่านปุ่ม ข้อ 9 ใช้ JNB TCON.5, Wait รอ TF0",
  """Boolean Conditional Jump Instructions
- JB P0.0, Label  - Jump to Label Only if P0.0 = 1
- JNB P0.0, Label - Jump to Label Only if P0.0 = 0
- JBC P0.0, Label - Jump to Label Only if P0.0 = 1 and also make P0.0 = 0""")

# ------------------------------------------------------------------ Lecture 5
S("L5", 2, "Timer and Counter of 8051 (Timer working / Counter working)", 1,
  "รูปวาดมือสองกรอบ ซ้าย Timer Working: T0 และ T1 รับ Clock จากกล่อง Osc. ภายในชิป ขวา Counter Working: T0 และ T1 รับ External Clock จากขา T0/T1 ภายนอก นี่คือภาพคำตอบของข้อ 1",
  """Timer and Counter of 8051
[รูปซ้าย] Timer Working: T0 <- Clock <- Osc. ; T1 <- Clock <- Osc.
[รูปขวา] Counter Working: T0 <- External Clock ; T1 <- External Clock (ขา T0, T1)""")

S("L5", 3, "Timer and Counter of 8051 (TH, TL)", 1,
  "แผนภาพต้นไม้ T0 แตกเป็น TH0 กับ TL0 และ T1 แตกเป็น TH1 กับ TL1 (ตอบข้อ 2 ตรงตัว)",
  """Timer and Counter of 8051
- 8051 has Two 16 bits Timers T0 & T1, working as up counters.
  T0 and T1 is further divided into 8bits of registers TH0-TL0 and TH1-TL1.
[แผนภาพ] T0 -> TH0, TL0 ; T1 -> TH1, TL1""")

S("L5", 4, "How to Load Count?", 2,
  "สูตรหัวใจของวิชานี้ Count = FFFFH - Value + 1 พร้อมตัวอย่างนับ 9 ได้ FFF7H และโค้ด MOV TH0,#FFH / MOV TL0,#F7H รูปล่างคือกล่อง COUNT ที่รับ clock",
  """How to Load Count?
- This Timers are Up counter.
- So, on given clock it will increment by 1.
- When it reaches to FFFFH, it will rolls back to 0000H and during
  that it will generates Timer Overflow interrupt.
  Count = FFFFH - Value + 1
- So, if you wants to count 9 then Count = FFFF - 9 + 1 = FFF7H
  MOV TH0, #FFH
  MOV TL0, #F7H
[รูป] COUNT <- Clock (คลื่นสี่เหลี่ยม)
- This count loaded in T0 or T1 will increment after every clock.""")

S("L5", 5, "Timer or Counter?", 1,
  "สไลด์นิยามตรง ๆ: clock ภายในคือ Timer, clock ภายนอกที่ T0 และ T1 คือ Counter และตั้งด้วยบิต T/C ของ TMOD",
  """Timer or Counter?
- If clock to the count is given by internal clock of 8051 then it
  will be timer and if clock is given by external clock on T0 and T1
  then it will counter.
- That is to be configured by TMOD register of 8051.
- T/C bit will decide timer or counter configuration of 8051.""")

S("L5", 6, "How Timer / Counter works?", 2,
  "แผนภาพลูกศรวงกลม: โหลด Count → นับเพิ่มทุก clock → เมื่อกลิ้งจาก FFFFH เป็น 0000H ตั้ง TF0/TF1 = 1 (เป็น interrupt) → ล้าง TF ก่อนกระโดดไป ISR Address → RETI กลับ",
  """- How Timer / Counter works?
Load Count in T0 or T1
Count will increase after every clock
When Count rolls from FFFFH to 0000H, it will make TF0 or TF1 bit to 1.
{It is interrupt to 8051}
Make TF0 or TF1 bit to 0 before it jumps to ISR Address
[แผนภาพ] ... -> ISR Address -> RETI""")

S("L5", 7, "TCON and TMOD Registers", 3,
  "สรุปว่า Timer/Counter คือ T0, T1 ที่แบ่งเป็น TH-TL และนับ clock ภายใน = Timer, ภายนอก = Counter ควบคุมด้วย TCON กับ TMOD",
  """TCON and TMOD Registers
- 8051 has Two 16 bits Timers T0 & T1, working as up counters.
  T0 and T1 is further divided into 8bits of registers TH0-TL0 and TH1-TL1.
- If T0 & T1 counts internal clock pulses, then it is timer.
- If T0 & T1 counts External clock pulses, then it is Counter.
- Timer action is controlled by TCON and TMOD registers.
- TCON register - {Bit Address TCON.7 to TCON.0}""")

S("L5", 9, "TCON register (TF, TR, IE, IT)", 3,
  "ตารางบิตของ TCON: TF1 TR1 TF0 TR0 IE1 IT1 IE0 IT0 พร้อมคำอธิบาย TF (overflow flag), TR (run control) และ IE (external interrupt) ตอบข้อ 3 และข้อ 5",
  """TCON register - {Bit Address TCON.7 to TCON.0}
TF1 | TR1 | TF0 | TR0 | IE1 | IT1 | IE0 | IT0
- TF1 and TF0 - Timer Overflow Flag
  SET 1 = When timer 1 and timer 0 overflows, when timer roll overs to all 0's.
  Clear 0 = When processor executes ISR after overflow.
  {For Timer 1 ISR address is 001BH and Timer 0 ISR address is 000BH}
- TR1 and TR0 - Timer Run Control Bit
  SET 1 = Start Counting Timer.
  Clear 0 = Halts Timer.
- IE1 and IE0 - External Interrupt bit
  SET 1 = when 8051 receives interrupt on INT1 and INT0.
  Clear 0 = when ISR executed.
  {For INT1 ISR address is 0013H and INT0 ISR address is 0003H}""")

S("L5", 10, "IT1 and IT0 - External Interrupt Type bit", 3,
  "นิยาม IT = 1 ให้ INT ทำงานที่ขอบขาลง (negative edge) และ IT = 0 ทำงานที่ระดับต่ำ ในรูปวาดมือ: เส้น Logic 1 ตกลงเป็น Logic 0 ตรงจุดตก คือ -ve edge trigger (ข้อ 6)",
  """IT1 and IT0 - External Interrupt Type bit
- SET 1 = INT1 and INT0 must be -ve edge trigger.
- Clear 0 = INT1 and INT0 must be low level trigger.
[รูปวาดมือ] Logic 1 ---\\___ Logic 0   (-ve edge trigger)""")

S("L5", 11, "TMOD register (GATE, C/T, M1, M0)", 3,
  "TMOD 8 บิต ครึ่งบนคุม Timer 1 ครึ่งล่างคุม Timer 0 พร้อมตาราง M1 M0 → Timer Mode 0/1/2/3 และนิยาม C/T (1 = Counter, 0 = Timer ที่ Fosc/12) ตอบข้อ 1, 7, 8",
  """TMOD register - Timer Mode Control register
GATE | C/T | M1 | M0 | GATE | C/T | M1 | M0
|-------- Timer 1 --------|-------- Timer 0 --------|
- C/T - Counter / Timer Type bit
  SET 1 = Acts as Counter. {External Frequency on T1 & T0}
  Clear 0 = Acts as Timer. {Internal Frequency Fosc/12}
- GATE - Gate Enable Control bit
  SET 1 = Timer Controlled by Hardware. {INTX Signal}
  Clear 0 = Timer independent on INTX signal.
- M1 & M0 - Mode Control bits
  M1 M0 | Timer Mode
   0  0 | Timer Mode 0
   0  1 | Timer Mode 1
   1  0 | Timer Mode 2
   1  1 | Timer Mode 3""")

S("L5", 12, "Work with Time/Counter (วงจร C/T)", 4,
  "วงจรภายใน: Oscillator ผ่านตัวหาร Fosc/12 เป็น Timer เมื่อสวิตช์ C/T = 0 หรือรับจากขา T0/T1 เป็น Counter เมื่อ C/T = 1 แล้วเข้า Count Stages โดยมีเกต TR0/TR1 และ INTX/GATE คุมการนับ",
  """Work with Time/Counter
- 8051 has Two 16 bits Timers T0 & T1, working as up counters.
- By C/T bit we can select timer and counter.
- In Timer, clock will be given by internal clock.
- In counter, clock will be given by T0 or T1 Pin of 8051.
[วงจร] Oscillator Frequency -> Fosc/12 -> (C/T = 0, Timer)
       T0 or T1 Pin -> (C/T = 1, Counter) -> Count Stages
       TR0 or TR1 AND (INTX OR NOT GATE) เปิดปิดการนับ
[บิต] TCON: TF1 TR1 TF0 TR0 IE1 IT1 IE0 IT0
      TMOD: GATE C/T M1 M0 (Timer 1) GATE C/T M1 M0 (Timer 0)""")

S("L5", 13, "Work with Time/Counter (TR และ GATE)", 4,
  "คำอธิบายเพิ่ม: ต้องตั้ง TR ใน TCON = 1 ตัวนับจึงจะเดิน ส่วน GATE = 1 จะให้ขา INT0/INT1 เป็นตัวเปิดปิดการนับ (ตอบข้อ 5 และ 8)",
  """Work with Time/Counter
- To have running counter, TR bit of TCON register must be 1.
- If Timer/Counter is triggered by external signal then GATE = 1 of TMOD register,
  which means Timer/Counter operation will get trigger by INTX (INT0 or INT1).
- If Timer 0 is configured then with GATE bit we use INT0 hardware interrupt to trigger Timer/Counter.
- If Timer 1 is configured then with GATE bit we use INT1 hardware interrupt to trigger Timer/Counter.
- If GATE bit is logic 1, then INTX pin will used for timer/Counter only.""")

S("L5", 14, "Pin diagram 8051 (T0 = P3.4, T1 = P3.5)", 4,
  "แผนผังขา 40 ขา ดูฝั่งซ้ายขา 14 (T0) P3.4 และขา 15 (T1) P3.5 คือขาที่ต่อสัญญาณ Counter ภายนอก และขา 12-13 (INT0, INT1) กับขา 10-11 (RXD, TXD) ที่ใช้ในข้ออื่น",
  """8051 pin diagram (40 pin DIP)
 1 P1.0            40 Vcc
 2 P1.1            39 P0.0 (AD0)
 3 P1.2            38 P0.1 (AD1)
 4 P1.3            37 P0.2 (AD2)
 5 P1.4            36 P0.3 (AD3)
 6 P1.5            35 P0.4 (AD4)
 7 P1.6            34 P0.5 (AD5)
 8 P1.7            33 P0.6 (AD6)
 9 RST             32 P0.7 (AD7)
10 (RXD) P3.0      31 EA/VPP
11 (TXD) P3.1      30 ALE/PROG
12 (INT0) P3.2     29 PSEN
13 (INT1) P3.3     28 P2.7 (A15)
14 (T0) P3.4       27 P2.6 (A14)
15 (T1) P3.5       26 P2.5 (A13)
16 (WR) P3.6       25 P2.4 (A12)
17 (RD) P3.7       24 P2.3 (A11)
18 XTAL2           23 P2.2 (A10)
19 XTAL1           22 P2.1 (A9)
20 GND             21 P2.0 (A8)""")

S("L5", 15, "Timer Mode 0 (13 bits)", 5,
  "โหมด 0: TLX ใช้ 5 บิต + THX 8 บิต = 13 บิต นับสูงสุด 8192 แล้วตั้ง TFX",
  """Modes of Timer and Counter
- Timer Mode 0 {13 bits Timer/Counter}
[แผนภาพ] Clock -> TLX [5] -> THX [8] -> TFX -> Interrupt
- TLX has 5 bits for count and THX has 8 bits for count. So in total, 13 bits of count is available in this mode 0.
- After 32 counts TLX rolls over and it will increment THX.
- So TLX will divides the frequency by 32.
- By this mode, total maximum count can be 2^13 = 8K.
- So maximum delay = 8192 (12/Fosc)""")

S("L5", 16, "Timer Mode 1 (16 bits)", 5,
  "โหมด 1 ที่ข้อสอบใช้: TLX 8 บิต + THX 8 บิต = 16 บิต ตั้ง TFX เมื่อกลิ้งจาก FFFFH เป็น 0000H นับสูงสุด 65,536 คูณ 12/Fosc",
  """Modes of Timer and Counter
- Timer Mode 1 {16 bits Timer/Counter}
[แผนภาพ] Clock -> TLX [8] -> THX [8] -> TFX -> Interrupt
- TLX and THX used completely here with Mode 1.
- On each clock 16 bits will increment by 1.
- TFX will set to 1, when all 16 bits rolls from FFFFH to 0000H.
- By this mode, total maximum count can be 2^16 = 64K.
- So maximum delay = 65536 (12/Fosc)""")

S("L5", 17, "Timer Mode 2 (8 bits auto reload)", 5,
  "โหมด 2: TLX นับ 8 บิต เมื่อล้น (FF → 00H) เกิดสองเหตุการณ์พร้อมกัน TFX ขอ interrupt และ THX โหลดค่ากลับเข้า TLX อัตโนมัติ (ลูกศรวนกลับในรูป)",
  """Modes of Timer and Counter
- Timer Mode 2 {8 bits Auto reload TL from TH}
[แผนภาพ] Clock -> TLX [8] -> TFX -> Interrupt ; THX [8] -> reload -> TLX
- TLX will increment on every count.
- When TLX rolls over from FFH to 00H, Two events are happening.
  1. TFX will give interrupt
  2. THX will reload TLX
- Maximum count = 2^8 = 256
- Maximum delay = 256 (12/Fosc)""")

S("L5", 19, "Timer Mode 3 (two 8-bit timers by Timer 0)", 5,
  "โหมด 3: แยก Timer 0 เป็นสอง Timer 8 บิต TL0 ให้ TF0 ส่วน TH0 ให้ TF1 (TH0 เป็น Timer อย่างเดียว)",
  """Modes of Timer and Counter
- Timer Mode 3 {Two 8 bits timer by Timer 0}
[แผนภาพ] Clock -> TL0 [8] -> TF0 -> Interrupt ; Clock -> TH0 [8] -> TF1 -> Interrupt
- TL0 and TH0 used with two separate timers.
- TL0 will give interrupt to TF0 flag bit of Timer 0.
- TL0 can be used as Timer and Counter.
- TH0 will give interrupt to TF1 flag bit of Timer 1.
- TH0 can only be used as Timer.""")

S("L5", 20, "Time Programming in 8051 (delay 20 us)", 6,
  "ตัวอย่างเขียนโปรแกรม delay 20 µs: TMOD = 00000001B, Count = 20 = 14H, FFFFH - 14H + 1 = FFECH ได้ TL0 = ECH TH0 = FFH แล้วโค้ดจริงด้านขวา คือแม่แบบเดียวกับข้อ 4 และข้อ 9",
  """Time Programming in 8051
- Write a program to Generate delay of 20 uSec and send logic 1 on P2.0. Assume Fosc = 12MHz
- For Timer 0 with Mode 1 as 16 bits timer, TMOD = 0000 0001B
- To start Timer 0 with mode 1, TCON = 0001 0000B
- To stop timer 0 with mode 1, TCON = 0000 0000B
- To calculate Count, one count time = 12/Fosc = 1uSec.
- So value of Count = 20 = 14H
- As timer is up counter actual value should be loaded will be
  Count = FFFFH - 14H + 1 = FFECH
- TL0 = ECH and TH0 = FFH, to be loaded for delay of 20uSec.

        MOV TMOD, #00000001B   ;Timer 0 Mode 1
        MOV TL0, #ECH          ;Count 20 = 14H
        MOV TH0, #FFH
        MOV TCON, #00010000B   ;Start Timer
Wait:   JNB TCON.5, Wait       ;wait for 20uSec
        SETB P2.0              ;logic '1' on P2.0
        MOV TCON, #00000000B   ;Stop Timer
Here:   SJMP Here              ;End of Program""")

S("L5", 21, "Time Programming 2 (square wave 1 kHz)", 6,
  "ตัวอย่างสร้างคลื่นสี่เหลี่ยม 1 kHz: คาบ 1 ms ครึ่งคาบ 0.5 ms = 500 = 1F4H → FFFFH - 1F4H + 1 = FE0CH ได้ TH0 = FEH, TL0 = 0CH รูปบนขวาคือคลื่นที่ได้ ตรงกับตัวอย่างเสริมท้ายข้อ 4 ในสมุด",
  """Time Programming 2
- Write a program to Generate square wave of 1KHz on TxD pin. Assume Fosc = 12MHz
- Square wave of 1KHz has time = 1msec.
- So for 0.5msec, It should be high and for 0.5msec, it should be low.
- To calculate Count, one count time = 12/Fosc = 1uSec.
- So value of Count = 0.5msec/1uSec = 500 = 1F4H
- As timer is up counter actual value should be loaded will be
  Count = FFFFH - 1F4H + 1 = FE0CH
- TL0 = 0CH and TH0 = FEH

        CLR P3.1                ;Clear TxD line
Repeat: MOV TMOD, #00000001B    ;Timer 0 Mode 1
        MOV TL0, #0CH           ;Count 500 = 1F4H
        MOV TH0, #FEH
        MOV TCON, #00010000B    ;Start Timer
Wait:   JNB TCON.5, Wait        ;wait for 0.5mSec
        CPL P3.1                ;Square wave
        MOV TCON, #00000000B    ;Stop Timer
        SJMP Repeat             ;Repeat of Program""")

# ------------------------------------------------------------------ Lecture 6
S("L6", 2, "Serial Communication (SBUF, TxD, RxD)", 1,
  "แผนภาพ Processor ต่อกับ SBUF สองชุด: ชุดส่งออกทางขา TxD (P3.1) มีแฟล็ก Ti และชุดรับเข้าทางขา RxD (P3.0) มีแฟล็ก Ri ข้อความขวาบอกว่าตั้งค่าด้วย SCON",
  """Serial Communication
[แผนภาพ] Processor <-> SBUF (Ti) -> TxD Pin {P3.1} ; RxD Pin {P3.0} -> SBUF (Ri) <-> Processor ; 8051 Microcontroller
- For Serial Communication, 8051 has two pins: TxD {P3.1} for serial transmission and RxD {P3.0} for serial reception.
- SBUF register {8 bits} will give and take data serially for serial communication on TxD and RxD.
- In serial communication, 1st it will send/receive LSB and at last it will send/receive MSB.
- To configure serial communication, we need to configure SCON register of 8051.""")

S("L6", 3, "Serial Communication (Ti, Ri interrupt)", 1,
  "แผนภาพการทำงานเมื่อส่ง/รับครบ 1 ไบต์: Ti = 1 เข้า ISR แล้ว MOV SBUF, A / CLR Ti และ Ri = 1 เข้า ISR แล้ว MOV A, SBUF / CLR Ri",
  """Serial Communication
[ซ้าย] Program -> Interrupt Ti = 1 -> ISR Program: MOV SBUF, A ; CLR Ti -> กลับ Program
[ขวา] Program -> Interrupt Ri = 1 -> ISR Program: MOV A, SBUF ; CLR Ri -> กลับ Program
- Once, 1Byte transmission is completed, Ti interrupt tells processor 8 bits transmission is completed.
- Once, 1Byte Reception is completed, Ri interrupt tells processor 8 bits reception is completed.""")

S("L6", 4, "SCON registers: SM0, SM1 และตารางโหมด", 1,
  "บิตของ SCON: SM0 SM1 SM2 REN TB8 RB8 TI RI และตารางโหมดซีเรียล: Mode 0 Shift Register (Fosc/12), Mode 1 8-bit UART, Mode 2 9-bit UART (Fosc/32 หรือ Fosc/64), Mode 3 9-bit UART ตอบข้อ 10, 11, 12",
  """SCON registers
SCON Serial Control register - {Bit Address SCON.7 to SCON.0}
SM0 | SM1 | SM2 | REN | TB8 | RB8 | TI | RI
- SM0 & SM1 - Mode Control bits
SM0 SM1 | Serial Mode | Description    | Baud Rate
 0   0  | Mode 0      | Shift Register | Fosc/12
 0   1  | Mode 1      | 8 bit UART     | Variable
 1   0  | Mode 2      | 9 bit UART     | Fosc/32 or Fosc/64
 1   1  | Mode 3      | 9 bit UART     | Variable""")

S("L6", 5, "SCON registers: รูปเฟรมของแต่ละโหมด", 1,
  "รูปเฟรมข้อมูล: Mode 0 มีแต่ D0-D7, Mode 1 มี Start 0 + D0-D7 + Stop 1, Mode 2 และ 3 มี Start 0 + D0-D7 + P (บิตที่ 9) + Stop 1 ภาพนี้คือเฉลยข้อ 11 และ 12 ทั้งข้อ",
  """SCON registers
- Mode 0 {Shift Register sends only data}
  D0 D1 D2 D3 D4 D5 D6 D7
- Mode 1 {8 Bit UART, 1st Start bit 0, then 8bits data and at last stop bit 1}
  0 D0 D1 D2 D3 D4 D5 D6 D7 1
- Mode 2 & 3 {9 Bit UART, 1st Start bit 0, then 8 bits data, 1 bit parity and at last stop bit 1}
  0 D0 D1 D2 D3 D4 D5 D6 D7 P 1""")

S("L6", 6, "SCON registers: SM2, REN, TB8, RB8", 1,
  "อธิบายบิต REN (เปิดรับ), TB8 (บิตที่ 9 ที่ส่ง) และ RB8 (บิตที่ 9 ที่รับ) ใน Mode 2 และ 3 คือ parity ที่โปรแกรมเมอร์กำหนดเอง",
  """SCON registers
- SM2 - Enables Multiprocessor System with Mode 2 and Mode 3.
- REN - Receiver Enable
  REN = 0, receiver disabled
  REN = 1, receiver enabled
- TB8 - Transmitted bit 8 {Technically it is programmable 9th bit in mode 2 and 3}
  Mode 0 - not used
  Mode 1 - stop bit '1'
  Mode 2 & 3 - Parity bit, programmed by programmer.
- RB8 - Received bit 8 {Technically it is programmable 9th bit in mode 2 and 3}
  Mode 0 - not used
  Mode 1 - stop bit '1'
  Mode 2 & 3 - Parity bit, programmed by programmer.""")

S("L6", 7, "SCON registers: RI และ TI", 1,
  "บิต RI (รับครบ 8 บิตแล้วเป็น 1) และ TI (ส่งครบ 8 บิตแล้วเป็น 1) ทั้งสองต้องถูกล้างโดยโปรแกรมเมอร์ใน ISR",
  """SCON registers
- RI - Receive Interrupt
  It will be one after SBUF receives 8 bits data.
  RI will be cleared by programmer in ISR program.
- TI - Transmit Interrupt
  It will be one after SBUF transmits 8 bits data.
  TI will be cleared by programmer in ISR program.""")

S("L6", 8, "Basics of Interrupts", 2,
  "สไลด์ตอบข้อ 13 และ 14: 8051 มี 5 interrupt ทั้งหมดเป็น vectored แบ่งเป็น 3 ประเภท คือ ฮาร์ดแวร์ภายนอก 2 (INT0, INT1) Timer overflow ภายใน 2 (TF0, TF1) และ Serial ภายใน 1 (RI หรือ TI ใช้ร่วมกัน)",
  """Basics of Interrupts
- 8051 has five interrupts and all are vectored interrupt.
- Two Hardware interrupts : INT0 and INT1
- Two Timer Overflow internal Interrupts : TF0 and TF1
- Serial Communication internal Interrupt : Common for RI and TI
- All the interrupts are controlled by IE and IP registers.""")

S("L6", 9, "Basics of Interrupts (PUSH PC, POP PC, ตาราง Priority)", 2,
  "ซ้าย: เมื่อเกิด interrupt โปรแกรมกระโดดไป ISR โดย PUSH PC เก็บที่อยู่เดิม และ RETI จะ POP PC กลับมา (ข้อ 15) ขวา: ตาราง Priority และ Vector Address ของทั้ง 5 interrupt (ข้อ 13, 16, 18)",
  """Basics of Interrupts
[แผนภาพ] Program -> Interrupt -> ISR Program (PUSH PC) ... POP PC -> RETI -> กลับ Program
Priority and Vector Address of Interrupts in 8051
Interrupt        | Priority | Vector Address
INT0             | 1        | 0003H
TF0              | 2        | 000BH
INT1             | 3        | 0013H
TF1              | 4        | 001BH
Serial (RI or TI)| 5        | 0023H""")

S("L6", 10, "IE registers", 3,
  "บิตของ IE: EA - ET2 ES ET1 EX1 ET0 EX0 คำอธิบายว่าแต่ละบิตเปิด interrupt ตัวไหน (1 = เปิด, 0 = ปิด) และตารางลำดับความสำคัญด้านล่าง ตอบข้อ 17",
  """IE registers
IE - Interrupt Enable Register {Bit Addressable IE.7 to IE.0}
EA | - | ET2 | ES | ET1 | EX1 | ET0 | EX0
- EA - Enable All, ET2 - Reserved, ES - Enable Serial, ET1 - Enable Timer 1,
  EX1 - Enable INT1, ET0 - Enable Timer 0 and EX0 - Enable INT0.
- To Enable it, make it 1
- To Disable it, make it 0
Priority and Vector Address of Interrupts in 8051 (ตารางเดียวกับหน้า 9)""")

S("L6", 11, "IP registers", 3,
  "บิตของ IP: - - PT2 PS PT1 PX1 PT0 PX0 กำหนดระดับ priority (1 = สูง, 0 = ต่ำ) ของ interrupt แต่ละตัว ตอบข้อ 17 (ชื่อเต็ม) และข้อ 18 (ลำดับ)",
  """IP registers
IP - Interrupt Priority Register {Bit Addressable IP.7 to IP.0}
- | - | PT2 | PS | PT1 | PX1 | PT0 | PX0
- PT2 - Reserved, PS - Priority Serial, PT1 - Priority Timer 1, PX1 - Priority INT1,
  PT0 - Priority Timer 0 and PX0 - Priority INT0.
- To have high Priority, make it 1
- To have low Priority, make it 0
Priority and Vector Address of Interrupts in 8051 (ตารางเดียวกับหน้า 9)""")

S("L6", 12, "ISR programming (โค้ดตัวอย่าง)", 4,
  "โค้ดตัวอย่างพร้อมแอดเดรสเครื่อง: org 0000H → AJMP start, org 0003H → AJMP count (vector ของ INT0), main เริ่มที่ 0030H ตั้ง IE และ setb TCON.0 (IT0 = 1 ขอบขาลง) ส่วน ISR ชื่อ count จบด้วย RETI",
  """ISR programming
        org 0000H
0000|   AJMP start
        org 0003H
0003|   AJMP count
;main
        org 0030H
start:
0030|   mov IE, 00000001B   ; set int0
0033|   setb TCON.0         ; set int type
0035|   MOV 40H, #00H
0038|   SJMP $              ; infinite Loop
count:
003A|   MOV A, 40H
003C|   INC A
003D|   MOV 40H, A
003F|   RETI
+ ตาราง Priority and Vector Address of Interrupts in 8051 (ตารางเดียวกับหน้า 9)""")

S("L6", 13, "Interrupts 8051 Vector Table", 4,
  "ตาราง Vector: Reset 0000 (ขา 9), Timer0 000B, Timer1 001B, INT0 0003 (ขา 12), INT1 0013 (ขา 13), Serial 0023 และคอลัมน์ Flag Clearing (Serial ต้องล้างเองโดยโปรแกรมเมอร์ ที่เหลือล้างอัตโนมัติ)",
  """Interrupts 8051 microcontroller Vector Table
Interrupts | Memory Location | Pin | Flag Clearing
Reset      | 0000            | 9   | Auto
Timer0     | 000B            |     | Auto
Timer1     | 001B            |     | Auto
INT0       | 0003            | 12  | Auto
INT1       | 0013            | 13  | Auto
Serial com | 0023            |     | Cleared by programmer""")

# ------------------------------------------------------------------ Lab 3 (hardware deck)
S("LAB3", 2, "DC Motor Basics (1)", 1,
  "สไลด์อาจารย์ ข้อความบรรทัดที่ 3 'By reversing supply of motor change its direction' คือคำตอบตรงตัวของข้อ 20 (กลับขั้วแหล่งจ่ายเปลี่ยนทิศทาง)",
  """DC Motor Basics
- It translates electrical pulse to mechanical movement
- It has only + and - terminals which rotate the motor in one direction
- By reversing supply of motor change its direction
- Maximum speed is indicated in rpm(round per minute)
- Nominal voltage will vary from 1 to 150 V. As DC Volage increases, Rpm also increases
- Current rating is the nominal current consumption with no load condition. It range from 25 mA to few Amp""")

S("LAB3", 3, "DC Motor Basics (2)", 1,
  "ผลของโหลดต่อความเร็วและกระแสของมอเตอร์ (ใช้ประกอบข้อ 19 ว่าทำไมต้องคุมกำลังไฟ)",
  """DC Motor Basics
- As the load increases the RPM is decreased unless voltage or current is increased
- With a fixed voltage as the load increases current consumption will also be increased
- If we overload the moter, it will halt and can demage the moter due to the heat""")

S("LAB3", 4, "Direction of DC motor", 2,
  "มอเตอร์สองชุดต่อแบตเตอรี่สลับขั้ว ซ้ายหมุน Clockwise ขวาหมุน Anticlockwise แสดงว่ากลับขั้วแล้วกลับทิศ",
  """Direction of DC motor
[รูป] MOTOR + แบตเตอรี่ต่อขั้วหนึ่ง -> Clockwise
      MOTOR + แบตเตอรี่ต่อขั้วสลับ -> Anticlockwise""")

S("LAB3", 5, "H bridge conection", 2,
  "แผนภาพ H-bridge สามแบบเรียงกัน: ซ้าย Motor not running (สวิตช์เปิดหมด) กลาง Clockwise direction (SW1+SW4 ปิด) ขวา Counter clockwise direction (SW2+SW3 ปิด) ภาพนี้ตอบข้อ 20 แบบเห็นกระแสไหล",
  """H bridge conection
[รูป] 3 วงจร H-bridge (SWITCH 1-4 รอบมอเตอร์ M)
 - MOTOR NOT RUNNING
 - CLOCKWISE DIRECTION (Current Flow)
 - COUNTER CLOCKWISE DIRECTION (Current Flow)""")

S("LAB3", 6, "Controlling the speed of the DC motor (PWM)", 3,
  "หัวใจของข้อ 19: ความเร็วเปลี่ยนได้ด้วยการเปลี่ยนปริมาณกำลังไฟด้วยเทคนิค PWM ดูรูปคลื่น 25%, 50%, 75%, 100% duty cycle พัลส์ยิ่งกว้าง กำลังยิ่งมาก",
  """Controlling the speed of the DC motor
We can increase of decreases the motor speed by changing the amount of power to it by using PWM techniques
[รูปคลื่น]
1/4 POWER   25% DC
1/2 POWER   50% DC
3/4 POWER   75% DC
FULL POWER  100% DC""")

S("LAB3", 7, "L293D DC motor driver IC", 3,
  "ไดรเวอร์ L293D: ขา Enable 1,2 รับ PWM จาก 8051 เพื่อคุมความเร็ว ขา Input 1 และ Input 2 รับสัญญาณจาก 8051 เพื่อคุมทิศทาง Output 1 และ 2 ต่อมอเตอร์ ข้อ 19 และ 20 ใช้ภาพเดียวนี้",
  """L293D DC motor driver IC
PWM for control speed -> Enable 1,2
Input from 8051 for Direction controlling -> Input 1, Input 2
Motor (M) ต่อที่ Output 1 และ Output 2 ; Motor Supply -> Vcc 2 (Vs)
ขาซ้าย: Enable 1,2 | Input 1 | Output 1 | Ground | Ground | Output 2 | Input 2 | Vcc 2 (Vs)
ขาขวา: Vcc 1 (Vss) | Input 4 | Output 4 | Ground | Ground | Output 3 | Input 3 | Enable 3,4""")

S("LAB3", 10, "A Simplified Traffic light (Scenario)", 4,
  "ฉากทางม้าลาย: สัญญาณคนข้ามสีแดง/เขียวและปุ่มกดข้างถนน คือสถานการณ์เดียวกับข้อ 21",
  """A Simplified Traffic light
- Scenario
[รูป] ไฟคนข้าม (แดง / เขียว) และปุ่มกดข้างทางม้าลาย""")

S("LAB3", 11, "Hardware: 8051 กับไฟคนข้ามและปุ่ม", 4,
  "Hardware Diagram ตรงกับรูปในข้อสอบข้อ 21: P1.1 ต่อไฟคนแดง P1.0 ต่อไฟคนเขียว และ P2.0 ต่อปุ่มกด",
  """8051
P1.1 ---- ไฟคนข้ามสีแดง
P1.0 ---- ไฟคนข้ามสีเขียว
P2.0 ---- ปุ่มกด (push button)""")

# ------------------------------------------------------------------ Lab 5 (state machine)
S("LSM", 2, "Traffic 1 (state chart และฮาร์ดแวร์)", 1,
  "ซ้าย State chart: จุดเริ่ม → Ready State, Ready --push--> Go State, Go --timer--> Ready, Go --push--> Go (วนกลับตัวเอง) ขวา Hardware: 8051 ที่ P1.1, P1.0, P2.0 ตรงกับรูปข้อ 21 ทุกจุด",
  """Traffic 1
[State chart] initial -> Ready State
  Ready State --push--> Go State
  Go State --timer--> Ready State
  Go State --push--> Go State (วนกลับ)
[Hardware] 8051: P1.1 -> ไฟคนแดง (Ready State) ; P1.0 -> ไฟคนเขียว (Go State) ; P2.0 -> ปุ่มกด""")

S("LSM", 3, "Traffic 1: ReadyState", 1,
  "เฉลยโค้ด Ready State ของอาจารย์ (ข้อ 21 ให้เขียนส่วนนี้) เปรียบเทียบทีละบรรทัดกับเฉลยในหน้าเรา: mov r0,#01H / setb P1.1 / clr p1.0 / jB p2.0,GoState / sjmp ReadyState",
  """Traffic 1  (Ready State --push-->)
ReadyState:
    mov r0,#01H       ;r0 =state 1
    setb P1.1
    clr p1.0
    jB p2.0,GoState
    sjmp ReadyState""")

S("LSM", 4, "Traffic 1: GoState", 1,
  "โค้ด Go State: เปิด P1.0 ปิด P1.1 ตั้ง R1 = 10 แล้ววน call delay 10 รอบ (10 คูณ 10 µs = 100 µs) จากนั้น jB p2.0 กดซ้ำกลับ GoState ไม่กดก็กลับ Readystate (หมายเหตุ: คอมเมนต์ในสไลด์พิมพ์ 'state 1' แต่ค่าจริงคือ 02H)",
  """Traffic 1  (Ready State --push--> Go State --timer-->)
GoState:
    mov r0,#02H       ;r0 =state 1
    clr P1.1
    setb p1.0

    mov r1,#10
timer:
    call delay
    djnz r1,timer
    jB p2.0,GoState
    sjmp Readystate""")

S("LSM", 5, "delay subroutine (10 us)", 1,
  "ซับรูทีน delay 10 µs ที่ Traffic 1 เรียกใช้ TH0 = 11111111b (FFH), TL0 = 11110110b (F6H) เท่ากับ FFF6H คือ Flowchart ข้อ 9 เวอร์ชันโค้ด",
  """delay:
    mov tmod,#01H          ; timer0 mode1
    mov th0,#11111111b     ;FFH
    mov tl0,#11110110b     ;F6H delay 10usec
    mov tcon,#10H          ;start timer
wait: jnb tcon.5,wait
    mov tcon,#00H          ;stop timer
    ret""")

# ------------------------------------------------------------------ Textbooks (PDF page numbers)
S("MZ16", 559, "DC motors, unidirectional and bidirectional control", 1,
  "หน้าเปิดหัวข้อ 16.1 อธิบายมอเตอร์ DC มีเพียงขั้ว + และ - การกลับขั้ว (reversing the polarity) ทำให้หมุนกลับทิศ และหัวข้อ Bidirectional control ที่ชี้ไปยัง H-bridge ในรูป 16-2 ถึง 16-4 (หน้าที่พิมพ์ในหนังสือ 550)",
  """Section 16.1: DC Motor Interfacing and PWM
DC motors: ... In the DC motor we have only + and - leads. Connecting them to a DC voltage source moves the motor in one direction.
By reversing the polarity, the DC motor will move in the opposite direction.
Bidirectional control: ... Figures 16-2 through 16-4 show the basic concepts of H-bridge control of DC motors.
(ข้อความย่อจากตำรา / หน้าที่พิมพ์ 550)""",
  thumb=(0.05, 0.20, 0.95, 0.62), note="PDF หน้า 559 = หน้าที่พิมพ์ 550")

S("MZ16", 560, "Figure 16-1 และ 16-2: DC motor และ H-bridge", 1,
  "รูป 16-1 มอเตอร์หมุนตามเข็ม/ทวนเข็มเมื่อสลับขั้วแบตเตอรี่ และรูป 16-2 โครง H-bridge สี่สวิตช์ในสถานะเปิดหมด (motor not running)",
  """Table 16-1: Selected DC Motor Characteristics (www.Jameco.com)
Figure 16-1. DC Motor Rotation (Permanent Magnet Field): Clockwise Rotation / Counter-Clockwise Rotation
Figure 16-2. H-Bridge Motor Configuration: SWITCH 1, 2, 3, 4 รอบ MOTOR ; MOTOR NOT RUNNING
Figure 16-2 shows the connection of an H-bridge using simple switches. All the switches are open, which does not allow the motor to turn.
(หน้าที่พิมพ์ 551)""",
  thumb=(0.03, 0.50, 0.97, 0.93), note="PDF หน้า 560 = หน้าที่พิมพ์ 551")

S("MZ16", 561, "Figure 16-3 และ 16-4: ทิศทางตามและทวนเข็ม", 1,
  "รูป 16-3 ปิด SW1 กับ SW4 กระแสไหลผ่านมอเตอร์ทางหนึ่ง (Clockwise) รูป 16-4 ปิด SW2 กับ SW3 กระแสไหลย้อนทาง (Counter clockwise)",
  """Figure 16-3 shows the switch configuration for turning the motor in one direction. When switches 1 and 4 are closed, current is allowed to pass through the motor.
Figure 16-4 shows the switch configuration for turning the motor in the opposite direction from the configuration of Figure 16-3. When switches 2 and 3 are closed, current is allowed to pass through the motor.
Figure 16-3. H-Bridge Motor Clockwise Configuration
Figure 16-4. H-Bridge Motor Counterclockwise Configuration
(หน้าที่พิมพ์ 552)""",
  thumb=(0.0, 0.13, 1.0, 0.56), note="PDF หน้า 561 = หน้าที่พิมพ์ 552")

S("MZ16", 562, "Table 16-2 และ Figure 16-5: ตารางสวิตช์และสถานะต้องห้าม", 1,
  "Table 16-2 ตารางตรรกะของ H-bridge: Off (เปิดหมด), Clockwise (SW1, SW4 ปิด), Counterclockwise (SW2, SW3 ปิด), Invalid (ปิดหมด) และรูป 16-5 แสดงสถานะ Invalid ที่กระแสลัดวงจรลงกราวด์",
  """Table 16-2: Some H-Bridge Logic Configurations for Figure 16-2
Motor Operation   | SW1    | SW2    | SW3    | SW4
Off               | Open   | Open   | Open   | Open
Clockwise         | Closed | Open   | Open   | Closed
Counterclockwise  | Open   | Closed | Closed | Open
Invalid           | Closed | Closed | Closed | Closed
Figure 16-5 shows an invalid configuration. Current flows directly to ground, creating a short circuit.
Figure 16-5. H-Bridge in an Invalid Configuration (INVALID STATE, SHORT CIRCUIT)
(หน้าที่พิมพ์ 553)""",
  thumb=(0.0, 0.06, 1.0, 0.48), note="PDF หน้า 562 = หน้าที่พิมพ์ 553")

S("MZ16", 563, "Example 16-1 และ Figure 16-6: ต่อชิป L298", 1,
  "ตัวอย่างโปรแกรมควบคุม H-bridge และรูป 16-6 การต่อ AVR (PB0 Enable, PB1 Input1, PB2 Input2) ผ่านออปโตไอโซเลเตอร์ไปยัง L298N และมอเตอร์ เทียบกับ L293D ในสไลด์ Lab 3 หน้า 7 (ตำราใช้ L298)",
  """Example 16-1: A switch is connected to pin PA7. Write a program to simulate the H-bridge in Table 16-2:
(a) If PA7 = 0, the DC motor moves clockwise. (b) If PA7 = 1, the DC motor moves counterclockwise.
Figure 16-6. Bidirectional Motor Control Using an L298 Chip
AVR PB0 (Enable), PB1 (Input1), PB2 (Input2) -> ILQ74 optoisolator -> L298N -> Output1, Output2 -> MOTOR (diodes D1-D4)
(หน้าที่พิมพ์ 554)""",
  thumb=(0.0, 0.55, 1.0, 0.94), note="PDF หน้า 563 = หน้าที่พิมพ์ 554")

S("MZ16", 565, "Pulse width modulation (PWM)", 2,
  "หัวข้อ PWM: ความเร็วมอเตอร์ขึ้นกับโหลด แรงดัน และกระแส เมื่อโหลดคงที่เราคุมความเร็วได้ด้วยการเปลี่ยนความกว้างพัลส์ (modulating the width) พัลส์ยิ่งกว้างยิ่งเร็ว แอมพลิจูดคงที่แต่ duty cycle เปลี่ยน",
  """Pulse width modulation (PWM)
The speed of the motor depends on three factors: (a) load, (b) voltage, and (c) current.
For a given fixed load we can maintain a steady speed by using a method called pulse width modulation (PWM).
By changing (modulating) the width of the pulse applied to the DC motor we can increase or decrease the amount of power to the motor.
... although the voltage has a fixed amplitude, it has a variable duty cycle. That means the wider the pulse, the higher the speed.
(ข้อความย่อจากตำรา / หน้าที่พิมพ์ 556)""",
  thumb=(0.0, 0.52, 1.0, 0.94), note="PDF หน้า 565 = หน้าที่พิมพ์ 556")

S("MZ16", 566, "Figure 16-9: Pulse Width Modulation comparisons", 2,
  "รูปคลื่น PWM เทียบ 25%, 50%, 75% และ 100% duty cycle (1/4, 1/2, 3/4 และเต็มกำลัง) เป็นรูปเดียวกับสไลด์ Lab 3 หน้า 6",
  """Figure 16-9. Pulse Width Modulation Comparisons
1/4 POWER   25% DC
1/2 POWER   50% DC
3/4 POWER   75% DC
FULL POWER  100% DC
(หน้าที่พิมพ์ 557)""",
  thumb=(0.0, 0.0, 1.0, 0.27), note="PDF หน้า 566 = หน้าที่พิมพ์ 557")

S("MZ11", 428, "Baud rate: crystal 11.0592 MHz", 1,
  "ตารางค่า UBRR และคำอธิบายว่าเมื่อต้องการ baud rate แม่นยำมาก ให้ใช้คริสตัล 7.3728 MHz หรือ 11.0592 MHz (error 0%) เป็นเหตุผลที่ 8051 ตั้ง baud ด้วย 11.0592 MHz (ข้อ 10)",
  """Table 11-7: UBRR Values for Various Baud Rates (XTAL = 8 MHz)
In some applications we need very accurate baud rate generation. In these cases we use a 7.3728 MHz or 11.0592 MHz crystal.
Table 11-8: UBRR Values for Various Baud Rates (XTAL = 7.3728 MHz): error 0%
(ข้อความย่อจากตำรา / หน้าที่พิมพ์ 417 / ฉบับ AVR)""",
  thumb=(0.0, 0.52, 1.0, 0.92), note="PDF หน้า 428 = หน้าที่พิมพ์ 417")

S("UCB3", 67, "3.3 Finite-State Machines", 1,
  "ตำรา Lee & Seshia เริ่มนิยาม state machine: แบบจำลองที่ทุกการตอบสนอง (reaction) แปลงค่าอินพุตเป็นค่าเอาต์พุตโดยขึ้นกับ state ปัจจุบัน และ FSM คือเมื่อจำนวน state จำกัด ใช้เข้าใจรากฐานของ Ready/Go ในข้อ 21",
  """3.3 Finite-State Machines
A state machine is a model of a system with discrete dynamics that at each reaction maps valuations of the inputs to valuations of the outputs,
where the map may depend on its current state.
A finite-state machine (FSM) is a state machine where the set States of possible states is finite.
(ข้อความย่อจากตำรา / หน้าที่พิมพ์ 47)""",
  thumb=(0.0, 0.55, 1.0, 0.95), note="PDF หน้า 67 = หน้าที่พิมพ์ 47")

S("UCB3", 68, "Figure 3.3: สัญลักษณ์ของ FSM (state, transition, guard / action)", 1,
  "รูป 3.3 แสดงวงกลม state, ลูกศร transition ที่ติดป้าย guard / action และลูกศรจุดเริ่ม (initial state) เทียบกับ state chart ของข้อ 21: push คือ guard, ผลที่ทำ (เปิดไฟ) คือ action",
  """Figure 3.3: Visual notation for a finite state machine (State1 initial state indicator, State2, State3, transition guard / action)
3.3.1 Transitions: a transition is labeled 'guard / action'. The guard determines whether the transition may be taken on a reaction.
The action specifies what outputs are produced on that reaction.
(ข้อความย่อจากตำรา / หน้าที่พิมพ์ 48)""",
  thumb=(0.0, 0.25, 1.0, 0.95), note="PDF หน้า 68 = หน้าที่พิมพ์ 48")

S("UCB3", 78, "Moore machines and Mealy machines", 1,
  "กรอบอธิบายชนิดของ FSM: Mealy สร้างเอาต์พุตตอน transition ส่วน Moore สร้างเอาต์พุตตอนอยู่ใน state ไฟ Ready (แดง) และ Go (เขียว) ในข้อ 21 เป็นเอาต์พุตที่ผูกกับ state จึงเป็นแบบ Moore",
  """Moore Machines and Mealy Machines
Mealy machines are characterized by producing outputs when a transition is taken.
A Moore machine produces outputs when the machine is in a state rather than when a transition is taken.
(ข้อความย่อจากตำรา / หน้าที่พิมพ์ 58)""",
  thumb=(0.0, 0.10, 1.0, 0.55), note="PDF หน้า 78 = หน้าที่พิมพ์ 58")
