"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { requestPasswordReset } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await requestPasswordReset(trimmedEmail);

      // Supabase returns success even if email doesn't exist (security by design).
      // We always show "sent" to prevent email enumeration.
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

  if (sent) {
    return (
      <div className="space-y-6 text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl mx-auto">
          📧
        </div>
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

        <div className="space-y-3 pt-2">
          <p className="text-xs text-slate-500 font-semibold">
            Click the link in your email, then set your new password on the next page.
          </p>
          <button
            type="button"
            onClick={() => { setSent(false); setEmail(""); }}
            className="text-xs font-bold text-violet-600 hover:text-violet-700 transition-colors underline"
          >
            Try a different email address
          </button>
        </div>

        <Link
          href="/login"
          className="inline-flex w-full items-center justify-center py-3 rounded-2xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition-colors"
        >
          ← Back to Login
        </Link>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <form className="space-y-5" onSubmit={handleSubmit}>
        {errorMessage ? (
          <div
            className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
            role="alert"
          >
            ⚠️ {errorMessage}
          </div>
        ) : null}

        <Input
          autoComplete="email"
          label="Email address"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="parent@example.com"
          type="email"
          value={email}
        />

        <Button isLoading={isSubmitting} type="submit">
          Send Reset Link 📧
        </Button>
      </form>

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
