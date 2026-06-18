"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Target } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/utils";
import { fadeUp, scaleIn, slideInRight, staggerContainer } from "@/styles/animations";

interface HeroStat {
  value: string;
  label: string;
}

const HERO_STATS: HeroStat[] = [
  { value: "150+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "10+", label: "Industries Served" },
  { value: "5+", label: "Years of Experience" },
];

export function HeroSection() {
  return (
    <section id="hero" className="overflow-hidden bg-white pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium uppercase tracking-widest text-brand-orange"
          >
            Digital Solutions That Drive Growth
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-4xl font-semibold text-brand-blue sm:text-5xl lg:text-6xl"
          >
            Build, Launch, and Scale With{" "}
            <span className="text-brand-orange">Confidence</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base text-brand-muted">
            We help startups and SMEs grow faster through strategic marketing, powerful
            software solutions, and unforgettable branding that sets you apart in today&apos;s
            digital marketplace.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="rounded-md bg-brand-orange px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-orange-600"
            >
              Start Your Project Today
            </Link>
            <Link
              href="/services"
              className="rounded-md border border-brand-blue px-6 py-3 font-medium text-brand-blue transition-colors duration-200 hover:bg-brand-blue hover:text-white"
            >
              Explore Our Services
            </Link>
          </motion.div>

          <motion.dl
            variants={staggerContainer}
            className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4"
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
            src="/images/hero/hero-mockup.jpg"
            alt="Topnotch Tech device mockups showing web and software products"
            width={640}
            height={480}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            priority
            className="h-auto w-full rounded-2xl"
          />

          <div className="absolute -bottom-6 -left-6 hidden max-w-xs items-start gap-3 rounded-xl bg-brand-blue p-4 text-white shadow-lg sm:flex">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
              <Target size={18} />
            </span>
            <div>
              <p className="font-display text-sm font-semibold">Your Growth Is Our Mission</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
