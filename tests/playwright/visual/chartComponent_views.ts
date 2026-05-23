import { test } from '../fixtures/base_fixtures';
import {argosComponentScreenshot,argosFullScreenshot,} from '../support/utils/argosSmartScreenShot';

test.describe('Chart Component-visual test', () => {
test('Chart Component', async({page, onApplicationURLs}) => {
await onApplicationURLs.navigateToChartsPage();

const pieChart =page.locator('nb-card', { hasText: 'Pie' });
await pieChart.waitFor({ state: 'visible' });

await argosComponentScreenshot({ 
    page, 
    snapshotName: 'Chart component',
    selector: pieChart });
 });
});