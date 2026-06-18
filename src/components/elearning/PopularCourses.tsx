"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CourseCard, type CourseCardProps } from "@/components/elearning/CourseCard";
import { fadeUp, staggerContainer } from "@/styles/animations";

const POPULAR_COURSES: CourseCardProps[] = [
  {
    badge: "Bestseller",
    image: "/images/elearning/digital-marketing-masterclass.jpg",
    title: "Digital Marketing Masterclass",
    description: "Learn strategies to grow brands, generate leads and boost sales.",
    instructor: "David Okoro",
    instructorAvatar: "/images/team/instructor-david-okoro.jpg",
    rating: 4.8,
    reviews: 1200,
    price: 25000,
  },
  {
    badge: "Popular",
    image: "/images/elearning/full-stack-web-development.jpg",
    title: "Full Stack Web Development",
    description: "Build modern websites and web apps from scratch.",
    instructor: "Jane Doe",
    instructorAvatar: "/images/team/instructor-jane-doe.jpg",
    rating: 4.7,
    reviews: 980,
    price: 35000,
  },
  {
    badge: "Trending",
    image: "/images/elearning/ui-ux-design-fundamentals.jpg",
    title: "UI/UX Design Fundamentals",
    description: "Design beautiful, user-friendly interfaces and experiences.",
    instructor: "Patrick U.",
    instructorAvatar: "/images/team/instructor-patrick-u.jpg",
    rating: 4.6,
    reviews: 756,
    price: 20000,
  },
  {
    image: "/images/elearning/python-for-beginners.jpg",
    title: "Python for Beginners",
    description: "Master Python programming from the ground up.",
    instructor: "Chinedu A.",
    instructorAvatar: "/images/team/instructor-chinedu-a.jpg",
    rating: 4.9,
    reviews: 1100,
    price: 18000,
  },
  {
    image: "/images/elearning/mobile-app-development.jpg",
    title: "Mobile App Development",
    description: "Build and publish apps for Android & iOS.",
    instructor: "Fevi D.",
    instructorAvatar: "/images/team/instructor-fevi-d.jpg",
    rating: 4.6,
    reviews: 640,
    price: 30000,
  },
];

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
          {POPULAR_COURSES.map((course) => (
            <CourseCard key={course.title} {...course} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
