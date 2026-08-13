"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/styles/animations";

interface LoginFormValues {
  email: string;
  password: string;
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/e-learning/dashboard";
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues): Promise<void> => {
    setServerError(null);

    const response = await fetch("/api/elearning/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      setServerError(body?.error ?? "Login failed. Please try again.");
      return;
    }

    router.push(returnTo);
    router.refresh();
  };

  return (
    <section id="login-form" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.h1
            variants={fadeUp}
            className="text-center font-display text-3xl font-semibold text-brand-blue"
          >
            Welcome Back
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-2 text-center text-sm text-brand-muted">
            Log in to continue your learning journey.
          </motion.p>

          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-8 space-y-5"
          >
              <div>
                <label htmlFor="email" className="text-sm font-medium text-brand-blue">
                  Email Address
                </label>
                <input
                  id="email"
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
                <label htmlFor="password" className="text-sm font-medium text-brand-blue">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...register("password", { required: "Password is required" })}
                  className="mt-1.5 w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none"
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                )}
                <Link
                  href="mailto:support@topnotchtech.com?subject=Password%20Reset"
                  className="mt-1.5 inline-block text-xs text-brand-blue underline-offset-4 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {serverError && <p className="text-sm text-red-600">{serverError}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-brand-orange px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-orange-600 disabled:opacity-60"
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </button>
            </motion.form>

          <motion.p variants={fadeUp} className="mt-6 text-center text-sm text-brand-muted">
            Don&apos;t have an account?{" "}
            <Link
              href="/e-learning/signup"
              className="text-brand-blue underline-offset-4 hover:underline"
            >
              Sign up free
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
