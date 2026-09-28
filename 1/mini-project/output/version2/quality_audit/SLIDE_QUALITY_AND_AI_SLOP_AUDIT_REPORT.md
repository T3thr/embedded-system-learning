# รายงานการตรวจประเมินคุณภาพสไลด์และสแกนร่องรอย AI Slop อย่างละเอียด
## (Slide Quality & Forensic AI Slop Audit Report)

**โครงการ:** ระบบควบคุมความปลอดภัยประตูเลื่อนอัตโนมัติ (Sliding Door Safety Control)  
**วิชา:** โครงงานระบบสมองกลฝังตัว (Embedded System Mini-Project - 8051 Microcontroller)  
**ไฟล์เป้าหมายที่ตรวจประเมิน:** [Sliding_Door_Safety_Control_Version_2_Refined.pptx](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/mini-project/output/version2/Sliding_Door_Safety_Control_Version_2_Refined.pptx)  
**วัตถุประสงค์:** วิเคราะห์จุดบกพร่องด้านวิชวล ความสมมาตร การจัดวาง และความถูกต้องทางวิศวกรรม เพื่อใช้เป็นพิมพ์เขียว (Design Specification & Prompt Engineering Directives) ในการปรับปรุงไฟล์เดิมให้ได้มาตรฐานระดับมืออาชีพ ไร้ร่องรอยงานชุ่ยของ AI โดยคงความถูกต้องทางการศึกษา 100%

---

## 1. สรุปภาพรวมและดัชนีชี้วัด "AI Slop" (Executive Summary)

จากการตรวจสอบไฟล์นำเสนอจำนวน 19 สไลด์ พบว่าตัวสไลด์ยังคงมีร่องรอยของ **"AI Slop"** (งานที่ระบบอัตโนมัติสร้างขึ้นโดยขาดรสนิยม ขาดความเข้าใจเชิงพื้นที่ ขาดการคำนวณทางคณิตศาสตร์ที่แม่นยำ และไม่มีระบบ Design System รองรับ) ซึ่งลดทอนคุณค่าของโครงงานวิศวกรรมชิ้นนี้อย่างมีนัยสำคัญ

### ตารางประเมินดัชนีคุณภาพ (Quality Scorecard)

| มิติการประเมิน (Evaluation Dimension) | เกรดปัจจุบัน | ข้อบกพร่องวิกฤตที่พบ (Critical Defects) |
| :--- | :---: | :--- |
| **1. ความสมบูรณ์ของภาพและสื่อ (Visual Integrity)** | **D** | ไอคอนคนพิการแขนขาด (ภาพหลอน AI), ประตูเวกเตอร์แบนแบบ MS Paint ยุคเก่า, การผสมภาพถ่ายจริงกับกล่องเวกเตอร์มั่วซั่ว |
| **2. ความสมจริงทางฮาร์ดแวร์ (Hardware Realism)** | **D+** | ชิป MCU AT89S52 วาดเป็นกล่องสี่เหลี่ยมซอฟต์แวร์แบนๆ ปลอม ไม่เหมือนชิป DIP-40 ทางกายภาพจริง |
| **3. เรขาคณิตและเส้นสาย (Geometric Precision)** | **C-** | หัวลูกศรลอยไม่ติดปลายสาย, เส้นเดินทะลุตัวอุปกรณ์ (ตัวต้านทาน 27 Ω), เส้นและข้อความชนขอบเลขหน้า |
| **4. สเกลตัวพิมพ์ (Typography Hierarchy)** | **D** | ขาด Modular Scale ขนาดฟอนต์กระโดดไปมา (8pt ถึง 30pt), สระลอยชนกรอบ, ข้อความไม่กึ่งกลางกล่อง |
| **5. การบริหารพื้นที่ว่าง (Space Utilization)** | **F** | สไลด์ 5 และ 8–16 มีพื้นที่ว่างสีขาวไร้ประโยชน์ (Dead Void) กว่า 50–65%, ขณะที่สไลด์ 4 ข้อความล้นขอบจอ |
| **6. มาตรฐานสากล (Publishing Standards)** | **F** | หน้าแรกมีเลขหน้า "01", สไลด์โค้ดซ้ำซาก 9 หน้าติดกันโดยไม่มี Visual Highlighting |
| **7. ความถูกต้องทางวิชาการ (Academic Rigor)** | **B+** | โค้ดแอสเซมบลีและตารางเวลาจริงถูกต้อง แต่วิธีการนำเสนอทำให้เนื้อหาดูด้อยค่า |

---

## 2. การจำแนกประเภทข้อบกพร่อง AI Slop (Defect Taxonomy)

### ประเภท A: ความหลอนทางกายวิภาคและสื่อ (Anatomical & Media Hallucination)
- **สไลด์ 2:** ไอคอนคนถูกตัดทอนจนแขนขวาขาดวิ่น ลำตัวกลายเป็นแท่งเหลี่ยมผิดสัดส่วนมนุษย์อย่างรุนแรง
- **สไลด์ 1:** บานประตูกรอบฟ้ามีเพียงเส้นลวด 2 เส้น ไร้มิติ ไม่มีความลึก ไร้กระจก ไม่สะท้อนความเป็นประตูบานเลื่อนอุตสาหกรรม

### ประเภท B: ภาวะจับแพะชนแกะ (Frankenstein Visual Collision)
- **สไลด์ 4:** ผสมผสานสไตล์ภาพ 3 รูปแบบบนสไลด์เดียว:
  1. *ภาพถ่าย 3D ตัดขอบใส:* มอเตอร์, L293D, ลิมิตสวิตช์, LED, ปุ่มกด, บัซเซอร์
  2. *กล่องสี่เหลี่ยมเวกเตอร์ Dark-Mode:* ชิป MCU AT89S52
  3. *กล่องข้อความเวกเตอร์ 2D แบน:* สวิตช์ E-Stop และบล็อก 74HCT14 Inverter  
  ส่งผลให้หน้าสไลด์ดูเหมือนนำเศษชิ้นส่วนจากคนละงานมาปะติดปะต่อกันอย่างไร้ทิศทาง

### ประเภท C: เส้นสายหลุดระนาบและการทับซ้อน (Collision & Alignment Drift)
- **สไลด์ 3:** ลูกศร FSM ชนขอบกล่อง, ข้อความกำกับลูกศร (`LC = 0`, `กดปุ่ม 20 ms`, `หยุดครบ 200 ms`) ลอยเคว้งห่างจากเส้น, ข้อความ `เริ่มที่ LO` ลอยอยู่กลางอากาศเหนือเส้นทางลูป
- **สไลด์ 4:** เส้นจาก L293D OUT1 ลากผ่าทะลุตัวต้านทาน 27 Ω, เส้นไฟ +12V ชี้ลงบนเปลือกมอเตอร์ไม่ใช่ขั้วต่อ, ข้อความ Footer ด้านล่างยาวจนวิ่งไปชนและทับซ้อนกับเลขหน้า "04"

### ประเภท D: ความไร้ระเบียบของระบบตัวพิมพ์ (Typographic Anarchy)
- ไม่มีระบบกำหนดขนาดฟอนต์ (Typographic Scale) ที่คงที่ มีการใช้ขนาดฟอนต์ 8pt, 9pt, 10pt, 11pt, 12pt, 13pt, 14pt, 15pt, 17pt, 18pt, 20pt, 22pt, 24pt, 26pt, 28pt, 30pt สลับไปมาตามอำเภอใจ
- การจัดตำแหน่งข้อความส่วนใหญ่ชิดบน-ชิดซ้าย ขาดการคำนวณ Vertical Center ส่งผลให้กล่องขนาดใหญ่มีข้อความกองอยู่ด้านบนแล้วเหลือพื้นที่โล่งด้านล่าง

### ประเภท E: วิกฤตพื้นที่ว่างและเนื้อหาจำเจ (Dead Space & Code Fatigue)
- สไลด์ 5 (5V vs 12V): พื้นที่สไลด์ว่างเปล่ากว่า 65% มีเพียงตัวเลขยักษ์กับข้อความ 3 บรรทัด
- สไลด์ 8 ถึง 16 (โค้ดจำแนกตามสถานะ FSM): ใช้เลย์เอาต์เดิมซ้ำซาก 9 หน้าติดต่อกัน โดยครึ่งล่างของการ์ดโค้ดเป็นพื้นที่ว่างสีขาวทุกหน้า ไม่มีการเน้นบรรทัดสำคัญ (Code Highlighting) ทำให้ผู้ฟังเกิดความเหนื่อยล้าทางสายตา (Visual Fatigue)

### ประเภท F: การละเมิดมาตรฐานเลขหน้าสากล (Folio Rule Violation)
- หน้าแรก (หน้าปก) แสดงเลขหน้า "01" ซึ่งขัดกับหลักการสากลของการทำ Pitch Deck และรายงานวิชาการ ที่หน้าปกจะต้องซ่อนเลขหน้าเสมอ และเริ่มแสดงเลขหน้าตั้งแต่หน้าที่ 2 เป็นต้นไป

---

## 3. การผ่าตัดวิเคราะห์รายสไลด์แบบละเอียด (Slide-by-Slide Audit & Fix Directives)

### สไลด์ 1: หน้าปก (Cover Slide)
- **สภาพที่เป็นอยู่:**
  - แสดงเลขหน้า "01" มุมขวาล่าง
  - มีแถบ Header ด้านบน (`ระบบประตูเลื่อนอัตโนมัติ`) พร้อมเส้นขีดคั่น เหมือนสไลด์เนื้อหาทั่วไป
  - ภาพบานประตูเป็นภาพวาดเส้นเวกเตอร์สีฟ้าธรรมดา ไร้ชีวิตชีวา ไร้ความลึก
  - ข้อมูลกลุ่ม รหัสนักศึกษา และอาจารย์ที่ปรึกษา กองรวมกันเป็นพืดทางซ้ายล่าง
- **สิ่งที่ต้องแก้ไข (Action Items):**
  - ซ่อนเลขหน้าบนสไลด์นี้ 100%
  - ลบแถบ Header สไลด์ด้านบนออก เปลี่ยนเป็นการจัดวาง Title แบบ Hero Display กึ่งกลางหรือจัดวางแบบ Modern Asymmetric Grid
  - ใช้ภาพโมเดล **3D Photorealistic / CAD Isometric View** ของบานประตูกระจกอัตโนมัติกรอบสแตนเลส พร้อมรางแขวน มู่เล่ย์สายพาน และลำแสงอินฟราเรดสีแดง/ฟ้าตัดผ่านบานประตู แสดงถึงความล้ำสมัยทางวิศวกรรม
  - จัดข้อมูลผู้จัดทำให้อยู่ใน Card สไตล์ Glassmorphism หรือกล่องข้อมูลที่มีระเบียบ สวยงาม หรูหรา

---

### สไลด์ 2: ปัญหาและแนวทางแก้ไข (Problem & Solution Narrative)
- **สภาพที่เป็นอยู่:**
  - รูปคนยืนด้านซ้ายเป็นภาพตัดทอนที่แขนขวาขาด (AI Anatomical Artifact)
  - รูปบานประตูมีเพียง 2 รูปนิ่ง (ซ้าย: เดิม, ขวา: ใหม่) ไม่สามารถสื่อสารพลวัตของอันตรายจากการหนีบได้
  - คำอธิบายด้านล่างสั้นและแห้งแล้งเกินไป
- **สิ่งที่ต้องแก้ไข (Action Items):**
  - ปรับเปลี่ยนจากการเปรียบเทียบภาพนิ่ง มาเป็น **"Storyboard ลำดับเหตุการณ์อันตราย vs ระบบความปลอดภัย 3 ขั้นตอน (3-Stage Hazard Storyboard)"**:
    1. *จังหวะที่ 1 (Blind Spot):* วัตถุ/เด็ก/สัตว์เลี้ยง เคลื่อนที่ผ่านระดับต่ำกว่าเซนเซอร์เดี่ยวทั่วไป
    2. *จังหวะที่ 2 (Hazard / Pinch Point):* ประตูระบบเดิมปิดตามเวลา เกิดแรงกดทับ มอเตอร์ไม่มีระบบตัดกระแส
    3. *จังหวะที่ 3 (Dual-Beam & Reversal Safety):* ลำแสงระดับล่างตรวจพบ ตัดไฟทันที หน่วง 200 ms แล้วเปิดกลับสุด ป้องกันอันตราย 100%
  - เปลี่ยนไอคอนมนุษย์และสิ่งกีดขวางให้มีสัดส่วนถูกต้อง สวยงาม ตามมาตรฐานสากล

---

### สไลด์ 3: แผนภาพ FSM และตำแหน่งประตู (FSM & Physical Mapping)
- **สภาพที่เป็นอยู่:**
  - เส้นลูกศรวิ่งชนขอบกล่องข้อความ
  - ข้อความเงื่อนไขการเปลี่ยนสถานะ (`LC = 0`, `กดปุ่ม 20 ms`, `หยุดครบ 200 ms`) วางคาบเส้นหรือลอยห่างจากลูกศร
  - ข้อความ `เริ่มที่ LO` ลอยอยู่กลางอากาศบนเส้นลูปยาว
  - รูปประตู 4 รูปด้านขวาถูกเส้นทึบแบ่งกั้น ไม่มีการเชื่อมโยงสายตากับ State ฝั่งซ้าย
  - แถบข้อความล่างสุดลอยเคว้งโดยไม่มีกรอบรองรับ
- **สิ่งที่ต้องแก้ไข (Action Items):**
  - จัดโครงสร้างผัง FSM ใหม่ด้วยระบบ **Orthogonal Flow Grid**: กล่องสถานะเว้นระยะห่างเท่ากัน (Equal Spacing)
  - ป้ายกำกับเงื่อนไขทุกป้ายต้องอยู่ใน **Badge แคปซูลมน** วางกึ่งกลางบนเส้นลูกศรพอดี ไม่ลอยเคว้ง
  - สร้างเส้นเชื่อมโยงหรือแถบสีประจำสถานะที่จับคู่กันชัดเจนระหว่าง State บน FSM กับสถานะบานประตูด้านขวา (เช่น OPENING คู่กับ ประตูกำลังเปิด)
  - นำแถบข้อความด้านล่างใส่ลงในการ์ดวิศวกรรม (Engineering Note Card) ที่มีไอคอนกำกับอย่างมืออาชีพ

---

### สไลด์ 4: ผังการเชื่อมต่อวงจรฮาร์ดแวร์ (Hardware Connection Architecture)
- **สภาพที่เป็นอยู่:**
  - ไมโครคอนโทรลเลอร์ AT89S52 เป็นกล่องสี่เหลี่ยมเวกเตอร์มืดๆ ยัดบล็อกไดอะแกรมซอฟต์แวร์ไว้ข้างใน ไม่เหมือนชิปจริง
  - ผสมผสานภาพถ่ายอุปกรณ์จริง (มอเตอร์, L293D, ลิมิตสวิตช์) กับกล่องเวกเตอร์แบน (E-Stop, Inverter) จนขาดเอกภาพ
  - เส้นเชื่อมต่อ OUT1 ลากตัดผ่าตัวต้านทาน 27 Ω
  - เส้นไฟเลี้ยง +12V ทิ่มลงบนตัวมอเตอร์
  - ข้อความ Footer ด้านล่างยาวจนชนและเกยกับเลขหน้า "04"
  - ใช้สีมากเกินไป (น้ำเงิน, ฟ้า, เขียว, ส้ม, แดง, เหลือง, เทา) จนดูเหมือนของเล่น
- **สิ่งที่ต้องแก้ไข (Action Items):**
  - เปลี่ยนกราฟิก AT89S52 ให้เป็น **โมเดล 3D Top-Down ของชิป DIP-40 จริงของ ATMEL** (มีรอยบาก Notch และขาโลหะ 40 ขาครบถ้วน) หรือแผงวงจร PCB พิมพ์ลายทองแดงจริง
  - เปลี่ยนสวิตช์ E-Stop ให้เป็นภาพถ่าย 3D ของปุ่มกดเห็ดฉุกเฉิน (Mushroom Head E-Stop) จริงให้เข้าชุดกับอุปกรณ์อื่น
  - เดินสายสัญญาณใหม่: ปลายสายต้องแตะที่ขั้วต่อของอุปกรณ์อย่างแท้จริง ไม่ลากผ่าทะลุรูปตัวต้านทาน
  - ปรับระยะขอบล่างของเนื้อหา ให้เว้นระยะปลอดภัย (Safe Margin) อย่างน้อย 80 px จากมุมขวาล่าง เพื่อไม่ให้ชนกับเลขหน้า
  - ควบคุมคู่สี (Color Palette) ให้อยู่ในโทน Industrial Tech: พื้นหลังขาวการ์ดเทา ขอบน้ำเงินเข้ม สัญญาณลอจิกสีฟ้า และสัญญาณอันตราย/ฉุกเฉินสีแดง

---

### สไลด์ 5: ระดับแรงดันไฟฟ้าในระบบ (Voltage Domains)
- **สภาพที่เป็นอยู่:**
  - ตัวหนังสือ "5 V" และ "12 V" ขนาดมหึมา ลอยอยู่บนหน้าสไลด์ที่ว่างเปล่ากว่า 65%
  - ด้านล่างมีแถบสีฟ้าข้อความเดียวที่กินพื้นที่กว้างเกินความจำเป็น
- **สิ่งที่ต้องแก้ไข (Action Items):**
  - ออกแบบเป็นการ์ดเปรียบเทียบ 2 ฝั่งคู่ขนาน (Dual Domain Cards):
    - ฝั่งซ้าย: **5V Logic & Control Domain** (MCU, Inverter, Opto Logic, Sensors Logic)
    - ฝั่งขวา: **12V Power & Sensor Domain** (Motor, L293D VCC2, Through-Beam IR E3Z)
  - ใส่ไอคอนกำกับแต่ละอุปกรณ์ และมีแผนภาพจำลองการแยกกักแรงดันผ่าน Optocoupler และ Inverter ให้เห็นภาพชัดเจน

---

### สไลด์ 6: ช่วงเวลาและตัวจับเวลา (Timing Architecture)
- **สภาพที่เป็นอยู่:** มีเพียงตารางข้อความตัวเลขลอยๆ ขาดการแสดงผลเชิงเวลา
- **สิ่งที่ต้องแก้ไข (Action Items):**
  - นำเสนอในรูปแบบ **แผนภาพไทม์ไลน์เชิงเวลา (Engineering Timing Waveform Diagram)** แสดงสเกลเวลาจริง:
    - 20 ms (Debounce Filter)
    - 200 ms (Motor Dead Time)
    - 3.0 s (Door Hold Time)
    - 5.0 s (Motor Travel Timeout)
  - ช่วยให้ผู้ฟังเข้าใจลำดับจังหวะเวลาของเฟิร์มแวร์ได้ทันทีโดยไม่ต้องอ่านตัวเลขในตารางเพียงอย่างเดียว

---

### สไลด์ 7: ตารางจัดสรรพอร์ต (Port Pinout Allocation)
- **สภาพที่เป็นอยู่:** เป็นตารางข้อความ 2 ฝั่งแบบเรียบง่าย ไร้กราฟิกประกอบ
- **สิ่งที่ต้องแก้ไข (Action Items):**
  - วาดผังพินของไมโครคอนโทรลเลอร์ (Microcontroller Pinout Diagram) โดยไฮไลต์เฉพาะขาของ Port 1 (เอาต์พุต P1.0 - P1.7) และ Port 2 (อินพุต P2.0 - P2.7) พร้อมแถบสีแยกประเภทสัญญาณอย่างชัดเจน

---

### สไลด์ 8 ถึง 16: การทำงานในแต่ละสถานะของ FSM (Firmware State Slides)
- **สภาพที่เป็นอยู่:**
  - สไลด์ 8 ถึง 16 จำนวน 9 หน้าติดต่อกัน ใช้เลย์เอาต์เดิมซ้ำซาก 100%: กล่องโฟลว์ชาร์ตซ้าย 3 กล่อง + กล่องโค้ดภาษาแอสเซมบลีขวา
  - การ์ดโค้ดด้านขวามีพื้นที่ว่างสีขาวด้านล่างเหลือทิ้งกว่า 40–50% ทุกหน้า
  - โค้ดแอสเซมบลีแสดงเป็นก้อนข้อความยาว ไม่มีการเน้นคำสั่งสำคัญที่ควบคุมฮาร์ดแวร์
- **สิ่งที่ต้องแก้ไข (Action Items):**
  - ปรับปรุงการ์ดโค้ดให้กระชับพอดีกับจำนวนบรรทัดของแต่ละ State
  - เพิ่มส่วน **"Critical Instruction Zoom"**: ดึงคำสั่งสำคัญที่เป็นหัวใจของสถานะนั้นมาอธิบายอย่างโดดเด่น เช่น:
    - ในสถานะ CLOSING: ซูมคำสั่ง `SETB P1.0` และ `CLR P1.1`
    - ในสถานะ OBSTACLE / DEAD_TIME: ซูมคำสั่งตัดแรงขับ `SETB P1.2` และการตั้งค่า Timer หน่วงเวลา 200 ms
  - เพิ่ม **สถานะสัญญาณดิจิทัล (Logic State Indicator)**: แสดงแถบสถานะพอร์ต P1 และ P2 ในรูปแบบบิตไบนารี (`P1 = 11101100B`) ที่เข้าใจง่าย

---

### สไลด์ 17: ระเบียบวิธีและสภาพแวดล้อมการทดสอบ (Simulation Setup)
- **สภาพที่เป็นอยู่:** มีการ์ดสีขาว 3 ใบ บรรจุข้อความ Bullet ธรรมดา
- **สิ่งที่ต้องแก้ไข (Action Items):**
  - นำเสนอเป็น Dashboard แสดงสภาพแวดล้อม EdSim51DI: หน้าต่างโปรเซสเซอร์, ความถี่ 12 MHz, การตั้งค่า TH0 = 06H, และสถิติจำนวนคำสั่งที่ทดสอบ 41.6 ล้านคำสั่ง ให้ดูเป็นผลการวิจัยทางวิศวกรรมที่น่าเชื่อถือ

---

### สไลด์ 18: ผลการวัดเวลาจริงและการรับรองความปลอดภัย (Verification Results)
- **สภาพที่เป็นอยู่:** ตารางผลการทดสอบขนาดใหญ่และกล่องข้อความยาวด้านล่าง
- **สิ่งที่ต้องแก้ไข (Action Items):**
  - ปรับตารางให้มี **Badge รับรองความปลอดภัย (Pass Status Badges)** สีเขียวสวยงาม
  - เพิ่มกราฟแท่งเปรียบเทียบขนาดเล็ก (Micro-Bar Chart) แสดงค่าเวลาที่ออกแบบ vs ค่าที่วัดได้จริง
  - กล่องข้อความการป้องกัน Shoot-Through จัดเป็นกล่อง Safety Certification Callout Box ระดับอุตสาหกรรม

---

### สไลด์ 19: สรุปและการทดสอบฮาร์ดแวร์ขั้นต่อไป (Conclusion & Roadmap)
- **สภาพที่เป็นอยู่:** การ์ด 2 ใบพร้อม Bullet ข้อความธรรมดา
- **สิ่งที่ต้องแก้ไข (Action Items):**
  - ปรับเป็นการ์ดสรุปความสำเร็จ (Project Milestones) พร้อมไอคอนความสำเร็จ
  - ฝั่งขวาจัดทำเป็น **Hardware Roadmap Pipeline** (Inrush Current Test → Coasting Time Test → Thermal Validation → Optical Alignment)

---

## 4. มาตรฐานระบบดีไซน์และพิกัดคณิตศาสตร์ (Design System Specification)

เพื่อให้ AI Agent ที่ทำหน้าที่ด้าน 2D/3D และการจัดสไลด์สามารถทำงานได้อย่างไร้ที่ติ ต้องบังคับใช้กฎพิกัดและดีไซน์โทเคนดังต่อไปนี้:

### 4.1 แคนวาสและพื้นที่ปลอดภัย (Canvas & Safe Boundaries)
- **ความละเอียด:** 1920 × 1080 พิกเซล (อัตราส่วน 16:9 ไวด์สกรีน)
- **ระยะขอบปลอดภัย (Safe Margins):**
  - ขอบซ้าย (Left Margin): `96 px`
  - ขอบขวา (Right Margin): `96 px` (ความกว้างเนื้อหาใช้งานได้ = `1728 px`)
  - ขอบบน (Top Margin): `80 px`
  - ขอบล่าง (Bottom Margin): `90 px` (ความสูงเนื้อหาใช้งานได้ = `910 px`)
- **พื้นที่หวงห้ามของเลขหน้า (Folio Safe Zone):**
  - ห้ามวางวัตถุ กล่องข้อความ หรือเส้นสายใดๆ เข้าไปในพิกัด `X ≥ 1760 px` และ `Y ≥ 990 px` เด็ดขาด เพื่อป้องกันการทับซ้อนกับเลขหน้า

### 4.2 มาตรฐานเลขหน้า (Page Numbering Rules)
- **สไลด์ 1 (หน้าปก):** **ซ่อนเลขหน้า 100% (No Folio)**
- **สไลด์ 2 ถึง 19:** แสดงเลขหน้าเรียบหรูที่มุมขวาล่าง พิกัด `X = 1780, Y = 1010` ขนาด 14pt สีเทา `#64748B` ในรูปแบบ `02` หรือ `02 / 19`

### 4.3 ระบบสเกลตัวพิมพ์ที่เข้มงวด (Strict Typographic Hierarchy)
| ลำดับชั้นตัวพิมพ์ (Hierarchy) | ขนาดฟอนต์ (Font Size) | น้ำหนัก (Weight) | สีข้อความ (Color) | การใช้งาน |
| :--- | :---: | :---: | :---: | :--- |
| **Hero Display** | 36pt | Bold | `#0F172A` (Slate 900) | ชื่อหัวเรื่องหน้าปกสไลด์ 1 |
| **Slide Title (H1)** | 24pt | Bold | `#0F172A` (Slate 900) | หัวเรื่องหลักของทุกหน้า (Y = 80) |
| **Section Header (H2)** | 18pt | SemiBold | `#0284C7` (Sky 600) | หัวข้อการ์ดหรือหมวดหมู่เนื้อหา |
| **Body Text** | 14pt | Regular | `#334155` (Slate 700) | เนื้อหาอธิบายหลัก |
| **Caption / Subtext** | 11pt | Regular | `#64748B` (Slate 500) | คำอธิบายเพิ่มเติมเชิงวิศวกรรม |
| **Code / Register** | 12pt | Mono/SemiBold | `#0369A1` (Sky 700) | คำสั่ง Assembly, ชื่อขาพิน, พารามิเตอร์ |

### 4.4 พาเล็ตต์สีวิศวกรรมสากล (Industrial Tech Color Palette)
- **Background:** ขาวบริสุทธิ์ `#FFFFFF` สลับการ์ดพื้นหลังเทาสว่าง `#F8FAFC`
- **Primary Ink:** น้ำเงินเข้มเกือบดำ `#0F172A`
- **Primary Accent:** น้ำเงินวิศวกรรม `#2563EB`
- **Secondary Accent:** ฟ้าเทคโนโลยี `#0284C7`
- **Safety / Normal:** เขียวมรกต `#059669` (พื้นหลัง `#ECFDF5`)
- **Warning / Dead Time:** ส้มอำพัน `#D97706` (พื้นหลัง `#FFFBEB`)
- **Hazard / Emergency:** แดงทับทิม `#DC2626` (พื้นหลัง `#FEF2F2`)
- **Border Lines:** เทาตัดเส้นมาตรฐาน `#E2E8F0` หนา 1 ถึง 1.5 pt

---

## 5. ชุดคำสั่งแม่แบบสำหรับ AI Agent สเต็ปถัดไป (Prompt Engineering Blueprints)

### 5.1 Prompt สำหรับ AI เจนเนอเรต Asset 2D/3D (Visual Generation Agent)

#### ชุดที่ 1: ประตูบานเลื่อน 3D ประจำหน้าปก (Slide 1 Hero Asset)
```text
Professional 3D studio render of a modern commercial automatic glass sliding door system, 
stainless steel frame, sleek ceiling mount motor track with realistic exposed timing belt and gear pulley on top, 
two clean horizontal infrared safety beams (one at knee height, one at chest height) glowing with subtle cyan and crimson light across the door opening, 
ultra-realistic glass reflection, architectural clean studio lighting, isolated on pure white background, 
isometric 3/4 front elevation angle, 8k resolution, photorealistic industrial design, no text, no artifacts, transparent PNG.
```

#### ชุดที่ 2: Storyboard ลำดับอันตราย 3 ขั้นตอน (Slide 2 Hazard Storyboard Trio)
```text
Engineering technical storyboard illustration, 3 sequential horizontal panels showing automatic door safety mechanism:
Panel 1: A child walking through a sliding door threshold, single chest-level sensor fails to detect the low obstacle.
Panel 2: Conventional door continues closing, hazard warning pinch point, red caution icon indicating entrapment danger.
Panel 3: Advanced dual-beam safety system detects the obstacle at ground level, motor instantly enters 200ms dead-time and safely reverses to full open, green safety shield icon.
Clean minimalist technical vector art style, refined proportions, accurate human anatomy, pastel engineering tones (navy, slate, emergency red, safety green), isolated on pure white background, 8k, ultra-sharp.
```

#### ชุดที่ 3: ชิป AT89S52 3D DIP-40 เสมือนจริง (Slide 4 Microcontroller Asset)
```text
Photorealistic top-down macro studio photography of an authentic ATMEL AT89S52 microcontroller integrated circuit, 
40-pin Dual In-line Package (DIP-40), matte black epoxy casing, realistic laser-etched white top markings reading "ATMEL AT89S52 24PU", 
semi-circular notch clearly visible on top edge, 20 silver tinned metallic pins extending symmetrically on each side (total 40 pins), 
clean studio shadow underneath, perfectly straight vertical orientation, isolated on transparent background, ultra-sharp macro engineering photography, 8k.
```

#### ชุดที่ 4: สวิตช์หยุดฉุกเฉิน 3D E-Stop Button (Slide 4 Emergency Stop Switch Asset)
```text
Photorealistic 3D studio render of an industrial Emergency Stop push button switch, 
prominent red mushroom head actuator with white rotational reset arrows, yellow safety collar base, 
heavy-duty industrial grade, top-down isometric angle, isolated on transparent background, 8k, realistic plastic and metal textures.
```

---

### 5.2 กฎเหล็กสำหรับ AI ผู้ประกอบสไลด์ (Slide Assembly Agent Directives)

1. **ห้ามสร้างไฟล์ใหม่:** ต้องทำการปรับปรุงลงบนไฟล์ [Sliding_Door_Safety_Control_Version_2_Refined.pptx](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/mini-project/output/version2/Sliding_Door_Safety_Control_Version_2_Refined.pptx) เท่านั้น และห้ามแตะต้องไฟล์ต้นฉบับ `Sliding_Door_Safety_Control_Version_2_Final.pptx`
2. **ห้ามใช้สูตรคณิตศาสตร์แบบ KaTeX หรือเครื่องหมาย Dollar Sign ($):** ปฏิบัติตามกฎ Zero-Dollar-Sign อย่างเคร่งครัด ใช้สัญลักษณ์ยูนิโค้ด (`×`, `→`, `²`, `Ω`, `µs`) เท่านั้น
3. **ตรวจสอบพิกัดการลากเส้น:** เส้นเดินสายสัญญาณทุกเส้นต้องมีพิกัดจุดเริ่มต้นและจุดสิ้นสุดที่แตะขอบกล่องหรือขั้วอุปกรณ์อย่างแม่นยำ ห้ามลากผ่าทะลุรูปภาพอุปกรณ์ และหัวลูกศรต้องติดอยู่ที่ปลายเส้นเสมอ
4. **ความถูกต้องของขาไมโครคอนโทรลเลอร์:** ขาพอร์ต Port 1 (P1.0 - P1.7) และ Port 2 (P2.0 - P2.7) ต้องตรงตามสเปกฮาร์ดแวร์จริงของโครงงาน 8051 ห้ามจินตนาการหรือสลับขาโดยพลการ
5. **การจัดสัดส่วนแบบ Modular Hierarchy:** ทุกกล่องข้อความต้องมี Margin ภายในอย่างน้อย 8 px และต้องจัดข้อความให้อยู่กึ่งกลางแนวตั้ง (Vertical Center) เสมอ ไม่ทิ้งพื้นที่ว่างเปล่าครึ่งล่าง

---

**สรุปสถานะเอกสาร:** จัดทำและบันทึกไว้ในไดเรกทอรี [quality_audit](file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/mini-project/output/version2/quality_audit) เพื่อเป็นเอกสารอ้างอิงหลัก (SSOT) สำหรับเตรียมการปรับปรุงสไลด์ทั้งชุดในขั้นตอนต่อไปอย่างสมบูรณ์แบบ
