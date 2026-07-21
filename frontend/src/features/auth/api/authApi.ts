import { api } from '../../../lib/axios';

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = LoginRequest & {
  username: string;
  full_name?: string | null;
};

export type User = {
  id: number;
  email: string;
  username: string;
  full_name: string | null;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type TokenResponse = {
  access_token: string;
  token_type: string;
  user: User;
};

export async function login(payload: LoginRequest): Promise<TokenResponse> {
  const response = await api.post<TokenResponse>('/auth/login', payload);
  return response.data;
}

export async function register(payload: RegisterRequest): Promise<TokenResponse> {
  const response = await api.post<TokenResponse>('/auth/register', payload);
  return response.data;
}
