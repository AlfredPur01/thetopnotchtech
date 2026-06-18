"use client";

import { Disclosure } from "@headlessui/react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { fadeUp, staggerContainer } from "@/styles/animations";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  id: string;
  heading: string;
  items: FAQItem[];
}

export function FAQAccordion({ id, heading, items }: FAQAccordionProps) {
  return (
    <section id={id} className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
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
          className="mt-10 space-y-4"
        >
          {items.map((item) => (
            <motion.div key={item.question} variants={fadeUp}>
              <Disclosure>
                {({ open }) => (
                  <div className="rounded-xl border border-gray-200 bg-brand-light px-6 py-4">
                    <Disclosure.Button className="flex w-full items-center justify-between text-left">
                      <span className="font-display text-base font-semibold text-brand-blue">
                        {item.question}
                      </span>
                      <ChevronDown
                        size={20}
                        className={`shrink-0 text-brand-orange transition-transform duration-200 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-3 text-sm text-brand-muted">
                      {item.answer}
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
