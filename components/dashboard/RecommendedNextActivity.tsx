"use client";

import { RecommendedActivity } from "@/lib/dashboard";
import { ArrowRight, Lightbulb } from "lucide-react";
import Link from "next/link";
import { getGameHref } from "@/lib/game-routes";

interface RecommendedNextActivityProps {
  childId: string;
  recommendation: RecommendedActivity | null;
}

export function RecommendedNextActivity({ childId, recommendation }: RecommendedNextActivityProps) {
  if (!recommendation) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50/80 to-rose-50/60 rounded-[2.5rem] p-6 sm:p-8 border-2 border-amber-200/80 shadow-lg h-full flex flex-col">
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-amber-300/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-400/30 text-xl font-bold">
          💡
        </div>
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 bg-amber-200/60 px-2.5 py-0.5 rounded-full">
            Personalized Step
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-0.5">Recommended Next Activity</h2>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center pt-2">
        <h3 className="text-2xl font-black text-amber-950 leading-tight mb-3">
          {recommendation.game.game_name} — <span className="text-orange-600">Level {recommendation.game.level}</span>
        </h3>
        <p className="text-amber-900/90 font-semibold leading-relaxed mb-8 text-sm">
          {recommendation.reason}
        </p>
        
        <Link 
          href={getGameHref(
            childId,
            recommendation.game.game_slug,
            recommendation.game.level,
          )}
          className="mt-auto inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-extrabold text-sm shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-300 border-0"
        >
          Continue Recommended Activity 🚀
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
