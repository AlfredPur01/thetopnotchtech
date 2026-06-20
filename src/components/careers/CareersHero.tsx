"use client";

import { motion } from "framer-motion";
import { fadeUp, scaleIn, staggerContainer } from "@/styles/animations";

interface HeroStat {
  value: string;
  label: string;
}

const HERO_STATS: HeroStat[] = [
  { value: "10+", label: "Team Members" },
  { value: "3", label: "Open Roles" },
];

export function CareersHero() {
  return (
    <section id="careers-hero" className="bg-white pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium uppercase tracking-widest text-brand-orange"
          >
            Careers
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-4xl font-semibold text-brand-navy sm:text-5xl"
          >
            Build Your Career <span className="text-brand-blue">With Us</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-base text-brand-muted">
            We&apos;re a small, ambitious team helping startups and SMEs grow — and
            we&apos;re always looking for people who care about doing great work.
          </motion.p>

          <motion.dl
            variants={staggerContainer}
            className="mt-10 flex items-center justify-center gap-12"
          >
            {HERO_STATS.map((stat) => (
              <motion.div key={stat.label} variants={scaleIn}>
                <dt className="font-display text-3xl font-semibold text-brand-blue">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-sm text-brand-muted">{stat.label}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}
