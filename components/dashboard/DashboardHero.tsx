"use client";

import { ChildProfile } from "@/types/child";
import { formatDate } from "@/lib/dashboard";
import { User, Calendar, Activity, Sparkles } from "lucide-react";

interface DashboardHeroProps {
  child: ChildProfile;
  level: number;
  lastSurveyDate: string | null;
  totalActivities: number;
}

export function DashboardHero({ child, level, lastSurveyDate, totalActivities }: DashboardHeroProps) {
  const initial = child.child_name.charAt(0).toUpperCase();

  return (
    <div className="relative rounded-[2.5rem] bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 p-8 sm:p-10 shadow-xl overflow-hidden border border-indigo-700/40 text-white">
      {/* Vibrant background glowing spots */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-fuchsia-500/25 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-fuchsia-400 via-purple-400 to-indigo-500 p-1 shadow-lg shrink-0">
          <div className="w-full h-full rounded-[1.3rem] bg-slate-900/80 backdrop-blur-md flex items-center justify-center font-display text-4xl font-black text-white shadow-inner">
            {initial}
          </div>
        </div>
        
        {/* Info */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2 text-fuchsia-300 text-xs font-black uppercase tracking-widest">
            <Sparkles size={14} className="animate-pulse" />
            Learning Progress Report
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            {child.child_name}&rsquo;s Progress
          </h1>
          <p className="text-indigo-100/80 font-medium max-w-2xl text-sm sm:text-base leading-relaxed">
            A visual overview of learning activities, accuracy, skill levels, and recommendations for {child.child_name}.
          </p>
          
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-fuchsia-500/30 to-purple-500/30 backdrop-blur-md border border-fuchsia-400/40 text-fuchsia-200 text-xs font-extrabold shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-400 animate-ping"></span>
              Support Level {level}
            </div>
            
            {lastSurveyDate && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-100 text-xs font-extrabold shadow-sm">
                <Calendar size={14} className="text-cyan-300" />
                Last Survey: {formatDate(lastSurveyDate)}
              </div>
            )}
            
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 text-emerald-200 text-xs font-extrabold shadow-sm">
              <Activity size={14} className="text-emerald-300" />
              {totalActivities} Activities Played
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
