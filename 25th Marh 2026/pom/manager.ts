import { Page, expect } from "@playwright/test";

export class managerpage {
    constructor(private page: Page) { }


    async navigate(data: any) {
        await this.page.goto(data.website);
    }

    async managerLogin() {
        await this.page.getByRole('button', { name: 'Bank Manager Login' }).click();
    }

    async addCustomer() {
        await this.page.getByRole('button', { name: 'Add Customer' }).click();
    }

    async customerCreation(data: any) {
        await this.page.getByPlaceholder('First Name').fill(data.first_name);
        await this.page.getByPlaceholder('Last Name').fill(data.last_name);
        await this.page.getByPlaceholder('Post Code').fill(data.post_code);
        await this.page.getByRole('button', { name: 'Add Customer' }).last().click();
    }

    async openAccount() {
        await this.page.getByRole('button', { name: 'Bank Manager Login' }).click();
        await this.page.getByRole('button', { name: 'Open Account' }).click();
        await this.page.locator('#userSelect').selectOption({ label: 'Narendra Modi' });
        await this.page.locator('#currency').selectOption({ label: 'Rupee' });
        await this.page.getByRole('button', { name: 'Process' }).click();
    }

    async home() {
        await this.page.getByRole('button', { name: 'Home' }).click();
    }


}