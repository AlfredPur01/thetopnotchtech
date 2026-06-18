"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ListFilter } from "lucide-react";
import { BLUR_DATA_URL, cn } from "@/lib/utils";
import type { CaseStudy } from "@/lib/case-studies";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface CaseStudiesListProps {
  caseStudies: CaseStudy[];
}

const INDUSTRY_FILTERS = [
  "All",
  "E-Commerce",
  "SaaS",
  "Healthcare",
  "Education",
  "Finance",
  "Real Estate",
];

export function CaseStudiesList({ caseStudies }: CaseStudiesListProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredCaseStudies = useMemo(
    () =>
      activeFilter === "All"
        ? caseStudies
        : caseStudies.filter((caseStudy) => caseStudy.industry === activeFilter),
    [activeFilter, caseStudies]
  );

  return (
    <section id="case-studies-list" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2 text-sm font-medium text-brand-blue">
            <ListFilter size={16} />
            Filter by Industry:
          </span>
          {INDUSTRY_FILTERS.map((industry) => (
            <button
              key={industry}
              type="button"
              onClick={() => setActiveFilter(industry)}
              aria-pressed={activeFilter === industry}
              className={cn(
                "rounded-md border px-4 py-2 text-sm font-medium transition-colors duration-200",
                activeFilter === industry
                  ? "border-brand-blue bg-brand-blue text-white"
                  : "border-gray-300 text-brand-blue hover:border-brand-blue"
              )}
            >
              {industry}
            </button>
          ))}
        </div>

        {filteredCaseStudies.length === 0 ? (
          <p className="mt-12 text-center text-sm text-brand-muted">
            No case studies in this industry yet — check back soon.
          </p>
        ) : (
          <motion.div
            key={activeFilter}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mt-12 space-y-10"
          >
            {filteredCaseStudies.map((caseStudy) => (
              <motion.div
                key={caseStudy.slug}
                variants={fadeUp}
                className="grid grid-cols-1 gap-8 rounded-2xl border border-gray-100 p-6 shadow-sm lg:grid-cols-[2fr_3fr] lg:p-8"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={caseStudy.image}
                    alt={`${caseStudy.title} project showcase`}
                    fill
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-brand-orange px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    {caseStudy.badge}
                  </span>
                </div>

                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-widest text-brand-orange">
                        Project Overview
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-semibold text-brand-blue">
                        {caseStudy.title}
                      </h3>
                    </div>
                    <Link
                      href={`/case-studies/${caseStudy.slug}`}
                      className="hidden shrink-0 text-brand-blue underline-offset-4 hover:underline sm:inline-block"
                    >
                      View Full Case Study &rarr;
                    </Link>
                  </div>

                  <p className="mt-3 text-sm text-brand-muted">{caseStudy.description}</p>

                  <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
                        Challenges
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-brand-muted">
                        {caseStudy.challenges.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
                        Solutions Implemented
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-brand-muted">
                        {caseStudy.solutions.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue">
                        Key Results
                      </p>
                      <ul className="mt-2 space-y-1 text-sm">
                        {caseStudy.results.map((result) => (
                          <li key={result.label}>
                            <span className="font-display font-semibold text-brand-blue">
                              {result.value}
                            </span>{" "}
                            <span className="text-brand-muted">{result.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <blockquote className="mt-6 rounded-xl bg-brand-light p-4 text-sm italic text-brand-muted">
                    &ldquo;{caseStudy.testimonial.quote}&rdquo;
                    <footer className="mt-2 font-medium not-italic text-brand-blue">
                      — {caseStudy.testimonial.name}, {caseStudy.testimonial.role}
                    </footer>
                  </blockquote>

                  <Link
                    href={`/case-studies/${caseStudy.slug}`}
                    className="mt-4 inline-block text-brand-blue underline-offset-4 hover:underline sm:hidden"
                  >
                    View Full Case Study &rarr;
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
