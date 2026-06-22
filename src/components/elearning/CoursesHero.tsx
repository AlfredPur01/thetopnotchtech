"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/styles/animations";

export function CoursesHero() {
  return (
    <section id="courses-hero" className="bg-white pt-12 pb-12 md:pb-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium uppercase tracking-widest text-brand-orange"
          >
            All Courses
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-4xl font-semibold text-brand-navy sm:text-5xl"
          >
            Find Your <span className="text-brand-blue">Next Skill</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-base text-brand-muted">
            Browse our full catalog of practical, instructor-led courses across development,
            design, marketing, business, and more.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
