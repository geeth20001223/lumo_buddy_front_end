import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: string;
};

export function Input({ className, id, label, icon, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="block" htmlFor={inputId}>
      <span className="mb-2 flex items-center gap-1.5 text-sm font-extrabold text-slate-800">
        {icon && <span className="text-base">{icon}</span>}
        {label}
      </span>
      <input
        id={inputId}
        className={clsx(
          "min-h-12 w-full rounded-2xl border-2 border-fuchsia-100/80 bg-white/90 px-4 py-3.5 text-base font-semibold text-slate-900 shadow-sm outline-none transition-all duration-300 hover:border-fuchsia-300 focus:border-fuchsia-400 focus:bg-white focus:ring-4 focus:ring-fuchsia-200/50 focus:shadow-md",
          "placeholder:text-slate-400 placeholder:font-normal",
          className,
        )}
        {...props}
      />
    </label>
  );
}
