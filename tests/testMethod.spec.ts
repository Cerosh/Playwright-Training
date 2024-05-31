import { test, expect } from "@playwright/test";

test(
  "Title - test method",
  {
    tag: "@smoke",
    annotation: {
      type: "issue",
      description: "https://github.com/microsoft/playwright/issues/23180",
    },
  },
  async ({ page }, testInfo) => {
    expect(testInfo.title).toBe("Title - test method");
    await page.goto("https://playwright.dev/");
  },
);
