"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { BLUR_DATA_URL, cn } from "@/lib/utils";
import { fadeUp } from "@/styles/animations";

export type CourseBadge = "Bestseller" | "Popular" | "Trending";

export interface CourseCardProps {
  badge?: CourseBadge;
  image: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  rating: number;
  reviews: number;
  price: number;
}

const BADGE_STYLES: Record<CourseBadge, string> = {
  Bestseller: "bg-brand-orange",
  Popular: "bg-brand-blue",
  Trending: "bg-green-600",
};

function formatNaira(value: number): string {
  return `₦${value.toLocaleString("en-NG")}`;
}

export function CourseCard({
  badge,
  image,
  title,
  description,
  instructor,
  instructorAvatar,
  rating,
  reviews,
  price,
}: CourseCardProps) {
  return (
    <motion.div variants={fadeUp} className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
      <div className="relative aspect-[4/3]">
        <Image
          src={image}
          alt={title}
          fill
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover"
        />
        {badge && (
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white",
              BADGE_STYLES[badge]
            )}
          >
            {badge}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-base font-semibold text-brand-blue">{title}</h3>
        <p className="mt-1 text-sm text-brand-muted">{description}</p>

        <div className="mt-4 flex items-center gap-2">
          <Image
            src={instructorAvatar}
            alt={instructor}
            width={24}
            height={24}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="h-6 w-6 rounded-full object-cover"
          />
          <span className="text-xs text-brand-muted">{instructor}</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={14}
                className={index < Math.round(rating) ? "fill-orange-400 text-orange-400" : "text-gray-300"}
              />
            ))}
            <span className="ml-1 text-xs text-brand-muted">
              {rating.toFixed(1)} ({reviews >= 1000 ? `${(reviews / 1000).toFixed(1)}K` : reviews})
            </span>
          </div>
          <p className="font-display text-sm font-semibold text-brand-blue">{formatNaira(price)}</p>
        </div>
      </div>
    </motion.div>
  );
}
