import { readFile, readdir, writeFile } from "node:fs/promises";

// Script to generate the "exports" field in package.json
// Script was made so any file in src/ can be imported directly
// without having to add it to ./src/index.ts

const content = await readFile("package.json", "utf-8");
const packageJson = JSON.parse(content);
// Overwrite the "exports" field with the new configuration
packageJson.exports = {
  "./dist/index.css": {
    import: "./dist/index.css",
    require: "./dist/index.css",
  },
};
for (const file of await readdir("dist", { recursive: true })) {
  if (!file.endsWith(".js")) {
    // Each *.ts? has a corresponding .js, .js.map and .d.ts file
    continue;
  }
  let key = "./" + file.replace(/\.js$/, "");
  if (file === "index.js") {
    key = ".";
  }
  const jsfn = "./dist/" + file;
  // Each .js file has a corresponding .d.ts file
  let types = jsfn.replace(/\.js$/, ".d.ts");
  if (types === './dist/report.offline.d.ts') {
    types = './dist/report.d.ts'
  }
  packageJson.exports[key] = {
    import: {
      types,
      default: jsfn,
    },
  };
}
await writeFile("package.json", JSON.stringify(packageJson, null, 4));
