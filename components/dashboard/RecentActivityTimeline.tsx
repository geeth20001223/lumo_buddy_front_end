"use client";

import { Game, GameScore } from "@/types/game";
import { formatDate } from "@/lib/dashboard";
import { Activity } from "lucide-react";

interface RecentActivityTimelineProps {
  scores: GameScore[];
  games: Game[];
}

export function RecentActivityTimeline({ scores, games }: RecentActivityTimelineProps) {
  if (scores.length === 0) return null;

  const recentScores = scores.slice(0, 5);

  const getGameName = (gameId: string) => {
    const game = games.find(g => g.id === gameId);
    return game ? game.game_name : "Learning Activity";
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-8 border-2 border-indigo-100/60 shadow-lg h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <span>⏳</span> Recent Activity
        </h2>
        <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
          Timeline
        </span>
      </div>
      
      <div className="space-y-6">
        {recentScores.map((score, index) => (
          <div key={score.id} className="flex gap-4 relative">
            {/* Timeline line */}
            {index < recentScores.length - 1 && (
              <div className="absolute top-10 left-5 w-0.5 h-full -mb-6 bg-gradient-to-b from-indigo-200 to-purple-200"></div>
            )}
            
            <div className="relative z-10 w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-300/40">
              <Activity size={18} />
            </div>
            
            <div className="flex-1 pt-1 bg-gradient-to-r from-slate-50 to-indigo-50/30 p-3.5 rounded-2xl border border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-sm">
                {getGameName(score.game_id)}{" "}
                <span className="text-indigo-600 font-extrabold text-xs px-2 py-0.5 bg-indigo-100/80 rounded-full ml-1">
                  Level {score.level}
                </span>
              </h3>
              <p className="text-slate-600 text-xs font-semibold mt-1">
                Score: <span className="font-black text-fuchsia-600 text-sm">{score.final_score}</span>
              </p>
              <p className="text-slate-400 text-[10px] font-bold mt-1 uppercase tracking-widest">
                {formatDate(score.played_at)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
