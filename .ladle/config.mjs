/** @type {import('@ladle/react').UserConfig} */
export default {
	defaultStory: "index--readme",
	outDir: "docs",
	base: process.env.CI ? "/haddock3-ui/" : "/",
};
