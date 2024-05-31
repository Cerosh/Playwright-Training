import { test, expect } from "@playwright/test";

test("Assert the Locator points to an element with accessible information.", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:5500/documents/pwLocators.html");
  const textBox = page.getByTestId("fname-textbox");
  await expect(textBox).toHaveAccessibleName("First name");
  await expect(textBox).toHaveAccessibleDescription(
    "A bit of instructions for this field",
  );
  await expect(textBox).toHaveRole("textbox");
});
