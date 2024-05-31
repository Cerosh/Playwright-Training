import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright"; // 1

test.describe("Accessibility check", () => {
  // 2
  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }, testInfo) => {
    await page.goto("https://broken-workshop.dequelabs.com/");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: "application/json",
    });
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
