import { test, expect } from '@playwright/test';

test.describe('Hover effect on tooltip', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Tooltip').click();
  });

  test('test hover effect', async ({ page }) => {
    const topBtn = page.getByRole('button', { name: 'TOP' });
    await test.step('hover over the button', async () => {
    await topBtn.hover();

const rightBtn = page.getByRole('button', { name: 'RIGHT' });
await rightBtn.hover();

const bottomBtn = page.getByRole('button', { name: 'BOTTOM' });
await bottomBtn.hover();

const leftBtn = page.getByRole('button', { name: 'LEFT' });
await leftBtn.hover();
});
    const tooltip = page.locator('nb-card').filter({ hasText: 'Tooltip Placement' });
    await test.step('verify tooltip is visible', async () => {
    await expect(tooltip).toBeVisible();
    });
});
});