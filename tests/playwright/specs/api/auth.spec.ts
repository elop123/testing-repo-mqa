import { APIResponse } from '@playwright/test';
import { expect, test } from '../../fixtures/api_fixtures';
import { buildRegisterPayload } from '../../support/api/builders/payloads';

test.describe('Auth API', () => {
    test('should register a new user', async ({ unauthedAuthClient }) => {
        const payload = buildRegisterPayload(); 
        let response!: APIResponse;

        await test.step('call POST /auth/register', async () => { 
            response = await unauthedAuthClient.register(payload);
        });

        await test.step('assert status 201 with a user object', async () => {
            expect(response.status()).toBe(201);
            
            const body = (await response.json()) as { user?: { email: string; name: string } };
            
            expect(body.user).toHaveProperty('email');
            expect(body.user).toHaveProperty('name'); 
            expect(body.user?.email).toEqual(payload.email);
        });
    }); 


});
