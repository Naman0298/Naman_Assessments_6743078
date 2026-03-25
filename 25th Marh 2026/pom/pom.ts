import { Page, expect } from "@playwright/test";

export class accountpage {
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

    async customerLogin() {
        await this.page.getByRole('button', { name: 'Customer Login' }).click();
    }

    async selectCustomer() {
        await this.page.locator('#userSelect').selectOption({ label: 'Narendra Modi' });
        await this.page.getByRole('button', { name: 'Login' }).click();
    }

    async deposit(data: any) {
        await this.page.getByRole('button', { name: 'Deposit' }).click();
        await this.page.getByPlaceholder('amount').fill(data.deposit);
        await this.page.getByRole('button', { name: 'Deposit' }).last().click();
    }

    async depositSuccess() {
        await expect(this.page.getByText('Deposit Successful')).toBeVisible();
    }

    async withdrawal(data: any) {
        await expect(this.page.getByRole('button', { name: 'Withdrawl' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Withdrawl' }).click()
        await expect(this.page.locator('input[type="number"]')).toBeVisible();
        await this.page.locator('input[type="number"]').fill(data.withdrawal);
        await expect(this.page.getByRole('button', { name: 'Withdraw' }).last()).toBeVisible();
        await this.page.getByRole('button', { name: 'Withdraw' }).last().click();
    }

    async withdrawalSuccess() {
        await expect(this.page.getByText('Transaction successful')).toBeVisible();
    }

    async balanceValidate(data: any) {
        const balance = data.deposit - data.withdrawal;
        const bal = this.page.locator('strong.ng-binding').nth(1);
        await expect(bal).toHaveText(balance.toString());
    }

    async logout() {
        await this.page.getByRole('button', { name: 'Logout' }).click();
    }
}