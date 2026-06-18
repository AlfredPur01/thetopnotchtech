"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BLUR_DATA_URL } from "@/lib/utils";
import type { BlogPost } from "@/lib/blog";
import { fadeUp, slideInLeft, slideInRight, staggerContainer } from "@/styles/animations";

interface FeaturedArticleProps {
  post: BlogPost;
}

export function FeaturedArticle({ post }: FeaturedArticleProps) {
  return (
    <section id="featured-article" className="bg-white py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr_0.8fr] lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInLeft}
          className="relative aspect-[4/3] overflow-hidden rounded-2xl"
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
          <span className="absolute left-4 top-4 rounded-full bg-brand-blue px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Featured Article
          </span>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <span className="text-xs font-medium uppercase tracking-widest text-brand-orange">
            {post.category}
          </span>
          <h2 className="mt-3 font-display text-2xl font-semibold text-brand-blue sm:text-3xl">
            {post.title}
          </h2>
          <p className="mt-3 text-sm text-brand-muted">{post.excerpt}</p>
          <p className="mt-4 text-xs text-brand-muted">
            By {post.author} &middot; {post.date} &middot; {post.readTime}
          </p>
          <Link
            href={`/blog/${post.slug}`}
            className="mt-6 inline-block rounded-md bg-brand-blue px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-brand-navy"
          >
            Read Full Article &rarr;
          </Link>
        </motion.div>

        {post.highlights && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
          >
            <motion.ol variants={staggerContainer} className="space-y-5">
              {post.highlights.map((highlight) => (
                <motion.li key={highlight.number} variants={fadeUp} className="flex gap-3">
                  <span className="font-display text-sm font-semibold text-brand-orange">
                    {highlight.number}
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-brand-blue">
                      {highlight.title}
                    </p>
                    <p className="mt-1 text-xs text-brand-muted">{highlight.description}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
            <Link
              href="/blog?topic=marketing-tips"
              className="mt-6 inline-block text-sm text-brand-orange underline-offset-4 hover:underline"
            >
              View All Marketing Articles &rarr;
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
