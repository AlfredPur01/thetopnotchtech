"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText, PhoneCall, Rocket, Send, type LucideIcon } from "lucide-react";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface NextStep {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const NEXT_STEPS: NextStep[] = [
  {
    number: "01",
    icon: Send,
    title: "Submit Inquiry",
    description: "Send us your project details using the form.",
  },
  {
    number: "02",
    icon: PhoneCall,
    title: "Discovery Call",
    description: "We'll schedule a call to understand your needs.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Proposal & Strategy",
    description: "We'll send a custom proposal and project roadmap.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Project Kickoff",
    description: "Once approved, we kick off and bring your vision to life.",
  },
];

export function WhatHappensNext() {
  return (
    <section id="what-happens-next" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center font-display text-3xl font-semibold text-brand-blue sm:text-4xl"
        >
          What Happens Next?
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {NEXT_STEPS.map(({ number, icon: Icon, title, description }, index) => (
            <motion.div key={number} variants={fadeUp} className="relative flex items-start gap-4 lg:flex-col lg:text-center">
              <div className="flex flex-col items-center gap-2 lg:w-full">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white">
                  <Icon size={20} />
                </span>
                {index < NEXT_STEPS.length - 1 && (
                  <ArrowRight
                    aria-hidden="true"
                    size={18}
                    className="hidden text-brand-orange lg:absolute lg:right-[-2.25rem] lg:top-5 lg:block"
                  />
                )}
              </div>
              <div className="lg:mt-2">
                <p className="text-xs font-semibold text-brand-orange">{number}</p>
                <h3 className="mt-1 font-display text-base font-semibold text-brand-blue">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-brand-muted">{description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
