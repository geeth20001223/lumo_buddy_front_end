import Link from "next/link";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import AnimatedBackground from "@/components/layout/AnimatedBackground";

export default function ForgotPasswordPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-violet-50 to-fuchsia-50 px-4 py-10 overflow-hidden">
      <AnimatedBackground />

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-200/40 blur-[100px]"
          style={{ animation: "blob 18s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-sky-200/35 blur-[100px]"
          style={{ animation: "blob 22s ease-in-out infinite", animationDelay: "5s" }}
        />
      </div>

      <section className="relative z-10 w-full max-w-md">
        <Link
          className="mb-6 inline-flex text-sm font-semibold text-slate-500 transition hover:text-primary-blue"
          href="/login"
        >
          ← Back to Login
        </Link>

        <div className="rounded-3xl border border-violet-100/60 bg-white/80 p-6 shadow-[0_20px_60px_-15px_rgba(139,92,246,0.12)] backdrop-blur-xl sm:p-8">
          <div className="mb-8 text-center">
            <span className="mb-4 inline-flex rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-xs font-bold uppercase text-violet-600">
              Account Recovery 🔑
            </span>
            <h1 className="section-heading mb-3">Forgot Password?</h1>
            <p className="body-text">
              Enter your email address and we&apos;ll send you a link to reset your password.
            </p>
          </div>

          <ForgotPasswordForm />
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            25% { transform: translate(40px, -50px) scale(1.08); }
            50% { transform: translate(-30px, 30px) scale(0.92); }
            75% { transform: translate(20px, -20px) scale(1.04); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
        `
      }} />
    </main>
  );
}
