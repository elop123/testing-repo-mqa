import { APIRequestContext } from '@playwright/test';
import { APIResponse } from '@playwright/test';

export const API_Prefix = '/api/v1';

export class BaseApiClients {
protected readonly request: APIRequestContext;
protected token?: string ;

    constructor(request: APIRequestContext, token?: string) {
        this.request = request;
        this.token = token;
    }

 protected url(path: string): string {
    return `${API_Prefix}${path.startsWith('/') ? path : `/${path}`}`;
  }

  setToken(token: string | undefined) {
    this.token = token;
  }

  protected headers(extra: Record<string, string> = {}): Record<string, string> {
    const base: Record<string, string> = { 'Content-Type': 'application/json' };
    if (this.token) {
      base.Authorization = `Bearer ${this.token}`;
    }
    return { ...base, ...extra };
  }

  protected async get(path: string, params?: Record<string, string>): Promise<APIResponse> {
    return this.request.get(this.url(path), { headers: this.headers(), params });
  }

  protected async post(path: string, data?: unknown): Promise<APIResponse> {
    return this.request.post(this.url(path), { headers: this.headers(), data });
  }

  protected async patch(path: string, data?: unknown): Promise<APIResponse> {
    return this.request.patch(this.url(path), { headers: this.headers(), data });
  }

  protected async delete(path: string): Promise<APIResponse> {
    return this.request.delete(this.url(path), { headers: this.headers() });
  }
}   

