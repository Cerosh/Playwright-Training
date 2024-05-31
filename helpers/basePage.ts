import { test as base } from "@playwright/test";
import { CartPage } from "../page-object-model/cart.page";
import { CheckoutComplete } from "../page-object-model/checkoutComplete.page";
import { CheckoutStepOne } from "../page-object-model/checkoutStepOne.page";
import { CheckoutStepTwo } from "../page-object-model/checkoutStepTwo.page";
import { InventoryPage } from "../page-object-model/inventory.page";
import { LoginPage } from "../page-object-model/login.page";

export const test = base.extend<{
  cartPage: CartPage;
  checkoutCompletePage: CheckoutComplete;
  checkoutStepOnePage: CheckoutStepOne;
  checkoutStepTwoPage: CheckoutStepTwo;
  inventoryPage: InventoryPage;
  loginPage: LoginPage;
}>({
  cartPage: async ({ page }, use) => await use(new CartPage(page)),
  checkoutCompletePage: async ({ page }, use) =>
    await use(new CheckoutComplete(page)),
  checkoutStepOnePage: async ({ page }, use) =>
    await use(new CheckoutStepOne(page)),
  checkoutStepTwoPage: async ({ page }, use) =>
    await use(new CheckoutStepTwo(page)),
  inventoryPage: async ({ page }, use) => await use(new InventoryPage(page)),
  loginPage: async ({ page }, use) => await use(new LoginPage(page)),
});
