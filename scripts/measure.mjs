import { chromium } from "playwright-core";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:4321";
const VIEWPORTS = [
	{ label: "mobile", width: 375, height: 812 },
	{ label: "tablet", width: 768, height: 1024 },
	{ label: "desktop", width: 1440, height: 900 },
];

const context = await chromium.launchPersistentContext(
	mkdtempSync(join(tmpdir(), "mysk-measure-")),
	{ headless: true }
);

const page = await context.newPage();

for (const viewport of VIEWPORTS) {
	await page.setViewportSize({ width: viewport.width, height: viewport.height });
	await page.goto(BASE, { waitUntil: "load" });
	await page.waitForTimeout(400);

	const metrics = await page.evaluate(() => {
		const height = document.documentElement.scrollHeight;
		const overflows = document.documentElement.scrollWidth > window.innerWidth;
		const sections = [...document.querySelectorAll("section[id], header")].map(
			(el) => ({
				id: el.id || el.tagName.toLowerCase(),
				height: Math.round(el.getBoundingClientRect().height),
			})
		);
		return { height, overflows, sections };
	});

	console.log(
		`${viewport.label} (${viewport.width}px): ${metrics.height}px, ` +
			`${(metrics.height / viewport.height).toFixed(1)} screens` +
			`${metrics.overflows ? " -- HORIZONTAL OVERFLOW" : ""}`
	);

	await page.screenshot({
		path: `scripts/out/home-${viewport.label}.png`,
		fullPage: true,
	});
}

await context.close();
