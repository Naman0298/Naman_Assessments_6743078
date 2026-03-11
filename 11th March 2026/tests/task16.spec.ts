import { test, expect } from "@playwright/test";
test("Select sorting option and add product to cart", async ({ page }) => {

    await page.goto("https://www.saucedemo.com");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();
    await expect(page).toHaveURL(/inventory/);
    const sortDropdown = page.locator(".product_sort_container");
    await sortDropdown.selectOption("lohi");
    await expect(sortDropdown).toHaveValue("lohi");
    const firstAddToCart = page.locator(".inventory_item button").first();
    await firstAddToCart.click();
    await expect(firstAddToCart).toHaveText("Remove");
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
    await page.screenshot({ path: 'screenshot/task16.png', fullPage: true });

});