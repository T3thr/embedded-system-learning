from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
from lxml import etree as E
import hashlib,json,posixpath,copy
r=Path('embedded-system/1/mini-project/output/version2/quality_audit/physical_wiring');target=r.parents[2]/'mini-project_Sliding_Door_Safety_Control.pptx'
ns={'p':'http://schemas.openxmlformats.org/presentationml/2006/main','a':'http://schemas.openxmlformats.org/drawingml/2006/main','r':'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
REL='http://schemas.openxmlformats.org/package/2006/relationships';CT='http://schemas.openxmlformats.org/package/2006/content-types'
with ZipFile(target) as z:parts={n:z.read(n) for n in z.namelist()}
with ZipFile(r/'.build/donor.pptx') as z:donor={n:z.read(n) for n in z.namelist()}
root=E.fromstring(donor['ppt/slides/slide4.xml']);tree=root.find('p:cSld/p:spTree',ns)
# Precise native PowerPoint crops. Artifact export's automatic cover crop ignored the manually supplied insets.
for pic in tree.findall('p:pic',ns):
 xf=pic.find('p:spPr/a:xfrm',ns);off=xf.find('a:off',ns);x=int(off.get('x'))/9525;y=int(off.get('y'))/9525
 spec=None
 if abs(x-1375)<1 and abs(y-482)<1:spec=(400/1080,355/1080,420/1080,160/1080,1400,472,54,117.35)
 
 if spec:
  l,t,rr,b,x,y,w,h=spec;fill=pic.find('p:blipFill',ns);src=fill.find('a:srcRect',ns)
  if src is None:src=E.Element('{'+ns['a']+'}srcRect');fill.insert(1,src)
  for k,v in zip(['l','t','r','b'],[l,t,rr,b]):src.set(k,str(round(v*100000)))
  for tag,values in [('off',{'x':x,'y':y}),('ext',{'cx':w,'cy':h})]:
   for k,v in values.items():xf.find('a:'+tag,ns).set(k,str(round(v*9525)))
parts['ppt/slides/slide4.xml']=E.tostring(root,xml_declaration=True,encoding='UTF-8',standalone=True)
key='ppt/slides/_rels/slide4.xml.rels';oldrel=E.fromstring(parts[key]);drel=E.fromstring(donor[key]);hashes={hashlib.sha256(v).hexdigest():n for n,v in parts.items() if n.startswith('ppt/media/')}
for rel in list(oldrel):
 if rel.get('Type').endswith('/image'):oldrel.remove(rel)
for rel in drel:
 if not rel.get('Type').endswith('/image'):continue
 src=rel.get('Target');src=src.lstrip('/') if src.startswith('/') else posixpath.normpath(posixpath.join('ppt/slides',src));data=donor[src];h=hashlib.sha256(data).hexdigest();dest=hashes.get(h)
 if not dest:
  dest='ppt/media/physical_wiring_'+h[:12]+Path(src).suffix;parts[dest]=data;hashes[h]=dest
 new=copy.deepcopy(rel);new.set('Target',posixpath.relpath(dest,'ppt/slides'));oldrel.append(new)
parts[key]=E.tostring(oldrel,xml_declaration=True,encoding='UTF-8',standalone=True)
ct=E.fromstring(parts['[Content_Types].xml']);exts={x.get('Extension') for x in ct}
for ext,mime in [('jpg','image/jpeg'),('jpeg','image/jpeg'),('png','image/png')]:
 if ext not in exts:E.SubElement(ct,'{'+CT+'}Default',Extension=ext,ContentType=mime)
parts['[Content_Types].xml']=E.tostring(ct,xml_declaration=True,encoding='UTF-8',standalone=True)
oldnotes=E.fromstring(parts['ppt/notesSlides/notesSlide4.xml']);newnotes=E.fromstring(donor['ppt/notesSlides/notesSlide4.xml'])
def body(root):return next(s for s in root.findall('.//p:sp',ns) if s.find('p:nvSpPr/p:nvPr/p:ph',ns) is not None and s.find('p:nvSpPr/p:nvPr/p:ph',ns).get('type')=='body')
b=body(oldnotes);b.replace(b.find('p:txBody',ns),body(newnotes).find('p:txBody',ns));parts['ppt/notesSlides/notesSlide4.xml']=E.tostring(oldnotes,xml_declaration=True,encoding='UTF-8',standalone=True)
with ZipFile(r/'.build/candidate.pptx','w',ZIP_DEFLATED) as z:
 for n,v in parts.items():z.writestr(n,v)
(r/'.build/original-sha.txt').write_text(hashlib.sha256(target.read_bytes()).hexdigest())
base={str(p.resolve()):hashlib.sha256(p.read_bytes()).hexdigest() for p in target.parent.glob('*.pptx')};(r/'.build/baseline.json').write_text(json.dumps(base,indent=2))
s=(r.parent/'hardware_redraw/.build/finalize.mjs').read_text().replace('quality_audit/hardware_redraw','quality_audit/physical_wiring').replace('hardware-validation.json','physical-validation-v2.json').replace('approved.pptx','approved-v2.pptx');(r/'.build/finalize.mjs').write_text(s)
print('Slide 4 transplanted with physical component imagery, precise pin anchors and editable wiring.')
