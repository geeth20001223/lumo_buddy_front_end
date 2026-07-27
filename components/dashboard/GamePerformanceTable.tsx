"use client";

import { Game, GameScore } from "@/types/game";
import { formatAreaName, formatDate, formatTime } from "@/lib/dashboard";

interface GamePerformanceTableProps {
  scores: GameScore[];
  games: Game[];
}

export function GamePerformanceTable({ scores, games }: GamePerformanceTableProps) {
  if (scores.length === 0) return null;

  const getGameName = (gameId: string) => {
    const game = games.find(g => g.id === gameId);
    return game ? game.game_name : "Learning Activity";
  };

  const getAreaBadgeColor = (area: string) => {
    switch (area) {
      case "emotion": return "bg-rose-100 text-rose-700 border-rose-200";
      case "cognitive": return "bg-blue-100 text-blue-700 border-blue-200";
      case "self_awareness": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "mathematical": return "bg-violet-100 text-violet-700 border-violet-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] border-2 border-indigo-100/60 shadow-lg overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-indigo-100/60 flex items-center justify-between">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <span>📜</span> Activity History
        </h2>
        <span className="text-xs font-black uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
          Recent Results
        </span>
      </div>

      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-slate-50 via-indigo-50/40 to-slate-50 text-slate-600 text-xs uppercase tracking-widest font-black">
              <th className="px-6 py-4 border-b border-slate-100">Activity</th>
              <th className="px-6 py-4 border-b border-slate-100">Area</th>
              <th className="px-6 py-4 border-b border-slate-100 text-center">Level</th>
              <th className="px-6 py-4 border-b border-slate-100">Score</th>
              <th className="px-6 py-4 border-b border-slate-100">Time</th>
              <th className="px-6 py-4 border-b border-slate-100">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm font-semibold">
            {scores.slice(0, 10).map((score) => (
              <tr key={score.id} className="hover:bg-indigo-50/40 transition-colors">
                <td className="px-6 py-4 font-black text-slate-900">
                  {getGameName(score.game_id)}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${getAreaBadgeColor(score.area)}`}>
                    {formatAreaName(score.area)}
                  </span>
                </td>
                <td className="px-6 py-4 font-black text-slate-700 text-center">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200">
                    Lvl {score.level}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-black text-purple-700 bg-purple-100/80 px-3 py-1 rounded-xl border border-purple-200 text-sm shadow-xs">
                    {score.final_score}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600 font-bold">
                  {formatTime(score.time_taken)}
                </td>
                <td className="px-6 py-4 text-slate-500 font-medium">
                  {formatDate(score.played_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden flex flex-col divide-y divide-slate-100">
        {scores.slice(0, 10).map((score) => (
          <div key={score.id} className="p-5 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">{getGameName(score.game_id)}</h3>
                <p className="text-xs font-medium text-slate-400 mt-0.5">{formatDate(score.played_at)}</p>
              </div>
              <span className="font-black text-purple-700 bg-purple-100 px-3 py-1 rounded-xl text-sm border border-purple-200">
                {score.final_score}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-extrabold mt-1">
              <span className={`px-2.5 py-1 rounded-full border ${getAreaBadgeColor(score.area)}`}>
                {formatAreaName(score.area)}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                Lvl {score.level}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {formatTime(score.time_taken)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {scores.length > 10 && (
        <div className="p-4 bg-slate-50/80 text-center border-t border-slate-100">
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Showing latest 10 activities</p>
        </div>
      )}
    </div>
  );
}
