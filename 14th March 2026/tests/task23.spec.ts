import { test, expect } from '@playwright/test';
import data from '../testdata/products.json';

test('Product Search → Product Details Validation', async ({ page }) => {
  // Amazon often has captchas or is slow.
  test.setTimeout(180000); // 3 minutes total

  // 1-Launch the browser and open the homepage.
  await page.goto('https://www.amazon.in');

  // Handle potential captcha on homepage
  if (await page.locator('#captchacharacters').isVisible({ timeout: 2000 })) {
    console.log("Captcha detected on homepage! Please solve it manually. Waiting 30s...");
    await page.waitForTimeout(30000);
  }

  // 2-Read product names from a JSON file.
  for (const product of data.products) {
    // 3-Enter the first product name in the search field.
    await page.fill('#twotabsearchtextbox', product);
    
    // 4-Click the Search button (or press Enter).
    await page.press('#twotabsearchtextbox', 'Enter');

    // 5-Wait until the search results page loads.
    await page.waitForLoadState('domcontentloaded');

    // Check for captcha again
    if (await page.locator('#captchacharacters').isVisible({ timeout: 2000 })) {
      console.log("Captcha detected after search! Please solve it manually. Waiting 30s...");
      await page.waitForTimeout(30000);
    }

    // Wait for the search results to be present
    const searchResultLocator = page.locator('[data-component-type="s-search-result"] h2 a');
    await searchResultLocator.first().waitFor({ state: 'visible', timeout: 30000 });

    const firstProduct = searchResultLocator.first();

    // 6-Capture the title of the first product displayed in the results.
    const firstProductTitle = await firstProduct.textContent();
    console.log(`\nSearch Result Title: ${firstProductTitle?.trim()}`);

    // 7-Click the first product in the search results.
    // 8-Switch to the newly opened tab containing the product details page
    const [productPage] = await Promise.all([
      page.context().waitForEvent('page'),
      firstProduct.click()
    ]);

    await productPage.waitForLoadState('domcontentloaded');

    // Handle captcha on product page if any
    if (await productPage.locator('#captchacharacters').isVisible({ timeout: 2000 })) {
      console.log("Captcha detected on product page! Please solve it manually. Waiting 30s...");
      await productPage.waitForTimeout(30000);
    }

    // 9-Verify the following details: Product title, Product price, Product rating
    const productTitleLocator = productPage.locator('#productTitle');
    await productTitleLocator.waitFor({ state: 'visible', timeout: 30000 });
    const productTitle = await productTitleLocator.textContent();
    expect(productTitle).toBeTruthy();

    const priceLocator = productPage.locator('.a-price-whole').first();
    const productPrice = await priceLocator.textContent();
    expect(productPrice).toBeTruthy();

    const ratingLocator = productPage.locator('#acrPopover, span[data-hook="rating-out-of-text"]').first();
    const rating = await ratingLocator.textContent();
    expect(rating).toBeTruthy();

    console.log(`Product details page title: ${productTitle?.trim()}`);
    console.log(`Product Price: ₹${productPrice?.trim()}`);
    console.log(`Product Rating: ${rating?.trim()}`);

    // 10-Close the product tab and return to the search results page.
    await productPage.close();

    // Clear the search field for the next iteration
    await page.fill('#twotabsearchtextbox', '');
    
    // 11-Repeat the same workflow for all products listed in the JSON file. (handled by loop)
  }
});