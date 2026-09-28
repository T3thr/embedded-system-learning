import fs from 'node:fs/promises';
import path from 'node:path';
import {Presentation,PresentationFile} from '/Users/3rapat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs';
const V=path.resolve('embedded-system/1/mini-project/output/version2'),R=path.join(V,'quality_audit/physical_wiring'),B=path.join(R,'.build'),A=path.join(V,'quality_audit/remediation/assets');
const P=Presentation.create({slideSize:{width:1920,height:1080}});
const C={ink:'#0F172A',body:'#334155',muted:'#64748B',blue:'#2563EB',sky:'#0284C7',code:'#0369A1',line:'#E2E8F0',pale:'#F8FAFC',white:'#FFFFFF',green:'#059669',greenbg:'#ECFDF5',amber:'#D97706',amberbg:'#FFFBEB',red:'#DC2626',redbg:'#FEF2F2'};
const F={hero:48,title:32,section:24,body:56/3,caption:44/3,code:16};
let id=0;const layout=[];
function sh(s,x,y,w,h,fill='none',stroke='none',sw=0,g='rect',name=''){const q=s.shapes.add({name:name||'shape-'+(++id),geometry:g,position:{left:x,top:y,width:w,height:h},fill,line:{fill:stroke,width:sw},...(g==='roundRect'?{borderRadius:16}:{})});layout.push({slide:P.slides.items.indexOf(s)+1,x,y,w,h,type:g,name});return q;}
function t(s,txt,x,y,w,h,role='body',color=C.body,bold=false,align='left',mono=false){const q=sh(s,x,y,w,h,'none','none',0,'textbox');q.text=txt;q.text.style={typeface:mono?'Courier New':'Tahoma',fontSize:F[role],color,bold,alignment:align,verticalAlignment:'middle',wrap:'none',autoFit:'none',insets:{left:8,right:8,top:8,bottom:8}};layout[layout.length-1].text=txt;layout[layout.length-1].role=role;return q;}
function line(s,x,y,X,Y,c=C.line,sw=2){if(x!==X&&y!==Y)throw Error('Diagonal line');return sh(s,Math.min(x,X),Math.min(y,Y),Math.max(.01,Math.abs(X-x)),Math.max(.01,Math.abs(Y-y)),'none',c,sw,'line');}
function route(s,pts,c=C.sky,sw=2.5,arrow=true){let all=[...pts];if(arrow){let [x,y]=pts.at(-1),[a,b]=pts.at(-2);all.push(x!==a?[x+(x>a?-9:9),y-5]:[x-5,y+(y>b?-9:9)],[x,y],x!==a?[x+(x>a?-9:9),y+5]:[x+5,y+(y>b?-9:9)]);}let xs=all.map(p=>p[0]),ys=all.map(p=>p[1]);let x=Math.min(...xs),y=Math.min(...ys),w=Math.max(1,Math.max(...xs)-x),h=Math.max(1,Math.max(...ys)-y);let commands=all.map(([a,b],i)=>i?{lineTo:{x:a-x,y:b-y}}:{moveTo:{x:a-x,y:b-y}});s.shapes.add({name:'orthogonal-'+(++id),geometry:'custom',position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:c,width:sw},customPaths:[{width:w,height:h,commands}]});layout.push({slide:P.slides.items.indexOf(s)+1,x,y,w,h,type:'connector',points:pts});}
function card(s,x,y,w,h,fill=C.pale,stroke=C.line){return sh(s,x,y,w,h,fill,stroke,1.5,'roundRect');}
function badge(s,txt,x,y,w,h=42,c=C.sky,bg=C.white){card(s,x,y,w,h,bg,C.line);t(s,txt,x,y,w,h,'caption',c,false,'center');}
function head(title,sub,notes=''){let s=P.slides.add();s.background.fill=C.white;t(s,title,96,80,1728,60,'title',C.ink,true);t(s,sub,96,146,1728,46,'body',C.muted);line(s,104,218,1816,218,C.line,1.5);t(s,String(P.slides.items.length-1).padStart(2,'0'),1780,1010,52,36,'body',C.muted,false,'center');s.speakerNotes.textFrame.setText('ข้อมูล: PROPOSED_SOLUTION_DESIGN.md และ firmware ภายใน mini-project\n'+notes);return s;}
function note(s,txt,y=928,c=C.muted){t(s,txt,104,y,1648,54,'caption',c);}
const bytes={};async function image(s,file,x,y,w,h,alt,crop){const k=file.includes('/')?file:path.join(A,file);bytes[k]??=await fs.readFile(k);return s.images.add({blob:bytes[k],contentType:k.endsWith('.jpg')?'image/jpeg':'image/png',alt,fit:crop?'cover':'contain',position:{left:x,top:y,width:w,height:h},...(crop?{crop}:{})});}
const comp=n=>path.join(V,'.build/components',n+'.png');
function node(s,txt,x,y,w=228,h=78,c=C.sky,on=false){card(s,x,y,w,h,on?'#EFF6FF':C.white,on?c:C.line);if(on)sh(s,x,y,5,h,c);t(s,txt,x+8,y+8,w-16,h-16,'code',on?c:C.body,true,'center',true);}
function table(s,values,x,y,w,heights,cols){const tb=s.tables.add({rows:values.length,columns:values[0].length,left:x,top:y,width:w,height:heights.reduce((a,b)=>a+b),columnWidths:cols,values});tb.borders.assign({fill:C.line,width:1.5,style:'solid'});tb.cells.block({row:0,column:0,rowCount:values.length,columnCount:values[0].length}).borders={fill:C.line,width:1.5,style:'solid'};values.forEach((row,i)=>{tb.rows[i].height=heights[i];row.forEach((val,j)=>{let cell=tb.getCell(i,j);cell.fill=i===0?C.pale:C.white;cell.text.style={typeface:'Tahoma',fontSize:F.body,color:i===0?C.sky:C.body,bold:i===0,verticalAlignment:'middle',alignment:j===0?'left':'center',insets:{left:16,right:16,top:8,bottom:8}};});});return tb;}
P.slides.add();P.slides.add();P.slides.add();
const s=head('ผังการเชื่อมต่อฮาร์ดแวร์','ตำแหน่งขามองจากด้านบนของไอซี ใช้เส้นสีน้ำเงินสำหรับสัญญาณควบคุม และเส้นสีเทาสำหรับวงจรมอเตอร์');
F.pin=17;F.small=16;F.tiny=14;
function label(txt,x,y,w,h=34,size='pin',color=C.body,bold=false,align='left'){return t(s,txt,x,y,w,h,size,color,bold,align);}
function wire(pts,c=C.sky,w=2.6){let orth=[pts[0]];for(let k=1;k<pts.length;k++){const [a,b]=orth.at(-1),[x,y]=pts[k];if(a!==x&&b!==y)orth.push([x,b]);orth.push([x,y]);}pts=orth;route(s,pts,C.white,w+5,false);route(s,pts,c,w,false);}
function dot(x,y,c=C.sky){sh(s,x-3,y-3,6,6,c,'none',0,'ellipse');}
function pinLabel(txt,x,y,w=70,align='left',color=C.code){label(txt,x,y-15,w,30,'tiny',color,false,align);}
// Physical packages, shown with their original aspect ratios. Coordinates below use visible metal lead tips.
await image(s,comp('motor_real'),120,318,330,269.39,'ภาพมอเตอร์ DC ตัวอย่าง ใช้ระบุตำแหน่งขั้วสองขั้ว ไม่ใช่ภาพมอเตอร์ต้นแบบที่ทดสอบแล้ว');
await image(s,'resistor.png',455,342,188,94,'ตัวต้านทานกำลัง 27 โอห์ม 10 วัตต์');
await image(s,'driver.png',650,290,210,315,'L293D ตัวถัง DIP 16 ขา มองจากด้านบน รอยบากอยู่ด้านบน');
await image(s,'mcu_fixed.png',730,679,200,300,'AT89S52 ตัวถัง DIP 40 ขา รอยบากอยู่ด้านบน');
await image(s,'inverter.png',1030,560,140,210,'SN74HCT14 ตัวถัง DIP 14 ขา รอยบากอยู่ด้านบน');
await image(s,'estop.png',1060,288,150,180,'ปุ่มหยุดฉุกเฉิน ตัวอย่างหน้าสัมผัส NC สองชุด');
label('มอเตอร์ DC 12 V',120,584,340,42,'section',C.ink,true);
label('แหล่งจ่ายจำกัดกระแส 0.50 A',120,626,360,34,'small',C.muted);
label('27 Ω  10 W',443,325,215,32,'pin',C.ink,true,'center');
label('L293D',655,612,200,38,'section',C.ink,true,'center');
label('AT89S52',723,642,214,35,'section',C.ink,true,'center');
label('SN74HCT14',995,765,226,35,'pin',C.ink,true,'center');
label('ปุ่มหยุดฉุกเฉิน',989,237,290,44,'section',C.ink,true,'center');
// Calibrated lead tips (package top view).
const DY=[156,328,500,677,853,1027,1200,1388].map(v=>290+v*210/1024),DL=650+155*210/1024,DR=650+867*210/1024;
const MY=[101,166,229,294,356,421,485,548,613,678,741,804,867,932,996,1060,1124,1188,1252,1315].map(v=>679+v*200/1024),ML=730+292*200/1024,MR=730+731*200/1024;
const HY=[252,407,574,741,909,1076,1242].map(v=>560+v*140/1024),HL=1030+189*140/1024,HR=1030+835*140/1024;
// Motor leads: pin 3 through the power resistor; pin 6 to the other terminal.
wire([[120+250*330/343,318+9*330/343],[360.5,294],[442,294],[442,389],[476,389]],C.body,3);
wire([[622,389],[640,389],[640,DY[2]],[DL,DY[2]]],C.body,3);
wire([[120+336*330/343,318+91*330/343],[489,405.55],[489,DY[5]],[DL,DY[5]]],C.body,3);
pinLabel('3 OUT1',494,DY[2]+27,105);pinLabel('6 OUT2',494,DY[5]+23,105);
// Direction controls travel around the components. White wire clearance marks crossings without junctions.
wire([[ML,MY[0]],[600,MY[0]],[600,DY[1]],[DL,DY[1]]]);
wire([[ML,MY[1]],[620,MY[1]],[620,DY[6]],[DL,DY[6]]]);
pinLabel('2 IN1',601,DY[1]-22,84);pinLabel('7 IN2',616,DY[6]+20,86);
label('P1.0 (1)   IN1\nP1.1 (2)   IN2\nP1.2 (3)   RUN_N',542,763,229,92,'small',C.code);
wire([[ML,MY[2]],[470,MY[2]],[470,246],[1008,246],[1008,HY[0]],[HL,HY[0]]]);
pinLabel('1',1025,HY[0]-15,32);pinLabel('2',1025,HY[1]+17,32);
// E-stop left contact NC1 interrupts only EN. Right contact NC2 is separately sensed by P2.7.
const ES={lt:[1060+570*150/1145,288+977*150/1145],lb:[1060+587*150/1145,288+1160*150/1145],rt:[1060+787*150/1145,288+933*150/1145],rb:[1060+780*150/1145,288+1103*150/1145]};
wire([[HL,HY[1]],[986,HY[1]],[986,ES.lb[1]],[...ES.lb]]);
wire([[DL,DY[0]],[620,DY[0]],[620,270],[964,270],[964,ES.lt[1]],[...ES.lt]]);
pinLabel('1  EN',585,DY[0]-18,94);label('NC1',1030,458,83,32,'pin',C.red,true);
wire([[...ES.rt],[1255,ES.rt[1]]]);pinLabel('P2.7',1210,ES.rt[1]-18,85);
wire([[...ES.rb],[1255,ES.rb[1]]],C.muted);pinLabel('GND',1210,ES.rb[1]+20,85,'left',C.muted);
label('NC2',1169,458,81,32,'pin',C.red,true);
label('NC1 เปิดแล้วตัด EN\nNC2 แจ้งสถานะให้ P2.7',1024,497,280,55,'small',C.body);
// Standard passive symbols are used only where a discrete leaded photo would obscure the connection.
wire([[964,294],[1016,294]],C.muted,2);sh(s,1016,288,36,12,C.white,C.muted,2,'rect');wire([[1052,294],[1068,294]],C.muted,2);dot(964,294);label('10 kΩ',1010,313,80,30,'tiny',C.muted);line(s,1068,294,1068,304,C.muted,2);line(s,1060,304,1076,304,C.muted,2);line(s,1063,309,1073,309,C.muted,2);line(s,1066,314,1070,314,C.muted,2);
// Driver power and unused pins, visibly attached to the exact leads.
wire([[DR,DY[0]],[905,DY[0]]],C.red);pinLabel('16  +5 V',851,DY[0]-20,110,'left',C.red);
wire([[DL,DY[7]],[616,DY[7]]],C.red);pinLabel('8  +12 V',513,DY[7],99,'right',C.red);
wire([[DL,DY[3]],[635,DY[3]],[635,DY[4]],[DL,DY[4]]],C.muted,2);label('4, 5\nGND',511,DY[3]+3,74,46,'tiny',C.muted);
wire([[DR,DY[3]],[865,DY[3]],[865,DY[4]],[DR,DY[4]]],C.muted,2);label('13, 12\nGND',867,DY[3]+3,102,46,'tiny',C.muted);
for(const i of [1,6,7]){wire([[DR,DY[i]],[865,DY[i]]],C.muted,2);pinLabel(String(16-i),844,DY[i]-15,30);}
label('9, 10, 15 ต่อ GND\n11, 14 เว้นขาไว้',866,547,169,52,'tiny',C.muted);
// MCU selected input pins are fanned out in exact descending right-side order.
const p2=[['P2.7',12],['P2.6',13],['P2.5',14],['P2.4',15],['P2.3',16],['P2.2',17],['P2.1',18],['P2.0',19]];
for(let i=0;i<p2.length;i++){let [n,row]=p2[i],endY=814+i*21;wire([[MR,MY[row]],[947+i*8,MY[row]],[947+i*8,endY],[1021,endY]],C.sky,1.8);pinLabel(n+'  ('+(40-row)+')',1025,endY,140);}
label('Port 2',1170,806,135,33,'pin',C.code,true);
wire([[MR,MY[0]],[986,MY[0]]],C.red);pinLabel('40  +5 V',938,MY[0]-21,119,'left',C.red);
wire([[ML,MY[19]],[746,MY[19]]],C.muted);pinLabel('20 GND',651,MY[19],94,'right',C.muted);
// Visible connections to the inverter supplies.
wire([[HR,HY[0]],[1220,HY[0]]],C.red);pinLabel('14  +5 V',1157,HY[0]-19,117,'left',C.red);
wire([[HL,HY[6]],[1023,HY[6]]],C.muted);pinLabel('7 GND',929,HY[6],93,'right',C.muted);
// Input equipment on a separate visual column; endpoints carry the same port names as the MCU fan-out.
line(s,1320,250,1320,962,C.line,1.5);
label('อุปกรณ์รับสัญญาณ',1360,237,456,44,'section',C.ink,true);label('ชื่อ P2 ตรงกับจุดต่อที่ไอซีด้านซ้าย',1360,278,453,30,'tiny',C.muted);
await image(s,comp('limit_switch'),1380,316,130,111.8,'ลิมิตสวิตช์ SPDT ใช้ขา COM และ NO');
label('ลิมิตสวิตช์ 2 ตัว',1530,301,280,38,'pin',C.ink,true);
label('เปิดสุด  P2.3 (24)\nปิดสุด  P2.4 (25)',1530,341,280,58,'small');
// Switch terminal tip coordinates from the source photograph.
wire([[1380+58*130/250,316+191*130/250],[1410.16,444],[1478,444]],C.muted,2.2);label('COM ต่อ GND',1362,446,178,31,'tiny',C.muted);
wire([[1380+135*130/250,316+191*130/250],[1450.2,421],[1550,421]],C.sky,2.2);label('NO ต่อขา P2',1552,405,230,32,'small',C.code);
await image(s,path.join(R,'assets/button.jpg'),1375,482,128,128,'ภาพปุ่มกดชั่วขณะแบบ NO สองขั้ว');
label('ปุ่มเปิด 2 ตัว แบบ NO',1530,477,281,34,'pin',C.ink,true);
label('ด้านใน P2.0 (21)\nด้านนอก P2.1 (22)\nอีกขั้วต่อ GND',1530,514,280,81,'small');
label('ปุ่ม Reset แบบเดียวกัน ต่อ P2.6 (27)',1360,601,454,28,'tiny');
wire([[1422.6,579.4],[1389,579.4]],C.muted,2);label('GND',1345,570,66,30,'tiny',C.muted);wire([[1434.3,582.7],[1485,582.7],[1485,548],[1519,548]],C.sky,2);line(s,1368,631,1816,631,C.line,1);
await image(s,'sensor.png',1370,666,148,123.33,'เซนเซอร์ผ่านลำแสง E3Z-T61 ตัวส่งและตัวรับ');
await image(s,path.join(R,'assets/vo617a-single.jpg'),1623,657,154,132,'ภาพตัวถัง DIP 4 ขาของ VO617A จากหน้าผู้จำหน่าย DigiKey');
label('E3Z-T61',1363,783,171,36,'pin',C.ink,true);
label('VO617A × 2',1593,783,217,36,'pin',C.ink,true,'center');
label('ผ่าน',1530,705,80,31,'small',C.muted,false,'center');
label('วงจรรับสัญญาณแต่ละระดับ',1360,823,454,34,'pin',C.ink,true);
label('12 V ผ่าน R 1.5 kΩ เข้าขา 1\nขา 2 ต่อสายดำของตัวรับ\nขา 3 ต่อ GND   ขา 4 ต่อ P2',1360,857,458,81,'small');
label('ล่าง P2.2 (23)   บน P2.5 (26)',1360,938,458,32,'small',C.code);
// Local electrical notes tied to the circuit, with no claims of a built/validated prototype.
line(s,104,786,507,786,C.line,1);
label('อุปกรณ์ประกอบภาคขับ',104,799,430,35,'pin',C.ink,true);
label('C 100 nF ใกล้ขาไฟไอซีและคร่อมมอเตอร์\nC 470 µF 25 V ใกล้ไฟมอเตอร์ 12 V\nกราวด์ลอจิกกับภาคขับรวมที่จุดเดียว\nฐาน 8051 ต่อ EA (31) กับ 5 V\nใช้คริสตัล 12 MHz และวงจรรีเซ็ต',104,837,437,123,'small');
label('ภาพแสดงวงจรหลัก ขา P2 และ IN1, IN2, RUN_N ใช้ R ดึงขึ้น 10 kΩ ไปยัง 5 V',104,970,1470,37,'small',C.muted);
s.speakerNotes.textFrame.setText(`ภาพประกอบอุปกรณ์และวงจรหลักสำหรับอธิบายการต่อ ไม่ใช่ภาพต้นแบบที่ประกอบและทดสอบแล้ว ใช้ภาพแพ็กเกจเดิมที่สร้างไว้ร่วมกับภาพมอเตอร์และลิมิตสวิตช์เดิม และภาพ VO617A จากผู้ผลิต ตัวอย่างภาพมอเตอร์ไม่ได้ระบุว่าเป็น Pololu #3041
แหล่งข้อมูล: PROPOSED_SOLUTION_DESIGN.md หัวข้อ 4.2–4.5 และเฟิร์มแวร์ของโครงงาน
เอกสารผู้ผลิต: https://www.ti.com/lit/ds/symlink/l293d.pdf ; https://www.ti.com/lit/ds/symlink/sn74hct14.pdf ; https://ww1.microchip.com/downloads/en/DeviceDoc/doc1919.pdf ; https://www.vishay.com/docs/83430/vo617a.pdf
ภาพปุ่ม NO: https://makerbazar.in/products/pbs-110-momentary-push-button-switch\nภาพ VO617A: https://mm.digikey.com/Volume0/opasdata/d220001/medias/images/3997/MFG_DIP-4.jpg (VO617A-7 product page, manufacturer package image)
มอง DIP จากด้านบน รอยบากอยู่ด้านบน หมายเลขขาด้านซ้ายเรียงลง ด้านขวาเรียงขึ้น เส้นข้ามกันที่มีช่องว่างไม่ใช่จุดต่อ วงจรใช้ชื่อ P2 เดียวกันเป็นสายเดียวกันระหว่างภาพ MCU กับอุปกรณ์ทางขวา ตัวเลขวงเล็บคือขา AT89S52
L293D: 1 EN จาก HCT14 ขา2 ผ่าน E-stop NC1, มี pull-down10k; 2 IN1 จากP1.0; 3 OUT1 ผ่าน27โอห์ม10Wเข้ามอเตอร์; 6 OUT2อีกขั้ว; 7 IN2จากP1.1; 8 VCC2=12V;16VCC1=5V;4,5,12,13GND;9,10,15GND;11,14ไม่ต่อ
P1.0,P1.1,P1.2มีpull-up10k; P1.2เข้าสู่HCT14ขา1 ขา2ผ่านNC1 สัญญาณENไม่เชื่อมกับหน้าสัมผัสNC2
ฐานMCUยังต้องมีEA31ต่อ5V, crystal12MHzที่18/19พร้อมcapacitorตามคริสตัล และวงจรresetที่9 ซึ่งไม่แสดงในหน้านี้ HCT14ขา14=5V ขา7GND อินพุตเกตที่ไม่ใช้ต่อGND ไม่ปล่อยลอย
P2ทุกขาดึงขึ้น10kไป5V; ปุ่มNOและลิมิตCOM/NOลงGND; NC2ต่อP2.7กับGND
เซนเซอร์แต่ละคู่: brown12V,blue0V,blackNPN Light-ON; VO617A pin1จาก12Vผ่าน1.5k0.25W,pin2ไปblack,pin3GNDlogic,pin4ไปP2.2หรือP2.5และpull-up10kไป5V
LEDและBuzzerใช้วงจรขับตามข้อ4.5 ไม่ได้แสดงสายบนหน้านี้ กระแสมอเตอร์และอุณหภูมิไดรเวอร์ต้องตรวจวัดบนชุดจริง ผล EdSim51 ไม่ใช่ผลทดสอบภาคกำลัง`);
await (await PresentationFile.exportPptx(P)).save(path.join(B,'donor.pptx'));
const png=await P.export({slide:s,format:'png',scale:1});await fs.writeFile(path.join(B,'hardware.png'),new Uint8Array(await png.arrayBuffer()));
