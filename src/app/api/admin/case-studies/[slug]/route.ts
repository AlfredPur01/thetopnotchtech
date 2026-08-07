import { NextRequest, NextResponse } from "next/server";
import {
  deleteCaseStudy,
  getCaseStudyBySlugForAdmin,
  updateCaseStudy,
  type CaseStudy,
} from "@/lib/case-studies";

interface RouteParams {
  params: { slug: string };
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const caseStudy = await getCaseStudyBySlugForAdmin(params.slug);
  if (!caseStudy) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(caseStudy);
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const updates = (await request.json()) as Partial<CaseStudy>;

  try {
    const updated = await updateCaseStudy(params.slug, updates);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 404 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  await deleteCaseStudy(params.slug);
  return NextResponse.json({ ok: true });
}
