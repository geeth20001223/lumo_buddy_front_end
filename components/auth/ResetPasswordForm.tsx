"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

/**
 * Union type representing the 4 UI lifecycle states of the reset password component:
 * - `loading`: Verifying the recovery hash token in the URL
 * - `invalid`: Recovery link is expired, missing, or invalid
 * - `ready`: Valid recovery session established; ready for new password input
 * - `success`: Password updated successfully; showing completion screen
 */
type PageState = "loading" | "invalid" | "ready" | "success";

/**
 * Reset Password Form Component.
 * 
 * Renders the interface for updating a user's password following an email recovery link redirect.
 * 
 * Features:
 * - Detects and parses Supabase recovery token in URL hash (`#access_token=...&type=recovery`)
 * - Validates new password & confirmation password (min 6 chars)
 * - Updates user credentials via `supabase.auth.updateUser({ password })`
 * - Triggers transactional password update notification email via `/api/send-password-changed-email`
 * - Signs out temporary recovery session and redirects to `/login`
 */
export function ResetPasswordForm() {
  const router = useRouter();

  // Page lifecycle & form state hooks
  const [pageState, setPageState] = useState<PageState>("loading");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Resolve recovery session from URL hash token on mount
  useEffect(() => {
    async function resolveSession() {
      // Check if session is already active from Supabase client hash parser
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        // Valid recovery or active session found — allow password input
        setPageState("ready");
        return;
      }

      // Listen for the PASSWORD_RECOVERY event emitted when URL hash is parsed
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === "PASSWORD_RECOVERY" && session) {
            setPageState("ready");
          }
        }
      );

      // Timeout fallback (2.5s): if no session is established, mark link as invalid
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

  /**
   * Handles password update submission.
   * 
   * @param event - HTML form submission event
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    // 1. Validate mandatory fields
    if (!password || !confirmPassword) {
      setErrorMessage("Please fill out both password fields.");
      return;
    }

    // 2. Validate password match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // 3. Validate minimum password length
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 4. Retrieve user's email address before updating credentials
      const { data: { user } } = await supabase.auth.getUser();
      const userEmail = user?.email || "";
      if (userEmail) {
        setUpdatedEmail(userEmail);
      }

      // 5. Update password using active recovery session
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      // 6. Trigger confirmation notification email via server API route
      if (userEmail) {
        try {
          await fetch("/api/send-password-changed-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail }),
          });
        } catch (emailErr) {
          console.warn("[Lumo Auth] Notification email trigger note:", emailErr);
        }
      }

      // 7. Sign out active recovery session so user logs in fresh with new password
      await supabase.auth.signOut();

      // 8. Update UI state to success
      setPageState("success");
      toast.success("Password updated successfully! 🎉");

      // 9. Redirect user to login page after 3 seconds
      const redirectUrl = userEmail
        ? `/login?email=${encodeURIComponent(userEmail)}&reset=success`
        : "/login?reset=success";

      setTimeout(() => router.push(redirectUrl), 3000);
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

  // --------------------------------------------------------------------------
  // 1. RENDER LOADING STATE (Verifying recovery link token)
  // --------------------------------------------------------------------------
  if (pageState === "loading") {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        {/* Animated loading spinner */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
        <p className="text-sm font-semibold text-slate-500">Verifying your reset link…</p>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 2. RENDER INVALID / EXPIRED LINK STATE
  // --------------------------------------------------------------------------
  if (pageState === "invalid") {
    return (
      <div className="space-y-5 text-center">
        {/* Warning Icon Badge */}
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-3xl mx-auto">
          ⚠️
        </div>
        {/* Invalid Link Alert Message */}
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm font-semibold text-rose-700 space-y-2">
          <p className="text-base font-black text-rose-900">Reset link is invalid or expired</p>
          <p>
            This password reset link has expired or has already been used. Please request a new one.
          </p>
        </div>
        {/* Action Buttons */}
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

  // --------------------------------------------------------------------------
  // 3. RENDER SUCCESS STATE (Password successfully updated)
  // --------------------------------------------------------------------------
  if (pageState === "success") {
    const loginLink = updatedEmail
      ? `/login?email=${encodeURIComponent(updatedEmail)}&reset=success`
      : "/login?reset=success";

    return (
      <div className="space-y-5 text-center">
        {/* Celebration Emoji Badge */}
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl mx-auto">
          🎉
        </div>
        {/* Success Alert Box */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-semibold text-emerald-800 space-y-2">
          <p className="text-base font-black text-emerald-900">Password updated successfully!</p>
          <p>
            A notification email has been sent to{" "}
            {updatedEmail ? <strong className="text-emerald-950 underline">{updatedEmail}</strong> : "your email"}.
          </p>
          <p className="text-xs text-emerald-700">
            You can now log in to the system using your email address and your new password.
          </p>
        </div>
        {/* Redirect to Login Link */}
        <Link
          href={loginLink}
          className="inline-flex w-full items-center justify-center py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-extrabold shadow-md hover:shadow-lg transition-all"
        >
          Go to Login →
        </Link>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 4. RENDER READY STATE (Input Form for New Password)
  // --------------------------------------------------------------------------
  return (
    <>
      {/* Toast notification portal */}
      <Toaster position="top-center" />

      {/* Password Update Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Error Alert Banner */}
        {errorMessage ? (
          <div
            className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3.5 text-sm font-semibold text-rose-700"
            role="alert"
          >
            ⚠️ {errorMessage}
          </div>
        ) : null}

        {/* New Password Input Field */}
        <Input
          autoComplete="new-password"
          label="New Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
          type="password"
          value={password}
        />

        {/* Confirm New Password Input Field */}
        <Input
          autoComplete="new-password"
          label="Confirm New Password"
          name="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repeat your new password"
          type="password"
          value={confirmPassword}
        />

        {/* Submit Update Button */}
        <Button isLoading={isSubmitting} type="submit" variant="primary">
          🔑 Update Password
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

