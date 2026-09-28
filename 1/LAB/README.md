# 📚 คู่มือปฏิบัติการที่ 1 (Lab 1 Guide): ระบบสมองกลฝังตัว (Embedded System 8051)

> **ข้อมูลผู้จัดทำ:** นายธีรภัทร ภู่ระย้า  
> **รหัสนิสิต:** `66362416` (มีทั้งหมด 8 หลัก: 6, 6, 3, 6, 2, 4, 1, 6)  
> **โปรแกรมจำลอง:** EdSim51DI (Version 2.1.39)  
> **ไฟล์โค้ดต้นฉบับ:** อยู่ในโฟลเดอร์ [`coding/`](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/LAB/coding)

---

## 🎯 สรุปภาพรวมโจทย์ 4 ข้อย่อยตามสไลด์ `Lab 1.pptx`

| ข้อย่อย | หัวข้อโจทย์ | ไฟล์โค้ด | คำสั่งหลักที่ฝึกใช้งาน | สิ่งที่ต้องสังเกตใน EdSim51 |
| :--- | :--- | :--- | :--- | :--- |
| **1.1** | เก็บค่ารหัสนิสิตลงหน่วยความจำ | [`lab1_1.asm`](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/LAB/coding/lab1_1.asm) | `MOV direct, #data` | ตาราง Data Memory แถว `30` มีค่า `06 06 03 06 02 04 01 06` |
| **1.2** | ส่งค่ารหัสนิสิตทีละไบต์ตามลำดับออก Port 0 (P0) | [`lab1_2.asm`](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/LAB/coding/lab1_2.asm) | `MOV A, direct`<br>`MOV P0, A` | รีจิสเตอร์ `ACC` และ พิน `P0` เปลี่ยนค่าทีละหลัก |
| **1.3** | ส่งค่ารหัสนิสิตออก Port 0 (P0) โดยใช้ Loop วนซ้ำ | [`lab1_3.asm`](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/LAB/coding/lab1_3.asm) | `@R0` (Indirect)<br>`INC R0`<br>`DJNZ R2, label` | ค่า `R0` ขยับชี้แอดเดรสถัดไป, `R2` นับถอยหลังจาก 8 สู่ 0, `P0` ได้รับค่าครบ 8 ไบต์ |
| **1.4** | ส่งค่ารหัสนิสิตออก Port 0 (P0) โดยใช้ Stack | [`lab1_4.asm`](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/LAB/coding/lab1_4.asm)<br>*(หรือ [`lab1_4_forward.asm`](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/LAB/coding/lab1_4_forward.asm))* | `PUSH direct`<br>`POP direct` | ค่า `SP` เพิ่มจาก `07H` ไป `0FH` ตอน PUSH และลดลงเหลือ `07H` ตอน POP สู่ `P0` |

---

## 🛠️ ขั้นตอนการใช้งานโปรแกรม EdSim51DI (สำหรับทุกข้อ)

1. **เปิดหน้าต่าง EdSim51DI** (ที่คุณเปิดค้างไว้อยู่)
2. นำโค้ด Assembly ในแต่ละข้อ ไปวางในช่องพิมพ์โค้ด (หน้าต่างสีขาวตรงกลาง)
3. กดปุ่ม **`Assm`** (ย่อมาจาก Assemble) ด้านบนเพื่อแปลภาษา:
   - หากแปลผ่าน จะไม่ขึ้นข้อผิดพลาด และตัวเลขแอดเดรสของโค้ดภาษาเครื่องจะปรากฏขึ้น
4. กดปุ่ม **`RST`** (Reset) เพื่อเซตสถานะระบบและ Program Counter (`PC`) กลับไปที่ `0x0000`
5. เลือกลักษณะการรัน:
   - **แนะนำแบบ Step ทีละบรรทัด:** ให้คลิกปุ่ม **`Step`** (หรือเครื่องหมายก้าวเดิน/ปุ่ม Step ถัดจาก Run) เพื่อดูการเปลี่ยนแปลงของ Register และ Memory ทีละสเต็ป
   - **รันอัตโนมัติ:** กดปุ่ม **`Run`** (สามารถปรับแถบความถี่ Update Freq หรือความเร็วได้ที่มุมซ้ายบน)

---

## 📖 รายละเอียดเชิงลึกรายข้อ

### 🔹 ปฏิบัติการที่ 1.1: เก็บค่ารหัสนิสิตลงในหน่วยความจำ
- **รหัสนิสิต:** `66362416`
- **การจัดสรร RAM:** เราเลือกใช้ย่าน **Scratchpad RAM (30H - 7FH)** ซึ่งเป็นพื้นที่ RAM อเนกประสงค์ขนาด 80 ไบต์ สำหรับเก็บตัวแปรของผู้ใช้ (ไม่ไปทับซ้อนกับ Register Bank 0-3 ที่แอดเดรส 00H-1FH และ Bit-Addressable RAM ที่ 20H-2FH)
  - RAM `30H` = `06H`
  - RAM `31H` = `06H`
  - RAM `32H` = `03H`
  - RAM `33H` = `06H`
  - RAM `34H` = `02H`
  - RAM `35H` = `04H`
  - RAM `36H` = `01H`
  - RAM `37H` = `06H`

#### โค้ด Assembly (`lab1_1.asm`):
```assembly
    ORG 0000H       ; จุดเริ่มต้นโปรแกรม

    MOV 30H, #06H   ; หลักที่ 1 (เลข 6) -> RAM 30H
    MOV 31H, #06H   ; หลักที่ 2 (เลข 6) -> RAM 31H
    MOV 32H, #03H   ; หลักที่ 3 (เลข 3) -> RAM 32H
    MOV 33H, #06H   ; หลักที่ 4 (เลข 6) -> RAM 33H
    MOV 34H, #02H   ; หลักที่ 5 (เลข 2) -> RAM 34H
    MOV 35H, #04H   ; หลักที่ 6 (เลข 4) -> RAM 35H
    MOV 36H, #01H   ; หลักที่ 7 (เลข 1) -> RAM 36H
    MOV 37H, #06H   ; หลักที่ 8 (เลข 6) -> RAM 37H

HERE:
    SJMP HERE       ; วนรอบหยุดรอ
    END
```
**จุดสังเกตผลลัพธ์:**  
ดูตาราง **Data Memory** บริเวณมุมซ้ายล่างของ EdSim51 แถวเลข `30` คอลัมน์ `0` ถึง `7` จะเปลี่ยนจาก `00 00 ...` กลายเป็น:  
`06 06 03 06 02 04 01 06` อย่างชัดเจน

---

### 🔹 ปฏิบัติการที่ 1.2: ส่งค่ารหัสนิสิตทีละไบต์อนุกรมผ่าน Port 0 (P0)
- **แนวคิด:** "ทีละไบต์อนุกรม" คือการส่งทีละไบต์เรียงตามลำดับ (Sequential Execution) โดยอ่านข้อมูลจาก RAM ที่เราเก็บไว้ใน 1.1 ขึ้นมาใส่ที่ Accumulator (`A`) ก่อน แล้วจึงส่งออกสู่พอร์ต `P0`
- คำสั่งที่ใช้: `MOV A, direct` ตามด้วย `MOV P0, A`

#### โค้ด Assembly (`lab1_2.asm`):
```assembly
    ORG 0000H

    ; บันทึกรหัสนิสิตลง RAM 30H - 37H
    MOV 30H, #06H
    MOV 31H, #06H
    MOV 32H, #03H
    MOV 33H, #06H
    MOV 34H, #02H
    MOV 35H, #04H
    MOV 36H, #01H
    MOV 37H, #06H

    ; ส่งออก Port 0 ทีละไบต์ตามลำดับ
    MOV A, 30H
    MOV P0, A       ; ส่ง 06H ออก P0

    MOV A, 31H
    MOV P0, A       ; ส่ง 06H ออก P0

    MOV A, 32H
    MOV P0, A       ; ส่ง 03H ออก P0

    MOV A, 33H
    MOV P0, A       ; ส่ง 06H ออก P0

    MOV A, 34H
    MOV P0, A       ; ส่ง 02H ออก P0

    MOV A, 35H
    MOV P0, A       ; ส่ง 04H ออก P0

    MOV A, 36H
    MOV P0, A       ; ส่ง 01H ออก P0

    MOV A, 37H
    MOV P0, A       ; ส่ง 06H ออก P0

HERE:
    SJMP HERE
    END
```
**จุดสังเกตผลลัพธ์:**  
เมื่อกด **Step** ผ่านแต่ละคู่คำสั่ง ให้สังเกตช่อง **`P0`** ด้านซ้าย และแถบแสดงสถานะบิตพอร์ต `P0.7` ถึง `P0.0` ทางขวามือ ค่าจะอัปเดตเป็นค่าฐาน 16 ของแต่ละหลักตามลำดับ

---

### 🔹 ปฏิบัติการที่ 1.3: ส่งค่ารหัสนิสิตออก Port 0 (P0) โดยใช้ Loop วนซ้ำ
- **แนวคิด:** ใน 1.2 เราต้องเขียนคำสั่งเดิมซ้ำกันถึง 8 บรรทัด ในข้อนี้เราลดรูปโดยใช้:
  1. **Register Pointer (`R0`):** ชี้ไปยังแอดเดรส `30H` และใช้คำสั่ง `INC R0` เลื่อนตำแหน่งแอดเดรส
  2. **Indirect Addressing (`@R0`):** เข้าถึงข้อมูลใน RAM ผ่านพอยน์เตอร์ด้วยคำสั่ง `MOV A, @R0`
  3. **Loop Counter (`R2`):** ตั้งค่าเริ่มต้นเป็น 8 (นับ 8 หลัก)
  4. **คำสั่งลูป (`DJNZ R2, SEND_LOOP`):** ลดค่า R2 ลง 1 แล้วกระโดดกลับหากยังไม่เป็น 0

#### โค้ด Assembly (`lab1_3.asm`):
```assembly
    ORG 0000H

    ; บันทึกรหัสนิสิตลง RAM 30H - 37H
    MOV 30H, #06H
    MOV 31H, #06H
    MOV 32H, #03H
    MOV 33H, #06H
    MOV 34H, #02H
    MOV 35H, #04H
    MOV 36H, #01H
    MOV 37H, #06H

    ; เริ่มต้น Loop ส่งค่าออก P0
    MOV R0, #30H    ; R0 เป็น Pointer ชี้ที่ 30H
    MOV R2, #8      ; R2 นับรอบ = 8

SEND_LOOP:
    MOV A, @R0      ; อ่านค่าจาก RAM ที่ R0 ชี้ มาเก็บใน A
    MOV P0, A       ; ส่งค่าจาก A ออก P0
    INC R0          ; เลื่อนพอยน์เตอร์ R0 ชี้ไบต์ถัดไป
    DJNZ R2, SEND_LOOP ; ลด R2 และวนกลับหาก R2 != 0

HERE:
    SJMP HERE
    END
```
**จุดสังเกตผลลัพธ์:**  
สังเกตค่าใน **R0** จะเพิ่มจาก `30H` ไปเรื่อยๆ จนถึง `38H` และ **R2** จะลดลงจาก `8` -> `7` -> ... -> `0` พร้อมทั้ง `P0` เปลี่ยนค่าตามรหัสในทุกๆ รอบ

---

### 🔹 ปฏิบัติการที่ 1.4: ส่งค่ารหัสนิสิตออก Port 0 (P0) โดยใช้ Stack
- **แนวคิดของ Stack ใน 8051:**
  - หลัง Reset ค่า **Stack Pointer (`SP`)** จะมีค่าเริ่มต้นที่ `07H`
  - คำสั่ง **`PUSH direct`**: ระบบจะทำ `SP = SP + 1` ก่อน แล้วนำข้อมูลไปเขียนลง RAM ที่แอดเดรส `@SP` (เช่น เริ่มที่ `08H`, `09H`, ... เป็นย่าน Register Bank 1)
  - คำสั่ง **`POP direct`**: ระบบจะอ่านข้อมูลจาก `@SP` ไปใส่ที่ปลายทาง แล้วทำ `SP = SP - 1`
  - สแต็กมีคุณสมบัติ **LIFO (Last-In, First-Out)** คือ "เข้าทีหลัง ออกก่อน"

#### โค้ด Assembly แบบมาตรฐาน (`lab1_4.asm`):
```assembly
    ORG 0000H

    ; 1. บันทึกรหัสนิสิตลง RAM 30H - 37H
    MOV 30H, #06H
    MOV 31H, #06H
    MOV 32H, #03H
    MOV 33H, #06H
    MOV 34H, #02H
    MOV 35H, #04H
    MOV 36H, #01H
    MOV 37H, #06H

    ; 2. PUSH ข้อมูลลง Stack (สังเกต SP จะเพิ่มขึ้นทีละ 1 จาก 07H สู่ 0FH)
    PUSH 30H        ; SP = 08H
    PUSH 31H        ; SP = 09H
    PUSH 32H        ; SP = 0AH
    PUSH 33H        ; SP = 0BH
    PUSH 34H        ; SP = 0CH
    PUSH 35H        ; SP = 0DH
    PUSH 36H        ; SP = 0EH
    PUSH 37H        ; SP = 0FH

    ; 3. POP ข้อมูลออกจาก Stack ส่งออกพอร์ต P0 (POP เข้า P0 ได้โดยตรง เพราะ P0 เป็น SFR address 80H)
    POP P0          ; ได้ 06H (หลักที่ 8), SP = 0EH
    POP P0          ; ได้ 01H (หลักที่ 7), SP = 0DH
    POP P0          ; ได้ 04H (หลักที่ 6), SP = 0CH
    POP P0          ; ได้ 02H (หลักที่ 5), SP = 0BH
    POP P0          ; ได้ 06H (หลักที่ 4), SP = 0AH
    POP P0          ; ได้ 03H (หลักที่ 3), SP = 09H
    POP P0          ; ได้ 06H (หลักที่ 2), SP = 08H
    POP P0          ; ได้ 06H (หลักที่ 1), SP = 07H (คืนค่าเดิม)

HERE:
    SJMP HERE
    END
```

> **💡 เทคนิคขั้นสูง (Option 1.4 Forward Order):**  
> หากอาจารย์ต้องการให้ค่าที่ POP ออกทาง `P0` เรียงลำดับจากหลักแรกไปหลักสุดท้าย (`6 -> 6 -> 3 -> 6 -> 2 -> 4 -> 1 -> 6`) เราสามารถใช้คุณสมบัติ LIFO โดยการ **PUSH หลักสุดท้าย (37H) เข้าไปก่อน แล้วค่อย PUSH หลักแรกลงไปทีหลัง** (ดูโค้ดได้ใน [`lab1_4_forward.asm`](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/LAB/coding/lab1_4_forward.asm)) เมื่อสั่ง `POP P0` จะได้ค่าหลักแรกออกมาก่อนทันที!
