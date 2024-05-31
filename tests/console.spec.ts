import { test, expect } from "@playwright/test";
test("Review Console logs", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (exception) => errors.push(exception.message));
  await page.goto("http://the-internet.herokuapp.com/javascript_error");
  await expect(page).toHaveTitle(/JavaScript errors/);
  for (const error of errors) {
    console.log("Error:", error);
  }
});
