import { expect, Locator, Page } from "@playwright/test";
import { getNumberOfItemsToAdd } from "../helpers/getNumberOfItemsToAdd";
import { Item } from "../interfaces/Item.Interface";

export class InventoryPage {
  readonly page: Page;
  itemNameLabel: Locator;
  itemPriceLabel: Locator;
  itemDescLabel: Locator;
  addToCartButton: Locator;
  backToProductsLink: Locator;
  maxNumberOfItems = 6;
  arrayOfItems: Item[] = [];
  arrayOfNumbers: number[] = [0, 1, 2, 3, 4, 5];
  arrayOfNumbersCopy = [...this.arrayOfNumbers];
  numberOfItemsToAdd = getNumberOfItemsToAdd(this.maxNumberOfItems);

  constructor(page: Page) {
    this.page = page;
    this.itemNameLabel = this.page.locator(
      ".inventory_details_name.large_size",
    );
    this.itemPriceLabel = this.page.locator(".inventory_details_price");
    this.itemDescLabel = this.page.locator(".inventory_details_desc");
    this.addToCartButton = this.page
      .getByRole("button")
      .filter({ hasText: "Add to cart" });
    this.backToProductsLink = this.page.locator(
      '[data-test="back-to-products"]',
    );
  }

  /**
   * Asynchronously adds a random number of items to the cart by extracting item details
   * and adding each item to the cart.
   * @returns {Promise<Item[]>} A promise that resolves to an array of items added to the cart.
   */
  public addRandomNumberItemsToTheCart = async (): Promise<Item[]> => {
    await this.extractItemDetailsAndAddEachItemToTheCart(
      this.numberOfItemsToAdd,
    );
    return this.arrayOfItems;
  };

  /**
   * Adds a random number of items to the existing cart based on the remaining items available.
   * @returns Promise<void>
   */
  public addRandomNumberOfItemsToTheExistingCart = async (): Promise<void> => {
    const remainingItems = this.maxNumberOfItems - this.numberOfItemsToAdd;
    console.log({ remainingItems });
    const numberOfItemsToAppend = Math.floor(
      Math.random() * (remainingItems - 1 + 1) + 1,
    );
    console.log({ numberOfItemsToAppend });
    await this.extractItemDetailsAndAddEachItemToTheCart(numberOfItemsToAppend);
  };

  /**
   * Extracts item details and adds each item to the cart a specified number of times.
   * @param {number} itemsToAdd - The number of items to add to the cart.
   * @returns Promise<void>
   */
  public extractItemDetailsAndAddEachItemToTheCart = async (
    itemsToAdd: number,
  ): Promise<void> => {
    for (let i = 0; i < itemsToAdd; i++) {
      const randomIndex = Math.floor(
        Math.random() * this.arrayOfNumbersCopy.length,
      );
      const [randomValue] = this.arrayOfNumbersCopy.splice(randomIndex, 1);
      const identifier = `#item_${randomValue}_title_link`;
      await this.page.locator(identifier).click();
      await this.extractItemDetailsForValidation(this.arrayOfItems);
      await this.addToCartButton.click();
      await this.backToProductsLink.click();
    }
  };

  /**
   * Extracts item details for validation from the current page and adds them to the given array of items.
   * @param {Item[]} arrayOfItems - The array of items to which the extracted item details will be added.
   * @returns {Promise<void>} A promise that resolves once the item details are extracted and added to the array.
   */
  public extractItemDetailsForValidation = async (
    arrayOfItems: Item[],
  ): Promise<void> => {
    await expect(
      this.page,
      "The attempt to compare URLs prior to extracting item details was unsuccessful.",
    ).toHaveURL(/.*inventory-item\.html\?id=(\d+)/);
    const itemName = await this.itemNameLabel.textContent();
    const itemPrice = await this.itemPriceLabel.textContent();
    const itemDescription = await this.itemDescLabel.textContent();
    arrayOfItems.push({
      itemName: itemName ?? "Default Name",
      itemPrice: itemPrice ?? "Default Price",
      itemDescription: itemDescription ?? "Default Description",
    });
  };
}
