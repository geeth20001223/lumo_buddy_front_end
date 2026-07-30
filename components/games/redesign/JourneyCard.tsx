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

const GAME_ASSETS: Record<string, { image: string; label: string; desc: string; mascotState: "normal" | "correct" | "incorrect" }> = {
  "emotion-face-match": { image: "/images/games/emotion-face-match.png", label: "Face Match", desc: "Pick the feeling", mascotState: "normal" },
  "count-the-objects": { image: "/images/games/count-the-objects.png", label: "Counting", desc: "Count together", mascotState: "normal" },
  "daily-routine-order": { image: "/images/games/daily-routine.png", label: "My Day", desc: "Plan your day", mascotState: "normal" },
  "emotion-reflection-board": { image: "/images/games/emotion-story.png", label: "Feelings", desc: "Check your mood", mascotState: "normal" },
  "emotion-story-choice": { image: "/images/games/emotion-story.png", label: "Stories", desc: "Choose the story", mascotState: "normal" },
  "memory-match": { image: "/images/games/memory-match.png", label: "Memory", desc: "Match the cards", mascotState: "normal" },
  "pattern-builder": { image: "/images/games/pattern-builder.png", label: "Patterns", desc: "Build a path", mascotState: "normal" },
  "personal-choice-adventure": { image: "/images/games/personal-choice.png", label: "Adventure", desc: "You decide", mascotState: "normal" },
  "shape-number-match": { image: "/images/games/shapes-&-number-match.png", label: "Shapes", desc: "Find the shapes", mascotState: "normal" },
};

export function JourneyCard({ childId, game, isFirstUnlocked, isHighlighted }: JourneyCardProps) {
  const isUnlocked = game.is_unlocked;
  const assets = GAME_ASSETS[game.game_slug] || {
    image: "/images/games/emotion-face-match.png",
    label: game.game_name,
    desc: "Let's play",
    mascotState: "normal"
  };

  const themes = {
    emotion: {
      bg: "bg-gradient-to-br from-rose-50/90 via-pink-50/60 to-white",
      button: "bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-rose-300/40",
      text: "text-rose-700",
      border: "border-rose-200",
      accent: "bg-rose-200",
      badge: "bg-rose-100/90 border-rose-200 text-rose-700",
      mascot: "/mascot/mascot-normal.png"
    },
    cognitive: {
      bg: "bg-gradient-to-br from-blue-50/90 via-sky-50/60 to-white",
      button: "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-blue-300/40",
      text: "text-blue-700",
      border: "border-blue-200",
      accent: "bg-blue-200",
      badge: "bg-blue-100/90 border-blue-200 text-blue-700",
      mascot: "/mascot/mascot-happy.png"
    },
    self_awareness: {
      bg: "bg-gradient-to-br from-amber-50/90 via-orange-50/60 to-white",
      button: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-amber-300/40",
      text: "text-amber-700",
      border: "border-amber-200",
      accent: "bg-amber-200",
      badge: "bg-amber-100/90 border-amber-200 text-amber-700",
      mascot: "/mascot/mascot-normal.png"
    },
    mathematical: {
      bg: "bg-gradient-to-br from-emerald-50/90 via-teal-50/60 to-white",
      button: "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-emerald-300/40",
      text: "text-emerald-700",
      border: "border-emerald-200",
      accent: "bg-emerald-200",
      badge: "bg-emerald-100/90 border-emerald-200 text-emerald-700",
      mascot: "/mascot/mascot-normal.png"
    },
  };

  const theme = themes[game.area as keyof typeof themes] || themes.emotion;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={isUnlocked ? { scale: 1.03 } : { scale: 0.99 }}
      className="relative w-full min-w-0 box-border flex flex-col h-full select-none"
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

      <div className={`
        relative overflow-hidden rounded-[3rem] border-3 transition-all duration-500 flex flex-col justify-between h-full w-full
        ${isHighlighted && isUnlocked
          ? `${theme.bg} border-4 border-amber-400 ring-4 ring-amber-300/80 shadow-[0_0_40px_rgba(251,191,36,0.5)] scale-[1.02]`
          : isUnlocked
            ? `${theme.bg} ${theme.border} border-2 shadow-lg hover:shadow-xl`
            : 'bg-slate-100/80 border-slate-200/90 shadow-sm'}
      `}>
        {/* Level Badge */}
        <div className="absolute left-5 top-5 z-20 flex flex-col gap-1.5 items-start">
          <div className={`rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] shadow-xs border ${isUnlocked ? theme.badge : "bg-slate-200/90 border-slate-300 text-slate-500"}`}>
            Level {game.level} {isUnlocked ? "" : "🔒"}
          </div>
          {game.is_played && (
            <div className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-emerald-500 text-white shadow-md flex items-center gap-1 border border-emerald-400">
              <CheckCircle2 size={13} className="stroke-[3]" />
              <span>Completed</span>
            </div>
          )}
        </div>

        {/* Top Mascot Peek */}
        <div className="absolute top-4 right-4 w-16 h-16 opacity-40">
          <Image
            src={theme.mascot}
            alt="Mascot"
            width={60}
            height={60}
            className={`object-contain ${!isUnlocked ? "grayscale" : ""}`}
          />
        </div>

        <div className="flex flex-col items-center p-8 space-y-6 flex-1 justify-between">

          {/* Main Illustration Area */}
          <div className="relative w-full aspect-square max-w-[200px] flex items-center justify-center pt-2">
            <div className={`absolute inset-0 rounded-full ${isUnlocked ? theme.accent : "bg-slate-200"} opacity-30 blur-2xl`} />
            <div className={`relative w-full h-full rounded-full bg-white shadow-md border-8 ${isUnlocked ? "border-white" : "border-slate-200/80"} overflow-hidden p-4`}>
              <Image
                src={assets.image}
                alt={assets.label}
                fill
                className={`object-contain transition-all duration-700 ${!isUnlocked ? "grayscale opacity-30 scale-95" : ""}`}
                priority
              />
              {!isUnlocked && (
                <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px] flex items-center justify-center rounded-full">
                  <div className="w-12 h-12 rounded-full bg-slate-900/80 text-white flex items-center justify-center shadow-lg border border-slate-700">
                    <Lock size={20} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Text */}
          <div className="text-center space-y-1">
            <h3 className={`text-2xl font-black leading-tight ${isUnlocked ? "text-slate-900" : "text-slate-500"}`}>
              {assets.label}
            </h3>
            <p className={`text-sm font-extrabold ${isUnlocked ? "text-slate-600" : "text-slate-400"}`}>
              {isUnlocked ? assets.desc : "This level will unlock after more progress."}
            </p>
          </div>

          {/* Action Area */}
          <div className="w-full pt-2">
            {isUnlocked ? (
              <Link
                href={getGameHref(childId, game.game_slug, game.level)}
                className={`
                  w-full py-4.5 rounded-2xl ${game.is_played ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 shadow-emerald-500/25" : theme.button} text-white text-sm font-extrabold uppercase tracking-widest
                  flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg hover:shadow-xl hover:scale-[1.02]
                `}
              >
                {game.is_played ? (
                  <>
                    <CheckCircle2 size={18} className="stroke-[3]" />
                    <span>Completed • Replay</span>
                  </>
                ) : (
                  <>
                    <Play size={18} fill="currentColor" />
                    Let&apos;s Play
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
