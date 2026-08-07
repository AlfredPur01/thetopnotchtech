"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { slugify } from "@/lib/utils";
import type { BlogHighlight, BlogPost } from "@/lib/blog";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

interface BlogPostFormProps {
  initialPost?: BlogPost;
}

const EMPTY_POST: BlogPost = {
  slug: "",
  category: "",
  title: "",
  excerpt: "",
  content: "",
  author: "Topnotch Tech Team",
  date: new Date().toISOString().slice(0, 10),
  readTime: "5 min read",
  image: "",
  featured: false,
  highlights: [],
  status: "draft",
  seoTitle: "",
  seoDescription: "",
};

export function BlogPostForm({ initialPost }: BlogPostFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialPost);
  const [post, setPost] = useState<BlogPost>(initialPost ?? EMPTY_POST);
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof BlogPost>(key: K, value: BlogPost[K]) {
    setPost((prev) => ({ ...prev, [key]: value }));
  }

  function handleTitleChange(title: string) {
    update("title", title);
    if (!slugTouched) {
      update("slug", slugify(title));
    }
  }

  function updateHighlight(index: number, updates: Partial<BlogHighlight>) {
    const highlights = [...(post.highlights ?? [])];
    highlights[index] = { ...highlights[index], ...updates };
    update("highlights", highlights);
  }

  function addHighlight() {
    const highlights = [...(post.highlights ?? [])];
    highlights.push({
      number: String(highlights.length + 1).padStart(2, "0"),
      title: "",
      description: "",
    });
    update("highlights", highlights);
  }

  function removeHighlight(index: number) {
    update("highlights", (post.highlights ?? []).filter((_, i) => i !== index));
  }

  async function handleSubmit(status: "draft" | "published") {
    setError(null);
    setIsSaving(true);

    const payload: BlogPost = { ...post, status };

    try {
      const response = await fetch(
        isEditing ? `/api/admin/blog/${initialPost!.slug}` : "/api/admin/blog",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? "Failed to save post");
        return;
      }

      router.push("/admin/blog");
      router.refresh();
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 rounded-2xl bg-white p-6 shadow-sm lg:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-brand-blue">Title</label>
          <input
            type="text"
            value={post.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-blue">Slug</label>
          <input
            type="text"
            value={post.slug}
            onChange={(e) => {
              setSlugTouched(true);
              update("slug", slugify(e.target.value));
            }}
            disabled={isEditing}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue disabled:bg-gray-50 disabled:text-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-blue">Category</label>
          <input
            type="text"
            value={post.category}
            onChange={(e) => update("category", e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-blue">Author</label>
          <input
            type="text"
            value={post.author}
            onChange={(e) => update("author", e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-blue">Date</label>
          <input
            type="date"
            value={post.date}
            onChange={(e) => update("date", e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-blue">Read Time</label>
          <input
            type="text"
            value={post.readTime}
            onChange={(e) => update("readTime", e.target.value)}
            placeholder="5 min read"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-brand-blue">Excerpt</label>
          <textarea
            value={post.excerpt}
            onChange={(e) => update("excerpt", e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div className="lg:col-span-2">
          <ImageUploadField label="Cover Image" value={post.image} onChange={(url) => update("image", url)} />
        </div>

        <div className="lg:col-span-2">
          <label className="flex items-center gap-2 text-sm font-medium text-brand-blue">
            <input
              type="checkbox"
              checked={post.featured ?? false}
              onChange={(e) => update("featured", e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
            />
            Feature this post
          </label>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <label className="block text-sm font-medium text-brand-blue">Article Body</label>
        <div className="mt-2">
          <RichTextEditor value={post.content} onChange={(html) => update("content", html)} />
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-brand-blue">Highlights (optional)</label>
          <button
            type="button"
            onClick={addHighlight}
            className="flex items-center gap-1 text-sm font-medium text-brand-blue hover:underline"
          >
            <Plus size={14} /> Add highlight
          </button>
        </div>

        <div className="mt-3 space-y-3">
          {(post.highlights ?? []).map((highlight, index) => (
            <div key={index} className="flex items-start gap-2 rounded-lg border border-gray-200 p-3">
              <input
                type="text"
                value={highlight.number}
                onChange={(e) => updateHighlight(index, { number: e.target.value })}
                className="w-14 rounded-md border border-gray-300 px-2 py-2 text-center text-sm"
              />
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={highlight.title}
                  onChange={(e) => updateHighlight(index, { title: e.target.value })}
                  placeholder="Highlight title"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  value={highlight.description}
                  onChange={(e) => updateHighlight(index, { description: e.target.value })}
                  placeholder="Highlight description"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => removeHighlight(index)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-gray-400 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 rounded-2xl bg-white p-6 shadow-sm lg:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-brand-blue">SEO Title (optional)</label>
          <input
            type="text"
            value={post.seoTitle ?? ""}
            onChange={(e) => update("seoTitle", e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-blue">SEO Description (optional)</label>
          <input
            type="text"
            value={post.seoDescription ?? ""}
            onChange={(e) => update("seoDescription", e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={isSaving || !post.title || !post.slug}
          onClick={() => handleSubmit("draft")}
          className="rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-brand-blue hover:border-brand-blue disabled:cursor-not-allowed disabled:opacity-60"
        >
          Save as Draft
        </button>
        <button
          type="button"
          disabled={isSaving || !post.title || !post.slug}
          onClick={() => handleSubmit("published")}
          className="rounded-md bg-brand-orange px-6 py-3 text-sm font-medium text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Publish"}
        </button>
      </div>
    </div>
  );
}
