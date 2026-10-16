import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import AnimatedBackground from "@/components/layout/AnimatedBackground";

/**
 * Parent Login Page Component (`/login`).
 * 
 * Renders the parent authentication screen featuring:
 * - Ambient animated pastel background gradient and floating glow orbs
 * - Responsive glassmorphic card container (`backdrop-blur-xl`, subtle border & shadow)
 * - Navigation link back to the homepage
 * - Parent access header and subtitle
 * - Embedded `LoginForm` component for email/password authentication
 */
export default function LoginPage() {
  return (
    // Outer main container with full screen height and pastel gradient background
    <main className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-fuchsia-50 via-rose-50 to-amber-50 px-4 py-10 overflow-hidden">
      {/* 1. Base interactive floating background layer */}
      <AnimatedBackground />
      
      {/* 2. Extra colorful glowing ambient blur orbs for visual depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-left fuchsia glowing orb */}
        <div className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-fuchsia-200/40 blur-[100px]" style={{ animation: 'blob 18s ease-in-out infinite' }}></div>
        {/* Bottom-right violet glowing orb */}
        <div className="absolute bottom-[-20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-violet-200/35 blur-[100px]" style={{ animation: 'blob 22s ease-in-out infinite', animationDelay: '5s' }}></div>
        {/* Mid-right amber glowing orb */}
        <div className="absolute top-[30%] right-[5%] w-[30vw] h-[30vw] rounded-full bg-amber-200/30 blur-[80px]" style={{ animation: 'drift 20s ease-in-out infinite' }}></div>
      </div>

      {/* 3. Main Login Content Section */}
      <section className="relative z-10 w-full max-w-md">
        {/* Back to homepage navigation link */}
        <Link
          className="mb-6 inline-flex text-sm font-semibold text-slate-500 transition hover:text-primary-blue"
          href="/"
        >
          ← Back to home
        </Link>

        {/* Glassmorphic login card wrapper */}
        <div className="rounded-3xl border border-fuchsia-100/60 bg-white/80 p-6 shadow-[0_20px_60px_-15px_rgba(168,85,247,0.12)] backdrop-blur-xl sm:p-8">
          {/* Card Header & Title */}
          <div className="mb-8 text-center">
            {/* Parent Access Badge */}
            <span className="mb-4 inline-flex rounded-full border border-fuchsia-100 bg-fuchsia-50 px-4 py-2 text-xs font-bold uppercase text-fuchsia-600">
              Parent Access
            </span>
            <h1 className="section-heading mb-3">Welcome Back</h1>
            <p className="body-text">
              Continue your child&rsquo;s learning activities.
            </p>
          </div>

          {/* Interactive Login Form Component */}
          <LoginForm />
        </div>
      </section>

      {/* 4. Inline CSS Keyframes for background orb float & drift animations */}
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

