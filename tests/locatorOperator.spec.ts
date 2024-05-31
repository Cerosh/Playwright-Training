import test, { expect } from "@playwright/test";

test("for exploring the Playwright build-in locator operator", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:5500/documents/pwLocators.html");
  const button = page
    .getByPlaceholder("Enter your username")
    .and(page.getByTestId("usernameInputTestId"));
  await button.fill("Cerosh");
  const randomNumber = Math.round(Math.random());
  const drinksArray = ["Tea", "Coffee"];
  await page.getByLabel(drinksArray[randomNumber]).click();
  const coffeeSelected = page.getByText("Selected Drink: Coffee");
  const teaSelected = page.getByText("Selected Drink: Tea");
  await expect(coffeeSelected.or(teaSelected)).toBeVisible();
});
