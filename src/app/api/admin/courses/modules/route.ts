import { NextRequest, NextResponse } from "next/server";
import { backendFetch, BackendError } from "@/lib/server/backend-client";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { course_id?: string; title?: string; sort_order?: number };

  if (!body.course_id || !body.title) {
    return NextResponse.json({ error: "course_id and title are required" }, { status: 400 });
  }

  try {
    const result = await backendFetch("/courses/modules", {
      method: "POST",
      auth: true,
      body: JSON.stringify({ course_id: body.course_id, title: body.title, sort_order: body.sort_order ?? 0 }),
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const status = error instanceof BackendError ? error.status : 502;
    const message = error instanceof BackendError ? error.message : "Failed to create module";
    return NextResponse.json({ error: message }, { status });
  }
}
