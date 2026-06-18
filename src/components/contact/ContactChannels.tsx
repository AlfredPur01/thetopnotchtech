"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Mail, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface ContactChannel {
  icon: LucideIcon;
  title: string;
  value: string;
  href: string;
}

const CONTACT_CHANNELS: ContactChannel[] = [
  {
    icon: Mail,
    title: "Email Us",
    value: "info@topnotchtech.com",
    href: "mailto:info@topnotchtech.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+234 801 123 4567",
    href: "tel:+2348011234567",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Us",
    value: "Start a conversation",
    href: "https://wa.me/2348011234567",
  },
  {
    icon: Calendar,
    title: "Schedule a Meeting",
    value: "Book a free consultation",
    href: "/contact#contact-form",
  },
];

export function ContactChannels() {
  return (
    <section id="contact-channels" className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CONTACT_CHANNELS.map(({ icon: Icon, title, value, href }) => (
            <motion.div key={title} variants={fadeUp}>
              <Link
                href={href}
                className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 p-4 transition-colors duration-200 hover:border-brand-orange"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-brand-blue">
                      {title}
                    </p>
                    <p className="text-xs text-brand-muted">{value}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
