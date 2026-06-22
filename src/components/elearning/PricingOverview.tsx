"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Tag, Infinity as InfinityIcon, Users, type LucideIcon } from "lucide-react";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface PricingPillar {
  icon: LucideIcon;
  title: string;
  description: string;
}

const PRICING_PILLARS: PricingPillar[] = [
  {
    icon: Tag,
    title: "Pay Per Course",
    description: "Buy only the courses you need — no bundled subscription required.",
  },
  {
    icon: InfinityIcon,
    title: "Lifetime Access",
    description: "Once purchased, a course is yours to revisit anytime, at your own pace.",
  },
  {
    icon: Users,
    title: "Team & Bulk Discounts",
    description: "Training a team? Contact us for bulk pricing on multiple seats.",
  },
];

const WHATS_INCLUDED = [
  "Lifetime access to course materials",
  "Downloadable resources and project files",
  "Certificate of completion",
  "Instructor support throughout the course",
  "Access on mobile and desktop",
];

export function PricingOverview() {
  return (
    <section id="pricing-overview" className="bg-brand-light py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-8 sm:grid-cols-3"
        >
          {PRICING_PILLARS.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="rounded-2xl bg-white p-8 text-center shadow-sm"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                <Icon size={24} />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-brand-blue">
                {title}
              </h3>
              <p className="mt-2 text-sm text-brand-muted">{description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto mt-12 max-w-2xl rounded-2xl bg-white p-8 shadow-sm"
        >
          <h2 className="font-display text-xl font-semibold text-brand-blue">
            What&apos;s Included With Every Course
          </h2>
          <ul className="mt-5 space-y-3">
            {WHATS_INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-brand-muted">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-orange" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
