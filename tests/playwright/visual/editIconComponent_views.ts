import { test } from '../fixtures/base_fixtures';
import { argosComponentScreenshot } from '../support/utils/argosSmartScreenShot';

test.describe('EditIcon Component - visual test', () => {

  test('EditIcon Component', async ({ page, onApplicationURLs }) => {
    await onApplicationURLs.navigateToTablesAndDataPage();

    await page.waitForSelector('ng2-st-tbody-edit-delete a.ng2-smart-action-edit-edit', {
      state: 'visible',
});

    const editIcon = page.locator(
      'ng2-st-tbody-edit-delete a.ng2-smart-action-edit-edit i.nb-edit').first();

    await argosComponentScreenshot({
      page,
      snapshotName: 'EditIcon component',
      selector: editIcon,
    });
  });

  test('EditIcon Component - hover state', async ({ page, onApplicationURLs }) => {
    await onApplicationURLs.navigateToTablesAndDataPage();

    await page.waitForSelector('ng2-st-tbody-edit-delete a.ng2-smart-action-edit-edit', {
      state: 'visible',
    });

    const editIconLink = page.locator(
      'ng2-st-tbody-edit-delete a.ng2-smart-action-edit-edit').first();

    await editIconLink.hover();

    await argosComponentScreenshot({
      page,
      snapshotName: 'EditIcon component - hover',
      selector: editIconLink,
    });
  });

});