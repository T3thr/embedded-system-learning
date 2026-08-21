# บทเรียนปูพื้นก่อนพูดหัวข้อ Interrupt Mechanism

เอกสารนี้มีจุดประสงค์ให้เข้าใจเหตุผลของทุกประโยคในบทพูด ไม่ใช่ให้จำถ้อยคำโดยไม่เข้าใจ ควรอ่านให้สามารถวาดลำดับเหตุการณ์ด้วยตนเอง และสามารถตอบได้ว่าแต่ละคำเป็นแนวคิดทั่วไปหรือเป็นรายละเอียดเฉพาะของสถาปัตยกรรมใด

## 1. ภาพใหญ่: embedded system กำลังแก้ปัญหาอะไร

ระบบฝังตัวคือคอมพิวเตอร์ที่ถูกนำไปฝังอยู่ในระบบที่มีหน้าที่เฉพาะ เช่น ควบคุมมอเตอร์ อ่านเซนเซอร์ รับข้อมูลสื่อสาร หรือรักษาจังหวะเวลาของอุปกรณ์ ระบบหนึ่งประกอบด้วย input, computation และ output กล่าวคือรับสัญญาณจากโลกภายนอก แปลงเป็นข้อมูล ทำการตัดสินใจ แล้วส่งผลกลับไปยังอุปกรณ์

ไมโครคอนโทรลเลอร์รวมหน่วยประมวลผล หน่วยความจำ พอร์ต I/O ตัวจับเวลา และวงจรควบคุม peripheral ไว้ในชิปเดียว จุดสำคัญคือ CPU ไม่ได้ทำงานอยู่ลำพัง แต่ต้องตอบสนองต่อสิ่งที่เกิดขึ้นใน peripheral หากให้โปรแกรมหลักวนตรวจทุกอุปกรณ์ตลอดเวลา โปรแกรมจะเสียเวลาและต้องกำหนดจังหวะตรวจเอง interrupt จึงเป็นกลไกให้ peripheral แจ้ง CPU เมื่อมีเหตุการณ์ที่ต้องสนใจ

**คำถามตรวจความเข้าใจ:** หากไม่มี interrupt ระบบยังทำงานได้หรือไม่ คำตอบคือได้ โดยใช้ polling แต่ CPU ต้องตรวจสถานะเองเป็นระยะ และต้องออกแบบความถี่ตรวจให้ไม่พลาดเหตุการณ์หรือเสียเวลาเกินจำเป็น

## 2. CPU ทำอะไรระหว่างโปรแกรมปกติ

โดยย่อ CPU ทำวงจร fetch–decode–execute คือ fetch คำสั่งจาก program memory ตามตำแหน่งที่ PC ชี้ decode ว่าคำสั่งนั้นหมายถึงอะไร และ execute คำสั่งโดยอ่านหรือเขียน register, memory หรือ peripheral จากนั้น PC จะเปลี่ยนไปยังคำสั่งถัดไป

**Program counter หรือ PC** จึงไม่ใช่ชื่อของโปรแกรม แต่เป็น register ที่เก็บตำแหน่งคำสั่งถัดไป หาก CPU กำลังทำงานที่ `main` และมี interrupt ที่รับได้ CPU ต้องมีวิธีจำว่าจะกลับไปที่ใด จุดนี้ทำให้ return address และ stack มีความสำคัญ

**Register** คือหน่วยเก็บข้อมูลขนาดเล็กที่อยู่ใกล้ CPU และใช้ระหว่างการคำนวณหรือควบคุม **Status register** เก็บ flag เช่น carry หรือสถานะผลการคำนวณ รายการ register ที่ hardware บันทึกตอน interrupt ไม่เหมือนกันทุกสถาปัตยกรรม จึงห้ามพูดว่า hardware เก็บ register ทุกตัวโดยอัตโนมัติ

## 3. Event, flag และ pending request

**Event** คือเหตุการณ์ เช่น ขอบสัญญาณที่ขา external interrupt, timer overflow หรือ byte มาถึง serial port วงจร peripheral มักแปลง event เป็น **flag** หรือ latch ซึ่งเป็นบิตสถานะ เช่น “เหตุการณ์เกิดแล้ว” จากนั้น flag และ enable logic จึงร่วมกันสร้าง request ที่ interrupt controller พิจารณา

**Pending** ไม่ได้แปลว่า CPU กำลังทำ ISR อยู่เสมอ แต่หมายถึงคำขอถูกตั้งขึ้นและยังรอการรับบริการหรือรอผ่านเงื่อนไข ตัวอย่างเช่น flag อาจเป็น 1 แต่ global enable เป็น 0 ทำให้คำขอยังไม่ถูกส่งไปเริ่ม ISR

การเคลียร์ flag ต้องดูอุปกรณ์จริง บางแหล่งถูก hardware clear เมื่อรับรู้ ขณะที่บางแหล่งต้องเขียน register หรืออ่านข้อมูลเพื่อเคลียร์ ใน 8051 manual ระบุว่าพฤติกรรมต่างกันตามแหล่ง interrupt จึงไม่ควรจำกฎว่า “hardware เคลียร์ flag ให้ทุกครั้ง”

## 4. Enable, mask และ priority ต่างกันอย่างไร

**Enable** คือการอนุญาตให้แหล่งนั้นมีสิทธิ์ทำให้ CPU ตอบสนอง อาจมี global enable และ local enable รายแหล่ง ส่วน **mask** คือการปิดกั้นหรือกรองคำขอ แม้คำขอจะเกิดขึ้นแล้วก็ตาม ในบางสถาปัตยกรรม mask เป็น register หรือ bit เฉพาะ ในบางกรณีใช้คำนี้เชิงแนวคิดเพื่ออธิบายว่า request ใดถูกป้องกัน

**Priority** คือกฎจัดลำดับเมื่อมีหลายคำขอพร้อมกัน ไม่ได้หมายความว่า interrupt priority สูงจะทำงานได้โดยไม่สนใจ enable หรือ mask คำขอต้องผ่านเงื่อนไขทั้งหมดก่อน ใน classic 8051 มี priority mechanism ตามที่ MCS-51 manual กำหนด ส่วน derivative อาจเพิ่มระดับ priority และ register เพิ่มเติม

สำหรับ 8051 ตัวอย่างสำคัญคือ `IE` ซึ่งเป็น Interrupt Enable SFR ที่ address `A8H`, `EA` เป็น global enable bit และ `IP` ที่ `B8H` ใช้กำหนด priority ตามรุ่นที่รองรับ สำหรับ AVR และ Cortex-M3 ชื่อ register และลำดับรายละเอียดต่างกัน ต้องเรียกชื่อของ architecture นั้นโดยตรง

## 5. Entry: CPU เข้า ISR ได้อย่างไร

เมื่อ request ผ่านเงื่อนไข controller จะเข้าสู่ interrupt entry ขั้นตอนเชิงนามธรรมคือหยุดการเปลี่ยน control flow ของโปรแกรมเดิม ณ จุดที่สถาปัตยกรรมอนุญาต เก็บข้อมูลที่จะใช้กลับมา แล้วระบุที่อยู่ของ handler จาก vector table หรือกลไก vector fetch

คำว่า **vector** มีความหมายเป็นข้อมูลสำหรับค้นหา handler ไม่จำเป็นต้องหมายถึงคำสั่ง ISR ทั้งหมด ใน classic 8051 vector เป็นตำแหน่งคงที่ใน program memory เช่น `0003H`, `000BH`, `0013H`, `001BH` และ `0023H` สำหรับแหล่งมาตรฐาน แต่ vector address ต้องอ้างอิง device manual เสมอ

คำว่า **hardware-generated LCALL** ใน MCS-51 หมายถึงวงจรสร้างพฤติกรรมคล้ายการเรียกแบบ long call เพื่อไปยัง vector และเก็บ PC กลับไว้ แต่ไม่ใช่สิ่งที่ควรเหมารวมว่า AVR หรือ Cortex-M3 ใช้กระบวนการเดียวกัน

## 6. Stack, return address และ context

**Stack** เป็นพื้นที่หน่วยความจำแบบ Last-In, First-Out หรือ LIFO ข้อมูลที่ใส่ล่าสุดจะถูกนำออกก่อน **SP หรือ Stack Pointer** ชี้ตำแหน่งยอด stack การเรียก subroutine อาจวาง return address บน stack และ interrupt entry ก็ต้องมีข้อมูลสำหรับกลับไปยังโปรแกรมเดิม

**Context** คือภาพรวมสถานะที่ทำให้โปรแกรมเดิมทำงานต่อได้ เช่น PC, register, status register, stack state และข้อมูลที่ ABI หรือ compiler กำหนด ใน 8051 manual hardware-generated interrupt response เก็บ PC แต่ไม่เก็บ PSW ให้โดยอัตโนมัติ หาก ISR แก้ A, B, PSW, R0 หรือ register อื่นที่โปรแกรมหลักต้องใช้ ISR ต้อง save และ restore เองตามรูปแบบที่ถูกต้อง

หลักสำคัญคือ save และ restore ต้องสมดุล หาก push 2 bytes แต่ pop 1 byte SP จะผิด หาก restore ลำดับผิด register จะสลับค่า และหากไม่รักษา status flag โปรแกรมหลักอาจให้ผลผิดแม้ PC จะกลับมาถูกตำแหน่ง

## 7. Service: ISR ต้องทำอะไร

ISR หรือ Interrupt Service Routine คือโค้ดที่รับผิดชอบเหตุการณ์ ISR ที่ดีควรทำงานจำเป็นให้ครบ ได้แก่ ตรวจว่าแหล่งใดเป็นสาเหตุ อ่านหรือเก็บข้อมูลที่ต้องไม่สูญหาย เคลียร์หรือ acknowledge สาเหตุ และส่งงานหนักไปทำใน main loop หรือ task หากทำได้

**Acknowledge** หมายถึงการทำให้ระบบหรือแหล่งกำเนิดทราบว่า request ถูกพบแล้ว วิธีอาจเป็นการเคลียร์ flag, อ่าน register หรือเขียนค่าตาม datasheet ไม่ใช่คำสั่งสากลคำเดียว

**Bounded ISR** คือ ISR ที่สามารถระบุขอบเขตเวลาหรืออย่างน้อยประเมิน worst-case ได้ เหตุผลที่ต้องสั้นไม่ใช่เพราะ ISR ห้ามทำงานมากเสมอไป แต่เพราะระหว่าง ISR คำขออื่นอาจรอ ทำให้เกิด latency และ jitter เพิ่มขึ้น

## 8. Return: RET กับ RETI

`RET` ใช้คืนจาก subroutine ปกติ โดยนำ return address จาก stack กลับเข้า PC ส่วน `RETI` ใช้จบ interrupt service routine และแจ้ง interrupt-control logic ว่าการบริการ interrupt สิ้นสุดลงแล้ว ทั้งสองคำสั่งเกี่ยวข้องกับการคืน PC แต่มีความหมายต่อระบบ interrupt ต่างกัน

Lecture 4 ถอดความว่า RETI คืนกลับและทำให้ EA เป็น 1 แต่คำกล่าวนี้ควรนำเสนอเป็นคำอธิบายแบบย่อของ lecture ไม่ใช่ architectural rule สากล Intel MCS-51 manual ให้คำอธิบายที่แม่นยำกว่าว่า RETI ดึง PC กลับและทำให้ interrupt logic ยอมรับ interrupt ที่ priority เดียวกันได้อีก ไม่ได้แปลว่า hardware restore register อื่นหรือเขียน EA เป็น 1 ทุกกรณี

ประโยคที่ปลอดภัยในการตอบอาจารย์คือ: “ในระดับ lecture RETI ถูกใช้เพื่อสื่อว่าการบริการ interrupt จบและระบบกลับมารับ interrupt ได้ ส่วนในระดับสถาปัตยกรรม MCS-51 RETI มีหน้าที่ end-of-interrupt และ restore interrupt-control state; ค่า EA และ flag อื่นต้องตรวจสอบจาก device manual ครับ”

## 9. Latency กับ jitter

**Interrupt latency** คือเวลาระหว่างการเกิดเหตุการณ์หรือ request จน ISR เริ่มทำงาน ค่านี้ขึ้นกับการตรวจ request, ความยาวคำสั่งที่กำลังทำ, การปิด interrupt, priority และการตอบสนองของ hardware

**Jitter** คือความไม่คงที่ของ latency ระหว่างเหตุการณ์ซ้ำ ๆ หากเหตุการณ์ควรตอบสนองทุกครั้งใกล้เคียงกัน แต่บางครั้งช้าเพราะ ISR อื่นหรือ critical section jitter จะสูงขึ้น ระบบ real-time จึงสนใจทั้งค่าเฉลี่ยและ worst-case ไม่ใช่เฉพาะความเร็วเฉลี่ย

## 10. สิ่งที่ต้องไม่พูดปะปน

| ห้ามเหมารวม | คำอธิบายที่ถูกต้อง |
|---|---|
| 8051, AVR และ ARM ใช้ vector แบบเดียวกัน | ทุกสถาปัตยกรรมมีวิธีระบุ handler แต่รูปแบบ vector table และ entry ต่างกัน |
| RETI เท่ากับตั้ง EA เป็น 1 เสมอ | Lecture 4 เขียนเป็นคำอธิบายย่อ; MCS-51 manual อธิบาย RETI เป็น end-of-interrupt และการคืน PC/interrupt state |
| hardware save register ทั้งหมด | ต้องระบุว่า architecture save อะไร; classic 8051 hardware save PC แต่ ISR ต้องรักษา register/PSW เพิ่มเอง |
| flag ถูกเคลียร์อัตโนมัติทุกครั้ง | flag behavior ขึ้นกับแหล่ง interrupt และ datasheet |
| priority สูงชนะทันที | request ต้องผ่าน enable/mask และกติกา acceptance ก่อน |
| interrupt ดีกว่า polling ทุกกรณี | เป็น trade-off ระหว่าง responsiveness, overhead, predictability และความซับซ้อน |

## แบบทดสอบก่อนขึ้นนำเสนอ

1. หาก `EA=0` ใน 8051 แต่ timer overflow เกิดขึ้น จะเกิดอะไรขึ้นกับ flag และ ISR คำตอบที่ปลอดภัยคือ flag หรือ request state อาจเกิดขึ้นตาม peripheral แต่ interrupt ไม่ถูกยอมรับจน global enable และเงื่อนไขอื่นผ่าน ต้องตรวจ device manual เรื่องการค้าง flag
2. ทำไม ISR ต้อง save register เอง เพราะ hardware ไม่ได้บันทึก context ทุกส่วน และโปรแกรมหลักต้องการค่าเดิมกลับคืน
3. ทำไมใช้ `RETI` แทน `RET` เพราะ interrupt controller ต้องได้รับสัญญาณว่าการบริการจบแล้ว ไม่ใช่แค่เปลี่ยน PC กลับ
4. ทำไม ISR ควรสั้น เพราะ ISR ที่นานเพิ่มเวลารอของ request อื่นและเพิ่ม latency/jitter
5. vector คือ ISR หรือไม่ ไม่ใช่เสมอไป vector คือข้อมูลหรือตำแหน่งที่นำไปสู่ handler; บางสถาปัตยกรรมมีคำสั่งกระโดดที่ตำแหน่ง vector
6. interrupt กับ exception เหมือนกันหรือไม่ เป็นกลไกเปลี่ยน control flow ไปยัง handler ที่คล้ายกัน แต่คำว่า interrupt มักหมายถึงเหตุการณ์จากภายนอกหรือ peripheral ส่วน exception อาจหมายถึงเหตุการณ์ภายใน processor; ต้องใช้ตามศัพท์ของ architecture
