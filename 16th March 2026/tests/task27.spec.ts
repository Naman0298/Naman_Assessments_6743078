import { test } from "@playwright/test";
import { FlipkartPage } from "../pages/flipkartPage.ts";

test("Flipkart Gudi Padwa shopping", async ({ page }) => {

  const flipkart = new FlipkartPage(page);

  await flipkart.openWebsite();

  await flipkart.closeLoginPopup();

  await flipkart.clickHome();

  await flipkart.scrollPage();

  await flipkart.openBanners();

  await flipkart.addProductToCart(4);

  await flipkart.addProductToCart(7);

  await flipkart.openCart();

  await flipkart.increaseQuantity();

  await flipkart.placeOrderClick();

  await page.screenshot({ path: 'screenshot/task27.png', fullPage: true });

  await page.waitForTimeout(5000);

});