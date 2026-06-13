import { APIResponse } from '@playwright/test';
import { expect, test } from '../../fixtures/api_fixtures';
import { buildGoalPayload } from '../../support/api/builders/payloads';
import { GoalStatus} from '../../support/api/types';

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

    test('GET /goals should return a list of goals', async ({ goalsClient }) => {
        let response!: APIResponse;
        await test.step('call GET /goals', async () => {
            response = await goalsClient.list();
        });
        await test.step('assert status 200 with a list of goals', async () => {
            expect(response.status()).toBe(200);
            const body = (await response.json()) as { goals?: { title: string; description: string }[] };
            expect(body.goals).toBeInstanceOf(Array);
        });
    });

    test('GET /goals should return single goal by ID', async ({ goalsClient }) => {
        const payload = buildGoalPayload();
        let createResponse!: APIResponse;
        await test.step('create a new goal to retrieve later', async () => {
            createResponse = await goalsClient.create(payload);
            expect(createResponse.status()).toBe(201);
        });

        let createdGoalId!: string;
        await test.step('extract created goal ID', async () => {
            const body = (await createResponse.json()) as { goal?: { id?: string; _id?: string } };
            createdGoalId = body.goal?.id || body.goal?._id || '';
            expect(createdGoalId).toBeTruthy();
        });
        let getResponse!: APIResponse;
        await test.step('call GET /goals/:id with the created goal ID', async () => {
            getResponse = await goalsClient.getById(createdGoalId);
        });

        await test.step('assert status 200 with the correct goal data', async () => {
            expect(getResponse.status()).toBe(200);
            const body = (await getResponse.json()) as { goal?: { title: string; description: string } };
            expect(body.goal).toBeDefined();
            expect(body.goal?.title).toEqual(payload.title);
            expect(body.goal?.description).toEqual(payload.description);
        }); 
    });

    test('DELETE /goals/:id should delete a goal', async ({ goalsClient }) => {
        const payload = buildGoalPayload();
        let createResponse!: APIResponse;   
        await test.step('create a new goal to delete later', async () => {
            createResponse = await goalsClient.create(payload);
            expect(createResponse.status()).toBe(201);
        });

        let createdGoalId!: string; 
        await test.step('extract created goal ID', async () => {
            const body = (await createResponse.json()) as { goal?: { id?: string; _id?: string } };
            createdGoalId = body.goal?.id || body.goal?._id || '';
            expect(createdGoalId).toBeTruthy();
        });

        let deleteResponse!: APIResponse;   
        await test.step('call DELETE /goals/:id with the created goal ID', async () => {
            deleteResponse = await (goalsClient as any).remove(createdGoalId);
        });

        await test.step('assert status 200 with success message', async () => {
            expect(deleteResponse.status()).toBe(200);
            const body = (await deleteResponse.json()) as { msg?: string };
            expect(body.msg).toContain('Success! Goal removed.');
        });
    });

 test('DELETE /goals/:id should return 404 for non-existent goal', async ({ goalsClient }) => {
        const nonExistentId = '64b8f0c2e1d3f9a1b2c3d4e5';
        let response!: APIResponse; 

        await test.step('call DELETE /goals/:id with a non-existent goal ID', async () => {
            response = await goalsClient.remove(nonExistentId);
        });

        await test.step('assert status 404 with error message', async () => {
            expect(response.status()).toBe(404);
            
            const body = (await response.json()) as { msg?: string };
            expect(body.msg).toBeDefined();
            
            expect(body.msg).toContain(`No goal with id: ${nonExistentId}`);
        });
    });

    test('GET /showprogress', async ({ goalsClient }) => {
    let response!: APIResponse;

    await test.step('call GET /showprogress', async () => {
        response = await goalsClient.showProgress();
    });

    await test.step('assert status 200 with progress data', async () => {
        expect(response.status()).toBe(200);
        const body = (await response.json()) as {
            myProgress?: {
                'to-do'?: number;
                'in-progress'?: number;
                completed?: number;
                cancelled?: number;
            };
        };
        expect(body).toHaveProperty('myProgress');
        expect(body.myProgress).toHaveProperty('to-do');
        expect(body.myProgress).toHaveProperty('in-progress');
        expect(body.myProgress).toHaveProperty('completed');
        expect(body.myProgress).toHaveProperty('cancelled');
    });
});

    }); 