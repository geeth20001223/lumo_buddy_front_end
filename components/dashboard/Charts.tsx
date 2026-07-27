"use client";

import { GameScore } from "@/types/game";
import { AreaStat, formatAreaName } from "@/lib/dashboard";

interface ChartProps {
  scores?: GameScore[];
  areaStats?: AreaStat[];
}

export function ScoreTrendChart({ scores }: ChartProps) {
  if (!scores || scores.length < 3) {
    return (
      <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-8 border-2 border-indigo-100/60 shadow-lg h-full flex flex-col items-center justify-center min-h-[300px] text-center">
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-2xl mb-3 shadow-inner">
          📈
        </div>
        <h3 className="text-xl font-extrabold text-slate-800 mb-1">Learning Trend</h3>
        <p className="text-slate-400 text-sm font-semibold max-w-xs">
          More activities needed to show trend chart.
        </p>
      </div>
    );
  }

  // Use up to 10 latest scores for the chart
  const recentScores = [...scores].slice(0, 10).reverse();
  const maxScore = Math.max(...recentScores.map(s => s.final_score), 100);

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-8 border-2 border-indigo-100/60 shadow-lg h-full min-h-[300px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <span>📈</span> Score Trend
        </h3>
        <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
          Last 10 Activities
        </span>
      </div>

      <div className="flex-1 w-full flex items-end gap-2 h-48 relative pt-4">
        {/* Y-axis rough lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
          <div className="border-t-2 border-slate-100 border-dashed w-full"></div>
          <div className="border-t-2 border-slate-100 border-dashed w-full"></div>
          <div className="border-t-2 border-slate-100 border-dashed w-full"></div>
        </div>
        
        {/* Bars */}
        {recentScores.map((score, index) => {
          const heightPercent = Math.max((score.final_score / maxScore) * 100, 8);
          return (
            <div key={score.id} className="relative flex-1 flex flex-col items-center group h-full justify-end z-10 pb-6">
              <div 
                className="w-full max-w-[2.5rem] bg-gradient-to-t from-indigo-500 via-purple-500 to-fuchsia-400 group-hover:from-fuchsia-500 group-hover:to-pink-400 rounded-t-xl transition-all duration-300 relative shadow-md shadow-indigo-300/30 group-hover:scale-105"
                style={{ height: `${heightPercent}%` }}
              >
                {/* Tooltip */}
                <div className="absolute -top-11 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-extrabold py-1.5 px-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl z-20 border border-slate-700">
                  Score: {score.final_score}
                </div>
              </div>
              <div className="absolute bottom-0 text-[10px] font-black text-slate-400 uppercase">
                #{index + 1}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AreaAverageChart({ areaStats }: ChartProps) {
  if (!areaStats || areaStats.length === 0) return null;

  const data = areaStats.map(stat => ({
    name: formatAreaName(stat.area).split(" ")[0], // Short name
    score: stat.averageScore,
    area: stat.area,
  }));

  const getBarGradient = (area: string) => {
    switch (area) {
      case "emotion": return "bg-gradient-to-t from-rose-500 to-pink-400 shadow-rose-300/40";
      case "cognitive": return "bg-gradient-to-t from-blue-500 to-cyan-400 shadow-blue-300/40";
      case "self_awareness": return "bg-gradient-to-t from-emerald-500 to-teal-400 shadow-emerald-300/40";
      case "mathematical": return "bg-gradient-to-t from-violet-500 to-purple-400 shadow-violet-300/40";
      default: return "bg-gradient-to-t from-slate-500 to-slate-400";
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-8 border-2 border-indigo-100/60 shadow-lg h-full min-h-[300px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <span>🎯</span> Area Averages
        </h3>
        <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
          Average Score
        </span>
      </div>

      <div className="flex-1 w-full flex items-end gap-4 h-48 relative pt-4">
        {/* Y-axis rough lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
          <div className="border-t-2 border-slate-100 border-dashed w-full"></div>
          <div className="border-t-2 border-slate-100 border-dashed w-full"></div>
          <div className="border-t-2 border-slate-100 border-dashed w-full"></div>
        </div>

        {data.map((entry, index) => {
          const heightPercent = Math.max((entry.score / 100) * 100, 8);
          return (
            <div key={index} className="relative flex-1 flex flex-col items-center group h-full justify-end z-10 pb-6">
              <div 
                className={`w-full max-w-[3.5rem] ${getBarGradient(entry.area)} rounded-t-xl transition-all duration-300 group-hover:scale-105 relative shadow-md`}
                style={{ height: `${heightPercent}%` }}
              >
                {/* Tooltip */}
                <div className="absolute -top-11 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-extrabold py-1.5 px-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-xl z-20 border border-slate-700">
                  {entry.score}
                </div>
              </div>
              <div className="absolute bottom-0 text-xs font-extrabold text-slate-600 truncate w-full text-center">
                {entry.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
