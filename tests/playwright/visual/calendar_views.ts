import {test} from '../fixtures/base_fixtures';
import {argosComponentScreenshot} from '../support/utils/argosSmartScreenShot';

test.describe('Extra Components- visual test', () => {
    
test('Calendar Component', async({page, onApplicationURLs}) => {
await onApplicationURLs.navigateToCalendarPage();
const calendarContainer = page.locator('calendar-container').first();
await argosComponentScreenshot({ page, snapshotName: 'extra-components/calendar-first',selector: calendarContainer });
});
});

