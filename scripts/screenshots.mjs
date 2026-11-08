// Captures desktop and mobile screenshots of every project's live site.
// Run with: npm run screenshots
// Only one project: npm run screenshots -- weather-app
// Saves to public/projects/<slug>/desktop.png and mobile.png,
// plus desktop-dark.png and mobile-dark.png for projects with a dark theme.

import { mkdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

// Read slugs and live URLs straight from projects.ts so there is one source of truth.
const source = await readFile(new URL("../src/data/projects.ts", import.meta.url), "utf8");
const allProjects = source
  .split(/(?=slug: ")/)
  .slice(1)
  .map((block) => ({
    slug: block.match(/slug: "([^"]+)"/)[1],
    liveUrl: block.match(/liveUrl: "([^"]+)"/)[1],
    hasDarkTheme: block.includes("hasDarkTheme: true"),
  }));

const onlySlug = process.argv[2];
const projects = onlySlug ? allProjects.filter((project) => project.slug === onlySlug) : allProjects;

const viewports = [
  { name: "desktop", width: 1440, height: 900, options: {} },
  // Mobile: rendered at 2x so the image stays sharp on phone screens.
  { name: "mobile", width: 390, height: 844, options: { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } },
];

// Extra steps for sites that need input before they show anything useful.
async function prepare(page, slug) {
  if (slug === "weather-app") {
    await page.fill("#cityInput", "Cairo");
    await page.press("#cityInput", "Enter");
    // The country name is empty until the weather results arrive.
    await page.waitForFunction(() => document.querySelector("#countryName")?.textContent?.trim(), null, {
      timeout: 15000,
    });
  }
}

const browser = await chromium.launch();

for (const project of projects) {
  const folder = new URL(`../public/projects/${project.slug}/`, import.meta.url);
  await mkdir(folder, { recursive: true });

  const themes = project.hasDarkTheme ? ["light", "dark"] : ["light"];

  for (const viewport of viewports) {
    for (const theme of themes) {
      // The live sites pick their theme from colorScheme on the first visit.
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        colorScheme: theme,
        ...viewport.options,
      });
      const page = await context.newPage();

      await page.goto(project.liveUrl, { waitUntil: "networkidle" });
      await prepare(page, project.slug);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(1000);

      const fileName = `${viewport.name}${theme === "dark" ? "-dark" : ""}.png`;
      await page.screenshot({ path: fileURLToPath(new URL(fileName, folder)) });
      console.log(`Saved ${project.slug}/${fileName}`);

      await context.close();
    }
  }
}

await browser.close();
