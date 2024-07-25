/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "selector",
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		".ladle/components.tsx",
	],
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography")],
};
