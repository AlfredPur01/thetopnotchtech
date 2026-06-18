"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Megaphone, Code2, Palette, type LucideIcon } from "lucide-react";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface ServiceCard {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

const SERVICE_CARDS: ServiceCard[] = [
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description:
      "Data-driven strategies that build visibility, engage audiences, and drive sustainable growth.",
    href: "/services#digital-marketing",
  },
  {
    icon: Code2,
    title: "Software Development",
    description:
      "Custom software solutions built for performance, scalability, and long-term impact.",
    href: "/services#software-development",
  },
  {
    icon: Palette,
    title: "Branding & Identity",
    description:
      "Craft compelling brands that connect with your audience and build lasting loyalty.",
    href: "/services#branding-identity",
  },
];

export function ServicesOverview() {
  return (
    <section id="services-overview" className="bg-brand-light py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-brand-orange">
            Our Services
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-brand-blue sm:text-4xl">
            Solutions Designed for Your Growth
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {SERVICE_CARDS.map(({ icon: Icon, title, description, href }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="rounded-2xl bg-white p-8 shadow-sm"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                <Icon size={24} />
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold text-brand-blue">
                {title}
              </h3>
              <p className="mt-3 text-sm text-brand-muted">{description}</p>
              <Link
                href={href}
                className="mt-6 inline-block text-brand-blue underline-offset-4 hover:underline"
              >
                Learn More &rarr;
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
