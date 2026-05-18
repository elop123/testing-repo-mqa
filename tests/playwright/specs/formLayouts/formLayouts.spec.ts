import { test } from '../../fixtures/base_fixtures';
import { expect } from '@playwright/test';
import { BasicFormComponent } from '../../support/components/forms/BasicFormComponent';
import { UsingGridComponent } from '../../support/components/forms/UsingGridComponent';
import { InlineFormComponent } from '../../support/components/forms/InlineFormComponent';
import { ApplicationURLs } from '../../support/main/ApplicationURLs';

test.describe('Form Layouts page', () => {
  test('user should be able to complete the basic form and submit it', async ({
    onApplicationURLs,
    onBasicForm,
  }) => {
    const testEmail = 'test@test.com';
    const testPassword = 'password';

    await test.step('Navigate to the form layouts page', async () => {
      await onApplicationURLs.navigateToFormsLayouts();
    });

    await test.step('Complete the basic form', async () => {
      await onBasicForm.assertVisibility(true);
      await onBasicForm.fillEmail(testEmail);
      await onBasicForm.fillPassword(testPassword);
    });

    await test.step("Check the 'Check me out' checkbox", async () => {
      await onBasicForm.toggleCheckMeOut();
    });

    await test.step('Submit the form', async () => {
      await onBasicForm.submit();
    });
  });

  test('user should be able to complete the grid form and submit it', async ({
    onApplicationURLs,
    onGridForm,
  }) => {
    const testEmail = 'test@test.com';
    const testPassword = 'password';

    await test.step('Navigate to the form layouts page', async () => {
      await onApplicationURLs.navigateToFormsLayouts();
    });

    await test.step('Complete the grid form', async () => {
      await onGridForm.assertVisibility(true);
      await onGridForm.fillEmail(testEmail);
      await onGridForm.fillPassword(testPassword);
      await onGridForm.selectOption('option2');
    });

    await test.step('Submit the form', async () => {
      await onGridForm.submit();
    });
  });

  test('user should be able to complete the inline form and submit it', async ({
    onApplicationURLs,
    onInlineForm,
  }) => {
    const testName = 'Jane Doe';
    const testEmail = 'test@test.com';

    await test.step('Navigate to the form layouts page', async () => {
      await onApplicationURLs.navigateToFormsLayouts();
    });

    await test.step('Complete the inline form', async () => {
      await onInlineForm.assertVisibility(true);
      await onInlineForm.fillName(testName);
      await onInlineForm.fillEmail(testEmail);
    });

    await test.step('Toggle the "Remember me" checkbox', async () => {
      await onInlineForm.toggleRememberMe();
    });

    await test.step('Submit the form', async () => {
      await onInlineForm.submit();
    });
  });
});
