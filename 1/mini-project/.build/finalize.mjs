import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { FileBlob, PresentationFile } from "@oai/artifact-tool";

const SKILL_DIR = "/Users/3rapat/.codex/plugins/cache/openai-primary-runtime/presentations/26.905.11957/skills/presentations";
const RUNTIME_PYTHON = "/Users/3rapat/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3";
const workspaceDir = "/Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/mini-project";
const REF = "/Users/3rapat/.codex/skills/artifact-template-academic-engineering-project-presentation/assets/reference.pptx";
const FINAL_PPTX = path.join(workspaceDir, "output", process.argv[2] ?? "Sliding_Door_Safety_Control.pptx");

const presentation = await PresentationFile.importPptx(
  await FileBlob.load(path.join(workspaceDir, ".build/candidate.pptx")),
);

const requirements = {
  explicitTotalSlideCount: 18,
  requiredNativeTableOwnerSlides: [5, 6, 7, 17],
  requiredNativeChartOwnerSlides: [],
};
const fontPolicy = {
  basis: "design",
  families: ["Muli", "Muli Ultra-Bold", "Muli Bold Italics", "Sukhumvit Set", "Menlo"],
};
const expectedSlideSizeEmu = "18288000,10287000";

const { finalizePresentation } = await import(
  pathToFileURL(path.join(SKILL_DIR, "container_tools/artifact_tool_utils.mjs")).href
);
const stagingDir = path.join(workspaceDir, ".codex-finalizer");
await fs.mkdir(stagingDir, { recursive: true });
await fs.mkdir(path.dirname(FINAL_PPTX), { recursive: true });
const candidatePath = path.join(stagingDir, "candidate.pptx");
await (await PresentationFile.exportPptx(presentation)).save(candidatePath);

const tableOwners = requirements.requiredNativeTableOwnerSlides;
const result = await finalizePresentation({
  ...requirements,
  workspaceDir,
  candidatePath,
  finalPath: FINAL_PPTX,
  pythonExecutable: RUNTIME_PYTHON,
  integrityValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_package_integrity.py"),
  layoutValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_layout_geometry.py"),
  layoutArgs: [
    "--expected-slide-size-emu", expectedSlideSizeEmu,
    "--validate-bullet-geometry",
    "--validate-heading-fit",
    ...tableOwners.flatMap((n) => ["--require-native-table-slide", String(n)]),
  ],
  requiredNativeTableOwnerSlides: tableOwners,
  fontPolicy,
  verifyArtifactToolImport: true,
  receiptPath: path.join(stagingDir, path.basename(FINAL_PPTX) + ".validation.json"),
});
console.log(JSON.stringify(result, null, 2).slice(0, 4000));
