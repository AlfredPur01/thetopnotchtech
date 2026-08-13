"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { COURSE_CATEGORIES, type Course, type CourseCategory } from "@/lib/courses";
import { CourseCard } from "@/components/elearning/CourseCard";
import { fadeUp } from "@/styles/animations";

interface CoursesCatalogProps {
  courses: Course[];
}

type CatalogFilter = "All" | CourseCategory;

function isCourseCategory(value: string | null): value is CourseCategory {
  return COURSE_CATEGORIES.includes(value as CourseCategory);
}

export function CoursesCatalog({ courses }: CoursesCatalogProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [activeFilter, setActiveFilter] = useState<CatalogFilter>(
    isCourseCategory(initialCategory) ? initialCategory : "All"
  );
  const [query, setQuery] = useState("");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory = activeFilter === "All" || course.category === activeFilter;
      const matchesQuery = course.title.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [courses, activeFilter, query]);

  return (
    <section id="courses-catalog" className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-3">
            {(["All", ...COURSE_CATEGORIES] as CatalogFilter[]).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
                className={cn(
                  "rounded-md border px-4 py-2 text-sm font-medium transition-colors duration-200",
                  activeFilter === filter
                    ? "border-brand-blue bg-brand-blue text-white"
                    : "border-gray-300 text-brand-blue hover:border-brand-blue"
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted"
            />
            <label htmlFor="course-search" className="sr-only">
              Search courses
            </label>
            <input
              id="course-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search courses..."
              className="w-full rounded-md border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-brand-blue focus:outline-none"
            />
          </div>
        </div>

        <div className="relative mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => {
              return (
                <motion.div
                  key={course.slug}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={fadeUp}
                  transition={{ duration: 0.3 }}
                >
                  <CourseCard
                    slug={course.slug}
                    image={course.image}
                    title={course.title}
                    description={course.description}
                    instructor={course.instructor.name}
                    instructorAvatar={course.instructor.avatar}
                    price={course.price}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredCourses.length === 0 && (
          <p className="mt-12 text-center text-sm text-brand-muted">
            No courses match your search — try a different keyword or category.
          </p>
        )}
      </div>
    </section>
  );
}
