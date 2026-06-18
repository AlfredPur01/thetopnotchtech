"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Headphones, Play, Sparkles, Target, type LucideIcon } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/utils";
import { fadeUp, scaleIn, slideInRight, staggerContainer } from "@/styles/animations";

interface TrustPill {
  icon: LucideIcon;
  title: string;
  description: string;
}

const TRUST_PILLS: TrustPill[] = [
  {
    icon: Target,
    title: "Results-Driven",
    description: "Focused on measurable growth and ROI",
  },
  {
    icon: Sparkles,
    title: "Tailored Solutions",
    description: "Customized to your goals, industry & audience",
  },
  {
    icon: Headphones,
    title: "Reliable Support",
    description: "We're with you every step of the way",
  },
  {
    icon: Award,
    title: "Proven Experience",
    description: "Helping startups & SMEs scale with confidence",
  },
];

export function ServicesHero() {
  return (
    <section id="services-hero" className="overflow-hidden bg-white pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium uppercase tracking-widest text-brand-orange"
          >
            Our Offerings
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-4xl font-semibold text-brand-navy sm:text-5xl"
          >
            Services Designed for <span className="text-brand-blue">Digital Domination</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base text-brand-muted">
            Powerful strategies. Smart technology. Creative identity. Everything your
            business needs to grow, stand out, and lead online.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {TRUST_PILLS.map(({ icon: Icon, title, description }) => (
              <motion.div key={title} variants={fadeUp} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-brand-blue">{title}</p>
                  <p className="text-xs text-brand-muted">{description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideInRight}
          className="relative"
        >
          <button
            type="button"
            aria-label="Play introduction video"
            className="group relative block w-full overflow-hidden rounded-2xl"
          >
            <Image
              src="/images/services/services-hero-video-thumbnail.jpg"
              alt="Topnotch Tech team in a strategy meeting"
              width={640}
              height={480}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              priority
              className="h-auto w-full"
            />
            <div className="absolute inset-0 bg-brand-navy/40 transition-colors duration-200 group-hover:bg-brand-navy/55" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-orange shadow-lg">
              <Play size={28} fill="currentColor" />
            </span>
          </button>

          <motion.div
            variants={scaleIn}
            className="absolute -bottom-6 -right-4 hidden max-w-xs items-start gap-3 rounded-xl bg-white p-4 shadow-lg sm:flex sm:-right-8"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
              <Sparkles size={18} />
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-brand-blue">Our Approach</p>
              <p className="mt-1 text-xs text-brand-muted">
                Strategy first. Technology second. Results always.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
