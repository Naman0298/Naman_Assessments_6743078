import { test, expect } from '@playwright/test';

test('Flipkart women shoes search', async ({ page }) => {

  await page.goto('https://www.flipkart.com');

  await expect(page).toHaveTitle(/Online/i);

  await page.waitForTimeout(3000);

  const closeBtn = page.getByRole('button', { name: '✕' });
  if (await closeBtn.isVisible()) {
    await closeBtn.click();
  }

  await page.getByPlaceholder('Search for Products, Brands and More').first().fill('shoes');
  await page.keyboard.press('Enter');

  await page.waitForTimeout(3000);

  const womenItems = page.locator('//a[contains(text(),"Women")]');

  await expect(womenItems.first()).toBeVisible();

  const count = await womenItems.count();
  expect(count).toBeGreaterThan(0);

  await expect(page).toHaveScreenshot('women-shoes-results.png', {
    animations: 'disabled',
    maxDiffPixels: 40000
  });
await page.screenshot({path:'screenshot/task12.png'});
});