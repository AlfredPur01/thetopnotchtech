"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUp, slideInLeft, slideInRight, staggerContainer } from "@/styles/animations";

interface ServiceStat {
  value: string;
  label: string;
}

interface ServiceBlockProps {
  id: string;
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
  benefits: string[];
  process: string[];
  stats: ServiceStat[];
  image: string;
  imageLabel: string;
  ctaLabel: string;
  ctaHref: string;
  imagePosition: "left" | "right";
}

export function ServiceBlock({
  id,
  number,
  icon,
  title,
  description,
  benefits,
  process,
  stats,
  image,
  imageLabel,
  ctaLabel,
  ctaHref,
  imagePosition,
}: ServiceBlockProps) {
  const imageVariant = imagePosition === "right" ? slideInRight : slideInLeft;
  const textVariant = imagePosition === "right" ? slideInLeft : slideInRight;

  return (
    <section
      id={id}
      className={cn("py-16 md:py-24", imagePosition === "left" ? "bg-brand-light" : "bg-white")}
    >
      <div
        className={cn(
          "mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8"
        )}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariant}
          className={cn(imagePosition === "left" && "lg:order-2")}
        >
          <p className="font-display text-sm font-semibold text-brand-orange">
            Service {number}
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-brand-blue sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base text-brand-muted">{description}</p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mt-8"
          >
            <p className="text-sm font-semibold text-brand-blue">Benefits</p>
            <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <motion.li
                  key={benefit}
                  variants={fadeUp}
                  className="flex items-start gap-2 text-sm text-brand-muted"
                >
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-orange" />
                  {benefit}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <div className="mt-8">
            <p className="text-sm font-semibold text-brand-blue">Our Process</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {process.map((step) => (
                <span
                  key={step}
                  className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-brand-muted"
                >
                  {step}
                </span>
              ))}
            </div>
          </div>

          <Link
            href={ctaHref}
            className="mt-8 inline-block rounded-md bg-brand-orange px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-orange-600"
          >
            {ctaLabel}
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={imageVariant}
          className={cn("relative", imagePosition === "left" && "lg:order-1")}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src={image}
              alt={`${title} illustration`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
              {icon}
              <p className="font-display text-lg font-semibold">{imageLabel}</p>
            </div>
          </div>

          <div className="relative z-10 -mt-8 mx-4 grid grid-cols-3 divide-x divide-gray-100 rounded-xl bg-white p-4 text-center shadow-lg">
            {stats.map((stat) => (
              <div key={stat.label} className="px-2">
                <p className="font-display text-lg font-semibold text-brand-blue">
                  {stat.value}
                </p>
                <p className="text-xs text-brand-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
