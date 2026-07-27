import type { ChildProfile } from "@/types/child";
import type { AssessmentResult } from "@/types/survey";

type ChildProfileHeroProps = {
  child: ChildProfile;
  assessment: AssessmentResult | null;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function ChildProfileHero({ child, assessment }: ChildProfileHeroProps) {
  const initial = child.child_name.charAt(0).toUpperCase();
  const hasAssessment = !!assessment;

  const genderLower = (child.gender || "").toLowerCase();
  const isFemale = genderLower.includes("female") || genderLower.includes("girl") || genderLower === "f";
  const isMale = genderLower.includes("male") || genderLower.includes("boy") || genderLower === "m";

  const genderIcon = isFemale ? "👧" : isMale ? "👦" : "👶";
  const genderGradient = isFemale
    ? "from-pink-400 via-rose-400 to-fuchsia-500 shadow-pink-200/50"
    : isMale
    ? "from-sky-400 via-blue-500 to-indigo-500 shadow-blue-200/50"
    : "from-amber-400 to-orange-500 shadow-amber-200/50";

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-8 sm:p-10 shadow-sm">
      {/* Decorative Background Blobs */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-50/50 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-violet-50/50 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Avatar Box with Boy/Girl Icon + Initial Badge */}
        <div className={`relative w-32 h-32 sm:w-40 sm:h-40 rounded-[2rem] bg-gradient-to-br ${genderGradient} border-4 border-white flex items-center justify-center text-white shadow-xl overflow-hidden`}>
          <span className="text-6xl sm:text-7xl drop-shadow-md">{genderIcon}</span>
          <span className="absolute bottom-2 right-2 text-xs font-black uppercase bg-white/95 text-slate-900 px-2 py-0.5 rounded-lg shadow-sm border border-white">
            {initial}
          </span>
        </div>

        {/* Details */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="space-y-1">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
              {child.child_name}
            </h1>
            {hasAssessment && assessment.created_at && (
              <p className="text-sm font-semibold text-slate-400">
                Last reviewed: {formatDate(assessment.created_at)}
              </p>
            )}
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <span className="px-5 py-2 rounded-2xl bg-blue-50 text-blue-700 text-sm font-bold border border-blue-100 flex items-center gap-1.5">
              <span>🎈</span> Age {child.age}
            </span>
            <span className="px-5 py-2 rounded-2xl bg-violet-50 text-violet-700 text-sm font-bold border border-violet-100 flex items-center gap-1.5">
              <span>{genderIcon}</span> {child.gender || "Not specified"}
            </span>
            <span className={`px-5 py-2 rounded-2xl text-sm font-bold border ${
              hasAssessment 
                ? "bg-green-50 text-green-700 border-green-100" 
                : "bg-amber-50 text-amber-700 border-amber-100"
            }`}>
              Survey {hasAssessment ? "Completed ✓" : "Pending"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
