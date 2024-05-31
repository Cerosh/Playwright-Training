import { expect, Page, Locator } from "@playwright/test";
import { Item } from "../interfaces/Item.Interface";

export class CheckoutStepTwo {
  readonly page: Page;
  readonly itemNameLabel: (itemName: string) => Locator;
  readonly itemPriceLabel: (itemName: string, itemPrice: string) => Locator;
  readonly itemDescriptionLabel: (itemDescription: string) => Locator;
  readonly sauceCardLabel: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemNameLabel = (itemName: string) =>
      page.getByRole("link", { name: itemName });
    this.itemPriceLabel = (itemName: string, itemPrice: string) =>
      page.getByText(`1${itemName}`).filter({ hasText: `${itemPrice}` });
    this.itemDescriptionLabel = (itemDescription: string) =>
      page.getByText(itemDescription);
    this.sauceCardLabel = page.getByText("SauceCard #");
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
  }
  /**
   * Asserts the checkout items by verifying the items in the array and the sauce card label.
   * @param {Item[]} arrayOfItems - An array of items to be checked in the checkout.
   * @returns {Promise<void>} A promise that resolves once the assertions are complete.
   */
  public assertTheCheckoutItems = async (
    arrayOfItems: Item[],
  ): Promise<void> => {
    await this.assertTheItems(arrayOfItems);
    await this.assertSauceCardLabel();
  };

  /**
   * Asserts the visibility of each item in an array of items by checking if the item name,
   * item price, and item description labels are visible on the page.
   * @param {Item[]} arrayOfItems - An array of items to assert visibility for.
   * @returns Promise<void>
   */
  public assertTheItems = async (arrayOfItems: Item[]): Promise<void> => {
    for (const item of arrayOfItems) {
      const itemName = item.itemName;
      const itemPrice = item.itemPrice;
      const itemDescription = item.itemDescription;
      await expect(this.itemNameLabel(itemName)).toBeVisible();
      await expect(this.itemPriceLabel(itemName, itemPrice)).toBeVisible();
      await expect(this.itemDescriptionLabel(itemDescription)).toBeVisible();
    }
  };

  /**
   * Clicks on the finish button to complete the checkout process.
   * @returns A Promise that resolves once the checkout process is completed.
   */
  public completeTheCheckout = async (): Promise<void> => {
    await this.finishButton.click();
  };

  /**
   * Asserts that the Sauce Card Label element is visible on the page.
   * @returns Promise<void>
   */
  public assertSauceCardLabel = async (): Promise<void> => {
    await expect(this.sauceCardLabel).toBeVisible();
  };

  /**
   * Asserts that the finish button is visible on the page.
   * @returns Promise<void>
   */
  public assertFinishButton = async (): Promise<void> => {
    await expect(this.finishButton).toBeVisible();
  };

  /**
   * Cancels the checkout process by clicking on the cancel button.
   * @returns Promise<void>
   */
  public cancelTheCheckOut = async (): Promise<void> => {
    await this.cancelButton.click();
  };
}
