"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

interface InteractiveLumiCharacterProps {
  childName: string;
}

type MotionType = "wave-left" | "jump" | "wiggle" | "wave-right" | "wink" | "cheer";

interface SceneStep {
  getQuote: (name: string) => string;
  motionType: MotionType;
  category: string;
  emoji: string;
}

const SCENE_STEPS: SceneStep[] = [
  {
    getQuote: (name) => `Hi ${name}! Let's play! 👋`,
    motionType: "wave-left",
    category: "WELCOME",
    emoji: "👋",
  },
  {
    getQuote: () => "Ready for a fun adventure? 🚀",
    motionType: "jump",
    category: "EXPLORE",
    emoji: "🚀",
  },
  {
    getQuote: () => "You are super smart today! 🌟",
    motionType: "wiggle",
    category: "ENCOURAGE",
    emoji: "🌟",
  },
  {
    getQuote: () => "Every game helps you grow! 🌱",
    motionType: "wave-right",
    category: "LEARNING",
    emoji: "🌱",
  },
  {
    getQuote: () => "You can do anything you try! 💖",
    motionType: "wink",
    category: "CONFIDENCE",
    emoji: "💖",
  },
  {
    getQuote: () => "Pick your favorite activity below! 🎮",
    motionType: "cheer",
    category: "GAME TRACK",
    emoji: "🎮",
  },
];

// Managed Web Audio Chime Helper
function playCuteChimeSound(isMuted: boolean) {
  if (isMuted || typeof window === "undefined") return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = "sine";
    osc2.type = "sine";

    const now = ctx.currentTime;
    osc1.frequency.setValueAtTime(523.25, now);
    osc2.frequency.setValueAtTime(659.25, now + 0.08);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now + 0.08);
    osc1.stop(now + 0.35);
    osc2.stop(now + 0.35);
  } catch (err) {
    // Ignore audio restrictions
  }
}

// Managed Speech Helper
function speakQuote(text: string, isMuted: boolean) {
  if (isMuted || typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.pitch = 1.3;
    utterance.rate = 0.95;
    utterance.volume = 0.55;
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    // Ignore speech errors
  }
}

export function InteractiveLumiCharacter({ childName }: InteractiveLumiCharacterProps) {
  const firstName = childName.split(" ")[0] || "friend";
  const [stepIndex, setStepIndex] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const currentStep = SCENE_STEPS[stepIndex];
  const currentQuote = currentStep.getQuote(firstName);

  const triggerStepEffects = useCallback((quoteText: string, muted: boolean) => {
    playCuteChimeSound(muted);
    speakQuote(quoteText, muted);
  }, []);

  // 1. SEQUENTIAL SCENE LOOP (Changes quote & motion every 5.2s)
  useEffect(() => {
    triggerStepEffects(currentQuote, isMuted);

    const stepTimer = setInterval(() => {
      setStepIndex((prev) => {
        const nextIdx = (prev + 1) % SCENE_STEPS.length;
        const nextStepObj = SCENE_STEPS[nextIdx];
        const nextQuoteText = nextStepObj.getQuote(firstName);
        triggerStepEffects(nextQuoteText, isMuted);
        return nextIdx;
      });
    }, 5200);

    return () => clearInterval(stepTimer);
  }, [firstName, triggerStepEffects, isMuted]);

  // 2. Eye Blink Loop
  useEffect(() => {
    const blinkLoop = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 2800);
    return () => clearInterval(blinkLoop);
  }, []);

  const handleCharacterTap = () => {
    const nextIdx = (stepIndex + 1) % SCENE_STEPS.length;
    setStepIndex(nextIdx);
    const nextStepObj = SCENE_STEPS[nextIdx];
    triggerStepEffects(nextStepObj.getQuote(firstName), isMuted);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Motion Variant Controllers
  const getBodyMotion = (motionType: MotionType) => {
    switch (motionType) {
      case "jump":
        return { y: [-4, -36, 0], scaleY: [1, 1.1, 0.92, 1] };
      case "cheer":
        return { y: [-2, -25, 0], scaleY: [1, 1.08, 0.95, 1] };
      case "wiggle":
        return { x: [-6, 6, -6, 6, 0], y: [0, -6, 0] };
      case "wink":
        return { y: [0, -10, 0] };
      default:
        return { y: [0, -8, 0, -4, 0] };
    }
  };

  const getLeftArmMotion = (motionType: MotionType) => {
    switch (motionType) {
      case "wave-left":
        return { rotate: [-45, 45, -45, 45, -20] };
      case "cheer":
        return { rotate: [-50, -60, -50] };
      case "jump":
        return { rotate: [-30, 20, -30] };
      default:
        return { rotate: [-15, 20, -15] };
    }
  };

  const getRightArmMotion = (motionType: MotionType) => {
    switch (motionType) {
      case "wave-right":
        return { rotate: [45, -45, 45, -45, 20] };
      case "cheer":
        return { rotate: [50, 60, 50] };
      case "jump":
        return { rotate: [30, -20, 30] };
      default:
        return { rotate: [15, -20, 15] };
    }
  };

  return (
    <div className="relative flex flex-col items-center select-none pt-2 pb-4">
      {/* Sound Control Pill */}
      <button
        onClick={toggleMute}
        className="absolute top-0 right-0 z-40 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-sky-200 text-xs font-black text-sky-700 shadow-xs hover:bg-sky-50 transition-all"
        title={isMuted ? "Unmute Sound" : "Mute Sound"}
      >
        {isMuted ? <VolumeX size={15} className="text-slate-400" /> : <Volume2 size={15} className="text-sky-500 animate-pulse" />}
        <span>{isMuted ? "Sound Off" : "Sound On"}</span>
      </button>

      {/* ===== 🌟 NEXT-LEVEL GLASSMOPHIC CLOUD SPEECH BUBBLE ===== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0, scale: 0.82, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.82, y: -12 }}
          transition={{ duration: 0.45, type: "spring", stiffness: 280, damping: 22 }}
          onClick={handleCharacterTap}
          className="relative mb-7 cursor-pointer z-30 group"
        >
          {/* Outer Soft Halo Glow Ring */}
          <div className="absolute -inset-2 rounded-[3.5rem] bg-gradient-to-r from-sky-400/25 via-fuchsia-400/25 to-indigo-400/25 blur-xl opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Main Next-Level Cloud Box */}
          <div className="relative bg-gradient-to-br from-white via-sky-50/95 to-indigo-50/80 backdrop-blur-xl border-4 border-transparent bg-clip-border p-6 sm:px-10 sm:py-6 rounded-[3.5rem] shadow-[0_20px_45px_rgba(56,189,248,0.22)] max-w-[340px] sm:max-w-[440px] ring-2 ring-sky-300/80 flex flex-col items-center gap-3">
            
            {/* Specular Glass Glare Top Highlight */}
            <div className="absolute top-1.5 left-10 right-10 h-3 bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-full pointer-events-none" />

            {/* Fluffy Rounded Cloud Bumps */}
            <div className="absolute -top-4 left-8 w-11 h-11 bg-white rounded-full border-t-4 border-l-4 border-sky-300/90 shadow-xs" />
            <div className="absolute -top-6 right-12 w-14 h-14 bg-white rounded-full border-t-4 border-sky-300/90 shadow-xs" />
            <div className="absolute -bottom-4 left-12 w-9 h-9 bg-white rounded-full border-b-4 border-l-4 border-sky-300/90 shadow-xs" />
            <div className="absolute -bottom-5 right-16 w-11 h-11 bg-white rounded-full border-b-4 border-r-4 border-sky-300/90 shadow-xs" />

            {/* Glowing Category Badge Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-sky-500/15 via-fuchsia-500/15 to-purple-500/15 border border-sky-300/80 text-[10px] font-black uppercase tracking-[0.2em] text-sky-700 shadow-2xs relative z-10">
              <Sparkles size={12} className="text-amber-400 fill-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>{currentStep.category}</span>
              <span className="text-xs">{currentStep.emoji}</span>
            </div>

            {/* Rich Quote Typography */}
            <p className="text-slate-900 font-black text-lg sm:text-xl leading-snug text-center tracking-tight relative z-10 drop-shadow-xs">
              {currentQuote}
            </p>

            {/* Step Progress Dots (• • • • • •) */}
            <div className="flex items-center justify-center gap-1.5 pt-1 relative z-10">
              {SCENE_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    idx === stepIndex
                      ? "w-6 bg-gradient-to-r from-sky-400 to-indigo-500 shadow-xs"
                      : "w-2 bg-slate-300/70"
                  }`}
                />
              ))}
            </div>

            {/* Cloud Tail Pointing Down */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-r-4 border-b-4 border-sky-300/90 rotate-45 rounded-sm shadow-xs" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ===== 2. SEQUENTIAL SYNCHRONIZED CHARACTER MOTIONS ===== */}
      <motion.div
        animate={getBodyMotion(currentStep.motionType)}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        onClick={handleCharacterTap}
        className="relative w-56 h-60 sm:w-64 sm:h-72 cursor-pointer group flex items-center justify-center"
      >
        <svg viewBox="0 0 240 260" className="w-full h-full drop-shadow-[0_15px_30px_rgba(56,189,248,0.25)]">
          <defs>
            <radialGradient id="bodyGlow" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#e0f2fe" />
              <stop offset="85%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#38bdf8" />
            </radialGradient>
            <radialGradient id="bellyGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#f0f9ff" stopOpacity="0.3" />
            </radialGradient>
          </defs>

          {/* LEFT ARM */}
          <motion.g
            animate={getLeftArmMotion(currentStep.motionType)}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            style={{ transformOrigin: "60px 130px" }}
          >
            <path
              d="M 65,130 C 35,115 15,135 30,155 C 45,165 65,145 65,130 Z"
              fill="url(#bodyGlow)"
              stroke="#ffffff"
              strokeWidth="4"
            />
          </motion.g>

          {/* RIGHT ARM */}
          <motion.g
            animate={getRightArmMotion(currentStep.motionType)}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            style={{ transformOrigin: "180px 130px" }}
          >
            <path
              d="M 175,130 C 205,115 225,135 210,155 C 195,165 175,145 175,130 Z"
              fill="url(#bodyGlow)"
              stroke="#ffffff"
              strokeWidth="4"
            />
          </motion.g>

          {/* LEFT LEG */}
          <motion.g
            animate={{
              y: currentStep.motionType === "jump" ? [0, -12, 0] : [0, -6, 0],
              rotate: currentStep.motionType === "jump" ? [-10, 10, -10] : [-4, 6, -4],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "90px 200px" }}
          >
            <ellipse cx="90" cy="215" rx="16" ry="22" fill="#7dd3fc" stroke="#ffffff" strokeWidth="4" />
          </motion.g>

          {/* RIGHT LEG */}
          <motion.g
            animate={{
              y: currentStep.motionType === "jump" ? [0, -12, 0] : [0, -6, 0],
              rotate: currentStep.motionType === "jump" ? [10, -10, 10] : [4, -6, 4],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            style={{ transformOrigin: "150px 200px" }}
          >
            <ellipse cx="150" cy="215" rx="16" ry="22" fill="#7dd3fc" stroke="#ffffff" strokeWidth="4" />
          </motion.g>

          {/* MAIN CHARACTER BODY */}
          <path
            d="M 120,40 C 180,40 200,90 195,160 C 190,210 155,220 120,220 C 85,220 50,210 45,160 C 40,90 60,40 120,40 Z"
            fill="url(#bodyGlow)"
            stroke="#ffffff"
            strokeWidth="5"
          />

          {/* BELLY HIGHLIGHT */}
          <ellipse cx="120" cy="150" rx="55" ry="42" fill="url(#bellyGlow)" />

          {/* HEAD ANTENNAE */}
          <motion.g
            animate={currentStep.motionType === "wiggle" ? { rotate: [-18, 20, -18] } : { rotate: [-6, 10, -6] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "110px 42px" }}
          >
            <path d="M 110,42 C 105,25 95,20 102,12 C 108,18 112,28 110,42 Z" fill="#7dd3fc" stroke="#ffffff" strokeWidth="2" />
          </motion.g>
          <motion.g
            animate={currentStep.motionType === "wiggle" ? { rotate: [18, -20, 18] } : { rotate: [5, -8, 5] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
            style={{ transformOrigin: "120px 40px" }}
          >
            <path d="M 120,40 C 120,20 120,12 124,6 C 128,12 124,24 120,40 Z" fill="#bae6fd" stroke="#ffffff" strokeWidth="2" />
          </motion.g>

          {/* EYES & BLINKING */}
          <g>
            {/* LEFT EYE */}
            <ellipse cx="98" cy="105" rx="12" ry="16" fill="#0f172a" />
            <circle cx="102" cy="98" r="5" fill="#ffffff" />
            <circle cx="94" cy="112" r="2.5" fill="#ffffff" opacity="0.8" />

            {/* LEFT EYELID BLINK */}
            <motion.ellipse
              cx="98"
              cy="105"
              rx="13"
              ry="17"
              fill="#e0f2fe"
              animate={{ scaleY: isBlinking || currentStep.motionType === "wink" ? 1 : 0 }}
              transition={{ duration: 0.08 }}
              style={{ transformOrigin: "98px 89px" }}
            />

            {/* RIGHT EYE */}
            <ellipse cx="142" cy="105" rx="12" ry="16" fill="#0f172a" />
            <circle cx="146" cy="98" r="5" fill="#ffffff" />
            <circle cx="138" cy="112" r="2.5" fill="#ffffff" opacity="0.8" />

            {/* RIGHT EYELID BLINK */}
            <motion.ellipse
              cx="142"
              cy="105"
              rx="13"
              ry="17"
              fill="#e0f2fe"
              animate={{ scaleY: isBlinking ? 1 : 0 }}
              transition={{ duration: 0.08 }}
              style={{ transformOrigin: "142px 89px" }}
            />

            {/* CHEEKS */}
            <ellipse cx="80" cy="120" rx="9" ry="5" fill="#f472b6" opacity="0.5" />
            <ellipse cx="160" cy="120" rx="9" ry="5" fill="#f472b6" opacity="0.5" />

            {/* SMILE MOUTH */}
            <path d="M 110,122 Q 120,132 130,122" fill="none" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        </svg>

        {/* Dynamic Shadow */}
        <motion.div
          animate={{
            scale: currentStep.motionType === "jump" ? [1, 0.6, 1] : [1, 0.84, 1],
            opacity: currentStep.motionType === "jump" ? [0.3, 0.1, 0.3] : [0.3, 0.18, 0.3],
          }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[60%] h-4 bg-sky-950/20 blur-md rounded-full pointer-events-none"
        />
      </motion.div>
    </div>
  );
}
