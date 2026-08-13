"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Play, Lock, Sparkles, CheckCircle2 } from "lucide-react";
import type { GameWithUnlockState } from "@/types/game";
import { getGameHref } from "@/lib/game-routes";

interface JourneyCardProps {
  childId: string;
  game: GameWithUnlockState;
  isFirstUnlocked?: boolean;
  isHighlighted?: boolean;
}

const LEVEL_GAME_ASSETS: Record<string, { image: string; label: string; desc: string }> = {
  // Emotion Area (Feeling Skills) - Warm Pastel Pink/Rose Theme
  "emotion-face-match-1": {
    image: "/images/games/emotion-face-match-1.png",
    label: "Basic Emotions",
    desc: "Match happy, sad & smiling faces",
  },
  "emotion-face-match-2": {
    image: "/images/games/emotion-face-match-2.png",
    label: "Expressive Emotions",
    desc: "Recognize surprise, excitement & fear",
  },
  "emotion-face-match-3": {
    image: "/images/games/emotion-face-match-3.png",
    label: "Social Emotions",
    desc: "Understand calm, proud & soft feelings",
  },
  "emotion-story-choice-1": {
    image: "/images/games/emotion-story-choice-1.png",
    label: "Sharing & Helping",
    desc: "Choose happy story actions with friends",
  },
  "emotion-story-choice-2": {
    image: "/images/games/emotion-story-choice-2.png",
    label: "Managing Feelings",
    desc: "Learn to pause and take deep breaths",
  },
  "emotion-story-choice-3": {
    image: "/images/games/emotion-story-choice-3.svg",
    label: "Empathy Stories",
    desc: "Understand how friends feel in stories",
  },
  "emotion-reflection-board-1": {
    image: "/images/games/emotion-story-choice-1.png",
    label: "Feelings Check-In",
    desc: "Tap how you feel right now",
  },

  // Cognitive Area (Thinking Skills) - Cool Sky Blue/Cyan Theme
  "memory-match-1": {
    image: "/images/games/memory-match-1.png",
    label: "Card Match 4-Pair",
    desc: "Find simple matching cards",
  },
  "memory-match-2": {
    image: "/images/games/memory-match-2.png",
    label: "Color & Object Match",
    desc: "Match colorful pairs from memory",
  },
  "memory-match-3": {
    image: "/images/games/memory-match-3.svg",
    label: "Spatial Pattern Match",
    desc: "Challenge your visual memory path",
  },
  "pattern-builder-1": {
    image: "/images/games/pattern-builder-1.png",
    label: "Color Patterns",
    desc: "Complete simple repeating color series",
  },
  "pattern-builder-2": {
    image: "/images/games/pattern-builder-2.svg",
    label: "Shape Sequences",
    desc: "Build repeating shape sequences",
  },
  "pattern-builder-3": {
    image: "/images/games/pattern-builder-3.svg",
    label: "Complex Logic Path",
    desc: "Solve multi-attribute visual patterns",
  },

  // Self-Awareness Area (Me & My Day) - Sunny Amber/Orange Theme
  "daily-routine-order-1": {
    image: "/images/games/daily-routine-order-1.png",
    label: "Morning Routine",
    desc: "Order waking up, brushing & breakfast",
  },
  "daily-routine-order-2": {
    image: "/images/games/daily-routine-order-2.png",
    label: "School & Afternoon",
    desc: "Arrange packing bag, school & play",
  },
  "daily-routine-order-3": {
    image: "/images/games/daily-routine-order-3.svg",
    label: "Bedtime Routine",
    desc: "Order bath, storytime & sleeping",
  },
  "personal-choice-adventure-1": {
    image: "/images/games/personal-choice-1.svg",
    label: "Expressing Needs",
    desc: "Pick what you need when thirsty or tired",
  },
  "personal-choice-adventure-2": {
    image: "/images/games/daily-routine-order-2.png",
    label: "Calming Choices",
    desc: "Choose quiet activities to relax",
  },
  "personal-choice-adventure-3": {
    image: "/images/games/daily-routine-order-1.png",
    label: "Daily Decision Maker",
    desc: "Make healthy personal choices",
  },

  // Mathematical Skills Area (Number Skills) - Fresh Emerald/Teal Theme
  "count-the-objects-1": {
    image: "/images/games/count-the-objects-1.png",
    label: "Counting 1 to 5",
    desc: "Count cute toys and ducks together",
  },
  "count-the-objects-2": {
    image: "/images/games/count-the-objects-2.svg",
    label: "Counting 6 to 10",
    desc: "Count colorful objects & balloons",
  },
  "count-the-objects-3": {
    image: "/images/games/count-the-objects-3.svg",
    label: "Comparing Quantities",
    desc: "Count bigger groups & compare sets",
  },
  "shape-number-match-1": {
    image: "/images/games/shape-number-match-1.png",
    label: "Basic Shapes",
    desc: "Match circle, square, triangle & star",
  },
  "shape-number-match-2": {
    image: "/images/games/shape-number-match-2.svg",
    label: "Number & Quantity",
    desc: "Match written numbers to dots",
  },
  "shape-number-match-3": {
    image: "/images/games/shape-number-match-3.svg",
    label: "Shape & Math Puzzle",
    desc: "Combine shape puzzles with counting",
  },
};

export function JourneyCard({ childId, game, isFirstUnlocked, isHighlighted }: JourneyCardProps) {
  const isUnlocked = game.is_unlocked;
  const levelKey = `${game.game_slug}-${game.level}`;
  const assets = LEVEL_GAME_ASSETS[levelKey] || LEVEL_GAME_ASSETS[game.game_slug] || {
    image: `/images/games/${game.game_slug}.png`,
    label: game.game_name,
    desc: "Let's play and learn",
  };

  const themes = {
    emotion: {
      bg: "bg-gradient-to-br from-rose-50/90 via-pink-50/60 to-white",
      bgHover: "group-hover:from-rose-100/95 group-hover:via-pink-100/80 group-hover:to-white",
      button: "bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:via-pink-600 hover:to-rose-700 shadow-rose-300/50",
      text: "text-rose-700",
      border: "border-rose-200",
      accent: "bg-gradient-to-br from-rose-300 to-pink-300",
      badge: "bg-rose-100/90 border-rose-200 text-rose-700 group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-400",
      mascot: "/mascot/mascot-normal.png",
      hoverRing: "group-hover:border-rose-400 group-hover:shadow-[0_0_40px_rgba(244,63,94,0.5)]",
      glowColor: "from-rose-400/40 via-pink-400/30 to-purple-400/20",
    },
    cognitive: {
      bg: "bg-gradient-to-br from-blue-50/90 via-sky-50/60 to-white",
      bgHover: "group-hover:from-sky-100/95 group-hover:via-blue-100/80 group-hover:to-white",
      button: "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-600 hover:from-blue-600 hover:via-sky-600 hover:to-cyan-700 shadow-blue-300/50",
      text: "text-blue-700",
      border: "border-blue-200",
      accent: "bg-gradient-to-br from-blue-300 to-sky-300",
      badge: "bg-blue-100/90 border-blue-200 text-blue-700 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-400",
      mascot: "/mascot/mascot-happy.png",
      hoverRing: "group-hover:border-sky-400 group-hover:shadow-[0_0_40px_rgba(56,189,248,0.5)]",
      glowColor: "from-sky-400/40 via-blue-400/30 to-cyan-400/20",
    },
    self_awareness: {
      bg: "bg-gradient-to-br from-amber-50/90 via-orange-50/60 to-white",
      bgHover: "group-hover:from-amber-100/95 group-hover:via-orange-100/80 group-hover:to-white",
      button: "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 shadow-amber-300/50",
      text: "text-amber-700",
      border: "border-amber-200",
      accent: "bg-gradient-to-br from-amber-300 to-orange-300",
      badge: "bg-amber-100/90 border-amber-200 text-amber-700 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-400",
      mascot: "/mascot/mascot-normal.png",
      hoverRing: "group-hover:border-amber-400 group-hover:shadow-[0_0_40px_rgba(245,158,11,0.5)]",
      glowColor: "from-amber-400/40 via-orange-400/30 to-yellow-400/20",
    },
    mathematical: {
      bg: "bg-gradient-to-br from-emerald-50/90 via-teal-50/60 to-white",
      bgHover: "group-hover:from-emerald-100/95 group-hover:via-teal-100/80 group-hover:to-white",
      button: "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:via-teal-600 hover:to-emerald-700 shadow-emerald-300/50",
      text: "text-emerald-700",
      border: "border-emerald-200",
      accent: "bg-gradient-to-br from-emerald-300 to-teal-300",
      badge: "bg-emerald-100/90 border-emerald-200 text-emerald-700 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-400",
      mascot: "/mascot/mascot-normal.png",
      hoverRing: "group-hover:border-emerald-400 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.5)]",
      glowColor: "from-emerald-400/40 via-teal-400/30 to-cyan-400/20",
    },
  };

  const theme = themes[game.area as keyof typeof themes] || themes.emotion;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={isUnlocked ? { scale: 1.03, y: -4 } : { scale: 0.99 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative w-full min-w-0 box-border flex flex-col h-full select-none"
    >
      {/* Recommended Highlight Callout */}
      {isHighlighted && isUnlocked && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0.95, 1.05, 1], opacity: 1 }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -top-6 left-1/2 -translate-x-1/2 z-40 px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-white shadow-xl border-2 border-white flex items-center gap-2 whitespace-nowrap"
        >
          <Sparkles size={16} className="text-yellow-200 fill-yellow-200 animate-spin" />
          <span className="text-[11px] font-black uppercase tracking-widest">Recommended Level ✨</span>
        </motion.div>
      )}

      {/* "Ready to Play" Callout */}
      {!isHighlighted && isFirstUnlocked && isUnlocked && (
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 px-5 py-2 rounded-full bg-white/90 backdrop-blur-md shadow-md border-2 border-fuchsia-200 flex items-center gap-2"
        >
          <Sparkles size={16} className="text-amber-400 fill-amber-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-fuchsia-700">Ready!</span>
        </motion.div>
      )}

      {/* Outer Card Shell with Background Color Shifts */}
      <div className={`
        relative overflow-hidden rounded-[3rem] transition-all duration-500 flex flex-col justify-between h-full w-full
        ${isHighlighted && isUnlocked
          ? `${theme.bg} ${theme.bgHover} border-4 border-amber-400 ring-4 ring-amber-300/80 shadow-[0_0_40px_rgba(251,191,36,0.5)] scale-[1.02]`
          : isUnlocked
            ? `${theme.bg} ${theme.bgHover} ${theme.border} border-2 shadow-lg hover:shadow-2xl`
            : 'bg-slate-100/80 border-slate-200/90 shadow-sm'}
      `}>
        {/* Animated Background Bokeh Orbs */}
        {isUnlocked && (
          <>
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -left-10 w-44 h-44 rounded-full bg-gradient-to-br from-white/80 to-transparent blur-2xl pointer-events-none"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-gradient-to-br from-fuchsia-200/40 to-transparent blur-2xl pointer-events-none"
            />
          </>
        )}

        {/* Level Badge with Hover Color Shift */}
        <div className="absolute left-5 top-5 z-20 flex flex-col gap-1.5 items-start">
          <div className={`rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] shadow-xs border transition-all duration-300 ${isUnlocked ? theme.badge : "bg-slate-200/90 border-slate-300 text-slate-500"}`}>
            Level {game.level} {isUnlocked ? "" : "🔒"}
          </div>
          {game.is_played && (
            <div className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-emerald-500 text-white shadow-md flex items-center gap-1 border border-emerald-400 animate-pulse">
              <CheckCircle2 size={13} className="stroke-[3]" />
              <span>Completed</span>
            </div>
          )}
        </div>

        {/* Top Mascot Peek with Floating & Waving Animation */}
        <motion.div
          animate={isUnlocked ? { y: [0, -8, 0], rotate: [0, 4, -4, 0] } : {}}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-4 right-4 w-16 h-16 opacity-70 group-hover:opacity-100 z-20 pointer-events-none transition-opacity duration-300"
        >
          <Image
            src={theme.mascot}
            alt="Mascot"
            width={60}
            height={60}
            className={`object-contain ${!isUnlocked ? "grayscale" : ""}`}
          />
        </motion.div>

        {/* Decorative Floating Sparkles with Color Shifts */}
        {isUnlocked && (
          <>
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.3, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute top-12 right-12 z-10 text-amber-400 opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all pointer-events-none"
            >
              <Sparkles size={16} />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0], opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-20 left-6 z-10 text-fuchsia-400 opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all pointer-events-none"
            >
              <Sparkles size={14} />
            </motion.div>
          </>
        )}

        <div className="flex flex-col items-center p-8 space-y-6 flex-1 justify-between relative z-10">

          {/* Main Illustration Area with Floating & Hover Animations */}
          <motion.div
            whileHover={isUnlocked ? { scale: 1.08, rotate: [0, -2, 2, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="relative flex items-center justify-center pt-2"
          >
            {/* Multi-Color Glowing Background Aura Ring */}
            <motion.div
              animate={isUnlocked ? { scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] } : {}}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute inset-0 rounded-full bg-gradient-to-br ${theme.glowColor} blur-2xl`}
            />

            {/* Rotating Decorative Outer Border */}
            {isUnlocked && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2.5 rounded-full border-2 border-dashed border-white/80 group-hover:border-fuchsia-400/80 transition-colors pointer-events-none"
              />
            )}

            {/* Outer White Circle Container (Matching Level 3 Design across all cards with Hover Color Change) */}
            <div className={`
              relative w-[230px] h-[230px] sm:w-[250px] sm:h-[250px] rounded-full bg-white shadow-md border-[6px] transition-all duration-500 flex items-center justify-center p-3.5 sm:p-4
              ${isUnlocked ? `border-white ${theme.hoverRing}` : "border-slate-200/80"}
            `}>
              {/* Inner Image Circle - Uniform Dimensions & Aspect Ratio for All Cards */}
              <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-50/60 flex items-center justify-center border border-slate-100/80 shadow-inner group-hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src={assets.image}
                  alt={`Level ${game.level}`}
                  fill
                  className={`object-cover transition-all duration-700 group-hover:scale-110 ${!isUnlocked ? "grayscale opacity-30 scale-95" : ""}`}
                  priority
                />
              </div>

              {!isUnlocked && (
                <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px] flex items-center justify-center rounded-full z-20">
                  <div className="w-12 h-12 rounded-full bg-slate-900/80 text-white flex items-center justify-center shadow-lg border border-slate-700">
                    <Lock size={20} />
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Action Area (Play / Replay / Locked Button with Shimmer & Scale) */}
          <div className="w-full pt-2">
            {isUnlocked ? (
              <Link
                href={getGameHref(childId, game.game_slug, game.level)}
                className={`
                  relative overflow-hidden w-full py-4.5 rounded-2xl ${game.is_played ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 shadow-emerald-500/25" : theme.button} text-white text-sm font-extrabold uppercase tracking-widest
                  flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg group-hover:shadow-2xl group-hover:scale-[1.03]
                `}
              >
                {/* Button Shine Animation Effect */}
                <motion.div
                  animate={{ x: ["-100%", "250%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 pointer-events-none"
                />

                {game.is_played ? (
                  <>
                    <CheckCircle2 size={18} className="stroke-[3]" />
                    <span>Completed • Replay</span>
                  </>
                ) : (
                  <>
                    <Play size={18} fill="currentColor" className="transition-transform duration-300 group-hover:scale-125 group-hover:translate-x-1" />
                    <span>Let&apos;s Play</span>
                  </>
                )}
              </Link>
            ) : (
              <div className="w-full py-4.5 rounded-2xl bg-slate-200/80 text-slate-500 text-xs font-black uppercase tracking-widest px-4 text-center border border-slate-300/80 shadow-xs flex items-center justify-center gap-2 opacity-90 cursor-not-allowed">
                <Lock size={15} />
                Locked 🔒
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
