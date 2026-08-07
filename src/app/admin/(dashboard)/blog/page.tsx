import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getAllBlogPostsForAdmin } from "@/lib/blog";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminBlogListPage() {
  const posts = await getAllBlogPostsForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-brand-blue">Blog Posts</h1>
          <p className="mt-1 text-sm text-brand-muted">Write and publish articles for the site.</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 rounded-md bg-brand-orange px-4 py-2.5 text-sm font-medium text-white hover:bg-orange-600"
        >
          <Plus size={16} /> New Post
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
        {posts.length === 0 ? (
          <p className="p-8 text-center text-sm text-brand-muted">
            No blog posts yet. Create your first one to get started.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 text-xs uppercase tracking-wide text-brand-muted">
              <tr>
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.slug}>
                  <td className="px-6 py-4 font-medium text-brand-blue">{post.title}</td>
                  <td className="px-6 py-4 text-brand-muted">{post.category}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={post.status} />
                  </td>
                  <td className="px-6 py-4 text-brand-muted">{post.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1">
                      <Link
                        href={`/admin/blog/${post.slug}`}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:bg-brand-light hover:text-brand-blue"
                        aria-label="Edit"
                      >
                        <Pencil size={16} />
                      </Link>
                      <DeleteButton
                        deleteUrl={`/api/admin/blog/${post.slug}`}
                        confirmMessage={`Delete "${post.title}"? This cannot be undone.`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
