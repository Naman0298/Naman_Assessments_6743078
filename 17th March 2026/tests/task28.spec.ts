import { test } from '@playwright/test';
import AmazonJobs from '../pages/pom';

test('day22 task1', async ({ page }) => {
  const amazonJobs = new AmazonJobs(page);
  await page.goto("https://www.amazon.in", { waitUntil: "domcontentloaded" });
  await amazonJobs.goToCareersPage();
  await amazonJobs.filterJobs();
  const page2 = await amazonJobs.chooseJob(page);
  await page.screenshot({ path: 'screenshot/task28.png', fullPage: true });
  await amazonJobs.apply(page2);
  await page.waitForTimeout(3000);
});