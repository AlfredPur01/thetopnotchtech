"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/styles/animations";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-lg">
        <motion.div variants={fadeUp}>
          <Image
            src="/logo/logo.svg"
            alt="Topnotch Tech Innovations logo"
            width={160}
            height={40}
            className="mx-auto h-9 w-auto"
          />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-10 font-display text-7xl font-semibold text-brand-orange sm:text-8xl"
        >
          404
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mt-4 font-display text-2xl font-semibold text-brand-navy sm:text-3xl"
        >
          Page not found
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-4 text-sm text-brand-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          Let&apos;s get you back on track.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-md bg-brand-orange px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-orange-600"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-brand-blue px-6 py-3 font-medium text-brand-blue transition-colors duration-200 hover:bg-brand-blue hover:text-white"
          >
            Contact Us
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
