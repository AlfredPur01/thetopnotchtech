"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/styles/animations";

export function HowItWorksHero() {
  return (
    <section id="how-it-works-hero" className="bg-white pt-12 pb-12 md:pb-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium uppercase tracking-widest text-brand-orange"
          >
            How It Works
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-4xl font-semibold text-brand-navy sm:text-5xl"
          >
            From Sign-Up to <span className="text-brand-blue">Certificate</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-base text-brand-muted">
            Here&apos;s exactly what to expect when you start learning with Topnotch Tech
            E-Learning — from choosing a course to earning your certificate.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
