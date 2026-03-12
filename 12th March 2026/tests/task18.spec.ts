import { test, expect } from '@playwright/test';
test('Handle notification popup', async ({ browser }) => {

    const context = await browser.newContext({
        permissions: ['notifications']
    });

    const page = await context.newPage();
    await page.goto("https://www.justdial.com");
    const maybeLater = page.locator("text=Maybe Later");

    if (await maybeLater.isVisible()) {
        await maybeLater.click();
    }

    const searchBox = page.locator('input[placeholder*="Search"]');
    await searchBox.fill("Restaurants");
    await page.keyboard.press("Enter");

    await expect(page).toHaveURL(/Restaurants/i);
    await page.screenshot({ path: 'screenshot/task18.png', fullPage: true });


});