import { expect, Page, Locator } from "@playwright/test";

export class CheckoutComplete {
  readonly page: Page;
  ponyExpressImage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ponyExpressImage = page.getByRole("img", { name: "Pony Express" });
  }

  /**
   * Asserts that the ponyExpressImage element is visible on the page.
   * @returns Promise<void>
   */
  public assertSuccessfulCompletion = async (): Promise<void> => {
    await expect(this.ponyExpressImage).toBeVisible();
  };
}
