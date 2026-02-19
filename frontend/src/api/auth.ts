import { request } from './fetchClent';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth'
// Real API calls would look something like this:

export function login(data: LoginRequest) {
  return request<AuthResponse>(
    '/api/user/login',
    'POST',
    data,
  );
}

export function realRegister(data: RegisterRequest) {
  return request<AuthResponse>(
    '/api/user/register',
    'POST',
    data,
  );
}

export function logout(token: string) {
  return request<void>(
    '/api/user/logout',
    'POST',
    undefined,
    token,
  );
}