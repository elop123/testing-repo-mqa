import { BaseFormComponent } from './BaseFormComponent';
import { Locator, Page, expect } from '@playwright/test';


export class FormWithoutLabelsComponent extends BaseFormComponent {
  readonly recipientInput: Locator;
  readonly subjectInput: Locator;
  readonly textareaInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page, 'form-without-labels-card');
    this.recipientInput = this.card.getByTestId('recipient-input');
    this.subjectInput = this.card.getByTestId('subject-input');
    this.textareaInput = this.card.getByTestId('textarea-input');
    this.submitButton = this.card.getByTestId('submit-btn');
   
  }

  async fillRecipient(value: string) {
    await this.recipientInput.fill(value);
  }

  async fillSubject(value: string) {
    await this.subjectInput.fill(value);
  }

    async fillTextarea(value: string) { 
    await this.textareaInput.fill(value);
}
}