"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/utils";
import { fadeUp, staggerContainer } from "@/styles/animations";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

interface TestimonialsGridProps {
  id: string;
  heading: string;
  testimonials: Testimonial[];
}

export function TestimonialsGrid({ id, heading, testimonials }: TestimonialsGridProps) {
  return (
    <section id={id} className="bg-brand-light py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center font-display text-3xl font-semibold text-brand-blue sm:text-4xl"
        >
          {heading}
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={fadeUp}
              className="rounded-2xl bg-white p-8 shadow-sm"
            >
              <Quote className="text-brand-orange" size={32} aria-hidden="true" />
              <p className="mt-4 text-sm text-brand-muted">{testimonial.quote}</p>
              <div className="mt-6 flex items-center gap-3">
                <Image
                  src={testimonial.avatar}
                  alt={`Photo of ${testimonial.name}`}
                  width={44}
                  height={44}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <p className="font-display text-sm font-semibold text-brand-blue">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-brand-muted">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
