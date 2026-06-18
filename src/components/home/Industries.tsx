"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  GraduationCap,
  Heart,
  Home,
  ShoppingCart,
  Truck,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface Industry {
  icon: LucideIcon;
  label: string;
}

const INDUSTRIES: Industry[] = [
  { icon: Heart, label: "Healthcare" },
  { icon: GraduationCap, label: "Education" },
  { icon: ShoppingCart, label: "E-Commerce" },
  { icon: Home, label: "Real Estate" },
  { icon: Wallet, label: "Fintech" },
  { icon: Truck, label: "Logistics" },
  { icon: Briefcase, label: "Professional Services" },
  { icon: Building2, label: "Organizations" },
];

export function Industries() {
  return (
    <section id="industries" className="bg-brand-light py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center font-display text-3xl font-semibold text-brand-blue sm:text-4xl"
        >
          Industries We Help Grow
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-8"
        >
          {INDUSTRIES.map(({ icon: Icon, label }) => (
            <motion.div key={label} variants={fadeUp} className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-blue shadow-sm">
                <Icon size={24} />
              </span>
              <p className="mt-3 text-sm font-medium text-brand-blue">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
