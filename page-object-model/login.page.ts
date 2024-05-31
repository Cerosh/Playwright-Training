import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  userNameTextbox: Locator;
  passwordTextBox: Locator;
  loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameTextbox = this.page.locator('[data-test="username"]');
    this.passwordTextBox = this.page.locator('[data-test="password"]');
    this.loginButton = this.page.locator('[data-test="login-button"]');
  }

  /**
   * Logs in to the Saucedemo website using the provided credentials.
   * @returns Promise<void>
   */
  public loginToSaucedemo = async (): Promise<void> => {
    await this.userNameTextbox.fill("standard_user");
    await this.passwordTextBox.fill("secret_sauce");
    await this.loginButton.click();
  };

  /**
   * Navigates to the Saucedemo website.
   * @returns Promise<void>
   */
  public navigateToSaucedemo = async (): Promise<void> => {
    await this.page.goto("https://www.saucedemo.com/");
  };
}
