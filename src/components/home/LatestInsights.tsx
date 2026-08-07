"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/utils";
import type { BlogPost } from "@/lib/blog";
import { slideInLeft, slideInRight } from "@/styles/animations";

interface LatestInsightsProps {
  posts: BlogPost[];
}

export function LatestInsights({ posts }: LatestInsightsProps) {
  const insightPosts = posts.slice(0, 3);

  return (
    <section id="latest-insights" className="bg-brand-light py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInLeft}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-brand-blue sm:text-3xl">
              Latest Insights
            </h2>
            <Link href="/blog" className="text-brand-blue underline-offset-4 hover:underline">
              View All Articles &rarr;
            </Link>
          </div>

          {insightPosts.length === 0 ? (
            <p className="mt-8 text-sm text-brand-muted">
              No articles published yet — check back soon.
            </p>
          ) : (
            <div className="mt-8 space-y-6">
              {insightPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
                >
                  <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-medium uppercase tracking-widest text-brand-orange">
                      {post.category}
                    </span>
                    <h3 className="mt-1 font-display text-base font-semibold text-brand-blue">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-xs text-brand-muted">
                      {post.date} &middot; {post.readTime}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInRight}
          className="flex flex-col"
        >
          <h2 className="font-display text-2xl font-semibold text-brand-blue sm:text-3xl">
            Meet Topnotch Tech
          </h2>
          <button
            type="button"
            aria-label="Watch our story video"
            className="group relative mt-8 flex flex-1 items-center justify-center overflow-hidden rounded-2xl"
          >
            <Image
              src="/images/blog/meet-topnotch-tech-video-thumbnail.jpg"
              alt="Topnotch Tech team discussing a project"
              fill
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-brand-navy/50 transition-colors duration-200 group-hover:bg-brand-navy/60" />
            <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-orange shadow-lg">
              <Play size={28} fill="currentColor" />
            </span>
            <p className="absolute bottom-6 left-6 z-10 max-w-xs text-left text-sm font-medium text-white">
              Watch Our Story — See how we help businesses build, launch, and scale with
              confidence.
            </p>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
