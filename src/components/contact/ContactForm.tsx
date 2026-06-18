"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/styles/animations";

interface ContactFormValues {
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  services: string[];
  budget: string;
  timeline: string;
  message: string;
}

const SERVICE_OPTIONS = [
  "Software Development",
  "Website Design",
  "Mobile App Development",
  "Digital Marketing",
  "Branding & Identity",
  "Consulting",
];

const BUDGET_OPTIONS = ["Under ₦500,000", "₦500,000 - ₦2,000,000", "₦2,000,000 - ₦5,000,000", "₦5,000,000+"];

const TIMELINE_OPTIONS = ["ASAP", "1-3 months", "3-6 months", "Flexible"];

const COUNTRY_CODES = [
  { code: "+234", label: "🇳🇬 +234" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+233", label: "🇬🇭 +233" },
  { code: "+254", label: "🇰🇪 +254" },
  { code: "+27", label: "🇿🇦 +27" },
];

export function ContactForm() {
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: { countryCode: "+234", services: [] },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Request failed");

      setSubmitState("success");
      reset();
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <motion.div
      id="contact-form"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
    >
      <h2 className="font-display text-xl font-semibold text-brand-blue">
        Tell Us About Your Project
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="text-sm font-medium text-brand-blue">
              Full Name *
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              {...register("fullName", { required: "Full name is required" })}
              className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none"
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-brand-blue">
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
              })}
              className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none"
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="phoneNumber" className="text-sm font-medium text-brand-blue">
            Phone Number *
          </label>
          <div className="mt-2 flex gap-2">
            <select
              aria-label="Country code"
              {...register("countryCode")}
              className="rounded-md border border-gray-300 px-2 py-2.5 text-sm focus:border-brand-blue focus:outline-none"
            >
              {COUNTRY_CODES.map(({ code, label }) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
            <input
              id="phoneNumber"
              type="tel"
              placeholder="801 123 4567"
              {...register("phoneNumber", {
                required: "Phone number is required",
                minLength: { value: 7, message: "Enter a valid phone number" },
              })}
              className="flex-1 rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none"
            />
          </div>
          {errors.phoneNumber && (
            <p className="mt-1 text-xs text-red-600">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div>
          <p className="text-sm font-medium text-brand-blue">
            What service do you need? (Select all that apply) *
          </p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SERVICE_OPTIONS.map((service) => (
              <label key={service} className="flex items-center gap-2 text-sm text-brand-muted">
                <input
                  type="checkbox"
                  value={service}
                  {...register("services", {
                    validate: (value) => value.length > 0 || "Select at least one service",
                  })}
                  className="h-4 w-4 rounded border-gray-300 text-brand-orange focus:ring-brand-orange"
                />
                {service}
              </label>
            ))}
          </div>
          {errors.services && (
            <p className="mt-1 text-xs text-red-600">{errors.services.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="budget" className="text-sm font-medium text-brand-blue">
              Project Budget *
            </label>
            <select
              id="budget"
              defaultValue=""
              {...register("budget", { required: "Select a budget range" })}
              className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none"
            >
              <option value="" disabled>
                Select your budget
              </option>
              {BUDGET_OPTIONS.map((budget) => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </select>
            {errors.budget && <p className="mt-1 text-xs text-red-600">{errors.budget.message}</p>}
          </div>

          <div>
            <label htmlFor="timeline" className="text-sm font-medium text-brand-blue">
              Timeline *
            </label>
            <select
              id="timeline"
              defaultValue=""
              {...register("timeline", { required: "Select a timeline" })}
              className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none"
            >
              <option value="" disabled>
                Select timeline
              </option>
              {TIMELINE_OPTIONS.map((timeline) => (
                <option key={timeline} value={timeline}>
                  {timeline}
                </option>
              ))}
            </select>
            {errors.timeline && (
              <p className="mt-1 text-xs text-red-600">{errors.timeline.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="text-sm font-medium text-brand-blue">
            Tell us about your project *
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Describe your project, goals, and any specific requirements..."
            {...register("message", { required: "Please tell us about your project" })}
            className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none"
          />
          {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-md bg-brand-orange px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-orange-600",
            isSubmitting && "cursor-not-allowed opacity-70"
          )}
        >
          {isSubmitting ? "Sending..." : "Send Inquiry"}
          <Send size={16} />
        </button>

        {submitState === "success" && (
          <p className="text-sm font-medium text-green-600">
            Thanks! Your inquiry has been sent — we&apos;ll be in touch within 24 hours.
          </p>
        )}
        {submitState === "error" && (
          <p className="text-sm font-medium text-red-600">
            Something went wrong sending your inquiry. Please try again.
          </p>
        )}

        <p className="text-xs text-brand-muted">
          🔒 Your information is safe with us. We never share your data.
        </p>
      </form>
    </motion.div>
  );
}
