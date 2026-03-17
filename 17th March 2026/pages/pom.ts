import { Locator, Page, expect } from '@playwright/test';

class AmazonJobs {
    careersLink: Locator;
    country: Locator;
    state: Locator;
    city: Locator;
    employmentType: Locator;
    category: Locator;
    careerArea: Locator;
    team: Locator;
    roleType: Locator;
    secondJobOption: Locator;
    applyBtn: Locator;
    studentOpportunity: Locator;
    findOpenUniversityRoles: Locator;

    constructor(page: Page) {
        this.careersLink = page.getByText('Careers');
        this.country = page.getByText('United States');
        this.state = page.getByText('Washington');
        this.city = page.getByRole('checkbox', { name: 'Seattle (38)' });
        this.employmentType = page.locator('//*[@id="search"]/div/div[1]/div/fieldset[4]/div/div[2]/div/div[2]/ul/li[2]/label/span/div');
        this.category = page.getByRole('checkbox', { name: 'Software Development (4)' });
        this.careerArea = page.getByText("Corporate");
        this.team = page.getByRole('checkbox', { name: 'Internships for students (4)' })
        this.roleType = page.getByRole('checkbox', { name: 'Individual contributor (4)' });
        this.secondJobOption = page.getByRole('link', { name: 'IT Application Analyst Intern' });
        this.applyBtn = page.getByRole('checkbox', { name: 'Software Development (4)' });
        this.studentOpportunity = page.locator('//a[text()="Find your role"]').first();
        this.findOpenUniversityRoles = page.getByText('Find open university roles');
    }

    async goToCareersPage() {
        await this.careersLink.waitFor({ state: "visible" });
        await this.careersLink.click();
        await this.studentOpportunity.waitFor({ state: "visible" });
        await this.studentOpportunity.click();
        await this.findOpenUniversityRoles.waitFor({ state: "visible" });
        await this.findOpenUniversityRoles.click();
    }

    async filterJobs() {
        await this.country.waitFor({ state: "visible" });
        await this.country.click();
        await this.state.waitFor({ state: "visible" });
        await this.state.click();
        await this.city.waitFor({ state: "visible" });
        await this.city.click();
        await this.employmentType.waitFor({ state: "visible" });
        await this.employmentType.click();
        await this.category.waitFor({ state: "visible" });
        await this.category.click();
        await this.careerArea.waitFor({ state: "visible" });
        await this.careerArea.click();
        await this.team.waitFor({ state: "visible" });
        await this.team.click();
        await this.roleType.waitFor({ state: "visible" });
        await this.roleType.click();
    }

    async chooseJob(page: Page) {
        await this.secondJobOption.waitFor({ state: "visible" });
        const [page2] = await Promise.all([
            page.waitForEvent('popup'),
            this.secondJobOption.click()
        ]);
        await page2.waitForLoadState("domcontentloaded");
        return page2;
    }

    async apply(newPage: Page) {
        const applyBtn = newPage.locator('//div[@class="apply"]//a');
        await applyBtn.waitFor({ state: "visible" });
        await applyBtn.click();
    }
}
export default AmazonJobs;