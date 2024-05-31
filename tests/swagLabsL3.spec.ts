import { test } from "../helpers/basePage";
import { expect } from "@playwright/test";

test.describe("Select items for checkout, adjust as needed, and ensure user information is complete before checkout.", () => {
  test.beforeEach("Login to Saucedemo", async ({ loginPage, page }) => {
    // Enter your user credentials to log into SauceDemo.
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
  });
  test("Check out a random number of items", async ({
    page,
    inventoryPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage,
  }) => {
    // Assume there's a maximum of six items. Randomly select a number, then choose that many items from an array.
    // After each selection, remove the chosen item from the original array to prevent repeated selection.
    // Extract the item details and keep them for validation in the subsequent steps.
    const arrayOfItems = await inventoryPage.addRandomNumberItemsToTheCart();
    // Open the cart and verify the details of the selected item.
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
    await checkoutStepOnePage.enterPersonalInformationAndCheckout();
    // Go to the checkout overview and confirm the items before finalizing the transaction.
    await expect(
      page,
      "The comparison of URLs failed during the overview of items in the second checkout step.",
    ).toHaveURL(/.*checkout-step-two.html/);
    await checkoutStepTwoPage.assertTheCheckoutItems(arrayOfItems);
    await checkoutStepTwoPage.completeTheCheckout();
    await expect(
      page,
      "The comparison of URLs failed after the checkout was completed.",
    ).toHaveURL(/.*checkout-complete.html/);
    await checkoutCompletePage.assertSuccessfulCompletion();
  });
  test("Remove items from checkout.", async ({
    page,
    inventoryPage,
    cartPage,
  }) => {
    const arrayOfItems = await inventoryPage.addRandomNumberItemsToTheCart();
    // Open the cart and verify the details of the selected item.
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
  test("Cancel the checkout", async ({
    page,
    inventoryPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
  }) => {
    const arrayOfItems = await inventoryPage.addRandomNumberItemsToTheCart();
    // Open the cart and verify the details of the selected item.
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
    await checkoutStepOnePage.enterPersonalInformationAndCheckout();
    await expect(
      page,
      "The comparison of URLs failed during the overview of items in the second checkout step.",
    ).toHaveURL(/.*checkout-step-two.html/);
    await checkoutStepTwoPage.assertTheCheckoutItems(arrayOfItems);
    await checkoutStepTwoPage.assertFinishButton();
    // Cancel the checkout
    await checkoutStepTwoPage.cancelTheCheckOut();
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
  test("Add more items during checkout.", async ({
    page,
    inventoryPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage,
  }) => {
    const arrayOfItems = await inventoryPage.addRandomNumberItemsToTheCart();
    // Open the cart and verify the details of the selected item.
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
    await checkoutStepOnePage.enterPersonalInformationAndCheckout();

    // Go to the checkout overview and confirm the items before finalizing the transaction.
    await expect(
      page,
      "The comparison of URLs failed during the overview of items in the second checkout step.",
    ).toHaveURL(/.*checkout-step-two.html/);
    await checkoutStepTwoPage.assertTheCheckoutItems(arrayOfItems);

    // Cancel the checkout
    await checkoutStepTwoPage.cancelTheCheckOut();
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
    await checkoutStepOnePage.enterPersonalInformationAndCheckout();
    // Go to the checkout overview and confirm the items before finalizing the transaction.
    await expect(
      page,
      "The comparison of URLs failed during the overview of items in the second checkout step.",
    ).toHaveURL(/.*checkout-step-two.html/);
    await checkoutStepTwoPage.assertTheCheckoutItems(arrayOfItems);
    await checkoutStepTwoPage.completeTheCheckout();
    await expect(
      page,
      "The comparison of URLs failed after the checkout was completed.",
    ).toHaveURL(/.*checkout-complete.html/);
    await checkoutCompletePage.assertSuccessfulCompletion();
  });
  test("Cannot checkout without complete information.", async ({
    page,
    inventoryPage,
    cartPage,
    checkoutStepOnePage,
  }) => {
    const arrayOfItems = await inventoryPage.addRandomNumberItemsToTheCart();
    // Open the cart and verify the details of the selected item.
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
    await checkoutStepOnePage.proceedToContinueCheckout();
    await checkoutStepOnePage.assertForMissingInformation();
  });
});
