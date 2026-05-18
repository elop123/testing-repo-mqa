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
}