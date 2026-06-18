"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/utils";
import type { CaseStudy } from "@/lib/case-studies";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface CaseStudyDetailProps {
  caseStudy: CaseStudy;
}

export function CaseStudyDetail({ caseStudy }: CaseStudyDetailProps) {
  return (
    <article className="bg-white pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-blue underline-offset-4 hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Case Studies
        </Link>

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="mt-6">
          <motion.span
            variants={fadeUp}
            className="text-xs font-medium uppercase tracking-widest text-brand-orange"
          >
            {caseStudy.badge}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="mt-3 font-display text-3xl font-semibold text-brand-blue sm:text-4xl"
          >
            {caseStudy.title}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-4 text-base text-brand-muted">
            {caseStudy.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl"
          >
            <Image
              src={caseStudy.image}
              alt={`${caseStudy.title} project showcase`}
              fill
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              priority
              className="object-cover"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3"
          >
            <motion.div variants={fadeUp}>
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
                Challenges
              </p>
              <ul className="mt-3 space-y-2 text-sm text-brand-muted">
                {caseStudy.challenges.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp}>
              <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
                Solutions Implemented
              </p>
              <ul className="mt-3 space-y-2 text-sm text-brand-muted">
                {caseStudy.solutions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp}>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue">
                Key Results
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {caseStudy.results.map((result) => (
                  <li key={result.label}>
                    <span className="font-display font-semibold text-brand-blue">
                      {result.value}
                    </span>{" "}
                    <span className="text-brand-muted">{result.label}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.blockquote
            variants={fadeUp}
            className="mt-10 rounded-2xl bg-brand-light p-6 text-base italic text-brand-muted"
          >
            &ldquo;{caseStudy.testimonial.quote}&rdquo;
            <footer className="mt-3 font-medium not-italic text-brand-blue">
              — {caseStudy.testimonial.name}, {caseStudy.testimonial.role}
            </footer>
          </motion.blockquote>

          <motion.div variants={fadeUp} className="mt-10">
            <Link
              href="/contact"
              className="inline-block rounded-md bg-brand-orange px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-orange-600"
            >
              Start a Project Like This
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </article>
  );
}
