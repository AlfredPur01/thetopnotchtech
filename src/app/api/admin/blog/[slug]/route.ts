import { NextRequest, NextResponse } from "next/server";
import { deleteBlogPost, getBlogPostBySlugForAdmin, updateBlogPost, type BlogPost } from "@/lib/blog";

interface RouteParams {
  params: { slug: string };
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const post = await getBlogPostBySlugForAdmin(params.slug);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const updates = (await request.json()) as Partial<BlogPost>;

  try {
    const updated = await updateBlogPost(params.slug, updates);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 404 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  await deleteBlogPost(params.slug);
  return NextResponse.json({ ok: true });
}
