import { NextRequest, NextResponse } from "next/server";
import { createCaseStudy, getAllCaseStudiesForAdmin, type CaseStudy } from "@/lib/case-studies";

export async function GET() {
  const caseStudies = await getAllCaseStudiesForAdmin();
  return NextResponse.json(caseStudies);
}

export async function POST(request: NextRequest) {
  const caseStudy = (await request.json()) as CaseStudy;

  if (!caseStudy.slug || !caseStudy.title) {
    return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
  }

  try {
    const created = await createCaseStudy(caseStudy);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 409 });
  }
}
