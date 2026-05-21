import {test} from '../fixtures/base_fixtures';
import { argosComponentScreenshot, argosFullScreenshot } from '../support/utils/argosSmartScreenshot';


test.describe('Form Layouts', () => {
  test('Form Layouts',async ({page, onApplicationURLs}) => {
    await onApplicationURLs.navigateToFormsLayouts();
    await argosFullScreenshot({page, snapshotName: 'Form Layouts-full page'});
  });

test.describe('Form Layouts - Inline Form', () => {
  test('Form Layouts - Inline Form',async ({page, onApplicationURLs, onInlineForm}) => {
    await onApplicationURLs.navigateToFormsLayouts();
    await onInlineForm.assertVisibility(true);

    await argosComponentScreenshot({
        page, 
        snapshotName: 'Form Layouts - Inline Form',
        selector: onInlineForm.card
    });
  });
});
});