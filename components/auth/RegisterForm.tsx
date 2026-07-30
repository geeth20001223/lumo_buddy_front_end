"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AppAuthError, registerParent, requestPasswordReset } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const fillAllFieldsMessage = "Please fill all fields.";
const passwordMismatchMessage = "Passwords do not match.";
const shortPasswordMessage = "Password must be at least 6 characters.";
const createErrorMessage =
  "We could not create your account. Please try again.";
const emailRateLimitMessage =
  "Too many signup emails were requested. Please wait a few minutes and try again.";
const emailAlreadyRegisteredMessage =
  "This email already has an account. Please log in or request a password reset below.";
const parentProfilePermissionMessage =
  "Your account was created, but we could not save the parent profile. Please check the parents table access policy.";

export function RegisterForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function checkExistingUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        router.push("/children");
      }
    }
    checkExistingUser();
  }, [router]);

  async function handleSendReset() {
    if (!email.trim()) {
      setErrorMessage("Please enter your email address first.");
      return;
    }
    setIsSendingReset(true);
    setErrorMessage("");
    try {
      const res = await requestPasswordReset(email.trim());
      if (res.success) {
        const msg = "Password reset email sent! Please check your Gmail inbox & Spam folder 📧";
        setSuccessMessage(msg);
        toast.success(msg);
      } else {
        if (res.message?.includes("rate limit") || res.message?.includes("60 seconds") || res.message?.includes("security purposes")) {
          const msg = "Password reset link was sent! Please check your Gmail Inbox & Spam folder 📧";
          setSuccessMessage(msg);
          toast.success(msg);
        } else {
          const msg = res.message || "We could not send password reset email. Please try again.";
          setErrorMessage(msg);
          toast.error(msg);
        }
      }
    } catch {
      const msg = "We could not send password reset email. Please try again in a moment.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsSendingReset(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsAlreadyRegistered(false);

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
      setErrorMessage(fillAllFieldsMessage);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(passwordMismatchMessage);
      return;
    }

    if (password.length < 6) {
      setErrorMessage(shortPasswordMessage);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await registerParent({
        fullName: trimmedName,
        email: trimmedEmail,
        password,
      });

      if (result.requiresEmailConfirmation) {
        const message =
          "Account created. Please check your email and confirm your address before logging in.";
        setSuccessMessage(message);
        toast.success(message);
        return;
      }

      toast.success("Account created successfully.");
      router.push("/children");
      router.refresh();
    } catch (error) {
      let message = createErrorMessage;

      if (error instanceof AppAuthError) {
        if (error.code === "email_rate_limit") {
          message = emailRateLimitMessage;
        }

        if (error.code === "email_already_registered") {
          message = emailAlreadyRegisteredMessage;
          setIsAlreadyRegistered(true);
        }

        if (error.code === "parent_profile_forbidden") {
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
      <Toaster position="top-center" />
      <form className="space-y-5" onSubmit={handleSubmit}>
        {successMessage ? (
          <div
            className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800"
            role="status"
          >
            {successMessage}{" "}
            <Link className="underline" href="/login">
              Go to login
            </Link>
          </div>
        ) : null}

        {isAlreadyRegistered && (
          <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/90 p-4 text-xs font-bold text-amber-900 space-y-3 shadow-sm">
            <p className="flex items-center gap-1.5 text-sm font-extrabold text-amber-950">
              💡 Account Already Exists
            </p>
            <p className="text-slate-700">
              This email is already registered. You can log in directly or request a password reset email below.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Link
                href={`/login?email=${encodeURIComponent(email)}`}
                className="px-4 py-2 rounded-xl bg-sky-600 text-white font-extrabold shadow-sm hover:bg-sky-700 transition-all text-xs inline-flex items-center justify-center"
              >
                Go to Login 🔑
              </Link>
              <button
                type="button"
                onClick={handleSendReset}
                disabled={isSendingReset}
                className="px-4 py-2 rounded-xl bg-white border border-amber-300 text-amber-900 font-extrabold hover:bg-amber-100 transition-all text-xs inline-flex items-center justify-center"
              >
                {isSendingReset ? "Sending Reset..." : "Send Password Reset Email 📧"}
              </button>
            </div>
          </div>
        )}

        {errorMessage && !isAlreadyRegistered ? (
          <div
            className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
            role="alert"
          >
            {errorMessage}
          </div>
        ) : null}

        <Input
          autoComplete="name"
          label="Full name"
          name="fullName"
          onChange={(event) => setFullName(event.target.value)}
          placeholder="Your full name"
          type="text"
          value={fullName}
        />
        <Input
          autoComplete="email"
          label="Email address"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="parent@example.com"
          type="email"
          value={email}
        />
        <Input
          autoComplete="new-password"
          label="Password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="At least 6 characters"
          type="password"
          value={password}
        />
        <Input
          autoComplete="new-password"
          label="Confirm password"
          name="confirmPassword"
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Repeat your password"
          type="password"
          value={confirmPassword}
        />

        <Button isLoading={isSubmitting} type="submit">
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          className="font-bold text-primary-blue transition hover:text-blue-600"
          href="/login"
        >
          Login
        </Link>
      </p>
    </>
  );
}
