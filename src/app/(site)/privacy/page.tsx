import { LegalHero } from "@/components/legal/LegalHero";
import { LegalBody, type LegalSection } from "@/components/legal/LegalBody";

const PRIVACY_SECTIONS: LegalSection[] = [
  {
    heading: "Introduction",
    content: [
      "Topnotch Tech Innovations Ltd (\"Topnotch Tech\", \"we\", \"us\", or \"our\") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains what information we collect when you visit our website, submit a project inquiry, or subscribe to our newsletter, and how that information is used, stored, and protected.",
      "By using our website or services, you agree to the practices described in this policy. If you do not agree, please discontinue use of our website and services.",
    ],
  },
  {
    heading: "Information We Collect",
    content: [
      "We collect information you provide directly to us, including:",
      [
        "Contact details such as your full name, email address, and phone number submitted through our contact form.",
        "Project details, including the services you're interested in, your budget range, timeline, and project description.",
        "Your email address when you subscribe to our newsletter or download a resource.",
        "Any information you share with us via email, WhatsApp, or during a discovery call.",
      ],
      "We may also automatically collect limited technical information, such as your browser type and general usage patterns, to help us improve our website.",
    ],
  },
  {
    heading: "How We Use Your Information",
    content: [
      "We use the information we collect to:",
      [
        "Respond to your project inquiries and provide quotes or proposals.",
        "Communicate with you about your project, our services, or your account.",
        "Send newsletters and growth insights, where you have opted in.",
        "Improve our website, services, and customer experience.",
        "Comply with legal obligations under Nigerian law.",
      ],
      "We do not sell, rent, or trade your personal information to third parties for marketing purposes.",
    ],
  },
  {
    heading: "Data Storage and Security",
    content: [
      "Your information is stored on secure servers and handled in line with the Nigeria Data Protection Regulation (NDPR). We apply reasonable administrative, technical, and physical safeguards to protect your data against unauthorized access, alteration, or disclosure.",
      "While we take data security seriously, no method of transmission or storage is 100% secure. We retain personal information only for as long as necessary to fulfil the purposes outlined in this policy or as required by law.",
    ],
  },
  {
    heading: "Cookies",
    content: [
      "Our website may use cookies and similar technologies to remember your preferences and understand how visitors interact with our site. You can disable cookies through your browser settings, though some features of our website may not function as intended if you do so.",
    ],
  },
  {
    heading: "Third-Party Services",
    content: [
      "We may use trusted third-party tools — such as email delivery services, analytics providers, and payment processors — to operate our website and deliver our services. These providers only receive the information necessary to perform their function and are expected to handle your data securely and confidentially.",
    ],
  },
  {
    heading: "Your Rights",
    content: [
      "Under the NDPR, you have the right to:",
      [
        "Request access to the personal information we hold about you.",
        "Request correction of inaccurate or incomplete information.",
        "Request deletion of your personal information, subject to legal or contractual obligations.",
        "Withdraw consent to marketing communications at any time, including unsubscribing from our newsletter.",
      ],
      "To exercise any of these rights, please contact us using the details below.",
    ],
  },
  {
    heading: "Contact Us",
    content: [
      "If you have questions about this Privacy Policy or how we handle your information, please reach out to us:",
      ["Email: info@topnotchtech.com", "Phone: +234 801 123 4567", "Address: Osogbo, Osun State, Nigeria"],
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main>
      <LegalHero title="Privacy Policy" lastUpdated="May 2025" />
      <LegalBody sections={PRIVACY_SECTIONS} />
    </main>
  );
}
