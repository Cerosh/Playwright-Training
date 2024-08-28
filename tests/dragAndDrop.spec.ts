import { test, expect } from "@playwright/test";
test("Example to demonstrate the Drag And Drop", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/drag_and_drop");
  await expect(page.locator("#column-a")).toHaveText("A");
  await expect(
    page.getByRole("heading", { name: "Drag and Drop" }),
  ).toBeVisible();
  await page.locator("#column-a").dragTo(page.locator("#column-b"));
  await expect(page.locator("#column-a")).toHaveText("A");
});
