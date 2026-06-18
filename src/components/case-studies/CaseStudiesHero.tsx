"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BLUR_DATA_URL } from "@/lib/utils";
import { fadeUp, scaleIn, slideInRight, staggerContainer } from "@/styles/animations";

interface HeroStat {
  value: string;
  label: string;
}

const HERO_STATS: HeroStat[] = [
  { value: "20+", label: "Projects Delivered" },
  { value: "10+", label: "Industries Served" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "100%", label: "Results-Focused" },
];

export function CaseStudiesHero() {
  return (
    <section id="case-studies-hero" className="overflow-hidden bg-brand-light pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium uppercase tracking-widest text-brand-orange"
          >
            Our Results
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-4xl font-semibold text-brand-navy sm:text-5xl"
          >
            Impactful <span className="text-brand-blue">Case Studies</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base text-brand-muted">
            Real challenges. Smart solutions. Measurable results. Explore how we help
            businesses grow, scale, and lead in their industries.
          </motion.p>

          <motion.dl
            variants={staggerContainer}
            className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {HERO_STATS.map((stat) => (
              <motion.div key={stat.label} variants={scaleIn}>
                <dt className="font-display text-2xl font-semibold text-brand-blue">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-sm text-brand-muted">{stat.label}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={slideInRight}>
          <Image
            src="/images/case-studies/case-studies-hero.jpg"
            alt="Collage of websites and apps Topnotch Tech has built for clients"
            width={640}
            height={480}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            priority
            className="h-auto w-full rounded-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
