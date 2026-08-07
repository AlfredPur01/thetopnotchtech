"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/styles/animations";

export default function ComingSoonPage() {
  return (
    <main>
      <section className="bg-brand-light flex min-h-screen items-center pt-32 pb-16 md:pt-40">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.p
              variants={fadeUp}
              className="text-sm font-semibold uppercase tracking-wide text-brand-orange"
            >
              E-Learning
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-4 font-display text-4xl font-semibold text-brand-navy sm:text-5xl"
            >
              Something new is on the way
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-base text-brand-muted sm:text-lg">
              Our e-learning platform is currently being reworked. Check back soon.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8">
              <Link
                href="/"
                className="inline-block rounded-md bg-brand-orange px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-orange-600"
              >
                Back to Home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
