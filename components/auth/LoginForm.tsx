"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, useEffect, Suspense } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AppAuthError, loginParent } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

/** Error message constants for standardized user feedback */
const fillAllFieldsMessage = "Please fill all fields.";
const loginErrorMessage =
  "We could not log you in. Please check your email and password.";
const emailNotConfirmedMessage =
  "Please confirm your email address before logging in.";
const emailProviderDisabledMessage =
  "Email and password login is not enabled for this project.";
const parentProfilePermissionMessage =
  "You are logged in, but your parent profile could not be prepared. Please check the parents table access policy.";
const authConnectionMessage =
  "We could not connect to Supabase. Please check your database URL, anon key, and internet connection.";

/**
 * Inner Login Form Component.
 * Contains all state management, session checking, submission logic, and UI inputs.
 */
function LoginFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Form input and state hooks
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isEmailNotConfirmed, setIsEmailNotConfirmed] = useState(false);
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Show success toast if user was redirected back after password reset
  useEffect(() => {
    if (searchParams.get("reset") === "success") {
      setSuccessMessage("Password updated! Please log in with your new password. 🎉");
      toast.success("Password updated successfully!");
    }
  }, [searchParams]);

  // 2. Auto-redirect logged-in users to `/children` (skipping password recovery sessions)
  useEffect(() => {
    async function checkExistingUser() {
      // Fetch session from Supabase client
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // Inspect Authentication Method Reference (amr) array for "recovery" flag
        const amr = (session as { amr?: { method: string }[] } & typeof session).amr;
        const isRecoverySession = Array.isArray(amr)
          ? amr.some((a) => a.method === "recovery")
          : false;

        // Skip auto-redirect if user is in password recovery mode
        if (!isRecoverySession) {
          router.push("/children");
        }
      }
    }
    checkExistingUser();
  }, [router]);

  /**
   * Resends account confirmation email link if user has unconfirmed email error.
   */
  async function handleResendConfirmation() {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMessage("Please enter your email address above.");
      return;
    }
    setIsSendingReset(true);
    setErrorMessage("");
    try {
      const { resendConfirmationEmail } = await import("@/lib/auth");
      const res = await resendConfirmationEmail(trimmedEmail);
      if (res.success) {
        const msg = `Confirmation link sent! Please check your Gmail Inbox (${trimmedEmail}) and Spam folder 📧`;
        setSuccessMessage(msg);
        toast.success(msg);
      } else {
        const msg = res.message || "Could not resend confirmation email. Try requesting a password reset below.";
        setErrorMessage(msg);
        toast.error(msg);
      }
    } catch {
      setErrorMessage("Could not resend confirmation. Please try requesting a password reset.");
    } finally {
      setIsSendingReset(false);
    }
  }

  /**
   * Requests password reset link if user encounters unconfirmed email issues.
   */
  async function handleRequestReset() {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMessage("Please enter your email address above.");
      return;
    }
    setIsSendingReset(true);
    setErrorMessage("");
    try {
      const { requestPasswordReset } = await import("@/lib/auth");
      const res = await requestPasswordReset(trimmedEmail);
      if (res.success) {
        const msg = `Password reset link sent! Check your Gmail Inbox (${trimmedEmail}) & Spam folder 📧`;
        setSuccessMessage(msg);
        toast.success(msg);
      } else {
        const msg = res.message || "Password reset email sent! Check your Gmail Inbox & Spam folder 📧";
        setSuccessMessage(msg);
        toast.success(msg);
      }
    } catch {
      setErrorMessage("Could not send password reset email. Please try again in a moment.");
    } finally {
      setIsSendingReset(false);
    }
  }

  /**
   * Handles parent user login form submission.
   * 
   * @param event - HTML form submission event
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsEmailNotConfirmed(false);

    const trimmedEmail = email.trim();

    // Validate inputs
    if (!trimmedEmail || !password) {
      setErrorMessage(fillAllFieldsMessage);
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Call loginParent helper from @/lib/auth
      await loginParent({ email: trimmedEmail, password });
      toast.success("Login successful.");
      
      // 2. Redirect to children dashboard page
      router.push("/children");
      router.refresh();
    } catch (error) {
      let message = loginErrorMessage;

      // 3. Map AppAuthError codes to friendly messages
      if (error instanceof AppAuthError) {
        if (error.code === "email_not_confirmed") {
          message = emailNotConfirmedMessage;
          setIsEmailNotConfirmed(true);
        }
        if (error.code === "email_provider_disabled") message = emailProviderDisabledMessage;
        if (error.code === "auth_connection_failed") message = authConnectionMessage;
        if (
          error.code === "parent_profile_forbidden" ||
          error.code === "parent_profile_failed"
        ) {
          message = parentProfilePermissionMessage;
        }
      }

      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {/* Toast notification portal */}
      <Toaster position="top-center" />

      {/* Login Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Success Alert Banner */}
        {successMessage ? (
          <div
            className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800"
            role="status"
          >
            {successMessage}
          </div>
        ) : null}

        {/* Error Alert Banner */}
        {errorMessage ? (
          <div
            className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
            role="alert"
          >
            {errorMessage}
          </div>
        ) : null}

        {/* Special Email Unconfirmed Action Box */}
        {isEmailNotConfirmed && (
          <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/90 p-4 text-xs font-bold text-amber-900 space-y-3 shadow-xs">
            <p className="flex items-center gap-1.5 text-sm font-extrabold text-amber-950">
              ✉️ Email Confirmation Required
            </p>
            <p className="text-slate-700">
              Supabase requires confirming your email address before logging in. If you did not receive the confirmation email in your Inbox or Spam folder, choose an option below:
            </p>
            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <button
                type="button"
                onClick={handleResendConfirmation}
                disabled={isSendingReset}
                className="px-3.5 py-2 rounded-xl bg-sky-600 text-white font-extrabold shadow-xs hover:bg-sky-700 disabled:opacity-50 transition-all text-xs text-center"
              >
                {isSendingReset ? "Sending..." : "📩 Resend Confirmation Link"}
              </button>
              <button
                type="button"
                onClick={handleRequestReset}
                disabled={isSendingReset}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 text-white font-extrabold shadow-xs hover:bg-indigo-700 disabled:opacity-50 transition-all text-xs text-center"
              >
                🔑 Send Password Reset Link
              </button>
            </div>
          </div>
        )}

        {/* Email / Username Input Field */}
        <Input
          autoComplete="username"
          label="Email address / Username"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="parent@example.com"
          type="text"
          value={email}
        />

        {/* Password Input Field with Forgot Password Link */}
        <div>
          <Input
            autoComplete="current-password"
            label="Password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Your password"
            type="password"
            value={password}
          />
          <div className="flex justify-end pt-1">
            <Link
              href="/forgot-password"
              className="text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors"
            >
              Forgot password? Reset here 🔑
            </Link>
          </div>
        </div>

        {/* Submit Login Button */}
        <Button isLoading={isSubmitting} type="submit">
          Login
        </Button>
      </form>

      {/* Sign Up Link Footer */}
      <p className="mt-6 text-center text-sm text-slate-600">
        Don&apos;t have an account?{" "}
        <Link
          className="font-bold text-primary-blue transition hover:text-blue-600"
          href="/register"
        >
          Create account
        </Link>
      </p>
    </>
  );
}

/**
 * Parent Login Form Export.
 * Wraps `LoginFormInner` in Next.js `<Suspense>` boundary for `useSearchParams()` support.
 */
export function LoginForm() {
  return (
    <Suspense>
      <LoginFormInner />
    </Suspense>
  );
}

