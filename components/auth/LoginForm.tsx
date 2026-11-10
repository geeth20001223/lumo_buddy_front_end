"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, useEffect, Suspense } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AppAuthError, loginParent, getActiveParentSession } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

/** Error message constants for standardized user feedback */
const fillAllFieldsMessage = "Please fill all fields.";
const loginErrorMessage =
  "Invalid email or password. Please check your credentials or register a new account.";
const authConnectionMessage =
  "We could not connect to the database. Please check your internet connection.";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Show success toast if user was redirected back after password reset
  useEffect(() => {
    if (searchParams.get("reset") === "success") {
      setSuccessMessage("Password updated! Please log in with your new password. 🎉");
      toast.success("Password updated successfully!");
    }
  }, [searchParams]);

  // 2. Auto-redirect logged-in users to `/children`
  useEffect(() => {
    async function checkExistingUser() {
      // Check local active parent session first
      const active = getActiveParentSession();
      if (active?.id) {
        router.push("/children");
        return;
      }

      // Check Supabase session
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const amr = (session as { amr?: { method: string }[] } & typeof session).amr;
        const isRecoverySession = Array.isArray(amr)
          ? amr.some((a) => a.method === "recovery")
          : false;

        if (!isRecoverySession) {
          router.push("/children");
        }
      }
    }
    checkExistingUser();
  }, [router]);

  /**
   * Handles parent user login form submission.
   * 
   * @param event - HTML form submission event
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const trimmedEmail = email.trim();

    // Validate inputs
    if (!trimmedEmail || !password) {
      setErrorMessage(fillAllFieldsMessage);
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Direct login helper from @/lib/auth (no Supabase Auth lockouts)
      await loginParent({ email: trimmedEmail, password });
      toast.success("Login successful! Welcome back! 🎉");
      
      // 2. Redirect to children dashboard page
      router.push("/children");
      router.refresh();
    } catch (error) {
      let message = loginErrorMessage;

      if (error instanceof AppAuthError) {
        if (error.code === "auth_connection_failed") message = authConnectionMessage;
        if (error.code === "invalid_credentials") message = "Invalid email or password. Please verify your details.";
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

