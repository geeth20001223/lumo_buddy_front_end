"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type PageState = "loading" | "invalid" | "ready" | "success";

export function ResetPasswordForm() {
  const router = useRouter();
  const [pageState, setPageState] = useState<PageState>("loading");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // When Supabase redirects back after clicking the email link, it appends
  // the recovery token as a URL hash: #access_token=...&type=recovery
  // We need to let Supabase parse this hash and establish a session.
  useEffect(() => {
    async function resolveSession() {
      // Give Supabase a moment to parse the hash and set the session
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        // Valid recovery or regular session — allow password update
        setPageState("ready");
        return;
      }

      // Listen for the PASSWORD_RECOVERY event from the hash
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === "PASSWORD_RECOVERY" && session) {
            setPageState("ready");
          }
        }
      );

      // Wait briefly for the auth event to fire from hash parsing
      setTimeout(async () => {
        const { data: { session: latestSession } } = await supabase.auth.getSession();
        if (!latestSession) {
          setPageState("invalid");
        }
      }, 2500);

      return () => subscription.unsubscribe();
    }

    resolveSession();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (!password || !confirmPassword) {
      setErrorMessage("Please fill out both password fields.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Capture email from the active recovery session before updating
      const { data: { session } } = await supabase.auth.getSession();
      const userEmail = session?.user?.email ?? "";

      // Update the password (recovery session is already active)
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;

      toast.success("Password updated! Signing you in… 🎉");

      // Auto sign-in with the new password — no manual login needed
      if (userEmail) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: userEmail,
          password,
        });
        if (signInError) {
          // Auto sign-in failed (rare) — fall back to login page
          console.warn("[Lumo Auth] Auto sign-in after reset failed:", signInError.message);
          setPageState("success");
          setTimeout(() => router.push("/login"), 2000);
          return;
        }
      }

      // Signed in successfully — go straight to the dashboard
      setPageState("success");
      setTimeout(() => router.push("/children"), 1500);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "We could not update your password. Please request a new reset link.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  // ── Loading state ──────────────────────────────────────────────
  if (pageState === "loading") {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
        <p className="text-sm font-semibold text-slate-500">Verifying your reset link…</p>
      </div>
    );
  }

  // ── Invalid / expired link ─────────────────────────────────────
  if (pageState === "invalid") {
    return (
      <div className="space-y-5 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-3xl mx-auto">
          ⚠️
        </div>
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm font-semibold text-rose-700 space-y-2">
          <p className="text-base font-black text-rose-900">Reset link is invalid or expired</p>
          <p>
            This password reset link has expired or has already been used. Please request a new one.
          </p>
        </div>
        <Link
          href="/forgot-password"
          className="inline-flex w-full items-center justify-center py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-extrabold shadow-md hover:shadow-lg transition-all"
        >
          Request New Reset Link 📧
        </Link>
        <Link
          href="/login"
          className="inline-flex w-full items-center justify-center py-3 rounded-2xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition-colors"
        >
          ← Back to Login
        </Link>
      </div>
    );
  }

  // ── Success state ──────────────────────────────────────────────
  if (pageState === "success") {
    return (
      <div className="space-y-5 text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl mx-auto">
          🎉
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-semibold text-emerald-800 space-y-1">
          <p className="text-base font-black text-emerald-900">Password updated!</p>
          <p>You&apos;re now signed in. Taking you to your dashboard…</p>
        </div>
      </div>
    );
  }

  // ── Ready — show password form ─────────────────────────────────
  return (
    <>
      <Toaster position="top-center" />
      <form className="space-y-5" onSubmit={handleSubmit}>
        {errorMessage ? (
          <div
            className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3.5 text-sm font-semibold text-rose-700"
            role="alert"
          >
            ⚠️ {errorMessage}
          </div>
        ) : null}

        <Input
          autoComplete="new-password"
          label="New Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
          type="password"
          value={password}
        />
        <Input
          autoComplete="new-password"
          label="Confirm New Password"
          name="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repeat your new password"
          type="password"
          value={confirmPassword}
        />

        <Button isLoading={isSubmitting} type="submit" variant="primary">
          🔑 Update Password
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
