import { APIRequestContext, expect } from 'playwright/test';
import { AuthClient } from '../clients/AuthClient';
import { GoalsClient } from '../clients/GoalsClients';
import { buildGoalPayload, buildRegisterPayload } from '../builders/payloads';
import { CreateGoalPayload, Goal, RegisterPayload } from '../types';

function readToken(body: Record<string, unknown>): string | undefined {
  const direct =
    (body.token as string | undefined) ?? (body.accessToken as string | undefined);
  if (direct) return direct;
  const user = body.user as Record<string, unknown> | undefined;
  return user?.token as string | undefined;
}

export interface SeededUser {
  name: string;
  email: string;
  password: string;
  token: string;
  authClient: AuthClient;
  goalsClient: GoalsClient;
  seedGoal: (overrides?: Partial<CreateGoalPayload>) => Promise<Goal>;
}

/**
 * Register + log in a user, then yield a small fluent helper exposing
 * pre-authed clients and a `seedGoal` shortcut. Used by tests that need
 * a freshly-arranged user separate from the worker-scoped one.
 */
export async function seedUser(
  apiRequest: APIRequestContext,
  overrides: Partial<RegisterPayload> = {},
): Promise<SeededUser> {
  const payload = buildRegisterPayload(overrides);

  const reg = await apiRequest.post('/api/v1/auth/register', { data: payload });
  expect(reg.ok(), `seedUser register: ${reg.status()} ${await reg.text()}`).toBeTruthy();

  const login = await apiRequest.post('/api/v1/auth/login', {
    data: { email: payload.email, password: payload.password },
  });
  expect(login.ok(), `seedUser login: ${login.status()} ${await login.text()}`).toBeTruthy();
  const token = readToken((await login.json()) as Record<string, unknown>);
  expect(token, 'seedUser: no token in login response').toBeTruthy();

  const authClient = new AuthClient(apiRequest, token);
  const goalsClient = new GoalsClient(apiRequest, token);

  return {
    name: payload.name,
    email: payload.email,
    password: payload.password,
    token: token as string,
    authClient,
    goalsClient,
    seedGoal: async (goalOverrides) => {
      const res = await goalsClient.create(buildGoalPayload(goalOverrides));
      expect(res.ok(), `seedGoal: ${res.status()} ${await res.text()}`).toBeTruthy();
      const body = (await res.json()) as { goal?: Goal } & Record<string, unknown>;
      return (body.goal ?? (body as unknown as Goal)) as Goal;
    },
  };
}