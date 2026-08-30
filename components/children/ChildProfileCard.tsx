import Link from "next/link";
import type { ChildProfile } from "@/types/child";
import type { LatestAssessment } from "@/lib/children";

type ChildProfileCardProps = {
  child: ChildProfile;
  assessment: LatestAssessment | null;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function ChildProfileCard({ child, assessment }: ChildProfileCardProps) {
  const hasAssessment = !!assessment;
  const initial = child.child_name.charAt(0).toUpperCase();

  const genderLower = (child.gender || "").toLowerCase();
  const isFemale = genderLower.includes("female") || genderLower.includes("girl") || genderLower === "f";
  const isMale = genderLower.includes("male") || genderLower.includes("boy") || genderLower === "m";

  const genderIcon = isFemale ? "👧" : isMale ? "👦" : "👶";
  const genderColor = isFemale
    ? "bg-gradient-to-br from-pink-400 via-rose-400 to-fuchsia-500 text-white shadow-pink-200 border-pink-200"
    : isMale
      ? "bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500 text-white shadow-sky-200 border-blue-200"
      : "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-amber-200 border-amber-200";

  const levelLabel = hasAssessment && assessment?.predicted_level
    ? `Level ${assessment.predicted_level}`
    : null;

  return (
    <article className="group rounded-[2rem] border-2 border-fuchsia-100/60 bg-white/90 p-6 shadow-md hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.15)] transition-all duration-300 flex flex-col gap-5">
      {/* Clickable Area: Avatar + Name + Grid */}
      <Link href={`/children/${child.id}`} className="block space-y-5 cursor-pointer">
        {/* Top: Gender Icon Letter Box + Name + Age */}
        <div className="flex items-center gap-4">
          {/* Letter Box displaying Girl 👧 or Boy 👦 Icon + Initial Badge */}
          <div className={`relative w-16 h-16 rounded-2xl ${genderColor} border-2 flex items-center justify-center font-display flex-shrink-0 shadow-md transition-transform duration-300 group-hover:scale-110 overflow-hidden`}>
            <span className="text-3xl drop-shadow-xs">{genderIcon}</span>
            <span className="absolute bottom-1 right-1 text-[10px] font-black uppercase bg-white/95 text-slate-900 px-1.5 py-0.5 rounded-md shadow-xs border border-white">
              {initial}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="font-display text-xl font-extrabold text-slate-900 truncate transition-colors group-hover:text-fuchsia-600">{child.child_name}</h2>
            <p className="text-xs font-bold text-slate-400 mt-0.5">Added {formatDate(child.created_at)}</p>
          </div>
          <span className="flex-shrink-0 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-fuchsia-50 to-pink-50 border border-fuchsia-200 text-fuchsia-700 text-xs font-extrabold shadow-sm">
            Age {child.age}
          </span>
        </div>

        {/* Middle: Info grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-blue-50/70 border border-blue-100/80 px-4 py-3 flex items-center justify-between">
            <div>
              <span className="block text-[10px] font-black uppercase tracking-wider text-blue-500 mb-0.5">Gender</span>
              <span className="text-sm font-extrabold text-slate-800">{child.gender || "Not specified"}</span>
            </div>
            <span className="text-xl">{genderIcon}</span>
          </div>
          <div className={`rounded-2xl px-4 py-3 border ${hasAssessment ? "bg-emerald-50/70 border-emerald-100" : "bg-amber-50/70 border-amber-100"}`}>
            <span className={`block text-[10px] font-black uppercase tracking-wider mb-0.5 ${hasAssessment ? "text-emerald-600" : "text-amber-600"}`}>Survey</span>
            <span className="text-sm font-extrabold text-slate-800">{hasAssessment ? "Completed ✓" : "Pending"}</span>
          </div>
          {levelLabel && (
            <div className="rounded-2xl bg-purple-50/70 border border-purple-100 px-4 py-3">
              <span className="block text-[10px] font-black uppercase tracking-wider text-purple-600 mb-0.5">Support Level</span>
              <span className="text-sm font-extrabold text-slate-800">{levelLabel}</span>
            </div>
          )}
          <div className="rounded-2xl bg-rose-50/70 border border-rose-100 px-4 py-3">
            <span className="block text-[10px] font-black uppercase tracking-wider text-rose-500 mb-0.5">Next Step</span>
            <span className="text-sm font-extrabold text-slate-800">{hasAssessment ? "Play Games" : "Take Survey"}</span>
          </div>
        </div>
      </Link>

      {/* Bottom: Action buttons */}
      <div className="flex flex-col gap-3">
        <Link
          href={hasAssessment ? `/games/${child.id}` : `/survey/${child.id}`}
          className={`inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-base font-extrabold shadow-md transition-all duration-300 active:scale-95 text-white ${hasAssessment
            ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5"
            : "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5"
            }`}
        >
          {hasAssessment ? (
            <>
              Continue Games 🎮
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
            </>
          ) : (
            <>
              Start Initial Survey 📋
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </Link>

        <div className={`grid gap-3 ${hasAssessment ? "grid-cols-2" : "grid-cols-1"}`}>
          <Link
            href={`/children/${child.id}`}
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-extrabold shadow-sm transition-all duration-300 active:scale-95 bg-white text-fuchsia-700 hover:bg-fuchsia-50 border-2 border-fuchsia-200 hover:border-fuchsia-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            View Profile
          </Link>

          {hasAssessment && (
            <Link
              href={`/children/${child.id}/dashboard`}
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-extrabold shadow-sm transition-all duration-300 active:scale-95 bg-white text-indigo-700 hover:bg-indigo-50 border-2 border-indigo-200 hover:border-indigo-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Report
            </Link>
          )}
        </div>

        <Link
          href={`/progress/attendance?studentId=${child.id}`}
          className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-xs font-black uppercase tracking-wider bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 shadow-2xs transition-all"
        >
          📄 Attendance Register (.docx)
        </Link>
      </div>
    </article>
  );
}
