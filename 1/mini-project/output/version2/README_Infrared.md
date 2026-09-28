# งานนำเสนอประตูเลื่อนพร้อมลำแสงกันหนีบ

- `Sliding_Door_Safety_Control_Infrared.pptx` งานนำเสนอ 15 หน้า มี Speaker Notes ภาษาไทยครบทุกหน้า
- `infrared_preview/` ภาพ PNG ของสไลด์ทั้ง 15 หน้า
- `Infrared_Speaker_Notes.md` บทพูดและแหล่งอ้างอิงสำหรับอ่านแยกจาก PowerPoint
- `Infrared_State_Table.csv` ตารางค่าพอร์ต
- `Infrared_Engineering_Notes.md` ข้อมูลวงจร สมมติฐาน ข้อจำกัด และหลักฐานทดสอบ
- `infrared_source/` สคริปต์สร้างสไลด์ แบบจำลอง FSM และชุดทดสอบ
- `infrared_assets/` ภาพประกอบสถานการณ์และกลไกที่ใช้ในสไลด์

ตาราง FSM วงจร และข้อความเป็นวัตถุที่แก้ไขได้ใน PowerPoint ภาพบริบทบ้านและต้นแบบกลไกเป็นภาพประกอบ ไม่ใช่ภาพถ่ายชุดทดลองจริง

## ฟอนต์

ใช้ Prompt, Sarabun และ JetBrains Mono ไฟล์ฟอนต์พร้อมใบอนุญาตอยู่ใน `formal_source/fonts/` ควรติดตั้งฟอนต์เหล่านี้บนเครื่องที่จะเปิดแก้ไขหรือฉาย PPTX เพื่อรักษาหน้าตาและระยะข้อความ ฟอนต์ไม่ได้ฝังในไฟล์ PPTX ภาพพรีวิว PNG แสดงรูปแบบที่ตรวจแล้ว

## การสร้างซ้ำบน workspace นี้

ใช้ Node.js ของ Codex runtime และไลบรารี `@oai/artifact-tool` ตามเส้นทางที่ระบุในสคริปต์ ไม่ใช้ python-pptx ในการสร้างสไลด์

```sh
python3 infrared_source/test_fsm_model.py
node infrared_source/build_deck.mjs
node infrared_source/finalize.mjs /absolute/path/to/new-output.pptx
node infrared_source/render.mjs /absolute/path/to/new-output.pptx /absolute/path/to/preview
```

กำหนดผลลัพธ์การ finalize เป็นชื่อใหม่เมื่อสร้างซ้ำ เพื่อเก็บไฟล์ที่ตรวจแล้วไว้ก่อน สคริปต์ตรวจ 15 หน้าและตารางที่แก้ไขได้ตามข้อกำหนด

## สถานะการทดสอบ

ผ่าน 21 กรณีในแบบจำลอง Python ที่ก้าวเวลา 1 ms ยังไม่ใช่ผลทดสอบ EdSim51 หรือชุดฮาร์ดแวร์ของเฟิร์มแวร์นี้ รายละเอียดอยู่ในเอกสารวิศวกรรมและสไลด์ผลการทดสอบ
