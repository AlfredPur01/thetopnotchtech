"use client";

import { motion } from "framer-motion";
import { BarChart3, Clock, Lightbulb, Target, type LucideIcon } from "lucide-react";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface WhyUsItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const WHY_US_ITEMS: WhyUsItem[] = [
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "We deliver on time without compromising quality.",
  },
  {
    icon: Lightbulb,
    title: "Strategic Thinking",
    description: "We don't just build, we solve problems and drive growth.",
  },
  {
    icon: BarChart3,
    title: "Measurable Results",
    description: "Our solutions are built to deliver real, measurable results.",
  },
  {
    icon: Target,
    title: "Long-Term Partnership",
    description: "We grow with you as your trusted digital partner.",
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="bg-brand-navy py-16 text-white md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center font-display text-3xl font-semibold sm:text-4xl"
        >
          Why Businesses Work With Us
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {WHY_US_ITEMS.map(({ icon: Icon, title, description }) => (
            <motion.div key={title} variants={fadeUp} className="text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-brand-orange">
                <Icon size={24} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-gray-300">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
