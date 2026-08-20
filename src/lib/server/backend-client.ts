const BACKEND_API_URL = 'https://topnotch-tech-backend-production.up.railway.app/api';

export class BackendError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }
}

// In-memory cache for the backend service-account JWT. Persists for the life
// of the Node process (fine for a single Next.js server instance); refreshed
// automatically on expiry or a 401 from the backend.
let cachedToken: string | null = null;
let cachedTokenExpiresAt = 0;

async function getServiceToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedTokenExpiresAt) {
    return cachedToken;
  }

  const email = process.env.BACKEND_ADMIN_EMAIL;
  const password = process.env.BACKEND_ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error("BACKEND_ADMIN_EMAIL or BACKEND_ADMIN_PASSWORD environment variable is not set");
  }

  const res = await fetch(`${BACKEND_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new BackendError(res.status, "Backend service-account login failed");
  }

  const data = (await res.json()) as { token: string };
  cachedToken = data.token;
  // Backend tokens are valid 7 days (JWT_EXPIRES_IN); refresh a day early.
  cachedTokenExpiresAt = Date.now() + 6 * 24 * 60 * 60 * 1000;
  return cachedToken;
}

interface BackendFetchOptions extends RequestInit {
  /** Attach the service-account JWT (required for create/update/delete calls). */
  auth?: boolean;
}

/**
 * Server-only fetch wrapper for topnotch-backend. Public GETs need no auth;
 * pass `auth: true` for admin-only writes, which are performed as the
 * backend service account (see BACKEND_ADMIN_EMAIL/PASSWORD).
 */
export async function backendFetch<T>(path: string, options: BackendFetchOptions = {}): Promise<T> {
  const { auth = false, headers, ...rest } = options;

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string> | undefined),
  };

  if (auth) {
    finalHeaders.Authorization = `Bearer ${await getServiceToken()}`;
  }

  // Content here is admin-editable and expected to change frequently — never
  // let Next.js's fetch data cache serve a stale response.
  let res = await fetch(`${BACKEND_API_URL}${path}`, { cache: "no-store", ...rest, headers: finalHeaders });

  if (auth && res.status === 401) {
    // Session may have been invalidated server-side — retry once with a fresh token.
    cachedToken = null;
    finalHeaders.Authorization = `Bearer ${await getServiceToken()}`;
    res = await fetch(`${BACKEND_API_URL}${path}`, { cache: "no-store", ...rest, headers: finalHeaders });
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}) as { error?: string });
    throw new BackendError(res.status, body.error ?? `Backend request failed: ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}
