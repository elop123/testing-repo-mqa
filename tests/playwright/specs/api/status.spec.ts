import { APIResponse } from 'playwright/test';
import { expect, test } from '../../fixtures/api_fixtures';


test.describe('GET /status', () => {
  test('should respond with a 200 and a non-empty status string', async ({ statusClient }) => {
    let response!: APIResponse;

    await test.step('Act: call GET /status', async () => {
      response = await statusClient.getStatus();
    });

    await test.step('Assert: status is 200 with a non-empty status field', async () => {
      expect(response.status()).toBe(200);
      const body = (await response.json()) as { status?: unknown };
      expect(body).toHaveProperty('status');
      expect(typeof body.status).toBe('string');
      expect((body.status as string).length).toBeGreaterThan(0);
    });
  });
});