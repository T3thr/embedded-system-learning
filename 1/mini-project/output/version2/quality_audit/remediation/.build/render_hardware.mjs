import fs from 'node:fs/promises';
import {FileBlob,PresentationFile} from '/Users/3rapat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs';
const b='embedded-system/1/mini-project/output/version2/quality_audit/remediation/.build';
const p=await PresentationFile.importPptx(await FileBlob.load(b+'/candidate.pptx'));
for(const n of [4]){const img=await p.export({slide:p.slides.items[n-1],format:'png',scale:1});await fs.writeFile(b+'/final-check-'+n+'.png',new Uint8Array(await img.arrayBuffer()));}
