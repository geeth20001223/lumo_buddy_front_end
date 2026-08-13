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
  level,
  showImages = true,
}: EmotionAnswerGridProps) {
  const compact = level > 1;

  return (
    <div
      className={`mx-auto w-full ${compact
        ? "flex flex-row justify-center items-stretch gap-2 sm:gap-3.5"
        : "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:flex lg:flex-wrap lg:justify-center"
        }`}
    >
      {options.map((emotion, index) => {
        return (
          <motion.button
            key={emotion.id}
            initial={{ opacity: 0, scale: compact ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: compact ? 0 : index * 0.05,
              duration: compact ? 0.25 : 0.8,
              ease: "easeInOut",
            }}
            whileHover={!disabled && !compact ? { scale: 1.02 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            disabled={disabled}
            onClick={() => onAnswer(emotion.label)}
            aria-label={emotion.label}
            className={`
              group relative flex items-center transition-all flex-1 min-w-0
              disabled:cursor-not-allowed disabled:opacity-40
              ${emotion.color} border-white
              ${compact
                ? `min-h-[76px] ${showImages ? "flex-row justify-start" : "flex-col justify-center"} gap-2.5 rounded-2xl border-2 px-3 py-2 duration-300 sm:min-h-[88px] md:py-2.5`
                : "flex-col rounded-[2rem] border-4 p-6 shadow-xl duration-500 sm:rounded-[3rem] sm:p-12 lg:p-16"
              }
            `}
          >
            {showImages ? (
              <div
                className={`relative shrink-0 overflow-hidden rounded-[1.25rem] bg-white shadow-sm ${compact
                  ? "size-[52px] sm:size-[60px]"
                  : "size-24 sm:size-28"
                  }`}
              >
                {MOOD_IMAGES[emotion.id] ? (
                  <Image
                    src={MOOD_IMAGES[emotion.id] as string}
                    alt={`${emotion.label} feeling`}
                    fill
                    sizes={compact ? "96px" : "112px"}
                    className="object-cover"
                  />
                ) : (
                  <span className="flex h-full items-center justify-center text-4xl sm:text-5xl">
                    {emotion.emoji}
                  </span>
                )}
              </div>
            ) : null}
            <span
              className={`relative z-10 font-black text-slate-800/80 whitespace-nowrap tracking-tight ${compact
                ? `${showImages ? "text-sm sm:text-base" : "text-base sm:text-lg"} leading-none`
                : "text-2xl uppercase tracking-[0.2em] sm:text-3xl"
                }`}
            >
              {emotion.label}
            </span>

            {!compact && (
              <div className="absolute inset-0 rounded-[3rem] border-8 border-transparent transition-colors group-hover:border-white/40" />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
