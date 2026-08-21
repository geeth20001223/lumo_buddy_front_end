"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Story } from "@/types/games/emotion-story-choice";

type StoryCardProps = {
  story: Story;
};

export function StoryCard({ story }: StoryCardProps) {
  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={story.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="grid items-center gap-3 md:grid-cols-[150px_minmax(0,1fr)] md:gap-5 xl:grid-cols-[200px_minmax(0,1fr)] xl:gap-6"
        >
          <div className="relative mx-auto flex h-[110px] w-full max-w-[170px] items-center justify-center overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-orange-50 via-amber-50 to-white px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_10px_30px_rgba(251,146,60,0.08)] sm:h-[125px] md:mx-0 md:h-[135px] md:max-w-none xl:h-[165px] xl:rounded-[2rem] xl:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_18px_45px_rgba(251,146,60,0.12)]">
            <div className="pointer-events-none absolute inset-3 rounded-[1.5rem] bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.95),transparent_40%),radial-gradient(circle_at_28%_26%,rgba(251,191,36,0.20),transparent_18%),radial-gradient(circle_at_76%_72%,rgba(125,211,252,0.18),transparent_22%)]" />
            <div className="pointer-events-none absolute left-5 top-5 size-2.5 rounded-full bg-white/70 shadow-[28px_14px_0_rgba(255,255,255,0.45),80px_48px_0_rgba(251,191,36,0.16)]" />
            <span
              aria-hidden="true"
              className="relative z-10 text-[3.5rem] leading-none drop-shadow-[0_12px_20px_rgba(251,146,60,0.12)] sm:text-[4.2rem] md:text-[4.6rem] xl:text-[5.5rem]"
            >
              {story.illustration}
            </span>
          </div>

          <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-1 text-center md:mx-0 md:items-start md:text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-orange-500 xl:text-xs">
              Read the story
            </p>
            <h2 className="w-full text-balance text-lg font-black leading-snug text-slate-900 sm:text-xl md:text-[1.75rem] xl:text-[2.1rem]">
              {story.situation}
            </h2>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
