import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {finalizePresentation} from '/Users/3rapat/.codex/plugins/cache/openai-primary-runtime/presentations/26.905.11957/skills/presentations/container_tools/artifact_tool_utils.mjs';
const V=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
process.env.RUNTIME_NODE_MODULES ||= '/Users/3rapat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const S='/Users/3rapat/.codex/plugins/cache/openai-primary-runtime/presentations/26.905.11957/skills/presentations';
const finalPath=process.argv[2]||path.join(V,'Sliding_Door_Safety_Control_Infrared_FSM.pptx');
const R=path.join(path.dirname(V),'.infrared-validation');
await fs.mkdir(R,{recursive:true});
const owners=[5,9,10,11,15];
const result=await finalizePresentation({
 workspaceDir:path.dirname(V),candidatePath:path.join(V,'.infrared-fsm-build/candidate.pptx'),finalPath,
 explicitTotalSlideCount:16,requiredNativeTableOwnerSlides:owners,requiredNativeChartOwnerSlides:[],
 pythonExecutable:'/Users/3rapat/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3',
 integrityValidatorPath:path.join(S,'container_tools/inspect_presentation_package_integrity.py'),
 layoutValidatorPath:path.join(S,'container_tools/inspect_presentation_layout_geometry.py'),
 layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit',...owners.flatMap(n=>['--require-native-table-slide',String(n)])],
 fontPolicy:{basis:'user_request',families:['Prompt','Sarabun','JetBrains Mono']},verifyArtifactToolImport:true,
 receiptPath:path.join(R,path.basename(finalPath)+'.validation.json')
});
console.log(JSON.stringify(result,null,2));
