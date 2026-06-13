import {
  APIRequestContext,
  expect,
  request as playwrightRequest,
  test as base,
} from 'playwright/test';
import { AuthClient } from '../support/api/clients/AuthClient';
import { GoalsClient } from '../support/api/clients/GoalsClients';
import { StatusClient } from '../support/api/clients/StatusClient';
import { buildGoalPayload } from '../support/api/builders/payloads';
import { seedUser, SeededUser } from '../support/api/factories/seedUsers';
import { CreateGoalPayload, Goal, RegisterPayload, TestUser } from '../support/api/types';

const DEFAULT_BASE_URL = 'https://goal-tracker-api.onrender.com';
const API_PREFIX = '/api/v1';

type SeedGoalFn = (overrides?: Partial<CreateGoalPayload>) => Promise<Goal>;
type SeedNewUserFn = (overrides?: Partial<RegisterPayload>) => Promise<SeededUser>;

type ApiWorkerFixtures = {
  apiBaseURL: string;
  apiRequest: APIRequestContext;
  testUser: TestUser;
};

type ApiTestFixtures = {
  statusClient: StatusClient;
  authClient: AuthClient;
  goalsClient: GoalsClient;
  unauthedGoalsClient: GoalsClient;
  unauthedAuthClient: AuthClient;
  seedGoal: SeedGoalFn;
  seedNewUser: SeedNewUserFn;
};

function extractToken(body: Record<string, unknown>): string | undefined {
  const direct =
    (body.token as string | undefined) ?? (body.accessToken as string | undefined);
  if (direct) return direct;
  const user = body.user as Record<string, unknown> | undefined;
  return user?.token as string | undefined;
}

function goalIdOf(goal: Goal | Record<string, unknown>): string | undefined {
  const g = goal as Record<string, unknown>;
  return (g._id as string | undefined) ?? (g.id as string | undefined);
}

export const test = base.extend<ApiTestFixtures, ApiWorkerFixtures>({
  apiBaseURL: [process.env.API_BASE_URL ?? DEFAULT_BASE_URL, { scope: 'worker', option: true }],

  apiRequest: [
    async ({ apiBaseURL }, use) => {
      const ctx = await playwrightRequest.newContext({ baseURL: apiBaseURL });
      await use(ctx);
      await ctx.dispose();
    },
    { scope: 'worker' },
  ],

  testUser: [
    async ({ apiRequest }, use, workerInfo) => {
      const ts = Date.now();
      const email = `qa+w${workerInfo.workerIndex}+${ts}@example.com`;
      const password = 'TestPassword123!';
      const name = `QA Worker ${workerInfo.workerIndex}`;

      const reg = await apiRequest.post(`${API_PREFIX}/auth/register`, {
        data: { name, email, password },
      });
      expect(
        reg.ok(),
        `worker user register failed: ${reg.status()} ${await reg.text()}`,
      ).toBeTruthy();

      const login = await apiRequest.post(`${API_PREFIX}/auth/login`, {
        data: { email, password },
      });
      expect(
        login.ok(),
        `worker user login failed: ${login.status()} ${await login.text()}`,
      ).toBeTruthy();

      const body = (await login.json()) as Record<string, unknown>;
      const token = extractToken(body);
      expect(token, 'no token returned by login').toBeTruthy();

      await use({ name, email, password, token: token as string });
    },
    { scope: 'worker' },
  ],

  statusClient: async ({ apiRequest }, use) => {
    await use(new StatusClient(apiRequest));
  },

  authClient: async ({ apiRequest, testUser }, use) => {
    await use(new AuthClient(apiRequest, testUser.token));
  },

  goalsClient: async ({ apiRequest, testUser }, use) => {
    await use(new GoalsClient(apiRequest, testUser.token));
  },

  unauthedGoalsClient: async ({ apiRequest }, use) => {
    await use(new GoalsClient(apiRequest));
  },

  unauthedAuthClient: async ({ apiRequest }, use) => {
    await use(new AuthClient(apiRequest));
  },

  /**
   * Test-scoped helper that creates a goal for the worker user and
   * registers it for automatic cleanup after the test finishes.
   */
  seedGoal: async ({ goalsClient }, use) => {
    const created: string[] = [];
    const fn: SeedGoalFn = async (overrides) => {
      const res = await goalsClient.create(buildGoalPayload(overrides));
      expect(res.ok(), `seedGoal: ${res.status()} ${await res.text()}`).toBeTruthy();
      const body = (await res.json()) as { goal?: Goal } & Record<string, unknown>;
      const goal = (body.goal ?? (body as unknown as Goal)) as Goal;
      const id = goalIdOf(goal);
      if (id) created.push(id);
      return goal;
    };
    await use(fn);
    for (const id of created) {
      await goalsClient.remove(id).catch(() => undefined);
    }
  },

  /**
   * Test-scoped factory yielding a fresh, pre-authed user separate from the
   * worker user — for tests that mutate identity (profile/password updates).
   */
  seedNewUser: async ({ apiRequest }, use) => {
    const fn: SeedNewUserFn = (overrides) => seedUser(apiRequest, overrides);
    await use(fn);
  },
});

export { expect };
export { extractToken };