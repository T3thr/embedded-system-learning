from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
from lxml import etree as E
import json,hashlib
r=Path('embedded-system/1/mini-project/output/version2/quality_audit/remediation');target=r.parents[2]/'Sliding_Door_Safety_Control_Redesigned.pptx'
ns={'a':'http://schemas.openxmlformats.org/drawingml/2006/main'}
changes={
'ตัวเลขจาก TEST_RESULTS.md และ TEST_RESULTS_CLASSROOM.md เป็นผลจำลอง ไม่ใช่ผลวัดฮาร์ดแวร์':'รันเฟิร์มแวร์บน CPU จำลองของ EdSim51 แล้วป้อนสัญญาณที่ P2 เพื่อตรวจสถานะ เอาต์พุต และเวลา',
'ค่าของเฟิร์มแวร์ฉบับขยายจาก TEST_RESULTS.md เทียบกับช่วงเวลาที่ออกแบบ':'วัดเวลาจากรอบเครื่องของ CPU 8051 ใน EdSim51 ที่ 12 MHz แล้วเทียบกับค่าที่ออกแบบ',
'PASS หมายถึงผ่านเงื่อนไขในชุดทดสอบ ไม่ใช่การรับรองแรงหนีบ ระยะหยุด หรือความปลอดภัยของประตูจริง':'ทดสอบโดยป้อนสัญญาณปุ่ม ลำแสง และลิมิตจำลอง แล้วตรวจเวลาเปลี่ยนสถานะและเอาต์พุต\nPASS หมายถึงผ่านเงื่อนไขในโปรแกรมจำลอง ยังไม่ใช่ผลวัดฮาร์ดแวร์'
}
with ZipFile(target) as z:parts={n:z.read(n) for n in z.namelist()}
for n in [17,18]:
 k=f'ppt/slides/slide{n}.xml';xml=E.fromstring(parts[k])
 for t in xml.findall('.//a:t',ns):
  if t.text in changes:
   val=changes[t.text]
   if '\n' not in val:t.text=val
   else:
    run=t.getparent();para=run.getparent();t.text=val.split('\n')[0]
    br=E.Element('{'+ns['a']+'}br');para.insert(para.index(run)+1,br)
    import copy
    second=copy.deepcopy(run);second.find('a:t',ns).text=val.split('\n')[1];para.insert(para.index(br)+1,second)
 parts[k]=E.tostring(xml,xml_declaration=True,encoding='UTF-8',standalone=True)
assert not any('.md' in ''.join(E.fromstring(parts[f'ppt/slides/slide{n}.xml']).xpath('//a:t/text()',namespaces=ns)) for n in range(1,20))
with ZipFile(r/'.build/candidate.pptx','w',ZIP_DEFLATED) as z:
 for k,v in parts.items():z.writestr(k,v)
(r/'.build/explain-original-sha.txt').write_text(hashlib.sha256(target.read_bytes()).hexdigest())
p=r/'.build/build.mjs';s=p.read_text()
for old,new in changes.items():s=s.replace(old,new.replace('\n','\\n'))
p.write_text(s)
p=r/'.build/finalize_revision.mjs';s=p.read_text().replace('revision-approved-validation.json','explanation-validation.json');(r/'.build/finalize_explanation.mjs').write_text(s)
