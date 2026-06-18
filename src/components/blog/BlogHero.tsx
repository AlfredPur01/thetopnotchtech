"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Lightbulb, Search, TrendingUp } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/utils";
import { fadeUp, scaleIn, slideInRight, staggerContainer } from "@/styles/animations";

export function BlogHero() {
  return (
    <section id="blog-hero" className="overflow-hidden bg-white pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium uppercase tracking-widest text-brand-orange"
          >
            Insights
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-4xl font-semibold text-brand-navy sm:text-5xl"
          >
            Latest Digital Strategies <span className="text-brand-blue">&amp; Guides</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base text-brand-muted">
            Actionable insights, proven strategies, and expert guides to help your business
            grow, scale, and stay ahead.
          </motion.p>

          <motion.form variants={fadeUp} className="mt-8 flex max-w-md gap-2">
            <label htmlFor="blog-search" className="sr-only">
              Search articles, topics or keywords
            </label>
            <div className="relative flex-1">
              <Search
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted"
              />
              <input
                id="blog-search"
                type="search"
                placeholder="Search articles, topics or keywords..."
                className="w-full rounded-md border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-brand-blue focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-md bg-brand-blue px-6 py-2.5 font-medium text-white transition-colors duration-200 hover:bg-brand-navy"
            >
              Search
            </button>
          </motion.form>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideInRight}
          className="relative"
        >
          <Image
            src="/images/blog/blog-hero.jpg"
            alt="Laptop showing a digital strategy dashboard on a desk"
            width={640}
            height={480}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            priority
            className="h-auto w-full rounded-2xl"
          />

          <motion.div
            variants={scaleIn}
            className="absolute -left-4 top-6 hidden max-w-xs items-start gap-3 rounded-xl bg-white p-4 shadow-lg sm:flex"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
              <Lightbulb size={18} />
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-brand-blue">
                Expert Insights
              </p>
              <p className="mt-1 text-xs text-brand-muted">Practical. Actionable. Results.</p>
            </div>
          </motion.div>

          <motion.div
            variants={scaleIn}
            className="absolute -bottom-6 -right-4 hidden max-w-xs items-start gap-3 rounded-xl bg-white p-4 shadow-lg sm:flex sm:-right-8"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
              <TrendingUp size={18} />
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-brand-blue">
                Growth Focused
              </p>
              <p className="mt-1 text-xs text-brand-muted">Strategies that drive real business growth.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
