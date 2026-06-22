"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/styles/animations";

export function FAQsHero() {
  return (
    <section id="elearning-faqs-hero" className="bg-white pt-12 pb-12 md:pb-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium uppercase tracking-widest text-brand-orange"
          >
            Frequently Asked Questions
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-4xl font-semibold text-brand-navy sm:text-5xl"
          >
            Got <span className="text-brand-blue">Questions?</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-base text-brand-muted">
            Everything you need to know about enrolling, paying for, and completing a
            course on our platform.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
