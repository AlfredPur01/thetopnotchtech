import { NextRequest, NextResponse } from "next/server";
import { backendFetch, BackendError } from "@/lib/server/backend-client";

interface RouteParams {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const updates = (await request.json()) as Record<string, unknown>;

  try {
    const result = await backendFetch(`/courses/lessons/${params.id}`, {
      method: "PATCH",
      auth: true,
      body: JSON.stringify(updates),
    });
    return NextResponse.json(result);
  } catch (error) {
    const status = error instanceof BackendError ? error.status : 502;
    return NextResponse.json({ error: "Failed to update lesson" }, { status });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    await backendFetch(`/courses/lessons/${params.id}`, { method: "DELETE", auth: true });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const status = error instanceof BackendError ? error.status : 502;
    return NextResponse.json({ error: "Failed to delete lesson" }, { status });
  }
}
