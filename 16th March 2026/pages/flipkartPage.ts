import { Page, Locator, expect } from "@playwright/test";

export class FlipkartPage {

    page: Page;
    closeBtn: Locator;
    homeBtn: Locator;
    firstBanner: Locator;
    secondBanner: Locator;
    products: Locator;
    cartBtn: Locator;
    placeOrder: Locator;

    constructor(page: Page) {
        this.page = page;
        this.closeBtn = page.getByRole('button', { name: '✕' });
        this.homeBtn = page.locator('//div[text()="Home"]');
        this.firstBanner = page.locator('img[srcset*="88e557198b04f01c"]');
        this.secondBanner = page.locator('img[srcset*="f63af45677b331e7"]');
        this.products = page.locator('div.RGLWAk');
        this.cartBtn = page.locator('//span[text()="Cart"]');
        this.placeOrder = page.locator('//span[text()="Place Order"]');
    }

    async openWebsite() {
        await this.page.goto("https://www.flipkart.com");
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForTimeout(3000);
    }

    async closeLoginPopup() {
        const closeBtn = this.page.getByRole('button', { name: '✕' });
        if (await closeBtn.isVisible()) {
            await closeBtn.click();
        }
    }

    async clickHome() {
        await expect(this.homeBtn).toBeVisible();
        await this.homeBtn.click();
    }

    async scrollPage() {
        await this.page.mouse.wheel(0, 2000);
    }

    async openBanners() {
        await this.firstBanner.waitFor({ state: "visible" });
        await this.firstBanner.click();
        await this.secondBanner.waitFor({ state: "visible" });
        await this.secondBanner.click();
    }

    async addProductToCart(index: number) {
        await this.products.first().waitFor({ state: "visible" });
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.products.nth(index).click()
        ]);
        await newPage.waitForLoadState("domcontentloaded");
        const addToCartBtn = newPage.locator('//div[text()="Add to cart"]');
        await addToCartBtn.waitFor({ state: "visible" });
        await addToCartBtn.click();
        await newPage.close();
    }

    async openCart() {
        await this.cartBtn.waitFor({ state: "visible" });
        await this.cartBtn.click();
    }

    async increaseQuantity() {
        const buttons = this.page.locator('button.YRzP7Q');
        await buttons.first().waitFor({ state: "visible" });
        await buttons.nth(1).click();
        await buttons.nth(1).click();
        await buttons.nth(3).click();
        await buttons.nth(3).click();
        await buttons.nth(3).click();
    }

    async placeOrderClick() {
        await this.placeOrder.waitFor({ state: "visible" });
        await this.placeOrder.click();
    }
}