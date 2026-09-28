from pathlib import Path
from zipfile import ZipFile
from lxml import etree as E
import hashlib,json,re

root=Path(__file__).resolve().parents[1]
workspace=Path.cwd()
deck=root/'.build/release/hardware-final.pptx'
if not deck.exists():deck=root.parents[2]/'Sliding_Door_Safety_Control_Redesigned.pptx'
ns={'a':'http://schemas.openxmlformats.org/drawingml/2006/main','p':'http://schemas.openxmlformats.org/presentationml/2006/main'}
report={'slide_count':0,'forbidden_text':[],'safe_boundary_findings':[],'inset_findings':[],'folio_findings':[]}
alltexts=[];sizes=set()
with ZipFile(deck) as z:
    slides=sorted([n for n in z.namelist() if re.fullmatch(r'ppt/slides/slide\d+.xml',n)],key=lambda n:int(re.search(r'\d+',n).group()))
    report['slide_count']=len(slides)
    for i,n in enumerate(slides,1):
        r=E.fromstring(z.read(n));text=' '.join(r.xpath('//a:t/text()',namespaces=ns));alltexts.append(text)
        if any(v in text for v in ['$', '—', 'undefined', 'KaTeX']):report['forbidden_text'].append(i)
        for q in r.findall('.//a:rPr',ns):
            if q.get('sz'):sizes.add(int(q.get('sz'))/100)
        for bp in r.findall('.//a:bodyPr',ns):
            if any(int(bp.get(k,0))<76200 for k in ['lIns','rIns','tIns','bIns']):report['inset_findings'].append(i)
        folios=0
        for q in r.findall('.//p:sp',ns):
            of=q.find('./p:spPr/a:xfrm/a:off',ns);ex=q.find('./p:spPr/a:xfrm/a:ext',ns)
            if of is None or ex is None:continue
            x,y,w,h=[int(v)/9525 for v in [of.get('x'),of.get('y'),ex.get('cx'),ex.get('cy')]]
            tx=''.join(q.xpath('.//a:t/text()',namespaces=ns))
            folio=tx==str(i-1).zfill(2) and x==1780 and y==1010
            if folio:folios+=1
            if not folio and (x<95.99 or y<79.99 or x+w>1824.01 or y+h>990.01):report['safe_boundary_findings'].append([i,tx[:30]])
        if folios!=(0 if i==1 else 1):report['folio_findings'].append(i)
    report['chart_count']=len([n for n in z.namelist() if re.search(r'/charts/chart\d+\.xml$',n)])
    report['embedded_chart_workbooks']=len([n for n in z.namelist() if n.startswith('ppt/embeddings/') and n.endswith('.xlsx')])
source=workspace/'embedded-system/1/mini-project/firmware/SLIDING_DOOR_CLASSROOM.asm'
normalize=lambda s:re.sub(r'\s+',' ',s.strip())
source_lines={normalize(s.split(';')[0]) for s in source.read_text().splitlines()}
excerpts=json.loads((workspace/'embedded-system/1/mini-project/output/version2/.build/code-excerpts.json').read_text())
report['code_source_mismatches']=[s for b in excerpts for s in b['lines'] if normalize(s) not in source_lines]
report['timing_values_present']=all(v in alltexts[17] for v in ['24.854','209.795','3.019788','509.988','5.009978'])
report['font_sizes_pt']=sorted(sizes)
baseline=json.loads((root/'baseline-sha256.json').read_text())
report['protected_files_unchanged']={str(p):hashlib.sha256((workspace/p).read_bytes()).hexdigest()==h for p,h in baseline.items() if 'Redesigned' not in p}
report['sha256']=hashlib.sha256(deck.read_bytes()).hexdigest()
report['passed']=report['slide_count']==19 and report['chart_count']==4 and report['embedded_chart_workbooks']==4 and report['timing_values_present'] and all(report['protected_files_unchanged'].values()) and not any(report[k] for k in ['forbidden_text','safe_boundary_findings','inset_findings','folio_findings','code_source_mismatches'])
(root/'verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps(report,ensure_ascii=False))
assert report['passed']
