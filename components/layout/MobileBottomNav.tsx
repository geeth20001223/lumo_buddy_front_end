"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, BarChart2, Layers } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const tabs = [
    { href: "/children", label: "Children", icon: <Users className="w-5 h-5" />, match: "/children" },
    { href: "/progress", label: "Progress", icon: <BarChart2 className="w-5 h-5" />, match: "/progress" },
    { href: "/development-areas", label: "Areas", icon: <Layers className="w-5 h-5" />, match: "/development-areas" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] z-40 pb-safe">
      <div className="flex justify-around items-center h-[64px] px-2 sm:px-6">
        {tabs.map((tab) => {
          const isActive = pathname?.startsWith(tab.match);
          return (
            <Link
              key={tab.href + tab.label}
              href={tab.href}
              className="flex flex-col items-center justify-center w-full h-full p-1 group transition-transform active:scale-95 min-h-[48px]"
            >
              <div
                className={`p-1.5 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-sky-100 text-sky-700 shadow-inner"
                    : "text-slate-400 group-hover:bg-slate-50 group-hover:text-slate-600"
                }`}
              >
                {tab.icon}
              </div>
              <span
                className={`text-[10px] mt-1 font-black tracking-wide ${
                  isActive ? "text-sky-700" : "text-slate-500"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
