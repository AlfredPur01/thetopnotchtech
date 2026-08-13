import { NextResponse } from "next/server";
import { backendFetch, BackendError } from "@/lib/server/backend-client";
import { STUDENT_COOKIE_NAME, studentCookieOptions, type StudentUser } from "@/lib/server/student-auth";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as { email?: string; password?: string };

  if (!body.email || !body.password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  try {
    const { user, token } = await backendFetch<{ user: StudentUser; token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: body.email, password: body.password }),
    });

    const response = NextResponse.json({ user });
    response.cookies.set(STUDENT_COOKIE_NAME, token, studentCookieOptions());
    return response;
  } catch (error) {
    const status = error instanceof BackendError ? error.status : 502;
    const message = error instanceof BackendError ? error.message : "Login failed. Please try again.";
    return NextResponse.json({ error: message }, { status });
  }
}
