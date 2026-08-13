"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { BLUR_DATA_URL, cn } from "@/lib/utils";
import { fadeUp } from "@/styles/animations";

export interface CourseCardProps {
  slug: string;
  image: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  price: number;
}

function formatPrice(value: number): string {
  return value === 0 ? "Free" : `₦${value.toLocaleString("en-NG")}`;
}

export function CourseCard({
  slug,
  image,
  title,
  description,
  instructor,
  instructorAvatar,
  price,
}: CourseCardProps) {
  return (
    <motion.div variants={fadeUp}>
      <Link
        href={`/e-learning/courses/${slug}`}
        className="block overflow-hidden rounded-2xl border border-gray-100 shadow-sm transition-shadow duration-200 hover:shadow-md"
      >
        <div className="relative aspect-[4/3] bg-brand-light">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-brand-muted">
              <GraduationCap size={32} />
            </span>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-display text-base font-semibold text-brand-blue">{title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-brand-muted">{description}</p>

          <div className="mt-4 flex items-center gap-2">
            {instructorAvatar ? (
              <Image
                src={instructorAvatar}
                alt={instructor}
                width={24}
                height={24}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="h-6 w-6 rounded-full object-cover"
              />
            ) : (
              <span className="h-6 w-6 rounded-full bg-brand-light" />
            )}
            <span className="text-xs text-brand-muted">{instructor}</span>
          </div>

          <p
            className={cn(
              "mt-3 font-display text-sm font-semibold",
              price === 0 ? "text-green-600" : "text-brand-blue"
            )}
          >
            {formatPrice(price)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
