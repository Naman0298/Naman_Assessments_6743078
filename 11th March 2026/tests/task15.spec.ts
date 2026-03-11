import { test, expect } from "@playwright/test";
test("Validating Car Brand Dropdown Options", async ({ page }) => {

  await page.goto("https://www.automationtesting.co.uk/dropdown.html");
  const dropdownOptions = page.locator("#cars option");
  const actualOptions = await dropdownOptions.allTextContents();
  console.log("Actual Dropdown Options:", actualOptions);
  const expectedOptions = [
    "Audi",
    "BMW",
    "Ford",
    "Honda",
    "Jeep",
    "Mercedes",
    "Suzuki",
    "Volkswagen"
  ];
  await expect(dropdownOptions).toHaveCount(expectedOptions.length);
  expect(actualOptions).toEqual(expectedOptions);
  await page.screenshot({ path: 'screenshot/task15.png', fullPage: true });
});