import { expect, Page, Locator } from "@playwright/test";
import { Item } from "../interfaces/Item.Interface";

export class CartPage {
  readonly page: Page;
  shoppingCartBadge: (numberOfItemsToAdd: string) => Locator;
  itemNameLabel: (itemName: string) => Locator;
  itemPriceLabel: (itemName: string, itemPrice: string) => Locator;
  itemDescriptionLabel: (itemDescription: string) => Locator;
  readonly checkoutStepOneButton: Locator;
  continueShoppingButton: Locator;
  itemRemoveButton: (itemId: string) => Locator;
  firstRemovedItemClass: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartBadge = (numberOfItemsToAdd: string) =>
      this.page.locator("a").filter({ hasText: `${numberOfItemsToAdd}` });
    this.itemNameLabel = (itemName: string) =>
      this.page.getByRole("link", { name: itemName });
    this.itemPriceLabel = (itemName: string, itemPrice: string) =>
      this.page.getByText(`1${itemName}`).filter({ hasText: `${itemPrice}` });
    this.itemDescriptionLabel = (itemDescription: string) =>
      this.page.getByText(itemDescription);
    this.checkoutStepOneButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator(
      '[data-test="continue-shopping"]',
    );
    this.itemRemoveButton = (itemId: string) =>
      this.page.locator(`[data-test="${itemId}"]`);
    this.firstRemovedItemClass = page.locator(".removed_cart_item").first();
  }

  /**
   * Opens the cart of items by clicking on the shopping cart badge after adding items to the cart.
   * @param {Item[]} arrayOfItems - An array of items to add to the cart.
   * @returns Promise<void>
   */
  public openTheCartOfItems = async (arrayOfItems: Item[]): Promise<void> => {
    const numberOfItemsToAdd = arrayOfItems.length;
    await this.shoppingCartBadge(numberOfItemsToAdd.toString()).click();
  };

  /**
   * Proceeds to the first step of the checkout process by clicking on the checkout step one button.
   * @returns Promise<void>
   */
  public proceedToCheckoutStepOne = async (): Promise<void> => {
    await this.checkoutStepOneButton.click();
  };

  /**
   * Asserts that each item in the array of items is visible in the cart.
   * @param {Item[]} arrayOfItems - An array of items to be checked in the cart.
   * @returns Promise<void>
   */
  public assertItemsInTheCart = async (arrayOfItems: Item[]): Promise<void> => {
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
   * Asserts that the buttons in the cart page are visible.
   * @returns Promise<void>
   */
  public assertTheButtonsInCartPage = async (): Promise<void> => {
    await expect(this.checkoutStepOneButton).toBeVisible();
    await expect(this.continueShoppingButton).toBeVisible();
  };

  /**
   * Removes items from the cart based on the provided array of items.
   * @param {Item[]} arrayOfItems - An array of items to be removed from the cart.
   * @returns {Promise<void>} A promise that resolves once all items are removed from the cart.
   */
  public removeItemsInTheCart = async (arrayOfItems: Item[]): Promise<void> => {
    for (const item of arrayOfItems) {
      const itemName = item.itemName;
      const nameWithHyphens = itemName.replace(/\s+/g, "-");
      const lowercaseName = nameWithHyphens.toLowerCase();
      const itemId = `remove-${lowercaseName}`;
      await this.itemRemoveButton(itemId).click();
    }
  };

  /**
   * Asserts that all items have been removed from the cart by checking if the first removed item
   * has the specified class.
   * @returns Promise<void>
   */
  public assertAllItemsRemoved = async (): Promise<void> => {
    await expect(this.firstRemovedItemClass).toHaveClass(/removed_cart_item/);
  };
}
