; ==============================================================================
; SLIDING_DOOR_CLASSROOM.asm
; ระบบประตูเลื่อนบานเดี่ยวตรวจจับสิ่งกีดขวางและเปิดกลับ
; เขียนตามรูปแบบที่ใช้สอนในชั้นเรียน คือแยกบล็อกตามสถานะ ตั้งค่าพอร์ต
; หน่วงเวลาด้วยลูป CALL Delay กับ DJNZ ตรวจเงื่อนไขด้วย JB/JNB แล้วกระโดด
; เปลี่ยนสถานะ ทดสอบด้วย assembler และ CPU ของ EdSim51 2.1.39
;
; แรงดันที่ใช้
;   5 V   ไฟเลี้ยง 8051, VCC1 ของ L293D, ฝั่งเอาต์พุตของออปโตคัปเปลอร์, LED, บัซเซอร์
;   12 V  VCC2 ของ L293D, มอเตอร์เกียร์ DC, เซนเซอร์ลำแสง E3Z
;   สัญญาณอินพุตทุกเส้นเข้า 8051 ที่ระดับ 5 V เท่านั้น ห้ามต่อ 12 V เข้าขาโดยตรง
;
; ค่าหน่วงเวลา (คริสตัล 12.000 MHz, 12 clock ต่อ machine cycle, 1 machine cycle = 1 us)
;   Delay 1 ครั้ง = 20 ms   (Timer 0 โหมด 1, ค่าเริ่มนับ B1E0H = 65536 - 20000)
;   R1 = 1   ->  20 ms      หน่วงกันสัญญาณกระเพื่อมของปุ่ม
;   R1 = 10  ->  200 ms     หยุดนิ่งก่อนกลับทิศ และหยุดนิ่งก่อนรับคำสั่งใหม่
;   R1 = 150 ->  3.00 s     ทางผ่านต้องว่างต่อเนื่องก่อนเริ่มปิด
;   R1 = 250 ->  5.00 s     เวลาสูงสุดของการเดินทางหนึ่งเที่ยว
;
; พอร์ตเอาต์พุต P1 (ค่าที่เขียนคือระดับขา ไม่ใช่สถานะเปิดปิดของอุปกรณ์)
;   P1.0 IN1   P1.1 IN2   ขาสั่งทิศทางของ L293D
;   P1.2 RUN_N ระดับ 1 ตัดการทำงานของ L293D ผ่านวงจรกลับเฟสภายนอก
;   P1.4 RED_N P1.5 GREEN_N P1.7 BUZZ_N ทำงานที่ระดับ 0
;   P0 = F8H OR หมายเลขสถานะ ใช้ดูสถานะปัจจุบันบนบอร์ดทดสอบ
;
; พอร์ตอินพุต P2 (เขียนค่า FFH ครั้งเดียวแล้วอ่านอย่างเดียว)
;   P2.0 ปุ่มภายใน   P2.1 ปุ่มภายนอก   ระดับ 0 เมื่อกด
;   P2.2 ลำแสงล่าง   P2.5 ลำแสงบน      ระดับ 1 เมื่อถูกบังหรือไฟเซนเซอร์หาย
;   P2.3 ลิมิตเปิด LO P2.4 ลิมิตปิด LC  ระดับ 0 เมื่อถึงตำแหน่ง
;   P2.6 ปุ่มรีเซ็ต   ระดับ 0 เมื่อกด
;   P2.7 โซ่หยุดฉุกเฉินแบบหน้าสัมผัสปกติปิด ระดับ 0 คือปกติ
;
; ทุกสถานะตัดแรงขับด้วย SETB P1.2 ก่อน แล้วจึงตั้งทิศทางขณะที่ยังตัดแรงขับอยู่
; จากนั้นจึงจ่ายแรงขับ ลำดับนี้ป้องกันการกลับทิศขณะมอเตอร์ยังหมุน
; ==============================================================================

                ORG  0000H

; ---------- เริ่มต้นระบบ: ตรวจว่าประตูอยู่ที่ปลายทางใด ----------
START:
                MOV  P2,#0FFH           ; P2 เป็นอินพุตทั้งพอร์ต
                SETB P1.2               ; ตัดแรงขับมอเตอร์
                MOV  P1,#0ECH           ; ไฟแดงติด รอตรวจตำแหน่ง
                MOV  P0,#0F8H           ; รหัสสถานะเริ่มต้น
                MOV  R0,#00H            ; R0 = 0 = Start
                MOV  TMOD,#01H          ; Timer 0 โหมด 1 ขนาด 16 บิต
                CALL Delay              ; รอ 20 ms ให้สัญญาณนิ่ง
                JB   P2.7,StartFault    ; โซ่หยุดฉุกเฉินขาดหรือถูกกด
                JNB  P2.3,StartOpen     ; อยู่ที่ลิมิตเปิด
                JNB  P2.4,StartClosed   ; อยู่ที่ลิมิตปิด
StartFault:
                LJMP FaultState         ; ไม่ทราบตำแหน่งจึงไม่เคลื่อนที่เอง
StartOpen:
                JNB  P2.4,StartFault    ; ลิมิตสองตัวพร้อมกันคือขัดแย้ง
                LJMP HoldState
StartClosed:
                LJMP ClosedState

; ---------- สถานะ 1: ClosedState ประตูปิดสนิท ----------
ClosedState:
                SETB P1.2               ; มอเตอร์หยุด
                MOV  R0,#01H            ; R0 = 1 = Closed
                MOV  P0,#0F9H
                MOV  P1,#0FCH           ; ไฟและเสียงเตือนดับทั้งหมด
                MOV  R1,#10             ; 10 x 20 ms = 200 ms หยุดนิ่งก่อนรับคำสั่ง
ClosedSettle:
                CALL Delay
                DJNZ R1,ClosedSettle
ClosedLoop:
                JB   P2.7,ClosedFault   ; หยุดฉุกเฉิน
                JB   P2.4,ClosedFault   ; ลิมิตปิดหลุดทั้งที่ยังไม่สั่งเคลื่อน
                JNB  P2.0,ClosedPress   ; ปุ่มภายใน
                JNB  P2.1,ClosedPress   ; ปุ่มภายนอก
                SJMP ClosedLoop
ClosedPress:
                CALL Delay              ; 20 ms กันสัญญาณกระเพื่อม
                JNB  P2.0,ClosedGo
                JNB  P2.1,ClosedGo
                SJMP ClosedLoop
ClosedGo:
                LJMP OpeningState
ClosedFault:
                LJMP FaultState

; ---------- สถานะ 2: OpeningState ประตูกำลังเปิด ----------
OpeningState:
                SETB P1.2               ; ตัดแรงขับก่อนตั้งทิศทาง
                MOV  R0,#02H            ; R0 = 2 = Opening
                MOV  P0,#0FAH
                MOV  P1,#0DDH           ; ตั้งทิศทางเปิดขณะยังตัดแรงขับ
                MOV  P1,#0D9H           ; จ่ายแรงขับ ไฟเขียวติด
                MOV  R1,#250            ; 250 x 20 ms = 5 s เวลาสูงสุด
OpeningLoop:
                JB   P2.7,OpeningFault  ; หยุดฉุกเฉิน
                JNB  P2.3,OpeningDone   ; ถึงลิมิตเปิด
                CALL Delay
                DJNZ R1,OpeningLoop
OpeningFault:
                LJMP FaultState         ; เดินทางเกินเวลาที่กำหนด
OpeningDone:
                LJMP HoldState

; ---------- สถานะ 3: HoldState ประตูเปิดค้าง ----------
HoldState:
                SETB P1.2               ; มอเตอร์หยุด
                MOV  R0,#03H            ; R0 = 3 = Hold
                MOV  P0,#0FBH
                MOV  P1,#0DCH           ; ไฟเขียวติด
HoldRestart:
                MOV  R1,#150            ; 150 x 20 ms = 3.00 s ต้องว่างต่อเนื่อง
HoldLoop:
                JB   P2.7,HoldFault     ; หยุดฉุกเฉิน
                JB   P2.3,HoldFault     ; ลิมิตเปิดหลุด
                JB   P2.2,HoldRestart   ; ลำแสงล่างถูกบัง เริ่มนับใหม่
                JB   P2.5,HoldRestart   ; ลำแสงบนถูกบัง เริ่มนับใหม่
                JNB  P2.0,HoldRestart   ; ยังกดปุ่มภายใน
                JNB  P2.1,HoldRestart   ; ยังกดปุ่มภายนอก
                CALL Delay
                DJNZ R1,HoldLoop
                LJMP ClosingState
HoldFault:
                LJMP FaultState

; ---------- สถานะ 4: ClosingState ประตูกำลังปิด ----------
ClosingState:
                SETB P1.2               ; ตัดแรงขับก่อนตั้งทิศทาง
                MOV  R0,#04H            ; R0 = 4 = Closing
                MOV  P0,#0FCH
                MOV  P1,#06EH           ; ตั้งทิศทางปิดขณะยังตัดแรงขับ
                MOV  P1,#06AH           ; จ่ายแรงขับ ไฟแดงและเสียงเตือนทำงาน
                MOV  R1,#250            ; 250 x 20 ms = 5 s เวลาสูงสุด
ClosingLoop:
                JB   P2.7,ClosingFault  ; หยุดฉุกเฉิน
                JB   P2.2,ClosingStop   ; ลำแสงล่างถูกบัง
                JB   P2.5,ClosingStop   ; ลำแสงบนถูกบัง
                JNB  P2.0,ClosingStop   ; มีการกดปุ่มภายใน
                JNB  P2.1,ClosingStop   ; มีการกดปุ่มภายนอก
                JNB  P2.4,ClosingDone   ; ถึงลิมิตปิด
                CALL Delay
                DJNZ R1,ClosingLoop
ClosingFault:
                LJMP FaultState         ; เดินทางเกินเวลาที่กำหนด
ClosingStop:
                SETB P1.2               ; ตัดแรงขับทันทีที่พบสิ่งกีดขวาง
                LJMP RevWaitState
ClosingDone:
                LJMP ClosedState

; ---------- สถานะ 5: RevWaitState หยุดนิ่งก่อนกลับทิศ ----------
RevWaitState:
                SETB P1.2               ; มอเตอร์หยุด
                MOV  R0,#05H            ; R0 = 5 = RevWait
                MOV  P0,#0FDH
                MOV  P1,#06CH           ; ไฟแดงและเสียงเตือนทำงาน
                MOV  R1,#10             ; 10 x 20 ms = 200 ms ให้แกนหยุดสนิท
RevLoop:
                JB   P2.7,RevFault      ; หยุดฉุกเฉิน
                CALL Delay
                DJNZ R1,RevLoop
                LJMP ReopenState
RevFault:
                LJMP FaultState

; ---------- สถานะ 6: ReopenState เปิดกลับอัตโนมัติ ----------
ReopenState:
                SETB P1.2               ; ตัดแรงขับก่อนตั้งทิศทาง
                MOV  R0,#06H            ; R0 = 6 = Reopen
                MOV  P0,#0FEH
                MOV  P1,#06DH           ; ตั้งทิศทางเปิดขณะยังตัดแรงขับ
                MOV  P1,#069H           ; เปิดกลับพร้อมเสียงเตือน
                MOV  R1,#250            ; 250 x 20 ms = 5 s เวลาสูงสุด
ReopenLoop:
                JB   P2.7,ReopenFault   ; หยุดฉุกเฉิน
                JNB  P2.3,ReopenDone    ; ถึงลิมิตเปิด
                CALL Delay
                DJNZ R1,ReopenLoop
ReopenFault:
                LJMP FaultState
ReopenDone:
                LJMP HoldState

; ---------- สถานะ 7: FaultState ขัดข้อง รอการรีเซ็ตด้วยมือ ----------
FaultState:
                SETB P1.2               ; ตัดแรงขับจนกว่าจะรีเซ็ต
                MOV  R0,#07H            ; R0 = 7 = Fault
                MOV  P0,#0FFH
                MOV  P1,#06CH           ; ไฟแดงค้างและเสียงเตือนค้าง
FaultRelease:
                JNB  P2.6,FaultRelease  ; ต้องปล่อยปุ่มรีเซ็ตก่อน
FaultLoop:
                JNB  P2.6,FaultCheck    ; กดปุ่มรีเซ็ต
                SJMP FaultLoop
FaultCheck:
                CALL Delay              ; 20 ms กันสัญญาณกระเพื่อม
                JB   P2.6,FaultLoop     ; ปล่อยเร็วเกินไป ไม่นับ
                JB   P2.7,FaultLoop     ; ยังกดหยุดฉุกเฉินอยู่
                JB   P2.2,FaultLoop     ; ลำแสงล่างยังถูกบัง
                JB   P2.5,FaultLoop     ; ลำแสงบนยังถูกบัง
                LJMP START              ; กลับไปตรวจตำแหน่งใหม่

; ---------- ซับรูทีน Delay หน่วง 20 ms ด้วย Timer 0 ----------
; 12.000 MHz, 12 clock ต่อ machine cycle จึงได้ 1 machine cycle = 1 us
; ค่าเริ่มนับ B1E0H = 65536 - 20000 ทำให้ล้นหลังนับครบ 20000 us = 20 ms
Delay:
                CLR  TR0                ; หยุดตัวนับก่อนตั้งค่า
                MOV  TH0,#0B1H          ; ไบต์สูงของ B1E0H
                MOV  TL0,#0E0H          ; ไบต์ต่ำของ B1E0H
                CLR  TF0                ; ล้างธงล้น
                SETB TR0                ; เริ่มนับ
DelayWait:
                JNB  TF0,DelayWait      ; รอจนตัวนับล้น
                CLR  TR0
                CLR  TF0
                RET

                END
