import fs from 'node:fs/promises';
import path from 'node:path';
import {Presentation,PresentationFile} from '/Users/3rapat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs';
const V=path.resolve('embedded-system/1/mini-project/output/version2'),R=path.join(V,'quality_audit/remediation'),B=path.join(R,'.build'),A=path.join(R,'assets');
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
P.slides.add();
// 2: independent flows for the existing problem and proposed response.
{let s=head('ปัญหาเดิมและแนวทางแก้ไข','เปรียบเทียบการตอบสนองเมื่อมีสิ่งกีดขวางค้างอยู่ในช่องประตู','ภาพระบบเดิมสมมุติเป็นประตูปิดตามเวลาและตรวจจับเฉพาะระดับสูง ส่วนระบบที่เสนอใช้ลำแสงสองระดับ ภาพจำลองเดิมสร้างด้วย ImageGen ไม่ใช่ผลทดสอบแรงหนีบ การตัดแรงขับไม่ใช่การหยุดทางกลทันที');
line(s,960,256,960,906,C.line,1.5);
t(s,'ระบบเดิม: ตรวจไม่พบวัตถุเตี้ย',104,250,800,50,'section',C.red,true);
t(s,'หมดเวลาแล้วปิด แม้สิ่งกีดขวางยังอยู่ในทางผ่าน',104,303,800,42,'body');
t(s,'ระบบที่เสนอ: ตรวจจับสองระดับ',1016,250,800,50,'section',C.sky,true);
t(s,'ตรวจพบลำแสงถูกบังขณะปิด แล้วสั่งเปิดประตูกลับ',1016,303,800,42,'body');
await image(s,'story_fixed.png',108,363,362,414,'ระบบเดิม วัตถุเตี้ยอยู่ต่ำกว่าลำแสงระดับสูง',{left:0,top:0,right:2/3,bottom:0});
await image(s,'story_fixed.png',538,363,362,414,'ระบบเดิม ประตูปิดต่อจนเข้าใกล้สิ่งกีดขวาง',{left:1/3,top:0,right:1/3,bottom:0});
await image(s,'story_fixed.png',1235,363,362,414,'ระบบที่เสนอ ลำแสงระดับล่างตรวจพบวัตถุเตี้ยและเปิดประตูกลับ',{left:2/3,top:0,right:0,bottom:0});
route(s,[[476,568],[525,568]],C.red,2.5);
const flows=[{x:104,c:C.red,bg:C.redbg,steps:['หมดเวลาเปิดค้าง','วัตถุเตี้ยไม่ถูกตรวจพบ','ปิดต่อ เสี่ยงหนีบ']},{x:1016,c:C.sky,bg:'#F0F9FF',steps:['ลำแสงถูกบัง','ตัดแรงขับทันที\nพร้อมเสียงเตือน','พัก 200 ms\nแล้วเปิดกลับจนสุด']}];
for(const f of flows){f.steps.forEach((txt,i)=>{let x=f.x+i*284;card(s,x,811,232,86,f.bg,C.line);t(s,txt,x+8,819,216,70,'body',f.c,true,'center');if(i<2)route(s,[[x+232,854],[x+278,854]],f.c,2.5);});}
note(s,'การตัดแรงขับเริ่มเมื่อระบบตรวจพบ ส่วนระยะหยุดของบานประตูต้องวัดกับกลไกจริง');}
P.slides.add();P.slides.add();
// 5: domains with explicit signal conversion, never presenting an inverter as isolation.
{let s=head('แรงดันไฟฟ้าและระดับสัญญาณ','แยกไฟเลี้ยงอุปกรณ์ออกจากแรงดันที่เข้าขาไมโครคอนโทรลเลอร์');card(s,104,270,800,485);card(s,1016,270,800,485);t(s,'5 V',136,296,712,62,'title',C.ink,true);t(s,'วงจรลอจิกและการควบคุม',136,370,712,50,'section',C.sky,true);t(s,'12 V',1048,296,712,62,'title',C.ink,true);t(s,'ภาคมอเตอร์และเซนเซอร์',1048,370,712,50,'section',C.sky,true);
for(let[i,file,txt]of [[0,'mcu_fixed.png','8051 และ SN74HCT14'],[1,'driver.png','L293D ขา VCC1'],[2,'opto.png','เอาต์พุต Optocoupler และอินพุต P2'],[3,comp('led_green'),'LED และวงจรขับ Buzzer']]){let y=445+i*69;await image(s,file,146,y,86,61,txt);t(s,txt,268,y+6,590,48,'body');}
for(let[i,file,txt]of [[0,'driver.png','L293D ขา VCC2'],[1,comp('motor_real'),'มอเตอร์ผ่านไดรเวอร์และตัวต้านทาน'],[2,'sensor.png','เซนเซอร์ E3Z-T61 จำนวนสองคู่']]){let y=445+i*82;await image(s,file,1054,y,92,72,txt);t(s,txt,1182,y+12,590,48,'body');}t(s,'แหล่งจ่ายมอเตอร์จำกัดกระแส 0.50 A',1182,690,590,42,'caption');
node(s,'RX 12 V',160,806,400,76,C.sky);node(s,'VO617A',760,806,400,76,C.sky);node(s,'P2  ระดับ 0–5 V',1360,806,400,76,C.sky);route(s,[[560,844],[760,844]]);route(s,[[1160,844],[1360,844]]);t(s,'อินเวอร์เตอร์ SN74HCT14 กลับเฟสสัญญาณ RUN_N ที่ 5 V เท่านั้น',104,907,1712,44,'body',C.body,false,'center');t(s,'Optocoupler แยกทางสัญญาณเซนเซอร์ ส่วนลอจิกและภาคขับมอเตอร์ใช้กราวด์ร่วมตามแบบ',104,944,1712,44,'caption',C.muted,false,'center');}

await (await PresentationFile.exportPptx(P)).save(path.join(B,'revision-donor.pptx'));
for (const n of [2,5]) {let png=await P.export({slide:P.slides.items[n-1],format:'png',scale:1});await fs.writeFile(path.join(B,'revision-'+n+'.png'),new Uint8Array(await png.arrayBuffer()));}
