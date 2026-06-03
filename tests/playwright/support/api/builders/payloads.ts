import {
  CreateGoalPayload,
  GoalPriority,
  GoalStatus,
  LoginPayload,
  RegisterPayload,
} from '../types';

const DEFAULT_PASSWORD = 'TestPassword123!';

export function uniqueEmail(prefix = 'qa'): string {
  return `${prefix}+${Date.now()}+${Math.floor(Math.random() * 1e9)}@example.com`;
}

export function buildRegisterPayload(overrides: Partial<RegisterPayload> = {}): RegisterPayload {
  return {
    name: 'QA User',
    email: uniqueEmail('reg'),
    password: DEFAULT_PASSWORD,
    ...overrides,
  };
}

export function buildLoginPayload(overrides: Partial<LoginPayload> = {}): LoginPayload {
  return {
    email: uniqueEmail('login'),
    password: DEFAULT_PASSWORD,
    ...overrides,
  };
}

export function buildGoalPayload(overrides: Partial<CreateGoalPayload> = {}): CreateGoalPayload {
  return {
    title: `Goal ${Date.now()}-${Math.floor(Math.random() * 1e6)}`,
    description: 'Created by Playwright API tests',
    ...overrides,
  };
}

export const goalStatuses: readonly GoalStatus[] = [
  'to do',
  'in progress',
  'completed',
  'cancelled',
] as const;

export const goalPriorities: readonly GoalPriority[] = ['low', 'medium', 'high'] as const;

export { DEFAULT_PASSWORD };