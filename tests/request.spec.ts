/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable playwright/expect-expect */
import { test } from "@playwright/test";

test("Validating the Request methods", async ({ page }) => {
  await page.route(/api\.realworld\.io/, (route) => {
    console.log("Request URL:", route.request().url());
    console.log("Request Method:", route.request().method());
    console.log("Request headers:", route.request().headers());
    console.log("Request Type:", route.request().resourceType());
    route.continue();
  });
  await page.goto("https://api.realworld.io/api");
});

test("Request Finished", async ({ page }) => {
  page.on("requestfinished", (req) =>
    console.log(`${req.resourceType()} : ${req.url()}`),
  );
  let load = false;
  const handleLoad = (): void => {
    load = true;
    console.log("Load event fired!");
  };
  page.on("load", handleLoad);
  await page.goto("https://www.ebay.com.au/");
});

test("DOM Content Loaded", async ({ page }) => {
  page.on("request", (req) =>
    console.log(`${req.resourceType()} : ${req.url()}`),
  );
  let contentLoaded = false;
  const handleContentLoaded = (): void => {
    contentLoaded = true;
    console.log("DOMContentLoaded event fired!");
  };
  page.on("domcontentloaded", handleContentLoaded);
  await page.goto("https://www.ebay.com.au/");
});

test("Avoid Image loading", async ({ page }) => {
  await page.route("**/*", (route) => {
    console.log(route.request().resourceType());
    console.log(route.request().url());

    if (route.request().resourceType() === "image") {
      return route.abort();
    }
    return route.continue();
  });

  await page.goto("https://www.etsy.com.au/");
});
