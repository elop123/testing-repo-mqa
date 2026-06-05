import { APIResponse } from '@playwright/test';
import { expect, test } from '../../fixtures/api_fixtures';
import { buildGoalPayload } from '../../support/api/builders/payloads';

test.describe('Goals API', () => {
    
    test('POST /goals should create a new goal', async ({ goalsClient }) => {
        const payload = buildGoalPayload();
        let response!: APIResponse;

        await test.step('call POST /goals', async () => {
            response = await goalsClient.create(payload);
        });

        await test.step('assert status 201 with a goal object', async () => {
            expect(response.status()).toBe(201);
            
            const body = (await response.json()) as { goal?: { title: string; description: string } };
            
            expect(body.goal).toHaveProperty('title');
            expect(body.goal).toHaveProperty('description');
            expect(body.goal?.title).toEqual(payload.title);
            expect(body.goal?.description).toEqual(payload.description);
        });
    });

    test('POST /goals should reject creation with empty title and description', async ({ goalsClient }) => {
        const invalidPayload = buildGoalPayload({ title: '', description: '' });
        let response!: APIResponse;
        
        await test.step('call POST /goals with empty title and description', async () => {
            response = await goalsClient.create(invalidPayload);
        });

        await test.step('assert error message', async () => {
            expect(response.status()).toBe(400);
            const body = (await response.json()) as { msg?: string };
        
            expect(body.msg).toContain('Please add a title');
            expect(body.msg).toContain('Please add a description');
        });
        });
    });
