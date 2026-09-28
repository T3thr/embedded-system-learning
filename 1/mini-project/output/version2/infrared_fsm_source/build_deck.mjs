import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import {Presentation,PresentationFile} from '/Users/3rapat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs';
const req=createRequire(import.meta.url),{FontLibrary}=req('/Users/3rapat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/node_modules/skia-canvas');
const S=path.dirname(fileURLToPath(import.meta.url)),V=path.dirname(S),A=path.join(V,'infrared_final_assets'),B=path.join(V,'.infrared-fsm-build'),F=path.join(V,'formal_source/fonts');
FontLibrary.use([path.join(F,'Prompt-Bold.ttf'),path.join(F,'Prompt-Regular.ttf'),path.join(F,'Sarabun-Regular.ttf'),path.join(F,'Sarabun-Bold.ttf'),path.join(F,'JetBrainsMono-Medium.ttf')]);
const P=Presentation.create({slideSize:{width:1280,height:720}});
const C={bg:'#F8FAFC',white:'#FFFFFF',ink:'#0F172A',text:'#334155',muted:'#64748B',line:'#CBD5E1',logic:'#0284C7',power:'#D97706',green:'#059669',red:'#DC2626',hold:'#EA580C'};
const HF='Prompt',BF='Sarabun',MF='JetBrains Mono';let id=0;const notes=[],coverage=[];
function rect(s,x,y,w,h,fill=C.white,stroke=C.line,sw=1,g='rect'){return s.shapes.add({name:'ir-'+(++id),geometry:g,position:{left:x,top:y,width:w,height:h},fill,line:{fill:stroke,width:sw}})}
function txt(s,t,x,y,w,h,size=18.67,color=C.text,bold=false,align='left',font=BF,ls=1.5){const q=rect(s,x,y,w,h,'none','none',0,'textbox');q.text=t;q.text.style={typeface:font,fontSize:size,bold,color,alignment:align,verticalAlignment:'middle',wrap:'none',autoFit:'none',lineSpacing:ls,insets:{left:3,right:3,top:2,bottom:2}};coverage.push({slide:P.slides.items.length,t,x,y,w,h});return q;}
function title(s,t,x,y,w,h=38,size=24,col=C.ink,align='left'){return txt(s,t,x,y,w,h,size,col,true,align,HF,1.1)}
function code(s,t,x,y,w,h,size=16,col=C.ink,align='left'){return txt(s,t,x,y,w,h,size,col,false,align,MF,1.25)}
function line(s,x,y,X,Y,c=C.line,w=1.5){if(x!==X&&y!==Y)throw Error('diagonal');rect(s,Math.min(x,X),Math.min(y,Y),Math.max(.01,Math.abs(X-x)),Math.max(.01,Math.abs(Y-y)),'none',c,w,'line')}
function pathline(s,pts,c=C.logic,w=2,arrow=false){const ps=[...pts];if(arrow){let [x,y]=ps.at(-1),[a,b]=ps.at(-2);ps.push(x!==a?[x+(x>a?-7:7),y-4]:[x-4,y+(y>b?-7:7)],[x,y],x!==a?[x+(x>a?-7:7),y+4]:[x+4,y+(y>b?-7:7)]);}const xs=ps.map(p=>p[0]),ys=ps.map(p=>p[1]),x=Math.min(...xs),y=Math.min(...ys),w0=Math.max(1,Math.max(...xs)-x),h=Math.max(1,Math.max(...ys)-y);s.shapes.add({name:'route-'+(++id),geometry:'custom',position:{left:x,top:y,width:w0,height:h},fill:'none',line:{fill:c,width:w},customPaths:[{width:w0,height:h,commands:ps.map(([a,b],i)=>i?{lineTo:{x:a-x,y:b-y}}:{moveTo:{x:a-x,y:b-y}})}]});}
function dot(s,x,y,c=C.logic){rect(s,x-3,y-3,6,6,c,'none',0,'ellipse')}
function ground(s,x,y,c=C.muted){line(s,x,y,x,y+8,c);line(s,x-9,y+8,x+9,y+8,c);line(s,x-6,y+12,x+6,y+12,c);line(s,x-3,y+16,x+3,y+16,c)}
function resistor(s,x,y,vertical=false,label=''){if(vertical){line(s,x,y,x,y+8);rect(s,x-5,y+8,10,26,C.white,C.muted,1.5);line(s,x,y+34,x,y+42);if(label)code(s,label,x+11,y,98,42,14,C.muted);}else{line(s,x,y,x+8,y);rect(s,x+8,y-5,38,10,C.white,C.muted,1.5);line(s,x+46,y,x+54,y);if(label)code(s,label,x-25,y-35,105,25,14,C.muted,'center');}}
function cap(s,x,y,label='100 nF'){line(s,x,y,x,y+14);line(s,x-9,y+14,x+9,y+14);line(s,x-9,y+20,x+9,y+20);line(s,x,y+20,x,y+34);code(s,label,x+14,y+1,100,30,13,C.muted)}
function card(s,x,y,w,h,heading,body,col=C.logic){rect(s,x,y,w,h);line(s,x+20,y+22,x+20,y+47,col,3);title(s,heading,x+34,y+14,w-54,44,22);if(body)txt(s,body,x+24,y+78,w-48,h-96);}
function add(titleText,eng,note){const s=P.slides.add();s.background.fill=C.bg;title(s,titleText,80,55,1120,52,32);txt(s,eng,80,115,1120,32,17.33,C.muted,false,'left',BF,1.1);line(s,80,164,1200,164);code(s,String(P.slides.items.length-1).padStart(2,'0'),1156,662,44,25,13,C.muted,'right');notes.push({slide:P.slides.items.length,title:titleText,note});s.speakerNotes.textFrame.setText(note);return s;}
function foot(s,t,y=631){txt(s,t,80,y,1090,27,16,C.muted,false,'left',BF,1.1)}
async function image(s,n,x,y,w,h){s.images.add({blob:await fs.readFile(path.join(A,n)),contentType:'image/png',alt:n,fit:'contain',position:{left:x,top:y,width:w,height:h}})}
function table(s,rows,x,y,w,widths,rh=43,font=17){const scale=w/widths.reduce((a,b)=>a+b,0),tb=s.tables.add({rows:rows.length,columns:rows[0].length,left:x,top:y,width:w,height:rows.length*rh,columnWidths:widths.map(v=>v*scale),values:rows});tb.borders.assign({fill:C.line,width:.8,style:'solid'});rows.forEach((r,i)=>{tb.rows[i].height=rh;r.forEach((v,j)=>{let c=tb.getCell(i,j);c.fill=i===0?'#E0F2FE':i%2?C.white:C.bg;c.text.style={typeface:i>0&&/^[\x00-\x7F]+$/.test(String(v))?MF:BF,fontSize:i>0&&/^[\x00-\x7F]+$/.test(String(v))?Math.min(font,16):font,color:i===0?C.ink:C.text,bold:i===0,alignment:j===0?'left':'center',verticalAlignment:'middle',insets:{left:9,right:9,top:5,bottom:5}};});});return tb;}

async function photo(s,n,x,y,w,h,crop){const q=s.images.add({blob:await fs.readFile(path.join(A,n)),contentType:/jpe?g$/.test(n)?'image/jpeg':'image/png',alt:n,fit:crop?'cover':'contain',position:{left:x,top:y,width:w,height:h},...(crop?{crop}: {})});if(crop){q.crop=crop;q.fit=undefined;}return q;}
const DIP={
 mcu:{file:'mcu_fixed.png',box:[284,32,738,1479],ys:[109,173,236,300,364,427,489,553,617,681,745,809,870,935,1000,1064,1128,1192,1257,1320],dim:[1024,1536]},
 driver:{file:'driver.png',box:[152,14,870,1518],ys:[158,328,504,682,860,1037,1214,1392],dim:[1024,1536]},
 inverter:{file:'inverter.png',box:[188,130,840,1390],ys:[268,432,602,770,938,1108,1269],dim:[1024,1536]}
};
async function dip(s,kind,x,y,h){let q=DIP[kind], [l,t,r,b]=q.box,w=(r-l)/(b-t)*h;await photo(s,q.file,x,y,w,h,{left:l/q.dim[0],top:t/q.dim[1],right:1-r/q.dim[0],bottom:1-b/q.dim[1]});let pins={},n=q.ys.length;for(let i=0;i<n;i++){let yy=y+(q.ys[i]-t)/(b-t)*h;pins[i+1]=[x,yy];pins[2*n-i]=[x+w,yy];}return {x,y,w,h,pins};}
function terminal(s,p,label,side='right',len=54,color=C.logic,size=13.33){let e=[p[0]+(side==='right'?len:-len),p[1]];line(s,...p,...e,color,1.5);code(s,label,side==='right'?e[0]+3:e[0]-128,e[1]-12,125,25,size,color,side==='right'?'left':'right');return e;}
function netlabel(s,t,x,y,w=150,col=C.logic){code(s,t,x,y,w,24,13.33,col);}
function turnArrow(s,cx,cy,r,cw,col){let pts=[];for(let i=0;i<=35;i++){let a=(-140+(cw?1:-1)*280*i/35)*Math.PI/180;pts.push([cx+r*Math.cos(a),cy+r*Math.sin(a)]);}pathline(s,pts,col,2.5);let [ex,ey]=pts.at(-1),[px,py]=pts.at(-2),a=Math.atan2(ey-py,ex-px);pathline(s,[[ex-8*Math.cos(a-.5),ey-8*Math.sin(a-.5)],[ex,ey],[ex-8*Math.cos(a+.5),ey-8*Math.sin(a+.5)]],col,2.5);}
const oldNotes=JSON.parse(await fs.readFile(path.join(S,'previous_notes.json'),'utf8'));
const notesFor=(n)=>oldNotes[n-1].note;

const src={mcu:'https://ww1.microchip.com/downloads/en/DeviceDoc/doc1919.pdf',driver:'https://www.ti.com/lit/ds/symlink/l293d.pdf',inv:'https://www.ti.com/lit/ds/symlink/sn74hct14.pdf',motor:'https://www.pololu.com/product/3041',opto:'https://www.vishay.com/docs/83430/vo617a.pdf',sensor:'https://www.ia.omron.com/data_pdf/cat/e3z_ds_e_18_8_csm438.pdf?id=407',optics:'https://www.ia.omron.com/support/guide/43/introduction.html'};
const states=['CLOSED','OPENING','OPEN_HOLD','CLOSING','REV_WAIT','REOPENING','SAFETY_HOLD'];
const bits=[[0,0,1,0,1,1],[1,0,0,1,0,1],[0,0,1,1,0,1],[0,1,0,0,1,1],[0,0,1,1,1,1],[1,0,0,1,0,1],[0,0,1,1,1,0]];
const hex=bits.map(([a,b,e,r,g,o])=>(0x88|a|(b<<1)|(e<<2)|(r<<4)|(g<<5)|(o<<6)).toString(16).toUpperCase()+'H');
const shafts=['STOP','CW','STOP','CCW','Coast','CW','STOP'];

async function buildFSM(){
 const s=add('แผนภาพสถานะการทำงานของประตู','Moore machine: เอาต์พุตขึ้นกับสถานะปัจจุบัน  ตัวอย่างเริ่มจากประตูปิดสนิท','');
 const edge=C.text, fill='#E0F2FE';
 // Seven course-level states. Motor and LED outputs are a function of each state.
 const pos=[[110,254],[360,254],[610,254],[610,424],[360,424],[110,424],[110,558]];
 const outputs=['STOP  ไฟแดงติด','CW  ไฟเขียวติด','STOP  ไฟเขียวติด','CCW  ไฟแดงติด','Coast  ไฟดับทุกสี','CW  ไฟเขียวติด','STOP  ไฟส้มติด'];
 const W=148,H=64;
 for(let i=0;i<7;i++){
   let [x,y]=pos[i];
   rect(s,x,y,W,H,fill,'#475569',1.5,'roundRect');
   code(s,states[i],x+5,y+8,W-10,27,16,C.ink,'center');
   txt(s,outputs[i],x+5,y+37,W-10,21,14.67,C.text,false,'center',BF,1.1);
 }
 // Initial pseudostate. Startup assumption is outside the transition label.
 rect(s,81,277,16,16,C.ink,'none',0,'ellipse');
 pathline(s,[[97,285],[110,285]],edge,1.8,true);
 // Normal sequence.
 pathline(s,[[258,286],[360,286]],edge,1.8,true);
 txt(s,'กดเปิด',265,255,88,26,16,C.ink,false,'center');
 pathline(s,[[508,286],[610,286]],edge,1.8,true);
 code(s,'[LO=0]',513,255,92,26,14,C.ink,'center');
 pathline(s,[[684,318],[684,424]],edge,1.8,true);
 txt(s,'กดปิด\n[พร้อมปิด]',695,343,91,58,15.3,C.ink,false,'left',BF,1.25);
 pathline(s,[[758,456],[797,456],[797,210],[184,210],[184,254]],edge,1.8,true);
 txt(s,'[LC=0 และไม่มีเหตุเปิดกลับ]',318,176,390,29,15.3,C.ink,false,'center');
 // Coast before every reversal; obstacle cause is latched in S.
 pathline(s,[[610,456],[508,456]],edge,1.8,true);
 code(s,'[BEAM_DET=0]',501,392,116,23,12.67,C.ink,'center');
 txt(s,'หรือกดเปิด',513,417,91,26,14.67,C.ink,false,'center');
 pathline(s,[[360,456],[258,456]],edge,1.8,true);
 txt(s,'ครบ 200 ms',261,422,97,26,15.3,C.ink,false,'center');
 // Reopening ends in a different hold according to the remembered cause.
 pathline(s,[[184,424],[184,370],[574,370],[574,307],[610,307]],edge,1.8,true);
 code(s,'[LO=0, S=0]',281,339,220,26,14.67,C.ink,'center');
 pathline(s,[[184,488],[184,558]],edge,1.8,true);
 code(s,'[LO=0, S=1]',192,510,172,25,14,C.ink);
 pathline(s,[[258,590],[684,590],[684,488]],edge,1.8,true);
 txt(s,'กดปิด [พร้อมปิด]',387,554,214,27,16,C.ink,false,'center');
 // Notation and interlock. The diagram deliberately does not add new fault states.
 txt(s,'S = 1 เมื่อพบลำแสงขาด  S = 0 เมื่อสั่งเปิดกลับด้วยปุ่ม',309,503,476,26,14.67,C.text);
 txt(s,'กดเปิด: PB_IN หรือ PB_OUT   กดปิด: PB_CLOSE ครั้งใหม่หลังปล่อย 20 ms',80,634,718,25,14.67,C.text);
 txt(s,'พร้อมปิด: BEAM_DET=1 และปล่อยปุ่มเปิดทั้งสอง   ไม่เข้าเงื่อนไขให้คงสถานะเดิม',80,661,730,25,14.67,C.text);
 // Output reference: actual motor and actual LED product photographs.
 line(s,815,190,815,628,C.line,1);
 title(s,'เพลาและไฟในแต่ละสถานะ',835,183,365,32,20);
 const ledCrops=[{left:408/600,top:277/600,right:141/600,bottom:187/600},
 {left:115/600,top:146/600,right:400/600,bottom:318/600},
 {left:305/600,top:281/600,right:217/600,bottom:164/600}];
 const lx=[1050,1102,1154],labels=['แดง','เขียว','ส้ม'],cols=[C.red,C.green,C.hold];
 for(let j=0;j<3;j++){
   const q=ledCrops[j], lw=(1-q.left-q.right)/(1-q.top-q.bottom)*52;
   await photo(s,'led-rainbow.jpg',lx[j]+22.5-lw/2,218,lw,52,q);
   txt(s,labels[j],lx[j]-1,270,47,24,15.3,cols[j],true,'center');
 }
 txt(s,'สถานะ',835,266,123,27,15.3,C.ink,true);
 txt(s,'เพลา',963,266,82,27,15.3,C.ink,true,'center');
 line(s,835,300,1200,300,C.line,1);
 for(let i=0;i<7;i++){
   const y=306+i*45;
   code(s,states[i],835,y+6,128,27,13.33,C.ink);
   await photo(s,'motor.jpg',965,y,43,43,{left:.40,top:.35,right:0,bottom:.03});
   if(shafts[i]==='CW'||shafts[i]==='CCW')turnArrow(s,998,y+31,11,shafts[i]==='CW',i===3?C.red:C.green);
   if(shafts[i]==='STOP'){line(s,993,y+28,993,y+39,C.muted,2.5);line(s,999,y+28,999,y+39,C.muted,2.5);}
   code(s,shafts[i],1008,y+10,44,23,i===4?11.3:12,C.ink,'center');
   for(let j=0;j<3;j++){
     const on=bits[i][j+3]===0;
     txt(s,on?'ติด':'ดับ',lx[j]-1,y+7,47,27,16,on?cols[j]:C.muted,on,'center');
   }
   line(s,835,y+44,1200,y+44,C.line,.7);
 }
 txt(s,'มองเข้าหาปลายเพลา  CW เปิด  CCW ปิด',835,628,365,24,14.67,C.text);
 txt(s,'STOP และ Coast ตัดแรงขับ ไม่ใช้เบรกไฟฟ้า',835,652,313,25,14,C.muted);
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

// 01
{let s=P.slides.add();s.background.fill=C.bg;txt(s,'305341  EMBEDDED SYSTEMS 1',80,79,1120,35,19,C.logic,true,'center',HF);title(s,'ประตูบานเลื่อนเดี่ยวในบ้าน',80,188,1120,57,34,C.ink,'center');title(s,'เปิดกลับเมื่อตรวจพบสิ่งกีดขวางด้วยโฟโต้เซนเซอร์',80,251,1120,62,32,C.ink,'center');txt(s,'Single-Panel Residential Sliding Door\nwith Photoelectric Obstacle Detection and Automatic Reopening',80,342,1120,70,20,C.text,false,'center',BF,1.5);line(s,272,434,1008,434);txt(s,'66362416  นายธีรภัทร ภู่ระย้า',145,488,480,46,20,C.ink,false,'center');txt(s,'66363116  นางสาวปราณปรียา ศรียอง',655,488,480,46,20,C.ink,false,'center');txt(s,'อาจารย์ที่ปรึกษา',80,571,1120,28,18.67,C.muted,false,'center');txt(s,'ดร.แสงชัย มังกรทอง',80,610,1120,34,20,C.ink,false,'center');let note=notesFor(1);notes.push({slide:1,title:'ประตูบานเลื่อนเดี่ยวในบ้าน',note});s.speakerNotes.textFrame.setText(note);}
// Problem scenario, displayed page 01
{let s=add('สถานการณ์ปัญหา: สิ่งกีดขวางขณะประตูกำลังปิด','ประตูบานเลื่อนเดี่ยวในบ้านที่ควบคุมด้วยปุ่มกด','');
 await image(s,'problem_context.png',80,194,672,448);
 pathline(s,[[492,367],[398,367]],C.red,3,true);txt(s,'กำลังปิด',401,329,110,28,18.67,C.red,true);
 title(s,'จังหวะที่เกิดความเสี่ยง',790,204,410,39,24,C.red);
 title(s,'01  ผู้ใช้กดปุ่มปิด',790,276,410,31,21);txt(s,'PB_CLOSE สั่งให้บานเลื่อนไปทางซ้าย',790,316,410,32,18.67);
 line(s,793,367,1197,367);
 title(s,'02  สัตว์เลี้ยงเข้าทางผ่าน',790,388,410,32,21);txt(s,'สัตว์เลี้ยงอยู่ในช่องประตู\nระหว่างที่บานยังเลื่อนปิด',790,430,410,64,18.67);
 line(s,793,516,1197,516);
 title(s,'03  ลิมิตยังไม่ทำงาน',790,537,410,32,21);txt(s,'LC ตรวจเฉพาะตำแหน่งปิดสุด\nบานจึงอาจหนีบก่อนถึงลิมิต',790,579,410,65,18.67);
 txt(s,'ลูกศรแสดงทิศปิด  ช่องว่างด้านซ้ายคือทางผ่านที่ยังเปิดอยู่',80,647,672,27,15.3,C.muted);
}
// Proposed solution, displayed page 02
{let s=add('แนวทางแก้ไข: ตรวจลำแสงแล้วเปิดประตูกลับ','ติดหัวส่งและหัวรับบนกรอบคงที่ ให้แนวตรวจจับอยู่ด้านหน้าระนาบที่บานวิ่ง','');
 await image(s,'solution_installation.png',80,194,672,448);
 // The dotted infrared axis is explanatory, and is hidden by the cat.
 function beam(x,y,X,Y){let d=Math.hypot(X-x,Y-y);for(let k=0;k<d;k+=8){let j=Math.min(k+4,d);pathline(s,[[x+(X-x)*k/d,y+(Y-y)*k/d],[x+(X-x)*j/d,y+(Y-y)*j/d]],C.logic,1.8);}}
 beam(195,517,241,516);beam(286,514,417,512);
 txt(s,'หัวส่ง',101,569,112,28,17.33,C.ink,true);pathline(s,[[155,566],[155,542],[191,542],[191,522]],C.ink,1.2);dot(s,191,519,C.logic);
 txt(s,'หัวรับ',350,569,112,28,17.33,C.ink,true);pathline(s,[[401,566],[401,540],[420,540],[420,516]],C.ink,1.2);dot(s,420,513,C.logic);
 txt(s,'ไฟส้มเปิดค้าง',90,267,149,26,16,C.hold,true);pathline(s,[[104,296],[104,345],[143,345],[143,352]],C.hold,1.2);
 await image(s,'solution_receiver_detail.png',790,201,138,211);
 title(s,'ยึดกับกรอบคงที่',948,207,252,34,21);
 txt(s,'หัวส่งและหัวรับหันเข้าหากัน\nขายึดยื่นพ้นระนาบบาน\nเดินสายไปตามกรอบ',948,260,252,109,17.33,C.text,false,'left',BF,1.55);
 txt(s,'รายละเอียดหัวรับและขายึด',790,420,410,28,16,C.muted);line(s,793,460,1197,460);
 title(s,'เมื่อลำแสงถูกบัง',790,481,410,35,22,C.hold);
 txt(s,'ตัดแรงขับและพัก 200 ms\nเปิดกลับจนสุด แล้วติดไฟส้ม\nรอคนตรวจและกดปิดครั้งใหม่',790,528,410,102,18.67);
 txt(s,'เส้นประแสดงแนวตรวจจับของแสงอินฟราเรด',80,647,672,27,15.3,C.muted);
}
// 03
await buildFSM();
// 04
{let s=add('โครงสร้างเชิงกลและทิศทางเพลามอเตอร์','ระยะวิ่งตามแบบ 200 mm ขับด้วยสายพานและมู่เล่ย์','กลไกชุดสาธิตกำหนดระยะเคลื่อนที่ 200 mm และเส้นผ่านศูนย์กลางพิตช์มู่เล่ย์ขับ 8 mm ซึ่งต้องตรวจความเข้ากันได้กับพิทช์สายพานจริง ใช้มอเตอร์ Pololu #3041 12V อัตราทด100.37:1 สำหรับโมเดลขนาดเล็ก ไม่ใช่ข้อยืนยันแรงบิดสำหรับประตูบ้านจริง มองจากปลายเพลาเข้าหามอเตอร์แล้ว CW ทำให้สายพานช่วงบนเคลื่อนไปขวา โดยต้องยึดบานกับสายพานช่วงบน LC อยู่ปลายซ้าย LO อยู่ปลายขวา ทิศต่อสายมอเตอร์ต้องตรวจจริงก่อนประกอบ STOP/Coast หมายถึงตัดแรงขับไม่ใช่เบรกไฟฟ้า ภาพไม่แสดงสเกลการผลิต\nอ้างอิง: '+src.motor+'; Lab 2 หน้า11–13');rect(s,80,188,544,425);await image(s,'mechanism.png',90,232,524,295);title(s,'ชุดสาธิตระยะวิ่ง 200 mm',104,200,496,32,21,C.logic);txt(s,'ยึดบานกับสายพานช่วงบน\nติดหัวส่งและหัวรับบนกรอบคงที่',104,540,496,57,18.67);card(s,656,188,544,425,'การกำหนดทิศทาง','');table(s,[['เพลา','บานประตู'],['CW','เปิดไปทางขวา'],['CCW','ปิดไปทางซ้าย'],['STOP · Coast','ตัดแรงขับ']],680,260,496,[220,276],47,18);txt(s,'LC ซ้าย: P2.4    LO ขวา: P2.3\nPololu #3041 · 12 V · 100.37:1\nมู่เล่ย์พิตช์ Ø 8 mm ตามแบบกลไก',680,470,496,104,18.67);foot(s,'ตรวจทิศเพลาและแรงบิดกับชุดประกอบจริงก่อนใช้งาน');}
// 05
await buildHardware();
// 06
await buildSensor();
// 07
await buildDriver();
// 08
{let s=add('การจัดสรรขาและพอร์ต AT89S52','ขา DIP-40 แยกอินพุต เอาต์พุต และรหัสสถานะสำหรับตรวจลอจิก','P2เป็นอินพุตquasi-bidirectionalต้องเขียนlatchFFH ปุ่มNOต่อลงกราวด์และpullup10kไป5V ลิมิตNOactive-low ส่วนESTOP NC2ลงกราวด์จึงอ่าน1เมื่อกดหรือสายเปิด PB_CLOSEย้ายมาP2.5ขา26ตามสเปกฉบับนี้และใช้รีเซ็ตด้วยมือเฉพาะfaultโดยไม่เริ่มการเคลื่อนที่ P2.6ไม่ใช้ P0เป็นopen-drainต้องมีpullup10kแยกแต่ละบิตไป5V P0.0,1,2อยู่ขา39,38,37ตามลำดับ รหัสสถานะ0ถึง6ตามลำดับตารางและ7ใช้แสดงfault P1.3และ7คง1 LEDสามสีต่อactive-low\nอ้างอิง: '+src.mcu);const xs=[80,464,848];for(const [i,h]of [[0,'Port 2 · Inputs'],[1,'Port 1 · Outputs'],[2,'Port 0 · Debug']]){rect(s,xs[i],188,352,410);title(s,h,xs[i]+18,202,316,35,22,C.logic);}table(s,[['ขา','สัญญาณ'],['P2.0 (21)','PB_IN'],['P2.1 (22)','PB_OUT'],['P2.2 (23)','BEAM_DET'],['P2.3 (24)','LO'],['P2.4 (25)','LC'],['P2.5 (26)','PB_CLOSE'],['P2.7 (28)','ESTOP']],96,257,320,[142,178],37,16);table(s,[['ขา','สัญญาณ'],['P1.0 (1)','IN1'],['P1.1 (2)','IN2'],['P1.2 (3)','RUN_N'],['P1.4 (5)','RED_N'],['P1.5 (6)','GREEN_N'],['P1.6 (7)','ORANGE_N']],480,257,320,[142,178],37,16);table(s,[['ขา','บิตสถานะ'],['P0.0 (39)','S0'],['P0.1 (38)','S1'],['P0.2 (37)','S2']],864,257,320,[153,167],37,16);txt(s,'000 ถึง 110: สถานะ 0–6\n111: หยุดจาก fault\nPull-up 10 kΩ ทุกบิต',872,430,304,124,18.67);foot(s,'P2 latch = FFH · P2.6 ไม่ใช้ · P1.3 และ P1.7 = 1 · P0 เป็น open-drain');}
// 09
{let s=add('ตารางสถานะและค่าเอาต์พุตพอร์ต 1','คำนวณค่า Hex จากตำแหน่งบิตจริง โดยไฟสถานะติดเมื่อบิตเป็น 0','ตารางคำนวณค่าพอร์ตจากตำแหน่งบิตจริง IN1=0 IN2=1 RUN_N=2 RED=4 GREEN=5 ORANGE=6 และบิต3กับ7คง1 ค่า P1 คือ EC, D9, DC, EA, FC, D9, BC ตามลำดับ ตัวอย่าง CLOSED ให้ IN1=0, IN2=0, RUN_N=1 และไฟแดงติด จึงได้ 11101100 ฐานสอง หรือ ECH ส่วน SAFETY_HOLD ให้มอเตอร์ตัดขับและไฟส้มติด จึงได้ 10111100 ฐานสอง หรือ BCH เอาต์พุตทุกแถวเป็นค่าในภาวะปกติ faultบังคับFCและP0รหัส7\nอ้างอิง: '+src.mcu+'\n'+src.driver);table(s,[['State','Shaft','IN1','IN2','RUN_N','RED_N','GRN_N','ORG_N','P1 Hex'],...states.map((st,i)=>[st,shafts[i],...bits[i].map(String),hex[i]])],80,218,1120,[215,110,70,70,120,113,113,113,96],46,17.3);txt(s,'ไฟติดเมื่อบิตเป็น 0',80,593,544,32,18.67,C.logic,true);txt(s,'P1.3 = 1 และ P1.7 = 1 ทุกสถานะ',656,593,544,32,18.67,C.ink);foot(s,'ค่าที่แสดงมาจากการรวมบิตตามผังพอร์ต ไม่ใช่รหัสหมายเลขสถานะ');}
// 10
{let s=add('เหตุการณ์และเงื่อนไขเปลี่ยนสถานะ','รับคำสั่งจากการกดใหม่ และตรวจลำแสงก่อนอนุญาตให้ปิด','OPEN_EVTมาจากPB_INหรือPB_OUTกดใหม่ CLOSE_EVTมาจากPB_CLOSEP2.5กดใหม่ โดยต้องปล่อยหลังเข้ารอและกรอง20ms หากกดขณะลำแสงขาดให้ทิ้งเหตุการณ์ ไม่เก็บรอให้แสงกลับแล้วปิดเอง ในCLOSINGตรวจBEAMก่อนLC เมื่อหยุดเพราะลำแสงขาดให้safety_seen=1และคงจนเปิดสุด กดเปิดขณะปิดก็ให้เปิดกลับหลังcoastแต่safety_seen=0และจบOPEN_HOLD ตารางปกติไม่แทนการตรวจESTOPและfaultที่มีลำดับสูงกว่า');table(s,[['ปัจจุบัน','เหตุการณ์และ Guard','ถัดไป'],['CLOSED','OPEN_EVT จาก P2.0 หรือ P2.1','OPENING'],['OPENING','LO = 0','OPEN_HOLD'],['OPEN_HOLD','CLOSE_EVT ใหม่ และ BEAM_DET = 1','CLOSING'],['CLOSING','BEAM_DET = 0 หรือ OPEN_EVT','REV_WAIT'],['CLOSING','LC = 0 และไม่มีเหตุเปิดกลับ','CLOSED'],['REV_WAIT','พักครบอย่างน้อย 200 ms','REOPENING'],['REOPENING','LO = 0 และ safety_seen = 1','SAFETY_HOLD'],['REOPENING','LO = 0 และ safety_seen = 0','OPEN_HOLD'],['SAFETY_HOLD','CLOSE_EVT ใหม่ และ BEAM_DET = 1','CLOSING']],80,193,1120,[242,626,252],40,16.7);foot(s,'ทุกคำสั่งปิดต้องปล่อยปุ่มเปิดทั้งสอง · JB ตรวจบิตเป็น 1 และ JNB ตรวจบิตเป็น 0',613);}
// 11
{let s=add('ข้อกำหนดเวลาและจังหวะกลับทิศมอเตอร์','กรองเฉพาะปุ่มกด และตัดแรงขับก่อนเปลี่ยนทิศมอเตอร์','เวลา20msใช้กรองปุ่ม ไม่หน่วงBEAM_DETด้วยวิธีเดียวกัน 8051แบบ12Tที่12MHzมีmachinecycle1us Timer0mode1เสนอโหลดFC18Hเพื่อนับ1000cycle แต่ISRและการโหลดใหม่มีoverheadที่ต้องวัด ช่วง200msเป็นcoastก่อนกลับทิศ ลดแรงกระชากทางกลและกระแสกลับทิศ ไม่ใช่dynamic brakingและไม่รับประกันว่าเพลาหยุดสนิท Waveformเป็นลำดับเชิงตรรกะไม่ใช่ข้อมูลoscilloscope t0ตรวจพบbeam, t1ซอฟต์แวร์SETB RUN_N,แล้วMOV P1FCทำให้INคู่00 ขณะENต่ำ t2หลังอย่างน้อย200msเตรียมทิศ10โดยRUN_Nยัง1, t3จึงเปิดEN ไม่อ้างlatencyต่ำกว่า1usเพราะรวมsensoroptoinverterpolling8051และL293D เวลาจริงของทุกส่วนต้องวัด\nอ้างอิง: '+src.mcu+'\n'+src.driver+'\n'+src.opto);card(s,80,188,352,157,'20 ms · กรองปุ่ม','ปล่อยและกดใหม่ให้คงที่\nTimer 0 ที่ 12 MHz');card(s,464,188,352,157,'200 ms · Coast','EN = 0 ตลอดช่วงพัก\nไม่ใช่การเบรกทางไฟฟ้า',C.hold);card(s,848,188,352,157,'เวลาตอบสนอง','รวมเซนเซอร์และลูปควบคุม\nวัดเวลาตั้งแต่ตรวจพบถึง EN = 0',C.red);rect(s,80,370,1120,231);let x0=390,x1=470,x2=970,x3=1045;for(const [x,l]of [[x0,'t0'],[x1,'t1'],[x2,'t2'],[x3,'t3']]){line(s,x,398,x,576,C.line,1);code(s,l,x-17,375,43,24,13,C.muted,'center');}code(s,'BEAM_DET',103,414,200,25,15);code(s,'RUN_N',103,464,200,25,15);code(s,'IN1 IN2',103,518,200,25,15);pathline(s,[[302,417],[x0,417],[x0,438],[1150,438]],C.logic,2);pathline(s,[[302,488],[x1,488],[x1,467],[x3,467],[x3,488],[1150,488]],C.hold,2);for(const [a,b,label]of [[302,x1,'01'],[x1,x2,'00'],[x2,1150,'10']]){rect(s,a,516,b-a,31,C.white,C.muted,1);code(s,label,(a+b)/2-25,519,50,24,14,C.ink,'center');}txt(s,'ตัดขับก่อนเปลี่ยนค่า IN',494,552,340,25,15,C.muted);txt(s,'≥ 200 ms',647,393,176,25,16,C.hold,true,'center');foot(s,'ไดอะแกรมแสดงลำดับ ไม่ใช่ผลวัด · เปลี่ยนทิศเป็น 10 ขณะ EN = 0 แล้วจึงเริ่มขับ');}
// 12
{let s=add('SAFETY_HOLD และการกดปิดครั้งใหม่','เปิดค้างจนคนตรวจทางผ่าน ปล่อยปุ่มเดิม แล้วกดปิดอีกครั้ง','เข้าถึงLOหลังเปิดกลับด้วยเหตุbeamแล้วให้ไฟส้มติดค้างและล้างclose_armed เริ่มรับคำสั่งได้หลังเห็นPB_CLOSEเป็น1คงที่อย่างน้อย20ms นับหลังเข้าถึงสถานะนี้ ถ้าคนกดค้างมาก่อนต้องไม่ยอมรับ คนตรวจช่องทางผ่านให้ว่างแล้วกดใหม่จน0คงที่20ms พร้อมBEAM_DET=1และปุ่มเปิดปล่อยจึงปิด หากกดตอนbeamขาดให้ทิ้งคำสั่ง ต้องปล่อยใหม่ ไม่ปิดเมื่อสิ่งกีดขวางออกจากลำแสงเอง');card(s,80,208,352,342,'01  หยุดค้างและเตือน','SAFETY_HOLD\nเพลา STOP · ไฟส้มติด\n\nทิ้งคำสั่งปิดก่อนหน้า\nยังไม่พร้อมรับปุ่มที่กดค้าง',C.hold);card(s,464,208,352,342,'02  ปล่อยปุ่มเดิม','PB_CLOSE = 1\nคงที่อย่างน้อย 20 ms\n\nจึงพร้อมรับการกดครั้งใหม่\nหลังเข้าสู่สถานะเปิดค้าง');card(s,848,208,352,342,'03  ตรวจแล้วกดปิดใหม่','BEAM_DET = 1\nPB_CLOSE กดใหม่เป็น 0\n\nกรองการกด 20 ms\nจึงเข้าสู่ CLOSING',C.green);title(s,'ลำแสงกลับมาปกติอย่างเดียว ประตูยังคงเปิดค้าง',80,579,1120,40,24,C.hold,'center');}
// 13
{let s=add('แอสเซมบลี 8051 สำหรับตัดแรงขับ','ตรวจ P2.2 แล้วตัด Enable ก่อนเข้าสู่ช่วง Coast','ตัวอย่างนี้เป็นส่วนของstatehandler ไม่ใช่เฟิร์มแวร์ที่ประกอบและจำลองครบแล้ว เมื่อตรวจพบP2.2เป็น0ให้SETB P1.2ก่อนMOV P1FC ตั้งSAFETY_SEENและเรียกENTER_REV_WAITให้เริ่มตัวจับเวลา200msแล้วกลับMAIN โดยไม่บล็อกลูปกลางให้รอ200ms เพื่อให้ยังตรวจESTOPและfaultได้ขณะcoast เมื่อครบเวลาให้เขียนทิศCWโดยRUN_Nยัง1 เช่นDDHก่อนCLR P1.2ให้D9H การใส่MOV R7,#200แล้วLCALL Delay_msอย่างเดียวจะปลอดภัยได้ก็ต่อเมื่อซับรูทีนบริการเหตุฉุกเฉินต่อเนื่อง จึงเลือกstateและtimerแยกให้ชัดเจน\nอ้างอิงชุดคำสั่งและพอร์ต: '+src.mcu);rect(s,80,188,402,414);title(s,'พบลำแสงขาดขณะปิด',104,210,354,40,22,C.red);txt(s,'1  ตัด Enable ก่อน\n2  ตั้งเอาต์พุต Coast\n3  จำเหตุการณ์ที่เกิดขึ้น\n4  เริ่มจับเวลาแล้วกลับ MAIN',104,278,354,156,18.67);code(s,'REV_WAIT  P1 = FCH\nREOPENING P1 = D9H',104,478,354,70,15,C.logic);rect(s,514,188,686,414);code(s,'ClosingLoop:\n    JB    P2.2, CheckCloseLimit\n    SETB  P1.2\n    MOV   P1, #0FCH\n    SETB  SAFETY_SEEN\n    LCALL ENTER_REV_WAIT\n    LJMP  MAIN\n\nCheckCloseLimit:\n    LCALL CHECK_OPEN_EVENT\n    JC    Enter_Manual_Reopen\n    JNB   P2.4, Enter_Closed\n    LJMP  MAIN',542,210,630,325,16);txt(s,'ENTER_REV_WAIT เริ่มนับ 200 ms แล้วคืนทันที',542,551,630,30,17.33,C.logic);foot(s,'MAIN ตรวจ E-stop ก่อน · ส่วนนี้ตรวจลำแสงก่อนเหตุเปิด · ตัวอย่างไม่ใช่เฟิร์มแวร์ครบชุด');}
// 14
{let s=add('ผลตรวจลอจิกและแผนทดสอบบนชุดจริง','แยกผลที่ได้จากแบบจำลองออกจากการวัดวงจรและกลไกจริง','ผลที่ทำจริงคือรันแบบจำลองPythonสำหรับระบบBEAMฉบับนี้21กรณีผ่านทั้งหมด ก้าวเวลาอุดมคติ1ms ตรวจค่าพอร์ต ช่วงcoast เหตุเปิดปิด interlock การกดค้าง beamก่อนLC และfault ผลนี้ไม่ใช่EdSim51หรือฮาร์ดแวร์ ขั้นถัดไปคือทำเฟิร์มแวร์ฉบับนี้ให้ครบแล้วทดสอบในEdSim51และวัดชุดจริง รายการbenchใช้วัตถุจำลองก่อน ห้ามใช้เด็กหรือสัตว์ทดสอบความปลอดภัย');card(s,80,188,544,414,'ผลจากแบบจำลอง FSM','');title(s,'21 จาก 21 กรณีผ่าน',104,273,496,54,32,C.green);txt(s,'Python · ก้าวเวลาครั้งละ 1 ms\nตรวจพอร์ต เหตุการณ์ และการค้างเปิด\n\nยังไม่ใช่ผล EdSim51 ของเฟิร์มแวร์ชุดนี้\nยังไม่ใช่ผลวัดวงจรหรือระยะหยุด',104,351,496,169,18.67);card(s,656,188,544,414,'การทดสอบบนโต๊ะทดลอง','');table(s,[['สิ่งที่ตรวจ','วิธีวัด'],['แนวลำแสง','วัตถุทึบ แสงแวดล้อม จุดอับ'],['เวลาตอบสนอง','BEAM_DET → RUN_N → EN'],['ระยะหยุด','ตำแหน่งบานตลอดช่วง Coast'],['ภาคกำลัง','กระแสติดขัดและกลับทิศ'],['ความร้อน','L293D และ R 27 Ω']],680,270,496,[165,331],44,17);foot(s,'ขั้นต่อไป: ทดสอบเฟิร์มแวร์ใน EdSim51 แล้ววัดชุดจริงด้วยวัตถุจำลอง');}
// 15
{let s=add('ขอบเขตการตรวจจับและความปลอดภัย','การตรวจจับขึ้นกับแนวลำแสงและตำแหน่งติดตั้งเซนเซอร์','Through-beamตรวจวัตถุทึบที่บังแนวแสง ไม่ได้ตรวจพื้นที่ทั้งหมดของช่องประตู ตำแหน่งติดตั้งต้องเหมาะกับขาสัตว์เลี้ยงหรือเด็กและมีบริเวณที่ตรวจไม่ถึง เช่นเหนือหรือต่ำกว่าแนวแสง การใช้diffuse-reflectiveทั่วไปไม่ใช่วิธีแก้ที่รับประกันการตรวจวัตถุใสหรือเงา ต้องเลือกเซนเซอร์สำหรับวัตถุใสหรือretro-reflectiveที่เหมาะและทดสอบกับชิ้นงานจริง วงจรLight-ONในสไลด์ช่วยตีความสายสัญญาณNPNฝั่งเซนเซอร์เปิดและไฟเซนเซอร์ดับเป็นการขาดลำแสง แต่ยังไม่มีการตรวจความเสียหายแบบซ้ำซ้อนหรือsafety-ratedoutput จึงเป็นชุดสาธิตเพื่อการศึกษา ไม่ใช่ตัวควบคุมประตูที่ผ่านการรับรองSIL ภาพระบบบ้านแสดงบริบทส่วนมอเตอร์และระยะ200mmเป็นต้นแบบบนโต๊ะ\nอ้างอิง: '+src.optics+'\n'+src.sensor);card(s,80,188,352,343,'ตรวจได้ตามแนวแสง','วัตถุทึบที่บังลำแสง\nไม่ต้องสวมแท็กหรือปลอกคอ\n\nติดตั้งให้เหมาะกับระดับขา\nและตรวจจุดอับในช่องประตู');card(s,464,188,352,343,'ข้อจำกัดของโฟโต้เซนเซอร์','ลำแสงเดียวไม่ครอบคลุมทุกจุด\nต้องจัดแนวหัวส่งและหัวรับ\n\nวัตถุใสหรือเงาต้องเลือก\nเซนเซอร์ให้เหมาะและทดสอบ',C.power);card(s,848,188,352,343,'การหยุดเมื่อระบบผิดปกติ','สาย NPN ขาดหรือไฟเซนเซอร์หาย\nให้ BEAM_DET = 0\nยังไม่ตรวจสัญญาณค้างทุกแบบ\n\nชุดสาธิตระยะวิ่ง 200 mm\nไม่แทนระบบประตูนิรภัย\nที่ผ่านการรับรอง SIL',C.hold);title(s,'ตรวจทางผ่านให้ปลอดภัย แล้วจึงกดปิดเอง',80,571,1120,46,26,C.ink,'center');}
const spoken=JSON.parse(await fs.readFile(path.join(S,'formal_notes.json'),'utf8'));
spoken.forEach((note,i)=>{notes[i].note=note;P.slides.items[i].speakerNotes.textFrame.setText(note);});
await fs.mkdir(B,{recursive:true});await(await PresentationFile.exportPptx(P)).save(path.join(B,'candidate.pptx'));
await fs.writeFile(path.join(S,'speaker_notes.json'),JSON.stringify(notes,null,2));await fs.writeFile(path.join(B,'coverage.json'),JSON.stringify(coverage,null,2));await fs.writeFile(path.join(V,'Infrared_FSM_Speaker_Notes.md'),notes.map(n=>`## ${n.slide}. ${n.title}\n\n${n.note}\n`).join('\n'));
await fs.writeFile(path.join(V,'Infrared_FSM_State_Table.csv'),'\uFEFF'+[['State','Shaft','IN1','IN2','RUN_N','RED_N','GREEN_N','ORANGE_N','P1'],...states.map((n,i)=>[n,shafts[i],...bits[i],hex[i]])].map(r=>r.join(',')).join('\n'));
console.log('Created 16 slides; output bytes:',hex.join(' '));
