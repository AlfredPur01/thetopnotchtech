"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BLUR_DATA_URL } from "@/lib/utils";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { fadeUp, slideInRight, staggerContainer } from "@/styles/animations";

export function AboutELearningStory() {
  return (
    <section id="about-elearning-story" className="bg-brand-light py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl font-semibold text-brand-blue sm:text-4xl"
            >
              Why We Built This
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-6 text-base text-brand-muted">
              We spent years helping startups and SMEs build digital products and
              campaigns — and kept running into the same problem: skilled people are hard
              to find. So we started teaching the skills ourselves, drawing on the same
              practitioners who build real projects for our agency clients.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-4 text-base text-brand-muted">
              Every course on this platform is taught by someone with hands-on industry
              experience, and every lesson is built around real, practical work — not just
              theory.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl"
          >
            <Image
              src="/images/elearning/about-elearning-story.jpg"
              alt="Topnotch Tech instructor mentoring a student"
              fill
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover"
            />
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-16 grid grid-cols-3 gap-6 rounded-2xl bg-brand-blue py-10 text-center text-white"
        >
          <AnimatedCounter end={25} suffix="K+" label="Active Learners" />
          <AnimatedCounter end={120} suffix="+" label="Courses Available" />
          <AnimatedCounter end={98} suffix="%" label="Student Satisfaction" />
        </motion.div>
      </div>
    </section>
  );
}
