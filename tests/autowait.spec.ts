import { test, expect } from "@playwright/test";

test("Locator assertion test example.", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/dynamic_controls");
  await page.getByRole("textbox").hover();
  await page.getByRole("button", { name: "Enable" }).click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("Hello");
  await expect(page.getByRole("textbox")).toHaveValue("Hello");
  await page.getByRole("button", { name: "Remove" }).click();
  await expect(page.getByText("It's back!")).toBeHidden();
  await page.goto("https://the-internet.herokuapp.com/dropdown");
  await page.locator("#dropdown").selectOption("2");
});
