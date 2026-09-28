from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
from lxml import etree as E
import copy,json,hashlib
out=Path('embedded-system/1/mini-project/output');r=out/'version2/quality_audit/feedback_revision';target=out/'mini-project_Sliding_Door_Safety_Control.pptx'
ns={'a':'http://schemas.openxmlformats.org/drawingml/2006/main','p':'http://schemas.openxmlformats.org/presentationml/2006/main','r':'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
with ZipFile(target) as z:parts={n:z.read(n) for n in z.namelist()}
def text(s):return ''.join(s.xpath('.//a:t/text()',namespaces=ns))
def find(tree,prefix):return next(s for s in tree.findall('p:sp',ns) if text(s).startswith(prefix))
def pos(s,x,y,w,h):
 xf=s.find('p:spPr/a:xfrm',ns)
 for tag,vals in [('off',{'x':x,'y':y}),('ext',{'cx':w,'cy':h})]:
  for k,v in vals.items():xf.find('a:'+tag,ns).set(k,str(round(v*9525)))
def put(s,value):
 body=s.find('p:txBody',ns);para=body.find('a:p',ns);run=para.find('a:r',ns)
 style=copy.deepcopy(run.find('a:rPr',ns));pp=copy.deepcopy(para.find('a:pPr',ns))
 for p in list(body):
  if p.tag=='{'+ns['a']+'}p':body.remove(p)
 for line in value.split('\n'):
  p=E.SubElement(body,'{'+ns['a']+'}p')
  if pp is not None:p.append(copy.deepcopy(pp))
  rr=E.SubElement(p,'{'+ns['a']+'}r')
  if style is not None:rr.append(copy.deepcopy(style))
  E.SubElement(rr,'{'+ns['a']+'}t').text=line

def setsize(s,size):
 for q in s.findall('.//a:rPr',ns):q.set('sz',str(round(size*100)))

def newtxt(tree,template,value,x,y,w,h,sz=None):
 s=copy.deepcopy(template);pr=s.find('p:nvSpPr/p:cNvPr',ns);pr.set('id',str(900+len(tree)));pr.set('name','button-explanation-'+str(len(tree)));put(s,value);pos(s,x,y,w,h)
 if sz:setsize(s,sz)
 tree.append(s);return s

updates={
3:{'กดปุ่ม 20 ms':'ปุ่มเปิดค้าง 20 ms','ถูกบังหรือกดปุ่ม':'ถูกบังหรือกดปุ่มเปิด'},
5:{'แยกไฟเลี้ยงอุปกรณ์ออกจากแรงดันที่เข้าขาไมโครคอนโทรลเลอร์':'แรงดันที่กำหนดสำหรับชุดสาธิต แยกไฟลอจิก 5 V ออกจากไฟมอเตอร์และเซนเซอร์ 12 V'},
6:{'แต่ละแถวใช้สเกลเวลาของตัวเอง เพื่ออ่านช่วงสั้นและช่วงยาวได้ชัดเจน':'กรองการกดปุ่ม พักก่อนกลับทิศ รอทางผ่านว่าง และจำกัดเวลาที่มอเตอร์ทำงาน','ทางผ่านต้องว่างต่อเนื่อง':'ปล่อยปุ่มและลำแสงว่างต่อเนื่อง'},
7:{'P2.1   ปุ่มภายนอก':'P2.1   ปุ่มเปิดด้านนอก','P2.0   ปุ่มภายใน':'P2.0   ปุ่มเปิดด้านใน'},
8:{'ตั้ง P2 เป็นอินพุตทั้งพอร์ตตัดแรงขับแล้วตรวจลิมิต':'เขียน 1 ที่ P2 เพื่ออ่านอินพุต\nตัดแรงขับแล้วตรวจลิมิต'},
10:{'กรองการกดปุ่มก่อนสั่งเปิดรับคำสั่งจากภายในหรือภายนอก':'กดด้านนอกเพื่อเข้า\nกดด้านในเพื่อออก','ปุ่มทำงานที่ระดับ 0':'P2.0 หรือ P2.1 เป็น 0 เมื่อกด'},
12:{'150 × 20 ms = 3 sถูกบังหรือกดปุ่มให้เริ่มนับใหม่':'150 × 20 ms = 3 s\nถูกบังหรือกดปุ่มเปิดให้นับใหม่','ทางผ่านต้องว่างต่อเนื่อง':'ปล่อยปุ่มและลำแสงว่าง 3 s'},
13:{'ตัดแรงขับทันทีที่ตรวจพบแล้วเปลี่ยนไปพักก่อนกลับทิศ':'ถูกบังหรือกดปุ่มเปิดขณะปิด\nตัดแรงขับแล้วพักก่อนเปิดกลับ'},
16:{'ต้องพ้น E-stop และลำแสงว่าง':'ปลด E-stop และให้ลำแสงว่าง'},
17:{'ทดสอบด้วย assembler และ CPU ของ EdSim51 2.1.39 ผ่านตัวรันแบบ headless':'รันเฟิร์มแวร์ด้วย CPU ของ EdSim51 2.1.39 และป้อนสัญญาณด้วยชุดทดสอบอัตโนมัติ','SLIDING_DOOR.asm':'ผลของเฟิร์มแวร์ฉบับขยาย','ผ่าน 36 จาก 36 เคส':'ผ่าน 36 จาก 36 กรณี','ฉบับสอนที่ใช้บนหน้าโค้ดผ่าน 20 เคส และใช้ Timer 0 โหมด 1 ค่า B1E0H':'โค้ดที่แสดงในสไลด์เป็นฉบับสอน ผ่าน 20 กรณี ใช้ Timer 0 โหมด 1 ค่า B1E0H'},
18:{'วัดเวลาจากรอบเครื่องของ CPU 8051 ใน EdSim51 ที่ 12 MHz แล้วเทียบกับค่าที่ออกแบบ':'ผลของเฟิร์มแวร์ฉบับขยาย วัดจากรอบเครื่องใน EdSim51 ที่ 12 MHz แล้วเทียบกับค่าที่ออกแบบ'},
19:{'ฉบับสอน 20 เคส และฉบับขยาย 36 เคส':'ฉบับสอน 20 กรณี และฉบับขยาย 36 กรณี'}
}
changed=[]
for n in range(1,20):
 k=f'ppt/slides/slide{n}.xml';root=E.fromstring(parts[k]);tree=root.find('p:cSld/p:spTree',ns)
 for old,new in updates.get(n,{}).items():
  match=[s for s in tree.findall('p:sp',ns) if text(s)==old]
  assert len(match)==1,(n,old);put(match[0],new)
 if n==1:put(find(tree,'กลุ่มที่'),'กลุ่มที่ ______')
 if n==2:
  put(find(tree,'เปรียบเทียบการตอบสนอง'),'กดปุ่มเพื่อเข้าออก และตรวจลำแสงขณะประตูปิดเพื่อสั่งเปิดกลับเมื่อพบสิ่งกีดขวาง')
  put(find(tree,'ระบบเดิม'),'ปัญหา: วัตถุอยู่ต่ำกว่าแนวลำแสง')
  put(find(tree,'หมดเวลาแล้วปิด'),'กรณีตรวจจับเฉพาะระดับบน วัตถุเตี้ยอาจผ่านใต้ลำแสง')
  put(find(tree,'วัตถุเล็ก'),'วัตถุอยู่ต่ำกว่าลำแสง')
  put(find(tree,'ปิดต่อ'),'ปิดต่อ เสี่ยงหนีบ')
  foot=find(tree,'การตัดแรงขับ');put(foot,'เข้า: กดปุ่มด้านนอก     ออก: กดปุ่มด้านใน\nประตูเปิดจนสุด และปิดเมื่อปล่อยปุ่มกับลำแสงว่างต่อเนื่อง 3 s');pos(foot,104,914,1712,76);setsize(foot,14)
  for p in foot.findall('.//a:pPr',ns):p.set('algn','ctr')
 if n==4:
  put(find(tree,'E-stop'),'หยุดฉุกเฉิน')
  put(find(tree,'กดแล้ว NC1'),'E-stop: NC1 ตัด EN เมื่อกด')
  title=find(tree,'ปุ่มเปิดและลิมิต');put(title,'ปุ่มเปิดประตู 2 จุด');pos(title,1400,284,400,42)
  detail=find(tree,'P2.0, P2.1');put(detail,'ลิมิตเปิด P2.3    ลิมิตปิด P2.4');pos(detail,1400,397,400,38)
  for s in tree.findall('p:sp',ns):
   off=s.find('p:spPr/a:xfrm/a:off',ns)
   if off is not None and off.get('x')==str(1384*9525) and off.get('y')==str(280*9525) and not text(s):pos(s,1384,280,432,160)
  # Retain the existing diagram; replace only the limit-switch thumbnail with two push buttons.
  pic=next(s for s in tree.findall('p:pic',ns) if 1390<int(s.find('p:spPr/a:xfrm/a:off',ns).get('x'))/9525<1490 and 300<int(s.find('p:spPr/a:xfrm/a:off',ns).get('y'))/9525<400)
  tree.remove(pic)
  relkey='ppt/slides/_rels/slide4.xml.rels';rels=E.fromstring(parts[relkey]);rid='rIdFeedbackButton';R='http://schemas.openxmlformats.org/package/2006/relationships';q=E.SubElement(rels,'{'+R+'}Relationship');q.set('Id',rid);q.set('Type',ns['r']+'/image');q.set('Target','../media/feedback_push_button.png');parts[relkey]=E.tostring(rels,xml_declaration=True,encoding='UTF-8',standalone=True)
  parts['ppt/media/feedback_push_button.png']=(out/'version2/.build/components/push_button.png').read_bytes()
  for j,x in enumerate([1400,1608]):
   im=copy.deepcopy(pic);im.find('p:nvPicPr/p:cNvPr',ns).set('id',str(980+j));im.find('p:blipFill/a:blip',ns).set('{'+ns['r']+'}embed',rid)
   sr=im.find('p:blipFill/a:srcRect',ns)
   if sr is not None:sr.attrib.clear()
   pos(im,x,330,44,60);tree.append(im)
   newtxt(tree,detail,['ด้านนอก: เข้า\nP2.1','ด้านใน: ออก\nP2.0'][j],x+52,325,152,65,11)
 if n in updates or n in [1,2,4]:
  parts[k]=E.tostring(root,xml_declaration=True,encoding='UTF-8',standalone=True);changed.append(n)
with ZipFile(r/'.build/candidate.pptx','w',ZIP_DEFLATED) as z:
 for k,v in parts.items():z.writestr(k,v)
baseline={str(p.resolve()):hashlib.sha256(p.read_bytes()).hexdigest() for p in out.glob('*.pptx')}
(r/'.build/baseline.json').write_text(json.dumps(baseline,indent=2))
(r/'.build/changed-slides.json').write_text(json.dumps(changed));print('Changed slides',changed)
