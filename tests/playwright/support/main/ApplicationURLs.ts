import {Page} from 'playwright';
import { BasicFormComponent } from '../components/forms/BasicFormComponent';


export class ApplicationURLs {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToFormsLayouts() {
    await this.page.goto('/pages/forms/layouts', { waitUntil: 'domcontentloaded' });

    const basicForm = new BasicFormComponent(this.page);
    await basicForm.assertVisibility(true);
  }

  async navigateToLoginPage() {
    await this.page.goto('/auth/login', { waitUntil: 'domcontentloaded' });
  }

  async navigateToRegisterPage() {
    await this.page.goto('/auth/register', { waitUntil: 'domcontentloaded' });
  }

  async navigateToRequestPasswordPage() {
    await this.page.goto('/auth/request-password', { waitUntil: 'domcontentloaded' });
  }

  async navigateToResetPasswordPage() {
    await this.page.goto('/auth/reset-password', { waitUntil: 'domcontentloaded' });
  }

  async navigateToCalendarPage() {
    await this.page.goto('/pages/extra-components/calendar', { waitUntil: 'domcontentloaded' });
  }

  async navigateToTablesAndDataPage() {
    await this.page.goto('/pages/tables/smart-table', { waitUntil: 'domcontentloaded' });
  }

  async navigateToChartsPage() {
    await this.page.goto('/pages/charts/echarts', { waitUntil: 'domcontentloaded' });
  }

}