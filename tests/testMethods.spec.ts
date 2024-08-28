/* eslint-disable no-console */
/* eslint-disable playwright/expect-expect */
import { test } from "@playwright/test";

test.beforeAll(async () => {
  console.log("Before tests");
});

test.beforeEach(async ({}) => {
  console.log(`Running ${test.info().title}`);
});

test.describe(
  "two annotated tests- Smoke",
  {
    tag: "@smoke",
    annotation: {
      type: "issue",
      description: "https://github.com/microsoft/playwright/issues/23180",
    },
  },
  () => {
    test("with Step", async ({}) => {
      await test.step("Step 1: Log in", async () => {
        console.log("Login step executed");
      });
      await test.step("Step 2: Home Page", async () => {
        console.log("Home Page Action");
      });
      await test.step("Step 3: Navigate", async () => {
        console.log("Navigate to functionality A");
      });
    });

    test.skip("Skipped Test", async ({}) => {
      console.log("Skipped test code");
    });

    test("with Slow", async ({}) => {
      test.slow();
      console.log("Test executed with slow tag");
    });

    test.fail("Failing Test", async ({}) => {
      console.log("Failing test code");
    });
  },
);

test.describe(
  "two annotated tests-sanity",
  {
    tag: "@Regression",
    annotation: {
      type: "issue",
      description: "https://github.com/microsoft/playwright/issues/23180",
    },
  },
  () => {
    test("with Step", async ({}) => {
      await test.step("Step 1: Log in", async () => {
        console.log("Login step executed");
      });
    });

    test.skip("Skipped Test", async ({}) => {
      console.log("Skipped test code");
    });

    test("with Slow", async ({}) => {
      test.slow();
      console.log("Test executed with slow tag");
    });

    test.fail("Failing Test", async ({}) => {
      console.log("Failing test code");
    });
  },
);

test.afterEach(async ({ page }) => {
  console.log(
    `Finished ${test.info().title} with status ${test.info().status}`,
  );

  if (test.info().status !== test.info().expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});

test.afterAll("Teardown", async () => {
  console.log("Done with tests");
});
