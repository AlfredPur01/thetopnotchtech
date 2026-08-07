import { createContentStore } from "@/lib/server/content-store";

export interface BlogHighlight {
  number: string;
  title: string;
  description: string;
}

export type BlogPostStatus = "draft" | "published";

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  highlights?: BlogHighlight[];
  status: BlogPostStatus;
  seoTitle?: string;
  seoDescription?: string;
}

const store = createContentStore<BlogPost>("blog-posts.json", "slug");

function byDateDesc(a: BlogPost, b: BlogPost): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

/** Published posts only, newest first — for public site pages. */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = await store.getAll();
  return posts.filter((post) => post.status === "published").sort(byDateDesc);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const post = await store.getByKey(slug);
  return post?.status === "published" ? post : undefined;
}

/** All posts regardless of status — for the admin dashboard only. */
export async function getAllBlogPostsForAdmin(): Promise<BlogPost[]> {
  const posts = await store.getAll();
  return posts.sort(byDateDesc);
}

export async function getBlogPostBySlugForAdmin(slug: string): Promise<BlogPost | undefined> {
  return store.getByKey(slug);
}

export async function createBlogPost(post: BlogPost): Promise<BlogPost> {
  return store.create(post);
}

export async function updateBlogPost(slug: string, updates: Partial<BlogPost>): Promise<BlogPost> {
  return store.update(slug, updates);
}

export async function deleteBlogPost(slug: string): Promise<void> {
  return store.remove(slug);
}
