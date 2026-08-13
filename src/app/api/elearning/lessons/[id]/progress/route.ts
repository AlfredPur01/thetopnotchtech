import { NextRequest, NextResponse } from "next/server";
import { backendFetch, BackendError } from "@/lib/server/backend-client";
import { getStudentToken } from "@/lib/server/student-auth";

interface RouteParams {
  params: { id: string };
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const token = await getStudentToken();
  if (!token) {
    return NextResponse.json({ error: "You need to log in first" }, { status: 401 });
  }

  const body = (await request.json()) as { is_completed?: boolean; watch_time_secs?: number };

  try {
    const result = await backendFetch(`/enrolments/lessons/${params.id}/progress`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });
    return NextResponse.json(result);
  } catch (error) {
    const status = error instanceof BackendError ? error.status : 502;
    return NextResponse.json({ error: "Failed to update progress" }, { status });
  }
}
