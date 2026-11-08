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

// Demo data, so the screenshots show the apps in use instead of an empty screen.
const demoData = {
  "to-do-list": {
    tasks: [
      { text: "Review client feedback", completed: false },
      { text: "Fix the mobile menu", completed: false },
      { text: "Compress the hero images", completed: false },
      { text: "Update the README", completed: false },
      { text: "Deploy the new version", completed: false },
    ],
  },
  "product-management-system": {
    "cruds.nextId": 9,
    "cruds.products.v2": [
      { id: 1, title: "Wireless Mouse", price: 450, taxes: 63, ads: 20, discount: 30, count: 24, category: "Accessories" },
      { id: 2, title: "Mechanical Keyboard", price: 1800, taxes: 252, ads: 60, discount: 100, count: 12, category: "Accessories" },
      { id: 3, title: "27-inch Monitor", price: 7500, taxes: 1050, ads: 150, discount: 400, count: 6, category: "Displays" },
      { id: 4, title: "USB-C Hub", price: 900, taxes: 126, ads: 25, discount: 50, count: 18, category: "Accessories" },
      { id: 5, title: "Laptop Stand", price: 650, taxes: 91, ads: 20, discount: 0, count: 15, category: "Office" },
      { id: 6, title: "Noise-Cancelling Headset", price: 3200, taxes: 448, ads: 80, discount: 200, count: 9, category: "Audio" },
      { id: 7, title: "Webcam 1080p", price: 1400, taxes: 196, ads: 40, discount: 75, count: 11, category: "Video" },
      { id: 8, title: "Desk Lamp", price: 520, taxes: 73, ads: 15, discount: 20, count: 20, category: "Office" },
    ],
  },
};

// Extra steps for sites that need input before they show anything useful.
async function prepare(page, slug) {
  // These apps read localStorage when they start, so save the data and reload.
  if (demoData[slug]) {
    await page.evaluate((data) => {
      for (const [key, value] of Object.entries(data)) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    }, demoData[slug]);
    await page.reload({ waitUntil: "networkidle" });
  }

  // The product table is below the form, so scroll down to it.
  if (slug === "product-management-system") {
    const target = page.viewportSize().width < 600 ? ".table-wrap" : ".stats";
    await page.locator(target).evaluate((element) => {
      window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 16, behavior: "instant" });
    });
  }

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
