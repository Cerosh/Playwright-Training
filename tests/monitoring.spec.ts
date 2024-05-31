import { test, expect } from "@playwright/test";

test.describe("Greater Bank Synthetic monitoring scenarios", () => {
  test.beforeEach("Navigate to Greater Bank home page", async ({ page }) => {
    await page.goto("https://www.greater.com.au/");
  });
  test("Validate the home page loading", async ({ page }) => {
    await expect(page).toHaveTitle(
      /Home Loans, Personal Loans, Credit Cards and Accounts | Greater Bank/,
    );
  });
  test("Navigate to the Online Banking page", async ({ page }) => {
    const page1Promise = page.waitForEvent("popup");
    await page
      .locator("#SiteHeader")
      .getByRole("link", { name: "Online Banking" })
      .click();
    const page1 = await page1Promise;
    await expect(page1.getByRole("button", { name: "Login" })).toBeVisible();
  });
  test("Navigate to the Personal Banking page", async ({ page }) => {
    await page.getByRole("button", { name: "Personal" }).click();
    await page.getByRole("link", { name: "Personal", exact: true }).click();
    await expect(
      page
        .getByRole("heading", { name: "Personal Banking", exact: true })
        .locator("span"),
    ).toBeVisible();
  });

  test("Navigate to the Home Loan  Enquire now page", async ({ page }) => {
    const page2Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Enquire now" }).click();
    const page2 = await page2Promise;
    await expect(
      page2.getByRole("heading", { name: "Enquire About A Home Loan" }),
    ).toBeVisible();
  });

  test("Navigate to the Interest Rates page", async ({ page }) => {
    await page.getByRole("button", { name: "Help Centre" }).click();
    await page
      .getByRole("link", { name: "Interest Rates", exact: true })
      .first()
      .click();
    await expect(page.getByText("Compare Interest Rates")).toBeVisible();
  });
});
