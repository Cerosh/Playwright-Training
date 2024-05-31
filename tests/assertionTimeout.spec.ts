import { test, expect } from "@playwright/test";
test("Assertion timeout", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await expect(page).toHaveTitle(/Playwright/, { timeout: 10000 });
});
