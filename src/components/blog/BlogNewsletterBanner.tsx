"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { fadeUp } from "@/styles/animations";

export function BlogNewsletterBanner() {
  return (
    <section id="blog-newsletter" className="bg-brand-blue py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:flex-row lg:justify-between lg:text-left lg:px-8"
      >
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
            <Send size={20} />
          </span>
          <div>
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              Want More Growth Strategies Like These?
            </h2>
            <p className="mt-2 text-sm text-white/80">
              Join 500+ businesses getting actionable insights every week.
            </p>
          </div>
        </div>

        <form className="flex w-full max-w-md gap-2">
          <label htmlFor="blog-newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="blog-newsletter-email"
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-md border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/60 focus:border-white focus:outline-none"
          />
          <button
            type="submit"
            className="shrink-0 rounded-md bg-brand-orange px-6 py-2.5 font-medium text-white transition-colors duration-200 hover:bg-orange-600"
          >
            Get Insights
          </button>
        </form>
      </motion.div>
    </section>
  );
}
