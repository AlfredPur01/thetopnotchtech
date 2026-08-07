"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BLUR_DATA_URL } from "@/lib/utils";
import type { CaseStudy } from "@/lib/case-studies";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface CaseStudiesPreviewProps {
  caseStudies: CaseStudy[];
}

export function CaseStudiesPreview({ caseStudies }: CaseStudiesPreviewProps) {
  return (
    <section id="case-studies-preview" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center font-display text-3xl font-semibold text-brand-blue sm:text-4xl"
        >
          Recent Success Stories
        </motion.h2>

        {caseStudies.length === 0 ? (
          <p className="mt-12 text-center text-sm text-brand-muted">
            No success stories published yet — check back soon.
          </p>
        ) : (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {caseStudies.map((caseStudy) => (
            <motion.div
              key={caseStudy.slug}
              variants={fadeUp}
              className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={caseStudy.image}
                  alt={`${caseStudy.title} project showcase`}
                  fill
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-medium uppercase tracking-widest text-brand-orange">
                  {caseStudy.badge}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-brand-blue">
                  {caseStudy.title}
                </h3>
                <p className="mt-2 text-sm text-brand-muted">{caseStudy.description}</p>
                <p className="mt-4 font-display text-2xl font-semibold text-brand-orange">
                  {caseStudy.results[0].value}
                </p>
                <p className="text-sm text-brand-muted">{caseStudy.results[0].label}</p>
                <Link
                  href={`/case-studies/${caseStudy.slug}`}
                  className="mt-4 inline-block text-brand-blue underline-offset-4 hover:underline"
                >
                  View Case Study &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        )}
      </div>
    </section>
  );
}
