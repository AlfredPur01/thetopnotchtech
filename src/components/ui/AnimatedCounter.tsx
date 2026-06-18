"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { scaleIn } from "@/styles/animations";

interface AnimatedCounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  label: string;
  className?: string;
}

export function AnimatedCounter({ end, prefix = "", suffix = "", label, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCountUp({ end, start: isInView });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={scaleIn}
      className={className}
    >
      <p className="font-display text-3xl font-semibold sm:text-4xl">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-2 text-sm opacity-80">{label}</p>
    </motion.div>
  );
}
