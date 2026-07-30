"use client";

import { motion } from "framer-motion";
import type { GameWithUnlockState } from "@/types/game";
import { JourneyCard } from "./JourneyCard";
import { Brain, Heart, Calculator, Compass } from "lucide-react";
import { MascotGuide } from "@/components/ui/MascotGuide";

import { useEffect, useRef } from "react";

import { getGameSlugVariants } from "@/lib/game-routes";

interface JourneyTimelineProps {
  childId: string;
  games: GameWithUnlockState[];
  highlightPractice?: boolean;
  highlightGameId?: string;
  highlightSlug?: string;
  highlightLevel?: number;
}

const AREA_METADATA = {
  emotion: {
    label: "Feeling Skills",
    icon: <Heart size={20} className="text-rose-500" />,
    description: "Learn about feelings and friends.",
    bg: "bg-rose-50/90 border-rose-200 text-rose-700",
    border: "border-rose-200",
  },
  cognitive: {
    label: "Thinking Skills",
    icon: <Brain size={20} className="text-blue-500" />,
    description: "Fun puzzles for your brain.",
    bg: "bg-blue-50/90 border-blue-200 text-blue-700",
    border: "border-blue-200",
  },
  self_awareness: {
    label: "Me & My Day",
    icon: <Compass size={20} className="text-amber-500" />,
    description: "All about you and your day.",
    bg: "bg-amber-50/90 border-amber-200 text-amber-700",
    border: "border-amber-200",
  },
  mathematical: {
    label: "Number Skills",
    icon: <Calculator size={20} className="text-emerald-500" />,
    description: "Count and find shapes.",
    bg: "bg-emerald-50/90 border-emerald-200 text-emerald-700",
    border: "border-emerald-200",
  },
};

export function JourneyTimeline({ childId, games, highlightPractice, highlightGameId, highlightSlug, highlightLevel }: JourneyTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Group games by area
  const gamesByArea = games.reduce((acc, game) => {
    if (!acc[game.area]) acc[game.area] = [];
    acc[game.area].push(game);
    return acc;
  }, {} as Record<string, GameWithUnlockState[]>);

  const areaOrder = ["emotion", "cognitive", "self_awareness", "mathematical"];

  // Find the target or recommended game to highlight
  const targetGame = games.find(g => {
    if (highlightGameId && String(g.id) === String(highlightGameId)) return true;
    if (highlightSlug && (g.game_slug === highlightSlug || getGameSlugVariants(highlightSlug).includes(g.game_slug))) {
      return highlightLevel !== undefined ? g.level === highlightLevel : true;
    }
    return false;
  }) || (highlightPractice ? games.find(g => g.is_unlocked) : null);
  const recommendedGame = targetGame || games.find(g => g.is_next_recommended && g.is_unlocked) || games.find(g => g.is_unlocked);

  useEffect(() => {
    if (highlightPractice) {
      const timer = setTimeout(() => {
        const target = document.getElementById("practice-highlight-target");
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
        } else if (containerRef.current) {
          containerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [highlightPractice]);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-4 pb-12 space-y-24">
      {/* Reusable Mascot Welcome */}
      <MascotGuide
        message="Hi friend! Let's pick a fun game."
        className="mb-8"
      />

      {areaOrder.map((areaKey) => {
        const areaGames = gamesByArea[areaKey] || [];
        if (areaGames.length === 0) return null;

        const metadata = AREA_METADATA[areaKey as keyof typeof AREA_METADATA];
        const sortedGames = [...areaGames].sort((a, b) => a.level - b.level);
        const firstUnlockedIndex = sortedGames.findIndex(g => g.is_unlocked);

        // Group by game_slug (Activity Type)
        const gamesByType = sortedGames.reduce((acc, game) => {
          if (!acc[game.game_slug]) acc[game.game_slug] = [];
          acc[game.game_slug].push(game);
          return acc;
        }, {} as Record<string, GameWithUnlockState[]>);

        return (
          <section key={areaKey} className="space-y-20">
            {/* Soft Category Header */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-full ${metadata.bg} border-2 shadow-sm`}>
                {metadata.icon}
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  {metadata.label}
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                {metadata.label}
              </h2>
              <p className="text-lg text-slate-600 font-extrabold max-w-lg mx-auto">
                {metadata.description}
              </p>
            </div>

            {/* Sub-grouped Tracks */}
            <div className="space-y-32">
              {Object.entries(gamesByType).map(([slug, typeGames]) => {
                const gameName = typeGames[0].game_name.split("Level")[0].trim();

                return (
                  <div key={slug} className="space-y-12">
                    {/* Track Divider */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-1.5 w-16 bg-gradient-to-r from-fuchsia-400 to-purple-500 rounded-full shadow-sm" />
                      <h3 className="text-lg font-black text-fuchsia-700 uppercase tracking-[0.3em] text-center bg-white/80 backdrop-blur-md px-6 py-1.5 rounded-full border border-fuchsia-100 shadow-xs">
                        {gameName}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto items-stretch">
                      {typeGames.map((game) => {
                        const globalIdx = sortedGames.indexOf(game);
                        const isCardHighlighted = Boolean(
                          highlightPractice &&
                          game.is_unlocked &&
                          (recommendedGame
                            ? (game.id === recommendedGame.id || (game.game_slug === recommendedGame.game_slug && game.level === recommendedGame.level))
                            : globalIdx === firstUnlockedIndex)
                        );
                        return (
                          <div key={game.id} id={isCardHighlighted ? "practice-highlight-target" : undefined} className="h-full">
                            <JourneyCard
                              childId={childId}
                              game={game}
                              isFirstUnlocked={globalIdx === firstUnlockedIndex}
                              isHighlighted={isCardHighlighted}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Warm Footer */}
      <div className="pt-20 text-center pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-flex flex-col items-center gap-6 p-12 rounded-[4rem] bg-white/90 backdrop-blur-md border-4 border-fuchsia-200 border-dashed shadow-xl max-w-lg mx-auto"
        >
          <div className="text-6xl">🎈</div>
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-slate-900">You&rsquo;re doing great!</h3>
            <p className="text-slate-600 font-extrabold max-w-md mx-auto">
              You played so many games today. Ready for one more?
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
