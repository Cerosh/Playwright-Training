import { test, expect } from "@playwright/test";

test("Assert the Locator points to an element with accessible information.", async ({
  page,
}) => {
  await page.goto("https://www.lego.com/");
  const locator = page.getByAltText("Cookie Settings");
  await page.addLocatorHandler(
    locator,
    async (overlay) => {
      await overlay.getByTestId("cookie-necessary-button").click();
    },
    { times: 3, noWaitAfter: true },
  );
  await expect(page.getByRole("button", { name: "Continue" })).toBeVisible();
  await page.removeLocatorHandler(locator);
});
