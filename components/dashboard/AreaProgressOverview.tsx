"use client";

import { AreaStat, formatAreaName, formatTime } from "@/lib/dashboard";

interface AreaProgressOverviewProps {
  areaStats: AreaStat[];
}

export function AreaProgressOverview({ areaStats }: AreaProgressOverviewProps) {
  const getAreaStyling = (area: string) => {
    switch (area) {
      case "emotion": 
        return {
          cardBg: "bg-gradient-to-br from-rose-50/90 via-pink-50/50 to-white border-2 border-rose-200/80 shadow-md shadow-rose-100/50",
          accentColor: "text-rose-600",
          badgeBg: "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-sm shadow-rose-200",
          barGradient: "bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400",
          icon: "😊",
        };
      case "cognitive": 
        return {
          cardBg: "bg-gradient-to-br from-blue-50/90 via-sky-50/50 to-white border-2 border-blue-200/80 shadow-md shadow-blue-100/50",
          accentColor: "text-blue-600",
          badgeBg: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-sm shadow-blue-200",
          barGradient: "bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400",
          icon: "🧩",
        };
      case "self_awareness": 
        return {
          cardBg: "bg-gradient-to-br from-emerald-50/90 via-teal-50/50 to-white border-2 border-emerald-200/80 shadow-md shadow-emerald-100/50",
          accentColor: "text-emerald-600",
          badgeBg: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm shadow-emerald-200",
          barGradient: "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400",
          icon: "🌱",
        };
      case "mathematical": 
        return {
          cardBg: "bg-gradient-to-br from-violet-50/90 via-purple-50/50 to-white border-2 border-violet-200/80 shadow-md shadow-violet-100/50",
          accentColor: "text-violet-600",
          badgeBg: "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-sm shadow-violet-200",
          barGradient: "bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-400",
          icon: "🔢",
        };
      default: 
        return {
          cardBg: "bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 shadow-md",
          accentColor: "text-slate-600",
          badgeBg: "bg-slate-700 text-white",
          barGradient: "bg-slate-500",
          icon: "📊",
        };
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-8 border-2 border-indigo-100/60 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <span>📊</span> Area Progress & Skills
        </h2>
        <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          Development Areas
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {areaStats.map((stat) => {
          const style = getAreaStyling(stat.area);

          return (
            <div key={stat.area} className={`rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 ${style.cardBg}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-xl shadow-sm border border-slate-100">
                    {style.icon}
                  </div>
                  <div>
                    <h3 className={`font-black text-lg ${style.accentColor}`}>{formatAreaName(stat.area)}</h3>
                    {stat.gamesPlayed > 0 ? (
                      <p className="text-xs font-bold text-slate-500 mt-0.5">
                        {stat.gamesPlayed} activities played
                      </p>
                    ) : (
                      <p className="text-xs font-bold text-slate-400 mt-0.5">
                        Not started yet
                      </p>
                    )}
                  </div>
                </div>
                {stat.latestLevel && (
                  <div className={`px-3 py-1 rounded-full text-xs font-extrabold ${style.badgeBg}`}>
                    Lvl {stat.latestLevel}
                  </div>
                )}
              </div>

              {stat.gamesPlayed > 0 && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/80 rounded-2xl p-3 border border-white/90 shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Avg Score</p>
                      <p className="text-xl font-black text-slate-900 mt-0.5">{stat.averageScore}</p>
                    </div>
                    <div className="bg-white/80 rounded-2xl p-3 border border-white/90 shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Avg Time</p>
                      <p className="text-xl font-black text-slate-900 mt-0.5">{formatTime(stat.averageTime)}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                      <span>Progress</span>
                      <span className={style.accentColor}>{stat.progressPercent}%</span>
                    </div>
                    <div className="h-3 w-full bg-slate-200/60 rounded-full overflow-hidden p-0.5 border border-slate-300/40">
                      <div 
                        className={`h-full rounded-full ${style.barGradient} transition-all duration-500 shadow-sm`}
                        style={{ width: `${stat.progressPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
