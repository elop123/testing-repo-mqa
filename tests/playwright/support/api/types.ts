export type GoalStatus = 'to do' | 'in progress' | 'completed'| 'cancelled';
export type GoalPriority = 'low' | 'medium' | 'high';
    
export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface UpdateProfilePayload {
    name: string;
    email: string;
    oldPassword: string;
    newPassword: string;
}

export interface CreateGoalPayload {
    title: string;
    description: string;
    status?: GoalStatus;
    priority?: GoalPriority;
}

export interface AuthUser {
  _id?: string;
  id?: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  user?: AuthUser;
  token?: string;
  accessToken?: string;
  [key: string]: unknown;
}

export interface CreateGoalPayload {
  title: string;
  description: string;
  status?: GoalStatus;
  priority?: GoalPriority;
}

export interface UpdateGoalPayload {
  title?: string;
  description?: string;
  status?: GoalStatus;
  priority?: GoalPriority;
}

export interface Goal {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  status: GoalStatus;
  priority: GoalPriority;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GoalsListResponse {
  goals?: Goal[];
  count?: number;
  [key: string]: unknown;
}

export interface ProgressResponse {
  'to-do'?: number;
  'in-progress'?: number;
  completed?: number;
  cancelled?: number;
  [key: string]: unknown;
}

export interface StatusResponse {
  status: string;
  [key: string]: unknown;
}

export interface TestUser {
  name: string;
  email: string;
  password: string;
  token: string;
}