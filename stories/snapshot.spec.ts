import { expect, test } from "@playwright/test";
import fetch from "sync-fetch";

// URL where Ladle is served
const url = process.env.GITHUB_ACTIONS
	? "http://localhost:8080/haddock3-ui/"
	: "http://localhost:8080";

// fetch Ladle's meta file
// https://ladle.dev/docs/meta
const stories = fetch(`${url}/meta.json`).json().stories;

// Stories that should not be ran on CI
const skippedStories = [
	// Because it does not contain any components
	"index--readme",
	// because it fetches PDB from rcsb.org
	"molviewer--ligandviewer--default",
	// Because does not render in headless mode
	"molviewer--simpleviewer--default",
	"molviewer--viewer--ball-stick",
	"molviewer--viewer--default",
];

// iterate through stories
Object.keys(stories)
	.filter((storyKey) => !skippedStories.includes(storyKey))
	.forEach((storyKey) => {
		// create a test for each story
		test(`${storyKey} - compare snapshots`, async ({ page }) => {
			// navigate to the story
			await page.goto(`${url}/?story=${storyKey}&mode=preview`);
			// stories are code-splitted, wait for them to be loaded
			await page.waitForSelector("[data-storyloaded]");

			// take a screenshot and compare it with the baseline
			await expect(page).toHaveScreenshot(`${storyKey}.png`, {maxDiffPixels : 10});
		});
	});
