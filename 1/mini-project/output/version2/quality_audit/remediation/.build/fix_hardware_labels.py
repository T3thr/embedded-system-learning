from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
from lxml import etree as E
import copy,hashlib
r=Path('embedded-system/1/mini-project/output/version2/quality_audit/remediation');t=r.parents[2]/'Sliding_Door_Safety_Control_Redesigned.pptx'
ns={'a':'http://schemas.openxmlformats.org/drawingml/2006/main','p':'http://schemas.openxmlformats.org/presentationml/2006/main'}
with ZipFile(t) as z:parts={n:z.read(n) for n in z.namelist()}
xml=E.fromstring(parts['ppt/slides/slide4.xml']);tree=xml.find('p:cSld/p:spTree',ns)
def text(s):return '\n'.join(s.xpath('.//a:t/text()',namespaces=ns))
def find(start):return next(s for s in tree.findall('p:sp',ns) if text(s).startswith(start))
def pos(s,x,y,w,h):
 xf=s.find('p:spPr/a:xfrm',ns)
 for tag,vals in [('off',{'x':x,'y':y}),('ext',{'cx':w,'cy':h})]:
  for k,v in vals.items():xf.find('a:'+tag,ns).set(k,str(round(v*9525)))
def txt(s,v):
 tx=s.find('p:txBody',ns);p=tx.find('a:p',ns);run=p.find('a:r',ns);style=copy.deepcopy(run.find('a:rPr',ns));pp=copy.deepcopy(p.find('a:pPr',ns))
 for q in list(tx):
  if q.tag=='{'+ns['a']+'}p':tx.remove(q)
 for line in v.split('\n'):
  q=E.SubElement(tx,'{'+ns['a']+'}p')
  if pp is not None:q.append(copy.deepcopy(pp))
  rr=E.SubElement(q,'{'+ns['a']+'}r')
  if style is not None:rr.append(copy.deepcopy(style))
  E.SubElement(rr,'{'+ns['a']+'}t').text=line
sub=find('สายกำลัง');txt(sub,'ชื่อสัญญาณเดียวกัน เช่น IN1 เชื่อมถึงกัน แม้ไม่ได้ลากสายยาวข้ามผัง')
name=find('AT89S52');pos(name,795,679,220,44)
for p in name.findall('.//a:pPr',ns):p.set('algn','ctr')
power=find('VCC1 ขา');txt(power,'L293D: ไฟลอจิก 5 V ที่ขา 16\nไฟมอเตอร์ 12 V ที่ขา 8\nGND ขา 4, 5, 12, 13\nใช้กราวด์ร่วมกับ 8051 และแหล่งจ่าย');pos(power,488,585,310,112)
footer=find('ชื่อเน็ตเดียวกัน');template=copy.deepcopy(footer);tree.remove(footer)
def add(v,x,y,w,h):
 s=copy.deepcopy(template);pr=s.find('p:nvSpPr/p:cNvPr',ns);pr.set('id',str(500+len(tree)));pr.set('name','equipment-annotation-'+str(len(tree)));txt(s,v);pos(s,x,y,w,h);tree.append(s);return s
s=add('กดแล้ว NC1 เปิด ตัดสัญญาณ EN',1068,278,294,36)
for p in s.findall('.//a:pPr',ns):p.set('algn','ctr')
add('12 V ของเซนเซอร์ไม่ต่อเข้าขา 8051',1400,792,400,36)
for s in tree.findall('p:sp',ns):
 off=s.find('p:spPr/a:xfrm/a:off',ns)
 if off is not None and off.get('x')==str(1384*9525) and off.get('y')==str(642*9525) and not text(s):pos(s,1384,642,432,196)
reset=find('Reset P2.6');pos(reset,1384,852,432,48)
parts['ppt/slides/slide4.xml']=E.tostring(xml,xml_declaration=True,encoding='UTF-8',standalone=True)
with ZipFile(r/'.build/candidate.pptx','w',ZIP_DEFLATED) as z:
 for k,v in parts.items():z.writestr(k,v)
(r/'.build/hardware-original-sha.txt').write_text(hashlib.sha256(t.read_bytes()).hexdigest())
s=(r/'.build/finalize_explanation.mjs').read_text().replace('explanation-validation.json','hardware-labels-final-validation.json');(r/'.build/finalize_hardware.mjs').write_text(s)
s=(r/'.build/render_revision.mjs').read_text().replace('[2,5]','[4]');(r/'.build/render_hardware.mjs').write_text(s)
