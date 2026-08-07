"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/utils";
import type { BlogPost } from "@/lib/blog";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface BlogPostDetailProps {
  post: BlogPost;
}

export function BlogPostDetail({ post }: BlogPostDetailProps) {
  return (
    <article className="bg-white pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-blue underline-offset-4 hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="mt-6">
          <motion.span
            variants={fadeUp}
            className="text-xs font-medium uppercase tracking-widest text-brand-orange"
          >
            {post.category}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="mt-3 font-display text-3xl font-semibold text-brand-blue sm:text-4xl"
          >
            {post.title}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-3 text-sm text-brand-muted">
            By {post.author} &middot; {post.date} &middot; {post.readTime}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl"
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              priority
              className="object-cover"
            />
          </motion.div>

          <motion.p variants={fadeUp} className="mt-8 text-base leading-relaxed text-brand-muted">
            {post.excerpt}
          </motion.p>

          {post.content && (
            <motion.div
              variants={fadeUp}
              className="prose prose-slate mt-8 max-w-none text-base leading-relaxed text-brand-muted prose-headings:font-display prose-headings:text-brand-blue prose-a:text-brand-blue"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}

          {post.highlights && (
            <motion.ol variants={staggerContainer} className="mt-8 space-y-6">
              {post.highlights.map((highlight) => (
                <motion.li key={highlight.number} variants={fadeUp} className="flex gap-4">
                  <span className="font-display text-base font-semibold text-brand-orange">
                    {highlight.number}
                  </span>
                  <div>
                    <p className="font-display text-base font-semibold text-brand-blue">
                      {highlight.title}
                    </p>
                    <p className="mt-1 text-sm text-brand-muted">{highlight.description}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          )}

          <motion.div variants={fadeUp} className="mt-10">
            <Link
              href="/contact"
              className="inline-block rounded-md bg-brand-orange px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-orange-600"
            >
              Talk to Our Team
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </article>
  );
}
