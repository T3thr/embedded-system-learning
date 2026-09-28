# แหล่งที่มาของภาพประกอบ

## ภาพผลิตภัณฑ์จริง

- `../infrared_final_assets/motor.jpg`: ภาพผลิตภัณฑ์ Pololu #3041 จากสินทรัพย์ชุดเดิม ใช้ขยายส่วนเพลาในหน้า FSM
- `../infrared_final_assets/motor-rear.jpg`: ภาพขั้วมอเตอร์จาก [Pololu #3041 pictures](https://www.pololu.com/product/3041/pictures) ในสไลด์แสดงเฉพาะมอเตอร์ HPCB ด้านซ้ายของภาพต้นฉบับด้วย native picture crop ของ PowerPoint ไม่แก้พิกเซลและคงข้อความแหล่งที่มา
- URL ภาพมอเตอร์: https://a.pololu-files.com/picture/0J6385.1200.jpg?fa0fc539b2d5416846a22aa63b447062
- `../infrared_final_assets/limit.png` และ `button.jpg`: สินทรัพย์ที่ดึงจากชุดสไลด์และ PDF เดิม เพื่อคงลักษณะอุปกรณ์อ้างอิง
- `../infrared_final_assets/opto.jpg`: ภาพ VO617A มุมเอียงจากชุดอ้างอิงเดิม

## ภาพประกอบจากชุดเดิม

`mcu_fixed.png`, `driver.png`, `inverter.png`, `resistor.png`, `sensor.png`, `estop.png` เป็นภาพประกอบอุปกรณ์จากชุดงานเดิม ไม่ใช้เป็นหลักฐานว่าประกอบหรือทดสอบฮาร์ดแวร์แล้ว ตำแหน่งขาและวงจรใช้ข้อมูล datasheet ผู้ผลิตตามเอกสารวิศวกรรม ไม่อนุมานการต่อวงจรจากข้อความในภาพ

ภาพ `storyboard.png` และ `mechanism.png` เป็นภาพจำลองแนวคิดจากงานเดิม คำสั่งสร้างเดิมเก็บใน `../infrared_source/image_prompts.md` ภาพเหล่านี้ไม่ใช่ภาพถ่ายชุดสาธิตที่สร้างเสร็จ

## ภาพที่ปรับด้วยเครื่องมือสร้างภาพในการแก้ไขครั้งนี้

- วิธี: built-in ImageGen, precise-object-edit ไม่ใช้ API หรือ CLI
- ผลลัพธ์ที่ใช้: `../infrared_final_assets/opto_top.png`
- สินทรัพย์ต้นทาง: ภาพออปโตคัปเปลอร์ในชุดเดิม
- เป้าหมายการแก้: ย้ายเครื่องหมายขา 1 ไปมุมบนซ้ายและเพิ่มรอยบากด้านบน เพื่อให้ทิศทาง DIP-4 สอดคล้องกับป้ายขา native ที่วางบนสไลด์

ข้อกำหนดสุดท้ายสำหรับการปรับภาพ:

> Precise object edit of the supplied orthographic top-view DIP-4 VO617A optocoupler. Remove the lower-left dimple. Add a subtle pin-1 mark at the upper-left corner and a small centered semicircular notch on the top edge. Keep exactly four metal leads, two on each side, with standard top-view numbering: 1 upper-left, 2 lower-left, 3 lower-right, 4 upper-right. Preserve the black package, VO617A marking, realistic metal material, orthographic view, and clean white background. No extra pins, labels, wires, or text.

ตรวจภาพแล้วว่ามีขาสี่ขาและเครื่องหมายอยู่ด้านบน การครอปและป้ายกำกับขา 1 A, 2 K, 3 E, 4 C ทำด้วยวัตถุ native ของสไลด์ สายวงจรไม่ได้สร้างด้วย ImageGen
