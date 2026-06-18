"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/styles/animations";

interface CTABannerProps {
  heading: string;
  subtext: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant: "orange" | "navy" | "blue";
}

const VARIANT_BG: Record<CTABannerProps["variant"], string> = {
  orange: "bg-brand-orange",
  navy: "bg-brand-navy",
  blue: "bg-brand-blue",
};

export function CTABanner({
  heading,
  subtext,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  variant,
}: CTABannerProps) {
  return (
    <section id="cta-banner" className={cn("py-16", VARIANT_BG[variant])}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:flex-row lg:justify-between lg:text-left lg:px-8"
      >
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
            <Rocket size={22} />
          </span>
          <div>
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              {heading}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-white/80">{subtext}</p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className={cn(
              "rounded-md px-6 py-3 font-medium transition-colors duration-200",
              variant === "orange"
                ? "bg-white text-brand-orange hover:bg-gray-100"
                : "bg-brand-orange text-white hover:bg-orange-600"
            )}
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="rounded-md border border-white px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-white hover:text-brand-navy"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  );
}
