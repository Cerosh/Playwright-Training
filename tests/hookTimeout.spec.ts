import { test, expect } from "@playwright/test";
test.describe("Showcasing hook timeouts", {}, () => {
  test.describe.configure({ timeout: 60000 });
  test.setTimeout(2000);
  test.slow();
  test("Assertion timeout", async ({ page }, testInfo) => {
    await page.goto("https://playwright.dev/");
    await expect(page).toHaveTitle(/Playwright/, { timeout: 10000 });
    console.log(testInfo.timeout);
  });
});
