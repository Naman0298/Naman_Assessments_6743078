import { test, expect } from '@playwright/test';

test('Lenskart Store Locator Hover and Locate Bangalore', async ({ page, context }) => {

    await page.goto('https://www.lenskart.com/');

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator('//a[text()="Store Locator"]').click()
    ]);

    const searchBox = newPage.locator('input[placeholder="Search by State/Pincode/Locality"]');
    await searchBox.waitFor({ state: 'visible' });

    await searchBox.fill('Bangalore');

    const bangaloreOption = newPage.locator('//div[contains(text(),"Bangalore")]').first();
    await bangaloreOption.click();

    await newPage.screenshot({ path: 'screenshot/task14.png', fullPage: true });

});