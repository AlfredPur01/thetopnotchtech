import { notFound } from "next/navigation";
import { getBlogPostBySlugForAdmin } from "@/lib/blog";
import { BlogPostForm } from "@/components/admin/blog/BlogPostForm";

interface EditBlogPostPageProps {
  params: { slug: string };
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const post = await getBlogPostBySlugForAdmin(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-brand-blue">Edit Blog Post</h1>
      <p className="mt-1 text-sm text-brand-muted">{post.title}</p>

      <div className="mt-6">
        <BlogPostForm initialPost={post} />
      </div>
    </div>
  );
}
