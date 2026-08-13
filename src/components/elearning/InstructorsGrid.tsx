"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/utils";
import type { Instructor } from "@/lib/instructors";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface InstructorsGridProps {
  instructors: Instructor[];
}

export function InstructorsGrid({ instructors }: InstructorsGridProps) {
  return (
    <section id="instructors-grid" className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {instructors.length === 0 ? (
          <p className="text-center text-sm text-brand-muted">
            No instructors published yet — check back soon.
          </p>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {instructors.map((instructor) => (
              <motion.div
                key={instructor.name}
                variants={fadeUp}
                className="rounded-2xl border border-gray-100 p-6 text-center shadow-sm"
              >
                {instructor.avatar ? (
                  <Image
                    src={instructor.avatar}
                    alt={instructor.name}
                    width={80}
                    height={80}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="mx-auto h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-brand-muted">
                    <GraduationCap size={32} />
                  </span>
                )}
                <h3 className="mt-4 font-display text-lg font-semibold text-brand-blue">
                  {instructor.name}
                </h3>
                <p className="text-sm font-medium text-brand-orange">{instructor.title}</p>
                <p className="mt-3 text-sm text-brand-muted">{instructor.bio}</p>
                <p className="mt-4 text-xs font-medium uppercase tracking-wide text-brand-muted">
                  {instructor.courseCount} {instructor.courseCount === 1 ? "Course" : "Courses"}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
