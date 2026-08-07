"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { slugify } from "@/lib/utils";
import type { CaseStudy } from "@/lib/case-studies";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { RepeatableListField } from "@/components/admin/RepeatableListField";

interface CaseStudyFormProps {
  initialCaseStudy?: CaseStudy;
}

const EMPTY_CASE_STUDY: CaseStudy = {
  slug: "",
  industry: "",
  badge: "",
  title: "",
  description: "",
  challenges: [],
  solutions: [],
  results: [],
  testimonial: { quote: "", name: "", role: "" },
  image: "",
  status: "draft",
  seoTitle: "",
  seoDescription: "",
};

export function CaseStudyForm({ initialCaseStudy }: CaseStudyFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialCaseStudy);
  const [caseStudy, setCaseStudy] = useState<CaseStudy>(initialCaseStudy ?? EMPTY_CASE_STUDY);
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof CaseStudy>(key: K, value: CaseStudy[K]) {
    setCaseStudy((prev) => ({ ...prev, [key]: value }));
  }

  function handleTitleChange(title: string) {
    update("title", title);
    if (!slugTouched) update("slug", slugify(title));
  }

  function updateResult(index: number, updates: Partial<{ value: string; label: string }>) {
    const results = [...caseStudy.results];
    results[index] = { ...results[index], ...updates };
    update("results", results);
  }

  function addResult() {
    update("results", [...caseStudy.results, { value: "", label: "" }]);
  }

  function removeResult(index: number) {
    update("results", caseStudy.results.filter((_, i) => i !== index));
  }

  async function handleSubmit(status: "draft" | "published") {
    setError(null);
    setIsSaving(true);

    const payload: CaseStudy = { ...caseStudy, status };

    try {
      const response = await fetch(
        isEditing ? `/api/admin/case-studies/${initialCaseStudy!.slug}` : "/api/admin/case-studies",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? "Failed to save case study");
        return;
      }

      router.push("/admin/case-studies");
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
            value={caseStudy.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-blue">Slug</label>
          <input
            type="text"
            value={caseStudy.slug}
            onChange={(e) => {
              setSlugTouched(true);
              update("slug", slugify(e.target.value));
            }}
            disabled={isEditing}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue disabled:bg-gray-50 disabled:text-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-blue">Industry</label>
          <input
            type="text"
            value={caseStudy.industry}
            onChange={(e) => update("industry", e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-blue">Badge</label>
          <input
            type="text"
            value={caseStudy.badge}
            onChange={(e) => update("badge", e.target.value)}
            placeholder="e.g. SaaS / Software"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-brand-blue">Description</label>
          <textarea
            value={caseStudy.description}
            onChange={(e) => update("description", e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div className="lg:col-span-2">
          <ImageUploadField label="Cover Image" value={caseStudy.image} onChange={(url) => update("image", url)} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 rounded-2xl bg-white p-6 shadow-sm lg:grid-cols-2">
        <RepeatableListField
          label="Challenges"
          items={caseStudy.challenges}
          onChange={(items) => update("challenges", items)}
          placeholder="e.g. Low website traffic"
        />
        <RepeatableListField
          label="Solutions"
          items={caseStudy.solutions}
          onChange={(items) => update("solutions", items)}
          placeholder="e.g. Complete branding overhaul"
        />
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-brand-blue">Results</label>
          <button
            type="button"
            onClick={addResult}
            className="flex items-center gap-1 text-sm font-medium text-brand-blue hover:underline"
          >
            <Plus size={14} /> Add result
          </button>
        </div>
        <div className="mt-3 space-y-2">
          {caseStudy.results.map((result, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={result.value}
                onChange={(e) => updateResult(index, { value: e.target.value })}
                placeholder="270%"
                className="w-28 rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
              <input
                type="text"
                value={result.label}
                onChange={(e) => updateResult(index, { label: e.target.value })}
                placeholder="Growth in sales"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
              <button
                type="button"
                onClick={() => removeResult(index)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-gray-400 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <label className="block text-sm font-medium text-brand-blue">Client Testimonial</label>
        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
          <textarea
            value={caseStudy.testimonial.quote}
            onChange={(e) => update("testimonial", { ...caseStudy.testimonial, quote: e.target.value })}
            placeholder="Quote"
            rows={2}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm lg:col-span-2"
          />
          <input
            type="text"
            value={caseStudy.testimonial.name}
            onChange={(e) => update("testimonial", { ...caseStudy.testimonial, name: e.target.value })}
            placeholder="Name"
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
          <input
            type="text"
            value={caseStudy.testimonial.role}
            onChange={(e) => update("testimonial", { ...caseStudy.testimonial, role: e.target.value })}
            placeholder="Role, Company"
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 rounded-2xl bg-white p-6 shadow-sm lg:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-brand-blue">SEO Title (optional)</label>
          <input
            type="text"
            value={caseStudy.seoTitle ?? ""}
            onChange={(e) => update("seoTitle", e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-blue">SEO Description (optional)</label>
          <input
            type="text"
            value={caseStudy.seoDescription ?? ""}
            onChange={(e) => update("seoDescription", e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={isSaving || !caseStudy.title || !caseStudy.slug}
          onClick={() => handleSubmit("draft")}
          className="rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-brand-blue hover:border-brand-blue disabled:cursor-not-allowed disabled:opacity-60"
        >
          Save as Draft
        </button>
        <button
          type="button"
          disabled={isSaving || !caseStudy.title || !caseStudy.slug}
          onClick={() => handleSubmit("published")}
          className="rounded-md bg-brand-orange px-6 py-3 text-sm font-medium text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Publish"}
        </button>
      </div>
    </div>
  );
}
