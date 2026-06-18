"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/utils";
import { fadeUp, scaleIn, slideInRight, staggerContainer } from "@/styles/animations";

export function AboutHero() {
  return (
    <section id="about-hero" className="overflow-hidden bg-white pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium uppercase tracking-widest text-brand-orange"
          >
            Our DNA
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-4xl font-semibold text-brand-navy sm:text-5xl"
          >
            The Story Behind <span className="text-brand-blue">Topnotch Tech</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 text-base text-brand-muted">
            We are a digital agency built for ambition. Founded in Nigeria with a global
            mindset, Topnotch Tech empowers startups and SMEs with smart, scalable solutions
            that drive growth, create impact, and stand the test of time.
          </motion.p>

          <motion.p variants={fadeUp} className="mt-4 text-base text-brand-muted">
            We believe in creativity, innovation, and execution. Whether we&apos;re building a
            brand, developing a platform, or running a campaign, our mission remains the
            same: to help your business grow confidently in the digital age.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideInRight}
          className="relative"
        >
          <Image
            src="/images/about/about-team-photo.jpg"
            alt="Topnotch Tech team collaborating in the office"
            width={640}
            height={480}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            priority
            className="h-auto w-full rounded-2xl"
          />

          <motion.div
            variants={scaleIn}
            className="absolute -right-4 top-6 w-56 rounded-xl bg-brand-navy p-5 text-white shadow-lg sm:-right-8"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <Target size={18} />
            </span>
            <p className="mt-3 font-display text-sm font-semibold">Our Mission</p>
            <p className="mt-1 text-xs text-white/80">
              To empower startups and SMEs with the digital tools, strategies, and systems
              they need to grow, scale, and stand out.
            </p>
          </motion.div>

          <motion.div
            variants={scaleIn}
            className="absolute -bottom-6 -left-4 w-56 rounded-xl bg-white p-5 shadow-lg sm:-left-8"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
              <Eye size={18} />
            </span>
            <p className="mt-3 font-display text-sm font-semibold text-brand-blue">
              Our Vision
            </p>
            <p className="mt-1 text-xs text-brand-muted">
              To become a leading digital innovation partner for businesses across Africa
              and beyond.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
