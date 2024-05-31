import { expect, Page, Locator } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class CheckoutStepOne {
  readonly page: Page;
  readonly continueButton: Locator;
  readonly firstNameTextbox: Locator;
  readonly lastNameTextbox: Locator;
  readonly postalCodeTextbox: Locator;
  readonly firstMissingInformationLabel: Locator;
  readonly firstErrorIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueButton = page.locator('[data-test="continue"]');
    this.firstNameTextbox = page.locator('[data-test="firstName"]');
    this.lastNameTextbox = page.locator('[data-test="lastName"]');
    this.postalCodeTextbox = page.locator('[data-test="postalCode"]');
    this.firstMissingInformationLabel = page
      .locator("div")
      .filter({ hasText: /^Error: First Name is required$/ })
      .nth(1);
    this.firstErrorIcon = page.locator("path").first();
  }

  /**
   * Enters personal information such as first name, last name, and postal code during checkout process.
   * Calls the proceedToContinueCheckout method to continue with the checkout process.
   * @returns Promise<void>
   */
  public enterPersonalInformationAndCheckout = async (): Promise<void> => {
    const randomFName = faker.person.firstName();
    await this.firstNameTextbox.fill(randomFName);
    const randomLName = faker.person.lastName();
    await this.lastNameTextbox.fill(randomLName);
    const randomPCode = faker.location.zipCode();
    await this.postalCodeTextbox.fill(randomPCode);
    await this.proceedToContinueCheckout();
  };

  /**
   * Clicks on the continue button to proceed to the checkout process.
   * @returns Promise<void>
   */
  public proceedToContinueCheckout = async (): Promise<void> => {
    await this.continueButton.click();
  };

  /**
   * Asserts that the first missing information label and error icon are visible.
   * @returns Promise<void>
   */
  public assertForMissingInformation = async (): Promise<void> => {
    await expect(this.firstMissingInformationLabel).toBeVisible();
    await expect(this.firstErrorIcon).toBeVisible();
  };
}
