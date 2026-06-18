"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/utils";
import { fadeUp, scaleIn, slideInRight, staggerContainer } from "@/styles/animations";

interface HeroStat {
  value: string;
  label: string;
}

const HERO_STATS: HeroStat[] = [
  { value: "24H", label: "Response Time" },
  { value: "150+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "Multiple", label: "Industries Served" },
];

export function ContactHero() {
  return (
    <section id="contact-hero" className="overflow-hidden bg-white pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium uppercase tracking-widest text-brand-orange"
          >
            Get Started
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-4xl font-semibold text-brand-navy sm:text-5xl"
          >
            Let&apos;s Build Something <span className="text-brand-blue">Extraordinary</span>{" "}
            Together
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base text-brand-muted">
            Tell us about your project, challenge, or growth goals. We&apos;ll respond within
            24 hours with actionable next steps.
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

        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideInRight}
          className="relative"
        >
          <Image
            src="/images/hero/contact-team-photo.jpg"
            alt="Topnotch Tech team discussing a client project"
            width={640}
            height={480}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            priority
            className="h-auto w-full rounded-2xl"
          />

          <div className="absolute -bottom-6 -left-6 hidden max-w-xs items-start gap-3 rounded-xl bg-brand-orange p-4 text-white shadow-lg sm:flex">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
              <BarChart3 size={18} />
            </span>
            <div>
              <p className="font-display text-sm font-semibold">
                We turn ideas into impactful digital solutions.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
