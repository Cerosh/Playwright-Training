import { test, expect } from "@playwright/test";
test("Review Console logs", async ({ page }) => {
  const errors: {
    name: string;
    message: string;
  }[] = [];
  const logs: {
    message: string;
    type: string;
  }[] = [];

  page.on("pageerror", (error) =>
    errors.push({ name: error.name, message: error.message }),
  );
  page.on("console", (msg) => {
    if (msg.type() == "error") {
      logs.push({ message: msg.text(), type: msg.type() });
    }
  });
  await page.goto("http://the-internet.herokuapp.com/javascript_error");
  await expect(page).toHaveTitle(/JavaScript errors/);
  for (const error of errors) {
    console.log("Error:", error);
  }
});
