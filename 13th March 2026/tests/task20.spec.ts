import { test, expect } from '@playwright/test';
import ExcelJS from 'exceljs';

test('Register multiple users using Excel', async ({ page }) => {

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile("testdata/students.xlsx");

  const sheet = workbook.getWorksheet(1);

  for (let i = 2; i <= sheet.rowCount; i++) {

    const firstName = sheet.getRow(i).getCell(1).toString();
    const lastName = sheet.getRow(i).getCell(2).toString();
    const email = sheet.getRow(i).getCell(3).toString();
    const mobile = sheet.getRow(i).getCell(4).toString();

    await page.goto("https://demoqa.com/automation-practice-form");

    await page.locator('#firstName').fill(firstName);
    await page.locator('#lastName').fill(lastName);
    await page.locator('#userEmail').fill(email);

    await page.locator('label[for="gender-radio-1"]').click();

    await page.locator('#userNumber').fill(mobile);

    await page.locator('#submit').click();

    await expect(page.locator('#example-modal-sizes-title-lg'))
      .toHaveText("Thanks for submitting the form");

    await page.locator('#closeLargeModal').click();

  }
  await page.screenshot({ path: 'screenshot/task20.png', fullPage: true });

});