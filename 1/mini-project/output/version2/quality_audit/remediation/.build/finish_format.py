from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
from io import BytesIO
from lxml import etree as E

p=Path(__file__).parent/'candidate.pptx'
ns={'a':'http://schemas.openxmlformats.org/drawingml/2006/main'}
a='{'+ns['a']+'}'
buf=BytesIO()
with ZipFile(p) as zin, ZipFile(buf,'w',ZIP_DEFLATED) as zout:
    for item in zin.infolist():
        data=zin.read(item.filename)
        if item.filename in ['ppt/slides/slide17.xml','ppt/slides/slide18.xml']:
            r=E.fromstring(data)
            for cell in r.findall('.//a:tcPr',ns):
                cell.set('marL','152400');cell.set('marR','152400')
                cell.set('marT','76200');cell.set('marB','76200')
                for name in ['lnL','lnR','lnT','lnB']:
                    old=cell.find(a+name)
                    if old is not None:cell.remove(old)
                    ln=E.Element(a+name,w='12700')
                    E.SubElement(E.SubElement(ln,a+'solidFill'),a+'srgbClr',val='E2E8F0')
                    E.SubElement(ln,a+'prstDash',val='solid')
                    cell.insert(0,ln)
            data=E.tostring(r,xml_declaration=True,encoding='UTF-8',standalone=True)
        zout.writestr(item,data)
p.write_bytes(buf.getvalue())
print('Native table border color and 8 px minimum cell insets applied.')
