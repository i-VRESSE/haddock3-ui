/** @type {import('@ladle/react').UserConfig} */
export default {
	defaultStory: "index--readme",
	outDir: "docs",
	base: process.env.CI ? "/haddock3-ui/" : "/",
	stories: ["stories/**/*.stories.*", "src/**/*.stories.*"],
	storyOrder: (stories) => {
		return [
			"index--readme",
			"apidocs--api-documentation",
			...stories.filter((story) => story !== "index--readme"),
		];
	},
};
