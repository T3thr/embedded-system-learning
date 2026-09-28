async function buildFSM(){
 const s=add('สถาปัตยกรรมแบบจำลองสถานะ FSM','มองเข้าหาปลายเพลา: CW เปิดไปทางขวา และ CCW ปิดไปทางซ้าย',notesFor(4)+'\nภาพเพลามอเตอร์: ภาพผลิตภัณฑ์ Pololu #3041 จาก '+src.motor+' ลูกศรแสดงทิศตามข้อตกลงเมื่อมองเข้าหาปลายเพลา STOP และ Coast ใช้ EN=0 จึงไม่ใช่เบรกทางไฟฟ้า');
 const xs=[80,382,684,986],yy=[228,473],pos=[[xs[0],yy[0]],[xs[1],yy[0]],[xs[2],yy[0]],[xs[3],yy[0]],[xs[3],yy[1]],[xs[2],yy[1]],[xs[1],yy[1]]];
 for(let i=0;i<7;i++){let [x,y]=pos[i],col=i===6?C.hold:i===0||i===3?C.red:i===4?C.muted:C.green;rect(s,x,y,214,147,C.white,col,1.4);code(s,states[i],x+8,y+8,198,27,16,C.ink,'center');await photo(s,'motor.jpg',x+10,y+41,89,89,{left:.40,top:.35,right:0,bottom:.03});code(s,shafts[i],x+107,y+43,100,28,16,col);code(s,'P1='+hex[i],x+103,y+77,107,26,14.67,C.ink);txt(s,i===6?'ไฟส้ม':i===4?'200 ms':i===0||i===3?'ไฟแดง':'ไฟเขียว',x+107,y+109,97,24,16,col);if(shafts[i]==='CW'||shafts[i]==='CCW')turnArrow(s,x+78,y+109,19,shafts[i]==='CW',col);else {line(s,x+68,y+102,x+68,y+118,col,4);line(s,x+78,y+102,x+78,y+118,col,4);}}
 for(let i=0;i<3;i++)pathline(s,[[xs[i]+214,300],[xs[i+1],300]],C.logic,1.8,true);
 code(s,'PB_OPEN',296,265,85,24,13.33,C.logic,'center');code(s,'LO=0',597,265,85,24,13.33,C.logic,'center');code(s,'PB_CLOSE\nBEAM=1',899,245,85,48,13.33,C.logic,'center');
 pathline(s,[[1093,228],[1093,195],[187,195],[187,228]],C.muted,1.6,true);txt(s,'LC = 0 และไม่มีเหตุเปิดกลับ',423,200,440,24,15.3,C.muted,false,'center');
 pathline(s,[[1093,375],[1093,473]],C.hold,1.8,true);txt(s,'BEAM = 0\nหรือ PB_OPEN',1104,395,100,51,14.67,C.hold,false,'left',BF,1.3);
 pathline(s,[[986,546],[898,546]],C.hold,1.8,true);txt(s,'200 ms',902,566,81,28,14.67,C.hold,false,'center');
 pathline(s,[[684,546],[596,546]],C.hold,1.8,true);txt(s,'LO = 0\nS = 1',600,566,80,47,14,C.hold,false,'left',BF,1.3);
 pathline(s,[[489,473],[489,415],[1043,415],[1043,375]],C.logic,1.8,true);txt(s,'กด PB_CLOSE ใหม่ และ BEAM = 1',494,383,332,27,16,C.logic);
 pathline(s,[[791,473],[791,375]],C.bg,6);pathline(s,[[791,473],[791,375]],C.green,1.8,true);txt(s,'LO = 0\nS = 0',808,425,169,43,14.67,C.green,false,'left',BF,1.2);
 txt(s,'PB_OPEN: PB_IN หรือ PB_OUT\nS = 1 เมื่อพบสิ่งกีดขวาง\nSTOP และ Coast: ตัดแรงขับ',80,464,279,111,16,C.text,false,'left',BF,1.45);
 foot(s,'คำสั่งปิดต้องเป็นการกดใหม่หลังปล่อยปุ่ม 20 ms · E-stop และ fault ตัดแรงขับเหนือ FSM',638);
}
async function buildHardware(){
 const s=add('ผังการเชื่อมต่อฮาร์ดแวร์และวงจรจริง','ขาไอซีมองจากด้านบน  เส้นสีน้ำเงินคือสัญญาณ  สีส้มคือภาคมอเตอร์  สีเขียวคือกราวด์',notesFor(7)+'\nการจัดวางภาพอ้างอิงหน้าฮาร์ดแวร์ใน mini-project_Sliding_Door_Safety_Control_final.pdf โดยปรับ P2.5 เป็น PB_CLOSE และรับเซนเซอร์หนึ่งระดับผ่านออปโตและ HCT14 ตามหน้า 6 ชื่อเน็ตตรงกันแสดงจุดต่อเดียวกัน มีภาพอุปกรณ์ประกอบเพื่อระบุตัวชิ้นส่วน ไม่ใช่ภาพถ่ายชุดวงจรที่ประกอบเสร็จแล้ว\nภาพมอเตอร์และขั้วบัดกรีจริง: https://www.pololu.com/product/3041/pictures');
 rect(s,80,187,744,445);rect(s,848,187,352,445);
 // Driver above MCU, motor to the left, switch and sensor photographs on the right.
 const dr=await dip(s,'driver',423,232,191),mc=await dip(s,'mcu',462,448,166),iv=await dip(s,'inverter',147,503,95);
 title(s,'L293D',424,190,137,32,21);title(s,'AT89S52',426,423,137,24,18.67);title(s,'SN74HCT14',110,597,160,24,17.33);
 await photo(s,'motor-rear.jpg',95,270,194,78,{left:0,top:0,right:.506,bottom:.04});
 code(s,'Pololu #3041',97,352,195,27,14.67);txt(s,'12 V  อัตราทด 100.37:1',97,383,211,27,16,C.text);
 await photo(s,'resistor.png',289,281,124,62);code(s,'27 Ω 10 W',292,282,121,24,13.33,C.power,'center');
 // HPCB photo crop: the two solder tabs at its right edge.
 const m1=[280,303],m2=[280,316];
 pathline(s,[m1,[291,303],[291,312]],C.power,2);pathline(s,[[410,312],[414,312],[414,dr.pins[3][1]],dr.pins[3]],C.power,2);
 pathline(s,[m2,[293,316],[293,438],[394,438],[394,dr.pins[6][1]],dr.pins[6]],C.power,2);
 // Main control wires are orthogonal and originate at physical leads.
 pathline(s,[mc.pins[1],[92,mc.pins[1][1]],[92,dr.pins[2][1]],dr.pins[2]],C.logic,1.6);
 pathline(s,[mc.pins[2],[371,mc.pins[2][1]],[371,dr.pins[7][1]],dr.pins[7]],C.logic,1.6);
 // A crossing without a junction is shown with a small gap.
 line(s,367,mc.pins[1][1],375,mc.pins[1][1],C.white,5);line(s,371,mc.pins[1][1]-5,371,mc.pins[1][1]+5,C.logic,1.6);
 line(s,367,438,375,438,C.white,5);line(s,371,433,371,443,C.logic,1.6);
 pathline(s,[mc.pins[3],[324,mc.pins[3][1]],[324,624],[103,624],[103,iv.pins[1][1]],iv.pins[1]],C.logic,1.6);
 netlabel(s,'P1.0 (1) IN1',109,239,172);netlabel(s,'P1.1 (2) IN2',265,411,157);netlabel(s,'P1.2 (3)',207,541,110);netlabel(s,'RUN_N',207,564,110);
 // EN return route and normally-closed emergency contact.
 pathline(s,[iv.pins[2],[85,iv.pins[2][1]],[85,206],[363,206],[363,dr.pins[1][1]],dr.pins[1]],C.logic,1.6);
 line(s,99,iv.pins[2][1],107,iv.pins[2][1],C.white,5);line(s,103,iv.pins[2][1]-5,103,iv.pins[2][1]+5,C.logic,1.6);
 dot(s,250,206,C.ink);dot(s,280,206,C.ink);line(s,250,206,280,206,C.ink,2);netlabel(s,'NC1 ของ E-stop',130,181,218,C.ink);
 await photo(s,'estop.png',658,248,93,112);txt(s,'หยุดฉุกเฉิน',640,367,157,29,17,C.ink,false,'center');netlabel(s,'NC2 → P2.7',651,397,153);
 code(s,'1',126,iv.pins[1][1]-20,22,22,13.33,C.logic);code(s,'2',126,iv.pins[2][1]+1,22,22,13.33,C.logic);
 terminal(s,dr.pins[16],'16  +5 V','right',28,C.logic);terminal(s,dr.pins[8],'8  +12 V','left',18,C.power);
 // Ground pairs of the driver, short local joins to a ground symbol.
 for(const pair of [[4,5],[12,13]]){let a=dr.pins[pair[0]],b=dr.pins[pair[1]],x=a[0]+(pair[0]<9?-18:20);pathline(s,[a,[x,a[1]],[x,b[1]],b],C.green,1.5);ground(s,x,Math.max(a[1],b[1])+3,C.green);}
 netlabel(s,'4,5 GND',321,335,96,C.green);netlabel(s,'12,13 GND',544,339,139,C.green);
 // Port 2 fan-out, attached to the actual AT89S52 leads.
 const p2=[['P2.7 (28)','ESTOP'],['P2.6 (27)','ไม่ใช้'],['P2.5 (26)','PB_CLOSE'],['P2.4 (25)','LC'],['P2.3 (24)','LO'],['P2.2 (23)','BEAM_DET'],['P2.1 (22)','PB_OUT'],['P2.0 (21)','PB_IN']];
 p2.forEach(([name,signal],i)=>{let pin=mc.pins[28-i],yt=446+i*22,xe=553+i*9;pathline(s,[pin,[xe,pin[1]],[xe,yt],[637,yt]],C.logic,1.3);code(s,name+' '+signal,643,yt-12,176,24,13.33,C.logic);});
 pathline(s,[mc.pins[40],[537,mc.pins[40][1]],[537,435],[620,435]],C.logic,1.3);netlabel(s,'40 +5 V',568,409,94);let g=mc.pins[20];pathline(s,[g,[417,g[1]],[417,606]],C.green,1.5);ground(s,417,606,C.green);netlabel(s,'20 GND',314,583,95,C.green);
 // Input panel: every picture has electrical contact stubs carrying the MCU net name.
 title(s,'อินพุตต่อที่ Port 2',871,200,304,30,20);txt(s,'ชื่อขาที่ปลายเส้นตรงกับขาไอซีด้านซ้าย',871,239,304,27,15.3,C.muted);
 for(const [i,label,pin]of [[0,'PB_IN','P2.0'],[1,'PB_OUT','P2.1'],[2,'PB_CLOSE','P2.5']]){let x=881+i*102;await photo(s,'button.jpg',x,283,27,59);code(s,label,x-12,264,98,22,13.33,C.ink,'center');pathline(s,[[x+10,336],[x+10,353],[x-7,353]],C.green,1.3);pathline(s,[[x+20,339],[x+38,339],[x+38,353],[x+77,353]],C.logic,1.3);code(s,pin,x+29,360,62,23,13.33,C.logic);ground(s,x-7,353,C.green);}
 line(s,871,400,1176,400,C.line,1);
 for(const [i,label,pin]of [[0,'LO','P2.3'],[1,'LC','P2.4']]){let x=885+i*150;await photo(s,'limit.png',x,421,88,76);code(s,label,x,401,90,23,14,C.ink,'center');pathline(s,[[x+25,472],[x+25,503],[x+7,503]],C.green,1.3);ground(s,x+7,503,C.green);pathline(s,[[x+47,472],[x+47,503],[x+111,503]],C.logic,1.3);code(s,pin,x+55,511,75,23,13.33,C.logic);}
 await photo(s,'sensor.png',872,553,88,73);await photo(s,'opto.jpg',978,564,61,61);txt(s,'E3Z-T61',866,533,99,25,15,C.ink);txt(s,'VO617A',969,535,93,25,15,C.ink);pathline(s,[[960,587],[978,587]],C.logic,1.4,true);pathline(s,[[1040,587],[1085,587]],C.logic,1.4,true);code(s,'P2.2',1090,558,95,23,13.33,C.logic);txt(s,'ผ่าน HCT14\nวงจรหน้า 6',1085,586,101,43,14.67,C.text,false,'left',BF,1.2);
 foot(s,'COM และปุ่ม NO ต่อ GND · P2 มี pull-up 10 kΩ · EN มี pull-down 10 kΩ · วงจรภาคขับขยายในหน้า 7',644);
}
async function buildSensor(){
 const s=add('วงจรโฟโต้สวิตช์และการแยกสัญญาณทางแสง','เลือก NPN แบบ Light-ON แล้วกลับลอจิกเป็น BEAM_DET = 0 เมื่อแสงขาด',notesFor(6));
 for(let x of [80,464,848])rect(s,x,188,352,420);
 title(s,'โฟโต้เซนเซอร์ 12 V',100,202,310,37,22);title(s,'ออปโตคัปเปลอร์',484,202,310,37,22);title(s,'อินเวอร์เตอร์และ 8051',868,202,310,37,22);
 await photo(s,'sensor.png',110,276,266,222);txt(s,'E3Z-T61  NPN Light-ON',105,248,308,29,17,C.ink);txt(s,'น้ำตาล: +12 V_S\nน้ำเงิน: 0 V_S\nดำ: เอาต์พุต NPN',104,506,304,88,17.33);
 // Optocoupler is a top-view DIP-4 photograph/render with a visible pin-1 mark.
 await photo(s,'opto_top.png',565,365,160,68.88,{left:145/1402,top:309/1122,right:142/1402,bottom:333/1122});code(s,'VO617A',571,484,143,28,16,C.ink,'center');
 const a=[565,380],k=[565,417],c=[725,380],e=[725,417];
 code(s,'1 A',539,350,53,24,13.33);code(s,'2 K',539,424,53,24,13.33);code(s,'4 C',698,350,53,24,13.33);code(s,'3 E',698,424,53,24,13.33);
 netlabel(s,'+12 V_S',479,267,141,C.power);line(s,527,295,527,315,C.power);resistor(s,527,315,true,'1.5 kΩ');pathline(s,[[527,357],[527,380],a],C.power,1.6);
 pathline(s,[k,[410,417],[410,494],[309,494]],C.power,1.6);code(s,'ดำ: NPN OUT',433,462,137,24,13.33,C.power);
 pathline(s,[c,[776,380],[854,380],[854,384]],C.logic,1.6);dot(s,776,380);line(s,776,357,776,380,C.logic);resistor(s,776,315,true,'');netlabel(s,'10 kΩ',708,316,92);line(s,776,295,776,315,C.logic);netlabel(s,'+5 V',751,267,75);
 pathline(s,[e,[748,417],[748,470]],C.green,1.6);ground(s,748,470,C.green);netlabel(s,'0 V_L',719,493,95,C.green);
 const iv=await dip(s,'inverter',901,293,204);code(s,'SN74HCT14',878,254,194,28,15,C.ink);
 pathline(s,[[854,384],[867,384],[867,iv.pins[3][1]],iv.pins[3]],C.logic,1.6);
 pathline(s,[iv.pins[4],[879,iv.pins[4][1]],[879,522],[1166,522]],C.logic,1.6,true);
 terminal(s,iv.pins[14],'+5 V','right',20,C.logic,13.33);let gp=iv.pins[7];pathline(s,[gp,[894,gp[1]],[894,489]],C.green,1.4);ground(s,894,489,C.green);
 code(s,'3',883,iv.pins[3][1]-21,21,22,13.33);code(s,'4',883,iv.pins[4][1]+1,21,22,13.33);
 cap(s,1065,330);ground(s,1065,364,C.green);line(s,1065,316,1065,330,C.logic);netlabel(s,'5 V',1090,288,85);
 code(s,'P2.2 (23)',1014,477,171,26,16,C.logic);txt(s,'0 = แสงขาด\n1 = แสงผ่าน',1014,550,172,51,19,C.ink,true,'left',BF,1.3);
 foot(s,'C 100 nF ต่อใกล้ขาไฟไอซี · ต้องแยกแหล่งจ่าย 12 V_S จากลอจิก จึงคงการแยกทางไฟฟ้า',641);
}
async function buildDriver(){
 const s=add('วงจรขับมอเตอร์และระบบตัดแรงขับฉุกเฉิน','RUN_N = 1 ตัด Enable  และปล่อยให้มอเตอร์ไหล 200 ms ก่อนกลับทิศ',notesFor(7)+'\nภาพมอเตอร์จริงจาก Pololu: https://www.pololu.com/product/3041/pictures');
 rect(s,80,188,1120,414);
 const mc=await dip(s,'mcu',202,310,225),iv=await dip(s,'inverter',409,344,148),dr=await dip(s,'driver',709,245,283);
 title(s,'AT89S52',107,259,195,33,22);title(s,'SN74HCT14',390,501,161,24,17.33);title(s,'L293D',692,201,182,33,22);
 // P1 signals enter the actual L293D input leads, with separate horizontal lanes.
 pathline(s,[mc.pins[1],[95,mc.pins[1][1]],[95,235],[586,235],[586,dr.pins[2][1]],dr.pins[2]],C.logic,1.8);
 pathline(s,[mc.pins[2],[115,mc.pins[2][1]],[115,579],[651,579],[651,dr.pins[7][1]],dr.pins[7]],C.logic,1.8);
 pathline(s,[mc.pins[3],[142,mc.pins[3][1]],[142,549],[347,549],[347,iv.pins[1][1]],iv.pins[1]],C.logic,1.8);
 code(s,'P1.0 (1) IN1',298,203,262,26,15,C.logic);code(s,'P1.1 (2) IN2',474,552,175,24,13.33,C.logic);code(s,'P1.2 (3) RUN_N',249,552,200,24,13.33,C.logic);
 pathline(s,[iv.pins[2],[386,iv.pins[2][1]],[386,253],[614,253],[614,dr.pins[1][1]],dr.pins[1]],C.logic,1.8);
 // E-stop NC1 contact inline in enable; photo identifies the physical switch.
 dot(s,519,253,C.ink);dot(s,548,253,C.ink);line(s,519,253,548,253,C.ink,2);code(s,'NC1',510,199,60,26,14,C.ink);await photo(s,'estop.png',527,389,91,108);txt(s,'E-stop',539,520,94,27,16,C.ink,false,'center');
 // EN pull-down branch after the contact, isolated from the IN lanes.
 let gy=dr.pins[1][1];dot(s,636,gy,C.logic);pathline(s,[[636,gy],[564,gy],[564,gy+21]],C.logic,1.5);resistor(s,564,gy+21,true,'');ground(s,564,gy+63,C.green);code(s,'10 kΩ',479,gy+28,78,25,13.33,C.logic);
 terminal(s,dr.pins[16],'16 +5 V','right',14,C.logic,13.33);terminal(s,dr.pins[8],'8 +12 V','left',12,C.power,13.33);
 code(s,'1 EN1',602,dr.pins[1][1]-27,79,24,13.33,C.logic);code(s,'2 IN1',601,dr.pins[2][1]+8,72,24,13.33,C.logic);code(s,'7 IN2',601,dr.pins[7][1]+4,73,24,13.33,C.logic);
 // OUT1 and OUT2 leave the package on its left. The motor and resistor sit to the right.
 await photo(s,'motor-rear.jpg',951,409,222,90,{left:0,top:0,right:.506,bottom:.04});code(s,'Pololu #3041 · 12 V',935,516,245,27,14,C.ink,'center');
 await photo(s,'resistor.png',952,303,220,110);code(s,'27 Ω 10 W',986,280,156,27,15,C.power,'center');
 pathline(s,[dr.pins[3],[687,dr.pins[3][1]],[687,195],[925,195],[925,358],[956,358]],C.power,1.8);
 pathline(s,[[1167,358],[1184,358],[1184,445],[1168,445]],C.power,1.8);
 pathline(s,[dr.pins[6],[677,dr.pins[6][1]],[677,591],[1185,591],[1185,460],[1168,460]],C.power,1.8);
 netlabel(s,'3 OUT1',956,244,124,C.power);netlabel(s,'6 OUT2',890,568,125,C.power);
 for(const pair of [[4,5],[12,13]]){let a=dr.pins[pair[0]],b=dr.pins[pair[1]],x=a[0]+(pair[0]<9?-15:18);pathline(s,[a,[x,a[1]],[x,b[1]],b],C.green,1.5);ground(s,x,Math.max(a[1],b[1])+2,C.green);}
 netlabel(s,'4,5',613,405,64,C.green);netlabel(s,'12,13',848,420,85,C.green);
 terminal(s,iv.pins[14],'+5 V','right',15,C.logic,13.33);let p=iv.pins[7];pathline(s,[p,[365,p[1]],[365,486]],C.green,1.4);ground(s,365,486,C.green);
 line(s,382,iv.pins[1][1],390,iv.pins[1][1],C.white,5);line(s,386,iv.pins[1][1]-5,386,iv.pins[1][1]+5,C.logic,1.8);
 // Crossings have a visible gap and no electrical junction.
 for (const yy of [253,gy]) {line(s,582,yy,590,yy,C.white,5);line(s,586,yy-5,586,yy+5,C.logic,1.8);}
 for (const yy of [gy,dr.pins[2][1]]) {line(s,683,yy,691,yy,C.white,5);line(s,687,yy-5,687,yy+5,C.power,1.8);}
 line(s,673,dr.pins[7][1],681,dr.pins[7][1],C.white,5);line(s,677,dr.pins[7][1]-5,677,dr.pins[7][1]+5,C.power,1.8);
 txt(s,'กระแส DC ที่ 12 V:  I ≤ 12 ÷ 27 ≈ 0.44 A',80,617,562,32,18,C.power,true);txt(s,'ต้องวัดกระแสกลับทิศและความร้อนจริง',671,617,529,32,18,C.ink);
 foot(s,'กราวด์ลอจิกและมอเตอร์ร่วมกัน · NC2 แจ้ง P2.7 · EN = 0 คือปล่อยไหล ไม่ใช่เบรกทางไฟฟ้า',656);
}
