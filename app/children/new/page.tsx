"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChildProfileForm } from "@/components/children/ChildProfileForm";
import { LoadingState } from "@/components/ui/LoadingState";
import { getCurrentParent } from "@/lib/children";
import AnimatedBackground from "@/components/layout/AnimatedBackground";

export default function NewChildPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function checkParent() {
      try {
        await getCurrentParent();
      } catch (error) {
        const message =
          error instanceof Error && error.message === "not_authenticated"
            ? "Please login again."
            : "We could not load child profiles.";

        if (error instanceof Error && error.message === "not_authenticated") {
          router.replace("/login");
          return;
        }

        if (isMounted) {
          setErrorMessage(message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    checkParent();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-fuchsia-50 via-rose-50 to-amber-50 px-4 py-10 overflow-hidden">
      <AnimatedBackground />
      
      {/* Animated color orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-fuchsia-200/35 blur-[100px]" style={{ animation: 'blob 20s ease-in-out infinite' }}></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-violet-200/30 blur-[100px]" style={{ animation: 'blob 24s ease-in-out infinite', animationDelay: '4s' }}></div>
        <div className="absolute top-[35%] right-[5%] w-[30vw] h-[30vw] rounded-full bg-amber-200/25 blur-[80px]" style={{ animation: 'drift 22s ease-in-out infinite' }}></div>
      </div>

      <section className="relative z-10 w-full max-w-2xl">
        <Link
          className="mb-6 inline-flex text-sm font-semibold text-slate-500 transition hover:text-primary-blue"
          href="/children"
        >
          Back to child profiles
        </Link>

        <div className="rounded-3xl border border-fuchsia-100/60 bg-white/80 p-6 shadow-[0_20px_60px_-15px_rgba(168,85,247,0.12)] backdrop-blur-xl sm:p-8">
          <div className="mb-8">
            <span className="mb-4 inline-flex rounded-full border border-fuchsia-100 bg-fuchsia-50 px-4 py-2 text-xs font-bold uppercase text-fuchsia-600">
              Child Profile
            </span>
            <h1 className="section-heading mb-3">Add Child Profile</h1>
            <p className="body-text">
              Create a profile before starting the survey.
            </p>
          </div>

          {isLoading ? <LoadingState message="Loading child profiles..." /> : null}
          {!isLoading && errorMessage ? (
            <div
              className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
              role="alert"
            >
              {errorMessage}
            </div>
          ) : null}
          {!isLoading && !errorMessage ? <ChildProfileForm /> : null}
        </div>
      </section>

      {/* Inline keyframes for orbs */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blob { 0% { transform: translate(0,0) scale(1); } 25% { transform: translate(40px,-50px) scale(1.08); } 50% { transform: translate(-30px,30px) scale(0.92); } 75% { transform: translate(20px,-20px) scale(1.04); } 100% { transform: translate(0,0) scale(1); } }
        @keyframes drift { 0%,100% { transform: translate(0,0); } 25% { transform: translate(15px,-25px); } 50% { transform: translate(-10px,15px); } 75% { transform: translate(20px,10px); } }
      `}} />
    </main>
  );
}
