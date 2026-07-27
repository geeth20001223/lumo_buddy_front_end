"use client";

import React, { useRef, useEffect } from "react";

export default function JourneyScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !scrollTrackRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;

      if (scrollableDistance <= 0) return;

      let progress = -rect.top / scrollableDistance;
      progress = Math.max(0, Math.min(1, progress));

      const trackWidth = scrollTrackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const maxTranslate = trackWidth - viewportWidth;

      if (maxTranslate <= 0) return;

      scrollTrackRef.current.style.transform = `translateX(-${progress * maxTranslate}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative bg-gradient-to-b from-fuchsia-50 via-rose-50/80 to-amber-50/50 h-[300vh]">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">

        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-gradient-to-b from-rose-300/40 to-transparent blur-[120px]" style={{ animation: 'blob 18s ease-in-out infinite' }}></div>
          <div className="absolute bottom-[-10%] left-[-20%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-tr from-fuchsia-300/40 to-transparent blur-[120px]" style={{ animation: 'blob 22s ease-in-out infinite', animationDelay: '5s' }}></div>
          <div className="absolute top-[30%] left-[50%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-bl from-amber-200/35 to-transparent blur-[100px]" style={{ animation: 'drift 25s ease-in-out infinite' }}></div>
          {/* Sparkle particles */}
          <svg className="absolute top-[10%] left-[15%] w-5 h-5 text-rose-400" style={{ animation: 'sparkle 3s ease-in-out infinite' }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" /></svg>
          <svg className="absolute bottom-[15%] right-[20%] w-4 h-4 text-fuchsia-400" style={{ animation: 'sparkle 3s ease-in-out infinite 1.5s' }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" /></svg>
          <svg className="absolute top-[60%] left-[70%] w-3 h-3 text-amber-400" style={{ animation: 'sparkle 3s ease-in-out infinite 0.8s' }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" /></svg>
          {/* Floating dots */}
          <div className="absolute top-[20%] right-[5%] w-3 h-3 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-500 opacity-40" style={{ animation: 'drift 16s ease-in-out infinite' }}></div>
          <div className="absolute bottom-[25%] left-[8%] w-4 h-4 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 opacity-35" style={{ animation: 'drift 20s ease-in-out infinite 3s' }}></div>
        </div>

        {/* Fixed Centered Header Title */}
        <div className="absolute top-4 sm:top-6 left-0 w-full z-20 pointer-events-none flex flex-col items-center px-4">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-2.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-slate-600 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary-blue mr-2.5 animate-pulse"></span>
            The Journey
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight drop-shadow-sm text-center">
            A gentle path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue via-secondary-violet to-teal-400">unlocking potential</span>
          </h2>
          <div className="mt-2.5 flex items-center justify-center gap-2 text-slate-400 opacity-60">
            <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">Keep Scrolling Down</span>
          </div>
        </div>

        {/* The Track that moves horizontally */}
        <div
          ref={scrollTrackRef}
          className="flex items-center h-full pt-[210px] sm:pt-[240px] lg:pt-[260px] pb-8 sm:pb-12 px-[10vw] will-change-transform"
          style={{ width: "fit-content", transition: "transform 0.1s ease-out" }}
        >
          <div className="flex gap-10 sm:gap-16 items-center">

            {/* Slide 01 */}
            <div className="relative w-[85vw] sm:w-[60vw] lg:w-[800px] flex-shrink-0 aspect-[4/5] lg:aspect-[16/10] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border-8 border-white group">
              <img src="/images/create-profile.jpg" alt="Create Profile" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/30 to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 lg:w-[70%] bg-white/10 backdrop-blur-2xl p-8 sm:p-10 rounded-[2rem] border border-white/20 shadow-premium transition-transform duration-500 group-hover:-translate-y-2">
                <div className="absolute -top-12 -right-4 sm:-right-8 text-[8rem] sm:text-[10rem] font-black text-white/10 leading-none select-none pointer-events-none transition-colors duration-700 group-hover:text-blue-200/20">01</div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-blue-500/30 backdrop-blur-md border border-blue-200/40 rounded-2xl flex items-center justify-center text-white mb-6 shadow-inner">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">Create child profile</h3>
                  <p className="text-base sm:text-lg text-blue-50/90 leading-relaxed font-medium drop-shadow-sm">
                    Set up a beautifully secure and personalized space. This forms the foundation of your child's unique developmental journey, tailored just for them.
                  </p>
                </div>
              </div>
            </div>

            {/* Slide 02 */}
            <div className="relative w-[85vw] sm:w-[60vw] lg:w-[800px] flex-shrink-0 aspect-[4/5] lg:aspect-[16/10] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border-8 border-white group">
              <img src="/images/complete-survey.jpg" alt="Survey" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-violet-900/90 via-violet-900/30 to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 lg:w-[70%] bg-white/10 backdrop-blur-2xl p-8 sm:p-10 rounded-[2rem] border border-white/20 shadow-premium transition-transform duration-500 group-hover:-translate-y-2">
                <div className="absolute -top-12 -right-4 sm:-right-8 text-[8rem] sm:text-[10rem] font-black text-white/10 leading-none select-none pointer-events-none transition-colors duration-700 group-hover:text-violet-200/20">02</div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-violet-500/30 backdrop-blur-md border border-violet-200/40 rounded-2xl flex items-center justify-center text-white mb-6 shadow-inner">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">Complete support survey</h3>
                  <p className="text-base sm:text-lg text-violet-50/90 leading-relaxed font-medium drop-shadow-sm">
                    Answer a series of gentle, intuitive questions. Our intelligent system uses this to intimately understand their milestones and emotional needs.
                  </p>
                </div>
              </div>
            </div>

            {/* Slide 03 */}
            <div className="relative w-[85vw] sm:w-[60vw] lg:w-[800px] flex-shrink-0 aspect-[4/5] lg:aspect-[16/10] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border-8 border-white group">
              <img src="/images/play-games.jpg" alt="Play Games" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-900/30 to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 lg:w-[70%] bg-white/10 backdrop-blur-2xl p-8 sm:p-10 rounded-[2rem] border border-white/20 shadow-premium transition-transform duration-500 group-hover:-translate-y-2">
                <div className="absolute -top-12 -right-4 sm:-right-8 text-[8rem] sm:text-[10rem] font-black text-white/10 leading-none select-none pointer-events-none transition-colors duration-700 group-hover:text-teal-200/20">03</div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-teal-500/30 backdrop-blur-md border border-teal-200/40 rounded-2xl flex items-center justify-center text-white mb-6 shadow-inner">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">Play recommended games</h3>
                  <p className="text-base sm:text-lg text-teal-50/90 leading-relaxed font-medium drop-shadow-sm">
                    Unlock a breathtaking, curated list of activities beautifully crafted to support their specific cognitive and emotional growth gracefully.
                  </p>
                </div>
              </div>
            </div>

            {/* End spacer for alignment, giving room to scroll past the last item */}
            <div className="w-[10vw] flex-shrink-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
