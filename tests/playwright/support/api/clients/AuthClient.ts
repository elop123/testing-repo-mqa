import { BaseApiClients } from './BaseApiClients';
import { APIResponse } from '@playwright/test';
import { AuthUser, LoginPayload, RegisterPayload, UpdateProfilePayload } from '../types';

export class AuthClient extends BaseApiClients {
    async register(payload:RegisterPayload): Promise<APIResponse> {
        return this.post('/auth/register', payload);
    }

    async login(payload:LoginPayload ): Promise<APIResponse> {
        return this.post('/auth/login', { payload });
    }

    async updateProfile(payload: UpdateProfilePayload): Promise<APIResponse> {
        return this.patch('/auth/updateprofile', { payload });
    }}
