import { test, expect } from '@playwright/test';

test('Login scenario using getBy methods', async ({ page }) => {

  await page.setDefaultTimeout(20000);

  const response = await page.goto('https://demoapps.qspiders.com/ui?scenario=1');

  await page.getByLabel('name').fill('Naman');
  await page.getByLabel('email').fill('naman0298@gmail.com');
  await page.getByLabel('password').fill('Password');
  await page.getByRole('button', { name: /Register/i }).click();

  await expect(page).toHaveTitle(/Qspiders/i);
  await expect(page).toHaveURL(/login|home/);

  await expect(
    page.getByRole('button', { name: /login/i })
  ).toBeVisible();
  await page.screenshot({ path: 'screenshot/task11.png' });

});