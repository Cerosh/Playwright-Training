import { test, expect } from "@playwright/test";

test("Locator assertion test example.", async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/documents/pwLocators.html");
  await expect
    .soft(page.getByTitle("Built-in locators covered"), "locator count")
    .toHaveText("7 locators");
  await expect(page).toHaveURL(/.*pwLocators.html/);
  await expect(page.getByTestId("usernameInputTestId")).toHaveId(
    "usernameInputID",
  );
  await expect(page.getByRole("radio")).toHaveCount(2);
});
