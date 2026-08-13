import { NextRequest, NextResponse } from "next/server";
import { backendFetch, BackendError } from "@/lib/server/backend-client";
import { getStudentToken } from "@/lib/server/student-auth";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const token = await getStudentToken();
  if (!token) {
    return NextResponse.json({ error: "You need to log in first" }, { status: 401 });
  }

  const reference = request.nextUrl.searchParams.get("reference");
  if (!reference) {
    return NextResponse.json({ error: "reference is required" }, { status: 400 });
  }

  try {
    const result = await backendFetch<{ status: string }>(`/payments/verify/${reference}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return NextResponse.json(result);
  } catch (error) {
    const status = error instanceof BackendError ? error.status : 502;
    const message = error instanceof BackendError ? error.message : "Failed to verify payment.";
    return NextResponse.json({ error: message }, { status });
  }
}
