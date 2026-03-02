/**
 * Host authentication helpers.
 * JWT is stored in localStorage and sent as Bearer token on protected API requests.
 */
const TOKEN_KEY = "kc_host_token";

/** Returns the stored host JWT, or null if not logged in. */
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

/** Saves the host JWT after successful login/register. */
export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

/** Removes the JWT (e.g. on logout or when API returns 401). */
export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

/** Returns headers object with Authorization: Bearer <token> when a token exists. */
export function authHeaders(): Record<string, string> {
  const token = getToken();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}
