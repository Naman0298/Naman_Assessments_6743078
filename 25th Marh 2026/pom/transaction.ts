import { Page, expect } from "@playwright/test";

export class transactionpage {
    constructor(private page: Page) { }

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
        // await this.page.waitForTimeout(1000);
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
        await this.page.waitForTimeout(1000);
    }
}