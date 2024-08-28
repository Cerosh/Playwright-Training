import test, { expect } from "@playwright/test";

test("for exploring the Playwright build-in locators", async ({ page }) => {
  await page.goto(
    "http://127.0.0.1:5500/Playwright-Training/documents/pwLocators.html",
  );
  await expect(page.title()).resolves.toContain("Playwright Built-in Locators");
  await page.locator("#usernameInputID").click();
  await page.locator(".usernameInputClass").fill("Cerosh");
  await page.locator("button").first().click();
  await expect(page.locator("#usernameLabelID")).toContainText("Cerosh");
  await page.locator("text=Monday").check();
  await expect(page.locator(':text("Selected Days: Monday")')).toBeVisible();
  await page.locator("text=Tea").check();
  await page.selectOption("select#monthSelect", { label: "June" });
  await expect(page.locator("select#monthSelect")).toHaveValue("June");
  await expect(
    page.locator('span[title="Built-in locators covered"]'),
  ).toHaveText("6 locators");
});
