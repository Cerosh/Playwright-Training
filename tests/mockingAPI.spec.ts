/* eslint-disable playwright/expect-expect */
import { test } from "@playwright/test";
import newContact from "../testData/newContact.json";

test("Mocking API Request", async ({ page }) => {
  const baseURL = "https://thinking-tester-contact-list.herokuapp.com/";
  await page.goto(baseURL);
  await page.getByPlaceholder("Email").fill("cerosh@gmail.com");
  await page.getByPlaceholder("Password").fill("cerosh@123");
  let token: string;
  const responsePromise = page.waitForResponse(
    (response) =>
      response.url() === `${baseURL}contacts` && response.status() === 200,
  );
  await page.route(
    /thinking-tester-contact-list\.herokuapp\.com\/contacts/,
    (route, response) => {
      token = response.headers().authorization;
      route.continue();
    },
  );
  await page.getByRole("button", { name: "Submit" }).click();
  await responsePromise;
  await page.getByRole("button", { name: "Add a New Contact" }).click();
  await page.getByPlaceholder("First Name").fill("Cerosh");
  await page.getByPlaceholder("Last Name").fill("Jacob");
  await page.route(`${baseURL}contacts`, async (route, request) => {
    const headers = {
      ...request.headers(),
      Authorization: token,
    };
    await route.continue({ headers, method: "POST", postData: newContact });
  });
  await page.getByRole("button", { name: "Submit" }).click();
});
