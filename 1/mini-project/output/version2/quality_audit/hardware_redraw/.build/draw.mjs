import fs from 'node:fs/promises';
import path from 'node:path';
import {Presentation,PresentationFile} from '/Users/3rapat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs';
const V=path.resolve('embedded-system/1/mini-project/output/version2'),R=path.join(V,'quality_audit/hardware_redraw'),B=path.join(R,'.build'),A=path.join(R,'assets');
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
const bytes={};async function image(s,file,x,y,w,h,alt,crop){const k=file.includes('/')?file:path.join(A,file);bytes[k]??=await fs.readFile(k);return s.images.add({blob:bytes[k],contentType:'image/png',alt,fit:crop?'cover':'contain',position:{left:x,top:y,width:w,height:h},...(crop?{crop}:{})});}
const comp=n=>path.join(V,'.build/components',n+'.png');
function node(s,txt,x,y,w=228,h=78,c=C.sky,on=false){card(s,x,y,w,h,on?'#EFF6FF':C.white,on?c:C.line);if(on)sh(s,x,y,5,h,c);t(s,txt,x+8,y+8,w-16,h-16,'code',on?c:C.body,true,'center',true);}
function table(s,values,x,y,w,heights,cols){const tb=s.tables.add({rows:values.length,columns:values[0].length,left:x,top:y,width:w,height:heights.reduce((a,b)=>a+b),columnWidths:cols,values});tb.borders.assign({fill:C.line,width:1.5,style:'solid'});tb.cells.block({row:0,column:0,rowCount:values.length,columnCount:values[0].length}).borders={fill:C.line,width:1.5,style:'solid'};values.forEach((row,i)=>{tb.rows[i].height=heights[i];row.forEach((val,j)=>{let cell=tb.getCell(i,j);cell.fill=i===0?C.pale:C.white;cell.text.style={typeface:'Tahoma',fontSize:F.body,color:i===0?C.sky:C.body,bold:i===0,verticalAlignment:'middle',alignment:j===0?'left':'center',insets:{left:16,right:16,top:8,bottom:8}};});});return tb;}
P.slides.add();P.slides.add();P.slides.add();
let s=head('ผังการเชื่อมต่อฮาร์ดแวร์','ผังสัญญาณหลัก ตัวเลขในวงเล็บคือหมายเลขขาไอซี ส่วนตำแหน่งขาบนตัวถังแสดงในหน้าจัดสรรพอร์ต','ผังเชื่อมต่อเชิงหน้าที่ ไม่ใช่ลายวงจรพิมพ์หรือภาพตำแหน่งขาบนตัวถัง อ้างอิงข้อกำหนดระบบหัวข้อ 4.2–4.5 ชื่ออุปกรณ์และหมายเลขขาตรงกับแบบ แสดงวงจรหลัก โดยไม่ได้แสดงตัวเก็บประจุ วงจรคริสตัล วงจรรีเซ็ตเริ่มระบบ และขาที่ไม่ได้ใช้ทั้งหมด');
F.pin=18;F.small=16;
function label(txt,x,y,w,h=40,role='pin',c=C.body,bold=false,align='left'){return t(s,txt,x,y,w,h,role,c,bold,align);}
function box(x,y,w,h,fill=C.white){return sh(s,x,y,w,h,fill,C.line,1.5,'rect');}
function wire(x,y,X,Y){line(s,x,y,X,Y,C.sky,2.3);}
label('อินพุต',104,232,416,42,'section',C.sky,true);
label('ตัวควบคุม',704,232,400,42,'section',C.sky,true);
label('ภาคขับและเอาต์พุต',1152,232,664,42,'section',C.sky,true);
box(704,280,400,560,C.pale);
label('AT89S52',720,284,368,40,'section',C.ink,true,'center');
label('ไมโครคอนโทรลเลอร์ 8051  12 MHz',720,317,368,28,'small',C.muted,false,'center');
// Input terminals and their source are aligned on the same horizontal rows.
const inputs=[
 ['ปุ่มเปิดด้านนอก (เข้า)','กดปุ่มแล้วสัญญาณเป็น 0','P2.1 (22)',360],
 ['ปุ่มเปิดด้านใน (ออก)','กดปุ่มแล้วสัญญาณเป็น 0','P2.0 (21)',420],
 ['ลิมิตสวิตช์เปิดสุด','LO = 0 เมื่อประตูเปิดสุด','P2.3 (24)',480],
 ['ลิมิตสวิตช์ปิดสุด','LC = 0 เมื่อประตูปิดสุด','P2.4 (25)',540],
 ['E3Z-T61 ล่าง ผ่าน VO617A','รับลำแสง = 0   ถูกบัง = 1','P2.2 (23)',600],
 ['E3Z-T61 บน ผ่าน VO617A','รับลำแสง = 0   ถูกบัง = 1','P2.5 (26)',660],
 ['ปุ่ม Reset','กดเพื่อขอเริ่มใหม่หลังเกิด FAULT','P2.6 (27)',720],
 ['E-stop หน้าสัมผัส NC2','กดปุ่มหรือสายเปิด = 1','P2.7 (28)',780]
];
for(const [a,b,p,y] of inputs){box(104,y-27,416,54);label(a,116,y-30,392,36,'pin',C.body,true);label(b,116,y-3,392,30,'caption',C.muted);wire(520,y,704,y);label(p,710,y-20,178,40,'pin',C.code,false);}
label('อินพุตมีตัวต้านทานดึงขึ้น 10 kΩ ไปยัง 5 V\nVO617A แยกสัญญาณเซนเซอร์ 12 V ก่อนเข้า P2',104,816,556,66,'small',C.muted);
// Motor-driver control terminals. Lines terminate at block boundaries.
box(1464,280,352,270,C.pale);
label('L293D',1480,292,320,45,'section',C.ink,true,'center');
for(const [txt,y] of [['P1.0 (1)',360],['P1.1 (2)',420],['P1.2 (3)',480],['P1.4 (5)',630],['P1.5 (6)',690],['P1.7 (8)',750]])label(txt,926,y-20,166,40,'pin',C.code,false,'right');
wire(1104,360,1464,360);wire(1104,420,1464,420);
label('IN1',1152,326,190,32,'small',C.code);label('IN2',1152,386,190,32,'small',C.code);
label('1A (2)',1480,340,160,40,'pin',C.code);label('2A (7)',1480,400,160,40,'pin',C.code);label('1,2EN (1)',1480,460,180,40,'pin',C.code);
// Enable chain: active-low MCU request, inverter, then E-stop NC1.
wire(1104,480,1152,480);box(1152,456,112,48);label('NOT',1152,460,112,40,'pin',C.ink,true,'center');
wire(1264,480,1312,480);box(1312,456,96,48);label('NC1',1312,460,96,40,'pin',C.red,true,'center');wire(1408,480,1464,480);
label('RUN_N',1104,430,130,28,'caption',C.code);
label('E-stop',1302,425,122,32,'small',C.red,true,'center');
label('SN74HCT14\nเข้า (1)  ออก (2)',1136,506,160,62,'small',C.body,false,'center');
label('EN ดึงลงด้วย 10 kΩ\nกด E-stop แล้วตัด EN',1310,506,214,62,'caption',C.muted);
label('1Y (3)',1470,507,142,36,'small',C.code,false,'center');
label('2Y (6)',1666,507,142,36,'small',C.code,false,'center');
wire(1540,550,1540,595);box(1502,595,76,32);label('27 Ω',1584,580,110,36,'small',C.body,false,'center');label('10 W',1592,610,92,32,'caption',C.muted,false,'center');
route(s,[[1540,627],[1540,720],[1612,720]],C.sky,2.3,false);
route(s,[[1740,550],[1740,720],[1688,720]],C.sky,2.3,false);
sh(s,1612,682,76,76,C.white,C.body,2,'ellipse');label('M',1612,692,76,56,'section',C.body,true,'center');
label('มอเตอร์ DC 12 V',1472,768,344,44,'pin',C.body,true,'center');label('แหล่งจ่ายจำกัดกระแส 0.50 A',1472,808,344,34,'caption',C.muted,false,'center');
// Indicators: block endpoints denote their control connections, not package pin positions.
for(const [y,a,b]of [[630,'LED แดง','ต่อ 5 V ผ่าน R 2.2 kΩ'],[690,'LED เขียว','ต่อ 5 V ผ่าน R 2.2 kΩ'],[750,'Buzzer 5 V','ขับผ่าน SN74HCT14 และ 2N7000']]){wire(1104,y,1152,y);box(1152,y-27,272,54);label(a,1164,y-29,248,34,'pin',C.body,true);label(b,1164,y-3,248,30,'caption',C.muted);}
label('LED และ Buzzer ทำงานเมื่อขา P1 เป็น 0',1128,815,330,36,'caption',C.muted);
// Power connections are grouped by voltage, with exact IC pins.
line(s,104,895,1816,895,C.line,1.5);
label('ไฟลอจิก 5 V',104,902,536,38,'pin',C.sky,true);
label('AT89S52 (40)   SN74HCT14 (14)\nL293D VCC1 (16)',104,936,536,50,'small');
label('ไฟมอเตอร์และเซนเซอร์ 12 V',676,902,536,38,'pin',C.sky,true);
label('L293D VCC2 (8) และ E3Z-T61\n12 V ของเซนเซอร์ไม่ต่อเข้าขา AT89S52',676,936,536,50,'small');
label('กราวด์ร่วมของลอจิกและภาคขับ',1248,902,568,38,'pin',C.sky,true);
label('AT89S52 (20)   SN74HCT14 (7)\nL293D (4, 5, 12, 13)',1248,936,568,50,'small');
await (await PresentationFile.exportPptx(P)).save(path.join(B,'donor.pptx'));
const png=await P.export({slide:s,format:'png',scale:1});await fs.writeFile(path.join(B,'hardware.png'),new Uint8Array(await png.arrayBuffer()));
