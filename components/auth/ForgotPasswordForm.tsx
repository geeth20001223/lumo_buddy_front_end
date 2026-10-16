"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { requestPasswordReset } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

/**
 * Forgot Password Form Component.
 * 
 * Allows parent users to enter their email address and request a password reset email link.
 * 
 * Features:
 * - Client-side email validation
 * - Async API call to `requestPasswordReset(email)` via Supabase Auth
 * - Success confirmation view with inbox & spam checking instructions
 * - Option to try a different email or return to login
 * - Hot-toast notification alerts for user feedback
 */
export function ForgotPasswordForm() {
  // State for user email input
  const [email, setEmail] = useState("");
  // State for tracking button loading spinner during submit
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State for toggling between the input form and the success message screen
  const [sent, setSent] = useState(false);
  // State for inline error alert message
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Handles form submit event to request password reset link.
   * 
   * @param event - HTML form event
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedEmail = email.trim();

    // 1. Validate email input
    if (!trimmedEmail) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // 2. Call Supabase Auth requestPasswordReset helper
      const res = await requestPasswordReset(trimmedEmail);

      // Supabase returns success even if email doesn't exist (security by design to prevent enumeration).
      if (res.success || res.message?.toLowerCase().includes("rate limit") || res.message?.toLowerCase().includes("security")) {
        setSent(true);
        toast.success("Password reset link sent! Check your inbox.");
      } else {
        const msg = res.message || "We could not send the reset link. Please try again.";
        setErrorMessage(msg);
        toast.error(msg);
      }
    } catch {
      const msg = "Something went wrong. Please check your connection and try again.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  // --------------------------------------------------------------------------
  // Render Success Confirmation View (When reset link email is sent)
  // --------------------------------------------------------------------------
  if (sent) {
    return (
      <div className="space-y-6 text-center">
        {/* Email Icon Badge */}
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl mx-auto">
          📧
        </div>

        {/* Success Alert Box */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-800 space-y-2">
          <p className="text-base font-black text-emerald-900">Reset link sent!</p>
          <p>
            We sent a password reset link to <span className="font-black">{email}</span>.
            Please check your <strong>Gmail Inbox</strong> and also your{" "}
            <strong>Spam / Junk</strong> folder.
          </p>
          <p className="text-xs text-emerald-700 pt-1">
            The email comes from <strong>noreply@mail.app.supabase.io</strong>
          </p>
        </div>

        {/* Action Options */}
        <div className="space-y-3 pt-2">
          <p className="text-xs text-slate-500 font-semibold">
            Click the link in your email, then set your new password on the next page.
          </p>
          {/* Button to reset view and enter a different email address */}
          <button
            type="button"
            onClick={() => { setSent(false); setEmail(""); }}
            className="text-xs font-bold text-violet-600 hover:text-violet-700 transition-colors underline"
          >
            Try a different email address
          </button>
        </div>

        {/* Back to Login Link */}
        <Link
          href="/login"
          className="inline-flex w-full items-center justify-center py-3 rounded-2xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition-colors"
        >
          ← Back to Login
        </Link>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Render Initial Email Input Form View
  // --------------------------------------------------------------------------
  return (
    <>
      {/* Toast notification portal */}
      <Toaster position="top-center" />

      {/* Password Reset Request Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Error Alert Banner */}
        {errorMessage ? (
          <div
            className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
            role="alert"
          >
            ⚠️ {errorMessage}
          </div>
        ) : null}

        {/* Email Input Field */}
        <Input
          autoComplete="email"
          label="Email address"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="parent@example.com"
          type="email"
          value={email}
        />

        {/* Submit Button */}
        <Button isLoading={isSubmitting} type="submit">
          Send Reset Link 📧
        </Button>
      </form>

      {/* Footer Navigation Link */}
      <p className="mt-6 text-center text-sm text-slate-600">
        Remembered your password?{" "}
        <Link
          className="font-bold text-primary-blue transition hover:text-blue-600"
          href="/login"
        >
          Back to Login
        </Link>
      </p>
    </>
  );
}

