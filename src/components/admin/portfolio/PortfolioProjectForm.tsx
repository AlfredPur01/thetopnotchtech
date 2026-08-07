"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/utils";
import { PORTFOLIO_FILTERS, type PortfolioCategory } from "@/lib/portfolio-constants";
import type { PortfolioProject } from "@/lib/portfolio";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

interface PortfolioProjectFormProps {
  initialProject?: PortfolioProject;
}

const CATEGORIES = PORTFOLIO_FILTERS.filter((filter) => filter !== "All") as Exclude<
  PortfolioCategory,
  "All"
>[];

const EMPTY_PROJECT: PortfolioProject = {
  slug: "",
  name: "",
  client: "",
  category: CATEGORIES[0],
  description: "",
  image: "",
  status: "draft",
  seoTitle: "",
  seoDescription: "",
};

export function PortfolioProjectForm({ initialProject }: PortfolioProjectFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialProject);
  const [project, setProject] = useState<PortfolioProject>(initialProject ?? EMPTY_PROJECT);
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof PortfolioProject>(key: K, value: PortfolioProject[K]) {
    setProject((prev) => ({ ...prev, [key]: value }));
  }

  function handleNameChange(name: string) {
    update("name", name);
    if (!slugTouched) update("slug", slugify(name));
  }

  async function handleSubmit(status: "draft" | "published") {
    setError(null);
    setIsSaving(true);

    const payload: PortfolioProject = { ...project, status };

    try {
      const response = await fetch(
        isEditing ? `/api/admin/portfolio/${initialProject!.slug}` : "/api/admin/portfolio",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? "Failed to save project");
        return;
      }

      router.push("/admin/portfolio");
      router.refresh();
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 rounded-2xl bg-white p-6 shadow-sm lg:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-brand-blue">Project Name</label>
          <input
            type="text"
            value={project.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-blue">Slug</label>
          <input
            type="text"
            value={project.slug}
            onChange={(e) => {
              setSlugTouched(true);
              update("slug", slugify(e.target.value));
            }}
            disabled={isEditing}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue disabled:bg-gray-50 disabled:text-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-blue">Client</label>
          <input
            type="text"
            value={project.client}
            onChange={(e) => update("client", e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-blue">Category</label>
          <select
            value={project.category}
            onChange={(e) => update("category", e.target.value as PortfolioProject["category"])}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-brand-blue">Description</label>
          <textarea
            value={project.description}
            onChange={(e) => update("description", e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div className="lg:col-span-2">
          <ImageUploadField label="Project Image" value={project.image} onChange={(url) => update("image", url)} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 rounded-2xl bg-white p-6 shadow-sm lg:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-brand-blue">SEO Title (optional)</label>
          <input
            type="text"
            value={project.seoTitle ?? ""}
            onChange={(e) => update("seoTitle", e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-blue">SEO Description (optional)</label>
          <input
            type="text"
            value={project.seoDescription ?? ""}
            onChange={(e) => update("seoDescription", e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={isSaving || !project.name || !project.slug}
          onClick={() => handleSubmit("draft")}
          className="rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-brand-blue hover:border-brand-blue disabled:cursor-not-allowed disabled:opacity-60"
        >
          Save as Draft
        </button>
        <button
          type="button"
          disabled={isSaving || !project.name || !project.slug}
          onClick={() => handleSubmit("published")}
          className="rounded-md bg-brand-orange px-6 py-3 text-sm font-medium text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Publish"}
        </button>
      </div>
    </div>
  );
}
