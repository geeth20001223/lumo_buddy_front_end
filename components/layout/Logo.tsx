import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2 sm:gap-3 select-none shrink-0"
      aria-label="Lumo Buddy home"
    >
      <div className="relative p-0.5 rounded-full bg-gradient-to-r from-sky-400 via-fuchsia-400 to-indigo-500 shadow-md group-hover:scale-105 transition-transform duration-300">
        <Image
          src="/images/logo.jpeg"
          alt="Lumo Buddy Logo"
          width={44}
          height={44}
          priority
          className="h-8 w-8 sm:h-10 sm:w-11 rounded-full object-cover border-2 border-white"
        />
        <div className="absolute -top-1 -right-1 p-0.5 rounded-full bg-amber-400 text-slate-900 shadow-2xs">
          <Sparkles size={9} className="fill-slate-900" />
        </div>
      </div>
      <span className="font-display text-base sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors whitespace-nowrap">
        Lumo Buddy
      </span>
    </Link>
  );
}
