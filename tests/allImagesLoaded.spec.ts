import { Locator, test } from "@playwright/test";

test.describe("Test to find the broken images in the page", () => {
  const brokenImages = [];
  const isImageBroken = async (imageElement: Locator) => {
    const naturalWidth = await imageElement.evaluate(
      (img: HTMLImageElement) => img.naturalWidth,
    );
    if (naturalWidth === 0) {
      await brokenImage(imageElement);
    } else {
      await imageNotBroken();
    }
  };
  const isAllImagesBroken = async (imageElements) => {
    for (const image of imageElements) {
      await isImageBroken(image);
    }
    if (brokenImages.length) {
      console.log(
        `${brokenImages.length} broken images found. ${brokenImages.join(", ")}`,
      );
    }
  };
  const brokenImage = async (imageElement: Locator) => {
    console.log("The image is broken");
    const src = await imageElement.evaluate((img: HTMLImageElement) => img.src);
    brokenImages.push(src);
  };
  const imageNotBroken = async () => {
    console.log(`The Image is not broken`);
  };
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/broken_images");
  });
  test("Test for image that is not broken", async ({ page }) => {
    const imageElement = page.locator("img").nth(3);
    await isImageBroken(imageElement);
  });
  test("Test for broken image", async ({ page }) => {
    const imageElement = page.getByRole("img").nth(2);
    await isImageBroken(imageElement);
  });
  test("Test for all broken images in a page", async ({ page }) => {
    const imageElements = await page.getByRole("img").all();
    await isAllImagesBroken(imageElements);
  });
});
