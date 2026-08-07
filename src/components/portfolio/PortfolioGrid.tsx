"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { BLUR_DATA_URL, cn } from "@/lib/utils";
import { PORTFOLIO_FILTERS, type PortfolioCategory } from "@/lib/portfolio-constants";
import type { PortfolioProject } from "@/lib/portfolio";
import { fadeUp } from "@/styles/animations";

interface PortfolioGridProps {
  projects: PortfolioProject[];
}

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>("All");

  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter, projects]
  );

  return (
    <section id="portfolio-grid" className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3">
          {PORTFOLIO_FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={cn(
                "rounded-md border px-4 py-2 text-sm font-medium transition-colors duration-200",
                activeFilter === filter
                  ? "border-brand-blue bg-brand-blue text-white"
                  : "border-gray-300 text-brand-blue hover:border-brand-blue"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="relative mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={fadeUp}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={project.image}
                    alt={`${project.name} project showcase`}
                    fill
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-brand-orange px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    {project.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-brand-blue">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-brand-muted">
                    Client: {project.client}
                  </p>
                  <p className="mt-3 text-sm text-brand-muted">{project.description}</p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-block text-brand-blue underline-offset-4 hover:underline"
                  >
                    View Project &rarr;
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <p className="mt-12 text-center text-sm text-brand-muted">
            No projects in this category yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
