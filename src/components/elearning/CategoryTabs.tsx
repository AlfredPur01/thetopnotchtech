"use client";

import { motion } from "framer-motion";
import { BarChart3, Briefcase, Code2, Megaphone, Monitor, Palette, type LucideIcon } from "lucide-react";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface Category {
  icon: LucideIcon;
  title: string;
  count: number;
}

const CATEGORIES: Category[] = [
  { icon: Code2, title: "Development", count: 32 },
  { icon: Palette, title: "Design", count: 18 },
  { icon: Megaphone, title: "Marketing", count: 22 },
  { icon: Briefcase, title: "Business", count: 15 },
  { icon: BarChart3, title: "Data Science", count: 20 },
  { icon: Monitor, title: "IT & Software", count: 16 },
];

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
          {CATEGORIES.map(({ icon: Icon, title, count }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 p-4 text-center"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                <Icon size={18} />
              </span>
              <p className="font-display text-sm font-semibold text-brand-blue">{title}</p>
              <p className="text-xs text-brand-muted">{count} Courses</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
