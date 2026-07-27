type SurveyProgressBarProps = {
  current: number;
  total: number;
};

export function SurveyProgressBar({ current, total }: SurveyProgressBarProps) {
  const progress = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="space-y-2 bg-white/90 backdrop-blur-md p-4 rounded-3xl border-2 border-fuchsia-100/90 shadow-sm">
      <div className="flex items-center justify-between text-xs sm:text-sm font-black text-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="uppercase tracking-widest text-slate-500 text-[10px]">Survey Progress</span>
        </div>
        <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white text-xs font-black shadow-sm">
          {progress}% Completed
        </span>
      </div>
      <div className="w-full h-3.5 bg-slate-100/90 rounded-full overflow-hidden p-0.5 border border-slate-200/80 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 rounded-full transition-all duration-700 ease-out shadow-sm"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
