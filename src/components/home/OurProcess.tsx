"use client";

import { motion } from "framer-motion";
import {
  ClipboardList,
  LayoutTemplate,
  LifeBuoy,
  Phone,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface ProcessStep {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    icon: Phone,
    title: "Discovery Call",
    description: "We understand your goals, challenges, and needs.",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Strategy & Planning",
    description: "We craft a tailored roadmap to achieve your objectives.",
  },
  {
    number: "03",
    icon: LayoutTemplate,
    title: "Design & Development",
    description: "We design and build with precision and care.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & Optimization",
    description: "We launch and optimize for the best performance.",
  },
  {
    number: "05",
    icon: LifeBuoy,
    title: "Growth Support",
    description: "We provide ongoing support to help you scale.",
  },
];

export function OurProcess() {
  return (
    <section id="our-process" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-brand-orange">
            Our Proven Process
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-brand-blue sm:text-4xl">
            A Simple Process. Powerful Results.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6"
        >
          {PROCESS_STEPS.map(({ number, icon: Icon, title, description }, index) => (
            <motion.div key={number} variants={fadeUp} className="relative text-center">
              {index < PROCESS_STEPS.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-6 hidden h-px w-full border-t border-dashed border-brand-orange/40 lg:block"
                />
              )}
              <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue text-white">
                <Icon size={22} />
              </div>
              <p className="mt-4 text-sm font-semibold text-brand-orange">{number}</p>
              <h3 className="mt-1 font-display text-lg font-semibold text-brand-blue">
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
