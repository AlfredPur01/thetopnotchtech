"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BLUR_DATA_URL } from "@/lib/utils";
import { fadeUp, slideInRight, staggerContainer } from "@/styles/animations";

export function CultureSection() {
  return (
    <section id="culture" className="bg-brand-light py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl font-semibold text-brand-blue sm:text-4xl"
          >
            Life at Topnotch Tech
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-base text-brand-muted">
            We&apos;re a tight-knit team that believes great work comes from trust,
            autonomy, and curiosity. Whether we&apos;re shipping a client&apos;s new
            platform or learning a new tool together, we move fast, support each other,
            and always make room to grow.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInRight}
          className="relative aspect-[4/3] overflow-hidden rounded-2xl"
        >
          <Image
            src="/images/careers/team-culture.jpg"
            alt="Topnotch Tech team collaborating together in the office"
            fill
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
