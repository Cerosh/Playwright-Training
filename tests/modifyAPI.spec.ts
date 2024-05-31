/* eslint-disable playwright/expect-expect */
import { test } from "@playwright/test";
import newContact from "../testData/newContact.json";

test("Modifying API Response", async ({ page }) => {
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
  await page.getByRole("button", { name: "Submit" }).click();
  await page.route(`${baseURL}contacts`, async (route, response) => {
    const headers = {
      ...response.headers(),
      Authorization: token,
    };
    await route.fulfill({ headers, body: JSON.stringify([newContact]) });
  });
  await page.waitForEvent("load");
  await page.goto("https://thinking-tester-contact-list.herokuapp.com/contactList"
  );
});
