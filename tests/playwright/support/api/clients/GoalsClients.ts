import { BaseApiClients } from './BaseApiClients';
import { APIResponse } from '@playwright/test';
import { CreateGoalPayload, GoalStatus, GoalPriority, UpdateGoalPayload } from '../types';

export class GoalsClient extends BaseApiClients {
  async create(payload: CreateGoalPayload): Promise<APIResponse> {
    return this.post('/goals', payload);
  }

   async list(filters?: { status?: GoalStatus; priority?: GoalPriority }): Promise<APIResponse> {
    const params: Record<string, string> = {};
    if (filters?.status) params.status = filters.status;
    if (filters?.priority) params.priority = filters.priority;
    return this.get('/goals', Object.keys(params).length ? params : undefined);
  }

  async getById(id: string): Promise<APIResponse> {
    return this.get(`/goals/${id}`);
  }

  async update(id: string, payload: UpdateGoalPayload): Promise<APIResponse> {
    return this.patch(`/goals/${id}`, payload);
  }

  async remove(id: string): Promise<APIResponse> {
    return this.delete(`/goals/${id}`);
  }

  async showProgress(): Promise<APIResponse> {
    return this.get('/goals/showprogress');
  }
}
