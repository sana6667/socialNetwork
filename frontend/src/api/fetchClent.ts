const BASE_URL = 'https://localhost:7019';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data?: unknown,
  token?: string,
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(BASE_URL + url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Request failed');
  }

  return response.json();
}