import { test } from '../fixtures/base_fixtures';
import {
  argosComponentScreenshot,
  argosFullScreenshot,
} from '../support/utils/argosSmartScreenShot';

test.describe('Form Layouts', () => {
  test('Form Layouts - full page view', async ({ page, onApplicationURLs }) => {
    await onApplicationURLs.navigateToFormsLayouts();

    await argosFullScreenshot({ page, snapshotName: 'Form Layouts - full page view' });
  });

  test('Form Layouts - Inline Form block', async ({ page, onApplicationURLs, onInlineForm }) => {
    await onApplicationURLs.navigateToFormsLayouts();
    await onInlineForm.assertVisibility(true);

    await argosComponentScreenshot({
      page,
      snapshotName: 'Form Layouts - Inline Form block',
      selector: onInlineForm.card,
    });
  });
});