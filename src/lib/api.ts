/**
 * API client for the backend. Uses VITE_API_URL in production, localhost:4000 in dev.
 */
import { authHeaders, clearToken, getToken } from "./auth";

/** Base URL for all API requests. */
export const API_BASE =
  import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? "http://localhost:4000" : "");

type FetchOptions = RequestInit & { skipAuth?: boolean };

/**
 * Fetches from the API. Automatically adds JSON content-type and, when a host token exists,
 * the Authorization header. On 401, clears the token so the UI can redirect to login.
 */
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
