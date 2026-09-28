from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
from lxml import etree as E
import hashlib,json
r=Path('embedded-system/1/mini-project/output/version2/quality_audit/hardware_redraw');target=r.parents[2]/'mini-project_Sliding_Door_Safety_Control.pptx'
ns={'p':'http://schemas.openxmlformats.org/presentationml/2006/main','a':'http://schemas.openxmlformats.org/drawingml/2006/main'}
with ZipFile(target) as z:parts={n:z.read(n) for n in z.namelist()}
with ZipFile(r/'.build/donor.pptx') as z:donor={n:z.read(n) for n in z.namelist()}
xml=E.fromstring(parts['ppt/slides/slide1.xml']);tree=xml.find('p:cSld/p:spTree',ns)
for sh in list(tree):
 tx=''.join(sh.xpath('.//a:t/text()',namespaces=ns));xf=sh.find('p:spPr/a:xfrm',ns)
 if tx.startswith('กลุ่มที่'):tree.remove(sh)
 elif tx.startswith('66362416'):xf.find('a:off',ns).set('y',str(646*9525))
 elif tx.startswith('อาจารย์ที่ปรึกษา'):xf.find('a:off',ns).set('y',str(746*9525))
 elif xf is not None and not tx and xf.find('a:off',ns).get('x')==str(96*9525) and xf.find('a:off',ns).get('y')==str(610*9525):xf.find('a:ext',ns).set('cy',str(208*9525))
parts['ppt/slides/slide1.xml']=E.tostring(xml,xml_declaration=True,encoding='UTF-8',standalone=True)
parts['ppt/slides/slide4.xml']=donor['ppt/slides/slide4.xml']
# Native-only diagram: retain the destination master and notes relationships.
oldnotes=E.fromstring(parts['ppt/notesSlides/notesSlide4.xml']);newnotes=E.fromstring(donor['ppt/notesSlides/notesSlide4.xml'])
body=next(s for s in oldnotes.findall('.//p:sp',ns) if s.find('p:nvSpPr/p:nvPr/p:ph',ns) is not None and s.find('p:nvSpPr/p:nvPr/p:ph',ns).get('type')=='body')
newbody=next(s for s in newnotes.findall('.//p:sp',ns) if s.find('p:nvSpPr/p:nvPr/p:ph',ns) is not None and s.find('p:nvSpPr/p:nvPr/p:ph',ns).get('type')=='body')
body.replace(body.find('p:txBody',ns),newbody.find('p:txBody',ns));parts['ppt/notesSlides/notesSlide4.xml']=E.tostring(oldnotes,xml_declaration=True,encoding='UTF-8',standalone=True)
with ZipFile(r/'.build/candidate.pptx','w',ZIP_DEFLATED) as z:
 for n,v in parts.items():z.writestr(n,v)
(r/'.build/original-sha.txt').write_text(hashlib.sha256(target.read_bytes()).hexdigest())
base={str(p.resolve()):hashlib.sha256(p.read_bytes()).hexdigest() for p in target.parent.glob('*.pptx')};(r/'.build/baseline.json').write_text(json.dumps(base,indent=2))
s=(r.parent/'feedback_revision/.build/finalize.mjs').read_text().replace('quality_audit/feedback_revision','quality_audit/hardware_redraw').replace('feedback-validation.json','hardware-validation.json');(r/'.build/finalize.mjs').write_text(s)
print('Cover group label removed. Hardware slide replaced with native editable wiring diagram.')
