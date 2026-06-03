import { BaseApiClients } from './BaseApiClients';
import { APIResponse } from '@playwright/test';


export class StatusClient extends BaseApiClients {
  async getStatus(): Promise<APIResponse> {
    return this.get('/status');
  }
}