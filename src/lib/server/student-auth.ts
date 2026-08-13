import { cookies } from "next/headers";
import { backendFetch, BackendError } from "@/lib/server/backend-client";

export const STUDENT_COOKIE_NAME = "student_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days, matches backend JWT_EXPIRES_IN

export interface StudentUser {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin" | "editor" | "student";
  avatar_url: string | null;
  is_active: boolean;
}

export function studentCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  };
}

/** Reads the logged-in student's backend JWT from the request cookie, if any. */
export async function getStudentToken(): Promise<string | undefined> {
  const jar = await cookies();
  return jar.get(STUDENT_COOKIE_NAME)?.value;
}

/** Resolves the current student from their session cookie, or null if not logged in. */
export async function getCurrentStudent(): Promise<StudentUser | null> {
  const token = await getStudentToken();
  if (!token) return null;

  try {
    const { user } = await backendFetch<{ user: StudentUser }>("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return user;
  } catch (error) {
    if (error instanceof BackendError) return null;
    throw error;
  }
}
