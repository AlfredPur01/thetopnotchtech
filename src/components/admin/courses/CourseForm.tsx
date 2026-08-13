"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/utils";
import { COURSE_CATEGORIES, type CourseDetail, type CourseInput } from "@/lib/courses";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

interface CourseFormProps {
  initialCourse?: CourseDetail;
}

const LEVELS: CourseInput["level"][] = ["beginner", "intermediate", "advanced"];
const CURRENCIES: CourseInput["currency"][] = ["NGN", "USD"];

const EMPTY_COURSE: CourseInput = {
  title: "",
  slug: "",
  description: "",
  category: COURSE_CATEGORIES[0],
  image: "",
  level: "beginner",
  price: 0,
  currency: "NGN",
  duration_hours: undefined,
  status: "draft",
};

export function CourseForm({ initialCourse }: CourseFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialCourse);
  const [course, setCourse] = useState<CourseInput>(
    initialCourse
      ? {
          title: initialCourse.title,
          slug: initialCourse.slug,
          description: initialCourse.description,
          category: initialCourse.category,
          image: initialCourse.image,
          level: initialCourse.level,
          price: initialCourse.price,
          currency: initialCourse.currency,
          status: initialCourse.status === "archived" ? "draft" : initialCourse.status,
        }
      : EMPTY_COURSE
  );
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof CourseInput>(key: K, value: CourseInput[K]) {
    setCourse((prev) => ({ ...prev, [key]: value }));
  }

  function handleTitleChange(title: string) {
    update("title", title);
    if (!slugTouched) update("slug", slugify(title));
  }

  async function handleSubmit(status: "draft" | "published") {
    setError(null);
    setIsSaving(true);

    const payload: CourseInput = { ...course, status };

    try {
      const response = await fetch(
        isEditing ? `/api/admin/courses/${initialCourse!.slug}` : "/api/admin/courses",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? "Failed to save course");
        return;
      }

      router.push("/admin/courses");
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
            value={course.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-blue">Slug</label>
          <input
            type="text"
            value={course.slug}
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
          <select
            value={course.category}
            onChange={(e) => update("category", e.target.value as CourseInput["category"])}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          >
            {COURSE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-blue">Level</label>
          <select
            value={course.level}
            onChange={(e) => update("level", e.target.value as CourseInput["level"])}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          >
            {LEVELS.map((level) => (
              <option key={level} value={level} className="capitalize">
                {level}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-blue">Price (0 = free)</label>
          <input
            type="number"
            min={0}
            step="0.01"
            value={course.price}
            onChange={(e) => update("price", Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-blue">Currency</label>
          <select
            value={course.currency}
            onChange={(e) => update("currency", e.target.value as CourseInput["currency"])}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          >
            {CURRENCIES.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-brand-blue">Description</label>
          <textarea
            value={course.description}
            onChange={(e) => update("description", e.target.value)}
            rows={4}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div className="lg:col-span-2">
          <ImageUploadField
            label="Thumbnail"
            value={course.image ?? ""}
            onChange={(url) => update("image", url)}
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={isSaving || !course.title || !course.slug}
          onClick={() => handleSubmit("draft")}
          className="rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-brand-blue hover:border-brand-blue disabled:cursor-not-allowed disabled:opacity-60"
        >
          Save as Draft
        </button>
        <button
          type="button"
          disabled={isSaving || !course.title || !course.slug}
          onClick={() => handleSubmit("published")}
          className="rounded-md bg-brand-orange px-6 py-3 text-sm font-medium text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Publish"}
        </button>
      </div>

      {!isEditing && (
        <p className="text-xs text-brand-muted">
          Save the course first, then open it again to add modules and lessons.
        </p>
      )}
    </div>
  );
}
