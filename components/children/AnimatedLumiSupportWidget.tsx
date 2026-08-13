"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { playGameSound } from "@/lib/game-sounds";

interface AnimatedLumiSupportWidgetProps {
  childName?: string;
}

const AFFIRMATIONS = [
  "Every child learns in their own unique way 💖",
  "Praise effort and celebrate every small win! 🌟",
  "Consistent daily play builds lasting confidence 🚀",
  "You're doing an amazing job supporting your child! ✨",
  "Calm and positive practice creates joyful learning 🌈",
];

function playCuteHighFiveChime() {
  if (typeof window === "undefined") return;
  playGameSound("correct");

  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.08);
    osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.16);
    osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.24);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  } catch {
    // Ignore audio context autoplay restriction errors
  }
}

export function AnimatedLumiSupportWidget({ childName = "your child" }: AnimatedLumiSupportWidgetProps) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [tapCount, setTapCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % AFFIRMATIONS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleTapMascot = () => {
    playCuteHighFiveChime();
    setTapCount((prev) => prev + 1);
    setShowCelebration(true);
    setQuoteIndex((prev) => (prev + 1) % AFFIRMATIONS.length);
    setTimeout(() => setShowCelebration(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-[2.2rem] border-2 border-white/90 bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-indigo-500/10 p-6 sm:p-7 shadow-[0_20px_50px_rgba(245,158,11,0.14)] backdrop-blur-2xl text-center">
      {/* Background Floating Orbs */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-amber-200/40 rounded-full blur-2xl -mr-8 -mt-8 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-rose-200/40 rounded-full blur-2xl -ml-8 -mb-8 animate-pulse" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center gap-3.5">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/80 bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-amber-800 shadow-xs">
          <span>✨</span> Daily Learning Companion
        </div>

        {/* Animated 3D Lumi Mascot */}
        <div className="relative cursor-pointer select-none" onClick={handleTapMascot}>
          <motion.div
            animate={{
              y: [0, -10, 0],
              scale: showCelebration ? [1, 1.15, 1] : 1,
              rotate: showCelebration ? [0, -10, 10, 0] : 0,
            }}
            transition={{
              y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 0.4 },
              rotate: { duration: 0.4 },
            }}
            className="relative h-28 w-28 sm:h-32 sm:w-32 my-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-300/40 via-yellow-200/30 to-rose-300/30 blur-2xl rounded-full scale-110 animate-pulse" />
            <Image
              src="/mascot/mascot-happy.png"
              alt="Mascot Companion"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>

          {/* Celebration Floating Hearts/Stars */}
          <AnimatePresence>
            {showCelebration && (
              <motion.div
                initial={{ opacity: 0, y: 0, scale: 0.5 }}
                animate={{ opacity: 1, y: -40, scale: 1.2 }}
                exit={{ opacity: 0, y: -60 }}
                transition={{ duration: 1.2 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none text-sm sm:text-base font-black text-amber-600 whitespace-nowrap drop-shadow-md bg-white/90 border border-amber-200 px-3 py-1 rounded-full shadow-md"
              >
                🎉 High Five for {childName}! ⭐
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cycling Affirmation Quote Ticker */}
        <div className="w-full min-h-[48px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="text-xs font-bold leading-relaxed text-slate-700 max-w-xs"
            >
              {AFFIRMATIONS[quoteIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Interactive Tap Prompt */}
        <button
          onClick={handleTapMascot}
          className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/90 px-4 py-2 text-[11px] font-black uppercase tracking-wider text-amber-700 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-amber-50"
        >
          <span>👋</span> Tap Mascot for High Five! ({tapCount})
        </button>
      </div>
    </div>
  );
}
