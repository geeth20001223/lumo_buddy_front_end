import Link from "next/link";
import type { ChildProfile } from "@/types/child";
import type { LatestAssessment } from "@/lib/children";

type NextActionCardProps = {
  children: ChildProfile[];
  assessments: Record<string, LatestAssessment | null>;
};

export function NextActionCard({ children, assessments }: NextActionCardProps) {
  // Determine next action
  let icon = "✨";
  let title = "Add your first child profile";
  let description = "Create a profile to begin the support survey and unlock suitable learning activities.";
  let buttonText = "Add Child Profile";
  let buttonHref = "/children/new";
  let colorClass = "from-fuchsia-50 via-rose-50 to-amber-50 border-fuchsia-200";
  let iconBg = "bg-gradient-to-br from-fuchsia-100 to-rose-100 text-fuchsia-600";
  let btnClass = "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 shadow-purple-500/25 hover:shadow-fuchsia-500/35";

  if (children.length > 0) {
    const firstChild = children[0];
    const assessment = assessments[firstChild.id];

    if (!assessment) {
      icon = "📋";
      title = `Start survey for ${firstChild.child_name}`;
      description = "Complete the simple survey so we can suggest the right level of supportive activities.";
      buttonText = "Start Survey";
      buttonHref = `/survey/${firstChild.id}`;
      colorClass = "from-violet-50 via-purple-50 to-pink-50 border-violet-200";
      iconBg = "bg-gradient-to-br from-violet-100 to-purple-100 text-violet-600";
      btnClass = "bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 shadow-violet-500/25 hover:shadow-purple-500/35";
    } else {
      icon = "🎮";
      title = `Continue games for ${firstChild.child_name}`;
      description = `${firstChild.child_name} has recommended activities ready. Jump into the learning games!`;
      buttonText = "Continue Games";
      buttonHref = `/games/${firstChild.id}`;
      colorClass = "from-emerald-50 via-teal-50 to-cyan-50 border-teal-200";
      iconBg = "bg-gradient-to-br from-emerald-100 to-teal-100 text-teal-600";
      btnClass = "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 shadow-teal-500/25 hover:shadow-emerald-500/35";
    }
  }

  return (
    <div className={`rounded-[2rem] bg-gradient-to-br ${colorClass} border-2 p-6 sm:p-8 shadow-md`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
        <div className={`flex-shrink-0 w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center text-2xl shadow-inner`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Suggested Next Step</p>
          <h2 className="font-display text-lg sm:text-xl font-extrabold text-slate-900 mb-1">{title}</h2>
          <p className="text-sm text-slate-600 font-semibold leading-relaxed">{description}</p>
        </div>
        <div className="w-full sm:w-auto flex-shrink-0">
          <Link
            href={buttonHref}
            className={`inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-2xl ${btnClass} text-white text-sm font-extrabold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:scale-95 whitespace-nowrap`}
          >
            {buttonText}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
