"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CourseCard } from "@/components/elearning/CourseCard";
import type { Course } from "@/lib/courses";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface PopularCoursesProps {
  courses: Course[];
}

export function PopularCourses({ courses }: PopularCoursesProps) {
  const featured = courses.slice(0, 5);

  return (
    <section id="popular-courses" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="font-display text-2xl font-semibold text-brand-blue sm:text-3xl"
          >
            Popular Courses
          </motion.h2>
          <Link href="/e-learning/courses" className="text-brand-blue underline-offset-4 hover:underline">
            View All Courses &rarr;
          </Link>
        </div>

        {featured.length === 0 ? (
          <p className="mt-10 text-sm text-brand-muted">
            No courses published yet — check back soon.
          </p>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5"
          >
            {featured.map((course) => (
              <CourseCard
                key={course.slug}
                slug={course.slug}
                image={course.image}
                title={course.title}
                description={course.description}
                instructor={course.instructor.name}
                instructorAvatar={course.instructor.avatar}
                price={course.price}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
