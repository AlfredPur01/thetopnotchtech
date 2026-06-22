"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CourseCard } from "@/components/elearning/CourseCard";
import { COURSES } from "@/lib/courses";
import { getInstructorBySlug } from "@/lib/instructors";
import { fadeUp, staggerContainer } from "@/styles/animations";

const FEATURED_COURSES = COURSES.filter((course) => course.featured);

export function PopularCourses() {
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

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5"
        >
          {FEATURED_COURSES.map((course) => {
            const instructor = getInstructorBySlug(course.instructorSlug);
            if (!instructor) return null;

            return (
              <CourseCard
                key={course.slug}
                badge={course.badge}
                image={course.image}
                title={course.title}
                description={course.description}
                instructor={instructor.name}
                instructorAvatar={instructor.avatar}
                rating={course.rating}
                reviews={course.reviews}
                price={course.price}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
