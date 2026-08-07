"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/styles/animations";

interface PartnerLogo {
  name: string;
  file: string;
}

const PARTNER_LOGOS: PartnerLogo[] = [
  { name: "Raising New Voices", file: "raising-logo" },
  { name: "Odeumu Digital Hub", file: "odeomu-logo" },
  { name: "UKCDMA", file: "ukcdma-logo" },
  { name: "BifaLabs", file: "bifalab-logo" },
  { name: "Delivar", file: "delivar-logo" },
  { name: "Akidon", file: "akidon-logo" },
  { name: "Finosell", file: "finosell" },
  { name: "Sweet Finance", file: "sweetfinance" },
  { name: "Fifth Alley", file: "fifthalley" },
  { name: "The Dev Republic", file: "devrepublic-logo" },
  { name: "Moses Transport", file: "mosestransport-logo" },
  { name: "BAfrikart", file: "afromart-logo" },
  { name: "HandyPros", file: "handypros-logo" },
  { name: "Appmosphere", file: "appmosphere-logo" },
];

function PartnerLogoImage({ name, file }: PartnerLogo) {
  return (
    <Image
      src={`/images/partners/${file}.png`}
      alt={`${name} logo`}
      width={120}
      height={40}
      className="h-8 w-auto shrink-0 object-contain opacity-80 grayscale"
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

        <div className="mt-8 overflow-hidden">
          <motion.div
            className="flex items-center gap-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 32, ease: "linear", repeat: Infinity }}
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
