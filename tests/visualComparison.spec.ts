import { test, expect } from "@playwright/test";

test("example test", async ({ page }) => {
  await page.goto("https://playwright.dev");
  await expect(page).toHaveScreenshot();
  await expect.soft(page).toHaveScreenshot("landing.png");
  await page
    .getByRole("link", { name: "Get started" })
    .screenshot({ path: "screenshot.png" });
  await page.screenshot({ path: "screenshot.png", fullPage: true });
});

// npx playwright test --update-snapshots
