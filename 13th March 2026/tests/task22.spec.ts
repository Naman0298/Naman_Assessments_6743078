import { test, expect } from '@playwright/test';

test('Verify file upload', async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/upload");
    await page.locator('#file-upload').setInputFiles('testdata/sampleFile.txt');
    await page.locator('#file-submit').click();
    await expect(page.locator('#uploaded-files')).toHaveText('sampleFile.txt');
    await page.screenshot({ path: 'screenshot/task21.png', fullPage: true });

});