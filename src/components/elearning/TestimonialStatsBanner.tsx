"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/utils";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { fadeUp } from "@/styles/animations";

export function TestimonialStatsBanner() {
  return (
    <section id="elearning-testimonial" className="bg-brand-blue py-16 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-[2fr_1fr] lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex items-start gap-4"
        >
          <Quote size={32} className="shrink-0 text-white/60" aria-hidden="true" />
          <div>
            <p className="text-lg font-medium sm:text-xl">
              Topnotch Tech E-Learning changed my career. The courses are practical,
              well-structured and easy to follow.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Image
                src="/images/team/testimonial-adetola.jpg"
                alt="Adetola Adeyemi"
                width={40}
                height={40}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="font-display text-sm font-semibold">Adetola Adeyemi</p>
                <p className="text-xs text-white/70">Digital Marketer</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <AnimatedCounter end={25} suffix="K+" label="Active Learners" />
          <AnimatedCounter end={120} suffix="+" label="Expert Instructors" />
          <AnimatedCounter end={98} suffix="%" label="Satisfaction Rate" />
        </div>
      </div>
    </section>
  );
}
