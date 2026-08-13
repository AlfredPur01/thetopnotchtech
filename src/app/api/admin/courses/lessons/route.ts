import { NextRequest, NextResponse } from "next/server";
import { backendFetch, BackendError } from "@/lib/server/backend-client";

interface LessonInput {
  module_id?: string;
  title?: string;
  type?: "video" | "article" | "quiz";
  content_url?: string;
  duration_mins?: number;
  is_preview?: boolean;
  sort_order?: number;
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as LessonInput;

  if (!body.module_id || !body.title || !body.type) {
    return NextResponse.json({ error: "module_id, title, and type are required" }, { status: 400 });
  }

  try {
    const result = await backendFetch("/courses/lessons", {
      method: "POST",
      auth: true,
      body: JSON.stringify({
        module_id: body.module_id,
        title: body.title,
        type: body.type,
        content_url: body.content_url,
        duration_mins: body.duration_mins,
        is_preview: body.is_preview ?? false,
        sort_order: body.sort_order ?? 0,
      }),
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const status = error instanceof BackendError ? error.status : 502;
    const message = error instanceof BackendError ? error.message : "Failed to create lesson";
    return NextResponse.json({ error: message }, { status });
  }
}
