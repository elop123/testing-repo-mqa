import { Locator, Page, expect } from '@playwright/test';
import { BaseFormComponent } from './BaseFormComponent';


export class HorizontalFormComponent extends BaseFormComponent {
  readonly horizontalEmailInput: Locator;
  readonly horizontalPasswordInput: Locator;
  readonly horizontalRememberMeCheckbox: Locator;
  readonly horizontalSubmitButton: Locator;

  constructor(page: Page) {
    super(page, 'horizontal-form-card');
    this.horizontalEmailInput = this.card.getByTestId('email-input');
    this.horizontalPasswordInput = this.card.getByTestId('password-input');
    this.horizontalRememberMeCheckbox = this.card.getByTestId('remember-me-checkbox').locator('input[type="checkbox"]');

  }

  async fillEmail(value: string) {
    await this.horizontalEmailInput.fill(value);
  }

  async fillPassword(value: string) {
    await this.horizontalPasswordInput.fill(value);
  }

  async toggleRememberMe() {
    await expect(this.horizontalRememberMeCheckbox).not.toBeChecked();
    await this.horizontalRememberMeCheckbox.check({ force: true });
    await expect(this.horizontalRememberMeCheckbox).toBeChecked();
  }

 
}
