"use client";

import { motion } from "framer-motion";
import { Handshake, Lightbulb, Scale, ShieldCheck, type LucideIcon } from "lucide-react";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface CoreValue {
  icon: LucideIcon;
  title: string;
  description: string;
}

const CORE_VALUES: CoreValue[] = [
  {
    icon: ShieldCheck,
    title: "Excellence",
    description: "We don't just deliver — we overdeliver.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace change and build with the future in mind.",
  },
  {
    icon: Scale,
    title: "Integrity",
    description: "Honesty guides every decision.",
  },
  {
    icon: Handshake,
    title: "Partnership",
    description: "Your success is our success.",
  },
];

export function CoreValues() {
  return (
    <section id="core-values" className="bg-brand-light py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-semibold text-brand-blue sm:text-4xl">
            Core Values That Drive Us
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-brand-orange" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CORE_VALUES.map(({ icon: Icon, title, description }) => (
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
