import { APIResponse } from '@playwright/test';
import { expect, test } from '../../fixtures/api_fixtures';
import { buildRegisterPayload, buildLoginPayload, buildUpdateProfilePayload } from '../../support/api/builders/payloads';

test.describe('Auth API', () => {
    
    test('POST /auth/register should register a new user', async ({ unauthedAuthClient }) => {
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

    test('POST /auth/register should not register a user with an existing email', async ({ unauthedAuthClient }) => {
        const payload = buildRegisterPayload();
        let response!: APIResponse;

        await test.step('register a user for the first time', async () => {
            response = await unauthedAuthClient.register(payload);
            expect(response.status()).toBe(201);
        });

        await test.step('attempt to register the same user again', async () => {
            response = await unauthedAuthClient.register(payload);
            expect(response.status()).toBe(400);
        });

        await test.step('assert error message for duplicate email', async () => {
            const body = (await response.json()) as { msg?: string };
            expect(body.msg).toBeDefined();
            expect(body.msg).toContain('Email address already exists');
        });
    });

    test('POST /auth/register should reject registration with no password', async ({ unauthedAuthClient }) => {
    
        const invalidPayload = buildRegisterPayload({ password: '' });
        let response!: APIResponse;

        await test.step('call POST /auth/register with empty password', async () => {
            response = await unauthedAuthClient.register(invalidPayload);
        });

        await test.step('assert status 400', async () => {
            expect(response.status()).toBe(400);
        });
    });

    test('POST /auth/register should reject registration with no email and password', async ({ unauthedAuthClient }) => {
        const invalidPayload = buildRegisterPayload({ email: '', password: '' });
        let response!: APIResponse;

        await test.step('call POST /auth/register with empty email and password', async () => {
                response = await unauthedAuthClient.register(invalidPayload);
        });

        await test.step('assert error message to provide a name, email, and password', async () => {
                const body = (await response.json()) as { msg?: string };
                expect(body.msg).toBeDefined();
                expect(body.msg).toContain('Please provide a name, email address and password');
        });
    });

    test('POST /auth/login should login user with valid credentials', async ({ unauthedAuthClient }) => {
        const payload = buildRegisterPayload();
        let response!: APIResponse;

        await test.step('register a new user', async () => {
            response = await unauthedAuthClient.register(payload);
            expect(response.status()).toBe(201);
        });

        await test.step('call POST /auth/login with valid credentials', async () => {
            response = await unauthedAuthClient.login({ email: payload.email, password: payload.password });
        });

        await test.step('assert status 200 with token', async () => {
            expect(response.status()).toBe(200);
            const body = (await response.json()) as { msg?: string; token?: string };
            expect(body.token).toBeDefined();
        });
    });

    test('POST /auth/login should not login with wrong password', async ({ unauthedAuthClient }) => {
        const payload = buildRegisterPayload();
        let response!: APIResponse;

        await test.step('register a new user', async () => {
            response = await unauthedAuthClient.register(payload);
            expect(response.status()).toBe(201);
        });

        await test.step('attempt login with wrong password', async () => {
            response = await unauthedAuthClient.login({ email: payload.email, password: 'wrongpassword' });
        });

        await test.step('assert status 401 and error message', async () => {
            expect(response.status()).toBe(401);
            const body = (await response.json()) as { msg?: string };
            expect(body.msg).toBeDefined();
            expect(body.msg).toContain('Invalid Credentials');
        });
    });

    test('POST /auth/login should not login with empty credentials', async ({ unauthedAuthClient }) => {
        let response!: APIResponse;

        await test.step('attempt login with empty email and password', async () => {
            response = await unauthedAuthClient.login({ email: '', password: '' });
        });

        await test.step('assert status 400 and error message', async () => {
            expect(response.status()).toBe(400);
            const body = (await response.json()) as { msg?: string };
            expect(body.msg).toBeDefined();
            expect(body.msg).toContain('Please provide an email address and password');
        });
    });

    test('POST /auth/login should not login with wrong email', async ({ unauthedAuthClient }) => {
        let response!: APIResponse;

        await test.step('attempt login with non-existent email', async () => {
            response = await unauthedAuthClient.login({ email: 'wrong@example.com', password: 'TestPassword123!' });
        });

        await test.step('assert status 401 and error message', async () => {
            expect(response.status()).toBe(401);
            const body = (await response.json()) as { msg?: string };
            expect(body.msg).toBeDefined();
            expect(body.msg).toContain('Invalid Credentials');
        });
    }); 

    test('PATCH /auth/updateprofile should update user profile with valid token', async ({ unauthedAuthClient }) => {
        const userPayload = buildRegisterPayload();
        const updatePayload = buildUpdateProfilePayload({ oldPassword: userPayload.password });
        let response!: APIResponse;

        await test.step('setup: register and login to get token', async () => {
            const regResponse = await unauthedAuthClient.register(userPayload);
            expect(regResponse.status()).toBe(201);

            const loginResponse = await unauthedAuthClient.login({ email: userPayload.email, password: userPayload.password });
            expect(loginResponse.status()).toBe(200);
            const loginBody = (await loginResponse.json()) as { token?: string };
            expect(loginBody.token).toBeDefined();
            unauthedAuthClient.setToken(loginBody.token);
        });

        await test.step('call PATCH /auth/updateprofile', async () => {
            response = await unauthedAuthClient.updateProfile(updatePayload);
        });

        await test.step('assert status 200 with updated user object', async () => {
            expect(response.status()).toBe(200);
            const body = (await response.json()) as { name: string; email: string };
            expect(body.email).toEqual(updatePayload.email);
            expect(body.name).toEqual(updatePayload.name);
        });
    });


});