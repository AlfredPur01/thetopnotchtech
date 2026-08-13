import { NextRequest, NextResponse } from "next/server";
import { createCourse, getAllCoursesForAdmin, type CourseInput } from "@/lib/courses";

export async function GET() {
  const courses = await getAllCoursesForAdmin();
  return NextResponse.json(courses);
}

export async function POST(request: NextRequest) {
  const course = (await request.json()) as CourseInput;

  if (!course.slug || !course.title) {
    return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
  }

  try {
    const created = await createCourse(course);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 409 });
  }
}
