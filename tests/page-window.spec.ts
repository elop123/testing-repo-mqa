import { test, expect } from '@playwright/test';

test.describe('Modal & Overlays', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Window').click();
  });

  test('open and close modal', async ({ page }) => {
    const openModalButton = page.getByRole('button', { name: 'OPEN WINDOW FORM' });
  
    const modal = page.locator('nb-window');
    await test.step('open modal', async () =>{
    await openModalButton.click();
    });

    await test.step('verify modal is visible', async () => {
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Window');
    });

    await test.step('close modal', async () => {
    await modal.locator('nb-icon[icon="close-outline"]').click();
    });

    await test.step('verify modal is closed', async () => {
    await expect(modal).not.toBeVisible();
  });
  });
});

