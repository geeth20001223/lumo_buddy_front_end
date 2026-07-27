import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";
import AnimatedBackground from "@/components/layout/AnimatedBackground";

export default function RegisterPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-fuchsia-50 via-rose-50 to-amber-50 px-4 py-10 overflow-hidden">
      <AnimatedBackground />
      
      {/* Extra colorful orbs for depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-rose-200/40 blur-[100px]" style={{ animation: 'blob 20s ease-in-out infinite' }}></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-fuchsia-200/35 blur-[100px]" style={{ animation: 'blob 24s ease-in-out infinite', animationDelay: '4s' }}></div>
        <div className="absolute top-[40%] left-[5%] w-[30vw] h-[30vw] rounded-full bg-amber-200/30 blur-[80px]" style={{ animation: 'drift 22s ease-in-out infinite' }}></div>
      </div>

      <section className="relative z-10 w-full max-w-md">
        <Link
          className="mb-6 inline-flex text-sm font-semibold text-slate-500 transition hover:text-primary-blue"
          href="/"
        >
          Back to home
        </Link>

        <div className="rounded-3xl border border-rose-100/60 bg-white/80 p-6 shadow-[0_20px_60px_-15px_rgba(236,72,153,0.12)] backdrop-blur-xl sm:p-8">
          <div className="mb-8 text-center">
            <span className="mb-4 inline-flex rounded-full border border-rose-100 bg-rose-50 px-4 py-2 text-xs font-bold uppercase text-rose-600">
              Parent Access
            </span>
            <h1 className="section-heading mb-3">Create Parent Account</h1>
            <p className="body-text">
              Start your child&rsquo;s supportive learning journey.
            </p>
          </div>

          <RegisterForm />
        </div>
      </section>

      {/* Inline keyframes for orbs (shared with AnimatedBackground) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          25% { transform: translate(40px, -50px) scale(1.08); }
          50% { transform: translate(-30px, 30px) scale(0.92); }
          75% { transform: translate(20px, -20px) scale(1.04); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes drift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(15px, -25px) rotate(5deg); }
          50% { transform: translate(-10px, 15px) rotate(-3deg); }
          75% { transform: translate(20px, 10px) rotate(8deg); }
        }
      `}} />
    </main>
  );
}
