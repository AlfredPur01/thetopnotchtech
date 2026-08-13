import { backendFetch } from "@/lib/server/backend-client";

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

// ---------------------------------------------------------------------------
// Backend <-> frontend mapping. topnotch-backend stores blog posts as
// `posts` rows with type='blog'; a handful of columns (category, author_name,
// read_time, featured, highlights) exist only to back this admin UI.
// ---------------------------------------------------------------------------

interface BackendPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  cover_image: string | null;
  status: "draft" | "published" | "archived";
  meta_title: string | null;
  meta_description: string | null;
  published_at: string | null;
  created_at: string;
  category: string | null;
  author_name: string | null;
  read_time: string | null;
  featured: boolean;
  highlights: BlogHighlight[];
}

function fromBackend(row: BackendPost): BlogPost {
  return {
    slug: row.slug,
    category: row.category ?? "",
    title: row.title,
    excerpt: row.excerpt ?? "",
    content: row.body,
    author: row.author_name ?? "",
    date: (row.published_at ?? row.created_at).slice(0, 10),
    readTime: row.read_time ?? "",
    image: row.cover_image ?? "",
    featured: row.featured,
    highlights: row.highlights,
    status: row.status === "archived" ? "draft" : row.status,
    seoTitle: row.meta_title ?? undefined,
    seoDescription: row.meta_description ?? undefined,
  };
}

function toBackendPayload(post: Partial<BlogPost>) {
  return {
    type: "blog" as const,
    ...(post.title !== undefined && { title: post.title }),
    ...(post.slug !== undefined && { slug: post.slug }),
    ...(post.excerpt !== undefined && { excerpt: post.excerpt }),
    ...(post.content !== undefined && { body: post.content }),
    ...(post.image !== undefined && post.image && { cover_image: post.image }),
    ...(post.status !== undefined && { status: post.status }),
    ...(post.seoTitle !== undefined && { meta_title: post.seoTitle }),
    ...(post.seoDescription !== undefined && { meta_description: post.seoDescription }),
    ...(post.category !== undefined && { category: post.category }),
    ...(post.author !== undefined && { author_name: post.author }),
    ...(post.readTime !== undefined && { read_time: post.readTime }),
    ...(post.featured !== undefined && { featured: post.featured }),
    ...(post.highlights !== undefined && { highlights: post.highlights }),
    ...(post.date !== undefined && post.date && { published_at: post.date }),
  };
}

async function getBackendPostBySlug(slug: string): Promise<BackendPost | undefined> {
  try {
    return await backendFetch<BackendPost>(`/posts/${slug}?type=blog`);
  } catch {
    return undefined;
  }
}

// ---------------------------------------------------------------------------
// Public API (unchanged signatures — callers don't need to change)
// ---------------------------------------------------------------------------

/** Published posts only, newest first — for public site pages. */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const { posts } = await backendFetch<{ posts: BackendPost[] }>(
    "/posts?type=blog&status=published&limit=50"
  );
  return posts.map(fromBackend).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const row = await getBackendPostBySlug(slug);
  if (!row || row.status !== "published") return undefined;
  return fromBackend(row);
}

/** All case studies regardless of status — for the admin dashboard only. */
export async function getAllBlogPostsForAdmin(): Promise<BlogPost[]> {
  const { posts } = await backendFetch<{ posts: BackendPost[] }>("/posts?type=blog&limit=50");
  return posts
    .filter((p) => p.status !== "archived")
    .map(fromBackend)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPostBySlugForAdmin(slug: string): Promise<BlogPost | undefined> {
  const row = await getBackendPostBySlug(slug);
  if (!row || row.status === "archived") return undefined;
  return fromBackend(row);
}

export async function createBlogPost(post: BlogPost): Promise<BlogPost> {
  const existing = await getBackendPostBySlug(post.slug);
  if (existing && existing.status !== "archived") {
    throw new Error(`Item with slug "${post.slug}" already exists`);
  }

  const created = await backendFetch<BackendPost>("/posts", {
    method: "POST",
    auth: true,
    body: JSON.stringify(toBackendPayload(post)),
  });
  return fromBackend(created);
}

export async function updateBlogPost(slug: string, updates: Partial<BlogPost>): Promise<BlogPost> {
  const existing = await getBackendPostBySlug(slug);
  if (!existing) {
    throw new Error(`Item with slug "${slug}" not found`);
  }

  const updated = await backendFetch<BackendPost>(`/posts/${existing.id}`, {
    method: "PATCH",
    auth: true,
    body: JSON.stringify(toBackendPayload(updates)),
  });
  return fromBackend(updated);
}

export async function deleteBlogPost(slug: string): Promise<void> {
  const existing = await getBackendPostBySlug(slug);
  if (!existing) return;

  await backendFetch(`/posts/${existing.id}`, { method: "DELETE", auth: true });
}
