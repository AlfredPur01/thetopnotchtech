"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface LegalHeroProps {
  title: string;
  lastUpdated: string;
}

export function LegalHero({ title, lastUpdated }: LegalHeroProps) {
  return (
    <section id="legal-hero" className="bg-brand-light pt-32 pb-12 md:pt-40 md:pb-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-semibold text-brand-navy sm:text-5xl"
          >
            {title}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-4 text-sm text-brand-muted">
            Last updated: {lastUpdated}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
