import { Page, expect } from "@playwright/test"

export class UploadPage {

    constructor(private page: Page) { }

    async goto() {
        await this.page.goto("https://the-internet.herokuapp.com/upload")
    }

    async uploadFile(filePath: string) {
        await this.page.setInputFiles("#file-upload", filePath)
    }

    async clickUpload() {
        await this.page.locator("#file-submit").click()
    }

    async verifyUploadedFile(expectedFile: string) {
        await expect(this.page.locator("#uploaded-files")).toHaveText(expectedFile)
    }

}