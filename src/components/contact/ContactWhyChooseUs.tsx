"use client";

import { motion } from "framer-motion";
import { MessageSquare, Palette, Target, Users, Wrench, type LucideIcon } from "lucide-react";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface WhyChooseUsItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const WHY_CHOOSE_US_ITEMS: WhyChooseUsItem[] = [
  {
    icon: Target,
    title: "Results-Driven Approach",
    description: "We focus on measurable results that help your business grow and scale.",
  },
  {
    icon: MessageSquare,
    title: "Transparent Communication",
    description: "We keep you informed at every stage of the project with clear updates.",
  },
  {
    icon: Users,
    title: "Experienced Team",
    description: "Skilled professionals with years of experience across multiple industries.",
  },
  {
    icon: Wrench,
    title: "Custom-Built Solutions",
    description: "We design solutions tailored to your unique business needs.",
  },
  {
    icon: Palette,
    title: "Long-Term Support",
    description: "We don't just deliver and disappear. We're with you for the long run.",
  },
];

export function ContactWhyChooseUs() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="rounded-2xl bg-brand-light p-6 sm:p-8"
    >
      <h2 className="font-display text-xl font-semibold text-brand-blue">
        Why Businesses Choose Topnotch Tech
      </h2>

      <div className="mt-6 space-y-6">
        {WHY_CHOOSE_US_ITEMS.map(({ icon: Icon, title, description }) => (
          <motion.div key={title} variants={fadeUp} className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-brand-blue shadow-sm">
              <Icon size={18} />
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-brand-blue">{title}</p>
              <p className="mt-1 text-sm text-brand-muted">{description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
