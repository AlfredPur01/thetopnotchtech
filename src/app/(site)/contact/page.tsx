import { ContactHero } from "@/components/contact/ContactHero";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactWhyChooseUs } from "@/components/contact/ContactWhyChooseUs";
import { WhatHappensNext } from "@/components/contact/WhatHappensNext";
import { OfficeMap } from "@/components/contact/OfficeMap";
import { TestimonialsGrid } from "@/components/ui/TestimonialsGrid";
import { FAQAccordion, type FAQItem } from "@/components/ui/FAQAccordion";
import { CTABanner } from "@/components/ui/CTABanner";
import { getTestimonialsByPlacement } from "@/lib/testimonials";

const CONTACT_FAQ_ITEMS: FAQItem[] = [
  {
    question: "How quickly do you respond to inquiries?",
    answer: "We respond to every inquiry within 24 hours, often much sooner during business hours.",
  },
  {
    question: "Do you work with startups and small businesses?",
    answer: "Yes — startups and SMEs are who we build for, with packages tailored to early-stage budgets.",
  },
  {
    question: "Can you redesign an existing website or app?",
    answer: "Absolutely. We audit what you have, identify what's holding it back, and rebuild on a modern, scalable foundation.",
  },
  {
    question: "Do you offer ongoing maintenance and support?",
    answer: "Yes. Every project includes a post-launch support window, plus optional monthly maintenance plans.",
  },
  {
    question: "Do you work with clients outside Nigeria?",
    answer: "Yes, we work with clients across Africa and beyond — all of our processes are built for remote collaboration.",
  },
];

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const testimonials = await getTestimonialsByPlacement("contact");

  return (
    <main>
      <ContactHero />
      <ContactChannels />

      <section id="contact-form-section" className="bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[3fr_2fr] lg:px-8">
          <ContactForm />
          <ContactWhyChooseUs />
        </div>
      </section>

      <WhatHappensNext />
      <TestimonialsGrid id="testimonials" heading="What Our Clients Say" testimonials={testimonials} />
      <FAQAccordion id="faq" heading="Frequently Asked Questions" items={CONTACT_FAQ_ITEMS} />
      <OfficeMap />

      <CTABanner
        heading="Ready to Grow Your Business?"
        subtext="Whether you're launching a startup, scaling your SME, or modernizing your operations, we're ready to help."
        primaryLabel="Start Your Project"
        primaryHref="#contact-form"
        secondaryLabel="Book Free Consultation"
        secondaryHref="https://wa.me/2348011234567"
        variant="blue"
      />
    </main>
  );
}
