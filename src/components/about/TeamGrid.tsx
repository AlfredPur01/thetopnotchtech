"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Linkedin, Twitter, UserRound } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/utils";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
  linkedin: string;
  twitter: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Ejidokun Moses Oluwaseun",
    role: "Co-founder & CEO",
    bio: "Responsible for setting the strategic direction, driving vision, corporate strategy, and overseeing all operations.",
    photo: "/images/team/moses-oluwaseun.jpg",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Alfred Ayilara Pur",
    role: "Co-founder & COO",
    bio: "Responsible for managing the day-to-day operations and ensuring operational excellence.",
    photo: "/images/team/alfred-ayilara-pur.jpg",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Patrick Chukwuemeka Okino",
    role: "CTO",
    bio: "Responsible for managing the technical stack, product innovation, and development, and ensuring security.",
    photo: "/images/team/patrick-okino.jpg",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Bakare Oluwaseun Victoria",
    role: "CCO",
    bio: "Responsible for an organization's overall creative direction, brand identity, and artistic strategy",
    photo: "/images/team/bakare-oluwaseun-victoria.jpg",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
];

const COMING_SOON_SLOTS = 2;

export function TeamGrid() {
  return (
    <section id="team" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center font-display text-3xl font-semibold text-brand-blue sm:text-4xl"
        >
          Meet the People Behind the Magic
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TEAM_MEMBERS.map((member) => (
            <motion.div
              key={member.name}
              variants={fadeUp}
              className="overflow-hidden rounded-2xl border-t-4 border-brand-orange bg-brand-light p-6"
            >
              <div className="flex items-start gap-4">
                <Image
                  src={member.photo}
                  alt={`Photo of ${member.name}`}
                  width={64}
                  height={64}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-display text-base font-semibold text-brand-blue">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-brand-orange">{member.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-brand-muted">{member.bio}</p>
              <div className="mt-4 flex items-center gap-3">
                <Link
                  href={member.linkedin}
                  aria-label={`${member.name} on LinkedIn`}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue text-white transition-colors duration-200 hover:bg-brand-orange"
                >
                  <Linkedin size={14} />
                </Link>
                <Link
                  href={member.twitter}
                  aria-label={`${member.name} on Twitter`}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-navy text-white transition-colors duration-200 hover:bg-brand-orange"
                >
                  <Twitter size={14} />
                </Link>
              </div>
            </motion.div>
          ))}

          {Array.from({ length: COMING_SOON_SLOTS }).map((_, index) => (
            <motion.div
              key={`coming-soon-${index}`}
              variants={fadeUp}
              className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 p-6 text-center"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-brand-muted">
                <UserRound size={28} />
              </span>
              <p className="mt-4 font-display text-base font-semibold text-brand-muted">
                Coming Soon
              </p>
              <p className="mt-1 text-sm text-brand-muted">
                A new team member will be joining this seat soon.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
