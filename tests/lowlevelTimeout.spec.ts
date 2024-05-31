import { test } from "@playwright/test";

test("Low level timeout for action and navigation", async ({ page }) => {
  await page.goto("https://playwright.dev/"), { timeout: 30000 };
  await page
    .getByRole("link", { name: "Get started" })
    .click({ timeout: 30000 });
});
