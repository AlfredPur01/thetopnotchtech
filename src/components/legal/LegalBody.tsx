"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/styles/animations";

export interface LegalSection {
  heading: string;
  content: (string | string[])[];
}

interface LegalBodyProps {
  sections: LegalSection[];
}

export function LegalBody({ sections }: LegalBodyProps) {
  return (
    <section id="legal-body" className="bg-white py-16 md:py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mx-auto max-w-3xl space-y-12 px-4 sm:px-6 lg:px-8"
      >
        {sections.map((section) => (
          <motion.div key={section.heading} variants={fadeUp}>
            <h2 className="font-display text-xl font-semibold text-brand-blue">
              {section.heading}
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-brand-muted">
              {section.content.map((block, index) =>
                Array.isArray(block) ? (
                  <ul key={index} className="list-disc space-y-2 pl-5">
                    {block.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={index}>{block}</p>
                )
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
