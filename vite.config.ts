import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	server: {
		open: false,
	},
	test: {
		include: ["src/**/*.test.*"],
		browser: {
			enabled: true,
			name: "chromium",
			provider: "playwright",
			providerOptions: {},
		},
		coverage: {
			provider: "istanbul",
			reporter: ["text"],
			include: ["src/**/*"],
			exclude: ["**/*.stories.*", "**/*.test.*"],
		},
	},
});
