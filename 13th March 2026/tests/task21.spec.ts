import { test, expect } from '@playwright/test';
import path from 'path';

test('Upload profile image', async ({ page }) => {

    await page.goto("https://demoqa.com/upload-download");

    const downloadPromise = page.waitForEvent('download');
    await page.locator("#downloadButton").click();
    const download = await downloadPromise;

    const filePath = path.join(__dirname, 'downloadedFile.jpeg');
    await download.saveAs(filePath);

    await page.locator("#uploadFile").setInputFiles(filePath);
    await expect(page.locator("#uploadedFilePath"))
        .toContainText("downloadedFile.jpeg");

    await page.screenshot({ path: 'screenshot/task21.png', fullPage: true });


});