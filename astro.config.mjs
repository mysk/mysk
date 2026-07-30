// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	site: "https://mysk.dev",
	redirects: {
		"/cv": "/julian-dawson-cv.pdf",
		"/projects": "/#projects",
		"/links": "/",
		"/blog": "/#writing",
		"/blog/[slug]": "/writing/[slug]",
	},
	vite: {
		plugins: [tailwindcss()],
	},
	fonts: [
		{
			provider: fontProviders.google(),
			name: "Geist",
			cssVariable: "--font-geist",
			weights: [400, 500, 600, 700],
			styles: ["normal"],
		},
		{
			provider: fontProviders.google(),
			name: "JetBrains Mono",
			cssVariable: "--font-jetbrains-mono",
			weights: [400, 500],
			styles: ["normal"],
		},
	],
});
