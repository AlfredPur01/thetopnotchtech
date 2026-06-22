"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BLUR_DATA_URL } from "@/lib/utils";
import { COURSES } from "@/lib/courses";
import { INSTRUCTORS } from "@/lib/instructors";
import { fadeUp, staggerContainer } from "@/styles/animations";

export function InstructorsGrid() {
  return (
    <section id="instructors-grid" className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {INSTRUCTORS.map((instructor) => {
            const courseCount = COURSES.filter(
              (course) => course.instructorSlug === instructor.slug
            ).length;

            return (
              <motion.div
                key={instructor.slug}
                variants={fadeUp}
                className="rounded-2xl border border-gray-100 p-6 text-center shadow-sm"
              >
                <Image
                  src={instructor.avatar}
                  alt={instructor.name}
                  width={80}
                  height={80}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="mx-auto h-20 w-20 rounded-full object-cover"
                />
                <h3 className="mt-4 font-display text-lg font-semibold text-brand-blue">
                  {instructor.name}
                </h3>
                <p className="text-sm font-medium text-brand-orange">{instructor.title}</p>
                <p className="mt-3 text-sm text-brand-muted">{instructor.bio}</p>
                <p className="mt-4 text-xs font-medium uppercase tracking-wide text-brand-muted">
                  {courseCount} {courseCount === 1 ? "Course" : "Courses"}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
