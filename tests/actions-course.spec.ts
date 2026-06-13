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

//ex3.

test('checkboxes- action', async ({ page }) => {
 
const checkboxes = [
  page.locator('nb-card').filter({ hasText: 'Inline form' }).getByRole('checkbox', { name: 'Remember me' }),
  page.locator('nb-card').filter({ hasText: 'Basic form' }).getByRole('checkbox', { name: 'Check me out' }),
  page.locator('nb-card').filter({ hasText: 'Horizontal form' }).getByRole('checkbox', { name: 'Remember me' })
];

await test.step('check all checkboxes', async () => {
for (const checkbox of checkboxes) {
await checkbox.check({ force: true });
await expect(checkbox).toBeChecked();
}
});

await test.step('setChecked on the middle one only', async () => {
await checkboxes[1].setChecked(false, { force: true });
await expect(checkboxes[0]).toBeChecked();
await expect(checkboxes[1]).not.toBeChecked();
await expect(checkboxes[2]).toBeChecked();
});

await test.step('toggle every checkbox', async () => {
  for (const checkbox of checkboxes) {
    const isChecked = await checkbox.isChecked();
    await checkbox.setChecked(!isChecked, { force: true });
  }
});

await test.step('uncheck all checkboxes', async () => {
  for (const checkbox of checkboxes) {
    await expect(checkbox).not.toBeChecked(); 
  }
});
});
});