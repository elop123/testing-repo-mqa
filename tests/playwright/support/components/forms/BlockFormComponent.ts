import { Locator, Page, expect } from '@playwright/test';
import { BaseFormComponent } from './BaseFormComponent';


export class BlockFormComponent extends BaseFormComponent {
  readonly blockFirstNameInput: Locator;
  readonly blockLastNameInput: Locator;
  readonly blockEmailInput: Locator;
  readonly blockWebsiteInput: Locator;
  readonly blockSubmitButton: Locator;

  constructor(page: Page) {
    super(page, 'block-form-card');
    this.blockFirstNameInput = this.card.getByTestId('first-name-input');
    this.blockLastNameInput = this.card.getByTestId('last-name-input');
    this.blockEmailInput = this.card.getByTestId('email-input');
    this.blockWebsiteInput = this.card.getByTestId('website-input');
    this.blockSubmitButton = this.card.getByTestId('submit-btn');

  }

  async fillFirstName(value: string) {
    await this.blockFirstNameInput.fill(value);
  }

  async fillLastName(value: string) {
    await this.blockLastNameInput.fill(value);
  }
  async fillEmail(value: string) {
    await this.blockEmailInput.fill(value);
  }

    async fillWebsite(value: string) {
    await this.blockWebsiteInput.fill(value);

 
}}
