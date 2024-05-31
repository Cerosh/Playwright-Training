import { test, expect } from "@playwright/test";

test("Making an API request and using the response", async ({ context }) => {
  const response = await context.request.get(
    "https://api.realworld.io/api/tags",
  );
  expect(response.status()).toBe(200);
  const responseData = await response.json();
  console.log("Received data:", responseData);
  const headers = response.headers();
  console.log("Headers:", headers);
});

test("Validating the Request methods", async ({ page }) => {
  await page.route(/api\.realworld\.io/, (route, response) => {
    console.log("Response URL:", response.url());
    console.log("Response Method:", response.method());
    console.log("Response headers:", response.headers());
    route.continue();
  });
  await page.goto("https://api.realworld.io/api");
});
