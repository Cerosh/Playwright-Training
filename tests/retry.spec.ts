import { test, expect } from "@playwright/test";

test.describe(() => {
  test.describe.configure({ retries: 2 });
  test("Retry demonstration", async ({}, testInfo) => {
    if (testInfo.retry) console.log("Executed through retry");

    expect(true).toBeFalsy();
  });
});
