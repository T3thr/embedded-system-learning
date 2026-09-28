import fs from 'node:fs/promises';
import path from 'node:path';
import {finalizePresentation} from '/Users/3rapat/.codex/plugins/cache/openai-primary-runtime/presentations/26.905.11957/skills/presentations/container_tools/artifact_tool_utils.mjs';
const root=path.resolve('embedded-system/1/mini-project/output/version2'),skill='/Users/3rapat/.codex/plugins/cache/openai-primary-runtime/presentations/26.905.11957/skills/presentations';
await fs.mkdir(path.join(root,'.build/release'),{recursive:true});
console.log(JSON.stringify(await finalizePresentation({workspaceDir:root,candidatePath:path.join(root,'.build/candidate.pptx'),finalPath:path.join(root,'.build/release/Sliding_Door_Safety_Control_Version_2_Final.pptx'),pythonExecutable:'/Users/3rapat/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3',integrityValidatorPath:path.join(skill,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(skill,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','18288000,10287000','--validate-bullet-geometry','--validate-heading-fit',...[7,18,19].flatMap(x=>['--require-native-table-slide',String(x)])],explicitTotalSlideCount:20,requiredNativeTableOwnerSlides:[7,18,19],fontPolicy:{basis:'design',families:['Tahoma','Courier New']},verifyArtifactToolImport:true,receiptPath:path.join(root,'.build/validation.json')})));

await fs.copyFile(path.join(root,'.build/release/Sliding_Door_Safety_Control_Version_2_Final.pptx'),path.join(root,'Sliding_Door_Safety_Control_Version_2_Final.pptx'));
