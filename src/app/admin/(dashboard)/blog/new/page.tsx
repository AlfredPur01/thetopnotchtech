import { BlogPostForm } from "@/components/admin/blog/BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-brand-blue">New Blog Post</h1>
      <p className="mt-1 text-sm text-brand-muted">Write a new article for the blog.</p>

      <div className="mt-6">
        <BlogPostForm />
      </div>
    </div>
  );
}
