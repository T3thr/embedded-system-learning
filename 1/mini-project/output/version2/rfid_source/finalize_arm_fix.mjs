import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {finalizePresentation} from '/Users/3rapat/.codex/plugins/cache/openai-primary-runtime/presentations/26.905.11957/skills/presentations/container_tools/artifact_tool_utils.mjs';
const V=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const S='/Users/3rapat/.codex/plugins/cache/openai-primary-runtime/presentations/26.905.11957/skills/presentations';
const finalPath=process.argv[2]||path.join(V,'Sliding_Door_Safety_Control_RFID_v2.pptx');
await fs.mkdir(path.join(path.dirname(V),'.rfid-v2-validation'),{recursive:true});
const result=await finalizePresentation({
 workspaceDir:path.dirname(V),candidatePath:path.join(V,'.rfid-build/arm-fix/candidate.pptx'),finalPath,
 explicitTotalSlideCount:15,requiredNativeTableOwnerSlides:[7,9,10,14],requiredNativeChartOwnerSlides:[],
 pythonExecutable:'/Users/3rapat/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3',
 integrityValidatorPath:path.join(S,'container_tools/inspect_presentation_package_integrity.py'),
 layoutValidatorPath:path.join(S,'container_tools/inspect_presentation_layout_geometry.py'),
 layoutArgs:['--expected-slide-size-emu','18288000,10287000','--validate-bullet-geometry','--validate-heading-fit',...[7,9,10,14].flatMap(n=>['--require-native-table-slide',String(n)])],
 fontPolicy:{basis:'design',families:['Tahoma','Courier New']},verifyArtifactToolImport:true,
 receiptPath:path.join(path.dirname(V),'.rfid-v2-validation',path.basename(finalPath)+'.validation.json')
});
console.log(JSON.stringify(result,null,2));
