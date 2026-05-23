import {test} from '../fixtures/base_fixtures';
import {argosComponentScreenshot} from '../support/utils/argosSmartScreenShot';

test.describe('Extra Components- visual test', () => {
    
test('Calendar Component', async({page, onApplicationURLs}) => {
await onApplicationURLs.navigateToCalendarPage();
await argosComponentScreenshot({ 
    page, 
    snapshotName: 'Calendar component',
    selector: page.locator('nb-calendar').first() });
});
});