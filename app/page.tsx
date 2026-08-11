import Link from "next/link";
import JourneyScrollSection from "@/components/layout/JourneyScrollSection";
import AnimatedBackground from "@/components/layout/AnimatedBackground";
import { InteractiveAssessmentDemo } from "@/components/home/InteractiveAssessmentDemo";
import { LumoAssistantChatbot } from "@/components/home/LumoAssistantChatbot";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-fuchsia-50 via-rose-50 to-amber-50 relative">
      <AnimatedBackground />

      {/* 🤖 Chatbot Upper Left Hand Side (Cleanly Aligned Below Header) */}
      <LumoAssistantChatbot />

      {/* Hero Section - Ultra Premium Redesign */}
      <section className="relative min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] flex flex-col justify-center overflow-hidden pt-4 sm:pt-6 lg:pt-8 pb-4 sm:pb-6">
        {/* Advanced Custom CSS for Next-Level Animations & Glassmorphism */}
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(2deg); }
          }
          @keyframes float-reverse {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(20px) rotate(-2deg); }
          }
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            25% { transform: translate(40px, -50px) scale(1.08); }
            50% { transform: translate(-30px, 30px) scale(0.92); }
            75% { transform: translate(20px, -20px) scale(1.04); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          @keyframes shine {
            to { background-position: 200% center; }
          }
          @keyframes drift {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(15px, -25px) rotate(5deg); }
            50% { transform: translate(-10px, 15px) rotate(-3deg); }
            75% { transform: translate(20px, 10px) rotate(8deg); }
          }
          @keyframes sparkle {
            0%, 100% { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
            50% { opacity: 1; transform: scale(1.3) rotate(180deg); }
          }
          @keyframes orbit {
            from { transform: rotate(0deg) translateX(30px) rotate(0deg); }
            to { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
          }
          @keyframes morph {
            0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
            25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
            50% { border-radius: 50% 60% 30% 60% / 30% 40% 70% 50%; }
            75% { border-radius: 40% 30% 60% 50% / 60% 70% 40% 30%; }
          }
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes wiggle {
            0%, 100% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
          }
          @keyframes glow-pulse {
            0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.2); }
            50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.5), 0 0 80px rgba(236, 72, 153, 0.2); }
          }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-float-delayed { animation: float-reverse 8s ease-in-out infinite; }
          .animate-blob { animation: blob 15s ease-in-out infinite; }
          .animate-blob-delayed { animation: blob 18s ease-in-out infinite; animation-delay: 3s; }
          .animate-drift { animation: drift 20s ease-in-out infinite; }
          .animate-sparkle { animation: sparkle 3s ease-in-out infinite; }
          .animate-orbit { animation: orbit 25s linear infinite; }
          .animate-morph { animation: morph 12s ease-in-out infinite; }
          .animate-wiggle { animation: wiggle 4s ease-in-out infinite; }
          .animate-glow { animation: glow-pulse 4s ease-in-out infinite; }
          
          .glass-panel {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.9);
            box-shadow: 0 8px 32px 0 rgba(168, 85, 247, 0.08);
          }
          .glass-pill {
            background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,240,245,0.8));
            backdrop-filter: blur(12px);
            border: 1px solid rgba(236, 72, 153, 0.15);
            box-shadow: 0 8px 24px 0 rgba(168, 85, 247, 0.06);
          }
          .text-gradient {
            background: linear-gradient(135deg, #e879f9 0%, #8b5cf6 30%, #3b82f6 60%, #06b6d4 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 300% auto;
            animation: shine 4s linear infinite;
          }
          .hero-bg-texture {
            background: linear-gradient(135deg, #fdf4ff 0%, #fce7f3 30%, #fff7ed 60%, #faf5ff 100%);
            background-size: 400% 400%;
            animation: gradient-shift 15s ease infinite;
          }
          .svg-noise {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            opacity: 0.015;
            mix-blend-mode: multiply;
          }
        `}} />

        {/* Ethereal Background with Orbs & Noise Texture */}
        <div className="absolute inset-0 hero-bg-texture -z-20"></div>
        <div className="absolute inset-0 svg-noise -z-10 pointer-events-none"></div>

        {/* Animated color orbs */}
        <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-5%] w-[60vw] sm:w-[45vw] h-[60vw] sm:h-[45vw] max-w-[400px] max-h-[400px] rounded-full bg-fuchsia-300/60 mix-blend-multiply filter blur-[60px] sm:blur-[80px] opacity-80 animate-blob animate-morph"></div>
          <div className="absolute top-[5%] right-[-10%] w-[50vw] sm:w-[40vw] h-[50vw] sm:h-[40vw] max-w-[350px] max-h-[350px] rounded-full bg-violet-300/50 mix-blend-multiply filter blur-[60px] sm:blur-[80px] opacity-70 animate-blob-delayed animate-morph" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-[-15%] left-[15%] w-[60vw] sm:w-[50vw] h-[60vw] sm:h-[50vw] max-w-[420px] max-h-[420px] rounded-full bg-rose-200/60 mix-blend-multiply filter blur-[60px] sm:blur-[80px] opacity-70 animate-blob"></div>
          <div className="absolute top-[40%] right-[10%] w-[35vw] sm:w-[25vw] h-[35vw] sm:h-[25vw] max-w-[250px] max-h-[250px] rounded-full bg-amber-200/50 mix-blend-multiply filter blur-[40px] sm:blur-[60px] opacity-60 animate-drift"></div>
          <div className="absolute bottom-[10%] right-[5%] w-[40vw] sm:w-[30vw] h-[40vw] sm:h-[30vw] max-w-[280px] max-h-[280px] rounded-full bg-cyan-200/30 mix-blend-multiply filter blur-[50px] sm:blur-[70px] opacity-50 animate-blob-delayed" style={{ animationDelay: '6s' }}></div>
        </div>

        {/* Floating animated shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-5">
          <div className="absolute top-[15%] left-[8%] w-4 h-4 rounded-full bg-gradient-to-br from-fuchsia-400 to-pink-500 opacity-60 animate-drift shadow-lg" style={{ animationDuration: '12s' }}></div>
          <div className="absolute top-[25%] right-[12%] w-3 h-3 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 opacity-50 animate-drift" style={{ animationDuration: '16s', animationDelay: '2s' }}></div>
          <div className="absolute bottom-[30%] left-[15%] w-5 h-5 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 opacity-50 animate-drift" style={{ animationDuration: '14s', animationDelay: '5s' }}></div>
          <div className="absolute top-[60%] right-[20%] w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-40 animate-drift" style={{ animationDuration: '18s', animationDelay: '3s' }}></div>

          <svg className="absolute top-[12%] right-[25%] w-6 h-6 text-fuchsia-400 animate-sparkle" style={{ animationDelay: '0s' }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" /></svg>
          <svg className="absolute top-[45%] left-[5%] w-4 h-4 text-violet-400 animate-sparkle" style={{ animationDelay: '1s' }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" /></svg>
          <svg className="absolute bottom-[20%] right-[30%] w-5 h-5 text-amber-400 animate-sparkle" style={{ animationDelay: '2s' }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" /></svg>
          <svg className="absolute top-[70%] left-[40%] w-3 h-3 text-rose-400 animate-sparkle" style={{ animationDelay: '1.5s' }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" /></svg>

          <div className="absolute top-[20%] left-[60%] w-16 h-16 rounded-full border-2 border-fuchsia-300/30 animate-orbit opacity-40" style={{ animationDuration: '20s' }}></div>
          <div className="absolute top-[50%] left-[30%] w-12 h-12 rounded-full border-2 border-violet-300/25 animate-orbit opacity-30" style={{ animationDuration: '28s', animationDirection: 'reverse' }}></div>
        </div>

        <div className="layout-container relative z-10 w-full h-full flex items-center px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center w-full">

            {/* Left Column: Typography & Call to Action */}
            <div className="col-span-1 lg:col-span-6 2xl:col-span-5 flex flex-col justify-center text-center lg:text-left py-1 lg:py-0">

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill mb-2 mx-auto lg:mx-0 w-max shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] sm:text-xs font-bold tracking-wide text-slate-700 uppercase">A nurturing space for development</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[2.6rem] xl:text-[3.2rem] font-extrabold tracking-tight text-slate-900 mb-2 sm:mb-2.5 leading-[1.1] drop-shadow-sm">
                Empower your <br className="hidden sm:block" />
                child's unique <br className="hidden lg:block" />
                <span className="text-gradient inline-block pb-0.5">brilliance.</span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4 leading-normal max-w-xl mx-auto lg:mx-0 font-medium">
                Discover a calming, interactive world designed for neurodivergent children. Our supportive games gently nurture emotional, cognitive, and social milestones at their own perfect pace.
              </p>

              <div className="flex flex-col sm:flex-row gap-2.5 justify-center lg:justify-start items-center">
                <Link href="/register" className="group relative inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-full font-semibold text-xs sm:text-sm overflow-hidden transition-all hover:scale-105 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)] duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10">Start the Journey</span>
                  <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>

                <Link href="/login" className="group inline-flex items-center justify-center px-6 py-2.5 rounded-full font-semibold text-xs sm:text-sm text-slate-700 bg-white/50 backdrop-blur-md border border-slate-200 hover:bg-white hover:border-slate-300 transition-all hover:shadow-lg hover:-translate-y-0.5 duration-300">
                  Parent Access
                  <span className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                </Link>
              </div>

              <div className="mt-3 sm:mt-4 flex items-center justify-center lg:justify-start gap-3">
                <div className="flex -space-x-2.5">
                  <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=100&auto=format&fit=crop" alt="Parent" className="w-8 h-8 rounded-full border-[2.5px] border-white object-cover shadow-xs" />
                  <img src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=100&auto=format&fit=crop" alt="Parent" className="w-8 h-8 rounded-full border-[2.5px] border-white object-cover shadow-xs" />
                  <img src="https://images.unsplash.com/photo-1555252115-442d87e02df3?q=80&w=100&auto=format&fit=crop" alt="Parent" className="w-8 h-8 rounded-full border-[2.5px] border-white object-cover shadow-xs" />
                  <div className="w-8 h-8 rounded-full border-[2.5px] border-white bg-slate-50 flex items-center justify-center shadow-xs text-[9px] font-bold text-slate-600">+2k</div>
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex gap-1 text-warning-amber mb-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-3 h-3 fill-current drop-shadow-xs" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold tracking-wide">Trusted by caring parents</span>
                </div>
              </div>
            </div>

            {/* Right Column: Abstract Multi-layered Image Collage */}
            <div className="col-span-1 lg:col-span-6 2xl:col-span-7 relative w-full h-[260px] sm:h-[320px] lg:h-[360px] flex items-center justify-center mt-1 lg:mt-0">
              <div className="relative w-full max-w-[280px] sm:max-w-[380px] lg:max-w-[460px] aspect-[4/5] mx-auto z-10">
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] border-[6px] border-white/80 animate-float">
                  <img
                    src="/images/pexels-rdne-8385875.jpg"
                    alt="Child in a calm environment"
                    className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>
                </div>

                <div className="absolute left-0 sm:-left-12 bottom-6 w-[65%] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-[4px] sm:border-[5px] border-white animate-float-delayed z-20">
                  <img
                    src="/images/pexels-cottonbro-4715329.jpg"
                    alt="Hands playing with educational toys"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                <div className="absolute right-0 sm:-right-8 top-12 glass-panel p-3.5 sm:p-4 rounded-2xl w-[170px] sm:w-[200px] z-30 animate-float shadow-xl" style={{ animationDelay: '1.5s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white shadow-[0_0_12px_rgba(96,165,250,0.5)]">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-slate-800">New Milestone!</p>
                      <p className="text-[10px] text-slate-500 font-bold tracking-wide uppercase mt-0.5">Cognitive Skills</p>
                    </div>
                  </div>
                  <div className="mt-3 bg-slate-200/50 rounded-full h-1.5 w-full overflow-hidden backdrop-blur-sm">
                    <div className="bg-gradient-to-r from-blue-400 to-violet-500 w-[85%] h-full rounded-full relative">
                      <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 animate-pulse rounded-full blur-[1px]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section - Horizontal Interactive Slider */}
      <JourneyScrollSection />

      {/* 🎮 Interactive Assessment Demo Section */}
      <section className="py-20 px-4 sm:px-8 text-center">
        <InteractiveAssessmentDemo />
      </section>

      {/* Development Areas - Bento Grid */}
      <section className="relative py-32 bg-slate-900 overflow-hidden rounded-[3rem] mx-4 sm:mx-8 lg:mx-12 my-20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/20 blur-[120px]"></div>
          <div className="absolute -bottom-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-violet-600/20 blur-[120px]"></div>
        </div>

        <div className="layout-container relative z-10 lg:px-12">
          <div className="text-center sm:text-left flex flex-col lg:flex-row justify-between items-center sm:items-start lg:items-end gap-8 mb-20">
            <div className="max-w-2xl">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-white/10 border border-white/20 text-blue-300 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md">
                Growth Pillars
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-[4.5rem] font-extrabold text-white tracking-tight leading-[1.05]">
                Four dimensions of <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-teal-300">brilliant growth.</span>
              </h2>
            </div>
            <p className="text-lg text-slate-300 font-medium leading-relaxed max-w-sm text-center sm:text-left pb-2">
              Our curated activities are intricately designed to gently nurture these core developmental areas through the joy of play.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="relative group w-full lg:w-7/12 aspect-square sm:aspect-[2/1] lg:aspect-auto lg:h-[480px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl">
                <img src="/images/pexels-sabbir-bhuiyan-1747552532-32221017.jpg" alt="Emotion" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent transition-opacity duration-700 group-hover:opacity-90"></div>
                <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end z-20">
                  <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white mb-6 shadow-lg">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg tracking-tight">Emotion</h3>
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                      <div className="overflow-hidden">
                        <p className="text-slate-200 text-lg font-medium drop-shadow-md leading-relaxed pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          Helping children recognize, understand, and beautifully express their feelings through highly engaging visual matching games.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group w-full lg:w-5/12 aspect-square sm:aspect-[2/1] lg:aspect-auto lg:h-[480px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl">
                <img src="/images/cognative-skill.jpg" alt="Cognitive Skills" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent transition-opacity duration-700 group-hover:opacity-90"></div>
                <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end z-20">
                  <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white mb-6 shadow-lg">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg tracking-tight">Cognitive Skills</h3>
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                      <div className="overflow-hidden">
                        <p className="text-slate-200 text-lg font-medium drop-shadow-md leading-relaxed pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          Fun spatial patterns and gentle memory challenges designed to dramatically boost focus and logical problem-solving.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="relative group w-full lg:w-5/12 aspect-square sm:aspect-[2/1] lg:aspect-auto lg:h-[480px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl">
                <img src="/images/self-awareness.jpg" alt="Self-awareness" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent transition-opacity duration-700 group-hover:opacity-90"></div>
                <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end z-20">
                  <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white mb-6 shadow-lg">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg tracking-tight">Self-awareness</h3>
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                      <div className="overflow-hidden">
                        <p className="text-slate-200 text-lg font-medium drop-shadow-md leading-relaxed pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          Step-by-step interactive activities teaching daily habits and encouraging mindfulness and healthy independence.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group w-full lg:w-7/12 aspect-square sm:aspect-[2/1] lg:aspect-auto lg:h-[480px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl">
                <img src="/images/methematical-skill.jpg" alt="Mathematical Skills" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent transition-opacity duration-700 group-hover:opacity-90"></div>
                <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end z-20">
                  <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white mb-6 shadow-lg">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg tracking-tight">Mathematical Skills</h3>
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                      <div className="overflow-hidden">
                        <p className="text-slate-200 text-lg font-medium drop-shadow-md leading-relaxed pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          Friendly number games with colorful objects designed to make counting, sorting, and early logic a pure joy.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA & Medical Disclaimer Section */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-b from-rose-50 via-fuchsia-50/80 to-amber-50/60 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] sm:w-[80vw] sm:h-[80vw] rounded-full bg-gradient-to-tr from-rose-300/25 via-fuchsia-300/20 to-amber-300/25 blur-[120px] animate-morph"></div>
          <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-violet-200/30 blur-[80px] animate-drift"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[25vw] h-[25vw] rounded-full bg-pink-200/30 blur-[60px] animate-blob-delayed"></div>
        </div>

        <div className="layout-container relative z-10">
          <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-3xl rounded-[3rem] sm:rounded-[4rem] p-8 sm:p-20 text-center shadow-[0_20px_50px_-15px_rgba(168,85,247,0.1)] border border-fuchsia-100/50 relative overflow-hidden group animate-glow">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-8 tracking-tight drop-shadow-sm">
              Ready to support their <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue via-secondary-violet to-teal-400">growth journey?</span>
            </h2>

            <div className="relative mb-16">
              <Link href="/register" className="inline-flex items-center justify-center px-10 py-5 text-lg font-extrabold text-white bg-slate-900 rounded-full hover:scale-105 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] transition-all duration-500 relative z-10 overflow-hidden group/btn">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-blue via-secondary-violet to-teal-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></span>
                <span className="relative z-10 flex items-center gap-3">
                  Start For Free
                  <svg className="w-6 h-6 group-hover/btn:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Medical Disclaimer Note */}
            <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-5 bg-white/70 backdrop-blur-lg p-6 sm:p-8 rounded-[2rem] border border-white shadow-sm hover:shadow-md transition-shadow duration-300 text-left">
              <div className="flex-shrink-0 w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 shadow-inner">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <strong className="text-slate-800 text-lg block mb-1">Important Note</strong>
                <p className="text-slate-600 font-medium leading-relaxed">
                  This platform provides supportive learning activities and progress tracking. It is not a medical diagnosis tool.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
