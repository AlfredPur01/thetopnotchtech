"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface SignupFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export function SignupForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>();

  const onSubmit = async (data: SignupFormValues): Promise<void> => {
    setServerError(null);

    const response = await fetch("/api/elearning/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: data.fullName, email: data.email, password: data.password }),
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      setServerError(body?.error ?? "Sign up failed. Please try again.");
      return;
    }

    router.push("/e-learning/dashboard");
    router.refresh();
  };

  return (
    <section id="signup-form" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.h1
            variants={fadeUp}
            className="text-center font-display text-3xl font-semibold text-brand-blue"
          >
            Create Your Account
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-2 text-center text-sm text-brand-muted">
            Sign up free and start learning today.
          </motion.p>

          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-8 space-y-5"
          >
              <div>
                <label htmlFor="fullName" className="text-sm font-medium text-brand-blue">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  {...register("fullName", { required: "Full name is required" })}
                  className="mt-1.5 w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none"
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="signup-email" className="text-sm font-medium text-brand-blue">
                  Email Address
                </label>
                <input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                  })}
                  className="mt-1.5 w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="signup-password" className="text-sm font-medium text-brand-blue">
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  autoComplete="new-password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                  })}
                  className="mt-1.5 w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none"
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="text-sm font-medium text-brand-blue">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => value === watch("password") || "Passwords do not match",
                  })}
                  className="mt-1.5 w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="flex items-start gap-2">
                <input
                  id="agreeToTerms"
                  type="checkbox"
                  {...register("agreeToTerms", { required: "You must agree to continue" })}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                />
                <label htmlFor="agreeToTerms" className="text-sm text-brand-muted">
                  I agree to the{" "}
                  <Link href="/terms" className="text-brand-blue underline-offset-4 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-brand-blue underline-offset-4 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-xs text-red-600">{errors.agreeToTerms.message}</p>
              )}

              {serverError && <p className="text-sm text-red-600">{serverError}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-brand-orange px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-orange-600 disabled:opacity-60"
              >
                {isSubmitting ? "Creating account..." : "Sign Up Free"}
              </button>
            </motion.form>

          <motion.p variants={fadeUp} className="mt-6 text-center text-sm text-brand-muted">
            Already have an account?{" "}
            <Link href="/e-learning/login" className="text-brand-blue underline-offset-4 hover:underline">
              Log in
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
