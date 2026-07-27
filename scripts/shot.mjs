import { chromium } from "playwright-core";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:4321";
const PATH = process.argv[2] ?? "/";
const NAME = process.argv[3] ?? "page";
const WIDTH = Number(process.argv[4] ?? 1440);

const context = await chromium.launchPersistentContext(
	mkdtempSync(join(tmpdir(), "mysk-shot-")),
	{ headless: true }
);

const page = await context.newPage();
await page.setViewportSize({ width: WIDTH, height: 900 });
await page.goto(`${BASE}${PATH}`, { waitUntil: "load" });
await page.waitForTimeout(400);

const metrics = await page.evaluate(() => ({
	height: document.documentElement.scrollHeight,
	overflows: document.documentElement.scrollWidth > window.innerWidth,
}));

console.log(
	`${PATH} @ ${WIDTH}px: ${metrics.height}px` +
		`${metrics.overflows ? " -- HORIZONTAL OVERFLOW" : ""}`
);

await page.screenshot({ path: `scripts/out/${NAME}.png`, fullPage: true });
await context.close();
