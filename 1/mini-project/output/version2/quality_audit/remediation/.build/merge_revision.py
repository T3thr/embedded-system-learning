from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
from lxml import etree as E
import hashlib,json,posixpath
r=Path('embedded-system/1/mini-project/output/version2/quality_audit/remediation')
target=r.parents[2]/'Sliding_Door_Safety_Control_Redesigned.pptx'
ns={'p':'http://schemas.openxmlformats.org/presentationml/2006/main','a':'http://schemas.openxmlformats.org/drawingml/2006/main','r':'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
REL='http://schemas.openxmlformats.org/package/2006/relationships'
sha=lambda x:hashlib.sha256(x).hexdigest()
with ZipFile(target) as z: original={n:z.read(n) for n in z.namelist()}
with ZipFile(r/'.build/revision-donor.pptx') as z: donor={n:z.read(n) for n in z.namelist()}
result=dict(original)
media={sha(v):k for k,v in original.items() if k.startswith('ppt/media/')}
for num in [2,5]:
 sp=f'ppt/slides/slide{num}.xml';rp=f'ppt/slides/_rels/slide{num}.xml.rels'
 xml=E.fromstring(donor[sp]);
 if num==5:
  for shape in xml.findall('.//p:sp',ns):
   if ''.join(shape.xpath('.//a:t/text()',namespaces=ns)).startswith('Optocoupler แยกทาง'):
    shape.find('p:spPr/a:xfrm/a:off',ns).set('y',str(944*9525))
 if num==2:
  for j,pic in enumerate(xml.findall('.//p:pic',ns)):
   rect=pic.find('p:blipFill/a:srcRect',ns)
   rect.set('l',str(round(j*100000/3)));rect.set('r',str(round((2-j)*100000/3)))
   ex=pic.find('p:spPr/a:xfrm/a:ext',ns);ex.set('cx',str(round(414*686/764*9525)))
 oldrel=E.fromstring(original[rp]); newrel=E.fromstring(donor[rp])
 outrel=E.Element('{'+REL+'}Relationships',nsmap={None:REL})
 for rel in newrel:
  typ=rel.get('Type').split('/')[-1]
  if typ=='image':
   key=posixpath.normpath(posixpath.join('ppt/slides',rel.get('Target'))).lstrip('/')
   dest=media[sha(donor[key])]
   rel.set('Target',posixpath.relpath(dest,'ppt/slides'))
  elif typ in ['slideLayout','notesSlide']:
   prior=next(q for q in oldrel if q.get('Type').split('/')[-1]==typ)
   if typ=='notesSlide':
    oldnote=posixpath.normpath(posixpath.join('ppt/slides',prior.get('Target'))).lstrip('/')
    newnote=posixpath.normpath(posixpath.join('ppt/slides',rel.get('Target'))).lstrip('/')
    result[oldnote]=donor[newnote]
   rel.set('Target',prior.get('Target'))
  else: raise ValueError(typ)
  outrel.append(rel)
 result[sp]=E.tostring(xml,xml_declaration=True,encoding='UTF-8',standalone=True)
 result[rp]=E.tostring(outrel,xml_declaration=True,encoding='UTF-8',standalone=True)
# Renumber visible folios without changing any other slide object.
for num in range(2,20):
 key=f'ppt/slides/slide{num}.xml';xml=E.fromstring(result[key]); hits=[]
 for s in xml.xpath('//p:sp',namespaces=ns):
  off=s.find('p:spPr/a:xfrm/a:off',ns)
  if off is not None and int(off.get('y'))>9500000:
   texts=s.xpath('.//a:t',namespaces=ns)
   if len(texts)==1 and texts[0].text in [f'{num:02}',f'{num-1:02}']:
    texts[0].text=f'{num-1:02}';hits.append(texts[0].text)
 assert len(hits)==1,(num,hits)
 result[key]=E.tostring(xml,xml_declaration=True,encoding='UTF-8',standalone=True)
with ZipFile(r/'.build/candidate.pptx','w',ZIP_DEFLATED) as z:
 for k,v in result.items():z.writestr(k,v)
changed=[k for k in result if result[k]!=original.get(k)]
allowed={f'ppt/slides/slide{i}.xml' for i in range(2,20)}|{f'ppt/slides/_rels/slide{i}.xml.rels' for i in [2,5]}|{f'ppt/notesSlides/notesSlide{i}.xml' for i in [2,5]}
assert set(changed)<=allowed,set(changed)-allowed
(r/'.build/revision-changes.json').write_text(json.dumps({'original_sha256':sha(target.read_bytes()),'changed_package_parts':changed},indent=2))
print('Patched slides 2 and 5 and folios 01–18. All other package parts preserved.')
