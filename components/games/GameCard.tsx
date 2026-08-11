import Link from "next/link";
import Image from "next/image";
import { GameWithUnlockState } from "@/types/game";
import { getGameHref } from "@/lib/game-routes";

type GameCardProps = {
  childId: string;
  game: GameWithUnlockState;
};

const GAME_CARD_IMAGES: Record<string, string> = {
  "emotion-face-match-1": "/images/games/emotion-face-match-1.png",
  "emotion-face-match-2": "/images/games/emotion-face-match-2.png",
  "emotion-face-match-3": "/images/games/emotion-face-match-3.png",
  "emotion-story-choice-1": "/images/games/emotion-story-choice-1.png",
  "emotion-story-choice-2": "/images/games/emotion-story-choice-2.png",
  "emotion-story-choice-3": "/images/games/emotion-story-choice-3.svg",
  "emotion-reflection-board-1": "/images/games/emotion-story-choice-1.png",
  "memory-match-1": "/images/games/memory-match-1.png",
  "memory-match-2": "/images/games/memory-match-2.png",
  "memory-match-3": "/images/games/memory-match-3.svg",
  "pattern-builder-1": "/images/games/pattern-builder-1.png",
  "pattern-builder-2": "/images/games/pattern-builder-2.svg",
  "pattern-builder-3": "/images/games/pattern-builder-3.svg",
  "daily-routine-order-1": "/images/games/daily-routine-order-1.png",
  "daily-routine-order-2": "/images/games/daily-routine-order-2.png",
  "daily-routine-order-3": "/images/games/daily-routine-order-3.svg",
  "personal-choice-adventure-1": "/images/games/personal-choice-1.svg",
  "personal-choice-adventure-2": "/images/games/daily-routine-order-2.png",
  "personal-choice-adventure-3": "/images/games/daily-routine-order-1.png",
  "count-the-objects-1": "/images/games/count-the-objects-1.png",
  "count-the-objects-2": "/images/games/count-the-objects-2.svg",
  "count-the-objects-3": "/images/games/count-the-objects-3.svg",
  "shape-number-match-1": "/images/games/shape-number-match-1.png",
  "shape-number-match-2": "/images/games/shape-number-match-2.svg",
  "shape-number-match-3": "/images/games/shape-number-match-3.svg",
};

export function GameCard({ childId, game }: GameCardProps) {
  const isUnlocked = game.is_unlocked;
  const levelKey = `${game.game_slug}-${game.level}`;
  const imageSrc = GAME_CARD_IMAGES[levelKey] || `/images/games/${game.game_slug}.png`;

  return (
    <div className={`relative flex flex-col h-full rounded-3xl border overflow-hidden transition-all duration-300 ${isUnlocked
      ? "bg-white border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1"
      : "bg-slate-50 border-slate-200 opacity-80"
      }`}>
      {/* Thumbnail Area */}
      <div className="relative w-full h-36 bg-slate-100 flex items-center justify-center p-4">
        <Image
          src={imageSrc}
          alt={game.game_name}
          fill
          className={`object-contain p-2 ${!isUnlocked ? "grayscale opacity-40" : ""}`}
        />
        {/* Level Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${isUnlocked ? "bg-white/90 text-blue-700 backdrop-blur-xs shadow-xs" : "bg-slate-200 text-slate-500"
          }`}>
          Level {game.level}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className={`font-display text-lg font-bold mb-2 ${isUnlocked ? "text-slate-900" : "text-slate-500"}`}>
          {game.game_name}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-3 mb-6 flex-1">
          {game.description}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          {!isUnlocked && (
            <div className="flex items-center gap-1.5 text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-[10px] font-bold uppercase tracking-widest">{game.unlock_message || "Locked"}</span>
            </div>
          )}

          {isUnlocked ? (
            <Link
              href={getGameHref(childId, game.game_slug, game.level)}
              className="inline-flex items-center justify-center w-full py-3 rounded-2xl bg-blue-500 text-white text-xs font-extrabold hover:bg-blue-600 transition-colors shadow-sm shadow-blue-100"
            >
              Start Game
            </Link>
          ) : (
            <button
              disabled
              className="inline-flex items-center justify-center w-full py-3 rounded-2xl bg-slate-200 text-slate-400 text-xs font-extrabold cursor-not-allowed"
            >
              Locked
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
