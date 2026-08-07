import { NextRequest, NextResponse } from "next/server";
import {
  deletePortfolioProject,
  getPortfolioProjectBySlugForAdmin,
  updatePortfolioProject,
  type PortfolioProject,
} from "@/lib/portfolio";

interface RouteParams {
  params: { slug: string };
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const project = await getPortfolioProjectBySlugForAdmin(params.slug);
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const updates = (await request.json()) as Partial<PortfolioProject>;

  try {
    const updated = await updatePortfolioProject(params.slug, updates);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 404 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  await deletePortfolioProject(params.slug);
  return NextResponse.json({ ok: true });
}
