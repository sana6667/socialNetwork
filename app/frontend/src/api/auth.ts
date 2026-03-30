import { request, requestFormData } from './fetchClent';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth'

export function login(data: LoginRequest) {
  return request<AuthResponse>(
    '/api/user/login',
    'POST',
    data,
  );
}

export function register(data: RegisterRequest) {
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

export function registerFormData(data: FormData) {
  return requestFormData<AuthResponse>(
    '/api/user/register',
    'POST',
    data,
  );
}