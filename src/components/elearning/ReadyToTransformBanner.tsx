"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp } from "@/styles/animations";

export function ReadyToTransformBanner() {
  return (
    <section id="ready-to-transform" className="bg-brand-light py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:flex-row lg:justify-between lg:text-left lg:px-8"
      >
        <div>
          <h2 className="font-display text-2xl font-semibold text-brand-blue sm:text-3xl">
            Ready to Transform Your Future?
          </h2>
          <p className="mt-2 max-w-xl text-sm text-brand-muted">
            Join thousands of learners and start building the skills you need to succeed in
            the digital world.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-center gap-4">
          <Link
            href="/e-learning/signup"
            className="rounded-md bg-brand-orange px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-orange-600"
          >
            Start Learning For Free
          </Link>
          <Link
            href="/e-learning/courses"
            className="rounded-md border border-brand-blue px-6 py-3 font-medium text-brand-blue transition-colors duration-200 hover:bg-brand-blue hover:text-white"
          >
            Explore Courses
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
