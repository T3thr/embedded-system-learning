# ชุดสไลด์ปรับหน้าปกและแยกปัญหากับแนวทางแก้ไข

ไฟล์งาน: [Sliding_Door_Safety_Control_Infrared_Revised.pptx](Sliding_Door_Safety_Control_Infrared_Revised.pptx)

จำนวน 16 สไลด์รวมหน้าปก หน้าปกไม่มีเลขหน้า และหน้าถัดไปเริ่มที่ 01

- หน้าปก: ชื่อไทยตัวหนาและชื่อภาษาอังกฤษด้านล่าง
- หน้า 01: สถานการณ์เสี่ยงหนีบขณะประตูกำลังปิด อธิบายเฉพาะปัญหา
- หน้า 02: แนวทางแก้ไขด้วยโฟโต้เซนเซอร์ แสดงการติดตั้งบนกรอบคงที่และการเปิดกลับค้างรอผู้ใช้
- หน้า 03 เป็นต้นไป: เนื้อหาทางเทคนิคเดิม โดยเลื่อนเลขหน้าตามหน้าที่เพิ่ม

[ภาพพรีวิวทั้งชุด](infrared_scenario_preview/index.html)

[บทพูดผู้บรรยาย](Infrared_Scenario_Speaker_Notes.md)

ภาพใหม่เป็นภาพจำลองที่สร้างด้วย built-in ImageGen ไม่ใช่ภาพถ่ายชุดประกอบหรือผลทดสอบจริง ภาพปัญหาและภาพติดตั้งใช้บ้าน ประตู และมุมกล้องเดียวกัน ส่วนภาพรายละเอียดหัวรับอ้างอิงภาพติดตั้ง

- [Prompt ภาพปัญหาและภาพติดตั้ง](infrared_scenario_source/image_prompts.md)
- [Prompt ภาพรายละเอียดหัวรับ](infrared_scenario_source/receiver_detail_prompt.md)
- สินทรัพย์: `infrared_final_assets/problem_context.png`, `solution_installation.png` และ `solution_receiver_detail.png`
- สคริปต์สร้าง: `infrared_scenario_source/build_deck.mjs`

ฟอนต์ที่ใช้คือ Prompt, Sarabun และ JetBrains Mono ควรติดตั้งบนเครื่องที่จะนำเสนอเพื่อรักษารูปแบบ ไฟล์ไม่ได้ฝังฟอนต์

ข้อมูลวิศวกรรมและผลทดสอบใช้ตามชุดก่อนหน้า: [ข้อมูลวงจร](Infrared_Final_Engineering_Notes.md) ผล 21 จาก 21 กรณีเป็นผลแบบจำลอง Python ไม่ใช่ผล EdSim51 หรือการวัดฮาร์ดแวร์
