"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, useEffect, Suspense } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AppAuthError, loginParent } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

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

function LoginFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  // Show success toast if redirected after password reset
  useEffect(() => {
    if (searchParams.get("reset") === "success") {
      setSuccessMessage("Password updated! Please log in with your new password. 🎉");
      toast.success("Password updated successfully!");
    }
  }, [searchParams]);

  useEffect(() => {
    async function checkExistingUser() {
      // Check the full session — not just the user — so we can inspect the
      // session type.  A PASSWORD_RECOVERY session should NOT auto-redirect;
      // the user must log in with their new credentials first.
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // Supabase marks recovery sessions with amr "recovery" entry.
        // If that is present, skip auto-redirect so the user can log in fresh.
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


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setErrorMessage(fillAllFieldsMessage);
      return;
    }

    setIsSubmitting(true);

    try {
      await loginParent({ email: trimmedEmail, password });
      toast.success("Login successful.");
      router.push("/children");
      router.refresh();
    } catch (error) {
      let message = loginErrorMessage;

      if (error instanceof AppAuthError) {
        if (error.code === "email_not_confirmed") message = emailNotConfirmedMessage;
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
      <Toaster position="top-center" />



      <form className="space-y-5" onSubmit={handleSubmit}>
        {successMessage ? (
          <div
            className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800"
            role="status"
          >
            {successMessage}
          </div>
        ) : null}

        {errorMessage ? (
          <div
            className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
            role="alert"
          >
            {errorMessage}
          </div>
        ) : null}

        <Input
          autoComplete="email"
          label="Email address"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="parent@example.com"
          type="email"
          value={email}
        />

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

        <Button isLoading={isSubmitting} type="submit">
          Login
        </Button>
      </form>

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

export function LoginForm() {
  return (
    <Suspense>
      <LoginFormInner />
    </Suspense>
  );
}
