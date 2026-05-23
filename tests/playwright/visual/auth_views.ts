import {test} from '../fixtures/base_fixtures';
import {argosComponentScreenshot, argosFullScreenshot} from '../support/utils/argosSmartScreenShot';

test.describe('Auth pages- visual test', () => {
    
test('Login page', async({page, onApplicationURLs}) => {
await onApplicationURLs.navigateToLoginPage();
await argosFullScreenshot({page, snapshotName: 'auth/login', 
});
});

test.describe('Register page', () => {
test('Register page', async({page, onApplicationURLs}) => {
await onApplicationURLs.navigateToRegisterPage();
await argosFullScreenshot({page, snapshotName: 'auth/register',
});
});   
});

test.describe('Request password page', () => {
test('Request password page', async({page, onApplicationURLs}) => {
await onApplicationURLs.navigateToRequestPasswordPage();
await argosFullScreenshot({page, snapshotName: 'auth/request-password',
});
});
});

test.describe('Reset password page', ()=>{
    test('Reset password page',async ({page, onApplicationURLs}) => {
    await onApplicationURLs.navigateToResetPasswordPage();
    await argosFullScreenshot({page, snapshotName: 'auth/reset-password', 
    });
});
});
});