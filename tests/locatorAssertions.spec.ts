import { test, expect } from "@playwright/test";

test("Locator assertion test example.", async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/documents/pwLocators.html");
  await expect(page.getByTitle("Built-in locators covered")).toHaveText(
    "6 locators",
  );
  await expect(page.getByTestId("usernameLabelTestId")).toBeAttached();
  await page.getByLabel("Monday").check();
  await expect(page.getByLabel("Monday")).toBeChecked();
  await expect(page.getByTestId("usernameInputTestId")).toBeEditable();
  await expect(page.getByTestId("usernameInputTestId")).toBeEnabled();
  await expect(page.getByTestId("usernameInputTestId")).toHaveAttribute(
    "type",
    "text",
  );
});
