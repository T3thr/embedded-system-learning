import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import {FileBlob,PresentationFile} from '/Users/3rapat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs';
const req=createRequire(import.meta.url),{FontLibrary}=req('/Users/3rapat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/node_modules/skia-canvas');
const V=path.dirname(path.dirname(fileURLToPath(import.meta.url))),F=path.join(V,'formal_source/fonts');
FontLibrary.use(['Prompt-Bold.ttf','Prompt-Regular.ttf','Sarabun-Regular.ttf','Sarabun-Bold.ttf','JetBrainsMono-Medium.ttf'].map(n=>path.join(F,n)));
const input=process.argv[2]||path.join(V,'.infrared-scenario-build/candidate.pptx'),dest=process.argv[3]||path.join(V,'.infrared-scenario-build/preview');
await fs.mkdir(dest,{recursive:true});const p=await PresentationFile.importPptx(await FileBlob.load(input));
for(let i=0;i<p.slides.items.length;i++){const b=await p.export({slide:p.slides.items[i],format:'png',scale:1.5});await fs.writeFile(path.join(dest,`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));}
console.log('Rendered',p.slides.items.length,'slides');
