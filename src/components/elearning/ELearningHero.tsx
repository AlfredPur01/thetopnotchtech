"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, BookOpen, Clock, Play, Users, type LucideIcon } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/utils";
import { fadeUp, scaleIn, slideInRight, staggerContainer } from "@/styles/animations";

interface HeroStat {
  icon: LucideIcon;
  value: string;
  label: string;
}

const HERO_STATS: HeroStat[] = [
  { icon: Users, value: "25K+", label: "Active Learners" },
  { icon: BookOpen, value: "120+", label: "Courses Available" },
  { icon: Award, value: "98%", label: "Student Satisfaction" },
];

interface FeaturePill {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURE_PILLS: FeaturePill[] = [
  { icon: Award, title: "Expert Instructors", description: "Learn from industry professionals" },
  { icon: Clock, title: "Flexible Learning", description: "Study at your own pace, anytime, anywhere" },
  { icon: BookOpen, title: "Certification", description: "Earn certificates to boost your career" },
  { icon: Users, title: "Affordable Pricing", description: "High-quality learning that fits your budget" },
];

export function ELearningHero() {
  return (
    <section id="e-learning-hero" className="overflow-hidden bg-white pt-12 pb-16 md:pb-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pt-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.span
            variants={fadeUp}
            className="inline-block rounded-full bg-brand-blue/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-blue"
          >
            E-Learning Platform
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-4xl font-semibold text-brand-navy sm:text-5xl"
          >
            Learn <span className="text-brand-blue">Today.</span>
            <br />
            Lead <span className="text-brand-blue">Tomorrow.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base text-brand-muted">
            Practical skills. Expert instructors. Real-world projects. Power your career and
            transform your future with Topnotch Tech E-Learning.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/e-learning/signup"
              className="rounded-md bg-brand-orange px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-orange-600"
            >
              Start Learning For Free
            </Link>
            <Link
              href="/e-learning/courses"
              className="rounded-md border border-brand-blue px-6 py-3 font-medium text-brand-blue transition-colors duration-200 hover:bg-brand-blue hover:text-white"
            >
              Explore Courses
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {FEATURE_PILLS.map(({ icon: Icon, title, description }) => (
              <motion.div key={title} variants={fadeUp}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                  <Icon size={16} />
                </span>
                <p className="mt-2 font-display text-xs font-semibold text-brand-blue">{title}</p>
                <p className="mt-1 text-xs text-brand-muted">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={slideInRight} className="relative">
          <button
            type="button"
            aria-label="Watch how it works video"
            className="group relative block w-full overflow-hidden rounded-2xl"
          >
            <Image
              src="/images/elearning/elearning-hero-student.jpg"
              alt="Student learning online with headphones and a laptop"
              width={640}
              height={480}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              priority
              className="h-auto w-full"
            />
            <div className="absolute inset-0 bg-brand-navy/30 transition-colors duration-200 group-hover:bg-brand-navy/45" />
            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-orange shadow-lg">
              <Play size={24} fill="currentColor" />
            </span>
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-4 py-1.5 text-xs font-medium text-brand-blue">
              Watch How It Works
            </span>
          </button>

          <motion.div
            variants={staggerContainer}
            className="absolute -right-2 top-4 flex flex-col gap-3 sm:-right-6"
          >
            {HERO_STATS.map(({ icon: Icon, value, label }) => (
              <motion.div
                key={label}
                variants={scaleIn}
                className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-lg"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                  <Icon size={16} />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-brand-blue">{value}</p>
                  <p className="text-xs text-brand-muted">{label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
