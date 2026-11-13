"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Emotion } from "@/types/games/emotion-face-match";

type EmotionAnswerGridProps = {
  options: Emotion[];
  onAnswer: (emotionId: string) => void;
  disabled: boolean;
  level: number;
  showImages?: boolean;
};

const MOOD_IMAGES: Partial<Record<Emotion["id"], string>> = {
  happy: "/images/mood/happy.png",
  sad: "/images/mood/sad.png",
  angry: "/images/mood/angry.png",
  surprised: "/images/mood/surprise.png",
  scared: "/images/mood/scared.png",
};

export function EmotionAnswerGrid({
  options,
  onAnswer,
  disabled,
  level: _level,
  showImages = true,
}: EmotionAnswerGridProps) {
  const optionCount = options.length;

  // Responsive grid layout:
  // - 2 options (Level 1): 2 columns
  // - 4 options (Level 2): 2 columns on mobile (2x2 grid), 4 columns on tablet/desktop
  // - 5 options (Level 3): 2 columns on mobile, 3 on tablet, 5 on desktop
  const gridLayout =
    optionCount <= 2
      ? "grid grid-cols-2 gap-3 max-w-md mx-auto"
      : optionCount === 4
        ? "grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 max-w-4xl mx-auto"
        : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 max-w-5xl mx-auto";

  return (
    <div className={`w-full ${gridLayout}`}>
      {options.map((emotion, index) => {
        const isOddLastInTwoCol = optionCount === 5 && index === 4;

        return (
          <motion.button
            key={emotion.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: index * 0.04,
              duration: 0.25,
              ease: "easeOut",
            }}
            whileHover={!disabled ? { scale: 1.025, y: -2 } : {}}
            whileTap={!disabled ? { scale: 0.97 } : {}}
            disabled={disabled}
            onClick={() => onAnswer(emotion.label)}
            aria-label={emotion.label}
            className={`
              group relative flex items-center transition-all min-w-0
              disabled:cursor-not-allowed disabled:opacity-40
              ${emotion.color} border-white
              rounded-2xl border-2 shadow-xs hover:shadow-md
              px-2.5 py-2 sm:px-3.5 sm:py-2.5 md:px-4 md:py-3
              ${showImages ? "flex-row justify-start" : "flex-col justify-center text-center"}
              gap-2 sm:gap-3
              min-h-[64px] sm:min-h-[76px] md:min-h-[82px]
              ${isOddLastInTwoCol ? "col-span-2 sm:col-span-1 max-w-[220px] mx-auto w-full" : "w-full"}
            `}
          >
            {showImages ? (
              <div
                className="relative shrink-0 overflow-hidden rounded-xl bg-white shadow-xs size-10 sm:size-12 md:size-13"
              >
                {MOOD_IMAGES[emotion.id] ? (
                  <Image
                    src={MOOD_IMAGES[emotion.id] as string}
                    alt={`${emotion.label} feeling`}
                    fill
                    sizes="(max-width: 640px) 44px, 56px"
                    className="object-cover"
                  />
                ) : (
                  <span className="flex h-full items-center justify-center text-2xl sm:text-3xl">
                    {emotion.emoji}
                  </span>
                )}
              </div>
            ) : null}

            <div className={`flex-1 min-w-0 ${showImages ? "text-left" : "text-center"}`}>
              <span
                className={`block font-black text-slate-800 tracking-tight leading-tight truncate sm:whitespace-normal ${
                  showImages
                    ? "text-xs sm:text-sm md:text-base"
                    : "text-sm sm:text-base md:text-lg"
                }`}
              >
                {emotion.label}
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
