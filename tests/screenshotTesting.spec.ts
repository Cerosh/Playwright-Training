import test, { expect } from "@playwright/test";

test.describe("Test for exploring the screenshot testing", () => {
  test("for exploring the saving screenshot of a full page", async ({
    page,
  }) => {
    await page.goto("http://127.0.0.1:5500/documents/pwLocators.html");
    await expect(page.title()).resolves.toContain(
      "Playwright Built-in Locators",
    );
    await page.screenshot({ path: "fullPageScreenshot.png", fullPage: true });
  });

  test("for exploring the saving screenshot of an element", async ({
    page,
  }) => {
    await page.goto("http://127.0.0.1:5500/documents/pwLocators.html");
    await expect(page.title()).resolves.toContain(
      "Playwright Built-in Locators",
    );
    const productName = "Pink Lady Apples Medium";
    await page
      .getByRole("listitem")
      .filter({ hasText: productName })
      .getByRole("button", { name: "Add to cart" })
      .click();
    await page
      .getByTestId("cartLabelTestId")
      .screenshot({ path: "elementScreenshot.png" });
  });

  test("for exploring the screenshot comparison", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/documents/pwLocators.html");
    const productName = "Pink Lady Apples Medium";
    await page
      .getByRole("listitem")
      .filter({ hasText: productName })
      .getByRole("button", { name: "Add to cart" })
      .click();
    await expect(page).toHaveScreenshot("elementScreenshot.png");
  });
});
