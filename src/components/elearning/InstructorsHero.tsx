"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/styles/animations";

export function InstructorsHero() {
  return (
    <section id="instructors-hero" className="bg-white pt-12 pb-12 md:pb-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium uppercase tracking-widest text-brand-orange"
          >
            Our Instructors
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-4xl font-semibold text-brand-navy sm:text-5xl"
          >
            Learn From <span className="text-brand-blue">Industry Practitioners</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-base text-brand-muted">
            Every course is taught by someone who has done the work — not just studied it.
            Meet the team behind your next skill.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
