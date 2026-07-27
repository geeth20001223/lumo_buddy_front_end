"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface RealAnimatedLumiMascotProps {
  childName: string;
}

const CHILD_QUOTES = [
  "Ready for a fun adventure? 🚀",
  "You are super smart today! 🌟",
  "Every game helps you grow! 🌱",
  "You can do anything you try! 💖",
  "Let's explore together, friend! 🎈",
  "You're doing amazing today! ✨",
  "Pick your favorite activity below! 🎮",
];

// Helper to play a gentle, cute 2-tone child-friendly Web Audio chime
function playCuteChimeSound() {
  if (typeof window === "undefined") return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = "sine";
    osc2.type = "sine";

    // Play C5 (523Hz) to E5 (659Hz)
    const now = ctx.currentTime;
    osc1.frequency.setValueAtTime(523.25, now);
    osc2.frequency.setValueAtTime(659.25, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now + 0.08);
    osc1.stop(now + 0.35);
    osc2.stop(now + 0.35);
  } catch (err) {
    // Ignore audio context autoplay restrictions gracefully
  }
}

// Optional text-to-speech helper with friendly pitch
function speakQuote(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel(); // Stop prior speech
    const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.pitch = 1.3; // Higher, friendly pitch for child
    utterance.rate = 0.95; // Slightly slower, clear speech
    utterance.volume = 0.6;
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    // Ignore speech errors
  }
}

export function RealAnimatedLumiMascot({ childName }: RealAnimatedLumiMascotProps) {
  const firstName = childName.split(" ")[0] || "friend";
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isJumping, setIsJumping] = useState(false);

  const quotes = [`Hi ${firstName}! Let's play! 👋`, ...CHILD_QUOTES];

  const triggerQuoteEffects = useCallback((text: string) => {
    playCuteChimeSound();
    speakQuote(text);
  }, []);

  // 1. Quote Carousel Timer with sound effect
  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => {
        const nextIdx = (prev + 1) % quotes.length;
        triggerQuoteEffects(quotes[nextIdx]);
        return nextIdx;
      });
    }, 4800);
    return () => clearInterval(timer);
  }, [quotes, triggerQuoteEffects]);

  // 2. Eye Blink Loop (blinks every 3.2s)
  useEffect(() => {
    const blinkLoop = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3200);
    return () => clearInterval(blinkLoop);
  }, []);

  const handleCharacterTap = () => {
    setIsJumping(true);
    const nextIdx = (quoteIndex + 1) % quotes.length;
    setQuoteIndex(nextIdx);
    triggerQuoteEffects(quotes[nextIdx]);
    setTimeout(() => setIsJumping(false), 700);
  };

  return (
    <div className="relative flex flex-col items-center select-none pt-2 pb-4">
      {/* ===== 1. REAL FLUFFY CLOUD SPEECH BUBBLE WITH DYNAMIC QUOTES & SOUND ===== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={quoteIndex}
          initial={{ opacity: 0, scale: 0.85, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: -10 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 280, damping: 20 }}
          onClick={handleCharacterTap}
          className="relative mb-6 cursor-pointer z-30"
        >
          <div className="relative bg-white/95 backdrop-blur-md border-4 border-sky-300/90 px-8 py-4 sm:px-10 sm:py-5 rounded-[3rem] shadow-[0_15px_35px_rgba(56,189,248,0.25)] max-w-[340px] sm:max-w-[420px]">
            {/* Fluffy Cloud Bumps */}
            <div className="absolute -top-4 left-8 w-10 h-10 bg-white rounded-full border-t-4 border-l-4 border-sky-300/90" />
            <div className="absolute -top-6 right-12 w-14 h-14 bg-white rounded-full border-t-4 border-sky-300/90" />
            <div className="absolute -bottom-4 left-12 w-9 h-9 bg-white rounded-full border-b-4 border-l-4 border-sky-300/90" />
            <div className="absolute -bottom-5 right-16 w-11 h-11 bg-white rounded-full border-b-4 border-r-4 border-sky-300/90" />

            {/* Quote Content */}
            <p className="text-slate-900 font-black text-base sm:text-lg leading-snug text-center tracking-tight relative z-10">
              {quotes[quoteIndex]}
            </p>

            {/* Cloud Tail Pointing to Character */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-r-4 border-b-4 border-sky-300/90 rotate-45 rounded-sm" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ===== 2. REAL 3D LUMI CHARACTER WITH HAND/LEG PHYSICS & BLINKING OVERLAY ===== */}
      <motion.div
        animate={
          isJumping
            ? {
                y: [-5, -45, 0],
                scaleY: [1, 1.12, 0.9, 1],
                scaleX: [1, 0.9, 1.1, 1],
                rotate: [0, -6, 6, 0],
              }
            : {
                y: [0, -18, 0, -10, 0],
                rotate: [-4, 4, -2, 2, -4],
                scaleY: [1, 1.05, 0.96, 1.03, 1],
                scaleX: [1, 0.96, 1.04, 0.98, 1],
              }
        }
        transition={
          isJumping
            ? { duration: 0.7, ease: "easeOut" }
            : { duration: 4.2, repeat: Infinity, ease: "easeInOut" }
        }
        onClick={handleCharacterTap}
        className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 cursor-pointer group flex items-center justify-center"
      >
        {/* Real 3D Mascot Image with Arm & Leg Motion */}
        <motion.div
          animate={{
            x: [-3, 3, -2, 2, -3],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full h-full"
        >
          <Image
            src="/mascot/mascot-happy.png"
            alt="Lumi 3D Mascot"
            width={400}
            height={400}
            className="w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(56,189,248,0.3)]"
            priority
          />

          {/* Real Eye Blink Lid Overlay precisely positioned over 3D Mascot eyes */}
          <AnimatePresence>
            {isBlinking && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0 }}
                transition={{ duration: 0.08 }}
                className="absolute top-[36%] left-[38%] w-[24%] h-[6%] bg-sky-200/90 rounded-full blur-[1px] pointer-events-none"
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic Ground Shadow that expands/shrinks with character motion */}
        <motion.div
          animate={{
            scale: [1, 0.78, 1, 0.84, 1],
            opacity: [0.35, 0.15, 0.35, 0.2, 0.35],
          }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[65%] h-5 bg-sky-950/20 blur-md rounded-full pointer-events-none"
        />

        {/* Tap Indicator Badge */}
        <div className="absolute -bottom-2 right-4 bg-white/90 backdrop-blur-sm border border-sky-200 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-sky-600 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-30">
          Tap me! 🔊
        </div>
      </motion.div>
    </div>
  );
}
