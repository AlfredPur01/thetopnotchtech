"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/utils";
import { fadeUp, slideInLeft, slideInRight } from "@/styles/animations";

export function OfficeMap() {
  return (
    <section id="office-map" className="bg-brand-light py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[2fr_1fr] lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInLeft}
          className="relative aspect-[16/10] overflow-hidden rounded-2xl"
        >
          <Image
            src="/images/about/office-map.jpg"
            alt="Map showing Topnotch Tech's office location in Osogbo, Osun State"
            fill
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInRight}
          className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
        >
          <h2 className="font-display text-xl font-semibold text-brand-blue">Visit Our Office</h2>

          <motion.div variants={fadeUp} className="mt-6 flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
              <MapPin size={16} />
            </span>
            <p className="text-sm text-brand-muted">Osogbo, Osun State, Nigeria</p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-4 flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
              <Clock size={16} />
            </span>
            <div className="text-sm text-brand-muted">
              <p>Mon - Fri: 9AM - 5PM</p>
              <p>Saturday: 10AM - 2PM</p>
            </div>
          </motion.div>

          <Link
            href="https://maps.google.com"
            className="mt-6 inline-block rounded-md border border-brand-blue px-6 py-3 font-medium text-brand-blue transition-colors duration-200 hover:bg-brand-blue hover:text-white"
          >
            Get Directions &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
