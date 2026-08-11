"use client";

import { RecommendedActivity } from "@/lib/dashboard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";

interface RecommendedNextActivityProps {
  childId: string;
  recommendation: RecommendedActivity | null;
}

const GAME_ASSETS: Record<string, string> = {
  "emotion-face-match": "/images/games/emotion-face-match-1.png",
  "count-the-objects": "/images/games/count-the-objects-1.png",
  "daily-routine-order": "/images/games/daily-routine-order-1.png",
  "emotion-reflection-board": "/images/games/emotion-story-choice-1.png",
  "emotion-story-choice": "/images/games/emotion-story-choice-3.svg",
  "memory-match": "/images/games/memory-match-1.png",
  "pattern-builder": "/images/games/pattern-builder-1.png",
  "personal-choice-adventure": "/images/games/personal-choice.png",
  "shape-number-match": "/images/games/shape-number-match-2.svg",
};

export function RecommendedNextActivity({ childId, recommendation }: RecommendedNextActivityProps) {
  if (!recommendation) return null;

  const gameImage = GAME_ASSETS[recommendation.game.game_slug] || "/images/games/emotion-face-match.png";

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50/80 to-rose-50/60 rounded-[2rem] p-5 sm:p-6 border-2 border-amber-200/80 shadow-md flex flex-col justify-between h-fit w-full">
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-36 h-36 bg-amber-300/30 rounded-full blur-2xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-sm text-sm font-bold">
            💡
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 bg-amber-200/60 px-2.5 py-0.5 rounded-full">
            Recommended Next Activity
          </span>
        </div>
      </div>

      {/* Content & Game Artwork */}
      <div className="flex flex-col sm:flex-row items-center gap-4 my-2">
        <div className="flex-1 space-y-1.5 text-left">
          <h3 className="text-xl font-black text-amber-950 leading-tight">
            {recommendation.game.game_name} — <span className="text-orange-600">Level {recommendation.game.level}</span>
          </h3>
          <p className="text-amber-900/90 font-semibold leading-snug text-xs">
            {recommendation.reason}
          </p>
        </div>

        {/* Dynamic Game Artwork */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-2xl bg-white/90 shadow-md border-3 border-white p-2 flex items-center justify-center">
          <Image
            src={gameImage}
            alt={recommendation.game.game_name}
            fill
            className="object-contain p-1.5"
            priority
          />
        </div>
      </div>

      {/* Continuously Animated Action Button */}
      <div className="pt-2">
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block"
        >
          <Link
            href={`/games/${childId}?highlight=practice&slug=${recommendation.game.game_slug}&level=${recommendation.game.level}&game_id=${recommendation.game.id}`}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-extrabold text-xs tracking-wide shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-amber-500/40 active:scale-95 transition-all duration-300 border-0 ring-4 ring-orange-300/40"
          >
            Continue to Game Dashboard{" "}
            <motion.span
              animate={{ y: [0, -3, 0], x: [0, 2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              🚀
            </motion.span>
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
