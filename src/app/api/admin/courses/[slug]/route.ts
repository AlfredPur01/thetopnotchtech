import { NextRequest, NextResponse } from "next/server";
import { getCourseBySlugForAdmin, updateCourse, type CourseInput } from "@/lib/courses";

interface RouteParams {
  params: { slug: string };
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const course = await getCourseBySlugForAdmin(params.slug);
  if (!course) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(course);
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const updates = (await request.json()) as Partial<CourseInput>;

  try {
    await updateCourse(params.slug, updates);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 404 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  // No hard delete on the backend — mirrors the posts/blog pattern of
  // archiving instead of destroying course data (enrolments may reference it).
  try {
    await updateCourse(params.slug, { status: "archived" });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 404 });
  }
}
