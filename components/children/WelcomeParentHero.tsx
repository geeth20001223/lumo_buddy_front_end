import Link from "next/link";

type WelcomeParentHeroProps = {
  parentName: string;
};

export function WelcomeParentHero({ parentName }: WelcomeParentHeroProps) {
  const firstName = parentName?.split(" ")[0] || "there";

  return (
    <div className="relative rounded-[2rem] bg-gradient-to-br from-fuchsia-50/80 via-rose-50/60 to-amber-50/70 border-2 border-fuchsia-100 shadow-md overflow-hidden p-8 sm:p-12">
      {/* Decorative blobs */}
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-fuchsia-300/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-rose-300/30 blur-3xl pointer-events-none" />
      <div className="absolute top-6 right-24 w-24 h-24 rounded-full bg-amber-300/25 blur-2xl pointer-events-none" />

      <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        {/* Left: Text */}
        <div className="flex-1">
          <span className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-white/90 border border-fuchsia-200 text-xs font-black uppercase tracking-widest text-fuchsia-600 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-500 animate-pulse"></span>
            Parent Portal
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
            Welcome back,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-rose-500 to-amber-500">
              {firstName}
            </span>{" "}
            👋
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-semibold leading-relaxed max-w-lg">
            Choose a child profile, continue the survey, or start supportive learning games.
          </p>
        </div>

        {/* Right: Action */}
        <div className="flex-shrink-0 w-full lg:w-auto">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border-2 border-fuchsia-100 p-6 shadow-md flex flex-col items-center text-center gap-4">
            {/* Decorative icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-100 to-rose-100 flex items-center justify-center text-fuchsia-600 shadow-inner text-2xl">
              👶
            </div>
            <div>
              <p className="text-sm font-extrabold text-slate-800 mb-0.5">Add a new profile</p>
              <p className="text-xs text-slate-500 font-semibold">for another child</p>
            </div>
            <Link
              href="/children/new"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 text-white text-sm font-extrabold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-fuchsia-500/35 hover:scale-[1.03] transition-all duration-300 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Add Child Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
