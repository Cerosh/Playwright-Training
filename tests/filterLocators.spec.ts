import test, { expect } from "@playwright/test";

test.describe("Test for exploring the locator filtering", () => {
  test("for exploring the Filter by text locator", async ({ page }) => {
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
    await expect(page.getByTestId("cartLabelTestId")).toContainText(
      productName,
    );
  });

  test("for exploring the Filter by has not text locator", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/documents/pwLocators.html");
    await expect(
      page.getByRole("listitem").filter({ hasNotText: "Out of stock" }),
    ).toHaveCount(2);
  });

  test("for exploring the Filter by child/descendant locator", async ({
    page,
  }) => {
    await page.goto("http://127.0.0.1:5500/documents/pwLocators.html");
    const productName = "Pink Lady Apples Medium";
    await expect(
      page
        .getByRole("listitem")
        .filter({ has: page.getByRole("heading", { name: productName }) }),
    ).toHaveCount(1);
  });
});
