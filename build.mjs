import { readFile, readdir, writeFile } from "node:fs/promises";

const content = await readFile("package.json", "utf-8");
const packageJson = JSON.parse(content);
// Overwrite the "exports" field with the new configuration
packageJson.exports = {};
for (const file of await readdir("dist/src", { recursive: true })) {
	if (!file.endsWith(".js")) {
		// Each *.ts? has a corresponding .js, .js.map and .d.ts file
		continue;
	}
	let key = "./" + file.replace(/\.js$/, "");
	if (file === "index.js") {
		key = ".";
	}
	const jsfn = "./dist/src/" + file;
	// Each .js file has a corresponding .d.ts file
	const types = jsfn.replace(/\.js$/, ".d.ts");
	packageJson.exports[key] = {
		import: {
			types,
			default: jsfn,
		},
	};
}
await writeFile("package.json", JSON.stringify(packageJson, null, 4));
