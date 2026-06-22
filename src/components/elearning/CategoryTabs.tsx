"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BarChart3, Briefcase, Code2, Megaphone, Monitor, Palette, type LucideIcon } from "lucide-react";
import { COURSE_CATEGORIES, getCourseCountByCategory, type CourseCategory } from "@/lib/courses";
import { fadeUp, staggerContainer } from "@/styles/animations";

const CATEGORY_ICONS: Record<CourseCategory, LucideIcon> = {
  Development: Code2,
  Design: Palette,
  Marketing: Megaphone,
  Business: Briefcase,
  "Data Science": BarChart3,
  "IT & Software": Monitor,
};

export function CategoryTabs() {
  return (
    <section id="browse-by-category" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center font-display text-2xl font-semibold text-brand-blue sm:text-3xl"
        >
          Browse By Category
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
        >
          {COURSE_CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category];
            return (
              <motion.div key={category} variants={fadeUp}>
                <Link
                  href={`/e-learning/courses?category=${encodeURIComponent(category)}`}
                  className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 p-4 text-center transition-colors duration-200 hover:border-brand-blue"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                    <Icon size={18} />
                  </span>
                  <p className="font-display text-sm font-semibold text-brand-blue">{category}</p>
                  <p className="text-xs text-brand-muted">
                    {getCourseCountByCategory(category)} Courses
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
