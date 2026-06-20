"use client";

import { motion } from "framer-motion";
import { Globe2, GraduationCap, Heart, Wallet, type LucideIcon } from "lucide-react";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface Perk {
  icon: LucideIcon;
  title: string;
  description: string;
}

const PERKS: Perk[] = [
  {
    icon: Globe2,
    title: "Remote-Friendly",
    description: "Work from anywhere — we care about output, not hours.",
  },
  {
    icon: GraduationCap,
    title: "Learning Culture",
    description: "We invest in your growth with courses, mentorship, and new challenges.",
  },
  {
    icon: Heart,
    title: "Meaningful Work",
    description: "Every project helps a real business grow — your work matters.",
  },
  {
    icon: Wallet,
    title: "Competitive Pay",
    description: "We pay fairly and reward great work.",
  },
];

export function WhyWorkWithUs() {
  return (
    <section id="why-work-with-us" className="bg-brand-light py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center font-display text-3xl font-semibold text-brand-blue sm:text-4xl"
        >
          Why Work With Us
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PERKS.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="rounded-2xl bg-white p-8 text-center shadow-sm"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                <Icon size={24} />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-brand-blue">
                {title}
              </h3>
              <p className="mt-2 text-sm text-brand-muted">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
