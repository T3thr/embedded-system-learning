import fs from 'node:fs/promises';
import {Presentation,PresentationFile} from '/Users/3rapat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs';
const p=Presentation.create({slideSize:{width:1280,height:720}}),s=p.slides.add(),b=await fs.readFile(new URL('../infrared_final_assets/motor-rear.jpg',import.meta.url));
for(let i=0;i<4;i++){const q=s.images.add({blob:b,contentType:'image/jpeg',fit:i%2?'contain':'cover',position:{left:50+i*300,top:200,width:260,height:110}});q.crop={left:0,top:0,right:.506,bottom:.04};if(i>1)q.fit=undefined;console.log(i,q.crop,q.fit);}
await(await PresentationFile.exportPptx(p)).save(new URL('crop-test.pptx',import.meta.url).pathname);
