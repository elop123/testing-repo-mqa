import { test, expect } from '@playwright/test';

test.describe('Form Layouts page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
  });

//ex.1.
  test('pressSequentially - action', async ({ page }) => {
    const basicForm = page.locator('nb-card', { hasText: 'Basic form' });
    const emailInput = basicForm.getByRole('textbox', { name: 'Email' });

    await emailInput.pressSequentially('john@test.com', { delay: 50 });
    await emailInput.press('Tab');

    const typeAttribute = await emailInput.getAttribute('type');
    expect(typeAttribute).toBe('email');

    await expect(emailInput).toHaveValue('john@test.com');
    await expect(emailInput).not.toBeFocused();
  });

//ex.2.
test('radio-group - action', async ({ page }) => {
  const usingTheGrid = page.locator('nb-card', {hasText: 'Using the Grid'});
  const firstOption = usingTheGrid.getByRole('radio', {name: 'Option 1'});
  const secondOption = usingTheGrid.getByRole('radio', {name: 'Option 2'});
  const disabledOption = usingTheGrid.getByRole('radio', {name: 'Disabled Option'});
  
await firstOption.check({ force: true });
await expect(firstOption).toBeChecked();
await expect(secondOption).not.toBeChecked();
await expect(disabledOption).toBeDisabled();

await secondOption.check({ force: true }); 
await expect(secondOption).toBeChecked();
await expect(firstOption).not.toBeChecked();
await expect(disabledOption).not.toBeChecked();
await expect(disabledOption).toBeDisabled();
 
});
});