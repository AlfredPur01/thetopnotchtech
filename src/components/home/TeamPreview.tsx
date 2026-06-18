"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/utils";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface TeamMember {
  name: string;
  role: string;
  photo: string;
  linkedin: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Emeka Okafor",
    role: "CEO & Founder",
    photo: "/images/team/emeka-okafor.jpg",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Adesze Nwosu",
    role: "Lead Developer",
    photo: "/images/team/adesze-nwosu.jpg",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Ibrahim Bello",
    role: "UI/UX Designer",
    photo: "/images/team/ibrahim-bello.jpg",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Chiamaka Eze",
    role: "Marketing Strategist",
    photo: "/images/team/chiamaka-eze.jpg",
    linkedin: "https://linkedin.com",
  },
];

export function TeamPreview() {
  return (
    <section id="team-preview" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center font-display text-3xl font-semibold text-brand-blue sm:text-4xl"
        >
          Meet the Experts Behind the Work
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4"
        >
          {TEAM_MEMBERS.map((member) => (
            <motion.div key={member.name} variants={fadeUp} className="text-center">
              <Image
                src={member.photo}
                alt={`Photo of ${member.name}`}
                width={120}
                height={120}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="mx-auto h-28 w-28 rounded-full object-cover"
              />
              <h3 className="mt-4 font-display text-base font-semibold text-brand-blue">
                {member.name}
              </h3>
              <p className="text-sm text-brand-muted">{member.role}</p>
              <Link
                href={member.linkedin}
                aria-label={`${member.name} on LinkedIn`}
                className="mt-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue transition-colors duration-200 hover:bg-brand-blue hover:text-white"
              >
                <Linkedin size={16} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
