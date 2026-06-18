"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface PopularTopic {
  label: string;
  count: number;
}

const POPULAR_TOPICS: PopularTopic[] = [
  { label: "Digital Marketing", count: 24 },
  { label: "Blog", count: 16 },
  { label: "Web Development", count: 21 },
  { label: "Growth Strategy", count: 14 },
];

export function BlogSidebar() {
  return (
    <motion.aside
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="space-y-6"
    >
      <motion.div variants={fadeUp} className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="font-display text-base font-semibold text-brand-blue">Popular Topics</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {POPULAR_TOPICS.map((topic) => (
            <span
              key={topic.label}
              className="flex items-center gap-2 rounded-full bg-brand-light px-3 py-1.5 text-xs font-medium text-brand-blue"
            >
              {topic.label}
              <span className="rounded-full bg-white px-1.5 py-0.5 text-brand-muted">
                {topic.count}
              </span>
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="font-display text-base font-semibold text-brand-blue">Stay Updated</h3>
        <p className="mt-2 text-sm text-brand-muted">
          Get the latest insights and guides delivered to your inbox.
        </p>
        <form className="mt-4 space-y-3">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Enter your email address"
            className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-brand-orange px-6 py-2.5 font-medium text-white transition-colors duration-200 hover:bg-orange-600"
          >
            Subscribe Now
          </button>
        </form>
        <p className="mt-2 text-xs text-brand-muted">No spam. Unsubscribe anytime.</p>
      </motion.div>

      <motion.div variants={fadeUp} className="rounded-2xl bg-brand-blue p-6 text-white">
        <h3 className="font-display text-base font-semibold">Need a Custom Strategy?</h3>
        <p className="mt-2 text-sm text-white/80">
          Our team can help you create a digital strategy tailored to your business goals.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-block rounded-md border border-white px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-white hover:text-brand-blue"
        >
          Let&apos;s Talk &rarr;
        </Link>
      </motion.div>
    </motion.aside>
  );
}
