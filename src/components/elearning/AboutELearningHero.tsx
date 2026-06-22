"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/styles/animations";

export function AboutELearningHero() {
  return (
    <section id="about-elearning-hero" className="bg-white pt-12 pb-12 md:pb-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium uppercase tracking-widest text-brand-orange"
          >
            About Our Platform
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-4xl font-semibold text-brand-navy sm:text-5xl"
          >
            Built By Practitioners, <span className="text-brand-blue">For Doers</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-base text-brand-muted">
            Topnotch Tech E-Learning is the training arm of Topnotch Tech Innovations Ltd —
            built to help people across Africa build real, practical skills they can use
            immediately in their careers and businesses.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
