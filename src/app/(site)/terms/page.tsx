import { LegalHero } from "@/components/legal/LegalHero";
import { LegalBody, type LegalSection } from "@/components/legal/LegalBody";

const TERMS_SECTIONS: LegalSection[] = [
  {
    heading: "Introduction",
    content: [
      "These Terms of Service (\"Terms\") govern your use of the Topnotch Tech Innovations Ltd (\"Topnotch Tech\", \"we\", \"us\", or \"our\") website, e-learning platform, and digital marketing, software development, and branding services. By accessing our website or engaging our services, you agree to be bound by these Terms.",
      "If you do not agree with any part of these Terms, please do not use our website or services.",
    ],
  },
  {
    heading: "Use of Our Services",
    content: [
      "You agree to use our website and services only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use and enjoyment of, our website by any third party.",
      "Project engagements are governed by the specific proposal, quote, or agreement shared with you, which works alongside these general Terms. We reserve the right to refuse or discontinue service to anyone for conduct that violates these Terms.",
    ],
  },
  {
    heading: "Intellectual Property",
    content: [
      "Unless otherwise agreed in writing, all designs, code, content, and materials created by Topnotch Tech during a project remain our intellectual property until full payment is received, at which point ownership transfers to the client as specified in the project agreement.",
      "Our own brand assets, website content, course materials, and proprietary tools remain the property of Topnotch Tech Innovations Ltd and may not be copied, resold, or redistributed without our written consent.",
    ],
  },
  {
    heading: "Payment Terms (for E-Learning)",
    content: [
      "Course fees on our E-Learning platform must be paid in full before access is granted, unless an instalment plan has been explicitly offered for a specific course.",
      [
        "All prices are listed in Nigerian Naira (₦) unless otherwise stated.",
        "Access to a course is granted for the duration specified on the course page.",
        "Refunds are only available within 7 days of purchase and only if less than 20% of the course has been completed.",
      ],
    ],
  },
  {
    heading: "Limitation of Liability",
    content: [
      "Topnotch Tech provides its website, services, and course content on an \"as is\" and \"as available\" basis. While we strive for accuracy and reliability, we do not guarantee that our website or services will be uninterrupted, error-free, or that specific business results (such as sales or traffic growth) will be achieved.",
      "To the fullest extent permitted by law, Topnotch Tech shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website, services, or course content.",
    ],
  },
  {
    heading: "Governing Law (Nigeria)",
    content: [
      "These Terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising from these Terms or your use of our services shall be subject to the exclusive jurisdiction of the courts of Nigeria.",
    ],
  },
  {
    heading: "Changes to These Terms",
    content: [
      "We may update these Terms from time to time to reflect changes in our services or legal requirements. Updated Terms will be posted on this page with a revised \"last updated\" date. Continued use of our website or services after changes are posted constitutes your acceptance of the revised Terms.",
    ],
  },
  {
    heading: "Contact Us",
    content: [
      "If you have any questions about these Terms of Service, please reach out to us:",
      ["Email: info@topnotchtech.com", "Phone: +234 801 123 4567", "Address: Osogbo, Osun State, Nigeria"],
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <main>
      <LegalHero title="Terms of Service" lastUpdated="May 2025" />
      <LegalBody sections={TERMS_SECTIONS} />
    </main>
  );
}
