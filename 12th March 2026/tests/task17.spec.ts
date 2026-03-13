import { test, expect } from "@playwright/test";

test("task 17", async ({ page }) => {
  await page.goto("https://www.amazon.in");
  let search = page.locator("input#twotabsearchtextbox");
  await search.fill("samsung mobile");
  await search.press("Enter");
  let firstProduct = page.locator("//img[@class='s-image']").first();

  let [page2] = await Promise.all([page.waitForEvent("popup"), firstProduct.click()]);
  let productName = await page2.locator('//span[@id="productTitle"]');
  await expect(productName).toBeVisible();
  console.log(await productName.textContent());
  await page.screenshot({ path: 'screenshot/task17.png', fullPage: true });

  await page2.close();
});