/**
 * Host login page. POSTs credentials to /api/auth/login; on success stores JWT and redirects to /host.
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../lib/api";
import { setToken } from "../lib/auth";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /** Submit email/password; on success save token and go to dashboard. */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error?.message ?? "Invalid email or password.");
        return;
      }
      if (data.token) {
        setToken(data.token);
        navigate("/host", { replace: true });
      } else {
        setError("Invalid response from server.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-4xl font-bold text-leaf-green">Host Login</h1>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-red-700" role="alert">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-leaf-green focus:outline-none focus:ring-2 focus:ring-leaf-green focus:ring-offset-0"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-leaf-green focus:outline-none focus:ring-2 focus:ring-leaf-green focus:ring-offset-0"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-leaf-green px-6 py-3 text-lg font-semibold text-white shadow-md transition-colors hover:bg-leaf-deep disabled:opacity-70"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
