import { Page, expect } from "@playwright/test";

export class customerpage {
    constructor(private page: Page) { }


    async customerLogin() {
        await this.page.getByRole('button', { name: 'Customer Login' }).click();
    }

    async selectCustomer() {
        await this.page.locator('#userSelect').selectOption({ label: 'Narendra Modi' });
        await this.page.getByRole('button', { name: 'Login' }).click();
    }

}