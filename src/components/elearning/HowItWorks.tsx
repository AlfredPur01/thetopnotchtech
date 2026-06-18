"use client";

import { motion } from "framer-motion";
import { Award, BookOpen, Search, Wrench, type LucideIcon } from "lucide-react";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface HowItWorksStep {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    number: 1,
    icon: Search,
    title: "Choose a Course",
    description: "Browse and pick a course that fits your goals.",
  },
  {
    number: 2,
    icon: BookOpen,
    title: "Learn at Your Pace",
    description: "Access lessons anytime and learn at your own speed.",
  },
  {
    number: 3,
    icon: Wrench,
    title: "Practice & Build",
    description: "Apply what you learn with hands-on projects.",
  },
  {
    number: 4,
    icon: Award,
    title: "Get Certified",
    description: "Earn a certificate and showcase your new skills.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center font-display text-3xl font-semibold text-brand-blue sm:text-4xl"
        >
          How It Works
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {HOW_IT_WORKS_STEPS.map(({ number, icon: Icon, title, description }, index) => (
            <motion.div key={number} variants={fadeUp} className="relative text-center">
              {index < HOW_IT_WORKS_STEPS.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-7 hidden h-px w-full border-t border-dashed border-brand-blue/30 lg:block"
                />
              )}
              <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                <Icon size={24} />
              </div>
              <p className="mt-4 font-display text-sm font-semibold text-brand-orange">{number}</p>
              <h3 className="mt-1 font-display text-lg font-semibold text-brand-blue">{title}</h3>
              <p className="mt-2 text-sm text-brand-muted">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
