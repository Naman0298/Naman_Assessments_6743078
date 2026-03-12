import { test, expect } from "@playwright/test";

test("Handle JS Alert, Confirm, and Prompt", async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    // ALERT
    page.once("dialog", async dialog => {
        console.log(dialog.message());
        await dialog.accept();
    });

    await page.getByText("Click for JS Alert").click();

    await expect(page.locator("#result"))
        .toHaveText("You successfully clicked an alert");

    // CONFIRM
    page.once("dialog", async dialog => {
        console.log(dialog.message());
        await dialog.dismiss();
    });

    await page.getByText("Click for JS Confirm").click();

    await expect(page.locator("#result"))
        .toHaveText("You clicked: Cancel");

    // PROMPT
    page.once("dialog", async dialog => {
        console.log(dialog.message());
        await dialog.accept("Playwright Testing");
    });

    await page.getByText("Click for JS Prompt").click();

    await expect(page.locator("#result"))
        .toHaveText("You entered: Playwright Testing");
    await page.screenshot({ path: 'screenshot/task19.png', fullPage: true });

});