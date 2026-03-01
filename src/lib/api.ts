import { authHeaders, clearToken, getToken } from "./auth";

export const API_BASE =
  import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? "http://localhost:4000" : "");

type FetchOptions = RequestInit & { skipAuth?: boolean };

export async function apiFetch(path: string, options: FetchOptions = {}): Promise<Response> {
  const { skipAuth, ...init } = options;
  const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string>),
  };
  if (!skipAuth && getToken()) {
    Object.assign(headers, authHeaders());
  }
  const res = await fetch(url, { ...init, headers });
  if (res.status === 401) {
    clearToken();
  }
  return res;
}
