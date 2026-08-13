import { NextResponse } from "next/server";
import { backendFetch, BackendError } from "@/lib/server/backend-client";
import { getStudentToken } from "@/lib/server/student-auth";

export async function POST(request: Request): Promise<NextResponse> {
  const token = await getStudentToken();
  if (!token) {
    return NextResponse.json({ error: "You need to log in first" }, { status: 401 });
  }

  const body = (await request.json()) as { course_id?: string; currency?: "NGN" | "USD" };
  if (!body.course_id) {
    return NextResponse.json({ error: "course_id is required" }, { status: 400 });
  }

  try {
    const result = await backendFetch<{ authorization_url: string; reference: string }>("/payments/initiate", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ course_id: body.course_id, currency: body.currency ?? "NGN" }),
    });
    return NextResponse.json(result);
  } catch (error) {
    const status = error instanceof BackendError ? error.status : 502;
    const message = error instanceof BackendError ? error.message : "Failed to start checkout. Please try again.";
    return NextResponse.json({ error: message }, { status });
  }
}
