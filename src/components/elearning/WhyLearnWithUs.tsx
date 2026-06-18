"use client";

import { motion } from "framer-motion";
import { Award, BookOpen, Headphones, Laptop, Puzzle, type LucideIcon } from "lucide-react";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface WhyLearnItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const WHY_LEARN_ITEMS: WhyLearnItem[] = [
  {
    icon: Puzzle,
    title: "Industry-Relevant Curriculum",
    description: "Courses designed to match today's in-demand skills.",
  },
  {
    icon: BookOpen,
    title: "Hands-On Projects",
    description: "Build real projects and strengthen your portfolio.",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "Get guidance and support from our expert team.",
  },
  {
    icon: Laptop,
    title: "Learn Anytime, Anywhere",
    description: "Access your courses on any device, anytime.",
  },
  {
    icon: Award,
    title: "Certificates",
    description: "Earn verifiable certificates to showcase your skills.",
  },
];

export function WhyLearnWithUs() {
  return (
    <section id="why-learn-with-us" className="bg-brand-light py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center font-display text-3xl font-semibold text-brand-blue sm:text-4xl"
        >
          Why Learn With Topnotch Tech?
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5"
        >
          {WHY_LEARN_ITEMS.map(({ icon: Icon, title, description }) => (
            <motion.div key={title} variants={fadeUp} className="text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue text-white">
                <Icon size={22} />
              </span>
              <h3 className="mt-4 font-display text-sm font-semibold text-brand-blue">{title}</h3>
              <p className="mt-1 text-xs text-brand-muted">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
