"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/styles/animations";

export function PortfolioHero() {
  return (
    <section id="portfolio-hero" className="bg-white pt-32 pb-12 md:pt-40 md:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl">
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium uppercase tracking-widest text-brand-orange"
          >
            Our Work
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-4xl font-semibold text-brand-navy sm:text-5xl"
          >
            Work That <span className="text-brand-blue">Speaks for Itself</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 text-base text-brand-muted">
            Explore a selection of projects where strategy, design, and technology came
            together to help real businesses grow.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
