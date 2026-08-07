import { NextRequest, NextResponse } from "next/server";
import { createBlogPost, getAllBlogPostsForAdmin, type BlogPost } from "@/lib/blog";

export async function GET() {
  const posts = await getAllBlogPostsForAdmin();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const post = (await request.json()) as BlogPost;

  if (!post.slug || !post.title) {
    return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
  }

  try {
    const created = await createBlogPost(post);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 409 });
  }
}
