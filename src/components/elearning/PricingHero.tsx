"use client";

import { motion } from "framer-motion";
import { COURSES, getPriceRange } from "@/lib/courses";
import { fadeUp, staggerContainer } from "@/styles/animations";

function formatNaira(value: number): string {
  return `₦${value.toLocaleString("en-NG")}`;
}

export function PricingHero() {
  const { min, max } = getPriceRange();

  return (
    <section id="pricing-hero" className="bg-white pt-12 pb-12 md:pb-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium uppercase tracking-widest text-brand-orange"
          >
            Pricing
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-4xl font-semibold text-brand-navy sm:text-5xl"
          >
            Simple, <span className="text-brand-blue">Pay-As-You-Learn</span> Pricing
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-base text-brand-muted">
            No subscriptions, no hidden fees. Pay once for a course and keep access for as
            long as you need it.{" "}
            {COURSES.length > 0
              ? `Courses range from ${formatNaira(min)} to ${formatNaira(max)} depending on depth and length.`
              : "Course pricing will be published soon."}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
