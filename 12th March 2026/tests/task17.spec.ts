import { test, expect } from "@playwright/test";

test("Handle multiple browser tabs", async ({ page, context }) => {

  // open amazon
  await page.goto("https://www.amazon.in");

  // search product
  await page.getByPlaceholder("Search Amazon.in").fill("Samsung Mobile");
  await page.keyboard.press("Enter");
  await page.screenshot({ path: 'screenshot/task17.png', fullPage: true });

  // wait for search results
  await page.waitForSelector('[data-component-type="s-search-result"]');

  // store first product
  const firstProduct = page.locator('[data-component-type="s-search-result"]').first();

  // capture new tab
  const [newTab] = await Promise.all([
    context.waitForEvent("page"),
    firstProduct.click()
  ]);

  // wait for product page
  await newTab.waitForLoadState();

  // get product title
  const title = newTab.locator("#productTitle");

  console.log(await title.textContent());

  await expect(title).toBeVisible();

  await newTab.close();

  await page.bringToFront();

});