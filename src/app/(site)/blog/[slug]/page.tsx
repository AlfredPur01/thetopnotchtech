import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogPostDetail } from "@/components/blog/BlogPostDetail";
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/blog";

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getBlogPostBySlug(params.slug);
  return { title: post ? `${post.title} | Topnotch Tech Blog` : "Blog Post" };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostDetail post={post} />;
}
