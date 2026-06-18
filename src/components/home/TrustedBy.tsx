"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/styles/animations";

interface PartnerLogo {
  name: string;
  file: string;
}

const PARTNER_LOGOS: PartnerLogo[] = [
  { name: "Paystack", file: "paystack" },
  { name: "Clinicore", file: "clinicore" },
  { name: "Kuda", file: "kuda" },
  { name: "Lidya", file: "lidya" },
  { name: "Flutterwave", file: "flutterwave" },
  { name: "OPay", file: "opay" },
];

function PartnerLogoImage({ name, file }: PartnerLogo) {
  return (
    <Image
      src={`/images/partners/${file}.svg`}
      alt={`${name} logo`}
      width={120}
      height={32}
      className="h-7 w-auto shrink-0 object-contain opacity-80 grayscale"
    />
  );
}

export function TrustedBy() {
  return (
    <section id="trusted-by" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center text-xs font-medium uppercase tracking-widest text-brand-orange"
        >
          Trusted by Startups, SMEs &amp; Growing Brands
        </motion.p>

        <div className="mt-8 hidden items-center justify-between gap-10 lg:flex">
          {PARTNER_LOGOS.map((partner) => (
            <PartnerLogoImage key={partner.name} {...partner} />
          ))}
        </div>

        <div className="mt-8 overflow-hidden lg:hidden">
          <motion.div
            className="flex items-center gap-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
          >
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((partner, index) => (
              <PartnerLogoImage key={`${partner.name}-${index}`} {...partner} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
