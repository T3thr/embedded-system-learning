import { FileBlob, PresentationFile } from "@oai/artifact-tool";

const deck = await PresentationFile.importPptx(
  await FileBlob.load("/Users/3rapat/student/internship/CODEFIN/project/vahalla-wealth/private-docs/other-project/uni-work/embedded-system/1/personal-presentation/version2/.build_v2/template-starter.pptx"),
);

for (const query of ["shape\\.delete|slide\\.shapes\\.delete", "speakerNotes|speaker notes", "shape\\.text|text\\.replace", "position"]) {
  const result = deck.help("*", { search: query, include: ["index", "examples", "notes"], maxChars: 8000 });
  console.log(`QUERY ${query}\n${JSON.stringify(result, null, 2)}\n`);
}

const target = deck.resolve("sh/7qp4be9c");
console.log("TARGET KEYS", Object.keys(target));
console.log("TEXT KEYS", Object.keys(target.text));
console.log("TEXT VALUE", String(target.text));
console.log("POSITION", target.position);
console.log("DELETE TYPE", typeof target.delete);
