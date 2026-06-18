"use client";

import { motion } from "framer-motion";
import { Award, Headphones, MessageCircle, Puzzle, TrendingUp, type LucideIcon } from "lucide-react";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface WhyChooseUsItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const WHY_CHOOSE_US_ITEMS: WhyChooseUsItem[] = [
  {
    icon: Award,
    title: "Proven track record",
    description: "with startups and SMEs",
  },
  {
    icon: MessageCircle,
    title: "Clear communication",
    description: "& collaboration at every step",
  },
  {
    icon: Puzzle,
    title: "Tailored solutions",
    description: "for each business challenge",
  },
  {
    icon: TrendingUp,
    title: "Design-driven",
    description: "strategies that generate results",
  },
  {
    icon: Headphones,
    title: "Long-term support",
    description: "and partnership mentality",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="bg-brand-light py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center font-display text-3xl font-semibold text-brand-blue sm:text-4xl"
        >
          Why Choose Us?
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5"
        >
          {WHY_CHOOSE_US_ITEMS.map(({ icon: Icon, title, description }) => (
            <motion.div key={title} variants={fadeUp} className="text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-blue shadow-sm">
                <Icon size={22} />
              </span>
              <h3 className="mt-4 font-display text-sm font-semibold text-brand-blue">
                {title}
              </h3>
              <p className="mt-1 text-xs text-brand-muted">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
