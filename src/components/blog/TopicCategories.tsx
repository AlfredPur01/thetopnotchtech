"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, Globe2, Megaphone, PenTool, Search, type LucideIcon } from "lucide-react";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface TopicCategory {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

const TOPIC_CATEGORIES: TopicCategory[] = [
  {
    icon: Megaphone,
    title: "Marketing Tips",
    description: "Proven strategies to attract, engage and convert more customers.",
    href: "/blog?topic=marketing-tips",
  },
  {
    icon: Code2,
    title: "Software Building",
    description: "Development guides, tools, and best practices for modern software solutions.",
    href: "/blog?topic=software-building",
  },
  {
    icon: PenTool,
    title: "Branding Guides",
    description: "Build strong brands that connect, inspire, and drive loyalty.",
    href: "/blog?topic=branding-guides",
  },
  {
    icon: Search,
    title: "SEO Tips",
    description: "Improve your search rankings and drive organic traffic that converts.",
    href: "/blog?topic=seo-tips",
  },
  {
    icon: Globe2,
    title: "Digital Presence",
    description: "Build and optimize your digital footprint across channels and platforms.",
    href: "/blog?topic=digital-presence",
  },
];

export function TopicCategories() {
  return (
    <section id="topic-categories" className="bg-brand-light py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center font-display text-3xl font-semibold text-brand-blue sm:text-4xl"
        >
          Explore Insights by Topic
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5"
        >
          {TOPIC_CATEGORIES.map(({ icon: Icon, title, description, href }) => (
            <motion.div key={title} variants={fadeUp} className="rounded-2xl bg-white p-6 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                <Icon size={22} />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-brand-blue">
                {title}
              </h3>
              <p className="mt-2 text-sm text-brand-muted">{description}</p>
              <Link
                href={href}
                className="mt-4 inline-block text-sm text-brand-orange underline-offset-4 hover:underline"
              >
                View Articles &rarr;
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
