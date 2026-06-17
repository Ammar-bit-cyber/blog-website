import { API_BASE } from './api';

const TOKEN_KEY = 'author_token';

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

export function authHeaders(extra = {}) {
  const token = getToken();
  return {
    ...extra,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function login(password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Invalid password');
  }

  const { token } = await res.json();
  setToken(token);
  return token;
}

export async function checkAuth() {
  const token = getToken();
  if (!token) return false;

  const res = await fetch(`${API_BASE}/auth/check`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    clearToken();
    return false;
  }

  return true;
}

export async function logout() {
  if (getToken()) {
    await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      headers: authHeaders(),
    }).catch(() => {});
  }
  clearToken();
}
