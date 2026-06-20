"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface OpenRole {
  title: string;
  department: string;
  type: "Full-time" | "Contract" | "Remote";
  location: string;
  description: string;
}

const OPEN_ROLES: OpenRole[] = [
  {
    title: "Frontend Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote (Nigeria)",
    description:
      "Build fast, accessible interfaces for our clients and our own products using React and Next.js.",
  },
  {
    title: "Brand Designer",
    department: "Design",
    type: "Contract",
    location: "Remote",
    description:
      "Craft logos, visual identities, and brand guidelines that help our clients stand out.",
  },
  {
    title: "Digital Marketing Specialist",
    department: "Marketing",
    type: "Full-time",
    location: "Lagos, Nigeria",
    description:
      "Plan and run paid and organic campaigns that drive measurable growth for our clients.",
  },
];

const TYPE_BADGE_STYLES: Record<OpenRole["type"], string> = {
  "Full-time": "bg-brand-blue/10 text-brand-blue",
  Contract: "bg-brand-orange/10 text-brand-orange",
  Remote: "bg-green-100 text-green-700",
};

function mailtoHref(role: string): string {
  const subject = encodeURIComponent(`Application: ${role}`);
  return `mailto:careers@topnotchtech.com?subject=${subject}`;
}

export function OpenRoles() {
  return (
    <section id="open-roles" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center font-display text-3xl font-semibold text-brand-blue sm:text-4xl"
        >
          Open Roles
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-12 space-y-6"
        >
          {OPEN_ROLES.map((role) => (
            <motion.div
              key={role.title}
              variants={fadeUp}
              className="flex flex-col gap-4 rounded-2xl border border-gray-100 p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-lg font-semibold text-brand-blue">
                    {role.title}
                  </h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${TYPE_BADGE_STYLES[role.type]}`}
                  >
                    {role.type}
                  </span>
                </div>
                <p className="mt-1 text-sm text-brand-muted">
                  {role.department} &middot;{" "}
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={14} />
                    {role.location}
                  </span>
                </p>
                <p className="mt-2 max-w-2xl text-sm text-brand-muted">{role.description}</p>
              </div>

              <Link
                href={mailtoHref(role.title)}
                className="shrink-0 rounded-md bg-brand-orange px-6 py-3 text-center font-medium text-white transition-colors duration-200 hover:bg-orange-600"
              >
                Apply Now
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
