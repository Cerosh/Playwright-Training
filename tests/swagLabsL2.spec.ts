import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-object-model/login.page";
import { InventoryPage } from "../page-object-model/inventory.page";
import { CartPage } from "../page-object-model/cart.page";
import { CheckoutStepOne } from "../page-object-model/checkoutStepOne.page";
import { CheckoutStepTwo } from "../page-object-model/checkoutStepTwo.page";
import { CheckoutComplete } from "../page-object-model/checkoutComplete.page";

test.describe("Select items for checkout, adjust as needed, and ensure user information is complete before checkout.", () => {
  test("Check out a random number of items", async ({ page }) => {
    // Enter your user credentials to log into SauceDemo.
    const loginPage = new LoginPage(page);
    await loginPage.navigateToSaucedemo();
    await expect(
      page,
      "The comparison of the Saucedemo login page title was unsuccessful.",
    ).toHaveTitle(/Swag Labs/);
    await loginPage.loginToSaucedemo();
    await expect
      .soft(
        page,
        "The comparison of URLs before item selection was unsuccessful.",
      )
      .toHaveURL(/.*inventory.html/);
    // Assume there's a maximum of six items. Randomly select a number, then choose that many items from an array.
    // After each selection, remove the chosen item from the original array to prevent repeated selection.
    // Extract the item details and keep them for validation in the subsequent steps.
    const inventoryPage = new InventoryPage(page);
    const arrayOfItems = await inventoryPage.addRandomNumberItemsToTheCart();
    // Open the cart and verify the details of the selected item.
    const cartPage = new CartPage(page);
    cartPage.openTheCartOfItems(arrayOfItems);
    await expect(
      page,
      "The comparison of URLs was unsuccessful before validating items in the cart.",
    ).toHaveURL(/.*cart.html/);
    await cartPage.assertItemsInTheCart(arrayOfItems);
    await cartPage.proceedToCheckoutStepOne();
    //Proceed to checkout step one to collect the necessary user information.
    await expect(
      page,
      "The comparison of URLs failed during the first checkout step for entering user information.",
    ).toHaveURL(/.*checkout-step-one.html/);
    const checkoutOne = new CheckoutStepOne(page);
    await checkoutOne.enterPersonalInformationAndCheckout();
    // Go to the checkout overview and confirm the items before finalizing the transaction.
    await expect(
      page,
      "The comparison of URLs failed during the overview of items in the second checkout step.",
    ).toHaveURL(/.*checkout-step-two.html/);
    const checkoutTwo = new CheckoutStepTwo(page);
    await checkoutTwo.assertTheCheckoutItems(arrayOfItems);
    await checkoutTwo.completeTheCheckout();
    const checkoutComplete = new CheckoutComplete(page);
    await expect(
      page,
      "The comparison of URLs failed after the checkout was completed.",
    ).toHaveURL(/.*checkout-complete.html/);
    await checkoutComplete.assertSuccessfulCompletion();
  });

  test("Remove items from checkout.", async ({ page }) => {
    // Enter your user credentials to log into SauceDemo.
    const loginPage = new LoginPage(page);
    await loginPage.navigateToSaucedemo();
    await expect(
      page,
      "The comparison of the Saucedemo login page title was unsuccessful.",
    ).toHaveTitle(/Swag Labs/);
    await loginPage.loginToSaucedemo();
    await expect
      .soft(
        page,
        "The comparison of URLs before item selection was unsuccessful.",
      )
      .toHaveURL(/.*inventory.html/);
    // Assume there's a maximum of six items. Randomly select a number, then choose that many items from an array.
    // After each selection, remove the chosen item from the original array to prevent repeated selection.
    // Extract the item details and keep them for validation in the subsequent steps.
    const inventoryPage = new InventoryPage(page);
    const arrayOfItems = await inventoryPage.addRandomNumberItemsToTheCart();
    // Open the cart and verify the details of the selected item.
    const cartPage = new CartPage(page);
    cartPage.openTheCartOfItems(arrayOfItems);
    await expect(
      page,
      "The comparison of URLs was unsuccessful before validating items in the cart.",
    ).toHaveURL(/.*cart.html/);
    await cartPage.assertItemsInTheCart(arrayOfItems);
    await cartPage.assertTheButtonsInCartPage();
    // Remove all selected items from the cart.
    await cartPage.removeItemsInTheCart(arrayOfItems);
    await expect(page.locator(".removed_cart_item").first()).toHaveClass(
      /removed_cart_item/,
    );
  });

  test("Cancel the checkout", async ({ page }) => {
    // Enter your user credentials to log into SauceDemo.
    const loginPage = new LoginPage(page);
    await loginPage.navigateToSaucedemo();
    await expect(
      page,
      "The comparison of the Saucedemo login page title was unsuccessful.",
    ).toHaveTitle(/Swag Labs/);
    await loginPage.loginToSaucedemo();
    await expect
      .soft(
        page,
        "The comparison of URLs before item selection was unsuccessful.",
      )
      .toHaveURL(/.*inventory.html/);
    // Assume there's a maximum of six items. Randomly select a number, then choose that many items from an array.
    // After each selection, remove the chosen item from the original array to prevent repeated selection.
    // Extract the item details and keep them for validation in the subsequent steps.
    const inventoryPage = new InventoryPage(page);
    const arrayOfItems = await inventoryPage.addRandomNumberItemsToTheCart();

    // Open the cart and verify the details of the selected item.
    const cartPage = new CartPage(page);
    cartPage.openTheCartOfItems(arrayOfItems);
    await expect(
      page,
      "The comparison of URLs was unsuccessful before validating items in the cart.",
    ).toHaveURL(/.*cart.html/);
    await cartPage.assertItemsInTheCart(arrayOfItems);
    await cartPage.proceedToCheckoutStepOne();
    //Proceed to checkout step one to collect the necessary user information.
    await expect(
      page,
      "The comparison of URLs failed during the first checkout step for entering user information.",
    ).toHaveURL(/.*checkout-step-one.html/);
    const checkoutOne = new CheckoutStepOne(page);
    await checkoutOne.enterPersonalInformationAndCheckout();
    await expect(
      page,
      "The comparison of URLs failed during the overview of items in the second checkout step.",
    ).toHaveURL(/.*checkout-step-two.html/);
    const checkoutTwo = new CheckoutStepTwo(page);
    await checkoutTwo.assertTheCheckoutItems(arrayOfItems);
    await checkoutTwo.assertFinishButton();
    await checkoutTwo.assertSauceCardLabel();

    // Cancel the checkout
    await checkoutTwo.cancelTheCheckOut();
    await expect
      .soft(
        page,
        "The comparison of URLs before item selection was unsuccessful.",
      )
      .toHaveURL(/.*inventory.html/);
    cartPage.openTheCartOfItems(arrayOfItems);
    await expect(
      page,
      "The comparison of URLs was unsuccessful before validating items in the cart.",
    ).toHaveURL(/.*cart.html/);
    await cartPage.assertItemsInTheCart(arrayOfItems);
  });

  test("Add more items during checkout.", async ({ page }) => {
    // Enter your user credentials to log into SauceDemo.
    const loginPage = new LoginPage(page);
    await loginPage.navigateToSaucedemo();
    await expect(
      page,
      "The comparison of the Saucedemo login page title was unsuccessful.",
    ).toHaveTitle(/Swag Labs/);
    await loginPage.loginToSaucedemo();
    await expect
      .soft(
        page,
        "The comparison of URLs before item selection was unsuccessful.",
      )
      .toHaveURL(/.*inventory.html/);

    // Assume there's a maximum of six items. Randomly select a number, then choose that many items from an array.
    // After each selection, remove the chosen item from the original array to prevent repeated selection.
    // Extract the item details and keep them for validation in the subsequent steps.
    const inventoryPage = new InventoryPage(page);
    const arrayOfItems = await inventoryPage.addRandomNumberItemsToTheCart();

    // Open the cart and verify the details of the selected item.
    const cartPage = new CartPage(page);
    cartPage.openTheCartOfItems(arrayOfItems);
    await expect(
      page,
      "The comparison of URLs was unsuccessful before validating items in the cart.",
    ).toHaveURL(/.*cart.html/);
    await cartPage.assertItemsInTheCart(arrayOfItems);
    await cartPage.proceedToCheckoutStepOne();

    //Proceed to checkout step one to collect the necessary user information.
    await expect(
      page,
      "The comparison of URLs failed during the first checkout step for entering user information.",
    ).toHaveURL(/.*checkout-step-one.html/);
    const checkoutOne = new CheckoutStepOne(page);
    await checkoutOne.enterPersonalInformationAndCheckout();

    // Go to the checkout overview and confirm the items before finalizing the transaction.
    await expect(
      page,
      "The comparison of URLs failed during the overview of items in the second checkout step.",
    ).toHaveURL(/.*checkout-step-two.html/);
    const checkoutTwo = new CheckoutStepTwo(page);
    await checkoutTwo.assertTheCheckoutItems(arrayOfItems);
    await checkoutTwo.assertFinishButton();

    // Cancel the checkout
    await checkoutTwo.cancelTheCheckOut();
    await expect
      .soft(
        page,
        "The comparison of URLs before item selection was unsuccessful.",
      )
      .toHaveURL(/.*inventory.html/);
    await inventoryPage.addRandomNumberOfItemsToTheExistingCart();
    cartPage.openTheCartOfItems(arrayOfItems);
    await expect(
      page,
      "The comparison of URLs was unsuccessful before validating items in the cart.",
    ).toHaveURL(/.*cart.html/);
    await cartPage.assertItemsInTheCart(arrayOfItems);
    await cartPage.proceedToCheckoutStepOne();
    //Proceed to checkout step one to collect the necessary user information.
    await expect(
      page,
      "The comparison of URLs failed during the first checkout step for entering user information.",
    ).toHaveURL(/.*checkout-step-one.html/);
    await checkoutOne.enterPersonalInformationAndCheckout();
    // Go to the checkout overview and confirm the items before finalizing the transaction.
    await expect(
      page,
      "The comparison of URLs failed during the overview of items in the second checkout step.",
    ).toHaveURL(/.*checkout-step-two.html/);
    await checkoutTwo.assertTheCheckoutItems(arrayOfItems);
    await checkoutTwo.completeTheCheckout();
    const checkoutComplete = new CheckoutComplete(page);
    await expect(
      page,
      "The comparison of URLs failed after the checkout was completed.",
    ).toHaveURL(/.*checkout-complete.html/);
    await checkoutComplete.assertSuccessfulCompletion();
  });

  test("Cannot checkout without complete information.", async ({ page }) => {
    // Enter your user credentials to log into SauceDemo.
    const loginPage = new LoginPage(page);
    await loginPage.navigateToSaucedemo();
    await expect(
      page,
      "The comparison of the Saucedemo login page title was unsuccessful.",
    ).toHaveTitle(/Swag Labs/);
    await loginPage.loginToSaucedemo();
    await expect
      .soft(
        page,
        "The comparison of URLs before item selection was unsuccessful.",
      )
      .toHaveURL(/.*inventory.html/);
    // Assume there's a maximum of six items. Randomly select a number, then choose that many items from an array.
    // After each selection, remove the chosen item from the original array to prevent repeated selection.
    // Extract the item details and keep them for validation in the subsequent steps.
    const inventoryPage = new InventoryPage(page);
    const arrayOfItems = await inventoryPage.addRandomNumberItemsToTheCart();
    // Open the cart and verify the details of the selected item.
    const cartPage = new CartPage(page);
    cartPage.openTheCartOfItems(arrayOfItems);
    await expect(
      page,
      "The comparison of URLs was unsuccessful before validating items in the cart.",
    ).toHaveURL(/.*cart.html/);
    await cartPage.assertItemsInTheCart(arrayOfItems);

    await cartPage.proceedToCheckoutStepOne();
    //Proceed to checkout step one to collect the necessary user information.
    await expect(
      page,
      "The comparison of URLs failed during the first checkout step for entering user information.",
    ).toHaveURL(/.*checkout-step-one.html/);

    // Try proceeding to checkout and confirming items without providing user information.
    const checkoutOne = new CheckoutStepOne(page);
    await checkoutOne.proceedToContinueCheckout();
    await checkoutOne.assertForMissingInformation();
  });
});
