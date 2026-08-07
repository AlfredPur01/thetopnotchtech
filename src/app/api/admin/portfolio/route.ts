import { NextRequest, NextResponse } from "next/server";
import { createPortfolioProject, getAllPortfolioProjectsForAdmin, type PortfolioProject } from "@/lib/portfolio";

export async function GET() {
  const projects = await getAllPortfolioProjectsForAdmin();
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const project = (await request.json()) as PortfolioProject;

  if (!project.slug || !project.name) {
    return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
  }

  try {
    const created = await createPortfolioProject(project);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 409 });
  }
}
