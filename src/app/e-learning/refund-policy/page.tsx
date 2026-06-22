import { LegalHero } from "@/components/legal/LegalHero";
import { LegalBody, type LegalSection } from "@/components/legal/LegalBody";

const REFUND_POLICY_SECTIONS: LegalSection[] = [
  {
    heading: "Overview",
    content: [
      "This Refund Policy applies to all course purchases made on the Topnotch Tech E-Learning platform. We want you to feel confident investing in a course, and this policy explains when a refund is available.",
    ],
  },
  {
    heading: "Eligibility for Refunds",
    content: [
      "You are eligible for a full refund if your request meets all of the following conditions:",
      [
        "The request is made within 7 days of the original purchase date.",
        "You have completed less than 20% of the course content.",
        "The course was purchased directly through our platform.",
      ],
    ],
  },
  {
    heading: "How to Request a Refund",
    content: [
      "To request a refund, email us at info@topnotchtech.com with your order details and the reason for your request. We will review your request and respond within 3 business days.",
    ],
  },
  {
    heading: "Non-Refundable Situations",
    content: [
      "Refunds will not be issued in the following situations:",
      [
        "The request is made more than 7 days after purchase.",
        "More than 20% of the course has been completed.",
        "A certificate of completion has already been issued for the course.",
        "The course was offered as part of a free promotion or bundle.",
      ],
    ],
  },
  {
    heading: "Processing Time",
    content: [
      "Approved refunds are processed back to your original payment method within 5–10 business days, depending on your bank or card provider.",
    ],
  },
  {
    heading: "Contact Us",
    content: [
      "If you have questions about this Refund Policy, please reach out to us:",
      ["Email: info@topnotchtech.com", "Phone: +234 801 123 4567"],
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <main>
      <LegalHero title="Refund Policy" lastUpdated="May 2025" />
      <LegalBody sections={REFUND_POLICY_SECTIONS} />
    </main>
  );
}
