"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BLUR_DATA_URL } from "@/lib/utils";
import { fadeUp } from "@/styles/animations";

interface ArticleCardProps {
  image: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
}

export function ArticleCard({ image, category, title, excerpt, date, readTime, slug }: ArticleCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col gap-4 border-b border-gray-100 pb-6 sm:flex-row"
    >
      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-36">
        <Image
          src={image}
          alt={title}
          fill
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover"
        />
      </div>
      <div>
        <span className="text-xs font-medium uppercase tracking-widest text-brand-orange">
          {category}
        </span>
        <h3 className="mt-1 font-display text-base font-semibold text-brand-blue">{title}</h3>
        <p className="mt-1 text-sm text-brand-muted">{excerpt}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs text-brand-muted">
            {date} &middot; {readTime}
          </p>
          <Link
            href={`/blog/${slug}`}
            className="text-sm text-brand-blue underline-offset-4 hover:underline"
          >
            Read More &rarr;
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
