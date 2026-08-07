import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogPostDetail } from "@/components/blog/BlogPostDetail";
import { getBlogPostBySlug } from "@/lib/blog";

interface BlogPostPageProps {
  params: { slug: string };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  return {
    title: post ? `${post.seoTitle ?? post.title} | Topnotch Tech Blog` : "Blog Post",
    description: post?.seoDescription ?? post?.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostDetail post={post} />;
}
