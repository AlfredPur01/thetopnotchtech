import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/server/backend-client";
import { STUDENT_COOKIE_NAME, getStudentToken } from "@/lib/server/student-auth";

export async function POST(): Promise<NextResponse> {
  const token = await getStudentToken();

  if (token) {
    try {
      await backendFetch("/auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // Best-effort — clear the cookie regardless of backend session cleanup.
    }
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.delete(STUDENT_COOKIE_NAME);
  return response;
}
