import test, { expect } from "@playwright/test";

test("for exploring the Playwright build-in locators", async ({ page }) => {
  await page.goto(
    "http://127.0.0.1:5500/Playwright-Training/documents/pwLocators.html",
  );
  await expect(page.title()).resolves.toContain("Playwright Built-in Locators");
  await page.getByPlaceholder("Enter your username").click();
  await page.getByTestId("usernameInputTestId").fill("Cerosh");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByTestId("usernameLabelTestId")).toContainText("Cerosh");
  await page.getByLabel("Monday").check();
  await expect(page.getByText("Selected Days: Monday")).toBeVisible();
  await page.getByLabel("Tea").check();
  await page.getByLabel("monthSelectLabel").selectOption("June");
  await expect(page.getByLabel("monthSelectLabel")).toHaveValue("June");
  await expect(page.getByTitle("Built-in locators covered")).toHaveText(
    "6 locators",
  );
});
